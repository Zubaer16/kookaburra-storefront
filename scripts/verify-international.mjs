import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
const read = (name) => readFileSync(name, 'utf8')
const sourceFiles = [
  'components/checkout/checkout-client.tsx',
  'components/checkout/address-form.tsx',
  'components/checkout/delivery-options.tsx',
  'lib/checkout-preview.ts',
  'lib/account-preview.ts',
  'stores/commerce-store.ts',
  'components/layout/footer.tsx',
  'lib/finish-copy.ts',
  'lib/catalog.ts',
]
for (const file of sourceFiles) {
  const contents = read(file)
  assert(!/Bangladesh|Bangladeshi|\bBDT\b|\bBD\b|DEMO-BD-/.test(contents), `${file}: legacy domestic UI`)
}
assert(!read('stores/commerce-store.ts').includes('setMarket'), 'Legacy region state')
assert(!read('lib/catalog.ts').includes('export type Market'), 'Legacy region type')
assert(read('components/checkout/address-form.tsx').includes('previewCountries.map'), 'Country selector missing')
assert(read('components/checkout/checkout-client.tsx').includes('disabled'), 'Payment preview guard removed')
assert(read('stores/commerce-store.ts').includes('kookaburra-storefront-preview-v1'), 'Cart storage migrated destructively')
assert(read('lib/account-preview.ts').includes('DEMO-GLB-1042'), 'Sample order IDs not migrated')
assert(read('e2e/03-checkout.spec.mjs').includes('international checkout preview'), 'E2E not updated')
console.log('International USD-only source guards passed. Browser run and build are still required.')
