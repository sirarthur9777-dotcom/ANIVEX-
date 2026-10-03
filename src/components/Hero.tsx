import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Globe } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { HeroTechVisual } from './TechVisualMockups';
import { useGsapSection } from '../lib/gsapScrollAnimations';

interface HeroProps {
  onStartProject?: () => void;
  onExploreSolutions?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onExploreSolutions }) => {
  const { siteContent } = useCms();
  const sectionRef = useGsapSection<HTMLElement>({
    headerSelector: '.gsap-hero-left',
    cardsSelector: '.gsap-hero-trust',
    parallaxSelector: '.gsap-hero-parallax',
    visualSelector: '.gsap-hero-visual',
    cardStagger: 0.12,
    cardYOffset: 30,
    rotate3DX: 4,
    parallaxDistance: 35,
    enableParallax: true,
  });

  if (siteContent.heroVisible === false) {
    return null;
  }

  const badge = siteContent.heroBadge || "MODERN INDIAN TECHNOLOGY";
  const heading = siteContent.heroHeading || "Technology Built for India's Next Generation of Businesses.";
  const description = siteContent.heroDescription || "Anivex Solution builds modern websites, enterprise software, ERP systems, mobile applications and intelligent digital solutions for growing businesses.";
  const primaryBtnText = siteContent.primaryButtonText || "Start Your Project →";
  const primaryBtnLink = siteContent.primaryButtonLink || "#contact";
  const secondaryBtnText = siteContent.secondaryButtonText || "Explore Solutions";
  const secondaryBtnLink = siteContent.secondaryButtonLink || "#services";

  const handleScroll = (href: string) => {
    const id = href.startsWith('#') ? href.substring(1) : href;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#FFFDF7] overflow-hidden indian-pattern-bg"
      style={{ perspective: '1200px' }}
    >
      {/* Subtle Warm Saffron and Green Ambient Light with GSAP 3D Scroll Parallax */}
      <div className="gsap-hero-parallax absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#F97316]/8 via-[#D4A72C]/6 to-[#15803D]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Value Proposition with GSAP Float Up */}
          <div className="gsap-hero-left lg:col-span-7 flex flex-col items-start text-left">
            {/* Subtle Indian Tech Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-xs font-semibold text-[#0B1F3A] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#F97316]" />
              <span className="tracking-wide uppercase text-[11px] font-bold">{badge}</span>
              <span className="text-[#0B1F3A]/30">|</span>
              <span className="text-[#15803D] font-medium">Built in India</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-tight text-[#0B1F3A] leading-[1.12] mb-6">
              {heading}
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#0B1F3A]/75 font-normal leading-relaxed max-w-2xl mb-8">
              {description}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={onStartProject || (() => handleScroll(primaryBtnLink))}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm tracking-wide transition-all shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap"
                id="hero-primary-btn"
              >
                <span>{primaryBtnText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onExploreSolutions || (() => handleScroll(secondaryBtnLink))}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#0B1F3A] font-semibold text-sm border border-[#0B1F3A]/15 transition-all shadow-sm cursor-pointer whitespace-nowrap"
                id="hero-secondary-btn"
              >
                <span>{secondaryBtnText}</span>
              </button>
            </div>

            {/* Trust highlights */}
            <div className="mt-10 pt-6 border-t border-[#0B1F3A]/10 grid grid-cols-2 sm:grid-cols-3 gap-6 w-full">
              <div className="gsap-hero-trust flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0B1F3A]">Enterprise Quality</h4>
                  <p className="text-[11px] text-[#0B1F3A]/60 mt-0.5">Production-grade architecture</p>
                </div>
              </div>
              <div className="gsap-hero-trust flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0B1F3A]">GST Compliant</h4>
                  <p className="text-[11px] text-[#0B1F3A]/60 mt-0.5">Official invoices & contracts</p>
                </div>
              </div>
              <div className="gsap-hero-trust flex items-start gap-2.5 col-span-2 sm:col-span-1">
                <Globe className="w-5 h-5 text-[#D4A72C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0B1F3A]">Direct Engineering</h4>
                  <p className="text-[11px] text-[#0B1F3A]/60 mt-0.5">Transparent communication</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium High-Fidelity Technology & Indian Business Visual with 3D Parallax */}
          <div className="gsap-hero-visual lg:col-span-5 relative">
            <HeroTechVisual />
            {/* Subtle decorative Indian geometric accent line */}
            <div className="absolute -bottom-3 left-8 right-8 h-1 rounded-full saffron-green-accent opacity-80" />
          </div>

        </div>
      </div>
    </section>
  );
};
