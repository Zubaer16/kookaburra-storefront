# Kookaburra v2 · Web → Flutter Design Parity Contract (v1)

The approved responsive **web mobile design is the visual and flow reference** for Flutter. Flutter uses its own widgets, navigation, accessibility, state and platform idioms, but consumes **the same future NestJS REST/OpenAPI backend**. Never make Flutter depend on Next.js source or a web scraping interface.

## Shared design tokens

Single source of truth: [`../design/design-tokens.json`](../design/design-tokens.json).

| Token                | Web implementation                       | Flutter mapping                                               |
| -------------------- | ---------------------------------------- | ------------------------------------------------------------- |
| Primary `#2459E8`    | `--primary`, `bg-primary`                | `Color(0xFF2459E8)` / `ColorScheme.primary`                   |
| Ink `#152039`        | `--ink`                                  | `Color(0xFF152039)`                                           |
| Background `#F7F9FC` | `--canvas`                               | `Color(0xFFF7F9FC)`                                           |
| Card radius `18px`   | rounded UI component                     | `BorderRadius.circular(18)`                                   |
| Large radius `26px`  | hero cards                               | `BorderRadius.circular(26)`                                   |
| Typeface             | Inter/system, Noto Sans Bengali fallback | Inter/Noto Sans Bengali font family if licensed/bundled later |
| Spacing unit         | 4px                                      | 4 logical pixels                                              |

## Screen parity checklist

| Web                      | Flutter counterpart                         | Current web status            |
| ------------------------ | ------------------------------------------- | ----------------------------- |
| `/`                      | Home tab with hero / category chips / cards | Patch 01 visual foundation    |
| `/shop`                  | Discover/search/filter screen               | Patch 01 local data UI        |
| `/product/[slug]`        | Product detail route, swipe gallery later   | Patch 01 simple view          |
| `/cart` and sheet        | Cart tab, quantity & summary                | Patch 01 browser-local UI     |
| `/wishlist`              | Wishlist tab                                | Patch 01 browser-local UI     |
| Country/locale selection | Settings / top region picker                | Patch 01 BDT/USD & partial BN |
| Account                  | Auth / profile tabs                         | Not implemented               |
| Checkout                 | Delivery, review, payment                   | Not implemented               |
| Orders/tracking          | Account orders and tracking route           | Not implemented               |

## Feature acceptance rule

A screen is "parity ready" only when: (1) web mobile layout approved, (2) states documented (loading/empty/error/disabled), (3) touch sizes and accessibility reviewed, (4) backend payload contract agreed, (5) Flutter screen matches the design system while retaining native behavior.

Patch 01 **does not ship a Flutter application**. The token contract and screen mapping ensure the eventual mobile app is designed from the same source.

## Patch 02 additions

- `/categories` → Flutter Categories tab/route, seven category cards including **Shoes & Footwear**.
- Home promotions include Fashion and Footwear; Flutter uses vertically stacked promotional cards on narrow screens.
- Collection tabs (`For you`, `New arrivals`, `Great deals`, `Style & shoes`) become a native horizontally scrollable control; preserve selected state and filter semantics.
- Shop category chips, country-aware price ceiling, stock toggle, sorting and empty state must be mapped to Flutter filter UI.
- Product assets, BDT/USD previews, order of categories and rounded cards are design references; real commerce data comes from the future shared API.

## Patch 03 — Product variants, gallery and cart parity

