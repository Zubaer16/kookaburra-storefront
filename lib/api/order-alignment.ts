/** Existing account order examples are independent fictional snapshots.
 * Never match them to today's product catalog by title or example price.
 */
import type { PreviewOrder } from '@/lib/account-preview'
import type { ApiMoney } from '@/lib/api/contracts'
import { previewMoney } from '@/lib/api/storefront-adapters'

export type LegacyOrderLineAudit = {
  orderId: string
  productId: null
  variantId: null
  sku: null
  titleSnapshot: string
  optionTextSnapshot: string
  quantity: number
  illustrativeUnitPrice: ApiMoney
  requiresIdentityMapping: true
}

export function legacyOrderLinesForAudit(
  order: PreviewOrder,
): LegacyOrderLineAudit[] {
  return order.items.map((item) => ({
    orderId: order.id,
    productId: null,
    variantId: null,
    sku: null,
    titleSnapshot: item.title,
    optionTextSnapshot: item.option,
    quantity: item.quantity,
    illustrativeUnitPrice: previewMoney(item.unitPrice),
    requiresIdentityMapping: true,
  }))
}
