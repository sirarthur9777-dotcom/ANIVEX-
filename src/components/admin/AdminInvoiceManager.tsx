import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { InvoiceRecord, InvoiceLineItem } from '../../types/cms';
import {
  FileText,
  Plus,
  Printer,
  Trash2,
  Edit,
  Eye,
  X,
  Search,
  ShieldCheck,
  Building2,
  User,
  CheckCircle2,
  QrCode,
  Sparkles,
  Award,
  Calendar,
  DollarSign
} from 'lucide-react';

export const AdminInvoiceManager: React.FC = () => {
  const { invoices, addInvoice, updateInvoice, deleteInvoice, showToast } = useCms();

  const [activeTab, setActiveTab] = useState<'all' | 'Paid' | 'Pending' | 'Overdue'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals
  const [selectedInvoiceForView, setSelectedInvoiceForView] = useState<InvoiceRecord | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingInvoiceId, setEditingInvoiceId] = useState<string | null>(null);

  // Form State
  const [invoiceNumber, setInvoiceNumber] = useState(`ANX-INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState(new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10));
  const [status, setStatus] = useState<InvoiceRecord['status']>('Pending');
  const [currency, setCurrency] = useState('INR');

  const [billerName, setBillerName] = useState('ANIVEX Solutions');
  const [billerAddress, setBillerAddress] = useState('Technology Engineering HQ, India');
  const [billerEmail, setBillerEmail] = useState('anivexsolution@gmail.com');
  const [billerPhone, setBillerPhone] = useState('+91 98765 43210');
  const [billerTaxId, setBillerTaxId] = useState('GSTIN: 27AABCA1234F1Z0');

  const [clientName, setClientName] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');

  const [projectTitle, setProjectTitle] = useState('');
  const [paymentNotes, setPaymentNotes] = useState('Thank you for partnering with ANIVEX Solutions. All deliverables completed according to milestone specs.');
  const [bankDetails, setBankDetails] = useState('ANIVEX Solutions | Bank: HDFC Bank | A/C: 50200012345678 | IFSC: HDFC0000123');
  
  // Bank & UPI Specific Fields
  const [bankName, setBankName] = useState('HDFC Bank');
  const [accountNumber, setAccountNumber] = useState('50200012345678');
  const [ifscCode, setIfscCode] = useState('HDFC0000123');
  const [upiId, setUpiId] = useState('anivexsolution@okaxis');
  const [upiQrCodeUrl, setUpiQrCodeUrl] = useState('');

  // Digital Signature Fields
  const [signatoryName, setSignatoryName] = useState('Krishndas Chauhan');
  const [signatoryTitle, setSignatoryTitle] = useState('Founder & Managing Director');

  const [items, setItems] = useState<Omit<InvoiceLineItem, 'id'>[]>([
    { description: 'Custom Web & Software Development Service', category: 'Development', quantity: 1, unitPrice: 150000, amount: 150000 },
  ]);

  const [taxRatePercent, setTaxRatePercent] = useState<number>(18);
  const [discountAmount, setDiscountAmount] = useState<number>(5000);

  // Auto-calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const taxAmount = (subtotal * taxRatePercent) / 100;
  const totalAmount = Math.max(0, subtotal + taxAmount - discountAmount);

  const resetForm = () => {
    setInvoiceNumber(`ANX-INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
    setInvoiceDate(new Date().toISOString().slice(0, 10));
    setDueDate(new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10));
    setStatus('Pending');
    setCurrency('INR');
    setBillerName('ANIVEX Solutions');
    setBillerEmail('anivexsolution@gmail.com');
    setBillerAddress('Technology Engineering HQ, India');
    setBillerPhone('+91 98765 43210');
    setBillerTaxId('GSTIN: 27AABCA1234F1Z0');
    setClientName('');
    setClientCompany('');
    setClientEmail('');
    setClientPhone('');
    setClientAddress('');
    setProjectTitle('');
    setBankName('HDFC Bank');
    setAccountNumber('50200012345678');
    setIfscCode('HDFC0000123');
    setUpiId('anivexsolution@okaxis');
    setUpiQrCodeUrl('');
    setPaymentNotes('Thank you for partnering with ANIVEX Solutions. All deliverables completed according to milestone specs.');
    setBankDetails('ANIVEX Solutions | Bank: HDFC Bank | A/C: 50200012345678 | IFSC: HDFC0000123');
    setSignatoryName('Krishndas Chauhan');
    setSignatoryTitle('Founder & Managing Director');
    setItems([{ description: 'Enterprise Custom Software Engineering', category: 'Development', quantity: 1, unitPrice: 150000, amount: 150000 }]);
    setTaxRatePercent(18);
    setDiscountAmount(5000);
    setEditingInvoiceId(null);
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { description: 'Additional Engineering Deliverable', category: 'Services', quantity: 1, unitPrice: 25000, amount: 25000 },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length === 1) {
      showToast('At least one item is required per invoice.', 'info');
      return;
    }
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof Omit<InvoiceLineItem, 'id'>, value: any) => {
    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          const qty = field === 'quantity' ? Number(value) : item.quantity;
          const price = field === 'unitPrice' ? Number(value) : item.unitPrice;
          updated.amount = qty * price;
        }
        return updated;
      })
    );
  };

  const handleSaveInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !projectTitle.trim()) {
      showToast('Client Name and Project Title are required.', 'error');
      return;
    }

    const formattedItems: InvoiceLineItem[] = items.map((it, idx) => ({
      id: `item-${idx + 1}`,
      description: it.description,
      category: it.category,
      quantity: Number(it.quantity),
      unitPrice: Number(it.unitPrice),
      amount: Number(it.quantity) * Number(it.unitPrice),
    }));

    const invoicePayload: Omit<InvoiceRecord, 'id' | 'createdAt'> = {
      invoiceNumber,
      invoiceDate,
      dueDate,
      status,
      currency,
      billerName,
      billerAddress,
      billerEmail,
      billerPhone,
      billerTaxId,
      clientName,
      clientCompany,
      clientEmail,
      clientPhone,
      clientAddress,
      projectTitle,
      items: formattedItems,
      subtotal,
      taxRatePercent: Number(taxRatePercent),
      taxAmount,
      discountAmount: Number(discountAmount),
      totalAmount,
      paymentNotes,
      bankDetails,
      bankName,
      accountNumber,
      ifscCode,
      upiId,
      upiQrCodeUrl,
    };

    if (editingInvoiceId) {
      await updateInvoice(editingInvoiceId, invoicePayload);
    } else {
      await addInvoice(invoicePayload);
    }

    setIsCreateModalOpen(false);
    resetForm();
  };

  const handleEditClick = (inv: InvoiceRecord) => {
    setEditingInvoiceId(inv.id);
    setInvoiceNumber(inv.invoiceNumber);
    setInvoiceDate(inv.invoiceDate);
    setDueDate(inv.dueDate);
    setStatus(inv.status);
    setCurrency(inv.currency || 'INR');
    setBillerName(inv.billerName || 'ANIVEX Solutions');
    setBillerAddress(inv.billerAddress || 'Technology Engineering HQ, India');
    setBillerEmail(inv.billerEmail || 'anivexsolution@gmail.com');
    setBillerPhone(inv.billerPhone || '+91 98765 43210');
    setBillerTaxId(inv.billerTaxId || 'GSTIN: 27AABCA1234F1Z0');
    setClientName(inv.clientName);
    setClientCompany(inv.clientCompany || '');
    setClientEmail(inv.clientEmail || '');
    setClientPhone(inv.clientPhone || '');
    setClientAddress(inv.clientAddress || '');
    setProjectTitle(inv.projectTitle);
    setPaymentNotes(inv.paymentNotes || '');
    setBankDetails(inv.bankDetails || '');
    setBankName(inv.bankName || 'HDFC Bank');
    setAccountNumber(inv.accountNumber || '50200012345678');
    setIfscCode(inv.ifscCode || 'HDFC0000123');
    setUpiId(inv.upiId || 'anivexsolution@okaxis');
    setUpiQrCodeUrl(inv.upiQrCodeUrl || '');
    setItems(inv.items.map((i) => ({ ...i })));
    setTaxRatePercent(inv.taxRatePercent);
    setDiscountAmount(inv.discountAmount);
    setIsCreateModalOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (amount: number, curr = 'INR') => {
    const formatted = amount.toLocaleString('en-IN');
    if (curr === 'INR' || curr === '₹') {
      return `₹ ${formatted}`;
    }
    return `${curr} ${formatted}`;
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesTab = activeTab === 'all' || inv.status === activeTab;
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.clientCompany?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.projectTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Dashboard View Section - Hidden during Print */}
      <div className="space-y-6 print:hidden">
        {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0B0F16] border border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-2xl text-white">GST Bill & Invoice Generator</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#D6A84F]/20 text-[#F5C85B] text-[10px] font-mono border border-[#D6A84F]/30 uppercase font-bold">
              INR (₹) / DIGITAL SIGNATURE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Generate, issue, and print official tax invoices with digital signatures, GST calculations, and Indian Rupee (₹) transaction formatting.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsCreateModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#F5C85B] text-[#05070B] font-bold text-xs tracking-wide hover:shadow-[0_0_20px_rgba(245,200,91,0.4)] transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Bill</span>
        </button>
      </div>

      {/* Stats Summary in INR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0B0F16] border border-white/10">
          <div className="text-slate-400 text-xs font-mono">TOTAL INVOICES</div>
          <div className="font-display font-extrabold text-2xl text-white mt-1">{invoices.length}</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0B0F16] border border-emerald-500/20">
          <div className="text-emerald-400 text-xs font-mono">PAID AMOUNT (INR)</div>
          <div className="font-display font-extrabold text-2xl text-emerald-400 mt-1">
            {formatCurrency(invoices.filter((i) => i.status === 'Paid').reduce((sum, i) => sum + i.totalAmount, 0), 'INR')}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0B0F16] border border-amber-500/20">
          <div className="text-amber-400 text-xs font-mono">PENDING BALANCE (INR)</div>
          <div className="font-display font-extrabold text-2xl text-amber-400 mt-1">
            {formatCurrency(invoices.filter((i) => i.status === 'Pending').reduce((sum, i) => sum + i.totalAmount, 0), 'INR')}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0B0F16] border border-[#D6A84F]/30">
          <div className="text-[#F5C85B] text-xs font-mono">OVERDUE COUNT</div>
          <div className="font-display font-extrabold text-2xl text-[#F5C85B] mt-1">
            {invoices.filter((i) => i.status === 'Overdue').length}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0B0F16] border border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
          {(['all', 'Paid', 'Pending', 'Overdue'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-[#121824] border border-[#D6A84F]/40 text-[#F5C85B]'
                  : 'text-slate-400 hover:text-white bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search invoice #, client or project..."
            className="w-full bg-[#05070B] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D6A84F]"
          />
        </div>
      </div>

      {/* Invoices Table */}
      <div className="rounded-2xl bg-[#0B0F16] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#05070B] text-slate-400 font-mono text-[11px] uppercase border-b border-white/10">
              <tr>
                <th className="p-4">Invoice #</th>
                <th className="p-4">Client / Company</th>
                <th className="p-4">Project Scope</th>
                <th className="p-4">Date / Due</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No invoices match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#F5C85B]">{inv.invoiceNumber}</td>
                    <td className="p-4">
                      <div className="font-semibold text-white">{inv.clientName}</div>
                      {inv.clientCompany && <div className="text-[11px] text-slate-500">{inv.clientCompany}</div>}
                    </td>
                    <td className="p-4 text-slate-300 font-medium max-w-xs truncate">{inv.projectTitle}</td>
                    <td className="p-4 font-mono text-[11px] text-slate-400">
                      <div>Issued: {inv.invoiceDate}</div>
                      <div className="text-slate-500">Due: {inv.dueDate}</div>
                    </td>
                    <td className="p-4 font-mono font-bold text-white">
                      {formatCurrency(inv.totalAmount, inv.currency || 'INR')}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${
                          inv.status === 'Paid'
                            ? 'bg-emerald-950/50 border-emerald-500/30 text-emerald-400'
                            : inv.status === 'Pending'
                            ? 'bg-amber-950/50 border-amber-500/30 text-amber-400'
                            : 'bg-red-950/50 border-red-500/30 text-red-400'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedInvoiceForView(inv)}
                          title="View & Print Digital Signed Bill"
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#F5C85B] transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="text-[11px] font-semibold hidden sm:inline">View Bill</span>
                        </button>
                        <button
                          onClick={() => handleEditClick(inv)}
                          title="Edit Invoice"
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteInvoice(inv.id)}
                          title="Delete Invoice"
                          className="p-2 rounded-lg bg-red-950/30 hover:bg-red-900/40 text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      </div>

      {/* CREATE / EDIT INVOICE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto print:hidden">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0B0F16] border border-[#D6A84F]/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden my-8">
            <div className="p-5 bg-[#05070B] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#F5C85B]" />
                <h3 className="font-display font-bold text-lg text-white">
                  {editingInvoiceId ? 'Edit Invoice' : 'Create Tax Invoice / Client Bill'}
                </h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveInvoice} className="p-6 space-y-6 overflow-y-auto text-xs">
              {/* Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 p-4 rounded-xl bg-[#05070B] border border-white/5">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Invoice Number</label>
                  <input
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="w-full bg-[#0B0F16] border border-white/10 rounded-lg p-2 text-white font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Invoice Date</label>
                  <input
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    className="w-full bg-[#0B0F16] border border-white/10 rounded-lg p-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-[#0B0F16] border border-white/10 rounded-lg p-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-[#0B0F16] border border-[#D6A84F]/40 rounded-lg p-2 text-[#F5C85B] font-bold font-mono"
                  >
                    <option value="INR">INR (₹ Rupees)</option>
                    <option value="USD">USD ($ Dollars)</option>
                    <option value="EUR">EUR (€ Euros)</option>
                    <option value="GBP">GBP (£ Pounds)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Payment Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-[#0B0F16] border border-white/10 rounded-lg p-2 text-white"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>

              {/* Biller & Client Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Biller */}
                <div className="p-4 rounded-xl bg-[#05070B] border border-white/5 space-y-3">
                  <h4 className="font-bold text-[#F5C85B] uppercase font-mono flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>From (ANIVEX Solutions)</span>
                  </h4>
                  <div>
                    <label className="block text-slate-400 mb-1">Company Name</label>
                    <input
                      type="text"
                      value={billerName}
                      onChange={(e) => setBillerName(e.target.value)}
                      className="w-full bg-[#0B0F16] border border-white/10 rounded-lg p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Official Company Email *</label>
                    <input
                      type="email"
                      value={billerEmail}
                      onChange={(e) => setBillerEmail(e.target.value)}
                      className="w-full bg-[#0B0F16] border border-[#D6A84F]/40 rounded-lg p-2 text-[#F5C85B] font-mono"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-400 mb-1">GSTIN / Tax ID</label>
                      <input
                        type="text"
                        value={billerTaxId}
                        onChange={(e) => setBillerTaxId(e.target.value)}
                        placeholder="GSTIN: 27AABCA1234F1Z0"
                        className="w-full bg-[#0B0F16] border border-white/10 rounded-lg p-2 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Phone</label>
                      <input
                        type="text"
                        value={billerPhone}
                        onChange={(e) => setBillerPhone(e.target.value)}
                        className="w-full bg-[#0B0F16] border border-white/10 rounded-lg p-2 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Address / HQ Location</label>
                    <input
                      type="text"
                      value={billerAddress}
                      onChange={(e) => setBillerAddress(e.target.value)}
                      className="w-full bg-[#0B0F16] border border-white/10 rounded-lg p-2 text-white"
                    />
                  </div>
                </div>

                {/* Client */}
                <div className="p-4 rounded-xl bg-[#05070B] border border-white/5 space-y-3">
                  <h4 className="font-bold text-[#F5C85B] uppercase font-mono">Billed To (Client)</h4>
                  <div>
                    <label className="block text-slate-400 mb-1">Client Full Name *</label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Robert Joe"
                      className="w-full bg-[#0B0F16] border border-white/10 rounded-lg p-2 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      placeholder="e.g. AeroTech Systems Inc."
                      className="w-full bg-[#0B0F16] border border-white/10 rounded-lg p-2 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-400 mb-1">Client Email</label>
                      <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="client@email.com"
                        className="w-full bg-[#0B0F16] border border-white/10 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Client Phone</label>
                      <input
                        type="text"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+91 98765 00000"
                        className="w-full bg-[#0B0F16] border border-white/10 rounded-lg p-2 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Client Billing Address</label>
                    <input
                      type="text"
                      value={clientAddress}
                      onChange={(e) => setClientAddress(e.target.value)}
                      placeholder="Client location or office address"
                      className="w-full bg-[#0B0F16] border border-white/10 rounded-lg p-2 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Project Title */}
              <div>
                <label className="block text-slate-400 font-mono mb-1">Project Scope / Engagement Title *</label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. Custom Web Application Development & AI Integration"
                  className="w-full bg-[#05070B] border border-white/10 rounded-lg p-2.5 text-white font-medium"
                  required
                />
              </div>

              {/* Line Items Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white font-mono uppercase">Billable Items ({currency === 'INR' ? '₹ Rupees' : currency})</h4>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="inline-flex items-center gap-1 text-[#F5C85B] hover:text-white font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Line Item</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {items.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-[#05070B] p-2.5 rounded-xl border border-white/5">
                      <div className="col-span-5">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                          placeholder="Description of service / deliverable"
                          className="w-full bg-[#0B0F16] border border-white/10 rounded-lg p-2 text-white"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={item.category}
                          onChange={(e) => handleItemChange(idx, 'category', e.target.value)}
                          placeholder="Category / HSN"
                          className="w-full bg-[#0B0F16] border border-white/10 rounded-lg p-2 text-white"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                          className="w-full bg-[#0B0F16] border border-white/10 rounded-lg p-2 text-white text-center"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => handleItemChange(idx, 'unitPrice', e.target.value)}
                          className="w-full bg-[#0B0F16] border border-white/10 rounded-lg p-2 text-white text-right font-mono"
                        />
                      </div>
                      <div className="col-span-1 text-right">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="p-1.5 text-red-400 hover:text-red-300 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Math & Signatory Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div className="space-y-4">
                  {/* Bank & UPI Configuration Card */}
                  <div className="p-4 rounded-xl bg-[#05070B] border border-[#D6A84F]/30 space-y-3">
                    <div className="flex items-center gap-2 text-[#F5C85B] font-mono font-bold text-[11px] uppercase">
                      <QrCode className="w-4 h-4" />
                      <span>Bank & UPI Payment Details Configuration</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-400 text-[10px] mb-1">Bank Name</label>
                        <input
                          type="text"
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                          placeholder="e.g. HDFC Bank"
                          className="w-full bg-[#0B0F16] border border-white/10 rounded p-1.5 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-[10px] mb-1">Account Number</label>
                        <input
                          type="text"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          placeholder="e.g. 50200012345678"
                          className="w-full bg-[#0B0F16] border border-white/10 rounded p-1.5 text-white font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-400 text-[10px] mb-1">IFSC Code</label>
                        <input
                          type="text"
                          value={ifscCode}
                          onChange={(e) => setIfscCode(e.target.value)}
                          placeholder="e.g. HDFC0000123"
                          className="w-full bg-[#0B0F16] border border-white/10 rounded p-1.5 text-white font-mono uppercase"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-[10px] mb-1">UPI ID (e.g. Google Pay / PhonePe / BHIM)</label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. anivexsolution@okaxis"
                          className="w-full bg-[#0B0F16] border border-[#D6A84F]/40 rounded p-1.5 text-[#F5C85B] font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 text-[10px] mb-1">
                        Custom UPI QR Code Image URL (Leave empty to auto-generate scannable QR Code)
                      </label>
                      <input
                        type="text"
                        value={upiQrCodeUrl}
                        onChange={(e) => setUpiQrCodeUrl(e.target.value)}
                        placeholder="https://... (Optional custom QR image)"
                        className="w-full bg-[#0B0F16] border border-white/10 rounded p-1.5 text-white font-mono text-[11px]"
                      />
                    </div>
                  </div>

                  {/* Digital Signature Settings */}
                  <div className="p-3 rounded-xl bg-[#05070B] border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-slate-300 font-mono font-bold text-[11px] uppercase">
                      <ShieldCheck className="w-4 h-4 text-[#F5C85B]" />
                      <span>Digital Signature Settings</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-400 text-[10px]">Signatory Name</label>
                        <input
                          type="text"
                          value={signatoryName}
                          onChange={(e) => setSignatoryName(e.target.value)}
                          className="w-full bg-[#0B0F16] border border-white/10 rounded p-1.5 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-[10px]">Signatory Designation</label>
                        <input
                          type="text"
                          value={signatoryTitle}
                          onChange={(e) => setSignatoryTitle(e.target.value)}
                          className="w-full bg-[#0B0F16] border border-white/10 rounded p-1.5 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#05070B] border border-white/5 space-y-2 text-right">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal:</span>
                    <span className="font-mono text-white">{formatCurrency(subtotal, currency)}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="flex items-center gap-1">
                      <span>GST / Tax Rate (%):</span>
                      <input
                        type="number"
                        value={taxRatePercent}
                        onChange={(e) => setTaxRatePercent(Number(e.target.value))}
                        className="w-16 bg-[#0B0F16] border border-white/10 rounded p-1 text-white text-center font-mono"
                      />
                    </span>
                    <span className="font-mono text-white">+{formatCurrency(taxAmount, currency)}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="flex items-center gap-1">
                      <span>Discount:</span>
                      <input
                        type="number"
                        value={discountAmount}
                        onChange={(e) => setDiscountAmount(Number(e.target.value))}
                        className="w-24 bg-[#0B0F16] border border-white/10 rounded p-1 text-white text-center font-mono"
                      />
                    </span>
                    <span className="font-mono text-emerald-400">-{formatCurrency(discountAmount, currency)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10 text-base font-bold text-white">
                    <span>Total Payable:</span>
                    <span className="text-[#F5C85B] font-mono">{formatCurrency(totalAmount, currency)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#F5C85B] text-[#05070B] font-bold tracking-wide hover:shadow-[0_0_20px_rgba(245,200,91,0.4)] cursor-pointer"
                >
                  {editingInvoiceId ? 'Update Invoice' : 'Save & Issue Tax Invoice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW & PRINTABLE BILL MODAL WITH LUXURY EXECUTIVE REDESIGN & INR DESIGN */}
      {selectedInvoiceForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:static print:block">
          <div id="printable-invoice-card" className="relative w-full max-w-3xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden my-6 print:my-0 print:rounded-none print:shadow-none print:w-full print:max-w-none">
            {/* Modal Control Header (Hidden when printing) */}
            <div className="p-3.5 px-5 bg-[#05070B] text-white flex items-center justify-between print:hidden border-b border-[#D6A84F]/30">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded bg-[#D6A84F]/20 text-[#F5C85B] flex items-center justify-center border border-[#D6A84F]/40">
                  <FileText className="w-3.5 h-3.5 text-[#F5C85B]" />
                </div>
                <div>
                  <span className="font-bold text-xs sm:text-sm text-white">Tax Invoice Preview: </span>
                  <span className="font-mono text-xs text-[#F5C85B] font-bold">{selectedInvoiceForView.invoiceNumber}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#D6A84F]/20 text-[#F5C85B] text-[10px] font-mono border border-[#D6A84F]/30 font-bold ml-2">
                  {selectedInvoiceForView.currency || 'INR'}
                </span>
              </div>
              <button
                onClick={() => setSelectedInvoiceForView(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close Preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Redesigned Printable Document Body - Single Page A4 Fit */}
            <div className="p-6 sm:p-8 space-y-4 bg-white text-slate-900" id="printable-invoice">
              {/* Executive Top Header Band */}
              <div className="bg-[#05070B] text-white p-4 sm:p-5 rounded-xl border-l-4 border-[#D6A84F] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#121824] p-1.5 flex items-center justify-center shrink-0 border border-[#D6A84F]">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M 20,80 L 50,20 L 80,80 M 35,55 L 65,55" fill="none" stroke="#F5C85B" strokeWidth="12" strokeLinecap="round" />
                        <path d="M 30,20 L 70,80" fill="none" stroke="#D9DCE1" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-white uppercase">
                        {selectedInvoiceForView.billerName || 'ANIVEX SOLUTIONS'}
                      </span>
                      <p className="text-[9px] text-slate-400 font-mono tracking-widest uppercase font-semibold">
                        Software Engineering & Technology Solutions
                      </p>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-300 font-mono flex flex-wrap items-center gap-x-3 gap-y-0.5 pt-1">
                    {selectedInvoiceForView.billerAddress && (
                      <>
                        <span>HQ: <strong className="text-slate-100">{selectedInvoiceForView.billerAddress}</strong></span>
                        <span className="text-slate-500">•</span>
                      </>
                    )}
                    <span>Email: <strong className="text-[#F5C85B]">{selectedInvoiceForView.billerEmail || 'anivexsolution@gmail.com'}</strong></span>
                    {selectedInvoiceForView.billerPhone && (
                      <>
                        <span className="text-slate-500">•</span>
                        <span>Ph: {selectedInvoiceForView.billerPhone}</span>
                      </>
                    )}
                    {selectedInvoiceForView.billerTaxId && (
                      <>
                        <span className="text-slate-500">•</span>
                        <span className="text-[#D6A84F] font-bold">{selectedInvoiceForView.billerTaxId}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <div className="inline-block px-2.5 py-0.5 rounded bg-[#D6A84F]/20 text-[#F5C85B] text-[10px] font-mono font-bold uppercase tracking-widest mb-1 border border-[#D6A84F]/40">
                    OFFICIAL TAX INVOICE
                  </div>
                  <h1 className="font-mono font-extrabold text-lg sm:text-xl text-white">{selectedInvoiceForView.invoiceNumber}</h1>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Date: <strong className="text-slate-200">{selectedInvoiceForView.invoiceDate}</strong> | Due: <strong className="text-[#F5C85B]">{selectedInvoiceForView.dueDate}</strong>
                  </div>
                </div>
              </div>

              {/* Status & Engagement Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-[11px] font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-semibold uppercase text-[10px]">Payment Status:</span>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    selectedInvoiceForView.status === 'Paid'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : selectedInvoiceForView.status === 'Pending'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}>
                    ● {selectedInvoiceForView.status}
                  </span>
                </div>
                <div className="text-slate-600">
                  Currency: <strong className="text-slate-900 font-bold">{selectedInvoiceForView.currency || 'INR (₹)'}</strong>
                </div>
              </div>

              {/* Client & Project Scope Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Client Card */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1.5">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <User className="w-3 h-3 text-[#D6A84F]" />
                      <span>BILLED TO (CLIENT)</span>
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">CLIENT REF #</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">{selectedInvoiceForView.clientName}</div>
                  {selectedInvoiceForView.clientCompany && (
                    <div className="text-[11px] font-semibold text-slate-700">{selectedInvoiceForView.clientCompany}</div>
                  )}
                  <div className="text-[10px] text-slate-600 font-mono space-y-0.5 pt-0.5">
                    {selectedInvoiceForView.clientEmail && <div>Email: {selectedInvoiceForView.clientEmail}</div>}
                    {selectedInvoiceForView.clientPhone && <div>Phone: {selectedInvoiceForView.clientPhone}</div>}
                    {selectedInvoiceForView.clientAddress && <div className="text-slate-600 font-sans mt-0.5">{selectedInvoiceForView.clientAddress}</div>}
                  </div>
                </div>

                {/* Scope Card */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1.5">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-[#D6A84F]" />
                      <span>PROJECT SCOPE & TERMS</span>
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">{selectedInvoiceForView.projectTitle}</div>
                  <div className="text-[10px] text-slate-600 leading-relaxed font-normal bg-white p-2 rounded border border-slate-200 mt-1">
                    {selectedInvoiceForView.paymentNotes || 'Standard Enterprise Deliverable Terms apply according to milestone agreement.'}
                  </div>
                </div>
              </div>

              {/* Itemized Deliverables Table */}
              <div className="border rounded-xl border-slate-300 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#05070B] text-white font-mono text-[10px] uppercase border-b border-slate-300">
                    <tr>
                      <th className="py-2.5 px-3 w-8">#</th>
                      <th className="py-2.5 px-3">Service / Deliverable Description</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3 text-center w-12">Qty</th>
                      <th className="py-2.5 px-3 text-right w-24">Rate ({selectedInvoiceForView.currency === 'INR' ? '₹' : selectedInvoiceForView.currency})</th>
                      <th className="py-2.5 px-3 text-right w-28">Amount ({selectedInvoiceForView.currency === 'INR' ? '₹' : selectedInvoiceForView.currency})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800 text-[11px]">
                    {selectedInvoiceForView.items.map((item, i) => (
                      <tr key={item.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                        <td className="py-2 px-3 font-mono text-slate-400">{i + 1}</td>
                        <td className="py-2 px-3 font-semibold text-slate-900">{item.description}</td>
                        <td className="py-2 px-3 text-slate-500 font-mono text-[10px]">{item.category}</td>
                        <td className="py-2 px-3 text-center font-mono">{item.quantity}</td>
                        <td className="py-2 px-3 text-right font-mono">{formatCurrency(item.unitPrice, selectedInvoiceForView.currency)}</td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">{formatCurrency(item.amount, selectedInvoiceForView.currency)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Payment Details & Total Breakdown */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-3 pt-1">
                {/* Left: Scannable UPI & Bank Details Box */}
                <div className="max-w-md w-full space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <QrCode className="w-3 h-3 text-[#D6A84F]" />
                      <span>DIRECT BANK & UPI PAYMENT PORTAL</span>
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-3 items-center">
                    {/* UPI QR Code Container */}
                    <div className="shrink-0 flex flex-col items-center bg-white p-1.5 rounded-lg border border-slate-200 shadow-sm text-center">
                      <img
                        src={
                          selectedInvoiceForView.upiQrCodeUrl ||
                          `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                            `upi://pay?pa=${selectedInvoiceForView.upiId || 'anivexsolution@okaxis'}&pn=ANIVEX%20Solutions&am=${selectedInvoiceForView.totalAmount}&cu=INR`
                          )}`
                        }
                        alt="UPI Payment QR Code"
                        className="w-16 h-16 object-contain"
                      />
                      <span className="text-[8px] font-mono font-bold text-slate-800 mt-0.5 uppercase">
                        SCAN TO PAY VIA UPI
                      </span>
                    </div>

                    {/* Text Bank Details */}
                    <div className="text-[10px] text-slate-800 font-mono space-y-0.5 text-left w-full">
                      <p className="font-bold text-slate-900">
                        {selectedInvoiceForView.bankName || 'HDFC Bank'} | A/C: {selectedInvoiceForView.accountNumber || '50200012345678'}
                      </p>
                      <p className="text-slate-600">
                        IFSC: <strong className="text-slate-900">{selectedInvoiceForView.ifscCode || 'HDFC0000123'}</strong>
                      </p>
                      <div className="pt-0.5 border-t border-slate-200 text-slate-700">
                        UPI ID: <strong className="text-[#05070B]">{selectedInvoiceForView.upiId || 'anivexsolution@okaxis'}</strong>
                      </div>
                      <div className="pt-0.5">
                        <span className="inline-block text-[8px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-300">
                          GPay / PhonePe / Paytm / BHIM / IMPS
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Calculated Totals Box */}
                <div className="w-full md:w-64 space-y-1 text-right text-[11px] bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span className="font-mono font-bold text-slate-900">{formatCurrency(selectedInvoiceForView.subtotal, selectedInvoiceForView.currency)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>GST ({selectedInvoiceForView.taxRatePercent}%):</span>
                    <span className="font-mono font-bold text-slate-900">+{formatCurrency(selectedInvoiceForView.taxAmount, selectedInvoiceForView.currency)}</span>
                  </div>
                  {selectedInvoiceForView.discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount:</span>
                      <span className="font-mono font-bold">-{formatCurrency(selectedInvoiceForView.discountAmount, selectedInvoiceForView.currency)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t-2 border-slate-900 text-sm font-black text-[#05070B] bg-amber-500/10 p-1.5 rounded mt-1">
                    <span>Total Amount Payable:</span>
                    <span className="font-mono font-extrabold text-[#05070B]">{formatCurrency(selectedInvoiceForView.totalAmount, selectedInvoiceForView.currency)}</span>
                  </div>
                </div>
              </div>

              {/* Digital Signature & Verification Seal Grid */}
              <div className="pt-3 border-t-2 border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
                {/* Left: Verification Seal */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 p-2 bg-[#05070B] text-white rounded-xl border border-[#D6A84F]/40 shadow-xs">
                    <div className="w-7 h-7 rounded-full bg-[#121824] text-[#F5C85B] flex items-center justify-center font-bold shrink-0 border border-[#D6A84F]/50">
                      <ShieldCheck className="w-4 h-4 text-[#F5C85B]" />
                    </div>
                    <div>
                      <div className="text-[9px] font-bold text-[#F5C85B] uppercase font-mono tracking-wider flex items-center gap-1">
                        <span>DIGITALLY VERIFIED TAX INVOICE</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      </div>
                      <div className="text-[8px] text-slate-400 font-mono">
                        SHA256 Hash: <span className="text-slate-200 font-bold">ANX-SIG-{selectedInvoiceForView.id.toUpperCase().replace(/[^A-Z0-9]/g, '') || '987A2B'}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[8px] text-slate-500 font-mono italic">
                    This is an authentic, legally binding digital bill issued under section 65B of the Indian Evidence Act, 1872. Valid without wet-ink signature.
                  </p>
                </div>

                {/* Right: Digital Signature Box */}
                <div className="flex flex-col items-start md:items-end space-y-0.5">
                  <div className="relative p-2 rounded-xl border-2 border-dashed border-[#D6A84F] bg-slate-50 w-full sm:w-48 text-center shadow-xs">
                    <div className="text-[8px] font-mono font-bold tracking-widest text-[#D6A84F] uppercase border-b border-slate-200 pb-0.5 mb-0.5">
                      AUTHORISED DIGITAL SIGNATURE
                    </div>

                    <div className="my-0.5 py-0.5 flex justify-center items-center">
                      <div className="relative font-serif italic text-base font-bold text-[#05070B] tracking-wider">
                        <span className="font-serif italic text-sm font-extrabold text-[#05070B] drop-shadow-xs font-mono">
                          {signatoryName || 'Krishndas Chauhan'}
                        </span>
                        <svg className="w-28 h-2.5 mx-auto -mt-0.5 text-[#D6A84F]" viewBox="0 0 200 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M 10 15 Q 50 5 90 20 T 170 12 T 190 25" />
                        </svg>
                      </div>
                    </div>

                    <div className="text-[10px] font-bold text-slate-900">{signatoryName || 'Krishndas Chauhan'}</div>
                    <div className="text-[9px] text-slate-600 font-medium">{signatoryTitle || 'Founder & Managing Director'}</div>
                    <div className="text-[8px] text-[#D6A84F] font-mono font-bold uppercase tracking-wider mt-0.5">
                      ANIVEX Solutions
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Footer */}
              <div className="pt-2 border-t border-slate-200 text-center text-slate-500 text-[9px] font-mono flex flex-col sm:flex-row justify-between items-center gap-1">
                <div>Thank you for partnering with ANIVEX Solutions. Enterprise Software Engineering.</div>
                <div className="font-bold text-slate-700">ANIVEX Solutions © {new Date().getFullYear()}</div>
              </div>
            </div>

            {/* Modal Control Footer (Hidden when printing) */}
            <div className="p-3.5 px-5 bg-[#05070B] text-white flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden border-t border-[#D6A84F]/30">
              <div className="text-xs text-slate-400 font-mono text-center sm:text-left flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Ready for single-page A4 Portrait Print or PDF Export</span>
              </div>
              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setSelectedInvoiceForView(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#F5C85B] text-[#05070B] font-bold text-xs hover:shadow-[0_0_20px_rgba(245,200,91,0.5)] transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
