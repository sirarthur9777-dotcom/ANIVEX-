import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, X, Shield, ExternalLink, Sparkles } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { ProductCMS } from '../types/cms';
import { PolicyHubVisual, VyaparDeskVisual, OpsGridVisual } from './TechVisualMockups';
import { useGsapSection } from '../lib/gsapScrollAnimations';

export const Products: React.FC = () => {
  const { products } = useCms();
  const [selectedProduct, setSelectedProduct] = useState<ProductCMS | null>(null);

  const sectionRef = useGsapSection<HTMLElement>({
    headerSelector: '.gsap-products-header',
    cardsSelector: '.gsap-product-card',
    parallaxSelector: '.gsap-products-parallax',
    visualSelector: '.gsap-products-visual',
    cardStagger: 0.12,
    cardYOffset: 55,
    rotate3DX: 6,
    parallaxDistance: 25,
    enableParallax: true,
  });

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

  const handleOpenContact = (product: ProductCMS) => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-24 bg-white relative border-t border-[#0B1F3A]/8 overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Subtle GSAP 3D Scroll Parallax Background Light */}
      <div className="gsap-products-parallax absolute top-10 right-5 w-80 h-80 bg-[#15803D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="gsap-products-parallax absolute bottom-10 left-5 w-96 h-96 bg-[#F97316]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="gsap-products-header flex flex-col items-center text-center mb-16">
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

        {/* Product Cards Grid with GSAP 3D Floating Scroll Effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeProducts.map((prod, index) => (
            <div
              key={prod.id}
              className="gsap-product-card card-warm card-warm-hover rounded-2xl overflow-hidden bg-white flex flex-col justify-between shadow-xs hover:shadow-xl transition-all"
            >
              <div>
                {/* Product Cover UI Mockup Preview with GSAP 3D Parallax */}
                <div className="gsap-products-visual relative aspect-[16/10] bg-slate-900 overflow-hidden border-b border-[#0B1F3A]/6">
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

              {/* Action Button */}
              <div className="px-6 pb-6 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(prod)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0B1F3A] hover:bg-[#0B1F3A]/90 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <span>{prod.cta || prod.actionLabel || 'View Product Details'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for In-Depth Product Overview */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1F3A]/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="relative w-full max-w-xl p-6 sm:p-8 rounded-2xl bg-[#FFFDF7] border border-[#0B1F3A]/10 shadow-2xl overflow-hidden"
              >
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-2 rounded-lg text-[#0B1F3A]/60 hover:text-[#0B1F3A] hover:bg-[#0B1F3A]/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mb-4">
                  <span className="text-[11px] font-bold text-[#F97316] uppercase tracking-wider block">
                    {selectedProduct.category || selectedProduct.badge}
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl text-[#0B1F3A] mt-1">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#15803D] mt-0.5">
                    {selectedProduct.tagline}
                  </p>
                </div>

                <p className="text-sm text-[#0B1F3A]/80 leading-relaxed mb-6">
                  {selectedProduct.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
                    Key Architectural Capabilities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProduct.features?.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#0B1F3A]/8 text-xs text-[#0B1F3A]/80">
                        <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedProduct.technologies && selectedProduct.technologies.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
                      Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.technologies.map((t, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-white border border-[#0B1F3A]/8 text-xs font-medium text-[#0B1F3A]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#0B1F3A]/8">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-[#0B1F3A]/70 hover:text-[#0B1F3A]"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProduct(null);
                      handleOpenContact(selectedProduct);
                    }}
                    className="px-5 py-2.5 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold tracking-wide shadow-xs transition-colors"
                  >
                    Inquire About Deployment
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
