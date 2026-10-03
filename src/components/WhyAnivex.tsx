import React from 'react';
import { TrendingUp, Cpu, Layers, HeartHandshake } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { useGsapSection } from '../lib/gsapScrollAnimations';

export const WhyAnivex: React.FC = () => {
  const { siteContent } = useCms();
  const whySettings = siteContent.whyAnivex;

  const sectionRef = useGsapSection<HTMLElement>({
    headerSelector: '.gsap-why-header',
    cardsSelector: '.gsap-why-card',
    parallaxSelector: '.gsap-why-parallax',
    cardStagger: 0.1,
    cardYOffset: 50,
    rotate3DX: 6,
    parallaxDistance: 25,
    enableParallax: true,
  });

  if (whySettings?.enabled === false) {
    return null;
  }

  const heading = whySettings?.heading || 'Why Anivex Solution';
  const description = whySettings?.description || 'We believe technology should serve real business goals — reducing overhead, accelerating growth, and delivering long-term competitive advantage.';

  const features = (whySettings?.features && whySettings.features.length > 0)
    ? [...whySettings.features].sort((a, b) => a.order - b.order)
    : [
        {
          id: 'why-1',
          number: '01',
          title: 'Business First',
          description: 'Technology built around actual business requirements, daily workflows, and bottom-line growth.',
          iconName: 'TrendingUp',
          order: 1,
        },
        {
          id: 'why-2',
          number: '02',
          title: 'Modern Technology',
          description: 'Modern development stack (React, Node.js, TypeScript, Cloud) with clean, scalable architecture.',
          iconName: 'Cpu',
          order: 2,
        },
        {
          id: 'why-3',
          number: '03',
          title: 'Custom Solutions',
          description: 'No unnecessary one-size-fits-all templates or bloated plugins. Built purposefully from the ground up.',
          iconName: 'Layers',
          order: 3,
        },
        {
          id: 'why-4',
          number: '04',
          title: 'Long-Term Support',
          description: 'Solutions designed for future growth with continuous updates, security audits, and dedicated support.',
          iconName: 'HeartHandshake',
          order: 4,
        },
      ];

  const getIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'cpu':
        return <Cpu className="w-5 h-5 text-[#F97316]" />;
      case 'layers':
        return <Layers className="w-5 h-5 text-[#15803D]" />;
      case 'hearthandshake':
      case 'support':
        return <HeartHandshake className="w-5 h-5 text-[#D4A72C]" />;
      case 'trendingup':
      default:
        return <TrendingUp className="w-5 h-5 text-[#0B1F3A]" />;
    }
  };

  return (
    <section
      id="why-anivex"
      ref={sectionRef}
      className="py-24 bg-white relative border-t border-[#0B1F3A]/8 overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Subtle GSAP 3D Scroll Parallax Background Light */}
      <div className="gsap-why-parallax absolute top-10 right-10 w-96 h-96 bg-[#F97316]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="gsap-why-parallax absolute bottom-5 left-10 w-80 h-80 bg-[#15803D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="gsap-why-header flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-xs font-semibold text-[#0B1F3A] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
            <span className="uppercase tracking-wider text-[11px] font-bold">OUR PRINCIPLES</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0B1F3A] tracking-tight mb-4">
            {heading}
          </h2>

          <p className="text-base sm:text-lg text-[#0B1F3A]/70 max-w-2xl font-normal leading-relaxed">
            {description}
          </p>
        </div>

        {/* Editorial Feature List / Grid with GSAP 3D Floating Scroll Effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={item.id}
              className="gsap-why-card card-warm card-warm-hover rounded-2xl p-7 bg-[#FFFDF7] flex flex-col justify-between shadow-xs hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-white border border-[#0B1F3A]/8 shadow-2xs">
                    {getIcon(item.iconName)}
                  </div>
                  <span className="font-heading font-extrabold text-sm text-[#F97316]">
                    {item.number || `0${index + 1}`}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-[#0B1F3A] mb-2.5">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#0B1F3A]/70 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#0B1F3A]/6 flex items-center justify-between text-[11px] text-[#0B1F3A]/50 font-medium">
                <span>Disciplined Engineering</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
