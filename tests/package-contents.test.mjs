import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { findAuditPages } from '../scripts/check-dist-no-audit.mjs'

describe('findAuditPages', () => {
  it('finds audit pages and directories, and nothing else', () => {
    const dist = mkdtempSync(join(tmpdir(), 'dist-'))
    try {
      mkdirSync(join(dist, 'blockchain', 'sui'), { recursive: true })
      writeFileSync(join(dist, 'index.html'), '')
      writeFileSync(join(dist, 'blockchain', 'sui', 'auditing-tools.html'), '')
      expect(findAuditPages(dist)).toEqual([])
      mkdirSync(join(dist, 'audit'))
      writeFileSync(join(dist, 'audit', 'x.html'), '')
      writeFileSync(join(dist, 'docs-audit.html'), '')
      expect(findAuditPages(dist).sort()).toEqual(['audit', 'docs-audit.html'])
    } finally {
      rmSync(dist, { recursive: true, force: true })
    }
  })
})

describe('npm package contents', () => {
  it('does not include the audit tree, but does include the site source and scripts', () => {
    const out = execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], { encoding: 'utf8', cwd: join(import.meta.dirname, '..') })
    const files = JSON.parse(out)[0].files.map((f) => f.path)
    expect(files.filter((f) => f.startsWith('docs/audit'))).toEqual([])
    expect(files).toContain('docs/index.md')
    expect(files).toContain('scripts/check-onchain-ids.mjs')
    expect(files).toContain('scripts/check-dist-no-audit.mjs')
  })
})
