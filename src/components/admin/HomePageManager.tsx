import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Home, Save, Eye, Sparkles, ArrowRight } from 'lucide-react';

export const HomePageManager: React.FC = () => {
  const { siteContent, updateSiteContent } = useCms();

  const [formData, setFormData] = useState({
    heroSubtitle: siteContent.heroSubtitle || 'NEXT-GENERATION TECHNOLOGY COMPANY',
    heroHeading: siteContent.heroHeading || 'We Build Technology That Moves Businesses Forward.',
    heroDescription:
      siteContent.heroDescription ||
      'ANIVEX Solutions builds modern software, AI-powered systems, web applications, mobile apps, and scalable digital solutions tailored for forward-thinking enterprises.',
    primaryButtonText: siteContent.primaryButtonText || 'Start a Project',
    secondaryButtonText: siteContent.secondaryButtonText || 'Explore Our Solutions',
    ctaHeading: siteContent.ctaHeading || "Have an Idea? Let's Build It.",
    ctaSubtitle:
      siteContent.ctaSubtitle ||
      "Tell us what you're trying to build. We'll help turn the idea into a practical, scalable digital solution.",
    primaryCtaText: siteContent.primaryCtaText || 'Start a Project',
    secondaryCtaText: siteContent.secondaryCtaText || 'Talk to ANIVEX',
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
            HOME PAGE CONTENT MANAGER
          </div>
          <h2 className="font-display font-bold text-xl text-white">Hero Banner & CTA Section Copy</h2>
          <p className="text-xs text-slate-400 mt-1">
            Customize main headline, subheadings, and action button labels on the home page.
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
        {/* Main Hero Section */}
        <div className="p-8 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <div className="p-3 rounded-2xl bg-[#121824] border border-[#D6A84F]/30 text-[#F5C85B]">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#F5C85B] uppercase tracking-wider">HERO SECTION</span>
              <h3 className="font-display font-bold text-xl text-white">Main Banner Heading & Copy</h3>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Top Eyebrow Badge Text</label>
            <input
              type="text"
              required
              value={formData.heroSubtitle}
              onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
              className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Main Hero Title *</label>
            <input
              type="text"
              required
              value={formData.heroHeading}
              onChange={(e) => setFormData({ ...formData, heroHeading: e.target.value })}
              className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Hero Description *</label>
            <textarea
              required
              rows={3}
              value={formData.heroDescription}
              onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
              className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 resize-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Primary Button Text</label>
              <input
                type="text"
                required
                value={formData.primaryButtonText}
                onChange={(e) => setFormData({ ...formData, primaryButtonText: e.target.value })}
                className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Secondary Button Text</label>
              <input
                type="text"
                required
                value={formData.secondaryButtonText}
                onChange={(e) => setFormData({ ...formData, secondaryButtonText: e.target.value })}
                className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* CTA Banner Section */}
        <div className="p-8 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <div className="p-3 rounded-2xl bg-[#121824] border border-[#D6A84F]/30 text-[#F5C85B]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">CTA BANNER</span>
              <h3 className="font-display font-bold text-xl text-white">Call To Action Copy</h3>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-2">CTA Heading *</label>
            <input
              type="text"
              required
              value={formData.ctaHeading}
              onChange={(e) => setFormData({ ...formData, ctaHeading: e.target.value })}
              className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-2">CTA Subtitle / Paragraph</label>
            <textarea
              required
              rows={2}
              value={formData.ctaSubtitle}
              onChange={(e) => setFormData({ ...formData, ctaSubtitle: e.target.value })}
              className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Primary CTA Button</label>
              <input
                type="text"
                required
                value={formData.primaryCtaText}
                onChange={(e) => setFormData({ ...formData, primaryCtaText: e.target.value })}
                className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Secondary CTA Button</label>
              <input
                type="text"
                required
                value={formData.secondaryCtaText}
                onChange={(e) => setFormData({ ...formData, secondaryCtaText: e.target.value })}
                className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl hover:shadow-[0_0_25px_rgba(245,200,91,0.4)] transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Updating...' : 'Save Home Page Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
