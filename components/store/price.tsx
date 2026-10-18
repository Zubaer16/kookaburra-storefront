'use client'

import type { Product } from '@/lib/catalog'
import { formatPrice, productPrice, comparePrice } from '@/lib/catalog'
import { useCommerceStore } from '@/stores/commerce-store'
import { useStoreReady } from '@/hooks/use-store-ready'

export function ProductPrice({
  product,
  size = 'base',
}: {
  product: Product
  size?: 'base' | 'lg'
}) {
  const ready = useStoreReady()
  const savedMarket = useCommerceStore((state) => state.market)
  const savedLocale = 'en' as const
  const market = ready ? savedMarket : 'INTL'
  const locale = ready ? savedLocale : 'en'
  const sale = comparePrice(product, market)
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <strong
        className={
          size === 'lg'
            ? 'text-3xl tracking-tight text-ink'
            : 'text-base font-extrabold text-ink'
        }
      >
        {formatPrice(productPrice(product, market), market, locale)}
      </strong>
      {sale && (
        <span className="text-xs text-muted line-through">
          {formatPrice(sale, market, locale)}
        </span>
      )}
    </div>
  )
}
