'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Heart,
  Minus,
  PackageCheck,
  Plus,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ProductPrice } from '@/components/store/price'
import { ProductCard } from '@/components/store/product-card'
import { ProductGallery } from '@/components/store/product-gallery'
import { ProductOptions } from '@/components/store/product-options'
import {
  categoryById,
  cartLineKey,
  products,
  type Product,
} from '@/lib/catalog'
import { useCommerceStore } from '@/stores/commerce-store'
import { useStoreReady } from '@/hooks/use-store-ready'
import { usePreviewCopy } from '@/hooks/use-preview-copy'
import { useDisplayLocale } from '@/hooks/use-display-locale'
import { productText, localizeOption } from '@/lib/fixture-localization'

export function ProductDetails({ product }: { product: Product }) {
  const t = usePreviewCopy()
  const locale = useDisplayLocale()
  const display = productText(product, locale)
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  const add = useCommerceStore((s) => s.addToCart)
  const cart = useCommerceStore((s) => s.cart)
  const wishlist = useCommerceStore((s) => s.wishlist)
  const toggle = useCommerceStore((s) => s.toggleWishlist)
  const ready = useStoreReady()
  const saved = ready && wishlist.includes(product.id)
  const category = categoryById(product.category)
  const related = [
    ...products.filter(
      (item) => item.id !== product.id && item.category === product.category,
    ),
    ...products.filter(
      (item) => item.id !== product.id && item.category !== product.category,
    ),
  ].slice(0, 4)
  const variants = product.variants ?? []
  const needsColor = variants.some((v) => !!v.options.color)
  const needsSize = variants.some((v) => !!v.options.size)
  const variant = variants.find(
    (v) =>
      (!needsColor || v.options.color === color) &&
      (!needsSize || v.options.size === size),
  )
  const selected = !variants.length || !!variant
  const stock = variants.length ? (variant?.stock ?? 0) : product.stock
  const inCart = ready
    ? (cart.find(
        (line) =>
          cartLineKey(line.productId, line.variantId) ===
          cartLineKey(product.id, variant?.id),
      )?.quantity ?? 0)
    : 0
  const available = Math.max(0, stock - inCart)
  const canAdd =
    selected && available > 0 && quantity >= 1 && quantity <= available
  function selectColor(next: string) {
    setColor(next)
    setQuantity(1)
  }
  function selectSize(next: string) {
    setSize(next)
    setQuantity(1)
  }
  function addSelected() {
    if (!canAdd) return
    add(product.id, quantity, variant?.id)
    toast.success(
      `${t.toastAdded}: ${quantity}${variant ? ` · ${localizeOption(variant.options, locale)}` : ''}`,
    )
    setQuantity(1)
  }
  const status = !selected
    ? t.chooseOptions
    : available > 0
      ? `${available} ${t.availableUnits}`
      : t.notAvailable

  return (
    <div className="container-shell pb-16 pt-8 sm:pb-20">
      <nav
        aria-label="Breadcrumb"
        className="mb-7 flex flex-wrap items-center gap-1.5 text-xs text-muted"
      >
        <Link href="/" className="hover:text-primary">
          {t.productHome}
        </Link>
        <ChevronRight size={14} />
        <Link href="/shop" className="hover:text-primary">
          {t.productShop}
        </Link>
        <ChevronRight size={14} />
        <Link
          href={`/shop?category=${product.category}`}
          className="hover:text-primary"
        >
          {locale === 'bn' ? category?.bn : category?.label}
        </Link>
        <ChevronRight size={14} />
        <span className="max-w-48 truncate font-semibold text-ink">
          {display.title}
        </span>
      </nav>
      <div className="grid gap-9 md:grid-cols-2 md:gap-10 lg:gap-16">
        <ProductGallery product={product} />
        <div className="self-start">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[.18em] text-primary">
            {locale === 'bn' ? category?.bn : category?.label}
          </p>
          <h1 className="text-[30px] font-extrabold leading-[1.2] tracking-[-.045em] sm:text-[39px]">
            {display.title}
          </h1>
          <p className="mt-4 max-w-[480px] text-sm leading-7 text-[#61708b]">
            {display.description}
          </p>
          <div className="mt-6 border-b border-border pb-6">
            <ProductPrice product={product} size="lg" />
            <p className="mt-2 text-xs text-muted">{t.priceNote}</p>
          </div>
          <ProductOptions
            product={product}
            color={color}
            size={size}
            onColorChange={selectColor}
            onSizeChange={selectSize}
          />
          <p
            role="status"
            className={`mt-6 flex items-center gap-2 text-sm font-semibold ${selected && available > 0 ? 'text-[#137b5a]' : 'text-[#8e6135]'}`}
          >
            <CheckCircle2 size={17} />
            {status}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="inline-flex h-12 items-center rounded-xl border border-border">
              <button
                type="button"
                aria-label={t.minusQty}
                disabled={quantity <= 1}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 disabled:opacity-35"
              >
                <Minus size={17} />
              </button>
              <output
                aria-label={t.qtySelected}
                className="min-w-8 text-center text-sm font-bold"
              >
                {quantity}
              </output>
              <button
                type="button"
                aria-label={t.plusQty}
                disabled={!selected || quantity >= available}
                onClick={() => setQuantity((q) => Math.min(available, q + 1))}
                className="px-4 disabled:opacity-35"
              >
                <Plus size={17} />
              </button>
            </div>
            <Button
              className="h-12 flex-1 sm:flex-none sm:px-9"
              disabled={!canAdd}
              onClick={addSelected}
            >
              <ShoppingBag size={18} />
              {!selected ? t.selectOptions : t.addCart}
              <ArrowRight size={16} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label={saved ? t.removeWish : t.saveWish}
              aria-pressed={saved}
              className="size-12"
              onClick={() => {
                toggle(product.id)
                toast.success(saved ? t.toastRemoved : t.toastSaved)
              }}
            >
              <Heart size={19} fill={saved ? '#2459e8' : 'none'} />
            </Button>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-[#fbfcff] p-4">
              <Truck size={19} className="text-primary" />
              <p className="mt-2 text-sm font-extrabold">{t.worldwideTitle}</p>
              <p className="mt-1 text-xs leading-5 text-muted">
                {t.worldwideDescription}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-[#fbfcff] p-4">
              <ShieldCheck size={19} className="text-primary" />
              <p className="mt-2 text-sm font-extrabold">{t.secureTitle}</p>
              <p className="mt-1 text-xs leading-5 text-muted">
                {t.secureDescription}
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-muted">
            <PackageCheck size={16} />
            <span>SKU:</span>
            <span className="font-bold text-ink">
              {variant?.sku ??
                (product.variants ? t.skuOption : product.id.toUpperCase())}
            </span>
            <span className="mx-2">·</span>
            <span>{t.productCategory}:</span>
            <span className="font-bold text-ink">
              {locale === 'bn' ? category?.bn : category?.label}
            </span>
          </div>
        </div>
      </div>
      <section className="mt-16 rounded-[22px] border border-border bg-[#fbfcff] p-6 sm:p-8">
        <h2 className="text-xl font-extrabold">{t.productDetails}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
          {display.description} {t.productDisclaimer}
        </p>
      </section>
      <section className="mt-16 sm:mt-20">
        <div className="mb-7 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.16em] text-primary">
              {t.youMightLike}
            </p>
            <h2 className="section-heading mt-2">{t.moreDiscover}</h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary"
          >
            {t.viewAllProducts} <ArrowRight size={17} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
