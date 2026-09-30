import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { FaqCMS } from '../../types/cms';
import {
  HelpCircle,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Check,
  X,
  MoveUp,
  MoveDown
} from 'lucide-react';

export const FaqsManager: React.FC = () => {
  const { faqs, addFaq, updateFaq, deleteFaq } = useCms();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<FaqCMS, 'id'>>({
    question: '',
    answer: '',
    category: 'General',
    displayOrder: faqs.length + 1,
    published: true,
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      question: '',
      answer: '',
      category: 'General',
      displayOrder: faqs.length + 1,
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: FaqCMS) => {
    setEditingId(item.id);
    setFormData({
      question: item.question,
      answer: item.answer,
      category: item.category || 'General',
      displayOrder: item.displayOrder || 1,
      published: item.published ?? true,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateFaq(editingId, formData);
    } else {
      await addFaq(formData);
    }
    setIsModalOpen(false);
  };

  const handleTogglePublish = async (item: FaqCMS) => {
    await updateFaq(item.id, { published: !item.published });
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= faqs.length) return;

    const current = faqs[index];
    const target = faqs[targetIdx];

    await updateFaq(current.id, { displayOrder: target.displayOrder });
    await updateFaq(target.id, { displayOrder: current.displayOrder });
  };

  const handleDelete = async (id: string) => {
    await deleteFaq(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0B0F16] border border-white/10 shadow-xl">
        <div>
          <h2 className="font-heading font-bold text-xl text-white">Frequently Asked Questions CMS</h2>
          <p className="text-xs text-slate-400 mt-1">Manage questions, answers, and categorization shown on the FAQ section.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add FAQ</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {faqs.map((item, idx) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[#0B0F16] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/5 text-[#F97316]">
                  {item.category || 'General'}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  item.published !== false ? 'text-[#15803D] bg-[#15803D]/10' : 'text-slate-500 bg-white/5'
                }`}>
                  {item.published !== false ? 'Published' : 'Hidden'}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{item.question}</h4>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.answer}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1 mr-2 border-r border-white/10 pr-2">
                <button
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, 'up')}
                  className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                  title="Move Up"
                >
                  <MoveUp className="w-3.5 h-3.5" />
                </button>
                <button
                  disabled={idx === faqs.length - 1}
                  onClick={() => handleMove(idx, 'down')}
                  className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                  title="Move Down"
                >
                  <MoveDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => handleTogglePublish(item)}
                className={`p-2 rounded-lg text-xs transition-colors ${
                  item.published !== false ? 'text-[#15803D] bg-[#15803D]/10' : 'text-slate-500 bg-white/5'
                }`}
                title={item.published !== false ? 'Published' : 'Hidden'}
              >
                {item.published !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button
                onClick={() => handleOpenEdit(item)}
                className="p-2 rounded-lg text-slate-300 hover:text-white bg-white/5 hover:bg-white/10"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeleteConfirmId(item.id)}
                className="p-2 rounded-lg text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Confirm Delete */}
            {deleteConfirmId === item.id && (
              <div className="w-full mt-2 p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-center flex items-center justify-between">
                <span className="text-xs text-white">Delete this question?</span>
                <div className="flex gap-2">
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
                {editingId ? 'Edit FAQ Question' : 'Add FAQ Question'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. General, Pricing, Technical, Timeline"
                  className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white resize-none leading-relaxed"
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
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
