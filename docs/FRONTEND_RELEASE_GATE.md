# Kookaburra Web Frontend — Release / Design-Freeze Checklist

Status: **PENDING USER TESTING & APPROVAL**. This release gate is distinct from backend readiness.

## Automated checks (record command output)

- [ ] Node 24: `node -v`
- [ ] `npm run check` — structural tests, UX tests, TypeScript, ESLint and production build
- [ ] `node scripts/verify-patch10.mjs` — preview metadata/accessibility safety guardrails
- [ ] `npm audit --omit=dev` — assess every nonzero advisory, no `--force`
- [ ] `git status` reviewed and latest source committed

## Actual browser QA — mark each pass/fail

- [ ] At 320px, 375px, 390px, 428px, 768px, 1024px, 1440px no horizontal overflow, clipping or blocked controls.
- [ ] Keyboard-only: skip link; header menus; mobile filters/Escape/focus return; collection tabs arrow/Home/End; product variants; cart controls; checkout steps; account preview navigation.
- [ ] Screen reader: exactly one main landmark; proper dialog focus trap; useful image labels; grouped selectors and spoken selected state; polite status updates.
- [ ] 200% zoom / Bangla long labels / 200% font scaling / reduced-motion OS setting.
- [ ] All image paths load; category/search/filter URL, wishlist and variant cart persist across refresh.
- [ ] Bangladesh and international preview totals visually show **indicative** data; no transaction can be executed.
- [ ] `/sign-in` and `/sign-up` do not accept credentials or claim a live session; sample orders clearly identified as fictional.
- [ ] `robots.txt` blocks crawling, metadata is noindex, preview-only manifest works; no fabricated live structured product data or canonical host.
- [ ] No real orders, payments, logins, account data storage or outbound API requests.
- [ ] Desktop / mobile visual design approved; Flutter design-token and screen-state mapping reviewed.

## Do not confuse frontend design completion with launch readiness

- API integration, server-side price/stock authority, user authorization, payment gateway, logistics eligibility, production localization/SEO/legal content and Flutter app are not part of this frontend design preview.
- Do not call this _production-ready_ before backend and deployment work. Do not start backend until user explicitly approves the frontend phase.

QA owner: ********\_\_******** Date: ******\_****** Signoff: ********\_\_********
