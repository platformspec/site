# Example

Below is an example of a platform definition using `v1alpha1` of The Platform Specification, for a very simple AWS based platform.

> [!WARNING]
> This example is not yet complete.  The specification is still a work in process and is being actively designed.

::: code-group
```yaml [platform.yaml]
###############################################################################
# METADATA
###############################################################################

platformspec: "v1alpha1"

info:
  title: Example Platform on AWS
  version: "0.0.1"
  description: "A comprehensive example of an AWS based Kubernetes platform."
  author: Josh West


###############################################################################
# GENERAL
###############################################################################

# =============================================================================
# Platform
# =============================================================================
platform:
  name: example
  organization: Example Demo Company
  contactEmail: engineering@platformspec.io
  dns:
    provider: "#/providers/dns/route53"
    domain: example.com

# =============================================================================
# Credentials
# =============================================================================
credentials:
  aws-creds:
    schema: AWS
    source: environment
    fields:
      AWS_ACCESS_KEY_ID: $AWS_ACCESS_KEY_ID
      AWS_SECRET_ACCESS_KEY: $AWS_SECRET_ACCESS_KEY

################################################################################
# INFRASTRUCTURE
################################################################################

# =============================================================================
# Providers
# =============================================================================
providers:
  # ===== Infrastructure as a Service (IaaS) Providers =====
  iaas:
    aws:
      type: aws
      driver: organizations
      credentials: "#/credentials/aws-creds"
      config:
        tags:
          somekey: somevalue
      
  # ===== Domain Name System (DNS) Providers =====
  dns:
    route53:
      type: route53
      credentials: "#/credentials/aws-creds"
      config:
        delegationSet:
          enabled: true
        tags:
          key: value
  
  # ===== Identity Providers =====
  identity:
    okta:
      type: okta
      credentials: "#/credentials/okta-creds"
      config:
        domain: example.okta.com
  
  # ===== Container/Artifact Registries =====
  registry:
    harbor:
      type: harbor
      credentials: "#/credentials/harbor-creds"
      config:
        project: my-project
        zone: example-com
  
  # ===== Backup and Disaster Recovery Providers =====
  backup:
    snapshot:
      type: snapshot
      credentials: "#/credentials/snapshot-creds"
      config: {}
  
  # ===== Monitoring Providers =====
  monitoring:
    prometheus:
      type: prometheus
      credentials: "#/credentials/prometheus-creds"
      config: {}

  # ===== Secret Management Providers =====
  secrets:
    hashivault:
      type: vault
      credentials: "#/credentials/vault-creds"
      config: {}
  
  # ===== Observability Providers =====
  observability:
    grafana:
      type: grafana
      credentials: "#/credentials/grafana-creds"
      config: {}
    datadog:
      type: datadog
      credentials: "#/credentials/datadog-creds"
      config: {}

  # ===== CI/CD Providers =====
  cicd:
     argocd:
      type: argocd
      credentials: "#/credentials/argocd-creds"
      config: {}
  
  # ===== Logging Providers =====
  logging:
    elasticsearch:
      type: elasticsearch
      credentials: "#/credentials/elasticsearch-creds"
      config: {}
  
  # ===== Auditing Providers =====
  auditing:
    splunk:
      type: splunk
      credentials: "#/credentials/splunk-creds"
      config: {}
  
  # ===== Automation and Orchestration Providers =====
  automation:
    terraform-atlantis:
      type: terraform-atlantis
      credentials: "#/credentials/terraform-atlantis-creds"
      config: {}
    ansible:
      type: ansible
      credentials: "#/credentials/ansible-creds"
      config: {}

# =============================================================================
# Environments
# =============================================================================
environments:
  development:
    description: "Development environment"
    providers:
      dns: "#/providers/dns/route53"
      iaas:
        - "#/providers/iaas/aws"
  production:
    description: "Production environment"
    providers:
      dns: "#/providers/dns/route53"
      iaas:
        - "#/providers/iaas/aws"

# =============================================================================
# Machine Images
# =============================================================================
images:
  containers: {}
  machine:
    custom-aws-image:
      default: false
      iaasProvider: "#/providers/iaas/aws"
      environments:
        - "#/environments/development"
        - "#/environments/production"
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
    existing-aws-image:
      default: true
      iaasProvider: "#/providers/iaas/aws"
      environments:
        - "#/environments/development"
      version: v1.28.13
      reference:
        id: ami-12345678
        location: us-west-1


################################################################################
# COMPUTE
################################################################################

# =============================================================================
# Clusters
# =============================================================================
clusters:
  dev-cluster-aws-kubeadm:
    type: kubernetes
    engine: kubeadm
    version: "1.28.13"
    providers:
      iaas: "#/providers/iaas/aws"
    environment: "#/environments/development"
    region: us-east-2
    config:
      autoscaling: true
      controlPlane:
        instanceType: "t3.medium"
        machineImage: "#/images/machine/custom-aws-image"
      #   replicas: 3

# =============================================================================
# Servers
# =============================================================================
servers:
  dev-server-aws:
    type: ec2
    iaasProvider: "#/providers/iaas/aws"
    # providers:
    #   iaas: aws
    environment: "#/environments/development"
    region: us-west-2
    network: aws-vpc-us-west-2
    config:
      size: "t3.medium"
      machineImage: "#/images/machine/custom-aws-image"

# =============================================================================
# Software Deployments
# =============================================================================
software:
  groups:
    general:
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

#   ################################################################################
#   # CONFIGURATION AND POLICIES
#   ################################################################################

#   # =============================================================================
#   # Cost Management
#   # =============================================================================

#   # =============================================================================
#   # Security
#   # =============================================================================

#   # =============================================================================
#   # Compliance
#   # =============================================================================

#   # =============================================================================
#   # Alerting
#   # =============================================================================

#   # =============================================================================
#   # Backup and Disaster Recovery
#   # =============================================================================

#   # =============================================================================
#   # Scaling
#   # =============================================================================

#   # =============================================================================
#   # Monitoring
#   # =============================================================================

#   # =============================================================================
#   # Logging
#   # =============================================================================

#   # =============================================================================
#   # Secrets Management
#   # =============================================================================

#   # =============================================================================
#   # CI/CD
#   # =============================================================================

#   # =============================================================================
#   # Observability
#   # =============================================================================

#   # =============================================================================
#   # Governance
#   # =============================================================================
```

