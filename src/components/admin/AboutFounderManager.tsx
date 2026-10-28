import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import {
  User,
  Target,
  Sparkles,
  Save,
  ShieldCheck,
  GraduationCap,
  Building2,
  Image as ImageIcon,
  CheckCircle2,
  ExternalLink,
  Award,
} from 'lucide-react';

export const AboutFounderManager: React.FC = () => {
  const { siteContent, updateSiteContent } = useCms();

  const [formData, setFormData] = useState({
    aboutHeading: siteContent.aboutHeading || 'Technology With Purpose.',
    aboutDescription:
      siteContent.aboutDescription ||
      'Anivex Solution helps businesses transform ideas into reliable digital products and intelligent technology solutions.',
    aboutStory:
      siteContent.aboutStory ||
      'Founded with a mission to deliver world-class digital craftsmanship for Indian and global enterprises, Anivex Solution blends disciplined engineering with intuitive human-centric design. We eliminate technical bloat to create resilient, scalable digital engines.',
    mission:
      siteContent.mission ||
      'To engineer scalable, resilient, and human-centric software solutions that empower Indian businesses, startups, and institutions to excel in the digital economy.',
    vision:
      siteContent.vision ||
      "To be recognized as India's premier high-trust technology engineering firm, synonymous with disciplined delivery, architectural elegance, and tangible business results.",
    founderName: siteContent.founderName || 'Krishndas Chauhan',
    founderRole: siteContent.founderRole || 'Founder & Lead Architect',
    founderOrganization: siteContent.founderOrganization || 'Anivex Solution',
    founderAge: siteContent.founderAge || '21',
    founderQualifications: siteContent.founderQualifications || 'MCA',
    founderDescription:
      siteContent.founderDescription ||
      'Krishndas Chauhan is the Founder and Lead Architect of Anivex Solution, holding MCA from Mangalayatan University and BCA from APCS College of IT & Management, architecting scalable enterprise systems and modern digital platforms.',
    founderBio:
      siteContent.founderBio ||
      'Krishndas Chauhan is the Founder and Lead Architect of Anivex Solution.\n\nHe holds a Master of Computer Applications (MCA) from Mangalayatan University and a Bachelor of Computer Applications (BCA), both from APCS College of IT & Management.\n\nHis educational background in computer applications provides a strong academic foundation for his professional journey in technology and his role at Anivex Solution.',
    founderImage:
      siteContent.founderImage ||
      '/assets/aistudio/WhatsApp_Image_2026-10-28_at_21.25.39_44e4583f.jpeg',
    founderSecondaryImage:
      siteContent.founderSecondaryImage ||
      '/assets/aistudio/WhatsApp_Image_2026-10-28_at_21.20.42_2bf6c621.jpeg',
    founderEducationDegree1:
      siteContent.founderEducationDegree1 || 'Master of Computer Applications (MCA)',
    founderEducationCollege1:
      siteContent.founderEducationCollege1 || 'Mangalayatan University',
    founderEducationDegree2:
      siteContent.founderEducationDegree2 || 'Bachelor of Computer Applications (BCA)',
    founderEducationCollege2:
      siteContent.founderEducationCollege2 || 'APCS College of IT & Management',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSaving) return;

    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await updateSiteContent(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      console.error('Failed to update founder details:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header Bar */}
      <div className="p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-[11px] font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
            FOUNDER & COMPANY CMS
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-[#0B1F3A]">
            Founder Profile & About Content
          </h2>
          <p className="text-xs sm:text-sm text-[#0B1F3A]/70 mt-1 font-normal">
            Manage Krishndas Chauhan&apos;s founder profile, educational qualifications, photos, and public company statements.
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleSubmit()}
          disabled={isSaving}
          className="px-6 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xs hover:shadow transition-all cursor-pointer shrink-0 disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : saveSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Saved Successfully!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save All Changes</span>
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Founder Krishndas Chauhan Spotlight Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#0B1F3A]/10 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#0B1F3A]/8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 text-[#F97316] flex items-center justify-center font-bold">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#F97316] uppercase tracking-wider">LEADERSHIP SPOTLIGHT</span>
                <h3 className="font-heading font-bold text-lg text-[#0B1F3A]">Founder Identity & Role</h3>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#15803D]/10 text-[#15803D] text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Active Architect
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
                Founder Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.founderName}
                onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                placeholder="Krishndas Chauhan"
                className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-xl px-4 py-2.5 text-sm text-[#0B1F3A] font-semibold focus:border-[#F97316] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
                Designation / Role *
              </label>
              <input
                type="text"
                required
                value={formData.founderRole}
                onChange={(e) => setFormData({ ...formData, founderRole: e.target.value })}
                placeholder="Founder & Lead Architect"
                className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-xl px-4 py-2.5 text-sm text-[#0B1F3A] focus:border-[#F97316] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
                Organization *
              </label>
              <input
                type="text"
                required
                value={formData.founderOrganization}
                onChange={(e) => setFormData({ ...formData, founderOrganization: e.target.value })}
                placeholder="Anivex Solution"
                className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-xl px-4 py-2.5 text-sm text-[#0B1F3A] focus:border-[#F97316] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
                Age
              </label>
              <input
                type="text"
                value={formData.founderAge}
                onChange={(e) => setFormData({ ...formData, founderAge: e.target.value })}
                placeholder="21"
                className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-xl px-4 py-2.5 text-sm text-[#0B1F3A] focus:border-[#F97316] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
                Academic Qualifications Summary
              </label>
              <input
                type="text"
                value={formData.founderQualifications}
                onChange={(e) => setFormData({ ...formData, founderQualifications: e.target.value })}
                placeholder="MCA (Mangalayatan University)"
                className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-xl px-4 py-2.5 text-sm text-[#0B1F3A] focus:border-[#F97316] focus:outline-none"
              />
            </div>
          </div>

          {/* Education Details Grid */}
          <div className="p-5 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/8 space-y-4">
            <h4 className="font-heading font-bold text-sm text-[#0B1F3A] flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#15803D]" />
              <span>Education & Qualifications Breakdown</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3 p-4 rounded-xl bg-white border border-[#0B1F3A]/8">
                <span className="text-[11px] font-bold text-[#15803D] uppercase tracking-wider">
                  Post-Graduation Degree
                </span>
                <div>
                  <label className="block text-[11px] font-medium text-[#0B1F3A]/70 mb-1">Degree Title</label>
                  <input
                    type="text"
                    value={formData.founderEducationDegree1}
                    onChange={(e) => setFormData({ ...formData, founderEducationDegree1: e.target.value })}
                    placeholder="Master of Computer Applications (MCA)"
                    className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs text-[#0B1F3A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#0B1F3A]/70 mb-1">University / Institute</label>
                  <input
                    type="text"
                    value={formData.founderEducationCollege1}
                    onChange={(e) => setFormData({ ...formData, founderEducationCollege1: e.target.value })}
                    placeholder="Mangalayatan University"
                    className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs text-[#0B1F3A]"
                  />
                </div>
              </div>

              <div className="space-y-3 p-4 rounded-xl bg-white border border-[#0B1F3A]/8">
                <span className="text-[11px] font-bold text-[#0B1F3A] uppercase tracking-wider">
                  Undergraduate Degree
                </span>
                <div>
                  <label className="block text-[11px] font-medium text-[#0B1F3A]/70 mb-1">Degree Title</label>
                  <input
                    type="text"
                    value={formData.founderEducationDegree2}
                    onChange={(e) => setFormData({ ...formData, founderEducationDegree2: e.target.value })}
                    placeholder="Bachelor of Computer Applications (BCA)"
                    className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs text-[#0B1F3A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#0B1F3A]/70 mb-1">College / Institute</label>
                  <input
                    type="text"
                    value={formData.founderEducationCollege2}
                    onChange={(e) => setFormData({ ...formData, founderEducationCollege2: e.target.value })}
                    placeholder="APCS College of IT & Management"
                    className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs text-[#0B1F3A]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Founder Photos Manager */}
          <div className="p-5 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/8 space-y-4">
            <h4 className="font-heading font-bold text-sm text-[#0B1F3A] flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#F97316]" />
              <span>Founder Photographs (Dual Showcase)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Photo 1: Formal */}
              <div className="p-4 rounded-xl bg-white border border-[#0B1F3A]/8 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-18 rounded-lg overflow-hidden bg-[#0B1F3A] border shrink-0">
                    <img
                      src={formData.founderImage}
                      alt="Formal portrait"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0B1F3A] block">Photo 1 (Formal Suit)</span>
                    <span className="text-[11px] text-[#0B1F3A]/60">Executive portrait with blazer</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#0B1F3A]/70 mb-1">Image URL / Path</label>
                  <input
                    type="text"
                    value={formData.founderImage}
                    onChange={(e) => setFormData({ ...formData, founderImage: e.target.value })}
                    className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs text-[#0B1F3A]"
                  />
                </div>
              </div>

              {/* Photo 2: Creative / Outdoor */}
              <div className="p-4 rounded-xl bg-white border border-[#0B1F3A]/8 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-18 rounded-lg overflow-hidden bg-[#0B1F3A] border shrink-0">
                    <img
                      src={formData.founderSecondaryImage}
                      alt="Casual portrait"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0B1F3A] block">Photo 2 (Field & Tech Vision)</span>
                    <span className="text-[11px] text-[#0B1F3A]/60">Linen shirt with headphones</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#0B1F3A]/70 mb-1">Image URL / Path</label>
                  <input
                    type="text"
                    value={formData.founderSecondaryImage}
                    onChange={(e) => setFormData({ ...formData, founderSecondaryImage: e.target.value })}
                    className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs text-[#0B1F3A]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Descriptions */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
                Card Short Description (Shown on Homepage Spotlight) *
              </label>
              <textarea
                required
                rows={3}
                value={formData.founderDescription}
                onChange={(e) => setFormData({ ...formData, founderDescription: e.target.value })}
                className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#0B1F3A] focus:border-[#F97316] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
                Full Modal Biography (Detailed Profile in &ldquo;More About Founder&rdquo;) *
              </label>
              <textarea
                required
                rows={4}
                value={formData.founderBio}
                onChange={(e) => setFormData({ ...formData, founderBio: e.target.value })}
                className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#0B1F3A] focus:border-[#F97316] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Company Overview & Mission Statements */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#0B1F3A]/10 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#0B1F3A]/8">
            <div className="w-10 h-10 rounded-xl bg-[#0B1F3A]/5 text-[#0B1F3A] flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#0B1F3A]/60 uppercase tracking-wider">PUBLIC NARRATIVE</span>
              <h3 className="font-heading font-bold text-lg text-[#0B1F3A]">Company Story, Mission & Vision</h3>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
              Section Main Heading
            </label>
            <input
              type="text"
              required
              value={formData.aboutHeading}
              onChange={(e) => setFormData({ ...formData, aboutHeading: e.target.value })}
              className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-xl px-4 py-2.5 text-sm text-[#0B1F3A]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
              Short Overview Statement
            </label>
            <textarea
              required
              rows={2}
              value={formData.aboutDescription}
              onChange={(e) => setFormData({ ...formData, aboutDescription: e.target.value })}
              className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#0B1F3A]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
              Detailed Company Story / Philosophy
            </label>
            <textarea
              rows={3}
              value={formData.aboutStory}
              onChange={(e) => setFormData({ ...formData, aboutStory: e.target.value })}
              className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#0B1F3A]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
            <div>
              <label className="block text-xs font-bold text-[#15803D] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>Mission Statement</span>
              </label>
              <textarea
                rows={3}
                value={formData.mission}
                onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-xl px-4 py-2.5 text-xs text-[#0B1F3A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#F97316] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Vision Statement</span>
              </label>
              <textarea
                rows={3}
                value={formData.vision}
                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-xl px-4 py-2.5 text-xs text-[#0B1F3A]"
              />
            </div>
          </div>
        </div>

        {/* Footer Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xs hover:shadow transition-all cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Profile Changes</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
