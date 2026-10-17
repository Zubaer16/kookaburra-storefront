import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const ts = require('typescript')

/** Source/fixture regression checks, not a substitute for a full build/browser QA. */
const required = [
  'lib/fixture-localization.ts', 'lib/finish-copy.ts',
  'hooks/use-display-locale.ts', 'hooks/use-finish-copy.ts',
  'components/account/order-detail-client.tsx',
  'components/store/cart-line.tsx', 'components/store/cart-drawer.tsx',
  'components/store/product-card.tsx', 'components/store/product-details.tsx',
  'components/store/shop-client.tsx', 'components/checkout/order-summary.tsx',
  'app/account/page.tsx', 'app/account/orders/[orderId]/page.tsx',
  'docs/PATCH_08_NOTES.md', 'PROJECT_PROGRESS.md',
]
for (const file of required) assert(existsSync(file), `Missing Patch 08 file: ${file}`)
for (const file of required.filter((name) => /\.tsx?$/.test(name))) {
  const source = readFileSync(file, 'utf8')
  const parsed = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
  assert.equal(parsed.parseDiagnostics.length, 0, `${file} syntax error`)
  for (const match of source.matchAll(/from\s*['"](@\/[^'"]+)['"]/g)) {
    const base = match[1].slice(2)
    assert(['.ts', '.tsx', '.mjs', '.js'].some((ext) => existsSync(base + ext)) || existsSync(path.join(base,'index.tsx')), `Missing local import ${match[1]} in ${file}`)
  }
}
const catalog = readFileSync('lib/catalog.ts','utf8')
const i18n = readFileSync('lib/fixture-localization.ts','utf8')
const sampleIds = [...catalog.matchAll(/^\s{4}id: '(p-[^']+)',$/gm)].map((m) => m[1])
assert.equal(sampleIds.length, 11, 'Expected 11 sample products')
for (const id of sampleIds) assert(i18n.includes(`'${id}': {`), `Missing Bangla product: ${id}`)
for (const event of ['Order placed','Preparing items','Handed to carrier','Delivered']) assert(i18n.includes(`'${event}'`) || i18n.includes(`${event}:`), `Missing event: ${event}`)
const home = readFileSync('app/page.tsx','utf8')
assert(home.includes('finishCopy(locale)'), 'Homepage locale not wired')
assert(readFileSync('components/store/shop-client.tsx','utf8').includes('translated.title'), 'Bangla product search missing')
const detail = readFileSync('components/account/order-detail-client.tsx','utf8')
assert(detail.includes('localizeOrderItem') && detail.includes('localizeShippingLabel'), 'Order detail fixture localization missing')
const root = readFileSync('stores/commerce-store.ts','utf8')
assert(root.includes('kookaburra-storefront-preview-v1'), 'Cart persistence name unexpectedly changed')
const checkout = readFileSync('components/checkout/checkout-client.tsx','utf8')
assert(checkout.includes('disabled'), 'Payment UI must remain disabled')
assert(!readFileSync('components/account/auth-preview.tsx','utf8').includes('fetch('), 'Demo auth must not submit')
console.log(`Patch 08 offline checks passed: ${required.length} required files; ${sampleIds.length} catalog translations; local imports and preview safety boundaries.`)
console.log('Run npm run check and manual desktop/mobile UI tests before committing.')
