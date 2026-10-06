import React from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  User,
  Phone,
  Mail,
  Building,
  Calendar,
  Clock,
  Car,
  FileText,
  ArrowUpRight,
  Edit,
  XCircle,
} from 'lucide-react';
import { SiteVisit, Lead } from '../../types/admin';
import { Property } from '../../types/property';
import { SiteVisitStatusBadge } from './SiteVisitStatusBadge';
import { Button } from '../Button';

interface SiteVisitViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  visit: SiteVisit | null;
  onEditClick: (visit: SiteVisit) => void;
  onCancelClick: (visit: SiteVisit) => void;
  associatedLead?: Lead | null;
  property?: Property | null;
}

export const SiteVisitViewModal: React.FC<SiteVisitViewModalProps> = ({
  isOpen,
  onClose,
  visit,
  onEditClick,
  onCancelClick,
  associatedLead,
  property,
}) => {
  if (!isOpen || !visit) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="view-visit-title"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-slate-200/90 flex items-center justify-between bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center font-bold text-base shrink-0">
              <Calendar className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 id="view-visit-title" className="text-lg font-bold text-slate-900 leading-tight">
                Site Visit Details
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-[11px] text-slate-400">ID: {visit.id}</span>
                <span className="text-slate-300">·</span>
                <SiteVisitStatusBadge status={visit.status} />
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Schedule Lockup */}
          <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                Appointment Date & Time
              </span>
              <div className="text-lg font-extrabold text-[#E4C59E] mt-0.5 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#E4C59E]" />
                <span>{visit.date}</span>
                <span className="text-slate-500">·</span>
                <Clock className="w-4 h-4 text-[#E4C59E]" />
                <span>{visit.time}</span>
              </div>
            </div>

            {visit.transitRequested && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold shrink-0">
                <Car className="w-4 h-4" />
                <span>Chauffeured Transit Arranged</span>
              </div>
            )}
          </div>

          {/* Customer / Lead Info */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Customer / Lead Information
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div>
                <span className="text-slate-400 block text-[11px]">Visitor Name</span>
                <span className="font-bold text-slate-900">{visit.leadName}</span>
                {visit.leadId && (
                  <span className="text-[11px] text-slate-500 font-mono block">Linked Lead: {visit.leadId}</span>
                )}
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Contact Details</span>
                <div className="flex flex-col gap-1 mt-0.5 font-medium text-slate-800">
                  <a href={`tel:${visit.phone}`} className="inline-flex items-center gap-1.5 hover:text-[#B48C58]">
                    <Phone className="w-3.5 h-3.5 text-[#B48C58]" />
                    <span>{visit.phone}</span>
                  </a>
                  <a href={`mailto:${visit.email}`} className="inline-flex items-center gap-1.5 hover:text-[#B48C58]">
                    <Mail className="w-3.5 h-3.5 text-[#B48C58]" />
                    <span>{visit.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Property Info */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Property Under Inspection
            </span>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div>
                <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-[#B48C58]" />
                  <span>{visit.propertyTitle}</span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {visit.propertyLocation || property?.location || 'Hyderabad prime corridor'}
                  <span className="text-slate-300 mx-1.5">·</span>
                  <span className="font-mono text-slate-400">{visit.propertyId}</span>
                </div>
              </div>

              <Link
                to={`/properties/${visit.propertyId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#8B6B3E] bg-[#B48C58]/10 hover:bg-[#B48C58]/20 transition-colors shrink-0"
              >
                <span>View Public Page</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Inspection Notes & Assigned Consultant */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Assigned Consultant
              </span>
              <p className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 font-medium">
                {visit.assignedConsultant || 'Meera Nambiar (Portfolio Lead)'}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Transit & Pickup Status
              </span>
              <p className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800">
                {visit.transitRequested
                  ? 'Chauffeured pickup requested. Vehicle arranged.'
                  : 'Self-arrival at site location.'}
              </p>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Inspection Notes
            </span>
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs sm:text-sm text-amber-950 leading-relaxed">
              <FileText className="w-4 h-4 text-amber-700 inline mr-2 -mt-0.5" />
              {visit.notes || 'No special requirements noted.'}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200/90 bg-slate-50/70 flex items-center justify-between gap-3 shrink-0">
          {visit.status !== 'Cancelled' && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onCancelClick(visit);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-700 hover:text-rose-900 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Cancel Visit</span>
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
                onEditClick(visit);
              }}
              icon={<Edit className="w-3.5 h-3.5" />}
              iconPosition="left"
            >
              Edit / Reschedule
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
