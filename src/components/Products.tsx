import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { ProductCMS } from '../types/cms';
import { PolicyHubVisual, VyaparDeskVisual, OpsGridVisual } from './TechVisualMockups';
import { DEFAULT_WEBSITE_SETTINGS, formatWhatsAppUrl } from '../services/websiteSettings';

function buildProductWhatsAppMessage(prod: ProductCMS): string {
  const lines: string[] = [
    'Namaste Anivex Solution! I am interested in exploring this product:',
    '',
    `*Product:* ${prod.name}`,
  ];

  if (prod.category || prod.badge) {
    lines.push(`*Category:* ${prod.category || prod.badge}`);
  }
  if (prod.tagline) {
    lines.push(`*Tagline:* ${prod.tagline}`);
  }
  if (prod.status) {
    lines.push(`*Status:* ${prod.status}`);
  }
  if (prod.description) {
    lines.push(`*Details:* ${prod.description}`);
  }
  if (prod.features && prod.features.length > 0) {
    lines.push(`*Key Features:* ${prod.features.join(', ')}`);
  }
  if (prod.technologies && prod.technologies.length > 0) {
    lines.push(`*Tech Stack:* ${prod.technologies.join(', ')}`);
  }

  lines.push('', 'Please share demo access, pricing, and more details.');
  return lines.join('\n');
}

export const Products: React.FC = () => {
  const { products, websiteSettings, companyInfo } = useCms();
  const whatsappNumber =
    websiteSettings?.whatsapp?.trim() ||
    websiteSettings?.phone?.trim() ||
    companyInfo?.phone?.trim() ||
    DEFAULT_WEBSITE_SETTINGS.whatsapp;

  const fallbackProducts: ProductCMS[] = [
    {
      id: 'policyhub',
      name: 'PolicyHub',
      category: 'Enterprise Governance',
      tagline: 'Smart Policy & Compliance Governance',
      description: 'A modern platform designed to organize, govern, and access critical policies, business contracts, and compliance documents with instant semantic search.',
      status: 'Available',
      badge: 'Enterprise Platform',
      features: ['Granular Access Control', 'Automated Versioning', 'Semantic Document Search', 'Audit Trail Logging'],
      technologies: ['React', 'TypeScript', 'Firebase', 'Vector Search'],
      productUrl: 'https://anivex.com/products/policyhub',
      actionLabel: 'Explore PolicyHub →',
      cta: 'Explore PolicyHub →',
      featured: true,
      displayOrder: 1,
      published: true,
    },
    {
      id: 'vyapardesk',
      name: 'VyaparDesk ERP',
      category: 'ERP & Billing Software',
      tagline: 'GST Billing, Invoicing & Inventory Engine',
      description: 'Built specifically for Indian enterprises and growing trade businesses: fast GST invoice generation, barcode stock tracking, and ledger reconciliation.',
      status: 'Available',
      badge: 'Indian Business Engine',
      features: ['Instant GST Invoice Printing', 'Barcode Stock Tracking', 'Multi-Warehouse Sync', 'Automated WhatsApp Invoices'],
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      productUrl: '#contact',
      actionLabel: 'Schedule Demo →',
      cta: 'Schedule Demo →',
      featured: true,
      displayOrder: 2,
      published: true,
    },
    {
      id: 'anivex-ops',
      name: 'Anivex OpsGrid',
      category: 'Operations Dashboard',
      tagline: 'Unified Enterprise Operations & Resource Monitor',
      description: 'Unified operational monitoring workspace uniting business analytics, team permissions, and real-time process execution into one clean display.',
      status: 'In Development',
      badge: 'Operations Platform',
      features: ['Modular Metrics Widgets', 'Role-Based Access', 'Custom Workflow Connectors', 'Real-time Alerts'],
      technologies: ['React', 'Next.js', 'WebSockets', 'Tailwind CSS'],
      productUrl: '#contact',
      actionLabel: 'Request Early Access →',
      cta: 'Request Early Access →',
      featured: false,
      displayOrder: 3,
      published: true,
    },
  ];

  const activeProducts = (products && products.length > 0)
    ? products.filter((p) => p.published !== false && p.id !== 'anivex-ai').sort((a, b) => a.displayOrder - b.displayOrder)
    : fallbackProducts;

  return (
    <section
      id="products"
      className="py-24 bg-white relative border-t border-[#0B1F3A]/8 overflow-hidden"
    >
      {/* Background Ambient Light */}
      <div className="absolute top-10 right-5 w-80 h-80 bg-[#15803D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-5 w-96 h-96 bg-[#F97316]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-xs font-semibold text-[#0B1F3A] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
            <span className="uppercase tracking-wider text-[11px] font-bold">PROPRIETARY PRODUCTS</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0B1F3A] tracking-tight mb-4">
            Engineered by ANIVEX
          </h2>

          <p className="text-base sm:text-lg text-[#0B1F3A]/70 max-w-2xl font-normal leading-relaxed">
            In addition to custom client engagements, we engineer specialized software products designed for enterprise compliance, operations, and commerce.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeProducts.map((prod) => {
            const whatsappUrl = formatWhatsAppUrl(whatsappNumber, buildProductWhatsAppMessage(prod));

            return (
              <div
                key={prod.id}
                className="card-warm card-warm-hover rounded-2xl overflow-hidden bg-white flex flex-col justify-between shadow-xs hover:shadow-xl transition-all"
              >
                <div>
                  {/* Product Cover UI Mockup Preview */}
                  <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden border-b border-[#0B1F3A]/6">
                    {prod.id === 'policyhub' ? (
                      <PolicyHubVisual />
                    ) : prod.id === 'vyapardesk' ? (
                      <VyaparDeskVisual />
                    ) : prod.id === 'anivex-ops' ? (
                      <OpsGridVisual />
                    ) : prod.image && !prod.image.includes('_') ? (
                      <img
                        src={prod.image}
                        alt={`${prod.name} – ${prod.tagline || 'Software Solution by Anivex Solution'}`}
                        width={600}
                        height={375}
                        className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    ) : (
                      <OpsGridVisual />
                    )}

                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0B1F3A]/90 backdrop-blur-xs text-white text-[11px] font-semibold">
                      {prod.category || prod.badge || 'Software'}
                    </div>

                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/95 text-[10px] font-bold text-[#15803D] border border-[#15803D]/20">
                      {prod.status}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-xl text-[#0B1F3A] mb-1">
                      {prod.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#F97316] mb-3">
                      {prod.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-[#0B1F3A]/70 leading-relaxed mb-5">
                      {prod.description}
                    </p>

                    {/* Features */}
                    {prod.features && prod.features.length > 0 && (
                      <ul className="space-y-1.5 mb-6 pt-3 border-t border-[#0B1F3A]/6">
                        {prod.features.slice(0, 3).map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-[#0B1F3A]/80">
                            <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Action Button - Direct WhatsApp Redirect with Product Details */}
                <div className="px-6 pb-6 pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#0B1F3A] hover:bg-[#0B1F3A]/90 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    <span>{prod.cta || prod.actionLabel || 'Inquire on WhatsApp'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
