# Overview

## Introduction

The Platform Specification is a standardized, community-driven framework designed to simplify and unify the process of defining, building, and managing cloud-native platforms. It addresses inefficiencies and challenges commonly encountered in platform management by providing a clear, structured approach for specifying cloud-native platforms across diverse environments and infrastructures. This specification ensures consistency, repeatability, and transparency for platform engineering teams and organizations working in cloud-native ecosystems.

## Purpose

The purpose of this Platform Specification is to establish a common language and structure for defining cloud-native platforms. It ensures that all components—whether they relate to infrastructure, services, policies, or developer enablement—are consistently and comprehensively described. This helps platform engineers and organizations to deploy, maintain, and scale their platforms in a unified and efficient way, reducing errors and speeding up deployment cycles.

The specification also fosters collaboration between teams by providing a shared understanding of platform requirements and configurations. By using a community-driven approach, the specification evolves with industry trends and innovations, ensuring that platforms are built on modern, best-practice foundations.

## Conventions

The Platform Specification follows several key conventions to ensure clarity, consistency, and ease of use across all environments:

- **Declarative Approach**: All components and configurations are described declaratively, allowing for clear intent and ease of version control.
- **YAML and JSON Formats**: The specification uses YAML or JSON for all files to ensure readability, ease of use, and support for hierarchical data structures.
- **Kubernetes API CRD Convention**: The specification encapsulates all structure and configuration into Kubernetes-style API resource types (kinds).
- **Modular Design**: The specification encourages modularity, enabling reusable definitions for common platform components and configurations.
- **Extensibility**: While the core specification is designed to be comprehensive, it is also flexible, allowing for extensions to accommodate specific requirements and customizations.
- **Cloud and Provider Agnostic**: While specific cloud provider features can be defined, the specification remains cloud-agnostic at its core, ensuring it can be applied to any infrastructure, whether on-premises, hybrid, or multi-cloud.

## Layout

The Platform Specification is organized into several sections, each representing a distinct aspect (the [six key domains](./key-domains)) of a platform. These sections provide a structured way to capture all necessary details for platform creation and management:

- **Infrastructure**: Captures details related to cloud providers, environments, and credentials required to set up and manage the underlying platform infrastructure.
- **Compute, Networks, and Services**: Describes the platform’s compute, networking components, clusters, and related managed services.
- **Policies**: Defines cost management, logging, scaling, and other operational policies critical to the platform's functionality and governance.
- **Security & Compliance**: Ensures security configurations, including access control, identity management, and compliance-related requirements, are well-defined.
- **Developer Enablement**: Encompasses services that accelerate developer productivity, such as application APIs, serverless services, and more.
- **Monitoring & Insights**: Provides tools and configurations for monitoring, alerting, and performance tuning.

Each section is designed to be self-contained yet interoperable, allowing teams to mix and match configurations based on their specific requirements.

## Versions

The Platform Specification follows a versioning strategy inspired by Kubernetes, designed to manage the evolution of APIs and ensure a balance between stability and flexibility. This strategy supports backward compatibility where possible while allowing for the introduction of new features and changes over time.

- **Versioning Format**: The versioning format follows the structure used in Kubernetes: `<major><stage><minor>`. Here's a breakdown of the versioning components:

  - `major`: This indicates the major version of the API. Changes to the major version may introduce breaking changes or significant rearchitecting.
  - `stage`: This represents the stability stage of the version, such as `alpha`, `beta`, or `stable`.
  - `minor`: This indicates the revision within a particular stage.

- **Stages**:
  - **Alpha**: `v1alpha1` and similar versions indicate that the API or specification is in an experimental phase. Alpha releases are likely to change, and breaking changes may occur between alpha releases. These versions are not intended for production use.
  - **Beta**: `v1beta1` versions are more stable but still in development. Breaking changes are less frequent than in the alpha stage, but they can still happen. However, beta versions are generally used for wider testing and feedback, as they are closer to the final form.
  - **Stable (General Availability)**: Once the API is stable and finalized, the version moves to `v1` (or another major version if applicable). At this stage, breaking changes are avoided, and backward compatibility is maintained as much as possible. These versions are considered ready for production use.

- **Deprecation Policy**: Like Kubernetes, deprecated versions (such as `v1beta1` when moving to `v1`) will still be supported for a defined period, ensuring a smooth transition path. Deprecation warnings will be provided for at least one major release cycle before the deprecated version is officially removed.

- **Version Lifecycle**:
  - Alpha releases are short-lived, with frequent changes and updates.
  - Beta releases are expected to have a longer lifecycle, often lasting for multiple minor revisions to gather community feedback and stabilize.
  - Stable releases will aim to maintain long-term support and backward compatibility, with any breaking changes reserved for major version increments (e.g., from `v1` to `v2`).

- **Initial Version**: The Platform Specification is beginning with `v1alpha1`, indicating an early development phase. During this phase, feedback is actively encouraged, and frequent updates can be expected. As the specification matures, it will progress through `beta` and eventually reach `v1`, where stability is guaranteed.

This versioning strategy ensures that users can adopt the specification confidently at different stages of its maturity while providing clarity on stability and potential changes.

## Formats

The Platform Specification is defined using YAML or JSON, employing a structure inspired by the Kubernetes API Custom Resource Definition (CRD) model. This approach ensures consistency, extensibility, and compatibility with cloud-native ecosystems. Each specification instance is declarative, organized into well-defined fields and hierarchical sections, enabling users to comprehensively describe their platform's components, configurations, and policies. The schema follows a versioned format (e.g., `v1alpha1`), allowing iterative improvements and backward compatibility. The formatting principles adhere to those of Kubernetes CRDs, including fields such as `apiVersion`, `kind`, `metadata`, and `spec`, with `spec` containing the primary configuration details. These principles promote a clear separation of concerns, with `metadata` capturing object identity and labels, and `spec` focusing on desired state and configurations. By leveraging this structured approach, the Platform Specification benefits from familiar conventions, seamless integration with existing tools, and a strong foundation for validating and orchestrating platform definitions across diverse environments.

::: tip JSON or YAML
The Platform Specification, as with all Kubernetes API CRD resources, can be transformed into JSON as YAML and JSON are interchangable; however one loses the ability to provide in-line comments and documentation.
:::

The use of these formats ensures that platforms are easy to define, extend, and automate, with clear human-readable descriptions that are machine-friendly for programmatic management.

