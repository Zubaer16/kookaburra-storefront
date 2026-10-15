import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ProductDetails } from '@/components/store/product-details'
import { findProduct, products } from '@/lib/catalog'

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }))
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = findProduct(slug)
  return {
    title: product?.title ?? 'Product not found',
    description: product?.description,
  }
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = findProduct(slug)
  if (!product) notFound()
  return <ProductDetails product={product} />
}
