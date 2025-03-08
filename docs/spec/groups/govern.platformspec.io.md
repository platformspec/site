---
outline: deep
---

# API Group: govern.platformspec.io
The `govern.platformspec.io` API Group defines how teams, users, and organizations interact with the platform, establishing the rules, policies, and structures that guide platform usage and access.  It provides a framework for team management, resource allocation, cost visibility, and access control, ensuring that the platform operates efficiently, securely, and within organizational boundaries.

By enforcing governance policies and operational constraints, `govern.platformspec.io` enables organizations to manage platform users, roles, and permissions at scale.  This ensures that platform ownership, responsibility, and resource consumption are well-defined, transparent, and aligned with business objectives.

## Overview
| Kind | Description |
| --- | --- |
| [Team](#team) | Captures a group or business unit within the platform. |
| [Project](#project) | Represents a scoped area of responsibility within the platform, such as a product, application, or initiative. |
| [Role](#role) | Specifies platform roles (e.g., admin, operator, developer) and the associated permissions. |
| [QuotaPolicy](#quotapolicy) | Defines resource consumption limits (e.g., compute, storage, network usage) for teams or projects. |
| [AccessPolicy](#accesspolicy) | Specifies fine-grained access control rules for platform resources, integrating with RBAC and IAM policies. |
| [CostAllocation](#costallocation) | Captures cost distribution rules for teams, projects, or workloads, enabling chargeback and showback models. |
| [BillingPolicy](#billingpolicy) | Defines billing rules, subscription models, and cost tracking mechanisms within the platform. |
| [SupportTier](#supporttier) | Specifies support levels (e.g., standard, premium, enterprise) for teams and projects, including SLA expectations. |
| [ApprovalWorkflow](#approvalworkflow) | Defines structured approval processes for changes, deployments, or access requests. |
| [GovernancePolicy](#governancepolicy) | Captures high-level governance rules that ensure platform-wide operational compliance and consistency. |
| [ResourceOwnership](#resourceownership) | Specifies ownership models for platform components, including responsibility and escalation paths. |
| [AuditLog](#auditlog) | Provides structured records of user actions, changes, and policy enforcement for compliance and governance. |
| [EscalationPolicy](#escalationpolicy) | Defines structured rules for handling incidents, failures, and unresolved support requests. |

## Definitions
