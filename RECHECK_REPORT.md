# Recheck Report (senior review pass)

Fixed in this pass (17):
1. Images were referenced as `/src/assets/images/...` strings -> 404 in production (Netlify). Moved to `public/images/` (compressed 3.2 MB -> 0.6 MB) and updated all paths.
2. Existing Firestore documents that already store the old image path are mapped to `/images/...` at runtime (CmsContext `fixAssetPaths`).
3. `npm run build` also produced `dist/server.cjs` (+ sourcemap), which Netlify published publicly. Netlify now runs `npx vite build`.
4. Enquiry IDs had only 9000 combinations; collisions make Firestore reject the submit. Now 8 random base-36 chars.
5. Contact form limits did not match Firestore rules (name >= 2, message >= 5, max lengths). Inputs now enforce them; values are trimmed/clamped.
6. Admin login re-seeded demo content into any collection that was emptied. Seeding now runs once (`siteContent/seedMeta`).
7. Real-looking bank account / UPI / IFSC were still hardcoded in source (previous audit claimed removal). Removed; values come only from Firestore payment settings.
8. Demo invoice fallbacks (`SKC/...` client ref, hardcoded support email) removed.
9. Login error message was wiped by the auth-state listener after sign-out. Fixed.
10. Raw Firebase error text was shown to users. Replaced with friendly messages.
11. index.html JSON-LD contained invented logo/social URLs and a different domain. Removed/corrected.
12. Added favicon, theme-color, noscript fallback.
13. `window.open(..., '_blank')` without noopener (3 places) fixed.
14. Privacy policy domain aligned with CMS default (anivexsolution.in).
15. Garbled characters in vite.config.ts comment fixed.
16. netlify.toml: Node 22 pinned, security headers, asset caching; duplicate `_redirects` removed.
17. AUDIT_REPORT.md contained claims that were not true; superseded by this file.

Not changed - please review:
- package.json: `vite` listed twice, `@types/react` / `@types/react-dom` missing (only affects `npm run lint`), project has `bun.lock` but no `package-lock.json`. Left alone to avoid lockfile drift; run `npm install` locally and commit `package-lock.json`.
- `server.ts` `/api/contact` is unused (frontend writes to Firestore) and does not run on Netlify.
- `paymentSettings` is publicly readable by design (bank account number is visible on the site).
- No anti-spam / rate limit on public enquiries (consider Firebase App Check).
- Placeholder product URLs (`https://anivex.com/products/policyhub`) and generic social links in seed data.
- Firebase Console: add your Netlify domain under Authentication -> Authorized domains; restrict the API key.
- Build was NOT run here (no network for npm install). Syntax check: 0 syntax errors.
