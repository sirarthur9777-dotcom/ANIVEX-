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
  ChevronRight,
  MessageSquareQuote,
  HelpCircle,
  Users,
  FileCheck2,
  FileSpreadsheet
} from 'lucide-react';

export type AdminTab =
  | 'dashboard'
  | 'home'
  | 'services'
  | 'products'
  | 'solutions'
  | 'projects'
  | 'about'
  | 'testimonials'
  | 'faqs'
  | 'clients'
  | 'contracts'
  | 'quotations'
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
  const { contactEnquiries, notifications, contracts, quotations, clients } = useCms();
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
        { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
      ],
    },
    {
      groupLabel: 'CLIENTS & CONTRACTS',
      items: [
        { id: 'clients', label: 'Clients Directory', icon: Users, badge: clients.length },
        { id: 'contracts', label: 'Contracts & Agreements', icon: FileCheck2, badge: contracts.length },
        { id: 'quotations', label: 'Quotations & Estimates', icon: FileSpreadsheet, badge: quotations.length },
      ],
    },
    {
      groupLabel: 'WEBSITE CONTENT',
      items: [
        { id: 'home', label: 'Home Page CMS', icon: Home },
        { id: 'services', label: 'Services Manager', icon: Layers },
        { id: 'products', label: 'Products Manager', icon: Package },
        { id: 'solutions', label: 'Solutions & Verticals', icon: Sparkles },
        { id: 'projects', label: 'Projects & Case Studies', icon: FolderGit2 },
        { id: 'about', label: 'About & Founder', icon: Info },
        { id: 'testimonials', label: 'Testimonials CMS', icon: MessageSquareQuote },
        { id: 'faqs', label: 'FAQ Questions', icon: HelpCircle },
        { id: 'company-info', label: 'Company Info', icon: Building },
        { id: 'social-links', label: 'Social Channels', icon: Share2 },
      ],
    },
    {
      groupLabel: 'COMMUNICATION & BILLING',
      items: [
        { id: 'enquiries', label: 'Contact Enquiries', icon: Mail, badge: unreadEnquiries },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifs },
        { id: 'billing', label: 'Bill / Tax Invoices', icon: FileText },
        { id: 'payment-settings', label: 'Payment Settings & UPI', icon: Landmark },
      ],
    },
    {
      groupLabel: 'SYSTEM',
      items: [
        { id: 'media', label: 'Media Library', icon: Image },
        { id: 'profile', label: 'Admin Security', icon: UserCheck },
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
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Drawer Container */}
      <aside
        className={`sidebar no-print print:hidden fixed top-0 left-0 bottom-0 w-72 bg-[#0B1F3A] text-white border-r border-[#0B1F3A]/20 z-50 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 shadow-xl ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#08172C]">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 p-1.5 flex items-center justify-center shrink-0">
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
            <div>
              <div className="font-heading font-extrabold text-base text-white tracking-tight leading-none">
                Anivex <span className="text-[#F97316]">Solution</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#F97316]/20 text-[#F97316]">
                  ADMIN CMS
                </span>
                <span className="text-[10px] text-slate-300 flex items-center gap-1 group-hover:text-white transition-colors">
                  <span>Site</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          </a>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-5 scrollbar-thin">
          {navGroups.map((group) => (
            <div key={group.groupLabel} className="space-y-1">
              <div className="px-3 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                {group.groupLabel}
              </div>

              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id as AdminTab)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#F97316] text-white shadow-md font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          isActive
                            ? 'bg-white text-[#0B1F3A]'
                            : 'bg-white/15 text-slate-200'
                        }`}>
                          {item.badge}
                        </span>
                      )}

                      {isActive && (
                        <ChevronRight className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer Logout */}
        <div className="p-4 border-t border-white/10 bg-[#08172C] space-y-2.5">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-[#F97316] text-white font-extrabold text-xs flex items-center justify-center font-heading">
              KC
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">Krishndas Chauhan</div>
              <div className="text-[10px] text-slate-300 truncate">Founder & Lead Admin</div>
            </div>
          </div>

          <button
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500/20 text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>
    </>
  );
};
