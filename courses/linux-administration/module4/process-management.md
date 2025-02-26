---
layout: course
title: Process Management
module: 4
order: 1
---

# Process Management

## Understanding Linux Processes

### Process Basics
- Process ID (PID)
- Parent Process ID (PPID)
- Process States
- Process Priority
- Resource Usage

### Process States
- Running (R)
- Sleeping (S)
- Uninterruptible Sleep (D)
- Stopped (T)
- Zombie (Z)

## Process Monitoring

### Basic Process Commands
```bash
ps aux              # List all processes
top                 # Interactive process viewer
htop                # Enhanced process viewer
pgrep pattern       # Find processes by pattern
```

### Process Information
```bash
ps -f pid           # Detailed process info
ps -u username      # User processes
ps -C command       # Find by command name
lsof                # List open files
```

## Job Control

### Foreground and Background
```bash
command &           # Start in background
Ctrl+Z              # Suspend process
bg                  # Resume in background
fg                  # Bring to foreground
jobs                # List jobs
```

### Process Control
```bash
kill pid            # Send SIGTERM
kill -9 pid         # Force kill (SIGKILL)
killall process     # Kill by name
pkill pattern       # Kill by pattern
```

## Process Scheduling

### Nice and Renice
```bash
nice -n value command    # Start with priority
renice value -p pid      # Change priority
```

### Cron Jobs
```bash
crontab -e              # Edit cron jobs
crontab -l              # List cron jobs
# Format: min hour day month weekday command
```

### At Jobs
```bash
at now + 1 hour         # Schedule one-time job
atq                     # List pending jobs
atrm job_number         # Remove scheduled job
```

## System Monitoring

### Resource Usage
```bash
free -h                # Memory usage
uptime                # System load
vmstat                # Virtual memory stats
iostat                # I/O statistics
```

### Performance Monitoring
```bash
sysstat               # System statistics
sar                   # System activity report
dstat                 # System resource stats
```

## Hands-on Practice

### Exercise 1: Process Management
1. Start a process: `sleep 1000 &`
2. List processes: `ps aux | grep sleep`
3. Change priority: `renice +5 -p PID`
4. Terminate process: `kill PID`

### Exercise 2: Job Scheduling
1. Create cron job: `crontab -e`
2. Add daily backup: `0 0 * * * /backup.sh`
3. List scheduled jobs: `crontab -l`

## Process Troubleshooting

### Common Issues
- High CPU usage
- Memory leaks
- Zombie processes
- Hung processes

### Debugging Tools
```bash
strace               # Trace system calls
ltrace               # Library call tracer
gdb                  # GNU debugger
valgrind             # Memory debugger
```

## Additional Resources
- [Linux Process Documentation](https://www.kernel.org/doc/html/latest/admin-guide/)
- [Cron Tutorial](https://crontab.guru/)
- [System Monitoring Tools](https://www.linuxjournal.com/content/monitoring-tools)

## Next Steps
- Learn advanced process management
- Master system monitoring tools
- Understand process priorities
- Explore process debugging