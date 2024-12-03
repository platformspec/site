# Workflow and Usage of the Platform Specification

Let's now look into how to put the Platform Specification to good use...

The Platform Specification provides a structured approach to defining and managing platforms in a consistent, repeatable manner. By following this workflow, and capturing everything with regards to their platform in one definition, organizations can seamlessly construct several useful assets as a result.

<p>&nbsp;</p>

![Workflow](./workflow-light.png){style="display: block; margin: 0 auto" .light-only}
![Workflow](./workflow-dark.png){style="display: block; margin: 0 auto" .dark-only}

<p>&nbsp;</p>

For example, an organization could run their `platform.yaml` through a **Blueprint**, which renders output to be leveraged by:

* **Builders (Infrastructure as Code Systems)** such as:
    * [Terraform](https://www.terraform.io/)
    * [Cloud Formation](https://aws.amazon.com/cloudformation/)
    * [CrossPlane](https://www.crossplane.io/)
    * and more...
* **Visualizers (Diagraming Tools)** that can render a 2D or 3D architecture diagram of the defined platform.
* **Forecasters (Cost Analysis Engines)** that can construct a forecast of cost for the platform, starting with just the baseline expense.
* **Diff Analyzer (Validation and Deviation Detection Tools)** that can report back the differences between the defined and actualized platform, for compliance purposes.

<p>&nbsp;</p>

![Workflow](./workflow-detailed-light.drawio.png){style="display: block; margin: 0 auto" .light-only}
![Workflow](./workflow-detailed-dark.drawio.png){style="display: block; margin: 0 auto" .dark-only}

<p>&nbsp;</p>

## Step 1: Construct the `platform.yaml` (or `platform.json`)
The first step in building a cloud platform using the Platform Specification is writing the `platform.yaml` file -- a set of YAML documents with each of your API resources composing your Platform.

This file encapsulates all the essential components and configurations necessary for your platform. It’s written following the Platform Specification format, which ensures a consistent structure and interoperability across tools and environments.

## Step 2: Select a Platform Blueprint
Once your `platform.yaml` is written, the next step is to select a **Blueprint**. A Blueprint is a predefined template that knows how to interpret your `platform.yaml` and transform it into an Infrastructure as Code (IaC) definition.

Using a Platform Blueprint simplifies the complexity of converting abstract platform configurations into real, deployable infrastructure. The Blueprint reads the configurations from `platform.yaml` and translates them into cloud-specific resources, like virtual machines, managed services, networks, and security policies.

Each Blueprint is designed to be flexible, allowing you to customize it for specific cloud providers, regions, or even unique operational needs. Whether your platform is being deployed on AWS, GCP, Azure, or a hybrid cloud, there’s likely a Blueprint tailored to your use case.

## Step 3: Apply the Infrastructure as Code (IaC) Using Builder/IaC Engine
With your Infrastructure as Code (IaC) definition generated from the Blueprint, the next step is to apply it. This can be done using any of the following IaC engines:


- **Terraform/OpenTofu**: Industry-standard IaC tools for provisioning and managing cloud infrastructure across a wide variety of providers.
- **CloudFormation**: A native IaC tool for AWS, allowing the creation and management of AWS resources.
- **FoundationIO’s Metropolis**: A powerful open source Platoform Orchestor (coming soon) that automates platform deployment and management across multiple clouds.

The IaC engine of choice will interpret the output from the Platform Blueprint and deploy the resources into your cloud environment. Depending on your specific requirements, you can choose to apply the entire platform definition at once or iteratively deploy parts of it.

This stage ensures that all infrastructure resources defined in your `platform.yaml` are created, configured, and ready to use in your selected cloud environments.

## Step 4: Leverage Your Platform
With your infrastructure successfully deployed, your platform is now ready to be leveraged for your business needs. You can begin using the platform for application development, data processing, or other workloads while adhering to the governance and policies you've predefined in the `platform.yaml` file.

At this stage, the platform operates as a fully functional, customizable environment, which you can scale, modify, and optimize over time as your needs evolve. Additionally, the standardized nature of the Platform Specification allows for continuous platform enhancements and consistent management across multiple environments.

## Summary
The workflow of the Platform Specification streamlines the process of defining, building, and managing cloud platforms. From writing the initial `platform.yaml` through selecting a Platform Blueprint, applying Infrastructure as Code, and finally leveraging the platform, this process allows organizations to accelerate cloud deployments with consistency and confidence. The standardized approach ensures that your platform is not only tailored to your specific needs but also scalable, maintainable, and governed by best practices in cloud infrastructure management.