import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { siteContent, companyInfo } = useCms();

  const rawPhone = companyInfo?.phone || '+91 98765 43210';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const phoneToUse = cleanPhone.length >= 10 ? cleanPhone : '919876543210';

  const whatsappUrl = `https://wa.me/${phoneToUse}?text=${encodeURIComponent(
    'Namaste Anivex Solution! I would like to inquire about your software engineering and digital solutions.'
  )}`;

  useEffect(() => {
    if (window.location.hash) {
      const initialId = window.location.hash.substring(1);
      const element = document.getElementById(initialId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'services', 'products', 'projects', 'why-anivex', 'testimonials', 'faq', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.startsWith('#') ? href.substring(1) : href;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', href);
    }
  };

  // Nav items from CMS with fallback
  const navSettings = siteContent.navbar;
  const navItems = (navSettings?.items && navSettings.items.length > 0)
    ? navSettings.items.filter((item) => item.visible).sort((a, b) => a.order - b.order)
    : [
        { id: '1', label: 'Home', href: '#hero', visible: true, order: 1 },
        { id: '2', label: 'About', href: '#about', visible: true, order: 2 },
        { id: '3', label: 'Services', href: '#services', visible: true, order: 3 },
        { id: '4', label: 'Products', href: '#products', visible: true, order: 4 },
        { id: '5', label: 'Projects', href: '#projects', visible: true, order: 5 },
        { id: '6', label: 'Why Anivex', href: '#why-anivex', visible: true, order: 6 },
        { id: '7', label: 'FAQ', href: '#faq', visible: true, order: 7 },
        { id: '8', label: 'Contact', href: '#contact', visible: true, order: 8 },
      ];

  const brandName = navSettings?.brandName || 'Anivex Solution';
  const ctaText = navSettings?.ctaText || 'Start a Project →';
  const ctaLink = navSettings?.ctaLink || '#contact';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FFFDF7]/95 backdrop-blur-md border-b border-[#0B1F3A]/10 shadow-sm py-3'
          : 'bg-[#FFFDF7]/80 backdrop-blur-sm border-b border-[#0B1F3A]/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-2.5 group cursor-pointer"
          id="nav-logo"
        >
          {/* Subtle Indian geometric emblem */}
          <div className="w-8 h-8 rounded-lg bg-[#0B1F3A] flex items-center justify-center p-1.5 shadow-sm group-hover:bg-[#F97316] transition-colors">
            <svg viewBox="0 0 100 100" className="w-full h-full text-white">
              <path
                d="M 20,80 L 50,20 L 80,80 M 35,55 L 65,55"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 32,22 L 68,78"
                fill="none"
                stroke="#D4A72C"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-[#0B1F3A] group-hover:text-[#F97316] transition-colors">
            {brandName}
          </span>
        </a>

        {/* Zone 2: Clean text navigation links with subtle hover effect */}
        <nav className="hidden lg:flex items-center gap-6" id="desktop-nav">
          {navItems.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.id || link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors whitespace-nowrap relative py-1 ${
                  isActive
                    ? 'text-[#F97316] font-semibold'
                    : 'text-[#0B1F3A]/80 hover:text-[#0B1F3A]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F97316] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#15803D] bg-[#15803D]/10 hover:bg-[#15803D]/20 transition-colors"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-current text-[#15803D]" />
            <span>WhatsApp</span>
          </a>

          <a
            href={ctaLink}
            onClick={(e) => handleNavClick(e, ctaLink)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold tracking-wide transition-all shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap"
            id="nav-cta-btn"
          >
            <span>{ctaText}</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#15803D]/10 text-[#15803D] text-xs font-medium flex items-center justify-center sm:hidden"
            aria-label="WhatsApp Contact"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#0B1F3A]/5 text-[#0B1F3A] hover:bg-[#0B1F3A]/10 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#FFFDF7] border-b border-[#0B1F3A]/10 overflow-hidden px-4 py-4 shadow-lg"
            id="mobile-menu-drawer"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((link) => (
                <a
                  key={link.id || link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-[#0B1F3A] hover:bg-[#0B1F3A]/5 hover:text-[#F97316] transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-3 mt-2 border-t border-[#0B1F3A]/10 flex flex-col gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-lg bg-[#15803D] text-white text-xs font-bold text-center flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Inquiry (+91)</span>
                </a>

                <a
                  href={ctaLink}
                  onClick={(e) => handleNavClick(e, ctaLink)}
                  className="w-full py-2.5 rounded-lg bg-[#F97316] text-white text-xs font-bold text-center flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
