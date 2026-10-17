'use client'

import Link from 'next/link'
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
  previewDate,
  previewMoney,
  type PreviewOrder,
} from '@/lib/account-preview'
import { useDisplayLocale } from '@/hooks/use-display-locale'
import { useFinishCopy } from '@/hooks/use-finish-copy'
import {
  localizeOrderItem,
  localizeOrderOption,
  localizeShippingLabel,
} from '@/lib/fixture-localization'

export function OrderDetailClient({ order }: { order: PreviewOrder }) {
  const locale = useDisplayLocale()
  const t = useFinishCopy()
  return (
    <div className="space-y-6">
      <Link
        href="/account/orders"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
      >
        <ArrowLeft size={16} /> {t.detailBack}
      </Link>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-muted">
            {t.detailEyebrow}
          </p>
          <h2 className="mt-2 break-all text-2xl font-black tracking-tight">
            {order.id}
          </h2>
          <p className="mt-2 flex items-center gap-2 text-xs text-muted">
            <CalendarDays size={15} /> {t.detailPlaced}{' '}
            {previewDate(order.placedOn)}
          </p>
        </div>
        <StatusPill status={order.status} />
      </div>
      <TrackingSummary order={order} />
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="rounded-[20px] border border-border bg-white p-5 sm:p-6">
          <h3 className="flex items-center gap-2 text-base font-extrabold">
            <PackageCheck className="text-primary" size={19} /> {t.exampleItems}
          </h3>
          <div className="mt-4 divide-y divide-border">
            {order.items.map((item) => (
              <div
                key={localizeOrderItem(item.title, locale)}
                className="flex items-start justify-between gap-3 py-4"
              >
                <div>
                  <p className="text-sm font-bold">
                    {localizeOrderItem(item.title, locale)}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {localizeOrderOption(item.option, locale)} · {t.quantity}{' '}
                    {item.quantity}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-extrabold">
                  {previewMoney(item.quantity * item.unitPrice, order.currency)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-5">
            <span className="text-sm text-muted">{t.exampleTotal}</span>
            <strong className="text-xl">
              {previewMoney(order.total, order.currency)}
            </strong>
          </div>
          <p className="mt-3 text-xs leading-5 text-muted">
            {t.receiptDisclaimer}
          </p>
        </div>
        <div className="space-y-5">
          <div className="rounded-[20px] border border-border bg-white p-5">
            <h3 className="flex items-center gap-2 text-sm font-extrabold">
              <MapPin size={17} className="text-primary" /> {t.deliveryRegion}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              {localizeShippingLabel(order, locale)}
            </p>
            <p className="mt-2 text-xs text-muted">{t.addressDisclaimer}</p>
          </div>
          <div className="rounded-[20px] border border-border bg-white p-5">
            <h3 className="mb-5 flex items-center gap-2 text-sm font-extrabold">
              <Truck size={17} className="text-primary" /> {t.demoMilestones}
            </h3>
            <OrderTimeline order={order} />
            <Link
              href={`/track?sample=${encodeURIComponent(order.id)}`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
            >
              {t.trackingLink} <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
