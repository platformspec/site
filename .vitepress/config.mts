import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "The Platform Specification",
  description: "Standards for Defining Your Cloud Platform",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      'light': '/images/logo-black.svg',
      'dark': '/images/logo-white.svg'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Specification', link: '/docs/background/' },
      { text: 'Examples', link: '/docs/examples' },
      { text: 'Community', link: '/community' }
    ],

    sidebar: {
      '/docs/': [
        {
          text: 'Background',
          items: [
            { text: 'Introduction', link: '/docs/background/' },
            { text: 'What is a Cloud Platform?', link: '/docs/background/cloud-platforms' },
            { text: 'Cloud Platforms Distilled', link: '/docs/background/distilled' },
            { text: 'Benefits and Purpose', link: '/docs/background/purpose-and-benefits' },
            { text: 'Stakeholders', link: '/docs/background/stakeholders' },
            { text: 'How Cloud Platforms are Used', link: '/docs/background/how-its-used' },
            { text: 'What is Platform Enginering', link: '/docs/background/platform-engineering' },
            { text: 'How Are They Related?', link: '/docs/background/cloud-platform-platform-engineering-relationship' },
            { text: 'FAQ', link: '/docs/background/faq' }
          ]
        },
        {
          text: 'Specification',
          items: [
            { text: 'Introduction', link: '/docs/spec/introduction' },
            { text: 'Getting Started', link: '/docs/spec/getting-started' },
            { text: 'Usage', link: '/docs/spec/usage' },
            { text: 'Components', link: '/docs/spec/ref-components' },
            { text: 'Validation', link: '/docs/spec/ref-validation' },
            { text: 'SDKs', link: '/docs/spec/sdks' },
            { text: 'License', link: '/docs/spec/license' }
          ]
        },
        {
          text: 'Examples',
          items: [
            { text: 'Basic AWS Platform', link: '/docs/examples/example-basic-aws' }
          ]
        },
        {
          text: 'Community',
          items: [
            { text: 'Involvement', link: '/docs/community/involvement' },
            { text: 'Resources', link: '/docs/community/resources' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/platformspec' }
    ],

    footer: {
      message: 'Released under the [INSERT LICENSE HERE] License.',
      copyright: 'Copyright © 2024 <a href="https://www.foundation.io" target="_blank">FoundationIO</a>'
    }
  }
})
