import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Standard Firebase Applet Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForAppletEnvironment001",
  authDomain: "applet-project.firebaseapp.com",
  projectId: "applet-project",
  storageBucket: "applet-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
};

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firebase Auth & Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
