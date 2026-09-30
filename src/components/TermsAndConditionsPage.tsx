import React, { useEffect } from 'react';
import { ArrowLeft, FileText, CheckCircle2, ShieldCheck, Mail, Scale } from 'lucide-react';
import { Footer } from './Footer';

interface TermsAndConditionsPageProps {
  onBackToHome: () => void;
}

export const TermsAndConditionsPage: React.FC<TermsAndConditionsPageProps> = ({ onBackToHome }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = "Terms & Conditions | Anivex Solution";
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] text-xs font-bold uppercase tracking-wider mb-3">
            <Scale className="w-4 h-4 text-[#F97316]" />
            <span>Commercial & Legal Agreement</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0B1F3A] tracking-tight mb-3">
            Terms & Conditions
          </h1>

          <p className="text-xs sm:text-sm text-[#0B1F3A]/70">
            Last Updated: August 2026 • Governing software engineering agreements, quotations, intellectual property, and client engagements.
          </p>
        </div>

        {/* Content Clauses */}
        <article className="space-y-8 text-sm text-[#0B1F3A]/85 leading-relaxed font-normal">
          
          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#0B1F3A]">1. Agreement & Acceptance</h2>
            <p>
              These Terms & Conditions ("Terms") govern all business engagements, custom software contracts, quotations, and services provided by <strong>Anivex Solution</strong> ("Company", "we", "us") to the client entity or individual ("Client", "you").
            </p>
            <p>
              By signing a Service Agreement, accepting an Anivex Solution quotation, remitting an advance payment, or commissioning development work, you agree to be bound by these Terms in full.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#0B1F3A]">2. Proposals, Quotations & Scope of Work</h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>All quotations and estimates provided by Anivex Solution are valid for 30 calendar days from the date of issuance unless explicitly stated otherwise in writing.</li>
              <li>A project commences upon receipt of the mutually agreed advance payment and written confirmation of the technical scope specification.</li>
              <li>Any functionality, module, integration, or feature not itemized in the accepted quotation or Statement of Work (SOW) constitutes a Change Order and will be estimated separately.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#0B1F3A]">3. Invoicing, Payments & Indian GST Compliance</h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Official tax invoices are issued in Indian National Rupees (INR) or internationally recognized currencies with compliant Indian Goods & Services Tax (18% GST).</li>
              <li>Unless alternate milestone terms are defined in an executed contract, standard billing operates on milestone schedule: 40% initial kickoff advance, 40% on staging beta milestone, and 20% on final production deployment.</li>
              <li>Invoices are payable within 7 business days via IMPS, NEFT, RTGS, UPI, or verified corporate banking channels.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#0B1F3A]">4. Intellectual Property Rights (100% Client Ownership)</h2>
            <p>
              We firmly believe in clear, uncompromised intellectual property ownership for our clients:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>Custom Software Ownership:</strong> Upon 100% full financial settlement of all contractual invoices, 100% ownership of the bespoke source code, database architectures, graphics, and custom algorithms developed specifically for the Client shall transfer exclusively to the Client.</li>
              <li><strong>Pre-Existing Tools:</strong> Anivex Solution retains the rights to open-source libraries, general-purpose boilerplate utilities, and third-party modules integrated into the solution, granting the Client an irrevocable, royalty-free, perpetual license to use them.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#0B1F3A]">5. Client Responsibilities & Feedback Windows</h2>
            <p>
              Timely delivery relies on collaborative communication. The Client agrees to provide necessary access credentials, brand assets, APIs, and feedback within reasonable review windows (typically 3 to 5 business days). Extended delays in client feedback may lead to adjusted delivery timelines.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#0B1F3A]">6. Warranty Period & Post-Launch Support</h2>
            <p>
              Every software delivery by Anivex Solution includes a standard <strong>30 to 60-day post-launch warranty period</strong> starting from the production deployment date. During this period, any technical defect or bug deviating from agreed specifications will be remediated at no extra charge. Ongoing maintenance retainers and SLA support are available following the warranty.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#0B1F3A]">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Anivex Solution shall not be liable for indirect, incidental, punitive, or consequential damages resulting from third-party server downtimes, client data loss, or external API outages. In all events, our total aggregate liability is limited to the fees actually paid to Anivex Solution for the specific project engagement under dispute.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-[#0B1F3A]">8. Governing Law & Dispute Resolution</h2>
            <p>
              These Terms and any project contracts executed with Anivex Solution shall be governed by, construed, and enforced in accordance with the Laws of the Republic of India. In the event of any legal dispute, both parties submit to the exclusive jurisdiction of the competent courts in India.
            </p>
          </section>

          <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 shadow-xs">
            <h2 className="font-heading font-bold text-lg text-[#0B1F3A] flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#F97316]" />
              <span>Legal Notice & Contract Administration</span>
            </h2>
            <p className="text-xs text-[#0B1F3A]/70">
              For contractual inquiries, master service agreements, or formal legal notices, please contact:
            </p>
            <div className="pt-2 text-xs space-y-1">
              <p><strong>Entity:</strong> Anivex Solution</p>
              <p><strong>Lead Architect:</strong> Krishndas Chauhan</p>
              <p><strong>Email:</strong> <a href="mailto:anivexsolution@gmail.com" className="text-[#F97316] font-semibold underline">anivexsolution@gmail.com</a></p>
              <p><strong>Direct WhatsApp:</strong> +91 98765 43210</p>
              <p><strong>Location:</strong> India</p>
            </div>
          </section>

        </article>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};
