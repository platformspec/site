---
outline: deep
---

# API Group: workload.platformspec.io
The `workload.platformspec.io` API Group defines the **core platform services that support workloads**, ensuring developers and applications can efficiently interact with and leverage the platform's capabilities.  This group **does not define workloads themselves**, but rather encompasses the infrastructure, services, and integrations provided by the platform to enable workloads to run effectively.

The primary focus of `workload.platformspec.io` is developer enablement, offering platform-native capabilities such as APIs, service meshes, artifact storage, message queues, CI/CD pipelines, and authentication systems.  These services are not application-specific, but rather form the essential building blocks that workloads depend on—providing seamless integrations, runtime support, and operational automation.

By defining these core services as part of the Platform Specification, workloads.platformspec.io ensures that platform teams can establish standardized, reusable, and scalable systems for managing workloads, securing applications, and enabling continuous delivery workflows.  This API Group provides the essential abstractions required to deliver a modern, developer-friendly cloud platform, empowering teams to build and deploy software without reinventing common platform capabilities.

## Overview
| Kind | Description |
| --- | --- |
| [APIGateway](#apigateway) | Defines API gateway configurations, routing, and authentication. |
| [ServiceMesh](#servicemesh) | Represents service mesh configurations (e.g., Istio, Linkerd). |
| [ArtifactStore](#artifactstore) | Specifies artifact storage for container images, packages, and binaries (e.g., Harbor, JFrog Artifactory). |
| [MessageBus](#messagebus) | Defines messaging and event streaming platforms (e.g., Kafka, NATS, Pulsar). |
| [ObjectStore](#objectstore) | Represents object storage services (e.g., S3, MinIO, GCS Buckets). |
| [DatabaseService](#databaseservice) | Defines managed database offerings for workloads to consume. |
| [QueueService](#queueservice) | Defines managed queueing systems (e.g., SQS, Pub/Sub, RabbitMQ, Celery). |
| [FunctionService](#functionservice) | Represents serverless computing capabilities (e.g., AWS Lambda, OpenFaaS). |
| [IngressRule](#ingressrule) | Specifies routing and access control for services running on the platform. |
| [IdentityProvider](#identityprovider) | Defines authentication and identity management services (OIDC, SAML, LDAP). |
| [PlatformPortal](#platformportal) | Defines developer portals and self-service tools for platform interaction. |
| [TelemetryPipeline](#telemetrypipeline) | Defines logging, monitoring, and tracing pipelines (e.g., OpenTelemetry). |
| [FeatureFlagService](#featureflagservice) | Represents platform-wide feature flagging for controlled rollouts. |
| [CICDPipeline](#cicdpipeline) | Defines CI/CD automation pipelines provided as a platform service. |
| [BuildService](#buildservice) | Represents an internal build system for applications, such as for containers. |
| [DeploymentController](#deploymentcontroller) | Manages rollout strategies (e.g., blue/green, canary, progressive delivery). |
| [CodeRepository](#coderepository) | Defines version control services integrated into the platform (e.g., GitHub, GitLab, Bitbucket). |
| [SecretsManager](#secretsmanager) | Securely manages application secrets required for workloads. |
| [ConfigStore](#configstore) | Provides centralized configuration management for workloads (e.g., Consul, ConfigMaps, Parameter Store). |
| [WorkflowEngine](#workflowengine) | Defines workflow orchestration services (e.g., Argo Workflows). |


## Definitions
