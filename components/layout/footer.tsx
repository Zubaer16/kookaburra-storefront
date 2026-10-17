'use client'

import Link from 'next/link'
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import { Logo } from '@/components/layout/logo'
import { dictionary } from '@/lib/i18n'
import { categories } from '@/lib/catalog'
import { useCommerceStore } from '@/stores/commerce-store'
import { useStoreReady } from '@/hooks/use-store-ready'

export function Footer() {
  const ready = useStoreReady()
  const locale = useCommerceStore((s) => s.locale)
  const t = dictionary(ready ? locale : 'en')
  const benefits = [
    {
      icon: Truck,
      title: t.freeShipping,
      detail: 'Availability varies by country & order',
    },
    {
      icon: PackageCheck,
      title: t.easyReturns,
      detail: 'Clear order support policies',
    },
    {
      icon: ShieldCheck,
      title: t.secureCheckout,
      detail: 'Production payment integration pending',
    },
  ]
  return (
    <>
      <div className="border-y border-border bg-[#fbfcff]">
        <div className="container-shell grid gap-7 py-8 md:grid-cols-3 md:gap-4">
          {benefits.map(({ icon: Icon, title, detail }) => (
            <div key={title} className="flex items-center gap-3.5">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary">
                <Icon size={22} />
              </div>
              <div>
                <p className="text-sm font-bold">{title}</p>
                <p className="mt-1 text-xs text-muted">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="bg-[#14203A] text-white">
        <div className="container-shell grid gap-10 py-14 lg:grid-cols-[1.7fr_1fr_1fr_1.2fr]">
          <div className="max-w-xs">
            <Logo light />
            <p className="mt-5 text-sm leading-7 text-[#afbad0]">
              Everyday essentials and unexpected favorites. Thoughtfully curated
              for wherever life takes you.
            </p>
            <div className="mt-5 flex gap-2">
              <span
                aria-label="Social media coming later"
                className="flex size-9 items-center justify-center rounded-lg border border-white/15 text-white/70"
              >
                <Facebook size={16} />
              </span>
              <span
                aria-label="Social media coming later"
                className="flex size-9 items-center justify-center rounded-lg border border-white/15 text-white/70"
              >
                <Instagram size={16} />
              </span>
            </div>
          </div>
          <div>
            <p className="mb-5 text-xs font-extrabold uppercase tracking-[.15em] text-white">
              {t.quickLinks}
            </p>
            <div className="grid gap-3 text-sm text-[#b8c3d9]">
              <Link className="hover:text-white" href="/shop">
                Shop all
              </Link>
              <Link className="hover:text-white" href="/categories">
                All categories
              </Link>
              <Link className="hover:text-white" href="/shop?tag=sale">
                Special offers
              </Link>
              <Link className="hover:text-white" href="/shop?tag=new">
                New arrivals
              </Link>
              <Link className="hover:text-white" href="/wishlist">
                Wishlist
              </Link>
              <Link className="hover:text-white" href="/account">
                Account preview
              </Link>
              <Link className="hover:text-white" href="/track">
                Demo tracking
              </Link>
            </div>
          </div>
          <div>
            <p className="mb-5 text-xs font-extrabold uppercase tracking-[.15em] text-white">
              Categories
            </p>
            <div className="grid gap-3 text-sm text-[#b8c3d9]">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  className="hover:text-white"
                  href={`/shop?category=${category.id}`}
                >
                  {category.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-5 text-xs font-extrabold uppercase tracking-[.15em] text-white">
              Stay in the loop
            </p>
            <p className="text-sm leading-6 text-[#b8c3d9]">
              {t.subscribeText}
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm text-white/70">
              <Mail size={17} /> Newsletter coming soon{' '}
              <ArrowUpRight size={16} className="ml-auto" />
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs text-[#b8c3d9]">
              <MapPin size={14} /> Bangladesh · Worldwide-ready design
            </p>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="container-shell flex flex-col justify-between gap-2 py-5 text-xs text-[#96a4bf] sm:flex-row">
            <span>
              © {new Date().getFullYear()} Kookaburra. All rights reserved.
            </span>
            <span>Patch 05 UI preview · No live accounts, orders or payments</span>
          </div>
        </div>
      </footer>
    </>
  )
}
