import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface PricingPackagesProps {
  onSelectPackage?: (packageName: string, budgetRange: string) => void;
}

export const PricingPackages: React.FC<PricingPackagesProps> = ({ onSelectPackage }) => {
  const { companyInfo } = useCms();
  const rawPhone = companyInfo?.phone || '+91 98765 43210';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const phoneToUse = cleanPhone.length >= 10 ? cleanPhone : '919876543210';

  const packages = [
    {
      id: 'starter-web',
      name: 'Starter Business Web',
      category: 'Web Platform',
      price: '₹14,999',
      timeline: '5 - 7 Days',
      badge: 'Quick Launch',
      featured: false,
      description: 'Ideal for MSMEs, consultants, clinics, and professional practices looking to build instant credibility.',
      features: [
        '100% Mobile & Desktop Responsive',
        'Direct WhatsApp Chat Integration',
        'Google Maps & SEO Architecture',
        'High-Speed Cloud Hosting Setup',
        'Verified Lead Capture Inquiries',
        '1 Year Warranty & Support',
      ],
      projectType: 'Website',
      budgetRange: 'Under ₹50,000',
    },
    {
      id: 'ecommerce-store',
      name: 'E-Commerce & Storefront',
      category: 'Online Commerce',
      price: '₹34,999',
      timeline: '10 - 15 Days',
      badge: 'Most Popular',
      featured: true,
      description: 'Ideal for D2C brands, retail merchants, wholesalers, and product manufacturers selling direct-to-consumer.',
      features: [
        'Complete Product Catalog & Filters',
        'Payment Gateway (UPI, Cards, Netbanking)',
        'Automated WhatsApp Order Alerts',
        'Admin Dashboard to Manage Stock',
        'Coupon & Discount Promotions Engine',
        'Customer Accounts & Order History',
      ],
      projectType: 'Website',
      budgetRange: '₹50,000 - ₹2,00,000',
    },
    {
      id: 'mobile-app',
      name: 'Android Mobile App',
      category: 'Mobile Application',
      price: '₹49,999',
      timeline: '2 - 4 Weeks',
      badge: 'High Retention',
      featured: false,
      description: 'Full-featured mobile application built for fluid native interactions and customer retention.',
      features: [
        'Google Play Store Ready Build',
        'Push Notification Campaigns',
        'OTP & Mobile Quick Login',
        'Offline Data Sync Architecture',
        'Real-Time Customer Analytics',
        'Full IP & Source Code Ownership',
      ],
      projectType: 'Mobile App',
      budgetRange: '₹50,000 - ₹2,00,000',
    },
    {
      id: 'enterprise-erp',
      name: 'Custom ERP & Software',
      category: 'Enterprise Software',
      price: 'Custom Scope',
      timeline: 'Milestone Based',
      badge: 'Custom Architecture',
      featured: false,
      description: 'Tailored business software, GST billing management, inventory control, and multi-branch systems.',
      features: [
        'GST Billing & 1-Click Tax Invoices',
        'Multi-Warehouse Inventory Tracking',
        'Granular Role-Based Permissions',
        'Automated Daily / Monthly Ledgers',
        'Cloud Database with Auto-Backup',
        'Dedicated Technical Project Manager',
      ],
      projectType: 'ERP / Business Software',
      budgetRange: '₹2,00,000 - ₹10,00,000',
    },
  ];

  const handleChoose = (pkg: typeof packages[0]) => {
    if (onSelectPackage) {
      onSelectPackage(pkg.projectType, pkg.budgetRange);
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsappInquiry = (pkgName: string) => {
    const text = `Namaste Anivex Solution! I am interested in the ${pkgName} package. Please share a detailed quotation.`;
    window.open(`https://wa.me/${phoneToUse}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="pricing" className="py-24 bg-[#FFFDF7] relative border-t border-[#0B1F3A]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-xs font-semibold text-[#0B1F3A] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
            <span className="uppercase tracking-wider text-[11px] font-bold">TRANSPARENT VALUE</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0B1F3A] tracking-tight mb-4">
            Transparent Pricing in Rupees (₹)
          </h2>

          <p className="text-base sm:text-lg text-[#0B1F3A]/70 max-w-2xl font-normal leading-relaxed">
            Zero hidden charges. Milestone-based invoicing with official GST documentation and full intellectual property ownership.
          </p>
        </div>

        {/* 4 Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all ${
                pkg.featured
                  ? 'bg-white border-2 border-[#F97316] shadow-md relative'
                  : 'bg-white border border-[#0B1F3A]/10 card-warm-hover shadow-xs'
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
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
