import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Share2, Save, Linkedin, Instagram, Facebook, Twitter, Github, Youtube } from 'lucide-react';

export const SocialLinksManager: React.FC = () => {
  const { socialLinks, updateSocialLinks } = useCms();

  const [formData, setFormData] = useState({ ...socialLinks });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSocialLinks(formData);
    setIsSaving(false);
  };

  const channels = [
    { key: 'linkedin' as const, label: 'LinkedIn', icon: Linkedin },
    { key: 'instagram' as const, label: 'Instagram', icon: Instagram },
    { key: 'facebook' as const, label: 'Facebook', icon: Facebook },
    { key: 'twitter' as const, label: 'Twitter / X', icon: Twitter },
    { key: 'github' as const, label: 'GitHub', icon: Github },
    { key: 'youtube' as const, label: 'YouTube', icon: Youtube },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="p-6 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#05070B] border border-[#D6A84F]/30 text-[10px] font-mono text-[#F5C85B] uppercase mb-2">
            SOCIAL MEDIA CHANNELS
          </div>
          <h2 className="font-display font-bold text-xl text-white">Social Links Manager</h2>
          <p className="text-xs text-slate-400 mt-1">Configure official social media links displayed in website header and footer.</p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-[0_0_20px_rgba(245,200,91,0.4)] transition-all cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save Social Links'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl space-y-6">
        <div className="space-y-4">
          {channels.map(({ key, label, icon: Icon }) => (
            <div
              key={key}
              className="p-4 rounded-2xl bg-[#05070B] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 shrink-0">
                <div className="p-2.5 rounded-xl bg-[#121824] border border-[#D6A84F]/30 text-[#F5C85B]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{label}</div>
                  <label className="flex items-center gap-2 mt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData[key].enabled}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [key]: { ...formData[key], enabled: e.target.checked },
                        })
                      }
                      className="rounded border-white/20 bg-[#05070B] text-[#D6A84F]"
                    />
                    <span className="text-[11px] font-mono text-slate-400">Display link</span>
                  </label>
                </div>
              </div>

              <input
                type="text"
                value={formData[key].url}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [key]: { ...formData[key], url: e.target.value },
                  })
                }
                placeholder={`https://${key}.com/anivex`}
                className="flex-1 bg-[#0B0F16] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl hover:shadow-[0_0_25px_rgba(245,200,91,0.4)] transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Updating...' : 'Save All Links'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
