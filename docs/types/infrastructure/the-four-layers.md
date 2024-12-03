# The Four Layers

Let's begin diving into what makes up an Infrastructure Platform, by breaking down the physical architecture layers....

An Infrastructure Platform is a sophisticated stack of services and technologies designed to provide a standardized and scalable environment for building, deploying, and managing applications. A well-architected platform typically consists of four distinct layers, each serving a critical role in the platform’s overall functionality. These layers work together to abstract the complexities of infrastructure, orchestrate system-level tasks, provide essential services to developers, and support application delivery and operations.

![Infrastructure Platform Layers (light)](./InfrastructurePlatformLayers-light.drawio.svg){.light-only}
![Infrastructure Platform Layers (dark)](./InfrastructurePlatformLayers-dark.drawio.svg){.dark-only}

Understanding these four layers—**Infrastructure Services**, **System Services**, **Platform Services**, and **Application Services**—is key to comprehending how an Infrastructure Platform functions and delivers value. Each layer serves a unique purpose, contributing to the automation, scalability, security, and efficiency of cloud operations. Together, they enable organizations to build robust, flexible platforms capable of managing complex workloads and delivering applications across diverse environments.

In this section, we will explore each of these layers, breaking down their roles, responsibilities, and how they integrate to create a seamless cloud experience. By examining these layers, we can better understand the architecture and design principles that power modern Infrastructure Platforms, as well as the benefits they offer to development teams, operators, and organizations as a whole.

## **The Four Layers of a Infrastructure Platform**



Cloud platforms are built on a complex yet highly structured foundation, organized into distinct layers that provide essential services for deploying, managing, and scaling applications. Each layer serves a unique purpose and contributes to the overall functioning of the cloud platform, supporting developers, engineers, and other stakeholders in their respective roles.

The Platform Specification organizes cloud platforms into **four key layers**:

1. **Infrastructure Services**
2. **System Services**
3. **Platform Services**
4. **Application Services**

Let's now explore each of these layers, detailing their functions, components, and significance within a cloud platform.

---

### **1. Infrastructure Services**

The **Infrastructure Services** layer forms the foundational base of any cloud platform. It consists of the raw compute, storage, and networking resources provided by Infrastructure as a Service (IaaS) providers. This layer includes public cloud providers such as AWS, Google Cloud Platform (GCP), Microsoft Azure, IBM, Oracle, and more, as well as private cloud solutions such as Apache CloudStack and OpenStack.

#### **Components:**
- **Compute Resources:** Virtual machines, containers, and bare metal servers for running applications and workloads.
- **Storage:** Block storage, object storage, and file systems that enable the persistence and retrieval of data.
- **Networking:** Virtual networks, subnets, and interconnections that provide communication between different resources.
- **Public Cloud Providers:** Major cloud platforms like AWS, GCP, and Azure that offer scalable, on-demand infrastructure.
- **Private Cloud Solutions:** Self-hosted solutions like OpenStack or Apache CloudStack that allow organizations to create their own cloud environments.

#### **Importance:**
This layer is the foundation of every cloud platform, providing the essential resources on which everything else is built. Organizations use infrastructure services to create scalable environments, allowing them to expand or reduce capacity as required. The ability to leverage public or private cloud solutions provides flexibility in terms of cost, control, and compliance.

---

### **2. System Services**

Above the infrastructure layer sits the **System Services** layer, which provides a suite of essential services that handle the underlying system management, orchestration, and security. This layer is largely responsible for managing, automating, and securing the infrastructure resources and their interactions.

#### **Components:**
- **Orchestration (Kubernetes, Nomad, etc):** Manages containerized applications and orchestrates workloads across clusters of machines.
- **Networking and VPNs:** Manages secure connections, network policies, and virtual private networks (VPNs) for data protection.
- **DNS:** Handles domain name resolution, enabling services and applications to communicate via human-readable domain names.
- **Identity and Access Management (IAM):** Controls who has access to resources, enforcing policies like least privilege access and multi-factor authentication (MFA).
- **Logs and Monitoring:** Collects system logs, metrics, and other telemetry data for visibility and troubleshooting.
- **Storage and Secrets Management:** Manages persistent data storage, as well as secrets like API keys and passwords, securely storing and retrieving sensitive information.

