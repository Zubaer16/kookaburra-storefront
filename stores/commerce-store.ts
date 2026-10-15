'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Locale, Market } from '@/lib/catalog'
import { cartLineKey, productById, productVariant } from '@/lib/catalog'

export type CartLine = {
  productId: string
  variantId?: string
  quantity: number
}
type CommerceState = {
  market: Market
  locale: Locale
  cart: CartLine[]
  wishlist: string[]
  cartOpen: boolean
  mobileMenuOpen: boolean
  setMarket: (market: Market) => void
  setLocale: (locale: Locale) => void
  addToCart: (productId: string, quantity?: number, variantId?: string) => void
  setQuantity: (productId: string, quantity: number, variantId?: string) => void
  removeFromCart: (productId: string, variantId?: string) => void
  toggleWishlist: (productId: string) => void
  clearWishlist: () => void
  setCartOpen: (open: boolean) => void
  setMobileMenuOpen: (open: boolean) => void
}

function maxStock(productId: string, variantId?: string) {
  const product = productById(productId)
  if (!product) return 0
  if (product.variants) {
    // Old carts may have variant-less lines. Preserve for review/removal but do
    // not allow adding or increasing them without choosing a real option.
    return productVariant(product, variantId)?.stock ?? 0
  }
  return product.stock
}

export const useCommerceStore = create<CommerceState>()(
  persist(
    (set) => ({
      market: 'BD',
      locale: 'en',
      cart: [],
      wishlist: [],
      cartOpen: false,
      mobileMenuOpen: false,
      setMarket: (market) => set({ market }),
      setLocale: (locale) => set({ locale }),
      addToCart: (productId, quantity = 1, variantId) =>
        set((state) => {
          const limit = maxStock(productId, variantId)
          if (!limit || !Number.isInteger(quantity) || quantity < 1)
            return state
          const key = cartLineKey(productId, variantId)
          const existing = state.cart.find(
            (line) => cartLineKey(line.productId, line.variantId) === key,
          )
          const total = Math.min(limit, (existing?.quantity ?? 0) + quantity)
          return {
            cart: existing
              ? state.cart.map((line) =>
                  cartLineKey(line.productId, line.variantId) === key
                    ? { ...line, quantity: total }
                    : line,
                )
              : [...state.cart, { productId, variantId, quantity: total }],
            cartOpen: true,
          }
        }),
      setQuantity: (productId, quantity, variantId) =>
        set((state) => {
          const key = cartLineKey(productId, variantId)
          if (quantity <= 0)
            return {
              cart: state.cart.filter(
                (line) => cartLineKey(line.productId, line.variantId) !== key,
              ),
            }
          const limit = maxStock(productId, variantId)
          if (!limit || !Number.isInteger(quantity)) return state
          return {
            cart: state.cart.map((line) =>
              cartLineKey(line.productId, line.variantId) === key
                ? { ...line, quantity: Math.min(quantity, limit) }
                : line,
            ),
          }
        }),
      removeFromCart: (productId, variantId) =>
        set((state) => ({
          cart: state.cart.filter(
            (line) =>
              cartLineKey(line.productId, line.variantId) !==
              cartLineKey(productId, variantId),
          ),
        })),
      toggleWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.includes(productId)
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId],
        })),
      clearWishlist: () => set({ wishlist: [] }),
      setCartOpen: (cartOpen) => set({ cartOpen }),
      setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
    }),
    {
      // Same storage key as Patch 01/02: existing carts/wishlists survive.
      name: 'kookaburra-storefront-preview-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        market: state.market,
        locale: state.locale,
        cart: state.cart,
        wishlist: state.wishlist,
      }),
      skipHydration: true,
    },
  ),
)
