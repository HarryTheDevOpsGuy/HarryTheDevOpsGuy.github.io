---
layout: course
title: YAML Essentials
description: Understanding YAML syntax and structure for Ansible
module: 2
order: 1
---

# YAML Essentials

## YAML Syntax Overview

### Basic Rules
- Case sensitive
- Indentation matters
- Uses spaces (not tabs)
- Key-value pairs

### Document Structure
- Start with `---`
- End with `...` (optional)
- Comments use `#`
- Hierarchical structure

## Data Types and Structures

### Scalars
- Strings
  ```yaml
  name: "John Doe"
  description: 'A simple string'
  unquoted: This is also a string
  ```

- Numbers
  ```yaml
  integer: 42
  float: 3.14
  scientific: 1.23e-4
  ```

- Booleans
  ```yaml
  true_value: true
  false_value: false
  yes_value: yes
  no_value: no
  ```

### Collections

#### Lists
```yaml
fruits:
  - apple
  - banana
  - orange

# Alternative syntax
fruits: [apple, banana, orange]
```

#### Dictionaries
```yaml
user:
  name: John
  age: 30
  roles:
    - admin
    - developer

# Alternative syntax
user: {name: John, age: 30}
```

## Common YAML Patterns

### Multi-line Strings
```yaml
description: |
  This is a long
  multi-line string
  that preserves newlines

folded_text: >
  This is a long text
  that will be folded
  into a single line
```

### Anchors and Aliases
```yaml
defaults: &defaults
  timeout: 30
  retries: 3

webserver:
  <<: *defaults
  port: 80
```

## YAML in Ansible

### Playbook Structure
```yaml
---
- name: Example Playbook
  hosts: webservers
  become: true
  tasks:
    - name: Install Apache
      yum:
        name: httpd
        state: present
```

### Variables
```yaml
vars:
  http_port: 80
  max_clients: 200

vars_files:
  - vars/common.yml
  - vars/webserver.yml
```

## Common Mistakes

### Indentation Issues
```yaml
# Incorrect
tasks:
- name: Install package
yum:
    name: httpd

# Correct
tasks:
  - name: Install package
    yum:
      name: httpd
```

### Quoting Special Characters
```yaml
# Incorrect
command: echo * > output.txt

# Correct
command: "echo * > output.txt"
```

## Best Practices
- Use consistent indentation
- Quote strings with special characters
- Use descriptive keys
- Keep files organized
- Comment complex structures

## Practical Exercise

### Writing a Simple YAML File
1. Create a new file
2. Define basic structures
3. Validate syntax

### Common Tools
- `yamllint` for validation
- Online YAML validators
- Text editors with YAML support

## Key Takeaways
- YAML is human-readable
- Proper indentation is crucial
- Understanding data types helps
- Practice improves proficiency

## Additional Resources
- [YAML Specification](https://yaml.org/spec/1.2.2/)
- [Ansible YAML Syntax](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html)
- [Online YAML Validator](https://www.yamllint.com/)