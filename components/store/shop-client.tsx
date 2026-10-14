"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/store/product-card";
import { categories, products, productPrice, type Market } from "@/lib/catalog";
import { useCommerceStore } from "@/stores/commerce-store";
import { useStoreReady } from "@/hooks/use-store-ready";

type ShopProps = { query: string; category: string; tag: string; sort: string; price: string; stock: string };

export function ShopClient({ query, category, tag, sort, price, stock }: ShopProps) {
  const [text, setText] = useState(query);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [selectedTag, setSelectedTag] = useState(tag);
  const [sortBy, setSortBy] = useState(sort || "featured");
  const [priceTier, setPriceTier] = useState(["0", "1", "2"].includes(price) ? price : "all");
  const [stockOnly, setStockOnly] = useState(stock === "1");
  const [showFilters, setShowFilters] = useState(false);
  const ready = useStoreReady();
  const savedMarket = useCommerceStore(s => s.market);
  const market: Market = ready ? savedMarket : "BD";
  const priceLevels = market === "BD" ? [2000, 5000, 10000] : [25, 60, 120];
  const priceLimit = priceTier === "all" ? undefined : priceLevels[Number(priceTier)];
  const currencyLabel = market === "BD" ? "৳" : "$";

  // Replace the current URL without remounting Shop or stealing focus from
  // its search input. Native history changes are supported in Next App Router.
  useEffect(() => {
    const params = new URLSearchParams();
    if (text.trim()) params.set("q", text.trim());
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedTag) params.set("tag", selectedTag);
    if (sortBy !== "featured") params.set("sort", sortBy);
    if (priceTier !== "all") params.set("price", priceTier);
    if (stockOnly) params.set("stock", "1");
    const next = params.toString();
    const current = window.location.search.replace(/^\?/, "");
    if (next !== current) window.history.replaceState(window.history.state, "", `/shop${next ? `?${next}` : ""}`);
  }, [text, selectedCategory, selectedTag, sortBy, priceTier, stockOnly]);

  const visible = useMemo(() => {
    const needle = text.toLocaleLowerCase().trim();
    const result = products.filter(product => {
      const categoryName = categories.find(c => c.id === product.category)?.label ?? "";
      const matchesText = !needle || [product.title, product.description, product.category, categoryName].some(item => item.toLocaleLowerCase().includes(needle));
      const matchesCategory = !selectedCategory || (selectedCategory === "style" ? product.category === "fashion" || product.category === "footwear" : product.category === selectedCategory);
      const matchesTag = !selectedTag || (selectedTag === "sale" ? !!product.compareAt : product.tag === selectedTag);
      const matchesPrice = priceLimit === undefined || productPrice(product, market) <= priceLimit;
      const matchesStock = !stockOnly || product.stock > 0;
      return matchesText && matchesCategory && matchesTag && matchesPrice && matchesStock;
    });
    if (sortBy === "price-asc") result.sort((a,b) => productPrice(a,market) - productPrice(b,market));
    if (sortBy === "price-desc") result.sort((a,b) => productPrice(b,market) - productPrice(a,market));
    if (sortBy === "newest") result.sort((a,b) => Number(b.tag === "new") - Number(a.tag === "new"));
    return result;
  }, [text, selectedCategory, selectedTag, sortBy, market, priceLimit, stockOnly]);

  function reset() { setText(""); setSelectedCategory(""); setSelectedTag(""); setSortBy("featured"); setPriceTier("all"); setStockOnly(false); }
  const activeCategory = categories.find(c => c.id === selectedCategory);
  const categoryLabel = selectedCategory === "style" ? "Style & shoes" : activeCategory?.label;
  const filterCount = Number(!!selectedCategory) + Number(!!selectedTag) + Number(priceTier !== "all") + Number(stockOnly);

  return <div className="container-shell pb-20 pt-8 sm:pt-12">
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted"><Link href="/" className="hover:text-primary">Home</Link><ChevronRight size={14}/><span className="font-bold text-ink">Shop</span></nav>
    <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-[11px] font-extrabold uppercase tracking-[.17em] text-primary">YOUR DISCOVERY STARTS HERE</p><h1 className="text-3xl font-black tracking-[-.04em] sm:text-4xl">{categoryLabel ?? "Explore the collection"}</h1><p className="mt-2 text-sm text-muted">Find something that feels just right for your everyday.</p></div><span aria-live="polite" className="text-sm font-semibold text-muted">{visible.length} products found</span></div>
    <div aria-label="Quick category filters" className="mt-7 flex gap-2 overflow-x-auto pb-2"><button type="button" onClick={() => setSelectedCategory("")} className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-bold transition ${!selectedCategory ? "border-primary bg-primary text-white" : "border-border bg-white text-[#596a84] hover:border-primary"}`}>All products</button><button type="button" onClick={() => setSelectedCategory("style")} className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-bold transition ${selectedCategory === "style" ? "border-primary bg-primary text-white" : "border-border bg-white text-[#596a84] hover:border-primary"}`}>Style & shoes</button>{categories.map(c => <button type="button" key={c.id} onClick={() => setSelectedCategory(c.id)} className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-bold transition ${selectedCategory === c.id ? "border-primary bg-primary text-white" : "border-border bg-white text-[#596a84] hover:border-primary"}`}>{c.label}</button>)}</div>
    <div className="mt-6 flex flex-col gap-7 lg:flex-row lg:gap-8">
      <aside id="shop-filter-panel" className={`${showFilters ? "block" : "hidden"} w-full shrink-0 self-start rounded-[20px] border border-border bg-white p-5 lg:block lg:w-[235px]`}>
        <div className="mb-5 flex items-center justify-between"><h2 className="text-sm font-extrabold">Filter products</h2><button type="button" onClick={reset} className="text-xs font-bold text-primary hover:underline">Reset</button></div>
        <fieldset><legend className="mb-3 text-xs font-extrabold uppercase tracking-[.1em] text-muted">Category</legend><div className="space-y-1"><button type="button" onClick={() => setSelectedCategory("")} className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${!selectedCategory ? "bg-blue-50 font-extrabold text-primary" : "text-[#61708b] hover:bg-slate-50"}`}>All categories</button><button type="button" onClick={() => setSelectedCategory("style")} className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${selectedCategory === "style" ? "bg-blue-50 font-extrabold text-primary" : "text-[#61708b] hover:bg-slate-50"}`}>Style & shoes</button>{categories.map(c => <button type="button" key={c.id} onClick={() => setSelectedCategory(c.id)} className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${selectedCategory === c.id ? "bg-blue-50 font-extrabold text-primary" : "text-[#61708b] hover:bg-slate-50"}`}>{c.label}</button>)}</div></fieldset>
        <div className="my-6 h-px bg-border"/>
        <fieldset><legend className="mb-3 text-xs font-extrabold uppercase tracking-[.1em] text-muted">Collection</legend><div className="space-y-3">{[{id:"",label:"All products"},{id:"sale",label:"Special offers"},{id:"new",label:"New arrivals"},{id:"popular",label:"Popular picks"}].map(c => <label key={c.id} className="flex cursor-pointer items-center gap-2.5 text-sm text-[#61708b]"><input name="collection" type="radio" value={c.id} checked={selectedTag === c.id} onChange={() => setSelectedTag(c.id)} className="accent-[#2459e8]"/>{c.label}</label>)}</div></fieldset>
        <div className="my-6 h-px bg-border"/>
        <label htmlFor="price-range" className="mb-3 block text-xs font-extrabold uppercase tracking-[.1em] text-muted">Price range</label><select id="price-range" value={priceTier} onChange={event => setPriceTier(event.target.value)} className="h-11 w-full rounded-xl border border-border bg-white px-3 text-sm text-ink focus:border-primary focus:outline-none"><option value="all">Any price</option>{priceLevels.map((level, i) => <option key={`${market}-${level}`} value={i}>Under {currencyLabel}{level.toLocaleString("en-US")}</option>)}</select>
        <label className="mt-6 flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-[#566783]"><input type="checkbox" checked={stockOnly} onChange={event => setStockOnly(event.target.checked)} className="size-4 accent-[#2459e8]"/> In stock only</label>
      </aside>
      <div className="min-w-0 flex-1">
        <div className="mb-5 flex flex-wrap items-center gap-3 rounded-[16px] border border-border bg-[#fbfcff] p-3"><div className="relative min-w-[150px] flex-1"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"/><input value={text} onChange={event => setText(event.target.value)} aria-label="Filter products by keyword" placeholder="Search within products" className="h-10 w-full rounded-lg border border-border bg-white pl-10 pr-3 text-sm outline-none focus:border-primary"/></div><button type="button" aria-controls="shop-filter-panel" aria-expanded={showFilters} onClick={() => setShowFilters(open => !open)} className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-white px-3 text-xs font-bold lg:hidden"><SlidersHorizontal size={16}/> Filters{filterCount > 0 ? ` (${filterCount})` : ""}</button><label htmlFor="sort-products" className="sr-only">Sort products</label><select id="sort-products" value={sortBy} onChange={event => setSortBy(event.target.value)} className="h-10 rounded-lg border border-border bg-white px-3 text-xs font-semibold text-[#495873] outline-none"><option value="featured">Featured</option><option value="newest">New arrivals</option><option value="price-asc">Price: Low to high</option><option value="price-desc">Price: High to low</option></select></div>
        {(selectedCategory || selectedTag || text || priceTier !== "all" || stockOnly) && <div className="mb-5 flex flex-wrap items-center gap-2">{[categoryLabel, selectedTag && (selectedTag === "sale" ? "Offers" : selectedTag), text && `Search: ${text}`, priceTier !== "all" && `Under ${currencyLabel}${priceLimit}`, stockOnly && "In stock"].filter((item): item is string => typeof item === "string" && item.length > 0).map((item,i) => <span key={`${i}-${item}`} className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-primary">{item}</span>)}<button type="button" onClick={reset} className="inline-flex items-center gap-1 text-xs font-bold text-muted hover:text-primary"><X size={13}/> Clear all</button></div>}
        {visible.length > 0 ? <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">{visible.map(product => <ProductCard key={product.id} product={product}/>)}</div> : <div className="flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-[#fbfcff] p-6 text-center"><Search size={32} className="text-[#a1b0c8]"/><h3 className="mt-4 text-lg font-extrabold">Nothing matched this time</h3><p className="mt-2 max-w-sm text-sm text-muted">Try another category, price range or search keyword.</p><button type="button" className="mt-5 font-bold text-primary hover:underline" onClick={reset}>Show all products</button></div>}
        <p className="mt-8 text-center text-xs text-muted">Preview only · {visible.length} locally defined products · Backend search and pagination will replace this in a future patch.</p>
      </div>
    </div>
  </div>;
}
