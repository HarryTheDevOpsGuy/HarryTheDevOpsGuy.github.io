---
layout: course
title: Role Structure and Organization
description: Understanding Ansible role directory structure and components
module: 3
order: 3
---

# Role Structure and Organization

## Role Directory Structure

### Basic Layout
```
roles/
  example_role/
    defaults/       # Default variables
      main.yml
    files/          # Static files
    handlers/       # Handler definitions
      main.yml
    meta/           # Role metadata
      main.yml
    tasks/          # Task definitions
      main.yml
    templates/      # Jinja2 templates
    vars/           # Role variables
      main.yml
```

### Component Descriptions
- defaults/: Lowest precedence variables
- files/: Static files to copy
- handlers/: Event handlers
- meta/: Role dependencies and info
- tasks/: Core role actions
- templates/: Dynamic files
- vars/: Role-specific variables

## Role Components

### Tasks Directory
```yaml
# tasks/main.yml
---
- name: Install required packages
  apt:
    name: "{{ item }}"
    state: present
  loop: "{{ required_packages }}"

- name: Include web server configuration
  include_tasks: webserver.yml
  when: configure_webserver | bool
```

### Defaults Directory
```yaml
# defaults/main.yml
---
app_port: 8080
app_user: webapp
required_packages:
  - nginx
  - python3
configure_webserver: true
```

### Handlers Directory
```yaml
# handlers/main.yml
---
- name: restart nginx
  service:
    name: nginx
    state: restarted

- name: reload configuration
  service:
    name: nginx
    state: reloaded
```

### Meta Directory
```yaml
# meta/main.yml
---
dependencies:
  - role: common
    vars:
      some_parameter: 3
  - role: security
    version: 1.0.0

galaxy_info:
  author: your_name
  description: Your role description
  license: MIT
  min_ansible_version: 2.9
```

## Role Variables

### Variable Precedence
1. Role defaults (lowest)
2. Inventory variables
3. Host facts
4. Play variables
5. Role and include variables
6. Block variables
7. Task variables
8. Extra variables (highest)

### Variable Organization
```yaml
# vars/main.yml
---
app_config:
  port: "{{ app_port }}"
  user: "{{ app_user }}"
  log_level: info
  max_connections: 1000

security_options:
  ssl_enabled: true
  ssl_protocols: TLSv1.2 TLSv1.3
```

## Best Practices

### Directory Organization
- Keep related files together
- Use meaningful file names
- Maintain consistent structure
- Document file purposes

### File Naming
- Use descriptive names
- Follow consistent patterns
- Keep names simple
- Use lowercase

### Code Structure
- Modular design
- Single responsibility
- Clear dependencies
- Proper documentation

## Practical Exercise

### Creating a Basic Role
1. Initialize role structure
   ```bash
   ansible-galaxy init my_role
   ```
2. Define basic tasks
3. Set default variables
4. Create handlers

### Role Testing
1. Create test playbook
2. Define test inventory
3. Run role tests
4. Verify results

## Key Takeaways
- Organized structure is crucial
- Each directory has a purpose
- Variables have precedence
- Documentation is important

## Additional Resources
- [Ansible Roles Documentation](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_reuse_roles.html)
- [Role Development Guide](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_reuse.html)
- [Best Practices](https://docs.ansible.com/ansible/latest/tips_tricks/ansible_tips_tricks.html)