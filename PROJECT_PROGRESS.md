# Kookaburra v2 — Project Progress and Continuation Notes

**Latest source baseline:** `kookaburra-storefront-full-20261017-133315.zip`, then apply Patch 04.

## Architecture decisions

- Single-vendor, multi-category ecommerce (Fashion, Footwear, Electronics, etc.)
- Bangladesh and international customer markets. Preview BDT/USD display and partial Bangla/English support; real multi-country eligibility/currencies handled by backend later.
- Web: Next.js 15 App Router, React 19, TypeScript, Tailwind 4, customized shadcn-style UI.
- Future Admin: separate Next.js app. Future backend: NestJS modular monolith, REST/OpenAPI, PostgreSQL + Prisma.
- Future mobile: native Flutter, following web responsive UX and shared `design/design-tokens.json`, consuming the same backend (not depending on Next.js source).
- Delivery of source changes: `.tar.gz` containing new and fully modified files only, extracted at repo root from `C:\Users\zubaer.ahmed\Downloads`.

## Completed

- Patch 01 + Fix: project foundation, products, categories, cart/wishlist, dependency security override.
- Patch 02: better homepage, category routes, Fashion/Shoes, advanced catalog filters.
- Patch 03: gallery, color/size variants, variant-aware cart, wishlist and URL filters.
- Patch 04: checkout **UI preview** (address/delivery/review), cart eligibility checks, Flutter parity contract, Patch 02/03 verifier false-positive fixes. **No live orders, payment or personal data saving.**

## Next development priorities

1. Patch 05: customer account/auth *UI shell* plus orders/tracking UI using non-sensitive fixtures; optionally full English/Bangla i18n plan.
2. API contract and independently managed backend, authoritative stock/pricing/tax/shipping/order/payment. Start with ERD and documented endpoints, not embedded Next.js server-actions as core business logic.
3. Connect web/cart/checkout securely to backend; enable real checkout only after tested inventory reservation, server-authoritative quote, payment/webhook/idempotency and country support.
4. Flutter screens using the same UX, tokens and APIs when ready.

## Important limitations

All catalog items, delivery options, stock, shipping prices and totals are previews, not usable for production orders. Full Bangla localization and international legal/tax/shipping support remain future work. Browser-local cart/wishlist are not shared across devices. Do not deploy live payments or take real orders from preview state.

## Future chat workflow

Upload the **latest full repository ZIP**, say "continue from this source" and request the next patch. Inspect existing files and manifests before modifying. Do not require old patch archives if the latest ZIP contains all prior changes. After applying any patch, verify/build, commit source and lockfile safely, then create a new full ZIP backup. Never include `node_modules`, `.next`, `.git` or `.env` secrets in a shared ZIP.
