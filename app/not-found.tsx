import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return <div className="container-shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center"><div className="flex size-20 items-center justify-center rounded-3xl bg-blue-50 text-primary"><SearchX size={36}/></div><p className="mt-7 text-xs font-bold uppercase tracking-[.2em] text-primary">404 · Not found</p><h1 className="mt-3 text-3xl font-extrabold">This page went exploring.</h1><p className="mt-4 max-w-md text-sm leading-7 text-muted">The page or product you requested isn&apos;t in the preview catalog.</p><Button asChild className="mt-7"><Link href="/"><ArrowLeft size={17}/> Back to home</Link></Button></div>;
}
