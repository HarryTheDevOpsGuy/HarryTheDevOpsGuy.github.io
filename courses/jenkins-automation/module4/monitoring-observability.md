---
layout: course
title: Jenkins Monitoring and Observability
description: Master Jenkins monitoring, metrics collection, and observability practices
module: 4
order: 2
---

# Jenkins Monitoring and Observability

## Introduction to Monitoring

### Why Monitor Jenkins?
- Performance optimization
- Resource utilization
- Capacity planning
- Problem detection
- Security monitoring

### Key Metrics
1. Build Statistics
2. Queue Length
3. Resource Usage
4. Response Time
5. Error Rates

## Monitoring Infrastructure

### Metrics Collection
```groovy
// Prometheus Configuration
jenkins:
  metrics:
    prometheus:
      enabled: true
      path: /prometheus
      defaultMetrics:
        enabled: true
      perBuildMetrics:
        enabled: true
      perPipelineMetrics:
        enabled: true
```

### Grafana Dashboard Setup
```yaml
# Grafana Dashboard Configuration
apiVersion: 1
providers:
- name: 'Jenkins'
  orgId: 1
  folder: 'Jenkins'
  type: file
  options:
    path: /var/lib/grafana/dashboards
```

## Performance Monitoring

### System Metrics
```groovy
// System Metrics Collection
pipeline {
    agent any
    options {
        timeout(time: 1, unit: 'HOURS')
        timestamps()
    }
    stages {
        stage('Monitor') {
            steps {
                script {
                    def metrics = [
                        cpu: sh(script: 'top -bn1 | grep "Cpu(s)" | awk "{print \$2}"', returnStdout: true).trim(),
                        memory: sh(script: 'free -m | grep Mem | awk "{print \$3/\$2 * 100}"', returnStdout: true).trim(),
                        disk: sh(script: 'df -h / | tail -1 | awk "{print \$5}"', returnStdout: true).trim()
                    ]
                    
                    echo "System Metrics:\nCPU: ${metrics.cpu}%\nMemory: ${metrics.memory}%\nDisk: ${metrics.disk}"
                }
            }
        }
    }
}
```

### Build Performance
```groovy
// Build Performance Analysis
node {
    stage('Analyze Build Performance') {
        def buildTime = currentBuild.duration
        def queueTime = currentBuild.queueDuration
        
        echo "Build Statistics:"
        echo "Build Time: ${buildTime}ms"
        echo "Queue Time: ${queueTime}ms"
        
        if (buildTime > 300000) { // 5 minutes
            warning "Build time exceeded threshold"
        }
    }
}
```

## Resource Monitoring

### Agent Monitoring
```groovy
// Agent Resource Monitoring
jenkins:
  nodes:
    monitoring:
      interval: 10
      collectors:
        - type: memory
          warning: 85
          error: 95
        - type: diskSpace
          warning: 80
          error: 90
        - type: responseTime
          warning: 5000
          error: 10000
```

### Queue Management
```groovy
// Queue Monitoring Pipeline
pipeline {
    agent any
    stages {
        stage('Monitor Queue') {
            steps {
                script {
                    def queue = Jenkins.instance.queue
                    def queueItems = queue.items.length
                    
                    echo "Current Queue Length: ${queueItems}"
                    
                    if (queueItems > 10) {
                        emailext (
                            subject: "Jenkins Queue Alert",
                            body: "Queue length has exceeded threshold: ${queueItems} items",
                            to: 'admin@example.com'
                        )
                    }
                }
            }
        }
    }
}
```

## Log Management

### Log Configuration
```properties
# logging.properties
handlers=java.util.logging.FileHandler
java.util.logging.FileHandler.pattern=/var/log/jenkins/jenkins.log
java.util.logging.FileHandler.limit=50000000
java.util.logging.FileHandler.count=10
java.util.logging.FileHandler.formatter=java.util.logging.SimpleFormatter
```

### Log Analysis
```groovy
// Log Analysis Pipeline
pipeline {
    agent any
    stages {
        stage('Analyze Logs') {
            steps {
                script {
                    def errorCount = sh(
                        script: 'grep -c "ERROR" /var/log/jenkins/jenkins.log',
                        returnStdout: true
                    ).trim().toInteger()
                    
                    if (errorCount > 100) {
                        error "High number of errors detected: ${errorCount}"
                    }
                    
                    // Parse and analyze specific error patterns
                    def outOfMemoryErrors = sh(
                        script: 'grep -c "OutOfMemoryError" /var/log/jenkins/jenkins.log',
                        returnStdout: true
                    ).trim().toInteger()
                    
                    if (outOfMemoryErrors > 0) {
                        warning "OutOfMemoryErrors detected: ${outOfMemoryErrors}"
                    }
                }
            }
        }
    }
}
```

