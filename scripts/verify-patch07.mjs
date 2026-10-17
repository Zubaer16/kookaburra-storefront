import { readFileSync, existsSync } from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const ts = require('typescript')

const required = [
  'lib/preview-copy.ts',
  'lib/preview-delivery-label.ts',
  'hooks/use-preview-copy.ts',
  'components/checkout/checkout-client.tsx',
  'components/checkout/address-form.tsx',
  'components/checkout/delivery-options.tsx',
  'components/checkout/order-summary.tsx',
  'components/account/auth-preview.tsx',
  'components/account/order-ui.tsx',
  'app/account/orders/page.tsx',
  'components/account/tracking-client.tsx',
  'components/store/product-options.tsx',
  'components/store/product-gallery.tsx',
]
for (const file of required) assert.ok(existsSync(file), `Missing ${file}`)
const source = readFileSync('lib/preview-copy.ts', 'utf8')
const parsed = ts.createSourceFile(
  'lib/preview-copy.ts',
  source,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS,
)
assert.equal(
  parsed.parseDiagnostics.length,
  0,
  'Invalid preview-copy.ts source',
)

function propertiesOf(objectName) {
  let result
  parsed.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return
    for (const declaration of node.declarationList.declarations) {
      if (
        !ts.isIdentifier(declaration.name) ||
        declaration.name.text !== objectName
      )
        continue
      const value = declaration.initializer
      const literal =
        value && ts.isAsExpression(value) ? value.expression : value
      assert(
        literal && ts.isObjectLiteralExpression(literal),
        `${objectName} dictionary must be object literal`,
      )
      result = literal.properties.map((property) => {
        assert(
          ts.isPropertyAssignment(property),
          `${objectName} contains unsupported property declaration`,
        )
        assert(
          ts.isIdentifier(property.name) || ts.isStringLiteral(property.name),
          `Unsupported key in ${objectName}`,
        )
        assert(
          ts.isStringLiteral(property.initializer) ||
            ts.isNoSubstitutionTemplateLiteral(property.initializer),
          `Translation for ${property.name.getText(parsed)} must be a static string`,
        )
        assert(property.initializer.text.trim().length, 'Empty translation')
        return property.name.text
      })
    }
  })
  assert(result, `Missing ${objectName} dictionary`)
  return result
}
const en = propertiesOf('en')
const bn = propertiesOf('bn')
assert.deepEqual(
  en.slice().sort(),
  bn.slice().sort(),
  'Mismatched translations',
)
assert(en.length >= 100, 'Missing bilingual coverage')
for (const path of [
  'components/checkout/checkout-client.tsx',
  'components/checkout/address-form.tsx',
  'components/account/auth-preview.tsx',
])
  assert(
    readFileSync(path, 'utf8').includes('PreviewCopy'),
    `Translation not wired: ${path}`,
  )
console.log(
  `Patch 07 offline structural check passed: ${required.length} core files, ${en.length} bilingual keys.`,
)
