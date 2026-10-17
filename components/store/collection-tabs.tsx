'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/store/product-card'
import { products } from '@/lib/catalog'
import { useUiCopy } from '@/hooks/use-ui-copy'
import { nextHorizontalIndex } from '@/lib/ux-navigation'

const collections = [
  { id: 'featured', label: 'For you' },
  { id: 'new', label: 'New arrivals' },
  { id: 'sale', label: 'Great deals' },
  { id: 'style', label: 'Style & shoes' },
] as const
type Collection = (typeof collections)[number]['id']

export function CollectionTabs() {
  const t = useUiCopy()
  const [active, setActive] = useState<Collection>('featured')
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  function onTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const next = nextHorizontalIndex(index, event.key, collections.length)
    if (next === null) return
    event.preventDefault()
    setActive(collections[next].id)
    tabRefs.current[next]?.focus()
  }
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
        aria-label={t.exploreCollection}
        className="mb-6 flex max-w-full gap-2 overflow-x-auto pb-2"
      >
        {collections.map((collection, index) => (
          <button
            key={collection.id}
            type="button"
            role="tab"
            ref={(node) => {
              tabRefs.current[index] = node
            }}
            tabIndex={active === collection.id ? 0 : -1}
            onKeyDown={(event) => onTabKeyDown(event, index)}
            id={`collection-tab-${collection.id}`}
            aria-selected={active === collection.id}
            aria-controls="collection-panel"
            onClick={() => setActive(collection.id)}
            className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-extrabold transition sm:text-sm ${active === collection.id ? 'bg-[#16233e] text-white' : 'border border-border bg-white text-[#61708b] hover:border-primary hover:text-primary'}`}
          >
            {
              (
                {
                  featured: t.forYou,
                  new: t.newArrivals,
                  sale: t.greatDeals,
                  style: t.styleShoes,
                } as const
              )[collection.id]
            }
          </button>
        ))}
      </div>
      <div
        id="collection-panel"
        role="tabpanel"
        tabIndex={0}
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
          {t.exploreMore} <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  )
}