#### **Importance:**
System services enable the smooth operation of infrastructure resources and provide essential management features like scaling, security, and system automation. Kubernetes, for example, has become the backbone for orchestrating containerized workloads, while IAM services ensure that infrastructure is secure and compliant. Together, these services empower engineers to manage infrastructure efficiently and securely.

---

### **3. Platform Services**

The **Platform Services** layer introduces higher-level, managed services that developers and operators use to build and operate applications. These services abstract away much of the complexity of infrastructure and system management, allowing teams to focus on building business-driven functionality rather than managing low-level services.

#### **Components:**
- **Service Mesh (e.g., Istio, Linkerd):** Handles microservice communication, traffic management, security, and observability between services.
- **Databases as a Service (DBaaS):** Provides managed database solutions like Amazon RDS, Google Cloud Spanner, or Firebase, eliminating the need to manually configure and manage databases.
- **CDN (Content Delivery Network):** Accelerates the delivery of content and media through geographically distributed servers, improving the user experience by reducing latency.
- **CI/CD Tools and Pipelines:** Continuous Integration and Continuous Deployment tools that automate the building, testing, and deployment of applications.
- **Messaging Queues (Kafka, RabbitMQ, SQS):** Provides reliable message delivery between services for event-driven architectures.
- **Functions as a Service (FaaS):** Serverless compute services, like AWS Lambda or Google Cloud Functions, where code is executed in response to events without the need to manage infrastructure.
- **Cost Management and Accounting:** Tools that track and manage cloud spending, providing cost visibility and optimization recommendations.

#### **Importance:**
Platform services simplify application development and operations by providing managed services that abstract away the complexity of lower-level infrastructure. For instance, DBaaS enables teams to quickly spin up and scale databases without worrying about backups, replication, or maintenance. Similarly, messaging systems like Kafka or RabbitMQ are essential for building robust, event-driven applications that can handle high-throughput workloads.

---

### **4. Application Services**

The topmost layer, **Application Services**, is where the platform meets the user. This layer provides the developer tools, management portals, and additional services that enable seamless application deployment, monitoring, and optimization.

#### **Components:**
- **Dashboards:** Provides visual interfaces to manage and monitor applications, resources, and platform performance metrics.
- **Developer Portals:** Offers self-service portals where developers can provision resources, access documentation, and request services.
- **Testing Automation:** Integrates testing automation tools, including automated unit testing, integration testing, and load testing, to streamline quality assurance in CI/CD pipelines.
- **Canary Rollout Services:** Enables incremental or canary deployments to release new features to a subset of users before rolling them out to the broader user base.
- **Error and Performance Monitoring:** Integrates application performance monitoring tools, such as New Relic, Datadog, or Prometheus, to provide real-time insights into application behavior.
- **User and API Access Control:** Manages how applications and APIs are accessed, including security policies and rate limiting.

#### **Importance:**
Application services cater directly to developers and operational teams, providing the tools needed to deploy, monitor, and optimize applications. Dashboards and portals give teams visibility and control, while testing automation and canary rollout services ensure applications are deployed with minimal risk. By focusing on user-facing services, this layer enables rapid development cycles and enhanced developer productivity.

---

### **The Importance of Layering in Infrastructure Platforms**

Layering cloud platforms into these four distinct groups—**Infrastructure Services**, **System Services**, **Platform Services**, and **Application Services**—provides a structured approach to discussing, and managing, the complexity inherent in modern cloud environments. Each layer builds on the one below it, allowing for increasing levels of abstraction, automation, and developer focus. This layered approach ensures that platform engineers, developers, security teams, and executives all have the same terminology when discussing the tools and services they require to meet their goals.

- **Infrastructure Services** provide the raw foundation, supplying compute, storage, and networking resources.
- **System Services** manage these resources, automating deployments, securing infrastructure, and orchestrating workloads.
- **Platform Services** abstract much of the infrastructure management, offering managed, high-level services like databases, messaging, and continuous deployment pipelines.
- **Application Services** focus on enabling developers to build, deploy, and manage their applications with minimal friction.

By defining and structuring these four layers, the **Platform Specification** provides a roadmap for creating robust, scalable, and developer-friendly cloud platforms that address the full spectrum of an organization’s needs.

## Is that all?
But wait... there's more...

Infrastructure Platforms are not just about the layers of services and software components.  What about the policies regarding interaction between the specified services?  How about the experience provided to developers?  And we cannot forget about security!  These elements are equally as important to the definition of a cloud platform as the services/software providers themselves.  So let's get into that...