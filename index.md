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
      text: The Specification
      link: /docs/spec/spec

features:
  - title: Comprehensive Platform Coverage
    details: From <strong>Infrastructure & Operations</strong> to <strong>Application Development</strong> and <strong>Services Control Planes</strong>, Platform Spec defines standards for all major platform types.
  - title: Community-Driven Best Practices
    details: Built upon a standardized, collaborative approach, ensuring best practices are shared and evolved by the cloud native community.
  - title: Consistent Across Environments
    details: Deploy consistent platforms seamlessly across diverse cloud providers and environments, fostering portability and efficiency.
  - title: Flexible and Adaptable
    details: The Platform Specification's extensible and modular design allows for easy integration of new technologies and customizations.
  - title: Enhanced Collaboration
    details: Streamline teamwork with a single, transparent configuration file, enabling platform engineers, developers, and operations teams to work in sync.
  - title: Faster Time to Market
    details: Accelerate platform deployment and reduce onboarding time with a clear, structured framework that empowers new team members quickly.
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

The Platform Specification is a community-driven standard designed to simplify <strong>Cloud Native Platform Engineering</strong>. It provides a common set of APIs for platform engineers, developers, and operations teams, regardless of their chosen cloud provider or environment. By leveraging proven best practices and a shared configuration, Platform Spec streamlines collaboration, boosts efficiency, and accelerates time to value. Whether you're operating across multiple clouds or fine-tuning a single environment, Platform Spec ensures cross-cloud consistency and reduces the complexities of platform management. This means your team can focus on what truly matters: building innovative applications and delivering exceptional user experiences. Join the community and discover how Platform Spec can empower your team to build better platforms faster.

<p>&nbsp;</p>

![Platform Types](/PlatformTypes-light.drawio.png){style="display: block; margin: 0 auto" .light-only}
![Platform Types](/PlatformTypes-dark.drawio.png){style="display: block; margin: 0 auto" .dark-only}

<p>&nbsp;</p>

The Platform Specification understands that cloud native platforms come in many shapes and sizes—from <strong>Infrastructure Platforms</strong> to <strong>Developer Platforms</strong>, <strong>Services Platforms</strong>, and beyond.  Rather than trying to dictate a one-size-fits-all solution, Platform Spec provides a flexible framework for defining and implementing any type of platform. By recognizing the commonalities across these diverse platforms, Platform Spec leverages a modular and composable approach. This means you can reuse overlapping aspects across different platform types, streamlining the definition and description of your intended platform outcome, regardless of its specific focus. Whether you're building an Infrastructure-as-Code powerhouse or a streamlined Developer Experience, Platform Spec empowers you to build better platforms faster by focusing on what truly matters: your unique requirements and innovation.

<p align="center"><b>Email:</b> <a href="mailto:contact@platformspec.io">contact@platformspec.io</a> | <b>Slack:</b> <a href="https://cloud-native.slack.com/archives/C0826E3MFFA">#platformspec</a></p>