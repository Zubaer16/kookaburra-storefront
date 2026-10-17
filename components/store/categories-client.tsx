'use client'

import Link from 'next/link'
import { ArrowRight, ChevronRight, Compass } from 'lucide-react'
import { CategoryTile } from '@/components/store/category-tile'
import { categories, products } from '@/lib/catalog'
import { useUiCopy } from '@/hooks/use-ui-copy'

export function CategoriesClient() {
  const t = useUiCopy()
  return (
    <div className="container-shell pb-20 pt-9">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-muted"
      >
        <Link href="/" className="hover:text-primary">
          {t.home}
        </Link>
        <ChevronRight size={14} />
        <span className="font-bold text-ink">{t.categories}</span>
      </nav>
      <div className="relative mb-10 mt-6 overflow-hidden rounded-[24px] bg-[#edf2ff] px-7 py-10 sm:px-12 sm:py-14">
        <div className="absolute -right-10 -top-16 size-[230px] rounded-full border-[48px] border-[#d6e0ff]" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-primary">
            <Compass size={15} /> {t.discoverFavorites}
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-[-.045em] text-ink sm:text-5xl">
            {t.categories}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[#63728c]">
            {t.categoriesDescription}
          </p>
        </div>
      </div>
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <h2 className="section-heading">{t.collections}</h2>
          <p className="mt-1 text-sm text-muted">
            {categories.length} {t.categories} · {products.length} {t.previewProducts}
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-extrabold text-primary hover:underline sm:text-sm"
        >
          {t.shopAll} <ArrowRight size={16} />
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <CategoryTile
            category={category}
            variant="feature"
            key={category.id}
          />
        ))}
      </div>
      <div className="mt-10 rounded-[22px] border border-dashed border-[#d4dff4] bg-[#f8faff] p-6 sm:p-8">
        <h2 className="text-lg font-extrabold">{t.moreCategories}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
          {t.dynamicCategoryNote}
        </p>
      </div>
    </div>
  )
}
