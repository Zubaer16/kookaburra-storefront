import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  MapPin,
  PackageCheck,
  Truck,
} from 'lucide-react'
import {
  OrderTimeline,
  StatusPill,
  TrackingSummary,
} from '@/components/account/order-ui'
import {
  demoOrders,
  previewDate,
  previewMoney,
  previewOrderById,
} from '@/lib/account-preview'

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
  return (
    <div className="space-y-6">
      <Link
        href="/account/orders"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
      >
        <ArrowLeft size={16} /> Back to sample orders
      </Link>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-muted">
            Fictional order details
          </p>
          <h2 className="mt-2 break-all text-2xl font-black tracking-tight">
            {order.id}
          </h2>
          <p className="mt-2 flex items-center gap-2 text-xs text-muted">
            <CalendarDays size={15} /> Placed {previewDate(order.placedOn)}
          </p>
        </div>
        <StatusPill status={order.status} />
      </div>
      <TrackingSummary order={order} />
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="rounded-[20px] border border-border bg-white p-5 sm:p-6">
          <h3 className="flex items-center gap-2 text-base font-extrabold">
            <PackageCheck className="text-primary" size={19} /> Example items
          </h3>
          <div className="mt-4 divide-y divide-border">
            {order.items.map((item) => (
              <div
                key={item.title}
                className="flex items-start justify-between gap-3 py-4"
              >
                <div>
                  <p className="text-sm font-bold">{item.title}</p>
                  <p className="mt-1 text-xs text-muted">
                    {item.option} · Qty {item.quantity}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-extrabold">
                  {previewMoney(item.quantity * item.unitPrice, order.currency)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-5">
            <span className="text-sm text-muted">Illustrative order total</span>
            <strong className="text-xl">
              {previewMoney(order.total, order.currency)}
            </strong>
          </div>
          <p className="mt-3 text-xs leading-5 text-muted">
            These sample totals do not include a verified payment or shipping
            charge. They are not receipts.
          </p>
        </div>
        <div className="space-y-5">
          <div className="rounded-[20px] border border-border bg-white p-5">
            <h3 className="flex items-center gap-2 text-sm font-extrabold">
              <MapPin size={17} className="text-primary" /> Delivery region
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              {order.shippingLabel}
            </p>
            <p className="mt-2 text-xs text-muted">
              No personal address stored in this preview.
            </p>
          </div>
          <div className="rounded-[20px] border border-border bg-white p-5">
            <h3 className="mb-5 flex items-center gap-2 text-sm font-extrabold">
              <Truck size={17} className="text-primary" /> Demo milestones
            </h3>
            <OrderTimeline order={order} />
            <Link
              href={`/track?sample=${encodeURIComponent(order.id)}`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
            >
              Open tracking preview <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
