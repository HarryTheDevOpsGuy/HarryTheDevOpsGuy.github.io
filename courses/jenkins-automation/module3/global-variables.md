---
layout: course
title: Global Variables
description: Master the implementation and management of global variables in Jenkins shared libraries
module: 3
order: 3
---

# Global Variables

## Overview
Global variables are a powerful feature of Jenkins shared libraries that allow you to create reusable pipeline components accessible across all Jenkins pipelines. This lesson covers the implementation, best practices, and advanced patterns for global variables.

## Global Variable Fundamentals

### Basic Structure
```groovy
// vars/globalConfig.groovy
class GlobalConfig implements Serializable {
    private Map config
    
    GlobalConfig() {
        this.config = [
            defaultBranch: 'main',
            timeoutMinutes: 60,
            credentialsId: 'jenkins-deploy-key',
            environments: ['dev', 'staging', 'prod']
        ]
    }
    
    def getConfig() { return config }
    
    def getEnvironments() { return config.environments }
    
    def getTimeoutMinutes() { return config.timeoutMinutes }
}

def call() {
    return new GlobalConfig()
}
```

## Implementation Patterns

### 1. Environment Configuration

```groovy
// vars/environmentConfig.groovy
def call(String environment) {
    def configs = [
        dev: [
            url: 'https://dev-api.example.com',
            namespace: 'development',
            replicas: 1,
            resources: [
                requests: [cpu: '100m', memory: '256Mi'],
                limits: [cpu: '200m', memory: '512Mi']
            ]
        ],
        staging: [
            url: 'https://staging-api.example.com',
            namespace: 'staging',
            replicas: 2,
            resources: [
                requests: [cpu: '200m', memory: '512Mi'],
                limits: [cpu: '400m', memory: '1Gi']
            ]
        ],
        prod: [
            url: 'https://api.example.com',
            namespace: 'production',
            replicas: 3,
            resources: [
                requests: [cpu: '500m', memory: '1Gi'],
                limits: [cpu: '1', memory: '2Gi']
            ]
        ]
    ]
    
    return configs[environment] ?: error("Invalid environment: ${environment}")
}
```

### 2. Utility Functions

```groovy
// vars/utils.groovy
def getGitCommit() {
    return sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
}

def getGitBranch() {
    return sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
}

def getTimestamp() {
    return new Date().format('yyyyMMdd-HHmmss')
}

def getBuildTag() {
    def commit = getGitCommit()[0..7]
    def timestamp = getTimestamp()
    return "${timestamp}-${commit}"
}

def validateEnvironment(String env) {
    def validEnvs = globalConfig().environments
    if (!(env in validEnvs)) {
        error "Invalid environment '${env}'. Must be one of: ${validEnvs}"
    }
}
```

### 3. Notification Helpers

```groovy
// vars/notify.groovy
def call(Map config = [:]) {
    def defaultConfig = [
        channel: '#builds',
        color: 'good',
        message: null,
        details: [:]
    ]
    
    config = defaultConfig + config
    
    if (!config.message) {
        config.message = generateDefaultMessage()
    }
    
    sendNotification(config)
}

def success(String message) {
    call(color: 'good', message: message)
}

def warning(String message) {
    call(color: 'warning', message: message)
}

def error(String message) {
    call(color: 'danger', message: message)
}

def generateDefaultMessage() {
    def status = currentBuild.result ?: 'SUCCESS'
    def duration = currentBuild.durationString
    
    return """
        Build ${env.JOB_NAME} #${env.BUILD_NUMBER}
        Status: ${status}
        Duration: ${duration}
        URL: ${env.BUILD_URL}
    """.stripIndent()
}

def sendNotification(Map config) {
    // Implementation for different notification channels
    if (config.channel.startsWith('#')) {
        // Slack notification
        slackSend channel: config.channel,
                  color: config.color,
                  message: config.message
    } else if (config.channel.contains('@')) {
        // Email notification
        emailext body: config.message,
                 subject: "Build ${currentBuild.result}: ${env.JOB_NAME}",
                 to: config.channel
    }
}
```

