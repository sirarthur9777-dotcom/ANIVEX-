/// <reference types="vite/client" />
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import appletConfig from '../../firebase-applet-config.json';

// Production Firebase configuration for Anivex Solution.
// Prioritizes provisioned appletConfig to guarantee projectId and firestoreDatabaseId stay in sync.
const firebaseConfig = {
  apiKey: appletConfig.apiKey || (import.meta.env.VITE_FIREBASE_API_KEY as string),
  authDomain: appletConfig.authDomain || (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string),
  projectId: appletConfig.projectId || (import.meta.env.VITE_FIREBASE_PROJECT_ID as string),
  storageBucket: appletConfig.storageBucket || (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string),
  messagingSenderId: appletConfig.messagingSenderId || (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string),
  appId: appletConfig.appId || (import.meta.env.VITE_FIREBASE_APP_ID as string),
  measurementId: appletConfig.measurementId || (import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string),
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// This project uses Firestore's default database.
const databaseId = ((appletConfig as any).firestoreDatabaseId || '(default)').trim();

export const auth = getAuth(app);
export const db = databaseId !== '(default)' ? getFirestore(app, databaseId) : getFirestore(app);
export default app;
