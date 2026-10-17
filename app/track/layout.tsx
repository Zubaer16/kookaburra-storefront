import type { Metadata } from 'next'
import type { ReactNode } from 'react'

// Frontend-only screen: do not index or imply a live commerce service.
export const metadata: Metadata = {
  title: 'Tracking Preview',
  description:
    'Explore sample order tracking timelines. Real shipments are not connected.',
  robots: { index: false, follow: false },
}

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return children
}
