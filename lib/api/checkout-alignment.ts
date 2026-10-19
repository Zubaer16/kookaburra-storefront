/**
 * Non-submitting checkout draft boundary, shared with the Admin API contract.
 * Not a checkout quote. Shipping/tax/discount totals MUST come from the server.
 */
import {
  assessPreviewCart,
  type CheckoutAddress,
  type CheckoutDeliveryId,
} from '@/lib/checkout-preview'
import {
  cartToApiItems,
  previewMoney,
  variantToApi,
} from '@/lib/api/storefront-adapters'
import type { ApiAddress, ApiMoney, QuoteRequest } from '@/lib/api/contracts'
import type { CartLine } from '@/stores/commerce-store'

export const previewCountryCodes = {
  'United States': 'US',
  'United Kingdom': 'GB',
  Canada: 'CA',
  Australia: 'AU',
  'United Arab Emirates': 'AE',
  Singapore: 'SG',
  Malaysia: 'MY',
  India: 'IN',
} as const

/** "Other country" deliberately has no ISO value: never invent a country. */
export function countryCodeForPreview(name: string): string | null {
  return Object.prototype.hasOwnProperty.call(previewCountryCodes, name)
    ? previewCountryCodes[name as keyof typeof previewCountryCodes]
    : null
}

export type PreviewOrderLineDraft = {
  productId: string
  variantId: string | null
  sku: string | null
  optionSnapshot: Record<string, string>
  quantity: number
  /** Illustrative only; real unit and line prices must be quoted server-side. */
  illustrativeUnitPrice: ApiMoney
  illustrativeLineTotal: ApiMoney
}

export type CheckoutAlignmentDraft = {
  selectedDeliveryId: CheckoutDeliveryId
  /** This can feed a FUTURE quote request; it is not submitted here. */
  request: QuoteRequest
  lines: PreviewOrderLineDraft[]
  previewOnly: true
}

export type CheckoutAlignmentResult =
  | { ready: true; draft: CheckoutAlignmentDraft; issues: [] }
  | { ready: false; draft: null; issues: string[] }

export function checkoutAddressToApi(
  address: CheckoutAddress,
): ApiAddress | null {
  const countryCode = countryCodeForPreview(address.country)
  if (!countryCode) return null
  return {
    recipient: address.fullName.trim(),
    email: address.email.trim(),
    phone: address.phone.trim(),
    line1: address.address1.trim(),
    ...(address.address2.trim() ? { line2: address.address2.trim() } : {}),
    city: address.city.trim(),
    region: address.region.trim(),
    postalCode: address.postalCode.trim(),
    countryCode,
  }
}

export function buildCheckoutAlignmentDraft(
  lines: readonly CartLine[],
  address: CheckoutAddress,
  deliveryId: CheckoutDeliveryId,
): CheckoutAlignmentResult {
  const assessed = assessPreviewCart([...lines])
  const issues = [...assessed.issues]
  const destination = checkoutAddressToApi(address)
  if (!destination)
    issues.push(
      'Select a specific supported destination before requesting a real shipping quote.',
    )
  if (
    destination &&
    [
      destination.recipient,
      destination.email,
      destination.phone,
      destination.line1,
      destination.city,
      destination.region,
      destination.postalCode,
    ].some((field) => !field)
  )
    issues.push('Complete the destination address.')
  if (issues.length || !destination)
    return { ready: false, draft: null, issues }
  const previewLines: PreviewOrderLineDraft[] = assessed.rows.map(
    ({ item, product, variant }) => ({
      productId: product.id,
      variantId: variant?.id ?? null,
      // A variant SKU is known only for selected catalog variants; don't invent one.
      sku: variant?.sku ?? null,
      optionSnapshot: variant ? variantToApi(variant).options : {},
      quantity: item.quantity,
      illustrativeUnitPrice: previewMoney(product.price),
      illustrativeLineTotal: previewMoney(product.price * item.quantity),
    }),
  )
  return {
    ready: true,
    issues: [],
    draft: {
      selectedDeliveryId: deliveryId,
      request: { destination, items: cartToApiItems(lines) },
      lines: previewLines,
      previewOnly: true,
    },
  }
}
