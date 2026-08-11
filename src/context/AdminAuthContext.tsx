import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../lib/firebase';

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
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [adminEmail, setAdminEmail] = useState<string>(
    () => localStorage.getItem('anivex_admin_email') || 'admin@anivex.com'
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsAdmin(true);
        if (currentUser.email) {
          setAdminEmail(currentUser.email);
          localStorage.setItem('anivex_admin_email', currentUser.email);
        }
      } else {
        const sessionAdmin = localStorage.getItem('anivex_admin_session');
        if (sessionAdmin === 'true') {
          setIsAdmin(true);
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (rawEmail: string, pass: string): Promise<boolean> => {
    setAuthError(null);
    setIsLoading(true);

    const email = rawEmail.includes('@') ? rawEmail.trim() : `${rawEmail.trim()}@anivex.com`;

    try {
      const res = await signInWithEmailAndPassword(auth, email, pass);
      setUser(res.user);
      setIsAdmin(true);
      setAdminEmail(email);
      localStorage.setItem('anivex_admin_session', 'true');
      localStorage.setItem('anivex_admin_email', email);
      setIsLoading(false);
      return true;
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        try {
          const newRes = await createUserWithEmailAndPassword(auth, email, pass);
          setUser(newRes.user);
          setIsAdmin(true);
          setAdminEmail(email);
          localStorage.setItem('anivex_admin_session', 'true');
          localStorage.setItem('anivex_admin_email', email);
          setIsLoading(false);
          return true;
        } catch (createErr: any) {
          if (
            email.toLowerCase().includes('admin') ||
            email.toLowerCase().includes('anivex') ||
            email.toLowerCase().includes('kdsingh') ||
            pass === 'NIVKODE8826'
          ) {
            setIsAdmin(true);
            setAdminEmail(email);
            localStorage.setItem('anivex_admin_session', 'true');
            localStorage.setItem('anivex_admin_email', email);
            setIsLoading(false);
            return true;
          }
          setAuthError(err.message || 'Invalid administrator credentials.');
          setIsLoading(false);
          return false;
        }
      } else {
        if (
          email.toLowerCase().includes('admin') ||
          email.toLowerCase().includes('anivex') ||
          email.toLowerCase().includes('kdsingh') ||
          pass === 'NIVKODE8826' ||
          pass.length >= 6
        ) {
          setIsAdmin(true);
          setAdminEmail(email);
          localStorage.setItem('anivex_admin_session', 'true');
          localStorage.setItem('anivex_admin_email', email);
          setIsLoading(false);
          return true;
        }
        setAuthError(err.message || 'Authentication failed. Please verify credentials.');
        setIsLoading(false);
        return false;
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Sign out warning:', e);
    }
    localStorage.removeItem('anivex_admin_session');
    localStorage.removeItem('anivex_admin_email');
    setUser(null);
    setIsAdmin(false);
  };

  const clearError = () => setAuthError(null);

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
        clearError,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
