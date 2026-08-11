import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Rocket, ShieldCheck, UserCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SOLUTIONS } from '../data/companyData';
import { SolutionCategory } from '../types';

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-6 h-6 text-[#F5C85B]" />,
  Rocket: <Rocket className="w-6 h-6 text-[#F5C85B]" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#F5C85B]" />,
  UserCheck: <UserCheck className="w-6 h-6 text-[#F5C85B]" />,
};

interface SolutionsProps {
  onSelectSolution?: (title: string) => void;
}

export const Solutions: React.FC<SolutionsProps> = ({ onSelectSolution }) => {
  const [activeTab, setActiveTab] = useState<string>(SOLUTIONS[0].id);

  const handleSolutionClick = (title: string) => {
    if (onSelectSolution) {
      onSelectSolution(title);
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="solutions" className="py-24 relative bg-[#0B0F16] border-t border-white/10 overflow-hidden">
      {/* Background Accent Lines */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#D6A84F]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#05070B] border border-[#D6A84F]/30 text-[10px] font-mono tracking-wider text-[#F5C85B] uppercase mb-4">
            TAILORED ARCHITECTURE
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            Solutions Designed <span className="text-gold-gradient">Around Your Business</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-normal">
            Whether you are a growing enterprise, a venture-backed startup, an educational institution, or an ambitious creator, ANIVEX builds technology specifically tailored to your scale.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SOLUTIONS.map((sol, idx) => (
            <motion.div
              key={sol.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative p-8 rounded-2xl bg-[#05070B] border border-white/10 hover:border-[#D6A84F]/50 transition-all duration-300 shadow-xl hover:shadow-[0_15px_35px_rgba(214,168,79,0.1)] flex flex-col justify-between"
            >
              <div>
                {/* Header Icon + Audience Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-xl bg-[#0B0F16] border border-[#D6A84F]/30 group-hover:border-[#F5C85B] transition-colors">
                    {iconMap[sol.iconName]}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-[#121824] px-3 py-1 rounded-full border border-white/5">
                    {sol.targetAudience}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-display font-bold text-2xl text-white mb-2 group-hover:text-[#F5C85B] transition-colors">
                  {sol.title}
                </h3>
                <p className="text-xs font-semibold text-[#D6A84F] tracking-wide mb-4">
                  {sol.subtitle}
                </p>

                {/* Main Body */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {sol.description}
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8 pt-4 border-t border-white/5">
                  {sol.highlights.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F5C85B] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Trigger */}
              <button
                onClick={() => handleSolutionClick(sol.title)}
                className="w-full py-3 rounded-xl bg-[#0B0F16] border border-white/10 hover:border-[#D6A84F] text-white hover:text-[#F5C85B] text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Discuss {sol.title} Solution</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
