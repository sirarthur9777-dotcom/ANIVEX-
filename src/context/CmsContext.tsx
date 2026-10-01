import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  writeBatch,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../lib/firebase';
import { isAdminUser } from '../lib/adminAuthorization';
import {
  WebsiteSettings,
  DEFAULT_WEBSITE_SETTINGS,
  updateWebsiteSettings as updateWebsiteSettingsService,
} from '../services/websiteSettings';
import {
  SiteContent, ServiceCMS, ProductCMS, SolutionCMS, ProjectCMS, BuiltByAnivexItem,
  CompanyInfo, PaymentSettings, SocialLinks, ContactEnquiry, AdminNotification,
  AdminActivityLog, MediaItem, InvoiceRecord, TestimonialCMS, FaqCMS, ClientRecord,
  ContractRecord, QuotationRecord,
} from '../types/cms';
import {
  initialSiteContent, initialServices, initialProducts, initialSolutions,
  initialProjects, initialBuiltByAnivex, initialCompanyInfo, initialPaymentSettings,
  initialSocialLinks, initialContactEnquiries, initialNotifications, initialActivityLogs,
  initialMediaItems, initialTestimonials, initialFaqs, initialClients, initialContracts,
  initialQuotations,
} from '../data/initialCmsData';

interface ToastState { type: 'success' | 'error' | 'info'; message: string; }

