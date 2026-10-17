# Kookaburra Patch 09 — Accessibility, UX and Test Coverage

**Baseline:** `kookaburra-storefront-full-20261017-163025.zip` (Patch 08 applied).

## Implemented

1. Keyboard skip-to-content link, main focus target, and visible keyboard focus styling.
2. Homepage collection tabs now support Left/Right arrows, Home, End, wraparound, roving `tabIndex` and panel focus. Behavior is isolated in `lib/ux-navigation.ts` for unit verification.
3. Shop mobile filter panel moves focus to first control on open, restores it on Escape/close, exposes pressed state on category chips, and has a live empty-state notice.
4. Desktop category dropdown opens with ArrowDown and restores focus on Escape.
5. Shop query updates use a tested pure formatter in `lib/shop-query.ts`; defaults are kept out of shareable URLs.
6. Route-specific responsive loading placeholders for Shop, Product Details, Checkout and Account, with descriptive status and decorative shapes marked aria-hidden.
7. `npm run test:ux` checks real keyboard helper/URL formatter behaviors, local source/route integrity and disabled auth/payment safety. `npm run check` now includes the test.

## Non-goals

No new dependencies, APIs, real user sessions, live orders, Flutter source or backend changes. This is a frontend-only accessibility foundation, not a certified accessibility audit. Fast pre-rendered demo pages may not visibly display loading placeholders.

## Testing

1. Extract overlay at repo root.
2. Run `nvm use 24`, `npm run check`, `npm audit --omit=dev`.
3. Complete the Patch 09 browser/mobile keyboard checklist in `docs/QA_CHECKLIST.md`.
4. If TypeScript or Next build fails, capture its exact output before advancing.

## Next

Patch 10: comprehensive SEO/performance, final localization/accessibility/manual browser QA and Flutter UI parity signoff. Frontend approval is required before backend work begins.
