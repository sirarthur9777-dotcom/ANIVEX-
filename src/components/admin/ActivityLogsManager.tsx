import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Activity, Search, ShieldCheck } from 'lucide-react';

export const ActivityLogsManager: React.FC = () => {
  const { activityLogs } = useCms();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = activityLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.targetItem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.adminEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl text-white">Admin Activity Audit Logs</h2>
          <p className="text-xs text-slate-400 mt-1">Audit log recording every content edit, publication, or admin operation.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search logs..."
            className="w-full bg-[#05070B] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl space-y-3">
        {filteredLogs.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">No activity logs recorded matching query.</p>
        ) : (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-xl bg-[#05070B] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#D6A84F] shrink-0" />
                <div>
                  <span className="font-bold text-white">{log.action}</span>
                  <span className="text-slate-400 font-normal"> — {log.targetItem}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-500 font-mono text-[11px] shrink-0">
                <span className="text-[#F5C85B]">{log.adminEmail}</span>
                <span>{log.timestamp}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
