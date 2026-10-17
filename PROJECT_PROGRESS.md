# Kookaburra v2 — Project Progress and Continuation Notes

**Latest source baseline:** `kookaburra-storefront-full-20261017-163025.zip` (Patch 08 applied), then Patch 09 overlay.

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
- Patch 05: account overview, sign-in/sign-up disabled UI, example order history with search/status filters, demo order details and tracking selector/timeline, saved addresses placeholder, browser-local shopping preferences. **Fictional fixtures, no login, real customer data, requests or orders.**

- Patch 06: bilingual EN/BN static labels on primary shopping screens and account settings/shell, translated empty/error states, browser `html lang` sync, and a **non-connected** typed API client/DTO draft. Some checkout, tracking and catalog copy is still English. No real API requests or Flutter code.

- Patch 07: 100+ new EN/BN checkout/auth/order/tracking labels; bilingual checkout address/delivery/review, demo-order filters/status, tracking summary, sign-in/sign-up UI and gallery/options accessibility text. **Still preview only; no payments, orders, account creation or API calls.**

- Patch 08: remaining bilingual Account/Address/Order Detail copy, sample product and category translations, known demo-order milestone labels and notes, Shop Bangla keyword matching, and translated Homepage/Cart/Checkout presentation. Stable identifiers and sample totals preserved. **Not connected to a backend.**

- Patch 09: skip-to-content keyboard link and visible focus, accessible keyboard-operated collection tabs, improved mobile Shop filter focus/Escape handling and stateful category chip labels, route-level skeletons for Shop/Product/Checkout/Account, plus dependency-free UI behavior tests in `npm run test:ux`. **Actual accessibility/performance browser audit still pending.**

## Next development priorities

1. Patch 09 delivered for verification; run `npm run check` and execute manual browser/mobile accessibility tests before considering it completed.
2. Patch 10 + frontend-only completion gate: robust responsive/keyboard/accessibility/SEO/localization QA, design freeze, test coverage, and Flutter mapping. **Do not begin backend until user confirms frontend is finished.**
3. Future only after frontend approval: independent backend with authoritative stock/pricing/tax/shipping/order/payment; keep Next.js checkout disabled until validated.
4. Flutter screens using the same UX, tokens and APIs when ready.

## Important limitations

All catalog items, example orders, delivery options, stock, shipping prices and totals are previews, not usable for production orders. Full Bangla localization and international legal/tax/shipping support remain future work. Browser-local cart/wishlist are not shared across devices. Do not deploy live payments or take real orders from preview state.

## Future chat workflow

Upload the **latest full repository ZIP**, say "continue from this source" and request the next patch. Inspect existing files and manifests before modifying. Do not require old patch archives if the latest ZIP contains all prior changes. After applying any patch, verify/build, commit source and lockfile safely, then create a new full ZIP backup. Never include `node_modules`, `.next`, `.git` or `.env` secrets in a shared ZIP.
