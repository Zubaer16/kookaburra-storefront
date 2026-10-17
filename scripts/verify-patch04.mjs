import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import ts from 'typescript'

const required = [
  'app/checkout/page.tsx',
  'components/checkout/checkout-client.tsx',
  'components/checkout/address-form.tsx',
  'components/checkout/delivery-options.tsx',
  'components/checkout/order-summary.tsx',
  'lib/checkout-preview.ts',
  'docs/PATCH_04_NOTES.md',
  'docs/FLUTTER_PARITY.md',
  'PROJECT_PROGRESS.md',
]
for (const name of required) assert(fs.existsSync(name), `Missing ${name}`)
const files = [...required.filter((x) => /\.[jt]sx?$/.test(x)), 'app/cart/page.tsx']
for (const file of files) {
  const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, file.endsWith('tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
  assert.equal(source.parseDiagnostics.length, 0, `${file} has syntax errors`)
  const re = /(?:from\s*|import\s*)['"](@\/[^'"]+)['"]/g
  for (const match of fs.readFileSync(file, 'utf8').matchAll(re)) {
    const imported = match[1].replace(/^@\//, '')
    assert(['.ts', '.tsx', '.js', '.mjs'].some((ext) => fs.existsSync(imported + ext)) || fs.existsSync(path.join(imported, 'index.tsx')), `Missing local module: ${match[1]}`)
  }
}

function evaluateCommonJS(file, requireStub = () => ({})) {
  const result = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    reportDiagnostics: true,
  })
  assert(!result.diagnostics?.some((d) => d.category === ts.DiagnosticCategory.Error), `Compilation failed: ${file}`)
  const exports = {}
  const module = { exports }
  vm.runInNewContext(result.outputText, { exports, module, require: requireStub, Intl }, { filename: file })
  return module.exports
}
const catalog = evaluateCommonJS('lib/catalog.ts')
const checkout = evaluateCommonJS('lib/checkout-preview.ts', (name) => {
  assert.equal(name, '@/lib/catalog')
  return catalog
})
const empty = checkout.assessPreviewCart([], 'BD')
assert.equal(empty.readyForPreview, false)
const validSimple = checkout.assessPreviewCart([{ productId: 'p-headphones', quantity: 1 }], 'BD')
assert.equal(validSimple.readyForPreview, true)
assert.equal(validSimple.subtotal, catalog.productById('p-headphones').price.BDT)
assert.equal(checkout.assessPreviewCart([{ productId: 'p-sneaker', quantity: 1 }], 'BD').readyForPreview, false, 'Missing variant should block checkout')
const variants = [
  { productId: 'p-sneaker', variantId: 'p-sneaker-40-cloudwhite', quantity: 1 },
  { productId: 'p-sneaker', variantId: 'p-sneaker-41-cloudwhite', quantity: 1 },
]
assert.equal(checkout.assessPreviewCart(variants, 'BD').rows.length, 2, 'Distinct variants must remain separate')
assert.equal(checkout.assessPreviewCart([{ productId: 'p-headphones', quantity: 100000 }], 'BD').readyForPreview, false, 'Overstock must block checkout')
assert.equal(checkout.assessPreviewCart([{ productId: 'fake-product', quantity: 1 }], 'BD').readyForPreview, false)
assert.equal(checkout.assessPreviewCart([{ productId: 'p-headphones', quantity: 15 }, { productId: 'p-headphones', quantity: 15 }], 'BD').readyForPreview, false, 'Duplicate lines must aggregate stock')
assert.equal(checkout.checkoutDeliveryOptions('BD')[0].sampleFee, 100)
assert.equal(checkout.checkoutDeliveryOptions('INTL')[0].sampleFee, 18)
const checkoutComponent = fs.readFileSync('components/checkout/checkout-client.tsx', 'utf8')
assert(/<Button\s+type="button"\s+className="mt-6 w-full"\s+disabled>/.test(checkoutComponent), 'Real payments must remain disabled')
assert(!checkoutComponent.includes('fetch(') && !checkoutComponent.includes('localStorage'), 'Checkout UI must not transmit/persist private address data')
console.log(`Patch 04 verification passed (${files.length} TypeScript files, cart guard and sample shipping scenarios).`)
console.log('Offline checks are NOT a Next.js production build, npm audit or browser test.')
