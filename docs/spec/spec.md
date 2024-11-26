---
outline: deep
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
> Modifications to the spec will be highlighted on the [news](../../news) page accordingly.

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

## Kinds
### Platform

The `Platform` CRD in The Platform Specification serves as the central entrypoint for your entire cloud platform, encompassing all its components, configurations, and policies. It provides a structured framework for defining and managing your infrastructure, services, and resources across different environments.

**Structure:**

::: code-group
```yaml [spec]
apiVersion: core.platformspec.io/v1alpha1
kind: Platform
metadata:
  name: <platform-name> 
spec:
  organization: <organization-name>
  description: <platform-description> 
  author: <author-name>
  version: <platform-version>
  contactEmail: <email-address>
  dns:
    providerRef:
      name: <dns-provider-name>
    domain: <domain-name>
  resources:
    environments:
      - name: <environment-name> 
        kind: Environment
    providers:
      - name: <provider-name>
        kind: Provider
    clusters:
      - name: <cluster-name>
        kind: Cluster
    servers:
      - name: <server-name>
        kind: Server
    images:
      - name: <image-name>
        kind: Image
    softwareGroups:
      - name: <softwaregroup-name>
        kind: SoftwareGroup
    credentials:
      - name: <credential-name>
        kind: Credential
```

```yaml [example]
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

**Key Fields:**

* **`name` *(required)*:**  A unique identifier for your platform within the Platform Specification.
* **`organization` *(required)*:** The organization responsible for managing this platform.
* **`description` *(optional)*:** A brief description of the platform's purpose and functionalities. 
* **`author` *(optional)*:** The name or team responsible for creating or maintaining this platform.
* **`version` *(required)*:** A version of the platform, internal to the team definining and managing the platform.
* **`contactEmail` *(required)*:** An email address for contacting the platform's administrators, maintainers or support team.
* **`dns`:** Defines the DNS provider and domain used by your platform.
   * `providerRef` *(required)*:  References a `Provider` resource defining the chosen DNS service (e.g., Route53).
   * `domain` *(required)*: Specifies the top-level domain name associated with this platform.
 * **`resources` *(required)*:** References to the various resources leveraged or managed by this platform:
   * **`environments`:**  Defines different deployment environments (e.g., development, staging, production) for your platform's services and applications.
   * **`providers`: ** References `Provider` resources that define the specific cloud platforms or services used within your environment (e.g., AWS, Azure, GCP). 
   * **`clusters`:**  Defines Kubernetes clusters managed by this platform (if applicable). Each cluster can have its own configuration and deployment parameters.
   * **`servers`:**  Lists virtual machines or servers managed within your platform, specifying their configurations and roles.
   * **`images`:** Defines container images used for deploying applications or components within your platform.
   * **`softwareGroups`: ** Groups together related software packages or dependencies required by various services or applications within your platform.
 *  **`credentials`:** References `Credential` resources containing the necessary credentials for accessing and interacting with different cloud providers and services.


### Credentials
The credentials section in the Platform Specification defines how authentication credentials are managed for various cloud services. This allows for flexible configuration and secure storage of sensitive information.

**Structure:**

::: code-group
```yaml [spec]
apiVersion: core.platformspec.io/v1alpha1
kind: Credential
metadata:
  name: <credential-name> 
spec:
  schema: <credential-schema> 
  source: <credential-source>
  fields:
    <field-name>: <field-value>
```

```yaml [example]
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

**Key Fields:**

* **`name` *(required)*:** A unique identifier for the credential within your platform.
* **`schema` *(optional)*:** Specifies the type of credentials being managed. This defines the expected format and structure of the `fields`.
* **`source` *(required)*:** Determines how the credential values are obtained.
* **`fields` *(required)*:** Defines the specific credential attributes required by the specified schema. These fields can be simple string values, complex JSON objects, or other data types depending on the chosen schema.  Ensure the `field-value` matches the format expected by the provider and its associated APIs.


