---
layout: course
title: Library Management
description: Master the management and versioning of Jenkins shared libraries
module: 3
order: 4
---

# Library Management

## Overview
Effective management of Jenkins shared libraries is crucial for maintaining code quality, ensuring version control, and facilitating collaboration. This lesson covers library versioning, distribution strategies, and best practices for maintaining shared libraries at scale.

## Version Control Strategies

### 1. Semantic Versioning

```groovy
// Jenkinsfile
@Library('my-shared-lib@1.2.3') _

// Major.Minor.Patch
// 1.0.0 - Initial release
// 1.1.0 - Added features
// 1.1.1 - Bug fixes
```

### 2. Branch-Based Versioning

```groovy
// Jenkins Global Library Configuration
name: 'my-shared-lib'
default version: 'main'
branch: 'feature/new-deployment-steps'

// Usage in Jenkinsfile
@Library('my-shared-lib@feature/new-deployment-steps') _
```

### 3. Dynamic Version Selection

```groovy
// vars/libraryVersion.groovy
def call() {
    def environment = env.ENVIRONMENT ?: 'development'
    def versions = [
        development: 'develop',
        staging: 'release/candidate',
        production: 'main'
    ]
    
    return versions[environment] ?: 'main'
}

// Jenkinsfile
def libVersion = libraryVersion()
@Library("my-shared-lib@${libVersion}") _
```

## Distribution Mechanisms

### 1. Git-Based Distribution

```groovy
// Jenkins Configuration
scm:
  git:
    remote: 'https://github.com/organization/shared-library.git'
    credentialsId: 'github-credentials'
    traits:
      - branchDiscoveryTrait()
      - tagDiscoveryTrait()
```

### 2. Multi-Library Management

```groovy
// Jenkinsfile
@Library([
    'infrastructure-lib@1.0.0',
    'deployment-lib@2.1.0',
    'security-lib@1.5.2'
]) _

// Usage
infrastructure.provisionResources()
deployment.deployToKubernetes()
security.scanArtifacts()
```

### 3. Library Dependencies

```groovy
// vars/loadDependencies.groovy
def call() {
    // Load required libraries
    library 'utils-lib@1.0.0'
    library 'security-lib@2.0.0'
    
    // Configure dependencies
    def utils = new org.example.Utils()
    def security = new org.example.Security()
    
    return [
        utils: utils,
        security: security
    ]
}
```

## Documentation Practices

### 1. Library Documentation

```groovy
// docs/README.md
# Shared Library Documentation

## Available Steps
- `buildJava`: Builds Java applications
- `deployToKubernetes`: Handles Kubernetes deployments
- `securityScan`: Performs security scanning

## Configuration
```yaml
defaultBranch: main
timeoutMinutes: 60
environments:
  - development
  - staging
  - production
```

## Usage Examples
```groovy
@Library('my-shared-lib') _
buildJava()
```
```

### 2. API Documentation

```groovy
// vars/deployToKubernetes.groovy

/**
 * Deploys an application to Kubernetes
 *
 * @param config Map of deployment configuration:
 *   - namespace: Kubernetes namespace
 *   - image: Docker image to deploy
 *   - replicas: Number of replicas
 *   - resources: Resource limits and requests
 *
 * @example
 * deployToKubernetes(
 *   namespace: 'production',
 *   image: 'myapp:1.0.0',
 *   replicas: 3
 * )
 */
def call(Map config) {
    // Implementation
}
```

## Maintenance Workflows

### 1. Library Testing

```groovy
// Jenkinsfile for library testing
pipeline {
    agent any
    
    stages {
        stage('Unit Tests') {
            steps {
                sh 'gradle test'
            }
        }
        
        stage('Integration Tests') {
            steps {
                sh 'gradle integrationTest'
            }
        }
        
        stage('Documentation') {
            steps {
                sh 'gradle generateDocs'
            }
        }
    }
    
    post {
        always {
            junit '**/build/test-results/**/*.xml'
        }
    }
}
```

### 2. Release Process

```groovy
// vars/releaseLibrary.groovy
def call(String version) {
    // Validate version format
    assert version ==~ /^\d+\.\d+\.\d+$/ : "Invalid version format"
    
    // Update version files
    sh """
        echo "version=${version}" > version.properties
        git add version.properties
        git commit -m "Release version ${version}"
        git tag -a v${version} -m "Version ${version}"
        git push origin v${version}
    """
    
    // Generate documentation
    sh 'gradle generateDocs'
    
    // Create release notes
    def changelog = generateChangelog(version)
    createGitHubRelease(version, changelog)
}
```

### 3. Migration Strategies

```groovy
// vars/deprecationNotice.groovy
def call(String oldStep, String newStep, String version) {
    echo """
WARNING: The step '${oldStep}' is deprecated and will be removed in version ${version}.
Please use '${newStep}' instead.
See migration guide: https://wiki.example.com/migration-guide
"""
}

// Example usage in deprecated step
def call(Map config) {
    deprecationNotice('oldDeployStep', 'newDeployStep', '2.0.0')
    // Forward to new implementation
    newDeployStep(config)
}
```

## Best Practices

1. **Version Control**
   - Use semantic versioning
   - Tag releases
   - Maintain changelog

2. **Testing**
   - Automated test suite
   - Integration tests
   - Version compatibility tests

3. **Documentation**
   - API documentation
   - Usage examples
   - Migration guides

4. **Maintenance**
   - Regular updates
   - Security patches
   - Deprecation notices

## Hands-on Exercise

### Exercise 1: Library Release Management

1. Set up version control
2. Create release process
3. Implement testing pipeline
4. Generate documentation
5. Practice release workflow

### Exercise 2: Migration Planning

1. Plan breaking changes
2. Create migration guides
3. Implement deprecation notices
4. Test backward compatibility
5. Document upgrade paths

## Additional Resources

1. [Jenkins Library Development Guide](https://www.jenkins.io/doc/book/pipeline/shared-libraries/)
2. [Semantic Versioning Specification](https://semver.org/)
3. [Git Version Control Best Practices](https://git-scm.com/book/en/v2)
4. [Documentation Generation Tools](https://www.mkdocs.org/)

## Next Steps
- Implement advanced pipeline patterns
- Explore enterprise integration scenarios
- Master complex deployment strategies