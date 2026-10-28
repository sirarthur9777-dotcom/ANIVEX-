import React, { useEffect, useState } from 'react';
import { X, GraduationCap, Building2, User, Award, ShieldCheck, MessageCircle, ArrowRight, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { formatWhatsAppUrl } from '../services/websiteSettings';

interface FounderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FounderModal: React.FC<FounderModalProps> = ({ isOpen, onClose }) => {
  const { siteContent, companyInfo, websiteSettings } = useCms();
  const [activePhoto, setActivePhoto] = useState<0 | 1>(0);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const founderName = siteContent.founderName || "Krishndas Chauhan";
  const founderRole = siteContent.founderRole || "Founder & Lead Architect";
  const founderOrg = siteContent.founderOrganization || "Anivex Solution";
  const founderAge = siteContent.founderAge || "21";
  const founderQualifications = siteContent.founderQualifications || "MCA";

  const photoFormal = siteContent.founderImage || "/assets/aistudio/WhatsApp_Image_2026-10-28_at_21.25.39_44e4583f.jpeg";
  const photoCasual = siteContent.founderSecondaryImage || "/assets/aistudio/WhatsApp_Image_2026-10-28_at_21.20.42_2bf6c621.jpeg";

  const photos = [
    {
      src: photoFormal,
      label: 'Executive & Architecture',
      tag: 'Formal Studio Portrait',
      alt: 'Krishndas Chauhan - Founder & Lead Architect in formal blazer'
    },
    {
      src: photoCasual,
      label: 'Creative & Tech Vision',
      tag: 'Field & Innovation Portrait',
      alt: 'Krishndas Chauhan - Outdoor portrait with headphones'
    }
  ];

  const phone = websiteSettings?.whatsapp || websiteSettings?.phone || companyInfo?.phone || '+91 9119069399';
  const whatsappUrl = formatWhatsAppUrl(
    phone,
    `Hello Krishndas Sir, I reviewed your profile on Anivex Solution and would like to connect directly regarding an engineering / technology project.`
  );

  const handleDiscussProject = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B1F3A]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="founder-modal-title"
        className="relative bg-[#FFFDF7] w-full max-w-4xl rounded-2xl sm:rounded-3xl border border-[#0B1F3A]/10 shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto"
      >
        {/* Top Header Bar */}
        <div className="px-5 sm:px-8 py-4 sm:py-5 bg-white border-b border-[#0B1F3A]/8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
            <span id="founder-modal-title" className="text-xs sm:text-sm font-heading font-extrabold uppercase tracking-widest text-[#0B1F3A]">
              Meet Our Founder
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#0B1F3A]/5 hover:bg-[#0B1F3A]/10 text-[#0B1F3A]/70 hover:text-[#0B1F3A] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close founder profile"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-8">
          
          {/* Hero Banner Grid: Photos + Core Bio */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Left Column: Photo Showcase */}
            <div className="md:col-span-5 flex flex-col gap-3">
              {/* Main Featured Photo Frame */}
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#0B1F3A] border-2 border-[#0B1F3A]/10 shadow-md group">
                <img
                  src={photos[activePhoto].src}
                  alt={photos[activePhoto].alt}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />

                {/* Gradient vignette at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/40 to-transparent flex flex-col justify-end p-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4A72C]">
                    {photos[activePhoto].tag}
                  </span>
                  <span className="text-xs font-semibold text-white">
                    {photos[activePhoto].label}
                  </span>
                </div>

                {/* Verified badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#0B1F3A]/85 backdrop-blur-md text-[10px] font-bold text-white flex items-center gap-1 border border-white/20">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" />
                  <span>Verified Founder</span>
                </div>
              </div>

              {/* Dual Photo Selector Thumbnails */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {photos.map((photo, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePhoto(idx as 0 | 1)}
                    className={`relative p-1.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      activePhoto === idx
                        ? 'border-[#F97316] bg-[#F97316]/5 ring-2 ring-[#F97316]/20'
                        : 'border-[#0B1F3A]/10 bg-white hover:border-[#0B1F3A]/30'
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-10 h-10 rounded-lg object-cover object-top shrink-0"
                    />
                    <div className="min-w-0 pr-1">
                      <div className="text-[11px] font-bold text-[#0B1F3A] truncate">
                        Photo {idx + 1}
                      </div>
                      <div className="text-[10px] text-[#0B1F3A]/60 truncate">
                        {idx === 0 ? 'Formal Suit' : 'Creative Vision'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Founder Info & Overview */}
            <div className="md:col-span-7 flex flex-col justify-start space-y-5">
              
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-[11px] font-bold tracking-wider uppercase mb-2">
                  <Sparkles className="w-3 h-3" />
                  <span>Lead Architect & Visionary</span>
                </div>

                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B1F3A] tracking-tight">
                  {founderName}
                </h2>

                <p className="text-sm sm:text-base font-semibold text-[#0B1F3A]/85 mt-1 flex items-center gap-2">
                  <span>{founderRole}</span>
                  <span className="text-[#0B1F3A]/30">•</span>
                  <span className="text-[#F97316] font-bold">{founderOrg}</span>
                </p>
              </div>

              {/* About the Founder Paragraph */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#0B1F3A]/8 shadow-xs space-y-3">
                <h3 className="font-heading font-bold text-sm text-[#0B1F3A] flex items-center gap-2">
                  <User className="w-4 h-4 text-[#F97316]" />
                  <span>About the Founder</span>
                </h3>

                <p className="text-xs sm:text-sm text-[#0B1F3A]/80 leading-relaxed font-normal">
                  <strong className="text-[#0B1F3A] font-semibold">{founderName}</strong> is the Founder and Lead Architect of{' '}
                  <strong className="text-[#0B1F3A] font-semibold">{founderOrg}</strong>.
                </p>

                <p className="text-xs sm:text-sm text-[#0B1F3A]/80 leading-relaxed font-normal">
                  He holds a <strong className="text-[#0B1F3A] font-semibold">Master of Computer Applications (MCA)</strong> from{' '}
                  <strong className="text-[#0B1F3A] font-semibold">Mangalayatan University</strong> and a{' '}
                  <strong className="text-[#0B1F3A] font-semibold">Bachelor of Computer Applications (BCA)</strong>, both from{' '}
                  <strong className="text-[#0B1F3A] font-semibold">APCS College of IT & Management</strong>.
                </p>

                <p className="text-xs sm:text-sm text-[#0B1F3A]/80 leading-relaxed font-normal">
                  His educational background in computer applications provides a strong academic foundation for his professional journey in technology and his role at Anivex Solution.
                </p>
              </div>

              {/* Education & Qualifications */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#0B1F3A]/8 shadow-xs space-y-3">
                <h3 className="font-heading font-bold text-sm text-[#0B1F3A] flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#15803D]" />
                  <span>Education & Qualifications</span>
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/6">
                    <div className="w-8 h-8 rounded-lg bg-[#15803D]/10 text-[#15803D] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                      MCA
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0B1F3A]">
                        Master of Computer Applications (MCA)
                      </h4>
                      <p className="text-xs text-[#0B1F3A]/70 font-medium">
                        Mangalayatan University
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/6">
                    <div className="w-8 h-8 rounded-lg bg-[#0B1F3A]/5 text-[#0B1F3A] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                      BCA
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0B1F3A]">
                        Bachelor of Computer Applications (BCA)
                      </h4>
                      <p className="text-xs text-[#0B1F3A]/70 font-medium">
                        APCS College of IT & Management
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Professional Identity Grid / Specs Table */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#0B1F3A]/8 pb-3">
              <h3 className="font-heading font-bold text-base text-[#0B1F3A] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#F97316]" />
                <span>Professional Identity</span>
              </h3>
              <span className="text-[11px] font-semibold text-[#15803D] bg-[#15803D]/10 px-2.5 py-0.5 rounded-full">
                Active Leadership
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="p-3 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/6">
                <span className="text-[10px] font-bold text-[#0B1F3A]/60 uppercase tracking-wider block mb-0.5">
                  Name
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#0B1F3A]">
                  {founderName}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/6">
                <span className="text-[10px] font-bold text-[#0B1F3A]/60 uppercase tracking-wider block mb-0.5">
                  Age
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#0B1F3A]">
                  {founderAge} Years
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/6">
                <span className="text-[10px] font-bold text-[#0B1F3A]/60 uppercase tracking-wider block mb-0.5">
                  Designation
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#0B1F3A]">
                  {founderRole}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/6">
                <span className="text-[10px] font-bold text-[#0B1F3A]/60 uppercase tracking-wider block mb-0.5">
                  Organization
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#0B1F3A]">
                  {founderOrg}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/6 sm:col-span-2 lg:col-span-1">
                <span className="text-[10px] font-bold text-[#0B1F3A]/60 uppercase tracking-wider block mb-0.5">
                  Academic Qualifications
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#15803D]">
                  {founderQualifications}
                </span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <p className="text-xs text-[#0B1F3A]/60 text-center sm:text-left">
              Direct consultation & architecture review for Indian businesses & global startups.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Founder</span>
              </a>

              <button
                type="button"
                onClick={handleDiscussProject}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#122A4E] text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>Discuss a Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
