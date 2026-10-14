"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/store/product-card";
import { productById, productPrice, type Product } from "@/lib/catalog";
import { useCommerceStore } from "@/stores/commerce-store";
import { useStoreReady } from "@/hooks/use-store-ready";

export default function WishlistPage() {
  const ready = useStoreReady();
  const wishlist = useCommerceStore(s => s.wishlist);
  const clear = useCommerceStore(s => s.clearWishlist);
  const market = useCommerceStore(s => s.market);
  const [sort, setSort] = useState("saved");
  const [confirmClear, setConfirmClear] = useState(false);
  const items = (ready ? wishlist : []).map(id => productById(id)).filter((item): item is Product => !!item);
  if (sort === "price-low") items.sort((a,b) => productPrice(a,market) - productPrice(b,market));
  if (sort === "price-high") items.sort((a,b) => productPrice(b,market) - productPrice(a,market));
  return <main className="container-shell pb-20 pt-9"><nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted"><Link href="/">Home</Link><ChevronRight size={14}/><span className="font-bold text-ink">Wishlist</span></nav>
    <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Your wishlist</h1><p className="mt-2 text-sm text-muted">{items.length} saved finds, kept on this browser for now.</p></div>{items.length > 0 && <div className="flex flex-wrap items-center gap-2"><label htmlFor="wishlist-sort" className="sr-only">Sort your wishlist</label><select id="wishlist-sort" value={sort} onChange={e => setSort(e.target.value)} className="h-11 rounded-xl border border-border bg-white px-3 text-sm"><option value="saved">Saved order</option><option value="price-low">Price: Low to high</option><option value="price-high">Price: High to low</option></select><button type="button" onClick={() => setConfirmClear(true)} className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-border px-3 text-xs font-bold text-muted hover:border-red-200 hover:text-red-600"><Trash2 size={15}/> Clear all</button></div>}</div>
    {confirmClear && items.length > 0 && <div role="alert" aria-label="Confirm clearing wishlist" className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4"><p className="text-sm font-semibold text-amber-900">Remove all {items.length} saved product(s)?</p><div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => setConfirmClear(false)}>Cancel</Button><Button size="sm" onClick={() => { clear(); setConfirmClear(false); }}>Clear wishlist</Button></div></div>}
    {items.length ? <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">{items.map(item => <ProductCard key={item.id} product={item}/>)}</div> : <div className="mt-9 flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-[#fbfcff] p-6 text-center"><Heart size={46} className="text-primary"/><h2 className="mt-5 text-xl font-bold">Your wishlist is ready</h2><p className="mt-2 max-w-sm text-sm leading-6 text-muted">Tap the heart on any product you love to save it here.</p><Button asChild className="mt-6"><Link href="/shop">Find favorites <ArrowRight size={16}/></Link></Button></div>}
    {items.length > 0 && <p className="mt-8 text-center text-xs text-muted">Saving a product does not reserve stock. Choose size and color from its product page before adding variable items to cart.</p>}
  </main>;
}
