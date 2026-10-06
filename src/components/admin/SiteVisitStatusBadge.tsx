import React from 'react';
import { SiteVisitStatus } from '../../types/admin';

interface SiteVisitStatusBadgeProps {
  status: SiteVisitStatus | string;
  className?: string;
}

export const SiteVisitStatusBadge: React.FC<SiteVisitStatusBadgeProps> = ({ status, className = '' }) => {
  const norm = (status || '').toLowerCase().trim();

  let styles = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-400';
  let label = status;

  if (norm === 'scheduled') {
    styles = 'bg-amber-50 text-amber-900 border-amber-200';
    dotColor = 'bg-amber-500 animate-pulse';
    label = 'Scheduled';
  } else if (norm === 'confirmed') {
    styles = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    dotColor = 'bg-emerald-500';
    label = 'Confirmed';
  } else if (norm === 'completed') {
    styles = 'bg-blue-50 text-blue-800 border-blue-200';
    dotColor = 'bg-blue-500';
    label = 'Completed';
  } else if (norm === 'cancelled') {
    styles = 'bg-rose-50 text-rose-800 border-rose-200';
    dotColor = 'bg-rose-500';
    label = 'Cancelled';
  } else if (norm === 'rescheduled') {
    styles = 'bg-purple-50 text-purple-900 border-purple-200';
    dotColor = 'bg-purple-500';
    label = 'Rescheduled';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold border ${styles} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span>{label}</span>
    </span>
  );
};
