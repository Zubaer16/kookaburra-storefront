import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, Compass } from "lucide-react";
import { CategoryTile } from "@/components/store/category-tile";
import { categories, products } from "@/lib/catalog";

export const metadata: Metadata = { title: "Explore Categories", description: "Browse electronics, fashion, shoes, home, lifestyle and more at Kookaburra." };

export default function CategoriesPage() {
  return <div className="container-shell pb-20 pt-9">
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted"><Link href="/" className="hover:text-primary">Home</Link><ChevronRight size={14}/><span className="font-bold text-ink">Categories</span></nav>
    <div className="relative mb-10 mt-6 overflow-hidden rounded-[24px] bg-[#edf2ff] px-7 py-10 sm:px-12 sm:py-14"><div className="absolute -right-10 -top-16 size-[230px] rounded-full border-[48px] border-[#d6e0ff]"/><div className="relative"><div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-primary"><Compass size={15}/> Discover your next favorite</div><h1 className="mt-5 text-3xl font-extrabold tracking-[-.045em] text-ink sm:text-5xl">Shop by category</h1><p className="mt-3 max-w-xl text-sm leading-7 text-[#63728c]">A little bit of everything you love. From easy everyday essentials to thoughtful finds, start exploring here.</p></div></div>
    <div className="mb-5 flex items-end justify-between gap-3"><div><h2 className="section-heading">All collections</h2><p className="mt-1 text-sm text-muted">{categories.length} categories · {products.length} preview products</p></div><Link href="/shop" className="inline-flex items-center gap-2 text-xs font-extrabold text-primary hover:underline sm:text-sm">Shop all <ArrowRight size={16}/></Link></div>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{categories.map(category => <CategoryTile category={category} variant="feature" key={category.id}/>)}</div>
    <div className="mt-10 rounded-[22px] border border-dashed border-[#d4dff4] bg-[#f8faff] p-6 sm:p-8"><h2 className="text-lg font-extrabold">More categories as we grow</h2><p className="mt-2 max-w-2xl text-sm leading-7 text-muted">This is a preview catalog. Our future admin dashboard will manage products, category trees and their translations through the backend API—without a storefront or Flutter release for every new category.</p></div>
  </div>;
}
