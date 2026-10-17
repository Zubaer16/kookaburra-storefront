import Link from 'next/link'
import { ArrowRight, Check, Circle, Clock3, Package, Truck } from 'lucide-react'
import { orderStatusLabels, previewDate, previewMoney, type PreviewOrder, type PreviewOrderStatus } from '@/lib/account-preview'

const statusStyle: Record<PreviewOrderStatus, string> = {
  processing: 'bg-amber-50 text-amber-800 border-amber-200',
  shipped: 'bg-blue-50 text-blue-800 border-blue-200',
  delivered: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  cancelled: 'bg-slate-50 text-slate-700 border-slate-200',
}

export function StatusPill({ status }: { status: PreviewOrderStatus }) {
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${statusStyle[status]}`}>{orderStatusLabels[status]}</span>
}

export function DemoOrderCard({ order }: { order: PreviewOrder }) {
  return (
    <article className="rounded-[20px] border border-border bg-white p-5 shadow-[0_10px_28px_rgba(25,45,87,.04)] sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-muted">Sample order</p>
          <h3 className="mt-1 break-all text-base font-extrabold">{order.id}</h3>
          <p className="mt-1 text-xs text-muted">Placed {previewDate(order.placedOn)} · {order.itemCount} item(s)</p>
        </div>
        <StatusPill status={order.status} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 pt-5">
        <div>
          <p className="text-xs text-muted">Illustrative total · {order.currency}</p>
          <p className="mt-1 text-xl font-black">{previewMoney(order.total, order.currency)}</p>
        </div>
        <Link href={`/account/orders/${order.id}`} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-hover">View details <ArrowRight size={16} /></Link>
      </div>
    </article>
  )
}

export function OrderTimeline({ order }: { order: PreviewOrder }) {
  return (
    <ol aria-label={`Demo tracking timeline for ${order.id}`} className="space-y-0">
      {order.events.map((event, index) => (
        <li key={event.label} className="relative flex gap-4 pb-8 last:pb-0">
          {index < order.events.length - 1 && <span aria-hidden="true" className={`absolute left-[17px] top-9 h-[calc(100%-36px)] w-0.5 ${event.completed && order.events[index + 1].completed ? 'bg-primary/35' : 'bg-border'}`} />}
          <span aria-hidden="true" className={`z-10 flex size-9 shrink-0 items-center justify-center rounded-full border-2 ${event.completed ? 'border-primary bg-blue-50 text-primary' : 'border-[#e1e7f0] bg-white text-[#a0abc0]'}`}>
            {event.completed ? <Check size={17} /> : <Circle size={13} />}
          </span>
          <div className="min-w-0 pt-1">
            <p className={`text-sm font-extrabold ${event.completed ? 'text-ink' : 'text-muted'}`}>{event.label}</p>
            <p className="mt-1 text-xs leading-5 text-muted">{event.note}</p>
            {event.date && <p className="mt-1 text-xs font-bold text-primary">{previewDate(event.date)}</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}

export function TrackingSummary({ order }: { order: PreviewOrder }) {
  const Icon = order.status === 'delivered' ? Package : order.status === 'shipped' ? Truck : Clock3
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-[#f2f6ff] p-4">
      <span className="flex size-12 items-center justify-center rounded-xl bg-white text-primary"><Icon size={23}/></span>
      <div className="flex-1">
        <p className="text-xs font-bold uppercase tracking-wider text-muted">Tracking status · Fictional example</p>
        <p className="mt-1 text-base font-extrabold">{orderStatusLabels[order.status]}</p>
      </div>
      <StatusPill status={order.status} />
    </div>
  )
}
