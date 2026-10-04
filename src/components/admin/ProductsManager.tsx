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
  CheckCircle2,
  MoveUp,
  MoveDown,
  Loader2
} from 'lucide-react';

interface ProductsManagerProps {
  initialOpenAddModal?: boolean;
}

export const ProductsManager: React.FC<ProductsManagerProps> = ({ initialOpenAddModal }) => {
  const { products, addProduct, updateProduct, deleteProduct } = useCms();

  const [isModalOpen, setIsModalOpen] = useState(initialOpenAddModal || false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const isSubmittingRef = React.useRef(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Duplicate detection audit
  const duplicateMap = React.useMemo(() => {
    const map = new Map<string, ProductCMS[]>();
    products.forEach((p) => {
      const key = (p.name || '').trim().toLowerCase();
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(p);
    });
    return map;
  }, [products]);

  const duplicateGroups = React.useMemo(() => {
    return Array.from(duplicateMap.entries()).filter(([_, group]) => group.length > 1);
  }, [duplicateMap]);

  const [formData, setFormData] = useState<Omit<ProductCMS, 'id'>>({
    name: '',
    category: 'Enterprise Software',
    tagline: '',
    description: '',
    status: 'Available',
    badge: 'Enterprise Product',
    features: ['Multi-tenant Support', 'Instant Search'],
    technologies: ['React', 'TypeScript', 'Node.js'],
    productUrl: 'https://anivex.com',
    image: '',
    actionLabel: 'Explore Product →',
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
      category: 'Enterprise Software',
      tagline: '',
      description: '',
      status: 'Available',
      badge: 'Enterprise Product',
      features: ['Multi-tenant Support', 'Instant Search'],
      technologies: ['React', 'TypeScript', 'Node.js'],
      productUrl: 'https://anivex.com',
      image: '',
      actionLabel: 'Explore Product →',
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
      category: prod.category || 'Enterprise Software',
      tagline: prod.tagline || '',
      description: prod.description || '',
      status: prod.status || 'Available',
      badge: prod.badge || 'Enterprise Product',
      features: [...(prod.features || [])],
      technologies: prod.technologies ? [...prod.technologies] : [],
      productUrl: prod.productUrl || '',
      image: prod.image || '',
      actionLabel: prod.actionLabel || 'Explore Product →',
      isInteractive: prod.isInteractive || false,
      featured: prod.featured || false,
      displayOrder: prod.displayOrder ?? 1,
      published: prod.published !== false,
    });
    setIsModalOpen(true);
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= products.length) return;
    const current = products[index];
    const target = products[targetIdx];
    await updateProduct(current.id, { displayOrder: target.displayOrder });
    await updateProduct(target.id, { displayOrder: current.displayOrder });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingRef.current || isSaving) return;
    isSubmittingRef.current = true;
    setIsSaving(true);
    try {
      if (editingId) {
        await updateProduct(editingId, formData);
      } else {
        await addProduct(formData);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Save product error:', err);
    } finally {
      setIsSaving(false);
      isSubmittingRef.current = false;
    }
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
    if (deletingId) return;
    setDeletingId(id);
    setDeleteConfirmId(null);
    try {
      // Direct deletion by unique Firestore document ID
      await deleteProduct(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-slate-900">Flagship Products CMS</h2>
          <p className="text-xs text-slate-500 mt-1">Manage core software products (PolicyHub, VyaparDesk, OpsGrid, etc.).</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#122A4E] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Duplicate Integrity Report */}
      {duplicateGroups.length > 0 ? (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide text-amber-800">
            <span>⚠ Duplicate Product Names Detected ({duplicateGroups.length})</span>
          </div>
          <p className="text-xs text-amber-700">
            The following products have duplicate names. Each item has its own unique Firestore document ID:
          </p>
          <div className="space-y-2">
            {duplicateGroups.map(([name, group]) => (
              <div key={name} className="p-3 bg-white rounded-lg border border-amber-200 text-xs">
                <span className="font-bold text-slate-900">{name}</span> ({group.length} records):
                <div className="mt-1 flex flex-wrap gap-2">
                  {group.map((item) => (
                    <span key={item.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 font-mono text-[11px] text-slate-700 border border-slate-200">
                      <span>ID: {item.id}</span>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="text-red-600 hover:text-red-800 font-bold ml-1 cursor-pointer disabled:opacity-50"
                      >
                        {deletingId === item.id ? 'Deleting...' : 'Delete duplicate'}
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {products.map((prod, idx) => (
          <div
            key={prod.id}
            className={`p-6 rounded-2xl bg-white border transition-all space-y-4 shadow-xs relative overflow-hidden ${
              prod.published ? 'border-slate-200 hover:border-slate-300 hover:shadow-md' : 'border-amber-200 bg-amber-50/20 opacity-80'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-mono font-bold">
                    {prod.badge}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-mono">
                    {prod.status}
                  </span>
                  {prod.featured && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-bold">
                      ★ Featured
                    </span>
                  )}
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900 mt-2">{prod.name}</h3>
                <p className="text-xs font-semibold text-amber-700 mt-0.5">{prod.tagline}</p>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">ID: {prod.id}</div>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5 mr-1 border-r border-slate-200 pr-2">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, 'up')}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                    title="Move Up"
                  >
                    <MoveUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={idx === products.length - 1}
                    onClick={() => handleMove(idx, 'down')}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                    title="Move Down"
                  >
                    <MoveDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => handleTogglePublish(prod)}
                  className={`p-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                    prod.published
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                  }`}
                  title={prod.published ? 'Published (Click to hide)' : 'Hidden (Click to publish)'}
                >
                  {prod.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => handleOpenEdit(prod)}
                  className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                  title="Edit Product"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setDeleteConfirmId(prod.id)}
                  className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                  title="Delete Product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{prod.description}</p>

            <div className="flex flex-wrap gap-2">
              {prod.features.map((feat, fIdx) => (
                <span key={fIdx} className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-[11px]">
                  ✓ {feat}
                </span>
              ))}
            </div>

            {prod.technologies && prod.technologies.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-1.5">
                {prod.technologies.map((tech, tIdx) => (
                  <span key={tIdx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Action: {prod.actionLabel}</span>
              {prod.productUrl && (
                <a href={prod.productUrl} target="_blank" rel="noreferrer" className="text-[#0B1F3A] font-semibold hover:underline flex items-center gap-1">
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
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 max-w-sm w-full space-y-4 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">Confirm Product Deletion</h3>
            <p className="text-xs text-slate-600">
              Are you sure you want to delete this product? This action will permanently remove document ID <code className="font-mono font-bold text-red-600">{deleteConfirmId}</code>.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                disabled={deletingId !== null}
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                disabled={deletingId !== null}
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {deletingId === deleteConfirmId ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Product</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 max-w-2xl w-full my-8 space-y-6 shadow-2xl relative text-slate-900">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-heading font-bold text-xl text-slate-900">
                {editingId ? 'Edit Product' : 'Add New Flagship Product'}
              </h3>
              <button
                disabled={isSaving}
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 cursor-pointer disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. PolicyHub"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D6A84F] focus:border-[#D6A84F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Badge Label</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Enterprise Platform"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D6A84F] focus:border-[#D6A84F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Governance / ERP"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D6A84F] focus:border-[#D6A84F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Tagline</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="e.g. Smart Policy & Compliance Engine"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D6A84F] focus:border-[#D6A84F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Full Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed explanation of product purpose and business value..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D6A84F] focus:border-[#D6A84F] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#D6A84F] focus:border-[#D6A84F]"
                  >
                    <option value="Available">Available</option>
                    <option value="In Development">In Development</option>
                    <option value="Beta">Beta</option>
                    <option value="Enterprise Exclusive">Enterprise Exclusive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Action Button Label</label>
                  <input
                    type="text"
                    value={formData.actionLabel}
                    onChange={(e) => setFormData({ ...formData, actionLabel: e.target.value })}
                    placeholder="e.g. Explore Product →"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D6A84F] focus:border-[#D6A84F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Action Target URL</label>
                  <input
                    type="text"
                    value={formData.productUrl}
                    onChange={(e) => setFormData({ ...formData, productUrl: e.target.value })}
                    placeholder="e.g. /products/policyhub or #contact"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D6A84F] focus:border-[#D6A84F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Product Image / Asset URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/product_policyhub_showcase_1790750505931.jpg"
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D6A84F] focus:border-[#D6A84F]"
                />
              </div>

              {/* Dynamic Feature Bullets */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Features & Highlights</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }}
                    placeholder="Add key feature highlight..."
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D6A84F]"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-semibold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feat, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                      <span>{feat}</span>
                      <button type="button" onClick={() => handleRemoveFeature(idx)} className="text-slate-400 hover:text-red-500 font-bold">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Technologies Used</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTech(); } }}
                    placeholder="e.g. React, TypeScript, Node.js..."
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D6A84F]"
                  />
                  <button
                    type="button"
                    onClick={handleAddTech}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-semibold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.technologies?.map((tech, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-xs text-slate-700 font-mono">
                      <span>{tech}</span>
                      <button type="button" onClick={() => handleRemoveTech(idx)} className="text-slate-400 hover:text-red-500 font-bold">×</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="rounded border-slate-300 text-[#0B1F3A] focus:ring-[#0B1F3A]"
                    />
                    <span className="text-xs text-slate-700 font-medium">Publish Immediately</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded border-slate-300 text-[#0B1F3A] focus:ring-[#0B1F3A]"
                    />
                    <span className="text-xs text-slate-700 font-medium">Highlight as Featured</span>
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#122A4E] text-white font-bold text-xs tracking-wider uppercase flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>{editingId ? 'Update Product' : 'Save Product'}</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
