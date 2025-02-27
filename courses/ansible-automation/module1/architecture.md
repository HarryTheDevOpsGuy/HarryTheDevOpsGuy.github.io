---
layout: course
title: Ansible Architecture
description: Understanding Ansible's core components and architecture
module: 1
order: 2
---

# Ansible Architecture

## Control Node

### Requirements
- Linux/Unix operating system
- Python 3.9 or later
- SSH client configuration
- Ansible installation

### Components
- Ansible Core
- Inventory files
- Configuration files
- Playbooks and roles

## Managed Nodes

### Requirements
- SSH server enabled
- Python interpreter
- SFTP or SCP access
- Appropriate permissions

### Supported Platforms
- Linux/Unix systems
- Windows servers
- Network devices
- Cloud platforms

## SSH-based Communication

### Authentication Methods
- Password authentication
- SSH key-based auth
- Privilege escalation
- Custom SSH settings

### Connection Types
- SSH (default)
- WinRM for Windows
- Local connections
- Custom plugins

## Agentless Architecture Benefits

### Simplified Management
- No agent installation
- Lower maintenance overhead
- Reduced security risks
- Easy troubleshooting

### Enhanced Security
- Standard SSH security
- No additional ports
- Existing security policies
- Centralized control

### Flexibility
- Multi-platform support
- Easy adoption
- Quick deployment
- Scalable implementation

## Practical Exercise

### Setting Up Control Node
1. Install required packages
2. Configure SSH keys
3. Test connectivity

### Managing Target Systems
1. Add systems to inventory
2. Verify SSH access
3. Test basic commands

## Key Takeaways
- Control node manages all automation
- Managed nodes need minimal setup
- SSH provides secure communication
- Agentless design simplifies deployment

## Additional Resources
- [Ansible Architecture Guide](https://docs.ansible.com/ansible/latest/architecture_guide/index.html)
- [SSH Configuration Guide](https://docs.ansible.com/ansible/latest/user_guide/connection_details.html)
- [Windows Remote Management](https://docs.ansible.com/ansible/latest/os_guide/windows_winrm.html)
- [Ansible Configuration Settings](https://docs.ansible.com/ansible/latest/reference_appendices/config.html)