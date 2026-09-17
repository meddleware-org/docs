import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'node:url'

// User-facing documentation for the Meddleware Sui tools. One site, one section per service.
// Output is pinned to the repo-root dist/ so the Dockerfile's `COPY --from=build /app/dist`
// (the shared static-server image pattern) works unchanged.
const outDir = fileURLToPath(new URL('../../dist', import.meta.url))

export default defineConfig({
  title: 'Meddleware Docs',
  description:
    'How to use the Meddleware Sui tools — the DAO console, Walrus Storage, Sealed Storage, and Access Gate.',
  lang: 'en-GB',
  outDir,
  cleanUrls: true,
  lastUpdated: false,
  // The per-service `api/` subtrees are generated at build time by scripts/gen-api.mjs (TypeDoc);
  // their exact filenames depend on the TypeDoc version, so don't fail the build on links into them.
  ignoreDeadLinks: [/\/api\//],
  // Match the estate's dark-first aesthetic; users can still toggle.
  appearance: 'dark',
  head: [['meta', { name: 'theme-color', content: '#5e1622' }]],

  themeConfig: {
    search: { provider: 'local' },

    nav: [
      { text: 'Start here', link: '/getting-started' },
      { text: 'DAO', link: '/dao/' },
      { text: 'Walrus Storage', link: '/walrus-storage/' },
      { text: 'Sealed Storage', link: '/sealed-storage/' },
      { text: 'Access Gate', link: '/access-gate/' },
      {
        text: 'Tools',
        items: [
          { text: 'Tools hub', link: 'https://sui.meddleware.co.uk' },
          { text: 'DAO console', link: 'https://sui-dao.meddleware.co.uk' },
          { text: 'Walrus Storage', link: 'https://sui-walrus.meddleware.co.uk' },
          { text: 'Sealed Storage', link: 'https://sui-seal.meddleware.co.uk' },
          { text: 'Access Gate', link: 'https://sui-access-gate.meddleware.co.uk' },
        ],
      },
    ],

    sidebar: {
      '/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Overview', link: '/' },
            { text: 'Getting started', link: '/getting-started' },
            { text: 'How the tools fit together', link: '/architecture' },
          ],
        },
        {
          text: 'DAO',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/dao/' },
            { text: 'Reference', link: '/dao/reference' },
          ],
        },
        {
          text: 'Walrus Storage',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/walrus-storage/' },
            { text: 'Using it', link: '/walrus-storage/using' },
            { text: 'Reference', link: '/walrus-storage/reference' },
          ],
        },
        {
          text: 'Sealed Storage',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/sealed-storage/' },
            { text: 'Using it', link: '/sealed-storage/using' },
            { text: 'Policies', link: '/sealed-storage/policies' },
            { text: 'Reference', link: '/sealed-storage/reference' },
          ],
        },
        {
          text: 'Access Gate',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/access-gate/' },
            { text: 'Using it', link: '/access-gate/using' },
            { text: 'Reference', link: '/access-gate/reference' },
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/meddleware-org' }],

    footer: {
      message: 'Documentation for the Meddleware Sui tools.',
      copyright: 'Meddleware · 0BSD',
    },
  },
})
