import React from 'react';
import { ArrowUp, Lock, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface FooterProps {
  onNavigateToPrivacy?: () => void;
  onNavigateToTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToPrivacy, onNavigateToTerms }) => {
  const { companyInfo, socialLinks } = useCms();
  const rawPhone = companyInfo?.phone || '+91 98765 43210';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const phoneToUse = cleanPhone.length >= 10 ? cleanPhone : '919876543210';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateToPrivacy) {
      onNavigateToPrivacy();
    } else {
      window.history.pushState({}, '', '/privacy-policy');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateToTerms) {
      onNavigateToTerms();
    } else {
      window.history.pushState({}, '', '/terms-and-conditions');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <footer className="bg-[#0B1F3A] text-slate-300 pt-16 pb-12 border-t border-[#0B1F3A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Brand Info & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#hero" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center p-1.5 shadow-xs">
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
                    stroke="#F97316"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                Anivex <span className="text-[#F97316]">Solution</span>
              </span>
            </a>

            <p className="font-heading text-sm text-[#F97316] font-semibold">
              Technology. Designed for Growth.
            </p>

            <p className="text-xs text-slate-300/80 leading-relaxed max-w-sm">
              Anivex Solution builds modern websites, enterprise software, ERP systems, mobile applications and intelligent digital solutions for growing businesses.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${phoneToUse}?text=${encodeURIComponent('Namaste Anivex Solution!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={`tel:${rawPhone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#F97316]" />
                <span>{rawPhone}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="#why-anivex" className="hover:text-white transition-colors">Why Anivex</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-white transition-colors">Web Development</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Mobile Applications</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">ERP & Business Software</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Custom Software Engineering</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">UI/UX Design</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Cloud & Digital Solutions</a></li>
            </ul>
          </div>

          {/* Company & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company & Legal</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-1.5 text-slate-300/80">
                <Mail className="w-3.5 h-3.5 text-[#F97316]" />
                <a href={`mailto:${companyInfo.businessEmail || 'anivexsolution@gmail.com'}`} className="hover:text-white">
                  {companyInfo.businessEmail || 'anivexsolution@gmail.com'}
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300/80">
                <MapPin className="w-3.5 h-3.5 text-[#15803D]" />
                <span>Bengaluru & India · Worldwide Delivery</span>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  onClick={handlePrivacyClick}
                  className="hover:text-[#F97316] transition-colors cursor-pointer block pt-1"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-and-conditions"
                  onClick={handleTermsClick}
                  className="hover:text-[#F97316] transition-colors cursor-pointer block"
                >
                  Terms & Conditions
                </a>
              </li>
              <li className="pt-1">
                <a
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#D4A72C] text-xs font-semibold transition-colors"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin CMS Panel</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="flex items-center gap-1.5">
            © 2026 Anivex Solution. Built with pride in India.
          </p>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            <a
              href="/privacy-policy"
              onClick={handlePrivacyClick}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-and-conditions"
              onClick={handleTermsClick}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms & Conditions
            </a>
            <a href="/admin" className="hover:text-[#F97316] transition-colors">Admin Dashboard</a>
            <a href="#contact" className="hover:text-white transition-colors">Start a Project</a>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
