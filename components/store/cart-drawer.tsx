'use client'

import Link from 'next/link'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
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

export function CartDrawer() {
  const ready = useStoreReady()
  const cart = useCommerceStore((s) => s.cart)
  const savedMarket = useCommerceStore((s) => s.market)
  const savedLocale = useCommerceStore((s) => s.locale)
  const open = useCommerceStore((s) => s.cartOpen)
  const setOpen = useCommerceStore((s) => s.setCartOpen)
  const market = ready ? savedMarket : 'BD'
  const locale = ready ? savedLocale : 'en'
  const lines = (ready ? cart : [])
    .map((line) => ({ line, product: productById(line.productId) }))
    .filter((row) => !!row.product)
  const isComplete = (row: (typeof lines)[number]) =>
    !row.product!.variants || !!productVariant(row.product!, row.line.variantId)
  const incompleteCount = lines.filter((row) => !isComplete(row)).length
  const subtotal = lines
    .filter(isComplete)
    .reduce(
      (sum, row) =>
        sum + productPrice(row.product!, market) * row.line.quantity,
      0,
    )
  const count = lines.reduce((sum, row) => sum + row.line.quantity, 0)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <div className="border-b border-border px-6 py-6">
          <SheetTitle className="flex items-center gap-2 text-lg font-extrabold">
            <ShoppingBag size={22} className="text-primary" /> Your cart{' '}
            <span className="rounded-lg bg-blue-50 px-2 py-0.5 text-xs text-primary">
              {count}
            </span>
          </SheetTitle>
          <SheetDescription className="mt-1.5 text-xs text-muted">
            Saved on this browser for now.
          </SheetDescription>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-3">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-blue-50 text-primary">
                <ShoppingBag size={34} />
              </div>
              <h3 className="text-lg font-extrabold">Your cart is waiting</h3>
              <p className="mt-2 max-w-[230px] text-sm leading-6 text-muted">
                Discover something you love and add it here.
              </p>
              <Button className="mt-6" onClick={() => setOpen(false)} asChild>
                <Link href="/shop">
                  Explore products <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          ) : (
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
                      compact
                      onNavigate={() => setOpen(false)}
                    />
                  ),
              )}
            </div>
          )}
        </div>
        {lines.length > 0 && (
          <div className="border-t border-border bg-[#fbfcff] px-6 py-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Estimated subtotal</span>
              <strong className="text-xl">
                {formatPrice(subtotal, market, locale)}
              </strong>
            </div>
            {incompleteCount > 0 && (
              <p className="mt-2 text-xs font-semibold text-amber-700">
                {incompleteCount} old cart line(s) need size/color selection and
                are excluded from subtotal.
              </p>
            )}
            <p className="mt-2 text-[11px] leading-5 text-muted">
              Demo pricing only. Real taxes, shipping and checkout require
              backend integration.
            </p>
            <Button
              className="mt-4 w-full"
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href="/cart">
                View cart <ArrowRight size={17} />
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
