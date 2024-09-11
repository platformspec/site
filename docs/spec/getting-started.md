---
outline: [2, 3]
---

# Getting Started with the Platform Specification

## Introduction
The Platform Specification is a [YAML](https://yaml.org)-based, community-driven standard for defining cloud platforms. It provides a structured, consistent approach to specifying all the key components, configurations, and policies needed to deploy and manage a cloud platform across multiple environments. This specification is designed to improve the efficiency of platform management by ensuring clarity, modularity, and scalability from the start.
Introduction to YAML in the Platform Specification

The Platform Specification uses [YAML](https://yaml.org) as the format for defining platform components. YAML is chosen for its human-readable syntax and ability to represent complex data structures easily. In this specification, YAML files are used to define various aspects of the platform, such as infrastructure, compute, policies, and more.



## Core Sections of the Platform Specification

The Platform Specification is divided into several key sections, each capturing different dimensions of a cloud platform. Let’s walk through these sections:

### Header

```yaml
apiVersion: base.platformspec.io/v1alpha1
kind: Platform
metadata:
  name: example
```

### General

```yaml
spec:
  platform:
    organization: Example Demo Company
    description: "Example Demo Company Internal Cloud Platform"
    contactEmail: engineering@platformspec.io
    dns:
      provider: route53
      domain: example.com
```

### Infrastructure

The Infrastructure section defines the cloud provider, environments, and credentials required to set up the foundational layer of the platform. This section is crucial for configuring the base resources (such as regions, virtual machine images, or networks) on which the rest of the platform components will run.


```yaml
spec:
  credentials:
    - name: <name>
      kind: <type>
      secretRef:
        name: <secret name>

  providers:
    # ===== Infrastructure as a Service (IaaS) Providers =====
    iaas:
      - name: <name>
        type: <type>
        credentials: <credentials name>
        config: {}
    # ===== DNS Providers =====
    dns:
      - name: <name>
        type: <type>
        credentials: <credentials name>
        config: {}
    
    # ===== Identity Providers =====
    identity:
      - name: <name>
        type: <type>
        credentials: <credentials name>
        config: {}
    
    # ===== Container/Artifact Registries =====
    registry:
      - name: <name>
        type: <type>
        credentials: <credentials name>
        config: {}
    
    # ===== Backup and Disaster Recovery Providers =====
    backup:
      - name: <name>
        type: <type>
        credentials: <credentials name>
        config: {}
    
    # ===== Monitoring Providers =====
    monitoring:
      - name: <name>
        type: <type>
        credentials: <credentials name>
        config: {}

    # ===== Secret Management Providers =====
    secrets:
      - name: <name>
        type: <type>
        credentials: <credentials name>
        config: {}
    
    # ===== Observability Providers =====
    observability:
      - name: <name>
        type: <type>
        credentials: <credentials name>
        config: {}

    # ===== CI/CD Providers =====
    cicd:
      - name: <name>
        type: <type>
        credentials: <credentials name>
        config: {}
    
    # ===== Logging Providers =====
    logging:
      - name: <name>
        type: <type>
        credentials: <credentials name>
        config: {}
    
    # ===== Auditing Providers =====
    auditing:
      - name: <name>
        type: <type>
        credentials: <credentials name>
        config: {}
    
    # ===== Automation and Orchestration Providers =====
    automation:
      - name: <name>
        type: <type>
        credentials: <credentials name>
        config: {}

  environments:
    - name: <name>
      description: <description>
      providers:
        dns: <dns provider name>
        iaas:
          - <iaas provider name>
          - <iaas provider name>
  
  images:
    containers: []
    machines: []

```

### Compute & Networks

The Compute & Networks section describes the platform’s compute resources, networking components, and clusters. This is where you define virtual machines, Kubernetes clusters, and managed services like databases or load balancers that are central, core, and critical to the Platform itself.

```yaml
  spec:
    clusters:
      - name: <cluster name>
        type: <cluster type> # kubernetes | fargate | nomad | ...
        engine: <cluster engine> # eks | gke | aks | kubeadm | ...
        version: <cluster version>
        providers:
          iaas: <iaas provider name>
        environment: <environment name>
        region: <cluster location>
        networks:
          - <network name>
          - <network name>
        config: {}
    servers:
      - name: <server name>
        providers:
          iaas: <iaas provider name>
          environment: <environment name>
          region: <server location>
          networks:
            - <network name>
            - <network name>
          config: {}

```


### Policies

The Policies section governs the operational and cost-management aspects of the platform. Policies may include logging, scaling, backups, or disaster recovery strategies. This ensures that critical governance and operational practices are well defined and consistently applied.


```yaml
# TBD

```

### Security & Compliance

The Security & Compliance section captures the platform’s security configurations, such as identity and access management (IAM), encryption standards, and compliance-related settings. This section ensures that the platform adheres to organizational security standards and regulatory requirements.


```yaml
# TBD

```

### Developer Enablement

The Developer Enablement section is focused on providing tools and services that streamline development and improve productivity. This includes services like API gateways, serverless functions, and CI/CD pipelines, ensuring that developers can quickly build, test, and deploy applications.


```yaml
# TBD

```

### Observability & Performance

The Observability & Performance section deals with monitoring, alerting, and performance tuning for the platform. It includes tools like Prometheus for monitoring and PagerDuty for alerting, ensuring that the platform’s health and performance can be tracked and optimized.


```yaml
# TBD

```