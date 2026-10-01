import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { isAdminUser } from '../lib/adminAuthorization';

interface AdminAuthContextType {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  authError: string | null;
  adminEmail: string;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [adminEmail, setAdminEmail] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setIsLoading(true);

      if (!currentUser || currentUser.isAnonymous) {
        setUser(null);
        setIsAdmin(false);
        setAdminEmail('');
        setIsLoading(false);
        return;
      }

      const authorized = await isAdminUser(currentUser);
      if (!authorized) {
        setUser(null);
        setIsAdmin(false);
        setAdminEmail('');
        await signOut(auth).catch(() => undefined);
        setAuthError('This Firebase account is not authorized for the Anivex CMS.');
        setIsLoading(false);
        return;
      }

      setAuthError(null);
      setUser(currentUser);
      setIsAdmin(true);
      setAdminEmail(currentUser.email || '');
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (rawEmail: string, pass: string): Promise<boolean> => {
    setAuthError(null);
    setIsLoading(true);

    const email = rawEmail.trim().toLowerCase();
    if (!email || !email.includes('@') || !pass) {
      setAuthError('Enter your Firebase admin email and password.');
      setIsLoading(false);
      return false;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      const authorized = await isAdminUser(result.user);

      if (!authorized) {
        await signOut(auth).catch(() => undefined);
        setAuthError('Login succeeded, but this Firebase account is not authorized as a CMS administrator.');
        setIsLoading(false);
        return false;
      }

      setUser(result.user);
      setIsAdmin(true);
      setAdminEmail(result.user.email || email);
      setIsLoading(false);
      return true;
    } catch (error: any) {
      const code: string = error?.code || '';
      if (code === 'auth/too-many-requests') {
        setAuthError('Too many failed attempts. Please wait a few minutes and try again.');
      } else if (code === 'auth/network-request-failed') {
        setAuthError('Network error. Check your internet connection and try again.');
      } else if (code === 'auth/user-disabled') {
        setAuthError('This account has been disabled.');
      } else {
        setAuthError('Invalid email or password.');
      }
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    await signOut(auth).catch((error) => console.warn('Sign out warning:', error));
    setUser(null);
    setIsAdmin(false);
    setAdminEmail('');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAdmin,
        isLoading,
        authError,
        adminEmail,
        login,
        logout,
        clearError: () => setAuthError(null),
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  return context;
};
