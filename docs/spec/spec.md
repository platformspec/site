---
outline: [2, 3]
---

# The Specification

## Introduction
The Platform Specification defines a structured, declarative framework for describing and managing cloud-native platforms. It is designed to standardize how platforms are represented, making it easier for teams to define, build, and operate consistent, scalable, and secure platforms across diverse environments. By capturing the essential components, configurations, and policies of a platform in a clear and organized format, the specification serves as the foundation for both human and automated processes in platform engineering.

The specification uses a YAML or JSON structure modeled on Kubernetes Custom Resource Definitions (CRDs), ensuring compatibility with cloud-native ecosystems. Each instance of the specification includes well-defined fields and sections that describe the platform's infrastructure, services, policies, and operational guidelines. This approach allows platform teams to capture the desired state of their platform while maintaining flexibility in implementation and tooling.

While the Platform Specification is modeled on Kubernetes Custom Resource Definitions (CRDs) to leverage a familiar, structured, and extensible format, it is not tied to Kubernetes clusters or their runtime environments. The specification is simply a declarative framework written in YAML or JSON, intended to be stored in files and parsed by any program or tool that supports these formats. There is no requirement to leverage or install the objects into a Kubernetes cluster. Instead, the specification serves as a standalone document that can be used to define platform requirements, generate configurations, or drive orchestration workflows across any infrastructure or tooling ecosystem. This decoupled design ensures maximum flexibility and accessibility for diverse use cases and environments.

> [!WARNING]
> The specification is still a work in process and is being actively designed.
>
> Expect active/frequent changes.
>
> Modifications to the spec will be called out on the [news](../../news) page accordingly.

## Key Domains
![Key Domains (light)](./key-components-light.png){.light-only}
![Key Domains (dark)](./key-components-dark.png){.dark-only}

## Document Structure
The Platform Specification has embraced a modern approach to defining and managing your platforms using Kubernetes Custom Resource Definitions (CRDs). This allows us to leverage the power and flexibility of Kubernetes while providing a structured and declarative way to represent platform components.

The Platform Specification defines several core CRD types, each representing a distinct element within your platform:

![PlatformSpecMindMap (light)](./PlatformSpecMindMap-light.drawio.png){.light-only}
![PlatformSpecMindMap (dark)](./PlatformSpecMindMap-dark.drawio.png){.dark-only}

Each api kind represents a fundamental aspect of the platform:

  * **Platform:** Represents the overarching blueprint for your entire platform. It encompasses high-level configurations, policies, and references to other resources like credentials, providers, and environments, and more.
  * **Credential:** Defines reference parameters for locations to sensitive information required for connecting to various services (e.g., API keys, passwords) and interacting with Providers.
  * **Provider:** Defines the specific provider or service used for managing parts of your Platform (e.g., AWS, Azure, GCP). Each provider configuration includes details about any specific settings required for that provider.
  * **Environment:** Represents a distinct operational environment for your platform (e.g., development, testing, production). Environments often have unique configurations, resource constraints, or access policies.
  * **Cluster:** Defines a cluster within your platform. Clusters can be of many orchestration engines, from Kubernetes to Fargate to Nomad, or more.  This includes details about the cluster's size, network configuration, node types, and other relevant settings.
  * **Server:** Specifies individual servers or virtual machines deployed within your platform. Servers are associated with specific environments, providers, and software configurations.
  * **SoftwareGroup:** Represents a collection of software packages to be installed into your cluster(s) or server(s). Software Groups define installation methods, dependencies, and configuration settings for these packages.
  * **Image:** Defines machine or container images used within your platform, often associated with Clusters and Servers.
  * **SoftwarePackage:** Represents a single software package to be installed as part of a SoftwareGroup. It includes details about the package name, version, source repository, dependencies, and installation instructions.
  * **Policy:** Defines rules and constraints that apply to various aspects of your platform, such as resource usage, security configurations, or deployment workflows. Policies can enforce best practices, ensure compliance with regulations, or automate specific actions based on predefined conditions.

