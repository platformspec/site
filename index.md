---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Platform Specification"
  text: "Standards for Defining Your Cloud Platform"
  tagline: Capture Every Component and Configuration of Your Cloud Platform and Infrastructure in One Unified Standard
  image:
    light: ./images/logo-pressedsteel-light.svg
    dark: ./images/logo-pressedsteel-dark.svg
  actions:
    - theme: brand
      text: Documentation
      link: /docs/background/
    - theme: alt
      text: Get Involved!
      link: /community

features:
  - title: Unified Platform Definition
    details: A single `platform.yaml` file to encapsulate all essential components, configurations, and policies of your cloud platform.
  - title: Community-Driven Standards
    details: Built on a standardized, community-driven approach to defining cloud platforms.
  - title: Cross-Environment Consistency
    details: Supports consistent platform deployment across multiple cloud providers and environments.
  - title: Extensible and Modular Design
    details: The Platform Specification is designed to be extensible and modular, allowing for easy integration of new components and configurations.
  - title: Streamlined Collaboration
    details: Facilitates collaboration among platform engineers, developers, and operations teams through a shared, transparent configuration file.
  - title: Accelerated Time to Value
    details: Provides a clear, structured approach to cloud platform engineering, reducing the learning curve for new team members and accelerating platform deployment.
---

<style>
:root {
  /* --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff); */

  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #3451b2 30%, #8596d0);

  /*--vp-home-hero-image-background-image: linear-gradient(-45deg, #3451b2 50%, #3451b2 50%);*/
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
</style>
<p>&nbsp;</p>

[![Workflow](./images/workflow-light.svg){style="display: block; margin: 0 auto" .light-only}](./docs/spec/workflow-and-usage)
[![Workflow](./images/workflow-dark.svg){style="display: block; margin: 0 auto" .dark-only}](./docs/spec/workflow-and-usage)

The Platform Specification project introduces a comprehensive and structured YAML-based approach to defining, deploying, and managing cloud platforms across diverse environments. By encapsulating every essential component, configuration, and policy within a single document, it ensures consistent, streamlined, and scalable infrastructure management. Whether you're operating across multiple clouds or fine-tuning a single environment, the Platform Specification simplifies the complexity, empowering your team to focus on innovation rather than infrastructure.

