import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
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
  CalendarPlus,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { useProperties } from '../../context/PropertyContext';
import { Lead, LeadStatus, SiteVisit } from '../../types/admin';
import { LeadStatusBadge } from '../../components/admin/LeadStatusBadge';
import { LeadViewModal } from '../../components/admin/LeadViewModal';
import { LeadFormModal } from '../../components/admin/LeadFormModal';
import { DeleteLeadDialog } from '../../components/admin/DeleteLeadDialog';
import { SiteVisitFormModal } from '../../components/admin/SiteVisitFormModal';
import { Button } from '../../components/Button';

type LeadSortKey = 'newest' | 'oldest' | 'name-asc' | 'name-desc';

const LEAD_STATUS_OPTIONS: LeadStatus[] = [
  'New',
  'Contacted',
  'Qualified',
  'Site Visit Scheduled',
  'Negotiation',
  'Closed',
  'Lost',
];

export const AdminLeadsPage: React.FC = () => {
  const {
    leads,
    siteVisits,
    addLead,
    updateLead,
    deleteLead,
    addSiteVisit,
    resetCRMToDefault,
  } = useCRM();

  const { properties } = useProperties();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterProperty, setFilterProperty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<LeadSortKey>('newest');

  // Modals state
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isScheduleVisitModalOpen, setIsScheduleVisitModalOpen] = useState(false);

  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  // Toast notification
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4500);
  };

  // Dynamic Summary Statistics Calculation
  const summary = useMemo(() => {
    const total = leads.length;
    const newLeads = leads.filter((l) => l.status === 'New').length;
    const contacted = leads.filter((l) => l.status === 'Contacted').length;
    const qualified = leads.filter((l) => l.status === 'Qualified').length;
    const siteVisitsScheduled = leads.filter((l) => l.status === 'Site Visit Scheduled').length;
    const closed = leads.filter((l) => l.status === 'Closed').length;

    return {
      total,
      newLeads,
      contacted,
      qualified,
      siteVisitsScheduled,
      closed,
    };
  }, [leads]);

  // Filtered and Sorted Leads
  const filteredAndSortedLeads = useMemo(() => {
    let result = leads.filter((item) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const haystack = [
          item.name,
          item.phone,
          item.email,
          item.propertyTitle || '',
          item.propertyId || '',
          item.message || '',
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

      // 3. Property Filter
      if (filterProperty !== 'all' && item.propertyId !== filterProperty) {
        return false;
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return result;
  }, [leads, searchQuery, filterStatus, filterProperty, sortBy]);

  // Handlers
  const handleOpenAdd = () => {
    setActiveLead(null);
    setIsFormModalOpen(true);
  };

  const handleOpenView = (lead: Lead) => {
    setActiveLead(lead);
    setIsViewModalOpen(true);
  };

  const handleOpenEdit = (lead: Lead) => {
    setActiveLead(lead);
    setIsFormModalOpen(true);
  };

  const handleOpenDelete = (lead: Lead) => {
    setActiveLead(lead);
    setIsDeleteModalOpen(true);
  };

  const handleOpenScheduleVisit = (lead: Lead) => {
    setActiveLead(lead);
    setIsScheduleVisitModalOpen(true);
  };

  const handleFormSubmit = (data: Omit<Lead, 'id' | 'date'> & { id?: string; date?: string }) => {
    if (activeLead) {
      updateLead(activeLead.id, data);
      showToast('Lead updated successfully.');
    } else {
      const added = addLead(data);
      showToast(`New lead "${added.name}" registered successfully.`);
    }
  };

  const handleConfirmDelete = (id: string) => {
    deleteLead(id);
    showToast('Lead deleted successfully.');
  };

  const handleQuickStatusChange = (id: string, newStatus: LeadStatus) => {
    updateLead(id, { status: newStatus });
    showToast(`Lead status updated to ${newStatus}.`);
  };

  const handleScheduleVisitSubmit = (data: Omit<SiteVisit, 'id'>) => {
    addSiteVisit(data);
    showToast('Site visit scheduled successfully.');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' || filterStatus !== 'all' || filterProperty !== 'all' || sortBy !== 'newest';

  const clearAllFilters = () => {
    setSearchQuery('');
    setFilterStatus('all');
    setFilterProperty('all');
    setSortBy('newest');
  };

  // Associated site visits for the currently active lead
  const activeLeadVisits = useMemo(() => {
    if (!activeLead) return [];
    return siteVisits.filter((v) => v.leadId === activeLead.id);
  }, [activeLead, siteVisits]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* =========================================================================
          1. HEADER & ACTIONS BAR
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B48C58]">
            Customer CRM Pipeline
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Lead Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage property enquiries and track potential customers through the sales process.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="gold"
            size="md"
            onClick={handleOpenAdd}
            className="font-semibold shadow-sm"
            icon={<Plus className="w-4 h-4" />}
            iconPosition="left"
          >
            Add Lead
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
          2. CALCULATED LEAD SUMMARY METRICS (DYNAMIC)
          ========================================================================= */}
      <section aria-label="Lead Summary Statistics">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* 1. Total Leads */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Total Leads
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums mt-1 block">
              {summary.total}
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              Pipeline entries
            </span>
          </div>

          {/* 2. New Leads */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
            <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
              New Leads
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-900 tabular-nums mt-1 block">
              {summary.newLeads}
            </span>
            <span className="text-[11px] text-emerald-700 mt-0.5 block">
              Needs initial contact
            </span>
          </div>

          {/* 3. Contacted */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
            <span className="text-[11px] font-semibold text-blue-800 uppercase tracking-wider block">
              Contacted
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-900 tabular-nums mt-1 block">
              {summary.contacted}
            </span>
            <span className="text-[11px] text-blue-700 mt-0.5 block">
              Outreach made
            </span>
          </div>

          {/* 4. Qualified */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
            <span className="text-[11px] font-semibold text-indigo-800 uppercase tracking-wider block">
              Qualified
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-900 tabular-nums mt-1 block">
              {summary.qualified}
            </span>
            <span className="text-[11px] text-indigo-700 mt-0.5 block">
              Verified buyers
            </span>
          </div>

          {/* 5. Site Visits Scheduled */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
            <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
              Site Visits
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-900 tabular-nums mt-1 block">
              {summary.siteVisitsScheduled}
            </span>
            <span className="text-[11px] text-amber-700 mt-0.5 block">
              Tour booked
            </span>
          </div>

          {/* 6. Closed Deals */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
            <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
              Closed
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-800 tabular-nums mt-1 block">
              {summary.closed}
            </span>
            <span className="text-[11px] text-emerald-600 mt-0.5 block">
              Registry complete
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
              placeholder="Search by name, phone, email, or property..."
              className="w-full pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
                aria-label="Clear search text"
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
              aria-label="Filter by lead status"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
            >
              <option value="all">All Lead Statuses</option>
              {LEAD_STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Interested Property Filter (2 cols on lg) */}
          <div className="lg:col-span-2">
            <select
              value={filterProperty}
              onChange={(e) => setFilterProperty(e.target.value)}
              aria-label="Filter by interested property"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer truncate"
            >
              <option value="all">All Properties</option>
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          {/* Sorting (2 cols on lg) */}
          <div className="lg:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as LeadSortKey)}
              aria-label="Sort leads"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
            >
              <option value="newest">Sort: Newest</option>
              <option value="oldest">Sort: Oldest</option>
              <option value="name-asc">Name: A–Z</option>
              <option value="name-desc">Name: Z–A</option>
            </select>
          </div>
        </div>

        {/* Filter Summary & Reset Bar */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-600 font-medium">
              Filtered leads: <strong className="text-slate-900">{filteredAndSortedLeads.length}</strong> of{' '}
              {leads.length}
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
          4. LEADS LIST / TABLE (DESKTOP TABLE & RESPONSIVE CARDS)
          ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
        {filteredAndSortedLeads.length === 0 ? (
          /* Empty State */
          <div className="py-16 px-4 text-center space-y-4 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Users className="w-7 h-7 text-[#B48C58]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">
                No matching leads found
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                No inquiries match your current search query or filter selection. Try adjusting your search or clear all filters.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <Button variant="outline" size="sm" onClick={clearAllFilters}>
                Clear Filters
              </Button>
              <Button variant="primary" size="sm" onClick={handleOpenAdd}>
                Add New Lead
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {/* Mobile / Tablet Cards View */}
            <div className="block lg:hidden divide-y divide-slate-100">
              {filteredAndSortedLeads.map((lead) => (
                <div key={lead.id} className="p-4 sm:p-5 space-y-3 hover:bg-slate-50/60 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">
                        {lead.name}
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">
                        ID: {lead.id}
                      </div>
                    </div>
                    <LeadStatusBadge status={lead.status} />
                  </div>

                  {/* Contact Info */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                    <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-1 hover:text-[#B48C58]">
                      <Phone className="w-3.5 h-3.5 text-[#B48C58]" />
                      <span>{lead.phone}</span>
                    </a>
                    <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1 hover:text-[#B48C58]">
                      <Mail className="w-3.5 h-3.5 text-[#B48C58]" />
                      <span className="truncate max-w-[180px]">{lead.email}</span>
                    </a>
                  </div>

                  {/* Interested Property */}
                  {lead.propertyTitle && (
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-1.5 truncate">
                        <Building className="w-3.5 h-3.5 text-[#B48C58] shrink-0" />
                        <span className="font-semibold text-slate-800 truncate">{lead.propertyTitle}</span>
                      </div>
                      {lead.propertyPrice && (
                        <span className="font-bold text-slate-900 shrink-0 ml-2">{lead.propertyPrice}</span>
                      )}
                    </div>
                  )}

                  {/* Message Snippet */}
                  {lead.message && (
                    <p className="text-xs text-slate-500 line-clamp-2 italic">
                      "{lead.message}"
                    </p>
                  )}

                  {/* Mobile Actions Bar */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleOpenView(lead)}
                      className="inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>View</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenEdit(lead)}
                      className="inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold text-[#8B6B3E] bg-[#B48C58]/10 hover:bg-[#B48C58]/20 border border-[#B48C58]/30 transition-colors cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5 text-[#B48C58]" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenDelete(lead)}
                      className="inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th scope="col" className="py-3 px-3 sm:px-4">Lead & Contact</th>
                    <th scope="col" className="py-3 px-3 sm:px-4">Interested Property</th>
                    <th scope="col" className="py-3 px-3 sm:px-4">Message Snippet</th>
                    <th scope="col" className="py-3 px-3 sm:px-4">Status & Stage</th>
                    <th scope="col" className="py-3 px-3 sm:px-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAndSortedLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors group">
                      {/* 1. Lead Name, Contact & In-Row Actions */}
                      <td className="py-3.5 px-3 sm:px-4">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-[#B48C58]/10 text-[#8B6B3E] font-bold text-xs flex items-center justify-center shrink-0 border border-[#B48C58]/20 mt-0.5">
                            {lead.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">
                              {lead.name}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                              <a
                                href={`tel:${lead.phone}`}
                                className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors"
                              >
                                <Phone className="w-3 h-3 text-[#B48C58]" />
                                <span>{lead.phone}</span>
                              </a>
                              <span>·</span>
                              <a
                                href={`mailto:${lead.email}`}
                                className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors truncate max-w-[150px]"
                              >
                                <Mail className="w-3 h-3 text-[#B48C58]" />
                                <span className="truncate">{lead.email}</span>
                              </a>
                            </div>

                            {/* In-Row Action Controls */}
                            <div className="flex items-center gap-1.5 mt-2">
                              <button
                                type="button"
                                onClick={() => handleOpenView(lead)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer shadow-2xs"
                                title={`View ${lead.name} details`}
                              >
                                <Eye className="w-3.5 h-3.5 text-slate-500" />
                                <span>View</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleOpenEdit(lead)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-[#8B6B3E] bg-[#B48C58]/10 hover:bg-[#B48C58]/20 hover:text-[#70532B] border border-[#B48C58]/30 transition-colors cursor-pointer shadow-2xs"
                                title={`Edit ${lead.name}`}
                              >
                                <Edit className="w-3.5 h-3.5 text-[#B48C58]" />
                                <span>Edit</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleOpenDelete(lead)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 hover:text-rose-900 border border-rose-200 transition-colors cursor-pointer shadow-2xs"
                                title={`Delete ${lead.name}`}
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                                <span>Delete</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleOpenScheduleVisit(lead)}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors cursor-pointer ml-1"
                                title="Book site visit tour for this customer"
                              >
                                <CalendarPlus className="w-3 h-3 text-amber-600" />
                                <span>Book Tour</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 2. Interested Property */}
                      <td className="py-3.5 px-3 sm:px-4">
                        {lead.propertyId && lead.propertyTitle ? (
                          <div>
                            <Link
                              to={`/properties/${lead.propertyId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-slate-900 hover:text-[#B48C58] transition-colors inline-flex items-center gap-1 line-clamp-1"
                              title="View public property listing"
                            >
                              <span>{lead.propertyTitle}</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            </Link>
                            <div className="text-xs text-slate-500 font-medium mt-0.5">
                              {lead.propertyPrice ? `${lead.propertyPrice} · ` : ''}
                              <span className="font-mono text-[11px] text-slate-400">{lead.propertyId}</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">
                            General Portfolio Inquiry
                          </span>
                        )}
                      </td>

                      {/* 3. Message Snippet */}
                      <td className="py-3.5 px-3 sm:px-4 max-w-xs">
                        <p className="text-xs text-slate-600 line-clamp-2" title={lead.message}>
                          {lead.message || 'No additional message.'}
                        </p>
                        {lead.notes && (
                          <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 mt-1 inline-block">
                            Notes logged
                          </span>
                        )}
                      </td>

                      {/* 4. Status Badge & Quick Selector */}
                      <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <LeadStatusBadge status={lead.status} />
                          <div>
                            <select
                              value={lead.status}
                              onChange={(e) => handleQuickStatusChange(lead.id, e.target.value as LeadStatus)}
                              aria-label={`Change status for ${lead.name}`}
                              className="text-[11px] bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 hover:bg-white cursor-pointer focus:outline-none"
                            >
                              {LEAD_STATUS_OPTIONS.map((st) => (
                                <option key={st} value={st}>
                                  {st}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </td>

                      {/* 5. Date */}
                      <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap text-xs text-slate-500 font-medium">
                        {lead.date}
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
            Showing <strong className="text-slate-800">{filteredAndSortedLeads.length}</strong> of{' '}
            <strong className="text-slate-800">{leads.length}</strong> registered leads
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
            <Link to="/admin/site-visits" className="font-semibold text-slate-800 hover:text-[#B48C58]">
              Manage Site Visits →
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================================
          5. MODALS & DIALOGS
          ========================================================================= */}
      {/* View Lead Modal */}
      <LeadViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        lead={activeLead}
        onEditClick={handleOpenEdit}
        onScheduleVisitClick={handleOpenScheduleVisit}
        associatedVisits={activeLeadVisits}
      />

      {/* Add / Edit Lead Form Modal */}
      <LeadFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        leadToEdit={activeLead}
        properties={properties}
        onSubmit={handleFormSubmit}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteLeadDialog
        isOpen={isDeleteModalOpen}
        lead={activeLead}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirmDelete={handleConfirmDelete}
      />

      {/* Schedule Site Visit Modal (Direct from lead) */}
      <SiteVisitFormModal
        isOpen={isScheduleVisitModalOpen}
        onClose={() => setIsScheduleVisitModalOpen(false)}
        initialLead={activeLead}
        leads={leads}
        properties={properties}
        onSubmit={handleScheduleVisitSubmit}
      />
    </div>
  );
};
