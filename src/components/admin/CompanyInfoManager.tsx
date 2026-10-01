import React, { useState, useEffect } from 'react';
import { useCms } from '../../context/CmsContext';
import { Building, Save, Mail, Phone, MapPin, Clock, Globe, MessageCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

export const CompanyInfoManager: React.FC = () => {
  const { companyInfo, websiteSettings, updateWebsiteSettings, updateCompanyInfo } = useCms();

  const [formData, setFormData] = useState({
    name: websiteSettings?.companyName || companyInfo?.name || 'Anivex Solution',
    tagline: websiteSettings?.tagline || companyInfo?.tagline || 'Technology. Designed for Growth.',
    description: websiteSettings?.description || companyInfo?.description || '',
    businessEmail: websiteSettings?.email || companyInfo?.businessEmail || '',
    phone: websiteSettings?.phone || companyInfo?.phone || '',
    whatsapp: websiteSettings?.whatsapp || websiteSettings?.phone || companyInfo?.phone || '',
    headquarters: websiteSettings?.headquarters || companyInfo?.headquarters || 'Lucknow, Uttar Pradesh, India',
    address: websiteSettings?.address || companyInfo?.address || 'Lucknow, Uttar Pradesh, India - 226010',
    websiteUrl: websiteSettings?.websiteUrl || companyInfo?.websiteUrl || 'https://anivexsolution.in',
    businessHours: websiteSettings?.businessHours || companyInfo?.businessHours || 'Mon - Sat: 9:00 AM - 7:00 PM IST',
    logoUrl: companyInfo?.logoUrl || '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Sync state when Firestore settings load
  useEffect(() => {
    if (websiteSettings) {
      setFormData((prev) => ({
        ...prev,
        name: websiteSettings.companyName || prev.name,
        tagline: websiteSettings.tagline || prev.tagline,
        description: websiteSettings.description || prev.description,
        businessEmail: websiteSettings.email || prev.businessEmail,
        phone: websiteSettings.phone || prev.phone,
        whatsapp: websiteSettings.whatsapp || websiteSettings.phone || prev.whatsapp,
        headquarters: websiteSettings.headquarters || prev.headquarters,
        address: websiteSettings.address || prev.address,
        websiteUrl: websiteSettings.websiteUrl || prev.websiteUrl,
        businessHours: websiteSettings.businessHours || prev.businessHours,
      }));
    }
  }, [websiteSettings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(null);
    setSaveError(null);

    // Validation
    if (!formData.phone.trim()) {
      setSaveError('Phone number is required.');
      setIsSaving(false);
      return;
    }
    if (!formData.businessEmail.includes('@')) {
      setSaveError('A valid email address is required.');
      setIsSaving(false);
      return;
    }
    if (!formData.name.trim()) {
      setSaveError('Company name is required.');
      setIsSaving(false);
      return;
    }

    console.log('Saving website settings to Firestore...');

    try {
      // Direct Firestore write to websiteSettings/global and mirror to companyInfo/main
      await updateWebsiteSettings({
        phone: formData.phone.trim(),
        whatsapp: (formData.whatsapp || formData.phone).trim(),
        email: formData.businessEmail.trim(),
        companyName: formData.name.trim(),
        tagline: formData.tagline.trim(),
        description: formData.description.trim(),
        headquarters: formData.headquarters.trim(),
        address: formData.address.trim(),
        websiteUrl: formData.websiteUrl.trim(),
        businessHours: formData.businessHours.trim(),
      });

      console.log('Website settings saved successfully');
      setSaveSuccess('Website settings saved successfully to Cloud Firestore! All devices & browsers are now synced in real time.');
      setTimeout(() => setSaveSuccess(null), 6000);
    } catch (err: any) {
      console.error('Failed to save website settings to Firestore:', err);
      setSaveError(err?.message || 'Database write error. Please check connection and permissions.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="p-6 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#05070B] border border-[#D6A84F]/30 text-[10px] font-mono text-[#F5C85B] uppercase mb-2">
            GLOBAL FIRESTORE SETTINGS
          </div>
          <h2 className="font-display font-bold text-xl text-white">Company Information & Website Settings</h2>
          <p className="text-xs text-slate-400 mt-1">Changes are saved globally to Cloud Firestore and sync immediately across all visitors and browsers.</p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-[0_0_20px_rgba(245,200,91,0.4)] transition-all cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving to Firestore...' : 'Save Settings'}</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {saveError && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
          <span>{saveError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Company Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Company Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F5C85B]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Company Overview Description</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-white/10">
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-2 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#F5C85B]" />
              <span>Business Email *</span>
            </label>
            <input
              type="email"
              required
              value={formData.businessEmail}
              onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
              className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-2 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#F5C85B]" />
              <span>Contact Phone Number *</span>
            </label>
            <input
              type="text"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. 7905668826"
              className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-2 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp Direct Number</span>
            </label>
            <input
              type="text"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              placeholder="e.g. 7905668826"
              className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#F5C85B]" />
              <span>Headquarters Location</span>
            </label>
            <input
              type="text"
              value={formData.headquarters}
              onChange={(e) => setFormData({ ...formData, headquarters: e.target.value })}
              className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#F5C85B]" />
              <span>Official Website URL</span>
            </label>
            <input
              type="text"
              value={formData.websiteUrl}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 uppercase mb-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#F5C85B]" />
            <span>Business Hours</span>
          </label>
          <input
            type="text"
            value={formData.businessHours}
            onChange={(e) => setFormData({ ...formData, businessHours: e.target.value })}
            className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl hover:shadow-[0_0_25px_rgba(245,200,91,0.4)] transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving to Firestore...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

