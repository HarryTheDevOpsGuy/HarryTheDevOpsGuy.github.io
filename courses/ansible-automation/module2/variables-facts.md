---
layout: course
title: Variables and Facts
description: Understanding Ansible variables and facts gathering
module: 2
order: 3
---

# Variables and Facts

## Variable Types

### Playbook Variables
```yaml
vars:
  http_port: 80
  max_clients: 200
  server_name: web01

vars_files:
  - vars/common.yml
  - vars/webserver.yml
```

### Inventory Variables
```ini
[webservers]
web1.example.com http_port=8080 max_clients=100
web2.example.com http_port=8081 max_clients=200

[webservers:vars]
server_type=apache
env=production
```

### Group Variables
```yaml
# group_vars/webservers.yml
http_port: 80
max_clients: 200
server_type: nginx

# group_vars/all.yml
company_name: Example Corp
default_timezone: UTC
```

## Variable Scope

### Global Scope
- Role defaults
- Inventory variables
- Playbook variables
- Extra variables (highest precedence)

### Host Scope
- Host inventory variables
- Host facts
- Registered variables

### Play Scope
- Play variables
- Task variables
- Block variables

## Ansible Facts

### System Facts
{% raw %}
```yaml
- name: Display system facts
  debug:
    msg: |
      OS Family: {{ ansible_os_family }}
      Distribution: {{ ansible_distribution }}
      Version: {{ ansible_distribution_version }}
      Architecture: {{ ansible_architecture }}
```
{% endraw %}

### Custom Facts
```yaml
- name: Create custom fact directory
  file:
    path: /etc/ansible/facts.d
    state: directory

- name: Add custom fact file
  copy:
    content: |
      [application]
      version=1.2.3
      environment=production
    dest: /etc/ansible/facts.d/application.fact
```

## Working with Variables

### Variable Precedence
1. Command line extra vars
2. Task variables
3. Block variables
4. Role and include variables
5. Playbook variables
6. Inventory variables
7. Role defaults

### Variable Usage
{% raw %}
```yaml
- name: Configure application
  template:
    src: app.conf.j2
    dest: "/etc/{{ app_name }}/config.conf"
  vars:
    app_name: myapp
    app_port: "{{ http_port | default(8080) }}"
```
{% endraw %}

## Fact Gathering

### Controlling Fact Gathering
```yaml
---
- hosts: webservers
  gather_facts: yes  # or no
  tasks:
    - name: Show system memory
      debug:
        msg: "Total memory: {{ ansible_memtotal_mb }}MB"
```

### Custom Fact Gathering
```yaml
- name: Gather custom facts
  setup:
    filter: ansible_local

- name: Display custom facts
  debug:
    var: ansible_local
```

## Best Practices

### Variable Naming
- Use descriptive names
- Follow consistent naming conventions
- Use lowercase and underscores
- Prefix role variables

### Variable Organization
- Group related variables
- Use separate variable files
- Document variable purposes
- Consider variable precedence

## Practical Exercise

### Working with Variables
1. Create variable files
2. Use variables in playbooks
3. Override variables
4. View variable precedence

### Fact Management
1. Gather system facts
2. Create custom facts
3. Use facts in playbooks
4. Filter fact gathering

## Key Takeaways
- Variables provide flexibility
- Facts offer system information
- Understand variable precedence
- Organize variables effectively

## Additional Resources
- [Variable Guide](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_variables.html)
- [Facts Guide](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_vars_facts.html)
- [Variable Precedence](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_variables.html#variable-precedence-where-should-i-put-a-variable)