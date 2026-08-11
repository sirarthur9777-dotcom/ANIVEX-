import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { ServiceCMS } from '../../types/cms';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  X,
  Check,
  MoveUp,
  MoveDown,
  Sparkles
} from 'lucide-react';

interface ServicesManagerProps {
  initialOpenAddModal?: boolean;
}

export const ServicesManager: React.FC<ServicesManagerProps> = ({ initialOpenAddModal }) => {
  const { services, addService, updateService, deleteService } = useCms();

  const [isModalOpen, setIsModalOpen] = useState(initialOpenAddModal || false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<ServiceCMS, 'id'>>({
    number: `0${services.length + 1}`,
    title: '',
    description: '',
    fullDescription: '',
    iconName: 'Cpu',
    features: ['Custom Integration', 'Scalable Architecture'],
    technologies: ['React', 'Node.js', 'TypeScript'],
    displayOrder: services.length + 1,
    published: true,
  });

  const [featureInput, setFeatureInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      number: `0${services.length + 1}`,
      title: '',
      description: '',
      fullDescription: '',
      iconName: 'Cpu',
      features: ['Custom Integration', 'Scalable Architecture'],
      technologies: ['React', 'Node.js', 'TypeScript'],
      displayOrder: services.length + 1,
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (srv: ServiceCMS) => {
    setEditingId(srv.id);
    setFormData({
      number: srv.number,
      title: srv.title,
      description: srv.description,
      fullDescription: srv.fullDescription || '',
      iconName: srv.iconName || 'Cpu',
      features: [...srv.features],
      technologies: srv.technologies ? [...srv.technologies] : [],
      displayOrder: srv.displayOrder,
      published: srv.published,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateService(editingId, formData);
    } else {
      await addService(formData);
    }
    setIsModalOpen(false);
  };

  const handleTogglePublish = async (srv: ServiceCMS) => {
    await updateService(srv.id, { published: !srv.published });
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData({ ...formData, features: [...formData.features, featureInput.trim()] });
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (idx: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== idx),
    });
  };

  const handleAddTech = () => {
    if (techInput.trim()) {
      setFormData({ ...formData, technologies: [...formData.technologies, techInput.trim()] });
      setTechInput('');
    }
  };

  const handleRemoveTech = (idx: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== idx),
    });
  };

  const handleDelete = async (id: string) => {
    await deleteService(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl">
        <div>
          <h2 className="font-display font-bold text-xl text-white">Services & Capabilities</h2>
          <p className="text-xs text-slate-400 mt-1">Manage core engineering verticals shown on the public Services section.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(245,200,91,0.4)] transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className={`p-6 rounded-2xl bg-[#0B0F16] border transition-all space-y-4 shadow-xl ${
              srv.published ? 'border-white/10 hover:border-[#D6A84F]/40' : 'border-amber-500/20 bg-[#0B0F16]/50 opacity-75'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-display font-extrabold text-2xl text-gold-gradient">
                  {srv.number}
                </span>
                <h3 className="font-display font-bold text-lg text-white">{srv.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTogglePublish(srv)}
                  className={`p-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                    srv.published
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                      : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                  }`}
                  title={srv.published ? 'Unpublish' : 'Publish'}
                >
                  {srv.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  <span>{srv.published ? 'Published' : 'Hidden'}</span>
                </button>

                <button
                  onClick={() => handleOpenEdit(srv)}
                  className="p-2 rounded-xl bg-[#121824] border border-white/10 text-slate-300 hover:text-white hover:border-[#D6A84F]/40 transition-colors cursor-pointer"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setDeleteConfirmId(srv.id)}
                  className="p-2 rounded-xl bg-red-950/40 border border-red-500/20 text-red-400 hover:bg-red-900/40 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{srv.description}</p>

            {/* Features list tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {srv.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-[#121824] border border-[#D6A84F]/20 text-[#F5C85B] text-[10px] font-mono"
                >
                  ✓ {feat}
                </span>
              ))}
            </div>

            <div className="pt-2 text-[10px] font-mono text-slate-500 flex items-center justify-between">
              <span>Display Order: #{srv.displayOrder}</span>
              <span>Icon: {srv.iconName}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="p-6 rounded-3xl bg-[#0B0F16] border border-red-500/40 max-w-sm w-full space-y-4 text-center">
            <h3 className="font-display font-bold text-lg text-white">Confirm Deletion</h3>
            <p className="text-xs text-slate-300">Are you sure you want to delete this service? This action will remove it from the public website.</p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2.5 rounded-xl bg-[#121824] border border-white/10 text-xs text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs cursor-pointer"
              >
                Delete Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal Drawer */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="p-8 rounded-3xl bg-[#0B0F16] border border-[#D6A84F]/40 max-w-2xl w-full my-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-display font-bold text-xl text-white">
                {editingId ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-[#121824] text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Service Number</label>
                  <input
                    type="text"
                    required
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. AI & Automation"
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Short Description *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary shown on the main card..."
                  className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Full Description / Detail</label>
                <textarea
                  rows={3}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Comprehensive breakdown of service capabilities..."
                  className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Icon Name</label>
                  <select
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  >
                    <option value="Cpu">Cpu (Custom Software)</option>
                    <option value="Globe">Globe (Web Development)</option>
                    <option value="Smartphone">Smartphone (Mobile Apps)</option>
                    <option value="Sparkles">Sparkles (AI & Automation)</option>
                    <option value="BarChart3">BarChart3 (ERP & Dashboards)</option>
                    <option value="Layout">Layout (UI/UX Design)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 1 })}
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
              </div>

              {/* Key Features List Editor */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Service Features / Highlights</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="Add a key feature..."
                    className="flex-1 bg-[#05070B] border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2 rounded-xl bg-[#121824] border border-[#D6A84F]/30 text-[#F5C85B] text-xs font-semibold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feat, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#121824] border border-white/10 text-xs text-white">
                      <span>{feat}</span>
                      <button type="button" onClick={() => handleRemoveFeature(idx)} className="text-slate-400 hover:text-red-400">
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-white/10">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="rounded border-white/20 bg-[#05070B] text-[#D6A84F] focus:ring-[#D6A84F]"
                  />
                  <span className="text-xs text-slate-300 font-medium">Publish on Website Immediately</span>
                </label>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-xs tracking-wider uppercase cursor-pointer"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
