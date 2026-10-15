import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, relative, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import assert from 'node:assert/strict'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const required = [
  'package.json',
  'components.json',
  'tsconfig.json',
  'app/page.tsx',
  'app/layout.tsx',
  'app/shop/page.tsx',
  'app/cart/page.tsx',
  'app/wishlist/page.tsx',
  'app/product/[slug]/page.tsx',
  'stores/commerce-store.ts',
  'design/design-tokens.json',
  'docs/FLUTTER_PARITY.md',
  'public/illustrations/hero.svg',
  'public/logo-mark.svg',
]
required.forEach((file) =>
  assert(existsSync(join(root, file)), `Required file missing: ${file}`),
)
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
assert(pkg.scripts?.build && pkg.scripts?.typecheck, 'Missing project scripts')
const tokens = JSON.parse(
  readFileSync(join(root, 'design/design-tokens.json'), 'utf8'),
)
assert.equal(tokens.color.primary, '#2459E8')
const css = readFileSync(join(root, 'app/globals.css'), 'utf8').toLowerCase()
assert(
  css.includes(tokens.color.primary.toLowerCase()),
  'Primary design token not represented in CSS',
)
let total = 0
function scan(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('node_modules') || entry.name === '.next')
      continue
    const full = join(directory, entry.name)
    if (entry.isDirectory()) scan(full)
    else {
      total++
      const path = relative(root, full).replaceAll('\\', '/')
      if (path.endsWith('.svg')) {
        const content = readFileSync(full, 'utf8')
        assert(
          content.startsWith('<svg') && content.includes('</svg>'),
          `Invalid SVG wrapper: ${path}`,
        )
      }
    }
  }
}
scan(root)
console.log(
  `Patch 01 structural verification passed (${total} source/asset/docs files).`,
)
console.log(
  'This is an offline structure check, NOT a Next.js production build or browser test.',
)
