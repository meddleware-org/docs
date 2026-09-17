// Autodoc step for the docs site (Part C of the docs plan).
//
// Generates Markdown API reference from the published Meddleware TypeScript SDKs using TypeDoc +
// typedoc-plugin-markdown, writing into each service's `api/` subtree (git-ignored, built fresh).
// The service `reference.md` pages link into these.
//
// Design goals:
//  - Exhaustive: point TypeDoc at each SDK's full public entry so nothing is hand-maintained.
//  - Resilient: a missing/unresolvable package warns and writes a placeholder instead of failing
//    the whole docs build. An empty result is a signal to fix the SDK's `types`/`exports`, not to
//    paper over here — CI logs make that visible.
import { createRequire } from 'node:module'
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'

const require = createRequire(import.meta.url)
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const docsRoot = join(root, 'docs')

// Each SDK → where its generated reference lands under docs/.
const targets = [
  { pkg: '@meddleware/walrus-client', out: 'walrus-storage/api', name: 'Walrus client API' },
  { pkg: '@meddleware/seal-client', out: 'sealed-storage/api', name: 'Seal client API' },
  { pkg: '@meddleware/nft-gate-client', out: 'access-gate/api', name: 'NFT-gate client API' },
]

// Resolve the SDK's TypeScript entry. These packages export their `.` as `./src/index.ts`
// (string-form exports) but restrict `./package.json`, so resolve the package entry directly
// rather than via its package.json. Fall back to a manual src/index.ts probe if needed.
function resolveEntry(pkg) {
  try {
    // `.` export → src/index.ts for the Meddleware SDKs.
    return require.resolve(pkg)
  } catch {
    // Fallback: locate the installed package dir without relying on an exported package.json.
    try {
      const dir = join(root, 'node_modules', ...pkg.split('/'))
      for (const candidate of ['src/index.ts', 'index.ts', 'dist/index.d.ts']) {
        const p = join(dir, candidate)
        if (existsSync(p)) return p
      }
    } catch {
      /* ignore */
    }
    return null
  }
}

function typedocBin() {
  const bin = join(root, 'node_modules', '.bin', process.platform === 'win32' ? 'typedoc.cmd' : 'typedoc')
  return existsSync(bin) ? bin : null
}

let failures = 0
for (const { pkg, out, name } of targets) {
  const outDir = join(docsRoot, out)
  mkdirSync(outDir, { recursive: true })

  const entry = resolveEntry(pkg)
  const bin = typedocBin()
  if (!entry || !bin) {
    failures++
    const why = !entry ? `could not resolve ${pkg}` : 'typedoc binary not found'
    console.warn(`[gen:api] ${name}: ${why} — writing placeholder.`)
    writeFileSync(
      join(outDir, 'index.md'),
      `# ${name}\n\n::: warning Reference not generated\nAutodoc could not run for \`${pkg}\` (${why}). ` +
        `Ensure the package is installed and exposes its TypeScript \`src\`/types, then rebuild.\n:::\n`,
    )
    continue
  }

  try {
    execFileSync(
      bin,
      [
        entry,
        '--plugin', 'typedoc-plugin-markdown',
        '--plugin', 'typedoc-vitepress-theme',
        '--out', outDir,
        '--readme', 'none',
        '--githubPages', 'false',
        '--hideBreadcrumbs', 'true',
        '--tsconfig', join(root, 'tsconfig.typedoc.json'),
        '--skipErrorChecking',
        '--name', name,
      ],
      { stdio: 'inherit', cwd: root },
    )
    console.log(`[gen:api] ${name}: generated → docs/${out}`)
  } catch (e) {
    failures++
    console.warn(`[gen:api] ${name}: TypeDoc failed — writing placeholder. ${e?.message ?? e}`)
    writeFileSync(
      join(outDir, 'index.md'),
      `# ${name}\n\n::: warning Reference not generated\nTypeDoc failed for \`${pkg}\`. See build logs.\n:::\n`,
    )
  }
}

if (failures) {
  console.warn(`[gen:api] completed with ${failures} placeholder(s); site still builds.`)
} else {
  console.log('[gen:api] all SDK references generated.')
}
