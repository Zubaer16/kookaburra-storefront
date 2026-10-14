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
