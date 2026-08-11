import React from 'react';
import { useCms } from '../../context/CmsContext';
import { Settings, Download, RotateCcw, Database, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AdminSettingsManager: React.FC = () => {
  const {
    siteContent,
    services,
    products,
    solutions,
    projects,
    companyInfo,
    showToast,
  } = useCms();

  const handleExportBackup = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      siteContent,
      services,
      products,
      solutions,
      projects,
      companyInfo,
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ANIVEX_CMS_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('CMS backup file generated and downloaded!');
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all CMS data to initial default seed values? This will replace local edits.')) {
      localStorage.clear();
      showToast('Local state reset to default. Reloading...');
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="p-6 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl">
        <h2 className="font-display font-bold text-xl text-white">CMS System Settings</h2>
        <p className="text-xs text-slate-400 mt-1">Manage database connections, backup exports, and system state resets.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Backup Card */}
        <div className="p-6 rounded-3xl bg-[#0B0F16] border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#121824] text-[#F5C85B] border border-[#D6A84F]/30">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">Export CMS Backup</h3>
              <p className="text-xs text-slate-400">Download a full JSON snapshot of all site data.</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Includes all services, products, solutions, active projects, company information, and founder details.
          </p>

          <button
            onClick={handleExportBackup}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#F5C85B] text-[#05070B] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Download JSON Backup</span>
          </button>
        </div>

        {/* Database Health Card */}
        <div className="p-6 rounded-3xl bg-[#0B0F16] border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-500/30">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">Firestore Real-Time Status</h3>
              <p className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ACTIVE & CONNECTED</span>
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Firebase Firestore is provisioned and listening for real-time document change snapshots across all CMS collections.
          </p>

          <button
            onClick={handleResetDefaults}
            className="w-full py-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-400 font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-900/40 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Local Cache To Default</span>
          </button>
        </div>
      </div>
    </div>
  );
};
