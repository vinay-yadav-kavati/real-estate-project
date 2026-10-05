import React from 'react';
import { PropertyStatus } from '../types/property';

interface PropertyStatusBadgeProps {
  status: PropertyStatus;
  className?: string;
}

export const PropertyStatusBadge: React.FC<PropertyStatusBadgeProps> = ({ status, className = '' }) => {
  const statusStyles: Record<PropertyStatus, { bg: string; text: string; dot: string }> = {
    Available: {
      bg: 'bg-emerald-50/95 border-emerald-200/80',
      text: 'text-emerald-800',
      dot: 'bg-emerald-500'
    },
    'Under Negotiation': {
      bg: 'bg-amber-50/95 border-amber-200/80',
      text: 'text-amber-800',
      dot: 'bg-amber-500'
    },
    Sold: {
      bg: 'bg-slate-100/95 border-slate-300/80',
      text: 'text-slate-600',
      dot: 'bg-slate-400'
    },
    Rented: {
      bg: 'bg-blue-50/95 border-blue-200/80',
      text: 'text-blue-800',
      dot: 'bg-blue-500'
    }
  };

  const current = statusStyles[status] || statusStyles.Available;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold tracking-wide border backdrop-blur-xs ${current.bg} ${current.text} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} aria-hidden="true" />
      <span>{status}</span>
    </span>
  );
};
