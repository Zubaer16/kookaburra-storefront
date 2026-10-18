import { test, expect } from '@playwright/test'
import { action, click, fill, go, press, select } from './helpers.mjs'

test('homepage → collections → shop', async ({ page }) => {
  await go(page, '/')
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.getByRole('tab', { name: /for you/i })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  await click(
    page,
    page.getByRole('tab', { name: /new arrivals/i }),
    'Show new arrivals',
  )
  await expect(
    page.getByRole('tab', { name: /new arrivals/i }),
  ).toHaveAttribute('aria-selected', 'true')
  await press(
    page,
    page.getByRole('tab', { name: /new arrivals/i }),
    'ArrowRight',
    'Navigate collections with keyboard',
  )
  await expect(page.getByRole('tab', { name: /great deals/i })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  await click(
    page,
    page.locator('main a[href="/shop"]').first(),
    'Open all products',
  )
  await expect(page).toHaveURL(/\/shop(?:\?|$)/)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('categories → shoes browsing', async ({ page }) => {
  await go(page, '/categories')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await click(
    page,
    page.locator('main a[href="/shop?category=footwear"]').first(),
    'Browse footwear category',
  )
  await expect(page).toHaveURL(/category=footwear/)
  await expect(
    page
      .getByRole('group', { name: 'Categories' })
      .getByRole('button', { name: 'Shoes & Footwear', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true')
  await expect(
    page.locator('a[href="/product/motion-everyday-sneaker"]').first(),
  ).toBeVisible()
})

test('search → empty state → reset → sorting → filters', async ({ page }) => {
  await go(page, '/shop')
  const keyword = page.getByRole('textbox', {
    name: 'Filter products by keyword',
  })
  await fill(page, keyword, 'headphones', 'Search for headphones')
  await expect(page).toHaveURL(/q=headphones/)
  await expect(
    page.locator('a[href="/product/sonic-wireless-headphones"]').first(),
  ).toBeVisible()
  await fill(
    page,
    keyword,
    'zzzz-unlisted-product',
    'Search for a missing product',
  )
  await expect(
    page.getByRole('heading', { name: /no matching products/i }),
  ).toBeVisible()
  await click(
    page,
    page.getByRole('button', { name: /reset filters/i }),
    'Reset search filters',
  )
  await expect(keyword).toHaveValue('')
  await select(
    page,
    page.locator('#sort-products'),
    'price-asc',
    'Sort by price ascending',
  )
  await expect(page).toHaveURL(/sort=price-asc/)
  await click(
    page,
    page
      .getByRole('group', { name: 'Categories' })
      .getByRole('button', { name: 'Fashion', exact: true }),
    'Filter to Fashion',
  )
  await expect(page).toHaveURL(/category=fashion/)
  await expect(
    page
      .getByRole('group', { name: 'Categories' })
      .getByRole('button', { name: 'Fashion', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true')
})

test('storefront uses USD only without a currency switcher', async ({
  page,
}) => {
  await go(page, '/shop')
  await expect(page.locator('main').first()).toContainText('$')
  await expect(page.locator('#market')).toHaveCount(0)
  await expect(page.locator('main').first()).not.toContainText('৳')
  await go(page, '/account/settings')
  await expect(page.getByText(/all storefront prices.*USD/i)).toBeVisible()
  await expect(page.locator('select')).toHaveCount(0)
})

test('shop price range and in-stock checkbox keep URL state', async ({
  page,
}) => {
  await go(page, '/shop')
  await select(page, page.locator('#price-range'), '1', 'Filter by price range')
  await expect(page).toHaveURL(/price=1/)
  await click(
    page,
    page.locator('aside input[type="checkbox"]'),
    'Enable in-stock-only filter',
  )
  await expect(page).toHaveURL(/stock=1/)
  await click(
    page,
    page.getByRole('button', { name: /clear all/i }),
    'Clear active shop filters',
  )
  await expect(page).toHaveURL(/\/shop$/)
})
