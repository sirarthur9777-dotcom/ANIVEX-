import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { ProjectCMS } from '../../types/cms';
import {
  FolderGit2,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Star
} from 'lucide-react';

interface ProjectsManagerProps {
  initialOpenAddModal?: boolean;
}

export const ProjectsManager: React.FC<ProjectsManagerProps> = ({ initialOpenAddModal }) => {
  const { projects, addProject, updateProject, deleteProject } = useCms();

  const [isModalOpen, setIsModalOpen] = useState(initialOpenAddModal || false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<ProjectCMS, 'id'>>({
    name: '',
    category: 'Custom Software & Web Application',
    projectType: 'Web System',
    shortDescription: '',
    fullDescription: '',
    techStack: ['React', 'TypeScript', 'Node.js'],
    features: ['Real-time Telemetry', 'Cloud Hosting'],
    featured: true,
    imageBg: 'from-amber-950/40 via-slate-900 to-[#0B0F16]',
    imageUrl: '',
    projectUrl: '',
    githubUrl: '',
    stats: 'Enterprise Grade',
    status: 'Completed',
    clientType: 'Commercial Client',
    timeline: '3 Months',
    overview: '',
    displayOrder: projects.length + 1,
    published: true,
  });

  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: 'Custom Software & Web Application',
      projectType: 'Web System',
      shortDescription: '',
      fullDescription: '',
      techStack: ['React', 'TypeScript', 'Node.js'],
      features: ['Real-time Telemetry', 'Cloud Hosting'],
      featured: true,
      imageBg: 'from-amber-950/40 via-slate-900 to-[#0B0F16]',
      imageUrl: '',
      projectUrl: '',
      githubUrl: '',
      stats: 'Enterprise Grade',
      status: 'Completed',
      clientType: 'Commercial Client',
      timeline: '3 Months',
      overview: '',
      displayOrder: projects.length + 1,
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj: ProjectCMS) => {
    setEditingId(proj.id);
    setFormData({
      name: proj.name,
      category: proj.category,
      projectType: proj.projectType || 'Software System',
      shortDescription: proj.shortDescription,
      fullDescription: proj.fullDescription || proj.overview || '',
      techStack: [...proj.techStack],
      features: proj.features ? [...proj.features] : [],
      featured: proj.featured || false,
      imageBg: proj.imageBg || 'from-amber-950/40 via-slate-900 to-[#0B0F16]',
      imageUrl: proj.imageUrl || '',
      projectUrl: proj.projectUrl || '',
      githubUrl: proj.githubUrl || '',
      stats: proj.stats || '',
      status: proj.status || 'Completed',
      clientType: proj.clientType || 'Commercial System',
      timeline: proj.timeline || '',
      overview: proj.overview || '',
      displayOrder: proj.displayOrder,
      published: proj.published,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateProject(editingId, formData);
    } else {
      await addProject(formData);
    }
    setIsModalOpen(false);
  };

  const handleTogglePublish = async (proj: ProjectCMS) => {
    await updateProject(proj.id, { published: !proj.published });
  };

  const handleAddTech = () => {
    if (techInput.trim()) {
      setFormData({ ...formData, techStack: [...formData.techStack, techInput.trim()] });
      setTechInput('');
    }
  };

  const handleRemoveTech = (idx: number) => {
    setFormData({ ...formData, techStack: formData.techStack.filter((_, i) => i !== idx) });
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData({ ...formData, features: [...formData.features, featureInput.trim()] });
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (idx: number) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== idx) });
  };

  const handleDelete = async (id: string) => {
    await deleteProject(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl">
        <div>
          <h2 className="font-display font-bold text-xl text-white">Projects Portfolio</h2>
          <p className="text-xs text-slate-400 mt-1">Manage case studies and featured development projects displayed on the public website.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(245,200,91,0.4)] transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className={`p-6 rounded-3xl bg-[#0B0F16] border transition-all space-y-4 shadow-xl relative ${
              proj.published ? 'border-white/10 hover:border-[#D6A84F]/40' : 'border-amber-500/20 opacity-75'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="px-3 py-1 rounded-full bg-[#121824] border border-[#D6A84F]/30 text-[#F5C85B] text-[10px] font-mono font-bold">
                    {proj.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#05070B] border border-white/10 text-slate-300 text-[10px] font-mono">
                    {proj.status}
                  </span>
                  {proj.featured && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-300" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>
                <h3 className="font-display font-extrabold text-2xl text-white mt-2">{proj.name}</h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTogglePublish(proj)}
                  className={`p-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                    proj.published
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                      : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                  }`}
                >
                  {proj.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => handleOpenEdit(proj)}
                  className="p-2 rounded-xl bg-[#121824] border border-white/10 text-slate-300 hover:text-white cursor-pointer"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setDeleteConfirmId(proj.id)}
                  className="p-2 rounded-xl bg-red-950/40 border border-red-500/20 text-red-400 hover:bg-red-900/40 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{proj.shortDescription}</p>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {proj.techStack.map((tech, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#05070B] border border-white/10 text-[#F5C85B] text-[10px] font-mono">
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
              <span>Client: {proj.clientType || 'Commercial'}</span>
              <div className="flex items-center gap-3">
                {proj.projectUrl && (
                  <a href={proj.projectUrl} target="_blank" rel="noreferrer" className="text-[#F5C85B] hover:underline flex items-center gap-1">
                    <span>Live App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="p-6 rounded-3xl bg-[#0B0F16] border border-red-500/40 max-w-sm w-full space-y-4 text-center">
            <h3 className="font-display font-bold text-lg text-white">Delete Project</h3>
            <p className="text-xs text-slate-300">Are you sure you want to delete this project from the portfolio?</p>
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="p-8 rounded-3xl bg-[#0B0F16] border border-[#D6A84F]/40 max-w-2xl w-full my-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-display font-bold text-xl text-white">
                {editingId ? 'Edit Project' : 'Add Project Case Study'}
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
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Project Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. PolicyHub Platform"
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Category *</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. SaaS Platform & Enterprise Software"
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Short Summary *</label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Concise overview shown on project card..."
                  className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Detailed Overview / Case Study</label>
                <textarea
                  rows={3}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value, overview: e.target.value })}
                  placeholder="In-depth problem, solution, and engineering architecture overview..."
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
                    <option value="Featured">Featured</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Coming Soon">Coming Soon</option>
                    <option value="In Development">In Development</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Client Type</label>
                  <input
                    type="text"
                    value={formData.clientType}
                    onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}
                    placeholder="e.g. ANIVEX Flagship Product"
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Timeline</label>
                  <input
                    type="text"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    placeholder="e.g. 2025 - Active"
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Project Live URL</label>
                  <input
                    type="text"
                    value={formData.projectUrl}
                    onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                    placeholder="https://anivex.com/products/policyhub"
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

              {/* Tech Stack Tags */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Technologies Used</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Add tech (e.g. React, Firebase, Node.js)..."
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
                  {formData.techStack.map((tech, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#121824] text-xs text-white">
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
                    <span className="text-xs text-slate-300 font-medium">Mark as Featured</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-xs tracking-wider uppercase cursor-pointer"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
