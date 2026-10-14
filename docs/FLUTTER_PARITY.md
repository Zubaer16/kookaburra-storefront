# Kookaburra v2 · Web → Flutter Design Parity Contract (v1)

The approved responsive **web mobile design is the visual and flow reference** for Flutter. Flutter uses its own widgets, navigation, accessibility, state and platform idioms, but consumes **the same future NestJS REST/OpenAPI backend**. Never make Flutter depend on Next.js source or a web scraping interface.

## Shared design tokens

Single source of truth: [`../design/design-tokens.json`](../design/design-tokens.json).

| Token | Web implementation | Flutter mapping |
|---|---|---|
| Primary `#2459E8` | `--primary`, `bg-primary` | `Color(0xFF2459E8)` / `ColorScheme.primary` |
| Ink `#152039` | `--ink` | `Color(0xFF152039)` |
| Background `#F7F9FC` | `--canvas` | `Color(0xFFF7F9FC)` |
| Card radius `18px` | rounded UI component | `BorderRadius.circular(18)` |
| Large radius `26px` | hero cards | `BorderRadius.circular(26)` |
| Typeface | Inter/system, Noto Sans Bengali fallback | Inter/Noto Sans Bengali font family if licensed/bundled later |
| Spacing unit | 4px | 4 logical pixels |

## Screen parity checklist

| Web | Flutter counterpart | Current web status |
|---|---|---|
| `/` | Home tab with hero / category chips / cards | Patch 01 visual foundation |
| `/shop` | Discover/search/filter screen | Patch 01 local data UI |
| `/product/[slug]` | Product detail route, swipe gallery later | Patch 01 simple view |
| `/cart` and sheet | Cart tab, quantity & summary | Patch 01 browser-local UI |
| `/wishlist` | Wishlist tab | Patch 01 browser-local UI |
| Country/locale selection | Settings / top region picker | Patch 01 BDT/USD & partial BN |
| Account | Auth / profile tabs | Not implemented |
| Checkout | Delivery, review, payment | Not implemented |
| Orders/tracking | Account orders and tracking route | Not implemented |

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
