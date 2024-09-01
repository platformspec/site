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
          text: 'Overview',
          items: [
            { text: 'Introduction', link: '/spec/' },
            { text: 'How It\'s Used', link: '/spec/how-its-used' },
            { text: 'Use Cases', link: '/spec/use-cases' },
            { text: 'FAQ', link: '/spec/faq' }
          ]
        },
        {
          text: 'Getting Started',
          items: [
            { text: 'First Steps', link: '/spec/first-steps' },
            { text: 'Examples', link: '/spec/examples' },
            { text: 'SDKs', link: '/spec/sdks' }
          ]
        },
        {
          text: 'Reference',
          items: [
            { text: 'Components', link: '/spec/ref-components' },
            { text: 'Validation', link: '/spec/ref-validation' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/platformspec' }
    ],

    footer: {
      message: 'Released under the Apache 2.0 License.',
      copyright: 'Copyright © 2024 FoundationIO'
    }
  }
})
