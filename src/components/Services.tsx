import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Globe, Smartphone, Sparkles, BarChart3, Layout, ArrowRight, Check } from 'lucide-react';
import { SERVICES } from '../data/companyData';
import { ServiceItem } from '../types';
import { useCms } from '../context/CmsContext';

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-6 h-6 text-[#F5C85B]" />,
  Globe: <Globe className="w-6 h-6 text-[#F5C85B]" />,
  Smartphone: <Smartphone className="w-6 h-6 text-[#F5C85B]" />,
  Sparkles: <Sparkles className="w-6 h-6 text-[#F5C85B]" />,
  BarChart3: <BarChart3 className="w-6 h-6 text-[#F5C85B]" />,
  Layout: <Layout className="w-6 h-6 text-[#F5C85B]" />,
};

interface ServicesProps {
  onSelectService?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  let cmsServices;
  try {
    const cms = useCms();
    cmsServices = cms.services;
  } catch (e) {
    cmsServices = SERVICES.map(s => ({ ...s, displayOrder: 1, published: true }));
  }

  // Filter published services or fallback to default
  const activeServices = (cmsServices && cmsServices.length > 0)
    ? cmsServices.filter(s => s.published !== false)
    : SERVICES;

  const handleServiceClick = (serviceTitle: string) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 relative bg-[#0B0F16] border-t border-white/10 overflow-hidden">
      {/* Background Decorative Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#05070B] border border-[#D6A84F]/30 text-[10px] font-mono tracking-wider text-[#F5C85B] uppercase mb-4">
            OUR CORE CAPABILITIES
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            What We <span className="text-gold-gradient">Build</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-normal">
            End-to-end software engineering and digital capabilities engineered to accelerate growth, modernize legacy platforms, and scale business operations.
          </p>
        </div>

        {/* Dynamic Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-2xl bg-[#05070B] border border-white/10 hover:border-[#D6A84F]/50 transition-all duration-300 shadow-xl hover:shadow-[0_15px_35px_rgba(214,168,79,0.12)] flex flex-col justify-between"
            >
              <div>
                {/* Number & Icon Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold text-slate-500 tracking-widest">
                    //{service.number || `0${idx + 1}`}
                  </span>
                  <div className="p-3.5 rounded-xl bg-[#0B0F16] border border-white/10 group-hover:border-[#F5C85B] group-hover:scale-110 transition-all duration-300">
                    {iconMap[service.iconName] || <Cpu className="w-6 h-6 text-[#F5C85B]" />}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-[#F5C85B] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>

                {/* Features Bullet List */}
                {service.features && service.features.length > 0 && (
                  <div className="space-y-2 mb-8 pt-4 border-t border-white/5">
                    {service.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-slate-400">
                        <Check className="w-3.5 h-3.5 text-[#F5C85B] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Trigger */}
              <button
                onClick={() => handleServiceClick(service.title)}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#F5C85B] hover:text-white transition-colors group-hover:translate-x-1 duration-200 cursor-pointer pt-2"
              >
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
