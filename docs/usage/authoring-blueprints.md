---
outline: deep
---

# Authoring Blueprints

A blueprint is a [KCL](https://kcl-lang.io) package — a directory containing at minimum a `main.k` file. An optional `blueprint.yaml` manifest declares the blueprint's metadata, inputs, expected outputs, and status expressions. The Platspec Operator executes `main.k` at reconciliation time, passing it a structured context built from the Platform and its associated resources.

## Package Structure

```
my-blueprint/
├── blueprint.yaml    # Manifest: metadata, inputs, outputs, status (optional but recommended)
└── main.k            # KCL logic: receives context, produces Kubernetes manifests
```

## The `blueprint.yaml` Manifest

The manifest describes the blueprint's interface. See the [Blueprint specification](/docs/spec/groups/design.platformspec.io#blueprint) for the full field reference.

A minimal manifest:

```yaml
apiVersion: blueprints.platformspec.io/v1alpha1
kind: Blueprint

metadata:
  name: my-blueprint
  capability: my-capability
  version: 0.1.0
  description: What this blueprint provisions.
  author: Your Name
  maintainer: team@example.com
  providers: []          # empty = provider-agnostic
  minOperatorVersion: 0.1.0
  tags: []

inputs:
  context:
    required:
      - platform
      - environment
    optional: []
  config:
    - field: replicas
      type: int
      default: 1
      description: Number of replicas.

outputs:
  generates:
    - apiVersion: apps/v1
      kind: Deployment
    - apiVersion: v1
      kind: Namespace

status:
  target: Platform
  fields:
    - field: ready
      type: bool
      description: True when all replicas are ready.
      expr: |
        deploy  = childResources["apps/v1/Deployment"][0]
        desired = deploy.spec.replicas if deploy?.spec?.replicas else 1
        ready   = deploy.status.readyReplicas if deploy?.status?.readyReplicas else 0
        ready >= desired
```

## The `main.k` KCL File

`main.k` is a KCL program that receives input context and returns a list of Kubernetes manifests. The operator injects context via `option("ctx")`.

### Input context

The operator assembles a structured context object from the Platform and its associated resources. Access it via `option("ctx")`:

```python
ctx = option("ctx")

# Top-level keys always present if declared in inputs.context.required:
platform    = ctx.platform      # Platform resource spec
environment = ctx.environment   # Environment resource spec (when running per-environment)
provider    = ctx.provider      # Provider resource spec (when scoped to a provider)

# Blueprint config (merged from BlueprintBinding config + Platform overrides):
config      = ctx.config

# Convenience accessors
replicas = config.replicas or 1
```

### Returning manifests

`main.k` must output a list of Kubernetes manifests. Return them as KCL schema instances or plain dicts:

```python
ctx      = option("ctx")
config   = ctx.config
platform = ctx.platform

ns_name  = "${platform.metadata.name}-ns"
replicas = config.replicas or 1

[
    {
        apiVersion = "v1"
        kind       = "Namespace"
        metadata   = {
            name   = ns_name
            labels = {
                "app.kubernetes.io/managed-by" = "platspec-operator"
            }
        }
    }
    {
        apiVersion = "apps/v1"
        kind       = "Deployment"
        metadata   = {
            name      = "${platform.metadata.name}-echo"
            namespace = ns_name
        }
        spec = {
            replicas = replicas
            selector = {matchLabels = {app = "echo"}}
            template = {
                metadata = {labels = {app = "echo"}}
                spec     = {
                    containers = [{
                        name  = "echo"
                        image = config.image or "nginx:latest"
                        ports = [{containerPort = 80}]
                    }]
                }
            }
        }
    }
]
```

### Accessing provider config

When a blueprint targets a specific cloud provider, the provider's config is available via the `provider` context key:

```python
ctx      = option("ctx")
provider = ctx.provider
config   = ctx.config

account_id = provider.spec.config.accountId
region     = provider.spec.config.region or "us-east-1"
```

### Generating one resource per environment-provider pair

Blueprints like `cloud-account` iterate over `providerRefs` on the Environment to emit one output resource per provider:

```python
ctx         = option("ctx")
environment = ctx.environment
config      = ctx.config

[
    {
        apiVersion = "example.yourproject.io/v1alpha1"
        kind       = "CloudAccount"
        metadata   = {
            name      = "${environment.metadata.name}-${ref.name}"
            namespace = environment.metadata.namespace
        }
        spec = {
            provider   = ref.name
            emailDomain = config.emailDomain
        }
    }
    for ref in environment.spec.providerRefs or []
]
```

## Status Expressions

The `status.fields[].expr` field in `blueprint.yaml` is a KCL expression evaluated after each reconciliation. It reads the live state of the resources your blueprint applied and writes derived values to the Platform's `.status`.

The `childResources` variable is a dict keyed by `"<apiVersion>/<kind>"` (e.g. `"apps/v1/Deployment"`). Each value is a list of live Kubernetes objects.

See the [Status Expressions reference](/docs/spec/groups/design.platformspec.io#status-expressions-expr) for detailed examples.

Key rules:
- All lines except the last are intermediate KCL assignments.
- The last line is the return value — it must match the declared `type`.
- Use `?.` (safe-navigation) everywhere — `.status` fields may be absent on the first reconciliation pass.
- Expression errors log a warning and set the field to `null`. They do not block the Platform from reaching `Ready`.

## Development Workflow

### 1. Install KCL locally

```bash
# macOS
brew install kcl-lang/tap/kcl

# or via pip
pip install kcl-lang
```

### 2. Iterate on `main.k` locally

Run KCL directly to validate your output before deploying:

```bash
kcl main.k -D ctx='{"platform":{"metadata":{"name":"test"},"spec":{}},"environment":{"metadata":{"name":"dev"},"spec":{}},"config":{"replicas":1}}'
```

### 3. Use the filesystem registry for development

Point a `BlueprintRegistry` at your local directory:

```yaml
apiVersion: core.platformspec.io/v1alpha1
kind: BlueprintRegistry
metadata:
  name: local-dev
  namespace: platspec-system
spec:
  type: filesystem
  path: /path/to/your/blueprints
```

::: tip Filesystem registries bypass the cache
`type: filesystem` registries always fetch live — the operator never caches them. This means your changes are picked up on every reconciliation without needing to bump the version. Switch to `oci` or another remote type before publishing.
:::

### 4. Trigger a reconciliation

Force the operator to re-reconcile by touching your `BlueprintBinding`:

```bash
kubectl -n platspec-system annotate blueprintbinding my-platform-bindings \
  platspec.io/reconcile-trigger="$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  --overwrite
```

### 5. Inspect generated resources

```bash
# See what resources were applied
kubectl -n platspec-system get blueprintbinding my-platform-bindings \
  -o jsonpath='{.metadata.annotations.platspec\.io/generated-resources}' | jq .

# Tail operator logs
kubectl -n platspec-system logs -l app.kubernetes.io/name=platspec-operator -f
```

## Publishing a Blueprint

### OCI registry (recommended)

Package your blueprint directory as an OCI artifact:

```bash
kcl registry push oci://ghcr.io/your-org/blueprints/my-blueprint:0.1.0 ./my-blueprint/
```

Then declare a `BlueprintRegistry` pointing at your OCI registry and reference the blueprint by name and version from `BlueprintBinding`.

### Git registry

Publish via a Git repository. The operator clones the repo and resolves blueprints by path:

```yaml
spec:
  type: git
  url: https://github.com/your-org/blueprints.git
  ref: main
```

## Best Practices

- **Declare all required context keys** in `inputs.context.required`. If a key is absent at runtime the execution fails with a clear error rather than a silent wrong value.
- **Provide defaults for all config fields.** Blueprints should work with minimal configuration so that bindings only need to override what differs.
- **Use safe-navigation everywhere in status expressions.** Resources may not have `.status` populated on the first reconciliation pass.
- **Pin versions in production.** Use `version: latest` only during development. Pinned versions are cached and deterministic.
- **Keep blueprints single-capability.** One blueprint, one capability. Compose at the `BlueprintBinding` level, not inside a blueprint.
- **Label generated resources consistently.** Follow the operator's label conventions so resources can be discovered and cleaned up correctly.
