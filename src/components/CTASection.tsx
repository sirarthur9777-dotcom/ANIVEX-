import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MessageCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface CTASectionProps {
  onStartProject?: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onStartProject }) => {
  const { siteContent, companyInfo } = useCms();

  const heading = siteContent.ctaHeading || "Let's Build Something That Matters.";
  const subtitle = siteContent.ctaSubtitle || "Whether you need a custom software platform, high-converting web application, or enterprise ERP, we are ready to build it with you.";
  const primaryText = siteContent.primaryCtaText || "Start a Conversation →";
  const secondaryText = siteContent.secondaryCtaText || "Chat on WhatsApp";

  const rawPhone = companyInfo?.phone || '+91 98765 43210';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const phoneToUse = cleanPhone.length >= 10 ? cleanPhone : '919876543210';

  const whatsappUrl = `https://wa.me/${phoneToUse}?text=${encodeURIComponent(
    'Namaste Anivex Solution! I have an upcoming software project and would like to discuss it.'
  )}`;

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-[#FFFDF7] relative border-t border-[#0B1F3A]/8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="p-8 sm:p-14 rounded-3xl bg-[#0B1F3A] text-white text-center relative overflow-hidden shadow-xl"
        >
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F97316]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#15803D]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#D4A72C] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
            <span className="uppercase tracking-wider text-[11px] font-bold">READY TO SCALE?</span>
          </div>

          {/* Heading */}
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4 max-w-3xl mx-auto leading-tight">
            {heading}
          </h2>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            {subtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onStartProject || handleScrollToContact}
              className="px-7 py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs tracking-wide shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <span>{primaryText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs tracking-wide shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{secondaryText} (+91)</span>
            </a>
          </div>

          {/* Reassurance text */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300/80">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
              Free Architectural Scoping
            </span>
            <span>·</span>
            <span>Direct WhatsApp & Call Support</span>
            <span>·</span>
            <span>GST Tax Invoices Provided</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
