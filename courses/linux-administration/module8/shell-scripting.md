---
layout: docs
title: Shell Scripting
module: 8
order: 1
---

# Shell Scripting

## Bash Scripting Fundamentals

### Script Structure
```bash
#!/bin/bash
# Script description
# Author: Your Name
# Date: YYYY-MM-DD

# Variables
NAME="Linux Admin"

# Main script content
echo "Hello, $NAME!"
```

### Variables and Data Types
- String variables
- Numeric variables
- Arrays
- Environment variables

### Basic Operations
```bash
# String operations
STR="Hello World"
echo ${#STR}          # String length
echo ${STR:0:5}       # String slice

# Arithmetic operations
A=5
B=3
echo $((A + B))       # Addition
echo $((A * B))       # Multiplication
```

## Control Structures

### Conditional Statements
```bash
if [ $A -eq $B ]; then
    echo "Equal"
elif [ $A -gt $B ]; then
    echo "Greater"
else
    echo "Lesser"
fi

# Case statement
case $VAR in
    1) echo "One" ;;
    2) echo "Two" ;;
    *) echo "Other" ;;
esac
```

### Loops
```bash
# For loop
for i in {1..5}; do
    echo $i
done

# While loop
while [ $count -lt 5 ]; do
    echo $count
    ((count++))
done
```

## Script Automation

### Functions
```bash
# Function definition
greet() {
    local name=$1
    echo "Hello, $name!"
}

# Function call
greet "John"
```

### Command Line Arguments
```bash
echo "Script name: $0"
echo "First argument: $1"
echo "All arguments: $@"
echo "Number of arguments: $#"
```

### Input/Output
```bash
# Read user input
read -p "Enter name: " name

# File operations
while IFS= read -r line; do
    echo "$line"
done < input.txt
```

## Error Handling and Debugging

### Error Handling
```bash
# Exit on error
set -e

# Error handling function
handle_error() {
    echo "Error on line $1"
    exit 1
}

trap 'handle_error $LINENO' ERR
```

### Debugging Techniques
```bash
# Enable debug mode
set -x

# Debug specific section
set -x
# debugging starts
commands here
set +x
# debugging ends
```

## Hands-on Practice

### Exercise 1: Basic Script
1. Create a backup script:
```bash
#!/bin/bash

BACKUP_DIR="/backup"
SOURCE_DIR="/data"

# Create backup
tar -czf "$BACKUP_DIR/backup-$(date +%F).tar.gz" "$SOURCE_DIR"
```

### Exercise 2: System Monitoring
1. Create a system monitoring script:
```bash
#!/bin/bash

while true; do
    echo "Memory Usage:"
    free -h
    echo "CPU Load:"
    uptime
    sleep 5
done
```

## Best Practices

### Script Organization
- Use meaningful variable names
- Comment your code
- Modular design
- Version control

### Security Considerations
- Input validation
- Secure file permissions
- Avoid shell injection
- Use restricted paths

## Additional Resources
- [Bash Guide](https://mywiki.wooledge.org/BashGuide)
- [Shell Scripting Tutorial](https://www.shellscript.sh/)
- [Advanced Bash Scripting Guide](https://tldp.org/LDP/abs/html/)

## Next Steps
- Learn advanced scripting techniques
- Study regular expressions
- Explore script testing
- Implement automation solutions