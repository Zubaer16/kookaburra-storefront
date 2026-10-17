# Kookaburra Storefront

A responsive, single-vendor, multi-category e-commerce storefront built with Next.js, TypeScript, Tailwind CSS and customizable shadcn/ui-style components. The interface is **English-only** and supports browsing in Bangladesh (BDT) and an international (USD) market view. The web design provides the reference for a future Flutter app.

## Requirements

- Node.js 24 LTS (`.nvmrc`; run `nvm use 24` with NVM for Windows)
- npm

## Quick start

```powershell
npm ci
npm run dev
```

Open <http://localhost:3000>.

## Validation

```powershell
npm run verify
npm run typecheck
npm run lint
npm run build
npm audit --omit=dev
```

Alternatively, `npm run check` runs structural verification, TypeScript, ESLint and the Next.js production build.

## Current features

- Responsive homepage, product discovery, category navigation, search, filters, sort, and product pages.
- Image galleries and configurable sample size/color variants.
- Browser-persisted wishlist and variant-aware shopping cart.
- Address, delivery and order-review interface with Bangladesh/international market selection.
- Customer account, sample orders and shipment-tracking interface designs.
- Accessible navigation, loading/empty/error states and mobile layouts.
- English-only copy; BDT and USD are separate sample prices, **not foreign-exchange conversions**.

## Current limitations

The product catalog, prices, availability, delivery estimates, orders and tracking are illustrative. Sign-in/sign-up submissions, order placement and payments are intentionally disabled. Nothing here constitutes an authenticated customer account, confirmed inventory, actual delivery quote or a successful transaction.

**Payment plan:** Stripe **test mode** is selected for future integration, not activated in this frontend. A secure backend must create Checkout Sessions, validate prices/stock and verify Stripe webhooks before any payment flow is enabled. See [Payment Integration](docs/PAYMENTS.md).

## Structure

```text
app/               Next.js App Router screens, loading UI and metadata
components/        Shared UI, storefront, checkout and account components
lib/               Catalog fixtures, preview logic, API contracts and helpers
stores/            Browser-only shopping preferences and cart/wishlist state
public/            Product artwork and site icon
design/            Web/Flutter design token contract
docs/              Architecture, payment plan, QA and Flutter parity
scripts/           Project verification
```

## Architecture & rollout

This repository contains the **customer web frontend only**. The planned independent commerce API, database, admin dashboard and Flutter client are separate deliverables. Browser cart totals are never payment authority; the future backend must own customer sessions, quotes, inventory, order creation, tax/shipping and payment state.

- [Architecture](docs/ARCHITECTURE.md)
- [Payment Integration](docs/PAYMENTS.md)
- [Flutter Design Parity](docs/FLUTTER_PARITY.md)
- [Frontend QA & Release Criteria](docs/FRONTEND_RELEASE_GATE.md)

## Environment

Copy `.env.example` to `.env.local` only when needed. No API or Stripe keys are required for the local UI preview. Never commit `.env.local` or secret payment credentials.

The storefront is not approved for production transactions until its independent backend, payment processing, authorization and operational checks have been implemented and tested.
