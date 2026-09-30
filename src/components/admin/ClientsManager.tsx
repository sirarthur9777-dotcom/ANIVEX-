import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { ClientRecord } from '../../types/cms';
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  Search,
  Building,
  Mail,
  Phone,
  MapPin,
  FileCheck2,
  FileSpreadsheet,
  X
} from 'lucide-react';
import { AdminTab } from './AdminSidebar';

interface ClientsManagerProps {
  onNavigateToTab?: (tab: AdminTab) => void;
}

export const ClientsManager: React.FC<ClientsManagerProps> = ({ onNavigateToTab }) => {
  const { clients, addClient, updateClient, deleteClient } = useCms();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<ClientRecord, 'id' | 'createdAt'>>({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    gstin: '',
    city: '',
    state: '',
    notes: '',
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      address: '',
      gstin: '',
      city: '',
      state: '',
      notes: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: ClientRecord) => {
    setEditingId(c.id);
    setFormData({
      name: c.name,
      company: c.company,
      email: c.email,
      phone: c.phone,
      address: c.address || '',
      gstin: c.gstin || '',
      city: c.city || '',
      state: c.state || '',
      notes: c.notes || '',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateClient(editingId, formData);
    } else {
      await addClient(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteClient(id);
    setDeleteConfirmId(null);
  };

  const filteredClients = clients.filter((c) => {
    const s = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(s) ||
      c.company.toLowerCase().includes(s) ||
      c.email.toLowerCase().includes(s) ||
      c.phone.toLowerCase().includes(s) ||
      (c.city && c.city.toLowerCase().includes(s))
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#15803D]" />
            <span className="text-[11px] font-bold text-[#15803D] uppercase tracking-wider">CLIENT ACCOUNTS DIRECTORY</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-[#0B1F3A]">Clients & Enterprise Entities</h2>
          <p className="text-xs text-[#0B1F3A]/70 mt-1">
            Maintain client records, GST numbers, and jump straight into generating contracts or quotations.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Client</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-xl bg-white border border-[#0B1F3A]/10">
        <div className="relative">
          <Search className="w-4 h-4 text-[#0B1F3A]/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search clients by name, company, email, phone, city..."
            className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg pl-9 pr-4 py-2 text-xs text-[#0B1F3A] focus:outline-none focus:border-[#F97316]"
          />
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 shadow-xs flex flex-col justify-between hover:border-[#F97316]/40 transition-all card-warm-hover"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B1F3A] text-white font-heading font-bold text-sm flex items-center justify-center shrink-0">
                  {client.name.charAt(0)}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(client)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-[#0B1F3A]/70 hover:text-[#0B1F3A] cursor-pointer"
                    title="Edit Client"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(client.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 cursor-pointer"
                    title="Delete Client"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="font-heading font-bold text-lg text-[#0B1F3A] leading-snug">
                {client.name}
              </h3>
              <p className="text-xs font-semibold text-[#F97316] mb-3">
                {client.company}
              </p>

              <div className="space-y-1.5 text-xs text-[#0B1F3A]/70">
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#0B1F3A]/50 shrink-0" />
                  <span className="truncate">{client.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#0B1F3A]/50 shrink-0" />
                  <span>{client.phone}</span>
                </p>
                {client.address && (
                  <p className="flex items-start gap-2 pt-1 border-t border-[#0B1F3A]/8">
                    <MapPin className="w-3.5 h-3.5 text-[#0B1F3A]/50 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{client.address}</span>
                  </p>
                )}
                {client.gstin && (
                  <p className="text-[11px] font-mono text-[#0B1F3A]/80 font-medium">
                    GSTIN: {client.gstin}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-[#0B1F3A]/8 flex items-center justify-between gap-2 mt-4">
              <button
                type="button"
                onClick={() => onNavigateToTab && onNavigateToTab('contracts')}
                className="px-2.5 py-1.5 rounded-lg bg-[#0B1F3A]/5 hover:bg-[#0B1F3A]/10 text-[#0B1F3A] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                title="Create Contract for this client"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-[#15803D]" />
                <span>Contract</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToTab && onNavigateToTab('quotations')}
                className="px-2.5 py-1.5 rounded-lg bg-[#F97316]/10 hover:bg-[#F97316]/20 text-[#EA580C] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                title="Create Quotation for this client"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#F97316]" />
                <span>Quotation</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="p-6 rounded-2xl bg-white max-w-sm w-full space-y-4 text-center shadow-xl">
            <h3 className="font-heading font-bold text-lg text-[#0B1F3A]">Delete Client?</h3>
            <p className="text-xs text-[#0B1F3A]/70">This will remove this client from your quick lookup directory.</p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 text-xs font-semibold text-[#0B1F3A]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Client Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="p-6 sm:p-8 rounded-2xl bg-white max-w-lg w-full my-8 space-y-5 shadow-2xl relative border border-[#0B1F3A]/10">
            <div className="flex items-center justify-between pb-3 border-b border-[#0B1F3A]/10">
              <h3 className="font-heading font-bold text-xl text-[#0B1F3A]">
                {editingId ? 'Edit Client Record' : 'Add Client to Directory'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-[#0B1F3A]/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1">Client Contact Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rajesh Varma"
                  className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1">Company / Organization *</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Apex Logistics India"
                  className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rajesh@apex.in"
                    className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1">Phone *</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98200 12345"
                    className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1">Office Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street, locality, pin code..."
                  className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Gurugram"
                    className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="e.g. Haryana"
                    className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1">GSTIN</label>
                  <input
                    type="text"
                    value={formData.gstin}
                    onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                    placeholder="GST Number"
                    className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#0B1F3A]/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-[#0B1F3A] text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold shadow-xs"
                >
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
