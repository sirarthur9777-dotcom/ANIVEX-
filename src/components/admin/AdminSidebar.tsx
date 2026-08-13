import React from 'react';
import { useCms } from '../../context/CmsContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  LayoutDashboard,
  Home,
  Layers,
  Package,
  Sparkles,
  FolderGit2,
  Info,
  Building,
  Share2,
  Mail,
  Bell,
  FileText,
  Landmark,
  Image,
  UserCheck,
  Activity,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export type AdminTab =
  | 'dashboard'
  | 'home'
  | 'services'
  | 'products'
  | 'solutions'
  | 'projects'
  | 'about'
  | 'company-info'
  | 'social-links'
  | 'enquiries'
  | 'notifications'
  | 'billing'
  | 'payment-settings'
  | 'media'
  | 'profile'
  | 'activity-logs'
  | 'settings';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpenMobile,
  setIsOpenMobile,
}) => {
  const { contactEnquiries, notifications } = useCms();
  const { logout } = useAdminAuth();

  const unreadEnquiries = contactEnquiries.filter((e) => !e.read).length;
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const handleSelectTab = (tab: AdminTab) => {
    setActiveTab(tab);
    setIsOpenMobile(false);
  };

  const navGroups = [
    {
      groupLabel: 'MAIN',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      ],
    },
    {
      groupLabel: 'WEBSITE CONTENT',
      items: [
        { id: 'home', label: 'Home Page', icon: Home },
        { id: 'services', label: 'Services', icon: Layers },
        { id: 'products', label: 'Products', icon: Package },
        { id: 'solutions', label: 'Solutions', icon: Sparkles },
        { id: 'projects', label: 'Projects', icon: FolderGit2 },
        { id: 'about', label: 'About & Founder', icon: Info },
        { id: 'company-info', label: 'Company Info', icon: Building },
        { id: 'social-links', label: 'Social Links', icon: Share2 },
      ],
    },
    {
      groupLabel: 'COMMUNICATION & BILLING',
      items: [
        { id: 'enquiries', label: 'Contact Enquiries', icon: Mail, badge: unreadEnquiries },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifs },
        { id: 'billing', label: 'Bill / Invoice Generator', icon: FileText },
        { id: 'payment-settings', label: 'Payment Settings', icon: Landmark },
      ],
    },
    {
      groupLabel: 'MEDIA',
      items: [
        { id: 'media', label: 'Media Library', icon: Image },
      ],
    },
    {
      groupLabel: 'SYSTEM',
      items: [
        { id: 'profile', label: 'Admin Profile', icon: UserCheck },
        { id: 'activity-logs', label: 'Activity Logs', icon: Activity },
        { id: 'settings', label: 'Settings', icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpenMobile && (
        <div
          onClick={() => setIsOpenMobile(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Drawer Container */}
      <aside
        className={`sidebar no-print print:hidden fixed top-0 left-0 bottom-0 w-72 bg-[#0B0F16] border-r border-white/10 z-50 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#121824] border border-[#D6A84F]/30 p-1 flex items-center justify-center">
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
            <div>
              <div className="font-display font-extrabold text-base text-white tracking-tight leading-none">
                ANIVEX <span className="text-[#D6A84F]">CMS</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1 mt-0.5 group-hover:text-[#F5C85B] transition-colors">
                <span>View Site</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </span>
            </div>
          </a>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin">
          {navGroups.map((group) => (
            <div key={group.groupLabel} className="space-y-1.5">
              <div className="px-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                {group.groupLabel}
              </div>

              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id as AdminTab)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#121824] border border-[#D6A84F]/40 text-[#F5C85B] shadow-lg shadow-[#D6A84F]/5 font-semibold'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#F5C85B]' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-[#D6A84F] text-[#05070B] font-bold text-[10px] shadow-sm">
                        {item.badge}
                      </span>
                    )}

                    {isActive && (
                      <ChevronRight className="w-3.5 h-3.5 text-[#F5C85B]" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer Logout */}
        <div className="p-4 border-t border-white/10 bg-[#05070B]/50 space-y-3">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#0B0F16] border border-white/5">
            <div className="w-7 h-7 rounded-full bg-[#D6A84F]/20 text-[#F5C85B] font-extrabold text-xs flex items-center justify-center font-mono">
              KC
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-semibold text-white truncate">Krishndas Chauhan</div>
              <div className="text-[10px] font-mono text-slate-400 truncate">Founder & Admin</div>
            </div>
          </div>

          <button
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-950/30 border border-red-500/20 text-red-400 hover:bg-red-900/40 text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>
    </>
  );
};
