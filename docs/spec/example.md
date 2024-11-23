# Example

Below is an example of a platform definition using `v1alpha1` of The Platform Specification, for a very simple AWS based platform.

> [!WARNING]
> This example is not yet complete.  The specification is still a work in process and is being actively designed.

```yaml
# ========================================================================
# Platform
# ========================================================================

---
apiVersion: core.platformspec.io/v1alpha1
kind: Platform
metadata:
  name: example
spec:
  organization: Example Demo Company
  description: A comprehensive example of an AWS based Kubernetes platform."
  author: Josh West
  contactEmail: engineering@platformspec.io
  dns:
    providerRef:
      name: route53
    domain: example.com



# ========================================================================
# Credentials
# ========================================================================

---
apiVersion: core.platformspec.io/v1alpha1
kind: Credential
metadata:
  name: aws-creds
spec:
  schema: AWS
  source: environment
  fields:
    AWS_ACCESS_KEY_ID: $AWS_ACCESS_KEY_ID
    AWS_SECRET_ACCESS_KEY: $AWS_SECRET_ACCESS_KEY



# ========================================================================
# Providers
# ========================================================================

# ===== IaaS Providers =====
---
apiVersion: core.platformspec.io/v1alpha1
kind: IaasProvider
metadata:
  name: aws
spec:
  type: iaas
  driver: organizations
  credentialRef:
    name: aws-creds
  config:
    tags:
      somekey: somevalue

# ===== DNS Providers =====
---
apiVersion: core.platformspec.io/v1alpha1
kind: DnsProvider
metadata:
  name: route53
spec:
  type: dns
  credentialRef:
    name: aws-creds
  config:
    delegationSet:
      enabled: true
    tags:
      key: value

# ===== Identity Providers =====
---
apiVersion: core.platformspec.io/v1alpha1
kind: IdentityProvider
metadata:
  name: okta
spec:
  type: okta
  credentialsRef:
    name: okta-creds
  config:
    domain: example.okta.com

# ===== Container/Artifact Registries =====
---
apiVersion: core.platformspec.io/v1alpha1
kind: OciRegistryProvider
metadata:
  name: harbor
spec:
  type: harbor
  credentialsRef:
    name: harbor-creds
  config:
    project: my-project
    zone: example-com
  
# ===== Backup and Disaster Recovery Providers =====
---
apiVersion: core.platformspec.io/v1alpha1
kind: BackupProvider
metadata:
  name: snapshot
spec:
  type: snapshot
  credentialsRef:
    name: snapshot-creds
  config: {}
  
# ===== Monitoring Providers =====
---
apiVersion: core.platformspec.io/v1alpha1
kind: MonitoringProvider
metadata:
  name: prometheus
spec:
  type: prometheus
  credentialsRef: 
    name: prometheus-creds
  config: {}

# ===== Secret Management Providers =====
---
apiVersion: core.platformspec.io/v1alpha1
kind: SecretsProvider
metadata:
  name: hashivault
spec:
  type: vault
  credentialsRef:
    name: vault-creds
  config: {}

# ===== Observability Providers =====
---
apiVersion: core.platformspec.io/v1alpha1
kind: ObservabilityProvider
metadata:
  name: grafana
spec:
  type: grafana
  credentialsRef:
    name: grafana-creds
  config: {}
---
apiVersion: core.platformspec.io/v1alpha1
kind: ObservabilityProvider
metadata:
  name: datadog
spec:
  type: datadog
  credentialsRef:
    name: datadog-creds
  config: {}

# ===== CI/CD Providers =====
---
apiVersion: core.platformspec.io/v1alpha1
kind: CiCdProvider
metadata:
  name: argocd
spec:
  type: argocd
  credentialsRef:
    name: argocd-creds
  config: {}

# ===== Logging Providers =====
---
apiVersion: core.platformspec.io/v1alpha1
kind: LoggingProvider
metadata:
  name: elasticsearch
spec:
  type: elasticsearch
  credentialsRef:
    name: elasticsearch-creds
  config: {}

# ===== Auditing Providers =====
---
apiVersion: core.platformspec.io/v1alpha1
kind: AuditingProvider
metadata:
  name: splunk
spec:
  type: splunk
  credentialsRef:
    name: splunk-creds
  config: {}

# ===== Automation and Orchestration Providers =====
---
apiVersion: core.platformspec.io/v1alpha1
kind: AutomationProvider
metadata:
  name: terraform-atlantis
spec:
  type: terraform-atlantis
  credentialsRef:
    name: terraform-atlantis-creds
  config: {}
---
apiVersion: core.platformspec.io/v1alpha1
kind: AutomationProvider
metadata:
  name: ansible
spec:
  type: ansible
  credentialsRef:
    name: ansible-creds
  config: {}


# ========================================================================
# Environments
# ========================================================================

---
apiVersion: core.platformspec.io/v1alpha1
kind: Environment
metadata:
  name: development
spec:
  description: Development environment
  providers:
    dnsProviderRef:
      name: route53
    iaasProviderRefs:
      - name: aws
---
apiVersion: core.platformspec.io/v1alpha1
kind: Environment
metadata:
  name: production
spec:
  description: Production environment
  providers:
    dnsProviderRef:
      name: route53
    iaasProviderRefs:
      - name: aws



# ========================================================================
# Images
# ========================================================================

---
apiVersion: core.platformspec.io/v1alpha1
kind: Image
metadata:
  name: custom-aws-image
spec:
  type: machine
  spec:
    default: false
    iaasProviderRef:
      name: aws
    environmentRefs:
      - name: development
      - name: production
    version: v1.28.13
    builder:
      driver: image-builder
      config:
        target: ami-ubuntu-2204
        location: us-east-2
        options:
          ami_regions: "us-east-2,us-west-2"
          ansible_extra_vars: "pinned_debs='cloud-init=23.1.2-0ubuntu0~22.04.1'"
      software:
        packages:
          - name: nginx
            version: latest
          - name: docker
            version: 20.10.8
        repos:
          - name: docker
            url: "https://download.docker.com/linux/ubuntu"
---
apiVersion: core.platformspec.io/v1alpha1
kind: Image
metadata:
  name: existing-aws-image
spec:
  type: machine
  spec:
    default: true
    iaasProviderRef:
      name: aws
    environmentRefs:
      - name: development
    version: v1.28.13
    reference:
      id: ami-12345678
      location: us-west-1



# ========================================================================
# Clusters
# ========================================================================

---
apiVersion: core.platformspec.io/v1alpha1
kind: Cluster
metadata:
  name: dev-cluster-aws-kubeadm
spec:
  type: kubernetes
  engine: kubeadm
  version: "1.28.13"
  providers:
    iaasProviderRef:
      name: aws
  environmentRef:
    name: development
  region: us-east-2
  config:
    autoscaling: true
    controlPlane:
      instanceType: "t3.medium"
      machineImageRef: 
        name: custom-aws-image
      replicas: 3



# ========================================================================
# Servers
# ========================================================================

---
apiVersion: core.platformspec.io/v1alpha1
kind: Server
metadata:
  name: dev-server-aws
spec:
    type: ec2
    iaasProviderRef:
      name: aws
    environmentRef:
      name: development
    region: us-west-2
    network: aws-vpc-us-west-2
    config:
      size: "t3.medium"
      machineImageRef:
        name: custom-aws-image



# ========================================================================
# Software
# ========================================================================

---
apiVersion: core.platformspec.io/v1alpha1
kind: SoftwareGroup
metadata:
  name: general
spec:
  packages:
    - name: nginx-web-server
      type: helm
      helm:
        chart: stable/nginx
        version: "1.16.1"
        values:
          replicaCount: 2
          service:
            type: LoadBalancer
        namespaces:
          - web-namespace
```

