---
layout: blog
title: "How to Set Up a Kafka Cluster with KRaft on EC2 Linux Instances"
description: "How to Set Up a Kafka Cluster with KRaft on EC2 Linux Instances"
date: 2024-12-07
category: HowTos

---

# How to Set Up a Kafka Cluster with KRaft on EC2 Linux Instances

Apache Kafka is a distributed event-streaming platform widely used for building real-time data pipelines and applications. With the introduction of KRaft (Kafka Raft), Kafka no longer requires Zookeeper for metadata management, simplifying its deployment. In this guide, we will walk through setting up a Kafka cluster using KRaft on Amazon EC2 Linux instances.

## Prerequisites

Before you begin, ensure you have the following:

1. **AWS Account**: You need an AWS account to launch EC2 instances.
2. **EC2 Instances**: At least two EC2 instances (one for the controller and one for the broker). You can use Amazon Linux 2 or Ubuntu.
3. **SSH Access**: Ensure you have SSH access to the EC2 instances.
4. **Java Installed**: Kafka requires Java. Install OpenJDK 11 or later on all instances.
5. **Security Groups**: Configure security groups to allow communication between instances on ports `9092` (Kafka), `9093` (controller), and other necessary ports.

---

## Step 1: Launch EC2 Instances

1. Log in to the AWS Management Console.
2. Navigate to the EC2 Dashboard and click "Launch Instance."
3. Choose an Amazon Machine Image (AMI) such as Amazon Linux 2 or Ubuntu.
4. Select an instance type (e.g., `t2.medium`) and configure the instance details.
5. Add storage and configure the security group to allow inbound traffic on:
   - Port `22` (SSH)
   - Port `9092` (Kafka broker)
   - Port `9093` (Kafka controller)
6. Launch the instances and download the `.pem` key file for SSH access.

Repeat this process to create at least two instances: one for the controller and one for the broker.

---

## Step 2: Install Java

Kafka requires Java to run. Follow these steps on all EC2 instances:

1. Connect to your EC2 instance via SSH:
   ```bash
   ssh -i /path/to/your-key.pem ec2-user@<public-ip>
   ```
2. Update the package manager:
   ```bash
   sudo yum update -y  # For Amazon Linux
   sudo apt update -y  # For Ubuntu
   ```
3. Install OpenJDK 11:
   ```bash
   sudo yum install java-11-openjdk-devel -y  # For Amazon Linux
   sudo apt install openjdk-11-jdk -y        # For Ubuntu
   ```
4. Verify the Java installation:
   ```bash
   java -version
   ```

---

## Step 3: Download and Configure Kafka

1. Download Kafka from the official Apache website:
   ```bash
   wget https://downloads.apache.org/kafka/3.6.0/kafka_2.13-3.6.0.tgz
   ```
2. Extract the Kafka archive:
   ```bash
   tar -xzf kafka_2.13-3.6.0.tgz
   cd kafka_2.13-3.6.0
   ```
3. Create directories for logs and data:
   ```bash
   mkdir -p /tmp/kraft-combined-logs
   mkdir -p /tmp/kraft-controller-data
   mkdir -p /tmp/kraft-broker-data
   ```

---

## Step 4: Generate a Cluster UUID

Each Kafka cluster requires a unique identifier. Generate a UUID for your cluster:

```bash
bin/kafka-storage.sh random-uuid
```

Save the generated UUID as it will be used in the configuration files.

---

## Step 5: Configure the Controller Node

1. Edit the `server.properties` file for the controller node:
   ```bash
   nano config/kraft/server.properties
   ```
2. Add the following configuration:
   ```properties
   process.roles=controller
   node.id=1
   listeners=CONTROLLER://<controller-private-ip>:9093
   controller.quorum.voters=1@<controller-private-ip>:9093
   log.dirs=/tmp/kraft-controller-data
   cluster.id=<generated-cluster-uuid>
   ```
   Replace `<controller-private-ip>` with the private IP of the controller instance and `<generated-cluster-uuid>` with the UUID generated earlier.

3. Format the storage directory:
   ```bash
   bin/kafka-storage.sh format -t <generated-cluster-uuid> -c config/kraft/server.properties
   ```

4. Start the Kafka controller:
   ```bash
   bin/kafka-server-start.sh config/kraft/server.properties
   ```

---

## Step 6: Configure the Broker Node

1. Edit the `server.properties` file for the broker node:
   ```bash
   nano config/kraft/server.properties
   ```
2. Add the following configuration:
   ```properties
   process.roles=broker
   node.id=2
   listeners=PLAINTEXT://<broker-private-ip>:9092,CONTROLLER://<broker-private-ip>:9093
   controller.quorum.voters=1@<controller-private-ip>:9093
   log.dirs=/tmp/kraft-broker-data
   cluster.id=<generated-cluster-uuid>
   ```
   Replace `<broker-private-ip>` with the private IP of the broker instance and `<generated-cluster-uuid>` with the UUID generated earlier.

3. Format the storage directory:
   ```bash
   bin/kafka-storage.sh format -t <generated-cluster-uuid> -c config/kraft/server.properties
   ```

4. Start the Kafka broker:
   ```bash
   bin/kafka-server-start.sh config/kraft/server.properties
   ```

---

## Step 7: Test the Kafka Cluster

1. Create a topic:
   ```bash
   bin/kafka-topics.sh --create --topic test-topic --partitions 1 --replication-factor 1 --bootstrap-server <broker-private-ip>:9092
   ```
2. Produce messages to the topic:
   ```bash
   bin/kafka-console-producer.sh --topic test-topic --bootstrap-server <broker-private-ip>:9092
   ```
3. Consume messages from the topic:
   ```bash
   bin/kafka-console-consumer.sh --topic test-topic --from-beginning --bootstrap-server <broker-private-ip>:9092
   ```

---

## Step 8: Automate and Scale

To make your Kafka cluster production-ready:
- Use systemd to manage Kafka services.
- Add more broker nodes by repeating Step 6 with unique `node.id` values.
- Monitor the cluster using tools like Prometheus and Grafana.

---

## Conclusion

You have successfully set up a Kafka cluster with KRaft on EC2 Linux instances. This setup eliminates the dependency on Zookeeper and provides a simplified architecture for managing Kafka metadata. You can now use this cluster to build scalable, real-time data pipelines and applications.

