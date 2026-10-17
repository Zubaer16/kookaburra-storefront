import { readFileSync, existsSync } from 'node:fs'
import assert from 'node:assert/strict'
const required = ['lib/preview-copy.ts','lib/preview-delivery-label.ts','hooks/use-preview-copy.ts','components/checkout/checkout-client.tsx','components/checkout/address-form.tsx','components/checkout/delivery-options.tsx','components/checkout/order-summary.tsx','components/account/auth-preview.tsx','components/account/order-ui.tsx','app/account/orders/page.tsx','components/account/tracking-client.tsx','components/store/product-options.tsx','components/store/product-gallery.tsx']
for (const file of required) assert.ok(existsSync(file), `Missing ${file}`)
const source = readFileSync('lib/preview-copy.ts','utf8')
const english = /const en = (\{[\s\S]*?\}) as const/.exec(source)?.[1]
const bangla = /const bn: Record<keyof typeof en, string> = (\{[\s\S]*?\})\n\nexport/.exec(source)?.[1]
assert.ok(english && bangla, 'EN/BN dictionaries missing')
const en = JSON.parse(english), bn = JSON.parse(bangla)
assert.deepEqual(Object.keys(en).sort(),Object.keys(bn).sort(), 'Mismatched translations')
assert.ok(Object.keys(en).length >= 100, 'Missing translation coverage')
for (const [key,val] of Object.entries(bn)) assert.ok(typeof val === 'string' && val.length > 0, `Empty Bangla translation: ${key}`)
for (const path of ['components/checkout/checkout-client.tsx','components/checkout/address-form.tsx','components/account/auth-preview.tsx']) assert.ok(readFileSync(path,'utf8').includes('PreviewCopy'), `Translation not wired: ${path}`)
console.log(`Patch 07 offline structural check passed: ${required.length} core files, ${Object.keys(en).length} bilingual keys.`)
