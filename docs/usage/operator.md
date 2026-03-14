---
outline: deep
---

# Platspec Operator

The **Platspec Operator** is the open-source Kubernetes operator that implements the Platform Specification processing layer. It watches Platform Specification resources (`Platform`, `BlueprintBinding`, `Environment`, `Provider`, `Credential`, etc.), resolves blueprint assignments, executes [KCL](https://kcl-lang.io) blueprints, applies the resulting Kubernetes manifests to your cluster, and aggregates status back up to the `Platform` resource.

The operator is the bridge between your declarative platform definition and the infrastructure that realizes it.

## Prerequisites

- Kubernetes cluster (v1.26+) with `kubectl` configured
- [Helm](https://helm.sh) v3.10+
- Cluster-admin permissions (for CRD installation)

## Installing via Helm

The Platspec Operator is distributed as a Helm chart that installs both the CRDs and the operator deployment in a single step.

### 1. Add the Helm repository

```bash
helm repo add platspec https://charts.platformspec.io
helm repo update
```

### 2. Install the operator

Install into the `platsmith-system` namespace (recommended):

```bash
helm install platspec-operator platspec/platspec-operator \
  --namespace platsmith-system \
  --create-namespace
```

This installs:
- All Platform Specification CRDs (`platforms.core.platformspec.io`, `blueprintbindings.core.platformspec.io`, `environments.core.platformspec.io`, etc.)
- The operator `Deployment`, `ServiceAccount`, `ClusterRole`, and `ClusterRoleBinding`
- A `ConfigMap` for operator configuration

Verify the operator is running:

```bash
kubectl -n platsmith-system get pods
kubectl -n platsmith-system logs -l app.kubernetes.io/name=platspec-operator
```

### 3. Install CRDs only (optional)

If you want to manage the operator deployment separately from CRD installation:

```bash
helm install platspec-crds platspec/platspec-operator \
  --namespace platsmith-system \
  --create-namespace \
  --set operator.enabled=false
```

## Configuration

The operator is configured via Helm values. Override values at install time with `--set` or a custom values file.

### Key values

| Value | Default | Description |
| --- | --- | --- |
| `operator.namespace` | `""` (all namespaces) | Kubernetes namespace to watch. Empty = cluster-wide. |
| `operator.logLevel` | `INFO` | Log level: `DEBUG`, `INFO`, `WARNING`, `ERROR`. |
| `operator.logFormat` | `text` | Log output format: `json` (structured) or `text` (human-readable). |
| `operator.devMode` | `false` | Enable colored text logging with full backtraces. Overrides `logFormat`. |
| `operator.dryRun` | `false` | Run without applying any changes to the cluster. |
| `operator.reconcileInterval` | `300` | Seconds between full reconciliation cycles. |
| `operator.maxWorkers` | `4` | Concurrent reconciliation workers. |
| `operator.kclTimeout` | `30` | Seconds before a KCL blueprint execution is killed. |
| `operator.blueprintCacheEnabled` | `true` | Cache blueprint packages fetched from remote registries. |
| `image.repository` | `ghcr.io/foundationio/platspec-operator` | Operator container image. |
| `image.tag` | `0.1.0` | Image tag. |
| `resources.requests.memory` | `128Mi` | Memory request. |
| `resources.limits.memory` | `512Mi` | Memory limit. |

### Example: scoped namespace install with debug logging

```bash
helm install platspec-operator platspec/platspec-operator \
  --namespace platsmith-system \
  --create-namespace \
  --set operator.namespace=platsmith-system \
  --set operator.logLevel=DEBUG
```

### Example: values file

```yaml
# platspec-values.yaml
operator:
  namespace: platsmith-system
  logLevel: INFO
  logFormat: json
  reconcileInterval: 60
  maxWorkers: 8
  blueprintCacheEnabled: true

resources:
  requests:
    cpu: 200m
    memory: 256Mi
  limits:
    cpu: 1000m
    memory: 1Gi
```

```bash
helm install platspec-operator platspec/platspec-operator \
  --namespace platsmith-system \
  --create-namespace \
  --values platspec-values.yaml
```

## Providing Blueprints

The operator executes blueprints from a directory mounted into the operator pod. By default the mount path is `/blueprints`. Blueprints can be provided via a `PersistentVolumeClaim` pre-populated with blueprint packages.

```yaml
# platspec-values.yaml
blueprints:
  mountPath: /blueprints
  persistence:
    enabled: true
    claimName: platspec-blueprints-pvc
```

Alternatively, configure a `BlueprintRegistry` resource to fetch blueprints on demand from OCI registries, Git repositories, HTTP endpoints, or S3 — see [Blueprints: Finding and Using Blueprints](./blueprints).

## Upgrading

```bash
helm repo update
helm upgrade platspec-operator platspec/platspec-operator \
  --namespace platsmith-system \
  --values platspec-values.yaml
```

CRDs are included in the chart and upgraded in-place. Review the [Changes](/docs/project/changes) page before upgrading for any breaking schema changes.

## Uninstalling

```bash
helm uninstall platspec-operator --namespace platsmith-system
```

::: warning CRD deletion
Helm does not delete CRDs on uninstall by default. To remove all Platform Specification CRDs and their associated resources:

```bash
kubectl get crds | grep platformspec.io | awk '{print $1}' | xargs kubectl delete crd
```

This will permanently delete all Platform, BlueprintBinding, Environment, Provider, Credential, and other Platform Specification resources in your cluster.
:::

## Watching Status

Check the status of a Platform after applying resources:

```bash
# Overview
kubectl -n platsmith-system get platforms

# Detailed status
kubectl -n platsmith-system describe platform my-platform

# BlueprintBinding status
kubectl -n platsmith-system get blueprintbindings

# Operator logs (follow)
kubectl -n platsmith-system logs -l app.kubernetes.io/name=platspec-operator -f
```

The Platform `status.phase` progresses through `Progressing` → `Ready` (or `Failed`). The `status.conditions` field carries a `type=Ready` condition with a `reason` of `AllBindingsReady`, `BindingsProgressing`, `BindingsFailed`, or `NoBlueprintsConfigured`.

## Dry-Run Mode

Run the operator in dry-run mode to validate blueprints and preview what would be applied without making any changes:

```bash
helm install platspec-operator platspec/platspec-operator \
  --namespace platsmith-system \
  --create-namespace \
  --set operator.dryRun=true
```

In dry-run mode the operator reconciles fully (resolves bindings, assembles context, executes KCL) but skips the final apply step. All log output is produced normally, so you can inspect what resources would be created.
