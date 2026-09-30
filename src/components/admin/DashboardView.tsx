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
  Activity,
  Users,
  FileCheck2,
  FileSpreadsheet,
  FileText
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
    contracts,
    quotations,
    clients
  } = useCms();

  const totalProjects = projects.length;
  const totalProducts = products.length;
  const totalServices = services.length;
  const totalSolutions = solutions.length;
  const totalClients = clients.length;
  const totalContracts = contracts.length;
  const totalQuotations = quotations.length;

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
    <div className="space-y-8 font-sans">
      
      {/* Top Banner with Quick Actions */}
      <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B1F3A] via-[#122A4E] to-[#0B1F3A] border border-[#0B1F3A]/20 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-white">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono text-[#F97316] font-bold uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />
            <span>ANIVEX SOLUTION CMS DASHBOARD</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Welcome back, <span className="text-[#F97316]">Krishndas Chauhan</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl font-normal leading-relaxed">
            Manage public website content, draft client agreements, generate GST quotations, review enquiries, and monitor studio metrics in real time.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActiveTab('contracts')}
            className="px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>New Contract</span>
          </button>

          <button
            onClick={() => setActiveTab('quotations')}
            className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#D4A72C]" />
            <span>New Quotation</span>
          </button>

          <button
            onClick={() => setActiveTab('clients')}
            className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Clients ({totalClients})</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
          >
            <Mail className="w-4 h-4 text-[#F97316]" />
            <span>Enquiries ({unreadEnquiries})</span>
          </button>
        </div>
      </div>

      {/* 8 Statistics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Clients */}
        <div
          onClick={() => setActiveTab('clients')}
          className="p-5 sm:p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 hover:border-[#F97316]/40 transition-all cursor-pointer group shadow-xs"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-[#0B1F3A]/60 uppercase tracking-wider">Clients</span>
            <div className="p-2 rounded-xl bg-[#0B1F3A]/5 text-[#0B1F3A] group-hover:bg-[#F97316]/10 group-hover:text-[#F97316] transition-colors">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-3xl text-[#0B1F3A]">
            {totalClients}
          </div>
          <p className="text-[11px] text-[#0B1F3A]/60 mt-1.5">Registered client directory</p>
        </div>

        {/* Client Contracts */}
        <div
          onClick={() => setActiveTab('contracts')}
          className="p-5 sm:p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 hover:border-[#F97316]/40 transition-all cursor-pointer group shadow-xs"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-[#0B1F3A]/60 uppercase tracking-wider">Contracts</span>
            <div className="p-2 rounded-xl bg-[#15803D]/10 text-[#15803D]">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-3xl text-[#0B1F3A]">
            {totalContracts}
          </div>
          <p className="text-[11px] text-[#0B1F3A]/60 mt-1.5">PDF agreements generated</p>
        </div>

        {/* Project Quotations */}
        <div
          onClick={() => setActiveTab('quotations')}
          className="p-5 sm:p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 hover:border-[#F97316]/40 transition-all cursor-pointer group shadow-xs"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-[#0B1F3A]/60 uppercase tracking-wider">Quotations</span>
            <div className="p-2 rounded-xl bg-[#D4A72C]/10 text-[#D4A72C]">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-3xl text-[#0B1F3A]">
            {totalQuotations}
          </div>
          <p className="text-[11px] text-[#0B1F3A]/60 mt-1.5">GST estimates & proposals</p>
        </div>

        {/* Total Enquiries */}
        <div
          onClick={() => setActiveTab('enquiries')}
          className="p-5 sm:p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 hover:border-[#F97316]/40 transition-all cursor-pointer group shadow-xs"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-[#0B1F3A]/60 uppercase tracking-wider">Enquiries</span>
            <div className="p-2 rounded-xl bg-[#F97316]/10 text-[#F97316]">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-3xl text-[#0B1F3A] flex items-center gap-2">
            <span>{totalEnquiries}</span>
            {unreadEnquiries > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#F97316] text-white font-bold">
                {unreadEnquiries} new
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#0B1F3A]/60 mt-1.5">Website leads & scopes</p>
        </div>

        {/* Total Projects */}
        <div
          onClick={() => setActiveTab('projects')}
          className="p-5 sm:p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 hover:border-[#0B1F3A]/30 transition-all cursor-pointer group shadow-xs"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-[#0B1F3A]/60 uppercase tracking-wider">Projects</span>
            <div className="p-2 rounded-xl bg-slate-100 text-[#0B1F3A]">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-3xl text-[#0B1F3A]">
            {totalProjects}
          </div>
          <p className="text-[11px] text-[#0B1F3A]/60 mt-1.5">Portfolio case studies</p>
        </div>

        {/* Total Products */}
        <div
          onClick={() => setActiveTab('products')}
          className="p-5 sm:p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 hover:border-[#0B1F3A]/30 transition-all cursor-pointer group shadow-xs"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-[#0B1F3A]/60 uppercase tracking-wider">Products</span>
            <div className="p-2 rounded-xl bg-slate-100 text-[#0B1F3A]">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-3xl text-[#0B1F3A]">
            {totalProducts}
          </div>
          <p className="text-[11px] text-[#0B1F3A]/60 mt-1.5">PolicyHub, VyaparDesk, etc.</p>
        </div>

        {/* Total Services */}
        <div
          onClick={() => setActiveTab('services')}
          className="p-5 sm:p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 hover:border-[#0B1F3A]/30 transition-all cursor-pointer group shadow-xs"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-[#0B1F3A]/60 uppercase tracking-wider">Services</span>
            <div className="p-2 rounded-xl bg-slate-100 text-[#0B1F3A]">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-3xl text-[#0B1F3A]">
            {totalServices}
          </div>
          <p className="text-[11px] text-[#0B1F3A]/60 mt-1.5">Engineering verticals</p>
        </div>

        {/* Live Published Items */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#15803D]/20 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-[#15803D] uppercase tracking-wider">Live Website</span>
            <div className="p-2 rounded-xl bg-[#15803D]/10 text-[#15803D]">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-3xl text-[#15803D]">
            {publishedCount}
          </div>
          <p className="text-[11px] text-[#0B1F3A]/60 mt-1.5">Active published assets</p>
        </div>

      </div>

      {/* 2 Detailed Recent Activity Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Contact Enquiries */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#0B1F3A]/10">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#F97316]" />
              <h3 className="font-heading font-bold text-lg text-[#0B1F3A]">Recent Client Enquiries</h3>
            </div>
            <button
              onClick={() => setActiveTab('enquiries')}
              className="text-xs font-bold text-[#F97316] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentEnquiries.length === 0 ? (
              <p className="text-xs text-[#0B1F3A]/60 py-6 text-center">No contact enquiries received yet.</p>
            ) : (
              recentEnquiries.map((e) => (
                <div
                  key={e.id}
                  onClick={() => setActiveTab('enquiries')}
                  className="p-4 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/8 hover:border-[#F97316]/30 transition-all cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="space-y-1 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#0B1F3A] truncate">{e.fullName}</span>
                      {!e.read && (
                        <span className="px-2 py-0.5 rounded-full bg-[#F97316] text-white text-[9px] font-bold uppercase">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#0B1F3A]/70 truncate">{e.email} • {e.projectType}</p>
                    <p className="text-[11px] text-[#0B1F3A]/60 truncate">{e.company}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono text-[#0B1F3A]/50 block">{e.date}</span>
                    <span className="text-xs font-bold text-[#F97316]">{e.budgetRange}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Contracts & Quotations */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#0B1F3A]/10">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-[#15803D]" />
              <h3 className="font-heading font-bold text-lg text-[#0B1F3A]">Contracts & Agreements</h3>
            </div>
            <button
              onClick={() => setActiveTab('contracts')}
              className="text-xs font-bold text-[#15803D] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Manage Contracts</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {contracts.length === 0 ? (
              <div className="p-6 text-center bg-[#FFFDF7] rounded-xl border border-dashed border-[#0B1F3A]/15">
                <p className="text-xs text-[#0B1F3A]/70">No client agreements created yet.</p>
                <button
                  onClick={() => setActiveTab('contracts')}
                  className="mt-2 text-xs font-bold text-[#F97316] hover:underline cursor-pointer"
                >
                  + Create your first client contract
                </button>
              </div>
            ) : (
              contracts.slice(0, 5).map((c) => (
                <div
                  key={c.id}
                  onClick={() => setActiveTab('contracts')}
                  className="p-4 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/8 hover:border-[#15803D]/30 transition-all cursor-pointer flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#0B1F3A]">{c.clientName}</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[#0B1F3A] text-[10px] font-mono">
                        {c.contractNumber}
                      </span>
                    </div>
                    <p className="text-xs text-[#0B1F3A]/70 mt-1 line-clamp-1">{c.projectTitle || c.clientCompany}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-[#15803D] block">
                      ₹{c.totalAmount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] font-mono text-[#0B1F3A]/60">
                      {c.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Recent Activity Log */}
      <div className="p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-[#0B1F3A]/10">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#F97316]" />
            <h3 className="font-heading font-bold text-lg text-[#0B1F3A]">System Activity & Audit Log</h3>
          </div>
          <button
            onClick={() => setActiveTab('activity-logs')}
            className="text-xs font-bold text-[#F97316] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Logs</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {recentLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#F97316]" />
                <div>
                  <span className="font-bold text-[#0B1F3A]">{log.action}</span>
                  <span className="text-[#0B1F3A]/70 font-normal"> — {log.targetItem}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[#0B1F3A]/50 font-mono text-[11px]">
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
