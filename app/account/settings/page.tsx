'use client'
import Link from 'next/link'
import { ArrowRight, Globe2, LockKeyhole, Settings2 } from 'lucide-react'
import { useCommerceStore } from '@/stores/commerce-store'
import { useStoreReady } from '@/hooks/use-store-ready'
import { useUiCopy } from '@/hooks/use-ui-copy'
export default function AccountSettingsPage() {
  const ready = useStoreReady()
  const t = useUiCopy()
  const market = useCommerceStore((s) => s.market)
  const setMarket = useCommerceStore((s) => s.setMarket)
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-black tracking-tight">
          {t.shoppingPreferences}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          {t.preferencesIntro}
        </p>
      </div>
      <div className="rounded-[22px] border border-border bg-white p-5 sm:p-7">
        <div className="grid gap-6">
          <label className="block text-sm font-bold">
            <span className="mb-2 flex items-center gap-2">
              <Globe2 size={18} className="text-primary" /> {t.shoppingRegion}
            </span>
            <select
              disabled={!ready}
              value={ready ? market : 'BD'}
              onChange={(e) => setMarket(e.target.value as 'BD' | 'INTL')}
              className="h-12 w-full rounded-xl border border-border bg-white px-3.5 text-sm font-medium"
            >
              <option value="BD">Bangladesh · BDT</option>
              <option value="INTL">International · USD</option>
            </select>
          </label>
        </div>
        <p className="mt-5 text-xs leading-6 text-muted">
          {t.settingsDisclaimer}
        </p>
      </div>
      <div className="rounded-[22px] border border-border bg-[#fbfcff] p-6">
        <h3 className="flex items-center gap-2 text-base font-extrabold">
          <LockKeyhole size={19} className="text-primary" /> {t.securityProfile}
        </h3>
        <p className="mt-3 text-sm leading-6 text-muted">{t.securityIntro}</p>
        <Link
          href="/sign-in"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
        >
          {t.seeSignin} <ArrowRight size={16} />
        </Link>
      </div>
      <p className="flex items-center gap-2 text-xs text-muted">
        <Settings2 size={15} /> {t.localPrefs}
      </p>
    </section>
  )
}
