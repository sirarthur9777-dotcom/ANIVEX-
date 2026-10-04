export interface NavbarItem {
  id: string;
  label: string;
  href: string;
  visible: boolean;
  order: number;
}

export interface NavbarSettings {
  brandName: string;
  logoUrl?: string;
  ctaText: string;
  ctaLink: string;
  items: NavbarItem[];
}

export interface TrustStatItem {
  id: string;
  title: string;
  label: string;
  description: string;
  iconName: string;
  order: number;
  enabled: boolean;
}

export interface WhyAnivexFeature {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: string;
  order: number;
}

export interface WhyAnivexSettings {
  heading: string;
  description: string;
  enabled: boolean;
  features: WhyAnivexFeature[];
}

export interface TestimonialCMS {
  id: string;
  customerName: string;
  company: string;
  designation: string;
  profileImage?: string;
  testimonial: string;
  rating: number;
  featured: boolean;
  published: boolean;
  displayOrder: number;
}

export interface FaqCMS {
  id: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  published: boolean;
}

export interface PricingPackageCMS {
  id: string;
  name: string;
  category?: string;
  price: string;
  priceSubtext?: string;
  timeline: string;
  badge?: string;
  featured: boolean;
  description: string;
  features: string[];
  projectType: string;
  budgetRange: string;
  ctaText?: string;
  whatsappText?: string;
  displayOrder: number;
  published: boolean;
}

export interface SiteContent {
  heroBadge?: string;
  heroHeading: string;
  heroSubtitle: string;
  heroDescription: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  heroImage?: string;
  heroVisible?: boolean;
  navbar?: NavbarSettings;
  trustStats?: TrustStatItem[];
  whyAnivex?: WhyAnivexSettings;
  pricingBadge?: string;
  pricingHeading?: string;
  pricingDescription?: string;
  aboutHeading: string;
  aboutDescription: string;
  aboutStory: string;
  mission: string;
  vision: string;
  values?: { title: string; description: string }[];
  founderName: string;
  founderRole: string;
  founderDescription: string;
  founderImage?: string;
  companyImage?: string;
  ctaHeading: string;
  ctaSubtitle: string;
  primaryCtaText: string;
  secondaryCtaText: string;
}

export interface ServiceCMS {
  id: string;
  number: string;
  title: string;
  slug?: string;
  description: string;
  fullDescription?: string;
  iconName: string;
  coverImage?: string;
  features: string[];
  technologies: string[];
  cta?: string;
  ctaUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  displayOrder: number;
  published: boolean;
}

export interface ProductCMS {
  id: string;
  name: string;
  category?: string;
  tagline: string;
  description: string;
  status: 'Available' | 'Coming Soon' | 'In Development' | 'Beta';
  badge: string;
  features: string[];
  technologies: string[];
  productUrl?: string;
  logoUrl?: string;
  image?: string;
  actionLabel: string;
  cta?: string;
  isInteractive?: boolean;
  featured: boolean;
  displayOrder: number;
  published: boolean;
}

export interface SolutionCMS {
  id: string;
  title: string;
  subtitle: string;
  targetAudience: string;
  description: string;
  highlights: string[];
  iconName: string;
  category: string;
  displayOrder: number;
  published: boolean;
}

export interface ProjectCMS {
  id: string;
  name: string;
  client?: string;
  category: string;
  projectType: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  features: string[];
  featured: boolean;
  imageBg: string;
  imageUrl?: string;
  image?: string;
  gallery?: string[];
  projectUrl?: string;
  githubUrl?: string;
  stats?: string;
  status: 'Featured' | 'Active' | 'Completed' | 'Coming Soon' | 'In Development' | 'Archived';
  clientType: string;
  timeline: string;
  completionDate?: string;
  overview: string;
  displayOrder: number;
  published: boolean;
}

export interface BuiltByAnivexItem {
  id: string;
  title: string;
  type: 'Product' | 'Project' | 'Platform' | 'Software';
  tagline: string;
  description: string;
  technologies: string[];
  link?: string;
  logoUrl?: string;
  badge: string;
  displayOrder: number;
  published: boolean;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  businessEmail: string;
  phone: string;
  headquarters: string;
  address: string;
  websiteUrl: string;
  businessHours: string;
  logoUrl?: string;
}

