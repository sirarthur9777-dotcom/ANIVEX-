import { doc, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from './firebase';

/**
 * Client-side convenience check. Firestore Security Rules remain the final
 * authority for every write/read; this only controls whether the CMS UI opens.
 */
export async function isAdminUser(user: User | null): Promise<boolean> {
  if (!user || user.isAnonymous) return false;

  try {
    const snap = await getDoc(doc(db, 'adminUsers', user.uid));
    if (!snap.exists()) return false;

    const data = snap.data() as { role?: string; active?: boolean };
    return data.role === 'admin' && data.active !== false;
  } catch (error) {
    console.error('Admin authorization check failed:', error);
    return false;
  }
}

export async function requireAdminUser(user: User | null): Promise<void> {
  if (!(await isAdminUser(user))) {
    throw new Error('Your Firebase account is authenticated but is not authorized as an Anivex CMS administrator.');
  }
}
