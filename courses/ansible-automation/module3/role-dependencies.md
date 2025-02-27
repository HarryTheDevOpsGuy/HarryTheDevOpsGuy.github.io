---
layout: course
title: Role Dependencies and Galaxy
description: Managing Ansible role dependencies and using Ansible Galaxy
module: 3
order: 2
---

# Role Dependencies and Galaxy

## Role Dependencies

### Defining Dependencies
```yaml
# meta/main.yml
---
dependencies:
  - role: common
    vars:
      common_user: webadmin
      common_group: webadmin

  - role: security_baseline
    vars:
      security_level: high

  - src: geerlingguy.nginx
    version: "2.8.0"
```

### Managing Dependencies
- Version control
- Conflict resolution
- Circular dependency prevention
- Testing dependencies

## Using Ansible Galaxy

### Installing Roles
```bash
# Install a specific role
ansible-galaxy install username.role_name

# Install from requirements file
ansible-galaxy install -r requirements.yml

# Install specific version
ansible-galaxy install username.role_name,v1.0.0
```

### Requirements File
```yaml
# requirements.yml
---
- src: geerlingguy.nginx
  version: "2.8.0"

- src: https://github.com/username/ansible-role-security.git
  scm: git
  version: master
  name: security

- src: https://github.com/organization/database-role
  scm: git
  version: v1.1.0
```

## Sharing Roles

### Role Preparation
1. Documentation
   - Complete README
   - Variable documentation
   - Example playbooks
   - License information

2. Testing
   - Molecule tests
   - CI/CD integration
   - Multiple platforms

3. Metadata
```yaml
# meta/main.yml
galaxy_info:
  author: Your Name
  description: Role description
  company: Your Company
  license: MIT
  min_ansible_version: 2.9

  platforms:
    - name: EL
      versions:
        - 7
        - 8
    - name: Ubuntu
      versions:
        - bionic
        - focal

  galaxy_tags:
    - web
    - nginx
    - security
```

### Publishing to Galaxy
```bash
# Create Galaxy account
# Login to Galaxy
ansible-galaxy login

# Import role
ansible-galaxy import username role_name
```

## Role Versioning

### Version Control
- Semantic versioning
- Release tags
- Changelog maintenance
- Version constraints

### Version File
```yaml
# VERSION
1.2.3
```

### Changelog Example
```markdown
# Changelog

## [1.2.3] - 2024-01-20
### Added
- New feature X
- Support for platform Y

### Changed
- Updated dependency versions
- Improved error handling

### Fixed
- Bug in configuration template
- Issue with service restart
```

## Best Practices

### Dependency Management
- Minimize dependencies
- Version pinning
- Regular updates
- Dependency testing

### Galaxy Integration
- Quality metadata
- Comprehensive tests
- Regular maintenance
- User feedback handling

## Practical Exercise

### Working with Galaxy
1. Search for roles
2. Install dependencies
3. Create requirements file
4. Test integration

### Publishing a Role
1. Prepare documentation
2. Run tests
3. Create release
4. Publish to Galaxy

## Key Takeaways
- Dependencies need careful management
- Galaxy provides role sharing
- Documentation is crucial
- Version control matters

## Additional Resources
- [Ansible Galaxy Guide](https://galaxy.ansible.com/docs/)
- [Role Dependencies](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_reuse_roles.html#role-dependencies)
- [Publishing Roles](https://galaxy.ansible.com/docs/contributing/creating_role.html)