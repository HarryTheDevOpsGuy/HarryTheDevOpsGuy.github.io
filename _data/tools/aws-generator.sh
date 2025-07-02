#https://instances.vantage.sh/?memory_expr=%3C%3D32&vcpus_expr=%3C%3D8&memory_per_vcpu_expr=%3E%3D0&gpu_memory_expr=%3E%3D0&gpus_expr=%3E%3D0&maxips_expr=%3E%3D0&storage_expr=%3E%3D0&filter=&region=ap-south-1&pricing_unit=instance&cost_duration=hourly&reserved_term=yrTerm1Standard.noUpfront&compare_on=false

# https://instances.vantage.sh/?memory_expr=%3C%3D32&vcpus_expr=%3C%3D8&memory_per_vcpu_expr=%3E%3D0&gpu_memory_expr=%3E%3D0&gpus_expr=%3E%3D0&maxips_expr=%3E%3D0&storage_expr=%3E%3D0&filter=&region=ap-south-1&pricing_unit=instance&cost_duration=hourly&reserved_term=yrTerm1Standard.noUpfront&compare_on=false&selected=m8g.xlarge%2Ct3a.xlarge

#!/bin/sh

INPUT="data.csv"

echo "instances:"
awk -F',' '
  BEGIN {
    OFS="";
  }
  {
    # Skip header line if present
    if (NR == 1 && $1 ~ /[A-Za-z ]+Instance/) next;

    gsub(/ GiB/, "", $4);         # Strip " GiB"
    gsub(/ vCPUs/, "", $5);       # Strip " vCPUs"
    gsub(/^\$/, "", $7);          # Remove leading $
    gsub(/ hourly/, "", $7);      # Remove " hourly"

    printf "  - type: %s\n", $2;
    printf "    cpu: %d\n", $5;
    printf "    memory: %g\n", $4;
    printf "    hourly: %.4f\n", $7;
  }
' "$INPUT"
