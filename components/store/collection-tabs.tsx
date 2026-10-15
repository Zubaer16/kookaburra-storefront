'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/store/product-card'
import { products } from '@/lib/catalog'

const collections = [
  { id: 'featured', label: 'For you' },
  { id: 'new', label: 'New arrivals' },
  { id: 'sale', label: 'Great deals' },
  { id: 'style', label: 'Style & shoes' },
] as const
type Collection = (typeof collections)[number]['id']

export function CollectionTabs() {
  const [active, setActive] = useState<Collection>('featured')
  const items =
    active === 'new'
      ? products.filter((p) => p.tag === 'new')
      : active === 'sale'
        ? products.filter((p) => !!p.compareAt)
        : active === 'style'
          ? products.filter(
              (p) => p.category === 'fashion' || p.category === 'footwear',
            )
          : products
  return (
    <div>
      <div
        role="tablist"
        aria-label="Explore collections"
        className="mb-6 flex max-w-full gap-2 overflow-x-auto pb-2"
      >
        {collections.map((collection) => (
          <button
            key={collection.id}
            type="button"
            role="tab"
            id={`collection-tab-${collection.id}`}
            aria-selected={active === collection.id}
            aria-controls="collection-panel"
            onClick={() => setActive(collection.id)}
            className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-extrabold transition sm:text-sm ${active === collection.id ? 'bg-[#16233e] text-white' : 'border border-border bg-white text-[#61708b] hover:border-primary hover:text-primary'}`}
          >
            {collection.label}
          </button>
        ))}
      </div>
      <div
        id="collection-panel"
        role="tabpanel"
        aria-labelledby={`collection-tab-${active}`}
        className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4"
      >
        {items.slice(0, 8).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href={
            active === 'sale'
              ? '/shop?tag=sale'
              : active === 'new'
                ? '/shop?tag=new'
                : active === 'style'
                  ? '/shop?category=style'
                  : '/shop'
          }
          className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-extrabold text-ink transition hover:border-primary hover:text-primary"
        >
          Explore more <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  )
}
