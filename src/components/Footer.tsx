import React from 'react';
import { ArrowUp, Lock, Phone, Mail, MapPin } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { formatWhatsAppUrl, formatPhoneTel } from '../services/websiteSettings';

interface FooterProps {
  onNavigateToPrivacy?: () => void;
  onNavigateToTerms?: () => void;
  onNavigateToService?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToPrivacy, onNavigateToTerms, onNavigateToService }) => {
  const { companyInfo, websiteSettings } = useCms();
  const phone = websiteSettings?.phone || companyInfo?.phone || '';
  const email = websiteSettings?.email || companyInfo?.businessEmail || '';
  const whatsappUrl = formatWhatsAppUrl(websiteSettings?.whatsapp || phone, 'Namaste Anivex Solution!');
  const phoneTel = formatPhoneTel(phone);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (onNavigateToService) {
      onNavigateToService(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
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
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp"
                aria-label="Chat on WhatsApp"
                className="inline-flex items-center justify-center p-2 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xs transition-transform hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.12 19.77 7.85 19.02L7.55 18.84L4.43 19.66L5.26 16.62L5.06 16.3C4.24 15 3.8 13.48 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.57 14.39C16.32 14.27 15.1 13.67 14.87 13.58C14.64 13.5 14.48 13.45 14.31 13.7C14.15 13.95 13.67 14.52 13.52 14.69C13.38 14.85 13.23 14.88 12.98 14.75C12.74 14.63 11.94 14.37 11 13.53C10.26 12.87 9.77 12.06 9.62 11.82C9.48 11.57 9.61 11.44 9.73 11.32C9.84 11.21 9.98 11.03 10.1 10.88C10.23 10.74 10.27 10.64 10.35 10.47C10.43 10.31 10.39 10.16 10.33 10.04C10.27 9.92 9.77 8.7 9.57 8.19C9.37 7.7 9.17 7.76 9.02 7.75C8.88 7.75 8.71 7.75 8.55 7.75C8.38 7.75 8.12 7.81 7.89 8.06C7.66 8.31 7.02 8.91 7.02 10.13C7.02 11.35 7.91 12.52 8.03 12.69C8.16 12.85 9.78 15.36 12.27 16.43C12.86 16.69 13.32 16.84 13.68 16.95C14.28 17.14 14.82 17.11 15.25 17.05C15.73 16.98 16.73 16.45 16.94 15.86C17.14 15.27 17.14 14.76 17.08 14.66C17.02 14.55 16.82 14.51 16.57 14.39Z" />
                </svg>
              </a>

              <a
                href={phoneTel}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#F97316]" />
                <span>{phone}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li>
                <a
                  href="/aboutfounder"
                  onClick={(e) => {
                    e.preventDefault();
                    window.history.pushState({}, '', '/aboutfounder');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  className="text-[#F97316] hover:text-white transition-colors font-medium flex items-center gap-1"
                >
                  <span>Meet Our Founder</span>
                  <span className="text-[10px] bg-[#F97316]/20 px-1.5 py-0.2 rounded text-[#F97316]">Krishndas</span>
                </a>
              </li>
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
              <li><a href="/web-development" onClick={(e) => handleServiceClick(e, '/web-development')} className="hover:text-white transition-colors">Web Development</a></li>
              <li><a href="/web-design" onClick={(e) => handleServiceClick(e, '/web-design')} className="hover:text-white transition-colors">UI/UX Web Design</a></li>
              <li><a href="/software-development" onClick={(e) => handleServiceClick(e, '/software-development')} className="hover:text-white transition-colors">Software Development</a></li>
              <li><a href="/web-application-development" onClick={(e) => handleServiceClick(e, '/web-application-development')} className="hover:text-white transition-colors">Web Applications</a></li>
              <li><a href="/erp-development" onClick={(e) => handleServiceClick(e, '/erp-development')} className="hover:text-white transition-colors">ERP & Business Software</a></li>
              <li><a href="/custom-software" onClick={(e) => handleServiceClick(e, '/custom-software')} className="hover:text-white transition-colors">Custom Software</a></li>
            </ul>
          </div>

          {/* Company & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company & Legal</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-1.5 text-slate-300/80">
                <Mail className="w-3.5 h-3.5 text-[#F97316]" />
                <a href={`mailto:${email}`} className="hover:text-white">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300/80">
                <MapPin className="w-3.5 h-3.5 text-[#15803D]" />
                <span>{websiteSettings?.headquarters || 'Lucknow, Uttar Pradesh, India · Worldwide Delivery'}</span>
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
