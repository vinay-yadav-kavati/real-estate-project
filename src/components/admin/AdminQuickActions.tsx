import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PlusCircle,
  Building2,
  Users,
  CalendarCheck,
  Globe,
  X,
  Sparkles,
  Info,
} from 'lucide-react';

export const AdminQuickActions: React.FC = () => {
  const actions = [
    {
      title: 'Add Property Listing',
      description: 'Create new verified residential or commercial listing.',
      icon: PlusCircle,
      to: '/admin/properties?action=add',
      highlight: true,
    },
    {
      title: 'Manage Properties',
      description: 'Edit, update status, or delete listings from inventory.',
      icon: Building2,
      to: '/admin/properties',
    },
    {
      title: 'Manage Leads',
      description: 'Review customer inquiries & update statuses.',
      icon: Users,
      to: '/admin/leads',
    },
    {
      title: 'View Site Visits',
      description: 'Monitor inspection schedule & client transit.',
      icon: CalendarCheck,
      to: '/admin/site-visits',
    },
    {
      title: 'Open Public Website',
      description: 'Visit live customer-facing homepage.',
      icon: Globe,
      to: '/',
      external: true,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
      <div>
        <span className="text-xs font-semibold text-[#B48C58] uppercase tracking-wider block">
          Operations Shortcuts
        </span>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          Quick Actions
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;

          if (act.highlight) {
            return (
              <Link
                key={act.title}
                to={act.to}
                className="p-4 rounded-xl border border-[#B48C58]/40 bg-[#B48C58]/5 hover:bg-[#B48C58]/10 hover:border-[#B48C58] transition-all flex flex-col justify-between text-left group"
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-[#B48C58] text-slate-950 flex items-center justify-center font-bold shadow-xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                    {act.title}
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {act.description}
                  </p>
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={act.title}
              to={act.to}
              target={act.external ? '_blank' : undefined}
              rel={act.external ? 'noopener noreferrer' : undefined}
              className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/60 hover:bg-slate-50 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-700 group-hover:text-[#B48C58] flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                  {act.title}
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {act.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
