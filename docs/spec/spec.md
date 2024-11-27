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

The six domains that The Platform Specification captures, to fully define a platform, irrespective of its type (Infrastructure Platform, Developer Platform, Services Platform), are as follows:

**1. Infrastructure**
   - Core physical and virtual resources required to support the platform, including:
     - **Providers**: Cloud providers, on-premises infrastructure.
     - **Environments**: Staging, production, etc.
     - **Credentials and Access**: Authentication details for providers.
     - **Machine Images**: AMIs, VM templates, etc.
     - **Storage and Persistence**: Volumes, S3 buckets, databases.

**2. Compute & Networks**
   - Compute and networking resources needed for workloads, covering:
     - **Servers and Nodes**: Virtual machines, bare-metal servers, etc.
     - **Kubernetes Clusters**: Managed (EKS, GKE) or self-hosted.
     - **Networking Configurations**: VPCs, subnets, security groups, firewalls.
     - **Managed Services**: Hosted databases, message queues, and similar services.

**3. Policies**
   - Rules and guidelines to control platform operations and behaviors:
     - **Cost Management**: Budgeting, quotas, alerts.
     - **Scaling Policies**: Auto-scaling, load balancing.
     - **Disaster Recovery**: Backups, replication, and restoration.
     - **Security**: Identity and access management (IAM), encryption.
     - **Governance**: Compliance standards (SOC2, GDPR).

**4. Governance & Compliance**
   - Ensures platform operation adheres to organizational and regulatory requirements:
     - **Auditing**: Logs of access and operations.
     - **Compliance Standards**: Policies aligned to ISO, SOC2, PCI-DSS, etc.
     - **Identity & Access**: RBAC, multi-factor authentication.
     - **Data Protection**: Retention policies, secure data handling.

**5. Developer Services & Enablement**
   - Tools and services that empower developers to build, test, and deploy applications:
     - **CI/CD Pipelines**: Jenkins, GitHub Actions, ArgoCD.
     - **Application Hosting**: Serverless functions, app containers.
     - **API Management**: API gateways, service meshes.
     - **Dev Tools**: IDE integrations, debugging tools.
     - **Platform SDKs**: Libraries for interacting with platform resources.

**6. Monitoring and Insights**
   - Systems for monitoring, analyzing, and improving platform performance:
     - **Metrics and Monitoring**: Prometheus, Grafana, CloudWatch.
     - **Cost Accounting**: Kubecost, Opencost, Cloudhealth, etc.
     - **Logging**: Log aggregation, search, and analysis tools.
     - **Alerting**: PagerDuty, Slack integrations.
     - **Tracing**: Distributed tracing for performance debugging.
     - **Performance Benchmarks**: Testing under load, latency analysis.

You will see this reflected within the various API kinds, defined below.


## Document Structure
The Platform Specification has embraced a modern approach to defining and managing your platforms using Kubernetes Custom Resource Definitions (CRDs). This allows us to leverage the power and flexibility of Kubernetes while providing a structured and declarative way to represent platform components.

The Platform Specification defines several core API kinds, each representing a distinct element within your platform:

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

Let’s walk through these API kinds:

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
  title: <short-title>
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

<<< ../../examples/aws/platform.yaml{yaml}[example]
:::

**Key Fields:**

* **`name` *(required)*:**  A unique identifier for your platform within the Platform Specification.
* **`title` *(required)*:** A short human readable title for this platform.
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

---

### Credential
The credentials API kind in the Platform Specification defines how authentication credentials are managed for various cloud services. This allows for flexible configuration and secure storage of sensitive information.

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

<<< ../../examples/aws/credentials.yaml{yaml}[example]
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

---

### Provider

The `Provider` API kind defines the specific cloud provider or service used for managing infrastructure and platform components within your environment.  Providers offer pre-configured integrations and functionalities tailored to their respective platforms, simplifying deployment and management.

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

<<< ../../examples/aws/providers.yaml{yaml}[example]
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

---
### Environment

The `Environment` API kind in The Platform Specification represents a distinct deployment ecosystems within your platform, such as development, testing, staging, or production. It defines the specific configurations and resources required for deploying and managing applications and services within that particular environment.

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
<<< ../../examples/aws/environments.yaml{yaml}[example]
:::

**Key Fields:**

* **`name` *(required)*:** A unique identifier for the environment, typically reflecting its purpose (e.g., `development`, `staging`, `production`).
* **`description` *(optional)*:** Provides a concise description of the environment's purpose and intended use.
* **`providerRefs` *(required)*:**  References specific `Provider` resources that define the cloud platforms or services used within this environment. This ensures that the correct configurations and credentials are applied based on the target environment.
   * `kind`: Specifies the type of resource being referenced, which is always "Provider" in this case.
   * `name` *(required)*:  The name of the `Provider` resource being referenced, indicating the specific provider or service used within this environment.


