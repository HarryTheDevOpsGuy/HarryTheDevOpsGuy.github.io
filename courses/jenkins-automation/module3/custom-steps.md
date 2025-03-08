---
layout: course
title: Custom Step Development
description: Learn to create and implement custom pipeline steps in Jenkins shared libraries
module: 3
order: 2
---

# Custom Step Development

## Overview
Custom steps allow you to extend Jenkins pipeline functionality by creating reusable, parameterized steps that can be used across different pipelines. This lesson covers the development, testing, and implementation of custom pipeline steps.

## Step Development Fundamentals

### Basic Step Structure
```groovy
// vars/customStep.groovy
def call(Map params = [:]) {
    // Parameter defaults
    def config = [
        timeout: 30,
        retries: 3,
        failFast: true
    ] + params
    
    // Step implementation
    retry(config.retries) {
        timeout(time: config.timeout, unit: 'MINUTES') {
            // Step logic here
        }
    }
}
```

## Advanced Step Patterns

### 1. Parameterized Steps

```groovy
// vars/deployToEnvironment.groovy
def call(Map params) {
    def config = [
        environment: 'staging',
        version: 'latest',
        namespace: 'default',
        timeout: 10,
        waitForRollout: true
    ] + params
    
    pipeline {
        agent any
        
        stages {
            stage('Validate Parameters') {
                steps {
                    script {
                        validateDeployParams(config)
                    }
                }
            }
            
            stage('Deploy') {
                steps {
                    script {
                        performDeploy(config)
                    }
                }
            }
            
            stage('Verify') {
                when { expression { config.waitForRollout } }
                steps {
                    script {
                        verifyDeployment(config)
                    }
                }
            }
        }
    }
}

def validateDeployParams(config) {
    assert config.environment in ['dev', 'staging', 'prod']
    assert config.version?.trim()
    assert config.namespace?.trim()
}

def performDeploy(config) {
    echo "Deploying version ${config.version} to ${config.environment}"
    // Deployment implementation
}

def verifyDeployment(config) {
    echo "Verifying deployment in ${config.environment}"
    // Verification implementation
}
```

### 2. Conditional Step Execution

```groovy
// vars/conditionalBuild.groovy
def call(Map params = [:], Closure body) {
    def config = [
        branch: env.BRANCH_NAME,
        skipTests: false,
        requireApproval: false
    ] + params
    
    pipeline {
        agent any
        
        stages {
            stage('Pre-build Checks') {
                steps {
                    script {
                        if (config.requireApproval && config.branch == 'main') {
                            input 'Proceed with build?'
                        }
                    }
                }
            }
            
            stage('Build') {
                steps {
                    script {
                        body()
                    }
                }
            }
            
            stage('Test') {
                when { expression { !config.skipTests } }
                steps {
                    runTests()
                }
            }
        }
    }
}
```

### 3. Error Handling and Recovery

```groovy
// vars/robustStep.groovy
def call(Map params = [:]) {
    def config = [
        maxRetries: 3,
        backoffFactor: 2,
        initialDelay: 5,
        failFast: false
    ] + params
    
    def attempt = 1
    def delay = config.initialDelay
    
    while (attempt <= config.maxRetries) {
        try {
            // Step implementation
            return // Success
        } catch (Exception e) {
            if (attempt == config.maxRetries || config.failFast) {
                throw e
            }
            
            echo "Attempt ${attempt} failed: ${e.message}"
            sleep(delay)
            
            attempt++
            delay *= config.backoffFactor
        }
    }
}
```

## Testing Custom Steps

### 1. Unit Testing

```groovy
// test/vars/deployToEnvironmentTest.groovy
import org.junit.*
import com.lesfurets.jenkins.unit.*

class DeployToEnvironmentTest extends BasePipelineTest {
    def deployToEnvironment
    
    @Before
    void setUp() {
        super.setUp()
        deployToEnvironment = loadScript('vars/deployToEnvironment.groovy')
    }
    
    @Test
    void 'test deployment to staging'() {
        def params = [
            environment: 'staging',
            version: '1.0.0',
            namespace: 'myapp'
        ]
        
        when(deployToEnvironment(params))
            .then { result ->
                assert result.environment == 'staging'
                assert result.version == '1.0.0'
            }
    }
    
    @Test(expected = AssertionError)
    void 'test invalid environment'() {
        deployToEnvironment([
            environment: 'invalid',
            version: '1.0.0'
        ])
    }
}
```

### 2. Integration Testing

```groovy
// test/integration/deployIntegrationTest.groovy
node {
    stage('Integration Test') {
        // Setup test environment
        def testParams = [
            environment: 'test',
            version: '1.0.0-test',
            namespace: 'integration-tests'
        ]
        
        try {
            // Run the step
            deployToEnvironment(testParams)
            
            // Verify deployment
            assert sh(script: 'kubectl get deployment -n integration-tests', returnStatus: true) == 0
        } finally {
            // Cleanup test resources
            sh 'kubectl delete namespace integration-tests --ignore-not-found'
        }
    }
}
```

## Best Practices

1. **Parameter Validation**
   ```groovy
   def validateParameters(Map params) {
       assert params.name?.trim() : 'Parameter "name" is required'
       assert params.version?.trim() : 'Parameter "version" is required'
       assert params.timeout > 0 : 'Timeout must be positive'
   }
   ```

2. **Documentation**
   ```groovy
   // vars/deployToEnvironment.groovy
   
   /**
    * Deploys an application to the specified environment
    *
    * @param params Map of parameters:
    *   - environment: Target environment (dev/staging/prod)
    *   - version: Version to deploy
    *   - namespace: Kubernetes namespace
    *   - timeout: Deployment timeout in minutes (default: 10)
    *   - waitForRollout: Whether to wait for rollout completion (default: true)
    * @return Map containing deployment results
    */
   def call(Map params) {
       // Implementation
   }
   ```

3. **Logging and Monitoring**
   ```groovy
   def logStep(String step, String message) {
       echo "[${step}] ${message}"
       // Add additional logging/monitoring
   }
   ```

## Hands-on Exercise

### Exercise 1: Basic Step Creation

1. Create a custom step for building and testing a Node.js application
2. Implement parameter validation
3. Add error handling
4. Write unit tests
5. Document the step

### Exercise 2: Advanced Step Features

1. Add conditional execution based on branch
2. Implement retry logic
3. Add progress monitoring
4. Create integration tests
5. Add performance metrics

## Additional Resources

1. [Jenkins Pipeline Steps Reference](https://www.jenkins.io/doc/pipeline/steps/)
2. [Jenkins Pipeline Unit Testing Framework](https://github.com/jenkinsci/JenkinsPipelineUnit)
3. [Groovy Testing Guide](http://spockframework.org/spock/docs/1.3/index.html)
4. [Jenkins Pipeline Best Practices](https://www.jenkins.io/doc/book/pipeline/pipeline-best-practices/)

## Next Steps
- Explore global variables implementation
- Learn about library management
- Practice with real-world scenarios