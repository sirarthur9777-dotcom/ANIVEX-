import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import {
  Home,
  Save,
  Navigation,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Eye,
  EyeOff,
  Image as ImageIcon
} from 'lucide-react';
import { TrustStatItem, WhyAnivexFeature, NavbarItem } from '../../types/cms';

export const HomePageManager: React.FC = () => {
  const { siteContent, updateSiteContent } = useCms();

  const [activeSubTab, setActiveSubTab] = useState<'hero' | 'navbar' | 'trust' | 'why' | 'cta'>('hero');
  const [isSaving, setIsSaving] = useState(false);

  // Hero form state
  const [heroData, setHeroData] = useState({
    heroBadge: siteContent.heroBadge || 'MODERN INDIAN TECHNOLOGY',
    heroHeading: siteContent.heroHeading || "Technology Built for India's Next Generation of Businesses.",
    heroDescription: siteContent.heroDescription || "Anivex Solution builds modern websites, enterprise software, ERP systems, mobile applications and intelligent digital solutions for growing businesses.",
    primaryButtonText: siteContent.primaryButtonText || 'Start Your Project →',
    primaryButtonLink: siteContent.primaryButtonLink || '#contact',
    secondaryButtonText: siteContent.secondaryButtonText || 'Explore Solutions',
    secondaryButtonLink: siteContent.secondaryButtonLink || '#services',
    heroImage: siteContent.heroImage || '/images/hero_indian_tech_business_1790750492543.jpg',
    heroVisible: siteContent.heroVisible !== false,
  });

  // Navbar state
  const [navbarData, setNavbarData] = useState({
    brandName: siteContent.navbar?.brandName || 'Anivex Solution',
    ctaText: siteContent.navbar?.ctaText || 'Start a Project →',
    ctaLink: siteContent.navbar?.ctaLink || '#contact',
    items: siteContent.navbar?.items || [
      { id: 'nav-home', label: 'Home', href: '#hero', visible: true, order: 1 },
      { id: 'nav-about', label: 'About', href: '#about', visible: true, order: 2 },
      { id: 'nav-services', label: 'Services', href: '#services', visible: true, order: 3 },
      { id: 'nav-products', label: 'Products', href: '#products', visible: true, order: 4 },
      { id: 'nav-projects', label: 'Projects', href: '#projects', visible: true, order: 5 },
      { id: 'nav-why', label: 'Why Anivex', href: '#why-anivex', visible: true, order: 6 },
      { id: 'nav-faq', label: 'FAQ', href: '#faq', visible: true, order: 7 },
      { id: 'nav-contact', label: 'Contact', href: '#contact', visible: true, order: 8 },
    ],
  });

  const [newNavItemLabel, setNewNavItemLabel] = useState('');
  const [newNavItemHref, setNewNavItemHref] = useState('');

  // Trust stats state
  const [trustStats, setTrustStats] = useState<TrustStatItem[]>(
    siteContent.trustStats && siteContent.trustStats.length > 0
      ? siteContent.trustStats
      : [
          { id: 't1', title: '50+ Solutions', label: 'Projects Delivered', description: 'Web, mobile & enterprise systems deployed.', iconName: 'Code2', order: 1, enabled: true },
          { id: 't2', title: '6 Core Domains', label: 'Technology Domains', description: 'Web, mobile apps, ERP systems, AI automation & cloud.', iconName: 'Layers', order: 2, enabled: true },
          { id: 't3', title: 'Tailored & Scalable', label: 'Custom Solutions', description: 'Zero generic templates. Engineered for your exact business.', iconName: 'ShieldCheck', order: 3, enabled: true },
          { id: 't4', title: 'Built in India', label: 'Indian Craftsmanship', description: 'GST compliance & 24/7 dedicated support.', iconName: 'Award', order: 4, enabled: true },
        ]
  );

  // Why Anivex state
  const [whySettings, setWhySettings] = useState({
    heading: siteContent.whyAnivex?.heading || 'Why Anivex Solution',
    description: siteContent.whyAnivex?.description || 'We believe technology should serve real business goals — reducing overhead, accelerating growth, and delivering long-term competitive advantage.',
    enabled: siteContent.whyAnivex?.enabled !== false,
    features: siteContent.whyAnivex?.features || [
      { id: 'w1', number: '01', title: 'Business First', description: 'Technology built around actual business requirements.', iconName: 'TrendingUp', order: 1 },
      { id: 'w2', number: '02', title: 'Modern Technology', description: 'Modern development stack and scalable architecture.', iconName: 'Cpu', order: 2 },
      { id: 'w3', number: '03', title: 'Custom Solutions', description: 'No unnecessary one-size-fits-all templates.', iconName: 'Layers', order: 3 },
      { id: 'w4', number: '04', title: 'Long-Term Support', description: 'Solutions designed for future growth.', iconName: 'HeartHandshake', order: 4 },
    ]
  });

  // CTA Section state
  const [ctaData, setCtaData] = useState({
    ctaHeading: siteContent.ctaHeading || "Let's Build Something That Matters.",
    ctaSubtitle: siteContent.ctaSubtitle || "Whether you need a custom software platform, high-converting web application, or enterprise ERP, we are ready to build it with you.",
    primaryCtaText: siteContent.primaryCtaText || "Start a Conversation →",
    secondaryCtaText: siteContent.secondaryCtaText || "Chat on WhatsApp",
  });

  const handleSaveAll = async () => {
    setIsSaving(true);
    await updateSiteContent({
      ...heroData,
      navbar: navbarData,
      trustStats,
      whyAnivex: whySettings,
      ...ctaData,
    });
    setIsSaving(false);
  };

  // Nav actions
  const handleAddNavItem = () => {
    if (newNavItemLabel.trim()) {
      const newItem: NavbarItem = {
        id: `nav-${Date.now()}`,
        label: newNavItemLabel.trim(),
        href: newNavItemHref.trim() || '#',
        visible: true,
        order: navbarData.items.length + 1,
      };
      setNavbarData({
        ...navbarData,
        items: [...navbarData.items, newItem],
      });
      setNewNavItemLabel('');
      setNewNavItemHref('');
    }
  };

  const handleToggleNavVisible = (id: string) => {
    setNavbarData({
      ...navbarData,
      items: navbarData.items.map((it) => (it.id === id ? { ...it, visible: !it.visible } : it)),
    });
  };

  const handleDeleteNavItem = (id: string) => {
    setNavbarData({
      ...navbarData,
      items: navbarData.items.filter((it) => it.id !== id),
    });
  };

  const handleMoveNavItem = (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= navbarData.items.length) return;
    const newItems = [...navbarData.items];
    const temp = newItems[idx];
    newItems[idx] = newItems[targetIdx];
    newItems[targetIdx] = temp;
    setNavbarData({ ...navbarData, items: newItems });
  };

  // Trust Stats actions
  const handleAddTrustStat = () => {
    const newStat: TrustStatItem = {
      id: `trust-${Date.now()}`,
      title: 'New Trust Item',
      label: 'Metric Label',
      description: 'Short qualitative statement',
      iconName: 'ShieldCheck',
      order: trustStats.length + 1,
      enabled: true,
    };
    setTrustStats([...trustStats, newStat]);
  };

  const handleUpdateTrustStat = (id: string, updates: Partial<TrustStatItem>) => {
    setTrustStats(trustStats.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const handleDeleteTrustStat = (id: string) => {
    setTrustStats(trustStats.filter((t) => t.id !== id));
  };

  // Why Anivex actions
  const handleAddWhyFeature = () => {
    const newFeat: WhyAnivexFeature = {
      id: `why-${Date.now()}`,
      number: `0${whySettings.features.length + 1}`,
      title: 'New Pillar',
      description: 'Pillar description explaining client advantage.',
      iconName: 'TrendingUp',
      order: whySettings.features.length + 1,
    };
    setWhySettings({
      ...whySettings,
      features: [...whySettings.features, newFeat],
    });
  };

  const handleUpdateWhyFeature = (id: string, updates: Partial<WhyAnivexFeature>) => {
    setWhySettings({
      ...whySettings,
      features: whySettings.features.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    });
  };

  const handleDeleteWhyFeature = (id: string) => {
    setWhySettings({
      ...whySettings,
      features: whySettings.features.filter((f) => f.id !== id),
    });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Banner Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0B0F16] border border-white/10 shadow-xl">
        <div>
          <h2 className="font-heading font-bold text-xl text-white">Visual Home & Navigation CMS</h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage Navbar links, Hero headline, Trust statements, and Editorial pillars.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="px-6 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm shrink-0 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Publishing...' : 'Publish to Live Site'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveSubTab('hero')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            activeSubTab === 'hero' ? 'bg-[#F97316] text-white' : 'text-slate-400 hover:text-white bg-white/5'
          }`}
        >
          Hero Section
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('navbar')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            activeSubTab === 'navbar' ? 'bg-[#F97316] text-white' : 'text-slate-400 hover:text-white bg-white/5'
          }`}
        >
          Navbar & Logo
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('trust')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            activeSubTab === 'trust' ? 'bg-[#F97316] text-white' : 'text-slate-400 hover:text-white bg-white/5'
          }`}
        >
          Trust & Stats
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('why')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            activeSubTab === 'why' ? 'bg-[#F97316] text-white' : 'text-slate-400 hover:text-white bg-white/5'
          }`}
        >
          Why ANIVEX
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('cta')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            activeSubTab === 'cta' ? 'bg-[#F97316] text-white' : 'text-slate-400 hover:text-white bg-white/5'
          }`}
        >
          CTA Banner
        </button>
      </div>

      {/* Hero Tab */}
      {activeSubTab === 'hero' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0B0F16] border border-white/10 space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h3 className="font-heading font-bold text-lg text-white">Hero Section Controls</h3>
              <p className="text-xs text-slate-400">Headlines, action buttons, image, and visibility.</p>
            </div>
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={heroData.heroVisible}
                onChange={(e) => setHeroData({ ...heroData, heroVisible: e.target.checked })}
                className="rounded text-[#F97316]"
              />
              <span>Section Visible</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Eyebrow Badge Text</label>
            <input
              type="text"
              value={heroData.heroBadge}
              onChange={(e) => setHeroData({ ...heroData, heroBadge: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Main Headline *</label>
            <input
              type="text"
              required
              value={heroData.heroHeading}
              onChange={(e) => setHeroData({ ...heroData, heroHeading: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-sm font-bold text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Supporting Description *</label>
            <textarea
              rows={3}
              required
              value={heroData.heroDescription}
              onChange={(e) => setHeroData({ ...heroData, heroDescription: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Primary Button Text</label>
              <input
                type="text"
                value={heroData.primaryButtonText}
                onChange={(e) => setHeroData({ ...heroData, primaryButtonText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Primary Button Link</label>
              <input
                type="text"
                value={heroData.primaryButtonLink}
                onChange={(e) => setHeroData({ ...heroData, primaryButtonLink: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Secondary Button Text</label>
              <input
                type="text"
                value={heroData.secondaryButtonText}
                onChange={(e) => setHeroData({ ...heroData, secondaryButtonText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Secondary Button Link</label>
              <input
                type="text"
                value={heroData.secondaryButtonLink}
                onChange={(e) => setHeroData({ ...heroData, secondaryButtonLink: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Hero Visual Asset URL</label>
            <input
              type="text"
              value={heroData.heroImage}
              onChange={(e) => setHeroData({ ...heroData, heroImage: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white font-mono"
            />
          </div>
        </div>
      )}

      {/* Navbar Tab */}
      {activeSubTab === 'navbar' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0B0F16] border border-white/10 space-y-6">
          <div className="pb-4 border-b border-white/10">
            <h3 className="font-heading font-bold text-lg text-white">Navbar & Brand Controls</h3>
            <p className="text-xs text-slate-400">Configure logo brand name, CTA button, and navigation menu links.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Brand Name</label>
              <input
                type="text"
                value={navbarData.brandName}
                onChange={(e) => setNavbarData({ ...navbarData, brandName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Navbar CTA Text</label>
              <input
                type="text"
                value={navbarData.ctaText}
                onChange={(e) => setNavbarData({ ...navbarData, ctaText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Navbar CTA Link</label>
              <input
                type="text"
                value={navbarData.ctaLink}
                onChange={(e) => setNavbarData({ ...navbarData, ctaLink: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white"
              />
            </div>
          </div>

          {/* Navigation Items Manager */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              Navigation Menu Items
            </h4>

            <div className="space-y-2 mb-4">
              {navbarData.items.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-black/60 border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500 w-5">{idx + 1}.</span>
                    <div>
                      <span className="text-xs font-bold text-white block">{item.label}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{item.href}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleNavVisible(item.id)}
                      className={`p-1.5 rounded-lg text-xs ${item.visible ? 'text-[#15803D] bg-[#15803D]/10' : 'text-slate-500 bg-white/5'}`}
                      title={item.visible ? 'Visible' : 'Hidden'}
                    >
                      {item.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      disabled={idx === 0}
                      onClick={() => handleMoveNavItem(idx, 'up')}
                      className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={idx === navbarData.items.length - 1}
                      onClick={() => handleMoveNavItem(idx, 'down')}
                      className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteNavItem(item.id)}
                      className="p-1.5 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Nav Item Inline */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
              <input
                type="text"
                placeholder="Label (e.g. Portfolio)"
                value={newNavItemLabel}
                onChange={(e) => setNewNavItemLabel(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg bg-black border border-white/10 text-xs text-white"
              />
              <input
                type="text"
                placeholder="Href (e.g. #projects)"
                value={newNavItemHref}
                onChange={(e) => setNewNavItemHref(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg bg-black border border-white/10 text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddNavItem}
                className="px-4 py-1.5 rounded-lg bg-[#F97316] text-white text-xs font-bold"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trust & Stats Tab */}
      {activeSubTab === 'trust' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0B0F16] border border-white/10 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h3 className="font-heading font-bold text-lg text-white">Trust / Stats Indicators</h3>
              <p className="text-xs text-slate-400">Manage qualitative statements and trust metrics.</p>
            </div>
            <button
              type="button"
              onClick={handleAddTrustStat}
              className="px-3 py-1.5 rounded-lg bg-[#F97316] text-white text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Trust Item</span>
            </button>
          </div>

          <div className="space-y-4">
            {trustStats.map((item, idx) => (
              <div key={item.id} className="p-4 rounded-xl bg-black border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#F97316]">Pillar 0{idx + 1}</span>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.enabled !== false}
                        onChange={(e) => handleUpdateTrustStat(item.id, { enabled: e.target.checked })}
                      />
                      <span>Enabled</span>
                    </label>
                    <button
                      onClick={() => handleDeleteTrustStat(item.id)}
                      className="p-1 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => handleUpdateTrustStat(item.id, { label: e.target.value })}
                    placeholder="Category Label (e.g. Projects Delivered)"
                    className="px-3 py-1.5 rounded-lg bg-[#0B0F16] border border-white/10 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleUpdateTrustStat(item.id, { title: e.target.value })}
                    placeholder="Title / Stat (e.g. 50+ Solutions)"
                    className="px-3 py-1.5 rounded-lg bg-[#0B0F16] border border-white/10 text-xs text-white font-bold"
                  />
                </div>

                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleUpdateTrustStat(item.id, { description: e.target.value })}
                  placeholder="Qualitative Statement"
                  className="w-full px-3 py-1.5 rounded-lg bg-[#0B0F16] border border-white/10 text-xs text-slate-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Why ANIVEX Tab */}
      {activeSubTab === 'why' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0B0F16] border border-white/10 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h3 className="font-heading font-bold text-lg text-white">Why ANIVEX Section</h3>
              <p className="text-xs text-slate-400">Editorial principles and client advantages.</p>
            </div>
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={whySettings.enabled}
                onChange={(e) => setWhySettings({ ...whySettings, enabled: e.target.checked })}
              />
              <span>Section Enabled</span>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Section Heading</label>
              <input
                type="text"
                value={whySettings.heading}
                onChange={(e) => setWhySettings({ ...whySettings, heading: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Section Description</label>
              <textarea
                rows={2}
                value={whySettings.description}
                onChange={(e) => setWhySettings({ ...whySettings, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white resize-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Features & Pillars</h4>
              <button
                type="button"
                onClick={handleAddWhyFeature}
                className="px-3 py-1 rounded-lg bg-[#F97316] text-white text-xs font-bold flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add Feature</span>
              </button>
            </div>

            {whySettings.features.map((feat) => (
              <div key={feat.id} className="p-4 rounded-xl bg-black border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#F97316]">{feat.number}</span>
                  <button
                    onClick={() => handleDeleteWhyFeature(feat.id)}
                    className="p-1 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={feat.number}
                    onChange={(e) => handleUpdateWhyFeature(feat.id, { number: e.target.value })}
                    placeholder="01"
                    className="px-3 py-1.5 rounded-lg bg-[#0B0F16] border border-white/10 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={feat.title}
                    onChange={(e) => handleUpdateWhyFeature(feat.id, { title: e.target.value })}
                    placeholder="Title"
                    className="px-3 py-1.5 rounded-lg bg-[#0B0F16] border border-white/10 text-xs text-white font-bold"
                  />
                </div>
                <input
                  type="text"
                  value={feat.description}
                  onChange={(e) => handleUpdateWhyFeature(feat.id, { description: e.target.value })}
                  placeholder="Description"
                  className="w-full px-3 py-1.5 rounded-lg bg-[#0B0F16] border border-white/10 text-xs text-slate-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Tab */}
      {activeSubTab === 'cta' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0B0F16] border border-white/10 space-y-5">
          <div className="pb-4 border-b border-white/10">
            <h3 className="font-heading font-bold text-lg text-white">Bottom Call to Action Banner</h3>
            <p className="text-xs text-slate-400">Headlines and direct action buttons.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">CTA Headline</label>
            <input
              type="text"
              value={ctaData.ctaHeading}
              onChange={(e) => setCtaData({ ...ctaData, ctaHeading: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-sm font-bold text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">CTA Subtitle</label>
            <textarea
              rows={3}
              value={ctaData.ctaSubtitle}
              onChange={(e) => setCtaData({ ...ctaData, ctaSubtitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Primary Button Text</label>
              <input
                type="text"
                value={ctaData.primaryCtaText}
                onChange={(e) => setCtaData({ ...ctaData, primaryCtaText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Secondary Button Text</label>
              <input
                type="text"
                value={ctaData.secondaryCtaText}
                onChange={(e) => setCtaData({ ...ctaData, secondaryCtaText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
