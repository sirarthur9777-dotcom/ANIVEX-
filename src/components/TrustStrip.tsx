import React from 'react';
import { Code, Sparkles, Smartphone, Zap, Cloud } from 'lucide-react';
import { TRUST_ITEMS } from '../data/companyData';

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code className="w-4 h-4 text-[#F5C85B]" />,
  Sparkles: <Sparkles className="w-4 h-4 text-[#F5C85B]" />,
  Smartphone: <Smartphone className="w-4 h-4 text-[#F5C85B]" />,
  Zap: <Zap className="w-4 h-4 text-[#F5C85B]" />,
  Cloud: <Cloud className="w-4 h-4 text-[#F5C85B]" />,
};

export const TrustStrip: React.FC = () => {
  return (
    <section id="trust-strip" className="relative z-20 py-8 bg-[#0B0F16] border-y border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 md:gap-8">
          {TRUST_ITEMS.map((item, idx) => (
            <div
              key={item.label}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[#05070B]/60 border border-white/5 hover:border-[#D6A84F]/30 transition-all duration-300"
            >
              <div className="p-2 rounded-lg bg-[#121824] border border-[#D6A84F]/20">
                {iconMap[item.icon] || <Code className="w-4 h-4 text-[#F5C85B]" />}
              </div>
              <span className="text-xs font-semibold tracking-wider text-slate-200 uppercase font-display">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
