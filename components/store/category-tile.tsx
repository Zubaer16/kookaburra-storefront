'use client'

import Link from 'next/link'
import {
  Camera,
  Headphones,
  House,
  Shirt,
  Sparkles,
  Watch,
  Footprints,
  type LucideIcon,
} from 'lucide-react'
import type { CategoryId } from '@/lib/catalog'
import { useCommerceStore } from '@/stores/commerce-store'
import { useStoreReady } from '@/hooks/use-store-ready'
import { categoryDescription } from '@/lib/fixture-localization'

const icons: Record<CategoryId, LucideIcon> = {
  electronics: Headphones,
  fashion: Shirt,
  footwear: Footprints,
  home: House,
  beauty: Sparkles,
  lifestyle: Camera,
  accessories: Watch,
}

export function CategoryTile({
  category,
  variant = 'compact',
}: {
  category: {
    id: CategoryId
    label: string
    bn: string
    description: string
    tint: string
  }
  variant?: 'compact' | 'feature'
}) {
  const ready = useStoreReady()
  const savedLocale = useCommerceStore((state) => state.locale)
  const name = ready && savedLocale === 'bn' ? category.bn : category.label
  const Icon = icons[category.id]
  return (
    <Link
      href={`/shop?category=${category.id}`}
      className={`group flex border border-border bg-white transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_16px_36px_rgba(24,48,99,0.09)] focus-visible:outline-2 focus-visible:outline-primary ${variant === 'feature' ? 'flex-row items-center gap-4 rounded-[22px] p-5' : 'flex-col items-center gap-3 rounded-[20px] p-3 text-center sm:p-4'}`}
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-[18px] text-[#3d5177] transition group-hover:scale-[1.05] ${variant === 'feature' ? 'size-[72px]' : 'size-[67px] sm:size-[79px]'}`}
        style={{ background: category.tint }}
      >
        <Icon size={30} strokeWidth={1.65} />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-extrabold leading-snug text-ink sm:text-sm">
          {name}
        </span>
        {variant === 'feature' && (
          <span className="mt-1 block text-xs text-muted">
            {categoryDescription(
              category.id,
              category.description,
              ready ? savedLocale : 'en',
            )}
          </span>
        )}
      </span>
    </Link>
  )
}
