'use client'

import { useDisplayLocale } from '@/hooks/use-display-locale'
import { finishCopy } from '@/lib/finish-copy'

export function useFinishCopy() {
  return finishCopy(useDisplayLocale())
}
