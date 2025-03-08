---
layout: course
title: Pipeline Types and Syntax
description: Master different Jenkins pipeline types and their syntax patterns
module: 2
order: 2
---

# Pipeline Types and Syntax

## Learning Objectives
- Understand the differences between Declarative and Scripted pipelines
- Master advanced pipeline syntax and structures
- Learn pipeline validation and troubleshooting
- Implement complex pipeline configurations

## Introduction to Pipeline Types

### Declarative vs Scripted Pipelines
Jenkins offers two syntax types for defining pipelines: Declarative and Scripted. Each has its own strengths and use cases.

#### Declarative Pipeline
Declarative pipelines provide a more structured and opinionated way to write Jenkins pipelines.

```groovy
pipeline {
    agent any
    
    environment {
        MAVEN_HOME = tool 'Maven-3.8.6'
        PATH = "${MAVEN_HOME}/bin:${PATH}"
    }
    
    stages {
        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }
        
        stage('Test') {
            steps {
                sh 'mvn test'
            }
            post {
                always {
                    junit '**/target/surefire-reports/*.xml'
                }
            }
        }
    }
}
```

#### Scripted Pipeline
Scripted pipelines offer more flexibility and programmatic control.

```groovy
node {
    def mvnHome = tool 'Maven-3.8.6'
    
    try {
        stage('Checkout') {
            checkout scm
        }
        
        stage('Build') {
            withEnv(["PATH+MAVEN=${mvnHome}/bin"]) {
                sh 'mvn clean package'
            }
        }
        
        stage('Test') {
            try {
                sh 'mvn test'
            } finally {
                junit '**/target/surefire-reports/*.xml'
            }
        }
    } catch (e) {
        currentBuild.result = 'FAILED'
        throw e
    }
}
```

## Advanced Pipeline Syntax

### Directives and Steps

#### Pipeline Directives
Directives provide configuration options for your pipeline.

1. **agent** - Specifies where the pipeline will execute
```groovy
agent {
    docker {
        image 'maven:3.8.6-openjdk-11'
        args '-v $HOME/.m2:/root/.m2'
    }
}
```

2. **environment** - Define environment variables
```groovy
environment {
    DEPLOY_ENV = 'staging'
    API_ENDPOINT = credentials('api-endpoint')
}
```

3. **options** - Pipeline-specific options
```groovy
options {
    timeout(time: 1, unit: 'HOURS')
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '10'))
}
```

4. **parameters** - Build parameters
```groovy
parameters {
    string(name: 'DEPLOY_ENV', defaultValue: 'staging', description: 'Deployment environment')
    choice(name: 'REGION', choices: ['us-east-1', 'us-west-2', 'eu-west-1'], description: 'AWS region')
    booleanParam(name: 'RUN_TESTS', defaultValue: true, description: 'Run test suite')
}
```

### Advanced Stage Configurations

#### Parallel Stages
```groovy
stage('Parallel Tests') {
    parallel {
        stage('Unit Tests') {
            steps {
                sh 'mvn test'
            }
        }
        stage('Integration Tests') {
            steps {
                sh 'mvn integration-test'
            }
        }
        stage('Security Scan') {
            steps {
                sh 'run-security-scan.sh'
            }
        }
    }
}
```

#### Matrix Stages
```groovy
matrix {
    axes {
        axis {
            name 'PLATFORM'
            values 'linux', 'windows', 'mac'
        }
        axis {
            name 'BROWSER'
            values 'chrome', 'firefox', 'safari'
        }
    }
    stages {
        stage('E2E Tests') {
            steps {
                sh "./run-tests.sh ${PLATFORM} ${BROWSER}"
            }
        }
    }
}
```

### Advanced Pipeline Features

#### Shared Libraries Integration
```groovy
@Library('my-shared-library') _

pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                script {
                    def builder = new org.example.Builder()
                    builder.compile()
                }
            }
        }
    }
}
```

#### Dynamic Stage Generation
```groovy
def environments = ['dev', 'staging', 'prod']

pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                sh 'mvn package'
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    environments.each { env ->
                        stage("Deploy to ${env}") {
                            when { expression { params.DEPLOY_ENV == env } }
                            steps {
                                sh "./deploy.sh ${env}"
                            }
                        }
                    }
                }
            }
        }
    }
}
```

## Pipeline Validation and Testing

### Syntax Validation

#### Using Jenkins CLI
```bash
java -jar jenkins-cli.jar -s http://jenkins-url/ declarative-linter < Jenkinsfile
```

#### Using IDE Plugins
Many IDEs offer Jenkins pipeline syntax validation:
- IntelliJ IDEA with Jenkins Pipeline Plugin
- VS Code with Jenkins Pipeline Linter Connector

### Pipeline Unit Testing

#### JenkinsPipelineUnit Framework
```groovy
// Test case example
default_pipeline_test.groovy

import com.lesfurets.jenkins.unit.*

class DefaultPipelineTest extends BasePipelineTest {
    def script
    
    @Override
    @Before
    void setUp() {
        super.setUp()
        script = loadScript("vars/defaultPipeline.groovy")
    }
    
    @Test
    void testBuildStage() {
        when(script.sh("mvn clean package")).thenReturn(0)
        
        script.call()
        
        assertJobStatusSuccess()
        assertStepExecuted("mvn clean package")
    }
}
```

## Best Practices and Patterns

### Code Organization

