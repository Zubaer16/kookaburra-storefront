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
