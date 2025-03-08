---
layout: course
title: Error Handling and Resilience
description: Master error handling techniques and build resilient Jenkins pipelines
module: 2
order: 4
---

# Error Handling and Resilience

## Learning Objectives
- Master pipeline error handling techniques
- Implement robust error recovery mechanisms
- Build resilient pipeline architectures
- Develop effective monitoring and alerting strategies

## Understanding Pipeline Failures

### Common Pipeline Failure Points
1. **Build Failures**
   - Compilation errors
   - Missing dependencies
   - Resource constraints

2. **Test Failures**
   - Failed unit tests
   - Integration test issues
   - Performance test thresholds

3. **Deployment Issues**
   - Environment configuration
   - Network problems
   - Service dependencies

## Error Handling Techniques

### 1. Basic Error Handling

```groovy
pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                script {
                    try {
                        sh 'mvn clean package'
                    } catch (Exception e) {
                        echo "Build failed: ${e.message}"
                        currentBuild.result = 'FAILURE'
                        error "Build stage failed"
                    }
                }
            }
        }
    }
}
```

### 2. Advanced Error Recovery

```groovy
pipeline {
    agent any
    
    environment {
        MAX_RETRIES = 3
        RETRY_DELAY = 60 // seconds
    }
    
    stages {
        stage('Deploy with Retry') {
            steps {
                script {
                    def retryCount = 0
                    def deployed = false
                    
                    while (!deployed && retryCount < MAX_RETRIES) {
                        try {
                            deploy()
                            deployed = true
                        } catch (Exception e) {
                            retryCount++
                            if (retryCount < MAX_RETRIES) {
                                echo "Deployment failed, attempt ${retryCount} of ${MAX_RETRIES}"
                                sleep(RETRY_DELAY)
                            } else {
                                error "Deployment failed after ${MAX_RETRIES} attempts"
                            }
                        }
                    }
                }
            }
        }
    }
}

def deploy() {
    // Deployment logic here
    sh './deploy.sh'
}
```

### 3. Parallel Error Handling

```groovy
pipeline {
    agent any
    
    stages {
        stage('Parallel Tests') {
            steps {
                script {
                    def testResults = [:]
                    
                    parallel(
                        'Unit Tests': {
                            try {
                                sh 'mvn test'
                                testResults['unit'] = 'SUCCESS'
                            } catch (Exception e) {
                                testResults['unit'] = 'FAILURE'
                                throw e
                            }
                        },
                        'Integration Tests': {
                            try {
                                sh 'mvn integration-test'
                                testResults['integration'] = 'SUCCESS'
                            } catch (Exception e) {
                                testResults['integration'] = 'FAILURE'
                                throw e
                            }
                        },
                        failFast: false
                    )
                    
                    // Analysis of test results
                    def failedTests = testResults.findAll { it.value == 'FAILURE' }
                    if (failedTests) {
                        error "Tests failed: ${failedTests.keySet().join(', ')}"
                    }
                }
            }
        }
    }
}
```

## Building Resilient Pipelines

### 1. Timeout Handling

```groovy
pipeline {
    agent any
    
    options {
        timeout(time: 1, unit: 'HOURS')
    }
    
    stages {
        stage('Long Running Process') {
            steps {
                timeout(time: 30, unit: 'MINUTES') {
                    script {
                        try {
                            sh './long-running-process.sh'
                        } catch (org.jenkinsci.plugins.workflow.steps.TimeoutStepExecution.ExceededTimeout e) {
                            echo "Process exceeded timeout"
                            // Cleanup or recovery actions
                            error "Process timed out"
                        }
                    }
                }
            }
        }
    }
}
```

### 2. Resource Management

```groovy
pipeline {
    agent any
    
    environment {
        MAX_MEMORY = '4G'
        MAX_CPU = '2'
    }
    
    stages {
        stage('Resource-Intensive Task') {
            steps {
                script {
                    try {
                        sh """
                            docker run \
                                --memory=${MAX_MEMORY} \
                                --cpus=${MAX_CPU} \
                                my-app:latest
                        """
                    } catch (Exception e) {
                        if (e.message.contains('insufficient memory')) {
                            echo "Insufficient resources, attempting cleanup"
                            sh 'docker system prune -f'
                            error "Resource allocation failed"
                        } else {
                            throw e
                        }
                    }
                }
            }
        }
    }
}
```

### 3. Network Resilience

```groovy
pipeline {
    agent any
    
    environment {
        CURL_RETRY = '5'
        CURL_RETRY_DELAY = '10'
        CURL_TIMEOUT = '30'
    }
    
    stages {
        stage('API Integration') {
            steps {
                script {
                    def response = sh(
                        script: """
                            curl \
                                --retry ${CURL_RETRY} \
                                --retry-delay ${CURL_RETRY_DELAY} \
                                --max-time ${CURL_TIMEOUT} \
                                -s -w '%{http_code}' \
                                https://api.example.com/endpoint
                        """,
                        returnStdout: true
                    ).trim()
                    
                    if (response != '200') {
                        error "API request failed with status ${response}"
                    }
                }
            }
        }
    }
}
```

## Monitoring and Alerting

### 1. Pipeline Metrics

```groovy
pipeline {
    agent any
    
    environment {
        BUILD_START_TIME = System.currentTimeMillis()
    }
    
    stages {
        stage('Build and Test') {
            steps {
                script {
                    def stageStartTime = System.currentTimeMillis()
                    
                    try {
                        sh 'mvn clean package'
                    } finally {
                        def duration = System.currentTimeMillis() - stageStartTime
                        recordMetric('build_duration', duration)
                    }
                }
            }
        }
    }
    
    post {
        always {
            script {
                def totalDuration = System.currentTimeMillis() - BUILD_START_TIME
                recordMetric('total_build_duration', totalDuration)
                
                // Send metrics to monitoring system
                sendMetricsToPrometheus()
            }
        }
    }
}

def recordMetric(String name, Object value) {
    echo "METRIC ${name}=${value}"
    // Implementation to store metric
}

def sendMetricsToPrometheus() {
    // Implementation to send metrics to Prometheus
}
```

