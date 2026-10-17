import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
const root = process.cwd()
const source = (path) => {
  const full = join(root, path)
  assert(existsSync(full), `Missing required source: ${path}`)
  return readFileSync(full, 'utf8')
}
const routes = ['app/page.tsx', 'app/shop/page.tsx', 'app/categories/page.tsx', 'app/cart/page.tsx', 'app/wishlist/page.tsx', 'app/checkout/page.tsx', 'app/account/page.tsx', 'app/track/page.tsx']
for (const route of routes) source(route)
for (const module of ['components/layout/header.tsx', 'components/layout/footer.tsx', 'components/checkout/checkout-client.tsx', 'stores/commerce-store.ts']) {
  const code = source(module)
  assert(!/[\u0980-\u09ff]/.test(code), `Unexpected Bengali UI text: ${module}`)
}
// Scan public UI/source for Bengali letters; BDT currency sign is allowed.
function inspect(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const relative = `${dir}/${entry.name}`
    if (entry.isDirectory()) inspect(relative)
    else if (/\.(tsx?|css)$/.test(entry.name)) {
      assert(!/[\u0985-\u09e1]/.test(source(relative)), `Bengali text in ${relative}`)
    }
  }
}
for (const folder of ['app', 'components', 'hooks', 'lib', 'stores']) inspect(folder)
assert(source('app/layout.tsx').includes('<html lang="en">'), 'Page language must be English')
assert(!source('components/layout/header.tsx').includes('setLocale'), 'Language switcher is no longer supported')
assert(!source('stores/commerce-store.ts').includes('setLocale'), 'Locale must not be persisted')
assert(source('components/checkout/checkout-client.tsx').includes('disabled'), 'Payment must remain disabled')
assert(source('components/account/auth-preview.tsx').includes('disabled'), 'Auth preview must remain disabled')
assert(source('app/layout.tsx').includes('index: false'), 'Preview SEO indexing must remain disabled')
assert(source('stores/commerce-store.ts').includes('kookaburra-storefront-preview-v1'), 'Preserve browser cart storage key')
for (const doc of ['README.md','docs/ARCHITECTURE.md','docs/PAYMENTS.md','docs/FLUTTER_PARITY.md','docs/FRONTEND_RELEASE_GATE.md']) {
 const value = source(doc)
 assert(!/PATCH[_\s-]*\d+/i.test(value), `Historic milestone reference in ${doc}`)
}
console.log('Storefront structure, English-only interface, cart storage and safety guards verified.')
console.log('This is a source check; run TypeScript, ESLint, build and browser QA separately.')
