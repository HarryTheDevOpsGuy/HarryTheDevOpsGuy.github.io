---
layout: course
title: Pipeline Fundamentals
description: Understanding core concepts and components of Jenkins pipelines
module: 2
order: 1
---

# Pipeline Fundamentals

## Introduction to Jenkins Pipelines

### What are Jenkins Pipelines?
Jenkins Pipelines provide a suite of tools for modeling simple-to-complex delivery pipelines as code. A pipeline is a collection of steps that break down the complex process of software delivery into stages.

### Types of Pipelines

#### Declarative Pipeline
```groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
    }
}
```

#### Scripted Pipeline
```groovy
node {
    stage('Build') {
        echo 'Building..'
    }
}
```

## Pipeline Structure

### Basic Components

#### 1. Pipeline Block
```groovy
pipeline {
    // Pipeline contents
}
```

#### 2. Agent Section
```groovy
agent {
    label 'my-defined-label'
    customWorkspace '/some/other/path'
}
```

#### 3. Stages and Steps
```groovy
stages {
    stage('Build') {
        steps {
            sh 'mvn clean install'
        }
    }
    stage('Test') {
        steps {
            sh 'mvn test'
        }
    }
}
```

## Environment Variables

### Built-in Variables
```groovy
pipeline {
    agent any
    stages {
        stage('Environment') {
            steps {
                echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL}"
                echo "Branch name: ${env.BRANCH_NAME}"
            }
        }
    }
}
```

### Custom Variables
```groovy
pipeline {
    agent any
    environment {
        APP_NAME = 'my-app'
        VERSION = '1.0.0'
        DEPLOY_TO = 'production'
    }
    stages {
        stage('Deploy') {
            steps {
                echo "Deploying ${APP_NAME} version ${VERSION} to ${DEPLOY_TO}"
            }
        }
    }
}
```

## Pipeline Stages

### Sequential Stages
```groovy
pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/user/repo.git'
            }
        }
        stage('Build') {
            steps {
                sh 'mvn package'
            }
        }
        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }
    }
}
```

### Parallel Stages
```groovy
pipeline {
    agent any
    stages {
        stage('Tests') {
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
                stage('Performance Tests') {
                    steps {
                        sh 'mvn performance:check'
                    }
                }
            }
        }
    }
}
```

## Pipeline Steps

### Basic Steps
1. **Shell Commands**
```groovy
steps {
    sh 'echo "Hello World"'
    sh '''
        echo "Multiline"
        echo "Shell Script"
        echo "Example"
    '''
}
```

2. **Windows Batch**
```groovy
steps {
    bat 'dir'
    bat '''
        echo "Multiline"
        echo "Batch Script"
        echo "Example"
    '''
}
```

### Advanced Steps

#### 1. Conditional Execution
```groovy
steps {
    script {
        if (env.BRANCH_NAME == 'main') {
            echo 'Building main branch'
        } else {
            echo 'Building feature branch'
        }
    }
}
```

#### 2. Error Handling
```groovy
steps {
    script {
        try {
            sh 'mvn clean install'
        } catch (exc) {
            echo 'Build failed'
            throw exc
        }
    }
}
```

## Post Actions

### Post-build Steps
```groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
    }
    post {
        always {
            echo 'Always executed'
        }
        success {
            echo 'Only on success'
        }
        failure {
            echo 'Only on failure'
        }
        unstable {
            echo 'Only if run is unstable'
        }
        changed {
            echo 'Only if state changed'
        }
    }
}
```

## Hands-on Exercise

### Basic Pipeline Implementation
1. Create a new Pipeline job in Jenkins
2. Implement a basic pipeline with checkout, build, and test stages
3. Add environment variables
4. Implement parallel test execution
5. Add post-build actions

### Exercise Template
```groovy
pipeline {
    agent any
    
    environment {
        APP_NAME = 'exercise-app'
        VERSION = '1.0.0'
    }
    
    stages {
        stage('Checkout') {
            steps {
                // TODO: Implement source code checkout
            }
        }
        
        stage('Build') {
            steps {
                // TODO: Implement build steps
            }
        }
        
        stage('Test') {
            parallel {
                // TODO: Implement parallel tests
            }
        }
    }
    
    post {
        // TODO: Implement post-build actions
    }
}
```

## Assessment

### Knowledge Check
1. What are the main differences between Declarative and Scripted pipelines?
2. How do you implement parallel execution in Jenkins pipelines?
3. What are the various post-build conditions available in Jenkins pipelines?
4. How do you handle environment variables in pipelines?

### Practice Tasks
1. Create a pipeline with at least three stages
2. Implement parallel execution of tests
3. Add error handling and recovery mechanisms
4. Configure post-build actions

## Additional Resources

### Documentation
- [Jenkins Pipeline Syntax Reference](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Pipeline Steps Reference](https://www.jenkins.io/doc/pipeline/steps/)
- [Pipeline Examples](https://www.jenkins.io/doc/pipeline/examples/)

### Best Practices
- Keep pipelines simple and modular
- Use descriptive stage names
- Implement proper error handling
- Document pipeline code
- Use parallel execution when possible

## Next Steps
- Proceed to Declarative Pipeline Mastery
- Review pipeline syntax documentation
- Practice implementing different pipeline patterns
- Explore advanced pipeline features