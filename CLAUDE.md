# CLAUDE.md — @meddleware/docs

## What this is

The user-facing documentation site for the Meddleware Sui tools (`docs.meddleware.co.uk`), built with
VitePress. Static content only — no wallet, no chain reads, no accounting logic. One site with a
section per service (DAO, Walrus Storage, Sealed Storage, Access Gate).

## Architectural invariants

- **Static, thin, read-only.** No app logic. It documents the tools; it never talks to the chain or a
  wallet. Keep it a content site.
- **Single site, sectioned.** All services live under one VitePress instance (one nav, one search
  index, one theme). Do not split into per-service docs subdomains.
- **On-brand via design tokens.** Theming maps VitePress `--vp-c-brand-*` onto
  `@meddleware/design-tokens` (Oxblood/Indigo/Gold) in `.vitepress/theme/custom.css`. Do not hardcode
  brand hex — extend the token mapping so the docs track the apps.
- **Output is pinned to `dist/`.** `outDir` in `.vitepress/config.ts` resolves to the repo-root
  `dist/` so the Dockerfile's `COPY --from=build /app/dist` (shared static-server pattern) works
  unchanged. Do not rely on VitePress's default `.vitepress/dist`.
- **Reference = autodoc + curated tables, narrative = hand-authored.** `scripts/gen-api.mjs` runs
  TypeDoc over the SDK packages into each service's `api/` subtree (git-ignored, built fresh).
  Move/object/event tables are curated from source (Move has no clean autodoc). Prose is written by
  hand, seeded from the packages' READMEs/CLAUDE.md.
- **Autodoc fails soft.** A missing/unresolvable SDK writes a placeholder and warns rather than
  failing the whole build — an empty result means fix the SDK's `types`/`exports`, visible in CI logs.

## Content boundary (docs vs dev)

This site is **user-facing** — *what/how/when* for end users. **Out of scope** (deferred to
`dev.meddleware.co.uk`): developer integration guides, self-host instructions, "wire the SDK into
your app" tutorials, and white-label operator guides. Those are planned inside each package's
README/CLAUDE.md. The auto-generated **SDK API reference is included** here (useful to users/bots),
just without the integration how-to.

## Key files

| File | Purpose |
| --- | --- |
| `docs/.vitepress/config.ts` | Nav, sidebar, local search, `outDir`, dark-first appearance. |
| `docs/.vitepress/theme/` | Default theme + design-token brand overrides (`custom.css`). |
| `scripts/gen-api.mjs` | TypeDoc → Markdown SDK reference per service (resilient). |
| `docs/<service>/` | Per-service `index.md` (overview), `using.md`, `reference.md`, etc. |
| `Dockerfile` | node:22 build → static-server runtime (no VITE_* args). |
| `.github/workflows/publish.yml` | npm OIDC publish (`@meddleware/docs`, `NPM_PUBLISH` opt-in) + multi-arch image build → merge → cosign → attest. |

## Deploy

Image → `quay.io/meddleware-org/docs`. Wired into the cluster via `config/images.yaml` +
`post-bootstrap/docs/` (ingress `docs.meddleware.co.uk`) in the platform workspace, then a Cloudflare
Tunnel public hostname. See the platform repo's `docs/images/IMAGES.md` and
`docs/networking/CLOUDFLARE.md`.

## What NOT to do

- Do not add wallet/chain/accounting logic — this is a content site.
- Do not add developer integration or white-label how-to here (that's `dev.`).
- Do not split into multiple docs subdomains.
- Do not hardcode brand colours or the build output path.
