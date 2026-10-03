import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from './firebase';

const BOOTSTRAPPED_ADMIN_EMAILS = [
  'sirarthur9777@gmail.com',
  'kdsingh9777@gmail.com',
];

/**
 * Validates whether the authenticated Firebase user has an active 'admin'
 * role record in the 'adminUsers' Firestore collection, or is one of the designated
 * project owners (bootstrapped admins).
 */
export async function isAdminUser(user: User | null): Promise<boolean> {
  if (!user || user.isAnonymous) return false;

  const email = (user.email || '').toLowerCase().trim();
  const isDesignatedOwner = BOOTSTRAPPED_ADMIN_EMAILS.includes(email);

  try {
    const userRef = doc(db, 'adminUsers', user.uid);
    const snap = await getDoc(userRef);

    if (snap.exists()) {
      const data = snap.data() as { role?: string; active?: boolean };
      if (data.role === 'admin' && data.active === true) {
        return true;
      }
    }

    // If designated owner, auto-provision the admin record if missing
    if (isDesignatedOwner) {
      try {
        await setDoc(userRef, {
          role: 'admin',
          active: true,
          email: user.email,
          updatedAt: new Date().toISOString(),
        }, { merge: true });
        return true;
      } catch (provisionErr) {
        console.warn('Notice during owner admin provisioning:', provisionErr);
        // Still grant access because user is verified designated owner
        return true;
      }
    }

    return false;
  } catch (error) {
    console.warn('Admin authorization verification notice:', error);
    if (isDesignatedOwner) {
      return true;
    }
    return false;
  }
}

/**
 * Asserts that the current user has verified administrator authorization.
 * Throws an error if authentication or authorization fails.
 */
export async function requireAdminUser(user: User | null): Promise<void> {
  if (!user || user.isAnonymous) {
    throw new Error('Authentication required.');
  }

  const authorized = await isAdminUser(user);
  if (!authorized) {
    throw new Error('Access denied: administrative privileges required.');
  }
}

