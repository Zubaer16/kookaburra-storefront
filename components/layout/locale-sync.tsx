'use client'

import { useEffect } from 'react'
import { useCommerceStore } from '@/stores/commerce-store'
import { useStoreReady } from '@/hooks/use-store-ready'

/** Browser preference only. SSR and SEO localization require URL/server routing later. */
export function LocaleSync() {
  const ready = useStoreReady()
  const locale = useCommerceStore((state) => state.locale)
  useEffect(() => {
    if (!ready) return
    document.documentElement.lang = locale
    document.documentElement.dir = 'ltr'
  }, [ready, locale])
  return null
}
