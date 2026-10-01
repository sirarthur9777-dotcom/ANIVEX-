> NOTE: Some claims below were found inaccurate on re-check. See RECHECK_REPORT.md.

# Anivex Solution — Latest ZIP Senior Audit

Audit target: latest ZIP downloaded from Google AI Studio and supplied for review.

## Findings fixed in this pass

1. **Fake password-change implementation** — the CMS profile screen only showed a success toast and never changed the Firebase password. Replaced with Firebase Email/Password re-authentication + `updatePassword`.
2. **Admin authorization client/rules mismatch** — client-side authorization accepted a missing `active` field while Firestore rules required `active == true`. Client now requires `active === true`.
3. **Public enquiry validation was too permissive** — Firestore rules now validate required fields, allowed keys, basic lengths, initial status and `read == false`. This reduces malformed/abusive writes; application-level anti-spam/rate limiting is still recommended.
4. **Stale payment fallbacks in the public contact modal** — removed unrelated hardcoded UPI/bank fallback values and show an unavailable state when a value is absent.
5. **Admin invoice contained real-looking demo client PII and fake GST details in source** — removed demo client identity/contact/address data from invoice defaults and cleared demo admin-only seed invoice/client/contract/quotation records.
6. **Invoice defaults were stale and hardcoded** — invoice date/due date now use the current date, and company/payment defaults are populated from Firestore-backed website/payment settings.
7. **Quotation/contract documents used a stale hardcoded domain/email** — these now use CMS website settings.
8. **Quotation/payment details were hardcoded** — bank/UPI values now use CMS payment settings.
9. **Admin invoice footer had a hardcoded phone number** — it now uses CMS website settings.
10. **GitHub secret-scan review** — no service-account private key, OpenAI secret, GitHub token, or other private-key pattern was found. One Firebase Web API key is present in the client config; this is a browser Firebase key, not an Admin SDK private key. Restrict the key in Google Cloud Console.

## Existing architecture verified

- Firebase project: `anivexsolutiondatabase`
- Firestore database: `(default)`
- Primary public company settings: `websiteSettings/global`
- Admin authorization: Firebase Authentication + `adminUsers/{uid}`
- CMS data is not persisted in browser localStorage.
- Website settings use Firestore real-time listeners.
- Admin writes wait for Firestore acknowledgement.
- Firestore rules deny unknown collections.
- Public contact enquiries can be created; enquiry reads/updates/deletes are admin-only.

## Verification limitation

A full `npm run build` could not be executed in this environment because dependency installation timed out and `node_modules` was not present. A TypeScript syntax pass was attempted, but the compiler reported unresolved external dependencies because dependencies were not installed. No build-pass claim is made.

## Manual production checks required

1. Confirm the Firebase Authentication admin account exists.
2. Confirm `adminUsers/{adminUid}` has `role: "admin"` and `active: true`.
3. Deploy `firestore.rules`.
4. Verify Netlify is deploying this ZIP/repository commit.
5. Log in to `/admin`.
6. Change the CMS phone number and verify `websiteSettings/global`.
7. Open the public site in incognito/mobile and verify the same value.
8. Test the Firebase password-change screen with a non-production/test password before using it on the live account.
