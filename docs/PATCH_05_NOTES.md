# Patch 05 — Customer account UI & demo orders

## Baseline

`kookaburra-storefront-full-20261017-140321.zip` (Patch 04 already integrated).

## Features

- `/account`: responsive account overview with local cart/wishlist summary and fictional order sample.
- `/sign-in`, `/sign-up`: disabled visual input shells, explicitly not collecting credentials.
- `/account/orders`: static fictional orders, search by ID/product and status filtering.
- `/account/orders/[orderId]`: sample order items, stored-currency total and illustrative milestone timeline.
- `/track`: demo ID selector, status and milestone timeline. Only IDs present in code are accepted.
- `/account/addresses`: privacy-conscious placeholder (no address collection or persistence).
- `/account/settings`: switches existing browser-local market/locale preferences. No account sync.
- Desktop/mobile Account link and footer shortcuts.
- Matching Flutter parity notes in `docs/FLUTTER_PARITY.md`.

## Data and security boundary

All example order IDs start `DEMO-`. They are **fictional fixtures** in `lib/account-preview.ts`. No real name, email, shipping address, payment, customer account or authenticated session is stored or transmitted by Patch 05. The login/register controls are disabled, not simulated as successful. The checkout preview remains disabled for actual order placement.

Any future live orders API must enforce authentication + ownership checks server-side, use authoritative prices/statuses, prevent cross-user IDOR, and protect customer data. Do not replace these fixture IDs with real values without implementing those protections.

## Verification

From repo root:

```powershell
node scripts/verify-patch05.mjs
npm run check
npm audit --omit=dev
npm run dev
```

Browser smoke: `/account`, `/sign-in`, `/sign-up`, `/account/orders`, `/account/orders/DEMO-BD-1042`, `/track`, `/account/addresses`, `/account/settings`; check mobile navigation and sign-in disabled state. This patch does not introduce new npm dependencies.