---

### Network

The `Network` API kind provides a standardized way to define and manage various types of network infrastructures within your platform. Whether it's a traditional VPC, a VPN tunnel, an overlay network, or any other custom connectivity model, this resource encapsulates the essential configurations required for reliable and secure communication across your cloud environments.

**Structure:**

::: code-group
```yaml [spec]
apiVersion: core.platformspec.io/v1alpha1
kind: Network
metadata:
  name: <network-name> 
spec:
  type: <network-type> # (e.g., vpc, vpn, overlay)
  providerRefs:
    - kind: Provider
      name: <provider-name> 
  config:
    # Network-specific configuration properties based on 'type'
```

<<< ../../examples/aws/network-vpc.yaml{yaml}[example]

:::


**Key Fields:**

  * **`name`:** A unique identifier for this network.
  * **`type`:** Specifies the category or model of the network being defined. 
      * **Common Types:** 
          * `vpc`: Virtual Private Cloud (e.g., AWS VPC, Azure VNet).
          * `vpn`: VPN tunnel (IPsec, OpenVPN, etc.) connecting networks.
          * `overlay`: Overlay networking technology (e.g., VXLAN, NVGRE) for segmenting and connecting virtual resources.
      * **Custom Types:** You can define your own network types to represent specialized connectivity models within your platform.
  * **`providerRefs`:** References one or more `Provider` resources responsible for managing this network infrastructure.  This allows you to associate specific cloud providers or networking tools with the network definition.
  * **`config`:** Holds network-specific configurations based on the `type`. 


---

### Image

The `Image` API kind in The Platform Specification represents a fundamental building block for your cloud platform, encompassing both container images and machine images (e.g. AMIs). It defines the source, versioning, and configuration details of these artifacts, ensuring consistent deployment across environments.

**Structure:**

::: code-group
```yaml [spec]
apiVersion: core.platformspec.io/v1alpha1
kind: Image
metadata:
  name: <image-name> 
spec:
  category: machine | container  # Specifies the type of image (machine or container)
  spec:
    default: boolean # Whether this image is the default for a given provider and environment.
    providerRefs:
      - kind: Provider
        name: <provider-name> 
    environmentRefs:
      - name: <environment-name>
        kind: Environment
      # ... more environment references (optional)
    version: <image-version> # Semantic versioning string
    builder: # Only used for building images, not pre-existing ones.
      driver: image-builder # Name of the builder driver (e.g., image-builder, docker).
      config:
        # ... Builder-specific configuration (target, location, options)
      software:
        packages:
          - name: <package-name>
            version: <package-version>
        repos:
          - name: <repo-name>
            url: <repo-url>

    reference: # Only used for pre-existing images, not built ones.
      id: <image-id>   # Unique identifier of the image (e.g., AMI ID)
      location: <region>
```

<<< ../../examples/aws/image-build.yaml{yaml}[example: build]

<<< ../../examples/aws/image-existing.yaml{yaml}[example: existing]

:::

**Key Fields:**

* **`category` (required):**  Indicates the type of image being defined.

   * `machine`: Represents a machine image, such as an Amazon Machine Image (AMI).
   * `container`: Defines a container image used for deploying applications within your platform.
* **`spec` (spec):** Contains configuration details specific to the image.
    * **`default`:** (boolean) Indicates whether this image is the default choice for a given provider and environment combination. This helps simplify deployments by setting up common starting points. 
    * **`providerRefs`:** References `Provider` resources specifying the cloud platform on which the image can be deployed (e.g., AWS, Azure).
    * **`environmentRefs`:** References `Environment` resources indicating the environments where this image is intended to be used. This ensures that the correct images are targeted for different deployment stages.
    * **`version`:**  (string) Represents the version of the image using semantic versioning (e.g., v1.28.13). This helps track and manage image updates effectively.
    * **`builder`:**
       * `driver`: Specifies the type of image builder to use for creating this image (e.g., `image-builder`, `docker`).
       * `config`: Contains configuration parameters specific to the chosen builder driver:
           * `target`:  (for `image-builder`) Defines the base AMI or template for building the image.
           * `location`:  (for `image-builder`) Specifies the region where the image will be built.
           * `options`: (for `image-builder`) Provides additional options or customizations for the builder process.
       * `software`: 
          * `packages`: Defines the software packages to be included in the image, specifying their names and versions. 
          * `repos`: Lists the repositories from which packages will be sourced during image building.
    * **`reference`:**
       * `id`: (string)  Unique identifier of a pre-existing image (e.g., AMI ID for machine images). This field is used when you are referencing an image that already exists in your cloud provider's registry.
       * `location`:  (string) Specifies the region where the pre-existing image is located.


