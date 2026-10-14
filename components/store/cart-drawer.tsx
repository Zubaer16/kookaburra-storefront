"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { formatPrice, productById, productPrice } from "@/lib/catalog";
import { useCommerceStore } from "@/stores/commerce-store";
import { useStoreReady } from "@/hooks/use-store-ready";

export function CartDrawer() {
  const ready = useStoreReady();
  const cart = useCommerceStore((s) => s.cart);
  const market = useCommerceStore((s) => s.market);
  const locale = useCommerceStore((s) => s.locale);
  const open = useCommerceStore((s) => s.cartOpen);
  const setOpen = useCommerceStore((s) => s.setCartOpen);
  const setQuantity = useCommerceStore((s) => s.setQuantity);
  const remove = useCommerceStore((s) => s.removeFromCart);
  const lines = ready ? cart.map((line) => ({ ...line, product: productById(line.productId) })).filter((line) => !!line.product) : [];
  const total = lines.reduce((sum, line) => sum + productPrice(line.product!, market) * line.quantity, 0);
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  return <Sheet open={open} onOpenChange={setOpen}><SheetContent>
    <div className="border-b border-border px-6 py-6"><SheetTitle className="flex items-center gap-2 text-lg font-extrabold"><ShoppingBag size={22} className="text-primary"/> Your cart <span className="rounded-lg bg-blue-50 px-2 py-0.5 text-xs text-primary">{count}</span></SheetTitle><SheetDescription className="mt-1.5 text-xs text-muted">Your picks, all in one place.</SheetDescription></div>
    <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">{lines.length === 0 ? <div className="flex h-full flex-col items-center justify-center text-center"><div className="mb-4 flex size-20 items-center justify-center rounded-full bg-blue-50 text-primary"><ShoppingBag size={34}/></div><h3 className="text-lg font-extrabold">Your cart is waiting</h3><p className="mt-2 max-w-[230px] text-sm leading-6 text-muted">Discover something you love and add it here.</p><Button className="mt-6" onClick={() => setOpen(false)} asChild><Link href="/shop">Explore products <ArrowRight size={16}/></Link></Button></div> : <div className="space-y-5">{lines.map(({ product, quantity }) => product && <div key={product.id} className="flex gap-3 border-b border-border pb-5"><Link href={`/product/${product.slug}`} onClick={() => setOpen(false)} className="relative size-24 shrink-0 overflow-hidden rounded-xl" style={{ background: product.accent }}><Image src={product.image} alt={product.title} fill className="object-contain p-2" /></Link><div className="min-w-0 flex-1"><p className="line-clamp-2 text-sm font-bold">{product.title}</p><p className="mt-1.5 text-sm font-extrabold text-primary">{formatPrice(productPrice(product, market), market, locale)}</p><div className="mt-3 flex items-center justify-between"><div className="flex items-center rounded-lg border border-border"><button type="button" aria-label={`Decrease ${product.title} quantity`} className="p-1.5 hover:bg-slate-100" onClick={() => setQuantity(product.id, quantity - 1)}><Minus size={14}/></button><span className="min-w-7 text-center text-xs font-bold">{quantity}</span><button type="button" aria-label={`Increase ${product.title} quantity`} disabled={quantity >= product.stock} className="p-1.5 hover:bg-slate-100 disabled:opacity-40" onClick={() => setQuantity(product.id, quantity + 1)}><Plus size={14}/></button></div><button type="button" aria-label={`Remove ${product.title}`} onClick={() => remove(product.id)} className="p-1.5 text-muted hover:text-red-600"><Trash2 size={17}/></button></div></div></div>)}</div>}</div>
    {lines.length > 0 && <div className="border-t border-border bg-[#fbfcff] px-6 py-5"><div className="flex items-center justify-between text-sm"><span className="text-muted">Estimated subtotal</span><strong className="text-xl">{formatPrice(total, market, locale)}</strong></div><p className="mt-2 text-[11px] leading-5 text-muted">Sample prices only. Shipping, tax and final amounts will be calculated by the backend in a later patch.</p><Button className="mt-4 w-full" asChild onClick={() => setOpen(false)}><Link href="/cart">View cart <ArrowRight size={17}/></Link></Button></div>}
  </SheetContent></Sheet>;
}