The Platform Specification structure promotes a modular and organized approach to defining complex cloud platforms, ensuring clarity, maintainability, and consistency across different environments and deployments.

Let’s walk through these API Kinds:

## Platform
The `platform` API kind in the Platform Specification defines fundamental information about the platform being described. This includes its name, organization details, contact information, and DNS configuration.  It is the top-level resource.

`Platform` spec section has the following fields:

  * **`title`** __(required)__: Human readable title name of the Platform defined within this document
  * **`description`** __(optional)__: A short description about the platform.
  * **`organization`** __(required)__: The name of the organization responsible for the platform.
  * **`author`** __(optional)__: Author of the platform specification document.
  * **`version`** __(required)__: A version of the platform, internal to the team definining and managing the platform.
  * **`contactEmail`** __(required)__: Email address for contacting the platform's administrators.
  * **`dns`**:
    * **`providerRef`** __(required)__: Refers to a predefined DNS provider defined in the providers section of the specification.
    * **`domain`** __(required)__: The top-level domain name associated with the platform.
  * **`resources`** __(required)__: A list of objectReferences, for each component that composes the Platform; a manifest.

Example:

::: code-group
```yaml [yaml]
---
apiVersion: core.platformspec.io/v1alpha1
kind: Platform
metadata:
  name: example
spec:
  title: Example Demo Company Platform
  organization: Example Demo Company
  description: A comprehensive example of an AWS based Kubernetes platform."
  author: Josh West
  version: 1.0.0
  contactEmail: engineering@platformspec.io
  dns:
    providerRef:
      name: route53
    domain: example.com
  resources:
    environments:
      - name: development
        kind: Environment
      - name: production
        kind: Environment
    providers:
      - name: aws
        kind: Provider
      - name: route53
        kind: Provider
    clusters:
      - name: dev-cluster-aws-kubeadm
        kind: Cluster
    servers:
      - name: dev-server-aws
        kind: Server
    images:
      - name: custom-aws-image
        kind: Image
      - name: existing-aws-image
        kind: Image
    softwareGroups:
      - name: general
        kind: SoftwareGroup
    credentials:
      - name: aws-creds
        kind: Credential
```
:::


## Credentials
The credentials section in the Platform Specification YAML defines how authentication credentials are managed for various cloud services. This allows for flexible configuration and secure storage of sensitive information.

The `Credentials` spec has the following fields:

  * **`schema`** __(optional)__: Specifies the format of the credentials according to a predefined schema. This ensures compatibility with specific cloud services.
  * **`source`** __(required)__: Defines where the credentials are retrieved from. Supported sources may include environment variables, secret managers, or hardcoded values within the YAML file.
  * **`fields`** __(optional)__: key-value pairs defining individual credential fields and how they map to their source values.

Example:

::: code-group
```yaml [yaml]
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
```

:::

The credentials section enables secure handling of authentication information by separating it from the platform configuration.  Referencing external secret managers can further enhance security by storing credentials outside the main configuration file.

### Schemas
Different sets of credentials, for various providers, often follow their own schema. To accommodate the diverse schemas used by different platforms, we've introduced the schema field.  This field acts as a key indicator for *consumers of this API*, providing crucial information about the format and structure of the credentials associated with this resource.

Schemas:

|  *Schema*  |  *Description*  |  *Example*  |
| --- | --- | --- |
| `AWS` | AWS API access credentials |  |
| `GCP` | GCP API access credentials |  |
| `...` | ... |  | 

### Sources
Credentials are stored in many types of secrets managers, or other plaintext locations.  This field indicates the location to the credential *relative to the system leveraging this API*.

|  *Source*  |  *Description*  |
| --- | --- |
| `static` | Hardcoded values within `fields` section; not advised for production use. |
| `environment` | Environment variables containing the contents of the credentials, as defined in `fields`. |
| `...` | |


