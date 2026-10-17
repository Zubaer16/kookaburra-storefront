'use client'

import { ArrowLeft, ArrowRight, Clock3, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  checkoutDeliveryOptions,
  type CheckoutDeliveryId,
} from '@/lib/checkout-preview'
import { formatPrice, type Locale, type Market } from '@/lib/catalog'

export function DeliveryOptions({
  market,
  locale,
  selected,
  onSelect,
  onBack,
  onContinue,
}: {
  market: Market
  locale: Locale
  selected: CheckoutDeliveryId
  onSelect: (id: CheckoutDeliveryId) => void
  onBack: () => void
  onContinue: () => void
}) {
  const methods = checkoutDeliveryOptions(market)
  return (
    <section className="rounded-2xl border border-border bg-white p-5 sm:p-7">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-primary">
          <Truck size={21} />
        </div>
        <div>
          <h2 className="text-xl font-extrabold tracking-tight">
            Choose delivery
          </h2>
          <p className="mt-1 text-sm text-muted">
            Delivery options are examples only; no services or prices are
            confirmed.
          </p>
        </div>
      </div>
      <div
        className="space-y-3"
        role="radiogroup"
        aria-label="Sample delivery method"
      >
        {methods.map((method) => (
          <label
            key={method.id}
            className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${selected === method.id ? 'border-primary bg-blue-50/60 ring-2 ring-primary/10' : 'border-border hover:border-[#acbde2]'}`}
          >
            <input
              type="radio"
              name="delivery-method"
              checked={selected === method.id}
              onChange={() => onSelect(method.id)}
              className="mt-1 accent-[#2459e8]"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="text-sm">{method.name}</strong>
                <strong className="text-sm text-primary">
                  {formatPrice(method.sampleFee, market, locale)}
                </strong>
              </div>
              <p className="mt-1 text-xs text-muted">{method.details}</p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                <Clock3 size={14} /> {method.eta}
              </p>
            </div>
          </label>
        ))}
      </div>
      <p
        className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-6 text-amber-900"
        role="note"
      >
        Illustrative delivery fees only. Actual shipping eligibility, rates,
        delivery times, customs and taxes must be quoted by the backend for the
        exact destination.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft size={17} /> Address
        </Button>
        <Button type="button" onClick={onContinue}>
          Review order <ArrowRight size={17} />
        </Button>
      </div>
    </section>
  )
}
