import { defineConfig, type DefaultTheme } from 'vitepress'
import { fileURLToPath } from 'node:url'
import { existsSync, readFileSync } from 'node:fs'

// User-facing documentation for the Meddleware developer tools. Blockchain-agnostic site with
// per-chain sections; Sui is the first active chain. Output is pinned to the repo-root dist/ so
// the Dockerfile's `COPY --from=build /app/dist` (shared static-server pattern) works unchanged.
const outDir = fileURLToPath(new URL('../../dist', import.meta.url))
const srcDir = fileURLToPath(new URL('..', import.meta.url))

// Sidebar groups for the canonical on-chain docs imported from the Sui Move package repos by
// scripts/gen-onchain.mjs (generated, git-ignored). Absent (e.g. `vitepress dev` without the
// prebuild step) → no on-chain groups; the rest of the site is unaffected.
const onchainSidebarFile = fileURLToPath(new URL('./generated/onchain-sidebar.json', import.meta.url))
const onchainSidebar: DefaultTheme.SidebarItem[] = existsSync(onchainSidebarFile)
  ? JSON.parse(readFileSync(onchainSidebarFile, 'utf8'))
  : []

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
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#5e1622' }],
  ],

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
      { text: 'Developers', link: 'https://dev.meddleware.co.uk' },
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
          text: 'Treasury',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/blockchain/sui/treasury/' },
            { text: 'Reference', link: '/blockchain/sui/treasury/reference' },
          ],
        },
        // Canonical on-chain docs (generated from the Move packages — scripts/gen-onchain.mjs).
        ...onchainSidebar,
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

  },
})
