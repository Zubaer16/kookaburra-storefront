import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, LockKeyhole, Mail, ShieldCheck, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Logo } from '@/components/layout/logo'

export function AuthPreview({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const register = mode === 'sign-up'
  return (
    <div className="container-shell grid min-h-[65vh] items-center gap-10 py-12 lg:grid-cols-2 lg:py-20">
      <section className="mx-auto w-full max-w-[470px]">
        <Link href="/account" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-primary"><ArrowLeft size={16}/> Account preview</Link>
        <div className="rounded-[26px] border border-border bg-white p-6 shadow-[0_18px_60px_rgba(21,32,57,.07)] sm:p-9">
          <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-primary">{register ? <UserPlus size={24}/> : <LockKeyhole size={24}/>}</div>
          <p className="text-xs font-extrabold uppercase tracking-[.15em] text-primary">Authentication · UI only</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">{register ? 'Create your account' : 'Welcome back'}</h1>
          <p className="mt-3 text-sm leading-6 text-muted">{register ? 'A preview of the registration experience we will connect to the backend later.' : 'Explore the future sign-in screen, without entering any real credentials.'}</p>
          <div role="note" className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-950"><strong>Not active:</strong> Account creation and sign-in are disabled until the secure authentication API is available. Please do not enter personal information.</div>
          <div className="mt-7 space-y-4" aria-label="Disabled authentication form preview">
            {register && <label className="block text-sm font-bold">Full name <Input disabled autoComplete="off" placeholder="Your full name (disabled)" className="mt-2" /></label>}
            <label className="block text-sm font-bold">Email address <span className="mt-2 flex items-center gap-2 rounded-xl"><Input type="email" disabled autoComplete="off" placeholder="you@example.com (disabled)" /></span></label>
            <label className="block text-sm font-bold">Password <Input type="password" disabled autoComplete="off" placeholder="Password (disabled)" className="mt-2" /></label>
            {register && <label className="block text-sm font-bold">Confirm password <Input type="password" disabled autoComplete="off" placeholder="Confirm password (disabled)" className="mt-2" /></label>}
            <Button className="w-full" disabled>{register ? 'Account registration not available' : 'Sign-in not available'} <ArrowRight size={17}/></Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-1 text-sm"><span className="text-muted">{register ? 'Already have an account?' : 'New to Kookaburra?'}</span><Link href={register ? '/sign-in' : '/sign-up'} className="font-bold text-primary hover:underline">{register ? 'Sign in design' : 'Registration design'}</Link></div>
          <Link href="/account" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">Explore account preview <ArrowRight size={15}/></Link>
        </div>
      </section>
      <aside className="hidden min-h-[530px] flex-col justify-center overflow-hidden rounded-[32px] bg-[#ecf2ff] p-11 lg:flex" aria-label="Future account benefits">
        <Logo />
        <div className="my-9 flex size-20 items-center justify-center rounded-3xl bg-primary text-white shadow-xl shadow-primary/15"><ShieldCheck size={38}/></div>
        <h2 className="max-w-md text-[34px] font-black leading-tight tracking-tight text-[#142a57]">A better way to keep track of everything.</h2>
        <p className="mt-4 max-w-sm text-sm leading-7 text-[#55698b]">Your orders, wishlists and delivery progress—available on web and in the future Flutter app, powered by a shared backend.</p>
        <div className="mt-8 space-y-3">{[
          'One account across website and mobile', 'Secure server-managed sessions (future)', 'Your own private order history (future)',
        ].map((item) => <div key={item} className="flex items-center gap-3 text-sm font-bold text-[#25446f]"><CheckCircle2 size={19} className="text-primary"/>{item}</div>)}</div>
        <p className="mt-8 flex items-center gap-2 text-xs text-[#61749a]"><Mail size={15}/> No emails or messages are sent from this preview.</p>
      </aside>
    </div>
  )
}
