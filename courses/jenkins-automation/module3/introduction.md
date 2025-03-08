---
layout: course
title: Introduction to Shared Libraries
description: Understanding Jenkins shared library architecture and implementation
module: 3
order: 1
---

# Introduction to Shared Libraries

## Overview
Jenkins shared libraries provide a powerful way to encapsulate reusable pipeline code and share it across multiple projects. This lesson covers the fundamentals of shared libraries, their architecture, and implementation patterns.

## Library Architecture

### Directory Structure
```groovy
(root)
+- src/                     # Groovy source files
|   +- org/example/
|       +- Utils.groovy     # Utility classes
+- vars/                    # Global variables/functions
|   +- buildJava.groovy
|   +- deployToKubernetes.groovy
+- resources/               # Non-Groovy files
|   +- scripts/
|       +- deploy.sh
+- tests/                   # Test cases
    +- org/example/
        +- UtilsTest.groovy
```

### Key Components

1. **src Directory**
   - Contains structured Groovy source files
   - Follows standard Java package structure
   - Houses reusable classes and utilities

2. **vars Directory**
   - Global variables and functions
   - Each file creates a globally accessible object
   - Provides pipeline step implementations

3. **resources Directory**
   - Static resources and helper scripts
   - Configuration files and templates
   - Shell scripts and other non-Groovy files

## Implementation Guide

### 1. Basic Library Setup

```groovy
// In Jenkins Configuration:
// Manage Jenkins > Configure System > Global Pipeline Libraries

// Library Configuration:
name: 'my-shared-library'
default version: 'main'
retrieval method: 'Modern SCM'
Git URL: 'https://github.com/organization/shared-library.git'
```

### 2. Creating Utility Classes

```groovy
// src/org/example/Utils.groovy
package org.example

class Utils implements Serializable {
    def script
    
    Utils(script) {
        this.script = script
    }
    
    def mvnBuild(String goals) {
        script.sh "mvn -B ${goals}"
    }
    
    def notifySlack(String message) {
        script.slackSend channel: '#builds',
                         color: 'good',
                         message: message
    }
}
```

### 3. Implementing Global Variables

```groovy
// vars/buildJava.groovy
def call(Map config) {
    def utils = new org.example.Utils(this)
    
    pipeline {
        agent any
        
        stages {
            stage('Compile') {
                steps {
                    utils.mvnBuild('compile')
                }
            }
            
            stage('Test') {
                steps {
                    utils.mvnBuild('test')
                }
            }
            
            stage('Package') {
                steps {
                    utils.mvnBuild('package')
                }
            }
        }
        
        post {
            success {
                utils.notifySlack("Build Successful: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
            }
        }
    }
}
```

## Usage Examples

### Basic Pipeline Usage

```groovy
// Jenkinsfile
@Library('my-shared-library') _

buildJava()
```

### Advanced Configuration

```groovy
// Jenkinsfile with custom configuration
@Library('my-shared-library') _

buildJava(
    mvnGoals: 'clean install',
    jdkVersion: '11',
    notifyChannel: '#team-builds'
)
```

## Best Practices

1. **Code Organization**
   - Keep related functionality together
   - Use meaningful package names
   - Follow Groovy coding conventions

2. **Error Handling**
   ```groovy
   // Example of robust error handling
   def call(Map config) {
       try {
           // Pipeline steps
       } catch (Exception e) {
           currentBuild.result = 'FAILURE'
           throw e
       } finally {
           // Cleanup steps
       }
   }
   ```

3. **Documentation**
   - Document all public methods
   - Include usage examples
   - Maintain changelog

4. **Testing**
   ```groovy
   // tests/org/example/UtilsTest.groovy
   import org.example.Utils
   import org.junit.Test
   
   class UtilsTest {
       @Test
       void testMvnBuild() {
           def script = [sh: { cmd -> assert cmd == 'mvn -B compile' }]
           def utils = new Utils(script)
           utils.mvnBuild('compile')
       }
   }
   ```

## Hands-on Exercise

### Exercise 1: Create a Basic Shared Library

1. Set up a Git repository for your shared library
2. Create the basic directory structure
3. Implement a simple utility class
4. Create a global variable
5. Test the library in a Jenkins pipeline

### Exercise 2: Advanced Library Features

1. Implement parameter validation
2. Add error handling
3. Create unit tests
4. Document your code
5. Set up version control

## Additional Resources

1. [Jenkins Shared Libraries Official Documentation](https://www.jenkins.io/doc/book/pipeline/shared-libraries/)
2. [Pipeline Steps Reference](https://www.jenkins.io/doc/pipeline/steps/)
3. [Groovy Language Documentation](http://groovy-lang.org/documentation.html)
4. [Git Version Control Best Practices](https://git-scm.com/book/en/v2)

## Next Steps
- Explore custom step development
- Learn about global variables
- Master library versioning strategies