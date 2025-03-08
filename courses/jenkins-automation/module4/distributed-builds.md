---
layout: course
title: Distributed Builds and Scalability
description: Master Jenkins distributed build architecture and scalability patterns
module: 4
order: 3
---

# Distributed Builds and Scalability

## Introduction to Distributed Builds

### Why Distributed Builds?
- Improved performance
- Resource optimization
- Parallel execution
- Load balancing
- High availability

### Architecture Overview
- Master-agent model
- Communication protocols
- Resource allocation
- Job distribution
- Build coordination

## Agent Configuration

### Static Agents
```groovy
// Static Agent Configuration
jenkins:
  nodes:
    - permanent:
        name: "build-agent-1"
        remoteFS: "/home/jenkins"
        launcher:
          ssh:
            host: "agent1.example.com"
            credentialsId: "agent-ssh-key"
            port: 22
            jvmOptions: "-Xmx2g"
```

### Dynamic Agents
```groovy
// Kubernetes Dynamic Agent
pipeline {
    agent {
        kubernetes {
            yaml '''
                apiVersion: v1
                kind: Pod
                spec:
                  containers:
                  - name: maven
                    image: maven:3.8.4-openjdk-11
                    command:
                    - cat
                    tty: true
                    resources:
                      requests:
                        memory: "2Gi"
                        cpu: "1"
                      limits:
                        memory: "4Gi"
                        cpu: "2"
            '''
        }
    }
    stages {
        stage('Build') {
            steps {
                container('maven') {
                    sh 'mvn clean package'
                }
            }
        }
    }
}
```

## Load Balancing

### Load Distribution Strategies
```groovy
// Load Balancer Configuration
jenkins:
  clouds:
    kubernetes:
      templates:
        - name: "dynamic-agent"
          label: "build-pod"
          idleMinutes: 10
          containers:
            - name: "jnlp"
              image: "jenkins/inbound-agent:4.11.2-4"
              resources:
                requests:
                  cpu: "500m"
                  memory: "1Gi"
          nodeSelector:
            node-role: "builder"
```

### Resource Allocation
```groovy
// Resource-based Job Assignment
pipeline {
    agent {
        label 'high-cpu || high-memory'
    }
    options {
        throttle(['heavy-jobs'])
    }
    stages {
        stage('Resource-Intensive Build') {
            steps {
                sh '''
                    # Resource-intensive operation
                    make -j8 all
                '''
            }
        }
    }
}
```

## High Availability

### Master Redundancy
```yaml
# High Availability Configuration
apiVersion: v1
kind: StatefulSet
metadata:
  name: jenkins-ha
spec:
  replicas: 2
  selector:
    matchLabels:
      app: jenkins-ha
  template:
    metadata:
      labels:
        app: jenkins-ha
    spec:
      containers:
      - name: jenkins
        image: jenkins/jenkins:lts
        ports:
        - containerPort: 8080
        volumeMounts:
        - name: jenkins-home
          mountPath: /var/jenkins_home
  volumeClaimTemplates:
  - metadata:
      name: jenkins-home
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 50Gi
```

### Failover Configuration
```groovy
// Failover Pipeline Configuration
properties([
    durabilityHint('PERFORMANCE_OPTIMIZED'),
    disableConcurrentBuilds(),
    buildDiscarder(logRotator(numToKeepStr: '10'))
])

pipeline {
    agent any
    options {
        timeout(time: 1, unit: 'HOURS')
        retry(3)
    }
    stages {
        stage('Build with Failover') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    script {
                        def agents = Jenkins.instance.nodes.collect { it.nodeName }
                        def currentAgent = env.NODE_NAME
                        
                        if (!agents.contains(currentAgent)) {
                            error "Agent ${currentAgent} not available"
                        }
                    }
                }
            }
        }
    }
}
```

## Performance Optimization

