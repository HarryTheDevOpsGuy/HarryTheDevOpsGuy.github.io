---
layout: course
title: Creating Reusable Roles
description: Learn to develop and maintain Ansible roles effectively
module: 3
order: 1
---

# Creating Reusable Roles

## Role Development Workflow

### Planning Phase
- Define role purpose
- Identify dependencies
- Plan directory structure
- Determine variables

### Implementation Steps
1. Initialize role structure
   ```bash
   ansible-galaxy init role_name
   ```
2. Define metadata
3. Create tasks
4. Set default variables
5. Add handlers if needed

## Role Development Best Practices

### Modularity
- Single responsibility principle
- Clear dependencies
- Minimal coupling
- Maximum cohesion

### Naming Conventions
```yaml
# Good Examples
roles/
  webserver/       # Clear purpose
  database_mysql/  # Specific implementation
  security_base/   # Functional area

# Bad Examples
roles/
  role1/          # Unclear purpose
  stuff/          # Too generic
  misc/           # Not descriptive
```

### Variable Management
```yaml
# defaults/main.yml
---
app_port: 8080
app_user: "webapp"
app_group: "{{ app_user }}"

app_config_template: "app.conf.j2"
app_config_path: "/etc/app/config.conf"

app_features:
  logging: true
  monitoring: false
  backups: true
```

## Testing and Validation

### Test Structure
```yaml
# tests/inventory
[local]
localhost ansible_connection=local

# tests/test.yml
---
- hosts: local
  roles:
    - role: your_role_name
      vars:
        app_port: 9000
```

### Testing Methods
1. Syntax Check
   ```bash
   ansible-playbook --syntax-check tests/test.yml
   ```

2. Dry Run
   ```bash
   ansible-playbook -C tests/test.yml
   ```

3. Full Test
   ```bash
   ansible-playbook tests/test.yml
   ```

### Molecule Testing
```yaml
# molecule/default/molecule.yml
---
dependency:
  name: galaxy
driver:
  name: docker
platforms:
  - name: instance
    image: ubuntu:latest
    pre_build_image: true
provisioner:
  name: ansible
verifier:
  name: ansible
```

## Documentation Standards

### README Structure
```markdown
# Role Name

Brief description of the role's purpose

## Requirements

List prerequisites and dependencies

## Role Variables

Document all variables and their defaults

## Dependencies

List required roles

## Example Playbook

Show usage examples

## License

Specify the license

## Author Information

Provide contact details
```

### Variable Documentation
```yaml
# defaults/main.yml
---
# Port number for the application
# Default: 8080
app_port: 8080

# User to run the application
# Default: webapp
app_user: webapp

# Feature flags for optional components
# Default: see below
app_features:
  logging: true    # Enable application logging
  monitoring: false # Enable monitoring integration
  backups: true    # Enable automated backups
```

## Version Control

### Git Structure
```
role_name/
  .git/
  .gitignore
  molecule/
  tasks/
  templates/
  tests/
  README.md
  meta/main.yml
```

### .gitignore Example
```
*.retry
*.pyc
__pycache__/
.molecule/
.cache/
```

## Practical Exercise

### Creating a Web Server Role
1. Initialize role structure
2. Implement basic tasks
3. Add configuration templates
4. Write tests
5. Document the role

### Role Testing Process
1. Syntax validation
2. Local testing
3. Integration testing
4. Documentation review

## Key Takeaways
- Plan before implementing
- Test thoroughly
- Document comprehensively
- Follow best practices

## Additional Resources
- [Ansible Galaxy Guide](https://galaxy.ansible.com/docs/)
- [Molecule Documentation](https://molecule.readthedocs.io/)
- [Ansible Testing Strategies](https://docs.ansible.com/ansible/latest/reference_appendices/test_strategies.html)