---
layout: course
title: Security and Access Control
description: Learn about Jenkins security features, authentication, authorization, and best practices
module: 4
order: 1
---

# Security and Access Control

## Introduction to Jenkins Security

### Security Fundamentals
Jenkins security is crucial for protecting your CI/CD infrastructure. This module covers essential security concepts and implementation strategies.

### Key Security Areas
- Authentication
- Authorization
- Credential Management
- Audit Logging
- Network Security

## Authentication

### Built-in User Database
```groovy
// Example security configuration in Jenkins
jenkins.security.ApiTokenProperty.creationOfLegacyTokenEnabled = false
jenkins.model.Jenkins.instance.securityRealm = new hudson.security.HudsonPrivateSecurityRealm(false)
```

### LDAP Integration
```xml
<!-- Example LDAP configuration -->
<securityRealm class="hudson.security.LDAPSecurityRealm">
    <server>ldap.example.com</server>
    <rootDN>dc=example,dc=com</rootDN>
    <userSearchBase>ou=users</userSearchBase>
    <userSearch>uid={0}</userSearch>
</securityRealm>
```

### Single Sign-On (SSO)
```groovy
// SAML Configuration Example
jenkins.security.SAMLSecurityRealm samlRealm = new jenkins.security.SAMLSecurityRealm(
    idpMetadata,
    displayNameAttributeName,
    groupsAttributeName,
    maximumAuthenticationLifetime,
    usernameAttributeName
)
```

## Authorization

### Matrix-Based Security
```groovy
// Matrix Authorization Strategy
def strategy = new hudson.security.ProjectMatrixAuthorizationStrategy()
strategy.add(Jenkins.ADMINISTER, "admin")
strategy.add(Jenkins.READ, "authenticated")
Jenkins.instance.setAuthorizationStrategy(strategy)
```

### Role-Based Access Control (RBAC)
```groovy
// Role-based Access Configuration
def roleBasedAuthenticationStrategy = new RoleBasedAuthorizationStrategy()
def globalRoles = roleBasedAuthenticationStrategy.getRoleMaps()[RoleBasedAuthorizationStrategy.GLOBAL]

globalRoles.addRole(new Role('developer',
    new HashSet<Permission>([Item.BUILD, Item.READ, Item.WORKSPACE])))
```

## Credential Management

### Credential Types
1. Username/Password
2. SSH Keys
3. Secret Text
4. Certificates
5. Custom Credentials

### Secure Credential Usage
```groovy
// Pipeline with credentials
pipeline {
    agent any
    stages {
        stage('Deploy') {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'deploy-creds',
                                  usernameVariable: 'USERNAME',
                                  passwordVariable: 'PASSWORD')
                ]) {
                    sh '''
                        curl -u $USERNAME:$PASSWORD \
                            https://deploy.example.com/api/deploy
                    '''
                }
            }
        }
    }
}
```

### Credential Providers
```groovy
// Custom Credential Provider
class CustomCredentialProvider extends CredentialsProvider {
    @Override
    public <C extends Credentials> List<C> getCredentials(Class<C> type,
                                                        ItemGroup itemGroup,
                                                        Authentication authentication) {
        // Implementation
    }
}
```

## Audit Logging

### Audit Trail Plugin
```properties
# audit-trail.conf
logger.pattern=%d{yyyy-MM-dd HH:mm:ss} %X{user} %X{ip} %X{method} %X{url} %X{status}
logger.file=/var/log/jenkins/audit.log
logger.count=10
logger.size=100MB
```

### Security Events
```groovy
// Security Event Listener
class SecurityEventListener extends SecurityListener {
    @Override
    void authenticated(Authentication auth) {
        logger.info("User ${auth.name} authenticated successfully")
    }
    
    @Override
    void failedToAuthenticate(String username) {
        logger.warn("Failed authentication attempt for user ${username}")
    }
}
```

## Network Security

### Reverse Proxy Configuration
```nginx
# Nginx Configuration
server {
    listen 443 ssl;
    server_name jenkins.example.com;
    
    ssl_certificate /etc/nginx/ssl/jenkins.crt;
    ssl_certificate_key /etc/nginx/ssl/jenkins.key;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Agent Connection Security
```groovy
// Secure Agent Configuration
pipeline {
    agent {
        node {
            label 'secure-agent'
            customWorkspace '/secure/build/workspace'
        }
    }
    stages {
        stage('Secure Build') {
            steps {
                // Secure build steps
            }
        }
    }
}
```

## Security Best Practices

### Configuration Checklist
1. Enable Security
2. Use HTTPS
3. Implement CSRF Protection
4. Configure Authentication
5. Set Up Authorization
6. Manage Credentials Securely
7. Enable Audit Logging
8. Regular Security Updates

### Security Hardening
```groovy
// Security Hardening Script
System.setProperty('hudson.model.DirectoryBrowserSupport.CSP',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval';")

Jenkins.instance.setSlaveAgentPort(-1) // Disable TCP port for JNLP agents
Jenkins.instance.setNumExecutors(0)    // Disable builds on master

// Configure CSRF Protection
Jenkins.instance.setCrumbIssuer(new DefaultCrumbIssuer(true))
```

## Hands-on Exercises

### Exercise 1: Basic Security Setup
1. Enable Jenkins Security
2. Configure Authentication
3. Set Up Matrix-Based Authorization
4. Add Users and Groups
5. Test Access Controls

### Exercise 2: Advanced Security Implementation
1. Configure LDAP Integration
2. Implement SSO
3. Set Up Credential Management
4. Configure Audit Logging
5. Test Security Measures

## Assessment

### Knowledge Check
1. What are the key components of Jenkins security?
2. How do you implement RBAC in Jenkins?
3. What are the best practices for credential management?
4. How do you configure audit logging?

### Practice Tasks
1. Set up a secure Jenkins instance
2. Implement LDAP authentication
3. Configure credential providers
4. Enable security auditing

## Additional Resources

### Documentation
- [Jenkins Security Documentation](https://www.jenkins.io/doc/book/security/)
- [Authentication Guide](https://www.jenkins.io/doc/book/security/authentication/)
- [Managing Security](https://www.jenkins.io/doc/book/security/managing-security/)

### Best Practices
- Regular security audits
- Principle of least privilege
- Secure credential storage
- Network isolation

## Next Steps
- Review security concepts
- Practice implementation
- Explore advanced features
- Study real-world scenarios