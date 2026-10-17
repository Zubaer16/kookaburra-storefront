import Link from 'next/link'
import { ArrowRight, Globe2, MapPin, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
export default function AddressesPage() {
  return (
    <section className="rounded-[22px] border border-border bg-white p-6 sm:p-8">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-primary">
        <MapPin size={27} />
      </div>
      <h2 className="mt-6 text-2xl font-black tracking-tight">
        Your addresses, coming later
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
        An address book will let signed-in customers securely manage home,
        office and international delivery destinations. We will add this only
        after server-side authentication and secure storage exist.
      </p>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-[#f6f9ff] p-5">
          <Globe2 size={20} className="text-primary" />
          <h3 className="mt-3 text-sm font-extrabold">
            Bangladesh & international
          </h3>
          <p className="mt-2 text-xs leading-6 text-muted">
            Country-specific fields and eligibility checks will come from the
            backend.
          </p>
        </div>
        <div className="rounded-2xl bg-[#f6f9ff] p-5">
          <ShieldCheck size={20} className="text-primary" />
          <h3 className="mt-3 text-sm font-extrabold">Privacy first</h3>
          <p className="mt-2 text-xs leading-6 text-muted">
            This page does not request, save or transmit your address.
          </p>
        </div>
      </div>
      <Button asChild variant="outline" className="mt-8">
        <Link href="/checkout">
          Preview checkout address form <ArrowRight size={16} />
        </Link>
      </Button>
    </section>
  )
}
