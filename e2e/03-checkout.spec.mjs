import { test, expect } from '@playwright/test'
import { addHeadphones, click, fill, go, select } from './helpers.mjs'

async function completeAddress(page, country = 'United States') {
  await fill(
    page,
    page.locator('#checkout-name'),
    'Test Shopper',
    'Enter sample name',
  )
  await fill(
    page,
    page.locator('#checkout-email'),
    'shopper@example.test',
    'Enter test email',
  )
  await fill(
    page,
    page.locator('#checkout-phone'),
    '+15550001111',
    'Enter sample phone',
  )
  await select(
    page,
    page.locator('#checkout-country'),
    country,
    'Choose destination',
  )
  await fill(
    page,
    page.locator('#checkout-line1'),
    '12 Example Street',
    'Enter sample street',
  )
  await fill(
    page,
    page.locator('#checkout-city'),
    'Austin',
    'Enter sample city',
  )
  await fill(
    page,
    page.locator('#checkout-region'),
    'Texas',
    'Enter sample region',
  )
  await fill(
    page,
    page.locator('#checkout-postcode'),
    '78701',
    'Enter postal code',
  )
  await click(
    page,
    page.getByRole('button', { name: /continue to delivery/i }),
    'Proceed to delivery preview',
  )
  await expect(page.getByRole('heading', { name: /delivery/i })).toBeVisible()
}

test('empty cart prevents checkout preview', async ({ page }) => {
  await go(page, '/checkout')
  await expect(page.locator('main [role="alert"]')).toBeVisible()
  await expect(
    page.getByRole('link', { name: /return to cart/i }),
  ).toBeVisible()
})

test('international checkout preview → no real payment', async ({ page }) => {
  await addHeadphones(page)
  await go(page, '/cart')
  await click(
    page,
    page.locator('a[href="/checkout"]').first(),
    'Open checkout preview',
  )
  await expect(
    page.getByRole('button', { name: /bangladesh|international delivery/i }),
  ).toHaveCount(0)
  await expect(page.locator('#checkout-country')).toBeVisible()
  await completeAddress(page)
  await click(
    page,
    page.locator('input[name="delivery-method"]').nth(1),
    'Select priority delivery',
  )
  await click(
    page,
    page.getByRole('button', { name: /review your order/i }),
    'Proceed to review',
  )
  await expect(
    page.getByRole('heading', { name: /review your order/i }),
  ).toBeVisible()
  await expect(page.getByText('Test Shopper')).toBeVisible()
  await expect(
    page.getByRole('button', { name: /secure payment coming later/i }),
  ).toBeDisabled()
})

test('destination country selection works without resetting the address', async ({
  page,
}) => {
  await addHeadphones(page)
  await go(page, '/checkout')
  await fill(
    page,
    page.locator('#checkout-name'),
    'Example Shopper',
    'Enter sample name',
  )
  await select(
    page,
    page.locator('#checkout-country'),
    'Canada',
    'Choose Canada',
  )
  await expect(page.locator('#checkout-name')).toHaveValue('Example Shopper')
  await expect(page.locator('#checkout-country')).toHaveValue('Canada')
  await expect(page.locator('main')).not.toContainText('Bangladesh')
  await completeAddress(page, 'Canada')
  await click(
    page,
    page.getByRole('button', { name: /review your order/i }),
    'Review order preview',
  )
  await expect(page.getByText('Canada').first()).toBeVisible()
  await expect(
    page.getByRole('button', { name: /secure payment coming later/i }),
  ).toBeDisabled()
})
