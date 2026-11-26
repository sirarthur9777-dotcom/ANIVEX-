import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { CmsProvider } from './context/CmsContext';
import { isProductModalHistoryActive, LOCATION_SYNC_EVENT } from './lib/modalHistoryGuard';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { About } from './components/About';
import { Services } from './components/Services';
import { PricingPackages } from './components/PricingPackages';
import { Products } from './components/Products';
import { Technologies } from './components/Technologies';
import { Projects } from './components/Projects';
import { WhyAnivex } from './components/WhyAnivex';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { CTASection } from './components/CTASection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SeoHead } from './components/SeoHead';
import { SERVICES_SEO_DATA } from './data/servicesSeoData';

const PrivacyPolicyPage = lazy(() =>
  import('./components/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage }))
);
const TermsAndConditionsPage = lazy(() =>
  import('./components/TermsAndConditionsPage').then((m) => ({ default: m.TermsAndConditionsPage }))
);
const ServicePage = lazy(() =>
  import('./components/ServicePage').then((m) => ({ default: m.ServicePage }))
);
const AboutFounderPage = lazy(() =>
  import('./components/AboutFounderPage').then((m) => ({ default: m.AboutFounderPage }))
);
const AdminLogin = lazy(() =>
  import('./components/admin/AdminLogin').then((m) => ({ default: m.AdminLogin }))
);
const AdminDashboard = lazy(() =>
  import('./components/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard }))
);

const HOME_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://anivexsolution.in/#organization',
      'name': 'Anivex Solution',
      'alternateName': ['Anivex Solution India', 'Anivex IT Solutions'],
      'url': 'https://anivexsolution.in/',
      'email': 'anivexsolution@gmail.com',
      'telephone': '+91 79056 68826',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://anivexsolution.in/images/krishndas-chauhan-founder-anivex-solution.jpeg',
        'width': 900,
        'height': 1599,
      },
      'founder': { '@id': 'https://anivexsolution.in/#krishndas-chauhan' },
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Lucknow',
        'addressRegion': 'Uttar Pradesh',
        'postalCode': '226010',
        'addressCountry': 'IN',
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+91-79056-68826',
        'contactType': 'customer service',
        'email': 'anivexsolution@gmail.com',
        'areaServed': ['IN'],
        'availableLanguage': ['English', 'Hindi'],
      },
      'areaServed': [
        { '@type': 'City', 'name': 'Jaunpur' },
        { '@type': 'City', 'name': 'Machhlishahar' },
        { '@type': 'City', 'name': 'Lucknow' },
        { '@type': 'City', 'name': 'Varanasi' },
        { '@type': 'State', 'name': 'Uttar Pradesh' },
        { '@type': 'Country', 'name': 'India' },
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://anivexsolution.in/#localbusiness',
      'name': 'Anivex Solution',
      'url': 'https://anivexsolution.in/',
      'image': 'https://anivexsolution.in/images/hero_indian_tech_business_1790750492543.jpg',
      'telephone': '+91-79056-68826',
      'email': 'anivexsolution@gmail.com',
      'priceRange': '₹15,000 - ₹5,00,000+',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Lucknow',
        'addressRegion': 'Uttar Pradesh',
        'postalCode': '226010',
        'addressCountry': 'IN',
      },
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          'opens': '09:00',
          'closes': '19:00',
        },
      ],
      'areaServed': [
        { '@type': 'City', 'name': 'Jaunpur' },
        { '@type': 'City', 'name': 'Machhlishahar' },
        { '@type': 'City', 'name': 'Lucknow' },
        { '@type': 'City', 'name': 'Varanasi' },
        { '@type': 'State', 'name': 'Uttar Pradesh' },
        { '@type': 'Country', 'name': 'India' },
      ],
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Software & Web Engineering Services',
        'itemListElement': [
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Web Development', 'url': 'https://anivexsolution.in/web-development' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'UI/UX Web Design', 'url': 'https://anivexsolution.in/web-design' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Software Development', 'url': 'https://anivexsolution.in/software-development' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Web Application Development', 'url': 'https://anivexsolution.in/web-application-development' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'ERP Development', 'url': 'https://anivexsolution.in/erp-development' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Custom Software Solutions', 'url': 'https://anivexsolution.in/custom-software' } },
        ],
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://anivexsolution.in/#krishndas-chauhan',
      'name': 'Krishndas Chauhan',
      'alternateName': [
        'Founder of Anivex Solution',
        'Who is Krishndas Chauhan',
        'Krishndas Chauhan Anivex Solution',
        'Krishndas Chauhan Founder',
        'Krishndas Chauhan Lead Architect',
        'Krishndas Chauhan MCA',
        'Krishna Das Chauhan',
      ],
      'jobTitle': 'Founder & Lead Architect',
      'url': 'https://anivexsolution.in/aboutfounder',
      'image': [
        {
          '@type': 'ImageObject',
          '@id': 'https://anivexsolution.in/images/krishndas-chauhan-founder-anivex-solution.jpeg',
          'url': 'https://anivexsolution.in/images/krishndas-chauhan-founder-anivex-solution.jpeg',
          'contentUrl': 'https://anivexsolution.in/images/krishndas-chauhan-founder-anivex-solution.jpeg',
          'name': 'Krishndas Chauhan — Founder & Lead Architect of Anivex Solution (Executive Portrait)',
          'caption': 'Official Executive Portrait of Krishndas Chauhan, Founder and Lead Architect of Anivex Solution',
          'encodingFormat': 'image/jpeg',
          'width': 900,
          'height': 1599,
        },
        {
          '@type': 'ImageObject',
          '@id': 'https://anivexsolution.in/images/krishndas-chauhan-field-portrait-anivex-solution.jpeg',
          'url': 'https://anivexsolution.in/images/krishndas-chauhan-field-portrait-anivex-solution.jpeg',
          'contentUrl': 'https://anivexsolution.in/images/krishndas-chauhan-field-portrait-anivex-solution.jpeg',
          'name': 'Krishndas Chauhan — Founder & Lead Architect of Anivex Solution (Field Portrait)',
          'caption': 'Official Field & Technical Leadership Portrait of Krishndas Chauhan, Founder and Lead Architect of Anivex Solution',
          'encodingFormat': 'image/jpeg',
          'width': 1086,
          'height': 1448,
        },
      ],
      'description': 'Krishndas Chauhan is the Founder and Lead Architect of Anivex Solution. He holds a Master of Computer Applications (MCA) from Mangalayatan University and a Bachelor of Computer Applications (BCA) from APCS College of IT & Management.',
      'alumniOf': [
        {
          '@type': 'CollegeOrUniversity',
          'name': 'Mangalayatan University',
          'description': 'Master of Computer Applications (MCA)',
        },
        {
          '@type': 'CollegeOrUniversity',
          'name': 'APCS College of IT & Management',
          'description': 'Bachelor of Computer Applications (BCA)',
        },
      ],
      'knowsAbout': [
        'Software Architecture',
        'Custom ERP Systems',
        'Web Application Development',
        'Cloud Solutions',
        'Full Stack Engineering',
      ],
      'worksFor': { '@id': 'https://anivexsolution.in/#organization' },
      'sameAs': [
        'https://www.linkedin.com/in/krishndas-chauhan',
        'https://github.com/krishndas-chauhan',
        'https://x.com/krishndas_',
        'https://twitter.com/krishndas_',
        'https://www.instagram.com/krishndas_chauhan',
        'https://www.facebook.com/krishndas.chauhan',
        'https://anivexsolution.in/aboutfounder',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://anivexsolution.in/#website',
      'name': 'Anivex Solution',
      'url': 'https://anivexsolution.in/',
      'inLanguage': ['en-IN', 'hi-IN'],
      'publisher': { '@id': 'https://anivexsolution.in/#organization' },
    },
    {
      '@type': 'WebPage',
      '@id': 'https://anivexsolution.in/#webpage',
      'url': 'https://anivexsolution.in/',
      'name': 'Anivex Solution | Software & Web Development India',
      'description': 'Anivex Solution, founded by Krishndas Chauhan, builds custom websites, web apps, ERP software, and IT solutions for businesses in Uttar Pradesh & India.',
      'inLanguage': 'en-IN',
      'primaryImageOfPage': {
        '@id': 'https://anivexsolution.in/images/krishndas-chauhan-founder-anivex-solution.jpeg',
      },
      'isPartOf': { '@id': 'https://anivexsolution.in/#website' },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://anivexsolution.in/#faqpage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Who is the founder of Anivex Solution?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Krishndas Chauhan is the Founder and Lead Architect of Anivex Solution. Holding a Master of Computer Applications (MCA) from Mangalayatan University, he directs full-stack software architecture, cloud platforms, and custom digital product engineering.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Who is Krishndas Chauhan?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Krishndas Chauhan is an Indian software engineer, tech entrepreneur, and technology architect. As Founder and Lead Architect of Anivex Solution, he architects custom ERPs, scalable SaaS platforms, and enterprise web applications for growing businesses across India and internationally.',
          },
        },
        {
          '@type': 'Question',
          'name': 'What types of software solutions does Anivex Solution build?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'We design and develop custom web applications, Android & iOS mobile apps, custom ERP systems, GST-compliant billing software, and conversion-focused business websites.',
          },
        },
        {
          '@type': 'Question',
          'name': 'How long does a typical project take to develop and launch?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'High-speed business websites and MVPs typically take 1 to 3 weeks. Comprehensive custom software or ERP solutions typically require 4 to 8 weeks depending on the complexity and scope.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Do you provide GST tax invoices and Indian payment options?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, absolutely. We provide official GST tax invoices for all client engagements, and accept UPI (Google Pay, PhonePe, Paytm), IMPS/NEFT direct bank transfers, and standard business payment methods.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Will we have full ownership of the source code and IP?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. Upon project completion and handover, you receive 100% intellectual property ownership, complete source code repository access, and all associated deployment assets.',
          },
        },
        {
          '@type': 'Question',
          'name': 'What kind of support do you provide after launch?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Every Anivex Solution engagement includes post-launch warranty support, bug fixes, server monitoring, and direct WhatsApp communication for rapid responses. We also offer ongoing maintenance retainers.',
          },
        },
      ],
    },
  ],
};

