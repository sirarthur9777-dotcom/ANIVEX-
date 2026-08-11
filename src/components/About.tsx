import React from 'react';
import { motion } from 'motion/react';
import { ABOUT_STATS } from '../data/companyData';
import { Compass, Palette, Code2, Rocket, ShieldCheck } from 'lucide-react';
import { useCms } from '../context/CmsContext';

const icons = [
  <Compass className="w-5 h-5 text-[#F5C85B]" />,
  <Palette className="w-5 h-5 text-[#F5C85B]" />,
  <Code2 className="w-5 h-5 text-[#F5C85B]" />,
  <Rocket className="w-5 h-5 text-[#F5C85B]" />,
];

export const About: React.FC = () => {
  let siteContent;
  try {
    const cms = useCms();
    siteContent = cms.siteContent;
  } catch (e) {
    siteContent = {
      aboutHeading: 'Technology With Purpose.',
      aboutDescription: 'ANIVEX Solutions helps businesses transform ideas into reliable digital products and intelligent technology solutions.',
      aboutStory: 'We combine disciplined software engineering, modern human-centered design, and emerging technology stacks to create scalable, high-performance systems that solve real-world operational problems.',
      founderName: 'Krishndas Chauhan',
      founderRole: 'Founder',
      founderDescription: 'Krishndas Chauhan is the Founder of ANIVEX Solutions, focused on building modern software products, digital platforms, and technology-driven solutions for businesses.',
    };
  }

  const founderName = siteContent?.founderName || 'Krishndas Chauhan';
  const founderRole = siteContent?.founderRole || 'Founder';
  const founderDesc =
    siteContent?.founderDescription ||
    'Krishndas Chauhan is the Founder of ANIVEX Solutions, focused on building modern software products, digital platforms, and technology-driven solutions for businesses.';

  return (
    <section id="about" className="py-24 relative bg-[#05070B] overflow-hidden">
      {/* Background Subtle Lines */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D6A84F]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Heading Side */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B0F16] border border-[#D6A84F]/30 text-[10px] font-mono tracking-wider text-[#F5C85B] uppercase mb-4">
              ABOUT ANIVEX
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-6">
              {siteContent?.aboutHeading || 'Technology With '}
              {!siteContent?.aboutHeading.includes('Purpose') && <span className="text-gold-gradient">Purpose.</span>}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#F5C85B] to-transparent rounded-full mb-6" />
          </div>

          {/* Copy Side */}
          <div className="lg:col-span-7 text-slate-300 text-base sm:text-lg leading-relaxed space-y-4">
            <p className="font-normal text-slate-200">
              <strong className="text-white font-semibold">ANIVEX Solutions</strong> {siteContent?.aboutDescription || 'helps businesses transform ideas into reliable digital products and intelligent technology solutions.'}
            </p>
            <p className="text-slate-400">
              {siteContent?.aboutStory || 'We combine disciplined software engineering, modern human-centered design, and emerging technology stacks to create scalable, high-performance systems that solve real-world operational problems.'}
            </p>
          </div>
        </div>

        {/* Founder Spotlight Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0B0F16] via-[#121824] to-[#0B0F16] border border-[#D6A84F]/40 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D6A84F]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
            {/* Founder Avatar / Monogram Badge */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-2xl sm:text-3xl flex items-center justify-center font-mono shadow-[0_10px_30px_rgba(214,168,79,0.3)] shrink-0 group-hover:scale-105 transition-transform">
              KC
            </div>

            {/* Founder Details */}
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#05070B] border border-[#D6A84F]/30 text-[10px] font-mono font-bold text-[#F5C85B] uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F5C85B]" />
                <span>{founderRole}</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                {founderName}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal pt-1">
                {founderDesc}
              </p>
            </div>
          </div>
        </motion.div>

        {/* 4 Process Milestone Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ABOUT_STATS.map((stat, idx) => (
            <motion.div
              key={stat.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative p-6 rounded-2xl bg-[#0B0F16] border border-white/10 hover:border-[#D6A84F]/40 transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(214,168,79,0.1)] flex flex-col justify-between"
            >
              {/* Card Header: Number + Icon */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-display font-extrabold text-3xl text-gold-gradient">
                  {stat.number}
                </span>
                <div className="p-3 rounded-xl bg-[#121824] border border-[#D6A84F]/20 group-hover:border-[#F5C85B]/50 transition-colors">
                  {icons[idx]}
                </div>
              </div>

              {/* Card Body */}
              <div>
                <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-[#F5C85B] transition-colors">
                  {stat.label}
                </h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  {stat.desc}
                </p>
              </div>

              {/* Bottom Subtle Accent Bar */}
              <div className="mt-6 w-full h-0.5 bg-white/5 group-hover:bg-gradient-to-r group-hover:from-[#D6A84F] group-hover:to-transparent transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
