import timeline from 'vitepress-markdown-timeline';
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "The Platform Specification",
  description: "Standards for Defining Your Cloud Platform",
  head: [
    [ 'script', { defer: '', 'data-domain': 'platformspec.io', src: 'https://plausible.io/js/script.js' } ],
    [ 'meta', { property: 'og:url', content: 'https://platformspec.io'}],
    [ 'meta', { property: 'og:type', content: 'website'}],
    [ 'meta', { property: 'og:title', content: 'The Platform Specification'}],
    [ 'meta', { property: 'og:description', content: 'Standards for Defining Your Cloud Platform'}],
    [ 'meta', { property: 'og:image', content: 'https://platformspec.io/thumbnail.png'}],
    [ 'meta', { name: 'twitter:card', content: 'summary_large_image'}],
    [ 'meta', { property: 'twitter:domain', content: 'platformspec.io'}],
    [ 'meta', { property: 'twitter:url', content: 'https://platformspec.io'}],
    [ 'meta', { name: 'twitter:title', content: 'The Platform Specification'}],
    [ 'meta', { name: 'twitter:description', content: 'Standards for Defining Your Cloud Platform'}],
    [ 'meta', { name: 'twitter:image', content: 'https://platformspec.io/thumbnail.png'}]
  ],
  sitemap: {
    hostname: 'https://platformspec.io'
  },
  markdown: {
    config: (md) => {
      md.use(timeline);
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      'light': '/logo-black.svg',
      'dark': '/logo-white.svg'
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/docs/project/preface/' },
      { text: 'News', link: '/news'},
      { text: 'Community', link: '/community' }
    ],
    sidebar: {
      '/docs/': [
        {
          text: 'Project',
          items: [
            { text: 'Preface', link: '/docs/project/preface'},
            { text: 'About The Project', link: '/docs/project/about' },
            { text: 'Contributing', link: '/docs/project/contributing' },
            { text: 'Roadmap', link: '/docs/project/roadmap' },
            { text: 'Help Wanted', link: '/docs/project/help'},
            { text: 'Authors', link: '/docs/project/authors' }
          ]
        },
        {
          text: 'The Specification',
          items: [
            { text: 'Overview', link: '/docs/spec/overview' },
            { text: 'The Specification', link: '/docs/spec/spec' },
            { text: 'Example', link: '/docs/spec/example' },
            { text: 'Workflow & Usage', link: '/docs/spec/workflow-and-usage' },
            { text: 'SDKs', link: '/docs/spec/sdks' },
            { text: 'License', link: '/docs/spec/license' }
          ]
        },
        {
          text: 'Platforms',
          items: [
            { text: 'Types of Platforms', link: '/docs/types/types' },
            {
              text: 'Infrastructure Platforms',
              items: [
                { text: 'What is an Infrastructure Platform?', link: '/docs/types/infrastructure/what-is-an-infrastructure-platform' },
                { text: 'Who needs an Infrastructure Platform?', link: '/docs/types/infrastructure/who-needs-an-infrastructure-platform' },
                { text: 'The Four Layers', link: '/docs/types/infrastructure/the-four-layers' },
                { text: 'The Six Key Pillars', link: '/docs/types/infrastructure/key-pillars' },
                { text: 'Stakeholders', link: '/docs/types/infrastructure/stakeholders' }
              ]
            },
            {
              text: 'Developer Platforms',
              items: [
                { text: 'What is a Developer Platform?', link: '/docs/types/developer/what-is-a-developer-platform' },
                { text: 'Who needs a Developer Platform?', link: '/docs/types/developer/who-needs-a-developer-platform' },
                { text: 'Stakeholders', link: '/docs/types/developer/stakeholders' }
              ]
            },
            {
              text: 'Services Platforms',
              items: [
                { text: 'What is a Services Platform?', link: '/docs/types/services/what-is-a-services-platform' },
                { text: 'Who needs a Services Platform?', link: '/docs/types/services/who-needs-a-services-platform' },
                { text: 'Stakeholders', link: '/docs/types/services/stakeholders' }
              ]
            }
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
