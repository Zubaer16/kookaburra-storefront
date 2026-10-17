'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserPlus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Logo } from '@/components/layout/logo'
import { usePreviewCopy } from '@/hooks/use-preview-copy'

export function AuthPreview({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const register = mode === 'sign-up'
  const t = usePreviewCopy()
  return (
    <div className="container-shell grid min-h-[65vh] items-center gap-10 py-12 lg:grid-cols-2 lg:py-20">
      <section className="mx-auto w-full max-w-[470px]">
        <Link
          href="/account"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-primary"
        >
          <ArrowLeft size={16} /> {t.authBack}
        </Link>
        <div className="rounded-[26px] border border-border bg-white p-6 shadow-[0_18px_60px_rgba(21,32,57,.07)] sm:p-9">
          <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-primary">
            {register ? <UserPlus size={24} /> : <LockKeyhole size={24} />}
          </div>
          <p className="text-xs font-extrabold uppercase tracking-[.15em] text-primary">
            {t.authNote}
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">
            {register ? t.authCreate : t.authWelcome}
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            {register ? t.authRegisterIntro : t.authLoginIntro}
          </p>
          <div
            role="note"
            className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-950"
          >
            <strong>{t.authInactive}</strong> {t.authSafety}
          </div>
          <div className="mt-7 space-y-4" aria-label={t.authForm}>
            {register && (
              <label className="block text-sm font-bold">
                {t.fullName}{' '}
                <Input
                  disabled
                  autoComplete="off"
                  placeholder={`${t.fullName} ${t.authDisabled}`}
                  className="mt-2"
                />
              </label>
            )}
            <label className="block text-sm font-bold">
              {t.email}{' '}
              <span className="mt-2 flex items-center gap-2 rounded-xl">
                <Input
                  type="email"
                  disabled
                  autoComplete="off"
                  placeholder={`you@example.com ${t.authDisabled}`}
                />
              </span>
            </label>
            <label className="block text-sm font-bold">
              {t.password}{' '}
              <Input
                type="password"
                disabled
                autoComplete="off"
                placeholder={`${t.password} ${t.authDisabled}`}
                className="mt-2"
              />
            </label>
            {register && (
              <label className="block text-sm font-bold">
                {t.confirmPassword}{' '}
                <Input
                  type="password"
                  disabled
                  autoComplete="off"
                  placeholder={`${t.confirmPassword} ${t.authDisabled}`}
                  className="mt-2"
                />
              </label>
            )}
            <Button className="w-full" disabled>
              {register ? t.authRegisterDisabled : t.authLoginDisabled}{' '}
              <ArrowRight size={17} />
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-1 text-sm">
            <span className="text-muted">
              {register ? t.authExisting : t.authNew}
            </span>
            <Link
              href={register ? '/sign-in' : '/sign-up'}
              className="font-bold text-primary hover:underline"
            >
              {register ? t.authLoginDesign : t.authRegisterDesign}
            </Link>
          </div>
          <Link
            href="/account"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
          >
            {t.authExplore} <ArrowRight size={15} />
          </Link>
        </div>
      </section>
      <aside
        className="hidden min-h-[530px] flex-col justify-center overflow-hidden rounded-[32px] bg-[#ecf2ff] p-11 lg:flex"
        aria-label={t.authBenefits}
      >
        <Logo />
        <div className="my-9 flex size-20 items-center justify-center rounded-3xl bg-primary text-white shadow-xl shadow-primary/15">
          <ShieldCheck size={38} />
        </div>
        <h2 className="max-w-md text-[34px] font-black leading-tight tracking-tight text-[#142a57]">
          {t.authBenefitTitle}
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-7 text-[#55698b]">
          {t.authBenefitText}
        </p>
        <div className="mt-8 space-y-3">
          {[t.authBenefit1, t.authBenefit2, t.authBenefit3].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 text-sm font-bold text-[#25446f]"
            >
              <CheckCircle2 size={19} className="text-primary" />
              {item}
            </div>
          ))}
        </div>
        <p className="mt-8 flex items-center gap-2 text-xs text-[#61749a]">
          <Mail size={15} /> {t.authNoEmail}
        </p>
      </aside>
    </div>
  )
}
