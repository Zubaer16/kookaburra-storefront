'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ShieldAlert } from 'lucide-react'
import { formatPrice, type Locale } from '@/lib/catalog'
import type { CheckoutPreviewLine } from '@/lib/checkout-preview'
import { getPreviewCopy } from '@/lib/preview-copy'
import { productText, localizeOption } from '@/lib/fixture-localization'

export function OrderSummary({
  rows,
  subtotal,
  fee,
  locale,
  showFee,
}: {
  rows: CheckoutPreviewLine[]
  subtotal: number
  fee: number
  locale: Locale
  showFee: boolean
}) {
  const t = getPreviewCopy(locale)
  return (
    <aside className="h-fit rounded-2xl border border-border bg-[#fbfcff] p-5 lg:sticky lg:top-28 lg:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-extrabold">{t.summary}</h2>
        <Link
          href="/cart"
          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
        >
          {t.editCart} <ArrowUpRight size={14} />
        </Link>
      </div>
      <ul className="my-5 divide-y divide-border border-y border-border">
        {rows.map(({ item, product, variant, lineTotal }) => (
          <li
            key={`${item.productId}/${item.variantId ?? 'base'}`}
            className="flex gap-3 py-4"
          >
            <div
              className="relative size-[62px] shrink-0 overflow-hidden rounded-xl"
              style={{ background: product.accent }}
            >
              <Image
                src={product.image}
                alt=""
                fill
                sizes="62px"
                className="object-contain p-1.5"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-xs font-bold text-ink">
                {productText(product, locale).title}
              </p>
              {variant && (
                <p className="mt-1 text-[11px] text-muted">
                  {localizeOption(variant.options, locale)}
                </p>
              )}
              <p className="mt-1 text-[11px] text-muted">
                {t.quantity} {item.quantity}
              </p>
            </div>
            <strong className="shrink-0 text-xs">
              {formatPrice(lineTotal)}
            </strong>
          </li>
        ))}
      </ul>
      <dl className="space-y-3 text-sm">
        <div className="flex items-center justify-between gap-2">
          <dt className="text-muted">{t.products}</dt>
          <dd className="font-bold">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="text-muted">{t.sampleDelivery}</dt>
          <dd className="font-bold">
            {showFee ? formatPrice(fee) : t.chooseMethod}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="text-muted">{t.taxes}</dt>
          <dd className="text-right text-xs">{t.notCalculated}</dd>
        </div>
      </dl>
      <div className="mt-5 flex justify-between border-t border-border pt-5">
        <span className="font-extrabold">{t.illustrativeTotal}</span>
        <strong className="text-xl text-primary">
          {formatPrice(subtotal + (showFee ? fee : 0))}
        </strong>
      </div>
      <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-muted">
        <ShieldAlert size={16} className="mt-0.5 shrink-0" /> {t.summaryNotice}
      </p>
    </aside>
  )
}
