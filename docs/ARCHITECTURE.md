# Kookaburra v2 · Patch 01 Architecture

## Goals

- A **single company** owns every listed product. No seller registrations, vendor payouts, or marketplace commissions.
- One multi-category storefront with Bangladesh + international market support.
- Build the mobile-web UX first; re-create approved patterns as **native Flutter widgets**, not wrapped Next.js pages.
- Future dedicated NestJS backend, PostgreSQL/Prisma, REST/OpenAPI, staff admin app and separately maintained Flutter app.

## Current application

Next.js App Router renders pages; client-side Zustand provides only temporary shopping UX. The catalog is local read-only fixture data in `lib/catalog.ts`. URL paths `/shop?q=...`, `/shop?category=...`, `/shop?tag=sale` work with local filtering. Prices have explicit sample BDT/USD values; no inferred FX or fake shipment quote.

`design/design-tokens.json` is authoritative for shared style across Web and Flutter. `app/globals.css` maps brand tokens to Tailwind CSS v4; UI building blocks live under `components/ui`. `components.json` supports future official shadcn/ui CLI components. Radix Dialog backs the Sheet component.

## Next production phases

1. Product discovery: dynamic server-side catalog API; pagination; categories/brands and variant-aware product cards; server/cache boundaries.
2. Backend contract: OpenAPI with `/api/v1`, validated DTOs, retryable requests and typed client; this Next.js app must not embed backend business rules.
3. Identity: secure backend-managed sessions for web; mobile auth refresh strategy; customer profiles, addresses, wishlist sync and account.
4. Cart/checkout: server-side authoritative prices, regional pricing, inventory reservation, signed payment webhooks and idempotency. Never trust price/identity from browser storage.
5. Market configuration: country eligibility, currency rules, language translations, shipping zones and destination-specific taxation.
6. SEO, legal content, performance budgets, accessibility audits and automated browser tests ahead of launch.

## Security guardrails already chosen

Checkout in Patch 01 is disabled. There's no payment form and no secret keys. No production auth tokens, orders or private customer data are stored in Zustand. Metadata is noindex for preview. Do not treat the sample product ids, prices or stock numbers as inventory truth.
