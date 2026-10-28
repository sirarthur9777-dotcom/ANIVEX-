import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { PricingPackageCMS } from '../../types/cms';
import {
  Tag,
  Plus,
  Save,
  Trash2,
  Edit2,
  Check,
  Star,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Layers,
  ArrowUpDown,
  BadgeIndianRupee,
} from 'lucide-react';

export const PricingManager: React.FC = () => {
  const {
    pricingPackages,
    addPricingPackage,
    updatePricingPackage,
    deletePricingPackage,
    siteContent,
    updateSiteContent,
  } = useCms();

  // Header settings state
  const [headerData, setHeaderData] = useState({
    pricingBadge: siteContent.pricingBadge || 'TRANSPARENT VALUE',
    pricingHeading: siteContent.pricingHeading || 'Transparent Pricing in Rupees (₹)',
    pricingDescription:
      siteContent.pricingDescription ||
      'Zero hidden charges. Milestone-based invoicing with official GST documentation and full intellectual property ownership.',
  });
  const [isSavingHeader, setIsSavingHeader] = useState(false);
  const [headerSaved, setHeaderSaved] = useState(false);

  // Package editor state
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const initialFormState: Omit<PricingPackageCMS, 'id'> = {
    name: '',
    category: 'Web Platform',
    price: '₹14,999',
    priceSubtext: 'starting',
    timeline: '5 - 7 Days',
    badge: 'Quick Launch',
    featured: false,
    description: '',
    features: ['100% Mobile & Desktop Responsive', 'Direct WhatsApp Chat Integration'],
    projectType: 'Website',
    budgetRange: 'Under ₹50,000',
    displayOrder: (pricingPackages.length + 1) * 10,
    published: true,
  };

  const [formData, setFormData] = useState<Omit<PricingPackageCMS, 'id'>>(initialFormState);
  const [featuresText, setFeaturesText] = useState(initialFormState.features.join('\n'));

  const handleSaveHeader = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSavingHeader) return;
    setIsSavingHeader(true);
    setHeaderSaved(false);
    try {
      await updateSiteContent(headerData);
      setHeaderSaved(true);
      setTimeout(() => setHeaderSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingHeader(false);
    }
  };

  const handleStartCreate = () => {
    setEditingId(null);
    setFormData({
      ...initialFormState,
      displayOrder: (pricingPackages.length + 1) * 10,
    });
    setFeaturesText(initialFormState.features.join('\n'));
    setIsEditing(true);
  };

  const handleStartEdit = (pkg: PricingPackageCMS) => {
    setEditingId(pkg.id);
    setFormData({
      name: pkg.name,
      category: pkg.category || 'Web Platform',
      price: pkg.price,
      priceSubtext: pkg.priceSubtext || '',
      timeline: pkg.timeline,
      badge: pkg.badge || '',
      featured: !!pkg.featured,
      description: pkg.description,
      features: pkg.features || [],
      projectType: pkg.projectType || 'Website',
      budgetRange: pkg.budgetRange || 'Under ₹50,000',
      displayOrder: pkg.displayOrder ?? 0,
      published: pkg.published !== false,
    });
    setFeaturesText((pkg.features || []).join('\n'));
    setIsEditing(true);
  };

  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving) return;

    const parsedFeatures = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const payload = {
      ...formData,
      features: parsedFeatures,
    };

    setIsSaving(true);
    try {
      if (editingId) {
        await updatePricingPackage(editingId, payload);
      } else {
        await addPricingPackage(payload);
      }
      setIsEditing(false);
      setEditingId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePackage = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    if (deletingId) return;

    setDeletingId(id);
    try {
      await deletePricingPackage(id);
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-[11px] font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
            PRICING PACKAGES & RUPEES (₹) CMS
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-[#0B1F3A]">
            Transparent Pricing in Rupees (₹)
          </h2>
          <p className="text-xs sm:text-sm text-[#0B1F3A]/70 mt-1 font-normal">
            Edit packages, price tiers in ₹, timelines, deliverables, and header text. Changes sync immediately to the live site.
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={handleStartCreate}
            className="px-5 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xs transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Package</span>
          </button>
        )}
      </div>

      {/* Section Header Editor */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#0B1F3A]/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#0B1F3A]/8 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#F97316]" />
            <h3 className="font-heading font-bold text-base text-[#0B1F3A]">
              Section Header & Description (Public Display)
            </h3>
          </div>
          {headerSaved && (
            <span className="text-xs font-semibold text-[#15803D] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Saved!
            </span>
          )}
        </div>

        <form onSubmit={handleSaveHeader} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1.5">
                Badge Label
              </label>
              <input
                type="text"
                value={headerData.pricingBadge}
                onChange={(e) => setHeaderData({ ...headerData, pricingBadge: e.target.value })}
                placeholder="TRANSPARENT VALUE"
                className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#0B1F3A]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1.5">
                Main Heading
              </label>
              <input
                type="text"
                value={headerData.pricingHeading}
                onChange={(e) => setHeaderData({ ...headerData, pricingHeading: e.target.value })}
                placeholder="Transparent Pricing in Rupees (₹)"
                className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#0B1F3A] font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1.5">
              Subtext / Description
            </label>
            <textarea
              rows={2}
              value={headerData.pricingDescription}
              onChange={(e) => setHeaderData({ ...headerData, pricingDescription: e.target.value })}
              className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-xl px-4 py-2 text-xs sm:text-sm text-[#0B1F3A]"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSavingHeader}
              className="px-5 py-2 rounded-xl bg-[#0B1F3A] hover:bg-[#122A4E] text-white text-xs font-bold flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSavingHeader ? 'Saving Header...' : 'Save Section Header'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Package Form Modal/Inline Editor */}
      {isEditing && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFDF7] border-2 border-[#F97316] shadow-lg space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-[#0B1F3A]/10">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
              <h3 className="font-heading font-extrabold text-lg text-[#0B1F3A]">
                {editingId ? `Edit Package: ${formData.name}` : 'Create New Pricing Package'}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-xs text-[#0B1F3A]/60 hover:text-[#0B1F3A] font-medium"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSavePackage} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1.5">
                  Package Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Starter Business Web"
                  className="w-full bg-white border border-[#0B1F3A]/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#0B1F3A] font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1.5">
                  Price in Rupees (₹) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="₹14,999 or Custom Scope"
                  className="w-full bg-white border border-[#0B1F3A]/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#0B1F3A] font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1.5">
                  Delivery Timeline *
                </label>
                <input
                  type="text"
                  required
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  placeholder="e.g. 5 - 7 Days"
                  className="w-full bg-white border border-[#0B1F3A]/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#0B1F3A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1.5">
                  Top Badge Tag
                </label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="e.g. Quick Launch or Most Popular"
                  className="w-full bg-white border border-[#0B1F3A]/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#0B1F3A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1.5">
                  Project Type Mapping
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full bg-white border border-[#0B1F3A]/15 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#0B1F3A]"
                >
                  <option value="Website">Website</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="ERP / Business Software">ERP / Business Software</option>
                  <option value="Cloud / AI Architecture">Cloud / AI Architecture</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1.5">
                  Budget Filter Range
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full bg-white border border-[#0B1F3A]/15 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#0B1F3A]"
                >
                  <option value="Under ₹50,000">Under ₹50,000</option>
                  <option value="₹50,000 - ₹2,00,000">₹50,000 - ₹2,00,000</option>
                  <option value="₹2,00,000 - ₹10,00,000">₹2,00,000 - ₹10,00,000</option>
                  <option value="Above ₹10,00,000">Above ₹10,00,000</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1.5">
                Target Audience / Description *
              </label>
              <textarea
                required
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Ideal for MSMEs, consultants, clinics, and professional practices looking to build instant credibility."
                className="w-full bg-white border border-[#0B1F3A]/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#0B1F3A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1.5">
                Features & Deliverables (One per line) *
              </label>
              <textarea
                required
                rows={6}
                value={featuresText}
                onChange={(e) => setFeaturesText(e.target.value)}
                placeholder="100% Mobile & Desktop Responsive&#10;Direct WhatsApp Chat Integration&#10;Google Maps & SEO Architecture&#10;High-Speed Cloud Hosting Setup&#10;Verified Lead Capture Inquiries&#10;1 Year Warranty & Support"
                className="w-full bg-white border border-[#0B1F3A]/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#0B1F3A] font-mono leading-relaxed"
              />
              <span className="text-[11px] text-[#0B1F3A]/60 mt-1 block">
                Enter each feature on a separate line. They will display with green checkmarks on the card.
              </span>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded text-[#F97316] focus:ring-[#F97316] w-4 h-4"
                />
                <span className="text-xs font-bold text-[#0B1F3A]">
                  Mark as Most Popular / Featured (Orange highlight border)
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="rounded text-[#15803D] focus:ring-[#15803D] w-4 h-4"
                />
                <span className="text-xs font-bold text-[#0B1F3A]">
                  Published (Visible to public visitors)
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#0B1F3A]/10">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 rounded-xl border border-[#0B1F3A]/15 text-xs font-bold text-[#0B1F3A] hover:bg-black/5"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold flex items-center gap-2 shadow-xs disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving Package...' : editingId ? 'Update Package' : 'Create Package'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Packages Grid View */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-lg text-[#0B1F3A]">
            Current Pricing Packages ({pricingPackages.length})
          </h3>
          <span className="text-xs text-[#0B1F3A]/60">
            Order: {pricingPackages.map((p) => p.name).join(' → ')}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pricingPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl p-5 bg-white border flex flex-col justify-between transition-all ${
                pkg.featured
                  ? 'border-2 border-[#F97316] shadow-sm'
                  : 'border-[#0B1F3A]/10 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      pkg.featured
                        ? 'bg-[#F97316]/10 text-[#F97316]'
                        : 'bg-[#0B1F3A]/5 text-[#0B1F3A]/70'
                    }`}
                  >
                    {pkg.badge || 'Package'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {pkg.published === false && (
                      <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">
                        Draft
                      </span>
                    )}
                    <span className="text-[11px] text-[#0B1F3A]/60 font-medium">
                      {pkg.timeline}
                    </span>
                  </div>
                </div>

                <h4 className="font-heading font-bold text-base text-[#0B1F3A] mb-1">
                  {pkg.name}
                </h4>

                <div className="flex items-baseline gap-1 my-2">
                  <span className="font-heading font-extrabold text-2xl text-[#0B1F3A]">
                    {pkg.price}
                  </span>
                  {pkg.price.startsWith('₹') && (
                    <span className="text-[11px] text-[#0B1F3A]/60">starting</span>
                  )}
                </div>

                <p className="text-xs text-[#0B1F3A]/70 line-clamp-2 mb-4">
                  {pkg.description}
                </p>

                <ul className="space-y-1.5 border-t border-[#0B1F3A]/8 pt-3 text-xs text-[#0B1F3A]/80 mb-4">
                  {(pkg.features || []).slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5 truncate">
                      <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0 mt-0.5" />
                      <span className="truncate">{f}</span>
                    </li>
                  ))}
                  {(pkg.features || []).length > 4 && (
                    <li className="text-[11px] text-[#0B1F3A]/50 italic pl-5">
                      +{(pkg.features || []).length - 4} more features
                    </li>
                  )}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-[#0B1F3A]/8">
                <button
                  type="button"
                  onClick={() => handleStartEdit(pkg)}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-[#0B1F3A]/5 hover:bg-[#0B1F3A]/10 text-xs font-bold text-[#0B1F3A] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDeletePackage(pkg.id, pkg.name)}
                  disabled={deletingId === pkg.id}
                  className="py-1.5 px-2.5 rounded-lg text-red-600 hover:bg-red-50 text-xs font-bold flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50"
                  title="Delete Package"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
