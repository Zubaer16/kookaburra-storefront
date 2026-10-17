import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { OrderDetailClient } from '@/components/account/order-detail-client'
import { demoOrders, previewOrderById } from '@/lib/account-preview'

export const dynamicParams = false
export function generateStaticParams() {
  return demoOrders.map((order) => ({ orderId: order.id }))
}
export const metadata: Metadata = {
  title: 'Sample Order Details',
  robots: { index: false, follow: false },
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  const { orderId } = await params
  const order = previewOrderById(orderId)
  if (!order) notFound()
  return <OrderDetailClient order={order} />
}
