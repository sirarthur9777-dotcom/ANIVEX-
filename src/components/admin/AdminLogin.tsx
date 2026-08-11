import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Lock, Mail, ShieldAlert, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const { login, authError, clearError } = useAdminAuth();
  const [email, setEmail] = useState('kdsingh9777');
  const [password, setPassword] = useState('NIVKODE8826');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    clearError();

    const ok = await login(email, password);
    setIsSubmitting(false);
    if (ok) {
      onSuccess();
    }
  };

  const handleDemoFill = async () => {
    setEmail('kdsingh9777');
    setPassword('NIVKODE8826');
    setIsSubmitting(true);
    clearError();
    const ok = await login('kdsingh9777', 'NIVKODE8826');
    setIsSubmitting(false);
    if (ok) {
      onSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-[#05070B] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gold Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D6A84F]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Top Header & Brand */}
        <div className="text-center mb-8 space-y-3">
          <a href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#121824] border border-[#D6A84F]/40 p-1.5 flex items-center justify-center shadow-lg shadow-[#D6A84F]/10">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M 20,80 L 50,20 L 80,80 M 35,55 L 65,55"
                  fill="none"
                  stroke="#F5C85B"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <path
                  d="M 30,20 L 70,80"
                  fill="none"
                  stroke="#D9DCE1"
                  strokeWidth="8"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              </svg>
            </div>
            <span className="font-display font-extrabold text-2xl text-white tracking-tight">
              ANIVEX <span className="text-[#D6A84F] text-xs font-semibold">ADMIN</span>
            </span>
          </a>
          <p className="text-xs text-slate-400 font-mono tracking-wider uppercase">
            RESTRICTED ACCESS • AUTHORIZED PERSONNEL ONLY
          </p>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-2xl space-y-6 relative overflow-hidden">
          
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h1 className="font-display font-bold text-xl text-white">Admin Console Authentication</h1>
              <p className="text-xs text-slate-400 mt-1">Sign in to manage company website & enquiries</p>
            </div>
            <div className="p-2.5 rounded-xl bg-[#121824] border border-[#D6A84F]/30 text-[#F5C85B]">
              <Lock className="w-5 h-5" />
            </div>
          </div>

          {authError && (
            <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Admin Email */}
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="kdsingh9777"
                  className="w-full bg-[#05070B] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#D6A84F] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#05070B] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#D6A84F] transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(245,200,91,0.4)] disabled:opacity-50 transition-all cursor-pointer"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Admin Panel'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Admin Access Button */}
          <div className="pt-4 border-t border-white/10 text-center space-y-3">
            <p className="text-[11px] text-slate-500">Fast Authorization for System Review:</p>
            <button
              type="button"
              onClick={handleDemoFill}
              className="w-full py-2.5 rounded-xl bg-[#121824] border border-[#D6A84F]/30 text-[#F5C85B] font-mono text-xs flex items-center justify-center gap-2 hover:bg-[#121824]/80 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Authorize Admin Session (`kdsingh9777`)</span>
            </button>
          </div>

          <div className="text-center">
            <a href="/" className="text-xs text-slate-400 hover:text-white transition-colors">
              ← Return to Public Website
            </a>
          </div>

        </div>

        <p className="text-center text-[10px] font-mono text-slate-600 mt-6">
          ANIVEX SOLUTIONS CMS • SECURITY VERIFIED
        </p>

      </div>
    </div>
  );
};
