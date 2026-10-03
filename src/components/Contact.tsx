import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, MessageCircle, QrCode, Landmark, Copy, Check, ArrowRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { formatWhatsAppUrl, formatPhoneTel } from '../services/websiteSettings';
import { useGsapSection } from '../lib/gsapScrollAnimations';

interface ContactProps {
  preselectedProjectType?: string;
  preselectedBudget?: string;
}

export const Contact: React.FC<ContactProps> = ({ preselectedProjectType, preselectedBudget }) => {
  const { submitContactEnquiry, companyInfo, websiteSettings, paymentSettings } = useCms();

  const sectionRef = useGsapSection<HTMLElement>({
    headerSelector: '.gsap-contact-header',
    cardsSelector: '.gsap-contact-card',
    parallaxSelector: '.gsap-contact-parallax',
    cardStagger: 0.12,
    cardYOffset: 50,
    rotate3DX: 5,
    parallaxDistance: 25,
    enableParallax: true,
  });

  const projectOptions = [
    'Website',
    'Mobile App',
    'ERP',
    'Custom Software',
    'AI / Automation',
    'UI/UX',
    'Other'
  ];

  const [selectedType, setSelectedType] = useState<string>(preselectedProjectType || 'Website');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const phone = websiteSettings?.phone || companyInfo?.phone || '';
  const whatsappNumber = websiteSettings?.whatsapp || phone;
  const email = websiteSettings?.email || companyInfo?.businessEmail || '';
  const phoneTel = formatPhoneTel(phone);

  const handleSelectOption = (opt: string) => {
    setSelectedType(opt);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setSubmitError(null);

    try {
      const res = await submitContactEnquiry({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        projectType: selectedType,
        budgetRange: preselectedBudget || 'Flexible',
        description: formData.message,
      });

      if (res.success) {
        setSubmitSuccess(res.message || 'Thank you! Your inquiry has been received. We will respond within 24 hours.');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          message: '',
        });
      } else {
        setSubmitError('Failed to send inquiry. Please try again or WhatsApp us directly.');
      }
    } catch (err) {
      setSubmitError('Unable to send inquiry right now. Please message us on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSend = () => {
    const text = `*New Project Inquiry - Anivex Solution*
*Name:* ${formData.fullName || 'Not specified'}
*Phone:* ${formData.phone || 'Not specified'}
*Email:* ${formData.email || 'Not specified'}
*Project Type:* ${selectedType}
*Message:* ${formData.message || 'I would like to discuss my project requirements.'}`;

    window.open(formatWhatsAppUrl(whatsappNumber, text), '_blank', 'noopener,noreferrer');
  };

  const handleCopyUpi = () => {
    if (paymentSettings?.upiId) {
      navigator.clipboard.writeText(paymentSettings.upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 bg-white relative border-t border-[#0B1F3A]/8 overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Subtle GSAP 3D Scroll Parallax Background Light */}
      <div className="gsap-contact-parallax absolute top-10 right-10 w-96 h-96 bg-[#F97316]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="gsap-contact-parallax absolute bottom-10 left-10 w-80 h-80 bg-[#15803D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="gsap-contact-header flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-xs font-semibold text-[#0B1F3A] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
            <span className="uppercase tracking-wider text-[11px] font-bold">START A PROJECT</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0B1F3A] tracking-tight mb-4">
            Let's Build Something That Matters.
          </h2>

          <p className="text-base sm:text-lg text-[#0B1F3A]/70 max-w-2xl font-normal leading-relaxed">
            Tell us about your requirements. Our engineering team will review your scope and provide a clear roadmap within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Contact Flow: Interactive Question + Form with GSAP 3D Floating Scroll Effect */}
          <div className="gsap-contact-card lg:col-span-8 bg-[#FFFDF7] border border-[#0B1F3A]/10 rounded-2xl p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow">
            
            {/* Step 1: Interactive Question */}
            <div className="mb-8">
              <label className="font-heading font-bold text-base text-[#0B1F3A] block mb-3">
                What are you looking to build?
              </label>

              <div className="flex flex-wrap gap-2">
                {projectOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelectOption(opt)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      selectedType === opt
                        ? 'bg-[#0B1F3A] text-white shadow-xs'
                        : 'bg-white text-[#0B1F3A] border border-[#0B1F3A]/10 hover:border-[#F97316]/50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Submission Alerts */}
            {submitSuccess && (
              <div className="p-4 rounded-xl bg-[#15803D]/10 border border-[#15803D]/30 text-[#15803D] flex items-start gap-3 mb-6">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm font-medium">
                  {submitSuccess}
                </div>
              </div>
            )}

            {submitError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 mb-6">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm font-medium">
                  {submitError}
                </div>
              </div>
            )}

            {/* Step 2: The Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={120}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#0B1F3A]/15 text-sm text-[#0B1F3A] placeholder-[#0B1F3A]/40 focus:border-[#F97316] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={160}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. ramesh@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#0B1F3A]/15 text-sm text-[#0B1F3A] placeholder-[#0B1F3A]/40 focus:border-[#F97316] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    maxLength={40}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 79056 68826"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#0B1F3A]/15 text-sm text-[#0B1F3A] placeholder-[#0B1F3A]/40 focus:border-[#F97316] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] mb-1.5">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    maxLength={160}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Apex Industries"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#0B1F3A]/15 text-sm text-[#0B1F3A] placeholder-[#0B1F3A]/40 focus:border-[#F97316] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] mb-1.5">
                  Project Details & Goals *
                </label>
                <textarea
                  rows={4}
                  required
                  minLength={5}
                  maxLength={5000}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the key features, expected timeline, or business problem you want to solve..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#0B1F3A]/15 text-sm text-[#0B1F3A] placeholder-[#0B1F3A]/40 focus:border-[#F97316] focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
                  id="contact-submit-btn"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Start a Conversation →'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#15803D]/10 hover:bg-[#15803D]/20 text-[#15803D] font-bold text-xs transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send via WhatsApp (+91)</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Direct Contact & Trust Info */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Direct Contact Card */}
            <div className="gsap-contact-card p-6 rounded-2xl bg-[#FFFDF7] border border-[#0B1F3A]/10 shadow-xs space-y-5">
              <h3 className="font-heading font-bold text-lg text-[#0B1F3A]">
                Direct Communication
              </h3>
              <p className="text-xs text-[#0B1F3A]/70 leading-relaxed font-normal">
                Prefer direct communication? You can reach our team via phone or email anytime.
              </p>

              <div className="space-y-3.5 pt-2">
                <a
                  href={formatWhatsAppUrl(whatsappNumber, 'Namaste Anivex Solution! I want to discuss a new software project.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#0B1F3A]/8 text-[#0B1F3A] hover:border-[#15803D] transition-colors"
                >
                  <div className="p-2 rounded-lg bg-[#15803D]/10 text-[#15803D]">
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#15803D] block uppercase">WhatsApp Direct</span>
                    <span className="text-xs font-bold text-[#0B1F3A]">{phone}</span>
                  </div>
                </a>

                <a
                  href={phoneTel}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#0B1F3A]/8 text-[#0B1F3A] hover:border-[#F97316] transition-colors"
                >
                  <div className="p-2 rounded-lg bg-[#F97316]/10 text-[#F97316]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#0B1F3A]/60 block uppercase">Phone Support</span>
                    <span className="text-xs font-bold text-[#0B1F3A]">{phone}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#0B1F3A]/8 text-[#0B1F3A] hover:border-[#0B1F3A] transition-colors"
                >
                  <div className="p-2 rounded-lg bg-[#0B1F3A]/5 text-[#0B1F3A]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#0B1F3A]/60 block uppercase">Email</span>
                    <span className="text-xs font-bold text-[#0B1F3A]">{email}</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Indian Payment Details (UPI / Bank) */}
            <div className="gsap-contact-card p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-[#15803D] uppercase tracking-wider">
                  Payment Modes
                </span>
                <span className="text-[11px] font-bold text-[#0B1F3A]">100% In ₹</span>
              </div>
              <h4 className="font-heading font-bold text-sm text-[#0B1F3A] mb-2">
                Official Invoicing & UPI
              </h4>
              <p className="text-xs text-[#0B1F3A]/70 leading-relaxed mb-4">
                We accept milestone-based payments via UPI (Google Pay, PhonePe, Paytm, BHIM) and NEFT/IMPS bank transfer with GST invoices.
              </p>

              <button
                type="button"
                onClick={() => setShowPaymentModal(true)}
                className="w-full py-2 px-3 rounded-lg bg-[#0B1F3A]/5 hover:bg-[#0B1F3A]/10 text-[#0B1F3A] text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-[#F97316]" />
                <span>View UPI / Bank Details</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Payment Details Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1F3A]/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-[#FFFDF7] border border-[#0B1F3A]/10 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#0B1F3A]/10">
              <h3 className="font-heading font-bold text-lg text-[#0B1F3A]">
                Official Payment Details
              </h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-[#0B1F3A]/60 hover:text-[#0B1F3A] text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-[#0B1F3A]/8">
                <span className="text-[10px] font-bold text-[#15803D] uppercase block mb-1">
                  UPI ID (GPay / PhonePe / Paytm / BHIM)
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-[#0B1F3A]">
                    {paymentSettings?.upiId || 'Payment details unavailable'}
                  </span>
                  <button
                    onClick={handleCopyUpi}
                    className="p-1.5 rounded-md bg-[#0B1F3A]/5 hover:bg-[#0B1F3A]/10 text-[#0B1F3A] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="text-[10px]">{copiedUpi ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#0B1F3A]/8 space-y-1.5">
                <span className="text-[10px] font-bold text-[#0B1F3A]/60 uppercase block mb-1">
                  Direct Bank Wire (NEFT / IMPS)
                </span>
                <div className="flex justify-between">
                  <span className="text-[#0B1F3A]/70">Account Name:</span>
                  <span className="font-semibold text-[#0B1F3A]">{paymentSettings?.accountHolderName || 'Not available'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#0B1F3A]/70">Bank Name:</span>
                  <span className="font-semibold text-[#0B1F3A]">{paymentSettings?.bankName || 'Not available'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#0B1F3A]/70">Account Number:</span>
                  <span className="font-mono font-semibold text-[#0B1F3A]">{paymentSettings?.accountNumber || 'Not available'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#0B1F3A]/70">IFSC Code:</span>
                  <span className="font-mono font-semibold text-[#0B1F3A]">{paymentSettings?.ifscCode || 'Not available'}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowPaymentModal(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-[#0B1F3A] text-white text-xs font-bold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