## Providers
The `providers` root element in the Platform Specification YAML defines a registry of supported service providers and their configuration options. This allows for modularity, reusability, and extensibility when describing various platform components.

The official provider categories within the specification are as follows (thus far):

  * **`iaas`**: Infrastructure as a Service providers (e.g., AWS, Azure, GCP) offering virtual machines, storage, networking, and other fundamental cloud resources.
  * **`dns`**: Domain Name System providers responsible for managing DNS records and resolving domain names to IP addresses (e.g., Route53, Cloudflare).
  * **`identity`**: Identity and Access Management (IAM) providers that handle user authentication, authorization, and access control (e.g., Okta, AWS IAM).
  * **`registry`**: Container/Artifact Registry providers for storing and managing container images and software artifacts (e.g., Docker Hub, Harbor, Amazon ECR).
  * **`backup`**: Backup and Disaster Recovery providers offering tools to create and manage backups of data and infrastructure (e.g., Veeam, AWS Backup).
  * **`monitoring`**: Monitoring providers for collecting metrics and performance data from applications and infrastructure (e.g., Prometheus, Datadog, CloudWatch).
  * **`secrets`**: Secret Management providers that securely store and manage sensitive data like API keys, passwords, and certificates (e.g., HashiCorp Vault, AWS Secrets Manager).
  * **`observability`**: Observability platforms that provide comprehensive visibility into application behavior and performance through metrics, logs, and traces (e.g., Grafana, Datadog).
  * **`cicd`**: Continuous Integration/Continuous Delivery (CI/CD) providers for automating the software development lifecycle (e.g., Argo CD, Jenkins, GitLab CI).
  * **`logging`**: Logging providers that collect, store, and analyze log data from applications and systems (e.g., Elasticsearch, Splunk, Graylog).
  * **`auditing`**: Auditing providers that track and monitor platform activity for compliance and security purposes (e.g., Splunk, AWS CloudTrail).
  * **`security`**: Security providers offering services like intrusion detection/prevention, vulnerability scanning, and web application firewalls (e.g., CrowdStrike Falcon, AWS WAF).
  * **`automation`**: Automation and Orchestration providers for managing infrastructure and applications through code (e.g., Terraform, Ansible).
  * **`x-custom`**: An internal, custom category used internally that is not part of the official specification provider categories list.

> [!NOTE]
> Custom cateogories should always be prefixed with `x-`.
> 
> For example, `x-internal`.

Entries within each category follow the exact same structure, which is as follows:

```
providers:
  <provider-category>:
    <provider-name>:
      type: <string> # Identifier for the provider type (e.g., aws, route53)
      credentials: "#/credentials/<credential-name>" # Reference
      config: {} # Provider-specific configuration options
```


For example:

::: code-group
```yaml [platform.yaml]
providers:
  iaas:
    aws:
      type: aws
      credentials: "/credentials/aws-creds"
      config:
        tags:
          key: value
  dns:
    route53:
      type: route53
      credentials: "#/credentials/aws-creds"
      config:
        delegationSet:
          enabled: true
        tags:
          key: value
```

```json [platform.json]
{
  "providers": {
    "iaas": {
      "aws": {
        "type": "aws",
        "credentials": "/credentials/aws-creds",
        "config": {
          "tags": {
            "key": "value"
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
    }
  }
}
```
:::

## Environments

The `environments` section of the Platform Specification defines different deployment environments for the platform.  This allows for tailoring configurations and resource allocation based on specific needs (e.g., development, testing, staging, production). 

**Structure:**

```
environments:
  <environment-name>:
    description: <string> # Brief description of the environment
    providers:
      # References to provider configurations for this environment
      ... 
```

**Fields:**

* **`<environment-name>`** __(required)__: A unique identifier for the environment (e.g., `development`, `staging`, `production`).


