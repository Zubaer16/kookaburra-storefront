'use client'

import { useEffect } from 'react'
import { AlertCircle, RotateCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUiCopy } from '@/hooks/use-ui-copy'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useUiCopy()
  useEffect(() => {
    console.error('Storefront rendering failed', error)
  }, [error])
  return (
    <div className="container-shell flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
      <AlertCircle size={44} className="text-[#d94f5b]" />
      <h1 className="mt-5 text-2xl font-extrabold">
        {t.errorTitle}
      </h1>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted">
        {t.errorDescription}
      </p>
      <Button onClick={reset} className="mt-6">
        <RotateCw size={17} /> {t.tryAgain}
      </Button>
    </div>
  )
}
