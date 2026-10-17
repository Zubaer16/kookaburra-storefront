import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import ts from 'typescript'

const required = [
  'app/account/layout.tsx', 'app/account/page.tsx', 'app/account/orders/page.tsx',
  'app/account/orders/[orderId]/page.tsx', 'app/account/addresses/page.tsx',
  'app/account/settings/page.tsx', 'app/sign-in/page.tsx', 'app/sign-up/page.tsx',
  'app/track/page.tsx', 'components/account/account-shell.tsx',
  'components/account/auth-preview.tsx', 'components/account/order-ui.tsx',
  'components/account/tracking-client.tsx', 'lib/account-preview.ts',
  'components/layout/header.tsx', 'components/layout/footer.tsx',
  'docs/PATCH_05_NOTES.md', 'docs/FLUTTER_PARITY.md', 'PROJECT_PROGRESS.md',
]
for (const file of required) assert(fs.existsSync(file), `Missing ${file}`)

const files = required.filter((name) => /\.tsx?$/.test(name))
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8')
  const parsed = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
  assert.equal(parsed.parseDiagnostics.length, 0, `Parse error in ${file}: ${parsed.parseDiagnostics.map((x) => x.messageText).join('; ')}`)
  for (const match of text.matchAll(/from\s*['"](@\/[^'"]+)['"]/g)) {
    const target = match[1].replace(/^@\//, '')
    assert(['.ts', '.tsx', '.js', '.mjs'].some((extension) => fs.existsSync(`${target}${extension}`)) || fs.existsSync(path.join(target, 'index.tsx')), `Missing local import ${match[1]} in ${file}`)
  }
}

const fixtureFile = 'lib/account-preview.ts'
const output = ts.transpileModule(fs.readFileSync(fixtureFile, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
const module = { exports: {} }
vm.runInNewContext(output, { module, exports: module.exports, Intl, Date }, { filename: fixtureFile })
const { demoOrders, previewOrderById, previewMoney } = module.exports
assert.equal(demoOrders.length, 3)
assert.equal(new Set(demoOrders.map((o) => o.id)).size, demoOrders.length, 'Duplicate demo IDs')
assert(demoOrders.every((o) => o.id.startsWith('DEMO-') && o.events.length === 4))
assert.equal(previewOrderById('unknown'), undefined)
assert.equal(previewOrderById('DEMO-BD-1042').currency, 'BDT')
assert(previewMoney(12, 'USD').includes('12'))
const auth = fs.readFileSync('components/account/auth-preview.tsx', 'utf8')
assert(auth.includes('disabled') && !auth.includes('fetch('), 'Authentication UI must not submit credentials')
const tracking = fs.readFileSync('components/account/tracking-client.tsx', 'utf8')
assert(!tracking.includes('fetch('), 'Tracking must not make network requests in demo')
console.log(`Patch 05 verification passed (${files.length} source files, 3 sample orders, local imports, no auth/network calls).`)
console.log('This offline verification is not a Next.js production build or interactive browser test.')
