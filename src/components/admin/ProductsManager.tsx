import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { ProductCMS } from '../../types/cms';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  X,
  ExternalLink,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface ProductsManagerProps {
  initialOpenAddModal?: boolean;
}

export const ProductsManager: React.FC<ProductsManagerProps> = ({ initialOpenAddModal }) => {
  const { products, addProduct, updateProduct, deleteProduct } = useCms();

  const [isModalOpen, setIsModalOpen] = useState(initialOpenAddModal || false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<ProductCMS, 'id'>>({
    name: '',
    tagline: '',
    description: '',
    status: 'Available',
    badge: 'Enterprise Product',
    features: ['Multi-tenant Support', 'AI Search'],
    technologies: ['React', 'TypeScript', 'Firebase'],
    productUrl: 'https://anivex.com/products/policyhub',
    actionLabel: 'View Product →',
    isInteractive: false,
    featured: true,
    displayOrder: products.length + 1,
    published: true,
  });

  const [featureInput, setFeatureInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      tagline: '',
      description: '',
      status: 'Available',
      badge: 'Enterprise Product',
      features: ['Multi-tenant Support', 'AI Search'],
      technologies: ['React', 'TypeScript', 'Firebase'],
      productUrl: 'https://anivex.com/products/policyhub',
      actionLabel: 'View Product →',
      isInteractive: false,
      featured: true,
      displayOrder: products.length + 1,
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod: ProductCMS) => {
    setEditingId(prod.id);
    setFormData({
      name: prod.name,
      tagline: prod.tagline,
      description: prod.description,
      status: prod.status,
      badge: prod.badge,
      features: [...prod.features],
      technologies: prod.technologies ? [...prod.technologies] : [],
      productUrl: prod.productUrl || '',
      actionLabel: prod.actionLabel || 'View Product →',
      isInteractive: prod.isInteractive || false,
      featured: prod.featured || false,
      displayOrder: prod.displayOrder,
      published: prod.published,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateProduct(editingId, formData);
    } else {
      await addProduct(formData);
    }
    setIsModalOpen(false);
  };

  const handleTogglePublish = async (prod: ProductCMS) => {
    await updateProduct(prod.id, { published: !prod.published });
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
    await deleteProduct(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl">
        <div>
          <h2 className="font-display font-bold text-xl text-white">ANIVEX Flagship Products</h2>
          <p className="text-xs text-slate-400 mt-1">Manage core software products (PolicyHub, ANIVEX AI, OpsGrid, etc.).</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(245,200,91,0.4)] transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {products.map((prod) => (
          <div
            key={prod.id}
            className={`p-6 rounded-3xl bg-[#0B0F16] border transition-all space-y-4 shadow-xl relative overflow-hidden ${
              prod.published ? 'border-white/10 hover:border-[#D6A84F]/40' : 'border-amber-500/20 opacity-75'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="px-3 py-1 rounded-full bg-[#121824] border border-[#D6A84F]/30 text-[#F5C85B] text-[10px] font-mono font-bold">
                    {prod.badge}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#05070B] border border-white/10 text-slate-300 text-[10px] font-mono">
                    {prod.status}
                  </span>
                  {prod.featured && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono">
                      ★ Featured
                    </span>
                  )}
                </div>
                <h3 className="font-display font-extrabold text-2xl text-white mt-2">{prod.name}</h3>
                <p className="text-xs font-semibold text-[#F5C85B] mt-0.5">{prod.tagline}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTogglePublish(prod)}
                  className={`p-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                    prod.published
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                      : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                  }`}
                  title={prod.published ? 'Unpublish' : 'Publish'}
                >
                  {prod.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => handleOpenEdit(prod)}
                  className="p-2 rounded-xl bg-[#121824] border border-white/10 text-slate-300 hover:text-white hover:border-[#D6A84F]/40 transition-colors cursor-pointer"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setDeleteConfirmId(prod.id)}
                  className="p-2 rounded-xl bg-red-950/40 border border-red-500/20 text-red-400 hover:bg-red-900/40 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{prod.description}</p>

            <div className="flex flex-wrap gap-2">
              {prod.features.map((feat, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#121824] border border-white/5 text-slate-300 text-[10px]">
                  ✓ {feat}
                </span>
              ))}
            </div>

            {prod.technologies && prod.technologies.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-1.5">
                {prod.technologies.map((tech, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-[#05070B] border border-white/10 text-slate-400 text-[10px] font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
              <span>Action: {prod.actionLabel}</span>
              {prod.productUrl && (
                <a href={prod.productUrl} target="_blank" rel="noreferrer" className="text-[#F5C85B] hover:underline flex items-center gap-1">
                  <span>Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="p-6 rounded-3xl bg-[#0B0F16] border border-red-500/40 max-w-sm w-full space-y-4 text-center">
            <h3 className="font-display font-bold text-lg text-white">Confirm Product Deletion</h3>
            <p className="text-xs text-slate-300">Are you sure you want to remove this product from the ANIVEX portfolio?</p>
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
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="p-8 rounded-3xl bg-[#0B0F16] border border-[#D6A84F]/40 max-w-2xl w-full my-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-display font-bold text-xl text-white">
                {editingId ? 'Edit Product' : 'Add New Flagship Product'}
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
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. PolicyHub"
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Badge Label</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Enterprise Platform"
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Tagline / Subtitle *</label>
                <input
                  type="text"
                  required
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Smart Policy & Document Governance"
                  className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Full Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what the product does and its primary value..."
                  className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  >
                    <option value="Available">Available</option>
                    <option value="Coming Soon">Coming Soon</option>
                    <option value="In Development">In Development</option>
                    <option value="Beta">Beta</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Action Button Label</label>
                  <input
                    type="text"
                    value={formData.actionLabel}
                    onChange={(e) => setFormData({ ...formData, actionLabel: e.target.value })}
                    placeholder="e.g. View Product →"
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

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Product URL / Link</label>
                <input
                  type="text"
                  value={formData.productUrl}
                  onChange={(e) => setFormData({ ...formData, productUrl: e.target.value })}
                  placeholder="https://anivex.com/products/policyhub"
                  className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              {/* Features List */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Key Features</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="Add feature..."
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
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#121824] text-xs text-white">
                      <span>{feat}</span>
                      <button type="button" onClick={() => handleRemoveFeature(idx)} className="text-slate-400 hover:text-red-400">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Technologies List */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Tech Stack Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Add tech (e.g. React, Firebase)..."
                    className="flex-1 bg-[#05070B] border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddTech}
                    className="px-4 py-2 rounded-xl bg-[#121824] border border-[#D6A84F]/30 text-[#F5C85B] text-xs font-semibold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.technologies?.map((tech, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#05070B] border border-white/10 text-xs text-slate-300">
                      <span>{tech}</span>
                      <button type="button" onClick={() => handleRemoveTech(idx)} className="text-slate-400 hover:text-red-400">×</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="rounded border-white/20 bg-[#05070B] text-[#D6A84F]"
                    />
                    <span className="text-xs text-slate-300 font-medium">Publish Immediately</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded border-white/20 bg-[#05070B] text-[#D6A84F]"
                    />
                    <span className="text-xs text-slate-300 font-medium">Highlight as Featured</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-xs tracking-wider uppercase cursor-pointer"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
