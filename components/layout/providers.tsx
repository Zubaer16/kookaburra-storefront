'use client'

import { Toaster } from 'sonner'
import { StoreHydrator } from '@/hooks/use-store-ready'
import { CartDrawer } from '@/components/store/cart-drawer'
import { LocaleSync } from '@/components/layout/locale-sync'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StoreHydrator />
      <LocaleSync />
      {children}
      <CartDrawer />
      <Toaster richColors closeButton position="top-right" />
    </>
  )
}
