# Security Policy

## Scope

This policy covers security issues in the `@meddleware/docs` source — the VitePress config and theme
(`docs/.vitepress/**`), the autodoc generator (`scripts/gen-api.mjs`), and the Markdown content
(`docs/**`).

It does not cover VitePress/TypeDoc themselves, `static-server` (which serves the built site — see
its own policy), or the `@meddleware/*` SDKs the autodoc consumes (see their own policies).

## Security model (invariants)

These invariants are load-bearing. A report demonstrating that any is violated is in scope and
treated as high severity:

1. **Static, thin, read-only.** The site has no app logic — it never talks to a wallet or the chain.
2. **Build-time autodoc integrity.** `gen-api.mjs` consumes the published `@meddleware/*` SDKs at
   build time from a committed lockfile and fails soft on a missing SDK; a docs build cannot pull an
   unexpected SDK release.
3. **No off-origin script/iframe in content or theme; brand via design tokens.** No Markdown page or
   theme file loads an off-origin resource, and no secret leaks into `dist/`.

## Supported versions

Only the latest published version receives security fixes.

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities. Report by emailing
**<security@meddleware.co.uk>** with a description, reproduction/PoC if available, and the version or
commit SHA tested. You will receive an acknowledgement within **3 business days** and a resolution
plan within **14 days** for confirmed issues; Critical issues (CVSS ≥ 9.0) are prioritised for
same-day acknowledgement.

## Disclosure

Once a fix is released, a security advisory will be published on the GitHub repository. Reporters may
be credited by name unless they prefer to remain anonymous.