1. **Modular Pipeline Structure**
```groovy
// Jenkinsfile
pipeline {
    agent any
    
    stages {
        stage('Initialize') {
            steps {
                script {
                    env.BUILD_VERSION = sh(script: 'git describe --tags', returnStdout: true).trim()
                }
            }
        }
        
        stage('Build and Test') {
            parallel {
                stage('Build') {
                    steps {
                        buildModule()
                    }
                }
                stage('Test') {
                    steps {
                        runTests()
                    }
                }
            }
        }
        
        stage('Deploy') {
            when { branch 'main' }
            steps {
                deployApplication()
            }
        }
    }
}

// vars/buildModule.groovy
def call() {
    sh 'mvn clean package'
}

// vars/runTests.groovy
def call() {
    sh 'mvn test'
    junit '**/target/surefire-reports/*.xml'
}

// vars/deployApplication.groovy
def call() {
    withCredentials([string(credentialsId: 'deploy-token', variable: 'TOKEN')]) {
        sh "./deploy.sh ${env.BUILD_VERSION} ${TOKEN}"
    }
}
```

### Pipeline Security

1. **Credential Handling**
```groovy
pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'registry.example.com'
    }
    
    stages {
        stage('Build and Push') {
            steps {
                script {
                    withCredentials([
                        usernamePassword(credentialsId: 'docker-registry-credentials',
                                      usernameVariable: 'DOCKER_USER',
                                      passwordVariable: 'DOCKER_PASS'),
                        string(credentialsId: 'api-key', variable: 'API_KEY')
                    ]) {
                        sh """
                            docker build -t ${DOCKER_REGISTRY}/myapp:${BUILD_NUMBER} .
                            echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin ${DOCKER_REGISTRY}
                            docker push ${DOCKER_REGISTRY}/myapp:${BUILD_NUMBER}
                        """
                    }
                }
            }
        }
    }
}
```

## Exercises and Practice

### Exercise 1: Create a Multi-Environment Pipeline
Create a pipeline that builds and deploys an application to different environments based on branch patterns:

```groovy
pipeline {
    agent any
    
    environment {
        APP_NAME = 'my-application'
    }
    
    stages {
        stage('Determine Environment') {
            steps {
                script {
                    switch(env.BRANCH_NAME) {
                        case 'main':
                            env.DEPLOY_ENV = 'production'
                            break
                        case ~/^release\/.*$/:
                            env.DEPLOY_ENV = 'staging'
                            break
                        default:
                            env.DEPLOY_ENV = 'development'
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }
        
        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'mvn test'
                    }
                }
                stage('Integration Tests') {
                    when { not { environment name: 'DEPLOY_ENV', value: 'development' } }
                    steps {
                        sh 'mvn integration-test'
                    }
                }
            }
        }
        
        stage('Security Scan') {
            when { environment name: 'DEPLOY_ENV', value: 'production' }
            steps {
                sh 'run-security-scan.sh'
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    def deployScript = load "scripts/deploy-${env.DEPLOY_ENV}.groovy"
                    deployScript.deploy(APP_NAME)
                }
            }
        }
    }
    
    post {
        always {
            junit '**/target/surefire-reports/*.xml'
            archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
        }
        success {
            slackSend channel: '#deployments',
                      color: 'good',
                      message: "Successfully deployed ${APP_NAME} to ${env.DEPLOY_ENV}"
        }
        failure {
            slackSend channel: '#deployments',
                      color: 'danger',
                      message: "Failed to deploy ${APP_NAME} to ${env.DEPLOY_ENV}"
        }
    }
}
```

### Exercise 2: Implement Pipeline with Approval Gates

```groovy
pipeline {
    agent any
    
    environment {
        APP_NAME = 'my-application'
        VERSION = sh(script: 'git describe --tags', returnStdout: true).trim()
    }
    
    stages {
        stage('Build and Test') {
            stages {
                stage('Build') {
                    steps {
                        sh 'mvn clean package'
                    }
                }
                
                stage('Test') {
                    steps {
                        sh 'mvn test'
                    }
                }
            }
        }
        
        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    script {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            error "Pipeline aborted due to quality gate failure: ${qg.status}"
                        }
                    }
                }
            }
        }
        
        stage('Staging Deployment') {
            steps {
                script {
                    deploy('staging')
                }
            }
        }
        
        stage('Integration Tests') {
            steps {
                sh 'mvn integration-test'
            }
        }
        
        stage('Production Approval') {
            when { branch 'main' }
            steps {
                script {
                    def deploymentApproval = input(
                        message: "Deploy to Production?",
                        ok: "Deploy",
                        parameters: [
                            string(name: 'APPROVER_NAME', defaultValue: '', description: 'Your name'),
                            text(name: 'APPROVAL_REASON', defaultValue: '', description: 'Reason for approval')
                        ]
                    )
                    
                    env.APPROVER_NAME = deploymentApproval.APPROVER_NAME
                    env.APPROVAL_REASON = deploymentApproval.APPROVAL_REASON
                }
            }
        }
        
        stage('Production Deployment') {
            when { branch 'main' }
            steps {
                script {
                    deploy('production')
                }
            }
        }
    }
    
    post {
        always {
            script {
                def deploymentRecord = """
                    Deployment Summary:
                    - Application: ${APP_NAME}
                    - Version: ${VERSION}
                    - Environment: ${env.DEPLOY_ENV}
                    - Status: ${currentBuild.result}