interface CmsContextType {
  siteContent: SiteContent; services: ServiceCMS[]; products: ProductCMS[];
  solutions: SolutionCMS[]; projects: ProjectCMS[]; builtByAnivex: BuiltByAnivexItem[];
  testimonials: TestimonialCMS[]; faqs: FaqCMS[]; clients: ClientRecord[];
  contracts: ContractRecord[]; quotations: QuotationRecord[]; companyInfo: CompanyInfo;
  websiteSettings: WebsiteSettings; isLoadingSettings: boolean; settingsError: string | null;
  paymentSettings: PaymentSettings; socialLinks: SocialLinks; contactEnquiries: ContactEnquiry[];
  notifications: AdminNotification[]; activityLogs: AdminActivityLog[]; mediaItems: MediaItem[];
  invoices: InvoiceRecord[]; isLoading: boolean; toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  updateWebsiteSettings: (data: Partial<WebsiteSettings>) => Promise<void>;
  updateSiteContent: (data: Partial<SiteContent>) => Promise<void>;
  addService: (data: Omit<ServiceCMS, 'id'>) => Promise<void>;
  updateService: (id: string, data: Partial<ServiceCMS>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  addProduct: (data: Omit<ProductCMS, 'id'>) => Promise<void>;
  updateProduct: (id: string, data: Partial<ProductCMS>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addSolution: (data: Omit<SolutionCMS, 'id'>) => Promise<void>;
  updateSolution: (id: string, data: Partial<SolutionCMS>) => Promise<void>;
  deleteSolution: (id: string) => Promise<void>;
  addProject: (data: Omit<ProjectCMS, 'id'>) => Promise<void>;
  updateProject: (id: string, data: Partial<ProjectCMS>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addBuiltByAnivex: (data: Omit<BuiltByAnivexItem, 'id'>) => Promise<void>;
  updateBuiltByAnivex: (id: string, data: Partial<BuiltByAnivexItem>) => Promise<void>;
  deleteBuiltByAnivex: (id: string) => Promise<void>;
  addTestimonial: (data: Omit<TestimonialCMS, 'id'>) => Promise<void>;
  updateTestimonial: (id: string, data: Partial<TestimonialCMS>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  addFaq: (data: Omit<FaqCMS, 'id'>) => Promise<void>;
  updateFaq: (id: string, data: Partial<FaqCMS>) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;
  addClient: (data: Omit<ClientRecord, 'id' | 'createdAt'>) => Promise<string>;
  updateClient: (id: string, data: Partial<ClientRecord>) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  addContract: (data: Omit<ContractRecord, 'id' | 'createdAt'>) => Promise<string>;
  updateContract: (id: string, data: Partial<ContractRecord>) => Promise<void>;
  deleteContract: (id: string) => Promise<void>;
  addQuotation: (data: Omit<QuotationRecord, 'id' | 'createdAt'>) => Promise<string>;
  updateQuotation: (id: string, data: Partial<QuotationRecord>) => Promise<void>;
  deleteQuotation: (id: string) => Promise<void>;
  updateCompanyInfo: (data: CompanyInfo) => Promise<void>;
  updatePaymentSettings: (data: PaymentSettings) => Promise<void>;
  updateSocialLinks: (data: SocialLinks) => Promise<void>;
  submitContactEnquiry: (data: { fullName: string; email: string; phone?: string; company?: string; projectType: string; budgetRange: string; description: string; }) => Promise<{ success: boolean; message: string; referenceId?: string }>;
  markEnquiryRead: (id: string, read: boolean) => Promise<void>;
  updateEnquiryStatus: (id: string, status: ContactEnquiry['status']) => Promise<void>;
  deleteEnquiry: (id: string) => Promise<void>;
  markNotificationRead: (id: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  addMedia: (data: Omit<MediaItem, 'id'>) => Promise<void>;
  deleteMedia: (id: string) => Promise<void>;
  addInvoice: (data: Omit<InvoiceRecord, 'id' | 'createdAt'>) => Promise<string>;
  updateInvoice: (id: string, data: Partial<InvoiceRecord>) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
  logActivity: (action: string, targetItem: string) => Promise<void>;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

const sortByOrder = <T extends { displayOrder?: number }>(items: T[]) =>
  [...items].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

// Older Firestore documents were seeded with dev-only paths (/src/assets/images/...)
// which do not exist in a production build. Map them to the files in /public/images.
const fixAssetPaths = (value: any): any => {
  if (typeof value === 'string') return value.replace('/src/assets/images/', '/images/');
  if (Array.isArray(value)) return value.map(fixAssetPaths);
  if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
    const out: Record<string, any> = {};
    for (const key of Object.keys(value)) out[key] = fixAssetPaths(value[key]);
    return out;
  }
  return value;
};

const sortByDateDesc = <T extends { createdAt?: string; submittedAt?: string; timestamp?: string }>(items: T[]) =>
  [...items].sort((a, b) => {
    const av = a.createdAt || a.submittedAt || a.timestamp || '';
    const bv = b.createdAt || b.submittedAt || b.timestamp || '';
    return new Date(bv).getTime() - new Date(av).getTime();
  });

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteContent, setSiteContent] = useState(initialSiteContent);
  const [services, setServices] = useState<ServiceCMS[]>(initialServices);
  const [products, setProducts] = useState<ProductCMS[]>(initialProducts);
  const [solutions, setSolutions] = useState<SolutionCMS[]>(initialSolutions);
  const [projects, setProjects] = useState<ProjectCMS[]>(initialProjects);
  const [builtByAnivex, setBuiltByAnivex] = useState<BuiltByAnivexItem[]>(initialBuiltByAnivex);
  const [testimonials, setTestimonials] = useState<TestimonialCMS[]>(initialTestimonials);
  const [faqs, setFaqs] = useState<FaqCMS[]>(initialFaqs);
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [contracts, setContracts] = useState<ContractRecord[]>([]);
  const [quotations, setQuotations] = useState<QuotationRecord[]>([]);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(initialCompanyInfo);
  const [websiteSettings, setWebsiteSettings] = useState<WebsiteSettings>(DEFAULT_WEBSITE_SETTINGS);
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);
  const [settingsError, setSettingsError] = useState<string | null>(null);
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>(initialPaymentSettings);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(initialSocialLinks);
  const [contactEnquiries, setContactEnquiries] = useState<ContactEnquiry[]>([]);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [activityLogs, setActivityLogs] = useState<AdminActivityLog[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(initialMediaItems);
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: ToastState['type'] = 'success') => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const unsubs: Array<() => void> = [];

    const watchDoc = <T,>(collectionName: string, id: string, setter: React.Dispatch<React.SetStateAction<T>>, mapper: (data: any) => T) => {
      unsubs.push(onSnapshot(doc(db, collectionName, id), (snap) => {
        if (snap.exists()) setter(mapper(fixAssetPaths(snap.data())));
      }, (error) => console.warn(`Firestore ${collectionName}/${id} sync:`, error)));
    };

    const watchCollection = <T,>(collectionName: string, setter: React.Dispatch<React.SetStateAction<T[]>>, mapper: (id: string, data: any) => T, sort?: (items: T[]) => T[]) => {
      unsubs.push(onSnapshot(collection(db, collectionName), (snap) => {
        const items = snap.docs.map((d) => mapper(d.id, fixAssetPaths(d.data())));
        setter(sort ? sort(items) : items);
      }, (error) => console.warn(`Firestore ${collectionName} sync:`, error)));
    };

    unsubs.push(onSnapshot(doc(db, 'websiteSettings', 'global'), (snap) => {
      if (snap.exists()) {
        const merged = { ...DEFAULT_WEBSITE_SETTINGS, ...(snap.data() as Partial<WebsiteSettings>) };
        setWebsiteSettings(merged);
        setCompanyInfo({
          name: merged.companyName,
          tagline: merged.tagline,
          description: merged.description,
          businessEmail: merged.email,
          phone: merged.phone,
          headquarters: merged.headquarters,
          address: merged.address,
          websiteUrl: merged.websiteUrl,
          businessHours: merged.businessHours,
          logoUrl: merged.logoUrl,
        });
      }
      setIsLoadingSettings(false);
      setSettingsError(null);
    }, (error) => {
      console.error('Failed to load website settings:', error);
      setSettingsError(error.message || 'Failed to load website settings');
      setIsLoadingSettings(false);
    }));

    watchDoc<PaymentSettings>('paymentSettings', 'main', setPaymentSettings, (data) => data as PaymentSettings);
    watchDoc<SocialLinks>('socialLinks', 'main', setSocialLinks, (data) => data as SocialLinks);
    watchDoc<SiteContent>('siteContent', 'main', setSiteContent, (data) => ({ ...initialSiteContent, ...data }));
    watchCollection<ServiceCMS>('services', setServices, (id, data) => ({ id, ...data } as ServiceCMS), sortByOrder);
    watchCollection<ProductCMS>('products', setProducts, (id, data) => ({ id, ...data } as ProductCMS), sortByOrder);
    watchCollection<SolutionCMS>('solutions', setSolutions, (id, data) => ({ id, ...data } as SolutionCMS), sortByOrder);
    watchCollection<ProjectCMS>('projects', setProjects, (id, data) => ({ id, ...data } as ProjectCMS), sortByOrder);
    watchCollection<BuiltByAnivexItem>('builtByAnivex', setBuiltByAnivex, (id, data) => ({ id, ...data } as BuiltByAnivexItem), sortByOrder);
    watchCollection<TestimonialCMS>('testimonials', setTestimonials, (id, data) => ({ id, ...data } as TestimonialCMS), sortByOrder);
    watchCollection<FaqCMS>('faqs', setFaqs, (id, data) => ({ id, ...data } as FaqCMS), sortByOrder);
    watchCollection<MediaItem>('media', setMediaItems, (id, data) => ({ id, ...data } as MediaItem));

    return () => unsubs.forEach((unsubscribe) => unsubscribe());
  }, []);

