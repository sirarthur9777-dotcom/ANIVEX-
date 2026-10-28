import React, { useState } from 'react';
import { X } from 'lucide-react';
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

      {/* Circular WhatsApp Floating Action Button (Logo Only) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.65)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Chat with Anivex Solution on WhatsApp"
        title="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white border-2 border-[#25D366]" />
        </span>
        {/* Official WhatsApp SVG Icon */}
        <svg
          className="w-7 h-7 fill-white transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.12 19.77 7.85 19.02L7.55 18.84L4.43 19.66L5.26 16.62L5.06 16.3C4.24 15 3.8 13.48 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.57 14.39C16.32 14.27 15.1 13.67 14.87 13.58C14.64 13.5 14.48 13.45 14.31 13.7C14.15 13.95 13.67 14.52 13.52 14.69C13.38 14.85 13.23 14.88 12.98 14.75C12.74 14.63 11.94 14.37 11 13.53C10.26 12.87 9.77 12.06 9.62 11.82C9.48 11.57 9.61 11.44 9.73 11.32C9.84 11.21 9.98 11.03 10.1 10.88C10.23 10.74 10.27 10.64 10.35 10.47C10.43 10.31 10.39 10.16 10.33 10.04C10.27 9.92 9.77 8.7 9.57 8.19C9.37 7.7 9.17 7.76 9.02 7.75C8.88 7.75 8.71 7.75 8.55 7.75C8.38 7.75 8.12 7.81 7.89 8.06C7.66 8.31 7.02 8.91 7.02 10.13C7.02 11.35 7.91 12.52 8.03 12.69C8.16 12.85 9.78 15.36 12.27 16.43C12.86 16.69 13.32 16.84 13.68 16.95C14.28 17.14 14.82 17.11 15.25 17.05C15.73 16.98 16.73 16.45 16.94 15.86C17.14 15.27 17.14 14.76 17.08 14.66C17.02 14.55 16.82 14.51 16.57 14.39Z" />
        </svg>
      </a>
    </aside>
  );
};
