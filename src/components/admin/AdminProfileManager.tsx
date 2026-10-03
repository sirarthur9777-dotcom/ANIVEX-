import React, { useState } from 'react';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useCms } from '../../context/CmsContext';
import { ShieldCheck, Key, CheckCircle2 } from 'lucide-react';

export const AdminProfileManager: React.FC = () => {
  const { user, adminEmail } = useAdminAuth();
  const { showToast } = useCms();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      showToast('Enter your current administrator password.', 'error');
      return;
    }

    if (newPassword.length < 6) {
      showToast('New password must be at least 6 characters.', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match!', 'error');
      return;
    }

    const currentUser = auth.currentUser || user;
    if (!currentUser || !currentUser.email) {
      showToast('No active authenticated session found. Please sign in again.', 'error');
      return;
    }

    setIsUpdating(true);
    try {
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);
      showToast('Administrator password updated successfully in Firebase!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      const code = error?.code || '';
      if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        showToast('Current password is incorrect.', 'error');
      } else if (code === 'auth/weak-password') {
        showToast('New password is too weak. Please use at least 6 characters.', 'error');
      } else if (code === 'auth/requires-recent-login') {
        showToast('Session expired. Please log out and sign back in before updating password.', 'error');
      } else {
        showToast('Failed to update password. Please check your current password.', 'error');
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0B0F16] via-[#121824] to-[#0B0F16] border border-[#D6A84F]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D6A84F] to-[#F5C85B] text-[#05070B] font-extrabold text-2xl flex items-center justify-center font-mono shadow-lg shrink-0">
            KC
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#05070B] border border-[#D6A84F]/30 text-[10px] font-mono text-[#F5C85B] uppercase mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SUPER ADMIN & FOUNDER</span>
            </div>
            <h2 className="font-display font-bold text-2xl text-white">Krishndas Chauhan</h2>
            <p className="text-xs text-slate-400 mt-0.5">{adminEmail || user?.email || 'admin@anivex.com'}</p>
          </div>
        </div>

        <div className="text-right">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>SESSION AUTHENTICATED</span>
          </span>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <div className="p-3 rounded-2xl bg-[#121824] border border-[#D6A84F]/30 text-[#F5C85B]">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white">Security & Credential Management</h3>
            <p className="text-xs text-slate-400">Update the password for your Firebase Email/Password administrator account.</p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Current Admin Password</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-2">New Security Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-2">Confirm New Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#05070B] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isUpdating}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F5C85B] to-[#D6A84F] text-[#05070B] font-extrabold text-xs uppercase tracking-wider cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(245,200,91,0.4)] transition-all disabled:opacity-50"
            >
              {isUpdating ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
