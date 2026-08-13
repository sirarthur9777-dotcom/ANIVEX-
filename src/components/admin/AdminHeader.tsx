import React from 'react';
import { useCms } from '../../context/CmsContext';
import { Menu, Bell, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { AdminTab } from './AdminSidebar';

interface AdminHeaderProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  onOpenMobileMenu: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenMobileMenu,
}) => {
  const { notifications } = useCms();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const tabTitles: Record<AdminTab, string> = {
    dashboard: 'Dashboard Overview',
    home: 'Home Page Management',
    services: 'Services & Capabilities Manager',
    products: 'Products Manager',
    solutions: 'Solutions & Verticals Manager',
    projects: 'Projects Manager',
    about: 'About & Founder Management',
    'company-info': 'Company Information Settings',
    'social-links': 'Social Channels & Links',
    enquiries: 'Contact Enquiries Dashboard',
    notifications: 'System Notifications',
    billing: 'Bill & Invoice Generator',
    'payment-settings': 'Payment Panel & Settings',
    media: 'Media Asset Library',
    profile: 'Admin Profile & Security',
    'activity-logs': 'Admin Activity Audit Logs',
    settings: 'CMS System Settings',
  };

  return (
    <header className="header no-print print:hidden sticky top-0 z-30 bg-[#0B0F16]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between">
      
      {/* Left: Mobile Menu Trigger & Tab Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl bg-[#121824] border border-white/10 text-white lg:hidden cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight">
            {tabTitles[activeTab] || 'Admin Console'}
          </h1>
          <p className="text-[11px] font-mono text-slate-400 hidden sm:block">
            ANIVEX SOLUTIONS CMS • REAL-TIME FIRESTORE SYNC
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Notifications Icon Button */}
        <button
          onClick={() => setActiveTab('notifications')}
          className="relative p-2.5 rounded-xl bg-[#121824] border border-white/10 text-slate-300 hover:text-white hover:border-[#D6A84F]/40 transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#D6A84F] text-[#05070B] font-bold text-[10px] flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* View Public Site Button */}
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#05070B] border border-white/10 hover:border-[#D6A84F]/40 text-xs font-semibold text-white transition-all cursor-pointer"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#F5C85B]" />
        </a>

      </div>

    </header>
  );
};
