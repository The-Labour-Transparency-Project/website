import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-NZ',
  title: 'The Labour Transparency Project',
  description: 'Towards transparent and traceable labour supply chains.',
  cleanUrls: true,
  head: [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'The Labour Transparency Project' }],
    ['meta', { property: 'og:description', content: 'Labour should be as traceable as the products it produces.' }],
    ['meta', { property: 'og:image', content: '/og.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }]
  ],
  themeConfig: {
    logo: { src: '/mark.svg', alt: 'Labour Transparency Project' },
    nav: [
      { text: 'The initiative', link: '/initiative' },
      { text: 'The Code', link: '/code/' },
      { text: 'Framework', link: '/framework' },
      { text: 'Implementation', link: '/implementation' },
      { text: 'Library', link: '/library' },
      { text: 'Licence', link: '/licence' }
    ],
    sidebar: {
      '/articles/': [
        {
          text: 'Summary papers',
          items: [
            { text: '01 · Product traceability and workforce traceability', link: '/articles/01-product-traceability-and-workforce-traceability' },
            { text: '02 · Labour opacity as structural risk', link: '/articles/02-labour-opacity-as-structural-risk' },
            { text: '03 · Labour supply chains are not linear', link: '/articles/03-labour-supply-chains-are-not-linear' },
            { text: '04 · From compliance to assurance infrastructure', link: '/articles/04-from-compliance-to-assurance-infrastructure' },
            { text: '05 · Federated trust', link: '/articles/05-federated-trust' },
            { text: '06 · From signals to patterns', link: '/articles/06-from-signals-to-patterns' },
            { text: '07 · Transparency must work for workers', link: '/articles/07-transparency-must-work-for-workers' },
            { text: '08 · Share claims, not copies', link: '/articles/08-share-claims-not-copies' },
            { text: '09 · Proportionate assurance', link: '/articles/09-proportionate-assurance' },
            { text: '10 · Workforce traceability as governance infrastructure', link: '/articles/10-workforce-traceability-as-governance-infrastructure' },
            { text: '11 · Containment through visibility', link: '/articles/11-containment-through-visibility' },
            { text: '12 · Participation needs incentives', link: '/articles/12-participation-needs-incentives' }
          ]
        }
      ],
      '/code/': [
        {
          text: 'Labour Transparency Code',
          items: [
            { text: 'Overview', link: '/code/' },
            { text: 'The ten rules', link: '/code/ten-rules' },
            { text: 'How to use the Code', link: '/code/adoption' }
          ]
        }
      ]
    },
    socialLinks: [],
    footer: {
      message: 'A discussion framework for transparent and traceable labour supply chains.',
      copyright: '© The Labour Transparency Project · Content: CC BY-NC 4.0'
    },
    search: { provider: 'local' }
  }
})
