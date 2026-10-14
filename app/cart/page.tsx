"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Minus, Plus, ShoppingBag, Trash2, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, productById, productPrice } from "@/lib/catalog";
import { useCommerceStore } from "@/stores/commerce-store";
import { useStoreReady } from "@/hooks/use-store-ready";

export default function CartPage() {
  const ready = useStoreReady();
  const cart = useCommerceStore((s) => s.cart);
  const savedMarket = useCommerceStore((s) => s.market);
  const savedLocale = useCommerceStore((s) => s.locale);
  const setQuantity = useCommerceStore((s) => s.setQuantity);
  const remove = useCommerceStore((s) => s.removeFromCart);
  const market = ready ? savedMarket : "BD";
  const locale = ready ? savedLocale : "en";
  const lines = (ready ? cart : []).map((line) => ({ ...line, product: productById(line.productId) })).filter((line) => !!line.product);
  const subtotal = lines.reduce((sum, item)=>sum + productPrice(item.product!, market) * item.quantity, 0);
  return <div className="container-shell pb-20 pt-9"><div className="flex items-center gap-1.5 text-xs text-muted"><Link href="/">Home</Link><ChevronRight size={14}/><span className="font-bold text-ink">Cart</span></div><div className="mb-8 mt-5"><h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Your shopping cart</h1><p className="mt-2 text-sm text-muted">Review your favorite finds before checkout.</p></div>
    {lines.length === 0 ? <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-[#fbfcff] p-6 text-center"><ShoppingBag size={44} className="text-primary"/><h2 className="mt-5 text-xl font-bold">Your cart is empty</h2><p className="mt-2 text-sm text-muted">Looks like you haven&apos;t added anything yet.</p><Button className="mt-6" asChild><Link href="/shop"><ArrowLeft size={17}/> Continue shopping</Link></Button></div> : <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
      <div className="overflow-hidden rounded-2xl border border-border"><div className="border-b border-border bg-[#fbfcff] px-5 py-4 text-sm font-extrabold">Items in your cart ({lines.reduce((a,b)=>a+b.quantity,0)})</div><div className="divide-y divide-border">{lines.map(({product,quantity})=>product && <div key={product.id} className="flex flex-wrap items-center gap-4 p-4 sm:flex-nowrap sm:p-5"><Link href={`/product/${product.slug}`} className="relative size-24 shrink-0 overflow-hidden rounded-xl sm:size-28" style={{background:product.accent}}><Image src={product.image} alt={product.title} fill className="object-contain p-2"/></Link><div className="min-w-0 flex-1"><Link href={`/product/${product.slug}`} className="text-sm font-bold hover:text-primary">{product.title}</Link><p className="mt-2 text-base font-extrabold text-primary">{formatPrice(productPrice(product,market),market,locale)}</p><button type="button" onClick={()=>remove(product.id)} className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted hover:text-red-600"><Trash2 size={14}/> Remove</button></div><div className="ml-auto flex items-center gap-2 rounded-lg border border-border"><button type="button" aria-label={`Decrease ${product.title}`} onClick={()=>setQuantity(product.id,quantity-1)} className="p-2 hover:bg-slate-50"><Minus size={15}/></button><span className="min-w-5 text-center text-sm font-bold">{quantity}</span><button type="button" aria-label={`Increase ${product.title}`} disabled={quantity>=product.stock} onClick={()=>setQuantity(product.id,quantity+1)} className="p-2 disabled:opacity-30"><Plus size={15}/></button></div></div>)}</div></div>
      <aside className="h-fit rounded-2xl border border-border bg-[#fbfcff] p-6"><h2 className="text-lg font-extrabold">Order summary</h2><div className="mt-6 flex justify-between text-sm text-muted"><span>Subtotal</span><span className="font-bold text-ink">{formatPrice(subtotal,market,locale)}</span></div><div className="mt-4 flex justify-between text-sm text-muted"><span>Shipping & taxes</span><span>Calculated at checkout</span></div><div className="my-6 h-px bg-border"/><div className="flex justify-between text-sm"><span className="font-bold">Estimated subtotal</span><strong className="text-xl">{formatPrice(subtotal,market,locale)}</strong></div><Button className="mt-6 w-full" disabled><LockKeyhole size={17}/> Checkout in a later patch</Button><p className="mt-4 text-xs leading-6 text-muted">Checkout is intentionally disabled until secure backend pricing, stock checks and payments are available. These are illustrative prices.</p><Button asChild variant="outline" className="mt-5 w-full"><Link href="/shop"><ArrowLeft size={17}/> Continue shopping</Link></Button></aside>
    </div>}
  </div>;
}
