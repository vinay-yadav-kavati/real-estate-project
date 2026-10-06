import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Car, MapPin, ArrowUpRight, ArrowRight } from 'lucide-react';
import { SiteVisit } from '../../types/admin';
import { SiteVisitStatusBadge } from './SiteVisitStatusBadge';

interface UpcomingVisitsListProps {
  visits: SiteVisit[];
}

export const UpcomingVisitsList: React.FC<UpcomingVisitsListProps> = ({ visits }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredVisits = visits.filter((v) => {
    if (activeFilter === 'all') return true;
    return (v.status || '').toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
      {/* Header & Filter Tabs */}
      <div className="p-5 sm:p-6 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[#B48C58] uppercase tracking-wider block">
            Guided Inspections
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Upcoming Site Visits
          </h2>
        </div>

        {/* Filter buttons & View All */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {['all', 'Confirmed', 'Scheduled'].map((filterKey) => (
              <button
                key={filterKey}
                type="button"
                onClick={() => setActiveFilter(filterKey)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter.toLowerCase() === filterKey.toLowerCase()
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/70'
                }`}
              >
                {filterKey === 'all' ? 'All' : filterKey}
              </button>
            ))}
          </div>

          <Link
            to="/admin/site-visits"
            className="text-xs font-semibold text-[#B48C58] hover:text-[#936E3B] inline-flex items-center gap-1 shrink-0 ml-1"
          >
            <span>Manage All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Grid of Inspection Cards */}
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredVisits.slice(0, 4).map((visit) => (
          <div
            key={visit.id}
            className="p-5 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-4"
          >
            {/* Top row: Visitor info & Status */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {visit.leadName}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {visit.phone} · {visit.email}
                  </div>
                </div>
                <div>
                  <SiteVisitStatusBadge status={visit.status} />
                </div>
              </div>

              {/* Target Property */}
              <div className="p-3 bg-white rounded-lg border border-slate-200/80 mt-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                  Inspection Destination
                </span>
                <Link
                  to={`/properties/${visit.propertyId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-slate-900 hover:text-[#B48C58] transition-colors inline-flex items-center gap-1 text-sm mt-0.5"
                >
                  <span className="line-clamp-1">{visit.propertyTitle}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </Link>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3 h-3 text-[#B48C58]" />
                  <span>{visit.propertyLocation}</span>
                </div>
              </div>
            </div>

            {/* Bottom row: Schedule lockup & Transit info */}
            <div className="pt-3 border-t border-slate-200/70 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <Calendar className="w-4 h-4 text-[#B48C58]" />
                  <span>{visit.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{visit.time}</span>
                </div>
              </div>

              {visit.transitRequested && (
                <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded border border-emerald-200">
                  <Car className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="font-medium">Chauffeured Pickup Arranged</span>
                </div>
              )}

              {visit.notes && (
                <p className="text-[11px] text-slate-500 leading-relaxed italic">
                  Note: {visit.notes}
                </p>
              )}

              <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                <span>Assigned Consultant:</span>
                <span className="font-semibold text-slate-700">{visit.assignedConsultant || 'Suresh Reddy'}</span>
              </div>
            </div>
          </div>
        ))}

        {filteredVisits.length === 0 && (
          <div className="col-span-2 py-10 text-center text-slate-500 text-sm">
            No site visits found for status filter "{activeFilter}".
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Total visits recorded: {visits.length}</span>
        <Link
          to="/admin/site-visits"
          className="font-semibold text-[#B48C58] hover:text-[#936E3B] inline-flex items-center gap-1"
        >
          <span>Manage All Site Visits</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
