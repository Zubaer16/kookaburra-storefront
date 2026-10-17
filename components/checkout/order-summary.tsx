'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ShieldAlert } from 'lucide-react'
import { formatPrice, optionSummary, type Locale, type Market } from '@/lib/catalog'
import type { CheckoutPreviewLine } from '@/lib/checkout-preview'

export function OrderSummary({
  rows, subtotal, fee, locale, market, showFee,
}: {
  rows: CheckoutPreviewLine[]
  subtotal: number
  fee: number
  locale: Locale
  market: Market
  showFee: boolean
}) {
  return (
    <aside className="h-fit rounded-2xl border border-border bg-[#fbfcff] p-5 lg:sticky lg:top-28 lg:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-extrabold">Order summary</h2>
        <Link href="/cart" className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">Edit cart <ArrowUpRight size={14} /></Link>
      </div>
      <ul className="my-5 divide-y divide-border border-y border-border">
        {rows.map(({ item, product, variant, lineTotal }) => (
          <li key={`${item.productId}/${item.variantId ?? 'base'}`} className="flex gap-3 py-4">
            <div className="relative size-[62px] shrink-0 overflow-hidden rounded-xl" style={{ background: product.accent }}>
              <Image src={product.image} alt="" fill sizes="62px" className="object-contain p-1.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-xs font-bold text-ink">{product.title}</p>
              {variant && <p className="mt-1 text-[11px] text-muted">{optionSummary(variant)}</p>}
              <p className="mt-1 text-[11px] text-muted">Qty {item.quantity}</p>
            </div>
            <strong className="shrink-0 text-xs">{formatPrice(lineTotal, market, locale)}</strong>
          </li>
        ))}
      </ul>
      <dl className="space-y-3 text-sm">
        <div className="flex items-center justify-between gap-2"><dt className="text-muted">Products</dt><dd className="font-bold">{formatPrice(subtotal, market, locale)}</dd></div>
        <div className="flex items-center justify-between gap-2"><dt className="text-muted">Sample delivery</dt><dd className="font-bold">{showFee ? formatPrice(fee, market, locale) : 'Choose a method'}</dd></div>
        <div className="flex items-center justify-between gap-2"><dt className="text-muted">Taxes & customs</dt><dd className="text-right text-xs">Not calculated</dd></div>
      </dl>
      <div className="mt-5 flex justify-between border-t border-border pt-5">
        <span className="font-extrabold">Illustrative total</span>
        <strong className="text-xl text-primary">{formatPrice(subtotal + (showFee ? fee : 0), market, locale)}</strong>
      </div>
      <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-muted"><ShieldAlert size={16} className="mt-0.5 shrink-0" /> Not a payable total or real offer. All figures are frontend sample data.</p>
    </aside>
  )
}
