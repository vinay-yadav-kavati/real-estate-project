import React from 'react';
import { LeadStatus } from '../../types/admin';

interface LeadStatusBadgeProps {
  status: LeadStatus | string;
  className?: string;
}

export const LeadStatusBadge: React.FC<LeadStatusBadgeProps> = ({ status, className = '' }) => {
  const norm = (status || '').toLowerCase().trim();

  let styles = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-400';
  let label = status;

  if (norm === 'new') {
    styles = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    dotColor = 'bg-emerald-500 animate-pulse';
    label = 'New';
  } else if (norm === 'contacted') {
    styles = 'bg-blue-50 text-blue-800 border-blue-200';
    dotColor = 'bg-blue-500';
    label = 'Contacted';
  } else if (norm === 'qualified') {
    styles = 'bg-indigo-50 text-indigo-800 border-indigo-200';
    dotColor = 'bg-indigo-500';
    label = 'Qualified';
  } else if (norm === 'site visit scheduled' || norm === 'site-visit-scheduled') {
    styles = 'bg-amber-50 text-amber-900 border-amber-200';
    dotColor = 'bg-amber-500';
    label = 'Site Visit Scheduled';
  } else if (norm === 'negotiation') {
    styles = 'bg-purple-50 text-purple-900 border-purple-200';
    dotColor = 'bg-purple-500';
    label = 'Negotiation';
  } else if (norm === 'closed') {
    styles = 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
    dotColor = 'bg-emerald-600';
    label = 'Closed';
  } else if (norm === 'lost') {
    styles = 'bg-rose-50 text-rose-800 border-rose-200';
    dotColor = 'bg-rose-400';
    label = 'Lost';
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
