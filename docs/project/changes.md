---
outline: deep
---

# Changes

A record of significant changes to The Platform Specification itself (and not associated code bases, such as the operator or blueprints or helm charts).

---

## March 14th, 2026

### `core.platformspec.io` — BlueprintBinding added

`BlueprintBinding` is now a fully defined kind in the `core.platformspec.io` API group. It is the primary mechanism for associating blueprint packages with a Platform and controlling which capabilities are provisioned in which environments.

Key fields: `platformRef`, `blueprintMappings` (capability → blueprint assignments), `selectors` (environmentSelector / clusterSelector / locationSelector), `precedence`, `deletionPolicy`.

### `core.platformspec.io` — BlueprintRegistry added

`BlueprintRegistry` is now a fully defined kind in the `core.platformspec.io` API group. It declares an external source from which the Platspec Operator fetches blueprint packages. Supported backend types: `oci`, `git`, `http`, `s3`, `filesystem`.

### `core.platformspec.io` — Platform spec updated

- **`spec.resources` removed.** Resource association is now done entirely via label-based discovery (`spec.resourceSelector.matchLabels`) rather than explicit name lists. Resources must carry the label `platform.platformspec.io/name: <platform-name>` to be discoverable by the operator.
- **`spec.resourceSelector`** added — label selector for discovering associated Environments, Providers, Clusters, etc.
- **`spec.requirements.capabilities`** added — list of capability names the Platform requires. Replaces the former `spec.capabilities` top-level field; capabilities are now nested under `requirements` alongside `general` and `resources` constraints.
- **`spec.requirements.general.cloudProvider`** added — declares the expected cloud provider.
- **`spec.deletionPolicy`** added — `Delete` (default) or `Orphan`; controls whether generated resources are removed when the Platform is deleted.
- **`spec.overrides`** added — free-form key-value configuration merged into every blueprint's runtime context.
- **Platform `.status`** documented — `phase` (Progressing / Ready / Failed), `conditions` (type=Ready with reasons: `AllBindingsReady`, `BindingsFailed`, `BindingsProgressing`, `NoBlueprintsConfigured`), and `capabilities` (per-capability result map).

### `core.platformspec.io` — Resource Discovery section added

New section documenting the label-based discovery protocol. All infra resources (Environments, Providers, Clusters, etc.) must carry `platform.platformspec.io/name: <platform-name>` to be associated with a Platform by the operator.

### `core.platformspec.io` — Labels and Annotations section added

New section documenting the labels the Platspec Operator applies to every generated resource (`platspec.io/platform`, `platspec.io/managed-by`, `platspec.io/binding`, `platspec.io/capability`) and the annotations it writes to `BlueprintBinding` (`platspec.io/generated-resources`, `platspec.io/reconcile-trigger`).

### `core.platformspec.io` — Credential sources table updated

Source names aligned with the values the operator's CRD validation actually accepts:

| Old name | Correct name |
| --- | --- |
| `environment` | `env` |
| `kubernetes-configmap` | `configmap` |
| `aws-secrets` | `aws-secrets-manager` |

### `design.platformspec.io` — BlueprintSubscription removed

`BlueprintSubscription` has been removed. The concept it described is superseded by `BlueprintBinding` in `core.platformspec.io`.
