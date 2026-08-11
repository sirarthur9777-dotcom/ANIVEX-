import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { ContactEnquiry } from '../../types/cms';
import { Mail, Search, Eye, Trash2, CheckCircle2, Clock, X, User, Phone, Building, Calendar, DollarSign, Filter } from 'lucide-react';

export const EnquiriesManager: React.FC = () => {
  const { contactEnquiries, markEnquiryRead, updateEnquiryStatus, deleteEnquiry } = useCms();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiry | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredEnquiries = contactEnquiries.filter((e) => {
    const matchesSearch =
      e.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.company && e.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      e.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || e.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOpenDetail = async (e: ContactEnquiry) => {
    setSelectedEnquiry(e);
    if (!e.read) {
      await markEnquiryRead(e.id, true);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteEnquiry(id);
    setDeleteConfirmId(null);
    if (selectedEnquiry?.id === id) {
      setSelectedEnquiry(null);
    }
  };

  const statusColors: Record<ContactEnquiry['status'], string> = {
    New: 'bg-amber-950/80 border-amber-500/40 text-amber-300',
    Contacted: 'bg-blue-950/80 border-blue-500/40 text-blue-300',
    'In Discussion': 'bg-purple-950/80 border-purple-500/40 text-purple-300',
    Converted: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300',
    Closed: 'bg-slate-800 border-slate-600 text-slate-400',
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="p-6 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl text-white">Project Scoping & Contact Enquiries</h2>
          <p className="text-xs text-slate-400 mt-1">Review incoming leads submitted from the public contact form.</p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search leads by name, email..."
              className="w-full bg-[#05070B] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#05070B] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-300 font-mono"
          >
            <option value="ALL">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="In Discussion">In Discussion</option>
            <option value="Converted">Converted</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Enquiries Grid / Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12 space-y-3">
          {filteredEnquiries.length === 0 ? (
            <div className="p-12 rounded-3xl bg-[#0B0F16] border border-white/10 text-center text-slate-400 space-y-2">
              <Mail className="w-8 h-8 text-[#D6A84F] mx-auto opacity-50" />
              <p className="text-sm font-semibold text-white">No contact enquiries match your query.</p>
              <p className="text-xs">When users submit the contact form, their requests will appear here instantly.</p>
            </div>
          ) : (
            filteredEnquiries.map((enquiry) => (
              <div
                key={enquiry.id}
                className={`p-5 rounded-2xl bg-[#0B0F16] border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg ${
                  !enquiry.read
                    ? 'border-[#D6A84F]/60 bg-[#0B0F16]'
                    : 'border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-start gap-4 overflow-hidden">
                  <div
                    className={`p-3 rounded-xl shrink-0 font-mono text-xs font-bold ${
                      !enquiry.read ? 'bg-[#D6A84F] text-[#05070B]' : 'bg-[#121824] text-slate-400'
                    }`}
                  >
                    {!enquiry.read ? 'NEW' : 'READ'}
                  </div>

                  <div className="space-y-1 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-base text-white">{enquiry.fullName}</span>
                      <span className="text-xs font-mono text-slate-400">({enquiry.email})</span>
                      <span className="text-[10px] font-mono text-slate-500">ID: {enquiry.id}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                      <span className="font-semibold text-[#F5C85B]">{enquiry.projectType}</span>
                      <span>•</span>
                      <span>{enquiry.company || 'Individual'}</span>
                      <span>•</span>
                      <span className="font-mono text-emerald-400">{enquiry.budgetRange}</span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-1 italic">{enquiry.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                  <div className="text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${statusColors[enquiry.status]}`}>
                      {enquiry.status}
                    </span>
                    <span className="block text-[10px] font-mono text-slate-500 mt-1">{enquiry.date} {enquiry.time}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenDetail(enquiry)}
                      className="px-3.5 py-2 rounded-xl bg-[#121824] border border-[#D6A84F]/40 text-[#F5C85B] font-semibold text-xs flex items-center gap-1.5 hover:bg-[#121824]/80 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review Details</span>
                    </button>

                    <button
                      onClick={() => setDeleteConfirmId(enquiry.id)}
                      className="p-2 rounded-xl bg-red-950/40 border border-red-500/20 text-red-400 hover:bg-red-900/40 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="p-8 rounded-3xl bg-[#0B0F16] border border-[#D6A84F]/50 max-w-2xl w-full my-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#121824] border border-[#D6A84F]/30 text-[#F5C85B]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white">Lead Enquiry Details</h3>
                  <p className="text-xs font-mono text-[#F5C85B]">Ref ID: {selectedEnquiry.id}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 rounded-xl bg-[#121824] text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#05070B] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">FULL NAME</span>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#F5C85B]" />
                  <span>{selectedEnquiry.fullName}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#05070B] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">EMAIL ADDRESS</span>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#F5C85B]" />
                  <a href={`mailto:${selectedEnquiry.email}`} className="hover:underline">{selectedEnquiry.email}</a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#05070B] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">PHONE</span>
                <div className="text-xs font-semibold text-white flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#F5C85B]" />
                  <span>{selectedEnquiry.phone || 'Not provided'}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#05070B] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">COMPANY / ORGANIZATION</span>
                <div className="text-xs font-semibold text-white flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-[#F5C85B]" />
                  <span>{selectedEnquiry.company || 'Individual / Startup'}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#05070B] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">PROJECT TYPE</span>
                <div className="text-xs font-bold text-[#F5C85B]">{selectedEnquiry.projectType}</div>
              </div>

              <div className="p-4 rounded-xl bg-[#05070B] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">BUDGET RANGE</span>
                <div className="text-xs font-bold text-emerald-400">{selectedEnquiry.budgetRange}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#05070B] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase">PROJECT DESCRIPTION / SCOPE</span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal whitespace-pre-line">
                {selectedEnquiry.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-mono text-slate-400">Update Lead Status:</span>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => {
                    const st = e.target.value as ContactEnquiry['status'];
                    updateEnquiryStatus(selectedEnquiry.id, st);
                    setSelectedEnquiry({ ...selectedEnquiry, status: st });
                  }}
                  className="bg-[#05070B] border border-[#D6A84F]/40 rounded-xl px-3 py-1.5 text-xs text-[#F5C85B] font-bold"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Discussion">In Discussion</option>
                  <option value="Converted">Converted</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <a
                  href={`mailto:${selectedEnquiry.email}?subject=RE:%20ANIVEX%20Solutions%20Project%20Inquiry%20[${selectedEnquiry.id}]`}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#F5C85B] text-[#05070B] font-bold text-xs flex items-center gap-1.5 hover:opacity-90"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>

                <button
                  onClick={() => setDeleteConfirmId(selectedEnquiry.id)}
                  className="px-4 py-2.5 rounded-xl bg-red-950/40 border border-red-500/20 text-red-400 font-semibold text-xs hover:bg-red-900/40 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="p-6 rounded-3xl bg-[#0B0F16] border border-red-500/40 max-w-sm w-full space-y-4 text-center">
            <h3 className="font-display font-bold text-lg text-white">Delete Enquiry</h3>
            <p className="text-xs text-slate-300">Are you sure you want to permanently delete this lead record?</p>
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
    </div>
  );
};
