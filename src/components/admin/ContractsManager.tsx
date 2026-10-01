import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { ContractRecord } from '../../types/cms';
import {
  FileCheck2,
  Plus,
  Printer,
  Trash2,
  Edit2,
  Eye,
  X,
  Search,
  Building,
  User,
  Calendar,
  IndianRupee,
  ShieldCheck,
  CheckCircle,
  FileSignature
} from 'lucide-react';

export const ContractsManager: React.FC = () => {
  const { contracts, clients, websiteSettings, companyInfo, addContract, updateContract, deleteContract } = useCms();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewingContract, setViewingContract] = useState<ContractRecord | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [deliverableInput, setDeliverableInput] = useState('');

  const [formData, setFormData] = useState<Omit<ContractRecord, 'id' | 'createdAt'>>({
    contractNumber: `ANX-CTR-${new Date().getFullYear()}-${String(contracts.length + 1).padStart(3, '0')}`,
    clientId: '',
    clientName: '',
    clientCompany: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    clientGstin: '',

    projectTitle: '',
    effectiveDate: new Date().toISOString().split('T')[0],
    deliveryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    totalAmount: 150000,
    advancePercentage: 40,
    advanceAmount: 60000,
    currency: 'INR',

    scopeOfWork: 'Engineering, design, development, and production deployment of custom software solution tailored to client requirements.',
    deliverables: [
      'Core Application Architecture & Responsive UI',
      'Backend API & Secure Database Modeling',
      'Cloud Deployment & SSL Configuration',
      '30-Day Post-Launch Warranty Support'
    ],
    paymentTerms: '40% advance upon contract execution; 40% on milestone beta delivery; 20% on final delivery and code transfer.',
    intellectualPropertyClause: '100% intellectual property rights, source code, and assets transfer to the Client upon receipt of 100% of agreed fees.',
    confidentialityClause: 'Both parties agree to keep all trade secrets, source code, business data, and financial terms strictly confidential.',
    warrantyPeriod: '60 Days complimentary technical support and bug fixes starting from production launch.',
    governingLaw: 'Laws of India, subject to the jurisdiction of competent courts in India.',

    status: 'Active',
    serviceProviderSignatory: 'Krishndas Chauhan',
    serviceProviderTitle: 'Founder & Lead Architect, Anivex Solution',
    clientSignatory: '',
    clientSignatoryTitle: 'Authorized Signatory',
    signedDate: new Date().toISOString().split('T')[0],
  });

  const handleSelectClient = (clientId: string) => {
    const c = clients.find((item) => item.id === clientId);
    if (c) {
      setFormData((prev) => ({
        ...prev,
        clientId: c.id,
        clientName: c.name,
        clientCompany: c.company,
        clientEmail: c.email,
        clientPhone: c.phone,
        clientAddress: c.address || '',
        clientGstin: c.gstin || '',
        clientSignatory: c.name,
      }));
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      contractNumber: `ANX-CTR-${new Date().getFullYear()}-${String(contracts.length + 1).padStart(3, '0')}`,
      clientId: '',
      clientName: '',
      clientCompany: '',
      clientEmail: '',
      clientPhone: '',
      clientAddress: '',
      clientGstin: '',

      projectTitle: '',
      effectiveDate: new Date().toISOString().split('T')[0],
      deliveryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      totalAmount: 150000,
      advancePercentage: 40,
      advanceAmount: 60000,
      currency: 'INR',

      scopeOfWork: 'Engineering, design, development, and production deployment of custom software solution tailored to client requirements.',
      deliverables: [
        'Core Application Architecture & Responsive UI',
        'Backend API & Secure Database Modeling',
        'Cloud Deployment & SSL Configuration',
        '30-Day Post-Launch Warranty Support'
      ],
      paymentTerms: '40% advance upon contract execution; 40% on milestone beta delivery; 20% on final delivery and code transfer.',
      intellectualPropertyClause: '100% intellectual property rights, source code, and assets transfer to the Client upon receipt of 100% of agreed fees.',
      confidentialityClause: 'Both parties agree to keep all trade secrets, source code, business data, and financial terms strictly confidential.',
      warrantyPeriod: '60 Days complimentary technical support and bug fixes starting from production launch.',
      governingLaw: 'Laws of India, subject to the jurisdiction of competent courts in India.',

      status: 'Active',
      serviceProviderSignatory: 'Krishndas Chauhan',
      serviceProviderTitle: 'Founder & Lead Architect, Anivex Solution',
      clientSignatory: '',
      clientSignatoryTitle: 'Authorized Signatory',
      signedDate: new Date().toISOString().split('T')[0],
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ctr: ContractRecord) => {
    setEditingId(ctr.id);
    setFormData({
      contractNumber: ctr.contractNumber,
      clientId: ctr.clientId || '',
      clientName: ctr.clientName,
      clientCompany: ctr.clientCompany,
      clientEmail: ctr.clientEmail,
      clientPhone: ctr.clientPhone,
      clientAddress: ctr.clientAddress,
      clientGstin: ctr.clientGstin || '',

      projectTitle: ctr.projectTitle,
      effectiveDate: ctr.effectiveDate,
      deliveryDate: ctr.deliveryDate,
      totalAmount: ctr.totalAmount,
      advancePercentage: ctr.advancePercentage,
      advanceAmount: ctr.advanceAmount,
      currency: ctr.currency,

      scopeOfWork: ctr.scopeOfWork,
      deliverables: [...ctr.deliverables],
      paymentTerms: ctr.paymentTerms,
      intellectualPropertyClause: ctr.intellectualPropertyClause,
      confidentialityClause: ctr.confidentialityClause,
      warrantyPeriod: ctr.warrantyPeriod,
      governingLaw: ctr.governingLaw,

      status: ctr.status,
      serviceProviderSignatory: ctr.serviceProviderSignatory,
      serviceProviderTitle: ctr.serviceProviderTitle,
      clientSignatory: ctr.clientSignatory,
      clientSignatoryTitle: ctr.clientSignatoryTitle,
      signedDate: ctr.signedDate || '',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateContract(editingId, formData);
    } else {
      await addContract(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteContract(id);
    setDeleteConfirmId(null);
    if (viewingContract?.id === id) setViewingContract(null);
  };

  const handleAddDeliverable = () => {
    if (deliverableInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        deliverables: [...prev.deliverables, deliverableInput.trim()]
      }));
      setDeliverableInput('');
    }
  };

  const handleRemoveDeliverable = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== idx)
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredContracts = contracts.filter((c) => {
    const matchesSearch =
      c.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.clientCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.projectTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="no-print print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#15803D]" />
            <span className="text-[11px] font-bold text-[#15803D] uppercase tracking-wider">LEGAL & CLIENT CONTRACTS</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-[#0B1F3A]">Client Service Agreements</h2>
          <p className="text-xs text-[#0B1F3A]/70 mt-1">
            Draft, manage, sign, and print executive client contracts with intellectual property terms and GST compliance.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Contract</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="no-print print:hidden flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white border border-[#0B1F3A]/10">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-[#0B1F3A]/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by contract number, client, company, project..."
            className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg pl-9 pr-4 py-2 text-xs text-[#0B1F3A] focus:outline-none focus:border-[#F97316]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#0B1F3A]/60 font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs font-semibold text-[#0B1F3A] focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Signed">Signed</option>
            <option value="Draft">Draft</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Contract List */}
      <div className="no-print print:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContracts.map((ctr) => (
          <div
            key={ctr.id}
            className="p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 shadow-xs flex flex-col justify-between hover:border-[#F97316]/40 transition-all card-warm-hover"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#F97316] font-mono tracking-wider">
                  {ctr.contractNumber}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  ctr.status === 'Signed' || ctr.status === 'Active'
                    ? 'bg-[#15803D]/10 text-[#15803D] border border-[#15803D]/20'
                    : 'bg-[#D4A72C]/15 text-[#B45309] border border-[#D4A72C]/30'
                }`}>
                  {ctr.status}
                </span>
              </div>

              <h3 className="font-heading font-bold text-lg text-[#0B1F3A] mb-1 leading-snug">
                {ctr.projectTitle}
              </h3>

              <div className="text-xs text-[#0B1F3A]/70 space-y-1 mb-4">
                <p className="font-medium text-[#0B1F3A]">Client: {ctr.clientName} ({ctr.clientCompany})</p>
                <p>Timeline: {ctr.effectiveDate} to {ctr.deliveryDate}</p>
                <p className="font-bold text-[#0B1F3A] text-sm pt-1">
                  ₹{ctr.totalAmount.toLocaleString('en-IN')} ({ctr.advancePercentage}% Advance: ₹{ctr.advanceAmount.toLocaleString('en-IN')})
                </p>
              </div>

              <div className="space-y-1 mb-4 border-t border-[#0B1F3A]/8 pt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B1F3A]/50 block">Deliverables ({ctr.deliverables.length})</span>
                <ul className="text-xs text-[#0B1F3A]/80 space-y-0.5 line-clamp-3">
                  {ctr.deliverables.slice(0, 3).map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#15803D]">✓</span>
                      <span className="truncate">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#0B1F3A]/8 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setViewingContract(ctr)}
                className="px-3 py-1.5 rounded-lg bg-[#0B1F3A] hover:bg-[#122b4d] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View & Print</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(ctr)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-[#0B1F3A]/70 hover:text-[#0B1F3A] cursor-pointer"
                  title="Edit Contract"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(ctr.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 cursor-pointer"
                  title="Delete Contract"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="no-print fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="p-6 rounded-2xl bg-white max-w-sm w-full space-y-4 text-center shadow-xl">
            <h3 className="font-heading font-bold text-lg text-[#0B1F3A]">Delete Contract?</h3>
            <p className="text-xs text-[#0B1F3A]/70">This will permanently remove this contract agreement record.</p>
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

      {/* Add / Edit Modal Drawer */}
      {isModalOpen && (
        <div className="no-print fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="p-6 sm:p-8 rounded-2xl bg-white max-w-3xl w-full my-8 space-y-6 shadow-2xl relative border border-[#0B1F3A]/10">
            <div className="flex items-center justify-between pb-4 border-b border-[#0B1F3A]/10">
              <div>
                <h3 className="font-heading font-bold text-xl text-[#0B1F3A]">
                  {editingId ? 'Edit Service Agreement' : 'Create New Client Contract'}
                </h3>
                <p className="text-xs text-[#0B1F3A]/60">Anivex Solution master software engineering contract generator.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-100 text-[#0B1F3A]/60 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              
              {/* Client Auto-Fill Selector */}
              {clients.length > 0 && (
                <div className="p-4 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/10">
                  <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
                    Quick Fill from Registered Clients:
                  </label>
                  <select
                    onChange={(e) => handleSelectClient(e.target.value)}
                    className="w-full bg-white border border-[#0B1F3A]/20 rounded-lg px-3 py-2 text-xs text-[#0B1F3A]"
                  >
                    <option value="">-- Choose an existing client to pre-fill --</option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} — {c.company} ({c.email})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1">Contract Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.contractNumber}
                    onChange={(e) => setFormData({ ...formData, contractNumber: e.target.value })}
                    className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.projectTitle}
                    onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                    placeholder="e.g. Multi-Warehouse ERP System"
                    className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
              </div>

              {/* Client Details */}
              <div className="p-4 rounded-xl bg-slate-50 border border-[#0B1F3A]/10 space-y-3">
                <h4 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">Client / Entity Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#0B1F3A]/70 mb-1">Client Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="e.g. Rajesh Varma"
                      className="w-full bg-white border border-[#0B1F3A]/15 rounded-lg px-3 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#0B1F3A]/70 mb-1">Client Company / Entity *</label>
                    <input
                      type="text"
                      required
                      value={formData.clientCompany}
                      onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                      placeholder="e.g. Apex Logistics India"
                      className="w-full bg-white border border-[#0B1F3A]/15 rounded-lg px-3 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#0B1F3A]/70 mb-1">Client Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      placeholder="rajesh@apexlogistics.in"
                      className="w-full bg-white border border-[#0B1F3A]/15 rounded-lg px-3 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#0B1F3A]/70 mb-1">Client Phone *</label>
                    <input
                      type="text"
                      required
                      value={formData.clientPhone}
                      onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                      placeholder="+91 98200 12345"
                      className="w-full bg-white border border-[#0B1F3A]/15 rounded-lg px-3 py-1.5 text-xs"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-[#0B1F3A]/70 mb-1">Client Official Address & GSTIN</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={formData.clientAddress}
                        onChange={(e) => setFormData({ ...formData, clientAddress: e.target.value })}
                        placeholder="Registered business address..."
                        className="sm:col-span-2 w-full bg-white border border-[#0B1F3A]/15 rounded-lg px-3 py-1.5 text-xs"
                      />
                      <input
                        type="text"
                        value={formData.clientGstin}
                        onChange={(e) => setFormData({ ...formData, clientGstin: e.target.value })}
                        placeholder="GSTIN (e.g. 07AAAAA0000A1Z5)"
                        className="w-full bg-white border border-[#0B1F3A]/15 rounded-lg px-3 py-1.5 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Financials & Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1">Effective Date</label>
                  <input
                    type="date"
                    value={formData.effectiveDate}
                    onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                    className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1">Delivery Target</label>
                  <input
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                    className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1">Total Value (₹)</label>
                  <input
                    type="number"
                    value={formData.totalAmount}
                    onChange={(e) => {
                      const total = parseFloat(e.target.value) || 0;
                      setFormData({
                        ...formData,
                        totalAmount: total,
                        advanceAmount: Math.round((total * formData.advancePercentage) / 100),
                      });
                    }}
                    className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1">Advance %</label>
                  <input
                    type="number"
                    value={formData.advancePercentage}
                    onChange={(e) => {
                      const pct = parseFloat(e.target.value) || 0;
                      setFormData({
                        ...formData,
                        advancePercentage: pct,
                        advanceAmount: Math.round((formData.totalAmount * pct) / 100),
                      });
                    }}
                    className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
              </div>

              {/* Scope of Work */}
              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1">Scope of Work *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.scopeOfWork}
                  onChange={(e) => setFormData({ ...formData, scopeOfWork: e.target.value })}
                  className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs"
                />
              </div>

              {/* Deliverables */}
              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1">Key Deliverables List</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={deliverableInput}
                    onChange={(e) => setDeliverableInput(e.target.value)}
                    placeholder="Add deliverable item..."
                    className="flex-1 bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddDeliverable}
                    className="px-4 py-2 rounded-lg bg-[#0B1F3A] text-white text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1">
                  {formData.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-xs text-[#0B1F3A]">
                      <span>{idx + 1}. {item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDeliverable(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal Terms & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1">IP Ownership Clause</label>
                  <textarea
                    rows={2}
                    value={formData.intellectualPropertyClause}
                    onChange={(e) => setFormData({ ...formData, intellectualPropertyClause: e.target.value })}
                    className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1">Contract Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs font-bold"
                  >
                    <option value="Active">Active</option>
                    <option value="Signed">Signed</option>
                    <option value="Draft">Draft</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#0B1F3A]/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-[#0B1F3A] text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold shadow-xs"
                >
                  Save Contract
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Contract Executive Preview */}
      {viewingContract && (
        <div id="printable-contract-modal" className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
          <div id="printable-contract-card" className="bg-white rounded-2xl max-w-4xl w-full my-6 p-6 sm:p-12 shadow-2xl relative border border-[#0B1F3A]/10 text-[#0B1F3A]">
            
            {/* Action Bar (Hidden during print) */}
            <div className="no-print print:hidden flex items-center justify-between pb-6 mb-6 border-b border-[#0B1F3A]/10">
              <span className="text-xs font-bold text-[#15803D] uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                <span>Service Agreement Ready for PDF / Print</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save as PDF</span>
                </button>
                <button
                  onClick={() => setViewingContract(null)}
                  className="p-2 rounded-xl hover:bg-slate-100 text-[#0B1F3A]/60"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Printable Body */}
            <div id="contract-print-view" className="space-y-8 font-sans">
              
              {/* Header Letterhead */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b-2 border-[#0B1F3A]">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#0B1F3A] flex items-center justify-center p-1.5">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                        <path d="M 20,80 L 50,20 L 80,80 M 35,55 L 65,55" fill="none" stroke="currentColor" strokeWidth="12" />
                        <path d="M 32,22 L 68,78" fill="none" stroke="#D4A72C" strokeWidth="8" />
                      </svg>
                    </div>
                    <span className="font-heading font-extrabold text-2xl text-[#0B1F3A] tracking-tight">
                      Anivex Solution
                    </span>
                  </div>
                  <p className="text-xs text-[#0B1F3A]/70 mt-1 font-medium">
                    Software Development, Custom Engineering & Cloud Solutions
                  </p>
                  <p className="text-[11px] text-[#0B1F3A]/60">
                    Email: {websiteSettings?.email || companyInfo?.businessEmail || ''} | Web: {websiteSettings?.websiteUrl || companyInfo?.websiteUrl || ''}
                  </p>
                </div>

                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-md bg-[#0B1F3A] text-white text-xs font-mono font-bold">
                    MASTER SERVICE AGREEMENT
                  </span>
                  <p className="font-mono text-xs font-bold text-[#F97316] mt-2">
                    {viewingContract.contractNumber}
                  </p>
                  <p className="text-[11px] text-[#0B1F3A]/60">
                    Date: {viewingContract.effectiveDate}
                  </p>
                </div>
              </div>

              {/* Agreement Parties */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/10 text-xs">
                <div>
                  <span className="font-bold uppercase text-[10px] text-[#0B1F3A]/50 block mb-1">SERVICE PROVIDER:</span>
                  <h4 className="font-bold text-sm text-[#0B1F3A]">{websiteSettings?.companyName || 'Anivex Solution'}</h4>
                  <p className="text-[#0B1F3A]/70">{websiteSettings?.address || 'Technology Engineering Studio, India'}</p>
                  <p className="text-[#0B1F3A]/70">Contact: {websiteSettings?.email || companyInfo?.businessEmail || ''} | {websiteSettings?.phone || companyInfo?.phone || ''}</p>
                </div>

                <div>
                  <span className="font-bold uppercase text-[10px] text-[#0B1F3A]/50 block mb-1">CLIENT:</span>
                  <h4 className="font-bold text-sm text-[#0B1F3A]">{viewingContract.clientName}</h4>
                  <p className="font-medium text-[#0B1F3A]">{viewingContract.clientCompany}</p>
                  <p className="text-[#0B1F3A]/70">{viewingContract.clientAddress || 'India'}</p>
                  {viewingContract.clientGstin && (
                    <p className="font-mono text-[11px] text-[#0B1F3A]/80">GSTIN: {viewingContract.clientGstin}</p>
                  )}
                  <p className="text-[#0B1F3A]/70">Email: {viewingContract.clientEmail} | Phone: {viewingContract.clientPhone}</p>
                </div>
              </div>

              {/* Contract Clauses */}
              <div className="space-y-5 text-xs text-[#0B1F3A]/85 leading-relaxed">
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#0B1F3A] mb-1">1. Project & Scope of Services</h4>
                  <p className="font-medium text-[#0B1F3A] mb-1">Project: {viewingContract.projectTitle}</p>
                  <p>{viewingContract.scopeOfWork}</p>
                </div>

                <div>
                  <h4 className="font-heading font-bold text-sm text-[#0B1F3A] mb-2">2. Key Deliverables & Specifications</h4>
                  <ul className="space-y-1 pl-4 list-disc">
                    {viewingContract.deliverables.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-heading font-bold text-sm text-[#0B1F3A] mb-1">3. Commercial Terms & Payment Schedule</h4>
                  <p className="mb-1">
                    Total Contract Consideration: <strong className="text-[#0B1F3A]">₹{viewingContract.totalAmount.toLocaleString('en-IN')}</strong> (INR).
                  </p>
                  <p className="mb-1">
                    Advance Payment Required ({viewingContract.advancePercentage}%): <strong className="text-[#F97316]">₹{viewingContract.advanceAmount.toLocaleString('en-IN')}</strong>.
                  </p>
                  <p>{viewingContract.paymentTerms}</p>
                </div>

                <div>
                  <h4 className="font-heading font-bold text-sm text-[#0B1F3A] mb-1">4. Intellectual Property Rights (100% Client Ownership)</h4>
                  <p>{viewingContract.intellectualPropertyClause}</p>
                </div>

                <div>
                  <h4 className="font-heading font-bold text-sm text-[#0B1F3A] mb-1">5. Confidentiality & Non-Disclosure</h4>
                  <p>{viewingContract.confidentialityClause}</p>
                </div>

                <div>
                  <h4 className="font-heading font-bold text-sm text-[#0B1F3A] mb-1">6. Warranty Period & Post-Launch Support</h4>
                  <p>{viewingContract.warrantyPeriod}</p>
                </div>

                <div>
                  <h4 className="font-heading font-bold text-sm text-[#0B1F3A] mb-1">7. Governing Law & Dispute Resolution</h4>
                  <p>{viewingContract.governingLaw}</p>
                </div>
              </div>

              {/* Signatures */}
              <div className="pt-8 border-t border-[#0B1F3A]/20 grid grid-cols-2 gap-12 text-xs">
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#0B1F3A]/50 mb-1">SIGNED FOR & ON BEHALF OF ANIVEX SOLUTION:</p>
                  <div className="h-14 flex items-end">
                    <span className="font-serif italic font-bold text-base text-[#0B1F3A]">{viewingContract.serviceProviderSignatory}</span>
                  </div>
                  <div className="border-t border-[#0B1F3A]/30 pt-1">
                    <p className="font-bold text-[#0B1F3A]">{viewingContract.serviceProviderSignatory}</p>
                    <p className="text-[#0B1F3A]/70">{viewingContract.serviceProviderTitle}</p>
                    <p className="text-[10px] text-[#0B1F3A]/50">Date: {viewingContract.signedDate || viewingContract.effectiveDate}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase font-bold text-[#0B1F3A]/50 mb-1">SIGNED FOR & ON BEHALF OF CLIENT:</p>
                  <div className="h-14 flex items-end">
                    <span className="font-serif italic font-bold text-base text-[#0B1F3A]">{viewingContract.clientSignatory || viewingContract.clientName}</span>
                  </div>
                  <div className="border-t border-[#0B1F3A]/30 pt-1">
                    <p className="font-bold text-[#0B1F3A]">{viewingContract.clientSignatory || viewingContract.clientName}</p>
                    <p className="text-[#0B1F3A]/70">{viewingContract.clientSignatoryTitle || 'Managing Director'}</p>
                    <p className="text-[10px] text-[#0B1F3A]/50">Date: {viewingContract.signedDate || viewingContract.effectiveDate}</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
