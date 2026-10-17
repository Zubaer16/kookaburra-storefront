# Kookaburra v2 — Storefront · Patch 01

**Single Vendor · Multi-category · Bangladesh + International · Flutter-aligned**

This is a new Next.js 15 / React 19 / TypeScript / Tailwind 4 storefront. It is intentionally separate from the old Sanity/Clerk/Stripe starter. The bundled catalog and prices are **sample data**. There is **no live backend, payment, customer authentication or production order processing** in this patch.

## Extract on Windows

Download `kookaburra-storefront-patch-01.tar.gz` into `C:\Users\zubaer.ahmed\Downloads`.

Open VS Code **in the root of the empty `kookaburra-storefront` repository**. Paste in a PowerShell terminal:

```powershell
tar -xzf "C:\Users\zubaer.ahmed\Downloads\kookaburra-storefront-patch-01.tar.gz" -C .
npm install
npm run dev
```

Open <http://localhost:3000>. If port 3000 is in use, follow the URL printed by Next.js.

### Checks

```powershell
npm run verify
npm run typecheck
npm run lint
npm run build
```

`npm install` creates a `package-lock.json` locally; **commit that lockfile** so later builds use `npm ci`. This project pins Node.js 24.x via `.nvmrc` and `package.json` engines; use `nvm use 24` on Windows. The environment that generated this patch could not reach the npm registry, so an actual dependency install and Next.js build were **not** performed here; please run the commands above.

## What's included

- Responsive home with promotional hero, product categories, featured products, and collection calls to action.
- Search and filterable catalog (`/shop`), sorting, sample product details, basic wishlist (`/wishlist`) and cart (`/cart`).
- Functional add-to-cart, quantities and wishlist, persisted locally in the browser using Zustand. Cart drawer UI via Radix/shadcn-style Sheet.
- English/Bangla navigation and selected homepage labels, BDT/USD selector with **separately defined illustrative market prices**, no exchange-rate conversion.
- Self-contained SVG artwork (no external image API), responsive header and mobile navigation, accessible buttons and states.
- shadcn/ui-compatible `components.json`, reusable Button/Input/Badge/Sheet, design tokens shared with future Flutter implementation.
- Offline `npm run verify` for project structure. Framework compilation still requires installed dependencies.

## Important boundaries

1. Cart prices and stock levels are **client-side previews**, not secure or authoritative. **Do not enable checkout** until the independent backend calculates prices, shipping, tax, stock and validates payment.
2. Country selector toggles example BDT/USD catalog prices only. Shipping country eligibility, taxation, custom duties, payment options, and production localization will be handled by backend contracts.
3. No live login and no database: wishlist/cart persist only in the same browser. **Do not interpret this as cross-device sync**.
4. The page metadata sets `robots: noindex,nofollow` intentionally for preview; replace with production SEO metadata only when backend and live content are ready.
5. This is one **root-level overlay**: no extra wrapping folder, no automatic deletions. `.git` is untouched.

## Source map

```text
app/                    Next.js App Router pages and layout
components/layout/      Header, footer, logo, providers
components/store/       Product cards, product details, shop filters, cart drawer
components/ui/          Customizable shadcn-style React components
stores/                 Zustand browser-preview commerce state
lib/                    Sample catalog, prices, i18n helpers
public/                 Original in-project SVG sample art
design/                 Stable design tokens for Next.js and Flutter
docs/                   Architecture and Flutter parity contract
scripts/                Offline structural verification
```

Next patch can deepen real production-ready catalog UX, variants, category trees and API client groundwork without changing design foundations.


## Patch 03 — Product options and variant-aware cart

The storefront now has a selectable T-shirt / sneaker / loafer size-and-color matrix,
illustrated product gallery, variant-aware persistent cart, wishlist management and
shareable shop filters. Product data and totals remain **preview-only fixtures**;
checkout intentionally cannot process orders. See `docs/PATCH_03_NOTES.md` and
`docs/FLUTTER_PARITY.md` for implementation notes and mobile parity.

After extracting Patch 03 at the repository root, run:

```powershell
node scripts/verify-patch03.mjs
npm run check
npm audit --omit=dev
npm run dev
```

No dependency changes or `npm install` required after a working Patch 02.

## Patch 04 — Checkout interface preview

New `/checkout` includes sample address, Bangladesh/international region switch, delivery method selection, review step and indicative total. The cart links to it only for valid product/variant quantities. **There is no real order or payment, and address entries are not persisted or transmitted.** Run `node scripts/verify-patch04.mjs` and `npm run check` after extracting. See `docs/PATCH_04_NOTES.md` and `PROJECT_PROGRESS.md` for details and continuation guidance.

## Patch 05 — Customer account & tracking preview

A responsive `/account` area now links to *fictional* order history, demo order details, sample shipment tracking, read-only address planning and local display preferences. Sign-in/sign-up designs exist at `/sign-in` and `/sign-up`, but **all credential inputs and submission are disabled**. No real customer exists and no orders, emails, address details or passwords are stored or transmitted by these pages.

Use `node scripts/verify-patch05.mjs` then `npm run check` after the Patch 05 root overlay. See `docs/PATCH_05_NOTES.md`, `PROJECT_PROGRESS.md` and `docs/FLUTTER_PARITY.md` for intended future backend and Flutter parity. No dependency changes.
