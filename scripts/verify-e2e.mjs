import { existsSync, readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

const required = [
  'playwright.config.mjs',
  'e2e/helpers.mjs',
  'e2e/01-discovery.spec.mjs',
  'e2e/02-shopping.spec.mjs',
  'e2e/03-checkout.spec.mjs',
  'e2e/04-account-mobile.spec.mjs',
  'docs/E2E_TESTING.md',
]
for (const file of required) {
  if (!existsSync(file)) throw new Error(`Missing: ${file}`)
  if (file.endsWith('.mjs'))
    execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' })
}
const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
if (!pkg.devDependencies?.['@playwright/test'])
  throw new Error('Missing @playwright/test dev dependency')
if (!pkg.scripts?.['test:e2e:visual']?.includes('--headed'))
  throw new Error('Missing headed browser runner')
const config = readFileSync('playwright.config.mjs', 'utf8')
const helpers = readFileSync('e2e/helpers.mjs', 'utf8')
if (!config.includes('workers: 1')) throw new Error('Non-sequential E2E config')
if (!helpers.includes("'900'")) throw new Error('Missing 900ms visual default')
if (!config.includes('retain-on-failure'))
  throw new Error('Trace/video policy missing')
const suites = required.filter((file) => file.endsWith('.spec.mjs'))
const total = suites.reduce(
  (n, file) =>
    n + (readFileSync(file, 'utf8').match(/\btest\('/g) || []).length,
  0,
)
if (total < 12) throw new Error(`Insufficient E2E journeys: ${total}`)
console.log(
  `E2E source verification passed (${total} automated scenarios in ${suites.length} suites).`,
)
console.log(
  'This is not a browser run; install Playwright and run npm run test:e2e:visual.',
)
