<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/45b96767-c964-4579-a356-8b38ecbb9c41

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Production data architecture

CMS-managed data is persisted in Cloud Firestore. Browser localStorage is not used as the CMS source of truth. Public content uses Firestore listeners; admin mutations wait for Firestore acknowledgement. Admin authorization is controlled by Firebase Authentication plus an `adminUsers/{uid}` authorization document.


## Security notes

- Firebase Web API keys used by browser apps are client identifiers, not service-account private keys. Keep Firestore Security Rules and Authentication as the actual authorization boundary.
- This repository contains the Firebase Web app configuration for the `anivexsolutiondatabase` project. Restrict the Google API key in Google Cloud Console to the APIs required by this Firebase web app.
- Never commit Firebase service-account JSON files, private keys, Gemini API keys, OAuth client secrets, GitHub tokens, or passwords.
- The CMS password-change screen uses Firebase Email/Password re-authentication and `updatePassword`; it does not store or simulate passwords in Firestore/local state.
