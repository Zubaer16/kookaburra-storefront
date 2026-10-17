'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  Check,
  ChevronRight,
  CreditCard,
  Globe2,
  LockKeyhole,
  Pencil,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react'
import { AddressForm } from '@/components/checkout/address-form'
import { DeliveryOptions } from '@/components/checkout/delivery-options'
import { OrderSummary } from '@/components/checkout/order-summary'
import { Button } from '@/components/ui/button'
import {
  assessPreviewCart,
  checkoutDeliveryOptions,
  emptyCheckoutAddress,
  type CheckoutAddress,
  type CheckoutDeliveryId,
  type CheckoutStage,
} from '@/lib/checkout-preview'
import { type Market } from '@/lib/catalog'
import { getPreviewCopy } from '@/lib/preview-copy'
import { getDeliveryLabel } from '@/lib/preview-delivery-label'
import { useStoreReady } from '@/hooks/use-store-ready'
import { useCommerceStore } from '@/stores/commerce-store'

const stages: { id: CheckoutStage; name: string }[] = [
  { id: 'address', name: 'Address' },
  { id: 'delivery', name: 'Delivery' },
  { id: 'review', name: 'Review' },
]

export function CheckoutClient() {
  const ready = useStoreReady()
  const storedMarket = useCommerceStore((s) => s.market)
  const storedLocale = 'en' as const
  const items = useCommerceStore((s) => s.cart)
  const setMarket = useCommerceStore((s) => s.setMarket)
  const setCartOpen = useCommerceStore((s) => s.setCartOpen)
  const market = ready ? storedMarket : 'BD'
  const locale = ready ? storedLocale : 'en'
  const t = getPreviewCopy(locale)
  const [stage, setStage] = useState<CheckoutStage>('address')
  const [address, setAddress] = useState<CheckoutAddress>(() =>
    emptyCheckoutAddress(),
  )
  const [deliveryId, setDeliveryId] = useState<CheckoutDeliveryId>('standard')
  const cart = assessPreviewCart(ready ? items : [], market)
  const delivery = checkoutDeliveryOptions(market).find(
    (method) => method.id === deliveryId,
  )!
  const currentStageIndex = stages.findIndex((entry) => entry.id === stage)

  // Market is global. Prevent a prior-country address/method being silently reused
  // when the shopper switches between Bangladesh and International preview modes.
  useEffect(() => {
    if (!ready) return
    setAddress(emptyCheckoutAddress())
    setDeliveryId('standard')
    setStage('address')
  }, [ready, market])

  // Avoid leaving a populated modal above the checkout route.
  useEffect(() => {
    setCartOpen(false)
  }, [setCartOpen])

  function selectMarket(next: Market) {
    if (next !== market) setMarket(next)
  }

  return (
    <div className="container-shell pb-20 pt-8 sm:pt-10">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-1.5 text-xs text-muted"
      >
        <Link className="hover:text-primary" href="/">
          Home
        </Link>
        <ChevronRight size={14} />
        <Link className="hover:text-primary" href="/cart">
          Cart
        </Link>
        <ChevronRight size={14} />
        <span className="font-bold text-ink">{t.previewCheckout}</span>
      </nav>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-primary">
            <ShieldCheck size={14} /> {t.frontendPreview}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t.checkoutTitle}
          </h1>
          <p className="mt-2 text-sm text-muted">{t.checkoutIntro}</p>
        </div>
        <Link
          className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
          href="/cart"
        >
          <ArrowLeft size={17} /> {t.backCart}
        </Link>
      </div>
      {!ready ? (
        <p
          className="rounded-2xl border border-border bg-canvas p-8 text-sm text-muted"
          role="status"
        >
          Loading your local cart…
        </p>
      ) : !cart.readyForPreview ? (
        <div
          className="max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8"
          role="alert"
        >
          <ShoppingBag size={28} className="text-amber-700" />
          <h2 className="mt-3 text-xl font-extrabold">{t.reviewCart}</h2>
          <p className="mt-2 text-sm leading-6 text-amber-900">
            {t.cartIssues}
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-amber-900">
            {cart.issues.map((issue) => (
              <li key={issue}>{issue}</li>
            ))}
          </ul>
          <Button asChild className="mt-6">
            <Link href="/cart">
              {t.returnCart} <ChevronRight size={16} />
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-[#fbfcff] p-4 sm:justify-between sm:px-5">
            <span className="flex items-center gap-2 text-xs font-bold text-ink">
              <Globe2 size={17} className="text-primary" /> {t.region}
            </span>
            <div
              role="group"
              aria-label={t.region}
              className="flex rounded-xl border border-border bg-white p-1"
            >
              <button
                type="button"
                aria-pressed={market === 'BD'}
                onClick={() => selectMarket('BD')}
                className={`rounded-lg px-3.5 py-2 text-xs font-bold transition ${market === 'BD' ? 'bg-primary text-white' : 'text-muted hover:text-ink'}`}
              >
                🇧🇩 {t.bd}
              </button>
              <button
                type="button"
                aria-pressed={market === 'INTL'}
                onClick={() => selectMarket('INTL')}
                className={`rounded-lg px-3.5 py-2 text-xs font-bold transition ${market === 'INTL' ? 'bg-primary text-white' : 'text-muted hover:text-ink'}`}
              >
                🌐 {t.intl}
              </button>
            </div>
          </div>
          <ol aria-label={t.progress} className="mb-7 grid grid-cols-3 gap-2">
            {stages.map((entry, index) => (
              <li
                key={entry.id}
                aria-current={stage === entry.id ? 'step' : undefined}
                className={`flex items-center justify-center gap-2 rounded-xl border px-2 py-3 text-xs font-bold sm:text-sm ${stage === entry.id ? 'border-primary bg-blue-50 text-primary' : index < currentStageIndex ? 'border-[#b9dccb] bg-[#f0faf4] text-[#137b5a]' : 'border-border bg-white text-muted'}`}
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-current text-[11px]">
                  {index < currentStageIndex ? <Check size={14} /> : index + 1}
                </span>
                {t[entry.id]}
              </li>
            ))}
          </ol>
          <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              {stage === 'address' && (
                <AddressForm
                  market={market}
                  address={address}
                  onChange={setAddress}
                  onContinue={() => setStage('delivery')}
                />
              )}
              {stage === 'delivery' && (
                <DeliveryOptions
                  market={market}
                  locale={locale}
                  selected={deliveryId}
                  onSelect={setDeliveryId}
                  onBack={() => setStage('address')}
                  onContinue={() => setStage('review')}
                />
              )}
              {stage === 'review' && (
                <section className="rounded-2xl border border-border bg-white p-5 sm:p-7">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-primary">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold tracking-tight">
                        {t.reviewOrder}
                      </h2>
                      <p className="mt-1 text-sm text-muted">
                        {t.reviewNoCharge}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="rounded-xl border border-border p-4">
                      <div className="flex justify-between gap-2">
                        <h3 className="text-sm font-extrabold">
                          {t.deliveryTo}
                        </h3>
                        <button
                          type="button"
                          onClick={() => setStage('address')}
                          className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                        >
                          <Pencil size={13} /> {t.edit}
                        </button>
                      </div>
                      <p className="mt-2 text-sm font-semibold">
                        {address.fullName}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted">
                        {address.address1}
                        {address.address2 ? `, ${address.address2}` : ''}
                        <br />
                        {address.city}, {address.region}, {address.postalCode}
                        <br />
                        {market === 'BD' ? 'Bangladesh' : address.country}
                      </p>
                      <p className="mt-2 text-xs text-muted">
                        {address.email} · {address.phone}
                      </p>
                    </div>
                    <div className="rounded-xl border border-border p-4">
                      <div className="flex justify-between gap-2">
                        <h3 className="text-sm font-extrabold">
                          {t.deliveryChoice}
                        </h3>
                        <button
                          type="button"
                          onClick={() => setStage('delivery')}
                          className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                        >
                          <Pencil size={13} /> {t.edit}
                        </button>
                      </div>
                      <p className="mt-2 text-sm font-semibold">
                        {getDeliveryLabel(delivery.id, market, t)}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-muted">
                        {t.methodEta} · {t.sampleFee}
                      </p>
                    </div>
                  </div>
                  <div
                    className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950"
                    role="note"
                  >
                    <p className="font-extrabold">{t.paymentDisabled}</p>
                    <p className="mt-1">{t.paymentDetails}</p>
                  </div>
                  <Button type="button" className="mt-6 w-full" disabled>
                    <LockKeyhole size={17} /> {t.paymentLater}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-3 w-full"
                    onClick={() => setStage('delivery')}
                  >
                    <ArrowLeft size={17} /> {t.backDelivery}
                  </Button>
                </section>
              )}
            </div>
            <OrderSummary
              rows={cart.rows}
              subtotal={cart.subtotal}
              fee={delivery.sampleFee}
              showFee={stage !== 'address'}
              market={market}
              locale={locale}
            />
          </div>
          <p className="mt-7 text-center text-xs leading-6 text-muted">
            {t.checkoutPrivacy}
          </p>
        </>
      )}
    </div>
  )
}
