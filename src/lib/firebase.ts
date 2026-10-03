/// <reference types="vite/client" />
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import appletConfig from '../../firebase-applet-config.json';

// Production Firebase configuration for Anivex Solution.
// Supports both Vite/Netlify environment variables and checked-in appletConfig fallback.
const firebaseConfig = {
  apiKey: (import.meta.env.VITE_FIREBASE_API_KEY as string) || appletConfig.apiKey,
  authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string) || appletConfig.authDomain,
  projectId: (import.meta.env.VITE_FIREBASE_PROJECT_ID as string) || appletConfig.projectId,
  storageBucket: (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string) || appletConfig.storageBucket,
  messagingSenderId: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string) || appletConfig.messagingSenderId,
  appId: (import.meta.env.VITE_FIREBASE_APP_ID as string) || appletConfig.appId,
  measurementId: (import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string) || appletConfig.measurementId,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// This project uses Firestore's default database.
const databaseId = ((appletConfig as any).firestoreDatabaseId || '(default)').trim();

export const auth = getAuth(app);
export const db = databaseId !== '(default)' ? getFirestore(app, databaseId) : getFirestore(app);
export default app;
