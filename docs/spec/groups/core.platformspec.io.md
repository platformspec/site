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
| [BlueprintBinding](#blueprintbinding) | Associates blueprints with a Platform, controlling which capabilities are provisioned and in which environments. | ✅&nbsp;Defined |
| [BlueprintRegistry](#blueprintregistry) | Declares an external blueprint registry the operator can pull blueprints from. | ✅&nbsp;Defined |

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
  resourceSelector:
    matchLabels:
      <label-key>: <label-value>
  requirements:
    general:
      cloudProvider: <provider>
    capabilities:
      - <capability-name>
    resources:
      - kind: Environment
        minimum: 1
  deletionPolicy: Delete | Orphan
  overrides:
    <key>: <value>
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
**Operator Fields:**

The following fields are read by the Platspec Operator during reconciliation:

* **`resourceSelector.matchLabels` *(optional)*:** Label selector used to discover associated resources (Environments, Providers, Clusters, etc.) by their Kubernetes labels. This is the primary mechanism by which the operator finds infra resources that belong to this Platform. Resources must carry the label `platform.platformspec.io/name: <platform-name>` to be discovered — see [Resource Discovery](#resource-discovery).
* **`requirements` *(optional)*:** Constraints on the resources and capabilities associated with this Platform.
  * **`general.cloudProvider`:** Expected cloud provider (e.g., `aws`, `gcp`, `azure`, `none`).
  * **`capabilities[]`:** List of capability names this Platform requires. The operator validates that all listed capabilities are satisfied by at least one `BlueprintBinding` before marking the Platform ready.
  * **`resources[]`:** Minimum and maximum counts of associated resource kinds (e.g., at least 1 Environment).
* **`deletionPolicy` *(optional, default: Delete)*:** Controls what happens to generated resources when this Platform is deleted. `Delete` removes all resources created by the operator; `Orphan` leaves them in place.
* **`overrides` *(optional)*:** Free-form key-value configuration merged into every blueprint's runtime context. Use this to inject global values (e.g., a shared domain or account ID) without repeating them in each `BlueprintBinding`.

**Status:**

```yaml
status:
  phase: Progressing | Ready | Failed
  observedGeneration: <int>
  lastStatusUpdate: <timestamp>
  conditions:
    - type: Ready
      status: "True" | "False"
      reason: AllBindingsReady | BindingsFailed | BindingsProgressing | NoBlueprintsConfigured
      message: <string>
      lastTransitionTime: <timestamp>
  capabilities:
    <capability-name>:
      phase: <string>
```

| Reason | Meaning |
| --- | --- |
| `AllBindingsReady` | All blueprint bindings completed successfully. |
| `BindingsProgressing` | At least one binding is still being provisioned. |
| `BindingsFailed` | At least one binding encountered an error. |
| `NoBlueprintsConfigured` | No `BlueprintBinding` resources target this Platform. |

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
| `kubernetes-secret` | Kubernetes Secret. |
| `configmap` | Kubernetes ConfigMap. |
| `env` | Environment variables containing the contents of the credentials, as defined in `fields`. |
| `file` | File path _relative to consumer of the Credential API_. |
| `aws-secrets-manager` | AWS Secrets Manager. |
| `vault` | Hashicorp Vault. |
| `aws-ssm` | AWS SSM Parameter Store. |
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
| `static` | Hardcoded values within `fields` section; not advised for production use. |
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

**Resource Discovery Label:**

For the Platspec Operator to discover an Environment as belonging to a Platform, the Environment must carry the label `platform.platformspec.io/name: <platform-name>`. Without this label the operator cannot associate the Environment with the Platform and selector-based filtering (via `BlueprintBinding.spec.selectors`) will not apply. See [Resource Discovery](#resource-discovery).

---

### BlueprintBinding

The `BlueprintBinding` CRD associates one or more blueprint mappings with a Platform, controlling which capabilities are provisioned and in which environments or clusters they run. Each mapping binds a named `capability` to a specific blueprint package and configuration.

Multiple `BlueprintBinding` resources can target the same Platform. When two bindings claim the same `capability`, the one with the lower `precedence` value wins (lower number = higher priority).

**Structure:**

::: code-group
```yaml [spec]
apiVersion: core.platformspec.io/v1alpha1
kind: BlueprintBinding
metadata:
  name: <binding-name>
  labels:
    platform.platformspec.io/name: <platform-name>
spec:
  platformRef:
    name: <platform-name>
  deletionPolicy: Delete | Orphan   # default: Delete
  precedence: 100                   # lower = higher priority
  selectors:
    environmentSelector:
      matchLabels:
        <label-key>: <label-value>
    clusterSelector:
      matchLabels:
        <label-key>: <label-value>
    locationSelector:
      matchLabels:
        <label-key>: <label-value>
  blueprintMappings:
    - capability: <capability-name>
      blueprint:
        name: <blueprint-name>
        version: <version>
        registry: <registry-name>   # optional; references a BlueprintRegistry
        config:
          <key>: <value>
```
:::

**Key Fields:**

* **`platformRef.name` *(required)*:** The name of the Platform this binding belongs to.
* **`deletionPolicy` *(optional, default: Delete)*:** Controls what happens to generated resources when the binding is deleted. `Delete` removes all resources the operator created for this binding; `Orphan` leaves them in place.
* **`precedence` *(optional, default: 100)*:** Priority used when multiple bindings claim the same capability. Lower values win.
* **`selectors` *(optional)*:** Filters which environments or clusters this binding applies to. A binding with no selectors runs against all discovered environments.
  * **`environmentSelector.matchLabels`:** Only applies to environments whose labels contain all specified key-value pairs.
  * **`clusterSelector.matchLabels`:** Only applies to clusters whose labels contain all specified key-value pairs.
  * **`locationSelector.matchLabels`:** Only applies in locations whose labels contain all specified key-value pairs.
* **`blueprintMappings` *(required)*:** List of capability-to-blueprint assignments.
  * **`capability` *(required)*:** The logical capability name this mapping satisfies (e.g., `namespace-bootstrap`, `vpc-baseline`).
  * **`blueprint.name` *(required)*:** Name of the blueprint package to run.
  * **`blueprint.version` *(optional, default: latest)*:** Version to fetch. Pinned versions are cached locally; `latest` is always re-fetched.
  * **`blueprint.registry` *(optional)*:** Name of a `BlueprintRegistry` resource to fetch from. Omit to use the operator's local blueprint directory.
  * **`blueprint.config` *(optional)*:** Input configuration passed to the blueprint at runtime, merged with Platform-level `overrides`.

**Status:**

```yaml
status:
  phase: Progressing | Ready | Failed
  observedGeneration: <int>
  lastStatusUpdate: <timestamp>
  conditions:
    - type: Ready
      status: "True" | "False"
      reason: <reason>
      message: <string>
      lastTransitionTime: <timestamp>
  generatedResources:
    - apiVersion: <api-version>
      kind: <kind>
      name: <resource-name>
      namespace: <namespace>
```

The `generatedResources` list tracks every Kubernetes resource applied during the last reconciliation. It is also stored as the annotation `platspec.io/generated-resources` (JSON-encoded) on the `BlueprintBinding` object.

---

### BlueprintRegistry

The `BlueprintRegistry` CRD declares an external source from which the Platspec Operator fetches blueprint packages. Registries are referenced by name from `BlueprintBinding.spec.blueprintMappings[*].blueprint.registry`.

**Structure:**

::: code-group
```yaml [spec]
apiVersion: core.platformspec.io/v1alpha1
kind: BlueprintRegistry
metadata:
  name: <registry-name>
spec:
  type: oci | git | http | s3 | filesystem
  url: <registry-url>
  path: <subdirectory>      # optional: subdirectory within the registry root
  ref: <branch-or-tag>      # optional: git ref (git registries only)
  region: <aws-region>      # required for type: s3
  auth:
    type: secret | serviceAccount | anonymous   # default: anonymous
    secretRef:
      name: <secret-name>
      namespace: <secret-namespace>
```
:::

**Key Fields:**

* **`type` *(required)*:** Backend type.
  * `oci` — OCI-compliant container registry (e.g., ECR, GCR, Docker Hub).
  * `git` — Git repository; use `git+ssh://` prefix for SSH, `https://` for HTTPS.
  * `http` — HTTP/HTTPS server serving `.tar.gz` blueprint archives.
  * `s3` — S3-compatible object storage.
  * `filesystem` — Local filesystem path; always fetches live and bypasses the version cache.
* **`url` *(required)*:** Registry endpoint URL.
* **`path` *(optional)*:** Subdirectory within the registry root where blueprint packages are located (e.g. `components/general`). When set, blueprints are resolved at `<path>/<name>` rather than `<name>`. Useful for monorepo-style registries.
* **`ref` *(optional, git only)*:** Git branch, tag, or commit SHA to clone. When set, this ref is used for all fetches from this registry and the blueprint `version` in `BlueprintBinding` is used only for cache keying. If not set, the blueprint version is used as the git ref.
* **`region` *(optional)*:** AWS region. Required when `type: s3`.
* **`auth.type` *(optional, default: anonymous)*:** Authentication method.
  * `secret` — Reads credentials from the Kubernetes Secret named in `auth.secretRef`. For SSH git registries the Secret must contain a `ssh-privatekey` key; for HTTPS or OCI registries it must contain `username` and `password`.
  * `serviceAccount` — Uses the operator's own service account (for IRSA / Workload Identity).
  * `anonymous` — No authentication.

**Cache Behavior:**

Remote blueprints (OCI, git, HTTP, S3) are cached at `cache_dir/{registry-name}/{blueprint-name}/{version}/`. Versioned blueprints (anything except `latest`) are served from cache on subsequent reconciles without network access. The `latest` tag is always re-fetched. `filesystem` type registries bypass the cache entirely.

---

### Resource Discovery

The Platspec Operator discovers which Environments, Providers, Clusters, and other infra resources belong to a Platform using label selectors rather than explicit name lists.

**Required label on all infra resources:**

```yaml
metadata:
  labels:
    platform.platformspec.io/name: <platform-name>
```

Without this label, a resource is invisible to the operator — it will not be used for context assembly or `BlueprintBinding` selector matching.

---

### Labels and Annotations

The Platspec Operator applies the following labels to every Kubernetes resource it creates or manages, and writes the following annotations to track reconciliation state.

**Labels applied to generated resources:**

| Label | Value | Purpose |
| --- | --- | --- |
| `platspec.io/platform` | Platform name | Used for discovery and bulk cleanup of all resources belonging to a Platform. |
| `platspec.io/managed-by` | `platspec-operator` | Identifies the managing operator. |
| `platspec.io/binding` | BlueprintBinding name | Identifies which binding produced this resource. |
| `platspec.io/capability` | Capability name | Identifies which capability this resource satisfies. |

**Annotations written to `BlueprintBinding`:**

| Annotation | Format | Purpose |
| --- | --- | --- |
| `platspec.io/generated-resources` | JSON array of `{apiVersion, kind, name, namespace}` | Tracks every resource applied in the last reconciliation. Used for cleanup and status reporting. |
| `platspec.io/reconcile-trigger` | ISO 8601 timestamp | Written by the operator to force re-reconciliation when config changes are detected. |
