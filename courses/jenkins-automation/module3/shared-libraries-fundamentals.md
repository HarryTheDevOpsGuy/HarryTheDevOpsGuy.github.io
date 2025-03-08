---
layout: course
title: Shared Libraries Fundamentals
description: Understanding Jenkins shared libraries architecture and implementation
module: 3
order: 1
---

# Shared Libraries Fundamentals

## Introduction to Shared Libraries

### What are Shared Libraries?
Jenkins shared libraries are reusable collections of Groovy code that can be used by multiple Jenkins pipelines. They provide a way to share common pipeline logic across different projects and teams.

### Benefits
- Code reusability
- Standardization
- Maintainability
- Version control
- Reduced duplication
- Centralized updates

## Library Structure

### Directory Layout
```plaintext
(root)
+- src/                     # Groovy source files
|   +- org/example/
|       +- Utils.groovy     # Common utility functions
+- vars/                    # Global variables/functions
|   +- standardBuild.groovy # Reusable pipeline step
|   +- deploy.groovy        # Deployment function
+- resources/               # Non-Groovy files
|   +- scripts/
|       +- deploy.sh        # Shell scripts
+- tests/                   # Test files
    +- unit/
    +- integration/
```

### Component Types

#### 1. Source Files (src/)
```groovy
// src/org/example/Utils.groovy
package org.example

class Utils implements Serializable {
    def script
    
    Utils(script) {
        this.script = script
    }
    
    def mvn(String goals) {
        script.sh "mvn ${goals}"
    }
    
    def validateInput(Map config) {
        if (!config.name) {
            throw new IllegalArgumentException("'name' parameter is required")
        }
    }
}
```

#### 2. Global Variables (vars/)
```groovy
// vars/standardBuild.groovy
def call(Map config) {
    pipeline {
        agent any
        stages {
            stage('Build') {
                steps {
                    script {
                        def utils = new org.example.Utils(this)
                        utils.mvn('clean install')
                    }
                }
            }
        }
    }
}
```

#### 3. Resources
```bash
# resources/scripts/deploy.sh
#!/bin/bash

ENV=$1
APP=$2
VERSION=$3

echo "Deploying $APP version $VERSION to $ENV"
# Deployment logic
```

## Library Configuration

### Global Library Configuration
```groovy
// Jenkins Configuration
@Library('my-shared-library@master') _

// Pipeline usage
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                standardBuild()
            }
        }
    }
}
```

### Version Control Integration
```groovy
// Multiple library versions
@Library([
    'mylib@master',
    'otherlib@1.0.0'
]) _

// Dynamic version selection
libraryResource('configs/deployment.yml')
```

## Implementation Patterns

### 1. Simple Function
```groovy
// vars/log.groovy
def info(message) {
    echo "INFO: ${message}"
}

def warning(message) {
    echo "WARNING: ${message}"
}

def error(message) {
    echo "ERROR: ${message}"
}
```

### 2. Pipeline Step
```groovy
// vars/dockerBuild.groovy
def call(String imageName, String version = 'latest') {
    sh """
        docker build -t ${imageName}:${version} .
        docker push ${imageName}:${version}
    """
}
```

### 3. Complex Implementation
```groovy
// vars/microservicePipeline.groovy
def call(Map config) {
    pipeline {
        agent {
            kubernetes {
                yaml """
                    apiVersion: v1
                    kind: Pod
                    spec:
                      containers:
                      - name: maven
                        image: maven:3.8.4
                        command:
                        - cat
                        tty: true
                """
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
            
            stage('Test') {
                parallel {
                    stage('Unit Tests') {
                        steps {
                            container('maven') {
                                sh 'mvn test'
                            }
                        }
                    }
                    stage('Integration Tests') {
                        steps {
                            container('maven') {
                                sh 'mvn verify'
                            }
                        }
                    }
                }
            }
        }
    }
}
```

## Security Considerations

### Access Control
```groovy
// Credential handling
withCredentials([
    string(credentialsId: 'api-token', variable: 'TOKEN')
]) {
    // Secure usage of credentials
}
```

### Input Validation
```groovy
def validateDeployConfig(config) {
    required = ['environment', 'version', 'application']
    required.each { param ->
        if (!config.containsKey(param)) {
            throw new IllegalArgumentException("Missing required parameter: ${param}")
        }
    }
}
```

## Testing Strategy

### Unit Tests
```groovy
// tests/unit/UtilsTest.groovy
import org.example.Utils
import org.junit.Test

class UtilsTest {
    @Test
    void testValidateInput() {
        def utils = new Utils()
        try {
            utils.validateInput([:])  // Should throw exception
            assert false
        } catch (IllegalArgumentException e) {
            assert e.message == "'name' parameter is required"
        }
    }
}
```

### Integration Tests
```groovy
// tests/integration/PipelineTest.groovy
class PipelineTest extends BasePipelineTest {
    @Test
    void testStandardBuild() {
        def script = loadScript("vars/standardBuild.groovy")
        script.call([name: 'test-project'])
        
        assertJobStatusSuccess()
        assertCommandExecuted('mvn clean install')
    }
}
```

## Best Practices

### Code Organization
- Keep functions focused and small
- Use meaningful names
- Implement proper error handling
- Add comprehensive documentation
- Follow consistent coding style

### Version Control
- Use semantic versioning
- Maintain change log
- Tag releases
- Branch for features
- Review code changes

## Hands-on Exercise

### Exercise 1: Basic Library Implementation
1. Create library structure
2. Implement utility functions
3. Add global variables
4. Create test cases
5. Configure in Jenkins

### Exercise 2: Advanced Implementation
1. Create complex pipeline step
2. Implement security measures
3. Add comprehensive tests
4. Document the implementation
5. Deploy and test

## Assessment

### Knowledge Check
1. What is the purpose of shared libraries in Jenkins?
2. How do you structure a shared library?
3. What are the different types of library components?
4. How do you implement security in shared libraries?

### Practice Tasks
1. Create a basic shared library
2. Implement a complex pipeline step
3. Add security measures
4. Write comprehensive tests

## Additional Resources

### Documentation
- [Jenkins Shared Libraries](https://www.jenkins.io/doc/book/pipeline/shared-libraries/)
- [Pipeline Steps Reference](https://www.jenkins.io/doc/pipeline/steps/)
- [Extending Jenkins](https://www.jenkins.io/doc/developer/)

### Best Practices
- Follow coding standards
- Implement proper testing
- Maintain documentation
- Consider security aspects

## Next Steps
- Review shared library concepts
- Practice implementation patterns
- Explore advanced features
- Study security considerations