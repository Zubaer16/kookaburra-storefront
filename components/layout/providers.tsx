"use client";

import { Toaster } from "sonner";
import { StoreHydrator } from "@/hooks/use-store-ready";
import { CartDrawer } from "@/components/store/cart-drawer";

export function Providers({ children }: { children: React.ReactNode }) {
  return <><StoreHydrator/>{children}<CartDrawer/><Toaster richColors closeButton position="top-right" /></>;
}