  useEffect(() => {
    let adminUnsubs: Array<() => void> = [];
    let authUnsub: (() => void) | undefined;

    authUnsub = onAuthStateChanged(auth, async (user) => {
      adminUnsubs.forEach((unsubscribe) => unsubscribe());
      adminUnsubs = [];
      if (!user || !(await isAdminUser(user))) return;

      // Seed the new Firebase project only when public CMS collections are empty/missing.
      // Existing Firestore data is never overwritten.
      const seedIfMissing = async () => {
        // Run the seed only once per Firebase project. Without this marker, deleting every item in a
        // collection (e.g. all FAQs) made the demo content reappear on the next admin login.
        const markerRef = doc(db, 'siteContent', 'seedMeta');
        if ((await getDoc(markerRef)).exists()) return;

        const batch = writeBatch(db);
        let writes = 0;

        const seedDoc = async (collectionName: string, id: string, data: any) => {
          const ref = doc(db, collectionName, id);
          const snap = await getDoc(ref);
          if (!snap.exists()) {
            batch.set(ref, data);
            writes += 1;
          }
        };

        await seedDoc('websiteSettings', 'global', DEFAULT_WEBSITE_SETTINGS);
        await seedDoc('siteContent', 'main', initialSiteContent);
        await seedDoc('companyInfo', 'main', initialCompanyInfo);
        await seedDoc('paymentSettings', 'main', initialPaymentSettings);
        await seedDoc('socialLinks', 'main', initialSocialLinks);

        const collections: Array<[string, any[]]> = [
          ['services', initialServices], ['products', initialProducts], ['solutions', initialSolutions],
          ['projects', initialProjects], ['builtByAnivex', initialBuiltByAnivex], ['testimonials', initialTestimonials],
          ['faqs', initialFaqs], ['media', initialMediaItems],
        ];
        for (const [collectionName, items] of collections) {
          const existing = await getDocs(collection(db, collectionName));
          if (existing.empty) {
            for (const item of items) {
              batch.set(doc(db, collectionName, item.id), item);
              writes += 1;
            }
          }
        }

        batch.set(markerRef, { seeded: true, seededAt: new Date().toISOString() });
        await batch.commit();
      };

      try {
        await seedIfMissing();
      } catch (error) {
        console.warn('Initial Firestore seed skipped:', error);
      }

      const watchAdminCollection = <T,>(name: string, setter: React.Dispatch<React.SetStateAction<T[]>>, mapper: (id: string, data: any) => T, sort?: (items: T[]) => T[]) => {
        adminUnsubs.push(onSnapshot(collection(db, name), (snap) => {
          const items = snap.docs.map((d) => mapper(d.id, d.data()));
          setter(sort ? sort(items) : items);
        }, (error) => console.warn(`Firestore admin ${name} sync:`, error)));
      };

      watchAdminCollection<ContactEnquiry>('contactEnquiries', setContactEnquiries, (id, data) => ({ id, ...data } as ContactEnquiry), sortByDateDesc);
      watchAdminCollection<AdminNotification>('notifications', setNotifications, (id, data) => ({ id, ...data } as AdminNotification), sortByDateDesc);
      watchAdminCollection<AdminActivityLog>('activityLogs', setActivityLogs, (id, data) => ({ id, ...data } as AdminActivityLog), sortByDateDesc);
      watchAdminCollection<InvoiceRecord>('invoices', setInvoices, (id, data) => ({ id, ...data } as InvoiceRecord), sortByDateDesc);
      watchAdminCollection<ClientRecord>('clients', setClients, (id, data) => ({ id, ...data } as ClientRecord), sortByDateDesc);
      watchAdminCollection<ContractRecord>('contracts', setContracts, (id, data) => ({ id, ...data } as ContractRecord), sortByDateDesc);
      watchAdminCollection<QuotationRecord>('quotations', setQuotations, (id, data) => ({ id, ...data } as QuotationRecord), sortByDateDesc);
    });

    return () => {
      authUnsub?.();
      adminUnsubs.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  const logActivity = async (action: string, targetItem: string) => {
    const user = auth.currentUser;
    if (!user || !(await isAdminUser(user))) return;
    const newLog: AdminActivityLog = {
      id: `act-${Date.now()}`,
      adminEmail: user.email || 'admin',
      action,
      targetItem,
      timestamp: new Date().toISOString(),
    };
    try {
      await setDoc(doc(db, 'activityLogs', newLog.id), newLog);
    } catch (error) {
      console.warn('Activity log failed (non-blocking):', error);
    }
  };

  const commitSet = async (collectionName: string, id: string, data: any, merge = false) => {
    await setDoc(doc(db, collectionName, id), data, merge ? { merge: true } : undefined);
  };

  const commitDelete = async (collectionName: string, id: string) => {
    await deleteDoc(doc(db, collectionName, id));
  };

  const updateSiteContent = async (data: Partial<SiteContent>) => {
    setIsLoading(true);
    try {
      const updated = { ...siteContent, ...data };
      await commitSet('siteContent', 'main', updated, true);
      setSiteContent(updated);
      showToast('Home & Site Content updated successfully!');
      await logActivity('Updated Site Content', 'Home & About Sections');
    } catch (error: any) {
      showToast(`Failed to update site content: ${error.message}`, 'error');
      throw error;
    } finally { setIsLoading(false); }
  };

  const makeCrud = <T extends { id: string }>(
    collectionName: string,
    state: T[],
    setState: React.Dispatch<React.SetStateAction<T[]>>,
    label: (data: any) => string,
    prefix: string,
  ) => ({
    add: async (data: Omit<T, 'id'>) => {
      setIsLoading(true);
      const id = `${prefix}-${Date.now()}`;
      const item = { id, ...data } as T;
      try {
        await commitSet(collectionName, id, item);
        setState((prev) => [...prev, item]);
        showToast(`${label(data)} added successfully!`);
        await logActivity(`Added ${collectionName}`, label(data));
      } catch (error: any) {
        showToast(`Failed to save ${collectionName}: ${error.message}`, 'error');
        throw error;
      } finally { setIsLoading(false); }
    },
    update: async (id: string, data: Partial<T>) => {
      setIsLoading(true);
      try {
        await commitSet(collectionName, id, data, true);
        setState((prev) => prev.map((item) => item.id === id ? { ...item, ...data } : item));
        showToast(`${collectionName} item updated successfully!`);
        await logActivity(`Updated ${collectionName}`, label(data));
      } catch (error: any) {
        showToast(`Failed to update ${collectionName}: ${error.message}`, 'error');
        throw error;
      } finally { setIsLoading(false); }
    },
    remove: async (id: string) => {
      setIsLoading(true);
      const item = state.find((entry) => entry.id === id);
      try {
        await commitDelete(collectionName, id);
        setState((prev) => prev.filter((entry) => entry.id !== id));
        showToast(`${collectionName} item deleted.`);
        await logActivity(`Deleted ${collectionName}`, label(item || { id }));
      } catch (error: any) {
        showToast(`Failed to delete ${collectionName}: ${error.message}`, 'error');
        throw error;
      } finally { setIsLoading(false); }
    },
  });

  const servicesCrud = makeCrud<ServiceCMS>('services', services, setServices, (d) => d.title || d.id, 'srv');
  const productsCrud = makeCrud<ProductCMS>('products', products, setProducts, (d) => d.name || d.id, 'prod');
  const solutionsCrud = makeCrud<SolutionCMS>('solutions', solutions, setSolutions, (d) => d.title || d.id, 'sol');
  const projectsCrud = makeCrud<ProjectCMS>('projects', projects, setProjects, (d) => d.name || d.id, 'proj');
  const builtCrud = makeCrud<BuiltByAnivexItem>('builtByAnivex', builtByAnivex, setBuiltByAnivex, (d) => d.title || d.id, 'built');
  const testimonialCrud = makeCrud<TestimonialCMS>('testimonials', testimonials, setTestimonials, (d) => d.customerName || d.id, 'test');
  const faqCrud = makeCrud<FaqCMS>('faqs', faqs, setFaqs, (d) => d.question || d.id, 'faq');

  const updateWebsiteSettings = async (data: Partial<WebsiteSettings>) => {
    setIsLoading(true);
    try {
      await updateWebsiteSettingsService(data);
      setWebsiteSettings((prev) => ({ ...prev, ...data }));
      setCompanyInfo((prev) => ({
        ...prev,
        name: data.companyName ?? prev.name,
        phone: data.phone ?? prev.phone,
        businessEmail: data.email ?? prev.businessEmail,
        tagline: data.tagline ?? prev.tagline,
        description: data.description ?? prev.description,
        headquarters: data.headquarters ?? prev.headquarters,
        address: data.address ?? prev.address,
        websiteUrl: data.websiteUrl ?? prev.websiteUrl,
        businessHours: data.businessHours ?? prev.businessHours,
        logoUrl: data.logoUrl ?? prev.logoUrl,
      }));
      showToast('Website settings saved successfully in Firestore!');
      await logActivity('Updated Website Settings', data.companyName || 'Global Settings');
    } catch (error: any) {
      showToast(`Failed to update settings: ${error.message}`, 'error');
      throw error;
    } finally { setIsLoading(false); }
  };

  const updateCompanyInfo = async (data: CompanyInfo) => {
    await updateWebsiteSettings({
      phone: data.phone, whatsapp: data.phone, email: data.businessEmail,
      companyName: data.name, tagline: data.tagline, description: data.description,
      headquarters: data.headquarters, address: data.address, websiteUrl: data.websiteUrl,
      businessHours: data.businessHours, logoUrl: data.logoUrl,
    });
  };

  const updatePaymentSettings = async (data: PaymentSettings) => {
    setIsLoading(true);
    try {
      await commitSet('paymentSettings', 'main', data, true);
      setPaymentSettings(data);
      showToast('Payment Settings saved to Firestore!');
      await logActivity('Updated Payment Settings', 'UPI & Bank Details');
    } catch (error: any) {
      showToast(`Failed to update payment settings: ${error.message}`, 'error');
      throw error;
    } finally { setIsLoading(false); }
  };

  const updateSocialLinks = async (data: SocialLinks) => {
    setIsLoading(true);
    try {
      await commitSet('socialLinks', 'main', data, true);
      setSocialLinks(data);
      showToast('Social Links saved to Firestore!');
      await logActivity('Updated Social Links', 'Social Channels');
    } catch (error: any) {
      showToast(`Failed to update social links: ${error.message}`, 'error');
      throw error;
    } finally { setIsLoading(false); }
  };

  const submitContactEnquiry = async (data: { fullName: string; email: string; phone?: string; company?: string; projectType: string; budgetRange: string; description: string; }) => {
    const now = new Date();
    // 4-digit random IDs collided after only a few dozen enquiries (birthday paradox) and a collision
    // makes Firestore reject the write. Use 8 random base-36 chars instead (~2.8 trillion combinations).
    const randomBytes = new Uint8Array(8);
    crypto.getRandomValues(randomBytes);
    const suffix = Array.from(randomBytes, (b) => (b % 36).toString(36)).join('').toUpperCase();
    const id = `ANX-${now.getFullYear()}-${suffix}`;
    const enquiry: ContactEnquiry = {
      id, fullName: data.fullName.trim().slice(0, 120), email: data.email.trim().slice(0, 160),
      phone: (data.phone || '').trim().slice(0, 40) || 'Not specified',
      company: (data.company || '').trim().slice(0, 160) || 'Independent / Startup',
      projectType: data.projectType.slice(0, 120),
      budgetRange: (data.budgetRange || 'Flexible').slice(0, 120), description: data.description.trim().slice(0, 5000),
      date: now.toISOString().slice(0, 10), time: now.toTimeString().slice(0, 5),
      submittedAt: now.toISOString(), status: 'New', read: false,
    };

    try {
      await commitSet('contactEnquiries', id, enquiry);
      setContactEnquiries((prev) => [enquiry, ...prev]);
      return {
        success: true,
        referenceId: id,
        message: `Thank you, ${data.fullName}. Your project inquiry has been securely transmitted to Anivex Solution. Reference ID: ${id}`,
      };
    } catch (error: any) {
      console.error('Contact enquiry submission failed:', error);
      return { success: false, message: 'We could not submit your enquiry right now. Please try again.' };
    }
  };

  const markEnquiryRead = async (id: string, read: boolean) => {
    await updateDoc(doc(db, 'contactEnquiries', id), { read });
    setContactEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, read } : e));
  };
  const updateEnquiryStatus = async (id: string, status: ContactEnquiry['status']) => {
    await updateDoc(doc(db, 'contactEnquiries', id), { status });
    setContactEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, status } : e));
    showToast(`Enquiry status updated to "${status}".`);
    await logActivity('Updated Enquiry Status', `${id} -> ${status}`);
  };
  const deleteEnquiry = async (id: string) => {
    await commitDelete('contactEnquiries', id);
    setContactEnquiries((prev) => prev.filter((e) => e.id !== id));
    showToast('Enquiry deleted.');
    await logActivity('Deleted Contact Enquiry', id);
  };

  const addInvoice = async (data: Omit<InvoiceRecord, 'id' | 'createdAt'>) => {
    const id = `inv-${Date.now()}`;
    const item = { id, ...data, createdAt: new Date().toISOString() } as InvoiceRecord;
    await commitSet('invoices', id, item);
    setInvoices((prev) => [item, ...prev]);
    showToast(`Invoice ${item.invoiceNumber} created successfully!`);
    await logActivity('Created Invoice', item.invoiceNumber);
    return id;
  };
  const updateInvoice = async (id: string, data: Partial<InvoiceRecord>) => {
    await commitSet('invoices', id, data, true);
    setInvoices((prev) => prev.map((i) => i.id === id ? { ...i, ...data } : i));
    showToast('Invoice updated.');
    await logActivity('Updated Invoice', id);
  };
  const deleteInvoice = async (id: string) => {
    await commitDelete('invoices', id);
    setInvoices((prev) => prev.filter((i) => i.id !== id));
    showToast('Invoice deleted.');
    await logActivity('Deleted Invoice', id);
  };

  const markNotificationRead = async (id: string) => {
    await updateDoc(doc(db, 'notifications', id), { read: true });
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };
  const deleteNotification = async (id: string) => {
    await commitDelete('notifications', id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const addMedia = async (data: Omit<MediaItem, 'id'>) => {
    const id = `med-${Date.now()}`;
    const item = { id, ...data } as MediaItem;
    await commitSet('media', id, item);
    setMediaItems((prev) => [item, ...prev]);
    showToast(`Media file "${data.fileName}" added to library.`);
    await logActivity('Uploaded Media Item', data.fileName);
  };
  const deleteMedia = async (id: string) => {
    await commitDelete('media', id);
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
    showToast('Media item deleted.');
    await logActivity('Deleted Media Item', id);
  };

  const addClient = async (data: Omit<ClientRecord, 'id' | 'createdAt'>) => {
    const id = `cli-${Date.now()}`;
    const item = { id, ...data, createdAt: new Date().toISOString() } as ClientRecord;
    await commitSet('clients', id, item);
    setClients((prev) => [item, ...prev]);
    showToast(`Client "${data.name}" added.`);
    await logActivity('Added Client', data.name);
    return id;
  };
  const updateClient = async (id: string, data: Partial<ClientRecord>) => {
    await commitSet('clients', id, data, true);
    setClients((prev) => prev.map((c) => c.id === id ? { ...c, ...data } : c));
    showToast('Client updated.');
    await logActivity('Updated Client', id);
  };
  const deleteClient = async (id: string) => {
    await commitDelete('clients', id);
    setClients((prev) => prev.filter((c) => c.id !== id));
    showToast('Client deleted.');
    await logActivity('Deleted Client', id);
  };

  const addContract = async (data: Omit<ContractRecord, 'id' | 'createdAt'>) => {
    const id = `ctr-${Date.now()}`;
    const item = { id, ...data, createdAt: new Date().toISOString() } as ContractRecord;
    await commitSet('contracts', id, item);
    setContracts((prev) => [item, ...prev]);
    showToast(`Contract "${data.contractNumber}" created.`);
    await logActivity('Created Contract', data.contractNumber);
    return id;
  };
  const updateContract = async (id: string, data: Partial<ContractRecord>) => {
    await commitSet('contracts', id, data, true);
    setContracts((prev) => prev.map((c) => c.id === id ? { ...c, ...data } : c));
    showToast('Contract updated.');
    await logActivity('Updated Contract', id);
  };
  const deleteContract = async (id: string) => {
    await commitDelete('contracts', id);
    setContracts((prev) => prev.filter((c) => c.id !== id));
    showToast('Contract deleted.');
    await logActivity('Deleted Contract', id);
  };

  const addQuotation = async (data: Omit<QuotationRecord, 'id' | 'createdAt'>) => {
    const id = `qtn-${Date.now()}`;
    const item = { id, ...data, createdAt: new Date().toISOString() } as QuotationRecord;
    await commitSet('quotations', id, item);
    setQuotations((prev) => [item, ...prev]);
    showToast(`Quotation "${data.quotationNumber}" generated.`);
    await logActivity('Generated Quotation', data.quotationNumber);
    return id;
  };
  const updateQuotation = async (id: string, data: Partial<QuotationRecord>) => {
    await commitSet('quotations', id, data, true);
    setQuotations((prev) => prev.map((q) => q.id === id ? { ...q, ...data } : q));
    showToast('Quotation updated.');
    await logActivity('Updated Quotation', id);
  };
  const deleteQuotation = async (id: string) => {
    await commitDelete('quotations', id);
    setQuotations((prev) => prev.filter((q) => q.id !== id));
    showToast('Quotation deleted.');
    await logActivity('Deleted Quotation', id);
  };

  return (
    <CmsContext.Provider value={{
      siteContent, services, products, solutions, projects, builtByAnivex, testimonials, faqs,
      clients, contracts, quotations, companyInfo, websiteSettings, isLoadingSettings, settingsError,
      paymentSettings, socialLinks, contactEnquiries, notifications, activityLogs, mediaItems, invoices,
      isLoading, toast, showToast, updateWebsiteSettings, updateSiteContent,
      addService: servicesCrud.add, updateService: servicesCrud.update, deleteService: servicesCrud.remove,
      addProduct: productsCrud.add, updateProduct: productsCrud.update, deleteProduct: productsCrud.remove,
      addSolution: solutionsCrud.add, updateSolution: solutionsCrud.update, deleteSolution: solutionsCrud.remove,
      addProject: projectsCrud.add, updateProject: projectsCrud.update, deleteProject: projectsCrud.remove,
      addBuiltByAnivex: builtCrud.add, updateBuiltByAnivex: builtCrud.update, deleteBuiltByAnivex: builtCrud.remove,
      addTestimonial: testimonialCrud.add, updateTestimonial: testimonialCrud.update, deleteTestimonial: testimonialCrud.remove,
      addFaq: faqCrud.add, updateFaq: faqCrud.update, deleteFaq: faqCrud.remove,
      addClient, updateClient, deleteClient, addContract, updateContract, deleteContract,
      addQuotation, updateQuotation, deleteQuotation, updateCompanyInfo, updatePaymentSettings, updateSocialLinks,
      submitContactEnquiry, markEnquiryRead, updateEnquiryStatus, deleteEnquiry,
      markNotificationRead, deleteNotification, addMedia, deleteMedia,
      addInvoice, updateInvoice, deleteInvoice, logActivity,
    }}>
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) throw new Error('useCms must be used within a CmsProvider');
  return context;
};
