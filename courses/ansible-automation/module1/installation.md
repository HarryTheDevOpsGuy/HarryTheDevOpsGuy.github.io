---
layout: course
title: Installation and Configuration
description: Setting up Ansible and configuring the environment
module: 1
order: 3
---

# Installation and Configuration

## Installing Ansible

### Package Manager Installation
- Using pip (recommended)
  ```bash
  python3 -m pip install --user ansible
  ```
- Using apt (Ubuntu/Debian)
  ```bash
  sudo apt update
  sudo apt install ansible
  ```
- Using yum (RHEL/CentOS)
  ```bash
  sudo yum install ansible
  ```

### Verifying Installation
- Check Ansible version
  ```bash
  ansible --version
  ```
- Verify Python environment
- Review installed collections

## Configuring SSH Access

### SSH Key Setup
1. Generate SSH key pair
   ```bash
   ssh-keygen -t rsa -b 4096
   ```
2. Copy public key to managed nodes
   ```bash
   ssh-copy-id username@target_host
   ```
3. Test SSH connection
   ```bash
   ssh username@target_host
   ```

### SSH Configuration Best Practices
- Use SSH config file
- Set up key-based authentication
- Configure connection timeouts
- Enable connection multiplexing

## Basic Configuration Files

### ansible.cfg
- Default configuration file
- Common settings:
  ```ini
  [defaults]
  inventory = ./inventory
  remote_user = ansible
  host_key_checking = False
  ```

### Inventory File
- Basic inventory structure:
  ```ini
  [webservers]
  web1.example.com
  web2.example.com

  [dbservers]
  db1.example.com
  db2.example.com
  ```

### Configuration Hierarchy
1. Command line options
2. Environment variables
3. ansible.cfg file
4. Default settings

## Practical Exercise

### Basic Setup
1. Create project directory
2. Initialize ansible.cfg
3. Create inventory file
4. Test connectivity

### First Ansible Command
```bash
ansible all -m ping
```

### Common Issues and Solutions
- SSH connection problems
- Python interpreter issues
- Permission problems
- Inventory configuration

## Key Takeaways
- Multiple installation methods available
- SSH configuration is crucial
- Configuration files provide flexibility
- Start with basic setup and expand

## Additional Resources
- [Installation Guide](https://docs.ansible.com/ansible/latest/installation_guide/index.html)
- [Configuration Guide](https://docs.ansible.com/ansible/latest/reference_appendices/config.html)
- [Inventory Guide](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)
- [Getting Started](https://docs.ansible.com/ansible/latest/getting_started/index.html)