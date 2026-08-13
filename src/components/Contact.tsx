import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, QrCode, Landmark, Building2, Smartphone, Copy, Check } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface ContactProps {
  preselectedProjectType?: string;
}

export const Contact: React.FC<ContactProps> = ({ preselectedProjectType }) => {
  const { submitContactEnquiry, companyInfo, paymentSettings } = useCms();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    projectType: preselectedProjectType || 'Website',
    budgetRange: '₹50,000 - ₹2,00,000',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setSubmitError(null);

    try {
      const res = await submitContactEnquiry(formData);
      if (res.success) {
        setSubmitSuccess(res.message);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          projectType: 'Website',
          budgetRange: '₹50,000 - ₹2,00,000',
          description: '',
        });
      } else {
        setSubmitError('Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      setSubmitError('Unable to send inquiry. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-[#05070B] overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F16] border border-[#D6A84F]/30 text-[10px] font-mono tracking-wider text-[#F5C85B] uppercase mb-4">
            GET IN TOUCH
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            Start Your <span className="text-gold-gradient">Project Scoping</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-normal">
            Send us your technical requirements or product ideas. Our engineering team will evaluate your scope and respond with architectural guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-[#0B0F16] border border-white/10 shadow-xl space-y-6">
              <h3 className="font-display font-bold text-2xl text-white">Direct Communication</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Prefer direct correspondence? Email our technical team directly or schedule an architecture call.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#121824] border border-[#D6A84F]/30 text-[#F5C85B] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block uppercase">Email Support</span>
                    <a href={`mailto:${companyInfo.businessEmail || 'anivexsolution@gmail.com'}`} className="text-sm font-semibold text-white hover:text-[#F5C85B] transition-colors">
                      {companyInfo.businessEmail || 'anivexsolution@gmail.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#121824] border border-[#D6A84F]/30 text-[#F5C85B] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block uppercase">Headquarters</span>
                    <span className="text-sm font-semibold text-white">India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Payment Card */}
            {paymentSettings && paymentSettings.enabled !== false && (
              <div className="p-6 rounded-2xl bg-[#0B0F16] border border-[#D6A84F]/40 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#F5C85B]">
                    <Landmark className="w-5 h-5" />
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider">OFFICIAL PAYMENT OPTIONS</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#D6A84F]/20 text-[#F5C85B] text-[10px] font-mono font-bold border border-[#D6A84F]/30">
                    UPI / BANK
                  </span>
                </div>

                <p className="text-xs text-slate-300">
                  Clients and partners can settle milestones directly via UPI (GPay/PhonePe/Paytm/BHIM) or Bank Transfer.
                </p>

                <button
                  type="button"
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full py-3 px-4 rounded-xl bg-[#121824] border border-[#D6A84F]/50 hover:border-[#F5C85B] text-[#F5C85B] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#1A2234] transition-all cursor-pointer"
                >
                  <QrCode className="w-4 h-4" />
                  <span>{paymentSettings.paymentButtonText || 'View Payment Details & UPI QR'}</span>
                </button>
              </div>
            )}

            <div className="p-6 rounded-2xl bg-[#0B0F16]/50 border border-white/10 space-y-3">
              <h4 className="text-xs font-mono font-bold text-[#F5C85B] uppercase">WHAT TO EXPECT</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F5C85B]" />
                  <span>Technical feasibility response within 24 hours</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F5C85B]" />
                  <span>Strict NDA and data protection confidentiality</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F5C85B]" />
                  <span>Transparent milestone-based project proposal</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-2xl bg-[#0B0F16] border border-white/10 shadow-2xl space-y-6">
              {submitSuccess && (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{submitSuccess}</span>
                </div>
              )}

              {submitError && (
                <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#D6A84F] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#D6A84F] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#D6A84F] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Corp"
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#D6A84F] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Project Type *
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D6A84F] transition-colors"
                  >
                    <option value="Website">Website</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="AI Solution">AI Solution</option>
                    <option value="ERP / Business Software">ERP / Business Software</option>
                    <option value="SaaS Product">SaaS Product</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                    Budget Range
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D6A84F] transition-colors"
                  >
                    <option value="Under ₹50,000">Under ₹50,000</option>
                    <option value="₹50,000 - ₹2,00,000">₹50,000 - ₹2,00,000 (₹50K - ₹2 Lakhs)</option>
                    <option value="₹2,00,000 - ₹10,00,000">₹2,00,000 - ₹10,00,000 (₹2 Lakhs - ₹10 Lakhs)</option>
                    <option value="₹10,00,000 - ₹50,00,000">₹10,00,000 - ₹50,00,000 (₹10 Lakhs - ₹50 Lakhs)</option>
                    <option value="₹50,00,000+">₹50,00,000+ (₹50 Lakhs+)</option>
                    <option value="Flexible / To Be Scoped">Flexible / To Be Scoped</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                  Project Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell us about the scope, timeline, core features, or technical goals..."
                  className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#D6A84F] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(245,200,91,0.4)] disabled:opacity-50 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Sending Inquiry...' : 'Send Project Inquiry →'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* PAYMENT DETAILS POPUP MODAL */}
      {showPaymentModal && paymentSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0B0F16] border border-[#D6A84F]/40 rounded-3xl p-6 shadow-2xl space-y-6 text-white max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#121824] border border-[#D6A84F]/40 text-[#F5C85B]">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white">ANIVEX Official Payment</h3>
                  <p className="text-[11px] text-slate-400">Scan QR or Transfer via Bank</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center text-sm font-mono cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* UPI QR & Quick Copy */}
            <div className="bg-[#05070B] p-5 rounded-2xl border border-white/10 flex flex-col items-center text-center space-y-3">
              <div className="p-3 bg-white rounded-2xl border-2 border-[#D6A84F] shadow-lg">
                <img
                  src={paymentSettings.qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=${paymentSettings.upiId}&pn=${encodeURIComponent(paymentSettings.upiName)}&am=&cu=INR`)}`}
                  alt="UPI QR Code"
                  className="w-40 h-40 object-contain"
                />
              </div>

              <div>
                <div className="text-xs font-mono font-bold text-slate-300 uppercase">{paymentSettings.upiName}</div>
                <div className="text-sm font-mono font-extrabold text-[#F5C85B] mt-0.5">{paymentSettings.upiId}</div>
              </div>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(paymentSettings.upiId);
                  setCopiedUpi(true);
                  setTimeout(() => setCopiedUpi(false), 2000);
                }}
                className="py-1.5 px-3 rounded-full bg-white/10 hover:bg-white/20 text-[#F5C85B] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedUpi ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">UPI ID Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy UPI ID</span>
                  </>
                )}
              </button>

              <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider bg-white/5 px-3 py-1 rounded-full">
                Supported: GPay, PhonePe, Paytm, BHIM, Cred
              </div>
            </div>

            {/* Bank Wire Details */}
            <div className="bg-[#05070B] p-4 rounded-2xl border border-white/10 space-y-2 text-xs font-mono">
              <div className="text-[10px] font-bold text-[#F5C85B] uppercase border-b border-white/10 pb-1.5 flex items-center justify-between">
                <span>DIRECT BANK TRANSFER</span>
                <Building2 className="w-3.5 h-3.5" />
              </div>

              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">Bank:</span>
                <span className="font-bold text-white">{paymentSettings.bankName}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">Holder:</span>
                <span className="font-bold text-white">{paymentSettings.accountHolderName}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">Account No:</span>
                <span className="font-bold text-white">{paymentSettings.accountNumber}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">IFSC Code:</span>
                <span className="font-bold text-white">{paymentSettings.ifscCode}</span>
              </div>
            </div>

            {/* Remarks / Instructions */}
            {paymentSettings.paymentInstructions && (
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-300 leading-relaxed">
                <span className="font-bold text-[#F5C85B] block mb-1">Instructions:</span>
                {paymentSettings.paymentInstructions}
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowPaymentModal(false)}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </section>
  );
};
