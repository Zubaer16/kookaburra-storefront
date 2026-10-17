'use client'

import { useStoreReady } from '@/hooks/use-store-ready'
import { useCommerceStore } from '@/stores/commerce-store'

/** Keep the SSR first render consistent; switch after persisted preferences hydrate. */
export function useDisplayLocale() {
  const ready = useStoreReady()
  const locale = useCommerceStore((state) => state.locale)
  return ready ? locale : 'en'
}
