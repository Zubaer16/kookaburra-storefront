# Kookaburra Storefront — Patch 01 Fix (Security & Lint)

## What changed

- Use Node 24 via `.nvmrc` and `package.json` engine range. On Windows `nvm use 24` switches your installed runtime.
- Apply an npm `overrides` entry to resolve all `postcss` dependencies to `8.5.30`. This version is above the versions affected in the reported audit, including Next.js's nested copy. **This needs verification on your own npm install and production build.**
- Fix two `import/no-anonymous-default-export` lint warnings.
- Add optional `npm run audit:prod` and `npm run check` commands.
- Do not upgrade Next.js to 16 or modify React/UI code in this compatibility patch.

## Apply

Extract the tarball at your existing repository root, not inside another folder. Then run:

```powershell
nvm use 24
npm install
npm ls postcss
npm audit --omit=dev
npm audit
npm run check
```

`npm install` updates the existing `package-lock.json`; it is intentionally **not included** in this overlay because it was generated on your machine and this offline environment cannot reach the npm registry. Commit the newly updated lockfile after checking the output.

## Expected / outstanding issues

- `npm audit --omit=dev`: PostCSS issues from your earlier report should disappear if the override resolved correctly. If not, send the updated audit details; do not use `npm audit fix --force`.
- `npm audit` (full dependency tree): the `braces` advisory may remain **in development-time eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces**. As of October 14, 2026, this advisory has no published patched `braces` version. Do not misrepresent this as zero vulnerabilities. Consider replacing/removing the affected development dependency later while preserving Next lint rules.
- The ESLint 9.39.5 deprecation warning during install may remain. This patch fixes the lint *configuration warnings*, not the upstream ESLint support lifecycle.
- This environment cannot execute `npm install` / Next.js production build because it has no npm registry access. Your original build already passed on Windows. After this override, you must confirm it still builds in your local environment.

## Safety

Do not run `npm audit fix --force` automatically: npm proposed a breaking Next.js upgrade and an ESLint config downgrade. Verify all changes before deploying the storefront.
