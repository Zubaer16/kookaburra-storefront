import type { Metadata } from 'next'
import type { ReactNode } from 'react'

// Frontend-only screen: do not index or imply a live commerce service.
export const metadata: Metadata = {
  title: 'Sign In Preview',
  description:
    'Kookaburra sign-in design preview. Account authentication is not available.',
  robots: { index: false, follow: false },
}

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return children
}
