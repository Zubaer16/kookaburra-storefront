'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, House, MapPin, Package, Settings2, ShieldAlert, Truck, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'

const sections = [
  { href: '/account', label: 'Overview', icon: House },
  { href: '/account/orders', label: 'Demo orders', icon: Package },
  { href: '/track', label: 'Track sample', icon: Truck },
  { href: '/account/addresses', label: 'Addresses', icon: MapPin },
  { href: '/account/settings', label: 'Settings', icon: Settings2 },
]

export function AccountShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  return (
    <div className="container-shell pb-20 pt-8 sm:pt-11">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.15em] text-primary"><UserRound size={16} /> Your space · UI preview</p>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Account center</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">A look at your future shopping account—designed for web and Flutter.</p>
        </div>
        <Link href="/sign-in" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">Sign-in design <ArrowRight size={16} /></Link>
      </div>
      <div role="note" className="mb-7 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3.5 text-sm leading-6 text-amber-950">
        <ShieldAlert size={20} className="mt-0.5 shrink-0" />
        <div><strong>Preview only:</strong> No customer account exists yet. Orders are fictional samples; login, saved addresses, identity and tracking are not connected to a server.</div>
      </div>
      <div className="grid items-start gap-7 lg:grid-cols-[238px_minmax(0,1fr)]">
        <nav aria-label="Account navigation" className="flex gap-2 overflow-x-auto pb-1 lg:sticky lg:top-44 lg:flex-col lg:rounded-[22px] lg:border lg:border-border lg:bg-white lg:p-3">
          {sections.map(({ href, label, icon: Icon }) => {
            const active = href === '/account' ? pathname === '/account' : pathname === href || (href === '/account/orders' && pathname.startsWith('/account/orders/'))
            return (
              <Link key={href} href={href} aria-current={active ? 'page' : undefined}
                className={cn('flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-xl border px-3.5 py-3 text-sm font-bold transition lg:border-transparent', active ? 'border-primary/15 bg-blue-50 text-primary' : 'border-border bg-white text-[#4c5a75] hover:border-primary/30 hover:bg-[#f7faff]')}>
                <Icon size={18} /> {label} {active && <span className="sr-only">(current)</span>}
              </Link>
            )
          })}
        </nav>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  )
}