### Build Caching
```groovy
// Build Cache Configuration
pipeline {
    agent any
    options {
        skipDefaultCheckout()
    }
    stages {
        stage('Checkout with Cache') {
            steps {
                cache(maxCacheSize: 250, caches: [
                    [$class: 'ArbitraryFileCache',
                     includes: '**/*.jar',
                     path: '.m2/repository']
                ]) {
                    git url: 'https://github.com/example/project.git'
                    sh 'mvn clean package'
                }
            }
        }
    }
}
```

### Parallel Execution
```groovy
// Parallel Build Pipeline
pipeline {
    agent none
    stages {
        stage('Parallel Builds') {
            parallel {
                stage('Unit Tests') {
                    agent { label 'test-agent' }
                    steps {
                        sh 'mvn test'
                    }
                }
                stage('Integration Tests') {
                    agent { label 'integration-agent' }
                    steps {
                        sh 'mvn verify'
                    }
                }
                stage('Security Scan') {
                    agent { label 'security-agent' }
                    steps {
                        sh 'run-security-scan'
                    }
                }
            }
        }
    }
}
```

## Monitoring and Management

### Agent Health Checks
```groovy
// Agent Health Check Pipeline
pipeline {
    agent none
    stages {
        stage('Agent Health Check') {
            steps {
                script {
                    def agents = Jenkins.instance.nodes
                    agents.each { agent ->
                        def computer = agent.computer
                        if (computer.offline) {
                            echo "Agent ${agent.nodeName} is offline"
                            try {
                                computer.connect(false)
                            } catch (Exception e) {
                                error "Failed to connect to ${agent.nodeName}: ${e.message}"
                            }
                        }
                    }
                }
            }
        }
    }
}
```

### Resource Monitoring
```groovy
// Resource Monitoring Pipeline
pipeline {
    agent any
    triggers { cron('H/15 * * * *') }
    stages {
        stage('Monitor Resources') {
            steps {
                script {
                    def metrics = [
                        activeExecutors: Jenkins.instance.computers.sum { it.executors.size() },
                        busyExecutors: Jenkins.instance.computers.sum { it.executors.count { ex -> ex.isBusy() } },
                        queueLength: Jenkins.instance.queue.items.length
                    ]
                    
                    echo "Resource Metrics:"
                    echo "Active Executors: ${metrics.activeExecutors}"
                    echo "Busy Executors: ${metrics.busyExecutors}"
                    echo "Queue Length: ${metrics.queueLength}"
                    
                    if (metrics.queueLength > 10) {
                        emailext (
                            subject: "Jenkins Queue Alert",
                            body: "High queue length detected: ${metrics.queueLength} items",
                            to: 'admin@example.com'
                        )
                    }
                }
            }
        }
    }
}
```

## Best Practices

### Scalability Checklist
1. Proper agent sizing
2. Resource allocation
3. Load balancing
4. Caching strategy
5. Network optimization
6. Monitoring setup
7. Failover planning
8. Performance tuning

### Implementation Guide
1. Configure master node
2. Set up agents
3. Implement load balancing
4. Configure high availability
5. Set up monitoring
6. Optimize performance
7. Regular maintenance

## Hands-on Exercise

### Exercise 1: Agent Setup
1. Configure static agent
2. Set up dynamic agents
3. Implement load balancing
4. Test agent connectivity
5. Monitor performance

### Exercise 2: High Availability
1. Configure master redundancy
2. Set up failover
3. Implement monitoring
4. Test failover scenarios
5. Verify recovery

## Assessment

### Knowledge Check
1. What are distributed build benefits?
2. How do you configure agents?
3. What are load balancing strategies?
4. How do you implement high availability?

### Practice Tasks
1. Set up distributed builds
2. Configure load balancing
3. Implement high availability
4. Monitor performance

## Additional Resources

### Documentation
- [Distributed Builds](https://www.jenkins.io/doc/book/scaling/)
- [Managing Nodes](https://www.jenkins.io/doc/book/managing/nodes/)
- [High Availability](https://www.jenkins.io/doc/book/scaling/high-availability/)

### Best Practices
- Regular maintenance
- Performance monitoring
- Resource optimization
- Capacity planning

## Next Steps
- Review distributed concepts
- Practice implementation
- Explore advanced features
- Study real-world scenarios