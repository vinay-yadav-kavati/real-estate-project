import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, ArrowUpRight, Filter, Building, ArrowRight } from 'lucide-react';
import { Lead } from '../../types/admin';
import { LeadStatusBadge } from './LeadStatusBadge';

interface RecentLeadsTableProps {
  leads: Lead[];
}

export const RecentLeadsTable: React.FC<RecentLeadsTableProps> = ({ leads }) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredLeads = leads.filter((lead) => {
    if (filterStatus === 'all') return true;
    return (lead.status || '').toLowerCase() === filterStatus.toLowerCase();
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
      {/* Header & Filter Controls */}
      <div className="p-5 sm:p-6 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[#B48C58] uppercase tracking-wider block">
            Customer Inquiries
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Recent Leads & Inquiries
          </h2>
        </div>

        {/* Status Filters & View All */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {['all', 'New', 'Contacted', 'Qualified'].map((statusKey) => (
              <button
                key={statusKey}
                type="button"
                onClick={() => setFilterStatus(statusKey)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  filterStatus.toLowerCase() === statusKey.toLowerCase()
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/70'
                }`}
              >
                {statusKey === 'all' ? 'All' : statusKey}
              </button>
            ))}
          </div>

          <Link
            to="/admin/leads"
            className="text-xs font-semibold text-[#B48C58] hover:text-[#936E3B] inline-flex items-center gap-1 shrink-0 ml-1"
          >
            <span>Manage All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Desktop & Tablet Table View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <tr>
              <th scope="col" className="py-3.5 px-4 sm:px-6">Lead & Contact</th>
              <th scope="col" className="py-3.5 px-4">Target Property</th>
              <th scope="col" className="py-3.5 px-4">Inquiry Scope</th>
              <th scope="col" className="py-3.5 px-4">Status</th>
              <th scope="col" className="py-3.5 px-4 sm:px-6">Logged At</th>
              <th scope="col" className="py-3.5 px-4 text-right">Advisor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLeads.slice(0, 5).map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                {/* Lead Name & Contact */}
                <td className="py-4 px-4 sm:px-6">
                  <div className="font-bold text-slate-900 text-sm">
                    {lead.name}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                    <a
                      href={`tel:${lead.phone}`}
                      className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors"
                      title="Call Lead"
                    >
                      <Phone className="w-3 h-3 text-[#B48C58]" />
                      <span>{lead.phone}</span>
                    </a>
                    <a
                      href={`mailto:${lead.email}`}
                      className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors"
                      title="Email Lead"
                    >
                      <Mail className="w-3 h-3 text-[#B48C58]" />
                      <span>{lead.email}</span>
                    </a>
                  </div>
                </td>

                {/* Target Property */}
                <td className="py-4 px-4">
                  {lead.propertyId && lead.propertyTitle ? (
                    <div>
                      <Link
                        to={`/properties/${lead.propertyId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-slate-900 hover:text-[#B48C58] transition-colors inline-flex items-center gap-1 line-clamp-1"
                      >
                        <span>{lead.propertyTitle}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </Link>
                      <div className="text-xs text-slate-500 font-medium">
                        {lead.propertyPrice} · {lead.propertyType}
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500 italic">
                      General Portfolio Advisory
                    </span>
                  )}
                </td>

                {/* Inquiry Scope & Message Snippet */}
                <td className="py-4 px-4 max-w-xs">
                  <div className="text-xs font-semibold text-slate-800">
                    {lead.inquiryType || 'Property Inquiry'}
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5" title={lead.message}>
                    {lead.message}
                  </p>
                </td>

                {/* Status Badge */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <LeadStatusBadge status={lead.status} />
                </td>

                {/* Date */}
                <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-xs text-slate-500 font-medium">
                  {lead.date}
                </td>

                {/* Assigned Advisor */}
                <td className="py-4 px-4 text-right whitespace-nowrap text-xs text-slate-600 font-medium">
                  {lead.assignedAdvisor?.split(' ')[0]} {lead.assignedAdvisor?.split(' ')[1] || ''}
                </td>
              </tr>
            ))}

            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-slate-500 text-sm">
                  No leads found for status filter "{filterStatus}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer count indicator */}
      <div className="p-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Showing {Math.min(filteredLeads.length, 5)} of {leads.length} recorded inquiries</span>
        <Link to="/admin/leads" className="font-semibold text-slate-800 hover:text-[#B48C58]">
          View Full CRM Pipeline →
        </Link>
      </div>
    </div>
  );
};
