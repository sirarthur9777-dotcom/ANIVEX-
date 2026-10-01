/// <reference types="vite/client" />
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import appletConfig from '../../firebase-applet-config.json';

// Production Firebase configuration for Anivex Solution.
// The checked-in applet config is the source of truth so an old Netlify
// environment variable cannot silently connect this deployment to another
// Firebase project. Update firebase-applet-config.json if the project changes.
const firebaseConfig = {
  apiKey: appletConfig.apiKey,
  authDomain: appletConfig.authDomain,
  projectId: appletConfig.projectId,
  storageBucket: appletConfig.storageBucket,
  messagingSenderId: appletConfig.messagingSenderId,
  appId: appletConfig.appId,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// This project uses Firestore's default database.
const databaseId = ((appletConfig as any).firestoreDatabaseId || '(default)').trim();

export const auth = getAuth(app);
export const db = databaseId !== '(default)' ? getFirestore(app, databaseId) : getFirestore(app);
export default app;
