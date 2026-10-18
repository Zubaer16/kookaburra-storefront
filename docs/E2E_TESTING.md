# End-to-End Browser Testing

This storefront uses Playwright Test to automate real browser journeys in a visible, reviewable way. The tests cover **only the UI preview**; backend authentication, live orders and Stripe payments are not enabled.

## First-time setup (Windows / PowerShell)

```powershell
nvm use 24
npm install
npx playwright install chromium
npm run test:e2e:list
npm run test:e2e:visual
```

The visual command starts the Next.js development server automatically at `http://127.0.0.1:3100` (unless one is already running), opens **Chromium** at a laptop-friendly **1120 × 600** viewport (1050 × 600 initial outer window), runs tests sequentially and waits **900 ms after each recorded UI action**. You do **not** need to start `npm run dev` first. No additional Stripe setup is needed.

## Other commands

```powershell
npm run test:e2e             # headless, 900 ms action pacing by default
npm run test:e2e:report      # open the latest HTML report
npm run test:e2e:list        # list the cases without starting a browser
```

For a faster headless run, change the optional delay:

```powershell
$env:E2E_STEP_MS='0'
npm run test:e2e
Remove-Item Env:E2E_STEP_MS
```

The visual run defaults to 900 ms if the variable is unset. Assertions use Playwright's own auto-wait; the pause is **for observation**, not a replacement for element readiness. `test-results/` and `playwright-report/` are ignored by Git; screenshots, video and traces are retained for failures. Each test starts with a fresh browser context so one shopping journey does not contaminate another.

To run against an existing server instead of starting one automatically:

```powershell
$env:E2E_BASE_URL='http://localhost:3000'
npm run test:e2e:visual
Remove-Item Env:E2E_BASE_URL
```

## Coverage

- Homepage discovery and keyboard-operable collections
- Category navigation and footwear listings
- Shop search, empty results, reset, sorting, URL filters
- USD-only pricing and absence of currency selection
- Product gallery, size/color selection, and variant-specific cart lines
- Cart add/update/persist/remove and wishlist sorting/clear confirmation
- Checkout empty-cart guard, sample address/delivery/review for Bangladesh and abroad
- Explicitly disabled payment and authentication safety checks
- Account, sample orders and tracking
- Mobile navigation and Escape-to-close filtering, plus a 404 smoke check

The responsive smoke test checks 320–1024px widths in the visible browser and launches a separate, temporary **headless Chromium** instance for the full 1440px check, avoiding screen overflow. A screenshot, browser trace and video are collected on test failure. To inspect a failed trace, open the HTML report or use `npx playwright show-trace <path-to-trace.zip>`.

## Troubleshooting

1. If Chromium is missing: `npx playwright install chromium`.
2. If port 3100 is busy, shut down the existing server on that port or point `E2E_BASE_URL` at a running storefront.
3. On a failure, inspect `playwright-report/index.html` and `test-results/artifacts/` before rerunning. The test failure may reflect a genuine UI regression.
4. After first-time install, commit both `package.json` and the regenerated `package-lock.json` so `npm ci` works for future checkouts.

Tests are designed to fail when actual UI behavior differs from expectations. A successful source/syntax check alone does not establish a browser-pass result.

## Laptop-friendly visual mode

Visual Chromium uses an 1120 × 600 viewport (outer window 1160 × 710), with a 900 ms pause following each scripted action. The 1440 px layout check runs headlessly. If the browser exceeds the available Windows display area, adjust these two dimensions in `playwright.config.mjs`.

Change visible window size from PowerShell (optional):

```powershell
$env:E2E_VIEWPORT_WIDTH = "1100"
$env:E2E_VIEWPORT_HEIGHT = "580"
npm run test:e2e:visual
```

Use `Remove-Item Env:E2E_VIEWPORT_WIDTH, Env:E2E_VIEWPORT_HEIGHT -ErrorAction SilentlyContinue` to restore defaults.
