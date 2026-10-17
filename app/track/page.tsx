import type { Metadata } from 'next'
import { TrackingClient } from '@/components/account/tracking-client'
export const metadata: Metadata = { title: 'Sample Order Tracking', robots: { index: false, follow: false } }
export default async function TrackPage({ searchParams }: { searchParams: Promise<{ sample?: string | string[] }> }) {
  const { sample } = await searchParams
  return <TrackingClient initialSample={typeof sample === 'string' ? sample : undefined} />
}
