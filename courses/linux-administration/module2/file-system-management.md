---
layout: course
title: File System Management
module: 2
order: 1
---

# File System Management

## File System Hierarchy Standard (FHS)

### Root Directory Structure
- `/` - Root directory
- `/home` - User home directories
- `/etc` - System configuration files
- `/var` - Variable data files
- `/usr` - User programs and data
- `/bin` - Essential command binaries
- `/sbin` - System binaries
- `/tmp` - Temporary files

### Important Directories
- `/opt` - Optional software packages
- `/proc` - Process information
- `/dev` - Device files
- `/boot` - Boot loader files
- `/lib` - System libraries

## File Permissions and Ownership

### Understanding Permissions
```bash
drwxr-xr-x  # Example permission string
# d: directory
# rwx: owner permissions (read, write, execute)
# r-x: group permissions
# r-x: others permissions
```

### Permission Types
- Read (r): 4
- Write (w): 2
- Execute (x): 1

### Changing Permissions
```bash
chmod 755 file.txt  # Set permissions using octal
chmod u+x script.sh  # Add execute permission for user
chmod g-w file.txt  # Remove write permission for group
```

### File Ownership
```bash
chown user:group file.txt  # Change owner and group
chgrp newgroup file.txt    # Change group only
```

## File Manipulation Commands

### Basic File Operations
```bash
touch file.txt     # Create empty file
cp source dest     # Copy files
mv source dest     # Move/rename files
rm file.txt        # Remove files
mkdir dir          # Create directory
rmdir dir          # Remove empty directory
```

### Advanced File Operations
```bash
find . -name "*.txt"   # Find files
grep "pattern" file    # Search in files
tar -czf archive.tar.gz files/  # Create archive
ln -s target link      # Create symbolic link
```

## Hands-on Practice

### Exercise 1: File Permissions
1. Create a new file: `touch test.txt`
2. View permissions: `ls -l test.txt`
3. Change permissions: `chmod 644 test.txt`
4. Change owner: `sudo chown root test.txt`

### Exercise 2: File Operations
1. Create directory structure:
   ```bash
   mkdir -p project/{src,docs,tests}
   touch project/src/{main.py,utils.py}
   ```
2. Copy and move files
3. Create symbolic links

## File System Maintenance

### Disk Usage
```bash
df -h              # Show disk space usage
du -sh directory   # Show directory size
ncdu               # Interactive disk usage analyzer
```

### File System Check
```bash
fsck               # Check and repair file system
e2fsck             # Check ext2/3/4 file systems
tune2fs            # Adjust file system parameters
```

## Additional Resources
- [Linux FHS Documentation](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html)
- [File Permission Calculator](https://chmod-calculator.com/)
- [Linux Command Library](https://linuxcommandlibrary.com/)

## Next Steps
- Practice file permission calculations
- Explore advanced file operations
- Learn about ACLs (Access Control Lists)
- Understand file system attributes