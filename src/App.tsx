import React, { useState, useEffect } from 'react';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { CmsProvider } from './context/CmsContext';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { About } from './components/About';
import { Services } from './components/Services';
import { Products } from './components/Products';
import { Solutions } from './components/Solutions';
import { Process } from './components/Process';
import { Technologies } from './components/Technologies';
import { Projects } from './components/Projects';
import { WhyAnivex } from './components/WhyAnivex';
import { CaseStudies } from './components/CaseStudies';
import { CTASection } from './components/CTASection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AnivexAiModal } from './components/AnivexAiModal';

import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Inner component with access to Admin Auth Context
function AdminRouteWrapper() {
  const { isAdmin } = useAdminAuth();

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return <AdminLogin />;
}

// Inner component for Public ANIVEX Website
function PublicWebsite() {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState<string>('Website');

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (title: string) => {
    if (title.toLowerCase().includes('mobile')) {
      setSelectedProjectType('Mobile App');
    } else if (title.toLowerCase().includes('ai')) {
      setSelectedProjectType('AI Solution');
    } else if (title.toLowerCase().includes('erp')) {
      setSelectedProjectType('ERP / Business Software');
    } else if (title.toLowerCase().includes('design') || title.toLowerCase().includes('ui')) {
      setSelectedProjectType('UI/UX Design');
    } else {
      setSelectedProjectType('Website');
    }
    handleScrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#05070B] text-[#D9DCE1] selection:bg-[#D6A84F]/30 selection:text-[#F5C85B]">
      {/* Navigation */}
      <Navbar onOpenAiDemo={() => setIsAiModalOpen(true)} />

      {/* Main Page Content */}
      <main id="main-content">
        <Hero
          onStartProject={() => handleScrollToSection('contact')}
          onExploreSolutions={() => handleScrollToSection('solutions')}
        />

        <TrustStrip />

        <About />

        <Services onSelectService={handleSelectService} />

        <Products onOpenAiDemo={() => setIsAiModalOpen(true)} />

        <Solutions onSelectSolution={handleSelectService} />

        <Process />

        <Technologies />

        <Projects />

        <WhyAnivex />

        <CaseStudies />

        <CTASection
          onStartProject={() => handleScrollToSection('contact')}
          onTalkToAnivex={() => setIsAiModalOpen(true)}
        />

        <Contact preselectedProjectType={selectedProjectType} />
      </main>

      {/* Footer */}
      <Footer />

      {/* ANIVEX AI Assistant Live Interactive Modal */}
      <AnivexAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
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

  return (
    <AdminAuthProvider>
      <CmsProvider>
        {isAdminRoute ? <AdminRouteWrapper /> : <PublicWebsite />}
      </CmsProvider>
    </AdminAuthProvider>
  );
}
