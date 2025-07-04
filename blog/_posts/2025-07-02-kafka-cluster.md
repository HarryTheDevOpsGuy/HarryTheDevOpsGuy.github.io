---
layout: post
title: "How to Set Up Kafka 4.0.0 Without Zookeeper Using KRaft Mode"
date: 2024-01-15
categories: [kafka, devops]
tags: [kafka, kraft, zookeeper, event-streaming, distributed-systems]
description: "Step-by-step guide to deploying a modern Apache Kafka 4.0.0 cluster without Zookeeper using the new KRaft metadata mode."
---

# How to Set Up the Latest Apache Kafka Cluster Without Zookeeper Using KRaft (Kafka Raft Metadata) in 4.0.0

Apache Kafka has undergone a major architectural shift with the introduction of **KRaft (Kafka Raft Metadata)**, which allows running Kafka clusters without relying on **ZooKeeper** for metadata management. Starting from version **3.5**, and fully supported in **Kafka 4.0.0**, KRaft replaces ZooKeeper by using a Raft protocol implementation to manage cluster metadata internally.

This guide will walk you through setting up a **Kafka 4.0.0 cluster without ZooKeeper**, using the new **KRaft mode**.

---

## 🧰 Prerequisites

Before proceeding, ensure your environment meets the following:

- **Java 11+** installed
- At least **2 nodes** for a minimal production setup (controller + broker)
- Or a single node for testing purposes
- Proper network connectivity between nodes
- wget or curl installed

---

## 📦 Step 1: Download Apache Kafka 4.0.0

You can download Kafka 4.0.0 from [https://kafka.apache.org/downloads](https://kafka.apache.org/downloads).

```bash
wget https://downloads.apache.org/kafka/4.0.0/kafka_2.13-4.0.0.tgz
tar -xzf kafka_2.13-4.0.0.tgz
cd kafka_2.13-4.0.0
```

> Replace `2.13` with your desired Scala version if needed.

---

## 🧭 Step 2: Understand KRaft Architecture

In KRaft mode, Kafka separates **metadata management** into **Controller Quorum** and **Data Nodes (Brokers)**.

- **Controller Node(s):** Handle metadata changes like topic creation, leader elections, etc.
- **Broker Node(s):** Host data partitions and serve producer/consumer traffic.

For small clusters, a **combined controller and broker node** is acceptable. For production, it's recommended to run them separately.

---

## 🗂️ Step 3: Configure Controller Quorum

### On Controller Node(s)

Create a config file: `config/controller.properties`

```properties
process.roles=broker,controller
node.id=1
controller.quorum.voters=1@localhost:19091
listeners=PLAINTEXT://:9092,CONTROLLER://:19091
inter.broker.listener.name=PLAINTEXT
controller.listener.names=CONTROLLER
log.dirs=/tmp/kafka-logs
num.partitions=1
default.replication.factor=1
min.insync.replicas=1
log.retention.hours=168
log.segment.bytes=1073741824
log.retention.check.interval.ms=300000
zookeeper.connection.timeout.ms=18000
group.initial.rebalance.delay.ms=0
```

> Adjust `node.id` and IP addresses accordingly for multi-node setups.

---

## 🚦 Step 4: Format the Storage Directory

Before starting Kafka in KRaft mode, you need to format the storage directory with a **metadata quorum ID** and **node ID**.

Run this command once to initialize:

```bash
bin/kafka-storage.sh format -t <quorum-id> -c config/controller.properties
```

To generate a unique quorum ID:

```bash
openssl rand -hex 8
```

Example:

```bash
bin/kafka-storage.sh format -t 55016f82abcd1234 -c config/controller.properties
```

---

## ▶️ Step 5: Start Kafka in KRaft Mode

Now start the Kafka process:

```bash
bin/kafka-server-start.sh config/controller.properties
```

If everything starts successfully, you’ll see logs indicating that both the controller and broker are active.

---

## 🛠️ Step 6: Create Topics and Produce Messages

Once the cluster is up, you can create topics and produce messages as usual.

### Create a Topic

```bash
bin/kafka-topics.sh --create --topic test-topic --partitions 3 --replication-factor 1 --bootstrap-server localhost:9092
```

### List Topics

```bash
bin/kafka-topics.sh --list --bootstrap-server localhost:9092
```

### Produce Messages

```bash
bin/kafka-console-producer.sh --topic test-topic --bootstrap-server localhost:9092
```

### Consume Messages

```bash
bin/kafka-console-consumer.sh --topic test-topic --from-beginning --bootstrap-server localhost:9092
```

---

## 🧱 Step 7: Multi-Node Setup (Optional)

For a multi-node cluster:

- Each node should have its own `controller.properties`
- Define multiple `controller.quorum.voters` entries across all controllers
- Ensure all nodes can communicate via the specified ports

Example voter list:

```properties
controller.quorum.voters=1@host1:19091,2@host2:19091,3@host3:19091
```

Each node must be formatted with the same quorum ID during initialization.

---

## 🔐 Security Considerations (Optional)

To enable SSL or SASL authentication:

- Update `controller.properties` with appropriate listeners and security settings
- Use `SASL_PLAINTEXT`, `SSL`, or `SASL_SSL` as needed
- See official documentation for full configuration options

---

## ✅ Verify Your KRaft Cluster

You can verify your cluster is running without ZooKeeper by checking logs or querying internal topics like `__cluster_metadata`.

Use `kafka-topics.sh` to describe the topic:

```bash
bin/kafka-topics.sh --describe --topic __cluster_metadata --bootstrap-server localhost:9092
```

You'll notice it's managed internally by the controller nodes.

---

## 🔄 Migrating from ZooKeeper to KRaft (Optional)

If you're migrating an existing ZooKeeper-based Kafka cluster, use the migration tools provided in Kafka:

```bash
bin/kafka-migrate-zk-to-kraft.sh
```

See the [official migration guide](https://docs.confluent.io/platform/current/installation/configuration/metadata.html) for more details.

---

## 🧹 Cleanup

To stop the Kafka instance:

```bash
Ctrl+C
```

Or gracefully shut down:

```bash
pkill -f "kafka\\.Kafka"
```

To remove logs:

```bash
rm -rf /tmp/kafka-logs/
```

---

## 📌 Summary

With Kafka 4.0.0 and KRaft mode, managing a Kafka cluster becomes simpler and more scalable without the overhead of ZooKeeper. This guide walked you through:

- Setting up a Kafka cluster using KRaft
- Initializing storage directories
- Running brokers and controllers
- Creating topics and producing/consuming messages

You’re now ready to build modern, cloud-native Kafka architectures powered by KRaft!

---

## 📚 References

- [Apache Kafka Official Documentation – KRaft](https://kafka.apache.org/documentation/)
- [KIP-500 – Replace ZooKeeper with a Self-Managed Metadata Quorum](https://cwiki.apache.org/confluence/display/KAFKA/KIP-500+-+Replace+ZooKeeper+with+a+Self-Managed+Metadata+Quorum)
- [Confluent KRaft Guide](https://docs.confluent.io/platform/current/installation/configuration/metadata.html)