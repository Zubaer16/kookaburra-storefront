'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import {
  cartLineKey,
  formatPrice,
  productVariant,
  productPrice,
  type Locale,
  type Market,
  type Product,
} from '@/lib/catalog'
import { useCommerceStore } from '@/stores/commerce-store'
import type { CartLine } from '@/stores/commerce-store'
import { finishCopy } from '@/lib/finish-copy'
import { productText, localizeOption } from '@/lib/fixture-localization'

export function CartLineView({
  line,
  product,
  market,
  locale,
  onNavigate,
  compact = false,
}: {
  line: CartLine
  product: Product
  market: Market
  locale: Locale
  onNavigate?: () => void
  compact?: boolean
}) {
  const t = finishCopy(locale)
  const display = productText(product, locale)
  const setQuantity = useCommerceStore((s) => s.setQuantity)
  const remove = useCommerceStore((s) => s.removeFromCart)
  const variant = productVariant(product, line.variantId)
  const needsOptions = !!product.variants?.length && !variant
  const limit = product.variants ? (variant?.stock ?? 0) : product.stock
  const src = product.image
  const key = cartLineKey(line.productId, line.variantId)
  return (
    <article
      data-cart-line={key}
      className={`flex items-start gap-3 ${compact ? 'py-4' : 'p-4 sm:gap-5 sm:p-5'}`}
    >
      <Link
        href={`/product/${product.slug}`}
        onClick={onNavigate}
        className={`relative shrink-0 overflow-hidden rounded-xl ${compact ? 'size-20' : 'size-24 sm:size-28'}`}
        style={{ background: product.accent }}
      >
        <Image
          src={src}
          alt={display.title}
          fill
          sizes="112px"
          className="object-contain p-2"
        />
      </Link>
      <div className="min-w-0 flex-1">
        <Link
          onClick={onNavigate}
          href={`/product/${product.slug}`}
          className="line-clamp-2 text-sm font-extrabold text-ink hover:text-primary"
        >
          {display.title}
        </Link>
        {variant && (
          <p className="mt-1 text-xs text-muted">
            {localizeOption(variant.options, locale)}
          </p>
        )}
        {needsOptions && (
          <p className="mt-1 text-xs font-semibold text-amber-700">
            {t.cartOld}{' '}
            <Link
              onClick={onNavigate}
              href={`/product/${product.slug}`}
              className="underline underline-offset-2"
            >
              {t.chooseOptions}
            </Link>
          </p>
        )}
        <p className="mt-2 text-sm font-extrabold text-primary">
          {formatPrice(productPrice(product, market), market, locale)}{' '}
          <span className="text-xs font-normal text-muted">{t.cartEach}</span>
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center overflow-hidden rounded-lg border border-border">
            <button
              type="button"
              aria-label={`${t.cartDecrease} ${display.title}${variant ? ` ${localizeOption(variant.options, locale)}` : ''}`}
              disabled={needsOptions}
              onClick={() =>
                setQuantity(product.id, line.quantity - 1, line.variantId)
              }
              className="flex size-9 items-center justify-center hover:bg-slate-50 disabled:opacity-30"
            >
              <Minus size={15} />
            </button>
            <span className="min-w-6 text-center text-sm font-bold">
              {line.quantity}
            </span>
            <button
              type="button"
              aria-label={`${t.cartIncrease} ${display.title}${variant ? ` ${localizeOption(variant.options, locale)}` : ''}`}
              disabled={needsOptions || line.quantity >= limit}
              onClick={() =>
                setQuantity(product.id, line.quantity + 1, line.variantId)
              }
              className="flex size-9 items-center justify-center hover:bg-slate-50 disabled:opacity-30"
            >
              <Plus size={15} />
            </button>
          </div>
          <button
            type="button"
            aria-label={`${t.cartRemoveA11y} ${display.title}${variant ? ` ${localizeOption(variant.options, locale)}` : ''}`}
            onClick={() => remove(product.id, line.variantId)}
            className="inline-flex min-h-9 items-center gap-1.5 text-xs font-semibold text-muted hover:text-red-600"
          >
            <Trash2 size={15} /> {t.cartRemove}
          </button>
        </div>
      </div>
    </article>
  )
}
