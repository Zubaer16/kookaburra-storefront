'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Plus, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import type { Product } from '@/lib/catalog'
import { categoryById } from '@/lib/catalog'
import { ProductPrice } from '@/components/store/price'
import { useCommerceStore } from '@/stores/commerce-store'
import { useStoreReady } from '@/hooks/use-store-ready'
import { useDisplayLocale } from '@/hooks/use-display-locale'
import { useFinishCopy } from '@/hooks/use-finish-copy'
import { productText } from '@/lib/fixture-localization'

export function ProductCard({ product }: { product: Product }) {
  const locale = useDisplayLocale()
  const t = useFinishCopy()
  const display = productText(product, locale)
  const ready = useStoreReady()
  const wishlist = useCommerceStore((s) => s.wishlist)
  const toggleWishlist = useCommerceStore((s) => s.toggleWishlist)
  const add = useCommerceStore((s) => s.addToCart)
  const saved = ready && wishlist.includes(product.id)
  const category = categoryById(product.category)
  const requiresOptions = !!product.variants?.length
  return (
    <article className="group relative overflow-hidden rounded-[18px] border border-border bg-white card-lift">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[1.03] overflow-hidden"
        style={{ background: product.accent }}
        aria-label={`${t.viewProduct}: ${display.title}`}
      >
        <Image
          src={product.image}
          alt={display.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-lg bg-white/95 px-2.5 py-1.5 text-[10px] font-bold text-[#26395e] shadow-sm">
            {product.badge}
          </span>
        )}
      </Link>
      <button
        type="button"
        aria-label={
          saved
            ? `${t.removeWish}: ${display.title}`
            : `${t.saveWish}: ${display.title}`
        }
        aria-pressed={saved}
        onClick={() => {
          toggleWishlist(product.id)
          toast.success(saved ? t.removeWish : t.saveWish)
        }}
        className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full bg-white/95 text-[#68758c] shadow-sm transition hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
      >
        <Heart
          size={18}
          fill={saved ? '#2459e8' : 'none'}
          className={saved ? 'text-primary' : ''}
        />
      </button>
      <div className="px-3.5 pb-4 pt-3 sm:px-4 sm:pb-5">
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-[#8490a7]">
          {category?.label}
        </p>
        <Link
          href={`/product/${product.slug}`}
          className="line-clamp-2 min-h-[42px] text-[13px] font-bold leading-[1.6] text-ink hover:text-primary sm:text-sm"
        >
          {display.title}
        </Link>
        <div className="mt-2">
          <ProductPrice product={product} />
        </div>
        {requiresOptions ? (
          <Link
            href={`/product/${product.slug}`}
            className="mt-3 flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-[#dce5fa] bg-[#f2f6ff] text-xs font-bold text-primary transition hover:border-primary hover:bg-primary hover:text-white"
          >
            {t.chooseOptions} <ArrowRight size={16} />
          </Link>
        ) : (
          <button
            type="button"
            disabled={product.stock <= 0}
            onClick={() => {
              add(product.id)
              toast.success(t.toastAdded)
            }}
            className="mt-3 flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-[#dce5fa] bg-[#f2f6ff] text-xs font-bold text-primary transition hover:border-primary hover:bg-primary hover:text-white disabled:opacity-40"
          >
            <Plus size={17} /> {t.addCart}
          </button>
        )}
      </div>
    </article>
  )
}
