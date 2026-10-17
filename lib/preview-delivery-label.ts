import type { CheckoutDeliveryId } from '@/lib/checkout-preview'
import type { Market } from '@/lib/catalog'
import { getPreviewCopy } from '@/lib/preview-copy'

export function getDeliveryLabel(
  id: CheckoutDeliveryId,
  market: Market,
  t: ReturnType<typeof getPreviewCopy>,
) {
  if (market === 'BD')
    return id === 'standard' ? t.methodStandard : t.methodPriority
  return id === 'standard' ? t.methodIntlStandard : t.methodIntlPriority
}
