'use client'

import { useStoreReady } from '@/hooks/use-store-ready'
import { useCommerceStore } from '@/stores/commerce-store'
import { getPreviewCopy } from '@/lib/preview-copy'

export function usePreviewCopy() {
  const ready = useStoreReady()
  const locale = useCommerceStore((state) => state.locale)
  return getPreviewCopy(ready ? locale : 'en')
}
