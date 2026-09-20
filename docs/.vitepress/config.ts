import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

// User-facing documentation for the Meddleware developer tools. Blockchain-agnostic site with
// per-chain sections; Sui is the first active chain. Output is pinned to the repo-root dist/ so
// the Dockerfile's `COPY --from=build /app/dist` (shared static-server pattern) works unchanged.
const outDir = fileURLToPath(new URL('../../dist', import.meta.url))
const srcDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  title: 'Meddleware Docs',
  description:
    'Developer tools for decentralised applications — documentation for the Meddleware Sui platform and beyond.',
  lang: 'en-GB',
  srcDir,
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
      {
        text: 'Blockchain',
        items: [
          {
            text: 'Active',
            items: [{ text: 'Sui', link: '/blockchain/sui/' }],
          },
          {
            text: 'Coming soon',
            items: [{ text: 'More blockchains', link: '/blockchain/' }],
          },
        ],
      },
      {
        text: 'Sui Tools',
        items: [
          { text: 'Tools hub', link: 'https://sui.meddleware.co.uk' },
          { text: 'DAO console', link: 'https://sui-dao.meddleware.co.uk' },
          { text: 'Walrus Storage', link: 'https://sui-walrus.meddleware.co.uk' },
          { text: 'Sealed Storage', link: 'https://sui-seal.meddleware.co.uk' },
          { text: 'Access Gate', link: 'https://sui-access-gate.meddleware.co.uk' },
        ],
      },
      { text: 'Developers →', link: 'https://dev.meddleware.co.uk' },
      // TODO white-label: operator nav entry (planned)
    ],

    sidebar: {
      '/blockchain/sui/': [
        {
          text: 'Sui',
          items: [
            { text: 'Overview', link: '/blockchain/sui/' },
            { text: 'Getting started', link: '/blockchain/sui/getting-started' },
            { text: 'How the tools fit together', link: '/blockchain/sui/architecture' },
          ],
        },
        {
          text: 'Walrus Storage',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/blockchain/sui/walrus-storage/' },
            { text: 'Walkthrough', link: '/blockchain/sui/walrus-storage/walkthrough' },
            { text: 'Reference', link: '/blockchain/sui/walrus-storage/reference' },
          ],
        },
        {
          text: 'Sealed Storage',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/blockchain/sui/sealed-storage/' },
            { text: 'Walkthrough', link: '/blockchain/sui/sealed-storage/walkthrough' },
            { text: 'Policies', link: '/blockchain/sui/sealed-storage/policies' },
            { text: 'Reference', link: '/blockchain/sui/sealed-storage/reference' },
          ],
        },
        {
          text: 'Access Gate',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/blockchain/sui/access-gate/' },
            { text: 'Walkthrough', link: '/blockchain/sui/access-gate/walkthrough' },
            { text: 'Reference', link: '/blockchain/sui/access-gate/reference' },
          ],
        },
        {
          text: 'DAO',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/blockchain/sui/dao/' },
            { text: 'Reference', link: '/blockchain/sui/dao/reference' },
          ],
        },
      ],
      '/blockchain/': [
        {
          text: 'Blockchains',
          items: [
            { text: 'Overview', link: '/blockchain/' },
            { text: 'Sui', link: '/blockchain/sui/' },
          ],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/meddleware-org' }],

    footer: {
      message: 'Documentation for the Meddleware developer tools.',
      copyright: 'Meddleware · 0BSD',
    },
  },
})
