# Patch 06 — Localized shopping UI & API readiness

Base: `kookaburra-storefront-full-20261017-141657.zip` (Patch 05 already included).

## Implemented

- `lib/ui-copy.ts`: bilingual EN/BN typed static copy for core catalog, cart, wishlist, settings, and preview/error/empty states.
- `hooks/use-ui-copy.ts`: reactive storefront UI translation with hydration-safe English initial render. Stored selection updates in place.
- `components/layout/locale-sync.tsx`: browser `html[lang]` follows selected locale after hydration. This is **client-only language display**, not server-rendered locale SEO. Direction remains LTR for both current locales.
- Shop filters/search results/empty state, Categories screen, Cart, Wishlist, Account shell and Account settings, Header search, Collection tabs, Footer, 404/error states updated.
- Dynamic category cards already support EN/BN names. Sample products, product descriptions, Checkout steps, order detail fixtures and some auxiliary page copy **remain English**. Do not claim full application localization.
- `lib/api/contracts.ts`: draft currency-safe (minor units) DTOs for categories, products, cart, quotes, orders. No schema validation at network boundaries yet; production integration must add runtime validation.
- `lib/api/client.ts`: explicit opt-in typed fetch client. API base URL must be configured and HTTPS in production. No requests run from current UI. Real auth, CSRF policy, country-based tax/payment/shipping and checkout endpoints await backend agreement.
- `.env.example` updated to avoid implying that a backend exists.

## Security and compatibility

- Existing local cart/wishlist persistence key unchanged; old data retained.
- Existing checkout submission and sign-in remain disabled. Preview pricing is not authoritative.
- No new npm dependencies, no database, no real customer requests.
- First SSR markup stays English; changes to Bangla occur after client store hydration. Real SEO-ready localization later should use locale-prefixed routes or server-verified locale cookies.
- Client uses `credentials:'include'` only in a future *opt-in* fetch call. Backend must restrict CORS origins, set secure HttpOnly/SameSite cookies and implement CSRF protection as appropriate.
- API contract shapes are provisional and must be versioned with Flutter/API team before data integration. Quote totals never originate from customer-owned price fields.

## Suggested browser checks

1. `/` → switch language in header (mobile via menu). Check Shopping filters (`/shop`), `/categories`, `/cart`, `/wishlist`, `/account/settings`, `/account` side nav.
2. Reload with Bangla; selected language persists from the existing Zustand local storage. Inspect `<html lang="bn">` after hydration.
3. Toggle Bangladesh/International and ensure cart quantities/variants remain unchanged. Prices are sample only.
4. On `/shop?q=nonexistent`, verify translated empty results and reset filters. On empty cart/wishlist, verify translated empty states.
5. Navigate to non-existent path and error boundary (when triggered) to view translated 404/error copy.
6. Run `node scripts/verify-patch06.mjs`, `npm run check`, `npm audit --omit=dev` on Node 24.

## Remaining

- Complete translation coverage: checkout address form, orders/tracking, products/descriptions, pricing legal text, meta titles, date/plural rules and accessibility text.
- Locale-routed SSR and content source for SEO.
- API backend + OpenAPI/runtime DTO validation + client integration tests.
- Flutter implementation; keep EN/BN keys and Web state behavior in sync with Dart localization resources.
