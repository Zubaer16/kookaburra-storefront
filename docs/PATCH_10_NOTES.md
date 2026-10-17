# Patch 10 — Frontend Quality Gate (Preview)

This is **not** a claim that the storefront is production ready. The user requires the complete frontend to be accepted before backend work begins.

## Changes included

- Fix duplicate HTML main landmarks on `/cart` and `/wishlist`: one top-level `<main>` wraps all app pages in `app/layout.tsx`.
- Make product-card wishlist/add/choose-option targets >= 44 CSS pixels high/wide; make gallery arrow targets >= 44 pixels.
- Preserve noindex on all preview routes. Add `robots.txt` blocking crawling and a basic browser-only manifest (no offline mode or service worker).
- Add static server metadata wrappers for client-only Cart, Wishlist, Tracking and Auth preview routes.
- Add preview descriptions to Shop/Product metadata. **Do not** add canonical URLs until a verified production domain exists.
- Reduce motion for hover transforms and skeletons. Improve skip link scroll target.
- Keep localization/browser-only market preferences; no real orders/payments/login/API traffic added.
- Add dependency-free Patch 10 quality assertions and a release-gate checklist.

## Node 24 verification

Run `npm run check`, `npm audit --omit=dev`, and `node scripts/verify-patch10.mjs`.
Then manually exercise the entire screen matrix at widths 320 / 375 / 390 / 428 / 768 / 1024 / 1440 (Chrome and Firefox if available). Use browser keyboard, 200% zoom, reduced motion and an accessibility scanner.

## Not completed in this patch

- The actual production build and real browsers must be tested on the user's machine; offline syntax and markup inspection do not prove WCAG or production readiness.
- No server/locales by URL; `html lang` updates after hydration. SEO localization needs a future URL/SSR strategy after the user approves production requirements.
- No real payment, customer registration, email notifications, customer order history, shipping quote, stock validation, international duty calculation, privacy policy, returns, regulatory or legal readiness.
- No real Flutter Dart application; the web is the design reference and the parity checklist remains a specification.
- Existing simulated catalog/products/prices remain fixtures.

## Frontend acceptance gate

**Do not start backend without explicit user authorization.** Frontend approval should require: passing `npm run check`, zero relevant production audit findings, full desktop/mobile/manual accessibility smoke checks, no outstanding P0/P1 UX failures, visual signoff, and a recorded limitations list. If any fail, deliver Patch 10 Fix or Patch 11 before closing.
