import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Cpu, Sparkles, ChevronDown } from 'lucide-react';
import { AnivexBrandSymbol } from './AnivexBrandSymbol';

interface HeroProps {
  onStartProject?: () => void;
  onExploreSolutions?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onExploreSolutions }) => {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center bg-radial-gradient bg-tech-grid overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#D6A84F]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F16] border border-[#D6A84F]/30 text-[11px] font-semibold tracking-wider text-[#F5C85B] uppercase mb-6 shadow-[0_4px_20px_rgba(214,168,79,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#F5C85B] animate-pulse" />
              <span>NEXT-GENERATION TECHNOLOGY COMPANY</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.08] mb-6">
              We Build Technology That{' '}
              <span className="text-gold-gradient inline-block">Moves Businesses Forward.</span>
            </h1>

            {/* Supporting Line */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-8">
              From intelligent software to scalable digital products, <strong className="text-white font-medium">ANIVEX Solutions</strong> turns ambitious ideas into powerful technology.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onStartProject || (() => handleScrollTo('contact'))}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_28px_rgba(245,200,91,0.5)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                id="hero-start-project-btn"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreSolutions || (() => handleScrollTo('solutions'))}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#0B0F16]/90 border border-white/15 text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-white/10 hover:border-white/30 cursor-pointer"
                id="hero-explore-solutions-btn"
              >
                <span>Explore Our Solutions</span>
              </button>
            </div>

            {/* Micro Value Indicators */}
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 text-left w-full max-w-xl">
              <div>
                <div className="font-display font-bold text-xl text-white">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">Custom Software</div>
              </div>
              <div>
                <div className="font-display font-bold text-xl text-[#F5C85B]">AI-Driven</div>
                <div className="text-xs text-slate-400 mt-0.5">Automated Workflows</div>
              </div>
              <div>
                <div className="font-display font-bold text-xl text-white">Scalable</div>
                <div className="text-xs text-slate-400 mt-0.5">Enterprise Systems</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Abstract Brand Symbol Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center relative mt-6 lg:mt-0"
          >
            <AnivexBrandSymbol size={380} />
          </motion.div>

        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => handleScrollTo('trust-strip')}>
        <span className="text-[10px] tracking-widest font-mono text-slate-400 uppercase mb-1">SCROLL</span>
        <ChevronDown className="w-4 h-4 text-[#F5C85B] animate-bounce" />
      </div>
    </section>
  );
};
