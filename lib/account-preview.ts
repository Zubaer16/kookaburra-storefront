/**
 * Patch 05 public, fictitious demo fixtures. No actual customer or order data.
 * Never use this file as an authentication mechanism or as an order API.
 */
export type PreviewCurrency = 'BDT' | 'USD'
export type PreviewOrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled'
export type PreviewEvent = {
  label: string
  note: string
  date: string
  completed: boolean
}
export type PreviewOrder = {
  id: string
  placedOn: string
  status: PreviewOrderStatus
  market: 'BD' | 'INTL'
  currency: PreviewCurrency
  total: number
  shippingLabel: string
  itemCount: number
  items: { title: string; option: string; quantity: number; unitPrice: number }[]
  events: PreviewEvent[]
}

export const demoOrders: readonly PreviewOrder[] = [
  {
    id: 'DEMO-BD-1042', placedOn: '2026-10-08', status: 'shipped', market: 'BD',
    currency: 'BDT', total: 4320, shippingLabel: 'Bangladesh · Standard delivery', itemCount: 2,
    items: [
      { title: 'Daybreak Cotton Tee', option: 'Navy · M', quantity: 1, unitPrice: 1490 },
      { title: 'Harbor Classic Loafers', option: 'Brown · 41', quantity: 1, unitPrice: 2830 },
    ],
    events: [
      { label: 'Order placed', note: 'Demo order received', date: '2026-10-08', completed: true },
      { label: 'Preparing items', note: 'Sample fulfillment started', date: '2026-10-09', completed: true },
      { label: 'Handed to carrier', note: 'Sample parcel on the way', date: '2026-10-10', completed: true },
      { label: 'Delivered', note: 'Awaiting simulated completion', date: '', completed: false },
    ],
  },
  {
    id: 'DEMO-INT-0831', placedOn: '2026-09-24', status: 'delivered', market: 'INTL',
    currency: 'USD', total: 89, shippingLabel: 'International · Example standard shipping', itemCount: 1,
    items: [{ title: 'Sonic Studio Wireless Headphones', option: 'Standard', quantity: 1, unitPrice: 89 }],
    events: [
      { label: 'Order placed', note: 'Demo order received', date: '2026-09-24', completed: true },
      { label: 'Preparing items', note: 'Sample fulfillment started', date: '2026-09-25', completed: true },
      { label: 'Handed to carrier', note: 'Sample parcel dispatched', date: '2026-09-27', completed: true },
      { label: 'Delivered', note: 'Sample shipment completed', date: '2026-10-02', completed: true },
    ],
  },
  {
    id: 'DEMO-BD-0973', placedOn: '2026-10-12', status: 'processing', market: 'BD',
    currency: 'BDT', total: 2290, shippingLabel: 'Bangladesh · Standard delivery', itemCount: 1,
    items: [{ title: 'Everyday Canvas Tote Bag', option: 'Natural', quantity: 1, unitPrice: 2290 }],
    events: [
      { label: 'Order placed', note: 'Demo order received', date: '2026-10-12', completed: true },
      { label: 'Preparing items', note: 'Sample fulfillment in progress', date: '', completed: false },
      { label: 'Handed to carrier', note: 'Not dispatched in this demo', date: '', completed: false },
      { label: 'Delivered', note: 'Not delivered in this demo', date: '', completed: false },
    ],
  },
]

export function previewOrderById(id: string): PreviewOrder | undefined {
  return demoOrders.find((order) => order.id === id)
}

export function previewMoney(value: number, currency: PreviewCurrency): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency, maximumFractionDigits: currency === 'BDT' ? 0 : 2,
  }).format(value)
}

export function previewDate(date: string): string {
  // Explicit noon UTC prevents day shifts on timezone conversion.
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${date}T12:00:00Z`))
}

export const orderStatusLabels: Record<PreviewOrderStatus, string> = {
  processing: 'Processing', shipped: 'On the way', delivered: 'Delivered', cancelled: 'Cancelled',
}
