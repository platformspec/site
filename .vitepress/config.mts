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
      { text: 'Documentation', link: '/docs/background/' },
      { text: 'Community', link: '/community' }
    ],

    sidebar: {
      '/docs/': [
        {
          text: 'Background',
          items: [
            { text: 'Introduction', link: '/docs/background/' },
            { text: 'What is a Cloud Platform?', link: '/docs/background/what-is-a-cloud-platform' },
            { text: 'Who needs a Cloud Platform?', link: '/docs/background/who-needs-a-cloud-platform' },
            { text: 'The Four Layers', link: '/docs/background/the-four-layers' },
            { text: 'The Six Key Pillars', link: '/docs/background/key-pillars' },
            { text: 'Stakeholders', link: '/docs/background/stakeholders' },
            { text: 'What is Platform Enginering', link: '/docs/background/platform-engineering' },
            { text: 'How Are They Related?', link: '/docs/background/cloud-platform-platform-engineering-relationship' },
          ]
        },
        {
          text: 'Specification',
          items: [
            { text: 'Preface', link: '/docs/spec/preface' },
            { text: 'Overview', link: '/docs/spec/overview' },
            { text: 'Getting Started', link: '/docs/spec/getting-started' },
            { text: 'Example', link: '/docs/spec/example' },
            { text: 'Workflow & Usage', link: '/docs/spec/workflow-and-usage' },
            { text: 'SDKs', link: '/docs/spec/sdks' },
            { text: 'License', link: '/docs/spec/license' }
          ]
        },
        {
          text: 'Contributing',
          items: [
            { text: 'Involvement', link: '/docs/contributing/involvement' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/platformspec' }
    ],

    footer: {
      message: '<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://platformspec.io">Platform Specification</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.foundation.io">FoundationIO</a> is licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-SA 4.0</a></p>',
      copyright: 'Copyright © 2024 <a href="https://www.foundation.io" target="_blank">FoundationIO</a>'
    }
  }
})
