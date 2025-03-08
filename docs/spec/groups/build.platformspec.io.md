---
outline: deep
---

# API Group: build.platformspec.io
The `build.platformspec.io` API Group focuses on bringing a designed platform to life by defining infrastructure and core components that must be provisioned.  It translates architectural blueprints into deployable and configurable resources, ensuring that infrastructure is created consistently and predictably.

By providing a structured way to define what must be built, `build.platformspec.io` enables platform teams to provision resources efficiently, reduce manual effort, and improve automation.  This group ensures that platform creation follows a standardized, declarative approach, making it easier to deploy, manage, and scale infrastructure across environments.

## Overview
| Kind | Description |
| --- | --- |
| [Cluster](#cluster) | Represents a cluster of nodes that form the foundation of a platform. |
| [Node](#node) | Represents a single compute instance within a cluster. |
| [NodePool](#nodepool) | Defines a group of nodes with similar configurations and properties. |
| [Network](#network) | Defines networks for a platform. |
| [Tunnel](#tunnel) | Specifies network tunnels between nodes or clusters. |
| [Image](#image) | Describes a machine image used to create nodes. |
| [SoftwareGroup](#softwaregroup) | Groups software components that must be installed on nodes. |

## Definitions
