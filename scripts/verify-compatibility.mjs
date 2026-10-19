/** Real execution of dependency-light TypeScript draft adapters using the
 * project's existing TypeScript compiler. No backend and no browser required.
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { runInNewContext } from 'node:vm'

const require = createRequire(import.meta.url)
const ts = require('typescript')
const cache = new Map()
const root = process.cwd()
function load(path) {
  const name = path.endsWith('.ts') ? path : `${path}.ts`
  if (cache.has(name)) return cache.get(name).exports
  const source = readFileSync(resolve(root, name), 'utf8')
  const compiled = ts.transpileModule(source, {
    fileName: name,
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS,
    },
    reportDiagnostics: true,
  })
  const errors = (compiled.diagnostics ?? []).filter(
    (d) => d.category === ts.DiagnosticCategory.Error,
  )
  assert.equal(errors.length, 0, `${name}: transpilation errors`)
  const loaded = { exports: {} }
  cache.set(name, loaded)
  const importer = (specifier) => {
    if (!specifier.startsWith('@/'))
      throw new Error(`Unexpected runtime import ${specifier}`)
    return load(specifier.slice(2))
  }
  runInNewContext(
    `(function(require, module, exports) { ${compiled.outputText} })`,
    {},
  )(importer, loaded, loaded.exports)
  return loaded.exports
}

const catalog = load('lib/catalog')
const adapters = load('lib/api/storefront-adapters')
const checkout = load('lib/api/checkout-alignment')
const content = load('lib/api/content-alignment')
const orders = load('lib/api/order-alignment')
const account = load('lib/account-preview')
const categories = adapters.previewCategoriesAsApi()
const products = adapters.previewProductsAsApi()
assert.equal(categories.length, catalog.categories.length)
assert.equal(products.length, catalog.products.length)
assert(categories.some((category) => category.slug === 'lifestyle'))
assert(
  categories.every((category) => category.parentId === null && category.active),
)
assert(products.every((product) => product.price.currency === 'USD'))
assert.equal(
  products.find((p) => p.id === 'p-headphones').price.amountMinor,
  5900,
)
assert.equal(products.find((p) => p.id === 'p-headphones').variants.length, 0)
const tote = products.find((p) => p.id === 'p-bag')
assert.equal(tote.variants.length, 2)
assert.equal(tote.variants[0].options.color, 'Natural')
assert.equal(Object.hasOwn(tote.variants[0].options, 'size'), false)
const sneaker = products.find((p) => p.id === 'p-sneaker')
assert.equal(sneaker.variants.length, 10)
assert(sneaker.variants.some((variant) => variant.options.size === '42'))
assert.throws(() => adapters.usdMinor(-1), /Invalid/)

const cart = [
  { productId: 'p-bag', variantId: 'p-bag-onesize-natural', quantity: 2 },
]
assert.equal(adapters.cartToApiItems(cart)[0].variantId, cart[0].variantId)
assert.equal(adapters.unresolvedCartVariants(cart).length, 0)
assert.equal(
  adapters.unresolvedCartVariants([{ productId: 'p-bag', quantity: 1 }]).length,
  1,
)
const address = {
  fullName: 'Example Person',
  email: 'shopper@example.test',
  phone: '+15550001111',
  address1: '12 Example Street',
  address2: '',
  city: 'Austin',
  region: 'Texas',
  postalCode: '78701',
  country: 'United States',
}
const draft = checkout.buildCheckoutAlignmentDraft(cart, address, 'express')
assert.equal(draft.ready, true)
assert.equal(draft.draft.request.destination.countryCode, 'US')
assert.equal(draft.draft.lines[0].sku, 'P-BAG-ONESIZE-NATURAL')
assert.equal(draft.draft.lines[0].optionSnapshot.color, 'Natural')
assert.equal(draft.draft.request.items[0].variantId, cart[0].variantId)
assert.equal(Object.hasOwn(draft.draft.request, 'total'), false)
assert.equal(Object.hasOwn(draft.draft.request, 'shipping'), false)
assert.equal(Object.hasOwn(draft.draft.request, 'tax'), false)
const unknown = checkout.buildCheckoutAlignmentDraft(
  cart,
  { ...address, country: 'Other country' },
  'standard',
)
assert.equal(unknown.ready, false)
assert(
  unknown.issues.some((message) =>
    message.includes('specific supported destination'),
  ),
)
assert.equal(checkout.countryCodeForPreview('Canada'), 'CA')
assert.equal(checkout.countryCodeForPreview('Other country'), null)
const legacyLines = orders.legacyOrderLinesForAudit(account.demoOrders[0])
assert(
  legacyLines.every(
    (line) =>
      line.productId === null &&
      line.variantId === null &&
      line.requiresIdentityMapping,
  ),
)
assert.equal(legacyLines[0].titleSnapshot, account.demoOrders[0].items[0].title)
assert.equal(content.safeStorefrontHref('/shop?category=fashion'), true)
assert.equal(content.safeStorefrontHref('//external.invalid'), false)
assert.equal(content.safeStorefrontHref('javascript:alert(1)'), false)
const selection = content.resolveFeaturedIds(
  ['p-bag', 'p-unknown', 'p-bag'],
  catalog.products.map((product) => product.id),
)
assert.equal(selection.resolved.length, 1)
assert.equal(selection.unresolved[0], 'p-unknown')
console.log(
  'Storefront/Admin compatibility adapters passed: catalog, variants, USD, cart, ISO country, quote boundary and content references.',
)
