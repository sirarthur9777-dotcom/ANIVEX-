import React from 'react';
import { Code2, ShieldCheck, Award, HeartHandshake } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { useGsapSection } from '../lib/gsapScrollAnimations';

export const TrustStrip: React.FC = () => {
  const { siteContent } = useCms();
  const sectionRef = useGsapSection<HTMLElement>({
    cardsSelector: '.gsap-trust-card',
    cardStagger: 0.1,
    cardYOffset: 35,
    rotate3DX: 4,
    enableParallax: false,
  });

  const trustStats = siteContent.trustStats && siteContent.trustStats.length > 0
    ? siteContent.trustStats.filter((t) => t.enabled !== false).sort((a, b) => a.order - b.order)
    : [
        {
          id: 'trust-1',
          title: 'Custom Engineering',
          label: 'Direct Delivery',
          description: 'No bloated templates or cookie-cutter solutions',
          iconName: 'Code2',
        },
        {
          id: 'trust-2',
          title: '100% Code Transfer',
          label: 'Intellectual Property',
          description: 'Full repository & deployment ownership handed to you',
          iconName: 'ShieldCheck',
        },
        {
          id: 'trust-3',
          title: 'GST Compliant',
          label: 'Indian Entity',
          description: 'Official tax invoices, contracts & formal agreements',
          iconName: 'Award',
        },
        {
          id: 'trust-4',
          title: 'Dedicated Support',
          label: 'Studio Model',
          description: 'Direct communication with lead engineers & founder',
          iconName: 'HeartHandshake',
        },
      ];

  const getIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'hearthandshake':
      case 'heart':
        return <HeartHandshake className="w-5 h-5 text-[#F97316]" />;
      case 'shieldcheck':
      case 'shield':
        return <ShieldCheck className="w-5 h-5 text-[#15803D]" />;
      case 'award':
        return <Award className="w-5 h-5 text-[#D4A72C]" />;
      case 'code2':
      case 'code':
      default:
        return <Code2 className="w-5 h-5 text-[#0B1F3A]" />;
    }
  };

  return (
    <section
      id="trust-strip"
      ref={sectionRef}
      className="relative z-20 py-8 bg-white border-y border-[#0B1F3A]/8"
      style={{ perspective: '1000px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustStats.map((item) => (
            <div
              key={item.id}
              className="gsap-trust-card flex items-start gap-4 p-4 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/6 hover:border-[#F97316]/30 transition-all card-warm-hover"
            >
              <div className="p-2.5 rounded-lg bg-white border border-[#0B1F3A]/8 shadow-xs shrink-0">
                {getIcon(item.iconName)}
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-[#F97316] uppercase tracking-wider block">
                  {item.label}
                </span>
                <h4 className="text-base font-extrabold text-[#0B1F3A] tracking-tight mt-0.5">
                  {item.title}
                </h4>
                <p className="text-xs text-[#0B1F3A]/65 mt-1 leading-snug">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
