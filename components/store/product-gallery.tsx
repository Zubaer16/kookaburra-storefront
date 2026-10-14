"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import { productGallery, type Product } from "@/lib/catalog";

export function ProductGallery({ product }: { product: Product }) {
  const images = productGallery(product);
  const [selected, setSelected] = useState(0);
  const image = images[selected] ?? images[0];
  function navigate(delta: number) { setSelected((previous) => (previous + delta + images.length) % images.length); }
  return <section aria-label={`${product.title} image gallery`}>
    <div className="relative aspect-square overflow-hidden rounded-[26px] border border-border" style={{ background: product.accent }}>
      <Image src={image.src} alt={image.alt} priority fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-7 sm:p-12" />
      {product.badge && <span className="absolute left-5 top-5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-primary shadow-sm">{product.badge}</span>}
      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-2 text-xs font-semibold text-ink"><Images size={14}/>{selected + 1} / {images.length}</div>
      {images.length > 1 && <div className="absolute bottom-4 right-4 flex gap-2"><button type="button" aria-label="Previous product image" onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full bg-white text-ink shadow-sm transition hover:text-primary"><ChevronLeft size={19}/></button><button type="button" aria-label="Next product image" onClick={() => navigate(1)} className="flex size-10 items-center justify-center rounded-full bg-white text-ink shadow-sm transition hover:text-primary"><ChevronRight size={19}/></button></div>}
    </div>
    {images.length > 1 && <div aria-label="Choose product image" className="mt-4 flex gap-3 overflow-x-auto pb-1">
      {images.map((item, index) => <button type="button" key={`${item.src}-${index}`} aria-label={`Show image ${index+1}: ${item.alt}`} aria-pressed={selected === index} onClick={() => setSelected(index)} className={`relative size-20 shrink-0 overflow-hidden rounded-xl border-2 transition sm:size-24 ${selected === index ? "border-primary" : "border-border hover:border-[#9fb5fa]"}`} style={{ background: product.accent }}><Image src={item.src} alt="" fill sizes="96px" className="object-contain p-2" /></button>)}
    </div>}
    <p className="mt-3 text-xs text-muted">Illustrative product imagery · Colors and details are for preview only.</p>
  </section>;
}
