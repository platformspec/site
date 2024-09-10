# Example

Here’s an example of the structure for the Platform Specification:

```yaml
apiVersion: base.platformspec.io/v1alpha1
kind: Platform
metadata:
  name: example
spec:
  ##############################
  # GENERAL
  ##############################
  
  platform:
    organization: Example Demo Company
    description: "Example Demo Company Internal Cloud Platform"
    contactEmail: engineering@platformspec.io
    dns:
      provider: route53
      domain: example.com

  ##############################
  # INFRASTRUCTURE
  ##############################

  # ==============================
  # Credentials
  # ==============================
  credentials: []
  # ==============================
  # Providers
  # ==============================
  providers:
    # ===== Infrastructure as a Service (IaaS) Providers =====
    iaas: []
    
    # ===== DNS Providers =====
    dns: []
    
    # ===== Identity Providers =====
    identity: []
    
    # ===== Container/Artifact Registries =====
    registry: []
    
    # ===== Backup and Disaster Recovery Providers =====
    backup: []
    
    # ===== Monitoring Providers =====
    monitoring: []

    # ===== Secret Management Providers =====
    secrets: []
    
    # ===== Observability Providers =====
    observability: []

    # ===== CI/CD Providers =====
    cicd: []
    
    # ===== Logging Providers =====
    logging: []
    
    # ===== Auditing Providers =====
    auditing: []
    
    # ===== Automation and Orchestration Providers =====
    automation: []

  # ==============================
  # Environments
  # ==============================
  environments: []

  # ==============================
  # Machine Images
  # ==============================
  images:
    containers: []
    machine:[]

  ##############################
  # COMPUTE
  ##############################

  # ==============================
  # Clusters
  # ==============================
  clusters: []

  # ==============================
  # Servers
  # ==============================
  servers: []
  # ==============================
  # Software Deployments
  # ==============================
  software:
    groups: []

  ##############################
  # POLICIES
  ##############################

```
