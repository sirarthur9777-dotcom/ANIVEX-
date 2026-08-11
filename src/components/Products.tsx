import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, FileText, ArrowRight, ShieldCheck, Check, Layers, ExternalLink, X } from 'lucide-react';
import { PRODUCTS } from '../data/companyData';
import { ProductItem } from '../types';

interface ProductsProps {
  onOpenAiDemo: () => void;
}

export const Products: React.FC<ProductsProps> = ({ onOpenAiDemo }) => {
  const [selectedProductModal, setSelectedProductModal] = useState<ProductItem | null>(null);

  return (
    <section id="products" className="py-24 relative bg-[#05070B] overflow-hidden">
      {/* Background Accent Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#D6A84F]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F16] border border-[#D6A84F]/30 text-[10px] font-mono tracking-wider text-[#F5C85B] uppercase mb-4">
            PROPRIETARY INNOVATION
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            Built by <span className="text-gold-gradient">ANIVEX</span>
          </h2>
          <p className="text-slate-300 max-w-2xl text-sm sm:text-base font-normal">
            In addition to custom client engineering, ANIVEX develops proprietary technology products designed to solve fundamental document governance, operational productivity, and enterprise software challenges.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((prod, idx) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className={`group relative p-8 rounded-2xl bg-[#0B0F16] border transition-all duration-300 flex flex-col justify-between shadow-xl ${
                prod.id === 'anivex-ai'
                  ? 'border-[#D6A84F]/50 shadow-[0_10px_30px_rgba(214,168,79,0.1)]'
                  : 'border-white/10 hover:border-[#D6A84F]/40'
              }`}
            >
              <div>
                {/* Badge & Status Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-[#121824] border border-[#D6A84F]/30 text-[11px] font-mono text-[#F5C85B]">
                    {prod.badge}
                  </span>
                  <span className={`text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${
                    prod.status === 'Available'
                      ? 'bg-emerald-950/50 border-emerald-500/30 text-emerald-400'
                      : prod.status === 'Coming Soon'
                      ? 'bg-amber-950/50 border-amber-500/30 text-amber-400'
                      : 'bg-slate-800 border-slate-600 text-slate-300'
                  }`}>
                    {prod.status}
                  </span>
                </div>

                {/* Product Name & Tagline */}
                <h3 className="font-display font-bold text-2xl text-white mb-1 group-hover:text-[#F5C85B] transition-colors">
                  {prod.name}
                </h3>
                <div className="text-xs font-semibold text-[#D6A84F] tracking-wide mb-4">
                  {prod.tagline}
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {prod.description}
                </p>

                {/* Key Features */}
                <div className="space-y-2 mb-8 pt-4 border-t border-white/5">
                  {prod.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-slate-400">
                      <Check className="w-3.5 h-3.5 text-[#F5C85B] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div>
                {prod.isInteractive ? (
                  <button
                    onClick={onOpenAiDemo}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#F5C85B] text-[#05070B] font-bold text-xs tracking-wide flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_20px_rgba(245,200,91,0.4)] transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{prod.actionLabel}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedProductModal(prod)}
                    className="w-full py-3 px-4 rounded-xl bg-[#05070B] border border-white/10 hover:border-[#D6A84F] text-white hover:text-[#F5C85B] font-semibold text-xs tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>{prod.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Product Details Modal (e.g. for PolicyHub) */}
        <AnimatePresence>
          {selectedProductModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070B]/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-xl p-6 sm:p-8 rounded-2xl bg-[#0B0F16] border border-[#D6A84F]/40 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-[#121824] border border-[#D6A84F]/30 text-[#F5C85B]">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-2xl text-white">{selectedProductModal.name}</h3>
                      <p className="text-xs text-[#D6A84F]">{selectedProductModal.tagline}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProductModal(null)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {selectedProductModal.description}
                </p>

                <div className="space-y-3 mb-8 bg-[#05070B] p-4 rounded-xl border border-white/10">
                  <h4 className="text-xs font-mono font-bold text-[#F5C85B] uppercase">CORE PLATFORM ARCHITECTURE</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#F5C85B]" />
                      <span>Role-Based Access Control (RBAC) & Audit Trails</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#F5C85B]" />
                      <span>Policy Document Version Control & Archival Systems</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#F5C85B]" />
                      <span>Semantic AI Search for Enterprise Compliance Documents</span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedProductModal(null)}
                    className="px-5 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <a
                    href="#contact"
                    onClick={() => {
                      setSelectedProductModal(null);
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#F5C85B] text-[#05070B] font-bold text-xs flex items-center gap-2 hover:opacity-95 transition-opacity cursor-pointer"
                  >
                    <span>Request Product Scoping</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
