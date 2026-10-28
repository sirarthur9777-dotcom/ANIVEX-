import React from 'react';
import { Check, ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { initialPricingPackages } from '../data/initialCmsData';
import { formatWhatsAppUrl } from '../services/websiteSettings';

interface PricingPackagesProps {
  onSelectPackage?: (packageName: string, budgetRange: string) => void;
}

export const PricingPackages: React.FC<PricingPackagesProps> = ({ onSelectPackage }) => {
  const { siteContent, pricingPackages, companyInfo, websiteSettings } = useCms();
  const phone = websiteSettings?.whatsapp || websiteSettings?.phone || companyInfo?.phone || '';

  const displayPackages = (pricingPackages && pricingPackages.length > 0)
    ? pricingPackages.filter((p) => p.published !== false)
    : initialPricingPackages;

  const pricingBadge = siteContent.pricingBadge || 'TRANSPARENT VALUE';
  const pricingHeading = siteContent.pricingHeading || 'Transparent Pricing in Rupees (₹)';
  const pricingDescription =
    siteContent.pricingDescription ||
    'Zero hidden charges. Milestone-based invoicing with official GST documentation and full intellectual property ownership.';

  const handleChoose = (pkg: typeof displayPackages[0]) => {
    if (onSelectPackage) {
      onSelectPackage(pkg.projectType || 'Website', pkg.budgetRange || 'Under ₹50,000');
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsappInquiry = (pkgName: string) => {
    const text = `Namaste Anivex Solution! I am interested in the ${pkgName} package. Please share a detailed quotation.`;
    window.open(formatWhatsAppUrl(phone, text), '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="pricing"
      className="py-24 bg-[#FFFDF7] relative border-t border-[#0B1F3A]/8 overflow-hidden"
    >
      {/* Background Ambient Light */}
      <div className="absolute top-10 right-5 w-80 h-80 bg-[#F97316]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-5 left-5 w-96 h-96 bg-[#15803D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-xs font-semibold text-[#0B1F3A] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
            <span className="uppercase tracking-wider text-[11px] font-bold">{pricingBadge}</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0B1F3A] tracking-tight mb-4">
            {pricingHeading}
          </h2>

          <p className="text-base sm:text-lg text-[#0B1F3A]/70 max-w-2xl font-normal leading-relaxed">
            {pricingDescription}
          </p>
        </div>

        {/* Dynamic Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all ${
                pkg.featured
                  ? 'bg-white border-2 border-[#F97316] shadow-md hover:shadow-xl relative'
                  : 'bg-white border border-[#0B1F3A]/10 card-warm-hover shadow-xs hover:shadow-lg'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    pkg.featured
                      ? 'bg-[#F97316]/10 text-[#F97316]'
                      : 'bg-[#0B1F3A]/5 text-[#0B1F3A]/70'
                  }`}>
                    {pkg.badge}
                  </span>
                  <span className="text-xs text-[#0B1F3A]/60 font-medium">{pkg.timeline}</span>
                </div>

                <h3 className="font-heading font-bold text-lg text-[#0B1F3A] mb-1">
                  {pkg.name}
                </h3>

                <div className="flex items-baseline gap-1 my-3">
                  <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B1F3A] tabular-nums">
                    {pkg.price}
                  </span>
                  {pkg.price.startsWith('₹') && (
                    <span className="text-xs text-[#0B1F3A]/60 font-medium">starting</span>
                  )}
                </div>

                <p className="text-xs text-[#0B1F3A]/70 leading-relaxed mb-6">
                  {pkg.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6 pt-4 border-t border-[#0B1F3A]/8 text-xs text-[#0B1F3A]/80">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleChoose(pkg)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    pkg.featured
                      ? 'bg-[#F97316] hover:bg-[#EA580C] text-white shadow-xs'
                      : 'bg-[#0B1F3A] hover:bg-[#0B1F3A]/90 text-white'
                  }`}
                >
                  <span>Choose Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleWhatsappInquiry(pkg.name)}
                  className="w-full py-2 px-3 rounded-lg text-xs font-medium text-[#15803D] hover:bg-[#15803D]/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp Inquiry</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
