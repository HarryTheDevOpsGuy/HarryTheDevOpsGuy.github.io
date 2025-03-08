---
layout: course
title: Cloud Integration and Containerization
description: Learn how to integrate Jenkins with cloud platforms and containerization technologies
module: 6
order: 1
---

# Cloud Integration and Containerization

## Cloud Platform Integration

### AWS Integration
```groovy
// AWS Pipeline Configuration
pipeline {
    agent {
        label 'aws-agent'
    }
    environment {
        AWS_REGION = 'us-west-2'
        AWS_CREDENTIALS = credentials('aws-credentials')
    }
    stages {
        stage('Deploy to AWS') {
            steps {
                withAWS(region: AWS_REGION, credentials: AWS_CREDENTIALS) {
                    sh 'aws s3 sync ./dist s3://my-bucket/'
                    sh 'aws cloudfront create-invalidation --distribution-id XYZ --paths "/*"'
                }
            }
        }
    }
}
```

### Azure Integration
```groovy
// Azure Pipeline Configuration
pipeline {
    agent any
    environment {
        AZURE_SUBSCRIPTION_ID = credentials('azure-subscription')
    }
    stages {
        stage('Deploy to Azure') {
            steps {
                withCredentials([azureServicePrincipal('azure-credentials')]) {
                    sh '''
                        az login --service-principal \
                            -u $AZURE_CLIENT_ID \
                            -p $AZURE_CLIENT_SECRET \
                            --tenant $AZURE_TENANT_ID
                        
                        az webapp deployment source config-zip \
                            --resource-group myResourceGroup \
                            --name myWebApp \
                            --src app.zip
                    '''
                }
            }
        }
    }
}
```

### GCP Integration
```groovy
// Google Cloud Platform Configuration
pipeline {
    agent any
    environment {
        PROJECT_ID = 'my-gcp-project'
        CLUSTER_NAME = 'my-gke-cluster'
        LOCATION = 'us-central1-a'
    }
    stages {
        stage('Deploy to GKE') {
            steps {
                withCredentials([file(credentialsId: 'gcp-key', variable: 'GC_KEY')]) {
                    sh '''
                        gcloud auth activate-service-account --key-file=$GC_KEY
                        gcloud container clusters get-credentials $CLUSTER_NAME \
                            --zone $LOCATION --project $PROJECT_ID
                        kubectl apply -f k8s/
                    '''
                }
            }
        }
    }
}
```

## Container Orchestration

### Docker Integration
```groovy
// Docker Build and Push
pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'myapp:${BUILD_NUMBER}'
        REGISTRY = 'docker.io/myorg'
    }
    stages {
        stage('Build Image') {
            steps {
                script {
                    docker.build("${REGISTRY}/${DOCKER_IMAGE}", '--no-cache .')
                }
            }
        }
        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        docker login -u $DOCKER_USER -p $DOCKER_PASS
                        docker push ${REGISTRY}/${DOCKER_IMAGE}
                    '''
                }
            }
        }
    }
}
```

### Kubernetes Integration
```yaml
# Kubernetes Deployment Configuration
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jenkins-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: jenkins-app
  template:
    metadata:
      labels:
        app: jenkins-app
    spec:
      containers:
      - name: jenkins
        image: jenkins/jenkins:lts
        ports:
        - containerPort: 8080
        volumeMounts:
        - name: jenkins-home
          mountPath: /var/jenkins_home
      volumes:
      - name: jenkins-home
        persistentVolumeClaim:
          claimName: jenkins-pvc
```

### OpenShift Integration
```groovy
// OpenShift Pipeline
pipeline {
    agent {
        label 'openshift'
    }
    stages {
        stage('Deploy to OpenShift') {
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject('my-project') {
                            def dc = openshift.selector('dc', 'frontend')
                            dc.rollout().latest()
                            dc.rollout().status()
                        }
                    }
                }
            }
        }
    }
}
```

## Container Security

### Image Scanning
```groovy
// Container Image Security Scan
pipeline {
    agent any
    stages {
        stage('Security Scan') {
            steps {
                script {
                    def scanResult = trivy.scan(
                        image: "${REGISTRY}/${DOCKER_IMAGE}",
                        severity: 'HIGH,CRITICAL'
                    )
                    
                    if (scanResult.vulnerabilities > 0) {
                        error "Security vulnerabilities found"
                    }
                }
            }
        }
    }
}
```

### Container Hardening
```dockerfile
# Secure Dockerfile Example
FROM alpine:3.14

# Add non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set working directory
WORKDIR /app

# Copy application files
COPY --chown=appuser:appgroup . .

# Use non-root user
USER appuser

# Define entrypoint
ENTRYPOINT ["./entrypoint.sh"]
```

## Cloud-Native CI/CD

### GitOps Implementation
```yaml
# ArgoCD Application Configuration
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/org/myapp.git
    targetRevision: HEAD
    path: k8s
  destination:
    server: https://kubernetes.default.svc
    namespace: myapp
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

### Cloud-Native Tools Integration
```groovy
// Tekton Pipeline Integration
pipeline {
    agent any
    stages {
        stage('Deploy with Tekton') {
            steps {
                script {
                    sh '''
                        tkn pipeline start build-and-deploy \
                            -w name=shared-workspace,claimName=source-pvc \
                            -p deployment-name=myapp \
                            -p git-url=https://github.com/org/myapp.git \
                            -p IMAGE=gcr.io/myproject/myapp \
                            --use-param-defaults
                    '''
                }
            }
        }
    }
}
```

## Hands-on Exercises

### Exercise 1: Cloud Platform Setup
1. Configure AWS Integration
2. Set up Azure Connection
3. Implement GCP Pipeline
4. Test Cloud Deployments
5. Monitor Cloud Resources

### Exercise 2: Container Orchestration
1. Build Docker Images
2. Deploy to Kubernetes
3. Implement Security Scans
4. Configure GitOps
5. Test Deployments

## Assessment

### Knowledge Check
1. How do you integrate Jenkins with cloud platforms?
2. What are the key container security considerations?
3. How do you implement GitOps with Jenkins?
4. What are the benefits of cloud-native CI/CD?

### Practice Tasks
1. Set up cloud provider integration
2. Implement container builds
3. Configure security scanning
4. Deploy to Kubernetes

## Additional Resources

### Documentation
- [Jenkins Cloud Integration](https://www.jenkins.io/doc/book/pipeline/docker/)
- [Kubernetes Plugin](https://plugins.jenkins.io/kubernetes/)
- [Container Security](https://www.jenkins.io/doc/book/security/)

### Best Practices
- Use Infrastructure as Code
- Implement security scanning
- Follow GitOps principles
- Monitor cloud resources

## Next Steps
- Review cloud integration concepts
- Practice container deployments
- Implement security measures
- Study cloud-native patterns