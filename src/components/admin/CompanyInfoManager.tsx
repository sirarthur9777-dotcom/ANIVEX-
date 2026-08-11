import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Building, Save, Mail, Phone, MapPin, Clock, Globe } from 'lucide-react';

export const CompanyInfoManager: React.FC = () => {
  const { companyInfo, updateCompanyInfo } = useCms();

  const [formData, setFormData] = useState({ ...companyInfo });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateCompanyInfo(formData);
    setIsSaving(false);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="p-6 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#05070B] border border-[#D6A84F]/30 text-[10px] font-mono text-[#F5C85B] uppercase mb-2">
            ORGANIZATION SETTINGS
          </div>
          <h2 className="font-display font-bold text-xl text-white">Company Information</h2>
          <p className="text-xs text-slate-400 mt-1">Manage contact details, business hours, headquarters, and branding info.</p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-[0_0_20px_rgba(245,200,91,0.4)] transition-all cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save Company Info'}</span>
        </button>
      </div>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-white/10">
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
              <span>Contact Phone Number</span>
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white"
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
            <span>{isSaving ? 'Updating...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
