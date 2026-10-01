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

import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Inner component with access to Admin Auth Context
function AdminRouteWrapper() {
  const { isAdmin, isLoading } = useAdminAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#FFFDF7] text-[#0B1F3A] font-semibold">Checking administrator access...</div>;
  }

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return <AdminLogin />;
}

interface PublicWebsiteProps {
  onNavigatePrivacy: () => void;
  onNavigateTerms: () => void;
}

// Inner component for Public Anivex Solution Website
function PublicWebsite({ onNavigatePrivacy, onNavigateTerms }: PublicWebsiteProps) {
  const [selectedProjectType, setSelectedProjectType] = useState<string>('Website');
  const [selectedBudget, setSelectedBudget] = useState<string>('₹15,000 - ₹50,000');

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
      {/* Navigation */}
      <Navbar />

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
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const isAdminRoute = currentPath.startsWith('/admin');
  const isPrivacyRoute = currentPath === '/privacy-policy' || currentPath === '/privacy';
  const isTermsRoute = currentPath === '/terms-and-conditions' || currentPath === '/terms';

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
  };

  const navigateToPrivacy = () => {
    window.history.pushState({}, '', '/privacy-policy');
    setCurrentPath('/privacy-policy');
  };

  const navigateToTerms = () => {
    window.history.pushState({}, '', '/terms-and-conditions');
    setCurrentPath('/terms-and-conditions');
  };

  return (
    <AdminAuthProvider>
      <CmsProvider>
        {isAdminRoute ? (
          <AdminRouteWrapper />
        ) : isPrivacyRoute ? (
          <PrivacyPolicyPage onBackToHome={navigateToHome} />
        ) : isTermsRoute ? (
          <TermsAndConditionsPage onBackToHome={navigateToHome} />
        ) : (
          <PublicWebsite
            onNavigatePrivacy={navigateToPrivacy}
            onNavigateTerms={navigateToTerms}
          />
        )}
      </CmsProvider>
    </AdminAuthProvider>
  );
}
