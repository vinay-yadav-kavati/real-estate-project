import React from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  User,
  Phone,
  Mail,
  Building,
  Calendar,
  MessageSquare,
  FileText,
  Clock,
  ArrowUpRight,
  CalendarPlus,
  Edit,
} from 'lucide-react';
import { Lead, SiteVisit } from '../../types/admin';
import { LeadStatusBadge } from './LeadStatusBadge';
import { SiteVisitStatusBadge } from './SiteVisitStatusBadge';
import { Button } from '../Button';

interface LeadViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onEditClick: (lead: Lead) => void;
  onScheduleVisitClick?: (lead: Lead) => void;
  associatedVisits?: SiteVisit[];
}

export const LeadViewModal: React.FC<LeadViewModalProps> = ({
  isOpen,
  onClose,
  lead,
  onEditClick,
  onScheduleVisitClick,
  associatedVisits = [],
}) => {
  if (!isOpen || !lead) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="view-lead-title"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4.5 border-b border-slate-200/90 flex items-center justify-between bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#B48C58]/15 border border-[#B48C58]/30 text-[#8B6B3E] flex items-center justify-center font-bold text-base shrink-0">
              {lead.name.charAt(0)}
            </div>
            <div>
              <h3 id="view-lead-title" className="text-lg font-bold text-slate-900 leading-tight">
                {lead.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-[11px] text-slate-400">ID: {lead.id}</span>
                <span className="text-slate-300">·</span>
                <LeadStatusBadge status={lead.status} />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Contact Details Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-1">
                Phone Number
              </span>
              <a
                href={`tel:${lead.phone}`}
                className="font-semibold text-slate-900 hover:text-[#B48C58] transition-colors inline-flex items-center gap-1.5 text-sm"
              >
                <Phone className="w-4 h-4 text-[#B48C58]" />
                <span>{lead.phone}</span>
              </a>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-1">
                Email Address
              </span>
              <a
                href={`mailto:${lead.email}`}
                className="font-semibold text-slate-900 hover:text-[#B48C58] transition-colors inline-flex items-center gap-1.5 text-sm truncate max-w-full"
              >
                <Mail className="w-4 h-4 text-[#B48C58]" />
                <span className="truncate">{lead.email}</span>
              </a>
            </div>
          </div>

          {/* Interested Property Card */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Target Property Inquiry
            </span>

            {lead.propertyId && lead.propertyTitle ? (
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#B48C58]" />
                    <span className="font-bold text-slate-900 text-sm">
                      {lead.propertyTitle}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {lead.propertyPrice ? `${lead.propertyPrice} · ` : ''}
                    {lead.propertyType ? `${lead.propertyType} · ` : ''}
                    <span className="font-mono text-slate-400">{lead.propertyId}</span>
                  </div>
                </div>

                <Link
                  to={`/properties/${lead.propertyId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#8B6B3E] bg-[#B48C58]/10 hover:bg-[#B48C58]/20 transition-colors shrink-0"
                >
                  <span>Public Listing</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 italic">
                General Portfolio Inquiry (No specific listing pre-selected).
              </div>
            )}
          </div>

          {/* Customer Message */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Inquiry Message
            </span>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <MessageSquare className="w-4 h-4 text-slate-400 inline mr-2 -mt-0.5" />
              {lead.message || 'No additional message provided.'}
            </div>
          </div>

          {/* Internal Advisor Notes */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Internal Advisory Notes
            </span>
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs sm:text-sm text-amber-950 leading-relaxed">
              <FileText className="w-4 h-4 text-amber-700 inline mr-2 -mt-0.5" />
              {lead.notes || 'No internal notes logged yet. Use Edit Lead to record client preferences, due diligence, or budget constraints.'}
            </div>
          </div>

          {/* Associated Site Visits */}
          {associatedVisits.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Scheduled Site Visits ({associatedVisits.length})
              </span>
              <div className="space-y-2">
                {associatedVisits.map((visit) => (
                  <div
                    key={visit.id}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">
                        {visit.propertyTitle}
                      </div>
                      <div className="text-slate-500 flex items-center gap-2 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{visit.date} at {visit.time}</span>
                      </div>
                    </div>
                    <SiteVisitStatusBadge status={visit.status} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Meta Info */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Inquiry Logged: {lead.date}</span>
            {lead.assignedAdvisor && <span>Advisor: {lead.assignedAdvisor}</span>}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-200/90 bg-slate-50/70 flex items-center justify-between gap-3 shrink-0">
          {onScheduleVisitClick && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onScheduleVisitClick(lead);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-[#8B6B3E] bg-[#B48C58]/10 hover:bg-[#B48C58]/20 transition-colors cursor-pointer"
            >
              <CalendarPlus className="w-4 h-4 text-[#B48C58]" />
              <span>Schedule Site Visit</span>
            </button>
          )}

          <div className="flex items-center gap-3 ml-auto">
            <Button variant="outline" size="sm" onClick={onClose} type="button">
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
                onEditClick(lead);
              }}
              icon={<Edit className="w-3.5 h-3.5" />}
              iconPosition="left"
            >
              Edit Lead
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