export interface PaymentSettings {
  upiId: string;
  upiName: string;
  qrCodeUrl?: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  paymentInstructions: string;
  paymentMethods: string[];
  paymentButtonText: string;
  enabled: boolean;
}

export interface SocialLinks {
  linkedin: { url: string; enabled: boolean };
  instagram: { url: string; enabled: boolean };
  facebook: { url: string; enabled: boolean };
  twitter: { url: string; enabled: boolean };
  github: { url: string; enabled: boolean };
  youtube: { url: string; enabled: boolean };
}

export interface ContactEnquiry {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budgetRange: string;
  description: string;
  date: string;
  time: string;
  submittedAt: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'In Discussion' | 'Converted' | 'Closed';
  read: boolean;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  enquiryId?: string;
  email?: string;
  projectType?: string;
  date: string;
  time: string;
  read: boolean;
  createdAt: string;
}

export interface AdminActivityLog {
  id: string;
  adminEmail: string;
  action: string;
  targetItem: string;
  timestamp: string;
}

export interface MediaItem {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize?: string;
  category: 'Company Logo' | 'Project' | 'Product' | 'Service' | 'About' | 'Other';
  uploadedAt: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  category: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Draft' | 'Overdue';
  currency: 'USD' | 'INR' | 'EUR' | 'GBP';
  
  // Biller details
  billerName: string;
  billerAddress: string;
  billerEmail: string;
  billerPhone: string;
  billerTaxId?: string;

  // Client details
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientPhone?: string;
  clientAddress?: string;
  projectTitle?: string;

  // Items & Financials
  items: InvoiceLineItem[];
  subtotal: number;
  taxRatePercent: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;

  // Payment terms & Bank/UPI details
  paymentNotes?: string;
  bankDetails?: string;
  bankName?: string;
  accountNumber?: string;
  accountHolderName?: string;
  ifscCode?: string;
  upiId?: string;
  upiQrCodeUrl?: string;

  // Additional Meta & Delivery fields
  placeOfSupply?: string;
  clientRef?: string;
  websiteUrl?: string;
  deliveryMethod?: string;
  warrantySupport?: string;
  supportEmail?: string;
  supportPhone?: string;
  createdAt: string;
}

export interface ClientRecord {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address?: string;
  gstin?: string;
  city?: string;
  state?: string;
  notes?: string;
  createdAt: string;
}

export interface ContractRecord {
  id: string;
  contractNumber: string;
  clientId?: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  clientGstin?: string;

  projectTitle: string;
  effectiveDate: string;
  deliveryDate: string;
  totalAmount: number;
  advancePercentage: number;
  advanceAmount: number;
  currency: 'INR' | 'USD' | 'EUR';

  scopeOfWork: string;
  deliverables: string[];
  paymentTerms: string;
  intellectualPropertyClause: string;
  confidentialityClause: string;
  warrantyPeriod: string;
  governingLaw: string;
  
  status: 'Draft' | 'Active' | 'Signed' | 'Completed' | 'Cancelled';
  serviceProviderSignatory: string;
  serviceProviderTitle: string;
  clientSignatory: string;
  clientSignatoryTitle: string;
  signedDate?: string;
  createdAt: string;
}

export interface QuotationLineItem {
  id: string;
  description: string;
  details?: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface QuotationRecord {
  id: string;
  quotationNumber: string;
  quotationDate: string;
  validUntil: string;
  clientId?: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  clientGstin?: string;

  projectTitle: string;
  executiveSummary: string;
  lineItems: QuotationLineItem[];
  subtotal: number;
  gstRate: number; // e.g. 18
  gstAmount: number;
  discountAmount: number;
  totalAmount: number;
  currency: 'INR' | 'USD';

  estimatedTimeline: string;
  milestones: { title: string; percentage: number; description: string }[];
  termsAndConditions: string;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Declined' | 'Invoiced';
  createdAt: string;
}