## Advanced Patterns

### 1. Dynamic Configuration Loading

```groovy
// vars/configLoader.groovy
def call(String configPath = 'pipeline-config.yaml') {
    def config = readYaml file: configPath
    
    // Validate required fields
    validateConfig(config)
    
    // Add computed fields
    enrichConfig(config)
    
    return config
}

def validateConfig(Map config) {
    def requiredFields = ['app', 'version', 'environments']
    
    requiredFields.each { field ->
        if (!config.containsKey(field)) {
            error "Missing required field: ${field}"
        }
    }
}

def enrichConfig(Map config) {
    // Add build-time information
    config.buildNumber = env.BUILD_NUMBER
    config.buildUrl = env.BUILD_URL
    config.gitCommit = utils.getGitCommit()
    config.buildTag = utils.getBuildTag()
    
    // Add environment-specific configurations
    config.environments.each { env ->
        def envConfig = environmentConfig(env)
        config.environments[env] = envConfig
    }
}
```

### 2. Pipeline Templates

```groovy
// vars/standardPipeline.groovy
def call(Map config) {
    pipeline {
        agent any
        
        options {
            timeout(time: globalConfig().timeoutMinutes, unit: 'MINUTES')
            timestamps()
            buildDiscarder(logRotator(numToKeepStr: '10'))
        }
        
        environment {
            APP_NAME = config.appName
            VERSION = config.version
            BUILD_TAG = utils.getBuildTag()
        }
        
        stages {
            stage('Validate') {
                steps {
                    script {
                        validatePipelineConfig(config)
                    }
                }
            }
            
            stage('Build') {
                steps {
                    script {
                        buildApplication(config)
                    }
                }
            }
            
            stage('Test') {
                parallel {
                    stage('Unit Tests') {
                        steps {
                            runTests('unit')
                        }
                    }
                    stage('Integration Tests') {
                        steps {
                            runTests('integration')
                        }
                    }
                }
            }
            
            stage('Deploy') {
                steps {
                    script {
                        deployApplication(config)
                    }
                }
            }
        }
        
        post {
            success {
                notify.success("Pipeline completed successfully")
            }
            failure {
                notify.error("Pipeline failed")
            }
        }
    }
}
```

## Best Practices

1. **Encapsulation**
   ```groovy
   // Good: Encapsulated configuration
   def getConfig() { return config.clone() }
   
   // Bad: Exposed internal state
   def config = [:]
   ```

2. **Documentation**
   ```groovy
   /**
    * Loads and validates pipeline configuration
    *
    * @param configPath Path to the YAML configuration file
    * @return Map of validated and enriched configuration
    * @throws Exception if configuration is invalid
    */
   def call(String configPath) {
       // Implementation
   }
   ```

3. **Error Handling**
   ```groovy
   def validateConfig(Map config) {
       try {
           // Validation logic
       } catch (Exception e) {
           error "Configuration validation failed: ${e.message}"
       }
   }
   ```

## Hands-on Exercise

### Exercise 1: Configuration Management

1. Create a global configuration system
2. Implement environment-specific settings
3. Add validation logic
4. Create helper methods
5. Write tests

### Exercise 2: Pipeline Templates

1. Design a reusable pipeline template
2. Add configuration options
3. Implement notification system
4. Add parallel execution support
5. Create documentation

## Additional Resources

1. [Jenkins Shared Libraries Documentation](https://www.jenkins.io/doc/book/pipeline/shared-libraries/)
2. [Groovy Documentation](http://groovy-lang.org/documentation.html)
3. [Pipeline Steps Reference](https://www.jenkins.io/doc/pipeline/steps/)
4. [Jenkins Configuration as Code](https://jenkins.io/projects/jcasc/)

## Next Steps
- Learn about library management
- Explore advanced pipeline patterns
- Practice with real-world scenarios