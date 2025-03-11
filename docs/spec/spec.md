---
outline: deep
---

# The Specification
## Introduction
The Platform Specification defines a structured, declarative framework for describing and managing cloud-native platforms. It is designed to standardize how platforms are represented, making it easier for teams to define, build, and operate consistent, scalable, and secure platforms across diverse environments. By capturing the essential components, configurations, and policies of a platform in a clear and organized format, the specification serves as the foundation for both human and automated processes in platform engineering.

The specification uses a YAML structure modeled on Kubernetes Custom Resource Definitions (CRDs), ensuring compatibility with cloud-native ecosystems. Each instance of the specification includes well-defined fields and sections that describe the platform's infrastructure, services, policies, and operational guidelines. This approach allows platform teams to capture the desired state of their platform while maintaining flexibility in implementation and tooling.

**Current version of the Specification is `v1alpha1`.**

> [!NOTE]
> While the Platform Specification is modeled on Kubernetes Custom Resource Definitions (CRDs) to leverage a familiar, structured, and extensible format, it is not tied to Kubernetes clusters or their runtime environments. The specification is simply a declarative framework written in YAML or JSON, intended to be stored in files and parsed by any program or tool that supports these formats. There is no requirement to leverage or install the objects into a Kubernetes cluster. Instead, the specification serves as a standalone document that can be used to define platform requirements, generate configurations, or drive orchestration workflows across any infrastructure or tooling ecosystem. This decoupled design ensures maximum flexibility and accessibility for diverse use cases and environments.

> [!WARNING]
> The specification is still a work in process and is being actively designed.
>
> Expect active/frequent changes.
>
> Modifications to the spec will be highlighted on the [news](../../news) page accordingly.


## API Groups
Platforms... platforms..... platforms are, for lack of a better word, "big" in scope and definition.  Because of this, the Platform Specification breaks down the capture of a Platform in a specification form, by defining a structured approach for use in designing, building, and operating cloud platforms.  Given the **complexity** and **breadth** of modern cloud platforms, a single monolithic API would be difficult to manage, extend, and navigate.

To simplify the specification while maintaining **scalability** and **clarity**, we have organized it into distinct API Groups—each focused on a specific aspect of platform engineering.

This structured approach allows **organizations, developers, and operators** to work with _only the parts of the specification relevant to them_, improving usability and making the specification more modular and adaptable.

## Group Structure
Each API Group in the Platform Specification is designed with a **clear purpose and responsibility boundary**, ensuring that all aspects of a cloud platform are well-defined and manageable.

| *API Group*  |  *Purpose*  |
| --- | --- |
| [`core.platformspec.io`](./groups/core.platformspec.io)          | Defines fundamental constructs shared across all API Groups.  |
| [`design.platformspec.io`](./groups/design.platformspec.io)      | Specifies platform architecture, topologies, and blueprints.  |
| [`build.platformspec.io`](./groups/build.platformspec.io)        | Defines infrastructure and components that must be deployed.  |
| [`operate.platformspec.io`](./groups/operate.platformspec.io)    | Manages the lifecycle, upgrades, scaling, and observability of the platform.  |
| [`workload.platformspec.io`](./groups/workload.platformspec.io)  | Captures developer-facing aspects, related to workloads, such as APIs, services, CI/CD pipelines, and integrations.  |
| [`secure.platformspec.io`](./groups/secure.platformspec.io)      | Focuses on security, compliance, access control, and policy enforcement.  |
| [`govern.platformspec.io`](./groups/govern.platformspec.io)      | Defines team structures, and governance policies.  |
| [`sdk.platformspec.io`](./groups/sdk.platformspec.io)            | Provides APIs, SDKs, and tooling for interacting with the specification programmatically.  |

Please refer to the individual API Group pages for detailed information on the resources and fields they define.

## Specification Status Levels
The Platform Specification is an evolving standard, and new `Kinds` are continually being defined, refined, and validated.  To ensure transparency and help users understand the current maturity of each `Kind`, we use status levels to indicate the development progress of each resource.

Each `Kind` in the Platform Specification is assigned a status level that reflects whether it has been fully specified, is still in progress, or is planned for future inclusion.  This allows users to quickly assess the upcoming definitions of what is to be captured in the specification.

This is all applicable to the `v1alpha1` version of the Platform Specification.

| *Status* | *Meaning* | *Implication* |
| --- | --- | --- |
| ✅&nbsp;Defined | The Kind has a formal specification, including a schema, example, and documentation. | Ready for official use as per the guidelines of the API Group version. Fully documented. |
| 🚧&nbsp;In&nbsp;Progress | The Kind is partially defined but is still being revised or refined. | May have an initial schema, but details are subject to change. Feedback is encouraged. |
| 📝&nbsp;Planned | The Kind has been identified as necessary, but no formal definition exists yet. | Not available yet, but coming soon. |
| ❓&nbsp;Needs&nbsp;Review | A draft specification exists, but it requires validation by the community or domain experts. | May be experimental or subject to significant modifications. |
| ❌&nbsp;Deprecated | The Kind was previously part of the specification but has been removed or replaced. | Not recommended for use. Likely be phased out in future versions. |
