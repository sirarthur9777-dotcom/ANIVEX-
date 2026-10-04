import React, { useState, useEffect, useRef } from 'react';
import { useCms } from '../../context/CmsContext';
import { Landmark, QrCode, Save, Building2, Smartphone, Loader2, CheckCircle2 } from 'lucide-react';

export const PaymentSettingsManager: React.FC = () => {
  const { paymentSettings, updatePaymentSettings } = useCms();
  const [isSaving, setIsSaving] = useState(false);
  const isSubmittingRef = useRef(false);

  const [formData, setFormData] = useState({
    upiId: paymentSettings.upiId || '',
    upiName: paymentSettings.upiName || 'Anivex Solution',
    qrCodeUrl: paymentSettings.qrCodeUrl || '',
    bankName: paymentSettings.bankName || '',
    accountHolderName: paymentSettings.accountHolderName || 'Anivex Solution',
    accountNumber: paymentSettings.accountNumber || '',
    ifscCode: paymentSettings.ifscCode || '',
    paymentInstructions: paymentSettings.paymentInstructions || 'Scan the UPI QR code using any payment app or transfer directly to our bank account.',
    paymentButtonText: paymentSettings.paymentButtonText || 'Make Direct Payment / View QR',
    enabled: paymentSettings.enabled !== false,
  });

  useEffect(() => {
    setFormData({
      upiId: paymentSettings.upiId || '',
      upiName: paymentSettings.upiName || 'Anivex Solution',
      qrCodeUrl: paymentSettings.qrCodeUrl || '',
      bankName: paymentSettings.bankName || '',
      accountHolderName: paymentSettings.accountHolderName || 'Anivex Solution',
      accountNumber: paymentSettings.accountNumber || '',
      ifscCode: paymentSettings.ifscCode || '',
      paymentInstructions: paymentSettings.paymentInstructions || 'Scan the UPI QR code using any payment app or transfer directly to our bank account.',
      paymentButtonText: paymentSettings.paymentButtonText || 'Make Direct Payment / View QR',
      enabled: paymentSettings.enabled !== false,
    });
  }, [paymentSettings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingRef.current || isSaving) return;
    isSubmittingRef.current = true;
    setIsSaving(true);
    try {
      await updatePaymentSettings({
        ...formData,
        paymentMethods: ['UPI (GPay / PhonePe / Paytm / BHIM)', 'Bank Transfer (IMPS / NEFT / RTGS)', 'Credit / Debit Cards', 'Wire Transfer'],
      });
    } finally {
      setIsSaving(false);
      isSubmittingRef.current = false;
    }
  };

  const dynamicQrUrl = formData.qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=${formData.upiId}&pn=${encodeURIComponent(formData.upiName)}&am=&cu=INR`)}`;

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Landmark className="w-6 h-6 text-[#F97316]" />
            <h2 className="font-heading font-extrabold text-2xl text-slate-900">Payment Panel & Settings</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure UPI ID, Bank details, and QR codes. Used for administrative invoicing, client contracts, and official project billing.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>ADMIN-SECURED FIRESTORE SYNC</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form Fields */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* UPI Settings Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-200 text-[#F97316]">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-slate-900">UPI Payment Settings</h3>
                  <p className="text-xs text-slate-500">UPI ID, Payee Name & Invoicing QR Configuration</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5 uppercase tracking-wide text-[11px]">UPI ID *</label>
                  <input
                    type="text"
                    required
                    value={formData.upiId}
                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                    placeholder="e.g. anivex@okhdfcbank"
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-slate-900 font-mono focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5 uppercase tracking-wide text-[11px]">Payee / Account Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.upiName}
                    onChange={(e) => setFormData({ ...formData, upiName: e.target.value })}
                    placeholder="Anivex Solution"
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-slate-900 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5 uppercase tracking-wide">Custom Static QR Code Image URL (Optional)</label>
                <input
                  type="text"
                  value={formData.qrCodeUrl}
                  onChange={(e) => setFormData({ ...formData, qrCodeUrl: e.target.value })}
                  placeholder="Leave empty to use dynamic UPI QR code generator"
                  className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 focus:outline-none"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  If left empty, a dynamic QR code will be generated from your UPI ID (<code className="font-mono text-slate-700">upi://pay?pa={formData.upiId || '...'}</code>).
                </span>
              </div>
            </div>

            {/* Bank Transfer Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-slate-900">Bank Account Details</h3>
                  <p className="text-xs text-slate-500">Official IMPS / NEFT / RTGS Wire Transfer Info for Invoices</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5 uppercase tracking-wide text-[11px]">Bank Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    placeholder="e.g. HDFC Bank Ltd"
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-slate-900 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5 uppercase tracking-wide text-[11px]">Account Holder Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.accountHolderName}
                    onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                    placeholder="Anivex Solution"
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-slate-900 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5 uppercase tracking-wide text-[11px]">Account Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    placeholder="e.g. 50200012345678"
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-slate-900 font-mono focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5 uppercase tracking-wide text-[11px]">IFSC Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.ifscCode}
                    onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                    placeholder="e.g. HDFC0001234"
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-slate-900 font-mono focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1.5 uppercase tracking-wide">Invoice Payment Instructions</label>
                <textarea
                  rows={3}
                  value={formData.paymentInstructions}
                  onChange={(e) => setFormData({ ...formData, paymentInstructions: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 focus:outline-none resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-3.5 rounded-xl bg-[#0B1F3A] hover:bg-[#122A4E] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Payment Settings</span>
                </>
              )}
            </button>

          </div>

          {/* Right Live Preview Box */}
          <div className="lg:col-span-5 space-y-6 sticky top-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-[#F97316]" />
                  <span className="font-heading font-bold text-sm text-slate-900 uppercase tracking-wider">Invoice QR Preview</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-mono border border-emerald-200 uppercase font-bold">
                  ADMIN ONLY
                </span>
              </div>

              {/* QR Code Graphic Card */}
              <div className="flex flex-col items-center bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-3">
                <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <img
                    src={dynamicQrUrl}
                    alt="UPI QR Code"
                    className="w-40 h-40 object-contain"
                  />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">{formData.upiName || 'Anivex Solution'}</div>
                  <div className="text-sm font-mono font-extrabold text-[#F97316] mt-0.5">{formData.upiId || 'Not configured'}</div>
                </div>
                <div className="text-[10px] text-slate-600 font-mono uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-slate-200">
                  SCAN WITH ANY UPI APP (GPAY, PHONEPE, PAYTM, BHIM)
                </div>
              </div>

              {/* Bank Details Summary */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs font-mono">
                <div className="text-[10px] font-bold text-slate-800 uppercase border-b border-slate-200 pb-1 flex items-center justify-between">
                  <span>OFFICIAL BANK DETAILS</span>
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Bank:</span>
                  <span className="font-bold text-slate-900">{formData.bankName || '—'}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Holder:</span>
                  <span className="font-bold text-slate-900">{formData.accountHolderName || '—'}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Account No:</span>
                  <span className="font-bold text-slate-900">{formData.accountNumber || '—'}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>IFSC Code:</span>
                  <span className="font-bold text-slate-900">{formData.ifscCode || '—'}</span>
                </div>
              </div>

              {/* Instructions preview */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-1">Instructions:</span>
                {formData.paymentInstructions}
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};
