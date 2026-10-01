import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { QuotationRecord, QuotationLineItem } from '../../types/cms';
import {
  FileSpreadsheet,
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
  CheckCircle,
  FileText,
  Clock
} from 'lucide-react';

export const QuotationsManager: React.FC = () => {
  const { quotations, clients, websiteSettings, companyInfo, paymentSettings, addQuotation, updateQuotation, deleteQuotation } = useCms();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewingQuotation, setViewingQuotation] = useState<QuotationRecord | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [itemDescription, setItemDescription] = useState('');
  const [itemDetails, setItemDetails] = useState('');
  const [itemQty, setItemQty] = useState(1);
  const [itemPrice, setItemPrice] = useState(25000);

  const [formData, setFormData] = useState<Omit<QuotationRecord, 'id' | 'createdAt'>>({
    quotationNumber: `ANX-QTN-${new Date().getFullYear()}-${String(quotations.length + 1).padStart(3, '0')}`,
    quotationDate: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    clientId: '',
    clientName: '',
    clientCompany: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    clientGstin: '',

    projectTitle: '',
    executiveSummary: '',
    lineItems: [
      {
        id: 'li-1',
        description: 'System Architecture & Responsive UI Design',
        details: 'Tailwind CSS, high-fidelity responsive design system, and prototype',
        quantity: 1,
        unitPrice: 40000,
        amount: 40000,
      },
      {
        id: 'li-2',
        description: 'Core Backend Development & Database Modeling',
        details: 'API endpoints, role authorization, and database synchronization',
        quantity: 1,
        unitPrice: 60000,
        amount: 60000,
      }
    ],
    subtotal: 100000,
    gstRate: 18,
    gstAmount: 18000,
    discountAmount: 0,
    totalAmount: 118000,
    currency: 'INR',

    estimatedTimeline: '4 to 6 Weeks',
    milestones: [
      { title: 'Milestone 1: Prototype & Technical Spec', percentage: 40, description: 'Kickoff advance and approval of architecture design.' },
      { title: 'Milestone 2: Beta Release & User Acceptance', percentage: 40, description: 'Core functional modules ready for staging review.' },
      { title: 'Milestone 3: Final Launch & Handover', percentage: 20, description: 'Production deployment and source code transfer.' }
    ],
    termsAndConditions: '1. Estimate valid for 30 days from issue date. 2. 18% GST applicable. 3. 60-day post-launch warranty included. 4. Source code IP transferred upon full payment.',
    status: 'Sent',
  });

  const calculateTotals = (items: QuotationLineItem[], discount: number = 0, gstRate: number = 18) => {
    const sub = items.reduce((sum, item) => sum + item.amount, 0);
    const taxable = Math.max(0, sub - discount);
    const gst = Math.round((taxable * gstRate) / 100);
    const grand = taxable + gst;
    return { subtotal: sub, gstAmount: gst, totalAmount: grand };
  };

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
      }));
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    const items = [
      {
        id: `li-${Date.now()}-1`,
        description: 'Custom Software Architecture & UI Engineering',
        details: 'High-speed frontend, responsive layouts, and interactive workflows',
        quantity: 1,
        unitPrice: 50000,
        amount: 50000,
      },
      {
        id: `li-${Date.now()}-2`,
        description: 'Backend Engine & Database Integration',
        details: 'Node.js, PostgreSQL/Firebase, security roles, and cloud hosting',
        quantity: 1,
        unitPrice: 50000,
        amount: 50000,
      }
    ];
    const { subtotal, gstAmount, totalAmount } = calculateTotals(items, 0, 18);

    setFormData({
      quotationNumber: `ANX-QTN-${new Date().getFullYear()}-${String(quotations.length + 1).padStart(3, '0')}`,
      quotationDate: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      clientId: '',
      clientName: '',
      clientCompany: '',
      clientEmail: '',
      clientPhone: '',
      clientAddress: '',
      clientGstin: '',

      projectTitle: '',
      executiveSummary: '',
      lineItems: items,
      subtotal,
      gstRate: 18,
      gstAmount,
      discountAmount: 0,
      totalAmount,
      currency: 'INR',

      estimatedTimeline: '4 to 6 Weeks',
      milestones: [
        { title: 'Milestone 1: Prototype & Technical Spec', percentage: 40, description: 'Kickoff advance and approval of architecture design.' },
        { title: 'Milestone 2: Beta Release & User Acceptance', percentage: 40, description: 'Core functional modules ready for staging review.' },
        { title: 'Milestone 3: Final Launch & Handover', percentage: 20, description: 'Production deployment and source code transfer.' }
      ],
      termsAndConditions: '1. Estimate valid for 30 days. 2. 18% GST applicable. 3. 60-day post-launch warranty included. 4. Source code IP transferred upon full payment.',
      status: 'Sent',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (qtn: QuotationRecord) => {
    setEditingId(qtn.id);
    setFormData({
      quotationNumber: qtn.quotationNumber,
      quotationDate: qtn.quotationDate,
      validUntil: qtn.validUntil,
      clientId: qtn.clientId || '',
      clientName: qtn.clientName,
      clientCompany: qtn.clientCompany,
      clientEmail: qtn.clientEmail,
      clientPhone: qtn.clientPhone,
      clientAddress: qtn.clientAddress,
      clientGstin: qtn.clientGstin || '',

      projectTitle: qtn.projectTitle,
      executiveSummary: qtn.executiveSummary,
      lineItems: [...qtn.lineItems],
      subtotal: qtn.subtotal,
      gstRate: qtn.gstRate || 18,
      gstAmount: qtn.gstAmount,
      discountAmount: qtn.discountAmount || 0,
      totalAmount: qtn.totalAmount,
      currency: qtn.currency,

      estimatedTimeline: qtn.estimatedTimeline,
      milestones: [...qtn.milestones],
      termsAndConditions: qtn.termsAndConditions,
      status: qtn.status,
    });
    setIsModalOpen(true);
  };

  const handleAddLineItem = () => {
    if (itemDescription.trim() && itemPrice > 0) {
      const newItem: QuotationLineItem = {
        id: `li-${Date.now()}`,
        description: itemDescription.trim(),
        details: itemDetails.trim(),
        quantity: itemQty,
        unitPrice: itemPrice,
        amount: itemQty * itemPrice,
      };

      const updatedItems = [...formData.lineItems, newItem];
      const { subtotal, gstAmount, totalAmount } = calculateTotals(updatedItems, formData.discountAmount, formData.gstRate);

      setFormData((prev) => ({
        ...prev,
        lineItems: updatedItems,
        subtotal,
        gstAmount,
        totalAmount,
      }));

      setItemDescription('');
      setItemDetails('');
      setItemQty(1);
      setItemPrice(25000);
    }
  };

  const handleRemoveLineItem = (idx: number) => {
    const updatedItems = formData.lineItems.filter((_, i) => i !== idx);
    const { subtotal, gstAmount, totalAmount } = calculateTotals(updatedItems, formData.discountAmount, formData.gstRate);

    setFormData((prev) => ({
      ...prev,
      lineItems: updatedItems,
      subtotal,
      gstAmount,
      totalAmount,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateQuotation(editingId, formData);
    } else {
      await addQuotation(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteQuotation(id);
    setDeleteConfirmId(null);
    if (viewingQuotation?.id === id) setViewingQuotation(null);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredQuotations = quotations.filter((q) => {
    const matchesSearch =
      q.quotationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.clientCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.projectTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="no-print print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#F97316]" />
            <span className="text-[11px] font-bold text-[#F97316] uppercase tracking-wider">PROJECT ESTIMATES & QUOTATIONS</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-[#0B1F3A]">Quotations & Scope Estimates</h2>
          <p className="text-xs text-[#0B1F3A]/70 mt-1">
            Generate formal itemized project proposals with 18% GST tax breakdown and printable PDF exports.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Quotation</span>
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
            placeholder="Search by quote number, client, company, project..."
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
            <option value="Sent">Sent</option>
            <option value="Accepted">Accepted</option>
            <option value="Draft">Draft</option>
            <option value="Declined">Declined</option>
            <option value="Invoiced">Invoiced</option>
          </select>
        </div>
      </div>

      {/* Quotation List */}
      <div className="no-print print:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuotations.map((qtn) => (
          <div
            key={qtn.id}
            className="p-6 rounded-2xl bg-white border border-[#0B1F3A]/10 shadow-xs flex flex-col justify-between hover:border-[#F97316]/40 transition-all card-warm-hover"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#F97316] font-mono tracking-wider">
                  {qtn.quotationNumber}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  qtn.status === 'Accepted'
                    ? 'bg-[#15803D]/10 text-[#15803D] border border-[#15803D]/20'
                    : 'bg-[#D4A72C]/15 text-[#B45309] border border-[#D4A72C]/30'
                }`}>
                  {qtn.status}
                </span>
              </div>

              <h3 className="font-heading font-bold text-lg text-[#0B1F3A] mb-1 leading-snug">
                {qtn.projectTitle}
              </h3>

              <div className="text-xs text-[#0B1F3A]/70 space-y-1 mb-4">
                <p className="font-medium text-[#0B1F3A]">Client: {qtn.clientName} ({qtn.clientCompany})</p>
                <p>Valid Until: {qtn.validUntil}</p>
                <div className="pt-2">
                  <span className="text-[11px] text-[#0B1F3A]/60 block">Total with 18% GST:</span>
                  <span className="font-extrabold text-[#0B1F3A] text-lg font-heading">
                    ₹{qtn.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="space-y-1 mb-4 border-t border-[#0B1F3A]/8 pt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B1F3A]/50 block">Line Items ({qtn.lineItems.length})</span>
                <ul className="text-xs text-[#0B1F3A]/80 space-y-1">
                  {qtn.lineItems.map((li, i) => (
                    <li key={i} className="flex justify-between items-center text-[11px]">
                      <span className="truncate max-w-[180px]">{li.description}</span>
                      <span className="font-mono font-medium">₹{li.amount.toLocaleString('en-IN')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#0B1F3A]/8 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setViewingQuotation(qtn)}
                className="px-3 py-1.5 rounded-lg bg-[#0B1F3A] hover:bg-[#122b4d] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View & Print</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(qtn)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-[#0B1F3A]/70 hover:text-[#0B1F3A] cursor-pointer"
                  title="Edit Quotation"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(qtn.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 cursor-pointer"
                  title="Delete Quotation"
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
            <h3 className="font-heading font-bold text-lg text-[#0B1F3A]">Delete Quotation?</h3>
            <p className="text-xs text-[#0B1F3A]/70">This will permanently delete this estimate record.</p>
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
                  {editingId ? 'Edit Quotation / Estimate' : 'Generate Project Quotation'}
                </h3>
                <p className="text-xs text-[#0B1F3A]/60">Anivex Solution formal proposal and commercial estimate.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-100 text-[#0B1F3A]/60 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              
              {/* Quick Fill Client */}
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
                  <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1">Quotation Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.quotationNumber}
                    onChange={(e) => setFormData({ ...formData, quotationNumber: e.target.value })}
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
                    placeholder="e.g. Enterprise E-Commerce & Inventory Web Application"
                    className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
              </div>

              {/* Client Info */}
              <div className="p-4 rounded-xl bg-slate-50 border border-[#0B1F3A]/10 space-y-3">
                <h4 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">Client Recipient Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#0B1F3A]/70 mb-1">Client Contact Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="e.g. Priya Sundaram"
                      className="w-full bg-white border border-[#0B1F3A]/15 rounded-lg px-3 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#0B1F3A]/70 mb-1">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      value={formData.clientCompany}
                      onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                      placeholder="e.g. FinTrack Digital"
                      className="w-full bg-white border border-[#0B1F3A]/15 rounded-lg px-3 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#0B1F3A]/70 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      placeholder="priya@fintrackdigital.com"
                      className="w-full bg-white border border-[#0B1F3A]/15 rounded-lg px-3 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#0B1F3A]/70 mb-1">Phone</label>
                    <input
                      type="text"
                      value={formData.clientPhone}
                      onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                      placeholder="+91 98450 67890"
                      className="w-full bg-white border border-[#0B1F3A]/15 rounded-lg px-3 py-1.5 text-xs"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-[#0B1F3A]/70 mb-1">Address & GSTIN</label>
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
                        placeholder="Client GSTIN"
                        className="w-full bg-white border border-[#0B1F3A]/15 rounded-lg px-3 py-1.5 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dates & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1">Quote Date</label>
                  <input
                    type="date"
                    value={formData.quotationDate}
                    onChange={(e) => setFormData({ ...formData, quotationDate: e.target.value })}
                    className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1">Valid Until</label>
                  <input
                    type="date"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                    className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1">Timeline</label>
                  <input
                    type="text"
                    value={formData.estimatedTimeline}
                    onChange={(e) => setFormData({ ...formData, estimatedTimeline: e.target.value })}
                    placeholder="e.g. 4 to 6 Weeks"
                    className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs"
                  />
                </div>
              </div>

              {/* Line Items Editor */}
              <div className="space-y-3 p-4 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/10">
                <h4 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">Itemized Scope & Pricing</h4>
                
                <div className="space-y-2">
                  {formData.lineItems.map((item, idx) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-white border border-[#0B1F3A]/10 text-xs">
                      <div className="flex-1 min-w-0 pr-3">
                        <p className="font-bold text-[#0B1F3A]">{idx + 1}. {item.description}</p>
                        {item.details && <p className="text-[11px] text-[#0B1F3A]/60 truncate">{item.details}</p>}
                      </div>
                      <div className="flex items-center gap-4 shrink-0 font-mono">
                        <span className="text-[#0B1F3A]/70">{item.quantity} × ₹{item.unitPrice.toLocaleString('en-IN')}</span>
                        <span className="font-bold text-[#0B1F3A]">₹{item.amount.toLocaleString('en-IN')}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveLineItem(idx)}
                          className="text-red-500 hover:text-red-700 font-bold ml-1"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Line Item Box */}
                <div className="pt-2 border-t border-[#0B1F3A]/10 grid grid-cols-1 sm:grid-cols-12 gap-2 items-end">
                  <div className="sm:col-span-5">
                    <label className="block text-[10px] font-bold text-[#0B1F3A]/70 uppercase mb-1">Item Title</label>
                    <input
                      type="text"
                      value={itemDescription}
                      onChange={(e) => setItemDescription(e.target.value)}
                      placeholder="e.g. Payment Gateway & GST Invoicing"
                      className="w-full bg-white border border-[#0B1F3A]/15 rounded-lg px-3 py-1.5 text-xs"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-[10px] font-bold text-[#0B1F3A]/70 uppercase mb-1">Details</label>
                    <input
                      type="text"
                      value={itemDetails}
                      onChange={(e) => setItemDetails(e.target.value)}
                      placeholder="Short scope note..."
                      className="w-full bg-white border border-[#0B1F3A]/15 rounded-lg px-3 py-1.5 text-xs"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-[#0B1F3A]/70 uppercase mb-1">Price (₹)</label>
                    <input
                      type="number"
                      value={itemPrice}
                      onChange={(e) => setItemPrice(parseFloat(e.target.value) || 0)}
                      className="w-full bg-white border border-[#0B1F3A]/15 rounded-lg px-3 py-1.5 text-xs font-mono font-bold"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="button"
                      onClick={handleAddLineItem}
                      className="w-full py-1.5 bg-[#0B1F3A] hover:bg-[#122b4d] text-white text-xs font-bold rounded-lg cursor-pointer"
                    >
                      + Add Item
                    </button>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="pt-4 border-t border-[#0B1F3A]/10 space-y-1 text-right text-xs">
                  <p className="text-[#0B1F3A]/70">Subtotal: <strong className="text-[#0B1F3A] font-mono">₹{formData.subtotal.toLocaleString('en-IN')}</strong></p>
                  <p className="text-[#0B1F3A]/70">GST (18%): <strong className="text-[#0B1F3A] font-mono">₹{formData.gstAmount.toLocaleString('en-IN')}</strong></p>
                  <p className="text-sm font-extrabold text-[#0B1F3A]">Grand Total: <span className="font-mono text-[#F97316]">₹{formData.totalAmount.toLocaleString('en-IN')}</span></p>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1">Quotation Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-lg px-3 py-2 text-xs font-bold"
                >
                  <option value="Sent">Sent to Client</option>
                  <option value="Accepted">Accepted by Client</option>
                  <option value="Draft">Draft</option>
                  <option value="Declined">Declined</option>
                  <option value="Invoiced">Invoiced / Converted</option>
                </select>
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
                  Save Quotation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Quotation Executive Preview */}
      {viewingQuotation && (
        <div id="printable-quotation-modal" className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
          <div id="printable-quotation-card" className="bg-white rounded-2xl max-w-4xl w-full my-6 p-6 sm:p-12 shadow-2xl relative border border-[#0B1F3A]/10 text-[#0B1F3A]">
            
            {/* Action Bar (Hidden during print) */}
            <div className="no-print print:hidden flex items-center justify-between pb-6 mb-6 border-b border-[#0B1F3A]/10">
              <span className="text-xs font-bold text-[#15803D] uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                <span>Formal Quotation Ready for PDF / Print</span>
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
                  onClick={() => setViewingQuotation(null)}
                  className="p-2 rounded-xl hover:bg-slate-100 text-[#0B1F3A]/60"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Printable Body */}
            <div id="quotation-print-view" className="space-y-8 font-sans">
              
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
                    COMMERCIAL QUOTATION
                  </span>
                  <p className="font-mono text-xs font-bold text-[#F97316] mt-2">
                    {viewingQuotation.quotationNumber}
                  </p>
                  <p className="text-[11px] text-[#0B1F3A]/60">
                    Date: {viewingQuotation.quotationDate} | Valid Until: {viewingQuotation.validUntil}
                  </p>
                </div>
              </div>

              {/* Recipient Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/10 text-xs">
                <div>
                  <span className="font-bold uppercase text-[10px] text-[#0B1F3A]/50 block mb-1">PROPOSAL PREPARED BY:</span>
                  <h4 className="font-bold text-sm text-[#0B1F3A]">{websiteSettings?.companyName || 'Anivex Solution'}</h4>
                  <p className="text-[#0B1F3A]/70">{websiteSettings?.address || 'Technology Engineering Studio, India'}</p>
                  <p className="text-[#0B1F3A]/70">GSTIN / Tax ID: Verified Official Vendor</p>
                  <p className="text-[#0B1F3A]/70">Contact: {websiteSettings?.email || companyInfo?.businessEmail || ''} | {websiteSettings?.phone || companyInfo?.phone || ''}</p>
                </div>

                <div>
                  <span className="font-bold uppercase text-[10px] text-[#0B1F3A]/50 block mb-1">PREPARED FOR CLIENT:</span>
                  <h4 className="font-bold text-sm text-[#0B1F3A]">{viewingQuotation.clientName}</h4>
                  <p className="font-medium text-[#0B1F3A]">{viewingQuotation.clientCompany}</p>
                  <p className="text-[#0B1F3A]/70">{viewingQuotation.clientAddress || 'India'}</p>
                  {viewingQuotation.clientGstin && (
                    <p className="font-mono text-[11px] text-[#0B1F3A]/80">GSTIN: {viewingQuotation.clientGstin}</p>
                  )}
                  <p className="text-[#0B1F3A]/70">Email: {viewingQuotation.clientEmail} | Phone: {viewingQuotation.clientPhone}</p>
                </div>
              </div>

              {/* Project Scope Title */}
              <div>
                <span className="text-[10px] uppercase font-bold text-[#F97316] tracking-wider block">PROJECT SCOPE</span>
                <h3 className="font-heading font-extrabold text-xl text-[#0B1F3A] mt-0.5">
                  {viewingQuotation.projectTitle}
                </h3>
                <p className="text-xs text-[#0B1F3A]/70 mt-1">
                  Estimated Delivery Duration: <strong>{viewingQuotation.estimatedTimeline}</strong>
                </p>
              </div>

              {/* Table of Line Items */}
              <div className="border border-[#0B1F3A]/15 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0B1F3A] text-white text-[11px] uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="p-3 w-10 text-center">#</th>
                      <th className="p-3">Deliverable / Module Description</th>
                      <th className="p-3 w-20 text-center">Qty</th>
                      <th className="p-3 w-32 text-right">Unit Price (₹)</th>
                      <th className="p-3 w-32 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#0B1F3A]/10">
                    {viewingQuotation.lineItems.map((item, idx) => (
                      <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FFFDF7]'}>
                        <td className="p-3 text-center text-[#0B1F3A]/60 font-mono">{idx + 1}</td>
                        <td className="p-3">
                          <p className="font-bold text-[#0B1F3A]">{item.description}</p>
                          {item.details && (
                            <p className="text-[11px] text-[#0B1F3A]/60 mt-0.5">{item.details}</p>
                          )}
                        </td>
                        <td className="p-3 text-center font-mono">{item.quantity}</td>
                        <td className="p-3 text-right font-mono">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                        <td className="p-3 text-right font-mono font-bold text-[#0B1F3A]">₹{item.amount.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Financial Calculation Block */}
              <div className="flex justify-end">
                <div className="w-72 space-y-2 p-4 rounded-xl bg-[#FFFDF7] border border-[#0B1F3A]/10 text-xs">
                  <div className="flex justify-between text-[#0B1F3A]/70">
                    <span>Taxable Subtotal:</span>
                    <span className="font-mono font-medium text-[#0B1F3A]">₹{viewingQuotation.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[#0B1F3A]/70">
                    <span>GST (18%):</span>
                    <span className="font-mono font-medium text-[#0B1F3A]">₹{viewingQuotation.gstAmount.toLocaleString('en-IN')}</span>
                  </div>
                  {viewingQuotation.discountAmount > 0 && (
                    <div className="flex justify-between text-[#15803D]">
                      <span>Discount:</span>
                      <span className="font-mono font-medium">-₹{viewingQuotation.discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-[#0B1F3A]/15 flex justify-between font-extrabold text-sm text-[#0B1F3A]">
                    <span>Total Estimate:</span>
                    <span className="font-mono text-[#F97316]">₹{viewingQuotation.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Milestones & Bank details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#0B1F3A]/15 text-xs text-[#0B1F3A]/80">
                <div>
                  <h4 className="font-bold text-[#0B1F3A] uppercase text-[11px] mb-2">Milestone Payment Structure</h4>
                  <ul className="space-y-1.5">
                    {viewingQuotation.milestones.map((m, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-bold text-[#F97316] font-mono">{m.percentage}%</span>
                        <div>
                          <p className="font-semibold text-[#0B1F3A]">{m.title}</p>
                          <p className="text-[11px] text-[#0B1F3A]/60">{m.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-[#0B1F3A] uppercase text-[11px] mb-2">Official Bank & UPI Details</h4>
                  <div className="p-3 rounded-lg bg-slate-50 border border-[#0B1F3A]/10 space-y-1 text-[11px]">
                    <p><strong>Account Name:</strong> Anivex Solution</p>
                    <p><strong>Bank:</strong> {paymentSettings?.bankName || 'Not specified'}</p>
                    <p><strong>Account Number:</strong> {paymentSettings?.accountNumber || 'Not specified'}</p>
                    <p><strong>IFSC Code:</strong> {paymentSettings?.ifscCode || 'Not specified'}</p>
                    <p><strong>UPI ID:</strong> {paymentSettings?.upiId || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              {/* Terms and Acceptance Block */}
              <div className="pt-6 border-t border-[#0B1F3A]/20 grid grid-cols-2 gap-12 text-xs">
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#0B1F3A]/50 mb-1">PROPOSED BY ANIVEX SOLUTION:</p>
                  <div className="h-12 flex items-end">
                    <span className="font-serif italic font-bold text-base text-[#0B1F3A]">Krishndas Chauhan</span>
                  </div>
                  <div className="border-t border-[#0B1F3A]/30 pt-1">
                    <p className="font-bold text-[#0B1F3A]">Krishndas Chauhan</p>
                    <p className="text-[#0B1F3A]/70">Founder & Lead Architect, Anivex Solution</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase font-bold text-[#0B1F3A]/50 mb-1">CLIENT ACCEPTANCE & SIGN-OFF:</p>
                  <div className="h-12 flex items-end">
                    <span className="text-slate-400 italic text-xs">Signature & Official Stamp</span>
                  </div>
                  <div className="border-t border-[#0B1F3A]/30 pt-1">
                    <p className="font-bold text-[#0B1F3A]">{viewingQuotation.clientName}</p>
                    <p className="text-[#0B1F3A]/70">{viewingQuotation.clientCompany}</p>
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
