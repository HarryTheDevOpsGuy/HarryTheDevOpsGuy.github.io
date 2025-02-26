---
layout: docs
title: Network Configuration
module: 7
order: 1
---

# Network Configuration

## Basic Networking Concepts

### Network Fundamentals
- IP Addressing (IPv4/IPv6)
- Subnet masks and CIDR notation
- Default gateways
- DNS resolution

### Network Protocols
- TCP/IP protocol suite
- Common ports and services
- Network layers (OSI model)
- Routing basics

## Network Interface Configuration

### Interface Management
```bash
ip addr show           # Show interface addresses
ip link set eth0 up    # Enable interface
ip link set eth0 down  # Disable interface
ifconfig eth0          # Show interface config (legacy)
```

### Static IP Configuration
```bash
# Edit network configuration
vim /etc/network/interfaces  # Debian/Ubuntu
vim /etc/sysconfig/network-scripts/ifcfg-eth0  # RHEL/CentOS

# Example configuration
auto eth0
iface eth0 inet static
    address 192.168.1.100
    netmask 255.255.255.0
    gateway 192.168.1.1
    dns-nameservers 8.8.8.8
```

### DHCP Configuration
```bash
# Enable DHCP
auto eth0
iface eth0 inet dhcp

# DHCP client commands
dhclient eth0          # Request IP from DHCP
dhclient -r eth0       # Release DHCP lease
```

## Network Testing and Troubleshooting

### Basic Network Tools
```bash
ping host             # Test connectivity
traceroute host       # Trace packet route
dig domain            # DNS lookup
nslookup domain       # DNS query
```

### Advanced Network Tools
```bash
netstat -tuln         # Show listening ports
ss -tuln              # Socket statistics
tcpdump -i eth0       # Capture network traffic
wireshark             # GUI packet analyzer
```

## Firewall Management

### UFW (Uncomplicated Firewall)
```bash
ufw enable            # Enable firewall
ufw allow 22          # Allow SSH
ufw deny 80           # Block HTTP
ufw status            # Show rules
```

### Firewalld
```bash
firewall-cmd --state  # Check firewall status
firewall-cmd --list-all  # List all rules
firewall-cmd --add-service=http  # Allow HTTP
firewall-cmd --remove-service=http  # Remove HTTP
```

### IPTables
```bash
iptables -L           # List rules
iptables -A INPUT -p tcp --dport 22 -j ACCEPT  # Allow SSH
iptables -A INPUT -p tcp --dport 80 -j DROP    # Block HTTP
iptables-save         # Save rules
```

## Network Security

### SSH Configuration
```bash
vim /etc/ssh/sshd_config  # Configure SSH server
ssh-keygen            # Generate SSH keys
ssh-copy-id user@host # Copy SSH key to server
```

### Security Best Practices
- Use strong authentication
- Implement access controls
- Regular security updates
- Monitor network traffic

## Hands-on Practice

### Exercise 1: Network Configuration
1. Configure static IP:
   ```bash
   sudo ip addr add 192.168.1.100/24 dev eth0
   sudo ip route add default via 192.168.1.1
   ```
2. Test connectivity
3. Configure DNS resolution

### Exercise 2: Firewall Setup
1. Enable firewall
2. Configure basic rules
3. Test access control

## Network Monitoring

### Monitoring Tools
```bash
iptraf-ng             # Interactive network monitor
bandwidthd            # Bandwidth monitoring
ntop                  # Network traffic monitor
nagios                # Network monitoring system
```

### Performance Analysis
```bash
iperf3                # Network performance test
mtr host              # Network diagnostic tool
netperf               # Network performance benchmark
```

## Additional Resources
- [Linux Networking Guide](https://www.linux.com/training-tutorials/linux-networking-basics/)
- [Firewalld Documentation](https://firewalld.org/documentation/)
- [IPTables Tutorial](https://www.frozentux.net/iptables-tutorial/)

## Next Steps
- Learn advanced networking concepts
- Master firewall configuration
- Study network security
- Explore network automation