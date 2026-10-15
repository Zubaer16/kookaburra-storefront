import type { Metadata } from 'next'
import { ShopClient } from '@/components/store/shop-client'

export const metadata: Metadata = { title: 'Shop All Products' }

type Params = {
  q?: string
  category?: string
  tag?: string
  sort?: string
  price?: string
  stock?: string
}
export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Params>
}) {
  const params = await searchParams
  return (
    <ShopClient
      key={`${params.q ?? ''}/${params.category ?? ''}/${params.tag ?? ''}/${params.sort ?? ''}/${params.price ?? ''}/${params.stock ?? ''}`}
      query={params.q ?? ''}
      category={params.category ?? ''}
      tag={params.tag ?? ''}
      sort={params.sort ?? 'featured'}
      price={params.price ?? 'all'}
      stock={params.stock ?? ''}
    />
  )
}
