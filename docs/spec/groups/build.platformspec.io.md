---
outline: deep
---

# API Group: build.platformspec.io
The `build.platformspec.io` API Group focuses on bringing a designed platform to life by defining infrastructure and core components that must be provisioned.  It translates architectural blueprints into deployable and configurable resources, ensuring that infrastructure is created consistently and predictably.

By providing a structured way to define what must be built, `build.platformspec.io` enables platform teams to provision resources efficiently, reduce manual effort, and improve automation.  This group ensures that platform creation follows a standardized, declarative approach, making it easier to deploy, manage, and scale infrastructure across environments.

## Kinds
| Kind | Description | Status |
| --- | --- | --- |
| [Cluster](#cluster) | Represents a cluster of nodes that form the foundation of a platform. | ✅&nbsp;Defined |
| [Node](#node) | Represents a single compute instance within a cluster. | ✅&nbsp;Defined |
| [Network](#network) | Defines networks for a platform. | ✅&nbsp;Defined |
| [Image](#image) | Describes a machine image used to create nodes. | ✅&nbsp;Defined |
| [SoftwareGroup](#softwaregroup) | Groups software components that must be installed on nodes. | ✅&nbsp;Defined |
| [NodePool](#nodepool) | Defines a group of nodes with similar configurations and properties. | 📝&nbsp;Planned |
| [Tunnel](#tunnel) | Specifies network tunnels between nodes or clusters. | 📝&nbsp;Planned |

## Definitions

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
  networkRefs:
    - name: <network-name>
      kind: Network
  softwareGroupRefs:
    name: <software-group-name>
  version: "<cluster engine version>"
  region: <deployment-region>
  config: {}
```

<<< ../../../examples/aws/cluster-kubeadm.yaml{yaml}[example: aws/kubeadm]

<<< ../../../examples/aws/cluster-fargate.yaml{yaml}[example: aws/fargate]

<<< ../../../examples/aws/cluster-nomad.yaml{yaml}[example: nomad]

:::

 **Key Fields:**

* **`providerRefs` (required):** Specifies the cloud providers responsible for provisioning and managing the Kubernetes infrastructure.  Each reference points to a `Provider` resource, defining details like account credentials and region.
* **`environmentRef` (required):** References an `Environment` resource, associating the cluster with its corresponding deployment stage (development, staging, production). This ensures that the cluster is configured with the appropriate settings for its intended purpose.
* **`networkRefs` (optional):** Identifies the network or VPC to which this server will be connected.
* **`softwareGroupRefs` (optional):** Links to a `SoftwareGroup` resource defining the base Kubernetes components and additional tools or software packages that will be included in the cluster.
* **`version` (required):**  Specifies the version to be deployed within cluster's engine, enabling you to manage different versions for various environments.
* **`region` (required):** Indicates the geographical region where the cluster resources will be deployed.
* **`config` (optional):** Configuration parameters for the Provider provisioning or managing the Cluster.

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

<<< ../../../examples/aws/network-vpc.yaml{yaml}[example]

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

<<< ../../../examples/aws/image-build.yaml{yaml}[example: build]

<<< ../../../examples/aws/image-existing.yaml{yaml}[example: existing]

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

### Node
The `Node` API kind of the Platform Specification defines individual virtual servers (instances) that exist within various environments and Infrastructure as a Service (IaaS) providers.  These are standalone servers, distinct from server groups or clusters. Each node entry represents a specific instance with its own configuration details.

**Structure:**

::: code-group
```yaml [spec]
apiVersion: core.platformspec.io/v1alpha1
kind: Node
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
    networkRefs:
      - name: <network-name>
        kind: Network
    config:
      size: <instance-type>
      machineImageRef:
        name: <image-name>
```

<<< ../../../examples/aws/node.yaml{yaml}[example]
:::


**Key Fields:**

* **`providerRefs` (required):** Specifies the cloud providers responsible for managing this node. Each reference points to a `Provider` resource, defining details like account credentials and region.
* **`environmentRef` (required):** References an `Environment` resource, associating the node with its corresponding deployment stage (development, staging, production). This ensures that the node is configured with the appropriate settings for its intended purpose.
* **`region` (required):** Indicates the geographical region where the node resources will be deployed.
* **`networkRefs` (optional):** Identifies the network or VPC to which this cluster will be connected.
* **`network` (optional):** Identifies the network or VPC to which this node will be connected.
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
