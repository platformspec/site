---
outline: deep
---

# API Group: core.platformspec.io
The `core.platformspec.io` API Group defines the foundational constructs that serve as the backbone of the Platform Specification.  These core abstractions provide a common language and structure for all other API Groups, ensuring consistency, interoperability, and scalability.

By centralizing fundamental concepts, `core.platformspec.io` enables platform teams to work with a well-defined set of primitives that establish the platform’s identity, organization, and metadata.  This ensures that every part of the Platform Specification operates within a cohesive and standardized framework, facilitating extensibility and long-term maintainability.

Think of `core.platformspec.io` as the "primitives" layer -- it provides essential types that other API groups extend, reference, or implement.

## Kinds
| Kind | Description | Status |
| --- | --- | --- |
| [Platform](#platform) | Represents the overarching top level for your entire platform. | ✅&nbsp;Defined |
| [Credential](#credential) | Defines reference parameters for locations to sensitive information required for connecting to various services. | ✅&nbsp;Defined |
| [Provider](#provider) | Defines the specific provider or service used for managing parts of your Platform. | ✅&nbsp;Defined |
| [Environment](#environment) | Represents a distinct operational environment for your platform. | ✅&nbsp;Defined |

## Definitions
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
    networks:
      - name: <network-name>
        kind: Network
```

<<< ../../../examples/aws/platform.yaml{yaml}[example]
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

<<< ../../../examples/aws/credentials.yaml{yaml}[example]
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

<<< ../../../examples/aws/providers.yaml{yaml}[example]
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
| `server` | Virtual machines (e.g. EC2 instance). |
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
<<< ../../../examples/aws/environments.yaml{yaml}[example]
:::

**Key Fields:**

* **`name` *(required)*:** A unique identifier for the environment, typically reflecting its purpose (e.g., `development`, `staging`, `production`).
* **`description` *(optional)*:** Provides a concise description of the environment's purpose and intended use.
* **`providerRefs` *(required)*:**  References specific `Provider` resources that define the cloud platforms or services used within this environment. This ensures that the correct configurations and credentials are applied based on the target environment.
   * `kind`: Specifies the type of resource being referenced, which is always "Provider" in this case.
   * `name` *(required)*:  The name of the `Provider` resource being referenced, indicating the specific provider or service used within this environment.
