import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MessageSquareCode } from 'lucide-react';

interface CTASectionProps {
  onStartProject?: () => void;
  onTalkToAnivex?: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onStartProject, onTalkToAnivex }) => {
  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 relative bg-[#0B0F16] border-t border-white/10 overflow-hidden">
      {/* Background Gold Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#D6A84F]/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-[#05070B] via-[#0B0F16] to-[#05070B] border border-[#D6A84F]/40 shadow-[0_20px_60px_rgba(214,168,79,0.12)] text-center relative overflow-hidden"
        >
          {/* Subtle Corner Accents */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-[#D6A84F]/40 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[#D6A84F]/40 pointer-events-none" />

          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-[#121824] border border-[#D6A84F]/30 text-[#F5C85B] mb-6 shadow-lg">
            <MessageSquareCode className="w-8 h-8 animate-pulse" />
          </div>

          {/* Heading */}
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4 max-w-3xl mx-auto">
            Have an Idea? <span className="text-gold-gradient">Let's Build It.</span>
          </h2>

          {/* Subtext */}
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            Tell us what you're trying to build. We'll help turn the idea into a practical, scalable digital solution.
          </p>

          {/* Dual Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartProject || handleScrollToContact}
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-sm tracking-wide shadow-[0_0_30px_rgba(245,200,91,0.4)] hover:shadow-[0_0_40px_rgba(245,200,91,0.6)] hover:scale-[1.02] transition-all cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onTalkToAnivex || handleScrollToContact}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#05070B] border border-white/20 text-white font-semibold text-sm tracking-wide hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer"
            >
              <span>Talk to ANIVEX</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
