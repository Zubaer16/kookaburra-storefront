"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Locale, Market } from "@/lib/catalog";
import { productById } from "@/lib/catalog";

type CartLine = { productId: string; quantity: number };
type CommerceState = {
  market: Market;
  locale: Locale;
  cart: CartLine[];
  wishlist: string[];
  cartOpen: boolean;
  mobileMenuOpen: boolean;
  setMarket: (market: Market) => void;
  setLocale: (locale: Locale) => void;
  addToCart: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  setCartOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
};

export const useCommerceStore = create<CommerceState>()(
  persist(
    (set) => ({
      market: "BD", locale: "en", cart: [], wishlist: [], cartOpen: false, mobileMenuOpen: false,
      setMarket: (market) => set({ market }),
      setLocale: (locale) => set({ locale }),
      addToCart: (productId, quantity = 1) => set((state) => {
        const product = productById(productId);
        if (!product || quantity < 1) return state;
        const current = state.cart.find((line) => line.productId === productId);
        const nextQuantity = Math.min(product.stock, (current?.quantity ?? 0) + quantity);
        if (!nextQuantity) return state;
        return {
          cart: current
            ? state.cart.map((line) => line.productId === productId ? { ...line, quantity: nextQuantity } : line)
            : [...state.cart, { productId, quantity: nextQuantity }],
          cartOpen: true,
        };
      }),
      setQuantity: (productId, quantity) => set((state) => {
        const product = productById(productId);
        if (!product) return state;
        if (quantity <= 0) return { cart: state.cart.filter((line) => line.productId !== productId) };
        return { cart: state.cart.map((line) => line.productId === productId ? { ...line, quantity: Math.min(quantity, product.stock) } : line) };
      }),
      removeFromCart: (productId) => set((state) => ({ cart: state.cart.filter((line) => line.productId !== productId) })),
      toggleWishlist: (productId) => set((state) => ({ wishlist: state.wishlist.includes(productId) ? state.wishlist.filter((id) => id !== productId) : [...state.wishlist, productId] })),
      setCartOpen: (cartOpen) => set({ cartOpen }),
      setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
    }),
    {
      name: "kookaburra-storefront-preview-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ market: state.market, locale: state.locale, cart: state.cart, wishlist: state.wishlist }),
      skipHydration: true,
    },
  ),
);
