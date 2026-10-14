# Kookaburra Storefront — Patch 03 (Shopping Experience)

**Based exactly on:** `kookaburra-storefront-full-20261014-193351.zip`, which already includes Patch 02.

## New functionality
- Product detail image gallery with accessible thumbnail/previous/next controls. Distinct supplementary SVG illustrations on T-shirt, sneaker and loafer; other products correctly display one image.
- Demo product variant matrix for canvas tote (colors), T-shirt (size/color), sneakers and loafers (size/color). Each combination has a distinct ID/SKU and its own example stock quantity.
- Variant selectors show unavailable combinations as disabled, require selection before adding, and display variant-level stock and SKU.
- Cart line identity uses `productId + variantId`, allowing the same shoe in multiple sizes. Cart drawer and full cart show chosen options and quantity limits.
- Existing localStorage key `kookaburra-storefront-preview-v1` **unchanged**. Old saved cart lines without a now-required variant stay visible and removable; they're excluded from subtotal until the shopper selects new options on the product page. We intentionally do **not** guess a shoe size.
- Product cards open "Choose options" for variable products instead of silently adding a default variant.
- Shop filters serialize to shareable URLs (`q`, `category`, `tag`, `sort`, `price`, `stock`) without resetting the search input; `category=style` includes fashion and footwear.
- Corrected homepage Style & Shoes collection and footer New Arrivals links.

## Not in this patch
- **No production commerce transactions:** prices and stock are local fixtures; checkout intentionally remains disabled. No payment, customer auth, backend API, real shipping rates, taxes or server stock reservation yet.
- **No actual Flutter app:** `FLUTTER_PARITY.md` extends shared interaction specifications. Flutter will be written with native widgets against the future REST API.
- Full-site Bangla translation is still partial and needs a dedicated localization pass.
- Image illustration colors may not visually match option names; real SKU images will replace examples.

## Windows PowerShell (run inside repository root)

```powershell
tar -xzf "C:\Users\zubaer.ahmed\Downloads\kookaburra-storefront-patch-03.tar.gz" -C .
node scripts/verify-patch03.mjs
npm run check
npm audit --omit=dev
npm run dev
```

`package.json`, `package-lock.json`, dependency versions and Node 24 recommendation are unchanged. No `npm install` is required if Patch 02 is already installed.

## Manual acceptance tests
1. Product `/product/motion-everyday-sneaker`: choose White/Stone and EU size; separate combinations appear as separate cart lines.
2. `/product/daybreak-cotton-tee`: switch image thumbnails and select size/color; verify Add disabled without options.
3. On mobile widths (375px, 768px), test gallery, option chips, quantity controls, drawer/cart and wishlist.
4. Persist variant cart across refresh and BDT/USD switching. Verify subtotal updates locally.
5. Any variant selected up to its fixture stock cannot increase further.
6. If existing browser storage contains an old variant-less cart line, ensure warning and remove action work without data loss.
7. `/shop?category=style`, `/shop?tag=new` and `/shop?price=1&stock=1` display expected items. Change filter and reload the link; selection should persist via URL.
8. Run `npm run check` and `npm audit --omit=dev` on Node 24. Remaining dev-only `braces` audit advisory is tracked separately.
