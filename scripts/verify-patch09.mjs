import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import vm from 'node:vm'

const require = createRequire(import.meta.url)
const ts = require('typescript')

const required = [
  'app/layout.tsx',
  'app/globals.css',
  'components/layout/header.tsx',
  'components/store/collection-tabs.tsx',
  'components/store/shop-client.tsx',
  'components/ui/page-skeleton.tsx',
  'lib/ux-navigation.ts',
  'lib/shop-query.ts',
  'app/shop/loading.tsx',
  'app/product/[slug]/loading.tsx',
  'app/account/loading.tsx',
  'app/checkout/loading.tsx',
  'docs/PATCH_09_NOTES.md',
  'docs/QA_CHECKLIST.md',
  'PROJECT_PROGRESS.md',
]

function text(file) {
  assert(existsSync(file), `Missing file: ${file}`)
  return readFileSync(file, 'utf8')
}

for (const file of required) {
  const content = text(file)
  if (!/\.[tm]sx?$/.test(file)) continue
  const parsed = ts.createSourceFile(
    file,
    content,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith('tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  )
  assert.equal(parsed.parseDiagnostics.length, 0, `Syntax failure: ${file}`)
  for (const match of content.matchAll(/from\s*['"](@\/[^'"]+)['"]/g)) {
    const base = match[1].slice(2)
    assert(
      ['.ts', '.tsx', '.js', '.mjs'].some((ext) => existsSync(base + ext)) ||
        existsSync(path.join(base, 'index.tsx')),
      `Broken import ${match[1]} in ${file}`,
    )
  }
}

/** Execute dependency-free TypeScript helpers as CommonJS for real behavior tests. */
function loadPureModule(file) {
  const content = text(file)
  const compiled = ts.transpileModule(content, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  })
  const module = { exports: {} }
  vm.runInNewContext(compiled.outputText, {
    module,
    exports: module.exports,
    URLSearchParams,
  })
  return module.exports
}

const { nextHorizontalIndex } = loadPureModule('lib/ux-navigation.ts')
assert.equal(nextHorizontalIndex(0, 'ArrowRight', 4), 1)
assert.equal(
  nextHorizontalIndex(3, 'ArrowRight', 4),
  0,
  'Right arrow must wrap',
)
assert.equal(nextHorizontalIndex(0, 'ArrowLeft', 4), 3, 'Left arrow must wrap')
assert.equal(nextHorizontalIndex(2, 'Home', 4), 0)
assert.equal(nextHorizontalIndex(1, 'End', 4), 3)
assert.equal(
  nextHorizontalIndex(1, 'Tab', 4),
  null,
  'Tab must be handled by browser',
)
assert.equal(nextHorizontalIndex(0, 'ArrowRight', 0), null)
assert.equal(nextHorizontalIndex(-1, 'Home', 4), null)

const { buildShopQuery } = loadPureModule('lib/shop-query.ts')
const defaults = {
  text: '',
  category: '',
  tag: '',
  sort: 'featured',
  price: 'all',
  stockOnly: false,
}
assert.equal(buildShopQuery(defaults), '/shop')
assert.equal(
  buildShopQuery({ ...defaults, category: 'footwear', stockOnly: true }),
  '/shop?category=footwear&stock=1',
)
assert.equal(
  buildShopQuery({ ...defaults, text: ' নীল জুতা ', sort: 'price-asc' }),
  '/shop?q=%E0%A6%A8%E0%A7%80%E0%A6%B2+%E0%A6%9C%E0%A7%81%E0%A6%A4%E0%A6%BE&sort=price-asc',
)
assert.equal(
  buildShopQuery({ ...defaults, tag: 'sale', price: '2' }),
  '/shop?tag=sale&price=2',
)

assert(
  text('app/layout.tsx').includes('className="skip-to-content"'),
  'Missing keyboard skip link',
)
assert(
  text('app/layout.tsx').includes('tabIndex={-1}'),
  'Main target should accept programmatic focus',
)
assert(
  text('components/store/collection-tabs.tsx').includes('onTabKeyDown'),
  'Missing accessible tab keyboard handler',
)
assert(
  text('components/store/shop-client.tsx').includes('onFilterEscape'),
  'Missing Escape handling for mobile filters',
)
assert(
  text('components/store/shop-client.tsx').includes('aria-pressed'),
  'Missing category chip state',
)
for (const route of ['shop', 'product/[slug]', 'account', 'checkout']) {
  assert(
    text(`app/${route}/loading.tsx`).includes('PageSkeleton'),
    `Missing route skeleton for ${route}`,
  )
}
// Keep the critical safety boundary throughout frontend-only work.
assert(
  text('components/checkout/checkout-client.tsx').includes('disabled'),
  'Checkout payment preview must remain disabled',
)
assert(
  !text('components/account/auth-preview.tsx').includes('fetch('),
  'Auth preview must not submit credentials',
)
assert(
  text('stores/commerce-store.ts').includes('kookaburra-storefront-preview-v1'),
  'Cart persistence key changed',
)

console.log(
  'Patch 09 UX checks passed: keyboard navigation, shareable shop URLs, source integrity, loading routes and preview safety.',
)
console.log(
  'Still required on your machine: npm run check, browser keyboard tests and responsive QA.',
)