#### Schemas
Different sets of credentials, for various providers, often follow their own schema. To accommodate the diverse schemas used by different platforms, we've introduced the schema field.  This field acts as a key indicator for *consumers of this API*, providing crucial information about the format and structure of the credentials associated with this resource.

Schemas:

|  *Schema*  |  *Description*  |  *Example*  |
| --- | --- | --- |
| `AWS` | AWS API access credentials |  |
| `GCP` | GCP API access credentials |  |
| `...` | ... |  | 

#### Sources
Credentials are stored in many types of secrets managers, or other plaintext locations.  This field indicates the location to the credential *relative to the system leveraging this API*.

|  *Source*  |  *Description*  |
| --- | --- |
| `static` | Hardcoded values within `fields` section; not advised for production use. |
| `environment` | Environment variables containing the contents of the credentials, as defined in `fields`. |
| `file` | File path _relative to consumer of the Credential API_. |
| `vault` | Hashicorp Vault. |
| `aws-ssm` | AWS SSM Parameter Store. |
| `aws-secrets` | AWS Secrets Manager. |
| `aws-s3` | AWS S3. |
| `aws-kms` | AWS KMS. |
| `gcp-secrets` | GCP Secrets Manager. |
| `gcp-kms` | GCP KMS. |
| `gcp-gcs` | GCP Cloud Storage. |
| `azure-keyvault` | Azure Key Vault. |
| `tfstate` | Terraform (tfstate) file path _relative to consumer of the Credential API_. |
| `tfstate-s3` | Terraform (tfstate) file stored in S3. |
| `tfstate-gcs` | Terraform (tfstate) file stored in GCS. |
| `tfstate-azurerm` | Terraform (tfstate) file in AzureRM Blob storage. |
| `tfstate-remote` | Terraform (tfstate) in Terraform Cloud / Terraform Enterprise. |
| `gitlab` | GitLab Secrets. |
| `kubernetes-configmap` | Kubernetes Config Map. |
| `kubernetes-secret` | Kubernetes Secret. |
| `...` | |


### Providers

The `Provider` CRD defines the specific cloud provider or service used for managing infrastructure and platform components within your environment.  Providers offer pre-configured integrations and functionalities tailored to their respective platforms, simplifying deployment and management.

**Structure:**

::: code-group
```yaml [spec]
apiVersion: core.platformspec.io/v1alpha1
kind: Provider
metadata:
  name: <provider-name> 
spec:
  category: <category> 
  engine: <engine-name> 
  credentialRef:
    name: <credential-name> 
  config:
    <configuration-parameters>: ...
```

```yaml [example: iaas]
apiVersion: core.platformspec.io/v1alpha1
kind: Provider
metadata:
  name: aws
spec:
  category: iaas
  engine: aws-organizations
  credentialRef:
    name: aws-creds
  config:
    tags:
      somekey: somevalue 
```
:::

**Key Fields:**

* **`name` *(required)*:** A unique identifier for the provider within your platform.
* **`category` *(required)*:** Categorizes the provider type, enabling filtering and organization. 
* **`engine` *(required)*:** Specifies the specific implementation or technology used by a provider within its category. This allows you to distinguish between different ways of deploying or managing a particular type of service.
* **`credentialRef` *(optional)*:** References a `Credential` resource containing credentials needed to interact with the provider.
* **`config` *(optional)*:** Holds configuration parameters specific to the provider.

#### Categories
Possible categories include:

