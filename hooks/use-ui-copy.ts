'use client'

import { useCommerceStore } from '@/stores/commerce-store'
import { useStoreReady } from '@/hooks/use-store-ready'
import { getUiCopy } from '@/lib/ui-copy'

/** Same hydration fallback as the existing header, preventing SSR/client mismatch. */
export function useUiCopy() {
  const ready = useStoreReady()
  const locale = useCommerceStore((state) => state.locale)
  return getUiCopy(ready ? locale : 'en')
}
