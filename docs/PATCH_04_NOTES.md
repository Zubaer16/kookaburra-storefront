# Kookaburra Storefront · Patch 04 — Checkout UI and Delivery Preview

**Exact source baseline:** `kookaburra-storefront-full-20261017-133315.zip` (76 files, includes Patch 03). This is a root overlay with full changed/new files only.

## Included

- `/checkout` address → delivery → order review UI (responsive).
- Bangladesh/BDT and international/USD region selector (globally matches header). Changing region clears unsaved form details and resets delivery selection.
- Required address fields with browser/native validation; no address or phone saved to Zustand/localStorage, backend, URL, or analytics in this patch. **Use sample personal data.**
- Example standard/priority delivery radio options and sample charges; disclaimers on each stage and summary; no implied international delivery eligibility.
- Variant- and aggregate-stock-aware checkout guard; `/cart` links to checkout UI only for valid demo cart.
- Preview-only order summary; payment/real order action explicitly disabled, no success screen.
- Shared Flutter screen mapping and future server-authoritative quote/order/payment contract.
- `PROJECT_PROGRESS.md` for continuing from just the latest full ZIP in future chats.
- Corrected prior Patch 02 and Patch 03 offline verifiers to accept the existing single-quoted TypeScript source. They previously reported false failures without real code errors.

## Not included

- Real order submission, payment details, shipping or tax calculation, saved addresses, backend authentication, dynamic availability, server pricing, customer account, Flutter source app.
- No change to dependencies, lockfile, persisted Zustand storage key, existing products/variants, design tokens or Patch 03 cart.

## Install on Windows PowerShell

From `C:\Users\zubaer.ahmed\Desktop\git\kookaburra-storefront`:

```powershell
tar -xzf "C:\Users\zubaer.ahmed\Downloads\kookaburra-storefront-patch-04.tar.gz" -C .
node scripts/verify-patch02.mjs
node scripts/verify-patch03.mjs
node scripts/verify-patch04.mjs
npm run check
npm audit --omit=dev
npm run dev
```

No `npm install` needed if Patch 03 was already working. Node.js **24.x** is recommended by the existing project.

## Manual QA

1. `/cart` with no items: no checkout CTA. Add a non-variant product: checkout preview link appears.
2. `/checkout`: empty cart shows block; valid cart loads 3-step flow.
3. Provide *fake* required Bangladesh address details; empty field or malformed email blocks Continue. Review and edit address without losing the current values.
4. Switch Bangladesh ⇄ International; address state and delivery reset, currency changes correctly. International country is explicitly selected from sample options; no actual shipping promise.
5. Choose standard and priority; illustrative fees change summary. Review step lists SKU variant selection and quantity; no payment/action can submit an order.
6. Add same sneaker in two sizes; both are distinct order-review lines. In browser devtools, emulate 375px / 768px / 1280px.
7. If a saved legacy line has an invalid/missing size, or if a tampered/stale persisted line exceeds stock, checkout must block with a return-to-cart message.
8. Confirm entered demo address is not saved in localStorage after navigating away or refreshing.

## Verification disclosure

Source-level syntax, local import resolution, structural/fixture tests and patch extraction can be run offline. A full Next.js build must be run on the user's Node 24 environment because this container lacks the existing npm dependencies.
