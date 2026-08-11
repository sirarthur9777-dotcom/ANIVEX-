import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  SiteContent,
  ServiceCMS,
  ProductCMS,
  SolutionCMS,
  ProjectCMS,
  BuiltByAnivexItem,
  CompanyInfo,
  SocialLinks,
  ContactEnquiry,
  AdminNotification,
  AdminActivityLog,
  MediaItem
} from '../types/cms';
import {
  initialSiteContent,
  initialServices,
  initialProducts,
  initialSolutions,
  initialProjects,
  initialBuiltByAnivex,
  initialCompanyInfo,
  initialSocialLinks,
  initialContactEnquiries,
  initialNotifications,
  initialActivityLogs,
  initialMediaItems
} from '../data/initialCmsData';

interface ToastState {
  type: 'success' | 'error' | 'info';
  message: string;
}

interface CmsContextType {
  siteContent: SiteContent;
  services: ServiceCMS[];
  products: ProductCMS[];
  solutions: SolutionCMS[];
  projects: ProjectCMS[];
  builtByAnivex: BuiltByAnivexItem[];
  companyInfo: CompanyInfo;
  socialLinks: SocialLinks;
  contactEnquiries: ContactEnquiry[];
  notifications: AdminNotification[];
  activityLogs: AdminActivityLog[];
  mediaItems: MediaItem[];
  isLoading: boolean;
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;

  // Site Content
  updateSiteContent: (data: Partial<SiteContent>) => Promise<void>;

  // Services
  addService: (data: Omit<ServiceCMS, 'id'>) => Promise<void>;
  updateService: (id: string, data: Partial<ServiceCMS>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;

  // Products
  addProduct: (data: Omit<ProductCMS, 'id'>) => Promise<void>;
  updateProduct: (id: string, data: Partial<ProductCMS>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  // Solutions
  addSolution: (data: Omit<SolutionCMS, 'id'>) => Promise<void>;
  updateSolution: (id: string, data: Partial<SolutionCMS>) => Promise<void>;
  deleteSolution: (id: string) => Promise<void>;

  // Projects
  addProject: (data: Omit<ProjectCMS, 'id'>) => Promise<void>;
  updateProject: (id: string, data: Partial<ProjectCMS>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  // Built By ANIVEX
  addBuiltByAnivex: (data: Omit<BuiltByAnivexItem, 'id'>) => Promise<void>;
  updateBuiltByAnivex: (id: string, data: Partial<BuiltByAnivexItem>) => Promise<void>;
  deleteBuiltByAnivex: (id: string) => Promise<void>;

  // Company Info & Socials
  updateCompanyInfo: (data: CompanyInfo) => Promise<void>;
  updateSocialLinks: (data: SocialLinks) => Promise<void>;

  // Enquiries
  submitContactEnquiry: (data: {
    fullName: string;
    email: string;
    phone?: string;
    company?: string;
    projectType: string;
    budgetRange: string;
    description: string;
  }) => Promise<{ success: boolean; message: string; referenceId?: string }>;
  markEnquiryRead: (id: string, read: boolean) => Promise<void>;
  updateEnquiryStatus: (id: string, status: ContactEnquiry['status']) => Promise<void>;
  deleteEnquiry: (id: string) => Promise<void>;

  // Notifications
  markNotificationRead: (id: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;

  // Media
  addMedia: (data: Omit<MediaItem, 'id'>) => Promise<void>;
  deleteMedia: (id: string) => Promise<void>;

  // Log
  logActivity: (action: string, targetItem: string) => Promise<void>;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    const local = localStorage.getItem('anivex_site_content');
    return local ? JSON.parse(local) : initialSiteContent;
  });

  const [services, setServices] = useState<ServiceCMS[]>(() => {
    const local = localStorage.getItem('anivex_services');
    return local ? JSON.parse(local) : initialServices;
  });

  const [products, setProducts] = useState<ProductCMS[]>(() => {
    const local = localStorage.getItem('anivex_products');
    return local ? JSON.parse(local) : initialProducts;
  });

  const [solutions, setSolutions] = useState<SolutionCMS[]>(() => {
    const local = localStorage.getItem('anivex_solutions');
    return local ? JSON.parse(local) : initialSolutions;
  });

  const [projects, setProjects] = useState<ProjectCMS[]>(() => {
    const local = localStorage.getItem('anivex_projects');
    return local ? JSON.parse(local) : initialProjects;
  });

  const [builtByAnivex, setBuiltByAnivex] = useState<BuiltByAnivexItem[]>(() => {
    const local = localStorage.getItem('anivex_built_by');
    return local ? JSON.parse(local) : initialBuiltByAnivex;
  });

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    const local = localStorage.getItem('anivex_company_info');
    return local ? JSON.parse(local) : initialCompanyInfo;
  });

