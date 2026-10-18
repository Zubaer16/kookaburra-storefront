import { test, expect } from '@playwright/test'
import {
  action,
  addHeadphones,
  chooseSneaker,
  click,
  go,
  select,
} from './helpers.mjs'

test('product gallery → color/size → variant-aware cart', async ({ page }) => {
  await go(page, '/product/motion-everyday-sneaker')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Motion')
  await expect(page.getByTestId('product-add-to-cart')).toBeDisabled()
  await click(
    page,
    page.getByRole('button', { name: 'Next product image' }),
    'View next gallery image',
  )
  await chooseSneaker(page)
  await click(
    page,
    page.getByTestId('product-add-to-cart'),
    'Add selected sneaker variant',
  )
  await go(page, '/cart')
  await expect(page.locator('[data-cart-line]')).toHaveCount(1)
  await expect(page.locator('[data-cart-line]').first()).toContainText('42')
  await go(page, '/product/motion-everyday-sneaker')
  await chooseSneaker(page, { color: 'Cloud White', size: '43' })
  await click(
    page,
    page.getByTestId('product-add-to-cart'),
    'Add another sneaker size',
  )
  await go(page, '/cart')
  await expect(page.locator('[data-cart-line]')).toHaveCount(2)
})

test('cart quantity → persistence → remove → empty state', async ({ page }) => {
  await addHeadphones(page)
  await go(page, '/cart')
  await expect(page.locator('[data-cart-line]')).toHaveCount(1)
  await click(
    page,
    page.getByRole('button', { name: /increase quantity/i }),
    'Increase product quantity',
  )
  await expect(page.locator('[data-cart-line]').first()).toContainText('2')
  await action(page, 'Reload the cart', () => page.reload())
  await expect(page.locator('[data-cart-line]')).toHaveCount(1)
  await expect(page.locator('[data-cart-line]').first()).toContainText('2')
  await click(
    page,
    page.getByRole('button', { name: /remove from cart: sonic/i }),
    'Remove cart product',
  )
  await expect(page.locator('[data-cart-line]')).toHaveCount(0)
  await expect(page.getByRole('heading', { name: /empty/i })).toBeVisible()
})

test('wishlist → sort → confirm clear', async ({ page }) => {
  await go(page, '/product/sonic-wireless-headphones')
  await click(
    page,
    page.getByTestId('product-wishlist-toggle'),
    'Save headphones to wishlist',
  )
  await go(page, '/product/motion-everyday-sneaker')
  await click(
    page,
    page.getByTestId('product-wishlist-toggle'),
    'Save sneakers to wishlist',
  )
  await go(page, '/wishlist')
  await expect(
    page
      .locator('article')
      .filter({ has: page.locator('a[href^="/product/"]') }),
  ).toHaveCount(2)
  await select(
    page,
    page.locator('#wishlist-sort'),
    'price-high',
    'Sort wishlist by descending price',
  )
  await click(
    page,
    page.getByRole('button', { name: /clear all/i }),
    'Request to clear wishlist',
  )
  await expect(
    page.getByRole('alert', { name: 'Confirm clearing wishlist' }),
  ).toBeVisible()
  await click(
    page,
    page.getByRole('button', { name: /cancel/i }),
    'Cancel clearing wishlist',
  )
  await expect(page.locator('#wishlist-sort')).toBeVisible()
  await click(
    page,
    page.getByRole('button', { name: /clear all/i }),
    'Request to clear wishlist again',
  )
  await click(
    page,
    page.getByRole('button', { name: /clear wishlist/i }),
    'Confirm clear wishlist',
  )
  await expect(
    page.getByRole('heading', { name: /wishlist is ready/i }),
  ).toBeVisible()
})
