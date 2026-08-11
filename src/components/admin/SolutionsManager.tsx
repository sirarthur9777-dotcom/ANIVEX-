import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { SolutionCMS } from '../../types/cms';
import {
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  X,
  Check
} from 'lucide-react';

interface SolutionsManagerProps {
  initialOpenAddModal?: boolean;
}

export const SolutionsManager: React.FC<SolutionsManagerProps> = ({ initialOpenAddModal }) => {
  const { solutions, addSolution, updateSolution, deleteSolution } = useCms();

  const [isModalOpen, setIsModalOpen] = useState(initialOpenAddModal || false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<SolutionCMS, 'id'>>({
    title: '',
    subtitle: '',
    targetAudience: '',
    description: '',
    highlights: ['Custom Software Architecture', '24/7 Priority Support'],
    iconName: 'Building2',
    category: 'Enterprise',
    displayOrder: solutions.length + 1,
    published: true,
  });

  const [highlightInput, setHighlightInput] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      subtitle: '',
      targetAudience: '',
      description: '',
      highlights: ['Custom Software Architecture', '24/7 Priority Support'],
      iconName: 'Building2',
      category: 'Enterprise',
      displayOrder: solutions.length + 1,
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sol: SolutionCMS) => {
    setEditingId(sol.id);
    setFormData({
      title: sol.title,
      subtitle: sol.subtitle,
      targetAudience: sol.targetAudience,
      description: sol.description,
      highlights: [...sol.highlights],
      iconName: sol.iconName || 'Building2',
      category: sol.category || 'General',
      displayOrder: sol.displayOrder,
      published: sol.published,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateSolution(editingId, formData);
    } else {
      await addSolution(formData);
    }
    setIsModalOpen(false);
  };

  const handleTogglePublish = async (sol: SolutionCMS) => {
    await updateSolution(sol.id, { published: !sol.published });
  };

  const handleAddHighlight = () => {
    if (highlightInput.trim()) {
      setFormData({ ...formData, highlights: [...formData.highlights, highlightInput.trim()] });
      setHighlightInput('');
    }
  };

  const handleRemoveHighlight = (idx: number) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== idx),
    });
  };

  const handleDelete = async (id: string) => {
    await deleteSolution(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl">
        <div>
          <h2 className="font-display font-bold text-xl text-white">Solutions & Industry Verticals</h2>
          <p className="text-xs text-slate-400 mt-1">Manage solutions tailored for Businesses, Startups, Institutions, and Individuals.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(245,200,91,0.4)] transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Solution</span>
        </button>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {solutions.map((sol) => (
          <div
            key={sol.id}
            className={`p-6 rounded-3xl bg-[#0B0F16] border transition-all space-y-4 shadow-xl ${
              sol.published ? 'border-white/10 hover:border-[#D6A84F]/40' : 'border-amber-500/20 opacity-75'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#121824] border border-[#D6A84F]/30 text-[#F5C85B] text-[10px] font-mono font-bold">
                  {sol.targetAudience}
                </span>
                <h3 className="font-display font-bold text-xl text-white mt-2">{sol.title}</h3>
                <p className="text-xs text-[#F5C85B] font-medium">{sol.subtitle}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTogglePublish(sol)}
                  className={`p-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                    sol.published
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                      : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                  }`}
                >
                  {sol.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => handleOpenEdit(sol)}
                  className="p-2 rounded-xl bg-[#121824] border border-white/10 text-slate-300 hover:text-white cursor-pointer"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setDeleteConfirmId(sol.id)}
                  className="p-2 rounded-xl bg-red-950/40 border border-red-500/20 text-red-400 hover:bg-red-900/40 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{sol.description}</p>

            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Highlights:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {sol.highlights.map((high, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84F]" />
                    <span>{high}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-[10px] font-mono text-slate-500 flex items-center justify-between border-t border-white/5">
              <span>Category: {sol.category}</span>
              <span>Order: #{sol.displayOrder}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="p-6 rounded-3xl bg-[#0B0F16] border border-red-500/40 max-w-sm w-full space-y-4 text-center">
            <h3 className="font-display font-bold text-lg text-white">Delete Solution</h3>
            <p className="text-xs text-slate-300">Are you sure you want to delete this solution vertical?</p>
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Solution Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="p-8 rounded-3xl bg-[#0B0F16] border border-[#D6A84F]/40 max-w-2xl w-full my-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-display font-bold text-xl text-white">
                {editingId ? 'Edit Solution' : 'Add Solution Vertical'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-[#121824] text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Solution Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. For Businesses"
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Target Audience *</label>
                  <input
                    type="text"
                    required
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    placeholder="e.g. Established Companies & Enterprises"
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Subtitle / Hook *</label>
                <input
                  type="text"
                  required
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Streamline operations & modernize core technology"
                  className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed breakdown of how ANIVEX serves this vertical..."
                  className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Icon Name</label>
                  <select
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  >
                    <option value="Building2">Building2 (Businesses)</option>
                    <option value="Rocket">Rocket (Startups)</option>
                    <option value="ShieldCheck">ShieldCheck (Institutions)</option>
                    <option value="UserCheck">UserCheck (Individuals)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Enterprise"
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
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

              {/* Highlights List */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Key Solution Highlights</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    placeholder="Add highlight..."
                    className="flex-1 bg-[#05070B] border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="px-4 py-2 rounded-xl bg-[#121824] border border-[#D6A84F]/30 text-[#F5C85B] text-xs font-semibold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.highlights.map((high, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#121824] text-xs text-white">
                      <span>{high}</span>
                      <button type="button" onClick={() => handleRemoveHighlight(idx)} className="text-slate-400 hover:text-red-400">×</button>
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
                    className="rounded border-white/20 bg-[#05070B] text-[#D6A84F]"
                  />
                  <span className="text-xs text-slate-300 font-medium">Publish Immediately</span>
                </label>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-xs tracking-wider uppercase cursor-pointer"
                >
                  Save Solution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
