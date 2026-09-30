import React from 'react';
import { motion } from 'motion/react';
import { PhoneCall, FileSpreadsheet, Palette, Code2, ShieldCheck, Rocket, MessageCircle } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const Process: React.FC = () => {
  const { companyInfo } = useCms();
  const rawPhone = companyInfo?.phone || '+91 98765 43210';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const phoneToUse = cleanPhone.length >= 10 ? cleanPhone : '919876543210';

  const steps = [
    {
      num: '01',
      title: 'Free Discussion',
      hindiSubtitle: 'Aapki Requirement Samajhna',
      desc: 'Connect via phone or WhatsApp. We discuss what you want to build and your target audience.',
      icon: <PhoneCall className="w-5 h-5 text-[#F59E0B]" />,
    },
    {
      num: '02',
      title: 'Quote & Roadmap',
      hindiSubtitle: 'Fixed Budget aur Timeline',
      desc: 'Transparent pricing in Indian Rupees (₹) with clear milestone delivery dates and features.',
      icon: <FileSpreadsheet className="w-5 h-5 text-[#F59E0B]" />,
    },
    {
      num: '03',
      title: 'Design & Prototype',
      hindiSubtitle: 'Visual Look aur User Flow',
      desc: 'We share interactive mockups so you can review colors, buttons, and layout before coding.',
      icon: <Palette className="w-5 h-5 text-[#F59E0B]" />,
    },
    {
      num: '04',
      title: 'Fast Development',
      hindiSubtitle: 'High Performance Coding',
      desc: 'Rapid building with clean code, mobile optimization, security, and weekly WhatsApp video updates.',
      icon: <Code2 className="w-5 h-5 text-[#F59E0B]" />,
    },
    {
      num: '05',
      title: 'Testing & Feedback',
      hindiSubtitle: 'Bug Free Quality Check',
      desc: 'Rigorous testing on multiple Android & iPhone devices, slow internet networks, and screen sizes.',
      icon: <ShieldCheck className="w-5 h-5 text-[#F59E0B]" />,
    },
    {
      num: '06',
      title: 'Launch & Support',
      hindiSubtitle: 'Play Store, Domain & Training',
      desc: 'We launch your website or publish your app, train your team, and provide 1 year of free support.',
      icon: <Rocket className="w-5 h-5 text-[#F59E0B]" />,
    },
  ];

  return (
    <section id="process" className="py-24 relative bg-[#0B1120] overflow-hidden border-t border-white/10">
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#F59E0B]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E293B] border border-[#F59E0B]/30 text-xs font-semibold text-[#F59E0B] uppercase tracking-wider mb-4 shadow-sm">
            <span>🇮🇳</span>
            <span>KAISE KAAM HOTA HAI (SIMPLE 6 STEPS)</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            Our Simple, Hassle-Free <span className="text-gold-gradient">Process</span>
          </h2>
          <p className="text-slate-300 max-w-2xl text-sm sm:text-base font-normal leading-relaxed">
            No technical confusion. From your first WhatsApp message to production launch, we keep everything crystal clear and on-time.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="p-6 rounded-3xl bg-[#0F172A] border border-white/10 hover:border-[#F59E0B]/40 transition-all duration-300 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#1E293B] border border-[#F59E0B]/30 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="font-display font-extrabold text-2xl text-slate-400">
                    {step.num}
                  </span>
                </div>

                <div className="text-[11px] font-bold text-[#F59E0B] uppercase tracking-wider mb-1">
                  {step.hindiSubtitle}
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-300">
                <span>Step {idx + 1} of 6</span>
                <span className="text-emerald-400 font-medium">✓ Guaranteed Timeline</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick CTA */}
        <div className="mt-12 text-center">
          <a
            href={`https://wa.me/${phoneToUse}?text=${encodeURIComponent('Namaste ANIVEX! I want to start Step 1 with a free discussion.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Start Step 1: Free Discussion on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