// Inner component with access to Admin Auth Context
function AdminRouteWrapper() {
  const { isAdmin, isLoading } = useAdminAuth();

  return (
    <>
      <SeoHead
        title="Control Room | Anivex Solution"
        description="Official administrative control room and website management system for Anivex Solution."
        isNoIndex={true}
      />
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFDF7] text-[#0B1F3A] font-semibold">Checking administrator access...</div>
      ) : isAdmin ? (
        <AdminDashboard />
      ) : (
        <AdminLogin />
      )}
    </>
  );
}

interface PublicWebsiteProps {
  onNavigatePrivacy: () => void;
  onNavigateTerms: () => void;
  onNavigateService?: (path: string) => void;
  onNavigateFounder?: () => void;
}

// Inner component for Public Anivex Solution Website
function PublicWebsite({ onNavigatePrivacy, onNavigateTerms, onNavigateService, onNavigateFounder }: PublicWebsiteProps) {
  const [selectedProjectType, setSelectedProjectType] = useState<string>('Website');
  const [selectedBudget, setSelectedBudget] = useState<string>('₹15,000 - ₹50,000');

  const handleScrollToSection = (id: string) => {
    if (id === 'hero' || id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 72;
      const rect = element.getBoundingClientRect();
      const targetScrollTop = Math.max(0, rect.top + window.scrollY - navHeight);
      window.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
    }
  };

  const handleSelectService = (title: string) => {
    if (title.toLowerCase().includes('mobile')) {
      setSelectedProjectType('Mobile App');
      setSelectedBudget('₹50,000 - ₹1,50,000');
    } else if (title.toLowerCase().includes('billing') || title.toLowerCase().includes('erp')) {
      setSelectedProjectType('ERP / Business Software');
      setSelectedBudget('₹50,000 - ₹1,50,000');
    } else if (title.toLowerCase().includes('e-com') || title.toLowerCase().includes('store')) {
      setSelectedProjectType('E-Commerce Store');
      setSelectedBudget('₹15,000 - ₹50,000');
    } else if (title.toLowerCase().includes('design') || title.toLowerCase().includes('ui')) {
      setSelectedProjectType('UI/UX Design');
      setSelectedBudget('₹15,000 - ₹50,000');
    } else {
      setSelectedProjectType('Website');
      setSelectedBudget('₹15,000 - ₹50,000');
    }
    handleScrollToSection('contact');
  };

  const handleSelectPricingPackage = (projectType: string, budgetRange: string) => {
    setSelectedProjectType(projectType);
    setSelectedBudget(budgetRange);
    handleScrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#0B1F3A] selection:bg-[#F97316]/20 selection:text-[#F97316]">
      {/* Homepage SEO Head */}
      <SeoHead
        title="Anivex Solution | Software & Web Development India"
        description="Anivex Solution, founded by Krishndas Chauhan, builds custom websites, web apps, ERP software, and IT solutions for businesses in Uttar Pradesh & India."
        canonicalPath="/"
        keywords="Anivex Solution, Krishndas Chauhan, Founder of Anivex Solution, Who is Krishndas Chauhan, Web Development India, Custom Software Uttar Pradesh, ERP Software Lucknow, Software Developer Jaunpur, Web Design Machhlishahar, IT Solutions India"
        ogImage="/images/krishndas-chauhan-founder-anivex-solution.jpeg"
        ogImageAlt="Krishndas Chauhan - Founder & Lead Architect of Anivex Solution (Executive Portrait)"
        ogImageWidth={900}
        ogImageHeight={1599}
        secondaryOgImage={{
          url: '/images/krishndas-chauhan-field-portrait-anivex-solution.jpeg',
          alt: 'Krishndas Chauhan - Founder & Lead Architect of Anivex Solution (Field Portrait)',
          width: 1086,
          height: 1448,
        }}
        twitterImage="/images/krishndas-chauhan-founder-anivex-solution.jpeg"
        author="Krishndas Chauhan"
        schema={HOME_SCHEMA}
      />

      {/* Navigation */}
      <Navbar onNavigateService={onNavigateService} />

      {/* Main Page Content */}
      <main id="main-content">
        <Hero
          onStartProject={() => handleScrollToSection('contact')}
          onExploreSolutions={() => handleScrollToSection('services')}
        />

        <TrustStrip />

        <Services onSelectService={handleSelectService} />

        <Products />

        <Projects />

        <WhyAnivex />

        <About onNavigateFounder={onNavigateFounder} />

        <Testimonials />

        <PricingPackages onSelectPackage={handleSelectPricingPackage} />

        <FaqSection />

        <CTASection
          onStartProject={() => handleScrollToSection('contact')}
        />

        <Contact
          preselectedProjectType={selectedProjectType}
          preselectedBudget={selectedBudget}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigateToPrivacy={onNavigatePrivacy}
        onNavigateToTerms={onNavigateTerms}
        onNavigateToService={onNavigateService}
      />

      {/* Pinned Floating WhatsApp Contact Button for Instant Indian User Interaction */}
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);
  const [searchParams, setSearchParams] = useState<string>(() => typeof window !== 'undefined' ? window.location.search : '');
  const [hash, setHash] = useState<string>(() => typeof window !== 'undefined' ? window.location.hash : '');
  const prevLocationRef = useRef({
    pathname: typeof window !== 'undefined' ? window.location.pathname : '/',
    search: typeof window !== 'undefined' ? window.location.search : '',
    hash: typeof window !== 'undefined' ? window.location.hash : '',
  });

  useEffect(() => {
    const handleLocationSync = () => {
      prevLocationRef.current = {
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash,
      };
      setCurrentPath(window.location.pathname);
      setSearchParams(window.location.search);
      setHash(window.location.hash);
    };

    const handleLocationChange = (event: Event) => {
      const nextPath = window.location.pathname;
      const nextSearch = window.location.search;
      const nextHash = window.location.hash;

      const prev = prevLocationRef.current;
      const pathChanged = nextPath !== prev.pathname;
      const hashChanged = nextHash !== prev.hash;

      prevLocationRef.current = {
        pathname: nextPath,
        search: nextSearch,
        hash: nextHash,
      };

      setCurrentPath(nextPath);
      setSearchParams(nextSearch);
      setHash(nextHash);

      const isPopState = event instanceof PopStateEvent;
      const hasStaleModalToken = isPopState && Boolean((event.state as { productModalToken?: string } | null)?.productModalToken);

      // Never trigger page scroll jumps when a product modal history state is being popped or scrubbed
      if (isPopState && (isProductModalHistoryActive() || hasStaleModalToken)) {
        return;
      }

      if (pathChanged) {
        if (nextHash && nextHash.length > 1) {
          const targetId = nextHash.substring(1).toLowerCase();
          setTimeout(() => {
            const el = document.getElementById(targetId);
            if (el) {
              const navHeight = 72;
              const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - navHeight);
              window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
          }, 150);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      if (hashChanged) {
        if (!nextHash || nextHash === '#hero' || nextHash === '#home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const targetId = nextHash.substring(1).toLowerCase();
          const el =
            document.getElementById(targetId) ||
            document.getElementById(targetId.replace(/-/g, ''));
          if (el) {
            const navHeight = 72;
            const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - navHeight);
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          }
        }
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener(LOCATION_SYNC_EVENT, handleLocationSync);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener(LOCATION_SYNC_EVENT, handleLocationSync);
    };
  }, []);

  const cleanPath = currentPath.replace(/\/$/, '').toLowerCase() || '/';
  const serviceSlug = cleanPath.replace(/^\//, '');
  const isServiceRoute = Boolean(SERVICES_SEO_DATA[serviceSlug]);

  // Detect dedicated CMS / Control Room subdomain (e.g., controlroom.anivexsolution.in, cms.anivexsolution.in)
  const isCmsSubdomain = typeof window !== 'undefined' && Boolean(
    window.location.hostname.toLowerCase().startsWith('controlroom.') ||
    window.location.hostname.toLowerCase().startsWith('cms.') || 
    window.location.hostname.toLowerCase().startsWith('admin.') || 
    window.location.hostname.toLowerCase().startsWith('portal.')
  );

  // Detect dedicated CMS path URLs (/controlroom, /control-room, /cms, /admin, /portal, /manage, /control-panel)
  const isCmsPath = 
    cleanPath.startsWith('/controlroom') ||
    cleanPath.startsWith('/control-room') ||
    cleanPath.startsWith('/admin') || 
    cleanPath.startsWith('/cms') || 
    cleanPath.startsWith('/portal') || 
    cleanPath.startsWith('/manage') ||
    cleanPath.startsWith('/control-panel');

  // Detect CMS query or hash parameters (e.g. ?route=controlroom, ?admin=true, #controlroom)
  const isCmsQuery = Boolean(
    searchParams.toLowerCase().includes('controlroom') ||
    searchParams.toLowerCase().includes('admin') ||
    searchParams.toLowerCase().includes('cms') ||
    hash.toLowerCase() === '#controlroom' ||
    hash.toLowerCase() === '#admin'
  );

  const isAdminRoute = isCmsSubdomain || isCmsPath || isCmsQuery;
  const isPrivacyRoute = cleanPath === '/privacy-policy' || cleanPath === '/privacy';
  const isTermsRoute = cleanPath === '/terms-and-conditions' || cleanPath === '/terms';
  const isFounderRoute = cleanPath === '/aboutfounder' || cleanPath === '/about-founder' || cleanPath === '/founder';

  useEffect(() => {
    const slug = (cleanPath.replace(/^\//, '') || '').toLowerCase();
    const knownSections = ['about', 'services', 'products', 'projects', 'why-anivex', 'testimonials', 'pricing', 'faq', 'contact'];
    if (knownSections.includes(slug)) {
      setTimeout(() => {
        const el = document.getElementById(slug);
        if (el) {
          const navHeight = 72;
          const rect = el.getBoundingClientRect();
          const targetY = Math.max(0, rect.top + window.scrollY - navHeight);
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      }, 150);
    }
  }, [cleanPath]);

  const syncLocationRef = (pathname: string, nextHash = '') => {
    prevLocationRef.current = {
      pathname,
      search: window.location.search,
      hash: nextHash,
    };
  };

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    syncLocationRef('/', '');
    setCurrentPath('/');
    setHash('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToFounder = () => {
    window.history.pushState({}, '', '/aboutfounder');
    syncLocationRef('/aboutfounder', '');
    setCurrentPath('/aboutfounder');
    setHash('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToService = (path: string) => {
    const target = path.startsWith('/') ? path : `/${path}`;
    window.history.pushState({}, '', target);
    syncLocationRef(target, '');
    setCurrentPath(target);
    setHash('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPrivacy = () => {
    window.history.pushState({}, '', '/privacy-policy');
    syncLocationRef('/privacy-policy', '');
    setCurrentPath('/privacy-policy');
    setHash('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTerms = () => {
    window.history.pushState({}, '', '/terms-and-conditions');
    syncLocationRef('/terms-and-conditions', '');
    setCurrentPath('/terms-and-conditions');
    setHash('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToContact = () => {
    window.history.pushState({}, '', '/#contact');
    syncLocationRef('/', '#contact');
    setCurrentPath('/');
    setHash('#contact');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <AdminAuthProvider>
      <CmsProvider>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FFFDF7] text-[#0B1F3A] text-sm font-medium">Loading...</div>}>
          {isAdminRoute ? (
            <AdminRouteWrapper />
          ) : isFounderRoute ? (
            <AboutFounderPage
              onBackToHome={navigateToHome}
              onNavigateService={navigateToService}
              onNavigateContact={navigateToContact}
            />
          ) : isPrivacyRoute ? (
            <>
              <SeoHead
                title="Privacy Policy & DPDP Compliance | Anivex Solution"
                description="Read Anivex Solution's Privacy Policy detailing client data protection, confidential software IP handling, GST billing privacy, and DPDP Act compliance."
                canonicalPath="/privacy-policy"
                keywords="Anivex Solution Privacy Policy, DPDP Act 2023 Compliance, Client Data Protection India, Software IP Confidentiality"
                schema={{
                  '@context': 'https://schema.org',
                  '@graph': [
                    {
                      '@type': 'WebPage',
                      '@id': 'https://anivexsolution.in/privacy-policy#webpage',
                      'url': 'https://anivexsolution.in/privacy-policy',
                      'name': 'Privacy Policy & DPDP Compliance | Anivex Solution',
                      'description': "Read Anivex Solution's Privacy Policy detailing client data protection, confidential software IP handling, GST billing privacy, and DPDP Act compliance.",
                      'inLanguage': 'en-IN',
                      'isPartOf': { '@id': 'https://anivexsolution.in/#website' },
                    },
                    {
                      '@type': 'BreadcrumbList',
                      'itemListElement': [
                        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://anivexsolution.in/' },
                        { '@type': 'ListItem', 'position': 2, 'name': 'Privacy Policy', 'item': 'https://anivexsolution.in/privacy-policy' },
                      ],
                    },
                  ],
                }}
              />
              <PrivacyPolicyPage onBackToHome={navigateToHome} />
            </>
          ) : isTermsRoute ? (
            <>
              <SeoHead
                title="Terms & Conditions & Service SLA | Anivex Solution"
                description="Review Anivex Solution's Terms & Conditions covering project scope, GST invoicing, 100% source code IP handover, post-launch warranty, and Indian law."
                canonicalPath="/terms-and-conditions"
                keywords="Anivex Solution Terms and Conditions, Software Engineering SLA, 100% Code IP Ownership India, GST Invoicing Terms"
                schema={{
                  '@context': 'https://schema.org',
                  '@graph': [
                    {
                      '@type': 'WebPage',
                      '@id': 'https://anivexsolution.in/terms-and-conditions#webpage',
                      'url': 'https://anivexsolution.in/terms-and-conditions',
                      'name': 'Terms & Conditions & Service SLA | Anivex Solution',
                      'description': "Review Anivex Solution's Terms & Conditions covering project scope, GST invoicing, 100% source code IP handover, post-launch warranty, and Indian law.",
                      'inLanguage': 'en-IN',
                      'isPartOf': { '@id': 'https://anivexsolution.in/#website' },
                    },
                    {
                      '@type': 'BreadcrumbList',
                      'itemListElement': [
                        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://anivexsolution.in/' },
                        { '@type': 'ListItem', 'position': 2, 'name': 'Terms & Conditions', 'item': 'https://anivexsolution.in/terms-and-conditions' },
                      ],
                    },
                  ],
                }}
              />
              <TermsAndConditionsPage onBackToHome={navigateToHome} />
            </>
          ) : isServiceRoute && SERVICES_SEO_DATA[serviceSlug] ? (
            <ServicePage
              service={SERVICES_SEO_DATA[serviceSlug]}
              onNavigateHome={navigateToHome}
              onNavigateService={navigateToService}
              onNavigateContact={navigateToContact}
            />
          ) : (
            <PublicWebsite
              onNavigatePrivacy={navigateToPrivacy}
              onNavigateTerms={navigateToTerms}
              onNavigateService={navigateToService}
              onNavigateFounder={navigateToFounder}
            />
          )}
        </Suspense>
      </CmsProvider>
    </AdminAuthProvider>
  );
}

