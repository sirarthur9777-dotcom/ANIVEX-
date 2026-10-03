import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  User,
} from 'firebase/auth';
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
  sendPasswordReset: (email: string) => Promise<{ success: boolean; message: string }>;
  clearError: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [adminEmail, setAdminEmail] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setIsLoading(true);

      if (currentUser && !currentUser.isAnonymous) {
        const authorized = await isAdminUser(currentUser);
        if (authorized) {
          setUser(currentUser);
          setIsAdmin(true);
          setAdminEmail(currentUser.email || '');
          setAuthError(null);
        } else {
          setUser(null);
          setIsAdmin(false);
          setAdminEmail('');
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        setAdminEmail('');
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (rawEmail: string, pass: string): Promise<boolean> => {
    setAuthError(null);
    setIsLoading(true);

    const email = rawEmail.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (!email || !cleanPass) {
      setAuthError('Please enter both your administrator email and password.');
      setIsLoading(false);
      return false;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, cleanPass);
      const authorized = await isAdminUser(userCredential.user);

      if (!authorized) {
        await signOut(auth).catch(() => undefined);
        setUser(null);
        setIsAdmin(false);
        setAdminEmail('');
        setAuthError('Access denied: this account is not authorized as an administrator.');
        setIsLoading(false);
        return false;
      }

      setUser(userCredential.user);
      setIsAdmin(true);
      setAdminEmail(userCredential.user.email || email);
      setAuthError(null);
      setIsLoading(false);
      return true;
    } catch (error: any) {
      const code: string = error?.code || '';
      if (code === 'auth/too-many-requests') {
        setAuthError('Too many failed attempts. Please wait a few minutes and try again.');
      } else {
        // Generic response avoids username/email enumeration
        setAuthError('Invalid email or password.');
      }
      setIsLoading(false);
      return false;
    }
  };

  const sendPasswordReset = async (rawEmail: string): Promise<{ success: boolean; message: string }> => {
    const email = rawEmail.trim().toLowerCase();
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Please enter a valid administrator email address.' };
    }

    try {
      await sendPasswordResetEmail(auth, email);
      return {
        success: true,
        message: 'Password reset link has been dispatched to your email address. Please check your Inbox and Spam folders.',
      };
    } catch (error: any) {
      const code = error?.code || '';
      console.warn('Password reset notification notice:', code);
      if (code === 'auth/too-many-requests') {
        return {
          success: false,
          message: 'Too many requests. Please wait a few minutes before trying again.',
        };
      }
      if (code === 'auth/network-request-failed') {
        return {
          success: false,
          message: 'Network error. Please check your connection and try again.',
        };
      }
      // For security (avoid user enumeration)
      return {
        success: true,
        message: 'Password reset link has been dispatched to your email address. Please check your Inbox and Spam folders.',
      };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.warn('Sign out warning:', error);
    }
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
        sendPasswordReset,
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
