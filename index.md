---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Platform Specification"
  # text: "Standards For Your Cloud Native Platform"
  # tagline: Capture Every Component and Configuration of Your Cloud Native Platform in One Unified Standard
  text: "Codify Your Cloud Native Platform"
  tagline: Capture and standardize every component of your Kubernetes-powered platform—infra, policies, security, and services—using a unified set of CRDs and tools purpose-built for <strong>platform engineering</strong>.
  image:
    light: logo-pressedsteel-light.png
    dark: logo-pressedsteel-dark.png
  actions:
    - theme: brand
      text: Getting Started
      link: /docs/project/getting-started/
    - theme: alt
      text: The Specification
      link: /docs/spec/spec
    - theme: alt
      text: Knowledge Base
      link: /docs/types/types

features:
  # - title: Comprehensive Platform Coverage
  #   details: From <strong>Infrastructure & Operations</strong> to <strong>Application Development</strong> and <strong>Services Control Planes</strong>, Platform Spec defines standards for all major platform types.
  # - title: Enhanced Collaboration
  #   details: Streamline teamwork with a single, transparent configuration file, enabling platform engineers, developers, and operations teams to work in sync.
  # - title: Faster Time to Market
  #   details: Accelerate platform deployment and reduce onboarding time with a clear, structured framework that empowers new team members quickly.
  # - title: Collaborative Platform Design
  #   details: Use the spec CRDs to manifest your layout in workshops. Help other teams engage into the discussion by using a well defined catalog.  Seemlessly continue with the machine readable results.
  # - title: Standardized Tool Integration
  #   details: Use platformspec as a common abstraction layer between arbitraty tools of your platform. Leverage client SDKs for cleaner integrations.
  # - title: Learn from comparable platform designs
  #   details: Make platform topologies comparable, easier to understand and learn from other projects to improve.
  # - title: What is it?
  #   details: The Platform Specification is an open, YAML-based standard for defining modern cloud platforms. It lets you describe infrastructure, services, policies, and developer tools—across any cloud or Kubernetes environment.
  # - title: Why it matters
  #   details: <ul><li>&bullet; Inconsistent environments</li><li>&bullet; Tribal knowledge and fragile automation</li><li>&bullet; Runaway costs and misconfigured services</li></ul>
  # - title: Comprehensive Coverage
  #   details: From <strong>Infrastructure & Operations</strong> to <strong>Application Development</strong> and <strong>Services Control Planes</strong>, Platform Spec defines standards for all major platform types.
  - title: 📦 Modular Structure
    details: Define only what you need—Infrastructure, Compute, Policies, and more—in isolated, reusable sections.
    linkText: See the API groups
    link: /docs/spec/spec#api-groups
  - title: ✏️ Declarative and Git-Friendly
    details: Say what your platform should look like, not how to build it.  Store and version your platform definitions as code, perfect for GitOps workflows.
    linkText: See the spec
    link: /docs/spec/spec
  - title: 🤖 Designed for Automation
    details: Build, deploy, validate, and visualize using existing CI/CD pipelines and dashboard tools.
    link: /docs/spec/workflow-and-usage
    linkText: Workflow and Usage
  - title: ☁️ Cloud Agnostic
    details: Works with any provider -- AWS, GCP, Azure, IBM, Oracle, or any others -- as long as it's a Kubernetes environment.
    link: /docs/spec/groups/core.platformspec.io.html#provider
    linkText: See Providers
  - title: 🛠️ Standardized Tool Integration
    details: Use platformspec as a common abstraction layer between arbitraty tools of your platform. Leverage client SDKs for cleaner integrations.
    link: /docs/spec/sdks.html
    linkText: SDKs
  - title: 🧠 Learn From Comparable Platform Designs
    details: Make platform topologies comparable, easier to understand and learn from other projects to improve.
    linkText: Learn About Platforms
    link: /docs/types/types.html
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #3451b2 30%, #8596d0);
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #99a8d8 50%, #99a8d8 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
/*
:root.dark img[src$=".png"] {
   filter: invert(1);
}

:root:not(.dark) img[src$=".png"] {
   filter: invert(0)
}
*/
</style>

<p>&nbsp;</p>

<p align="center"><b>Email:</b> <a href="mailto:contact@platformspec.io">contact@platformspec.io</a> | <b>Slack:</b> <a href="https://cloud-native.slack.com/archives/C0826E3MFFA">#platformspec</a></p>
