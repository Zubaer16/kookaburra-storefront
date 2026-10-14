"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Backpack, ChevronRight, Headphones, LampDesk, Shirt, Sparkles, Tag, Watch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/store/product-card";
import { categories, products, type CategoryId } from "@/lib/catalog";
import { dictionary } from "@/lib/i18n";
import { useCommerceStore } from "@/stores/commerce-store";
import { useStoreReady } from "@/hooks/use-store-ready";

const categoryIcons = { electronics: Headphones, fashion: Shirt, home: LampDesk, beauty: Sparkles, lifestyle: Backpack, accessories: Watch } satisfies Record<CategoryId, typeof Headphones>;

export default function HomePage() {
  const savedLocale = useCommerceStore((state) => state.locale);
  const ready = useStoreReady();
  const locale = ready ? savedLocale : "en";
  const t = dictionary(locale);
  return <>
    <section className="container-shell pt-6 sm:pt-8">
      <div className="grid gap-4 lg:grid-cols-[1.8fr_1fr]">
        <div className="relative min-h-[370px] overflow-hidden rounded-[26px] bg-gradient-to-br from-[#1e49d5] via-[#2d5de4] to-[#5880f2] text-white sm:min-h-[440px]">
          <div className="pointer-events-none absolute -left-32 -top-40 size-[410px] rounded-full border-[65px] border-white/5"/>
          <div className="relative z-10 flex h-full flex-col justify-center px-7 py-11 sm:w-[58%] sm:px-12 sm:py-14 lg:w-[57%]">
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-2 text-[11px] font-bold tracking-wide text-white/95"><Sparkles size={14} className="text-[#ffda8a]"/>{t.discover}</span>
            <h1 className="max-w-xl text-[36px] font-extrabold leading-[1.12] tracking-[-.05em] sm:text-[45px] lg:text-[49px]">{t.heroTitle}</h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#e8eeff] sm:text-[15px]">{t.heroText}</p>
            <div className="mt-7 flex flex-wrap gap-3"><Button size="lg" variant="outline" className="border-white bg-white text-primary hover:bg-[#ecf1ff]" asChild><Link href="/shop">{t.shopNow}<ArrowUpRight size={17}/></Link></Button><Link href="/shop?tag=sale" className="inline-flex items-center gap-2 px-2 text-sm font-bold text-white hover:underline">{t.browseDeals}<ArrowRight size={16}/></Link></div>
          </div>
          <div className="pointer-events-none absolute -bottom-8 -right-8 h-[285px] w-[390px] opacity-55 sm:opacity-100 sm:-bottom-3 sm:-right-5 sm:h-[410px] sm:w-[390px] lg:right-0 lg:w-[48%] xl:w-[51%]"><Image src="/illustrations/hero.svg" fill alt="Wireless headphones and curated lifestyle products illustration" priority className="object-contain object-bottom" /></div>
          <div className="absolute bottom-5 left-8 z-10 flex items-center gap-1.5 sm:bottom-6 sm:left-12"><span className="h-1.5 w-7 rounded-full bg-white"/><span className="size-1.5 rounded-full bg-white/30"/><span className="size-1.5 rounded-full bg-white/30"/></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <Link href="/shop?category=electronics" className="group relative flex min-h-[194px] overflow-hidden rounded-[24px] bg-[#e9f3f2] p-7 sm:min-h-[206px] lg:min-h-0">
            <div className="relative z-10 max-w-[60%]"><span className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[#467a78]">NEW TECH</span><h2 className="mt-3 text-[23px] font-extrabold leading-[1.16] tracking-[-.04em] text-[#1b4545]">Sound good.<br/>Feel great.</h2><span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#2c6866] group-hover:underline">Shop electronics <ArrowRight size={15}/></span></div>
            <Image src="/products/speaker.svg" alt="Portable speaker" width={206} height={206} className="absolute -bottom-12 -right-6 size-52 rounded-[30px] object-contain mix-blend-multiply transition-transform group-hover:scale-105 sm:-right-12 lg:-right-8" />
          </Link>
          <Link href="/shop?category=home" className="group relative flex min-h-[194px] overflow-hidden rounded-[24px] bg-[#fff0d8] p-7 sm:min-h-[206px] lg:min-h-0">
            <div className="relative z-10 max-w-[61%]"><span className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[#ae7c3e]">YOUR SPACE</span><h2 className="mt-3 text-[23px] font-extrabold leading-[1.16] tracking-[-.04em] text-[#66492f]">Little changes.<br/>Big comfort.</h2><span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#89633f] group-hover:underline">Shop home <ArrowRight size={15}/></span></div>
            <Image src="/products/lamp.svg" alt="Table lamp" width={202} height={202} className="absolute -bottom-11 -right-8 size-[204px] rounded-[30px] object-contain mix-blend-multiply transition-transform group-hover:scale-105" />
          </Link>
        </div>
      </div>
    </section>

    <section className="container-shell pb-4 pt-14 sm:pt-[72px]">
      <div className="mb-7 flex items-end justify-between gap-4"><div><p className="mb-2 text-[11px] font-bold uppercase tracking-[.2em] text-primary">CURATED FOR YOU</p><h2 className="section-heading">{t.shopByCategory}</h2><p className="mt-2 text-sm text-muted">{t.categorySubtitle}</p></div><Link href="/shop" className="hidden items-center gap-1.5 text-sm font-bold text-primary hover:underline sm:inline-flex">{t.viewAll}<ArrowRight size={16}/></Link></div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-6 sm:gap-4">{categories.map((category) => {
        const Icon = categoryIcons[category.id];
        return <Link key={category.id} href={`/shop?category=${category.id}`} className="group flex flex-col items-center gap-3 rounded-[18px] border border-border p-3.5 text-center transition hover:-translate-y-1 hover:border-primary/25 hover:shadow-md sm:p-5">
          <div className="flex size-[70px] items-center justify-center rounded-[20px] sm:size-[78px]" style={{background: category.tint}}><Icon size={31} strokeWidth={1.55} className="text-[#30466c] transition-transform group-hover:scale-110" /></div>
          <span className="text-[12px] font-bold leading-tight text-ink sm:text-[13px]">{locale === "bn" ? category.bn : category.label}</span>
        </Link>;
      })}</div>
    </section>

    <section className="container-shell pb-16 pt-12 sm:pb-20 sm:pt-16">
      <div className="mb-7 flex items-end justify-between gap-4"><div><p className="mb-2 text-[11px] font-bold uppercase tracking-[.2em] text-primary">THE GOOD STUFF</p><h2 className="section-heading">{t.featured}</h2><p className="mt-2 text-sm text-muted">{t.featuredSub}</p></div><Link href="/shop" className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-primary hover:underline sm:text-sm">{t.viewAll}<ArrowRight size={16}/></Link></div>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">{products.slice(0, 8).map((product) => <ProductCard key={product.id} product={product}/>)}</div>
    </section>

    <section className="container-shell pb-16 sm:pb-[76px]">
      <div className="relative overflow-hidden rounded-[26px] bg-[#152039] px-8 py-12 text-white sm:px-14 sm:py-14"><div className="absolute -right-20 -top-24 size-[380px] rounded-full border-[75px] border-[#334574] opacity-55"/><div className="absolute right-16 top-12 hidden size-24 rounded-full bg-[#ffcb6c] opacity-85 md:block"/>
        <div className="relative z-10 max-w-xl"><div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-[11px] font-bold text-[#ffdb92]"><Tag size={13}/> HANDPICKED OFFERS</div><h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{t.readyToGo}</h2><p className="mt-3 max-w-lg text-sm leading-7 text-[#bbc8e3]">{t.bestValue}. Explore our collection of practical picks and fresh favorites.</p><Button asChild className="mt-6 border-white bg-white text-[#152039] hover:bg-[#e9efff]" variant="outline"><Link href="/shop?tag=sale">{t.shopCollection}<ChevronRight size={17}/></Link></Button></div>
        <div className="pointer-events-none absolute bottom-[-60px] right-2 hidden size-[290px] rounded-full bg-gradient-to-r from-[#718ce9] to-[#b7c4f9] opacity-20 blur-2xl md:block"/>
      </div>
    </section>
  </>;
}
