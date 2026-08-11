import React from 'react';
import { motion } from 'motion/react';
import { CASE_STUDIES } from '../data/companyData';
import { AlertCircle, CheckCircle2, Cpu, TrendingUp, ArrowRight } from 'lucide-react';

export const CaseStudies: React.FC = () => {
  return (
    <section id="case-studies" className="py-24 relative bg-[#05070B] overflow-hidden">
      {/* Background Accent Grid */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#D6A84F]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F16] border border-[#D6A84F]/30 text-[10px] font-mono tracking-wider text-[#F5C85B] uppercase mb-4">
            PROVEN IMPACT
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            Ideas Into <span className="text-gold-gradient">Impact</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-normal">
            Real-world architectural breakdowns illustrating how ANIVEX Solutions transforms complex operational challenges into streamlined digital systems.
          </p>
        </div>

        {/* Case Studies Breakdown */}
        <div className="space-y-8">
          {CASE_STUDIES.map((cs, idx) => (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 sm:p-10 rounded-2xl bg-[#0B0F16] border border-white/10 hover:border-[#D6A84F]/40 transition-all duration-300 shadow-2xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-[#F5C85B] uppercase tracking-wider block mb-1">
                    INDUSTRY: {cs.industry}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white">
                    {cs.title}
                  </h3>
                </div>
                <a
                  href="#contact"
                  className="px-4 py-2 rounded-xl bg-[#05070B] border border-white/10 hover:border-[#D6A84F] text-white hover:text-[#F5C85B] text-xs font-bold flex items-center gap-2 transition-all"
                >
                  <span>Discuss Similar Solution</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Problem -> Solution -> Technology -> Result Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* 1. Problem */}
                <div className="p-5 rounded-xl bg-[#05070B] border border-red-500/20">
                  <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-bold uppercase mb-3">
                    <AlertCircle className="w-4 h-4" />
                    <span>01. Problem</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {cs.problem}
                  </p>
                </div>

                {/* 2. Solution */}
                <div className="p-5 rounded-xl bg-[#05070B] border border-[#D6A84F]/30">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#F5C85B] font-bold uppercase mb-3">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>02. Solution</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {cs.solution}
                  </p>
                </div>

                {/* 3. Technology */}
                <div className="p-5 rounded-xl bg-[#05070B] border border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-bold uppercase mb-3">
                    <Cpu className="w-4 h-4 text-[#F5C85B]" />
                    <span>03. Technology</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cs.technology.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-[#121824] text-[10px] font-mono text-[#F5C85B] border border-[#D6A84F]/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4. Result */}
                <div className="p-5 rounded-xl bg-[#05070B] border border-emerald-500/20">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase mb-3">
                    <TrendingUp className="w-4 h-4" />
                    <span>04. Result</span>
                  </div>
                  <p className="text-xs text-slate-200 font-medium leading-relaxed">
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