- Product images: web has a primary image, optional alternate thumbnail gallery, and previous/next controls. Flutter should use a native swipeable `PageView`, with accessible image announcements and indicator positions. Do not add duplicate fake images when only one image exists.
- Variant data: future REST product detail includes `variants[]` (`id`, `sku`, `{size?, color?}`, `availableStock`, optional per-variant image), and gallery images. Sample size/colors are not a definitive inventory or sizing specification.
- Selection: user must explicitly choose every required product option; unavailable combinations are disabled. On option change, quantity resets to 1.
- Cart identity: each line is keyed by `(productId, variantId)`, never `productId` alone. Flutter uses the same payload but native independent cart state. This is local demo state until the backend owns cart persistence.
- Legacy web storage: if an old line has no variant but the product now requires one, keep it visible, clearly mark it as incomplete and allow removal, without guessing a variant. This migration is browser-specific, not a Flutter requirement.
- Preview totals are display-only. Neither platform can authorize price or stock; the future NestJS backend validates order items, variants, current price, inventory and permitted country before checkout.
- Shop filters map to common API parameters `q`, `category`, `tag`, `sort`, `price`, `stock` (sample frontend URL tokens in Patch 03). For style category, backend contract must define whether it is a collection slug or a set of category IDs; current web uses a fixture-only alias.

## Patch 04 — Checkout preview parity (Web → Flutter)

The web `/checkout` UI has **Address → Delivery → Review** steps. Flutter should mirror the **same sequence, field requirements, invalid-cart blocking, country switch resets and sample/real boundary**, using Flutter-native screens and widgets (e.g. `Form`, `TextFormField`, `RadioListTile`, `Stepper` or a custom progress indicator).

### Proposed eventual shared API contract (not implemented)

- `POST /v1/checkout/quote`: authenticated/guest cart and destination => **backend-owned** validated SKU/variant/quantity, country eligibility, authoritative line prices and stock, available delivery methods, tax/duty disclosure, totals and quote expiration.
- `POST /v1/orders`: server quote identifier and idempotency key => real order after the server revalidates; no trusting frontend-submitted price, shipping amount or total.
- `POST /v1/payments/session`: order reference and payment method => payment provider session. Only the backend processes webhook/provider confirmations.
- `GET /v1/orders/{id}`: order detail/tracking for logged-in/authorized customers.

**Do not implement these endpoints as fake successes.** The current frontend uses `lib/checkout-preview.ts` for entirely illustrative shipping fees and local cart totals. Neither web nor Flutter may treat preview prices, client stock or a selected destination as verified.

### Checkout mobile parity acceptance

1. Sample cart containing correct variant may enter checkout. Empty, unknown, obsolete variant and over-stock carts must return to cart review.
2. Bangladesh shopping market uses a Bangladesh address and BDT preview. International market offers example country selection and USD preview. Changing region resets unfinished address and selected delivery method.
3. Address fields need accessible labels, keyboard/autofill appropriate to platform, form validation, and edit flows; **Patch 04 web does not save or transmit entered address**, and Flutter preview should also avoid persisting PII.
4. Delivery choices are demonstration-only. No shipping availability, ETA, fees, customs or taxes are real until quote API integration.
5. Review shows product/variant quantities, contact and destination, chosen method, indicative subtotal/fees. Payment and order placement remain disabled until secure API integration.
6. Small-phone widths should stack summary below the form; Flutter uses matching design tokens and native touch controls.

## Patch 05 — Account, authentication UI and tracking parity

- Web `/account` → Flutter Account tab. Show an explicit signed-out/preview state until authentication exists. Do not fabricate a logged-in customer.
- Web `/sign-in` and `/sign-up` → Flutter authentication screens with native fields and validation **after** secure backend auth; the web preview deliberately disables all credential inputs and submission.
- Web `/account/orders` → Flutter Orders list with status chips, server pagination/search in production, explicit empty/loading/error states and a user-scoped API.
- Web `/account/orders/[orderId]` → Flutter Order Detail. Server must enforce user authorization for every order ID; hiding a button is not access control.
- Web `/track` → Flutter sample tracking design. Current demo selector uses made-up order IDs and no customer input or external shipment lookup.
- Web `/account/addresses` → Flutter address book after authenticated backend storage. Do not persist PII in preview state; country-specific fields and eligible destinations must be server-defined.
- Web `/account/settings` → Flutter Settings for market/locale. These currently use only browser-local display preferences; do not infer they are server-synced.
- Shared states needed before real integration: anonymous, authenticating, authenticated, expired session, permission denied, empty history, loading, retryable error, delivered, in transit, canceled, returns.
- Future endpoints: `POST /v1/auth/login`, `POST /v1/auth/register`, `GET /v1/me`, `GET /v1/me/orders`, `GET /v1/me/orders/{id}`, `GET /v1/me/addresses`, `GET /v1/me/preferences`, with backend-managed tokens/sessions and authz. Endpoints are **proposals**, not implementations.
- UI parity concerns: touch-friendly tabs, clear delivery milestone labels, screen reader timeline order, translated labels, currency based on each order's recorded currency rather than current storefront selector.

