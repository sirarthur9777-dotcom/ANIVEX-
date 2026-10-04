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
  Sparkles,
  Loader2
} from 'lucide-react';

interface ServicesManagerProps {
  initialOpenAddModal?: boolean;
}

export const ServicesManager: React.FC<ServicesManagerProps> = ({ initialOpenAddModal }) => {
  const { services, addService, updateService, deleteService } = useCms();

  const [isModalOpen, setIsModalOpen] = useState(initialOpenAddModal || false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const isSubmittingRef = React.useRef(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Duplicate detection audit
  const duplicateMap = React.useMemo(() => {
    const map = new Map<string, ServiceCMS[]>();
    services.forEach((s) => {
      const key = (s.title || '').trim().toLowerCase();
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(s);
    });
    return map;
  }, [services]);

  const duplicateGroups = React.useMemo(() => {
    return Array.from(duplicateMap.entries()).filter(([_, group]) => group.length > 1);
  }, [duplicateMap]);

  const [formData, setFormData] = useState<Omit<ServiceCMS, 'id'>>({
    number: `0${services.length + 1}`,
    title: '',
    slug: '',
    description: '',
    fullDescription: '',
    iconName: 'Cpu',
    coverImage: '',
    features: ['Custom Integration', 'Scalable Architecture'],
    technologies: ['React', 'Node.js', 'TypeScript'],
    cta: 'Discuss Service →',
    ctaUrl: '#contact',
    seoTitle: '',
    seoDescription: '',
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
      slug: '',
      description: '',
      fullDescription: '',
      iconName: 'Cpu',
      coverImage: '',
      features: ['Custom Integration', 'Scalable Architecture'],
      technologies: ['React', 'Node.js', 'TypeScript'],
      cta: 'Discuss Service →',
      ctaUrl: '#contact',
      seoTitle: '',
      seoDescription: '',
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
      slug: srv.slug || '',
      description: srv.description,
      fullDescription: srv.fullDescription || '',
      iconName: srv.iconName || 'Cpu',
      coverImage: srv.coverImage || '',
      features: [...(srv.features || [])],
      technologies: srv.technologies ? [...srv.technologies] : [],
      cta: srv.cta || 'Discuss Service →',
      ctaUrl: srv.ctaUrl || '#contact',
      seoTitle: srv.seoTitle || '',
      seoDescription: srv.seoDescription || '',
      displayOrder: srv.displayOrder ?? 1,
      published: srv.published !== false,
    });
    setIsModalOpen(true);
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= services.length) return;
    const current = services[index];
    const target = services[targetIdx];
    await updateService(current.id, { displayOrder: target.displayOrder });
    await updateService(target.id, { displayOrder: current.displayOrder });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingRef.current || isSaving) return;
    isSubmittingRef.current = true;
    setIsSaving(true);
    try {
      if (editingId) {
        await updateService(editingId, formData);
      } else {
        await addService(formData);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Save service error:', err);
    } finally {
      setIsSaving(false);
      isSubmittingRef.current = false;
    }
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
    if (deletingId) return;
    setDeletingId(id);
    setDeleteConfirmId(null);
    try {
      // Direct deletion by unique Firestore document ID
      await deleteService(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-slate-900">Services & Capabilities CMS</h2>
          <p className="text-xs text-slate-500 mt-1">Manage core software and digital services offered by Anivex Solution.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#122A4E] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Duplicate Integrity Report */}
      {duplicateGroups.length > 0 ? (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide text-amber-800">
            <span>⚠ Duplicate Service Titles Detected ({duplicateGroups.length})</span>
          </div>
          <p className="text-xs text-amber-700">
            The following services have duplicate titles. Each item has its own unique Firestore document ID:
          </p>
          <div className="space-y-2">
            {duplicateGroups.map(([title, group]) => (
              <div key={title} className="p-3 bg-white rounded-lg border border-amber-200 text-xs">
                <span className="font-bold text-slate-900">{title}</span> ({group.length} records):
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

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv, idx) => (
          <div
            key={srv.id}
            className={`p-6 rounded-2xl bg-white border transition-all space-y-4 shadow-xs relative overflow-hidden flex flex-col justify-between ${
              srv.published ? 'border-slate-200 hover:border-slate-300 hover:shadow-md' : 'border-amber-200 bg-amber-50/20 opacity-80'
            }`}
          >
            <div>
              {/* Header: Number, Title, Actions */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-bold flex items-center justify-center">
                    {srv.number}
                  </span>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-slate-900 leading-tight">{srv.title}</h3>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">ID: {srv.id}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, 'up')}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                    title="Move Up"
                  >
                    <MoveUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={idx === services.length - 1}
                    onClick={() => handleMove(idx, 'down')}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                    title="Move Down"
                  >
                    <MoveDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleTogglePublish(srv)}
                    className={`p-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer ml-1 ${
                      srv.published
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                        : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                    }`}
                    title={srv.published ? 'Published (Click to hide)' : 'Hidden (Click to publish)'}
                  >
                    {srv.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => handleOpenEdit(srv)}
                    className="p-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                    title="Edit Service"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(srv.id)}
                    className="p-1.5 rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                    title="Delete Service"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">{srv.description}</p>

              {/* Feature Badges */}
              <div className="space-y-1.5 mb-4">
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Features</div>
                <div className="flex flex-wrap gap-1.5">
                  {srv.features?.map((feat, fIdx) => (
                    <span key={fIdx} className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-700 text-[10px]">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              {srv.technologies && srv.technologies.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Tech Stack</div>
                  <div className="flex flex-wrap gap-1">
                    {srv.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 mt-4">
              <span>CTA: {srv.cta}</span>
              <span className="font-mono text-slate-400">{srv.slug || 'no-slug'}</span>
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
            <h3 className="font-heading font-bold text-lg text-slate-900">Confirm Service Deletion</h3>
            <p className="text-xs text-slate-600">
              Are you sure you want to delete this service? This action will permanently remove document ID <code className="font-mono font-bold text-red-600">{deleteConfirmId}</code>.
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
                  <span>Delete Service</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 max-w-2xl w-full my-8 space-y-6 shadow-2xl relative text-slate-900">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-heading font-bold text-xl text-slate-900">
                {editingId ? 'Edit Service' : 'Add New Service'}
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    placeholder="01"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D6A84F]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Web Development"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D6A84F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Route Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. web-development"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D6A84F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Icon Name</label>
                  <select
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#D6A84F]"
                  >
                    <option value="Cpu">Cpu / Technology</option>
                    <option value="Globe">Globe / Web</option>
                    <option value="Smartphone">Smartphone / Mobile</option>
                    <option value="Layers">Layers / Architecture</option>
                    <option value="Sparkles">Sparkles / AI</option>
                    <option value="Layout">Layout / UI UX</option>
                    <option value="Cloud">Cloud / Infrastructure</option>
                    <option value="BarChart3">BarChart3 / Data</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Short Card Description *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Concise overview shown on the homepage grid..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D6A84F] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Full Detailed Description</label>
                <textarea
                  rows={3}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="In-depth explanation displayed in detail views..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D6A84F] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">CTA Text</label>
                  <input
                    type="text"
                    value={formData.cta}
                    onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                    placeholder="e.g. Discuss Service →"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D6A84F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">CTA URL</label>
                  <input
                    type="text"
                    value={formData.ctaUrl}
                    onChange={(e) => setFormData({ ...formData, ctaUrl: e.target.value })}
                    placeholder="e.g. #contact"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D6A84F]"
                  />
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Tech Stack Tags</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTech(); } }}
                    placeholder="e.g. React, Next.js, Node.js..."
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

              {/* Feature Bullets */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Key Features & Deliverables</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }}
                    placeholder="e.g. Responsive Architecture, Enterprise Security..."
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
                  {formData.features?.map((feat, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                      <span>{feat}</span>
                      <button type="button" onClick={() => handleRemoveFeature(idx)} className="text-slate-400 hover:text-red-500 font-bold">×</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="rounded border-slate-300 text-[#0B1F3A] focus:ring-[#0B1F3A]"
                  />
                  <span className="text-xs text-slate-700 font-medium">Publish on Website Immediately</span>
                </label>

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
                      <span>{editingId ? 'Update Service' : 'Save Service'}</span>
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
