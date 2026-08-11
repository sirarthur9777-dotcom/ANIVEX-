import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { NAV_LINKS } from '../data/companyData';

interface NavbarProps {
  onOpenAiDemo?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAiDemo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Simple active link detection based on section top offsets
      const sections = NAV_LINKS.map(link => link.href.substring(1));
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
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#05070B]/85 backdrop-blur-md border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3.5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo Area */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-2.5 group cursor-pointer"
          id="nav-logo"
        >
          {/* Logo Icon Mark */}
          <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-[#121824] to-[#0B0F16] border border-[#D6A84F]/30 p-1.5 flex items-center justify-center transition-all duration-300 group-hover:border-[#F5C85B] group-hover:shadow-[0_0_15px_rgba(214,168,79,0.3)]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M 20,80 L 50,20 L 80,80 M 35,55 L 65,55"
                fill="none"
                stroke="url(#navGoldGrad)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 30,20 L 70,80"
                fill="none"
                stroke="#D9DCE1"
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.85"
              />
              <defs>
                <linearGradient id="navGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5C85B" />
                  <stop offset="100%" stopColor="#D6A84F" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#F5C85B] transition-all">
                ANIVEX
              </span>
              <span className="font-display font-semibold text-xs tracking-widest text-[#D6A84F] uppercase">
                SOLUTIONS
              </span>
            </div>
            <span className="text-[9px] tracking-widest text-slate-400 font-mono uppercase mt-0.5">
              NEXT-GEN TECH
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-white/10" id="desktop-nav">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wide rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 bg-gradient-to-r from-[#D6A84F]/20 to-[#F5C85B]/10 rounded-full border border-[#D6A84F]/40"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {onOpenAiDemo && (
            <button
              onClick={onOpenAiDemo}
              className="px-3 py-2 rounded-full bg-[#0B0F16] border border-[#D6A84F]/30 hover:border-[#F5C85B] text-xs font-medium text-[#F5C85B] flex items-center gap-1.5 transition-all hover:shadow-[0_0_12px_rgba(214,168,79,0.25)] cursor-pointer"
              title="Try ANIVEX AI Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#F5C85B]" />
              <span>ANIVEX AI</span>
            </button>
          )}

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D6A84F] to-[#F5C85B] text-[#05070B] text-xs font-bold tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,200,91,0.4)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            id="nav-lets-talk-btn"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          {onOpenAiDemo && (
            <button
              onClick={onOpenAiDemo}
              className="p-2 rounded-full bg-[#0B0F16] border border-[#D6A84F]/40 text-[#F5C85B] text-xs font-medium flex items-center justify-center"
              aria-label="ANIVEX AI"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-[#0B0F16] border border-white/10 text-white hover:text-[#F5C85B] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#05070B]/95 backdrop-blur-xl border-b border-white/10 overflow-hidden px-4 py-6"
            id="mobile-menu-drawer"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-[#D6A84F]"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#F5C85B] text-[#05070B] text-xs font-bold text-center flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Let's Talk</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
