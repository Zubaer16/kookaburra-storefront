"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight, ChevronDown, Globe2, Heart, Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/layout/logo";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useCommerceStore } from "@/stores/commerce-store";
import { useStoreReady } from "@/hooks/use-store-ready";
import { dictionary } from "@/lib/i18n";
import { categories } from "@/lib/catalog";
import { cn } from "@/lib/utils";

function SearchBox({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(`/shop${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
  }
  return (
    <form role="search" onSubmit={submit} className={cn("flex items-center overflow-hidden rounded-xl border border-[#e3e8f1] bg-[#f5f7fb] transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10", compact ? "h-11" : "h-12")}>
      <Search className="ml-3.5 shrink-0 text-[#8a96aa]" size={19} />
      <input aria-label="Search the catalog" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, categories & more..." className="h-full w-full min-w-0 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-[#8a96aa]" />
      <button aria-label="Submit search" className={cn("mr-1 hidden shrink-0 rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover sm:block", compact ? "h-9" : "h-10")} type="submit">Search</button>
    </form>
  );
}

function IconCounter({ count }: { count: number }) {
  return count > 0 && <span className="absolute -right-1 -top-1 flex size-[18px] items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">{count > 9 ? "9+" : count}</span>;
}

export function Header() {
  const path = usePathname();
  const ready = useStoreReady();
  const storedLocale = useCommerceStore((state) => state.locale);
  const storedMarket = useCommerceStore((state) => state.market);
  const cart = useCommerceStore((state) => state.cart);
  const wishlist = useCommerceStore((state) => state.wishlist);
  const setMarket = useCommerceStore((state) => state.setMarket);
  const setLocale = useCommerceStore((state) => state.setLocale);
  const setCartOpen = useCommerceStore((state) => state.setCartOpen);
  const [mobileOpen, setMobileOpen] = useState(false);
  const locale = ready ? storedLocale : "en";
  const market = ready ? storedMarket : "BD";
  const t = dictionary(locale);
  const cartCount = ready ? cart.reduce((sum, line) => sum + line.quantity, 0) : 0;
  const wishCount = ready ? wishlist.length : 0;
  const navLinks = [
    { href: "/shop", label: t.shop },
    { href: "/shop?tag=sale", label: t.deals },
    { href: "/shop?sort=newest", label: t.newArrivals },
  ];
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur-xl">
      <div className="border-b border-[#dfe6f7] bg-[#f4f7ff] text-[11px] text-[#4b5d84]">
        <div className="container-shell flex h-8 items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 truncate"><Globe2 size={13} /> {t.global}</span>
          <span className="hidden font-semibold sm:block">Curated for everyday living <span className="ml-2 text-primary">✦</span></span>
        </div>
      </div>
      <div className="container-shell flex h-[74px] items-center gap-5 lg:gap-8">
        <button aria-label="Open navigation" className="flex size-10 items-center justify-center rounded-xl border border-border lg:hidden" type="button" onClick={() => setMobileOpen(true)}><Menu size={21} /></button>
        <Logo />
        <div className="hidden min-w-0 flex-1 lg:block"><SearchBox /></div>
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-4">
          <div className="hidden items-center gap-1.5 border-r border-border pr-4 md:flex">
            <Globe2 size={16} className="text-muted" />
            <label htmlFor="market" className="sr-only">Shopping country</label>
            <select id="market" className="max-w-[115px] cursor-pointer bg-transparent text-xs font-bold outline-none" value={market} onChange={(event) => setMarket(event.target.value as "BD" | "INTL") }>
              <option value="BD">🇧🇩 BDT</option><option value="INTL">🌍 USD</option>
            </select>
            <label htmlFor="language" className="sr-only">Language</label>
            <select id="language" className="cursor-pointer bg-transparent text-xs font-bold outline-none" value={locale} onChange={(event) => setLocale(event.target.value as "en" | "bn") }>
              <option value="en">EN</option><option value="bn">BN</option>
            </select>
          </div>
          <button type="button" title="Account (coming in a later patch)" onClick={() => toast.info("Customer accounts will be connected in a later patch.")} className="hidden items-center gap-2 rounded-lg p-2 text-ink hover:bg-slate-100 md:flex"><UserRound size={21} /><span className="hidden text-xs font-semibold xl:block">{t.account}</span></button>
          <Link href="/wishlist" aria-label={t.wishlist} title={t.wishlist} className="relative flex size-10 items-center justify-center rounded-lg hover:bg-slate-100"><Heart size={22} /><IconCounter count={wishCount} /></Link>
          <button type="button" aria-label={`Open cart, ${cartCount} items`} onClick={() => setCartOpen(true)} className="relative flex size-10 items-center justify-center rounded-lg hover:bg-slate-100"><ShoppingBag size={22}/><IconCounter count={cartCount}/></button>
        </div>
      </div>
      <div className="container-shell pb-3 lg:hidden"><SearchBox compact /></div>
      <nav className="hidden border-t border-border/65 lg:block" aria-label="Main navigation">
        <div className="container-shell flex h-12 items-center gap-7">
          <Link href="/shop" className="inline-flex items-center gap-2 border-r border-border pr-6 text-[13px] font-bold text-primary"><Menu size={16}/>{t.categories}<ChevronDown size={14}/></Link>
          {navLinks.map(({ href, label }) => <Link key={href} href={href} className={cn("text-[13px] font-semibold transition hover:text-primary", path === href ? "text-primary" : "text-[#4c5872]")}>{label}</Link>)}
          <div className="ml-auto text-[12px] font-semibold text-[#52708f]">✦ {t.freeShipping}</div>
        </div>
      </nav>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="overflow-y-auto p-5">
          <SheetTitle className="sr-only">Mobile navigation</SheetTitle>
          <SheetDescription className="sr-only">Browse product collections and select language and market.</SheetDescription>
          <div className="mb-8 pr-10"><Logo /></div>
          <div className="space-y-1">{navLinks.map(({ href, label }) => <Link key={href} onClick={() => setMobileOpen(false)} href={href} className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold hover:bg-blue-50">{label}<ArrowRight size={16}/></Link>)}</div>
          <div className="my-6 h-px bg-border" />
          <div className="mb-2 px-3 text-xs font-extrabold uppercase tracking-[.18em] text-muted">{t.categories}</div>
          <div className="space-y-1">{categories.map((category) => <Link key={category.id} onClick={() => setMobileOpen(false)} href={`/shop?category=${category.id}`} className="block rounded-xl px-3 py-2.5 text-sm text-ink hover:bg-blue-50">{locale === "bn" ? category.bn : category.label}</Link>)}</div>
          <div className="my-6 h-px bg-border" />
          <div className="flex items-center gap-2"><select aria-label="Shopping market" value={market} onChange={(event) => setMarket(event.target.value as "BD" | "INTL")} className="w-1/2 rounded-lg border border-border p-2 text-sm"><option value="BD">🇧🇩 BDT</option><option value="INTL">🌍 USD</option></select><select aria-label="Language" value={locale} onChange={(event) => setLocale(event.target.value as "en" | "bn")} className="w-1/2 rounded-lg border border-border p-2 text-sm"><option value="en">English</option><option value="bn">বাংলা</option></select></div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
