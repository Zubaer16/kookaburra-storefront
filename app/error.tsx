"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("Storefront rendering failed", error); }, [error]);
  return <div className="container-shell flex min-h-[50vh] flex-col items-center justify-center py-16 text-center"><AlertCircle size={44} className="text-[#d94f5b]"/><h1 className="mt-5 text-2xl font-extrabold">Something didn&apos;t load</h1><p className="mt-2 max-w-md text-sm leading-6 text-muted">Try refreshing this part of the storefront. If it keeps happening, check the browser console.</p><Button onClick={reset} className="mt-6"><RotateCw size={17}/> Try again</Button></div>;
}
