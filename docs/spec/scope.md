# Scope of The Platform Specification

The Platform Specification is designed to provide a structured, consistent, and declarative way to define the essential components, configurations, and policies that make up a cloud platform. It aims to standardize how platforms are described, making them easier to build, manage, and evolve across diverse use cases. Below, we outline what falls within the scope of the specification and what is intentionally left out.

## **In Scope**

::: tip What's in scope?
1. **Defining Platform Components**
   - The specification captures the building blocks of a platform, including infrastructure, compute, networking, policies, developer services, observability tools, and governance mechanisms.
   - It encompasses core resources like Kubernetes clusters, managed cloud services, virtual machines, and storage systems.

2. **Configuration Management**
   - Detailed configurations for platform services, such as scaling policies, disaster recovery settings, and cost management rules.
   - Declarative definitions for application hosting and developer tooling (e.g., CI/CD pipelines, API gateways).

3. **Platform Lifecycle Policies**
   - Operational policies for backup, monitoring, scaling, alerting, and compliance enforcement.
   - Guidance for enforcing standards like security, auditing, and governance policies.

4. **Declarative Structure**
   - The specification uses YAML or JSON with a Kubernetes API CRD-style structure to ensure extensibility and compatibility with cloud-native tools.

5. **Interoperability**
   - The specification supports integrations with common cloud providers (AWS, Azure, GCP) and orchestration tools like Kubernetes.
   - It is designed to complement existing infrastructure-as-code (IaC) tools, enabling teams to overlay additional layers of abstraction or automation.

:::

## **Not in Scope**
::: danger What's not in scope?
1. **Implementation Details**
   - The specification does not dictate how a platform is implemented or deployed. It focuses solely on defining the desired state, leaving implementation to specific tools or orchestrators, through the use of Blueprints that in turn leverage solutions such as Terraform, Pulumi, Cloud Formation, Crossplane, etc.

2. **Specific Tooling or Vendor Lock-In**
   - The specification avoids coupling to any particular vendor, platform, or technology. It is agnostic to the underlying implementation tooling.

3. **Runtime Operations**
   - While operational policies are defined, the specification does not cover the runtime execution of these policies (e.g., scaling decisions in real-time or executing a failover).

4. **Application-Specific Configurations**
   - The specification is not designed to manage individual application configurations (e.g., microservice deployment details) but instead focuses on the platform's broader components and capabilities.

5. **Detailed Code or Workflow Definitions**
   - The specification is not a replacement for workflow automation tools like GitHub Actions or CI/CD pipelines. It defines high-level requirements, but the execution of those workflows is out of scope.

6. **General-Purpose Infrastructure as Code**
   - The specification is not intended to replace IaC tools like Terraform or CloudFormation but to provide a higher-level, platform-oriented abstraction layer on top of them.
:::