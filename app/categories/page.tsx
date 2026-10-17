import type { Metadata } from 'next'
import { CategoriesClient } from '@/components/store/categories-client'

export const metadata: Metadata = {
  title: 'Explore Categories',
  description: 'Browse electronics, fashion, shoes, home and more at Kookaburra.',
}

export default function CategoriesPage() {
  return <CategoriesClient />
}
