import React from 'react';
import { Menu, Bell, Shield, ExternalLink, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminHeaderProps {
  onOpenMobileSidebar: () => void;
  title: string;
  subtitle?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onOpenMobileSidebar,
  title,
  subtitle = 'Overview of inventory, customer inquiries, and upcoming inspections.',
}) => {
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
      {/* Left: Mobile trigger & Page Title */}
      <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer shrink-0"
          aria-label="Open administration navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="truncate">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight truncate">
            {title}
          </h1>
          <p className="text-xs text-slate-500 hidden sm:block truncate mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right: Quick shortcuts, Date, & Mock Admin Identity */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Today Date pill (hidden on small mobile) */}
        <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/80">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>{todayFormatted}</span>
        </div>

        {/* View Public Website Link */}
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-2.5 sm:px-3 py-1.5 rounded-lg hover:border-slate-300 transition-colors shadow-xs"
          title="Open public website in new tab"
        >
          <span className="hidden sm:inline">View Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
        </Link>

        {/* Mock Notification Bell */}
        <div className="relative">
          <button
            type="button"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#B48C58] rounded-full" />
          </button>
        </div>

        {/* Mock Admin Profile Avatar */}
        <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            AD
          </div>
          <div className="hidden lg:block text-left">
            <span className="text-xs font-bold text-slate-900 block leading-tight">
              Admin
            </span>
            <span className="text-[11px] text-slate-500 block leading-tight">
              Operations Lead
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
