import React, { useEffect } from 'react';
import { ArrowLeft, ShieldCheck, Mail, Phone, Lock, FileText } from 'lucide-react';
import { Footer } from './Footer';

interface PrivacyPolicyPageProps {
  onBackToHome: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBackToHome }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = "Privacy Policy | Anivex Solution";
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#0B1F3A] flex flex-col justify-between selection:bg-[#F97316]/20 selection:text-[#F97316]">
      
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-b border-[#0B1F3A]/10 py-4 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#0B1F3A]/15 text-[#0B1F3A] text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 text-[#F97316]" />
              <span>Back to Home</span>
            </button>
          </div>

          <a href="/" onClick={(e) => { e.preventDefault(); onBackToHome(); }} className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-[#0B1F3A] flex items-center justify-center p-1.5 shadow-xs">
              <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                <path d="M 20,80 L 50,20 L 80,80 M 35,55 L 65,55" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 32,22 L 68,78" fill="none" stroke="#D4A72C" strokeWidth="8" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-heading font-extrabold text-lg sm:text-xl text-[#0B1F3A] tracking-tight">
              Anivex Solution
            </span>
          </a>
        </div>
      </header>

      {/* Main Content Article */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1 w-full">
        
        {/* Page Heading */}
        <div className="mb-10 text-center sm:text-left border-b border-[#0B1F3A]/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15803D]/10 text-[#15803D] text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Digital Data Protection & Privacy</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0B1F3A] tracking-tight mb-3">
            Privacy Policy
          </h1>

          <p className="text-xs sm:text-sm text-[#0B1F3A]/70">
            Last Updated: August 2026 • Compliant with Indian Information Technology Act (2000) & Digital Personal Data Protection (DPDP) Act 2023.
          </p>
        </div>

        {/* Content Clauses */}
        <article className="space-y-8 text-sm text-[#0B1F3A]/85 leading-relaxed font-normal">
          
          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#0B1F3A]">1. Introduction & Overview</h2>
            <p>
              Welcome to <strong>Anivex Solution</strong> ("we", "our", or "us"). We provide bespoke software engineering, enterprise web applications, ERP systems, mobile application development, and technological consulting services to Indian and global businesses.
            </p>
            <p>
              This Privacy Policy explains how we collect, store, handle, and protect your information when you access our website (<strong>https://anivex.com</strong>), submit project inquiries, communicate through WhatsApp/email, or contract our engineering services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#0B1F3A]">2. Information We Collect</h2>
            <p>We only collect data that is strictly necessary for software consulting, project scoping, and business invoicing:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>Contact Inquiries:</strong> Full name, professional email address, phone number, company name, and project scope details provided voluntarily through our scoping form.</li>
              <li><strong>Commercial & Billing Data:</strong> GSTIN (Goods and Services Tax Identification Number), registered corporate address, PAN, and transaction reference numbers when processing official invoices and contracts.</li>
              <li><strong>Technical Logs & Diagnostics:</strong> Browser type, operating system, and anonymous access logs solely used for server security, performance monitoring, and anti-fraud verification.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#0B1F3A]">3. How We Use Your Data</h2>
            <p>We process your data strictly for legitimate operational purposes:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>To evaluate your technical requirements and formulate detailed project proposals, quotations, and service agreements.</li>
              <li>To execute contractually agreed software development milestones, source code deployments, and ongoing support retainers.</li>
              <li>To generate legally compliant GST tax invoices and verify banking/UPI remittances.</li>
              <li>To maintain direct project communication via phone, email, and verified WhatsApp business channels.</li>
            </ul>
            <p className="font-medium text-[#0B1F3A]">
              We do NOT sell, rent, monetize, or trade your personal or business data to third-party advertisers or data brokers under any circumstances.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#0B1F3A]">4. Data Protection & Security Controls</h2>
            <p>
              We implement enterprise security standards to safeguard your project information. All data transmissions are encrypted using Transport Layer Security (TLS/HTTPS). Cloud infrastructure, databases, and source code repositories are fortified with multi-factor authentication and role-based access control.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#0B1F3A]">5. Intellectual Property & Code Confidentiality</h2>
            <p>
              Any proprietary business logic, proprietary datasets, product architecture specifications, and custom source code shared during our engagements are treated as strictly confidential under bilateral non-disclosure provisions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#0B1F3A]">6. Your Rights under Indian Law (DPDP Act)</h2>
            <p>Under the Digital Personal Data Protection Act, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Request an audit copy of the personal information stored in our systems.</li>
              <li>Request correction or rectification of incomplete or inaccurate business information.</li>
              <li>Request the erasure of your contact inquiry details when no ongoing legal contract or tax retention requirement exists.</li>
            </ul>
          </section>

          <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 shadow-xs">
            <h2 className="font-heading font-bold text-lg text-[#0B1F3A] flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#F97316]" />
              <span>Grievance Officer & Data Inquiries</span>
            </h2>
            <p className="text-xs text-[#0B1F3A]/70">
              For any privacy-related requests, questions regarding data handling, or grievance redressal, please write directly to our designated compliance desk:
            </p>
            <div className="pt-2 text-xs space-y-1">
              <p><strong>Entity:</strong> Anivex Solution</p>
              <p><strong>Designation:</strong> Data Grievance Redressal Officer</p>
              <p><strong>Official Email:</strong> <a href="mailto:anivexsolution@gmail.com" className="text-[#F97316] font-semibold underline">anivexsolution@gmail.com</a></p>
              <p><strong>Direct WhatsApp / Helpline:</strong> +91 98765 43210</p>
              <p><strong>Jurisdiction:</strong> India</p>
            </div>
          </section>

        </article>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};
