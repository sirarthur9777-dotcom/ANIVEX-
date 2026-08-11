import React from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data/companyData';
import { Search, Compass, Palette, Code2, ShieldCheck, Rocket } from 'lucide-react';

const stepIcons = [
  <Search className="w-5 h-5 text-[#F5C85B]" />,
  <Compass className="w-5 h-5 text-[#F5C85B]" />,
  <Palette className="w-5 h-5 text-[#F5C85B]" />,
  <Code2 className="w-5 h-5 text-[#F5C85B]" />,
  <ShieldCheck className="w-5 h-5 text-[#F5C85B]" />,
  <Rocket className="w-5 h-5 text-[#F5C85B]" />,
];

export const Process: React.FC = () => {
  return (
    <section id="process" className="py-24 relative bg-[#05070B] overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#D6A84F]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F16] border border-[#D6A84F]/30 text-[10px] font-mono tracking-wider text-[#F5C85B] uppercase mb-4">
            ENGINEERING LIFECYCLE
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            Our <span className="text-gold-gradient">Process</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-normal">
            A disciplined six-phase product development framework engineered to reduce time-to-market while guaranteeing security, quality, and architectural integrity.
          </p>
        </div>

        {/* Timeline Grid (6 Steps) */}
        <div className="relative">
          {/* Subtle Horizontal Connecting Line for Large Screens */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D6A84F]/30 to-transparent z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="group p-6 rounded-2xl bg-[#0B0F16] border border-white/10 hover:border-[#D6A84F]/50 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Step Header: Icon + Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#121824] border border-[#D6A84F]/30 group-hover:border-[#F5C85B] flex items-center justify-center transition-colors">
                      {stepIcons[idx]}
                    </div>
                    <span className="font-display font-black text-2xl text-slate-600 group-hover:text-[#F5C85B] transition-colors">
                      {step.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#F5C85B] transition-colors">
                    {step.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-300 font-normal leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                {/* Details Accordion / Hover Callout */}
                <div className="pt-3 border-t border-white/5 text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors">
                  {step.details}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
