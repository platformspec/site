---
layout: doc
sidebar: false
aside: false
---

# News and Announcements

Stay up-to-date on all things Platform Specification.  This is where you'll find the latest news, releases, and announcements about The Platform Specification project.

<p>&nbsp;</p>

::: timeline March 11th, 2025
::: info API Groups
We’re excited to announce a major structural enhancement to The Platform Specification: the introduction of API Groups!

To improve clarity, organization, and scalability, The Platform Specification has been restructured into distinct API Groups, each focusing on a specific domain [of concern] within platform engineering.  This adjustment makes it easier to navigate the specification, adopt relevant sections, and contribute to its evolution.

* **API Groups introduced:**  The specification is now segmented into structured groups, including `core`, `design`, `build`, `operate`, `workload`, `govern`, `secure`, and `sdk`.
* **Clear separation of concerns:**  Each API Group now has a well-defined scope, ensuring a logical and manageable breakdown of the platform engineering lifecycle.
* **Easier adoption & contribution:**  Teams can now focus on specific API Groups relevant to their use cases without unnecessary complexity.
* **Status tracking introduced:**  Each Kind within an API Group now has a Status Level (Defined, In Progress, Planned, etc.) to indicate development progress.

This restructuring ensures The Platform Specification remains modular, extensible, and easier to work with, empowering teams to design, build, and operate cloud platforms with confidence.

For more details, visit the [API Groups](./docs/spec/spec#api-groups) section of the specification within the documentation.

:::

::: timeline January 23rd, 2025
::: info Progress report
Happy 2025 platform engineers! I wanted to take opportunity to elaborate a bit on our current initiatives.
A lot has been happening the past weeks and it's worth sharing some details.

PlatformSpec has been drafted by Josh end of November and now starts to take shape. We are extending the specification draft, working on concept designs and detailing potential usecases.

The SDK currently just models PlatformSpec entities in it's draft stage and we have realized there is need for building something more foundational for the typical uses cases required to get started. This is why we now are experimenting with a couple of ideas that emerged from reflecting the general challenges in Platform Engineering.

<p>&nbsp;</p>

***Challenges to solve***

Platform engineering is an extensive discipline. How do you design a system that is prepared for everlasting change?
As you all know it's not just starting a Backstage project.

Building a platform is not easy and probably never finished. It has a lifecycle on it's own and requires endurance to maintain. Customization is costly but often the only way to make your platform align to your company needs. There is no one-size-fits-all silver bullet but maybe something that fits 60-80% to your current situation.

One of our main goals is to give the community a solid and standardized codebase to start their own platform initiative with the power of Open Source. A single software tool is probably not able to cover all edge cases so we came up something more flexible.

Initially PlatformSpec was the high level definition for the to-be-established platform with Blueprints and Builders executing it in detail.

<p>&nbsp;</p>

***Conceptual changes***

We revised this concept in the following way:

* ***PlatformSpec*** is still the definition which specifies the boundary of a platform at any level. It defines high-level infrastructure, services and at the same time offers a universal domain driven specification to address e.g. CICD or policies. Generally spoken it expresses the _need_ for the assembly.

* ***Blueprints*** are now configuration modules that can be of any scope, be layered and offer consistency within their scope. They contain the real definitions, e.g. Terraform scripts, helm values files, Backstage software templates and alike. They are authored, provided and shared by any party and aim to leverage community knowledge as a consumable. Blueprints are _solution  catalogs_ the PlatformSpec can _bind_ to.

* ***Builders*** are now common, reusable providers that cope with a single type of technology. They talk to cloud APIs, git repositories, skaffold templates and help the Blueprint taking _action_.
The SDKs will bring some common builders but rolling your own will be possible as well.

All three of them make up a Platform assembly.

<p>&nbsp;</p>

***PlatformSpec Scope Adjustments***

The scope of PlatformSpec initially was set for _building_ platforms. We now tend to additionally use it for _consuming_ an assembled platform as well in order to make PlatformSpec more holistic.

This comes with a couple of new challenges like frontend/cli integration and domain specific configurations while staying vendor agnostic.


<p>&nbsp;</p>

***Reference Architecture***

How do you apply the PlaformSpec assembly with it's Builders and Blueprints?
This is where we currently experiment the most.

We drafted a modular reference architecture to foster extensibility by coupling all services, modules and providers in a very loosely manner. At the same time we opted for a well known lifecycle pattern going with the Operator SDK.

The idea here is to let the operator reconcile PlatformSpec CRs by executing the builders that are bound via the blueprints.


<p>&nbsp;</p>

![Reference Architecture (light)](/arch8-light.png){.light-only}
![Reference Architecture (dark)](/arch8.svg){.dark-only}

<p>&nbsp;</p>

***Prototyping***



The last weeks have been mostly invested in writing a Platform Operator as a proof-of-concept for the Java SDK. It consumes Blueprints and runs the Builders and works both on the assembly and consumption side for a couple of use cases with medium to higher complexity.

It is still in a very early stage but already able to shake and rattle the PlatformSpec draft and I am more than happy to release it as a preview in the next weeks to come to drive discussions.

Stay tuned!

// Jens

:::

::: timeline December 2nd, 2024
::: info Major Updates
Much has progressed with The Platform Specification, as a result of some fantastic feedback from [Kubecon North America (Salt Lake City) 2024!](https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/)

Many and much thanks for the review and feedback goes out to (alphabetical):

  - Abby Bangser
  - Adam Otto
  - Adam Russak
  - Bruno Schaatsbergen
  - Colin Griffin
  - Craig Tracey
  - Erick de Carty
  - Jens Saade
  - Jose Hidalgo
  - Joseph Karp
  - Lou Bichard
  - Myles Steinhauser
  - Piotr Szwed
  - Ryan Nowak
  - Wojciech Kocjan

The highlight of the changes to the specification and site are as follows:

  * **Kubernetes Structure:**  Specification has been restructured into a Kubernetes API/Kind style setup (with metadata, apiVersion, kind, etc...)
  * **Composability:**  Components of a Platform have been made composable, by breaking them out into multiple Kinds (such as Platform, Network, Environment, etc).
  * **Documentation:**  Major updates and refinement, discussing the various types of Platforms (from Infrastructure Platforms, to Developer Platforms, to Services ie Control Plane Platforms).

We have a new contributor to the project -- [Jens Saade](https://github.com/jenssaade) -- who has provided much needed review, fixes, and guidance.

Last but not least, we have our first [SDK for Java](https://github.com/verticle-io/platformspec-model-java), graciously authored by [Jens Saade](https://github.com/jenssaade)!

:::

::: timeline November 4th, 2024
::: info JSON Examples
As requested, the specification has been updated to equally support JSON in addition to YAML as data serialization/structure formats.

The examples sections now includes JSON snippets in addition to YAML.

See [Spec](docs/spec/spec) and [Example](docs/spec/example) for reference.
:::

::: timeline November 2nd, 2024
::: info Roadmap Published!
We're thrilled to announce the launch of The Platform Specification's official roadmap.  This roadmap outlines our key priorities and goals for the coming months and years, ensuring transparency and alignment with the needs of our users.  We'll be developing new tools, expanding the specification examples, deepening community engagement, and and publishing Platform Blueprints.  Access the full roadmap and contribute your thoughts on the [Roadmap](docs/project/roadmap) page within the documentation.
:::

::: timeline October 28th, 2024
::: info The Platform Specification launched!
We're excited to announce the launch of The Platform Specification's official website! This central hub provides a comprehensive resource for all things related to The Platform Specification, including detailed documentation, examples, and information about getting involved.
:::
