import React from 'react';
import { Target, Compass, ShieldCheck } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { AboutStudioVisual } from './TechVisualMockups';

export const About: React.FC = () => {
  const { siteContent } = useCms();

  const aboutHeading = siteContent.aboutHeading || "Technology With Purpose.";
  const aboutDescription = siteContent.aboutDescription || "Anivex Solution helps businesses transform ideas into reliable digital products and intelligent technology solutions.";
  const companyStory = siteContent.aboutStory || "Founded with a mission to deliver world-class digital craftsmanship for Indian and global enterprises, Anivex Solution blends disciplined engineering with intuitive human-centric design. We eliminate technical bloat to create resilient, scalable digital engines.";
  const mission = siteContent.mission || "To engineer scalable, resilient, and human-centric software solutions that empower Indian businesses, startups, and institutions to excel in the digital economy.";
  const vision = siteContent.vision || "To be recognized as India's premier high-trust technology engineering firm, synonymous with disciplined delivery, architectural elegance, and tangible business results.";
  const founderName = siteContent.founderName || "Krishndas Chauhan";
  const founderRole = siteContent.founderRole || "Founder & Lead Architect";
  const founderDesc = siteContent.founderDescription || "Krishndas Chauhan is the Founder of Anivex Solution, dedicated to architecting high-performance digital products, enterprise systems, and scalable technology for forward-looking enterprises.";
  const companyImg = siteContent.companyImage || "/images/about_indian_tech_office_1790750532643.jpg";

  const values = siteContent.values || [
    { title: "Business First", description: "Every line of code must create real operational efficiency or revenue growth." },
    { title: "Architectural Rigor", description: "We build on modern, maintainable stacks that scale effortlessly." },
    { title: "Radical Transparency", description: "Direct communication, realistic timelines, and zero deceptive practices." },
    { title: "Indian Innovation", description: "World-class engineering standards with deep empathy for Indian business operations." }
  ];

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="about"
      className="py-24 bg-[#FFFDF7] relative border-t border-[#0B1F3A]/8 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#15803D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-5 w-80 h-80 bg-[#F97316]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-xs font-semibold text-[#0B1F3A] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
            <span className="uppercase tracking-wider text-[11px] font-bold">ABOUT ANIVEX SOLUTION</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0B1F3A] tracking-tight mb-4">
            {aboutHeading}
          </h2>

          <p className="text-base sm:text-lg text-[#0B1F3A]/70 max-w-2xl font-normal leading-relaxed">
            {aboutDescription}
          </p>
        </div>

        {/* Company Story & Office Visual Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Left: High-Impact Visual */}
          <div className="lg:col-span-6 relative">
            <AboutStudioVisual />
            {/* Subtle decorative line */}
            <div className="absolute -bottom-2 left-6 right-6 h-1 rounded-full saffron-green-accent opacity-75" />
          </div>

          {/* Right: Story Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h3 className="font-heading font-bold text-2xl text-[#0B1F3A] mb-4">
              Building for India's Future
            </h3>
            <p className="text-sm sm:text-base text-[#0B1F3A]/80 leading-relaxed mb-6 font-normal">
              {companyStory}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-[#0B1F3A]/8">
                <div className="flex items-center gap-2 mb-1.5">
                  <Target className="w-4 h-4 text-[#F97316]" />
                  <h4 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">Mission</h4>
                </div>
                <p className="text-xs text-[#0B1F3A]/75 leading-relaxed">
                  {mission}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#0B1F3A]/8">
                <div className="flex items-center gap-2 mb-1.5">
                  <Compass className="w-4 h-4 text-[#15803D]" />
                  <h4 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">Vision</h4>
                </div>
                <p className="text-xs text-[#0B1F3A]/75 leading-relaxed">
                  {vision}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Values Grid */}
        <div className="mb-16">
          <h3 className="font-heading font-bold text-xl text-[#0B1F3A] text-center mb-8">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="card-warm rounded-xl p-5 bg-white shadow-xs hover:shadow-md transition-all">
                <div className="w-8 h-8 rounded-lg bg-[#0B1F3A]/5 flex items-center justify-center text-[#F97316] font-bold text-xs mb-3">
                  0{i + 1}
                </div>
                <h4 className="font-heading font-bold text-base text-[#0B1F3A] mb-1.5">
                  {v.title}
                </h4>
                <p className="text-xs text-[#0B1F3A]/70 leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Founder Spotlight Card */}
        <div className="p-7 sm:p-9 rounded-2xl bg-white border border-[#0B1F3A]/10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-16 h-16 rounded-xl bg-[#0B1F3A] text-[#D4A72C] font-heading font-extrabold text-xl flex items-center justify-center shrink-0 shadow-xs">
              KC
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#F97316] uppercase tracking-wider mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{founderRole}</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0B1F3A]">
                {founderName}
              </h3>
              <p className="text-xs sm:text-sm text-[#0B1F3A]/70 leading-relaxed max-w-2xl mt-1">
                {founderDesc}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleScrollToContact}
            className="px-5 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold whitespace-nowrap transition-colors shadow-xs"
          >
            Start a Conversation →
          </button>
        </div>

      </div>
    </section>
  );
};
