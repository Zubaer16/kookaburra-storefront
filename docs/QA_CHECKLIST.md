# Patch 01 · Acceptance checklist

## Local developer validation

Run `npm install`, `npm run verify`, `npm run typecheck`, `npm run lint`, and `npm run build` in the repository root. The source-generation environment had no npm registry access and cannot claim to have run the last three successfully.

## Desktop smoke test

- [ ] Visit `/`: hero, 6 category tiles, 8 featured product cards, footer all render without broken image icons.
- [ ] Enter `watch` in header search, submit → `/shop?q=watch`; results should show Orbit Classic Wrist Watch.
- [ ] Visit `/shop?category=electronics`; Electronics filter is preselected; choose Home & Living from sidebar.
- [ ] Choose sort by price, confirm products reorder.
- [ ] On a product, add quantity 2 to cart → drawer opens; increment and decrement; view cart.
- [ ] Favorite an item, visit `/wishlist`; remove the item.
- [ ] Switch country to USD; product price changes to explicitly specified USD fixture. Switch back to BDT.
- [ ] Refresh the page; cart, wishlist and selectors remain in the same browser.
- [ ] Verify checkout is disabled and explains why.

## Mobile smoke test

- [ ] Test 320px, 375px, 390px and 428px widths: no horizontal document overflow.
- [ ] Open mobile navigation; category links route correctly; choose language and market.
- [ ] Search submits; catalog filter panel toggles; product cards remain usable with 2-column layout.
- [ ] Add to cart, open/close Radix sheet and adjust quantities with touch-friendly controls.
- [ ] Press Escape to close open sheet; focus stays accessible.

## Expected nonfunctional features in Patch 01

- Real customer login, account pages and order tracking
- Real product API, inventory and server pagination
- International shipping restrictions, country tax and payment selection
- Checkout, production payments, order creation, email and support forms
- Full translation coverage beyond the initial navigation/home labels
- Flutter app project (shared tokens and screen mapping are included, not the Dart implementation)

## Patch 05 · Account preview smoke tests

- [ ] Desktop header Account opens `/account`, mobile menu Account preview link closes drawer and navigates correctly.
- [ ] `/account` displays an **explicit preview** banner, local wishlist/cart counts after hydration, and fictional order sample.
- [ ] `/sign-in` and `/sign-up` have visibly disabled inputs/buttons; no credential is requested or submitted.
- [ ] `/account/orders` filters by Processing / On the way / Delivered and searches by sample ID and product text.
- [ ] Clearing the filters restores all three sample orders; an impossible search shows empty-state guidance.
- [ ] `/account/orders/DEMO-BD-1042` displays BDT and milestone timeline; `/account/orders/DEMO-INT-0831` displays USD.
- [ ] `/track` selector switches between sample shipments; a `/track?sample=DEMO-INT-0831` link selects the correct demo order.
- [ ] `/account/addresses` collects no details; `/account/settings` changes existing browser-local region and language preferences.
- [ ] No order/receipt, authentication, user profile or tracking data is transmitted to an API by these new pages.
- [ ] At 320px, 375px and desktop widths, order IDs do not overflow; tabs scroll horizontally when needed.
- [ ] Keyboard navigation and focus indicator work for nav, order filters, search, selector and links.
- [ ] `node scripts/verify-patch05.mjs` and `npm run check` pass locally before any deployment.
