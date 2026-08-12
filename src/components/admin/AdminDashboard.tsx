import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { AdminSidebar, AdminTab } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { ToastNotification } from './ToastNotification';

import { DashboardView } from './DashboardView';
import { HomePageManager } from './HomePageManager';
import { ServicesManager } from './ServicesManager';
import { ProductsManager } from './ProductsManager';
import { SolutionsManager } from './SolutionsManager';
import { ProjectsManager } from './ProjectsManager';
import { AboutFounderManager } from './AboutFounderManager';
import { CompanyInfoManager } from './CompanyInfoManager';
import { SocialLinksManager } from './SocialLinksManager';
import { EnquiriesManager } from './EnquiriesManager';
import { NotificationsManager } from './NotificationsManager';
import { AdminInvoiceManager } from './AdminInvoiceManager';
import { MediaLibraryManager } from './MediaLibraryManager';
import { AdminProfileManager } from './AdminProfileManager';
import { ActivityLogsManager } from './ActivityLogsManager';
import { AdminSettingsManager } from './AdminSettingsManager';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const { toast } = useCms();

  // Callbacks for Quick Actions from Dashboard View
  const handleOpenProjectAdd = () => setActiveTab('projects');
  const handleOpenProductAdd = () => setActiveTab('products');
  const handleOpenServiceAdd = () => setActiveTab('services');
  const handleOpenSolutionAdd = () => setActiveTab('solutions');

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView
            setActiveTab={setActiveTab}
            onOpenProjectModal={handleOpenProjectAdd}
            onOpenProductModal={handleOpenProductAdd}
            onOpenServiceModal={handleOpenServiceAdd}
            onOpenSolutionModal={handleOpenSolutionAdd}
          />
        );
      case 'home':
        return <HomePageManager />;
      case 'services':
        return <ServicesManager />;
      case 'products':
        return <ProductsManager />;
      case 'solutions':
        return <SolutionsManager />;
      case 'projects':
        return <ProjectsManager />;
      case 'about':
        return <AboutFounderManager />;
      case 'company-info':
        return <CompanyInfoManager />;
      case 'social-links':
        return <SocialLinksManager />;
      case 'enquiries':
        return <EnquiriesManager />;
      case 'notifications':
        return <NotificationsManager />;
      case 'billing':
        return <AdminInvoiceManager />;
      case 'media':
        return <MediaLibraryManager />;
      case 'profile':
        return <AdminProfileManager />;
      case 'activity-logs':
        return <ActivityLogsManager />;
      case 'settings':
        return <AdminSettingsManager />;
      default:
        return <DashboardView setActiveTab={setActiveTab} onOpenProjectModal={handleOpenProjectAdd} onOpenProductModal={handleOpenProductAdd} onOpenServiceModal={handleOpenServiceAdd} onOpenSolutionModal={handleOpenSolutionAdd} />;
    }
  };

  return (
    <div className="dashboard min-h-screen bg-[#05070B] text-[#D9DCE1] flex selection:bg-[#D6A84F]/30 selection:text-[#F5C85B] print:bg-white print:p-0">
      
      {/* Toast System Notification Overlay */}
      {toast && <div className="no-print print:hidden"><ToastNotification message={toast.message} type={toast.type} /></div>}

      {/* Persistent Left Admin Sidebar Drawer */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        
        {/* Sticky Admin Header */}
        <AdminHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenMobileMenu={() => setIsOpenMobile(true)}
        />

        {/* View Content Workspace */}
        <main className="p-4 sm:p-8 flex-1">
          {renderActiveTabContent()}
        </main>

      </div>
    </div>
  );
};
