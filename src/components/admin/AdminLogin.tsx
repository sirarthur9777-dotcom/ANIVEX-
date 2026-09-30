import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Lock, Mail, ShieldAlert, ArrowRight, KeyRound } from 'lucide-react';

interface AdminLoginProps {
  onSuccess?: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const { login, authError, clearError } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    clearError();

    const ok = await login(email, password);
    setIsSubmitting(false);
    if (ok) {
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Soft Saffron and Green Ambient Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#F97316]/10 via-[#D4A72C]/10 to-[#15803D]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Top Header & Brand */}
        <div className="text-center mb-8 space-y-3">
          <a href="/" className="inline-flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#0B1F3A] p-2 flex items-center justify-center shadow-md">
              <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                <path
                  d="M 20,80 L 50,20 L 80,80 M 35,55 L 65,55"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 32,22 L 68,78"
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="text-left">
              <span className="font-heading font-extrabold text-2xl text-[#0B1F3A] tracking-tight block">
                Anivex <span className="text-[#F97316]">Solution</span>
              </span>
              <span className="text-[10px] font-mono text-[#0B1F3A]/60 uppercase tracking-wider block font-bold">
                ADMIN CONSOLE
              </span>
            </div>
          </a>
        </div>

        {/* Login Card */}
        <div className="p-8 sm:p-9 rounded-3xl bg-white border border-[#0B1F3A]/10 shadow-xl space-y-6 relative overflow-hidden">
          
          <div className="flex items-center justify-between pb-4 border-b border-[#0B1F3A]/10">
            <div>
              <h1 className="font-heading font-bold text-xl text-[#0B1F3A]">Portal Authentication</h1>
              <p className="text-xs text-[#0B1F3A]/65 mt-1 font-normal">Sign in to manage client contracts & content</p>
            </div>
            <div className="p-2.5 rounded-xl bg-[#0B1F3A]/5 text-[#F97316]">
              <Lock className="w-5 h-5" />
            </div>
          </div>

          {authError && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Admin Email */}
            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1.5">
                Administrator Email / ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#0B1F3A]/40 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@anivex.com or Admin ID"
                  className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#0B1F3A] placeholder:text-[#0B1F3A]/40 focus:outline-none focus:border-[#F97316] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] uppercase mb-1.5">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#0B1F3A]/40 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full bg-[#FFFDF7] border border-[#0B1F3A]/15 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#0B1F3A] placeholder:text-[#0B1F3A]/40 focus:outline-none focus:border-[#F97316] transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 transition-all cursor-pointer mt-2"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Admin Panel'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Hint */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
            <p className="text-[11px] text-[#0B1F3A]/70">
              Demo access: <strong className="font-mono text-[#0B1F3A]">admin</strong> / <strong className="font-mono text-[#0B1F3A]">anivex123</strong>
            </p>
          </div>

          <div className="pt-2 border-t border-[#0B1F3A]/10 text-center">
            <a href="/" className="text-xs text-[#0B1F3A]/60 hover:text-[#0B1F3A] transition-colors">
              ← Return to Public Website
            </a>
          </div>

        </div>

        <p className="text-center text-[10px] font-mono text-[#0B1F3A]/50 mt-6">
          ANIVEX SOLUTION CMS • SECURE ACCESS
        </p>

      </div>
    </div>
  );
};