```json [platform.json]
{
  "platformspec": "v1alpha1",
  "info": {
    "title": "Example Platform on AWS",
    "version": "0.0.1",
    "description": "A comprehensive example of an AWS based Kubernetes platform.",
    "author": "Josh West"
  },
  "platform": {
    "name": "example",
    "organization": "Example Demo Company",
    "contactEmail": "engineering@platformspec.io",
    "dns": {
      "provider": "#/providers/dns/route53",
      "domain": "example.com"
    }
  },
  "credentials": {
    "aws-creds": {
      "schema": "AWS",
      "source": "environment",
      "fields": {
        "AWS_ACCESS_KEY_ID": "$AWS_ACCESS_KEY_ID",
        "AWS_SECRET_ACCESS_KEY": "$AWS_SECRET_ACCESS_KEY"
      }
    }
  },
  "providers": {
    "iaas": {
      "aws": {
        "type": "aws",
        "driver": "organizations",
        "credentials": "#/credentials/aws-creds",
        "config": {
          "tags": {
            "somekey": "somevalue"
          }
        }
      }
    },
    "dns": {
      "route53": {
        "type": "route53",
        "credentials": "#/credentials/aws-creds",
        "config": {
          "delegationSet": {
            "enabled": true
          },
          "tags": {
            "key": "value"
          }
        }
      }
    },
    "identity": {
      "okta": {
        "type": "okta",
        "credentials": "#/credentials/okta-creds",
        "config": {
          "domain": "example.okta.com"
        }
      }
    },
    "registry": {
      "harbor": {
        "type": "harbor",
        "credentials": "#/credentials/harbor-creds",
        "config": {
          "project": "my-project",
          "zone": "example-com"
        }
      }
    },
    "backup": {
      "snapshot": {
        "type": "snapshot",
        "credentials": "#/credentials/snapshot-creds",
        "config": {}
      }
    },
    "monitoring": {
      "prometheus": {
        "type": "prometheus",
        "credentials": "#/credentials/prometheus-creds",
        "config": {}
      }
    },
    "secrets": {
      "hashivault": {
        "type": "vault",
        "credentials": "#/credentials/vault-creds",
        "config": {}
      }
    },
    "observability": {
      "grafana": {
        "type": "grafana",
        "credentials": "#/credentials/grafana-creds",
        "config": {}
      },
      "datadog": {
        "type": "datadog",
        "credentials": "#/credentials/datadog-creds",
        "config": {}
      }
    },
    "cicd": {
      "argocd": {
        "type": "argocd",
        "credentials": "#/credentials/argocd-creds",
        "config": {}
      }
    },
    "logging": {
      "elasticsearch": {
        "type": "elasticsearch",
        "credentials": "#/credentials/elasticsearch-creds",
        "config": {}
      }
    },
    "auditing": {
      "splunk": {
        "type": "splunk",
        "credentials": "#/credentials/splunk-creds",
        "config": {}
      }
    },
    "automation": {
      "terraform-atlantis": {
        "type": "terraform-atlantis",
        "credentials": "#/credentials/terraform-atlantis-creds",
        "config": {}
      },
      "ansible": {
        "type": "ansible",
        "credentials": "#/credentials/ansible-creds",
        "config": {}
      }
    }
  },
  "environments": {
    "development": {
      "description": "Development environment",
      "providers": {
        "dns": "#/providers/dns/route53",
        "iaas": [
          "#/providers/iaas/aws"
        ]
      }
    },
    "production": {
      "description": "Production environment",
      "providers": {
        "dns": "#/providers/dns/route53",
        "iaas": [
          "#/providers/iaas/aws"
        ]
      }
    }
  },
  "images": {
    "containers": {},
    "machine": {
      "custom-aws-image": {
        "default": false,
        "iaasProvider": "#/providers/iaas/aws",
        "environments": [
          "#/environments/development",
          "#/environments/production"
        ],
        "version": "v1.28.13",
        "builder": {
          "driver": "image-builder",
          "config": {
            "target": "ami-ubuntu-2204",
            "location": "us-east-2",
            "options": {
              "ami_regions": "us-east-2,us-west-2",
              "ansible_extra_vars": "pinned_debs='cloud-init=23.1.2-0ubuntu0~22.04.1'"
            }
          },
          "software": {
            "packages": [
              {
                "name": "nginx",
                "version": "latest"
              },
              {
                "name": "docker",
                "version": "20.10.8"
              }
            ],
            "repos": [
              {
                "name": "docker",
                "url": "https://download.docker.com/linux/ubuntu"
              }
            ]
          }
        }
      },
      "existing-aws-image": {
        "default": true,
        "iaasProvider": "#/providers/iaas/aws",
        "environments": [
          "#/environments/development"
        ],
        "version": "v1.28.13",
        "reference": {
          "id": "ami-12345678",
          "location": "us-west-1"
        }
      }
    }
  },
  "clusters": {
    "dev-cluster-aws-kubeadm": {
      "type": "kubernetes",
      "engine": "kubeadm",
      "version": "1.28.13",
      "providers": {
        "iaas": "#/providers/iaas/aws"
      },
      "environment": "#/environments/development",
      "region": "us-east-2",
      "config": {
        "autoscaling": true,
        "controlPlane": {
          "instanceType": "t3.medium",
          "machineImage": "#/images/machine/custom-aws-image"
        }
      }
    }
  },
  "servers": {
    "dev-server-aws": {
      "type": "ec2",
      "iaasProvider": "#/providers/iaas/aws",
      "environment": "#/environments/development",
      "region": "us-west-2",
      "network": "aws-vpc-us-west-2",
      "config": {
        "size": "t3.medium",
        "machineImage": "#/images/machine/custom-aws-image"
      }
    }
  },
  "software": {
    "groups": {
      "general": {
        "packages": [
          {
            "name": "nginx-web-server",
            "type": "helm",
            "helm": {
              "chart": "stable/nginx",
              "version": "1.16.1",
              "values": {
                "replicaCount": 2,
                "service": {
                  "type": "LoadBalancer"
                }
              },
              "namespaces": [
                "web-namespace"
              ]
            }
          }
        ]
      }
    }
  }
}
```
:::
