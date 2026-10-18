'use client'

import type { Product } from '@/lib/catalog'
import { formatPrice, productPrice, comparePrice } from '@/lib/catalog'

export function ProductPrice({
  product,
  size = 'base',
}: {
  product: Product
  size?: 'base' | 'lg'
}) {
  const sale = comparePrice(product)
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <strong
        className={
          size === 'lg'
            ? 'text-3xl tracking-tight text-ink'
            : 'text-base font-extrabold text-ink'
        }
      >
        {formatPrice(productPrice(product))}
      </strong>
      {sale && (
        <span className="text-xs text-muted line-through">
          {formatPrice(sale)}
        </span>
      )}
    </div>
  )
}
