import React, { useState, useEffect } from 'react';
import { useCms } from '../../context/CmsContext';
import { Landmark, QrCode, CreditCard, Save, CheckCircle2, Copy, ShieldCheck, Sparkles, Building2, Smartphone } from 'lucide-react';

export const PaymentSettingsManager: React.FC = () => {
  const { paymentSettings, updatePaymentSettings, showToast } = useCms();

  const [formData, setFormData] = useState({
    upiId: paymentSettings.upiId || '7985668826-2@bybl',
    upiName: paymentSettings.upiName || 'ANIVEX SOLUTIONS',
    qrCodeUrl: paymentSettings.qrCodeUrl || '',
    bankName: paymentSettings.bankName || 'Bank of Baroda',
    accountHolderName: paymentSettings.accountHolderName || 'ANIVEX SOLUTIONS',
    accountNumber: paymentSettings.accountNumber || '45950100023052',
    ifscCode: paymentSettings.ifscCode || 'BARBOMACHHA',
    paymentInstructions: paymentSettings.paymentInstructions || 'Scan the UPI QR code using any payment app or transfer directly to our Bank of Baroda account.',
    paymentButtonText: paymentSettings.paymentButtonText || 'Make Direct Payment / View QR',
    enabled: paymentSettings.enabled !== false,
  });

  useEffect(() => {
    setFormData({
      upiId: paymentSettings.upiId || '7985668826-2@bybl',
      upiName: paymentSettings.upiName || 'ANIVEX SOLUTIONS',
      qrCodeUrl: paymentSettings.qrCodeUrl || '',
      bankName: paymentSettings.bankName || 'Bank of Baroda',
      accountHolderName: paymentSettings.accountHolderName || 'ANIVEX SOLUTIONS',
      accountNumber: paymentSettings.accountNumber || '45950100023052',
      ifscCode: paymentSettings.ifscCode || 'BARBOMACHHA',
      paymentInstructions: paymentSettings.paymentInstructions || 'Scan the UPI QR code using any payment app or transfer directly to our Bank of Baroda account.',
      paymentButtonText: paymentSettings.paymentButtonText || 'Make Direct Payment / View QR',
      enabled: paymentSettings.enabled !== false,
    });
  }, [paymentSettings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePaymentSettings({
      ...formData,
      paymentMethods: ['UPI (GPay / PhonePe / Paytm / BHIM)', 'Bank Transfer (IMPS / NEFT / RTGS)', 'Credit / Debit Cards', 'Wire Transfer'],
    });
  };

  const dynamicQrUrl = formData.qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=${formData.upiId}&pn=${encodeURIComponent(formData.upiName)}&am=&cu=INR`)}`;

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Landmark className="w-6 h-6 text-[#F5C85B]" />
            <h2 className="font-display font-bold text-2xl text-white">Payment Panel & Settings</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure UPI ID, Bank details, and QR codes. Updates synchronize instantly to the public website and invoice generator.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>LIVE FIRESTORE SYNC</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form Fields */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* UPI Settings Card */}
            <div className="p-6 rounded-3xl bg-[#0B0F16] border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <div className="p-2.5 rounded-xl bg-[#121824] border border-[#D6A84F]/30 text-[#F5C85B]">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white">UPI Payment Settings</h3>
                  <p className="text-xs text-slate-400">UPI ID, Payee Name & QR Code Configuration</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-mono mb-1.5 uppercase">UPI ID *</label>
                  <input
                    type="text"
                    required
                    value={formData.upiId}
                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                    placeholder="7985668826-2@bybl"
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl p-3 text-white font-mono focus:border-[#D6A84F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1.5 uppercase">Payee / Account Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.upiName}
                    onChange={(e) => setFormData({ ...formData, upiName: e.target.value })}
                    placeholder="ANIVEX SOLUTIONS"
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl p-3 text-white focus:border-[#D6A84F] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-mono text-xs mb-1.5 uppercase">Custom Static QR Code Image URL (Optional)</label>
                <input
                  type="text"
                  value={formData.qrCodeUrl}
                  onChange={(e) => setFormData({ ...formData, qrCodeUrl: e.target.value })}
                  placeholder="Leave empty to use dynamic UPI QR code generator"
                  className="w-full bg-[#05070B] border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-slate-600 focus:border-[#D6A84F] focus:outline-none"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  If left empty, a dynamic QR code will be generated from your UPI ID (`upi://pay?pa={formData.upiId}`).
                </span>
              </div>
            </div>

            {/* Bank Transfer Card */}
            <div className="p-6 rounded-3xl bg-[#0B0F16] border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <div className="p-2.5 rounded-xl bg-[#121824] border border-[#D6A84F]/30 text-[#F5C85B]">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white">Bank Account Details</h3>
                  <p className="text-xs text-slate-400">Direct IMPS / NEFT / RTGS Wire Transfer Info</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-mono mb-1.5 uppercase">Bank Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    placeholder="Bank of Baroda"
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl p-3 text-white focus:border-[#D6A84F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1.5 uppercase">Account Holder Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.accountHolderName}
                    onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                    placeholder="ANIVEX SOLUTIONS"
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl p-3 text-white focus:border-[#D6A84F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1.5 uppercase">Account Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    placeholder="45950100023052"
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl p-3 text-white font-mono focus:border-[#D6A84F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1.5 uppercase">IFSC Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.ifscCode}
                    onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                    placeholder="BARBOMACHHA"
                    className="w-full bg-[#05070B] border border-white/10 rounded-xl p-3 text-white font-mono focus:border-[#D6A84F] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Instructions & UI Labels */}
            <div className="p-6 rounded-3xl bg-[#0B0F16] border border-white/10 space-y-4 shadow-xl">
              <div>
                <label className="block text-slate-300 font-mono text-xs mb-1.5 uppercase">Payment Instructions</label>
                <textarea
                  rows={3}
                  value={formData.paymentInstructions}
                  onChange={(e) => setFormData({ ...formData, paymentInstructions: e.target.value })}
                  className="w-full bg-[#05070B] border border-white/10 rounded-xl p-3 text-xs text-white focus:border-[#D6A84F] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono text-xs mb-1.5 uppercase">Public Website Payment Button Label</label>
                <input
                  type="text"
                  value={formData.paymentButtonText}
                  onChange={(e) => setFormData({ ...formData, paymentButtonText: e.target.value })}
                  placeholder="Make Direct Payment / View QR"
                  className="w-full bg-[#05070B] border border-white/10 rounded-xl p-3 text-xs text-white focus:border-[#D6A84F] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(245,200,91,0.4)] transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish Payment Settings</span>
            </button>

          </div>

          {/* Right Live Preview Box */}
          <div className="lg:col-span-5 space-y-6 sticky top-6">
            <div className="p-6 rounded-3xl bg-[#0B0F16] border border-[#D6A84F]/40 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-[#F5C85B]" />
                  <span className="font-display font-bold text-sm text-white uppercase tracking-wider">Live Public Preview</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#D6A84F]/20 text-[#F5C85B] text-[10px] font-mono border border-[#D6A84F]/30 uppercase font-bold">
                  UPDATES LIVE
                </span>
              </div>

              {/* QR Code Graphic Card */}
              <div className="flex flex-col items-center bg-[#05070B] p-6 rounded-2xl border border-white/10 text-center space-y-3">
                <div className="p-3 bg-white rounded-2xl border-2 border-[#D6A84F] shadow-xl">
                  <img
                    src={dynamicQrUrl}
                    alt="UPI QR Code"
                    className="w-40 h-40 object-contain"
                  />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">{formData.upiName || 'ANIVEX SOLUTIONS'}</div>
                  <div className="text-sm font-mono font-extrabold text-[#F5C85B] mt-0.5">{formData.upiId || '7985668826-2@bybl'}</div>
                </div>
                <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                  SCAN WITH ANY UPI APP (GPAY, PHONEPE, PAYTM, BHIM)
                </div>
              </div>

              {/* Bank Details Summary */}
              <div className="bg-[#05070B] p-4 rounded-2xl border border-white/10 space-y-2 text-xs font-mono">
                <div className="text-[10px] font-bold text-[#F5C85B] uppercase border-b border-white/10 pb-1 flex items-center justify-between">
                  <span>DIRECT BANK TRANSFER</span>
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Bank:</span>
                  <span className="font-bold text-white">{formData.bankName}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Holder:</span>
                  <span className="font-bold text-white">{formData.accountHolderName}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Account No:</span>
                  <span className="font-bold text-white">{formData.accountNumber}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">IFSC Code:</span>
                  <span className="font-bold text-white">{formData.ifscCode}</span>
                </div>
              </div>

              {/* Instructions preview */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-300 leading-relaxed">
                <span className="font-bold text-[#F5C85B] block mb-1">Instructions:</span>
                {formData.paymentInstructions}
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};
