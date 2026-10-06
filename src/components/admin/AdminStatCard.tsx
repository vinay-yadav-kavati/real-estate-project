import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricSubItem {
  label: string;
  value: string | number;
  highlight?: boolean;
}

interface AdminStatCardProps {
  title: string;
  mainValue: string | number;
  subValueLabel?: string;
  icon: LucideIcon;
  breakdown: MetricSubItem[];
  trendNote?: string;
}

export const AdminStatCard: React.FC<AdminStatCardProps> = ({
  title,
  mainValue,
  subValueLabel,
  icon: Icon,
  breakdown,
  trendNote,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
      <div>
        {/* Top Header: Title & Icon */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {title}
          </span>
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-[#B48C58] flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>

        {/* Primary Metric Number */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
            {mainValue}
          </span>
          {subValueLabel && (
            <span className="text-xs font-medium text-slate-500">
              {subValueLabel}
            </span>
          )}
        </div>
      </div>

      {/* Sub-breakdown Items (Zero-pill, typographic hierarchy) */}
      <div className="pt-4 border-t border-slate-100">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          {breakdown.map((item, idx) => (
            <div key={idx} className="space-y-0.5">
              <span className="text-[11px] text-slate-500 block">
                {item.label}
              </span>
              <span
                className={`font-bold tabular-nums block ${
                  item.highlight ? 'text-[#B48C58]' : 'text-slate-900'
                }`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {trendNote && (
          <p className="text-[11px] text-slate-400 mt-3 pt-2.5 border-t border-slate-50">
            {trendNote}
          </p>
        )}
      </div>
    </div>
  );
};
