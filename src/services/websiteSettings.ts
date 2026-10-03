import { doc, getDoc, onSnapshot, serverTimestamp, writeBatch } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db, auth } from '../lib/firebase';
import { requireAdminUser } from '../lib/adminAuthorization';
import { handleFirestoreError, OperationType } from '../lib/firestoreErrors';

export interface WebsiteSettings {
  phone: string;
  whatsapp: string;
  email: string;
  companyName: string;
  tagline: string;
  description: string;
  headquarters: string;
  address: string;
  websiteUrl: string;
  businessHours: string;
  logoUrl?: string;
  updatedAt?: any;
}

export const DEFAULT_WEBSITE_SETTINGS: WebsiteSettings = {
  phone: '7905668826',
  whatsapp: '7905668826',
  email: 'anivexsolution@gmail.com',
  companyName: 'Anivex Solution',
  tagline: 'Technology. Designed for Growth.',
  description:
    'Anivex Solution builds modern websites, enterprise software, ERP systems, mobile applications and intelligent digital solutions for growing businesses.',
  headquarters: 'Lucknow, Uttar Pradesh, India',
  address: 'Lucknow, Uttar Pradesh, India - 226010',
  websiteUrl: 'https://anivexsolution.in',
  businessHours: 'Mon - Sat: 9:00 AM - 7:00 PM IST',
};

const SETTINGS_COLLECTION = 'websiteSettings';
const SETTINGS_DOC_ID = 'global';

export function cleanPhoneNumber(rawPhone: string): string {
  return (rawPhone || '').replace(/[^0-9]/g, '');
}

export function formatWhatsAppUrl(rawPhoneOrWa: string, message = ''): string {
  const digits = cleanPhoneNumber(rawPhoneOrWa);
  const normalized = digits.length === 10 ? `91${digits}` : digits;
  if (!normalized) return '#';
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

export function formatPhoneTel(rawPhone: string): string {
  const digits = cleanPhoneNumber(rawPhone);
  if (!digits) return '#';
  return `tel:+${digits.length === 10 ? `91${digits}` : digits}`;
}

export async function getWebsiteSettings(): Promise<WebsiteSettings> {
  try {
    const snapshot = await getDoc(doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID));
    if (!snapshot.exists()) return DEFAULT_WEBSITE_SETTINGS;
    return { ...DEFAULT_WEBSITE_SETTINGS, ...(snapshot.data() as Partial<WebsiteSettings>) };
  } catch (error) {
    return handleFirestoreError(error, OperationType.GET, `${SETTINGS_COLLECTION}/${SETTINGS_DOC_ID}`);
  }
}

export function subscribeToWebsiteSettings(
  onData: (settings: WebsiteSettings) => void,
  onError?: (error: Error) => void,
): () => void {
  return onSnapshot(
    doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID),
    (snapshot) => {
      onData(snapshot.exists()
        ? { ...DEFAULT_WEBSITE_SETTINGS, ...(snapshot.data() as Partial<WebsiteSettings>) }
        : DEFAULT_WEBSITE_SETTINGS);
    },
    (error) => {
      console.warn('websiteSettings Firestore subscription notice (using defaults):', error?.message);
      onData(DEFAULT_WEBSITE_SETTINGS);
      try {
        handleFirestoreError(error, OperationType.GET, `${SETTINGS_COLLECTION}/${SETTINGS_DOC_ID}`);
      } catch (formattedError) {
        onError?.(formattedError as Error);
      }
    },
  );
}

export async function updateWebsiteSettings(newSettings: Partial<WebsiteSettings>): Promise<void> {
  if (newSettings.phone !== undefined && !newSettings.phone.trim()) {
    throw new Error('Phone number cannot be empty.');
  }
  if (newSettings.email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newSettings.email)) {
    throw new Error('A valid email address is required.');
  }
  if (newSettings.companyName !== undefined && !newSettings.companyName.trim()) {
    throw new Error('Company name cannot be empty.');
  }

  await requireAdminUser(auth.currentUser);

  try {
    const batch = writeBatch(db);
    const websiteRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
    const companyRef = doc(db, 'companyInfo', 'main');

    batch.set(websiteRef, { ...newSettings, updatedAt: serverTimestamp() }, { merge: true });

    const companyPayload: Record<string, unknown> = {
      name: newSettings.companyName,
      phone: newSettings.phone,
      businessEmail: newSettings.email,
      tagline: newSettings.tagline,
      description: newSettings.description,
      headquarters: newSettings.headquarters,
      address: newSettings.address,
      websiteUrl: newSettings.websiteUrl,
      businessHours: newSettings.businessHours,
      logoUrl: newSettings.logoUrl,
      updatedAt: serverTimestamp(),
    };
    Object.keys(companyPayload).forEach((key) => {
      if (companyPayload[key] === undefined) delete companyPayload[key];
    });
    batch.set(companyRef, companyPayload, { merge: true });

    await batch.commit();
  } catch (error) {
    return handleFirestoreError(error, OperationType.WRITE, `${SETTINGS_COLLECTION}/${SETTINGS_DOC_ID}`);
  }
}

export function useWebsiteSettings() {
  const [settings, setSettings] = useState<WebsiteSettings>(DEFAULT_WEBSITE_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => subscribeToWebsiteSettings(
    (data) => {
      setSettings(data);
      setIsLoading(false);
      setError(null);
    },
    (err) => {
      setError(err.message);
      setIsLoading(false);
    },
  ), []);

  return { settings, isLoading, error };
}
