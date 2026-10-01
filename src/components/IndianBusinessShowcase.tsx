import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Smartphone, Receipt, CheckCircle2, MessageCircle, PhoneCall, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { formatWhatsAppUrl } from '../services/websiteSettings';

export const IndianBusinessShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'web' | 'mobile' | 'billing'>('web');
  const { websiteSettings, companyInfo } = useCms();

  const phone = websiteSettings?.whatsapp || websiteSettings?.phone || companyInfo?.phone || '';
  const whatsappUrl = formatWhatsAppUrl(
    phone,
    'Namaste Anivex Solution! I want to discuss a new software/website project for my business.'
  );

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Warm Ambient Glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-[#D97706]/30 via-[#F59E0B]/20 to-[#10B981]/20 rounded-3xl blur-xl opacity-70" />

      {/* Main Card */}
      <div className="relative rounded-3xl bg-[#0F172A] border border-[#F59E0B]/30 shadow-2xl p-6 sm:p-7 text-white overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🇮🇳</span>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-display font-bold text-sm tracking-wide text-white">Anivex Solution Digital Hub</h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available Now
                </span>
              </div>
              <p className="text-[11px] text-amber-200/80">Tailored for Indian Businesses & Startups</p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md hover:shadow-emerald-500/30 cursor-pointer"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Interactive Segmented Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#1E293B] rounded-2xl mb-5 border border-white/5">
          <button
            type="button"
            onClick={() => setActiveTab('web')}
            className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'web'
                ? 'bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-[#0F172A] shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="truncate">Websites</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('mobile')}
            className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'mobile'
                ? 'bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-[#0F172A] shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="truncate">Mobile Apps</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('billing')}
            className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'billing'
                ? 'bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-[#0F172A] shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span className="truncate">GST Billing</span>
          </button>
        </div>

        {/* Dynamic Interactive Preview Box */}
        <div className="bg-[#1E293B]/80 rounded-2xl p-5 border border-white/10 mb-5 space-y-4">
          {activeTab === 'web' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-white text-sm">Business Website & E-Store</h5>
                  <p className="text-xs text-amber-300/90">Apne business ko online le jayein</p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20">
                  From ₹15,000
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#0F172A] border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Loading Speed</span>
                  <span className="font-bold text-emerald-400 text-sm">⚡ 0.8s Ultra Fast</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0F172A] border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Turnaround Time</span>
                  <span className="font-bold text-amber-300 text-sm">📅 5 to 7 Days</span>
                </div>
              </div>

              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Mobile & Desktop 100% Responsive</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Direct WhatsApp Chat & Inquiry Button</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Google Maps & Local Search SEO Setup</span>
                </li>
              </ul>
            </motion.div>
          )}

          {activeTab === 'mobile' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-white text-sm">Android & iOS Mobile Apps</h5>
                  <p className="text-xs text-amber-300/90">Play Store ready high-speed apps</p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20">
                  Custom Quote
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#0F172A] border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Platform</span>
                  <span className="font-bold text-emerald-400 text-sm">📱 Android & iOS</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0F172A] border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Security</span>
                  <span className="font-bold text-amber-300 text-sm">🔒 OTP & Biometric</span>
                </div>
              </div>

              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Google Play Store Deployment & Testing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Push Notifications & Customer Offers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Easy Admin Dashboard to Update Products</span>
                </li>
              </ul>
            </motion.div>
          )}

          {activeTab === 'billing' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-white text-sm">GST Billing & Dukaan Software</h5>
                  <p className="text-xs text-amber-300/90">Vyapar, Stock aur Hisaab-Kitaab</p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20">
                  Ready to Deploy
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#0F172A] border border-white/5">
                  <span className="text-slate-400 block text-[10px]">GST Reports</span>
                  <span className="font-bold text-emerald-400 text-sm">🧾 1-Click GSTR-1</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0F172A] border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Payment Settle</span>
                  <span className="font-bold text-amber-300 text-sm">💳 UPI QR on Bill</span>
                </div>
              </div>

              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Instant WhatsApp Invoice PDF Send</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Low Stock Alerts & Barcode Scanner</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Multi-User Permissions (Cashier vs Owner)</span>
                </li>
              </ul>
            </motion.div>
          )}
        </div>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href="#contact"
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-[#0F172A] font-extrabold text-xs text-center flex items-center justify-center gap-2 shadow-lg hover:shadow-[#F59E0B]/30 hover:scale-[1.01] transition-all cursor-pointer"
          >
            <span>Request Free Quotation</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-3 px-4 rounded-xl bg-[#1E293B] border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp Call/Chat</span>
          </a>
        </div>

        {/* Bottom Trust Micro-Bar */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            100% Indian Tech Agency
          </span>
          <span className="text-amber-300 font-medium">Bilingual Support (Hindi / English)</span>
        </div>
      </div>
    </div>
  );
};
