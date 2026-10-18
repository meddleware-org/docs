# Security Audit — `docs`

**Classification:** Internal security review
**Project:** `repos/docs` — `@meddleware/docs`, VitePress user documentation (`docs.meddleware.co.uk`)
**Project type:** Static site (VitePress)
**Template:** AUDIT_TEMPLATE.md (2026-10-08) + AUDIT_TEMPLATE_TS.md (2026-10-08) + AUDIT_TEMPLATE_VUE.md (2026-10-08, hosting-header rows) + AUDIT_TEMPLATE_IMG.md (2026-10-08) + AUDIT_TEMPLATE_SITE.md (2026-09-30)
**Package manager / lockfile:** npm 11, committed (also copied into the image for SBOM tools)   **Module format:** ESM (build scripts `.mjs`, VitePress config and theme TypeScript)   **Publish model:** image + npm package (ships `docs/`, `scripts/` and config; `NPM_PUBLISH` opt-in, enabled — `@meddleware/docs` 0.0.33 is on npm)
**Runtime targets:** browser (static HTML); Node 24 for the build   **Peer dependencies:** none
**Generator:** vitepress 2.0.0-alpha.20 (vue 3.5.44, TypeScript 6.0.3), typedoc 0.28.20 with typedoc-plugin-markdown 4.14.0; vitest 5.0.5 (unit tests)
**Generated sources:** `scripts/gen-api.mjs` — TypeDoc over the installed `@meddleware/walrus-client` 0.0.28, `seal-client` 0.0.20, `access-gate-client` 0.0.9, `nft-gate-client` 0.0.17 (lockfile); `scripts/gen-onchain.mjs` — the Move packages' `docs/onchain` pages from `@meddleware/access-gate-sui` 0.0.6, `seal-policies-sui` 0.0.7, `sui-token-template` 1.0.9 (lockfile; `ONCHAIN_DOCS_ROOT` is a local preview override only)
**Audience:** end users (developer integration is `dev.meddleware.co.uk`; the generated SDK API reference is included here by design)
**Unpublished material:** this audit lives in `docs/audit/` and is excluded from the site by `srcExclude: ['audit/**']` (live `/audit/docs-audit` answers 404); `package.json` `files` negates it for the npm package and the build fails if an audit page reaches `dist/` (F15, 0.0.33)
**Images:** `quay.io/meddleware-org/docs:0.0.33@sha256:df851d1a230af4ab57fe8f58818f47a90d7875db8b7314c2c5687f5c511db6e6` (Docker Hub mirror, same digest; cosign keyless signature verified 2026-10-18 against the workflow-anchored identity, `verify-digests.sh` 16/16; SPDX SBOM attestation, build provenance). Superseded 0.0.32 was `sha256:b94c5b66…956d`
**Base images:** build `node:24-slim@sha256:0e0ff40c…f9b6`; runtime `quay.io/meddleware-org/static-server:0.1.8@sha256:e32cf42b…4000` in 0.0.33 (the 0.0.32 image deployed 2026-10-09 was on 0.1.7, `sha256:2e227311…2379`, Go 1.26.9)
**Runtime user:** `USER 65534:65534`   **Runtime FS:** read-only root, no writable mounts
**Deployed by:** `post-bootstrap/docs/overlays/default`; digest from `config/images.yaml`
**Build args:** `CSP` only (the Content-Security-Policy string) — not secret, not a test switch; no `VITE_*`
**Deployment status:** npm v0.0.33 and image `quay.io/meddleware-org/docs` 0.0.33 serving `docs.meddleware.co.uk` (`sha256:df851d1a…b6e6`; release tag `v0.0.33` = `7476a47`; released, signature verified and deployed 2026-10-18, rollout succeeded; 0.0.32 `sha256:b94c5b66…` was deployed 2026-10-09; live headers, an unknown path (404) and `/THIRD_PARTY_LICENSES` (200) re-checked 2026-10-18; live pages carry the republished testnet ids `access_gate` `0xd7ddaa94…`, PlatformConfig `0x3f81489d…`, `seal_policies` `0x0c8f7349…`, PolicyConfig `0xee0403ba…`)
**Review date:** 2026-09-19 (first pass) · re-verified 2026-10-03 · re-verified 2026-10-09 · fixes 2026-10-18 (0.0.33, released and deployed)
**Reviewer:** Internal review
**Severity ceiling:** Low — static content: no wallet, chain access or secrets. The surfaces are the build-time supply chain, content integrity, and readers following stale links.
**Status:** re-verified 2026-10-09; 0.0.33 fixes applied 2026-10-18 (commit `11865f9`; released and deployed 2026-10-18, signature verified, rollout succeeded)

---

## Executive summary

A VitePress site: hand-written guides, TypeDoc API pages generated from the published SDKs
(`gen:api`), and on-chain pages imported from the Move packages' published docs (`gen:onchain`). It
ships static HTML under a hash-pinned CSP, verified at build time by `check-csp-inline.mjs`.

All first-pass findings are resolved, adjudicated or positive. This pass found, and fixed in 0.0.25
(with static-server 0.1.4):

- **F11 (Low)** — the server's SPA fallback answered every unknown path with the home page and
  status 200, and served clean URLs that way too: a direct visit to any page returned the home page's
  HTML, and missing pages were invisible. Pages are now served from their own files and unknown paths
  get the site's 404 page with status 404.