## Patch 06 — EN/BN and error/empty states parity

- New web static UI copy: `lib/ui-copy.ts` (locale keys `en`/`bn`); Flutter should mirror these concepts in `arb`/generated localization messages, not import TypeScript.
- Web uses browser `html lang` and local preference after hydration; Flutter should use the same user preference and `Locale('bn')` / `Locale('en')` at `MaterialApp` level, including screen-reader semantics. Keep navigation and visual hierarchy similar, but native UI where appropriate.
- Core shop, category, wishlist, cart, account shell/settings and common error/404 states have translated labels. Other screens/catalog content remain partly English. Do not confuse this iteration with full bilingual content.
- API DTO proposal in `lib/api/contracts.ts` distinguishes integer minor-unit amounts with currency (`BDT` / `USD`) from local demo display prices. Flutter should match the **eventual backend OpenAPI**, not this draft directly.
- Loading / no results / disabled actions / no logged-in customer / retryable error are distinct states on both platforms. Never display fake success, real order confirmation or simulated payment as if processed.

## Patch 08 — Shared localized fixture specification

- Current 11 preview product IDs map to English/Bangla `title` and `description` in web `lib/fixture-localization.ts`. Future API DTOs should use per-locale content fields; Flutter should **not** parse the TypeScript file. Export stable keys or mirror fixture data in ARB/JSON for Flutter UI previews.
- Category descriptions, color names, order sample items, delivery labels and milestone notes are translated **for presentation only**. Product/variant IDs, SKU, sample stock and order currency remain unchanged.
- On Web, a persisted locale is applied after hydration. Flutter should use the same en/bn locale selection and keep state keys independent of text. Use English fallback for missing dynamic translations, and never infer a verified order or shipping status from sample fixtures.
- Long Bangla headings must wrap without clipping at 320–360 dp widths. Maintain native semantics for cart controls, carousel labels, sample tracking timeline and variant selectors.

## Patch 09 — Interaction and Accessibility Parity

- Follow the same primary shopping flows and design tokens; do **not** import React source into Dart.
- Flutter collection chips/tabs must announce selected state; on hardware keyboards provide Left/Right and Home/End navigation with wrapping, corresponding to `lib/ux-navigation.ts`.
- Flutter filter sheet must move focus to its first actionable control when opened and restore focus on dismiss, including keyboard Escape/back navigation.
- All empty/loading/error states should have accessible labels, and decorative placeholder shapes should not be read as content.
- Respect text scaling, reduced motion and 320px equivalent narrow screens. App-native navigation and sheet gestures can differ while preserving meaning and design hierarchy.
- Flutter code is **not** part of Patch 09; the web frontend remains the visual source of truth.

## Patch 10 — Design freeze candidate, not Dart code

- Web preview uses one main document landmark. Flutter counterpart: one `Scaffold`/semantic main content region per screen.
- Product-card action targets and gallery arrows target >=44 logical pixels; Android generally benefits from 48dp touch targets.
- Respect OS reduced-motion and large-font settings on both platforms.
- Preserve noindex/preview safety on Web and clear fake-data warnings on Flutter demos. Do not copy the Web manifest/robots features to Flutter.
- Flutter implementation remains a separate later step; reuse design tokens and screen contracts, not TypeScript runtime code.
- Backend integration is **not started**; Flutter/backend work starts only after frontend acceptance per the user's instruction.
