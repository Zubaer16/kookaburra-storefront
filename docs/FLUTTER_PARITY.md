# Web and Flutter Design Parity

The mobile app will be a **native Flutter application** using the web storefront's approved information architecture, colors, typography, components and business flows as its design reference. Flutter will not embed Next.js pages or consume client-only Zustand state.

| Web screen          | Flutter counterpart          | Shared behavior                                              |
| ------------------- | ---------------------------- | ------------------------------------------------------------ |
| Home                | Home tab                     | Hero, category entry points, featured collections            |
| Categories and Shop | Discover, categories, search | Filters, sorting, no-results and saved queries               |
| Product details     | Product detail route         | Gallery, explicit size/color choices, stock feedback         |
| Cart and Wishlist   | Cart and saved items         | Distinct cart lines per product/variant, safe local previews |
| Checkout            | Address, Delivery, Review    | Same steps, validations and country-aware messaging          |
| Account             | Account tab                  | Signed-out/loading/authorized states                         |
| Orders and Tracking | Order detail and timeline    | Accessible event ordering and reliable backend status        |
| Market selection    | Market preference            | Bangladesh/BDT and International/USD; English-only UI        |

## Shared design system

Use `design/design-tokens.json` for color, spacing, radii, type scale and elevation guidance. Implement native Flutter semantics, navigation, focus and gestures rather than replicating DOM/React implementation details. Ensure accessible controls and minimum suitable touch sizes.

## Data and security parity

Web and Flutter must use the same independent backend contracts for product IDs, variant IDs, currency amounts, inventory, customer sessions, addresses, orders and payments. Both clients must treat example prices and local carts as **non-authoritative**. Checkout and Stripe test-mode sessions cannot become active until the backend securely implements them.

## Release expectations

Test both phone-size and tablet/desktop layouts, loading, empty, errors, disabled states, screen reader names, international currency display and account authorization. The Flutter app is a future deliverable; no Flutter source code is included here.