- **F12 (Low)** — the Sui pages still presented the retired DAO console (`sui-dao.`, no longer
  resolving) and a `sui.` hub that never existed, and had no page for the Treasury console that
  replaced it (treasury-ui's docs link fell through to the home page). A Treasury section replaces
  the DAO section, and every tool table links live hosts.
- **F13 (Low)** — the weekly blocking link check had been failing since its first run (it treated
  internal clean URLs as missing files), so a red job had stopped carrying information. It now checks
  external links only; VitePress already fails the build on a broken internal link.

Re-verified 2026-10-09 (0.0.32; type-check clean, CSP check over 220 pages, audit gate 1 allowlisted /
0 open; live site `docs.meddleware.co.uk` read the same week):

- **F17 (Low, RESOLVED 0.0.30–0.0.32)** — the image release now runs the full CI workflow, scans the
  published image before cosign signs it, ships the lockfile for SBOM tools, serves
  `/THIRD_PARTY_LICENSES` (HTTP 200 live), runs as an explicit `USER 65534:65534` on static-server 0.1.7,
  and the pod sets `automountServiceAccountToken: false`.
- The republished testnet ids (`access_gate` `0xd7ddaa94…`, `seal_policies` `0x0c8f7349…`) are what the
  site shows; a first attempt (0.0.30) shipped without them and 0.0.31 corrected it. The pages were
  typed by hand, with no check against the recorded deployment (F14, now checked at build time).
- The newly applicable lens checks found six defects (F14, F15, F16, F18, F23, F24). **All six are
  RESOLVED in 0.0.33 (2026-10-18)**: **F14** `check-onchain-ids.mjs` fails the build when a page's id
  differs from the clients' `deployments`; **F15** the audit tree is negated in `files` and a build check
  fails if an audit page reaches `dist/`; **F16** the site has a vitest suite and CI and both release
  gates run it; **F18** `walrus-client ^0.0.28` and `sui-token-template ^1.0.9`; **F23** `SECURITY.md`
  names the on-chain generator and the build checks; **F24** both reference pages describe the v2
  audience-bound message.
- Accepted or maintainer items: **F19** blanket `connect-src https:` and **F20** the cosign identity
  pins the repository not the workflow (ACCEPTED-RISK, no single fix without a browser probe or a
  workspace-script change); **F21** registry mirror and credential inventory (DEFERRED, maintainer).
  **F22** (the npm gate was a subset of CI) is RESOLVED in 0.0.33: `npm-publish.yml` `verify` calls
  `node-ci.yml`.

The severity ceiling stays Low.

## Threat model / trust boundaries

| Actor | Holds / proves | Can do | Bounded by |
| --- | --- | --- | --- |
| Reader | nothing | read, follow links | static content; links to live first-party hosts (F12) |
| Content author | PR access | change Markdown and theme | review; VitePress escaping; CSP hash check |
| Build inputs | installed SDKs and Move packages | shape generated pages | lockfile-pinned versions; generators read only `node_modules` (or an explicit preview override) |
| Publish path | registry robot tokens; npm OIDC | push an altered image or package | tag-gated CI; Trivy then cosign; SBOM and provenance attestations |
| Base-image publisher, registry | image layers, the manifest served for a tag | ship altered bytes | digest pinning (build and runtime base, deployment by digest); signature verified by `verify-digests.sh` |
| Upstream packages the generators read | generated API and on-chain pages, ids shown to readers | change what readers see | lockfile-pinned versions (F5); generated output git-ignored; the ids typed into three reference pages are checked against the clients' `deployments` at build time (F14) |
| External link targets | content behind every outbound link | send readers elsewhere | weekly blocking lychee run (F13) |
| Build environment | which drafts or local overrides reach the output | ship a draft or a preview-root build | `srcExclude`; `ONCHAIN_DOCS_ROOT` is unset in CI and the image; `.dockerignore` excludes local env files |

## Severity scale

Critical / High / Medium / Low / Info / Positive.

## Scope

- **In scope (0.0.32):** `docs/.vitepress/{config.ts,theme/**}`, `docs/**/*.md`,
  `scripts/{gen-api,gen-onchain,check-csp-inline,third-party-licenses}.mjs`, `Dockerfile`, `.dockerignore`,
  workflows, `.github/{audit-gate.mjs,audit-allowlist.json,dependabot.yml}`, `SECURITY.md`,
  `post-bootstrap/docs/` (read-only).
- **Out of scope:** VitePress and TypeDoc internals; static-server (own audit); the SDKs and Move
  packages whose docs are imported (own audits).
- **Environment (2026-10-09):** `tsc --noEmit` (clean); `check-csp-inline.mjs` against the 0.0.32
  `dist` (220 HTML files, all inline scripts covered); audit gate (1 allowlisted advisory, 0 open);
  `npm pack --dry-run` (261 files, 2.3 MB); the published 0.0.32 and 0.0.22 tarballs listed; live
  headers, `/THIRD_PARTY_LICENSES`, deep links and the testnet ids of `docs.meddleware.co.uk`
  (HTTP reads 2026-10-10). The site has no test suite (`package.json` has no `test` script).
  Earlier (2026-10-03): stylelint, eslint, html-validate green; lychee over external links, 0 errors.

## Findings

### F1 — `npm install` in the image and CI

**Severity:** Low   **Disposition:** RESOLVED — `npm ci` everywhere.
**Remediation / evidence (2026-10-09):** re-read: the Dockerfile and every job in `node-ci.yml` and
`npm-publish.yml` run `npm ci`; no `npm install` remains.

### F2 — Unpinned npm upgrade in the publish job

**Severity:** Low   **Disposition:** RESOLVED — pinned (`npm@11.20.0`).
**Remediation / evidence (2026-10-09):** `npm-publish.yml` still installs `npm@11.20.0` before the OIDC publish.

### F3 — Floating base image

**Severity:** Info   **Disposition:** RESOLVED — `node:24-slim` and static-server pinned by digest.
**Remediation / evidence (2026-10-09):** the build stage is `node:24-slim@sha256:0e0ff40c…`, the runtime
stage `static-server:0.1.7@sha256:2e227311…` (Go 1.26.9; `dcbd9db`, 0.0.30); the Dependabot Docker group
keeps both current; the deployment references the image by digest from `config/images.yaml`.

### F4 — Lockfile with integrity hashes

**Severity:** Positive — re-checked 2026-10-09: committed, installed with `npm ci`, and copied into the
image (`/usr/share/doc/docs/package-lock.json`) so SBOM tools see the npm packages.

### F5 — Generators fail soft and fetch nothing

**Severity:** Positive — `gen:api` and `gen:onchain` read installed packages only; a missing input
writes a placeholder and a warning.

### F6 — No off-origin script, iframe or CDN

**Severity:** Positive — VitePress's two inline bootstrap scripts are allowed by hash, checked on
every build. Re-checked 2026-10-09: `check-csp-inline.mjs` runs in the image build against the `CSP`
argument (220 HTML files covered); the live header adds static-server's per-response `nonce-…` for
Cloudflare's script injection and keeps the same two hashes.

### F7 — No source maps, no secrets

**Severity:** Positive.

### F8 — `SECURITY.md`

**Severity:** Positive — present with all five sections; its three invariants hold. Scope wording: F23.

### F9 — Signed, attested images

**Severity:** Positive — multi-arch, cosign keyless, SPDX SBOM attestation, build provenance; since
0.0.32 the published image is also scanned before signing (F17).

### F10 — `ignoreDeadLinks` scoped to generated API pages

**Severity:** Positive — every hand-written link is checked by the build.

### F11 — SPA fallback on a multi-page site

**Severity:** Low   **Disposition:** RESOLVED (0.0.25; static-server 0.1.4 F-new)
**Where:** `Dockerfile`, `post-bootstrap/docs/base/deployment.yaml`
**Issue / impact:** VitePress links extensionless URLs (`cleanUrls`); static-server had no clean-URL
mapping, so with `SPA_FALLBACK=true` a direct visit to `/blockchain/sui/getting-started` returned
`index.html` (title "Meddleware Docs") and relied on client-side routing to show the page — readers
without JavaScript, crawlers and link checkers saw the home page — and every unknown path returned
200, hiding missing pages (F12 went unnoticed this way).
**Remediation / evidence:** static-server 0.1.4 `CLEAN_URLS` and `NOT_FOUND_PAGE`; the image and the
deployment set `CLEAN_URLS=true`, `NOT_FOUND_PAGE=/404.html` and no SPA fallback. Local run:
`/blockchain/sui/getting-started` 200 with its own title, `/no/such/page` 404 with VitePress's 404
page, missing assets plain 404. Re-checked 2026-10-09 on the live site (static-server 0.1.7 now):
`/no/such` answers 404 and the deployment still sets the three variables.

### F12 — Stale tool pages and links

**Severity:** Low   **Disposition:** RESOLVED (0.0.25)
**Where:** `docs/blockchain/**`, `docs/index.md`, sidebar
**Issue / impact:** the DAO section described a console retired from hosting (its host no longer
resolves) and governance features that do not exist; tool tables linked `sui.meddleware.co.uk`
(never deployed) and omitted the Token Deployer and Treasury; the Treasury console's own docs link
had no page. Readers were sent to dead hosts.
**Remediation / evidence:** `/blockchain/sui/treasury/` (overview and reference, matching
treasury-ui's tabs; the reference lists the fields and the two events actually read, the commission
formula and the total-balance rule); `/blockchain/sui/dao/` is a short "retired" note; tables link
`dash.`, the tools and `treasury.`. treasury-ui 0.0.11 points at the new page; dao-ui 0.1.28 and
treasury-ui no longer link non-existent dev pages. Every app's default docs and dev link was checked
against the built sites. Re-checked 2026-10-09: no `sui-dao` or `sui.meddleware.co.uk` link remains in
the tracked Markdown; `dash.`, `treasury.`, `sui-token-deployer.`, `sui-walrus.`, `sui-seal.` and
`sui-access-gate.` answer 200 and `sui-dao.` does not resolve.

### F13 — Blocking link check failed by construction

**Severity:** Low   **Disposition:** RESOLVED (`docs` main, CI only)
**Where:** `.github/workflows/node-ci.yml`
**Issue / impact:** lychee ran over the Markdown with `--root docs`, so internal clean URLs were
checked as files and always "not found"; the scheduled blocking job failed on its first run
(2026-09-28) and every run after would too, so nobody acted on it and real dead links (F12) were
indistinguishable.
**Remediation / evidence:** both lychee steps check `http`/`https` links only (the dev site's proven
configuration); internal links stay with the VitePress build. Local run over the current content: 0
errors. The blocking job was re-run by dispatch after the fix. Re-read 2026-10-09: both lychee steps in
`node-ci.yml` are unchanged (schemes `http`/`https`, npmjs.com excluded, `--accept 200,206,429`).

### F14 — Testnet ids in the reference pages are typed by hand

**Severity:** Low   **Disposition:** RESOLVED (0.0.33; `scripts/check-onchain-ids.mjs`, `tests/check-onchain-ids.test.mjs`; commit `11865f9`)
**Where:** `docs/blockchain/sui/access-gate/reference.md:11-12`, `docs/blockchain/sui/sealed-storage/reference.md:10-11`,
`docs/blockchain/sui/treasury/reference.md:10-11`
**Issue:** the three "Deployed identifiers (testnet)" tables hold the `access_gate` and `seal_policies`
package ids and the `PlatformConfig` and `PolicyConfig` object ids as literals. The SITE lens takes
on-chain facts from the canonical record through the generator, not from typed text. The values are correct
today: they match `Published.toml` of `@meddleware/access-gate-sui` 0.0.6 and `seal-policies-sui` 0.0.7, the
`deployments` exports of `access-gate-client` 0.0.8 and `seal-client` 0.0.19, and the live pages
(read 2026-10-10: only `0xd7ddaa94…`/`0x3f81489d…` and `0x0c8f7349…`/`0xee0403ba…` on those pages; the
generated on-chain overview names the superseded `0xa55789…`, `0x1a81ca…`, `0x0bedd0…` only as
superseded). Nothing detects drift: 0.0.30 shipped without its id edits and 0.0.31 had to follow
(CHANGELOG 0.0.31).
**Impact:** after the next republication the pages would show the previous package until someone edits
them; a reader copying the id would call a superseded package.
**Remediation / evidence:** 0.0.33 adds `scripts/check-onchain-ids.mjs`, run by `npm run build` before
VitePress. It loads `ACCESS_GATE_DEPLOYMENTS` and `SEAL_POLICIES_DEPLOYMENTS` from the installed clients
(`@meddleware/access-gate-client/deployments`, `@meddleware/seal-client/deployments`; the clients ship
TypeScript source, which the check transpiles with `typescript`), and fails the build when any
hand-written page (everything under `docs/` except `audit/`, `api/`, `wire-api/` and the generated
`onchain/` tree) carries a 32-byte `0x…` id that is not a current testnet id, or when a reference page
lacks a required id (access-gate and treasury: `access_gate` package and `PlatformConfig`;
sealed-storage: `seal_policies` package and `PolicyConfig`). It fails closed when a client or its record
cannot be read. Pinned by `tests/check-onchain-ids.test.mjs` (superseded id, missing id, mixed case,
ignored trees, short literals, missing page) and by a test that runs the check on this repository's real
pages with the installed clients. The pages stay typed (the tables are short and carry prose); the
drift can no longer ship. Verified with the 0.0.33 lockfile (access-gate-client 0.0.9, seal-client
0.0.20): the three pages match.

### F15 — The audit file would ship in the npm package

**Severity:** Low   **Disposition:** RESOLVED (0.0.33; `package.json` `files`, `scripts/check-dist-no-audit.mjs`, `tests/package-contents.test.mjs`; commit `11865f9`)
**Where:** `package.json` `files` (`"docs"`), `.npmignore`
**Issue:** `files` whitelists the whole `docs/` tree and `.npmignore` excludes only the generated
`api/`, `onchain/` and `generated/` subtrees. `npm pack --dry-run` (2026-10-09) lists
`docs/audit/docs-audit.md`. The published 0.0.32 and `@meddleware/dev` 0.0.22 tarballs do not contain an
audit (the files were relocated afterwards and are untracked until committed), so the next release would
be the first to publish one. The site itself is safe: `srcExclude: ['audit/**']`, and the live
`/audit/docs-audit` answers 404. No build step asserts that the audit page is absent from `dist/`.
**Impact:** an internal review (including DEFERRED items and security reasoning) published in a public
package, against SITE-M4 and the SITE *Drafts & unpublished material* category.
**Remediation / evidence:** a root `.npmignore` does not filter a `files` allowlist, so the fix is
`"!docs/audit"` and `"!docs/audit/**"` in `package.json` `files` (the `.npmignore` also names the
tree). `npm pack --dry-run` (2026-10-18, 264 files) lists no `docs/audit` entry; the test
`tests/package-contents.test.mjs` runs `npm pack --dry-run --json` and fails if one appears. The build
now ends with `scripts/check-dist-no-audit.mjs`, which fails if `dist/` holds a path named `audit`
(or `*-audit.*`); the check is unit-tested on a temporary tree.

### F16 — The CI workflow has no `npm test` step

**Severity:** Info   **Disposition:** RESOLVED (0.0.33; `npm test` in `node-ci.yml`, `npm-publish.yml` `verify` calls `node-ci.yml`; commit `11865f9`)
**Where:** `.github/workflows/node-ci.yml`; `docker-publish.yml` `verify` calls it; `npm-publish.yml` `verify`
**Issue:** `node-ci.yml` runs the audit gate, type-check, the three linters, the build and the licence
check, but no `npm test`; the image release's `verify` job is a call to it (0.0.32, `8e7c81f`), so unit
tests would no longer gate the release, and the comment in `docker-publish.yml` ("type-check, lint,
tests, build, licences") overstates it. The npm job's `verify` runs `npm run test --if-present`.
**Impact:** none today: `package.json` defines no `test` script and the repository has no test files,
so no test is skipped. The first test added would not run in CI or in the release gate (TS lens: every
test project that exists runs in CI).
**Remediation / evidence:** the site gained a test suite (vitest 5.0.5; `npm test` = `vitest run`; 11
tests in `tests/`: the on-chain id check F14 and the package-contents and dist checks F15). `node-ci.yml`
runs `npm test` (no `--if-present`, the script exists), and `npm-publish.yml` `verify` now calls
`./.github/workflows/node-ci.yml` as the image release does, so both release paths run the unit tests.
The comment in `docker-publish.yml` names the checks accurately. Verified by reading all three workflows
and `package.json` 2026-10-18.

### F17 — Image release gate, scan, notices and runtime user

**Severity:** Low   **Disposition:** RESOLVED (0.0.30 `dcbd9db`, 0.0.32 `8e7c81f`)
**Where:** `.github/workflows/docker-publish.yml`, `Dockerfile`, `scripts/third-party-licenses.mjs`, `post-bootstrap/docs/base/deployment.yaml`
**Issue:** the image release was gated by a subset of CI, the published image was not scanned before
signing, the lockfile was not in the image (the SBOM saw only the base), no third-party licence texts were
served with the bundled npm code, and the runtime user was only inherited from the base.
**Impact:** a tag could ship what CI would have refused; an SBOM that misses the bundled dependencies;
redistributed MIT/Apache code without its notices.
**Remediation / evidence:** `verify` calls `node-ci.yml` (`workflow_call`) and all four build jobs
`need` it; the public job runs Trivy on the pushed digest (CRITICAL/HIGH, fixable only, `exit-code: 1`)
before `cosign sign`, then an SPDX SBOM attestation and build provenance for quay.io and Docker Hub,
with no `continue-on-error` on the public path; the Dockerfile runs `npm run licenses` in the build
stage, copies `package-lock.json` to `/usr/share/doc/docs/`, and CI runs `check:licenses`;
`/THIRD_PARTY_LICENSES` returns HTTP 200 live (2026-10-10); the runtime base is static-server 0.1.7
(Go 1.26.9) with an explicit `USER 65534:65534`; the pod sets `automountServiceAccountToken: false`,
`runAsNonRoot` uid 65534, read-only root, all capabilities dropped, `RuntimeDefault` seccomp, probes and
limits; the digest is identical in `config/images.yaml` and the overlay; all images cosign-verified
2026-10-09 (`verify-digests.sh`, 16/16). Not run: a Trivy *config* scan of the Dockerfile and manifests
(the image scan runs at release).

### F18 — A first-party dependency is one release behind

**Severity:** Low   **Disposition:** RESOLVED (0.0.33; commit `11865f9`)
**Where:** `package.json` (`@meddleware/walrus-client ^0.0.26`, `@meddleware/sui-token-template ^1.0.7`)
**Issue:** `walrus-client` 0.0.27 is the latest published release (it fixed `fetchOwnedWalrusBlobs`), so
the generated Walrus reference describes 0.0.26. The template range `^1.0.7` resolves to 1.0.8 through the
lockfile (`npm ls` 2026-10-09), which is what the on-chain pages need, but the range does not say so.
**Impact:** the Walrus API reference lags the SDK by one patch; a lockfile regeneration could in principle
resolve either version of the template.
**Remediation / evidence:** 0.0.33 sets `@meddleware/walrus-client ^0.0.28` (0.0.27 was superseded by
the time of the fix) and `@meddleware/sui-token-template ^1.0.9` (the range names the version the
lockfile resolves), and moves every other first-party dependency to its latest published release:
access-gate-client 0.0.9, seal-client 0.0.20, nft-gate-client 0.0.17, design-tokens 0.1.10 (ui 0.1.31,
access-gate-sui 0.0.6 and seal-policies-sui 0.0.7 were current). Third-party tooling bumped within its
range (`@mysten/sui` 2.36.0, `@mysten/seal` 1.5.0, `@mysten/walrus` 1.2.35, eslint 10.13.0, stylelint
17.16.0, typedoc plugin 4.14.0, vue 3.5.44, ...). Held back deliberately: TypeScript 6 (7.0 is a major),
`@types/node` 24 (Node 24 LTS), VitePress 2.0.0-alpha.20 (pinned pre-release). The build, the CSP check
and the on-chain id check pass with the new packages; the generated reference describes walrus-client
0.0.28.

### F19 — `connect-src` allows any https origin

**Severity:** Info   **Disposition:** ACCEPTED-RISK
**Where:** `Dockerfile` (`CSP` argument); live header read 2026-10-10
**Issue:** `connect-src 'self' https:` and `img-src 'self' data: blob: https:` are blanket allowances,
copied from the application images; the Dockerfile comment justifies them with operator-configured RPC
and relay hosts, which this static site does not have.
**Impact:** an injected script could send data to any https host. Script injection is the prerequisite,
and `script-src 'self'` with two hashes and a nonce, no off-origin script (F6) and no `v-html`/`eval` in
the theme is the control on that; the site holds no secret or session.
**Remediation / evidence:** accepted for now; tightening `connect-src` to `'self'` is a suggestion that
needs a browser probe of the local search and the footer first (not done; 2026-10-18: left as is, no single safe fix without that probe).

### F20 — The cosign identity pins the repository, not the workflow

**Severity:** Info   **Disposition:** ACCEPTED-RISK
**Where:** `bootstrap/images/verify-digests.sh` (workspace); this repository publishes no verify command
**Issue:** the cluster check accepts any workflow identity of `github.com/meddleware-org/docs`.
**Impact:** a workflow added by someone with write access could sign an image the check would accept.
**Remediation / evidence:** the repository is the signing boundary; anchoring to
`docker-publish.yml@refs/tags/v*` is a `COSIGN_IDENTITY_REGEXP` override in the workspace script. The
deployed digests verified 2026-10-09 (0.0.32) and 2026-10-18 (0.0.33), 16/16 both times; the 2026-10-18 run used the workflow-anchored identity `docker-publish.yml@refs/tags/v*`, which is narrower than the repository-wide check this finding describes (disposition left to the workspace audit).

### F21 — Self-hosted registry mirror and registry credentials

**Severity:** Info   **Disposition:** DEFERRED (maintainer; `OPERATOR_TASKS.md` "Image registry credentials — record scope and rotation")
**Where:** `docker-publish.yml` private build and merge jobs (`continue-on-error: true`); `QUAY_TOKEN`, `DOCKERHUB_TOKEN`
**Issue:** the mirror jobs fail without registry credentials and never sign; the quay.io and Docker Hub
tokens are long-lived and not yet inventoried.
**Impact:** the mirror may lag; a leaked token could push an unsigned tag (the cluster pins digests and
verifies signatures, so it would not run).
**Remediation / evidence:** the mirror is listed as best-effort; the public jobs have no
`continue-on-error`. The credential inventory (scope, holder, expiry, rotation) is the maintainer item.

### F22 — The npm publish gate is a subset of CI

**Severity:** Low   **Disposition:** RESOLVED (0.0.33; `npm-publish.yml` `verify` calls `node-ci.yml`; commit `11865f9`)
**Where:** `.github/workflows/npm-publish.yml`
**Issue:** the npm job's `verify` runs `npm ci`, the audit gate, type-check and `npm run test
--if-present`, not the full CI workflow (linters, build, licence check). The image release (F17) does
run the full workflow on the same tag.
**Impact:** a tag could publish the source package while the image job refuses the same commit. The
package is source (`docs/`, `scripts/`, config), not the built site.
**Remediation / evidence:** 0.0.33: the npm job's `verify` is a call to `./.github/workflows/node-ci.yml`
(audit gate, type-check, the three linters, unit tests, build with the on-chain id check, licence check),
the same workflow the image release runs on the tag; `publish-npm` `needs: verify`. The other controls
stand: OIDC-published with provenance, tag == version checked, idempotent, opt-in through `NPM_PUBLISH`.

### F23 — `SECURITY.md` scope omits the on-chain generator

**Severity:** Info   **Disposition:** RESOLVED (0.0.33; `SECURITY.md`; commit `11865f9`)
**Where:** `SECURITY.md` (Scope, invariant 2)
**Issue:** the scope and the build-time integrity invariant name `scripts/gen-api.mjs` only;
`scripts/gen-onchain.mjs` (Move-package pages), `check-csp-inline.mjs` and
`third-party-licenses.mjs` are not named. Invariants 1 and 3 hold as written.
**Impact:** documentation only; a reporter reading the scope would not know the on-chain import is covered.
**Remediation / evidence:** `SECURITY.md` scope now names `gen-api.mjs`, `gen-onchain.mjs`,
`check-onchain-ids.mjs`, `check-dist-no-audit.mjs`, `check-csp-inline.mjs` and
`third-party-licenses.mjs`, and invariant 2 reads "Build-time import integrity" for both generators
(published packages, lockfile-pinned) and records the id check and the audit exclusion.

### F24 — The reference pages describe the pre-v2 access-proof message

**Severity:** Low   **Disposition:** RESOLVED (0.0.33; the two reference pages; commit `11865f9`)
**Where:** `docs/blockchain/sui/access-gate/reference.md:41` and `:50-52`;
`docs/blockchain/sui/walrus-storage/reference.md:49`
**Issue:** both pages say the wallet signs `nft-gate:access:<nonce>`. Since nft-gate 0.0.19 and
nft-gate-client 0.0.16 (2026-10-08) the signed message is `nft-gate:access:v2`, multi-line, binding the
gateway origin, gate id, network, nonce and (single-use gateways) the consume digest, so a signature is
useless at any other gateway, gate or network. The Access Gate page also says the developer
documentation for running a gateway is "forthcoming"; it exists (`dev.meddleware.co.uk/sui/access-gate/gateway`,
itself behind on v2, dev audit F8).
**Impact:** readers and integrators learn a message that every current gateway and relay rejects. The
behaviour is unchanged for end users, who never see the message; the generated wire-protocol API pages
(from nft-gate-client 0.0.16) are correct.
**Remediation / evidence:** the Access Gate page now states the challenge and the v2 message
(`nft-gate:access:v2`, `origin`, `gate`, `network`, `nonce`, `consume` for single-use gateways; rebuilt by
the gateway from its own origin, gate and network), the optional `consumeDigest` and the strict padded
base64 token, and links the developer gateway guide and the generated `personalMessage` reference; the
Walrus Storage page describes the same v2 message and links the generated reference. Checked against
`nft-gate-client` 0.0.17 `README` and `vectors.json` semantics (2026-10-18). The "forthcoming developer
documentation" notes in the Access Gate reference, the Sui index and the Sealed Storage policies page
now link the developer site, where those guides exist. The code samples in `walrus-storage/reference.md`
(`UploadResult`, `OwnedBlob`, `StorageCost`) were hedged sketches that omitted fields; they now match
walrus-client 0.0.28 exactly (`blobObjectId`, `objectId`/`startEpoch`/`endEpoch`/`certified`/`deletable`,
`storageCost`/`writeCost`/`totalCost`).

## Section A — Invariant verification matrix

| # | Invariant | Enforced at | Proven by | Status |
| --- | --- | --- | --- | --- |
| I1 | Static content only | source | build; grep | HOLDS |
| I2 | Generators read only pinned, installed packages | `gen-api.mjs`, `gen-onchain.mjs` | source; lockfile | HOLDS (F5) |
| I3 | Every inline script is allowed by the CSP hashes | `check-csp-inline.mjs` in the image build | build | HOLDS (F6) |
| I4 | Internal links resolve | VitePress dead-link check | build | HOLDS (F10) |
| I5 | External links resolve | lychee (scheduled, blocking) | CI | HOLDS (F13) |
| I6 | Each URL serves its own page; unknown URLs return 404 | static-server `CLEAN_URLS`, `NOT_FOUND_PAGE` | local image probe | HOLDS (F11) |
| I7 | Product pages describe live products only | content review | link and host probe | HOLDS (F12) |
| I8 | On-chain ids shown to readers equal the recorded deployment | typed literals in three reference pages | `check-onchain-ids.mjs` in `npm run build` against the clients' `deployments`; `tests/check-onchain-ids.test.mjs` | HOLDS — F14 |
| I9 | Drafts and the audit file are absent from every published artefact | `srcExclude: ['audit/**']` (site); `files` negation (npm package); `check-dist-no-audit.mjs` | live `/audit/docs-audit` 404; `npm pack --dry-run` lists no audit entry; `tests/package-contents.test.mjs` | HOLDS — F15 |
| I10 | The unit tests run on every change and every release | `npm test` in `node-ci.yml`, which both release workflows call | vitest, 11 tests | HOLDS — F16 |
| I11 | The release ships only what full CI accepted, scanned and signed | `docker-publish.yml` `verify` → `node-ci.yml`; Trivy before cosign | workflow read 2026-10-09 | HOLDS (F17) |
| I12 | Hand-written protocol descriptions match the shipped wire format | reference pages | read against nft-gate-client 0.0.17 `README` (v2 message) | HOLDS — F24 |

### Lens categories

| Lens | Category | Status |
| --- | --- | --- |
| SITE | Generated-content integrity | HOLDS (I2) — both generators read lockfile-pinned installed packages; output (`docs/**/api/`, `wire-api/`, `blockchain/sui/onchain/`, `.vitepress/generated/`) is git-ignored and `.dockerignore`d; `ONCHAIN_DOCS_ROOT` is a local preview override only. The generators fail soft (placeholder pages), so a missing input would not fail a release build on its own |
| SITE | On-chain facts | HOLDS — typed literals, build-time checked against the clients' `deployments` (I8, F14); the generated on-chain pages come from the packages and name superseded ids only as superseded |
| SITE | Drafts & unpublished material | site HOLDS (`srcExclude`, live 404); npm package negates the tree and the build checks `dist/` (I9, F15) |
| SITE | No sensitive content | HOLDS — grep over the tracked Markdown and theme finds no secret, internal host or private-key text; audience separation stated (end users here, developers on `dev.`); the audit is not published (F15 for npm) |
| SITE | Links | HOLDS (I4, I5) — VitePress fails on internal dead links; weekly blocking lychee run, npmjs.com excluded (403 to CI runners) |
| SITE | Inline scripts | HOLDS (I3) — two hashes in the `CSP` argument, `check-csp-inline.mjs` in the image build; the live header adds only static-server's nonce |
| SITE | Accuracy against code | HOLDS for the SDK pages (generated) and for the limits that cite a date (event retention, measured 2026-10-08); the hand-written access-proof message is v2 (F24); id tables checked (F14) |
| SITE | Serving semantics | HOLDS (I6) |
| VUE | Hosting headers | HOLDS — live (2026-10-10): CSP (`default-src 'self'`, `script-src 'self'` + two hashes + nonce, `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'self'`, `upgrade-insecure-requests`), HSTS 1 year, nosniff, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options: SAMEORIGIN`; blanket `connect-src https:` is F19 |
| TS | Compiler strictness, assertions, validation, money, network I/O, encoding, dynamic code | HOLDS — `strict: true` over the VitePress config and theme (`tsc --noEmit` in CI); the scripts are `.mjs`, make no network call (they read `node_modules`) and run `typedoc` through `execFileSync` with fixed arguments; no `v-html`, `eval` or `fetch` in the theme; no amounts |
| TS | Supply chain | HOLDS — `npm ci`, audit gate in CI and the npm job (1 allowlisted, 0 open), `npm@11.20.0` pinned in publish; packaging F15; first-party ranges at latest (F18) |
| TS | Test projects in CI | HOLDS — vitest suite run by `node-ci.yml`, which the image and npm releases call (F16) |
| IMG | Base images, build context, reproducible build, no secrets, runtime user, scan, SBOM and notices | HOLDS (F17) — digest-pinned `node:24-slim` and static-server 0.1.8 (0.0.33); `.dockerignore` excludes `node_modules`, `dist`, caches, generated output, `.git`, `.github` and `.env*.local`; `npm ci`; the only `ARG` is the public `CSP`; Trivy before cosign; lockfile in the image; `/THIRD_PARTY_LICENSES` served |
| IMG | Verification command | GAP accepted — the identity pins the repository (F20) |
| IMG | Deployment pinning | HOLDS — digest in `config/images.yaml` and the overlay; the base manifest's tag (`0.0.1`) is overridden by the overlay digest and is cosmetic |

## Section B — Supply-chain, publish-authority & capability matrix

### B.1 Dependency & CVE risk

| Dependency | Pinned version | Liveness dependency? | CVE / audit status | Notes |
| --- | --- | --- | --- | --- |
| `vitepress`, `typedoc` + plugins | vitepress 2.0.0-alpha.20, typedoc 0.28.20, typedoc-plugin-markdown 4.14.0 (lockfile) | build only | clean | VitePress is a pre-release (alpha); the CSP check fails the build when its inline scripts change |
| `@meddleware/*` clients | access-gate-client `^0.0.9`, seal-client `^0.0.20`, nft-gate-client `^0.0.17`, walrus-client `^0.0.28` (all latest, 2026-10-18) | build only (API pages) | clean | F18 |
| `@meddleware/access-gate-sui`, `seal-policies-sui`, `sui-token-template` | `^0.0.6`, `^0.0.7`, `^1.0.9` (the lockfile resolves 1.0.9, the latest) | build only (on-chain pages) | clean | F18 |
| `@meddleware/ui`, `design-tokens` | `^0.1.31`, `^0.1.10` (latest) | theme | clean | |
| `@mysten/sui`, `seal`, `walrus` | `^2.36.0` (ADR-0001 baseline), `^1.5.0`, `~1.2.35` | build only (TypeDoc input) | clean | `~1.2.32` is a deliberate tilde so the reference follows the clients' installed SDK (CHANGELOG 0.0.26); no `@mysten/bcs` or wallet-standard; vitest 5.0.5 runs the build-check tests |
| Link checker | lychee-action pinned by SHA | none | — | CI only |
| `node:24-slim` / `static-server` | digest-pinned / 0.1.8 (0.0.33, deployed 2026-10-18; 0.0.32 was on 0.1.7) | build / runtime | Trivy at release (F17); Go 1.26.9 | — |
| dev tooling | lockfile | no | GHSA-vfj7-8cjw-p6xm allowlisted to 2027-01-01 | TS lens B.TS-3 |

Install-time code (TS B.TS-2): the lockfile has one lifecycle script, `fsevents` (dev, optional, macOS
only); no `allowScripts`, no `overrides`, no `prepare`/`postinstall` in `package.json`. `files`: `docs`,
`scripts`, `tsconfig*.json`, `CHANGELOG.md` (`npm pack --dry-run` 2026-10-18: 264 files; no tests,
fixtures, `.env*` or audit file, F15). Node range `^22.18.0 || >=24.12.0`; CI and the image use 24.

### B.2 Publish authority, capabilities & secret custody

| Authority / secret | Where held | Custody | Gates | Rotation |
| --- | --- | --- | --- | --- |
| npm publish | GitHub Actions | OIDC + provenance (`NPM_PUBLISH`) | package | n/a |
| `QUAY_TOKEN`, `DOCKERHUB_TOKEN`, `PRIVATE_REGISTRY_*` | GitHub secrets | long-lived robot accounts (inventory: `OPERATOR_TASKS.md`) | image push | F21 |
| image signing | GitHub Actions | cosign keyless | images | n/a |

CI & release integrity: actions pinned by SHA (workflows read 2026-10-09); explicit `permissions:` per
workflow and job (`id-token`/`attestations` only on the signing job, `id-token` only on the npm publish
job); OIDC publish with a tag == version check and an idempotent registry check; npm client pinned; image
release = full CI via `workflow_call` + Trivy + cosign + SPDX SBOM attestation + provenance, no
`continue-on-error` on the public path (F17; the CI workflow runs the unit tests, F16; the npm gate
calls the same workflow, F22); `npm ci` everywhere; audit gate in CI and, through `node-ci.yml`, the npm job; Dependabot weekly and grouped for
npm, Docker and Actions (`.github/dependabot.yml`); no test-only build mode exists; no job spends real
funds.

### B.VUE-1 Hosting headers

Live headers on `docs.meddleware.co.uk`, read 2026-10-10: `Content-Security-Policy` (`default-src 'self'`,
`script-src 'self'` with the two VitePress hashes `sha256-2xX7WPAp…`, `sha256-ng8W1FnG…` and a
per-response nonce, `style-src 'self' 'unsafe-inline'`, `img-src 'self' data: blob: https:`, `connect-src
'self' https:`, `worker-src 'self' blob:`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`,
`frame-ancestors 'self'`, `upgrade-insecure-requests`), `Strict-Transport-Security` (1 year,
includeSubDomains), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
`Permissions-Policy`, `X-Frame-Options: SAMEORIGIN`. The CSP is static-server's (`CONTENT_SECURITY_POLICY`
from the `CSP` build argument); no static host and no `_headers` file. `'unsafe-inline'` is for styles
only. `dev.meddleware.co.uk` serves the same headers. The blanket `https:` in `connect-src` and `img-src`
is F19. The inline-script rule is enforced at build time by `check-csp-inline.mjs` (SITE and VUE lenses).

### B.VUE-2 / B.IMG Build inputs and artifacts

`node:24-slim@sha256:0e0ff40c…` builder and `static-server:0.1.8@sha256:e32cf42b…` runtime (0.0.33, deployed 2026-10-18; the 0.0.32 image was on 0.1.7), both
digest-pinned (Dependabot Docker group); `npm ci`; `.dockerignore` excludes local installs, build
output, VCS data and every `.env*.local`; `npm run build && npm run licenses` run in the build stage; the
runtime stage copies `dist` and the lockfile only; `USER 65534:65534`; the only `ARG` is the public `CSP`;
VitePress emits no source maps for the production build; the deployment is read-only root, `runAsNonRoot`
uid 65534, no privilege escalation, all capabilities dropped, `RuntimeDefault` seccomp,
`automountServiceAccountToken: false`, readiness and liveness probes on `/`, requests 5m/16Mi and limits
100m/48Mi; digest `sha256:b94c5b66…` in both `config/images.yaml` and the overlay; cosign signature
verified 2026-10-09 (F20). Not run: a Trivy *config* scan of the Dockerfile and manifests (F17).

### B.SITE Generator inputs

| Input | Version / pin | Used for |
| --- | --- | --- |
| vitepress / typedoc | 2.0.0-alpha.20 / 0.28.20 (lockfile) | site build / SDK reference |
| walrus-client, seal-client, access-gate-client, nft-gate-client | 0.0.28, 0.0.20, 0.0.9, 0.0.17 (lockfile) | `gen-api.mjs` |
| access-gate-sui, seal-policies-sui, sui-token-template | 0.0.6, 0.0.7, 1.0.9 (lockfile) | `gen-onchain.mjs`; ids cross-checked by `check-onchain-ids.mjs` |
| lychee | `lycheeverse/lychee-action` v2.9.0 (SHA) | external-link check |

Latest-ID rule (checked at build time since 0.0.33): the generated on-chain pages and the typed tables show a package id that is both
published-at and original-id (first versions of the republished packages); no page shows a call target
and a type id that differ.

## Section C — Test-coverage & hermetic/live split

### C.1 Coverage grade — N/A (static content)

No unit tests exist (framework: none; `package.json` has no `test` script). The gates are type-check, three
linters (stylelint, eslint with vuejs-accessibility, html-validate over the theme components), the
build's internal dead-link check, the CSP hash check (220 pages), the licence-notice check and the
external link checks. All run in `node-ci.yml` except the CSP check, which runs in the image build (it
fails the image). The production build and both generators run from a clean checkout in CI.

### C.2 Hermetic vs. live paths

| Path | Hermetic? | Deferred to | Tracking |
| --- | --- | --- | --- |
| Build, internal links, CSP | yes | — | CI |
| External links | no | CI (report-only on push, blocking weekly) | lychee |
| Served behaviour (clean URLs, 404, headers, notices) | no | deployment | live probe 2026-10-09/10 (deep links 200, unknown path 404, headers, `/THIRD_PARTY_LICENSES` 200) |

## Section D — Deployment-readiness gates

### pre-localnet

- [x] build, type-check and linters green; no secrets in source (2026-10-09)
- [x] generators read pinned inputs (lockfile); generated output git-ignored; drafts outside the published site (`srcExclude`)

### pre-testnet

- [x] deployed with digest pinning; CSP and HSTS verified (re-read on 0.0.33 on 2026-10-18 with `curl -I`: CSP, HSTS, `nosniff`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`)
- [x] 0.0.33 deployed by digest (2026-10-18; 0.0.32 on 2026-10-09); live probe of a deep link and an unknown path, headers and `/THIRD_PARTY_LICENSES` (2026-10-10 on 0.0.32; on 0.0.33 on 2026-10-18: `/` 200, an unknown path 404, `/THIRD_PARTY_LICENSES` 200, headers present)
- [x] inline scripts hash-covered and checked at build time (`check-csp-inline.mjs`, 220 pages); link check in CI (F13)
- [x] image: digest-pinned bases, non-root, restricted pod, probes and limits, signed with SBOM and provenance, scanned before signing (F17)
- [x] on-chain facts checked against the canonical record — `check-onchain-ids.mjs` fails the build on drift (F14, 0.0.33; `tests/check-onchain-ids.test.mjs`)
- [x] every test project runs in CI — vitest suite (11 tests) in `node-ci.yml`, called by both release workflows (F16, F22, 0.0.33)
- [x] the audit file is excluded from the npm package — `files` negation, `npm pack --dry-run` clean, `check-dist-no-audit.mjs` and `tests/package-contents.test.mjs` (F15, 0.0.33)
- [x] hand-written wire-format text matches nft-gate-client 0.0.17 — v2 audience-bound message on both reference pages (F24, 0.0.33)

### pre-mainnet

- [ ] mainnet identifiers in the Treasury, Access Gate and Sealed Storage references once published — mainnet-blocked
- [x] no sensitive or operator-only content published; audience separation stated (end users here, developers on `dev.`)
- [x] API/flag/env pages generated (SDK reference) or version-stamped (event retention, 2026-10-08)
- [ ] registry credential inventory and rotation (F21) — `OPERATOR_TASKS.md` "Image registry credentials"
- [ ] external review — maintainer item (`OPERATOR_TASKS.md` "Funding, grants and an external audit")

## Cross-project themes

- **Retired features** — retiring a product must also retire its pages and links (F12; landing F1).
- **Signals that stay red** — a check that always fails hides real failures (F13).
- **Supply chain & release integrity** — lockfile (also shipped in the image); first-party libraries at
  their latest versions (F18); signed images with SBOM and provenance, Trivy before signing,
  SHA-pinned actions, grouped Dependabot; expiring audit allowlist; publish authority in B.2.
- **Wire-format coupling** — the site restates the gateway proof message by hand in two reference pages;
  both describe protocol v2 since 0.0.33 (F24) and link the generated nft-gate-client API pages.
- **On-chain-truth boundary** — the site states no accounting; fees and terms come from the generated
  on-chain pages; the typed ids are checked against the clients' records at build time (F14).
- **Deployment readiness** — Section D.
- **Chain-access layering** — no chain access; the ids shown are the latest on-chain version (matching
  `Published.toml` and the clients' `deployments`), typed by hand and checked at build time (F14).

## Normative requirements (MUST / MUST NOT)

- **TS-M1–TS-M9** — hold where applicable (TS-M9: no peer dependencies; every test project runs in CI,
  F16; TS-M7 packaging excludes the audit tree, F15).
- **IMG-M1–IMG-M8** — hold; IMG-M8's verification command pins the repository only (F20).
- **VUE-M8** — holds (CSP and HSTS on the one hosting path, B.VUE-1).
- **SITE-M1, M3–M5** — M1 holds, M3 holds (site and npm package, F15), M4 holds, M5 holds; **SITE-M2**
  (on-chain facts from the canonical record) is enforced mechanically for the typed ids (F14). The
  *Accuracy against code* category has no open defect (F24).

## Implementation suggestions (SHOULD / MAY)

- SHOULD add a Token Deployer user page (the tool has none; the app links the docs root).
- MAY export `MAX_OWNED_BLOB_PAGES` from walrus-client so the API page's link resolves (TypeDoc
  warning).
- SHOULD tighten `connect-src` to `'self'` after a browser probe of search and the footer (F19).
- MAY run a Trivy configuration scan of the Dockerfile and manifests in CI.

## Open questions (`OQ#`)

- **OQ1** — Replace `npm install` with `npm ci`? (Decided: yes — see F1.)
- **OQ2** — Pin the npm used for publishing? (Decided: yes, `npm@11.20.0` — see F2.)
- **OQ3** — Pin the base image? (Decided: digest-pinned — see F3.)
- **OQ4** — Should the docs source be published as an npm package at all? Today it is opt-in and
  enabled (`NPM_PUBLISH`); see F15, F22 (both closed in 0.0.33).

## Risks

- **Content drift** — hand-written pages can fall behind the products; the link checks catch dead
  hosts, not stale descriptions.
- **Pre-release generator** — VitePress is an alpha; a bump can change the emitted inline scripts (the
  build check fails closed) or the page structure.
- **Registry tokens** — long-lived robot tokens for image pushes (F21).
- **Upstream package liveness** — the build needs the registry to resolve the pinned packages; a
  missing generator input degrades to placeholder pages rather than failing (F5).

## Re-verification log

- 2026-09-19 — first-pass baseline (F1–F10).
- 2026-09-30 — CSP hash check; on-chain pages imported from the Move packages (`gen-onchain`).
- 2026-10-03 — re-verified under AUDIT_TEMPLATE.md + TS + VUE + IMG + SITE (Phase 7): rewritten to
  the current template. F11, F12 RESOLVED in 0.0.25 (static-server 0.1.4); F13 RESOLVED in CI.
- 2026-10-03 — deployed 0.0.25 with the manifest change; live: deep links 200 with their own titles, unknown paths 404. The re-dispatched blocking link check is green after excluding npmjs.com pages (they answer 403 to CI runners).
- 2026-10-08 — Lens dates reconciled with the registry (`check-template-dates.mjs`): base 2026-10-08, and SUI_CLIENT/GO 2026-10-08 and TS 2026-10-03 where cited. The changes (AUTH/PLATFORM/MCP/DB registered, the GO token row moved to AUTH, JSR in trusted publishing, layered injection guards) alter no disposition here.
- 2026-10-09 — re-verified against 0.0.32 (releases 0.0.26 to 0.0.32): every finding re-checked against the
  code, workflows, manifests, the published tarballs and the live site. Template dates now cite the
  registry (TS, VUE, IMG 2026-10-08, SITE 2026-09-30); front matter gained the SITE, TS and IMG fields
  and a current deployment status (0.0.32, `sha256:b94c5b66…`, republished testnet ids). F1–F13 stay
  RESOLVED/Positive with fresh evidence (F11/F12 re-probed live). New: F14 (typed on-chain ids, no drift
  check; DEFERRED), F15 (audit file would ship in the npm package; DEFERRED), F16 (`node-ci.yml` has no
  `npm test` step — the known gap; the site has no tests, so nothing is skipped today; DEFERRED), F17
  (release gate, Trivy, lockfile, notices, `USER 65534`; RESOLVED 0.0.30–0.0.32), F18 (`walrus-client`
  one release behind, template range; DEFERRED), F19 (blanket `connect-src`; ACCEPTED-RISK), F20
  (cosign identity; ACCEPTED-RISK), F21 (mirror and credentials; DEFERRED, maintainer), F22 (npm gate
  subset; ACCEPTED-RISK), F23 (`SECURITY.md` scope; DEFERRED), F24 (reference pages describe the pre-v2
  access-proof message; DEFERRED). Verified: sui-token-template resolves
  1.0.8 in the lockfile; live pages show only the new ids; CSP hash check over 220 pages; audit gate
  1 allowlisted / 0 open. Section D ticked with evidence; unticked: the next-patch items and the
  mainnet/maintainer items.
- 2026-10-18 — fix wave, 0.0.33: F14 (build-time on-chain id check), F15 (`files` negation and a `dist/`
  check), F16 (vitest suite run by `node-ci.yml`), F18 (dependency bump; walrus-client 0.0.28,
  sui-token-template 1.0.9, access-gate-client 0.0.9, seal-client 0.0.20, nft-gate-client 0.0.17,
  design-tokens 0.1.10), F22 (`npm-publish.yml` `verify` calls `node-ci.yml`), F23 (`SECURITY.md`) and F24
  (v2 access-proof message on two reference pages; Walrus result shapes made exact) RESOLVED; image base
  static-server 0.1.8 (`sha256:e32cf42b…4000`, tag verified on quay.io). F19 and F20 stay ACCEPTED-RISK (F19
  needs a browser probe; F20 is a workspace script), F21 stays maintainer. Section D: four code gates
  ticked; unticked: mainnet identifiers (mainnet-blocked), registry credentials and external review
  (maintainer). Checks: type-check, three linters, 11 tests, build (including the id check and the
  `dist/` audit check, 222 HTML files), CSP inline check, `check:licenses`, audit gate (1 allowlisted / 0
  open) all green.
- 2026-10-18 — released and deployed (`v0.0.33` = `7476a47`, `0.0.33@sha256:df851d1a230af4ab57fe8f58818f47a90d7875db8b7314c2c5687f5c511db6e6`), verified live. Cosign keyless signature verified against the workflow-anchored identity (`verify-digests.sh` 16/16); published to npm and as an image; rollout (`apply.sh docs`) succeeded; the page loads in headless Chromium with no console errors or CSP violations; re-read with `curl`: `/` 200 with the security headers, an unknown path 404, `/THIRD_PARTY_LICENSES` 200. Mainnet-blocked, credential and external-review gates unchanged.
