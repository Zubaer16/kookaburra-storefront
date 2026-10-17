# Patch 07 — Bilingual checkout and account preview

Based on `kookaburra-storefront-full-20261017-144256.zip`. Overlay contains complete new/modified files only. No npm dependency changes.

- EN/BN preview copy for checkout address, delivery, order summary, confirmation guard, sign-in/sign-up disabled forms, sample order list/status, tracking and product variant/gallery accessibility labels.
- All displayed money, delivery methods and order information remain illustrative. Credentials are disabled; checkout never sends personal details, orders or payment.
- The API remains disconnected. No backend development in this patch.
- Some English-only fixture product descriptions, timeline notes, account overview, and server-rendered sample order details remain for Patch 08. Product-details static labels now switch to EN/BN. Language is browser-local and is **not** SEO locale routing yet.

## Checks after extraction

`node scripts/verify-patch07.mjs`
`npm run check`
`npm audit --omit=dev`
`npm run dev`

Manual smoke: switch Bangla/English on `/checkout` (address/delivery/review), `/account/orders` (filters), `/track` (statuses), `/sign-in`, `/sign-up`, and a shoes or fashion product. Test tab navigation and mobile layout.
