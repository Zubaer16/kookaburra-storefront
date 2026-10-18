/** browser-only checkout UI fixtures. NOT server pricing or shipping quotes. */
import {
  cartLineKey,
  productById,
  productPrice,
  productVariant,
  type Product,
  type ProductVariant,
} from '@/lib/catalog'
import type { CartLine } from '@/stores/commerce-store'

export type CheckoutStage = 'address' | 'delivery' | 'review'
export type CheckoutAddress = {
  fullName: string
  email: string
  phone: string
  address1: string
  address2: string
  city: string
  region: string
  postalCode: string
  country: string
}
export type CheckoutDeliveryId = 'standard' | 'express'
export type CheckoutDelivery = {
  id: CheckoutDeliveryId
  name: string
  details: string
  sampleFee: number
  eta: string
}
export type CheckoutPreviewLine = {
  item: CartLine
  product: Product
  variant?: ProductVariant
  lineTotal: number
}

export function checkoutDeliveryOptions(): CheckoutDelivery[] {
  // Illustrative options only; country eligibility, shipping rates and timing
  // must be calculated and confirmed by a future backend.
  return [
    {
      id: 'standard',
      name: 'International standard',
      details: 'Example cross-border shipping',
      eta: 'Timing to be confirmed',
      sampleFee: 18,
    },
    {
      id: 'express',
      name: 'International priority',
      details: 'Example expedited shipping',
      eta: 'Availability to be confirmed',
      sampleFee: 35,
    },
  ]
}

export function assessPreviewCart(cart: CartLine[]) {
  const issues: string[] = []
  const rows: CheckoutPreviewLine[] = []
  const combinedQuantities = new Map<string, number>()
  if (cart.length === 0) issues.push('Your cart is empty.')
  for (const item of cart) {
    const product = productById(item.productId)
    if (!product) {
      issues.push(
        'Your cart contains a product that is no longer in the sample catalog.',
      )
      continue
    }
    const variant = productVariant(product, item.variantId)
    if (product.variants?.length && !variant) {
      issues.push(
        `${product.title}: select a valid size or color on the product page and remove the old cart line.`,
      )
      continue
    }
    if (!Number.isSafeInteger(item.quantity) || item.quantity <= 0) {
      issues.push(`${product.title}: invalid quantity.`)
      continue
    }
    const key = cartLineKey(product.id, variant?.id)
    combinedQuantities.set(
      key,
      (combinedQuantities.get(key) ?? 0) + item.quantity,
    )
    rows.push({
      item,
      product,
      variant,
      lineTotal: productPrice(product) * item.quantity,
    })
  }
  for (const [key, count] of combinedQuantities) {
    const row = rows.find(
      (r) => cartLineKey(r.product.id, r.variant?.id) === key,
    )
    if (!row) continue
    const stock = row.product.variants
      ? (row.variant?.stock ?? 0)
      : row.product.stock
    if (count > stock)
      issues.push(
        `${row.product.title}: sample quantity exceeds available stock.`,
      )
  }
  return {
    rows,
    issues: Array.from(new Set(issues)),
    subtotal: rows.reduce((sum, row) => sum + row.lineTotal, 0),
    itemCount: rows.reduce((sum, row) => sum + row.item.quantity, 0),
    readyForPreview: issues.length === 0,
  }
}

export const previewCountries = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'United Arab Emirates',
  'Singapore',
  'Malaysia',
  'India',
  'Other country',
] as const

export function emptyCheckoutAddress(): CheckoutAddress {
  return {
    fullName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
  }
}
