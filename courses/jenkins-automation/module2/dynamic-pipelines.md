---
layout: course
title: Dynamic Pipeline Generation
description: Learn to create and manage dynamically generated Jenkins pipelines
module: 2
order: 3
---

# Dynamic Pipeline Generation

## Learning Objectives
- Understand dynamic pipeline generation concepts
- Master programmatic pipeline creation
- Implement template-based pipeline systems
- Build scalable pipeline architectures

## Introduction to Dynamic Pipelines

### Why Dynamic Pipelines?
Dynamic pipeline generation offers several advantages:
- Reduced code duplication
- Consistent pipeline patterns
- Easier maintenance and updates
- Scalable pipeline management

## Pipeline Generation Techniques

### 1. Template-Based Generation

#### Basic Template Structure
```groovy
// pipeline-template.groovy
def call(Map config) {
    pipeline {
        agent any
        
        environment {
            APP_NAME = config.appName
            DEPLOY_ENV = config.environment
            BUILD_TOOL = config.buildTool ?: 'maven'
        }
        
        stages {
            stage('Build') {
                steps {
                    script {
                        switch(BUILD_TOOL) {
                            case 'maven':
                                sh 'mvn clean package'
                                break
                            case 'gradle':
                                sh './gradlew build'
                                break
                            default:
                                error "Unsupported build tool: ${BUILD_TOOL}"
                        }
                    }
                }
            }
            
            stage('Test') {
                steps {
                    script {
                        if (config.runTests) {
                            parallel(
                                'Unit Tests': {
                                    sh 'mvn test'
                                },
                                'Integration Tests': {
                                    sh 'mvn integration-test'
                                }
                            )
                        }
                    }
                }
            }
            
            stage('Deploy') {
                when { expression { config.deploy } }
                steps {
                    script {
                        deploy(config.deployScript)
                    }
                }
            }
        }
    }
}
```

#### Using the Template
```groovy
// Jenkinsfile
@Library('pipeline-library') _

default_pipeline([
    appName: 'my-service',
    environment: 'production',
    buildTool: 'maven',
    runTests: true,
    deploy: true,
    deployScript: 'scripts/deploy.sh'
])
```

### 2. Programmatic Generation

#### Dynamic Stage Generation
```groovy
def generateStages(Map config) {
    def stages = [:]
    
    // Build Stage
    stages['Build'] = {
        stage('Build') {
            steps {
                script {
                    buildApp(config.buildConfig)
                }
            }
        }
    }
    
    // Test Stages
    config.testTypes.each { testType ->
        stages["${testType} Tests"] = {
            stage("${testType} Tests") {
                steps {
                    script {
                        runTests(testType, config.testConfig)
                    }
                }
            }
        }
    }
    
    // Deploy Stages
    config.deployEnvironments.each { env ->
        stages["Deploy to ${env}"] = {
            stage("Deploy to ${env}") {
                when { expression { shouldDeployTo(env) } }
                steps {
                    script {
                        deploy(env, config.deployConfig)
                    }
                }
            }
        }
    }
    
    return stages
}

// Implementation
pipeline {
    agent any
    
    stages {
        stage('Pipeline Generation') {
            steps {
                script {
                    def pipelineConfig = [
                        buildConfig: [
                            tool: 'maven',
                            version: '3.8.6'
                        ],
                        testTypes: ['Unit', 'Integration', 'Performance'],
                        testConfig: [
                            coverage: true,
                            parallel: true
                        ],
                        deployEnvironments: ['dev', 'staging', 'prod'],
                        deployConfig: [
                            strategy: 'blue-green',
                            timeout: 30
                        ]
                    ]
                    
                    def stages = generateStages(pipelineConfig)
                    
                    stages.each { name, stage ->
                        stage()
                    }
                }
            }
        }
    }
}
```

### 3. Configuration-Driven Pipelines

#### YAML Configuration
```yaml
# pipeline-config.yaml
application:
  name: my-service
  type: java
  build:
    tool: maven
    version: 3.8.6
    arguments: '-DskipTests'

tests:
  unit:
    enabled: true
    coverage: 80
  integration:
    enabled: true
    environment: staging
  performance:
    enabled: true
    duration: 30

deployments:
  environments:
    - name: development
      automatic: true
      branch: develop
    - name: staging
      automatic: true
      branch: release/*
    - name: production
      automatic: false
      branch: main
      approvers:
        - team-leads
        - operations
```

#### Pipeline Implementation
```groovy
// Jenkinsfile
def loadConfig() {
    def config = readYaml file: 'pipeline-config.yaml'
    return config
}

def validateConfig(config) {
    assert config.application.name != null
    assert config.application.type in ['java', 'nodejs', 'python']
    // Add more validation as needed
}

pipeline {
    agent any
    
    environment {
        CONFIG = loadConfig()
    }
    
    stages {
        stage('Validate Configuration') {
            steps {
                script {
                    validateConfig(CONFIG)
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    def buildConfig = CONFIG.application.build
                    buildApp(buildConfig)
                }
            }
        }
        
        stage('Tests') {
            parallel {
                stage('Unit Tests') {
                    when { expression { CONFIG.tests.unit.enabled } }
                    steps {
                        script {
                            runUnitTests(CONFIG.tests.unit)
                        }
                    }
                }
                
                stage('Integration Tests') {
                    when { expression { CONFIG.tests.integration.enabled } }
                    steps {
                        script {
                            runIntegrationTests(CONFIG.tests.integration)
                        }
                    }
                }
                
                stage('Performance Tests') {
                    when { expression { CONFIG.tests.performance.enabled } }
                    steps {
                        script {
                            runPerformanceTests(CONFIG.tests.performance)
                        }
                    }
                }
            }
        }
        
        stage('Deployments') {
            steps {
                script {
                    CONFIG.deployments.environments.each { env ->
                        stage("Deploy to ${env.name}") {
                            when {
                                allOf {
                                    branch env.branch
                                    expression { shouldDeploy(env) }
                                }
                            }
                            steps {
                                script {
                                    if (!env.automatic) {
                                        approval = getApproval(env)
                                    }
                                    deploy(env)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
```

