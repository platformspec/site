---
outline: deep
---

# API Group: operate.platformspec.io
The `operate.platformspec.io` API Group defines how a running platform is managed, maintained, and optimized over time.  It focuses on the ongoing lifecycle of infrastructure and services, ensuring that platforms remain stable, performant, and adaptable to business needs.

By standardizing scaling, upgrades, monitoring, and resilience strategies, `operate.platformspec.io` allows platform teams to reduce operational overhead, enforce best practices, and proactively manage system health.  This group ensures that platforms are not just deployed, but also effectively operated and continuously improved.

This is very much focused on defining parameters for how a Platform should behave once it is up and running.  It aims to make sure that the platform is running as expected, and that it can be maintained and upgraded in a predictable and reliable way.  And of course, to make the life easier of the people who are responsible for keeping the platform running.

## Overview
| Kind | Description |
| --- | --- |
| [DeploymentPolicy](#deploymentpolicy) | Defines rules for rolling updates, blue-green deployments. |
| [ScalingPolicy](#scalingpolicy) | Specifies autoscaling rules for compute resources, clusters. |
| [BackupPolicy](#backuppolicy) | Defines backup and disaster recovery strategies. |
| [HealthCheck](#healthcheck) | Defines health probes and service availability checks. |
| [AlertingRule](#alertingrule) | Specifies alerting triggers, severity levels, and escalation policies. |
| [MaintenanceWindow](#maintenancewindow) | Defines scheduled maintenance times for clusters, services. |
| [ObservabilityConfig](#observabilityconfig) | Centralized logging, metrics, and tracing configuration. |
| [UpgradeStrategy](#upgradestrategy) | Defines how upgrades are rolled out for different components. |

## Definitions
