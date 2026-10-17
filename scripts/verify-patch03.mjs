import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

const required = [
  'components/store/product-gallery.tsx',
  'components/store/product-options.tsx',
  'components/store/cart-line.tsx',
  'components/store/product-details.tsx',
  'components/store/cart-drawer.tsx',
  'components/store/shop-client.tsx',
  'public/products/sneaker-detail.svg',
  'public/products/tshirt-detail.svg',
  'public/products/loafers-detail.svg',
  'docs/PATCH_03_NOTES.md',
  'docs/FLUTTER_PARITY.md',
  'stores/commerce-store.ts',
]
for (const file of required)
  assert(existsSync(file), `Missing Patch 03 file: ${file}`)
const source = readFileSync('lib/catalog.ts', 'utf8')
const result = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
  reportDiagnostics: true,
})
assert(
  !result.diagnostics?.some((d) => d.category === ts.DiagnosticCategory.Error),
  'Catalog transpilation failed',
)
const exports = {}
const sandbox = { exports, module: { exports }, Intl }
vm.runInNewContext(result.outputText, sandbox)
const catalog = sandbox.module.exports
assert.equal(catalog.products.length, 11, 'Unexpected fixture product count')
assert.equal(
  new Set(catalog.products.map((p) => p.id)).size,
  catalog.products.length,
  'Duplicate product IDs',
)
assert.equal(
  new Set(catalog.products.map((p) => p.slug)).size,
  catalog.products.length,
  'Duplicate product slugs',
)
let variants = 0
for (const product of catalog.products) {
  assert(
    existsSync(`public${product.image}`),
    `Product asset missing: ${product.image}`,
  )
  for (const image of catalog.productGallery(product))
    assert(
      existsSync(`public${image.src}`),
      `Gallery asset missing: ${image.src}`,
    )
  if (product.variants?.length) {
    const ids = product.variants.map((variant) => variant.id)
    const skus = product.variants.map((variant) => variant.sku)
    assert.equal(
      new Set(ids).size,
      ids.length,
      `Duplicate variant ids: ${product.slug}`,
    )
    assert.equal(
      new Set(skus).size,
      skus.length,
      `Duplicate SKUs: ${product.slug}`,
    )
    assert(
      product.variants.every((v) => Number.isInteger(v.stock) && v.stock >= 0),
      `Invalid variant stock: ${product.slug}`,
    )
    assert.equal(
      catalog.productAvailableStock(product),
      product.stock,
      `Preview total stock mismatch: ${product.slug}`,
    )
    for (const variant of product.variants)
      assert(
        catalog.productVariant(product, variant.id)?.id === variant.id,
        `Variant lookup failed: ${product.slug}`,
      )
    variants += product.variants.length
  }
}
assert.equal(catalog.cartLineKey('a', 'b'), 'a::b')
assert.notEqual(
  catalog.cartLineKey('p-shirt', 'size-s'),
  catalog.cartLineKey('p-shirt', 'size-l'),
  'Cart variants collapse',
)
const store = readFileSync('stores/commerce-store.ts', 'utf8')
assert(
  /name:\s*['"]kookaburra-storefront-preview-v1['"]/.test(store),
  'Existing persisted cart storage key changed',
)
assert(
  store.includes('productVariant(product, variantId)?.stock'),
  'Cart lacks variant stock guard',
)
const shop = readFileSync('components/store/shop-client.tsx', 'utf8')
assert(shop.includes('window.history.replaceState'), 'Shop URL sync missing')
assert(
  /selectedCategory\s*===\s*['"]style['"]/.test(shop),
  'Style & shoes filter missing',
)
assert(
  readFileSync('components/store/collection-tabs.tsx', 'utf8').includes(
    '/shop?category=style',
  ),
  'Collection link missing',
)
assert(
  readFileSync('components/layout/footer.tsx', 'utf8').includes(
    'href="/shop?tag=new"',
  ),
  'Footer link missing',
)
console.log(
  `Patch 03 data and structural checks passed (${catalog.products.length} sample products, ${variants} variants, ${required.length} required files).`,
)
console.log('This does not replace Next.js build or browser interaction tests.')
