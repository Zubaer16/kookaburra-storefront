import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Providers } from '@/components/layout/providers'

export const metadata: Metadata = {
  title: {
    default: 'Kookaburra | Everyday Finds, Extraordinary Living',
    template: '%s | Kookaburra',
  },
  description:
    'Discover thoughtfully picked everyday essentials, tech, fashion, home goods and more. Kookaburra storefront preview.',
  applicationName: 'Kookaburra',
  openGraph: {
    title: 'Kookaburra | Storefront Preview',
    description:
      'Explore a multi-category shopping experience. Preview only; payments and customer accounts are disabled.',
    type: 'website',
  },
  robots: { index: false, follow: false }, // Preview only: enable indexing after live catalog and SEO are ready.
}
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2459e8',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main-content" tabIndex={-1} className="min-h-[55vh]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
