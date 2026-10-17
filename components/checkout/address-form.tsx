'use client'

import type { FormEvent } from 'react'
import { ArrowRight, Info, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { CheckoutAddress } from '@/lib/checkout-preview'
import { previewCountries } from '@/lib/checkout-preview'
import type { Market } from '@/lib/catalog'

type Props = {
  market: Market
  address: CheckoutAddress
  onChange: (address: CheckoutAddress) => void
  onContinue: () => void
}

const fieldLabel = 'mb-1.5 block text-xs font-bold text-ink'

export function AddressForm({ market, address, onChange, onContinue }: Props) {
  function update(field: keyof CheckoutAddress, value: string) {
    onChange({ ...address, [field]: value })
  }
  function proceed(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const required: (keyof CheckoutAddress)[] = [
      'fullName', 'email', 'phone', 'address1', 'city', 'region', 'postalCode', 'country',
    ]
    if (required.some((key) => !address[key].trim())) return
    onContinue()
  }
  return (
    <form onSubmit={proceed} className="rounded-2xl border border-border bg-white p-5 sm:p-7">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-primary"><MapPin size={21} /></div>
        <div>
          <h2 className="text-xl font-extrabold tracking-tight">Delivery address</h2>
          <p className="mt-1 text-sm text-muted">Enter sample details to preview the next step.</p>
        </div>
      </div>
      <div className="mb-6 flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50/70 p-3 text-xs leading-5 text-[#36507b]" role="note">
        <Info size={16} className="mt-0.5 shrink-0" />
        <span>This is a local UI demonstration. Use placeholder information, not your real address or phone. Nothing is sent to a server or saved after leaving this page.</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={fieldLabel} htmlFor="checkout-name">Full name <span aria-hidden="true">*</span></label>
          <Input id="checkout-name" autoComplete="off" maxLength={100} required value={address.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder="Example Customer" />
        </div>
        <div>
          <label className={fieldLabel} htmlFor="checkout-email">Email address *</label>
          <Input id="checkout-email" type="email" autoComplete="off" maxLength={200} required value={address.email} onChange={(e) => update('email', e.target.value)} placeholder="demo@example.com" />
        </div>
        <div>
          <label className={fieldLabel} htmlFor="checkout-phone">Phone number *</label>
          <Input id="checkout-phone" type="tel" autoComplete="off" minLength={6} maxLength={25} required value={address.phone} onChange={(e) => update('phone', e.target.value)} placeholder={market === 'BD' ? '01XXXXXXXXX (example)' : '+1 555 000 0000 (example)'} />
        </div>
        <div>
          <label className={fieldLabel} htmlFor="checkout-country">Country *</label>
          {market === 'BD' ? (
            <Input id="checkout-country" value="Bangladesh" readOnly aria-readonly="true" />
          ) : (
            <select
              id="checkout-country" required value={address.country === 'Bangladesh' ? '' : address.country}
              onChange={(e) => update('country', e.target.value)}
              className="h-11 w-full rounded-xl border border-border bg-white px-3.5 text-sm outline-none focus-visible:ring-4 focus-visible:ring-primary/10"
            >
              <option value="" disabled>Select a sample destination</option>
              {previewCountries.map((country) => <option key={country} value={country}>{country}</option>)}
            </select>
          )}
        </div>
        <div className="sm:col-span-2">
          <label className={fieldLabel} htmlFor="checkout-line1">Street / house / area *</label>
          <Input id="checkout-line1" autoComplete="off" maxLength={180} required value={address.address1} onChange={(e) => update('address1', e.target.value)} placeholder="Example street and house" />
        </div>
        <div className="sm:col-span-2">
          <label className={fieldLabel} htmlFor="checkout-line2">Apartment / building (optional)</label>
          <Input id="checkout-line2" autoComplete="off" maxLength={120} value={address.address2} onChange={(e) => update('address2', e.target.value)} placeholder="Flat, floor, landmark" />
        </div>
        <div>
          <label className={fieldLabel} htmlFor="checkout-city">{market === 'BD' ? 'City / district' : 'City'} *</label>
          <Input id="checkout-city" autoComplete="off" maxLength={100} required value={address.city} onChange={(e) => update('city', e.target.value)} placeholder={market === 'BD' ? 'Dhaka' : 'Sample city'} />
        </div>
        <div>
          <label className={fieldLabel} htmlFor="checkout-region">{market === 'BD' ? 'Division' : 'State / province / region'} *</label>
          <Input id="checkout-region" autoComplete="off" maxLength={100} required value={address.region} onChange={(e) => update('region', e.target.value)} placeholder={market === 'BD' ? 'Dhaka Division' : 'Sample region'} />
        </div>
        <div className="sm:col-span-2">
          <label className={fieldLabel} htmlFor="checkout-postcode">Postal / ZIP code *</label>
          <Input id="checkout-postcode" autoComplete="off" maxLength={20} required value={address.postalCode} onChange={(e) => update('postalCode', e.target.value)} placeholder={market === 'BD' ? '1200' : 'Example postal code'} />
        </div>
      </div>
      <Button className="mt-7 w-full sm:w-auto" type="submit">Continue to delivery <ArrowRight size={17} /></Button>
    </form>
  )
}
