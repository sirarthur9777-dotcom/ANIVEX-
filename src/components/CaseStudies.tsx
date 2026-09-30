import React from 'react';
import { motion } from 'motion/react';
import { CASE_STUDIES } from '../data/companyData';
import { AlertCircle, CheckCircle2, Cpu, TrendingUp, ArrowRight, MessageCircle } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const CaseStudies: React.FC = () => {
  const { companyInfo } = useCms();
  const rawPhone = companyInfo?.phone || '+91 98765 43210';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const phoneToUse = cleanPhone.length >= 10 ? cleanPhone : '919876543210';

  return (
    <section id="case-studies" className="py-24 relative bg-[#0B1120] overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E293B] border border-[#F59E0B]/30 text-xs font-semibold text-[#F59E0B] uppercase tracking-wider mb-4 shadow-sm">
            <span>🇮🇳</span>
            <span>REAL BUSINESS CASE STUDIES</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            Problem To <span className="text-gold-gradient">Measurable Outcome</span>
          </h2>
          <p className="text-slate-300 max-w-2xl text-sm sm:text-base font-normal leading-relaxed">
            See how custom software and automation solved actual operational bottlenecks for our clients.
          </p>
        </div>

        {/* Case Studies Breakdown */}
        <div className="space-y-8">
          {CASE_STUDIES.map((cs, idx) => (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-7 sm:p-9 rounded-3xl bg-[#0F172A] border border-white/10 hover:border-[#F59E0B]/40 transition-all duration-300 shadow-xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-5 border-b border-white/10">
                <div>
                  <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider block mb-1">
                    INDUSTRY: {cs.industry}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white">
                    {cs.title}
                  </h3>
                </div>
                
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${phoneToUse}?text=${encodeURIComponent(`Namaste! I want to discuss a solution similar to your case study: "${cs.title}".`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center justify-center transition-colors"
                    title="Inquire on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </a>

                  <a
                    href="#contact"
                    className="px-4 py-2.5 rounded-xl bg-[#1E293B] border border-white/10 hover:border-[#F59E0B] text-white hover:text-[#F59E0B] text-xs font-bold flex items-center gap-2 transition-all"
                  >
                    <span>Discuss Similar Solution</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* 4 Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* 1. Problem */}
                <div className="p-5 rounded-2xl bg-[#1E293B]/70 border border-red-500/30">
                  <div className="flex items-center gap-2 text-xs text-red-400 font-bold uppercase mb-2.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>01. The Problem</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {cs.problem}
                  </p>
                </div>

                {/* 2. Solution */}
                <div className="p-5 rounded-2xl bg-[#1E293B]/70 border border-[#F59E0B]/30">
                  <div className="flex items-center gap-2 text-xs text-[#F59E0B] font-bold uppercase mb-2.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>02. The Solution</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {cs.solution}
                  </p>
                </div>

                {/* 3. Technology */}
                <div className="p-5 rounded-2xl bg-[#1E293B]/70 border border-white/10">
                  <div className="flex items-center gap-2 text-xs text-slate-300 font-bold uppercase mb-2.5">
                    <Cpu className="w-4 h-4 text-[#F59E0B]" />
                    <span>03. Technology Stack</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cs.technology.map((t) => (
                      <span key={t} className="px-2 py-1 rounded-md bg-[#0F172A] text-[11px] font-semibold text-amber-300 border border-[#F59E0B]/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4. Result */}
                <div className="p-5 rounded-2xl bg-[#1E293B]/70 border border-emerald-500/30">
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold uppercase mb-2.5">
                    <TrendingUp className="w-4 h-4" />
                    <span>04. Measurable Result</span>
                  </div>
                  <p className="text-xs text-emerald-300 font-semibold leading-relaxed">
                    {cs.result}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
