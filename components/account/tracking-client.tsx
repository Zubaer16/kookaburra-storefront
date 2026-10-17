'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Search, ShieldAlert, Truck } from 'lucide-react'
import { OrderTimeline, TrackingSummary } from '@/components/account/order-ui'
import { demoOrders, previewOrderById } from '@/lib/account-preview'

export function TrackingClient({ initialSample }: { initialSample?: string }) {
  const [selected, setSelected] = useState(
    initialSample && previewOrderById(initialSample)
      ? initialSample
      : demoOrders[0].id,
  )
  const order = previewOrderById(selected)!
  return (
    <div className="container-shell max-w-4xl pb-20 pt-9 sm:pt-12">
      <Link
        href="/account/orders"
        className="text-sm font-bold text-primary hover:underline"
      >
        ← Back to sample orders
      </Link>
      <div className="mt-5">
        <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.15em] text-primary">
          <Truck size={16} /> Shipment experience
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          Track an example order
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Choose from the fictional example orders to see how future delivery
          updates will look. This is not a real parcel-tracking service.
        </p>
      </div>
      <div
        role="note"
        className="mt-6 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"
      >
        <ShieldAlert className="mt-0.5 shrink-0" size={18} />
        <span>
          Only built-in DEMO order IDs work. Do not enter real order numbers,
          phone numbers or personal details.
        </span>
      </div>
      <div className="mt-7 grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-5">
          <div className="rounded-2xl border border-border bg-white p-5">
            <label
              htmlFor="tracking-sample"
              className="mb-2 block text-sm font-extrabold"
            >
              Choose sample order
            </label>
            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute left-3 top-3.5 text-muted"
              />
              <select
                id="tracking-sample"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-border bg-[#f9fbff] pl-10 pr-4 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {demoOrders.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.id}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <TrackingSummary order={order} />
          <Link
            href={`/account/orders/${order.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
          >
            View example order details <ArrowRight size={16} />
          </Link>
        </div>
        <div className="rounded-2xl border border-border bg-white p-5 sm:p-6">
          <h2 className="mb-6 text-lg font-extrabold">Delivery timeline</h2>
          <OrderTimeline order={order} />
        </div>
      </div>
    </div>
  )
}
