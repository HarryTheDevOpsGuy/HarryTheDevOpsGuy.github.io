---
layout: docs
title: System Services
module: 6
order: 1
---

# System Services

## SystemD Service Management

### Understanding SystemD
- Init system and service manager
- Unit types (services, mounts, timers)
- Dependency management
- System state control

### Basic SystemD Commands
```bash
systemctl start service    # Start a service
systemctl stop service     # Stop a service
systemctl restart service  # Restart a service
systemctl status service   # Check service status
```

### Service Management
```bash
systemctl enable service   # Enable at boot
systemctl disable service  # Disable at boot
systemctl is-active service # Check if running
systemctl is-enabled service # Check if enabled
```

## Boot Process

### Boot Sequence
1. BIOS/UEFI
2. Boot loader (GRUB)
3. Kernel initialization
4. SystemD initialization
5. User space startup

### GRUB Configuration
```bash
grub2-mkconfig -o /boot/grub2/grub.cfg  # Update GRUB
grub2-set-default 0      # Set default entry
grub2-editenv list       # Show boot settings
```

### Runlevels and Targets
- Traditional runlevels (0-6)
- SystemD targets
- Target dependencies

### SystemD Targets
```bash
systemctl list-units --type=target  # List targets
systemctl get-default              # Show default target
systemctl set-default multi-user.target  # Set default
systemctl isolate graphical.target # Change current target
```

## Log Management

### SystemD Journal
```bash
journalctl              # View all logs
journalctl -u service   # Service-specific logs
journalctl -f           # Follow new entries
journalctl --since today # Today's logs
```

### Traditional Logging
```bash
/var/log/syslog        # System logs
/var/log/auth.log      # Authentication logs
/var/log/kern.log      # Kernel logs
/var/log/dmesg         # Boot messages
```

### Log Rotation
```bash
logrotate              # Rotate log files
/etc/logrotate.conf    # Main configuration
/etc/logrotate.d/      # Service configurations
```

## Hands-on Practice

### Exercise 1: Service Management
1. Check service status:
   ```bash
   systemctl status nginx
   systemctl status sshd
   ```
2. Start and enable services:
   ```bash
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

### Exercise 2: Log Analysis
1. View system logs:
   ```bash
   journalctl -p err
   tail -f /var/log/syslog
   ```
2. Configure log rotation
3. Search for specific events

## System Recovery

### Emergency Mode
- Boot into emergency target
- Root filesystem repair
- Password recovery

### Recovery Procedures
```bash
systemctl emergency    # Emergency mode
systemctl rescue       # Rescue mode
fsck /dev/sda1         # File system check
passwd root           # Reset root password
```

## Service Security

### Security Best Practices
- Minimal service exposure
- Regular security updates
- Service hardening
- Audit logging

### Service Hardening
```bash
systemctl list-dependencies   # Check dependencies
systemd-analyze security      # Security analysis
systemctl mask service        # Prevent service start
```

## Additional Resources
- [SystemD Documentation](https://www.freedesktop.org/wiki/Software/systemd/)
- [GRUB2 Guide](https://www.gnu.org/software/grub/manual/grub/)
- [Linux Logging Guide](https://www.loggly.com/ultimate-guide/linux-logging-basics/)

## Next Steps
- Learn advanced service configuration
- Master log analysis
- Understand service dependencies
- Study system recovery procedures