### 2. Alert Integration

```groovy
pipeline {
    agent any
    
    environment {
        SLACK_CHANNEL = '#deployments'
        PAGERDUTY_SERVICE = 'PROD-PIPELINE'
    }
    
    stages {
        stage('Critical Operation') {
            steps {
                script {
                    try {
                        performCriticalOperation()
                    } catch (Exception e) {
                        notifyFailure(e)
                        throw e
                    }
                }
            }
        }
    }
    
    post {
        failure {
            script {
                // Slack notification
                slackSend(
                    channel: SLACK_CHANNEL,
                    color: 'danger',
                    message: "Pipeline failed: ${currentBuild.fullDisplayName}"
                )
                
                // PagerDuty incident
                pagerduty(
                    serviceKey: PAGERDUTY_SERVICE,
                    incidentKey: "${env.JOB_NAME}-${env.BUILD_NUMBER}",
                    description: "Pipeline failure in ${env.JOB_NAME}",
                    details: "Build URL: ${env.BUILD_URL}"
                )
            }
        }
    }
}

def performCriticalOperation() {
    // Critical operation implementation
}

def notifyFailure(Exception e) {
    def errorDetails = [
        job: env.JOB_NAME,
        build: env.BUILD_NUMBER,
        error: e.message,
        stage: env.STAGE_NAME,
        url: env.BUILD_URL
    ]
    
    // Send detailed error notification
    emailext(
        subject: "Pipeline Failure: ${env.JOB_NAME}",
        body: generateErrorReport(errorDetails),
        to: 'team@example.com'
    )
}

def generateErrorReport(Map details) {
    // Generate detailed HTML error report
    return """
        <h2>Pipeline Failure Report</h2>
        <p>Job: ${details.job}</p>
        <p>Build: ${details.build}</p>
        <p>Stage: ${details.stage}</p>
        <p>Error: ${details.error}</p>
        <p><a href="${details.url}">Build Details</a></p>
    """
}
```

## Best Practices

### 1. Error Prevention
- Implement input validation
- Use environment checks
- Verify dependencies
- Test error scenarios

### 2. Error Recovery
- Implement graceful degradation
- Use circuit breakers
- Implement fallback mechanisms
- Clean up resources

### 3. Monitoring
- Track error rates
- Monitor performance metrics
- Set up alerts
- Maintain audit logs

## Exercises

### Exercise 1: Implement Resilient Deployment Pipeline

Create a pipeline that implements various resilience patterns:

```groovy
pipeline {
    agent any
    
    environment {
        APP_NAME = 'resilient-app'
        MAX_RETRIES = 3
        HEALTH_CHECK_RETRIES = 5
        HEALTH_CHECK_DELAY = 10
    }
    
    stages {
        stage('Deploy') {
            steps {
                script {
                    def deployed = false
                    def attempts = 0
                    
                    while (!deployed && attempts < MAX_RETRIES) {
                        try {
                            // Deploy application
                            deploy()
                            
                            // Verify deployment
                            if (verifyDeployment()) {
                                deployed = true
                            } else {
                                throw new Exception("Deployment verification failed")
                            }
                        } catch (Exception e) {
                            attempts++
                            if (attempts < MAX_RETRIES) {
                                echo "Deployment attempt ${attempts} failed, retrying..."
                                sleep(time: 30, unit: 'SECONDS')
                            } else {
                                error "Deployment failed after ${MAX_RETRIES} attempts"
                            }
                        }
                    }
                }
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    def healthy = false
                    def checks = 0
                    
                    while (!healthy && checks < HEALTH_CHECK_RETRIES) {
                        try {
                            def status = sh(
                                script: "curl -s -w '%{http_code}' http://localhost:8080/health",
                                returnStdout: true
                            ).trim()
                            
                            if (status == '200') {
                                healthy = true
                                echo "Application is healthy"
                            } else {
                                throw new Exception("Health check failed with status ${status}")
                            }
                        } catch (Exception e) {
                            checks++
                            if (checks < HEALTH_CHECK_RETRIES) {
                                echo "Health check attempt ${checks} failed, retrying..."
                                sleep(time: HEALTH_CHECK_DELAY, unit: 'SECONDS')
                            } else {
                                error "Health check failed after ${HEALTH_CHECK_RETRIES} attempts"
                            }
                        }
                    }
                }
            }
        }
    }
    
    post {
        failure {
            script {
                // Rollback on failure
                try {
                    rollback()
                } catch (Exception e) {
                    echo "Rollback failed: ${e.message}"
                }
                
                // Notify team
                notifyFailure()
            }
        }
        success {
            script {
                notifySuccess()
            }
        }
    }
}

def deploy() {
    // Deployment implementation
    sh './deploy.sh'
}

def verifyDeployment() {
    // Deployment verification logic
    def status = sh(
        script: './verify-deployment.sh',
        returnStatus: true
    )
    return status == 0
}

def rollback() {
    // Rollback implementation
    sh './rollback.sh'
}

def notifyFailure() {
    // Failure notification implementation
    emailext(
        subject: "[${APP_NAME}] Deployment Failed",
        body: "Deployment of ${APP_NAME} failed. Please check the build logs.",
        to: 'team@example.com'
    )
}

def notifySuccess() {
    // Success notification implementation
    slackSend(
        channel: '#deployments',
        color: 'good',
        message: "