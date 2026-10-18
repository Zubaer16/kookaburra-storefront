import type { CheckoutDeliveryId } from '@/lib/checkout-preview'
import { getPreviewCopy } from '@/lib/preview-copy'

export function getDeliveryLabel(
  id: CheckoutDeliveryId,
  t: ReturnType<typeof getPreviewCopy>,
) {
  return id === 'standard' ? t.methodIntlStandard : t.methodIntlPriority
}
