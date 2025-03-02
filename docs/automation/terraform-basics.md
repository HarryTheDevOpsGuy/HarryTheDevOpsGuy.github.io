---
layout: docs
title: Terraform Basics
module: infrastructure
order: 2
---

# Terraform Basics

Terraform is an Infrastructure as Code (IaC) tool that enables you to safely and predictably create, change, and improve infrastructure.

## Core Concepts

### Infrastructure as Code
Define infrastructure using a declarative configuration language.

### Providers
Plugins that enable Terraform to interact with various cloud platforms and services.

### Resources
Infrastructure components that Terraform manages, such as virtual machines, networks, or DNS records.

### State
Terraform's representation of your infrastructure's current configuration.

## Key Features

1. **Multi-Cloud Support**
   - Works with multiple cloud providers
   - Consistent workflow across providers
   - Unified configuration language

2. **State Management**
   - Tracks resource changes
   - Enables collaboration
   - Supports remote state storage

3. **Dependency Management**
   - Automatically handles resource dependencies
   - Creates resources in the correct order
   - Parallel execution when possible

## Getting Started

### Installation
```bash
# Download Terraform
curl -fsSL https://releases.hashicorp.com/terraform/latest/terraform_latest_linux_amd64.zip -o terraform.zip

# Extract and move to PATH
unzip terraform.zip
sudo mv terraform /usr/local/bin/
```

### Basic Commands
```bash
# Initialize working directory
terraform init

# Preview changes
terraform plan

# Apply changes
terraform apply
```

## Best Practices

1. **Code Organization**
   - Use modules for reusable components
   - Separate environments with workspaces
   - Follow consistent naming conventions

2. **State Management**
   - Use remote state storage
   - Enable state locking
   - Backup state files regularly

3. **Security**
   - Use variables for sensitive data
   - Implement least privilege access
   - Encrypt state files

## Next Steps

- Learn about Terraform modules
- Explore state management options
- Practice with different providers
- Implement CI/CD for infrastructure