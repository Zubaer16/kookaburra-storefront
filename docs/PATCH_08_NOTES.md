# Patch 08 — Bilingual fixtures & remaining shopping/account copy

Base ZIP: `kookaburra-storefront-full-20261017-151126.zip` after Patch 07 Fix 01.

## Scope

- English/Bangla display-only copy for Account Overview, demo Order Details, Saved Addresses and corresponding CTA labels.
- Translation of public fixture product titles/descriptions by **stable product ID** for the existing 11 sample products, plus category descriptions and known sample variant colors.
- Localized product titles in Product Cards, Product Details, Cart, Cart Drawer and Checkout Summary. Shop keyword matching includes translated titles/descriptions.
- Demo order item labels, shipping-region summaries and fixed tracking milestone labels/notes in Bengali.
- Static Home promotional headings, highlight strips and collection copy localized.
- Screen reader labels improved for product cards, shopping-cart controls and product galleries.
- `docs/FLUTTER_PARITY.md` updated to map translated IDs and fallback rules.

## Scope boundaries

- **No backend, auth, payment, order creation, networking, API requests or live stock introduced.**
- Product IDs, slugs, SKUs, variant IDs, stock, prices and cart storage key unchanged.
- Demo-order amounts and dates are illustrative; their IDs remain English (`DEMO-*`).
- Fallback for missing translations is original English fixture copy; real API products will need locale fields or translation content.
- This is not full production localization for arbitrary backend data; it is completion of static and sample-fixture UI coverage for this frontend phase.

## Installation and verification

From the repository root, extract `kookaburra-storefront-patch-08.tar.gz` (no nested folder). No new npm package required.

```powershell
node scripts/verify-patch08.mjs
npm run check
npm audit --omit=dev
npm run dev
```

Manual checks: change language to বাংলা, then visit `/`, `/shop`, `/categories`, `/product/motion-everyday-sneaker`, `/cart`, `/checkout`, `/account`, `/account/orders/DEMO-BD-1042`, `/account/addresses`, `/track`. Check saved cart quantities/options and that checkout/payment remain disabled. Repeat EN/BN switch on mobile width.

## Remaining before frontend completion

1. Patch 09 — responsive, keyboard focus and accessibility refinement; loading/empty/error states and test coverage.
2. Patch 10 — final cross-platform UI QA, SEO/metadata, performance and Flutter design parity checklist; fix any regressions.
3. Frontend design-freeze and **user approval** before any backend development.