* **`description`** __(optional)__:  A brief explanation of the purpose and characteristics of the environment.
* **`providers`** __(required)__: 
    * References to specific provider configurations defined within the `providers` section. Environments can inherit from base provider configurations or override them with environment-specific settings.

**Usage Notes:**

* Each environment entry allows for defining variations in platform configuration based on its intended use case. 
*  Environments can share common provider configurations while allowing for targeted customization (e.g., adjusting resource limits or security policies). 

Example:

::: code-group
```yaml [platform.yaml]
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
```

```json [platform.json]
{
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
  }
}
```
:::

This example shows two environments, `development` and `production`. Both share the same DNS provider (`#/providers/dns/route53`) and use AWS as their Iaas provider (`#/providers/iaas/aws`), but they may have further configuration differences.


## Images
The `images` root element of the Platform Specification defines a registry of machine images and container images used for deploying applications and infrastructure within the platform. This ensures consistency, version control, and easy management of these foundational components. 

**Structure:**

```
images:
  machine:
    <image-name>:  
      default: <boolean> # True if this image is the default for a given environment/provider
      iaasProvider: <string> # Reference to provider configuration (e.g., "#/providers/iaas/aws") 
      environments:
        - <environment-reference> # References to environments where this image is used
      version: <string>  # Image version
      builder: <object>    # Configuration for building custom images 
      reference: <object>   # Reference to an existing image (e.g., AMI ID)
```

**Fields:**

* **`<image-name>`**: A unique identifier for the machine image.
* **`default`**:  A boolean value indicating whether this image is the default choice for a given environment/provider combination. 
* **`iaasProvider`**: A reference to the provider configuration responsible for managing the platform's infrastructure as a service (e.g., AWS, Azure).  Use JSON Pointers to refer to providers defined elsewhere in the specification.
* **`environments`**: An array of references to environments where this image is used. Allows for defining images specific to certain deployment contexts.
* **`version`**: The version string of the machine image.
* **`builder`**:  Used to define configurations for building custom machine images: 
    * **`driver`**: Specifies the builder tool (e.g., `image-builder`, `packer`).
    * **`config`**: Configuration parameters for the builder, such as target image type, location, and customization options.

        * **`target`**: The base image to build from (e.g., `ami-ubuntu-2204`).
        * **`location`**:  The AWS region where the image will be built/stored.
        * **`options`**: Additional configuration options specific to the builder driver.

    * **`software`**: 
       * **`packages`**: A list of software packages to install on the image, including name and version.
       * **`repos`**:  A list of software repositories to use for package installation, with names and URLs. 
* **`reference`**: Used when referencing an existing machine image (e.g., AMI ID):
    * **`id`**: The unique identifier of the existing image (e.g., `ami-12345678`).

**Example:**

::: code-group
```yaml [platform.yaml]
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
```

```json [platform.json]
{
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
  }
}
```
:::

* **`custom-aws-image`**: A custom image built using the `image-builder` driver with specific configuration options for software installation and regions.
* **`existing-aws-image`**: A reference to an existing AWS AMI ID (`ami-12345678`) in the `us-west-1` region.


## Clusters
The `clusters` section of the Platform Specification defines the compute environments used for deploying and managing applications within the platform. This includes Kubernetes clusters, serverless deployments (like AWS Fargate), container orchestration systems like Nomad, and potentially other future technologies. Each cluster entry represents a distinct deployment environment with its own configuration parameters.

**Structure:**

```
clusters:
  <cluster-name>:
    type: <string> # "kubernetes", "fargate", "nomad", etc. 
    engine: <string> # The specific engine or platform for the cluster type (e.g., "eks" for Kubernetes on AWS, "ecs" for Fargate)
    version: <string> # Version information for the platform/engine (e.g., Kubernetes version, Nomad version)
    providers:
      iaas: <string> # Reference to provider configuration for infrastructure 
    environment: <string>  # Reference to the environment where the cluster resides
    region: <string>      # Geographic region for the cluster
    network: <string>    # Network configuration identifier 
    config:
      <configuration-key>: <value> # Additional cluster-specific settings 
```


