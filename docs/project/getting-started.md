# Getting Started with The Platform Specification
The Platform Specification originally started as a solution to working on automation to build fully functional, Kubernetes based platforms that reside in multiple IaaS providers, leverage many external SaaS services, and manage several types of workloads (from ML/AI, to IoT and Fintech and general purpose SaaS).

It was created as a set of standard input values to Helm charts (ie structure around `values.yaml`), who were then responsible for the provisioning and lifecycle management of said platforms.  If you've ever worked with Helm, you know that it's a great tool for templating and managing Kubernetes resources, but it's not a great tool for managing neither the lifecycle of a platform, nor the intricate and custom design requirements.

The Platform Specification was created to fill that gap.

## In a Nutshell: What is the Platform Specification?
The Platform Specification is an open, declarative standard for describing Cloud Native Platforms—those built on Kubernetes and cloud infrastructure.

It allows teams to codify every component of their platform—from infrastructure providers and clusters to policies, developer services, and observability—using a consistent, portable YAML format. The specification is implemented as a set of Kubernetes Custom Resource Definitions (CRDs), supported by tooling to validate, orchestrate, and manage entire platforms declaratively.

However, The Platform Specification is more than just a schema — it’s a complete framework for designing, defining, and driving cloud-native platforms.

The project consists of four core parts:

| Component | Description |
| --- | --- |
| ✏️ **Standardized API Resources (CRDs)** | A well-structured set of Custom Resource Definitions, grouped into logical API domains (e.g. `core.platformspec.io`, `design.platformspec.io`, `secure.platformspec.io`, etc.). These define all the components that make up a modern platform—from clusters and providers to policies, observability, developer services, and more. |
| 🛠️ **SDKs for Real-World Usage** | Official SDKs in Golang, Python, Java, and KCL allow you to work with the spec programmatically. These SDKs include models for all Platform Specification resources, making it easy to generate, validate, or manipulate them in code or automation pipelines. |
| 📜 **Blueprints and** 🏗️ **Builders (Realization Layer)** | Once you define your platform, Blueprints and Builders turn that definition into reality. These are implementation engines that translate Platform Specification resources into actual cloud infrastructure using tools like Terraform, CloudFormation, Crossplane, and others. |
| ⚙️ **Platform Operators (Runtime Automation)** | The [Platspec Operator](/docs/usage/operator) is an open-source Kubernetes operator that bridges the gap between your platform definitions and their realization. It manages lifecycles, dependencies, reconciliation, and binding between Platform Specification resources and their corresponding Blueprints. Early preview now available. |

## Why Does This Matter?

See the [Preface](/docs/project/preface) for a more detailed explanation.

## Who Is It For?

- **Platform Engineering Teams:**  Defining and operating internal platforms and infrastructure with consistency and clarity.
- **SREs and DevOps Engineers:**  Ensuring repeatability, automation, and reliability across clusters and environments.
- **Cloud Architects:**  Designing scalable, multi-region, and multi-cloud systems with a structured representation.
- **Tool Builders and Integrators:**  Creating automation and visualization tools with a standard API for interacting with platform resources.
- **Executives & Technical Leadership:**  Seeking transparency and standardization across teams and initiatives through a shared language and structure.
- **Security Architects:**  Codifying security, compliance, and governance policies directly into platform definitions.
- **Developers & Workload Operators:**  Understanding and accessing platform capabilities through a well-defined service contract.

## How do I use it?

::: warning Early Preview
The Platform Specification and the Platspec Operator are in early preview. The core operator pipeline works end-to-end, but not all capabilities are complete and things may change.

Follow the [News](/news) page for updates, and see the [Roadmap](/docs/project/roadmap) for what's coming next.
:::

### 1. Install the CRDs
Install the Platform Specification CRDs into your Kubernetes Cluster

See the [GitHub Project](https://github.com/platformspec) for the latest releases and installation instructions.

::: tip
The Platform Specification CRDs are included with the [Platspec Operator](/docs/usage/operator). Install the operator via Helm and the CRDs are installed automatically.
:::

### 2. Define your Platform
Create a YAML structured file (e.g. `platform.yaml`) describing infrastructure, services, and policies.

::: warning Work in Progress
This is currently a manual process. Reference examples are available in the [platspec-operator repository](https://github.com/platformspec/platspec-operator/tree/main/examples). A visual designer and additional tooling are on the roadmap.
:::

### 3. Select your Operator
Install and configure your Platform Specification operator to manage your platform.

::: tip
The [Platspec Operator](/docs/usage/operator) (Python-based) is available in early preview. See the operator documentation for installation and configuration details.
:::

### 4. Realize your Platform
Use Blueprints and their leveraged/dependent  Builders to turn your platform definition into real cloud infrastructure.

::: warning Work in Progress
The Platspec Operator ships with a small set of [bundled blueprints](/docs/usage/blueprints#bundled-blueprints) for bootstrapping namespaces and publishing platform metadata. A full community blueprint catalog is on the roadmap.
:::

### 5. Manage your Platform
Use Platform Operators to automate the lifecycle of your platform, ensuring consistency and reliability.

### Further Details
Full details are provided on the [Workflow and Usage](/docs/spec/workflow-and-usage) page.
