---
layout: course
title: Package Management
module: 5
order: 1
---

# Package Management

## Understanding Package Managers

### Package Management Systems
- APT (Advanced Package Tool) - Debian/Ubuntu
- YUM (Yellowdog Updater Modified) - RHEL/CentOS
- DNF (Dandified YUM) - Fedora/RHEL 8+
- Zypper - openSUSE

## APT Package Manager

### Basic APT Commands
```bash
apt update              # Update package lists
apt upgrade             # Upgrade installed packages
apt install package    # Install a package
apt remove package     # Remove a package
apt autoremove         # Remove unused dependencies
```

### Advanced APT Usage
```bash
apt search keyword     # Search for packages
apt show package       # Show package details
apt list --installed   # List installed packages
apt clean              # Clean package cache
```

## YUM Package Manager

### Basic YUM Commands
```bash
yum check-update       # Check for updates
yum update             # Update packages
yum install package    # Install a package
yum remove package     # Remove a package
yum autoremove         # Remove unused dependencies
```

### Advanced YUM Usage
```bash
yum search keyword     # Search for packages
yum info package       # Show package info
yum list installed     # List installed packages
yum clean all         # Clean cache and metadata
```

## Repository Management

### APT Repository Management
```bash
# Add repository
add-apt-repository ppa:user/repo-name

# Edit sources
vim /etc/apt/sources.list

# Manage repository keys
apt-key add key.gpg
apt-key del keyid
```

### YUM Repository Management
```bash
# Add repository file
vim /etc/yum.repos.d/repo-name.repo

# Import GPG key
rpm --import key.gpg

# List repositories
yum repolist
```

## Package Dependencies

### Managing Dependencies
- Understanding dependency resolution
- Handling conflicts
- Broken package fixes

### Troubleshooting
```bash
# APT
apt --fix-broken install
dpkg --configure -a

# YUM
yum deplist package
yum resolve
```

## Software Installation from Source

### Compilation Steps
```bash
# Install build tools
apt install build-essential   # Debian/Ubuntu
yum groupinstall "Development Tools"   # RHEL/CentOS

# Basic compilation
./configure
make
make install
```

## Hands-on Practice

### Exercise 1: Package Management
1. Update system:
   ```bash
   # Debian/Ubuntu
   sudo apt update && sudo apt upgrade
   
   # RHEL/CentOS
   sudo yum update
   ```

2. Install and remove packages:
   ```bash
   # Install package
   sudo apt install nginx
   
   # Remove package
   sudo apt remove nginx
   ```

### Exercise 2: Repository Management
1. Add a new repository
2. Import GPG key
3. Install software from new repository
4. Verify installation

## Best Practices

### System Updates
- Regular system updates
- Security updates priority
- Update scheduling
- Backup before major upgrades

### Package Management
- Verify package authenticity
- Keep clean package cache
- Document installed packages
- Use version control for configs

## Additional Resources
- [Ubuntu Package Management Guide](https://ubuntu.com/server/docs/package-management)
- [RHEL Package Management Guide](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/managing_software_with_the_dnf_tool/index)
- [Debian Package Management](https://www.debian.org/doc/manuals/debian-reference/ch02.en.html)

## Next Steps
- Learn about configuration management tools
- Explore automated package deployment
- Study package building
- Understand package security