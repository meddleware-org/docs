# @meddleware/docs

User-facing documentation for the Meddleware Sui tools, served at
[`docs.meddleware.co.uk`](https://docs.meddleware.co.uk). Built with [VitePress](https://vitepress.dev).

One site, one section per service — **DAO**, **Walrus Storage**, **Sealed Storage**, **Access Gate** —
each answering *what it is*, *how to use it*, and *when to use it*, plus a reference layer (object/
event shapes and auto-generated SDK API).

## Structure

```
docs/
  index.md                 Landing / overview
  getting-started.md       Wallet basics, testnet vs mainnet, first steps
  architecture.md          How the four tools fit together
  dao/                     DAO console
  walrus-storage/          Decentralised blob storage
  sealed-storage/          Encrypted, access-gated storage
  access-gate/             NFT access gates
  .vitepress/
    config.ts              Nav, sidebar, search, brand theme
    theme/                 Design-token brand overrides
scripts/gen-api.mjs        TypeDoc autodoc for the SDK reference sections
```

## Develop

```sh
npm install
npm run dev        # gen:api (TypeDoc) + vitepress dev → http://localhost:5173
```

## Build

```sh
npm run build      # gen:api + vitepress build → dist/
docker build -t docs .
```

The build emits a static site to `dist/` (pinned via `outDir` in `.vitepress/config.ts`), which the
runtime image serves with the shared `static-server`.

## Content boundary

This site is **user-facing**. Developer integration guides, self-host instructions, and white-label
operator guides are intentionally **out of scope** — they live (planned) in each package's
README/CLAUDE.md and will surface on the future `dev.meddleware.co.uk`. The auto-generated SDK API
reference *is* included here (useful to users and bots) but without the "wire it into your app"
tutorials.

## License

BSD Zero Clause License (`0BSD`). See [LICENSE](LICENSE).
