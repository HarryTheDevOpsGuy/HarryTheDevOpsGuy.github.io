---
layout: course
title: Writing Playbooks
description: Learn to create and structure Ansible playbooks
module: 2
order: 2
---

# Writing Playbooks

## Playbook Structure

### Basic Components
- Name and hosts
- Variables and facts
- Tasks and modules
- Handlers and notifications

### Playbook Format
```yaml
---
- name: Configure web servers
  hosts: webservers
  become: true
  vars:
    http_port: 80
    max_clients: 200

  tasks:
    - name: Install Apache
      yum:
        name: httpd
        state: present

    - name: Start Apache service
      service:
        name: httpd
        state: started
        enabled: true
```

## Tasks and Modules

### Task Structure
- Name (description)
- Module selection
- Module parameters
- Optional parameters

### Common Modules
```yaml
# Package management
- name: Install packages
  yum:
    name: [httpd, php, mysql]
    state: present

# Service management
- name: Manage service
  service:
    name: httpd
    state: started

# File operations
- name: Copy configuration
  copy:
    src: files/httpd.conf
    dest: /etc/httpd/conf/httpd.conf
```

## Handlers and Notifications

### Handler Definition
```yaml
handlers:
  - name: restart apache
    service:
      name: httpd
      state: restarted

  - name: reload apache
    service:
      name: httpd
      state: reloaded
```

### Notifying Handlers
```yaml
tasks:
  - name: Update Apache configuration
    copy:
      src: files/httpd.conf
      dest: /etc/httpd/conf/httpd.conf
    notify: restart apache
```

## Task Control

### Conditionals
```yaml
tasks:
  - name: Install Apache (RedHat)
    yum:
      name: httpd
      state: present
    when: ansible_os_family == "RedHat"

  - name: Install Apache (Debian)
    apt:
      name: apache2
      state: present
    when: ansible_os_family == "Debian"
```

### Loops
```yaml
tasks:
  - name: Create users
    user:
      name: "{{ item }}"
      state: present
    loop:
      - john
      - jane
      - bob
```

## Error Handling

### Ignore Errors
```yaml
tasks:
  - name: Run potentially failing command
    command: /bin/false
    ignore_errors: true
```

### Block Error Handling
```yaml
blocks:
  - block:
      - name: Run risky task
        command: /bin/risky_command
    rescue:
      - name: Run recovery task
        command: /bin/recovery_command
    always:
      - name: Always run this task
        command: /bin/cleanup_command
```

## Best Practices

### Organization
- Use meaningful names
- Group related tasks
- Keep playbooks focused
- Use roles for reusability

### Documentation
- Add comments
- Use descriptive names
- Include usage examples
- Document variables

### Version Control
- Use Git for playbooks
- Follow branching strategy
- Review changes
- Test before merging

## Practical Exercise

### Creating a Web Server Playbook
1. Define inventory
2. Write basic tasks
3. Add handlers
4. Test and verify

### Debugging Tips
- Use `--check` mode
- Enable verbose output
- Check syntax
- Use `debug` module

## Key Takeaways
- Structure matters
- Use handlers effectively
- Implement error handling
- Follow best practices

## Additional Resources
- [Ansible Playbook Documentation](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks.html)
- [Best Practices Guide](https://docs.ansible.com/ansible/latest/tips_tricks/ansible_tips_tricks.html)
- [Module Index](https://docs.ansible.com/ansible/latest/collections/index_module.html)