import { test, expect } from '@playwright/test'
import { addHeadphones, click, fill, go, select } from './helpers.mjs'

async function completeAddress(page, intl = false) {
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
    intl ? '+15550001111' : '01700000000',
    'Enter sample phone',
  )
  if (intl)
    await select(
      page,
      page.locator('#checkout-country'),
      'United States',
      'Choose sample destination',
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
    intl ? 'Austin' : 'Dhaka',
    'Enter sample city',
  )
  await fill(
    page,
    page.locator('#checkout-region'),
    intl ? 'Texas' : 'Dhaka',
    'Enter sample region',
  )
  await fill(
    page,
    page.locator('#checkout-postcode'),
    intl ? '78701' : '1200',
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

test('Bangladesh full checkout preview → no real payment', async ({ page }) => {
  await addHeadphones(page)
  await go(page, '/cart')
  await click(
    page,
    page.locator('a[href="/checkout"]').first(),
    'Open checkout preview',
  )
  await click(
    page,
    page.getByRole('button', { name: /bangladesh delivery/i }),
    'Choose Bangladesh delivery destination',
  )
  await expect(page.locator('#checkout-country')).toHaveValue('Bangladesh')
  await completeAddress(page)
  await click(
    page,
    page.locator('input[name="delivery-method"]').nth(1),
    'Select priority delivery',
  )
  await click(
    page,
    page.getByRole('button', { name: /review your order/i }),
    'Proceed to order review',
  )
  await expect(
    page.getByRole('heading', { name: /review your order/i }),
  ).toBeVisible()
  await expect(page.getByText('Test Shopper')).toBeVisible()
  await expect(
    page.getByRole('button', { name: /secure payment coming later/i }),
  ).toBeDisabled()
  await expect(
    page.getByText(/payment.*disabled|no.*charge|no real/i).first(),
  ).toBeVisible()
})

test('International checkout resets previous address when market changes', async ({
  page,
}) => {
  await addHeadphones(page)
  await go(page, '/checkout')
  await click(
    page,
    page.getByRole('button', { name: /international/i }),
    'Change checkout region to international',
  )
  await expect(page.locator('#checkout-country')).toHaveJSProperty(
    'tagName',
    'SELECT',
  )
  await completeAddress(page, true)
  await click(
    page,
    page.getByRole('button', { name: /review your order/i }),
    'Review international order preview',
  )
  await expect(
    page.getByRole('button', { name: /secure payment coming later/i }),
  ).toBeDisabled()
  await click(
    page,
    page.getByRole('button', { name: /bangladesh/i }),
    'Change checkout back to Bangladesh',
  )
  await expect(page.locator('#checkout-name')).toHaveValue('')
  await expect(page.locator('#checkout-country')).toHaveValue('Bangladesh')
})
