import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  Search,
  X,
  Filter,
  Plus,
  ArrowUpDown,
  ArrowUpRight,
  Phone,
  Mail,
  Building,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Eye,
  Edit,
  Trash2,
  XCircle,
  Clock,
  Car,
  User,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { useProperties } from '../../context/PropertyContext';
import { SiteVisit, SiteVisitStatus, Lead } from '../../types/admin';
import { SiteVisitStatusBadge } from '../../components/admin/SiteVisitStatusBadge';
import { SiteVisitViewModal } from '../../components/admin/SiteVisitViewModal';
import { SiteVisitFormModal } from '../../components/admin/SiteVisitFormModal';
import { CancelSiteVisitDialog } from '../../components/admin/CancelSiteVisitDialog';
import { Button } from '../../components/Button';

type VisitSortKey = 'upcoming' | 'latest' | 'oldest';
type DateFilterKey = 'all' | 'upcoming' | 'past';

const VISIT_STATUS_OPTIONS: SiteVisitStatus[] = [
  'Scheduled',
  'Confirmed',
  'Completed',
  'Cancelled',
  'Rescheduled',
];

export const AdminSiteVisitsPage: React.FC = () => {
  const {
    siteVisits,
    leads,
    addSiteVisit,
    updateSiteVisit,
    cancelSiteVisit,
    deleteSiteVisit,
    resetCRMToDefault,
  } = useCRM();

  const { properties } = useProperties();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<DateFilterKey>('all');
  const [sortBy, setSortBy] = useState<VisitSortKey>('upcoming');

  // Modals state
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const [activeVisit, setActiveVisit] = useState<SiteVisit | null>(null);

  // Toast notification
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4500);
  };

  // Dynamic Calculated Statistics (Section 22)
  const summary = useMemo(() => {
    const total = siteVisits.length;
    const upcoming = siteVisits.filter(
      (v) => v.status === 'Scheduled' || v.status === 'Confirmed' || v.status === 'Rescheduled'
    ).length;
    const confirmed = siteVisits.filter((v) => v.status === 'Confirmed').length;
    const completed = siteVisits.filter((v) => v.status === 'Completed').length;
    const cancelled = siteVisits.filter((v) => v.status === 'Cancelled').length;

    return {
      total,
      upcoming,
      confirmed,
      completed,
      cancelled,
    };
  }, [siteVisits]);

  // Filtered & Sorted Site Visits
  const filteredAndSortedVisits = useMemo(() => {
    const todayStr = new Date().toISOString().slice(0, 10);

    let result = siteVisits.filter((item) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const haystack = [
          item.leadName,
          item.phone,
          item.email,
          item.propertyTitle,
          item.propertyLocation || '',
          item.notes || '',
        ]
          .join(' ')
          .toLowerCase();

        if (!haystack.includes(q)) return false;
      }

      // 2. Status Filter
      if (filterStatus !== 'all' && item.status !== filterStatus) {
        return false;
      }

      // 3. Date Filter
      if (filterDate === 'upcoming') {
        if (item.date < todayStr && item.status === 'Completed') return false;
      } else if (filterDate === 'past') {
        if (item.date >= todayStr) return false;
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'upcoming': {
          // Upcoming visits first, then by date ascending
          const isAUpcoming = a.status === 'Scheduled' || a.status === 'Confirmed' || a.status === 'Rescheduled';
          const isBUpcoming = b.status === 'Scheduled' || b.status === 'Confirmed' || b.status === 'Rescheduled';
          if (isAUpcoming && !isBUpcoming) return -1;
          if (!isAUpcoming && isBUpcoming) return 1;
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        case 'latest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        default:
          return 0;
      }
    });

    return result;
  }, [siteVisits, searchQuery, filterStatus, filterDate, sortBy]);

  // Handlers
  const handleOpenSchedule = () => {
    setActiveVisit(null);
    setIsFormModalOpen(true);
  };

  const handleOpenView = (visit: SiteVisit) => {
    setActiveVisit(visit);
    setIsViewModalOpen(true);
  };

  const handleOpenEdit = (visit: SiteVisit) => {
    setActiveVisit(visit);
    setIsFormModalOpen(true);
  };

  const handleOpenCancel = (visit: SiteVisit) => {
    setActiveVisit(visit);
    setIsCancelModalOpen(true);
  };

  const handleFormSubmit = (data: Omit<SiteVisit, 'id'>) => {
    if (activeVisit) {
      updateSiteVisit(activeVisit.id, data);
      showToast('Site visit updated successfully.');
    } else {
      addSiteVisit(data);
      showToast('Site visit scheduled successfully.');
    }
  };

  const handleConfirmCancel = (id: string) => {
    cancelSiteVisit(id);
    showToast('Site visit cancelled successfully.');
  };

  const handleQuickStatusChange = (id: string, newStatus: SiteVisitStatus) => {
    updateSiteVisit(id, { status: newStatus });
    showToast(`Site visit status updated to ${newStatus}.`);
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' || filterStatus !== 'all' || filterDate !== 'all' || sortBy !== 'upcoming';

  const clearAllFilters = () => {
    setSearchQuery('');
    setFilterStatus('all');
    setFilterDate('all');
    setSortBy('upcoming');
  };

  const activeVisitLead = useMemo(() => {
    if (!activeVisit?.leadId) return null;
    return leads.find((l) => l.id === activeVisit.leadId) || null;
  }, [activeVisit, leads]);

  const activeVisitProperty = useMemo(() => {
    if (!activeVisit?.propertyId) return null;
    return properties.find((p) => p.id === activeVisit.propertyId) || null;
  }, [activeVisit, properties]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* =========================================================================
          1. HEADER & ACTIONS BAR
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B48C58]">
            Property Inspection Schedule
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Site Visits
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Schedule and manage property visits for interested customers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="gold"
            size="md"
            onClick={handleOpenSchedule}
            className="font-semibold shadow-sm"
            icon={<Plus className="w-4 h-4" />}
            iconPosition="left"
          >
            Schedule Site Visit
          </Button>
        </div>
      </div>

      {/* Success Notification Banner / Toast */}
      {notification && (
        <div
          role="status"
          aria-live="polite"
          className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between gap-3 shadow-xs animate-fadeIn"
        >
          <div className="flex items-center gap-2.5 text-sm font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{notification.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="p-1 rounded-md text-emerald-700 hover:text-emerald-950 hover:bg-emerald-100/60 cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* =========================================================================
          2. CALCULATED SUMMARY STATISTICS (SECTION 22)
          ========================================================================= */}
      <section aria-label="Site Visit Summary Statistics">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Total Visits */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Total Visits
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums mt-1 block">
              {summary.total}
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              Lifetime requests
            </span>
          </div>

          {/* Upcoming */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
            <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
              Upcoming
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-900 tabular-nums mt-1 block">
              {summary.upcoming}
            </span>
            <span className="text-[11px] text-amber-700 mt-0.5 block">
              Scheduled appointments
            </span>
          </div>

          {/* Confirmed */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
            <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
              Confirmed
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-900 tabular-nums mt-1 block">
              {summary.confirmed}
            </span>
            <span className="text-[11px] text-emerald-700 mt-0.5 block">
              Locked with clients
            </span>
          </div>

          {/* Completed */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
            <span className="text-[11px] font-semibold text-blue-800 uppercase tracking-wider block">
              Completed
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-900 tabular-nums mt-1 block">
              {summary.completed}
            </span>
            <span className="text-[11px] text-blue-700 mt-0.5 block">
              Tours conducted
            </span>
          </div>

          {/* Cancelled */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
            <span className="text-[11px] font-semibold text-rose-800 uppercase tracking-wider block">
              Cancelled
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-rose-800 tabular-nums mt-1 block">
              {summary.cancelled}
            </span>
            <span className="text-[11px] text-rose-600 mt-0.5 block">
              Schedule revoked
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SEARCH, FILTERS & SORTING CONTROLS
          ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* Search Input (5 cols on lg) */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer name or property..."
              className="w-full pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Status Filter (3 cols on lg) */}
          <div className="lg:col-span-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              aria-label="Filter by visit status"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
            >
              <option value="all">All Visit Statuses</option>
              {VISIT_STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter (2 cols on lg) */}
          <div className="lg:col-span-2">
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value as DateFilterKey)}
              aria-label="Filter by appointment date"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
            >
              <option value="all">All Dates</option>
              <option value="upcoming">Upcoming & Active</option>
              <option value="past">Past Inspections</option>
            </select>
          </div>

          {/* Sorting (2 cols on lg) */}
          <div className="lg:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as VisitSortKey)}
              aria-label="Sort visits"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
            >
              <option value="upcoming">Upcoming First</option>
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Filter Summary & Reset */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-600 font-medium">
              Filtered visits: <strong className="text-slate-900">{filteredAndSortedVisits.length}</strong> of{' '}
              {siteVisits.length}
            </span>
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-[#B48C58] hover:text-[#936E3B] font-semibold inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* =========================================================================
          4. SITE VISITS LIST / TABLE
          ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
        {filteredAndSortedVisits.length === 0 ? (
          /* Empty State */
          <div className="py-16 px-4 text-center space-y-4 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <CalendarCheck className="w-7 h-7 text-[#B48C58]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">
                No site visits found
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                No site visit appointments match your search criteria or filter configuration.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <Button variant="outline" size="sm" onClick={clearAllFilters}>
                Clear Filters
              </Button>
              <Button variant="primary" size="sm" onClick={handleOpenSchedule}>
                Schedule Site Visit
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {/* Mobile / Tablet Cards View */}
            <div className="block lg:hidden divide-y divide-slate-100">
              {filteredAndSortedVisits.map((visit) => (
                <div key={visit.id} className="p-4 sm:p-5 space-y-3 hover:bg-slate-50/60 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">
                        {visit.leadName}
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">
                        ID: {visit.id}
                      </div>
                    </div>
                    <SiteVisitStatusBadge status={visit.status} />
                  </div>

                  {/* Date & Time Badge */}
                  <div className="flex items-center gap-3 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/70">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                      <Calendar className="w-3.5 h-3.5 text-[#B48C58]" />
                      <span>{visit.date}</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1.5 font-medium text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{visit.time}</span>
                    </div>
                    {visit.transitRequested && (
                      <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                        <Car className="w-3 h-3" />
                        <span>Transit</span>
                      </span>
                    )}
                  </div>

                  {/* Property Details */}
                  <div className="text-xs flex items-center justify-between">
                    <div className="flex items-center gap-1.5 truncate">
                      <Building className="w-3.5 h-3.5 text-[#B48C58] shrink-0" />
                      <span className="font-semibold text-slate-800 truncate">{visit.propertyTitle}</span>
                    </div>
                    <span className="font-mono text-[11px] text-slate-400 ml-2 shrink-0">{visit.propertyId}</span>
                  </div>

                  {/* Actions Bar */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleOpenView(visit)}
                      className="inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>View</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenEdit(visit)}
                      className="inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold text-[#8B6B3E] bg-[#B48C58]/10 hover:bg-[#B48C58]/20 border border-[#B48C58]/30 transition-colors cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5 text-[#B48C58]" />
                      <span>Edit</span>
                    </button>

                    {visit.status !== 'Cancelled' ? (
                      <button
                        type="button"
                        onClick={() => handleOpenCancel(visit)}
                        className="inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Cancel</span>
                      </button>
                    ) : (
                      <span className="inline-flex items-center justify-center text-xs text-slate-400 italic">
                        Cancelled
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th scope="col" className="py-3 px-3 sm:px-4">Customer & Visitor</th>
                    <th scope="col" className="py-3 px-3 sm:px-4">Property to Tour</th>
                    <th scope="col" className="py-3 px-3 sm:px-4">Appointment Schedule</th>
                    <th scope="col" className="py-3 px-3 sm:px-4">Status & Quick Toggle</th>
                    <th scope="col" className="py-3 px-3 sm:px-4">Consultant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAndSortedVisits.map((visit) => (
                    <tr key={visit.id} className="hover:bg-slate-50/70 transition-colors group">
                      {/* 1. Customer Name & Contact & In-Row Actions */}
                      <td className="py-3.5 px-3 sm:px-4">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-200/80 mt-0.5">
                            {visit.leadName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">
                              {visit.leadName}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                              {visit.phone && (
                                <a
                                  href={`tel:${visit.phone}`}
                                  className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors"
                                >
                                  <Phone className="w-3 h-3 text-[#B48C58]" />
                                  <span>{visit.phone}</span>
                                </a>
                              )}
                              {visit.leadId && (
                                <span className="font-mono text-[11px] text-slate-400">
                                  Lead: {visit.leadId}
                                </span>
                              )}
                            </div>

                            {/* In-Row Action Controls */}
                            <div className="flex items-center gap-1.5 mt-2">
                              <button
                                type="button"
                                onClick={() => handleOpenView(visit)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer shadow-2xs"
                                title={`View ${visit.leadName} visit details`}
                              >
                                <Eye className="w-3.5 h-3.5 text-slate-500" />
                                <span>View</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleOpenEdit(visit)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-[#8B6B3E] bg-[#B48C58]/10 hover:bg-[#B48C58]/20 hover:text-[#70532B] border border-[#B48C58]/30 transition-colors cursor-pointer shadow-2xs"
                                title="Edit / Reschedule visit"
                              >
                                <Edit className="w-3.5 h-3.5 text-[#B48C58]" />
                                <span>Edit / Reschedule</span>
                              </button>

                              {visit.status !== 'Cancelled' && (
                                <button
                                  type="button"
                                  onClick={() => handleOpenCancel(visit)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 hover:text-rose-900 border border-rose-200 transition-colors cursor-pointer shadow-2xs"
                                  title="Cancel this scheduled tour"
                                >
                                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                                  <span>Cancel</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 2. Target Property */}
                      <td className="py-3.5 px-3 sm:px-4">
                        <Link
                          to={`/properties/${visit.propertyId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-slate-900 hover:text-[#B48C58] transition-colors inline-flex items-center gap-1 line-clamp-1"
                          title="View property details"
                        >
                          <span>{visit.propertyTitle}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        </Link>
                        <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                          <Building className="w-3 h-3 text-[#B48C58]" />
                          <span>{visit.propertyLocation || 'Hyderabad prime corridor'}</span>
                        </div>
                      </td>

                      {/* 3. Appointment Date & Time */}
                      <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                          <Calendar className="w-3.5 h-3.5 text-[#B48C58]" />
                          <span>{visit.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{visit.time}</span>
                          {visit.transitRequested && (
                            <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-semibold inline-flex items-center gap-0.5">
                              <Car className="w-2.5 h-2.5" />
                              <span>Transit</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 4. Status Badge & Quick Selector */}
                      <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <SiteVisitStatusBadge status={visit.status} />
                          <div>
                            <select
                              value={visit.status}
                              onChange={(e) => handleQuickStatusChange(visit.id, e.target.value as SiteVisitStatus)}
                              aria-label={`Change status for visit ${visit.id}`}
                              className="text-[11px] bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 hover:bg-white cursor-pointer focus:outline-none"
                            >
                              {VISIT_STATUS_OPTIONS.map((st) => (
                                <option key={st} value={st}>
                                  {st}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </td>

                      {/* 5. Assigned Consultant */}
                      <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap text-xs text-slate-600 font-medium">
                        {visit.assignedConsultant || 'Suresh Reddy'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Table Footer */}
        <div className="p-4 bg-slate-50/70 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing <strong className="text-slate-800">{filteredAndSortedVisits.length}</strong> of{' '}
            <strong className="text-slate-800">{siteVisits.length}</strong> scheduled site visits
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={resetCRMToDefault}
              className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
            >
              Reset to Mock Dataset
            </button>
            <span className="text-slate-300">·</span>
            <Link to="/admin/leads" className="font-semibold text-slate-800 hover:text-[#B48C58]">
              Manage Leads Pipeline →
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================================
          5. MODALS & DIALOGS
          ========================================================================= */}
      {/* View Site Visit Modal */}
      <SiteVisitViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        visit={activeVisit}
        onEditClick={handleOpenEdit}
        onCancelClick={handleOpenCancel}
        associatedLead={activeVisitLead}
        property={activeVisitProperty}
      />

      {/* Schedule / Edit Site Visit Modal */}
      <SiteVisitFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        visitToEdit={activeVisit}
        leads={leads}
        properties={properties}
        onSubmit={handleFormSubmit}
      />

      {/* Cancel Confirmation Dialog */}
      <CancelSiteVisitDialog
        isOpen={isCancelModalOpen}
        visit={activeVisit}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirmCancel={handleConfirmCancel}
      />
    </div>
  );
};
