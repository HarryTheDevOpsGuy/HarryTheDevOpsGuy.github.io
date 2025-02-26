---
layout: course
title: User Management
module: 3
order: 1
---

# User Management

## Understanding Linux Users

### Types of Users
- Root user (UID 0)
- System users (UID 1-999)
- Regular users (UID 1000+)

### User Information
- Username
- User ID (UID)
- Group ID (GID)
- Home directory
- Default shell

## User Management Commands

### Creating Users
```bash
useradd -m username    # Create user with home directory
useradd -s /bin/bash -m username  # Specify shell
adduser username       # Interactive user creation
```

### Modifying Users
```bash
usermod -s /bin/zsh username  # Change shell
usermod -L username           # Lock account
usermod -U username           # Unlock account
usermod -aG group username    # Add to supplementary group
```

### Deleting Users
```bash
userdel username       # Delete user
userdel -r username    # Delete user and home directory
```

## Group Management

### Creating Groups
```bash
groupadd groupname     # Create new group
groupadd -g 1001 groupname  # Specify GID
```

### Modifying Groups
```bash
groupmod -n newname oldname  # Rename group
groupmod -g 1002 groupname   # Change GID
```

### Managing Group Membership
```bash
usermod -aG sudo username   # Add to sudo group
gpasswd -a user group       # Add user to group
gpasswd -d user group       # Remove from group
```

## Access Control

### Understanding sudo
- Controlled privilege escalation
- Configuration in /etc/sudoers
- Command-specific permissions

### Configuring sudo Access
```bash
visudo                  # Edit sudoers file safely
# Example configurations:
user ALL=(ALL) ALL     # Full sudo access
user ALL=(ALL) NOPASSWD: ALL  # No password required
```

### Best Practices
- Use least privilege principle
- Regular audit of sudo access
- Remove unnecessary privileges
- Document access changes

## Password Management

### Setting Passwords
```bash
passwd username        # Set user password
chage -d 0 username    # Force password change
chage -M 90 username   # Set maximum password age
```

### Password Policies
- Minimum length requirements
- Complexity rules
- Password aging
- History restrictions

## Hands-on Practice

### Exercise 1: User Creation
1. Create a new user: `sudo useradd -m testuser`
2. Set password: `sudo passwd testuser`
3. Add to groups: `sudo usermod -aG sudo testuser`
4. Verify setup: `id testuser`

### Exercise 2: Group Management
1. Create group: `sudo groupadd developers`
2. Add users: `sudo gpasswd -a testuser developers`
3. Verify membership: `groups testuser`

## Security Considerations

### Account Security
- Regular password changes
- Account lockout policies
- Failed login monitoring
- Session timeout settings

### Audit and Monitoring
```bash
last                   # View login history
w                      # Show logged-in users
who                    # List current users
auth.log              # Authentication log file
```

## Additional Resources
- [Linux User Management Guide](https://www.debian.org/doc/manuals/debian-handbook/basic-configuration.en.html)
- [Sudo Manual](https://www.sudo.ws/man/sudoers.man.html)
- [PAM Documentation](http://www.linux-pam.org/)

## Next Steps
- Implement user policies
- Configure PAM modules
- Set up LDAP authentication
- Learn about access control lists