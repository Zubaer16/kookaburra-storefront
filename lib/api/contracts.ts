/** Proposed API contract draft (v1). Not connected to a running server. */
export type LocaleCode = 'en'
export type CurrencyCode = 'USD'
export type ApiMoney = { amountMinor: number; currency: CurrencyCode }
export type ApiPage<T> = {
  items: T[]
  page: number
  pageSize: number
  total: number
}
export type ApiCategory = {
  id: string
  slug: string
  parentId: string | null
  name: Record<LocaleCode, string>
  imageUrl?: string
  sortOrder: number
  active: boolean
}
export type ApiVariant = {
  id: string
  sku: string
  options: Record<string, string>
  available: boolean
  /** Client-side inventory quantities are not authoritative. */
}
export type ApiProduct = {
  id: string
  slug: string
  categoryIds: string[]
  title: Record<LocaleCode, string>
  description: Record<LocaleCode, string>
  images: { url: string; alt: Record<LocaleCode, string> }[]
  variants: ApiVariant[]
  price: ApiMoney
  compareAt?: ApiMoney
  purchasable: boolean
}
export type ApiCartItem = {
  productId: string
  variantId: string | null
  quantity: number
}
export type ApiCart = { id: string; items: ApiCartItem[]; updatedAt: string }
export type ApiAddress = {
  recipient: string
  email: string
  phone: string
  line1: string
  line2?: string
  city: string
  region: string
  postalCode: string
  countryCode: string
}
export type ApiDeliveryOption = {
  id: string
  label: string
  estimate: string
  fee: ApiMoney
}
export type ApiCheckoutQuote = {
  quoteId: string
  currency: CurrencyCode
  lines: {
    productId: string
    variantId: string | null
    quantity: number
    unitPrice: ApiMoney
    lineTotal: ApiMoney
  }[]
  subtotal: ApiMoney
  shipping: ApiMoney
  tax: ApiMoney
  total: ApiMoney
  deliveryOptions: ApiDeliveryOption[]
  expiresAt: string
}
export type ApiOrder = {
  id: string
  number: string
  status:
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'refunded'
  total: ApiMoney
  placedAt: string
  tracking?: {
    carrier?: string
    trackingNumber?: string
    events: { occurredAt: string; label: string }[]
  }
}

/** Preview frontend never constructs a payment amount for settlement. Server quote wins. */
export type QuoteRequest = {
  destination: ApiAddress
  items: ApiCartItem[]
}
