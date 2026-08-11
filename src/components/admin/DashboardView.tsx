import React from 'react';
import { useCms } from '../../context/CmsContext';
import { AdminTab } from './AdminSidebar';
import {
  FolderGit2,
  Package,
  Layers,
  Sparkles,
  Eye,
  EyeOff,
  Mail,
  Plus,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  User,
  Activity
} from 'lucide-react';

interface DashboardViewProps {
  setActiveTab: (tab: AdminTab) => void;
  onOpenProjectModal: () => void;
  onOpenProductModal: () => void;
  onOpenServiceModal: () => void;
  onOpenSolutionModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  setActiveTab,
  onOpenProjectModal,
  onOpenProductModal,
  onOpenServiceModal,
  onOpenSolutionModal,
}) => {
  const {
    projects,
    products,
    services,
    solutions,
    contactEnquiries,
    activityLogs,
  } = useCms();

  const totalProjects = projects.length;
  const totalProducts = products.length;
  const totalServices = services.length;
  const totalSolutions = solutions.length;

  const publishedCount =
    projects.filter((p) => p.published).length +
    products.filter((p) => p.published).length +
    services.filter((s) => s.published).length +
    solutions.filter((s) => s.published).length;

  const hiddenCount =
    projects.filter((p) => !p.published).length +
    products.filter((p) => !p.published).length +
    services.filter((s) => !s.published).length +
    solutions.filter((s) => !s.published).length;

  const totalEnquiries = contactEnquiries.length;
  const unreadEnquiries = contactEnquiries.filter((e) => !e.read).length;

  const recentProjects = projects.slice(0, 5);
  const recentEnquiries = contactEnquiries.slice(0, 5);
  const recentLogs = activityLogs.slice(0, 5);

  return (
    <div className="space-y-8">
      
      {/* Top Banner with Quick Actions */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0B0F16] via-[#121824] to-[#0B0F16] border border-[#D6A84F]/30 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#05070B] border border-[#D6A84F]/30 text-[10px] font-mono text-[#F5C85B] uppercase mb-3">
            ANIVEX SOLUTIONS CMS DASHBOARD
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Welcome back, <span className="text-gold-gradient">Krishndas Chauhan</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
            Manage public website content, publish products, review incoming project scoping enquiries, and monitor system metrics in real time.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenProjectModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-xs flex items-center gap-1.5 shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>

          <button
            onClick={onOpenProductModal}
            className="px-4 py-2.5 rounded-xl bg-[#121824] border border-[#D6A84F]/40 text-[#F5C85B] font-semibold text-xs flex items-center gap-1.5 hover:bg-[#121824]/80 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>

          <button
            onClick={onOpenServiceModal}
            className="px-4 py-2.5 rounded-xl bg-[#05070B] border border-white/10 text-white font-medium text-xs flex items-center gap-1.5 hover:border-white/30 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className="px-4 py-2.5 rounded-xl bg-[#05070B] border border-white/10 text-slate-300 font-medium text-xs flex items-center gap-1.5 hover:border-white/30 transition-colors cursor-pointer"
          >
            <Mail className="w-4 h-4 text-[#F5C85B]" />
            <span>View Enquiries ({unreadEnquiries})</span>
          </button>
        </div>
      </div>

      {/* 8 Statistics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Projects */}
        <div
          onClick={() => setActiveTab('projects')}
          className="p-6 rounded-2xl bg-[#0B0F16] border border-white/10 hover:border-[#D6A84F]/40 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-slate-400 uppercase">Total Projects</span>
            <div className="p-2.5 rounded-xl bg-[#121824] text-[#F5C85B] border border-[#D6A84F]/20">
              <FolderGit2 className="w-5 h-5" />
            </div>
          </div>
          <div className="font-display font-extrabold text-3xl text-white group-hover:text-[#F5C85B] transition-colors">
            {totalProjects}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Active portfolio case studies</p>
        </div>

        {/* Total Products */}
        <div
          onClick={() => setActiveTab('products')}
          className="p-6 rounded-2xl bg-[#0B0F16] border border-white/10 hover:border-[#D6A84F]/40 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-slate-400 uppercase">Total Products</span>
            <div className="p-2.5 rounded-xl bg-[#121824] text-[#F5C85B] border border-[#D6A84F]/20">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="font-display font-extrabold text-3xl text-white group-hover:text-[#F5C85B] transition-colors">
            {totalProducts}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">PolicyHub, ANIVEX AI, etc.</p>
        </div>

        {/* Total Services */}
        <div
          onClick={() => setActiveTab('services')}
          className="p-6 rounded-2xl bg-[#0B0F16] border border-white/10 hover:border-[#D6A84F]/40 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-slate-400 uppercase">Total Services</span>
            <div className="p-2.5 rounded-xl bg-[#121824] text-[#F5C85B] border border-[#D6A84F]/20">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="font-display font-extrabold text-3xl text-white group-hover:text-[#F5C85B] transition-colors">
            {totalServices}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Core engineering verticals</p>
        </div>

        {/* Total Solutions */}
        <div
          onClick={() => setActiveTab('solutions')}
          className="p-6 rounded-2xl bg-[#0B0F16] border border-white/10 hover:border-[#D6A84F]/40 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-slate-400 uppercase">Total Solutions</span>
            <div className="p-2.5 rounded-xl bg-[#121824] text-[#F5C85B] border border-[#D6A84F]/20">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="font-display font-extrabold text-3xl text-white group-hover:text-[#F5C85B] transition-colors">
            {totalSolutions}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Target audience verticals</p>
        </div>

        {/* Published Items */}
        <div className="p-6 rounded-2xl bg-[#0B0F16] border border-emerald-500/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-emerald-400 uppercase">Published Items</span>
            <div className="p-2.5 rounded-xl bg-emerald-950/50 text-emerald-400 border border-emerald-500/30">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="font-display font-extrabold text-3xl text-emerald-300">
            {publishedCount}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Live on public website</p>
        </div>

        {/* Hidden Items */}
        <div className="p-6 rounded-2xl bg-[#0B0F16] border border-amber-500/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-amber-400 uppercase">Hidden / Drafts</span>
            <div className="p-2.5 rounded-xl bg-amber-950/50 text-amber-400 border border-amber-500/30">
              <EyeOff className="w-5 h-5" />
            </div>
          </div>
          <div className="font-display font-extrabold text-3xl text-amber-300">
            {hiddenCount}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Unpublished drafts</p>
        </div>

        {/* Total Contact Enquiries */}
        <div
          onClick={() => setActiveTab('enquiries')}
          className="p-6 rounded-2xl bg-[#0B0F16] border border-white/10 hover:border-[#D6A84F]/40 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-slate-400 uppercase">Total Enquiries</span>
            <div className="p-2.5 rounded-xl bg-[#121824] text-[#F5C85B] border border-[#D6A84F]/20">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <div className="font-display font-extrabold text-3xl text-white group-hover:text-[#F5C85B] transition-colors">
            {totalEnquiries}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Form submissions</p>
        </div>

        {/* Unread Enquiries */}
        <div
          onClick={() => setActiveTab('enquiries')}
          className="p-6 rounded-2xl bg-[#0B0F16] border border-[#D6A84F]/40 shadow-lg cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-[#F5C85B] uppercase">Unread Enquiries</span>
            <div className="p-2.5 rounded-xl bg-[#121824] text-[#F5C85B] border border-[#D6A84F]/40">
              <Mail className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <div className="font-display font-extrabold text-3xl text-gold-gradient">
            {unreadEnquiries}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Requires admin review</p>
        </div>

      </div>

      {/* 3 Detailed Recent Activity Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Contact Enquiries */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#F5C85B]" />
              <h3 className="font-display font-bold text-lg text-white">Recent Project Enquiries</h3>
            </div>
            <button
              onClick={() => setActiveTab('enquiries')}
              className="text-xs font-mono text-[#F5C85B] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentEnquiries.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No contact enquiries received yet.</p>
            ) : (
              recentEnquiries.map((e) => (
                <div
                  key={e.id}
                  onClick={() => setActiveTab('enquiries')}
                  className="p-4 rounded-2xl bg-[#05070B] border border-white/5 hover:border-[#D6A84F]/30 transition-all cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="space-y-1 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white truncate">{e.fullName}</span>
                      {!e.read && (
                        <span className="px-2 py-0.5 rounded-full bg-[#D6A84F] text-[#05070B] text-[9px] font-bold uppercase">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 truncate">{e.email} • {e.projectType}</p>
                    <p className="text-[11px] text-slate-500 truncate">{e.company}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono text-slate-500 block">{e.date}</span>
                    <span className="text-xs font-mono text-[#F5C85B]">{e.budgetRange}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-[#F5C85B]" />
              <h3 className="font-display font-bold text-lg text-white">Recent Projects</h3>
            </div>
            <button
              onClick={() => setActiveTab('projects')}
              className="text-xs font-mono text-[#F5C85B] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Manage Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => setActiveTab('projects')}
                className="p-4 rounded-2xl bg-[#05070B] border border-white/5 hover:border-[#D6A84F]/30 transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{p.name}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#121824] border border-[#D6A84F]/30 text-[#F5C85B] text-[10px]">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">{p.shortDescription}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${p.published ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'}`}>
                    {p.published ? 'Published' : 'Hidden'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Activity Log */}
      <div className="p-6 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#F5C85B]" />
            <h3 className="font-display font-bold text-lg text-white">Recent Admin Activity</h3>
          </div>
          <button
            onClick={() => setActiveTab('activity-logs')}
            className="text-xs font-mono text-[#F5C85B] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View Audit Logs</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {recentLogs.map((log) => (
            <div
              key={log.id}
              className="p-3.5 rounded-xl bg-[#05070B] border border-white/5 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#D6A84F]" />
                <div>
                  <span className="font-bold text-white">{log.action}</span>
                  <span className="text-slate-400 font-normal"> — {log.targetItem}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-500 font-mono text-[11px]">
                <span>{log.adminEmail}</span>
                <span>{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
