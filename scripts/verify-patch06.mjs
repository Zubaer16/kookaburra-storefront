import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import ts from 'typescript'
import vm from 'node:vm'

const required = [
  'lib/ui-copy.ts','hooks/use-ui-copy.ts','components/layout/locale-sync.tsx',
  'components/store/categories-client.tsx','lib/api/contracts.ts','lib/api/client.ts',
  'docs/PATCH_06_NOTES.md','app/categories/page.tsx','app/cart/page.tsx',
  'app/wishlist/page.tsx','components/store/shop-client.tsx',
]
for (const path of required) assert(existsSync(path), `Missing: ${path}`)
for (const path of required.filter((p) => /\.(ts|tsx)$/.test(p))) {
  const source = ts.createSourceFile(path, readFileSync(path,'utf8'), ts.ScriptTarget.Latest, true, path.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
  assert.equal(source.parseDiagnostics.length, 0, `TS syntax issue in ${path}`)
}
// Only run a pure translation object through an isolated vm, not any app/network code.
const translated = ts.transpileModule(readFileSync('lib/ui-copy.ts','utf8'), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS }
}).outputText
const sandbox = { exports: {} }
vm.runInNewContext(translated, sandbox, {timeout:1000})
const { uiCopy, getUiCopy } = sandbox.exports
const en = Object.keys(uiCopy.en).sort()
const bn = Object.keys(uiCopy.bn).sort()
assert.deepEqual(en,bn,'Missing EN/BN translation keys')
assert(en.length > 65,'Expected meaningful bilingual coverage')
assert.equal(getUiCopy('bn').cartEmpty, 'আপনার কার্ট খালি')
const client = readFileSync('lib/api/client.ts','utf8')
assert(client.includes('https:') && client.includes('credentials: \'include\''))
const auth = readFileSync('components/account/auth-preview.tsx','utf8')
assert(auth.includes('disabled') && !auth.includes('fetch('),'Demo sign-in must not send credentials')
const checkout = readFileSync('components/checkout/checkout-client.tsx','utf8')
assert(checkout.includes('disabled'), 'Live checkout must remain disabled')
console.log(`Patch 06 verification passed: ${en.length} EN/BN copy keys, source syntax, API/checkout guards.`)
console.log('Not a full Next.js build, browser test, accessibility audit or real API integration test.')