**Fields:**

* **`<cluster-name>`**: A unique identifier for the cluster (e.g., `dev-cluster-aws-eks`).
* **`type`**: Specifies the type of compute environment:
    * "kubernetes": Kubernetes clusters managed using various tools.
    * "fargate": Serverless container deployments on AWS Fargate.
    * "nomad": Nomad clusters for distributed container orchestration.
    * (**Future expansion**) Other cluster types as they emerge. 

* **`engine`**:  Specifies the specific engine or platform used within the `type`. Examples:
    * For `"kubernetes"`:
        * "eks": AWS Elastic Kubernetes Service
        * "kubeadm": Self-managed Kubernetes using kubeadm.
        * "gke": Google Kubernetes Engine
    * For `"fargate"`: 
        * "ecs": Amazon Elastic Container Service (Fargate)
    * For `"nomad"`: 
       * " Nomad"  (self-hosted Nomad)

* **`version`**: The version information for the engine or platform. This could be a Kubernetes version, Fargate runtime version, Nomad version, etc.
* **`providers`**: A dictionary containing references to provider configurations responsible for provisioning the underlying infrastructure: 
   * **`iaas`**: Reference to the Infrastructure as a Service (IaaS) provider configuration (e.g., `#/providers/iaas/aws`).
* **`environment`**:  Reference to the environment where the cluster will operate (e.g., `#/environments/development`).
* **`region`**: The geographic region where the cluster's infrastructure will be located.
* **`network`**: An identifier referencing the network configuration used by the cluster.
* **`config`**: A nested dictionary containing additional configuration options specific to the cluster type:

**Kubernetes-Specific Config:** 


::: code-group
```yaml [platform.yaml]
# Example Kubernetes cluster config
config:
  autoscaling: true  
  nodeSize: "t3.medium" 
  machineImage: "#/images/machine/custom-aws-image"
  # ... other Kubernetes configurations (e.g., pod settings, service types)
```

```json [platform.json]
{
  "config": {
    "autoscaling": true,
    "nodeSize": "t3.medium",
    "machineImage": "#/images/machine/custom-aws-image"
  }
}
```
:::



**Fargate-Specific Config:**

::: code-group
```yaml [platform.yaml]
# Example Fargate config
config:
  taskDefinition:  "#/tasks/my-fargate-task"
  serviceConfig: 
    desiredCount: 3 
    launchType: "FARGATE"
```

```json [platform.json]
{
  "config": {
    "taskDefinition": "#/tasks/my-fargate-task",
    "serviceConfig": {
      "desiredCount": 3,
      "launchType": "FARGATE"
    }
  }
}
```
:::



  **Nomad-Specific Config:**

::: code-group
```yaml [platform.yaml]
# Example Nomad config
config:
  clientAddress: "#/providers/network/private-ip-address"
  datacenter: "main"
  jobTemplate: "#/jobs/my-nomad-job"
```

```json [platform.json]
{
  "config": {
    "clientAddress": "#/providers/network/private-ip-address",
    "datacenter": "main",
    "jobTemplate": "#/jobs/my-nomad-job"
  }
}

```
:::



**Usage Notes:**

* The `clusters` section provides a flexible way to define and manage diverse compute environments across various platforms.

## Servers
The `servers` section of the Platform Specification defines individual virtual servers (instances) that exist within various environments and Infrastructure as a Service (IaaS) providers.  These are standalone servers, distinct from server groups or clusters. Each server entry represents a specific instance with its own configuration details.

**Structure:**

```
servers:
  <server-name>: 
    type: <string>   # "ec2", "azureVM", "gceInstance", etc. 
    iaasProvider: <string> # Reference to provider configuration (e.g., "#/providers/iaas/aws")
    environment: <string>  # Reference to the environment where the server resides
    region: <string>      # Geographic region for the server
    network: <string>    # Network configuration identifier (e.g., VPC name)
    config:
      <configuration-key>: <value> # Additional server-specific settings 
```

