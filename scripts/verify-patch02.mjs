import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

const required = [
  'app/categories/page.tsx',
  'components/store/category-tile.tsx',
  'components/store/collection-tabs.tsx',
  'public/products/tshirt.svg',
  'public/products/loafers.svg',
  'public/products/bottle.svg',
  'docs/PATCH_02_NOTES.md',
  'docs/FLUTTER_PARITY.md',
  'lib/catalog.ts',
]
for (const file of required)
  assert(existsSync(file), `Patch 02 missing: ${file}`)
const catalog = readFileSync('lib/catalog.ts', 'utf8')
for (const id of ['fashion', 'footwear', 'electronics', 'lifestyle'])
  assert(catalog.includes(`id: "${id}"`), `Missing category: ${id}`)
for (const id of ['p-shirt', 'p-loafers', 'p-bottle'])
  assert(catalog.includes(`id: "${id}"`), `Missing product: ${id}`)
const read = (p) => readFileSync(p, 'utf8')
assert(
  read('components/store/shop-client.tsx').includes('priceLimit'),
  'Price filter missing',
)
assert(
  read('components/layout/header.tsx').includes('desktop-category-menu'),
  'Category menu missing',
)
console.log(
  'Patch 02 structural checks passed; this is NOT a TypeScript, Next.js build or browser test.',
)
