import React from 'react';
import { CheckCircle2, Calendar, Clock, Building, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { Property } from '../types/property';
import { Button } from './Button';

interface FormSuccessProps {
  type: 'enquiry' | 'site-visit';
  property?: Property | null;
  applicantName: string;
  visitDate?: string;
  visitTime?: string;
  contactMethod?: string;
  onReset?: () => void;
}

export const FormSuccess: React.FC<FormSuccessProps> = ({
  type,
  property,
  applicantName,
  visitDate,
  visitTime,
  contactMethod,
  onReset,
}) => {
  const isSiteVisit = type === 'site-visit';

  // Format date if present (e.g. 2026-10-12 -> Monday, Oct 12, 2026)
  const formattedDate = visitDate
    ? new Date(visitDate + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-10 shadow-xs text-center space-y-6 animate-fadeIn"
    >
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center mx-auto shadow-xs">
        <CheckCircle2 className="w-9 h-9" />
      </div>

      {/* Main Title & Confirmation Copy */}
      <div className="space-y-2 max-w-md mx-auto">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#B48C58]">
          Request Confirmed (Preview Simulation)
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isSiteVisit ? 'Site Visit Request Received' : 'Thank You! Enquiry Received'}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {isSiteVisit
            ? `Dear ${applicantName}, our dedicated property advisor will contact you to confirm your private site visit and coordinate transit details.`
            : `Dear ${applicantName}, your enquiry has been received. Our senior property specialist will get in touch with you shortly.`}
        </p>
      </div>

      {/* Submission Summary Card */}
      <div className="max-w-lg mx-auto bg-slate-50 rounded-xl border border-slate-200/80 p-5 text-left space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2">
          Request Summary
        </div>

        {property && (
          <div className="flex items-start gap-3">
            <Building className="w-4 h-4 text-[#B48C58] shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="text-slate-500 block text-xs">Target Property</span>
              <span className="font-semibold text-slate-900">{property.title}</span>
              <span className="text-xs text-slate-500 block">
                {property.locality}, {property.city} · {property.formattedPrice}
              </span>
            </div>
          </div>
        )}

        {isSiteVisit && visitDate && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="flex items-center gap-2.5 text-sm">
              <Calendar className="w-4 h-4 text-[#B48C58] shrink-0" />
              <div>
                <span className="text-slate-500 block text-xs">Preferred Date</span>
                <span className="font-semibold text-slate-900">{formattedDate || visitDate}</span>
              </div>
            </div>

            {visitTime && (
              <div className="flex items-center gap-2.5 text-sm">
                <Clock className="w-4 h-4 text-[#B48C58] shrink-0" />
                <div>
                  <span className="text-slate-500 block text-xs">Preferred Time</span>
                  <span className="font-semibold text-slate-900">{visitTime}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {contactMethod && !isSiteVisit && (
          <div className="text-xs text-slate-500 pt-1">
            Preferred Contact Method:{' '}
            <strong className="text-slate-800 capitalize font-medium">{contactMethod}</strong>
          </div>
        )}
      </div>

      {/* Guidance Note */}
      <div className="max-w-md mx-auto text-xs text-slate-500 bg-amber-50/70 border border-amber-200/60 rounded-lg p-3 text-left">
        <strong className="text-amber-900 font-semibold block mb-0.5">Frontend Preview Mode:</strong>
        This submission has been simulated locally without third-party network calls. Backend synchronization will be connected in subsequent phases.
      </div>

      {/* Navigation Actions */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        {property ? (
          <Button
            variant="primary"
            size="md"
            href={`/properties/${property.id}`}
            className="w-full sm:w-auto font-semibold"
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
          >
            Back to Property
          </Button>
        ) : null}

        <Button
          variant="outline"
          size="md"
          href="/properties"
          className="w-full sm:w-auto font-semibold"
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Explore More Properties
        </Button>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors py-2 px-3 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Submit Another Request</span>
          </button>
        )}
      </div>
    </div>
  );
};
