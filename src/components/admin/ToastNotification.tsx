import React from 'react';
import { useCms } from '../../context/CmsContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toast } = useCms();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div
        className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-medium backdrop-blur-xl ${
          toast.type === 'success'
            ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200 shadow-emerald-950/50'
            : toast.type === 'error'
            ? 'bg-red-950/90 border-red-500/40 text-red-200 shadow-red-950/50'
            : 'bg-[#121824] border-[#D6A84F]/40 text-[#F5C85B] shadow-[#D6A84F]/20'
        }`}
      >
        {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
        {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
        {toast.type === 'info' && <Info className="w-5 h-5 text-[#F5C85B] shrink-0" />}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
