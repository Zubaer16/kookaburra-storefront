'use client'

import Link from 'next/link'
import { ArrowLeft, ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CartLineView } from '@/components/store/cart-line'
import {
  formatPrice,
  productById,
  productPrice,
  productVariant,
} from '@/lib/catalog'
import { useCommerceStore } from '@/stores/commerce-store'
import { useStoreReady } from '@/hooks/use-store-ready'
import { assessPreviewCart } from '@/lib/checkout-preview'

export default function CartPage() {
  const ready = useStoreReady()
  const cart = useCommerceStore((s) => s.cart)
  const savedMarket = useCommerceStore((s) => s.market)
  const savedLocale = useCommerceStore((s) => s.locale)
  const market = ready ? savedMarket : 'BD'
  const locale = ready ? savedLocale : 'en'
  const lines = (ready ? cart : [])
    .map((line) => ({ line, product: productById(line.productId) }))
    .filter((row) => !!row.product)
  const complete = (row: (typeof lines)[number]) =>
    !row.product!.variants || !!productVariant(row.product!, row.line.variantId)
  const incompleteCount = lines.filter((row) => !complete(row)).length
  const subtotal = lines
    .filter(complete)
    .reduce(
      (sum, row) =>
        sum + productPrice(row.product!, market) * row.line.quantity,
      0,
    )
  const count = lines.reduce((sum, row) => sum + row.line.quantity, 0)
  const preview = assessPreviewCart(ready ? cart : [], market)
  return (
    <main className="container-shell pb-20 pt-9">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-muted"
      >
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <span className="font-bold text-ink">Cart</span>
      </nav>
      <div className="mb-8 mt-5">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Your shopping cart
        </h1>
        <p className="mt-2 text-sm text-muted">
          Review your picks and chosen options before checkout.
        </p>
      </div>
      {lines.length === 0 ? (
        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-[#fbfcff] p-6 text-center">
          <ShoppingBag size={44} className="text-primary" />
          <h2 className="mt-5 text-xl font-bold">Your cart is empty</h2>
          <p className="mt-2 text-sm text-muted">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/shop">
              <ArrowLeft size={17} /> Continue shopping
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          <div className="overflow-hidden rounded-2xl border border-border">
            <div className="border-b border-border bg-[#fbfcff] px-5 py-4 text-sm font-extrabold">
              Items in your cart ({count})
            </div>
            <div className="divide-y divide-border">
              {lines.map(
                ({ line, product }) =>
                  product && (
                    <CartLineView
                      key={`${line.productId}/${line.variantId ?? 'base'}`}
                      line={line}
                      product={product}
                      market={market}
                      locale={locale}
                    />
                  ),
              )}
            </div>
          </div>
          <aside className="h-fit rounded-2xl border border-border bg-[#fbfcff] p-6">
            <h2 className="text-lg font-extrabold">Order summary</h2>
            <div className="mt-6 flex justify-between text-sm text-muted">
              <span>Subtotal</span>
              <span className="font-bold text-ink">
                {formatPrice(subtotal, market, locale)}
              </span>
            </div>
            <div className="mt-4 flex justify-between gap-3 text-sm text-muted">
              <span>Shipping & taxes</span>
              <span className="text-right">
                Calculated in a future checkout
              </span>
            </div>
            {incompleteCount > 0 && (
              <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">
                {incompleteCount} saved cart line(s) need options selected. They
                are excluded from the estimated subtotal.
              </p>
            )}
            <div className="my-6 h-px bg-border" />
            <div className="flex justify-between text-sm">
              <span className="font-bold">Estimated subtotal</span>
              <strong className="text-xl">
                {formatPrice(subtotal, market, locale)}
              </strong>
            </div>
            {preview.readyForPreview ? (
              <Button asChild className="mt-6 w-full">
                <Link href="/checkout">Preview checkout <ArrowRight size={17} /></Link>
              </Button>
            ) : (
              <>
                <Button className="mt-6 w-full" disabled>Resolve cart issues before checkout</Button>
                <ul className="mt-3 list-disc space-y-1 pl-4 text-xs leading-5 text-amber-800">
                  {preview.issues.map((issue) => <li key={issue}>{issue}</li>)}
                </ul>
              </>
            )}
            <p className="mt-4 text-xs leading-6 text-muted">
              Checkout preview includes sample address, delivery and order review screens only.
              No real order or payment can be placed. All amounts are illustrative.
            </p>
            <Button asChild variant="outline" className="mt-5 w-full">
              <Link href="/shop">
                <ArrowLeft size={17} /> Continue shopping
              </Link>
            </Button>
          </aside>
        </div>
      )}
    </main>
  )
}
