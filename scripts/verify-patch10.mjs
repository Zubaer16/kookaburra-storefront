import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

const read = (file) => {
  assert(existsSync(file), `Missing: ${file}`)
  return readFileSync(file, 'utf8')
}

// One document <main> landmark. Cart and Wishlist previously nested another.
const root = read('app/layout.tsx')
assert(root.includes('<main id="main-content"'), 'Root main landmark missing')
assert(root.includes('className="skip-to-content"'), 'Skip link missing')
for (const route of ['app/cart/page.tsx', 'app/wishlist/page.tsx']) {
  assert(
    !/<\/?main(?:\s|>)/.test(read(route)),
    `${route} creates a nested main`,
  )
}

// Preview SEO safeguards. Never publish simulated stock/orders as live SERP data.
assert(root.includes('index: false'), 'Preview global noindex missing')
assert(
  read('app/robots.ts').includes("disallow: '/'"),
  'Preview crawler block missing',
)
assert(
  read('app/manifest.ts').includes("display: 'browser'"),
  'Preview manifest should not falsely claim offline app behavior',
)
for (const route of ['cart', 'wishlist', 'track', 'sign-in', 'sign-up']) {
  const file = `app/${route}/layout.tsx`
  assert(
    read(file).includes('robots: { index: false, follow: false }'),
    `Missing route noindex: ${file}`,
  )
}
assert(
  read('app/shop/page.tsx').includes('robots: { index: false, follow: false }'),
  'Shop noindex missing',
)
assert(
  read('app/product/[slug]/page.tsx').includes(
    'robots: { index: false, follow: false }',
  ),
  'Product preview noindex missing',
)
assert(
  !/https?:\/\//.test(read('app/robots.ts')),
  'Unverified preview canonical URL',
)

// Check key touch-target sizing. These assertions are guardrails, not WCAG proof.
const cards = read('components/store/product-card.tsx')
assert(
  cards.includes('flex size-11 items-center'),
  'Product wishlist tap target too small',
)
assert(
  (cards.match(/min-h-11 w-full/g) || []).length >= 2,
  'Product actions should be >=44px tall',
)
assert(
  read('components/store/product-gallery.tsx').includes(
    'flex size-11 items-center',
  ),
  'Gallery arrow tap targets missing',
)
assert(
  read('app/globals.css').includes('prefers-reduced-motion: reduce'),
  'Reduced-motion CSS missing',
)

// Checkout and auth are still frontend previews. No accidental submit or live charge.
const checkout = read('components/checkout/checkout-client.tsx')
const auth = read('components/account/auth-preview.tsx')
assert(checkout.includes('disabled'), 'Checkout payment must remain disabled')
assert(auth.includes('disabled'), 'Auth preview inputs must remain disabled')
assert(!auth.includes('fetch('), 'Auth preview must not send credentials')
assert(
  read('stores/commerce-store.ts').includes('kookaburra-storefront-preview-v1'),
  'Existing preview cart storage contract changed',
)
for (const file of [
  'docs/FRONTEND_RELEASE_GATE.md',
  'docs/PATCH_10_NOTES.md',
  'docs/FLUTTER_PARITY.md',
])
  read(file)
console.log(
  'Patch 10 release-guard checks passed: accessible landmarks, preview SEO, touch-target source, safe auth/checkout and docs.',
)
console.log(
  'Not a browser audit. Still run npm run check, production audit and manual QA on Node.js 24.',
)
