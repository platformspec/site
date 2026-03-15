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
| Cloud Resources | Cloud account vending, provider-level bootstrapping (accounts, projects, subscriptions). Drives cloud API calls via the Platspec Operator. |
| Networking | VPCs, subnets, DNS zones, load balancers, network peering. |
| Observability | Metrics, logging, and tracing stacks (Prometheus, Loki, Tempo, OpenTelemetry). |
| Security | Policy engines, certificate management, secrets management, admission controls. |
| Storage | Persistent volumes, object storage buckets, backup and snapshot policies. |

**Provider Adapters** are cloud-provider-specific implementations (AWS, GCP, Azure, CloudStack). They are referenced by capability blueprints that need provider-level context and are rarely used standalone.

The relationship between these scopes: Platform Patterns reference Capability Blueprints, which may in turn delegate provider-specific work to Provider Adapters.

## Finding Blueprints

### Bundled Blueprints

The Platspec Operator ships with a small set of sample blueprints baked into the container image at `/blueprints`. These are available immediately after installation with no registry configuration required — the operator resolves them from its local directory automatically.

| Blueprint | Capability | Description |
| --- | --- | --- |
| `namespace-bootstrap` | `namespace-bootstrap` | Creates a namespace per environment with standard labels. No cloud dependencies — a good first smoke test. |
| `namespace-rbac` | `namespace-rbac` | Applies RBAC roles and bindings within bootstrapped namespaces. |
| `configmap-platform-metadata` | `metadata` | Publishes platform metadata as a ConfigMap. |

These blueprints are also available as source in the [platspec-operator repository](https://github.com/platformspec/platspec-operator/tree/main/blueprints) and can be used as reference implementations when authoring your own.

### Official Blueprint Catalog — Coming Soon

An official, community-maintained blueprint catalog covering the full taxonomy above — Cluster Capabilities, Cloud Resources, Networking, Observability, Security, Storage, and Platform Patterns — is on the roadmap. It will be published as a versioned OCI registry and consumable directly via a `BlueprintRegistry` resource.

Until then, you can bring your own blueprints by pointing a `BlueprintRegistry` at any Git repository, OCI registry, HTTP server, or S3 bucket that contains blueprint packages. See [Authoring Blueprints](./authoring-blueprints) to get started.

### Configuring a Blueprint Registry

To fetch blueprints from a remote source, create a `BlueprintRegistry` resource:

```yaml
apiVersion: core.platformspec.io/v1alpha1
kind: BlueprintRegistry
metadata:
  name: my-blueprints
  namespace: platspec-system
spec:
  type: git
  url: https://github.com/my-org/my-blueprints.git
  path: blueprints       # optional subdirectory within the repo
  ref: main              # optional branch, tag, or commit (git only)
  auth:
    type: secret
    secretRef:
      name: git-credentials
      namespace: platspec-system
```

Then reference the registry by name in your `BlueprintBinding`:

```yaml
blueprintMappings:
  - capability: namespace-bootstrap
    blueprint:
      name: namespace-bootstrap
      version: "0.1.0"
      registry: my-blueprints
```

Supported registry types: `oci`, `git`, `http`, `s3`, `filesystem`. See [BlueprintRegistry](/docs/spec/groups/core.platformspec.io#blueprintregistry) for the full spec.

### Using Bundled or Local Blueprints

Blueprints can be referenced without a registry when they are available in the operator's local blueprint directory. The bundled blueprints work this way by default:

```yaml
blueprintMappings:
  - capability: namespace-bootstrap
    blueprint:
      name: namespace-bootstrap   # resolved from /blueprints in the operator pod
      version: "0.1.0"
```

You can also mount your own blueprints via a `PersistentVolumeClaim` — see the [operator documentation](./operator#providing-blueprints) for details.

## Using Blueprints

### Step 1: Define your Platform

Create a `Platform` resource that declares the capabilities your platform requires:

```yaml
apiVersion: core.platformspec.io/v1alpha1
kind: Platform
metadata:
  name: my-platform
  namespace: platspec-system
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
  namespace: platspec-system
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
        registry: platspec-catalog
        config:
          retentionDays: 30
```

### Step 3: Apply and observe

```bash
kubectl apply -f platform.yaml

# Watch the Platform reach Ready
kubectl -n platspec-system get platforms -w

# Check per-binding status
kubectl -n platspec-system get blueprintbindings
kubectl -n platspec-system describe blueprintbinding my-platform-bindings
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

Find it in the [platspec-operator repository](https://github.com/platformspec/platspec-operator/tree/main/examples/01-minimal).
