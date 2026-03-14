---
outline: deep
---

# API Group: design.platformspec.io
The `design.platformspec.io` API Group captures the architectural intent and high-level structure of a platform.  It enables platform teams to codify platform blueprints, define core structures, and establish best practices before infrastructure is provisioned.

This group ensures that platforms are designed with scalability, resilience, and security in mind by providing a declarative approach to planning infrastructure, networking, and service topologies.  By standardizing platform design at the outset, `design.platformspec.io` helps organizations build consistent, repeatable, and future-proof platforms.

## Kinds
| Kind | Description | Status |
| --- | --- | --- |
| [Blueprint](#blueprint) | Represents a high-level design document that outlines the architecture of a platform. | 🚧&nbsp;In&nbsp;Progress |
| [ResourceTemplate](#resourcetemplate) | Provides reusable templates for defining platform resources in a structured and repeatable manner. | 📝&nbsp;Planned |

## Definitions

### Blueprint

A `Blueprint` describes the interface and behavior of a blueprint package — a versioned, self-contained unit of infrastructure automation. Blueprint packages are primarily consumed by the Platspec Operator when it executes a `BlueprintBinding`; the canonical location for a blueprint's manifest is **a `blueprint.yaml` file inside the blueprint package directory** (alongside the KCL logic in `main.k`). Future versions of the specification may also support loading Blueprint manifests as Kubernetes resources.

#### Manifest Format

Blueprint manifests use `apiVersion: blueprints.platsmith.io/v1alpha1` and `kind: Blueprint`.

```yaml
apiVersion: blueprints.platsmith.io/v1alpha1
kind: Blueprint

metadata:
  name: my-blueprint
  capability: my-capability        # The platform capability this blueprint fulfills
  version: 1.0.0
  description: >
    Human-readable description of what this blueprint provisions.
  author: Your Name
  maintainer: team@example.com
  providers:                       # Cloud providers this blueprint targets (empty = provider-agnostic)
    - aws
  minOperatorVersion: 0.1.0        # Minimum Platspec Operator version required
  tags:
    - production
    - networking

inputs:
  context:
    required:
      - platform                   # Context keys the blueprint requires from the operator
      - environment
    optional:
      - cluster                    # Context keys the blueprint may use if present

  config:
    - field: replicas
      type: int
      default: 1
      description: Number of replicas to provision.

    - field: cidr
      type: string
      default: "10.0.0.0/16"
      description: VPC CIDR block.

outputs:
  generates:
    - apiVersion: apps/v1          # Kubernetes resources this blueprint is expected to produce
      kind: Deployment
      description: Application workload deployment.
    - apiVersion: v1
      kind: Namespace

status:
  target: Platform                 # Resource type whose status this blueprint updates

  fields:
    - field: ready
      type: bool
      description: True when all desired replicas are available.
      expr: |
        deploy  = childResources["apps/v1/Deployment"][0]
        desired = deploy.spec.replicas if deploy?.spec?.replicas else 1
        ready   = deploy.status.readyReplicas if deploy?.status?.readyReplicas else 0
        ready >= desired

    - field: phase
      type: string
      description: Current availability condition reason.
      expr: |
        deploy = childResources["apps/v1/Deployment"][0]
        conds  = deploy.status.conditions if deploy?.status?.conditions else []
        avail  = [c for c in conds if c.type == "Available"]
        avail[0].reason if len(avail) > 0 else "Progressing"
```

#### Key Fields

**`metadata`**

| Field | Description |
| --- | --- |
| `name` | Unique name for the blueprint. Used as a reference key in registries and logs. |
| `capability` | The platform capability this blueprint fulfills (e.g. `networking`, `observability`). Must match the capability listed in `BlueprintBinding.spec.blueprintMappings`. |
| `version` | SemVer version string (e.g. `1.2.0`). Used for cache keying and upgrade tracking. |
| `description` | Human-readable description. |
| `author` | Author name or team. |
| `maintainer` | Contact email for the blueprint maintainer. |
| `providers` | List of cloud provider identifiers this blueprint targets. Empty list means provider-agnostic. |
| `minOperatorVersion` | Minimum Platspec Operator version required to execute this blueprint. |
| `tags` | Arbitrary string tags for cataloging and filtering. |

**`inputs`**

| Field | Description |
| --- | --- |
| `context.required` | Context keys that must be present in the operator-assembled runtime context. If missing, execution fails. Common keys: `platform`, `environment`, `cluster`, `provider`. |
| `context.optional` | Context keys the blueprint uses if present but does not require. |
| `config[]` | Declarative schema for blueprint-specific configuration parameters. Each entry has `field` (name), `type` (`string`, `int`, `bool`, `list`, `object`), `default` (optional), and `description`. Values are sourced from `BlueprintBinding.spec.blueprintMappings[].blueprint.config` and `Platform.spec.overrides`. |

**`outputs`**

| Field | Description |
| --- | --- |
| `generates[]` | Declares the Kubernetes resource kinds this blueprint is expected to produce. Each entry has `apiVersion`, `kind`, and an optional `description`. Used for documentation and future validation. |

**`status`**

| Field | Description |
| --- | --- |
| `target` | The resource type whose `.status` is updated based on this blueprint's output. Currently `Platform`. |
| `fields[]` | List of status fields to compute. Each has `field` (name on the target), `type`, `description`, and `expr` — a KCL expression evaluated against `childResources`. |

#### Status Expressions (`expr`)

The `expr` field is a [KCL](https://kcl-lang.io) expression evaluated by the operator after each reconciliation. KCL is the same language used in `main.k` for resource generation, so blueprint authors work in a single consistent language throughout. The expression reads the live state of the Kubernetes resources produced by the blueprint and returns a single typed value that is written to the target resource's status.

**Available variables:**

| Variable | Type | Description |
| --- | --- | --- |
| `childResources` | `dict[str, list[object]]` | All resources applied by this blueprint in the last reconciliation, keyed by `"<apiVersion>/<kind>"`. Each value is a list of live Kubernetes objects (as attribute-accessible dicts). |

**Key conventions:**

- Keys in `childResources` are formatted as `"<apiVersion>/<kind>"` — e.g. `"apps/v1/Deployment"`, `"v1/Namespace"`, `"v1/Service"`.
- For core API resources with no group (e.g. `Namespace`, `Service`, `ConfigMap`), the key is `"v1/<Kind>"`.
- Each value is a list even if only one resource of that kind exists. Always index with `[0]` when expecting a single resource.
- Use KCL's safe-navigation operator (`?.`) to guard against missing fields — the resource's `.status` may not be populated yet on first reconciliation.
- The expression must evaluate to the declared `type` (`bool`, `string`, `int`). Mismatches cause the field to be omitted from status.

**Examples:**

*Boolean: is a Deployment fully ready?*
```yaml
- field: ready
  type: bool
  expr: |
    deploy  = childResources["apps/v1/Deployment"][0]
    desired = deploy.spec.replicas if deploy?.spec?.replicas else 1
    ready   = deploy.status.readyReplicas if deploy?.status?.readyReplicas else 0
    ready >= desired
```

*String: surface a condition reason from a Deployment:*
```yaml
- field: phase
  type: string
  expr: |
    deploy = childResources["apps/v1/Deployment"][0]
    conds  = deploy.status.conditions if deploy?.status?.conditions else []
    avail  = [c for c in conds if c.type == "Available"]
    avail[0].reason if len(avail) > 0 else "Progressing"
```

*String: extract a field from a generated resource (e.g. provisioned namespace name):*
```yaml
- field: namespace
  type: string
  expr: |
    ns = childResources["v1/Namespace"][0]
    ns.metadata.name
```

*Integer: count ready replicas:*
```yaml
- field: readyReplicas
  type: int
  expr: |
    deploy = childResources["apps/v1/Deployment"][0]
    deploy.status.readyReplicas if deploy?.status?.readyReplicas else 0
```

*String: surface a stall/failure reason (empty string when healthy):*
```yaml
- field: failureReason
  type: string
  expr: |
    deploy = childResources["apps/v1/Deployment"][0]
    conds  = deploy.status.conditions if deploy?.status?.conditions else []
    stall  = [c for c in conds if c.type == "Progressing" and c.status == "False"]
    stall[0].reason if len(stall) > 0 else ""
```

*Boolean: check that a LoadBalancer Service has been assigned an ingress IP:*
```yaml
- field: ingressReady
  type: bool
  expr: |
    svc     = childResources["v1/Service"][0]
    ingress = svc.status.loadBalancer.ingress if svc?.status?.loadBalancer?.ingress else []
    len(ingress) > 0
```

*String: retrieve the assigned LoadBalancer hostname or IP:*
```yaml
- field: ingressHostname
  type: string
  expr: |
    svc     = childResources["v1/Service"][0]
    ingress = svc.status.loadBalancer.ingress if svc?.status?.loadBalancer?.ingress else []
    ingress[0].hostname if len(ingress) > 0 and ingress[0]?.hostname else \
    ingress[0].ip if len(ingress) > 0 and ingress[0]?.ip else ""
```

#### Package Structure

A blueprint package is a directory containing at minimum a `main.k` KCL file. The `blueprint.yaml` manifest is optional but strongly recommended. The operator locates blueprints via `BlueprintRegistry` and `BlueprintBinding` references.

```
my-blueprint/
├── blueprint.yaml    # This manifest (optional but recommended)
└── main.k            # KCL logic — receives inputs, produces Kubernetes manifests
```

