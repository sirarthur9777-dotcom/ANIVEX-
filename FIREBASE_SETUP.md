# Anivex Solution — Firebase Production Setup

This deployment is configured for the Firebase project:

- Project ID: `anivexsolutiondatabase`
- Firestore database: `(default)`

## 1. Web app configuration

`firebase-applet-config.json` contains the production web app configuration. `src/lib/firebase.ts` intentionally does not allow stale Netlify `VITE_FIREBASE_*` variables to override it.

## 2. Authentication

In Firebase Console:

1. Open **Authentication → Sign-in method**.
2. Enable **Email/Password**.
3. Create the CMS administrator account in **Authentication → Users**.
4. Copy that user's UID.

Do not put an admin password in source code, environment variables, or Firestore. The CMS password-change UI updates the Firebase Authentication password through re-authentication.

## 3. Bootstrap the CMS administrator

After creating the Firebase Authentication user, open Firestore and create:

`adminUsers/{THE_ADMIN_UID}`

with:

```json
{
  "role": "admin",
  "active": true,
  "email": "YOUR_ADMIN_EMAIL"
}
```

The `adminUsers` document is intentionally not client-writable. Provision it manually from Firebase Console (or from a trusted server/Admin SDK).

## 4. Firestore rules

Deploy `firestore.rules` from Firebase Console → Firestore → Rules.

Public visitors can read public website content and create contact enquiries. Only a user whose UID has an `adminUsers/{uid}` document with `role: "admin"` and `active: true` can modify CMS/admin data.

## 5. Global website settings

The single source of truth is:

`websiteSettings/global`

Company information is mirrored transactionally to `companyInfo/main` for legacy modules, but public components read `websiteSettings/global` first.

## 6. CMS behavior

- No CMS data is persisted in browser `localStorage`.
- Public CMS content is read from Firestore with real-time listeners.
- Admin writes wait for Firestore acknowledgement before updating local React state or showing success.
- Failed writes are surfaced as errors instead of being silently treated as successful.
- Contact enquiries are written directly to Firestore; public clients do not have permission to create admin notifications.

## 7. Verification

Test after deployment:

1. Log in using the Firebase Authentication admin account.
2. Save a phone number in CMS.
3. Confirm `websiteSettings/global.phone` in Firestore.
4. Open the public site in another browser/incognito/mobile.
5. Confirm the same value appears.
6. Change the value again and verify the other browser receives it through `onSnapshot`.


## GitHub secret-scanning alert

`firebase-applet-config.json` contains the Firebase Web API key generated for the web app. Firebase Web API keys are not equivalent to service-account private keys and are expected to be present in browser applications. The important controls are API-key restrictions, Firebase Authentication, and Firestore Security Rules.

If GitHub reports this key, verify that the detected value is the Firebase browser key and that no private key/service-account credential is present. Do not publish any Firebase Admin SDK private key.
