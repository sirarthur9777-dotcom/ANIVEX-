import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { formatWhatsAppUrl } from '../services/websiteSettings';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const { companyInfo, websiteSettings } = useCms();

  const phone = websiteSettings?.whatsapp || websiteSettings?.phone || companyInfo?.phone || '';
  const defaultMessage = 'Namaste Anivex Solution! I am interested in discussing a website/software project.';
  const whatsappUrl = formatWhatsAppUrl(phone, defaultMessage);

  return (
    <aside aria-label="WhatsApp Contact" className="fixed bottom-6 right-6 z-50 flex items-end flex-col gap-2">
      {/* Friendly Tooltip */}
      {showTooltip && (
        <div className="relative bg-[#0B1F3A] border border-[#F97316]/30 text-white rounded-xl p-3 shadow-xl max-w-[220px] text-xs">
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            aria-label="Dismiss WhatsApp hint"
            className="absolute top-1.5 right-1.5 p-1 text-slate-400 hover:text-white"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-center gap-1.5 text-[#F97316] font-bold text-[11px] mb-1">
            <span>Direct WhatsApp</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-tight">
            Have a question? Talk with our engineering team on WhatsApp.
          </p>
        </div>
      )}

      {/* Pulsing Emerald Green WhatsApp Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        aria-label="Chat with Anivex Solution on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="font-semibold tracking-wide">WhatsApp Us</span>
      </a>
    </aside>
  );
};
