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
    'Discover thoughtfully picked everyday essentials, tech, fashion, home goods and more. Kookaburra v2 storefront preview.',
  applicationName: 'Kookaburra',
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
        <Providers>
          <Header />
          <main id="main-content" className="min-h-[55vh]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
