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
      { text: 'Specification', link: '/spec/' },
      { text: 'Examples', link: '/examples' },
      { text: 'Community', link: '/community' }
    ],

    sidebar: {
      '/spec/': [
        {
          text: 'Background',
          items: [
            { text: 'Introduction', link: '/spec/' },
            { text: 'What is a Cloud Platform?', link: '/spec/cloud-platforms' },
            { text: 'Cloud Platforms Distilled', link: '/spec/distilled' },
            { text: 'Benefits and Purpose', link: '/spec/purpose-and-benefits' },
            { text: 'Stakeholders', link: '/spec/stakeholders' },
            { text: 'How Cloud Platforms are Used', link: '/spec/how-its-used' },
            { text: 'What is Platform Enginering', link: '/spec/platform-engineering' },
            { text: 'How Are They Related?', link: '/spec/cloud-platform-platform-engineering-relationship' },
            { text: 'FAQ', link: '/spec/faq' }
          ]
        },
        {
          text: 'Specification',
          items: [
            { text: 'Introduction', link: '/spec/introduction' },
            { text: 'Getting Started', link: '/spec/getting-started' },
            { text: 'Usage', link: '/spec/usage' },
            { text: 'Components', link: '/spec/ref-components' },
            { text: 'Validation', link: '/spec/ref-validation' },
            { text: 'SDKs', link: '/spec/sdks' },
            { text: 'License', link: '/spec/license' }
          ]
        },
        {
          text: 'Examples',
          items: [
            { text: 'Basic AWS Platform', link: '/spec/example-basic-aws' }
          ]
        },
        {
          text: 'Community',
          items: [
            { text: 'Involvement', link: '/spec/involvement' },
            { text: 'Resources', link: '/spec/resources' }
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
