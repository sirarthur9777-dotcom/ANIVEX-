import React from 'react';
import { ArrowUp, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05070B] border-t border-white/10 pt-16 pb-12 relative text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2 space-y-4">
            <a href="#hero" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#121824] border border-[#D6A84F]/30 p-1 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M 20,80 L 50,20 L 80,80 M 35,55 L 65,55"
                    fill="none"
                    stroke="#F5C85B"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 30,20 L 70,80"
                    fill="none"
                    stroke="#D9DCE1"
                    strokeWidth="8"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                </svg>
              </div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">
                ANIVEX <span className="text-[#D6A84F] text-xs font-semibold">SOLUTIONS</span>
              </span>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Innovate. Develop. Deliver. <br />
              Building scalable software, AI systems, and custom digital technology for forward-thinking enterprises and startups.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" className="hover:text-white transition-colors">About & Founder</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-white transition-colors">Software</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">AI & Automation</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Web & Mobile</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">ERP Systems</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">UI/UX Design</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Connect & Admin</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#F5C85B] transition-colors">LinkedIn</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#F5C85B] transition-colors">GitHub</a></li>
              <li className="pt-2">
                <a
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0B0F16] border border-[#D6A84F]/40 text-[#F5C85B] font-mono text-[11px] font-bold hover:bg-[#121824] transition-colors"
                >
                  <Lock className="w-3 h-3 text-[#F5C85B]" />
                  <span>Admin Panel</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 ANIVEX Solutions. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="/admin" className="hover:text-[#F5C85B] transition-colors font-mono">Admin CMS</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-[#0B0F16] border border-white/10 text-white hover:border-[#D6A84F] hover:text-[#F5C85B] transition-colors cursor-pointer"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
