import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';

export const AdminLayout: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  // Scroll to top on navigation within admin
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  // Contextual header titles
  const getHeaderTitle = () => {
    if (pathname.includes('/properties')) {
      return {
        title: 'Property Inventory Management',
        subtitle: 'Review live listings, pricing benchmark, and portfolio status.',
      };
    }
    if (pathname.includes('/leads')) {
      return {
        title: 'Customer Leads & Inquiries',
        subtitle: 'Track incoming buyer queries, assignments, and resolution status.',
      };
    }
    if (pathname.includes('/site-visits')) {
      return {
        title: 'Site Inspection Schedule',
        subtitle: 'Manage upcoming physical property tours, transit requests, and consultant coverage.',
      };
    }
    return {
      title: 'Dashboard Overview',
      subtitle: 'Real-time performance metrics, inventory health, and active inquiry log.',
    };
  };

  const headerInfo = getHeaderTitle();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex">
      {/* 1. Sidebar (Fixed left rail on desktop, drawer on mobile) */}
      <AdminSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Canvas (offset by sidebar width on lg screens) */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0 min-h-screen">
        <AdminHeader
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          title={headerInfo.title}
          subtitle={headerInfo.subtitle}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          <Outlet />
        </main>

        {/* Minimal admin footer */}
        <footer className="py-4 px-6 border-t border-slate-200/80 text-center text-xs text-slate-400">
          HomeNest Real Estate Advisory · Administrative Operations Control v1.0 (Frontend MVP)
        </footer>
      </div>
    </div>
  );
};