---

### Cluster
The `Cluster` API kind in The Platform Specification represents a managed cluster deployment, encapsulating all necessary configurations to provision and manage your infrastructure within a specific environment. 

**Structure:**

::: code-group
```yaml [spec]
apiVersion: core.platformspec.io/v1alpha1
kind: Cluster
metadata:
  name: <cluster-name>  
spec:
  providerRefs:
    - kind: Provider
      name: <provider-name>
    - ... more provider references (optional) 
  environmentRef:
    name: <environment-name>
      kind: Environment 
  softwareGroupRefs:
    name: <software-group-name> 
  version: "<cluster engine version>"
  region: <deployment-region>
  config: {}
```

<<< ../../examples/aws/cluster-kubeadm.yaml{yaml}[example: aws/kubeadm]

<<< ../../examples/aws/cluster-fargate.yaml{yaml}[example: aws/fargate]

<<< ../../examples/aws/cluster-nomad.yaml{yaml}[example: nomad]

:::

 **Key Fields:**

* **`providerRefs` (required):** Specifies the cloud providers responsible for provisioning and managing the Kubernetes infrastructure.  Each reference points to a `Provider` resource, defining details like account credentials and region.
* **`environmentRef` (required):** References an `Environment` resource, associating the cluster with its corresponding deployment stage (development, staging, production). This ensures that the cluster is configured with the appropriate settings for its intended purpose.
* **`softwareGroupRefs` (optional):** Links to a `SoftwareGroup` resource defining the base Kubernetes components and additional tools or software packages that will be included in the cluster. 
* **`version` (required):**  Specifies the version to be deployed within cluster's engine, enabling you to manage different versions for various environments.
* **`region` (required):** Indicates the geographical region where the cluster resources will be deployed. 
* **`config` (optional):** Configuration parameters for the Provider provisioning or managing the Cluster.


---

### Server
The `Servers` API kind of the Platform Specification defines individual virtual servers (instances) that exist within various environments and Infrastructure as a Service (IaaS) providers.  These are standalone servers, distinct from server groups or clusters. Each server entry represents a specific instance with its own configuration details.


**Structure:**

::: code-group
```yaml [spec]
apiVersion: core.platformspec.io/v1alpha1
kind: Server
metadata:
  name: <server-name> 
spec:
    providerRefs:
      - kind: Provider
        name: <provider-name>
      - ... more provider references (optional) 
    environmentRef:
      name: <environment-name>
      kind: Environment 
    region: <deployment-region>
    network: <network-identifier>  
    config:
      size: <instance-type>
      machineImageRef:
        name: <image-name>     
```

<<< ../../examples/aws/server.yaml{yaml}[example]
:::


**Key Fields:**

* **`providerRefs` (required):** Specifies the cloud providers responsible for managing this server. Each reference points to a `Provider` resource, defining details like account credentials and region. 
* **`environmentRef` (required):** References an `Environment` resource, associating the server with its corresponding deployment stage (development, staging, production). This ensures that the server is configured with the appropriate settings for its intended purpose.
* **`region` (required):** Indicates the geographical region where the server resources will be deployed.
* **`network` (optional):** Identifies the network or VPC to which this server will be connected.
* **`config` (optional):** {}

---

### SoftwareGroup

The `SoftwareGroup` API kind in The Platform Specification acts as a mechaism for defining and managing application software stacks across your platform. It encapsulates a collection of packages, configurations, and dependencies required to deploy and operate specific software components or applications consistently across different environments.

**Structure:**

::: code-group
```yaml [spec]
apiVersion: core.platformspec.io/v1alpha1
kind: SoftwareGroup
metadata:
  name: <software-group-name> 
spec:
  packages:
    - name: <package-or-releasename>
      engine: <type> # (e.g., helm, docker)
      config: <type-specific-configuration> 

```

:::

**Key Fields:**


* **`name` (required):** A unique identifier for this software group.
* **`packages` (spec):**  A list of individual software components included in this group. Each package specifies its name, type, and configuration details:
    * **`name`:** The unique name of the package or release within this software group.
    * **`engine`:** Defines the format and deployment method for this package (e.g., `helm`, `docker`). 
    * **`<engine-specific-configuration>`:**  Provides configuration options specific to the package engine.

---

### Policies
The Policies API kind governs the operational and cost-management aspects of the platform. Policies may include logging, scaling, backups, or disaster recovery strategies. This ensures that critical governance and operational practices are well defined and consistently applied.

::: code-group
```yaml [spec]
# TBD

```

```yaml [example]
# TBD
```
:::

