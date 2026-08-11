import React from 'react';
import { motion } from 'motion/react';
import { WHY_ANIVEX_CARDS } from '../data/companyData';
import { Target, Layers, Sparkles, Shield, Clock } from 'lucide-react';

const icons: Record<string, React.ReactNode> = {
  Target: <Target className="w-6 h-6 text-[#F5C85B]" />,
  Layers: <Layers className="w-6 h-6 text-[#F5C85B]" />,
  Sparkles: <Sparkles className="w-6 h-6 text-[#F5C85B]" />,
  Shield: <Shield className="w-6 h-6 text-[#F5C85B]" />,
  Clock: <Clock className="w-6 h-6 text-[#F5C85B]" />,
};

export const WhyAnivex: React.FC = () => {
  return (
    <section id="why-anivex" className="py-24 relative bg-[#0B0F16] border-t border-white/10 overflow-hidden">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#05070B] border border-[#D6A84F]/30 text-[10px] font-mono tracking-wider text-[#F5C85B] uppercase mb-4">
            THE ANIVEX ADVANTAGE
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            Why <span className="text-gold-gradient">ANIVEX?</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-normal">
            Five core engineering principles that distinguish our software engineering, product strategy, and long-term client engagements.
          </p>
        </div>

        {/* 5 Premium Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_ANIVEX_CARDS.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className={`p-8 rounded-2xl bg-[#05070B] border border-white/10 hover:border-[#D6A84F]/50 transition-all duration-300 shadow-xl flex flex-col justify-between ${
                idx === 0 ? 'md:col-span-2 lg:col-span-1 bg-gradient-to-br from-[#0B0F16] via-[#05070B] to-[#121824] border-[#D6A84F]/40' : ''
              }`}
            >
              <div>
                <div className="p-3.5 rounded-xl bg-[#0B0F16] border border-[#D6A84F]/30 w-fit mb-6">
                  {icons[card.iconName]}
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-3 hover:text-[#F5C85B] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>ANIVEX PRINCIPLE 0{idx + 1}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C85B]" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
