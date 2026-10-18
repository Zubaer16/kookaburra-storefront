import { test, expect, chromium } from '@playwright/test'
import { action, click, fill, go, press, select } from './helpers.mjs'

test('account → orders filter → detail → tracking', async ({ page }) => {
  await go(page, '/account')
  await expect(page.locator('a[href="/sign-in"]').first()).toBeVisible()
  await click(
    page,
    page.locator('a[href="/account/orders"]').first(),
    'Open sample orders',
  )
  await expect(page.locator('#orders-title')).toBeVisible()
  await fill(
    page,
    page.locator('input[type="search"]'),
    'DEMO-BD-1042',
    'Find sample order',
  )
  await expect(
    page.locator('a[href="/account/orders/DEMO-BD-1042"]').first(),
  ).toBeVisible()
  await click(
    page,
    page.locator('a[href="/account/orders/DEMO-BD-1042"]').first(),
    'Open sample order detail',
  )
  await expect(page.getByText('DEMO-BD-1042').first()).toBeVisible()
  await go(page, '/track')
  await select(
    page,
    page.locator('#tracking-sample'),
    'DEMO-INT-0831',
    'Select international sample tracking',
  )
  await expect(
    page.locator('a[href="/account/orders/DEMO-INT-0831"]').first(),
  ).toBeVisible()
})

test('sign-in and sign-up prevent real credential submission', async ({
  page,
}) => {
  await go(page, '/sign-in')
  await expect(page.locator('input[type="email"]')).toBeDisabled()
  await expect(page.locator('input[type="password"]')).toBeDisabled()
  await go(page, '/sign-up')
  await expect(page.locator('input[type="email"]')).toBeDisabled()
  await expect(page.locator('input[type="password"]')).toHaveCount(2)
  await expect(page.locator('input[type="password"]').first()).toBeDisabled()
})

test('mobile navigation and filter drawer keyboard escape', async ({
  page,
}) => {
  await action(page, 'Set mobile screen 390×844', () =>
    page.setViewportSize({ width: 390, height: 844 }),
  )
  await go(page, '/')
  await expect(page.locator('body')).toBeVisible()
  await click(
    page,
    page.getByRole('button', { name: 'Open navigation' }),
    'Open mobile navigation drawer',
  )
  await expect(page.getByRole('dialog')).toBeVisible()
  await click(
    page,
    page.getByRole('button', { name: 'Close navigation' }),
    'Close mobile navigation drawer',
  )
  await expect(page.getByRole('dialog')).toBeHidden()
  await go(page, '/shop')
  const filters = page.getByRole('button', { name: /^filters/i })
  await click(page, filters, 'Open mobile filter panel')
  await expect(filters).toHaveAttribute('aria-expanded', 'true')
  await press(
    page,
    page.locator('#shop-filter-panel').getByRole('button').first(),
    'Escape',
    'Close filters with Escape',
  )
  await expect(filters).toHaveAttribute('aria-expanded', 'false')
  await expect(filters).toBeFocused()
})

test('404 error route is rendered without application crash', async ({
  page,
}) => {
  await go(page, '/this-page-should-not-exist')
  await expect(page.locator('main')).toBeVisible()
  await expect(
    page.getByRole('link', { name: /home|shop/i }).first(),
  ).toBeVisible()
})

test('responsive smoke checks at common phone and desktop widths', async ({
  page,
}) => {
  const checkOverflow = async (targetPage, width) => {
    await expect(targetPage.locator('main')).toBeVisible()
    const measure = await targetPage.evaluate(() => ({
      document: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
    }))
    expect(
      measure.document,
      `Unexpected horizontal overflow at ${width}px`,
    ).toBeLessThanOrEqual(measure.viewport + 2)
  }

  await go(page, '/')
  // Resize the *visible* Chromium window only to sizes that fit a laptop.
  // The height stays compact, so Chrome's title bar and taskbar also fit.
  for (const width of [320, 375, 390, 428, 768, 1024]) {
    await action(page, `Resize visible viewport to ${width}px`, () =>
      page.setViewportSize({ width, height: 600 }),
    )
    await checkOverflow(page, width)
  }

  // A true 1440px layout check still runs automatically, but without
  // stretching the visible Chromium window beyond the laptop display.
  const wideBrowser = await chromium.launch({ headless: true })
  try {
    const wideContext = await wideBrowser.newContext({
      baseURL: page.url(),
      viewport: { width: 1440, height: 850 },
    })
    const widePage = await wideContext.newPage()
    await go(widePage, '/')
    await checkOverflow(widePage, 1440)
  } finally {
    await wideBrowser.close()
  }
})
