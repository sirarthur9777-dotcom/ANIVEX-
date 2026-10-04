import React, { useState, useEffect } from 'react';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { CmsProvider } from './context/CmsContext';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { About } from './components/About';
import { Services } from './components/Services';
import { PricingPackages } from './components/PricingPackages';
import { Products } from './components/Products';
import { Solutions } from './components/Solutions';
import { Process } from './components/Process';
import { Technologies } from './components/Technologies';
import { Projects } from './components/Projects';
import { WhyAnivex } from './components/WhyAnivex';
import { CaseStudies } from './components/CaseStudies';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { CTASection } from './components/CTASection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsAndConditionsPage } from './components/TermsAndConditionsPage';
import { ServicePage } from './components/ServicePage';
import { SeoHead } from './components/SeoHead';
import { SERVICES_SEO_DATA } from './data/servicesSeoData';

import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Inner component with access to Admin Auth Context
function AdminRouteWrapper() {
  const { isAdmin, isLoading } = useAdminAuth();

  return (
    <>
      <SeoHead
        title="Admin Console | Anivex Solution"
        description="Administrative portal for Anivex Solution."
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
}

// Inner component for Public Anivex Solution Website
function PublicWebsite({ onNavigatePrivacy, onNavigateTerms, onNavigateService }: PublicWebsiteProps) {
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
        title="Anivex Solution | Web Development & IT Solutions"
        description="Anivex Solution provides professional website development, web applications, custom software, ERP systems, and IT solutions for businesses in India."
        canonicalPath="/"
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

        <About />

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

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const cleanPath = currentPath.replace(/\/$/, '').toLowerCase() || '/';
  const serviceSlug = cleanPath.replace(/^\//, '');
  const isServiceRoute = Boolean(SERVICES_SEO_DATA[serviceSlug]);

  const isAdminRoute = currentPath.startsWith('/admin');
  const isPrivacyRoute = cleanPath === '/privacy-policy' || cleanPath === '/privacy';
  const isTermsRoute = cleanPath === '/terms-and-conditions' || cleanPath === '/terms';

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

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToService = (path: string) => {
    const target = path.startsWith('/') ? path : `/${path}`;
    window.history.pushState({}, '', target);
    setCurrentPath(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPrivacy = () => {
    window.history.pushState({}, '', '/privacy-policy');
    setCurrentPath('/privacy-policy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTerms = () => {
    window.history.pushState({}, '', '/terms-and-conditions');
    setCurrentPath('/terms-and-conditions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToContact = () => {
    window.history.pushState({}, '', '/#contact');
    setCurrentPath('/');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <AdminAuthProvider>
      <CmsProvider>
        {isAdminRoute ? (
          <AdminRouteWrapper />
        ) : isPrivacyRoute ? (
          <>
            <SeoHead
              title="Privacy Policy | Anivex Solution"
              description="Privacy policy and data governance statement for Anivex Solution clients and website visitors."
              canonicalPath="/privacy-policy"
            />
            <PrivacyPolicyPage onBackToHome={navigateToHome} />
          </>
        ) : isTermsRoute ? (
          <>
            <SeoHead
              title="Terms & Conditions | Anivex Solution"
              description="Terms and conditions for software engineering, website development, and IT services provided by Anivex Solution."
              canonicalPath="/terms-and-conditions"
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
          />
        )}
      </CmsProvider>
    </AdminAuthProvider>
  );
}

