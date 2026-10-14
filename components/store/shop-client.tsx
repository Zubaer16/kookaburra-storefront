"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/store/product-card";
import { categories, products } from "@/lib/catalog";
import { useCommerceStore } from "@/stores/commerce-store";
import { useStoreReady } from "@/hooks/use-store-ready";

type ShopProps = { query: string; category: string; tag: string; sort: string };

export function ShopClient({ query, category, tag, sort }: ShopProps) {
  const [text, setText] = useState(query);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [selectedTag, setSelectedTag] = useState(tag);
  const [sortBy, setSortBy] = useState(sort || "featured");
  const [showFilters, setShowFilters] = useState(false);
  const ready = useStoreReady();
  const savedMarket = useCommerceStore((s) => s.market);
  const market = ready ? savedMarket : "BD";
  const visible = useMemo(() => {
    const needle = text.toLocaleLowerCase().trim();
    const filtered = products.filter((product) => {
      const matchesText = !needle || [product.title, product.description, product.category].some((part) => part.toLowerCase().includes(needle));
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesTag = !selectedTag || (selectedTag === "sale" ? !!product.compareAt : product.tag === selectedTag);
      return matchesText && matchesCategory && matchesTag;
    });
    if (sortBy === "price-asc") filtered.sort((a, b) => a.price[market === "BD" ? "BDT" : "USD"] - b.price[market === "BD" ? "BDT" : "USD"]);
    if (sortBy === "price-desc") filtered.sort((a, b) => b.price[market === "BD" ? "BDT" : "USD"] - a.price[market === "BD" ? "BDT" : "USD"]);
    if (sortBy === "newest") filtered.sort((a, b) => Number(b.tag === "new") - Number(a.tag === "new"));
    return filtered;
  }, [text, selectedCategory, selectedTag, sortBy, market]);
  function reset() { setText(""); setSelectedCategory(""); setSelectedTag(""); setSortBy("featured"); }
  return <div className="container-shell py-8 sm:py-12">
    <div className="flex items-center gap-1.5 text-xs text-muted"><Link href="/" className="hover:text-primary">Home</Link><ChevronRight size={14}/><span className="font-bold text-ink">Shop</span></div>
    <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h1 className="text-3xl font-extrabold tracking-[-.04em] sm:text-4xl">Explore the collection</h1><p className="mt-2 text-sm text-muted">Thoughtful picks for every part of your day.</p></div><span className="text-sm text-muted">{visible.length} products found</span></div>
    <div className="mt-8 flex flex-col gap-7 lg:flex-row lg:gap-8">
      <aside className={`${showFilters ? "block" : "hidden"} w-full shrink-0 rounded-xl border border-border p-5 lg:block lg:w-[225px] lg:self-start`}>
        <div className="mb-5 flex items-center justify-between"><h2 className="text-sm font-extrabold">Filters</h2><button type="button" onClick={reset} className="text-xs font-bold text-primary hover:underline">Clear all</button></div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[.1em] text-muted">Category</p>
        <div className="space-y-1.5"><button type="button" onClick={() => setSelectedCategory("")} className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${!selectedCategory ? "bg-blue-50 font-bold text-primary" : "text-[#61708b] hover:bg-slate-50"}`}>All categories</button>{categories.map((item) => <button key={item.id} onClick={() => setSelectedCategory(item.id)} type="button" className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${selectedCategory === item.id ? "bg-blue-50 font-bold text-primary" : "text-[#61708b] hover:bg-slate-50"}`}>{item.label}</button>)}</div>
        <div className="my-6 h-px bg-border"/><p className="mb-3 text-xs font-bold uppercase tracking-[.1em] text-muted">Collection</p>
        <div className="space-y-2">{[{id:"",label:"All products"},{id:"sale",label:"On sale"},{id:"new",label:"New arrivals"},{id:"popular",label:"Popular picks"}].map((item)=><label key={item.id} className="flex cursor-pointer items-center gap-2.5 text-sm text-[#61708b]"><input type="radio" checked={selectedTag === item.id} onChange={()=>setSelectedTag(item.id)} className="accent-[#2459e8]" name="collection"/>{item.label}</label>)}</div>
      </aside>
      <div className="min-w-0 flex-1">
        <div className="mb-5 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-[#fbfcff] p-3">
          <div className="relative min-w-[150px] flex-1"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"/><input value={text} onChange={(event)=>setText(event.target.value)} aria-label="Filter products by keyword" placeholder="Search within products" className="h-10 w-full rounded-lg border border-border bg-white pl-10 pr-3 text-sm outline-none focus:border-primary" /></div>
          <button onClick={()=>setShowFilters(!showFilters)} className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-white px-3 text-xs font-bold lg:hidden" type="button"><SlidersHorizontal size={16}/> Filters</button>
          <label htmlFor="sort" className="sr-only">Sort products</label>
          <select id="sort" value={sortBy} onChange={(event)=>setSortBy(event.target.value)} className="h-10 rounded-lg border border-border bg-white px-3 text-xs font-semibold text-[#495873] outline-none"><option value="featured">Featured</option><option value="newest">New arrivals</option><option value="price-asc">Price: Low to high</option><option value="price-desc">Price: High to low</option></select>
        </div>
        {(selectedCategory || selectedTag || text) && <div className="mb-5 flex flex-wrap gap-2">{[selectedCategory && categories.find((c)=>c.id === selectedCategory)?.label, selectedTag, text && `Search: ${text}`].filter((item): item is string => typeof item === "string" && item.length > 0).map((item)=><span key={item} className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-primary">{item}</span>)}<button type="button" onClick={reset} className="inline-flex items-center gap-1 text-xs font-semibold text-muted hover:text-primary"><X size={13}/> Clear</button></div>}
        {visible.length ? <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">{visible.map((product)=><ProductCard key={product.id} product={product}/>)}</div> : <div className="flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-[#fbfcff] text-center"><Search size={32} className="text-[#a1b0c8]"/><h3 className="mt-4 text-lg font-extrabold">Nothing matched this time</h3><p className="mt-2 max-w-sm text-sm text-muted">Try a different keyword or clear your filters to see everything.</p><button type="button" className="mt-5 font-bold text-primary hover:underline" onClick={reset}>Show all products</button></div>}
        <p className="mt-8 text-center text-xs text-muted">Preview catalog · {visible.length} locally defined products · Real backend pagination in a later patch.</p>
      </div>
    </div>
  </div>;
}