  const [socialLinks, setSocialLinks] = useState<SocialLinks>(() => {
    const local = localStorage.getItem('anivex_social_links');
    return local ? JSON.parse(local) : initialSocialLinks;
  });

  const [contactEnquiries, setContactEnquiries] = useState<ContactEnquiry[]>(() => {
    const local = localStorage.getItem('anivex_enquiries');
    return local ? JSON.parse(local) : initialContactEnquiries;
  });

  const [notifications, setNotifications] = useState<AdminNotification[]>(() => {
    const local = localStorage.getItem('anivex_notifications');
    return local ? JSON.parse(local) : initialNotifications;
  });

  const [activityLogs, setActivityLogs] = useState<AdminActivityLog[]>(() => {
    const local = localStorage.getItem('anivex_activity_logs');
    return local ? JSON.parse(local) : initialActivityLogs;
  });

  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => {
    const local = localStorage.getItem('anivex_media');
    return local ? JSON.parse(local) : initialMediaItems;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync to local storage for instant responsiveness
  useEffect(() => {
    localStorage.setItem('anivex_site_content', JSON.stringify(siteContent));
  }, [siteContent]);

  useEffect(() => {
    localStorage.setItem('anivex_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('anivex_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('anivex_solutions', JSON.stringify(solutions));
  }, [solutions]);

  useEffect(() => {
    localStorage.setItem('anivex_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('anivex_built_by', JSON.stringify(builtByAnivex));
  }, [builtByAnivex]);

  useEffect(() => {
    localStorage.setItem('anivex_company_info', JSON.stringify(companyInfo));
  }, [companyInfo]);

  useEffect(() => {
    localStorage.setItem('anivex_social_links', JSON.stringify(socialLinks));
  }, [socialLinks]);

  useEffect(() => {
    localStorage.setItem('anivex_enquiries', JSON.stringify(contactEnquiries));
  }, [contactEnquiries]);

  useEffect(() => {
    localStorage.setItem('anivex_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('anivex_activity_logs', JSON.stringify(activityLogs));
  }, [activityLogs]);

  useEffect(() => {
    localStorage.setItem('anivex_media', JSON.stringify(mediaItems));
  }, [mediaItems]);

  // Firestore Real-Time Subscriptions
  useEffect(() => {
    try {
      // Subscribe to siteContent
      const unsubContent = onSnapshot(doc(db, 'siteContent', 'main'), (snapshot) => {
        if (snapshot.exists()) {
          setSiteContent(snapshot.data() as SiteContent);
        }
      }, (err) => console.warn('Firestore siteContent sync:', err));

      // Subscribe to services
      const unsubServices = onSnapshot(collection(db, 'services'), (snapshot) => {
        if (!snapshot.empty) {
          const list: ServiceCMS[] = [];
          snapshot.forEach((d) => list.push({ id: d.id, ...d.data() } as ServiceCMS));
          list.sort((a, b) => a.displayOrder - b.displayOrder);
          setServices(list);
        }
      }, (err) => console.warn('Firestore services sync:', err));

      // Subscribe to products
      const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
        if (!snapshot.empty) {
          const list: ProductCMS[] = [];
          snapshot.forEach((d) => list.push({ id: d.id, ...d.data() } as ProductCMS));
          list.sort((a, b) => a.displayOrder - b.displayOrder);
          setProducts(list);
        }
      }, (err) => console.warn('Firestore products sync:', err));

      // Subscribe to solutions
      const unsubSolutions = onSnapshot(collection(db, 'solutions'), (snapshot) => {
        if (!snapshot.empty) {
          const list: SolutionCMS[] = [];
          snapshot.forEach((d) => list.push({ id: d.id, ...d.data() } as SolutionCMS));
          list.sort((a, b) => a.displayOrder - b.displayOrder);
          setSolutions(list);
        }
      }, (err) => console.warn('Firestore solutions sync:', err));

      // Subscribe to projects
      const unsubProjects = onSnapshot(collection(db, 'projects'), (snapshot) => {
        if (!snapshot.empty) {
          const list: ProjectCMS[] = [];
          snapshot.forEach((d) => list.push({ id: d.id, ...d.data() } as ProjectCMS));
          list.sort((a, b) => a.displayOrder - b.displayOrder);
          setProjects(list);
        }
      }, (err) => console.warn('Firestore projects sync:', err));

      // Subscribe to contactEnquiries
      const unsubEnquiries = onSnapshot(collection(db, 'contactEnquiries'), (snapshot) => {
        if (!snapshot.empty) {
          const list: ContactEnquiry[] = [];
          snapshot.forEach((d) => list.push({ id: d.id, ...d.data() } as ContactEnquiry));
          list.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
          setContactEnquiries(list);
        }
      }, (err) => console.warn('Firestore enquiries sync:', err));

      // Subscribe to notifications
      const unsubNotifs = onSnapshot(collection(db, 'notifications'), (snapshot) => {
        if (!snapshot.empty) {
          const list: AdminNotification[] = [];
          snapshot.forEach((d) => list.push({ id: d.id, ...d.data() } as AdminNotification));
          list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setNotifications(list);
        }
      }, (err) => console.warn('Firestore notifications sync:', err));

      return () => {
        unsubContent();
        unsubServices();
        unsubProducts();
        unsubSolutions();
        unsubProjects();
        unsubEnquiries();
        unsubNotifs();
      };
    } catch (e) {
      console.warn('Firestore initialization fallback to local state:', e);
    }
  }, []);

  // Helper for Activity Logging
  const logActivity = async (action: string, targetItem: string) => {
    const newLog: AdminActivityLog = {
      id: `act-${Date.now()}`,
      adminEmail: 'admin@anivex.com',
      action,
      targetItem,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setActivityLogs((prev) => [newLog, ...prev]);

    try {
      await addDoc(collection(db, 'activityLogs'), newLog);
    } catch (e) {
      // Local fallback
    }
  };

  // Site Content Update
  const updateSiteContent = async (data: Partial<SiteContent>) => {
    const updated = { ...siteContent, ...data };
    setSiteContent(updated);
    showToast('Home & Site Content updated successfully!');
    await logActivity('Updated Site Content', 'Home & About Sections');

    try {
      await setDoc(doc(db, 'siteContent', 'main'), updated, { merge: true });
    } catch (e) {
      console.warn('Firestore siteContent update fallback:', e);
    }
  };

  // Services
  const addService = async (data: Omit<ServiceCMS, 'id'>) => {
    const id = `srv-${Date.now()}`;
    const newService: ServiceCMS = { id, ...data };
    setServices((prev) => [...prev, newService]);
    showToast(`Service "${data.title}" created successfully!`);
    await logActivity('Added Service', data.title);

    try {
      await setDoc(doc(db, 'services', id), newService);
    } catch (e) {
      console.warn('Firestore addService fallback:', e);
    }
  };

  const updateService = async (id: string, data: Partial<ServiceCMS>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
    showToast('Service updated successfully!');
    await logActivity('Updated Service', data.title || id);

    try {
      await updateDoc(doc(db, 'services', id), data);
    } catch (e) {
      console.warn('Firestore updateService fallback:', e);
    }
  };

  const deleteService = async (id: string) => {
    const item = services.find((s) => s.id === id);
    setServices((prev) => prev.filter((s) => s.id !== id));
    showToast('Service deleted.');
    await logActivity('Deleted Service', item?.title || id);

    try {
      await deleteDoc(doc(db, 'services', id));
    } catch (e) {
      console.warn('Firestore deleteService fallback:', e);
    }
  };

  // Products
  const addProduct = async (data: Omit<ProductCMS, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const newProd: ProductCMS = { id, ...data };
    setProducts((prev) => [...prev, newProd]);
    showToast(`Product "${data.name}" added successfully!`);
    await logActivity('Added Product', data.name);

    try {
      await setDoc(doc(db, 'products', id), newProd);
    } catch (e) {
      console.warn('Firestore addProduct fallback:', e);
    }
  };

  const updateProduct = async (id: string, data: Partial<ProductCMS>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    showToast('Product updated successfully!');
    await logActivity('Updated Product', data.name || id);

    try {
      await updateDoc(doc(db, 'products', id), data);
    } catch (e) {
      console.warn('Firestore updateProduct fallback:', e);
    }
  };

  const deleteProduct = async (id: string) => {
    const item = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product deleted.');
    await logActivity('Deleted Product', item?.name || id);

    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (e) {
      console.warn('Firestore deleteProduct fallback:', e);
    }
  };

  // Solutions
  const addSolution = async (data: Omit<SolutionCMS, 'id'>) => {
    const id = `sol-${Date.now()}`;
    const newSol: SolutionCMS = { id, ...data };
    setSolutions((prev) => [...prev, newSol]);
    showToast(`Solution "${data.title}" added!`);
    await logActivity('Added Solution', data.title);

    try {
      await setDoc(doc(db, 'solutions', id), newSol);
    } catch (e) {
      console.warn('Firestore addSolution fallback:', e);
    }
  };

  const updateSolution = async (id: string, data: Partial<SolutionCMS>) => {
    setSolutions((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
    showToast('Solution updated!');
    await logActivity('Updated Solution', data.title || id);

    try {
      await updateDoc(doc(db, 'solutions', id), data);
    } catch (e) {
      console.warn('Firestore updateSolution fallback:', e);
    }
  };

  const deleteSolution = async (id: string) => {
    const item = solutions.find((s) => s.id === id);
    setSolutions((prev) => prev.filter((s) => s.id !== id));
    showToast('Solution removed.');
    await logActivity('Deleted Solution', item?.title || id);

    try {
      await deleteDoc(doc(db, 'solutions', id));
    } catch (e) {
      console.warn('Firestore deleteSolution fallback:', e);
    }
  };

  // Projects
  const addProject = async (data: Omit<ProjectCMS, 'id'>) => {
    const id = `proj-${Date.now()}`;
    const newProj: ProjectCMS = { id, ...data };
    setProjects((prev) => [...prev, newProj]);
    showToast(`Project "${data.name}" added successfully!`);
    await logActivity('Added Project', data.name);

    try {
      await setDoc(doc(db, 'projects', id), newProj);
    } catch (e) {
      console.warn('Firestore addProject fallback:', e);
    }
  };

  const updateProject = async (id: string, data: Partial<ProjectCMS>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    showToast('Project updated successfully!');
    await logActivity('Updated Project', data.name || id);

    try {
      await updateDoc(doc(db, 'projects', id), data);
    } catch (e) {
      console.warn('Firestore updateProject fallback:', e);
    }
  };

  const deleteProject = async (id: string) => {
    const item = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showToast('Project deleted.');
    await logActivity('Deleted Project', item?.name || id);

    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (e) {
      console.warn('Firestore deleteProject fallback:', e);
    }
  };

  // Built By ANIVEX
  const addBuiltByAnivex = async (data: Omit<BuiltByAnivexItem, 'id'>) => {
    const id = `built-${Date.now()}`;
    const newItem: BuiltByAnivexItem = { id, ...data };
    setBuiltByAnivex((prev) => [...prev, newItem]);
    showToast('Showcase item added to "Built by ANIVEX".');
    await logActivity('Added Built By Showcase', data.title);

    try {
      await setDoc(doc(db, 'builtByAnivex', id), newItem);
    } catch (e) {
      console.warn('Firestore addBuiltByAnivex fallback:', e);
    }
  };

  const updateBuiltByAnivex = async (id: string, data: Partial<BuiltByAnivexItem>) => {
    setBuiltByAnivex((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));
    showToast('Showcase item updated.');
    await logActivity('Updated Built By Showcase', data.title || id);

    try {
      await updateDoc(doc(db, 'builtByAnivex', id), data);
    } catch (e) {
      console.warn('Firestore updateBuiltByAnivex fallback:', e);
    }
  };

  const deleteBuiltByAnivex = async (id: string) => {
    const item = builtByAnivex.find((b) => b.id === id);
    setBuiltByAnivex((prev) => prev.filter((b) => b.id !== id));
    showToast('Showcase item removed.');
    await logActivity('Deleted Built By Showcase', item?.title || id);

    try {
      await deleteDoc(doc(db, 'builtByAnivex', id));
    } catch (e) {
      console.warn('Firestore deleteBuiltByAnivex fallback:', e);
    }
  };

  // Company Info & Socials
  const updateCompanyInfo = async (data: CompanyInfo) => {
    setCompanyInfo(data);
    showToast('Company Settings updated successfully!');
    await logActivity('Updated Company Information', data.name);

    try {
      await setDoc(doc(db, 'companyInfo', 'main'), data, { merge: true });
    } catch (e) {
      console.warn('Firestore updateCompanyInfo fallback:', e);
    }
  };

  const updateSocialLinks = async (data: SocialLinks) => {
    setSocialLinks(data);
    showToast('Social Links updated successfully!');
    await logActivity('Updated Social Links', 'Social Channels');

    try {
      await setDoc(doc(db, 'socialLinks', 'main'), data, { merge: true });
    } catch (e) {
      console.warn('Firestore updateSocialLinks fallback:', e);
    }
  };

  // Contact Enquiry Submission
  const submitContactEnquiry = async (data: {
    fullName: string;
    email: string;
    phone?: string;
    company?: string;
    projectType: string;
    budgetRange: string;
    description: string;
  }) => {
    const now = new Date();
    const id = `ANX-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const dateStr = now.toISOString().slice(0, 10);
    const timeStr = now.toTimeString().slice(0, 5);

    const enquiry: ContactEnquiry = {
      id,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || 'Not specified',
      company: data.company || 'Independent / Startup',
      projectType: data.projectType,
      budgetRange: data.budgetRange || 'Flexible',
      description: data.description,
      date: dateStr,
      time: timeStr,
      submittedAt: now.toISOString(),
      status: 'New',
      read: false,
    };

    const newNotification: AdminNotification = {
      id: `notif-${Date.now()}`,
      title: '🔔 New Contact Enquiry',
      message: `New project enquiry received from ${data.fullName} (${data.company || 'Individual'}).`,
      enquiryId: id,
      email: data.email,
      projectType: data.projectType,
      date: dateStr,
      time: timeStr,
      read: false,
      createdAt: now.toISOString(),
    };

    setContactEnquiries((prev) => [enquiry, ...prev]);
    setNotifications((prev) => [newNotification, ...prev]);

    // Firestore write
    try {
      await setDoc(doc(db, 'contactEnquiries', id), enquiry);
      await setDoc(doc(db, 'notifications', newNotification.id), newNotification);
    } catch (e) {
      console.warn('Firestore contact enquiry write fallback:', e);
    }

    // Call server endpoint for verification and backend email notification log
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.warn('Server contact API call fallback:', err);
    }

    return {
      success: true,
      referenceId: id,
      message: `Thank you, ${data.fullName}. Your project inquiry has been securely transmitted to ANIVEX Solutions. Reference ID: ${id}`,
    };
  };

  const markEnquiryRead = async (id: string, read: boolean) => {
    setContactEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, read } : e)));
    try {
      await updateDoc(doc(db, 'contactEnquiries', id), { read });
    } catch (e) {
      console.warn('Firestore markEnquiryRead fallback:', e);
    }
  };

  const updateEnquiryStatus = async (id: string, status: ContactEnquiry['status']) => {
    setContactEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    showToast(`Enquiry status updated to "${status}".`);
    await logActivity('Updated Enquiry Status', `${id} -> ${status}`);

    try {
      await updateDoc(doc(db, 'contactEnquiries', id), { status });
    } catch (e) {
      console.warn('Firestore updateEnquiryStatus fallback:', e);
    }
  };

  const deleteEnquiry = async (id: string) => {
    setContactEnquiries((prev) => prev.filter((e) => e.id !== id));
    showToast('Enquiry deleted.');
    await logActivity('Deleted Contact Enquiry', id);

    try {
      await deleteDoc(doc(db, 'contactEnquiries', id));
    } catch (e) {
      console.warn('Firestore deleteEnquiry fallback:', e);
    }
  };

  // Notifications
  const markNotificationRead = async (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    try {
      await updateDoc(doc(db, 'notifications', id), { read: true });
    } catch (e) {
      console.warn('Firestore markNotificationRead fallback:', e);
    }
  };

  const deleteNotification = async (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    try {
      await deleteDoc(doc(db, 'notifications', id));
    } catch (e) {
      console.warn('Firestore deleteNotification fallback:', e);
    }
  };

  // Media
  const addMedia = async (data: Omit<MediaItem, 'id'>) => {
    const id = `med-${Date.now()}`;
    const newMedia: MediaItem = { id, ...data };
    setMediaItems((prev) => [newMedia, ...prev]);
    showToast(`Media file "${data.fileName}" added to library.`);
    await logActivity('Uploaded Media Item', data.fileName);

    try {
      await setDoc(doc(db, 'media', id), newMedia);
    } catch (e) {
      console.warn('Firestore addMedia fallback:', e);
    }
  };

  const deleteMedia = async (id: string) => {
    const item = mediaItems.find((m) => m.id === id);
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
    showToast('Media item deleted.');
    await logActivity('Deleted Media Item', item?.fileName || id);

    try {
      await deleteDoc(doc(db, 'media', id));
    } catch (e) {
      console.warn('Firestore deleteMedia fallback:', e);
    }
  };

  return (
    <CmsContext.Provider
      value={{
        siteContent,
        services,
        products,
        solutions,
        projects,
        builtByAnivex,
        companyInfo,
        socialLinks,
        contactEnquiries,
        notifications,
        activityLogs,
        mediaItems,
        isLoading,
        toast,
        showToast,
        updateSiteContent,
        addService,
        updateService,
        deleteService,
        addProduct,
        updateProduct,
        deleteProduct,
        addSolution,
        updateSolution,
        deleteSolution,
        addProject,
        updateProject,
        deleteProject,
        addBuiltByAnivex,
        updateBuiltByAnivex,
        deleteBuiltByAnivex,
        updateCompanyInfo,
        updateSocialLinks,
        submitContactEnquiry,
        markEnquiryRead,
        updateEnquiryStatus,
        deleteEnquiry,
        markNotificationRead,
        deleteNotification,
        addMedia,
        deleteMedia,
        logActivity,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
