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
  DollarSign,
  Clock,
  Headphones,
  MapPin,
  Mail,
  Phone,
  Globe,
  Info,
  Landmark
} from 'lucide-react';

const numberToWords = (amount: number, currency: string = 'INR'): string => {
  if (isNaN(amount) || amount === 0) {
    return currency === 'INR' ? '(Rupees Zero Only)' : '(Zero Dollars Only)';
  }

  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
                'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const convertChunk = (num: number): string => {
    if (num === 0) return '';
    if (num < 20) return ones[num] + ' ';
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + ones[num % 10] : '') + ' ';
    return ones[Math.floor(num / 100)] + ' Hundred ' + (num % 100 !== 0 ? convertChunk(num % 100) : '');
  };

  let integerPart = Math.floor(Math.abs(amount));
  const decimalPart = Math.round((Math.abs(amount) - integerPart) * 100);

  let result = '';

  if (currency === 'INR') {
    if (integerPart >= 10000000) {
      result += convertChunk(Math.floor(integerPart / 10000000)) + 'Crore ';
      integerPart %= 10000000;
    }
    if (integerPart >= 100000) {
      result += convertChunk(Math.floor(integerPart / 100000)) + 'Lakh ';
      integerPart %= 100000;
    }
    if (integerPart >= 1000) {
      result += convertChunk(Math.floor(integerPart / 1000)) + 'Thousand ';
      integerPart %= 1000;
    }
    if (integerPart > 0) {
      result += convertChunk(integerPart);
    }
  } else {
    if (integerPart >= 1000000) {
      result += convertChunk(Math.floor(integerPart / 1000000)) + 'Million ';
      integerPart %= 1000000;
    }
    if (integerPart >= 1000) {
      result += convertChunk(Math.floor(integerPart / 1000)) + 'Thousand ';
      integerPart %= 1000;
    }
    if (integerPart > 0) {
      result += convertChunk(integerPart);
    }
  }

  result = result.trim();
  const currencyUnit = currency === 'INR' ? 'Rupees' : currency === 'EUR' ? 'Euros' : currency === 'GBP' ? 'Pounds' : 'Dollars';
  let wordResult = `${currencyUnit} ${result}`;

  if (decimalPart > 0) {
    const subUnit = currency === 'INR' ? 'Paise' : 'Cents';
    wordResult += ` and ${convertChunk(decimalPart).trim()} ${subUnit}`;
  }

  return `(${wordResult} Only)`;
};

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
  const [invoiceDate, setInvoiceDate] = useState('12 Aug 2026');
  const [dueDate, setDueDate] = useState('20 Aug 2026');
  const [status, setStatus] = useState<InvoiceRecord['status']>('Pending');
  const [currency, setCurrency] = useState('INR');

  const [billerName, setBillerName] = useState('ANIVEX Solutions');
  const [billerAddress, setBillerAddress] = useState('Jaunpur, Uttar Pradesh, India');
  const [billerEmail, setBillerEmail] = useState('anivexsolution@gmail.com');
  const [billerPhone, setBillerPhone] = useState('+91 7985668826');
  const [billerTaxId, setBillerTaxId] = useState('GSTIN: 27AABCA1234F1Z0');

  const [clientName, setClientName] = useState('Ramdas Chauhan');
  const [clientCompany, setClientCompany] = useState('Shaurya Jan Sewa Kendra');
  const [clientEmail, setClientEmail] = useState('shauryacsp@gmail.com');
  const [clientPhone, setClientPhone] = useState('+91 7488733181');
  const [clientAddress, setClientAddress] = useState('Babhnauli, Damarua, Jaunpur – 222135, Uttar Pradesh, India');
  const [clientRef, setClientRef] = useState('SKC/2026/08/12');

  const [projectTitle, setProjectTitle] = useState('Custom Web App');
  const [placeOfSupply, setPlaceOfSupply] = useState('Uttar Pradesh (09)');
  const [websiteUrl, setWebsiteUrl] = useState('www.anivexsolutions.in');
  const [deliveryMethod, setDeliveryMethod] = useState('Digital Delivery');
  const [warrantySupport, setWarrantySupport] = useState('30 Days Support');
  const [supportEmail, setSupportEmail] = useState('support@anivexsolutions.in');
  const [supportPhone, setSupportPhone] = useState('+91 7985668826');

  const [paymentNotes, setPaymentNotes] = useState('Thank you for partnering with ANIVEX Solutions. All deliverables completed according to milestone specifications.');
  const [bankDetails, setBankDetails] = useState('ANIVEX Solutions | Bank of Baroda | A/C: 45950100023052 | IFSC: BARBOMACHHA | UPI: 7985668826-2@bybl');
  
  // Bank & UPI Specific Fields
  const [bankName, setBankName] = useState('Bank of Baroda');
  const [accountHolderName, setAccountHolderName] = useState('ANIVEX SOLUTIONS');
  const [accountNumber, setAccountNumber] = useState('45950100023052');
  const [ifscCode, setIfscCode] = useState('BARBOMACHHA');
  const [upiId, setUpiId] = useState('7985668826-2@bybl');
  const [upiQrCodeUrl, setUpiQrCodeUrl] = useState('');

  // Digital Signature Fields
  const [signatoryName, setSignatoryName] = useState('Krishndas Chauhan');
  const [signatoryTitle, setSignatoryTitle] = useState('Founder & Managing Director');

  const [items, setItems] = useState<Omit<InvoiceLineItem, 'id'>[]>([
    { description: 'CSC Manager', category: 'Web App', quantity: 1, unitPrice: 1000, amount: 1000 },
    { description: 'User Management Module', category: 'Module', quantity: 1, unitPrice: 700, amount: 700 },
    { description: 'Reporting & Analytics Module', category: 'Module', quantity: 1, unitPrice: 500, amount: 500 },
  ]);

  const [taxRatePercent, setTaxRatePercent] = useState<number>(18);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Auto-calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const taxAmount = (subtotal * taxRatePercent) / 100;
  const totalAmount = Math.max(0, subtotal + taxAmount - discountAmount);

  const resetForm = () => {
    setInvoiceNumber(`ANX-INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
    setInvoiceDate('12 Aug 2026');
    setDueDate('20 Aug 2026');
    setStatus('Pending');
    setCurrency('INR');
    setBillerName('ANIVEX Solutions');
    setBillerEmail('anivexsolution@gmail.com');
    setBillerAddress('Jaunpur, Uttar Pradesh, India');
    setBillerPhone('+91 7985668826');
    setBillerTaxId('GSTIN: 27AABCA1234F1Z0');
    setClientName('Ramdas Chauhan');
    setClientCompany('Shaurya Jan Sewa Kendra');
    setClientEmail('shauryacsp@gmail.com');
    setClientPhone('+91 7488733181');
    setClientAddress('Babhnauli, Damarua, Jaunpur – 222135, Uttar Pradesh, India');
    setClientRef('SKC/2026/08/12');
    setProjectTitle('Custom Web App');
    setPlaceOfSupply('Uttar Pradesh (09)');
    setWebsiteUrl('www.anivexsolutions.in');
    setDeliveryMethod('Digital Delivery');
    setWarrantySupport('30 Days Support');
    setSupportEmail('support@anivexsolutions.in');
    setSupportPhone('+91 7985668826');
    setBankName('Bank of Baroda');
    setAccountHolderName('ANIVEX SOLUTIONS');
    setAccountNumber('45950100023052');
    setIfscCode('BARBOMACHHA');
    setUpiId('7985668826-2@bybl');
    setUpiQrCodeUrl('');
    setPaymentNotes('Thank you for partnering with ANIVEX Solutions. All deliverables completed according to milestone specifications.');
    setBankDetails('ANIVEX Solutions | Bank of Baroda | A/C: 45950100023052 | IFSC: BARBOMACHHA | UPI: 7985668826-2@bybl');
    setSignatoryName('Krishndas Chauhan');
    setSignatoryTitle('Founder & Managing Director');
    setItems([
      { description: 'CSC Manager', category: 'Web App', quantity: 1, unitPrice: 1000, amount: 1000 },
      { description: 'User Management Module', category: 'Module', quantity: 1, unitPrice: 700, amount: 700 },
      { description: 'Reporting & Analytics Module', category: 'Module', quantity: 1, unitPrice: 500, amount: 500 },
    ]);
    setTaxRatePercent(18);
    setDiscountAmount(0);
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
      clientRef,
      projectTitle,
      placeOfSupply,
      websiteUrl,
      deliveryMethod,
      warrantySupport,
      supportEmail,
      supportPhone,
      items: formattedItems,
      subtotal,
      taxRatePercent: Number(taxRatePercent),
      taxAmount,
      discountAmount: Number(discountAmount),
      totalAmount,
      paymentNotes,
      bankDetails,
      bankName,
      accountHolderName,
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
    setBillerAddress(inv.billerAddress || 'Jaunpur, Uttar Pradesh, India');
    setBillerEmail(inv.billerEmail || 'anivexsolution@gmail.com');
    setBillerPhone(inv.billerPhone || '+91 7985668826');
    setBillerTaxId(inv.billerTaxId || 'GSTIN: 27AABCA1234F1Z0');
    setClientName(inv.clientName);
    setClientCompany(inv.clientCompany || '');
    setClientEmail(inv.clientEmail || '');
    setClientPhone(inv.clientPhone || '');
    setClientAddress(inv.clientAddress || '');
    setClientRef(inv.clientRef || 'SKC/2026/08/12');
    setProjectTitle(inv.projectTitle);
    setPlaceOfSupply(inv.placeOfSupply || 'Uttar Pradesh (09)');
    setWebsiteUrl(inv.websiteUrl || 'www.anivexsolutions.in');
    setDeliveryMethod(inv.deliveryMethod || 'Digital Delivery');
    setWarrantySupport(inv.warrantySupport || '30 Days Support');
    setSupportEmail(inv.supportEmail || 'support@anivexsolutions.in');
    setSupportPhone(inv.supportPhone || '+91 7985668826');
    setPaymentNotes(inv.paymentNotes || '');
    setBankDetails(inv.bankDetails || '');
    setBankName(inv.bankName || 'Bank of Baroda');
    setAccountHolderName(inv.accountHolderName || 'ANIVEX SOLUTIONS');
    setAccountNumber(inv.accountNumber || '45950100023052');
    setIfscCode(inv.ifscCode || 'BARBOMACHHA');
    setUpiId(inv.upiId || '7985668826-2@bybl');
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
                    className="inline-flex items-center gap-1 text-[#F5C85B] hover:text-white font-semibold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Line Item</span>
                  </button>
                </div>

                {items.length > 3 && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                    <Info className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>Notice: Invoice has {items.length} items. Single-page A4 portrait layout automatically tightens row padding and line heights so all items fit cleanly on 1 page without spilling over.</span>
                  </div>
                )}

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

      {/* VIEW & PRINTABLE BILL MODAL WITH SINGLE-PAGE A4 PORTRAIT EXECUTIVE DESIGN */}
      {selectedInvoiceForView && (
        <div id="printable-invoice-modal" className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:static print:block">
          <div id="printable-invoice-card" className="relative bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden my-4 print:my-0 print:rounded-none print:shadow-none print:w-auto print:max-w-none">
            {/* Modal Control Header (Hidden when printing) */}
            <div className="p-3 px-5 bg-[#05070B] text-white flex items-center justify-between print:hidden border-b border-[#D6A84F]/30">
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

            {/* Dedicated Single-Page A4 Container */}
            <div
              id="printable-invoice"
              className="invoice-page w-[210mm] max-w-full h-[297mm] max-h-[297mm] p-[8mm_10mm] bg-white text-slate-900 flex flex-col justify-between box-border overflow-hidden relative mx-auto"
            >
              {/* 1. PREMIUM HEADER */}
              <div className="bg-[#05070B] text-white p-3 rounded-xl border border-[#D6A84F]/40 shadow-xs relative overflow-hidden shrink-0">
                {/* Sweeping Gold Accent Line */}
                <div className="absolute right-0 top-0 w-72 h-full overflow-hidden pointer-events-none opacity-30">
                  <svg viewBox="0 0 300 120" className="w-full h-full">
                    <path d="M 0 120 C 120 10, 220 100, 300 0" fill="none" stroke="#F5C85B" strokeWidth="2.5" />
                  </svg>
                </div>

                <div className="relative z-10 flex justify-between items-center gap-4">
                  {/* Left: Logo & Contact Info */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#121824] p-1.5 flex items-center justify-center shrink-0 border border-[#D6A84F]">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <path d="M 20,80 L 50,20 L 80,80 M 35,55 L 65,55" fill="none" stroke="#F5C85B" strokeWidth="12" strokeLinecap="round" />
                          <path d="M 30,20 L 70,80" fill="none" stroke="#D9DCE1" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-display font-black text-lg text-white uppercase tracking-tight flex items-center gap-1 leading-none">
                          <span>ANIVEX</span> <span className="text-[#F5C85B]">SOLUTIONS</span>
                        </div>
                        <p className="text-[7.5px] text-slate-300 font-mono tracking-widest uppercase font-bold mt-0.5">
                          Software Engineering & Technology Solutions
                        </p>
                      </div>
                    </div>

                    {/* Contact info lines */}
                    <div className="text-[9px] text-slate-200 font-mono grid grid-cols-2 gap-x-3 gap-y-0.5 pt-0.5">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-[#F5C85B] shrink-0" />
                        <span className="truncate">{selectedInvoiceForView.billerAddress || 'Jaunpur, Uttar Pradesh, India'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-[#F5C85B] shrink-0" />
                        <span className="truncate">{selectedInvoiceForView.billerEmail || 'anivexsolution@gmail.com'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-[#F5C85B] shrink-0" />
                        <span>{selectedInvoiceForView.billerPhone || '+91 7985668826'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Globe className="w-3 h-3 text-[#F5C85B] shrink-0" />
                        <span>{selectedInvoiceForView.websiteUrl || 'www.anivexsolutions.in'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Tax Invoice Badge & Metadata */}
                  <div className="text-right space-y-0.5 shrink-0">
                    <div className="inline-block px-2 py-0.5 rounded bg-[#D6A84F]/20 text-[#F5C85B] text-[8.5px] font-mono font-bold uppercase tracking-widest border border-[#D6A84F]/40">
                      OFFICIAL TAX INVOICE
                    </div>
                    <div className="font-mono font-black text-lg text-white tracking-tight">
                      {selectedInvoiceForView.invoiceNumber}
                    </div>

                    <div className="text-[9px] text-slate-200 font-mono space-y-0.5">
                      <div className="flex justify-end gap-2">
                        <span className="text-slate-400">Invoice Date :</span>
                        <span className="font-bold text-white">{selectedInvoiceForView.invoiceDate}</span>
                      </div>
                      <div className="flex justify-end gap-2">
                        <span className="text-slate-400">Due Date :</span>
                        <span className="font-bold text-[#F5C85B]">{selectedInvoiceForView.dueDate}</span>
                      </div>
                      <div className="flex justify-end gap-2">
                        <span className="text-slate-400">Place of Supply :</span>
                        <span className="font-bold text-white">{selectedInvoiceForView.placeOfSupply || 'Uttar Pradesh (09)'}</span>
                      </div>
                      <div className="flex justify-end gap-2">
                        <span className="text-slate-400">Currency :</span>
                        <span className="font-bold text-white">{selectedInvoiceForView.currency || 'INR'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. PAYMENT STATUS BAR */}
              <div className="flex items-center justify-between px-3 py-1 bg-slate-50 rounded-lg border border-slate-200 text-[9.5px] font-mono shrink-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700 uppercase tracking-wider text-[9.5px]">PAYMENT STATUS :</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                    selectedInvoiceForView.status === 'Paid'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : selectedInvoiceForView.status === 'Pending'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}>
                    {selectedInvoiceForView.status}
                  </span>
                </div>
                <div className="text-slate-700 font-bold">
                  Currency : <span className="text-slate-900 font-extrabold">{selectedInvoiceForView.currency || 'INR'}</span>
                </div>
              </div>

              {/* 3. CLIENT + INVOICE DETAILS */}
              <div className="grid grid-cols-2 gap-2.5 shrink-0">
                {/* BILLED TO (CLIENT) CARD */}
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 border-b border-slate-200 pb-1">
                    <User className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span className="text-[9.5px] font-mono font-bold text-slate-700 uppercase tracking-wider">BILLED TO (CLIENT)</span>
                  </div>
                  <div className="space-y-0.5 text-[9.5px] font-mono">
                    <div className="text-[11px] font-bold text-slate-900">{selectedInvoiceForView.clientName}</div>
                    {selectedInvoiceForView.clientCompany && (
                      <div className="text-[10px] font-bold text-slate-800">{selectedInvoiceForView.clientCompany}</div>
                    )}
                    {selectedInvoiceForView.clientEmail && (
                      <div className="flex gap-1.5 text-slate-700">
                        <span className="text-slate-500 w-12 shrink-0">Email:</span>
                        <span className="text-slate-900 font-semibold truncate">{selectedInvoiceForView.clientEmail}</span>
                      </div>
                    )}
                    {selectedInvoiceForView.clientPhone && (
                      <div className="flex gap-1.5 text-slate-700">
                        <span className="text-slate-500 w-12 shrink-0">Phone:</span>
                        <span className="text-slate-900 font-semibold">{selectedInvoiceForView.clientPhone}</span>
                      </div>
                    )}
                    {selectedInvoiceForView.clientAddress && (
                      <div className="flex gap-1.5 text-slate-700">
                        <span className="text-slate-500 w-12 shrink-0">Address:</span>
                        <span className="text-slate-900 font-semibold whitespace-pre-line leading-tight">{selectedInvoiceForView.clientAddress}</span>
                      </div>
                    )}
                    <div className="flex gap-1.5 pt-0.5 border-t border-slate-200 text-[9px]">
                      <span className="text-slate-500">Client Ref:</span>
                      <span className="text-slate-900 font-bold">{selectedInvoiceForView.clientRef || `SKC/${selectedInvoiceForView.invoiceDate.replace(/-/g, '/')}`}</span>
                    </div>
                  </div>
                </div>

                {/* INVOICE DETAILS CARD */}
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 border-b border-slate-200 pb-1">
                    <FileText className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span className="text-[9.5px] font-mono font-bold text-slate-700 uppercase tracking-wider">INVOICE DETAILS</span>
                  </div>
                  <div className="text-[9.5px] text-slate-700 font-mono space-y-0.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Invoice Number:</span>
                      <span className="text-slate-900 font-bold">{selectedInvoiceForView.invoiceNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Invoice Date:</span>
                      <span className="text-slate-900 font-semibold">{selectedInvoiceForView.invoiceDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Due Date:</span>
                      <span className="text-slate-900 font-semibold">{selectedInvoiceForView.dueDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Payment Status:</span>
                      <span className="text-amber-800 bg-amber-100 font-bold px-2 py-0.2 rounded-full text-[8.5px] uppercase border border-amber-300">
                        {selectedInvoiceForView.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Currency:</span>
                      <span className="text-slate-900 font-semibold">{selectedInvoiceForView.currency || 'INR'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Place of Supply:</span>
                      <span className="text-slate-900 font-semibold">{selectedInvoiceForView.placeOfSupply || 'Uttar Pradesh (09)'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. PROJECT SCOPE */}
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 flex items-center justify-between gap-2 shrink-0">
                <div className="space-y-0.5 text-left">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span className="text-[9.5px] font-mono font-bold text-slate-800 uppercase tracking-wider">PROJECT SCOPE & TERMS</span>
                  </div>
                  <p className="text-[9px] text-slate-600 font-medium">Thank you for partnering with ANIVEX Solutions. Deliverables completed as scoped.</p>
                </div>

                {/* 4 Feature Badges */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-1.5 py-0.5 rounded text-[8px] font-bold text-slate-800">
                    <Clock className="w-2.5 h-2.5 text-[#D6A84F]" />
                    <span>On-Time</span>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-1.5 py-0.5 rounded text-[8px] font-bold text-slate-800">
                    <Award className="w-2.5 h-2.5 text-[#D6A84F]" />
                    <span>Quality</span>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-1.5 py-0.5 rounded text-[8px] font-bold text-slate-800">
                    <ShieldCheck className="w-2.5 h-2.5 text-[#D6A84F]" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-1.5 py-0.5 rounded text-[8px] font-bold text-slate-800">
                    <Headphones className="w-2.5 h-2.5 text-[#D6A84F]" />
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>

              {/* 5. SERVICE TABLE */}
              <div className="border border-slate-300 rounded-lg overflow-hidden shrink-0">
                <table className="w-full text-left text-[9.5px]">
                  <thead className="bg-[#05070B] text-white font-mono text-[8.5px] uppercase border-b border-slate-300">
                    <tr>
                      <th className="py-1.5 px-2 w-6 text-center">#</th>
                      <th className="py-1.5 px-2">SERVICE / DELIVERABLE</th>
                      <th className="py-1.5 px-2 w-20">CATEGORY</th>
                      <th className="py-1.5 px-2 text-center w-8">QTY</th>
                      <th className="py-1.5 px-2 text-right w-20">RATE (₹)</th>
                      <th className="py-1.5 px-2 text-right w-20">AMOUNT (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800">
                    {selectedInvoiceForView.items.map((item, i) => {
                      const isMoreThanThree = selectedInvoiceForView.items.length > 3;
                      const pyClass = isMoreThanThree ? 'py-1 px-2' : 'py-1.5 px-2';
                      return (
                        <tr key={item.id || i} className="bg-white border-b border-dotted border-slate-200">
                          <td className={`${pyClass} font-mono text-slate-500 font-bold text-center`}>{i + 1}</td>
                          <td className={pyClass}>
                            <div className="font-bold text-slate-900 leading-tight">{item.description.split('\n')[0]}</div>
                            {item.description.includes('\n') ? (
                              <div className="text-[8.5px] text-slate-500 font-normal mt-0.5 line-clamp-1">
                                {item.description.split('\n').slice(1).join('\n')}
                              </div>
                            ) : (
                              <div className="text-[8.5px] text-slate-500 font-normal mt-0.5 line-clamp-1">
                                {i === 0 && 'Complete CSC management system with user, service & reporting modules.'}
                                {i === 1 && 'User registration, role management, permissions & activity tracking.'}
                                {i === 2 && 'Dashboard, analytics, reports generation and export functionality.'}
                              </div>
                            )}
                          </td>
                          <td className={`${pyClass} text-slate-600 font-mono text-[8.5px]`}>{item.category || 'Web App'}</td>
                          <td className={`${pyClass} text-center font-mono font-bold`}>{item.quantity}</td>
                          <td className={`${pyClass} text-right font-mono`}>{formatCurrency(item.unitPrice, selectedInvoiceForView.currency)}</td>
                          <td className={`${pyClass} text-right font-mono font-extrabold text-slate-900`}>{formatCurrency(item.amount, selectedInvoiceForView.currency)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* 6. PAYMENT + TOTAL SECTION */}
              <div className="grid grid-cols-2 gap-2.5 items-start shrink-0">
                {/* Left: Payment Details Card */}
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1 border-b border-slate-200 pb-1">
                    <Landmark className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span className="text-[9.5px] font-mono font-bold text-slate-700 uppercase tracking-wider">PAYMENT DETAILS</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    {/* QR Code */}
                    <div className="shrink-0 flex flex-col items-center bg-white p-1 rounded border border-slate-200 text-center">
                      <img
                        src={
                          selectedInvoiceForView.upiQrCodeUrl ||
                          `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                            `upi://pay?pa=${selectedInvoiceForView.upiId || '7985668826-2@bybl'}&pn=ANIVEX%20Solutions&am=${selectedInvoiceForView.totalAmount}&cu=INR`
                          )}`
                        }
                        alt="UPI QR Code"
                        className="w-14 h-14 object-contain"
                      />
                      <span className="text-[6.5px] font-mono font-extrabold text-slate-800 mt-0.5 uppercase tracking-wider">
                        SCAN TO PAY VIA UPI
                      </span>
                    </div>

                    {/* Bank text details */}
                    <div className="text-[9px] text-slate-800 font-mono space-y-0.5 w-full">
                      <div className="flex gap-1">
                        <span className="text-slate-500 w-16 shrink-0">Bank Name:</span>
                        <span className="text-slate-900 font-bold truncate">{selectedInvoiceForView.bankName || 'Bank of Baroda'}</span>
                      </div>
                      <div className="flex gap-1">
                        <span className="text-slate-500 w-16 shrink-0">Account:</span>
                        <span className="text-slate-900 font-bold truncate">{selectedInvoiceForView.accountHolderName || 'ANIVEX SOLUTIONS'}</span>
                      </div>
                      <div className="flex gap-1">
                        <span className="text-slate-500 w-16 shrink-0">A/C No:</span>
                        <span className="text-slate-900 font-bold">{selectedInvoiceForView.accountNumber || '45950100023052'}</span>
                      </div>
                      <div className="flex gap-1">
                        <span className="text-slate-500 w-16 shrink-0">IFSC Code:</span>
                        <span className="text-slate-900 font-bold">{selectedInvoiceForView.ifscCode || 'BARBOMACHHA'}</span>
                      </div>
                      <div className="flex gap-1">
                        <span className="text-slate-500 w-16 shrink-0">UPI ID:</span>
                        <span className="text-[#05070B] font-extrabold truncate">{selectedInvoiceForView.upiId || '7985668826-2@bybl'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment App Logos */}
                  <div className="pt-0.5 border-t border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[7.5px] font-mono font-bold">
                      <span className="px-1 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">GPay</span>
                      <span className="px-1 py-0.2 rounded bg-purple-50 text-purple-700 border border-purple-200">PhonePe</span>
                      <span className="px-1 py-0.2 rounded bg-sky-50 text-sky-700 border border-sky-200">Paytm</span>
                      <span className="px-1 py-0.2 rounded bg-[#05070B] text-white border border-slate-700">BHIM</span>
                      <span className="px-1 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200">UPI</span>
                    </div>
                  </div>
                </div>

                {/* Right: Calculated Totals Box */}
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 space-y-1">
                  <div className="text-[9.5px] text-slate-700 font-mono space-y-0.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Subtotal:</span>
                      <span className="font-bold text-slate-900">{formatCurrency(selectedInvoiceForView.subtotal, selectedInvoiceForView.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Discount:</span>
                      <span className="font-bold text-slate-900">{formatCurrency(selectedInvoiceForView.discountAmount, selectedInvoiceForView.currency)}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-0.5">
                      <span className="text-slate-500">Taxable Amount:</span>
                      <span className="font-bold text-slate-900">{formatCurrency(Math.max(0, selectedInvoiceForView.subtotal - selectedInvoiceForView.discountAmount), selectedInvoiceForView.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">GST ({selectedInvoiceForView.taxRatePercent}%):</span>
                      <span className="font-bold text-slate-900">+{formatCurrency(selectedInvoiceForView.taxAmount, selectedInvoiceForView.currency)}</span>
                    </div>

                    {/* Big Dark Navy Total Bar */}
                    <div className="bg-[#05070B] text-white p-1.5 rounded-md flex items-center justify-between border border-[#D6A84F]/40 shadow-xs">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-200">
                        TOTAL AMOUNT PAYABLE
                      </span>
                      <span className="font-mono text-sm font-black text-[#F5C85B]">
                        {formatCurrency(selectedInvoiceForView.totalAmount, selectedInvoiceForView.currency)}
                      </span>
                    </div>

                    {/* Amount in words */}
                    <p className="text-[8.5px] text-center font-serif italic text-slate-700 pt-0.5 font-medium">
                      {numberToWords(selectedInvoiceForView.totalAmount, selectedInvoiceForView.currency)}
                    </p>
                  </div>
                </div>
              </div>

              {/* 7. BOTTOM 3-COLUMN SECTION: ADDITIONAL INFO + TERMS + SIGNATURE */}
              <div className="grid grid-cols-3 gap-2 shrink-0">
                {/* COL 1: ADDITIONAL INFORMATION */}
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 space-y-0.5">
                  <div className="flex items-center gap-1 border-b border-slate-200 pb-0.5">
                    <Info className="w-3 h-3 text-[#D6A84F]" />
                    <span className="text-[8.5px] font-mono font-bold text-slate-700 uppercase tracking-wider">ADDITIONAL INFO</span>
                  </div>
                  <div className="text-[8.5px] text-slate-700 font-mono space-y-0.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Delivery:</span>
                      <span className="font-bold text-slate-900 truncate">{selectedInvoiceForView.deliveryMethod || 'Digital'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Date:</span>
                      <span className="font-bold text-slate-900">{selectedInvoiceForView.invoiceDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Warranty:</span>
                      <span className="font-bold text-slate-900">{selectedInvoiceForView.warrantySupport || '30 Days'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Support:</span>
                      <span className="font-bold text-slate-900 truncate">{selectedInvoiceForView.supportEmail || 'support@anivex.in'}</span>
                    </div>
                  </div>
                </div>

                {/* COL 2: TERMS & CONDITIONS */}
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 space-y-0.5">
                  <div className="flex items-center gap-1 border-b border-slate-200 pb-0.5">
                    <ShieldCheck className="w-3 h-3 text-[#D6A84F]" />
                    <span className="text-[8.5px] font-mono font-bold text-slate-700 uppercase tracking-wider">TERMS & CONDITIONS</span>
                  </div>
                  <ul className="text-[7.5px] text-slate-600 space-y-0.5 list-disc list-inside leading-tight font-sans">
                    <li>Payment due within 8 days.</li>
                    <li>Late payment attracts interest.</li>
                    <li>Computer generated tax invoice.</li>
                    <li>Jaunpur jurisdiction only.</li>
                  </ul>
                </div>

                {/* COL 3: AUTHORIZED SIGNATURE */}
                <div className="flex flex-col items-center justify-center p-1.5 rounded-lg border border-dashed border-[#D6A84F]/60 bg-slate-50 text-center space-y-0.5">
                  <div className="relative flex flex-col items-center justify-center">
                    {/* Cursive Signature */}
                    <div className="font-serif italic text-xs font-bold text-[#05070B] tracking-wider relative z-10">
                      Krishndas Chauhan
                    </div>

                    {/* Double-Ring Circular Seal Stamp SVG */}
                    <div className="my-0.5">
                      <svg className="w-10 h-10 text-[#D6A84F]" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
                        <path id="circlePath" d="M 18 50 A 32 32 0 1 1 82 50" fill="none" />
                        <text className="text-[7.5px] font-mono font-bold uppercase fill-[#05070B] tracking-widest">
                          <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                            ANIVEX SOLUTIONS
                          </textPath>
                        </text>
                        <polygon points="50,28 54,38 65,38 56,44 59,55 50,48 41,55 44,44 35,38 46,38" fill="currentColor" opacity="0.8" />
                        <text x="50" y="70" textAnchor="middle" className="text-[6px] font-mono font-extrabold fill-slate-800 uppercase">
                          ★ OFFICIAL SEAL ★
                        </text>
                      </svg>
                    </div>
                  </div>

                  <div className="text-[7.5px] font-bold text-slate-500 uppercase tracking-widest border-t border-slate-300 pt-0.5 w-full">
                    Authorized Signature
                  </div>
                  <div className="text-[9px] font-black text-slate-900">Krishndas Chauhan</div>
                  <div className="text-[7.5px] text-slate-600 font-semibold">Founder & Managing Director</div>
                  <div className="text-[7.5px] text-[#D6A84F] font-mono font-bold uppercase tracking-wider">
                    ANIVEX SOLUTIONS
                  </div>
                </div>
              </div>

              {/* 8. FOOTER */}
              <div className="bg-[#05070B] text-white px-2.5 py-1 rounded-lg border border-[#D6A84F]/30 flex items-center justify-between text-[7.5px] font-mono shrink-0">
                <div className="text-slate-300">Thank you for partnering with ANIVEX Solutions.</div>
                <div className="flex items-center gap-1.5 text-[#F5C85B]">
                  <span>www.anivexsolutions.in</span>
                  <span>•</span>
                  <span>anivexsolution@gmail.com</span>
                  <span>•</span>
                  <span>+91 7985668826</span>
                </div>
                <div className="text-slate-400">© 2026 ANIVEX Solutions</div>
              </div>
            </div>

            {/* Modal Control Footer (Hidden when printing) */}
            <div className="p-3 px-5 bg-[#05070B] text-white flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden border-t border-[#D6A84F]/30">
              <div className="text-xs text-slate-400 font-mono text-center sm:text-left flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Single-Page A4 Portrait Layout • Guaranteed 1-Page Output</span>
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
