import React from 'react';
import { useCms } from '../../context/CmsContext';
import { Bell, CheckCircle2, Trash2, Mail, Clock, ArrowRight } from 'lucide-react';

export const NotificationsManager: React.FC = () => {
  const { notifications, markNotificationRead, deleteNotification } = useCms();

  const handleMarkAllRead = async () => {
    for (const n of notifications) {
      if (!n.read) {
        await markNotificationRead(n.id);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="p-6 rounded-3xl bg-[#0B0F16] border border-white/10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl text-white">System Notifications</h2>
          <p className="text-xs text-slate-400 mt-1">Real-time alerts for incoming lead inquiries and system events.</p>
        </div>

        {notifications.some((n) => !n.read) && (
          <button
            onClick={handleMarkAllRead}
            className="px-4 py-2.5 rounded-xl bg-[#121824] border border-[#D6A84F]/30 text-[#F5C85B] text-xs font-semibold flex items-center gap-2 hover:bg-[#121824]/80 transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="p-12 rounded-3xl bg-[#0B0F16] border border-white/10 text-center text-slate-400 space-y-2">
            <Bell className="w-8 h-8 text-[#D6A84F] mx-auto opacity-50" />
            <p className="text-sm font-semibold text-white">No notifications.</p>
            <p className="text-xs">Alerts will trigger automatically when new inquiries are submitted.</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-5 rounded-2xl bg-[#0B0F16] border transition-all flex items-center justify-between gap-4 shadow-md ${
                !n.read ? 'border-[#D6A84F]/50 bg-[#0B0F16]' : 'border-white/5 opacity-75'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${!n.read ? 'bg-[#121824] text-[#F5C85B] border border-[#D6A84F]/30' : 'bg-[#05070B] text-slate-500'}`}>
                  <Bell className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white">{n.title}</h4>
                    {!n.read && (
                      <span className="px-2 py-0.5 rounded-full bg-[#D6A84F] text-[#05070B] text-[9px] font-bold uppercase">
                        UNREAD
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300">{n.message}</p>
                  <div className="text-[10px] font-mono text-slate-500 flex items-center gap-2">
                    <span>{n.date} at {n.time}</span>
                    {n.email && <span>• {n.email}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!n.read && (
                  <button
                    onClick={() => markNotificationRead(n.id)}
                    className="p-2 rounded-xl bg-[#121824] border border-white/10 text-slate-300 hover:text-white cursor-pointer"
                    title="Mark Read"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </button>
                )}

                <button
                  onClick={() => deleteNotification(n.id)}
                  className="p-2 rounded-xl bg-red-950/40 border border-red-500/20 text-red-400 hover:bg-red-900/40 cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
