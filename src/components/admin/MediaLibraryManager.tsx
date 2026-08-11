import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { MediaItem } from '../../types/cms';
import { Image as ImageIcon, Plus, Trash2, Copy, Check, ExternalLink, X } from 'lucide-react';

export const MediaLibraryManager: React.FC = () => {
  const { mediaItems, addMedia, deleteMedia, showToast } = useCms();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<MediaItem, 'id'>>({
    fileName: '',
    fileUrl: '',
    fileType: 'image/png',
    fileSize: '512 KB',
    category: 'Project',
    uploadedAt: new Date().toISOString().slice(0, 10),
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showToast('Image URL copied to clipboard!');
    setTimeout(() => setCopiedId(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fileName || !formData.fileUrl) return;
    await addMedia(formData);
    setIsModalOpen(false);
    setFormData({
      fileName: '',
      fileUrl: '',
      fileType: 'image/png',
      fileSize: '512 KB',
      category: 'Project',
      uploadedAt: new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl text-white">Media Asset Library</h2>
          <p className="text-xs text-slate-400 mt-1">Manage project graphics, product mockups, logos, and digital image assets.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_20px_rgba(245,200,91,0.4)] transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Asset</span>
        </button>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaItems.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-[#0B0F16] border border-white/10 hover:border-[#D6A84F]/40 transition-all space-y-3 shadow-xl group flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video rounded-xl bg-[#05070B] overflow-hidden border border-white/5 mb-3 flex items-center justify-center">
                {item.fileUrl ? (
                  <img
                    src={item.fileUrl}
                    alt={item.fileName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-slate-600" />
                )}
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#05070B]/80 backdrop-blur-md border border-[#D6A84F]/30 text-[#F5C85B] text-[10px] font-mono">
                  {item.category}
                </span>
              </div>

              <h4 className="font-bold text-xs text-white truncate">{item.fileName}</h4>
              <p className="text-[10px] font-mono text-slate-500 mt-0.5">{item.fileType} • {item.fileSize || 'N/A'}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <button
                onClick={() => handleCopyUrl(item.id, item.fileUrl)}
                className="px-3 py-1.5 rounded-lg bg-[#121824] border border-white/10 text-[#F5C85B] text-[11px] font-semibold flex items-center gap-1.5 hover:bg-[#121824]/80 transition-colors cursor-pointer"
              >
                {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === item.id ? 'Copied!' : 'Copy Link'}</span>
              </button>

              <button
                onClick={() => deleteMedia(item.id)}
                className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/40 transition-colors cursor-pointer"
                title="Delete Media"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Drawer */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="p-8 rounded-3xl bg-[#0B0F16] border border-[#D6A84F]/40 max-w-md w-full space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-display font-bold text-lg text-white">Add Asset URL</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">File Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fileName}
                  onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
                  placeholder="anivex-banner.png"
                  className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Asset Image URL *</label>
                <input
                  type="url"
                  required
                  value={formData.fileUrl}
                  onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                >
                  <option value="Company Logo">Company Logo</option>
                  <option value="Project">Project</option>
                  <option value="Product">Product</option>
                  <option value="Service">Service</option>
                  <option value="About">About / Founder</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#F5C85B] text-[#05070B] font-extrabold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
