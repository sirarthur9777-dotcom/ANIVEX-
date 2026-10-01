import React from 'react';
import { motion } from 'motion/react';
import { Building2, Rocket, ShieldCheck, UserCheck, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { SOLUTIONS } from '../data/companyData';
import { useCms } from '../context/CmsContext';
import { formatWhatsAppUrl } from '../services/websiteSettings';

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-5 h-5 text-[#F59E0B]" />,
  Rocket: <Rocket className="w-5 h-5 text-[#F59E0B]" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#F59E0B]" />,
  UserCheck: <UserCheck className="w-5 h-5 text-[#F59E0B]" />,
};

interface SolutionsProps {
  onSelectSolution?: (title: string) => void;
}

export const Solutions: React.FC<SolutionsProps> = ({ onSelectSolution }) => {
  const { companyInfo, websiteSettings, solutions: cmsSolutions } = useCms();
  const phone = websiteSettings?.whatsapp || websiteSettings?.phone || companyInfo?.phone || '';

  const activeSolutions = (cmsSolutions && cmsSolutions.length > 0)
    ? cmsSolutions.filter(s => s.published !== false)
    : SOLUTIONS;

  const handleSolutionClick = (title: string) => {
    if (onSelectSolution) {
      onSelectSolution(title);
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsappSolution = (title: string) => {
    const text = `Namaste Anivex Solution! I want to discuss a tailored solution: "${title}".`;
    window.open(formatWhatsAppUrl(phone, text), '_blank');
  };

  return (
    <section id="solutions" className="py-24 relative bg-[#0F172A] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E293B] border border-[#F59E0B]/30 text-xs font-semibold text-[#F59E0B] uppercase tracking-wider mb-4 shadow-sm">
            <span>🇮🇳</span>
            <span>CUSTOM PACKAGES BY CLIENT TYPE</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            Solutions Designed <span className="text-gold-gradient">For Your Business Size</span>
          </h2>
          <p className="text-slate-300 max-w-2xl text-sm sm:text-base font-normal leading-relaxed">
            Whether you are a local shop, an emerging D2C brand, a growing factory, or a large enterprise — we engineer software tailored to your daily needs.
          </p>
        </div>

        {/* Dynamic Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeSolutions.map((sol, idx) => (
            <motion.div
              key={sol.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-7 rounded-3xl bg-[#1E293B]/70 border border-white/10 hover:border-[#F59E0B]/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-2xl bg-[#0F172A] border border-white/10 text-[#F59E0B]">
                    {iconMap[sol.iconName] || <Building2 className="w-5 h-5 text-[#F59E0B]" />}
                  </div>
                  <span className="text-xs font-bold text-amber-300 bg-[#0F172A] px-3 py-1 rounded-full border border-white/10">
                    {sol.targetAudience}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-white mb-1.5">
                  {sol.title}
                </h3>
                <div className="text-xs font-semibold text-amber-300 mb-3.5">
                  {sol.subtitle}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {sol.description}
                </p>

                {sol.highlights && sol.highlights.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 pt-4 border-t border-white/10">
                    {sol.highlights.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleSolutionClick(sol.title)}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#0F172A] border border-white/10 hover:border-[#F59E0B] text-white hover:text-[#F59E0B] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Inquire for {sol.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleWhatsappSolution(sol.title)}
                  className="p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer"
                  title="Inquire on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
