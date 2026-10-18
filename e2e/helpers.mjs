import { expect, test } from '@playwright/test'

/** Visual delay is deliberately AFTER each meaningful user event, never instead of auto-wait/assertions. */
const parsed = Number(process.env.E2E_STEP_MS ?? '900')
export const stepDelayMs = Number.isFinite(parsed)
  ? Math.min(10_000, Math.max(0, parsed))
  : 900

export async function action(page, description, fn) {
  return test.step(description, async () => {
    const value = await fn()
    if (stepDelayMs) await page.waitForTimeout(stepDelayMs)
    return value
  })
}

export async function go(page, path) {
  return action(page, `Open ${path}`, () =>
    page.goto(path, { waitUntil: 'domcontentloaded' }),
  )
}

export async function click(page, locator, description) {
  return action(page, description, () => locator.click())
}

export async function fill(page, locator, value, description) {
  return action(page, description, () => locator.fill(value))
}

export async function select(page, locator, value, description) {
  return action(page, description, () => locator.selectOption(value))
}

export async function press(page, locator, key, description) {
  return action(page, description, () => locator.press(key))
}

export async function chooseSneaker(
  page,
  { color = 'Cloud White', size = '42' } = {},
) {
  const colorGroup = page.getByRole('group', { name: /color/i })
  // A fieldset is exposed as a group in Chromium's accessibility tree.
  await click(
    page,
    colorGroup.getByRole('button', { name: color }),
    `Choose ${color} color`,
  )
  const sizeGroup = page.getByRole('group', { name: /size/i })
  await click(
    page,
    sizeGroup.getByRole('button', { name: size, exact: true }),
    `Choose size ${size}`,
  )
  await expect(page.getByTestId('product-add-to-cart')).toBeEnabled()
}

export async function addHeadphones(page) {
  await go(page, '/product/sonic-wireless-headphones')
  await expect(
    page.getByRole('heading', { name: /sonic studio wireless headphones/i }),
  ).toBeVisible()
  await click(
    page,
    page.getByTestId('product-add-to-cart'),
    'Add headphones to cart',
  )
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('dialog')).toContainText(
    'Sonic Studio Wireless Headphones',
  )
}
