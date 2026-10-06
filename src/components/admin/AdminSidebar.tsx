import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Users,
  CalendarCheck,
  ArrowLeft,
  X,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';
import { useProperties } from '../../context/PropertyContext';
import { useCRM } from '../../context/CRMContext';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const { properties } = useProperties();
  const { leads, siteVisits } = useCRM();

  const activeVisitsCount = siteVisits.filter(
    (v) => v.status === 'Scheduled' || v.status === 'Confirmed' || v.status === 'Rescheduled'
  ).length;

  const navItems = [
    {
      label: 'Dashboard',
      to: '/admin',
      end: true,
      icon: LayoutDashboard,
      badge: 'Live',
    },
    {
      label: 'Properties',
      to: '/admin/properties',
      icon: Building2,
      count: `${properties.length} Listings`,
    },
    {
      label: 'Leads & Inquiries',
      to: '/admin/leads',
      icon: Users,
      badge: `${leads.length} Total`,
    },
    {
      label: 'Site Visits',
      to: '/admin/site-visits',
      icon: CalendarCheck,
      badge: `${activeVisitsCount} Active`,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-950 text-slate-300 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
        aria-label="Admin Navigation"
      >
        {/* Top Header: Brand Wordmark & Close Button */}
        <div>
          <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800">
            <Link to="/admin" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-[#B48C58] text-slate-950 flex items-center justify-center font-bold text-sm shadow-xs">
                HN
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight block">
                  {COMPANY_INFO.name}
                </span>
                <span className="text-[10px] font-semibold text-[#E4C59E] uppercase tracking-wider block">
                  Advisory Admin
                </span>
              </div>
            </Link>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none cursor-pointer"
              aria-label="Close navigation sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5" aria-label="Admin Navigation Menu">
            <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Management Modules
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => onClose()}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#B48C58] text-slate-950 font-bold shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                            isActive
                              ? 'bg-slate-950/20 text-slate-950'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {item.count && !item.badge && (
                        <span
                          className={`text-[11px] ${
                            isActive ? 'text-slate-900' : 'text-slate-400'
                          }`}
                        >
                          {item.count}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Operations Indicator & Back to Public Website */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          {/* Operations Badge */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200 block text-xs">
                Internal Ops v1.0
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                Local mock management data. Supabase sync enabled in next phase.
              </p>
            </div>
          </div>

          {/* Back to Website Button */}
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold border border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#E4C59E]" />
            <span>Back to Public Website</span>
          </Link>
        </div>
      </aside>
    </>
  );
};
