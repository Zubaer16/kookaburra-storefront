import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
const source = (p) => readFileSync(p, 'utf8')
const catalog = source('lib/catalog.ts')
const tests = source('e2e/01-discovery.spec.mjs')
const checkout = source('components/checkout/checkout-client.tsx')
const browser = source('playwright.config.mjs')
assert(!catalog.includes('BDT'), 'Catalog must be USD-only')
assert(
  !source('components/layout/header.tsx').includes('id="market"'),
  'Currency switcher remains',
)
assert(
  !source('lib/account-preview.ts').includes("currency: 'BDT'"),
  'Legacy display currency in orders',
)
assert(
  source('components/store/product-details.tsx').includes(
    'data-testid="product-add-to-cart"',
  ),
)
assert(tests.includes('USD only without a currency switcher'))
assert(
  checkout.includes('disabled'),
  'Checkout payment preview should remain disabled',
)
assert(
  browser.includes('1120') && browser.includes('600'),
  'Expected visual viewport missing',
)
console.log('USD-only storefront and Playwright test/source guards passed.')