## Advanced Pipeline Generation Patterns

### 1. Pipeline Factory Pattern

```groovy
class PipelineFactory {
    static def create(String type, Map config) {
        switch(type) {
            case 'java':
                return new JavaPipeline(config)
            case 'nodejs':
                return new NodeJSPipeline(config)
            case 'python':
                return new PythonPipeline(config)
            default:
                throw new IllegalArgumentException("Unsupported pipeline type: ${type}")
        }
    }
}

class BasePipeline {
    protected Map config
    
    BasePipeline(Map config) {
        this.config = config
    }
    
    def execute() {
        pipeline {
            agent any
            
            stages {
                stage('Initialize') {
                    steps {
                        script {
                            initialize()
                        }
                    }
                }
                
                stage('Build') {
                    steps {
                        script {
                            build()
                        }
                    }
                }
                
                stage('Test') {
                    steps {
                        script {
                            test()
                        }
                    }
                }
                
                stage('Deploy') {
                    steps {
                        script {
                            deploy()
                        }
                    }
                }
            }
        }
    }
    
    // Abstract methods to be implemented by specific pipeline types
    protected abstract void initialize()
    protected abstract void build()
    protected abstract void test()
    protected abstract void deploy()
}

class JavaPipeline extends BasePipeline {
    JavaPipeline(Map config) {
        super(config)
    }
    
    @Override
    protected void initialize() {
        sh "java -version"
        sh "mvn -version"
    }
    
    @Override
    protected void build() {
        sh "mvn clean package -DskipTests"
    }
    
    @Override
    protected void test() {
        parallel(
            'Unit Tests': {
                sh 'mvn test'
            },
            'Integration Tests': {
                sh 'mvn integration-test'
            }
        )
    }
    
    @Override
    protected void deploy() {
        // Implementation specific to Java applications
    }
}
```

### 2. Pipeline Composition Pattern

```groovy
class PipelineComponent {
    String name
    Closure execution
    
    PipelineComponent(String name, Closure execution) {
        this.name = name
        this.execution = execution
    }
}

class PipelineComposer {
    private List<PipelineComponent> components = []
    
    def addComponent(PipelineComponent component) {
        components << component
    }
    
    def execute() {
        pipeline {
            agent any
            
            stages {
                script {
                    components.each { component ->
                        stage(component.name) {
                            steps {
                                script {
                                    component.execution()
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

// Usage Example
def composer = new PipelineComposer()

composer.addComponent(new PipelineComponent('Build', {
    sh 'mvn clean package'
}))

composer.addComponent(new PipelineComponent('Test', {
    parallel(
        'Unit Tests': {
            sh 'mvn test'
        },
        'Integration Tests': {
            sh 'mvn integration-test'
        }
    )
}))

composer.addComponent(new PipelineComponent('Security Scan', {
    sh 'run-security-scan.sh'
}))

composer.execute()
```

## Best Practices

### 1. Configuration Management
- Store pipeline configurations in version control
- Use environment-specific configuration files
- Implement configuration validation
- Document configuration options

### 2. Error Handling
- Implement proper error handling and recovery
- Log pipeline generation errors
- Provide meaningful error messages
- Include debugging information

### 3. Testing
- Test pipeline templates
- Validate generated pipelines
- Implement pipeline unit tests
- Test configuration changes

### 4. Documentation
- Document pipeline generation process
- Maintain configuration examples
- Include usage guidelines
- Provide troubleshooting guides

## Exercises

### Exercise 1: Create a Template-Based Pipeline

Create a pipeline template that supports multiple programming languages and build tools:

```groovy
// vars/languagePipeline.groovy
def call(Map config) {
    pipeline {
        agent any
        
        environment {
            APP_NAME = config.appName
            LANGUAGE = config.language
            BUILD_TOOL = config.buildTool
        }
        
        stages {
            stage('Validate Configuration') {
                steps {
                    script {
                        validateConfig(config)
                    }
                }
            }
            
            stage('Setup Environment') {
                steps {
                    script {
                        setupEnvironment(LANGUAGE, BUILD_TOOL)
                    }
                }
            }
            
            stage('Build') {
                steps {
                    script {
                        buildApp(LANGUAGE, BUILD_TOOL)
                    }
                }
            }
            
            stage('Test') {
                when { expression { config.runTests } }
                steps {
                    script {
                        runTests(LANGUAGE, BUILD_TOOL)
                    }
                }
            }
            
            stage('Package') {
                steps {
                    script {
                        packageApp(LANGUAGE, config.packageType)
                    }
                }
            }
            
            stage('Deploy') {
                when { expression { config.deploy } }
                steps {
                    script {
                        deployApp(config.deployConfig)
                    }
                }
            }
        }
        
        post {
            always {
                cleanWs()
            }
        }
    }
}

def validateConfig(Map config) {
    assert config.appName != null: "Application name must be specified"
    assert config.language in ['java', 'nodejs', 'python']: "Unsupported language: ${config.language}"
    assert config.buildTool != null: "Build tool must be specified"
}

def setupEnvironment(String language, String buildTool) {