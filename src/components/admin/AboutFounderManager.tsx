import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Info, User, Target, Eye, Sparkles, Save, ShieldCheck } from 'lucide-react';

export const AboutFounderManager: React.FC = () => {
  const { siteContent, updateSiteContent } = useCms();

  const [formData, setFormData] = useState({
    aboutHeading: siteContent.aboutHeading || 'Technology With Purpose.',
    aboutDescription:
      siteContent.aboutDescription ||
      'ANIVEX Solutions helps businesses transform ideas into reliable digital products and intelligent technology solutions.',
    aboutStory:
      siteContent.aboutStory ||
      'We combine disciplined software engineering, modern human-centered design, and emerging technology stacks to create scalable, high-performance systems.',
    mission:
      siteContent.mission ||
      'To deliver scalable, resilient, and human-centric software engineering that empowers organizations and creators to thrive in a digital-first world.',
    vision:
      siteContent.vision ||
      'To be a leading global technology force known for high craftsmanship, innovative AI solutions, and reliable product execution.',
    founderName: siteContent.founderName || 'Krishndas Chauhan',
    founderRole: siteContent.founderRole || 'Founder',
    founderDescription:
      siteContent.founderDescription ||
      'Krishndas Chauhan is the Founder of ANIVEX Solutions, focused on building modern software products, digital platforms, and technology-driven solutions for businesses.',
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSiteContent(formData);
    setIsSaving(false);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#05070B] border border-[#D6A84F]/30 text-[10px] font-mono text-[#F5C85B] uppercase mb-2">
            COMPANY & FOUNDER PROFILE MANAGEMENT
          </div>
          <h2 className="font-display font-bold text-xl text-white">About Section & Founder CMS</h2>
          <p className="text-xs text-slate-400 mt-1">
            Update the public mission statements, story, and Founder Krishndas Chauhan details.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-[0_0_20px_rgba(245,200,91,0.4)] transition-all cursor-pointer shrink-0 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Founder Krishndas Chauhan Spotlight Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0B0F16] via-[#121824] to-[#0B0F16] border border-[#D6A84F]/40 shadow-2xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <div className="p-3 rounded-2xl bg-[#05070B] border border-[#D6A84F]/30 text-[#F5C85B]">
              <User className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#F5C85B] uppercase tracking-wider">FOUNDER PROFILE</span>
              <h3 className="font-display font-bold text-xl text-white">Founder Information</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Founder Role *</label>
              <input
                type="text"
                required
                value={formData.founderRole}
                onChange={(e) => setFormData({ ...formData, founderRole: e.target.value })}
                placeholder="Founder"
                className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#D6A84F] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Founder Full Name *</label>
              <input
                type="text"
                required
                value={formData.founderName}
                onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                placeholder="Krishndas Chauhan"
                className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-semibold focus:border-[#D6A84F] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
              Founder Professional Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.founderDescription}
              onChange={(e) => setFormData({ ...formData, founderDescription: e.target.value })}
              placeholder="Krishndas Chauhan is the Founder of ANIVEX Solutions, focused on building modern software products, digital platforms, and technology-driven solutions for businesses."
              className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 focus:border-[#D6A84F] focus:outline-none leading-relaxed"
            />
          </div>

          {/* Live Preview Card */}
          <div className="p-6 rounded-2xl bg-[#05070B] border border-white/10 space-y-3">
            <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">
              LIVE WEBSITE PREVIEW CARD
            </div>
            <div className="flex items-start gap-4 pt-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D6A84F] to-[#F5C85B] text-[#05070B] font-extrabold text-base flex items-center justify-center font-mono shrink-0 shadow-lg">
                KC
              </div>
              <div className="space-y-1">
                <div className="text-xs font-mono text-[#F5C85B] uppercase font-bold tracking-wider">
                  {formData.founderRole}
                </div>
                <h4 className="font-display font-bold text-lg text-white">
                  {formData.founderName}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {formData.founderDescription}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Company Overview & Mission Statements */}
        <div className="p-8 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <div className="p-3 rounded-2xl bg-[#121824] border border-[#D6A84F]/30 text-[#F5C85B]">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">COMPANY COPY</span>
              <h3 className="font-display font-bold text-xl text-white">About Section Details</h3>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Section Main Heading</label>
            <input
              type="text"
              required
              value={formData.aboutHeading}
              onChange={(e) => setFormData({ ...formData, aboutHeading: e.target.value })}
              className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Short Overview Statement</label>
            <textarea
              required
              rows={3}
              value={formData.aboutDescription}
              onChange={(e) => setFormData({ ...formData, aboutDescription: e.target.value })}
              className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Detailed Company Story / Engineering Philosophy</label>
            <textarea
              rows={3}
              value={formData.aboutStory}
              onChange={(e) => setFormData({ ...formData, aboutStory: e.target.value })}
              className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <label className="block text-xs font-mono text-[#F5C85B] uppercase mb-2 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>Mission Statement</span>
              </label>
              <textarea
                rows={3}
                value={formData.mission}
                onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#F5C85B] uppercase mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Vision Statement</span>
              </label>
              <textarea
                rows={3}
                value={formData.vision}
                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Form Footer Save Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl hover:shadow-[0_0_25px_rgba(245,200,91,0.4)] transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Updating...' : 'Save All Changes'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
