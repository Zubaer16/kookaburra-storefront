# Kookaburra v2 — Storefront Patch 02

Based on user supplied `kookaburra-storefront-full-20261014-190224.zip` (Patch 01 + Fix 01, no Patch 02 included).

## Included
- Refreshed responsive homepage with separate Fashion and Shoes & Footwear promotions, category tiles, collection tabs, and offer banner.
- New `/categories` route (seven categories); distinct footwear category and sample shoe/fashion/lifestyle products.
- Desktop category popover, expandable mobile drawer categories, and updated footer links.
- `/shop` quick category pills, country-aware preview price ceiling, stock-only filter, keyword search, sorting and reset.
- Three local SVG illustrations; no new npm dependencies.
- Flutter screen contract refreshed: keep parity with the mobile web design and share *API contracts*, not React components.

## Safety & scope
- Source uses local fixture catalog; no backend, real stock, country-shipping, taxes, live checkout or payment processing.
- Illustrative BDT/USD amounts are **not exchange-rate conversions** and cannot be used as payment authority.
- User cart and wishlist Zustand persistence key is unchanged.
- Category setup is in code for now. Future admin API will allow adding shoes subcategories and more categories without app releases.
- Product category IDs are intentionally flat during this UI-preview phase; the future database should support hierarchical categories.

## Installation
From the repo root, on Windows PowerShell:

```powershell
tar -xzf "C:\Users\zubaer.ahmed\Downloads\kookaburra-storefront-patch-02.tar.gz" -C .
node scripts/verify-patch02.mjs
npm run check
npm audit --omit=dev
npm run dev
```

No npm install is necessary if Patch 01 + Fix 01 dependencies are already installed, as `package.json` is not changed.

## Manual smoke tests
1. Desktop menu opens, Escape closes, outside click closes; mobile drawer opens and navigates.
2. Category cards: Fashion and Footwear link to correct shop filters; `/categories` shows seven tiles.
3. Homepage tabs show filtered products; items can be added to cart and wishlist.
4. Shop filters combine correctly; BDT/USD market switch changes price thresholds, not checkout prices.
5. Product details for new slugs load; cart persists after refreshing.
6. Test narrow widths 375px, 768px and desktop, plus keyboard navigation.

## Future Flutter parity
Same hex colors, font scale, radii, card content, category order, product navigation, collection tabs and filter logic. Native Flutter implementation remains independent; use one future REST/OpenAPI backend.
