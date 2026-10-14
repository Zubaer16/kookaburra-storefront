"use client";

import Link from "next/link";
import { ChevronRight, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/store/product-card";
import { products } from "@/lib/catalog";
import { useCommerceStore } from "@/stores/commerce-store";
import { useStoreReady } from "@/hooks/use-store-ready";

export default function WishlistPage() {
  const ready = useStoreReady();
  const wishlist = useCommerceStore((s) => s.wishlist);
  const items = ready ? products.filter((item)=>wishlist.includes(item.id)) : [];
  return <div className="container-shell pb-20 pt-9"><div className="flex items-center gap-1.5 text-xs text-muted"><Link href="/">Home</Link><ChevronRight size={14}/><span className="font-bold text-ink">Wishlist</span></div><h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">Your wishlist</h1><p className="mt-2 text-sm text-muted">Keep all your favorites close.</p>
    {items.length ? <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">{items.map((item)=><ProductCard key={item.id} product={item}/>)}</div> : <div className="mt-9 flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-[#fbfcff] p-6 text-center"><Heart size={46} className="text-primary"/><h2 className="mt-5 text-xl font-bold">Your wishlist is ready</h2><p className="mt-2 max-w-sm text-sm leading-6 text-muted">Tap the heart on any product you love to save it here.</p><Button asChild className="mt-6"><Link href="/shop">Find favorites <ArrowRight size={16}/></Link></Button></div>}
  </div>;
}
