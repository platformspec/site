---
outline: deep
---

# Blueprints

A **blueprint** is a versioned, self-contained KCL package that knows how to turn a platform definition into Kubernetes resources. When the Platspec Operator processes a `BlueprintBinding`, it fetches the referenced blueprint, passes it the assembled runtime context, executes the KCL logic, and applies the resulting manifests to the cluster.

Blueprints fall into three scopes, and within the middle tier, eight capability domains:

**Platform Patterns** are opinionated, full-stack blueprints for a specific platform archetype. They compose capability blueprints from the other categories into a coherent, ready-to-use platform. Start here if you want a complete platform with reasonable defaults.

**Capability Blueprints** are single-purpose building blocks. They each fulfill one named capability and can be assembled freely into any platform via `BlueprintBinding`. These are further organized by domain:

| Domain | What it covers |
| --- | --- |
| Cluster Capabilities | Kubernetes-native resources: namespaces, RBAC, workload bootstrapping. No cloud credentials required — run against the management cluster. |
| Cloud Resources | Cloud account vending, provider-level bootstrapping (accounts, projects, subscriptions). Drives cloud API calls via the Platsmith Operator. |
| Networking | VPCs, subnets, DNS zones, load balancers, network peering. |
| Observability | Metrics, logging, and tracing stacks (Prometheus, Loki, Tempo, OpenTelemetry). |
| Security | Policy engines, certificate management, secrets management, admission controls. |
| Storage | Persistent volumes, object storage buckets, backup and snapshot policies. |

**Provider Adapters** are cloud-provider-specific implementations (AWS, GCP, Azure, CloudStack). They are referenced by capability blueprints that need provider-level context and are rarely used standalone.

The relationship between these scopes: Platform Patterns reference Capability Blueprints, which may in turn delegate provider-specific work to Provider Adapters.

## Finding Blueprints

### Official Blueprint Catalog

The official Platsmith blueprint catalog is published at the [Platsmith Blueprint Registry](https://blueprints.platsmith.io). Blueprints are available as OCI artifacts and can be referenced directly from a `BlueprintRegistry` resource.

**Cluster Capabilities**

| Blueprint | Capability | Description |
| --- | --- | --- |
| `namespace-bootstrap` | `namespace-bootstrap` | Creates a platform Namespace and a smoke-test Deployment. No cloud dependencies — good first smoke test. |
| `cluster-namespaces` | `cluster-namespaces` | Provisions a standard set of namespaces across a cluster. |
| `namespace-rbac` | `namespace-rbac` | Applies RBAC roles and bindings within platform namespaces. |

**Cloud Resources**

| Blueprint | Capability | Description |
| --- | --- | --- |
| `cloud-account` | `cloud-account` | Derives a `CloudAccount` output resource from the Environment × Provider intersection, one per referenced provider. |

**Platform Patterns**

| Blueprint | Description |
| --- | --- |
| `startup-saas` | Multi-environment SaaS platform with dev, staging, and production tiers. |
| `enterprise-secure` | Compliance-ready, multi-region enterprise platform with security and governance controls. |

### Configuring a Blueprint Registry

To fetch blueprints from a remote registry, create a `BlueprintRegistry` resource:

```yaml
apiVersion: core.platformspec.io/v1alpha1
kind: BlueprintRegistry
metadata:
  name: platsmith-catalog
  namespace: platsmith-system
spec:
  type: oci
  url: oci://ghcr.io/platsmith/blueprints
```

Then reference the registry by name in your `BlueprintBinding`:

```yaml
blueprintMappings:
  - capability: namespace-bootstrap
    blueprint:
      name: namespace-bootstrap
      version: "0.1.0"
      registry: platsmith-catalog
```

Supported registry types: `oci`, `git`, `http`, `s3`, `filesystem`. See [BlueprintRegistry](/docs/spec/groups/core.platformspec.io#blueprintregistry) for the full spec.

### Using Local Blueprints

For development or air-gapped environments, mount blueprints directly into the operator pod and reference them without a registry:

```yaml
blueprintMappings:
  - capability: namespace-bootstrap
    blueprint:
      name: namespace-bootstrap   # resolved from the operator's local blueprint directory
      version: "0.1.0"
```

The operator looks for the blueprint at `<blueprintDir>/<name>/` (default mount: `/blueprints`).

## Using Blueprints

### Step 1: Define your Platform

Create a `Platform` resource that declares the capabilities your platform requires:

```yaml
apiVersion: core.platformspec.io/v1alpha1
kind: Platform
metadata:
  name: my-platform
  namespace: platsmith-system
spec:
  organization: My Org
  description: My platform
  version: 1.0.0
  deletionPolicy: Delete
  resourceSelector:
    matchLabels:
      platform.platformspec.io/name: my-platform
  requirements:
    capabilities:
      - namespace-bootstrap
      - observability
```

### Step 2: Create a BlueprintBinding

Bind capabilities to blueprint packages. A `BlueprintBinding` connects the declared capabilities to actual blueprint implementations:

```yaml
apiVersion: core.platformspec.io/v1alpha1
kind: BlueprintBinding
metadata:
  name: my-platform-bindings
  namespace: platsmith-system
  labels:
    platform.platformspec.io/name: my-platform
spec:
  platformRef:
    name: my-platform
  blueprintMappings:
    - capability: namespace-bootstrap
      blueprint:
        name: namespace-bootstrap
        version: "0.1.0"
        config:
          replicas: 2

    - capability: observability
      blueprint:
        name: prometheus-stack
        version: "1.0.0"
        registry: platsmith-catalog
        config:
          retentionDays: 30
```

### Step 3: Apply and observe

```bash
kubectl apply -f platform.yaml

# Watch the Platform reach Ready
kubectl -n platsmith-system get platforms -w

# Check per-binding status
kubectl -n platsmith-system get blueprintbindings
kubectl -n platsmith-system describe blueprintbinding my-platform-bindings
```

### Version pinning and `latest`

- A pinned `version` (e.g. `"0.1.0"`) is fetched once and cached locally. Subsequent reconciliations serve from cache.
- `version: latest` always re-fetches from the registry on every reconciliation. Use this during development; avoid it in production.

### Scoping bindings with selectors

A binding without selectors applies to all environments. Use `selectors` to restrict which environments or clusters a binding targets:

```yaml
spec:
  selectors:
    environmentSelector:
      matchLabels:
        tier: production        # only environments with this label
    clusterSelector:
      matchLabels:
        region: us-east-1
  blueprintMappings:
    - capability: high-availability-networking
      blueprint:
        name: vpc-ha
        version: "2.0.0"
```

For this to work, your `Environment` resources must carry the label `platform.platformspec.io/name: <platform-name>` so the operator can discover them. See [Resource Discovery](/docs/spec/groups/core.platformspec.io#resource-discovery).

## Example Platforms

The official example platform definitions are a good starting point. They are ordered from simplest to most complete:

The `01-minimal` example is the recommended starting point. It defines a `Platform` with two capabilities (`namespace-bootstrap` and `cloud-account`), a single `BlueprintBinding`, and the supporting `Environment`, `Provider`, and `Credential` resources. It exercises the full operator pipeline with no external cluster dependencies.

Find it in the [Platsmith GitHub repository](https://github.com/foundationio/platsmith/tree/main/examples/platform/01-minimal).
