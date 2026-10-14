"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Heart, Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ProductPrice } from "@/components/store/price";
import { ProductCard } from "@/components/store/product-card";
import { categoryById, products, type Product } from "@/lib/catalog";
import { useCommerceStore } from "@/stores/commerce-store";
import { useStoreReady } from "@/hooks/use-store-ready";

export function ProductDetails({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const add = useCommerceStore((s) => s.addToCart);
  const wishlist = useCommerceStore((s) => s.wishlist);
  const toggle = useCommerceStore((s) => s.toggleWishlist);
  const ready = useStoreReady();
  const saved = ready && wishlist.includes(product.id);
  const category = categoryById(product.category);
  const related = products.filter((item) => item.id !== product.id && item.category === product.category).concat(products.filter((item) => item.id !== product.id && item.category !== product.category)).slice(0, 4);
  return <div className="container-shell pb-16 pt-8 sm:pb-20">
    <div className="mb-7 flex flex-wrap items-center gap-1.5 text-xs text-muted"><Link href="/" className="hover:text-primary">Home</Link><ChevronRight size={14}/><Link href="/shop" className="hover:text-primary">Shop</Link><ChevronRight size={14}/><Link href={`/shop?category=${product.category}`} className="hover:text-primary">{category?.label}</Link><ChevronRight size={14}/><span className="max-w-48 truncate font-semibold text-ink">{product.title}</span></div>
    <div className="grid gap-9 md:grid-cols-2 md:gap-12 lg:gap-16">
      <div className="relative aspect-square overflow-hidden rounded-[26px]" style={{ background: product.accent }}><Image src={product.image} alt={product.title} priority fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-6 sm:p-10" />{product.badge && <span className="absolute left-5 top-5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-primary shadow-sm">{product.badge}</span>}</div>
      <div className="self-center"><p className="mb-3 text-xs font-extrabold uppercase tracking-[.18em] text-primary">{category?.label}</p><h1 className="text-[30px] font-extrabold leading-[1.2] tracking-[-.045em] sm:text-[39px]">{product.title}</h1><p className="mt-4 max-w-[480px] text-sm leading-8 text-[#61708b]">{product.description}</p><div className="mt-7 border-b border-border pb-6"><ProductPrice product={product} size="lg" /></div>
      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#137b5a]"><CheckCircle2 size={18}/>{product.stock > 0 ? "In stock" : "Out of stock"} <span className="ml-2 text-xs font-normal text-muted">Sample availability: {product.stock}</span></div>
      <div className="mt-7 flex flex-wrap items-center gap-3"><div className="inline-flex h-12 items-center rounded-xl border border-border"><button type="button" aria-label="Decrease quantity" disabled={quantity === 1} onClick={()=>setQuantity(Math.max(1, quantity - 1))} className="px-4 disabled:opacity-35"><Minus size={17}/></button><span className="min-w-8 text-center text-sm font-bold">{quantity}</span><button type="button" aria-label="Increase quantity" disabled={quantity >= product.stock} onClick={()=>setQuantity(Math.min(product.stock, quantity + 1))} className="px-4 disabled:opacity-35"><Plus size={17}/></button></div><Button className="h-12 flex-1 sm:flex-none sm:px-10" disabled={product.stock === 0} onClick={()=>{ add(product.id, quantity); toast.success("Added to your cart"); }}><ShoppingBag size={18}/> Add to cart <ArrowRight size={16}/></Button><Button variant="outline" size="icon" aria-label={saved ? "Remove from wishlist" : "Save to wishlist"} aria-pressed={saved} className="size-12" onClick={()=>{toggle(product.id); toast.success(saved ? "Removed from wishlist" : "Saved to wishlist");}}><Heart size={19} fill={saved ? "#2459e8" : "none"}/></Button></div>
      <div className="mt-8 rounded-xl border border-border bg-[#fbfcff] p-5"><p className="flex items-center gap-2 text-sm font-bold"><Truck size={18} className="text-primary"/> Shipping to Bangladesh & international destinations</p><p className="mt-2 text-xs leading-6 text-muted">Country-specific availability, shipping fees, taxes and checkout will be connected to the backend in a later patch.</p></div>
      <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-muted"><span>SKU:</span><span className="font-bold text-ink">{product.id.toUpperCase()}</span><span className="mx-2">·</span><span>Category:</span><span className="font-bold text-ink">{category?.label}</span></div>
      </div>
    </div>
    <section className="mt-16 sm:mt-20"><div className="mb-7 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-primary">YOU MIGHT LIKE</p><h2 className="section-heading mt-2">More to discover</h2></div><Link href="/shop" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary">View all <ArrowRight size={17}/></Link></div><div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">{related.map((item)=><ProductCard key={item.id} product={item}/>)}</div></section>
  </div>;
}
