---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Platform Specification"
  text: "Standards For Your Cloud Native Platform"
  tagline: Capture Every Component and Configuration of Your Cloud Native Platform in One Unified Standard
  image:
    light: logo-pressedsteel-light.png
    dark: logo-pressedsteel-dark.png
  actions:
    - theme: brand
      text: Documentation
      link: /docs/project/preface/
    - theme: alt
      text: Get Involved!
      link: /community

features:
  - title: Multiple Platform Types
    details: There are many types of platforms -- from Infrastructure and Operations focused, Application Developer Focused, to Services and Control Plane focused; Platform Spec captures them all.
  - title: Community-Driven Standards
    details: Built on a standardized, community-driven approach to defining cloud native platforms.
  - title: Cross-Environment Consistency
    details: Supports consistent platform deployment across multiple cloud providers and environments.
  - title: Extensible and Modular Design
    details: The Platform Specification is designed to be extensible and modular, allowing for easy integration of new components and configurations.
  - title: Streamlined Collaboration
    details: Facilitates collaboration among platform engineers, developers, and operations teams through a shared, transparent configuration file.
  - title: Accelerated Time to Value
    details: Provides a clear, structured approach to platform engineering, reducing the learning curve for new team members and accelerating platform deployment.
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
</style>
<p>&nbsp;</p>


![Platform Types](/PlatformTypes-light.drawio.png){style="display: block; margin: 0 auto" .light-only}
![Platform Types](/PlatformTypes-dark.drawio.png){style="display: block; margin: 0 auto" .dark-only}

The Platform Specification project introduces a comprehensive and structured YAML/JSON-based approach to defining, deploying, and managing cloud platforms across diverse environments. By encapsulating every essential component, configuration, and policy within a single document, it ensures consistent, streamlined, and scalable infrastructure management. Whether you're operating across multiple clouds or fine-tuning a single environment, the Platform Specification simplifies the complexity, empowering your team to focus on innovation rather than infrastructure.

<p align="center"><a href="mailto:contact@platformspec.io">contact@platformspec.io</a></p>