**Fields:**

* **`<server-name>`**: A unique identifier for the server instance (e.g., `dev-server-aws`).
* **`type`**: Specifies the type of virtual machine technology being used:
    * "ec2": Amazon EC2 instances
    * "azureVM": Azure Virtual Machines
    * "gceInstance": Google Compute Engine Instances
    * (**Future expansion**) Other IaaS provider instance types
* **`iaasProvider`**:  Reference to the provider configuration responsible for managing the server. This usually points to a section in your YAML that defines specific settings for the IaaS provider (e.g., `#/providers/iaas/aws`).
* **`environment`**:  Reference to the environment where the server will be deployed (e.g., `#/environments/development`). 
* **`region`**: The geographic region where the server's infrastructure will reside.
* **`network`**: An identifier referencing the network configuration used by the server, such as a VPC name or subnet ID.

* **`config`**: A nested dictionary containing additional server-specific configurations:



::: code-group
```yaml [platform.yaml]
# Example Server Config
config:
  size: "t3.medium" # Instance size (e.g., EC2 instance type)
  machineImage: "#/images/machine/custom-aws-image"
  # ... other server-specific settings 
```

```json [platform.json]
{
  "config": {
    "size": "t3.medium",
    "machineImage": "#/images/machine/custom-aws-image"
  }
}
```
:::

**Usage Notes:**

* The `servers` section allows for the definition of individual servers across different cloud providers and environments, enabling a modular and scalable approach to infrastructure management.





## Software

The `software` section of the Platform Specification defines collections or groups of software to be deployed across your clusters and servers.  These groups encapsulate the necessary configurations and instructions for installing, managing, and updating software components within your platform.


**Structure:**

```
software:
  groups:
    <group-name>: 
      packages:
        - name: <package-name>
          type: <installation-mechanism> # "helm", "ansible", "docker", etc. 
          # ... Configuration specific to the installation type
```

**Fields:**

* **`groups`**: A dictionary containing groups of software packages:

    * **`<group-name>`**:  A descriptive name for the software group (e.g., `general`, `database`, `frontend`).
     * **`packages`**: An array of individual software package definitions within the group:
      * **`name`**: A unique identifier for the software package (e.g., `nginx-web-server`). 
      * **`type`**: The method used to install and manage this package:
        * `"helm"`:  Installation using Helm charts.
        * `"ansible"`: Deployment using Ansible playbooks.
        * `"docker"`: Containerized deployment using Docker images.
         **(Future expansion)** Other software installation mechanisms.

**Example:**

::: code-group
```yaml [platform.yaml]
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
```

```json [platform.json]
{
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

 **Usage Notes:**

* The `software` section allows you to define reusable software configurations for deployment across multiple environments. 
* By separating installation methods (`type`) and specific configuration settings, you can create modular and adaptable software deployments.




## Policies
The Policies section governs the operational and cost-management aspects of the platform. Policies may include logging, scaling, backups, or disaster recovery strategies. This ensures that critical governance and operational practices are well defined and consistently applied.

::: code-group
```yaml [platform.yaml]
# TBD

```

```json [platform.json]
// TBD
```
:::

## Governance & Compliance
Configuration and specifications for ensuring that the cloud platform meets governance and compliance requirements, safeguarding data and infrastructure.

::: code-group
```yaml [platform.yaml]
# TBD

```

```json [platform.json]
// TBD
```
:::

## Developer Services
Tools and environments that enhance the developer experience, making it easier to build, test, and deploy applications.

::: code-group
```yaml [platform.yaml]
# TBD

```

```json [platform.json]
// TBD
```
:::

## Monitoring and Insights
For ensuring that the platform and the applications running on it are observable and performant.

::: code-group
```yaml [platform.yaml]
# TBD

```

```json [platform.json]
// TBD
```
:::