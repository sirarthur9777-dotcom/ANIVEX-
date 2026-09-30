import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { TestimonialCMS } from '../../types/cms';
import {
  Quote,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Check,
  X,
  MoveUp,
  MoveDown
} from 'lucide-react';

export const TestimonialsManager: React.FC = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useCms();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<TestimonialCMS, 'id'>>({
    customerName: '',
    company: '',
    designation: '',
    profileImage: '',
    testimonial: '',
    rating: 5,
    featured: true,
    published: true,
    displayOrder: testimonials.length + 1,
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      customerName: '',
      company: '',
      designation: '',
      profileImage: '',
      testimonial: '',
      rating: 5,
      featured: true,
      published: true,
      displayOrder: testimonials.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: TestimonialCMS) => {
    setEditingId(item.id);
    setFormData({
      customerName: item.customerName,
      company: item.company,
      designation: item.designation,
      profileImage: item.profileImage || '',
      testimonial: item.testimonial,
      rating: item.rating || 5,
      featured: item.featured ?? true,
      published: item.published ?? true,
      displayOrder: item.displayOrder || 1,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateTestimonial(editingId, formData);
    } else {
      await addTestimonial(formData);
    }
    setIsModalOpen(false);
  };

  const handleTogglePublish = async (item: TestimonialCMS) => {
    await updateTestimonial(item.id, { published: !item.published });
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= testimonials.length) return;

    const current = testimonials[index];
    const target = testimonials[targetIdx];

    await updateTestimonial(current.id, { displayOrder: target.displayOrder });
    await updateTestimonial(target.id, { displayOrder: current.displayOrder });
  };

  const handleDelete = async (id: string) => {
    await deleteTestimonial(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0B0F16] border border-white/10 shadow-xl">
        <div>
          <h2 className="font-heading font-bold text-xl text-white">Client Testimonials CMS</h2>
          <p className="text-xs text-slate-400 mt-1">Manage verified customer endorsements displayed on the website.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item, idx) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-[#0B0F16] border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[#D4A72C] fill-[#D4A72C]" />
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleTogglePublish(item)}
                    className={`p-1.5 rounded-lg text-xs transition-colors ${
                      item.published !== false ? 'text-[#15803D] bg-[#15803D]/10' : 'text-slate-500 bg-white/5'
                    }`}
                    title={item.published !== false ? 'Published' : 'Hidden'}
                  >
                    {item.published !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white bg-white/5 hover:bg-white/10"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="p-1.5 rounded-lg text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-300 italic mb-5 leading-relaxed">
                "{item.testimonial}"
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{item.customerName}</h4>
                <p className="text-xs text-slate-400">{item.designation}, {item.company}</p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, 'up')}
                  className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                  title="Move Up"
                >
                  <MoveUp className="w-3.5 h-3.5" />
                </button>
                <button
                  disabled={idx === testimonials.length - 1}
                  onClick={() => handleMove(idx, 'down')}
                  className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                  title="Move Down"
                >
                  <MoveDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Confirm Delete */}
            {deleteConfirmId === item.id && (
              <div className="mt-3 p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-center">
                <p className="text-xs text-white mb-2">Delete this testimonial?</p>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded text-xs font-bold"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="px-3 py-1 bg-white/10 text-white rounded text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-[#0B0F16] border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <h3 className="font-heading font-bold text-lg text-white">
                {editingId ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Designation</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="e.g. Managing Director"
                    className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Star Rating (1-5)</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Testimonial Text *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.testimonial}
                  onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white resize-none"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="rounded text-[#F97316]"
                  />
                  <span>Published on Website</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#F97316] text-white text-xs font-bold"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
