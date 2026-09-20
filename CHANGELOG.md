# Changelog

All notable changes to `@meddleware/docs` are documented here.

## [0.0.6] — 2026-09-18

Landing page and sidebar polish.

- Shortened tagline to "Built to work with leading blockchain ecosystems."
- Removed hero action buttons (redundant with the feature cards below)
- Added an accented brand-colour prompt ("Select a blockchain below…") where the buttons were,
  injected via the `home-hero-actions-after` VitePress layout slot
- Moved DAO sidebar section to the bottom (below Access Gate)
- All tool sidebar sections now start collapsed (`collapsed: true`); VitePress auto-opens the
  section containing the active page

## [0.0.5] — 2026-09-17

CI type-check fix and docs referencing.

- Fixed `TS18003: No inputs were found` by replacing `"include": ["docs/.vitepress", "scripts"]`
  with an explicit glob `"include": ["docs/.vitepress/**/*.ts"]`; `scripts/` has no `.ts` files
  so its presence caused TypeScript to find zero inputs in some CI environments
- Added `homepage` in `package.json` pointing to `https://docs.meddleware.co.uk/`

## [0.0.4] — 2026-09-17

Heading cleanup and naming improvements.

- Renamed `using.md` → `walkthrough.md` across all three tool sections (Walrus Storage, Sealed Storage, Access Gate); URLs updated accordingly
- Replaced all `# Feature — noun` H1 patterns with clean unhyphenated titles (`# Using Walrus Storage`, `# DAO reference`, `# Sealed Storage policies`, etc.)
- Sidebar and "Next" section links updated to "Walkthrough"
- Removed "fundraising/" qualifier from DAO governance placeholder copy

## [0.0.3] — 2026-09-17

Restructured to a blockchain-agnostic architecture with Sui as the first active chain.

- All Sui content moved under `/blockchain/sui/` URL hierarchy
- New blockchain-agnostic home page — hero + Sui card + "more blockchains coming soon" card
- New `/blockchain/` chain picker landing page
- New `/blockchain/sui/` Sui section landing page
- Navbar: `Blockchain` dropdown (Active / Coming soon groups) + `Sui Tools` dropdown
- Sidebar: per-path keyed — full Sui sidebar under `/blockchain/sui/`, minimal chain sidebar under `/blockchain/`
- Removed all references to the inactive `dev.meddleware.co.uk` URL; replaced with "forthcoming developer documentation"
- Bumped gen-api autodoc output paths to match new `/blockchain/sui/` hierarchy

## [0.0.1] — 2026-09-17

Initial release. VitePress documentation site for `docs.meddleware.co.uk` covering the four
Meddleware Sui tools: DAO, Walrus Storage, Sealed Storage, and Access Gate.

- Hand-authored narrative (what/how/when) for all four tools
- Auto-generated SDK API reference via TypeDoc (walrus-client, seal-client, nft-gate-client)
- On-brand via `@meddleware/design-tokens` (Oxblood/Indigo/Gold)
- Local search across all sections
- Dark-first appearance