## Alerting and Notifications

### Alert Configuration
```groovy
// Alert Configuration
jenkins:
  alerts:
    email:
      recipients: admin@example.com
      threshold:
        error: immediate
        warning: daily
    slack:
      channel: '#jenkins-alerts'
      token: '${SLACK_TOKEN}'
```

### Custom Notifications
```groovy
// Custom Notification Pipeline
def notifyBuildStatus(String status) {
    // Slack notification
    slackSend (
        channel: '#jenkins-builds',
        color: status == 'SUCCESS' ? 'good' : 'danger',
        message: "Build ${status}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
    )
    
    // Email notification
    emailext (
        subject: "Build ${status}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
        body: """Build Status: ${status}
Job: ${env.JOB_NAME}
Build Number: ${env.BUILD_NUMBER}
Build URL: ${env.BUILD_URL}""",
        recipientProviders: [[$class: 'DevelopersRecipientProvider']]
    )
}
```

## Visualization and Dashboards

### Grafana Dashboard
```json
{
  "dashboard": {
    "id": null,
    "title": "Jenkins Overview",
    "panels": [
      {
        "title": "Build Success Rate",
        "type": "graph",
        "datasource": "Prometheus",
        "targets": [
          {
            "expr": "jenkins_builds_success_rate",
            "legendFormat": "Success Rate"
          }
        ]
      },
      {
        "title": "Queue Length",
        "type": "gauge",
        "datasource": "Prometheus",
        "targets": [
          {
            "expr": "jenkins_queue_size"
          }
        ]
      }
    ]
  }
}
```

### Custom Reports
```groovy
// Custom Reporting Pipeline
pipeline {
    agent any
    stages {
        stage('Generate Report') {
            steps {
                script {
                    def report = generateBuildReport()
                    writeFile file: 'build-report.html', text: report
                    publishHTML [
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: '.',
                        reportFiles: 'build-report.html',
                        reportName: 'Build Performance Report'
                    ]
                }
            }
        }
    }
}

def generateBuildReport() {
    // Generate HTML report with build statistics
    return """
        <html>
            <head><title>Build Report</title></head>
            <body>
                <h1>Build Performance Report</h1>
                <p>Build Time: ${currentBuild.duration}ms</p>
                <p>Result: ${currentBuild.result}</p>
            </body>
        </html>
    """
}
```

## Best Practices

### Monitoring Checklist
1. Set up basic metrics collection
2. Configure alerting thresholds
3. Implement log rotation
4. Create visualization dashboards
5. Regular metric review
6. Automated reporting
7. Performance baselines
8. Capacity planning

### Implementation Guide
1. Install monitoring plugins
2. Configure metrics collection
3. Set up dashboards
4. Configure alerts
5. Implement log management
6. Create reports
7. Regular maintenance

## Hands-on Exercise

### Exercise 1: Monitoring Setup
1. Install Prometheus plugin
2. Configure metrics collection
3. Set up Grafana dashboard
4. Configure alerts
5. Test monitoring system

### Exercise 2: Custom Monitoring
1. Create custom metrics
2. Implement monitoring pipeline
3. Set up notifications
4. Create custom dashboard
5. Test and verify

## Assessment

### Knowledge Check
1. What are key Jenkins metrics to monitor?
2. How do you implement metrics collection?
3. What are effective alerting strategies?
4. How do you analyze performance data?

### Practice Tasks
1. Set up monitoring
2. Configure alerts
3. Create dashboards
4. Implement reporting

## Additional Resources

### Documentation
- [Jenkins Monitoring](https://www.jenkins.io/doc/book/system-administration/monitoring/)
- [Metrics Plugin](https://plugins.jenkins.io/metrics/)
- [Prometheus Plugin](https://plugins.jenkins.io/prometheus/)

### Best Practices
- Regular monitoring
- Proactive alerting
- Performance optimization
- Capacity planning

## Next Steps
- Review monitoring concepts
- Practice implementation
- Explore advanced features
- Study real-world scenarios