|  *Category*  |  *Description*  |
| --- | --- |
| `iaas` | Infrastructure as a Service providers (e.g., AWS, Azure, GCP) |
| `dns` | Domain Name System providers (e.g., Route53, Cloudflare) |
| `identity` | Identity and access management (IAM) providers (e.g., Okta, Auth0) |
| `registry` | Container image registries (e.g., Docker Hub, ECR, GCR) |
| `backup` | Backup and recovery services (e.g., AWS Backup, Azure Backup) | 
| `monitoring` | Monitoring and observability platforms (e.g., Prometheus, Datadog) |
| `secrets` | Secrets management systems (e.g., Vault, HashiCorp Secret Manager) |
| `observability` | Comprehensive observability tools (e.g., Grafana, Jaeger). |
| `cicd` | Continuous integration and continuous delivery platforms (e.g., CircleCI, ArgoCD, Jenkins, GitLab CI/CD) |
| `logging` | Logging providers that collect, store, and analyze log data from applications and systems (e.g., Elasticsearch, Splunk, Graylog). |
| `automation` | Automation tools (e.g., Terraform Atlantis, Rundeck, Ansible). |
| `auditing` | Security auditing and compliance solutions (e.g., CloudTrail, Audit Logs). |
| `security` | Security posture management platforms (e.g., Prisma Cloud, Qualys). |
| `alerting` | Alerting and notification services (e.g., PagerDuty, Opsgenie). |
| `cluster` | Cluster management systems (e.g., Kubernetes on AWS, Azure, GCP). |
| `x-custom`| Placeholder for custom provider categories. |

#### Engines
Possible engines include:
  *  Under the `category: iaas`, you may have engines such as:
    * `aws-organizations` for AWS with Organizations for Account Management
    * `aws-static` for AWS with static/existing account configuration.
    * `gcp-projects` for Google Cloud Platform Projects.
  * Under the `category: dns`, you may have engines such as:
    * `route53` for AWS Route53.
    * `clouddns` for GCP Cloud DNS.
    * `cloudflare` for Cloudflare.
  * Uunder the `category: cluster`, you may have engines such as:
    * `aws-eks` for Amazon Elastic Kubernetes Service
    * `kubeadm` for self-managed Kubernetes clusters using kubeadm
    * `gcp-gke` for Google Kubernetes Engine
    * `azure-aks` for Azure Kubernetes Service
    * `fargate` for AWS Fargate container deployment
    * `nomad` for Nomad cluster management.


### Environments

The `Environment` CRD in The Platform Specification represents a distinct deployment ecosystems within your platform, such as development, testing, staging, or production. It defines the specific configurations and resources required for deploying and managing applications and services within that particular environment.

**Structure:**

::: code-group
```yaml [spec]
apiVersion: core.platformspec.io/v1alpha1
kind: Environment
metadata:
  name: <environment-name> 
spec:
  description: <environment-description>
  providerRefs:
    - kind: Provider
      name: <provider-name> 
    - kind: Provider
      name: <provider-name>
```

```yaml [example]
---
apiVersion: core.platformspec.io/v1alpha1
kind: Environment
metadata:
  name: development
spec:
  description: Development environment
  providerRefs:
    - kind: Provider
      name: route53
    - kind: Provider
      name: aws
---
apiVersion: core.platformspec.io/v1alpha1
kind: Environment
metadata:
  name: production
spec:
  description: Production environment
  providerRefs:
    - kind: Provider
      name: route53
    - kind: Provider
      name: aws
```
:::

**Key Fields:**

* **`name` *(required)*:** A unique identifier for the environment, typically reflecting its purpose (e.g., `development`, `staging`, `production`).
* **`description` *(optional)*:** Provides a concise description of the environment's purpose and intended use.
* **`providerRefs` *(required)*:**  References specific `Provider` resources that define the cloud platforms or services used within this environment. This ensures that the correct configurations and credentials are applied based on the target environment.
   * `kind`: Specifies the type of resource being referenced, which is always "Provider" in this case.
   * `name` *(required)*:  The name of the `Provider` resource being referenced, indicating the specific provider or service used within this environment.



### Images
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


### Clusters
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

### Servers
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





### Software

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




### Policies
The Policies section governs the operational and cost-management aspects of the platform. Policies may include logging, scaling, backups, or disaster recovery strategies. This ensures that critical governance and operational practices are well defined and consistently applied.

::: code-group
```yaml [platform.yaml]
# TBD

```

```json [platform.json]
// TBD
```
:::

