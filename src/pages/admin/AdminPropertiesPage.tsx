import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Plus,
  Search,
  X,
  Filter,
  ArrowUpDown,
  ArrowUpRight,
  Edit,
  Trash2,
  MapPin,
  CheckCircle2,
  Clock,
  CheckCheck,
  RotateCcw,
  Building,
  Bed,
  Bath,
  Square,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { Property, PropertyType, PropertyStatus } from '../../types/property';
import { useProperties } from '../../context/PropertyContext';
import { PropertySummaryMetrics } from '../../components/admin/PropertySummaryMetrics';
import { PropertyFormModal } from '../../components/admin/PropertyFormModal';
import { DeletePropertyDialog } from '../../components/admin/DeletePropertyDialog';
import { PropertyStatusBadge } from '../../components/PropertyStatusBadge';
import { Button } from '../../components/Button';

type SortKey = 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'title-asc';

export const AdminPropertiesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    properties,
    addProperty,
    updateProperty,
    deleteProperty,
    updatePropertyStatus,
    resetToDefault,
  } = useProperties();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortKey>('newest');

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState<Property | null>(null);
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);

  // Automatically trigger Add Property modal if requested via URL action=add
  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      setPropertyToEdit(null);
      setIsFormModalOpen(true);
      const next = new URLSearchParams(searchParams);
      next.delete('action');
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // Success Notification / Toast state
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4500);
  };

  // Filtered & Sorted properties calculation
  const filteredAndSortedProperties = useMemo(() => {
    let result = properties.filter((item) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const haystack = [
          item.title,
          item.location,
          item.locality,
          item.city,
          item.propertyType,
          item.status,
          item.id,
        ]
          .join(' ')
          .toLowerCase();

        if (!haystack.includes(q)) return false;
      }

      // 2. Type Filter
      if (filterType !== 'all' && item.propertyType !== filterType) {
        return false;
      }

      // 3. Status Filter
      if (filterStatus !== 'all' && item.status !== filterStatus) {
        return false;
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        case 'oldest':
          return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
        case 'price-asc':
          return (a.priceNumeric || 0) - (b.priceNumeric || 0);
        case 'price-desc':
          return (b.priceNumeric || 0) - (a.priceNumeric || 0);
        case 'title-asc':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return result;
  }, [properties, searchQuery, filterType, filterStatus, sortBy]);

  // Handlers
  const handleOpenAdd = () => {
    setPropertyToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (property: Property) => {
    setPropertyToEdit(property);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = (data: Omit<Property, 'id' | 'createdAt'>) => {
    if (propertyToEdit) {
      updateProperty(propertyToEdit.id, data);
      showToast('Property updated successfully.');
    } else {
      const added = addProperty(data);
      showToast(`New property "${added.title}" added to inventory.`);
    }
  };

  const handleConfirmDelete = (id: string) => {
    deleteProperty(id);
    showToast('Property deleted successfully.');
  };

  const handleQuickStatusChange = (id: string, newStatus: PropertyStatus) => {
    updatePropertyStatus(id, newStatus);
    showToast(`Status updated to ${newStatus}.`);
  };

  const hasActiveFilters = searchQuery.trim() !== '' || filterType !== 'all' || filterStatus !== 'all' || sortBy !== 'newest';

  const clearAllFilters = () => {
    setSearchQuery('');
    setFilterType('all');
    setFilterStatus('all');
    setSortBy('newest');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* =========================================================================
          1. HEADER & ACTIONS BAR
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B48C58]">
            Catalog Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Property Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your property listings, availability, pricing, and live inventory.
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
            Add Property
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
          2. SUMMARY METRICS (DYNAMIC)
          ========================================================================= */}
      <section aria-label="Inventory Metrics">
        <PropertySummaryMetrics properties={properties} />
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
              placeholder="Search by title, location, type, or ID..."
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

          {/* Property Type Filter (3 cols on lg) */}
          <div className="lg:col-span-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              aria-label="Filter by property type"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
            >
              <option value="all">All Property Types</option>
              <option value="Villa">Villas</option>
              <option value="Apartment">Apartments</option>
              <option value="Commercial">Commercial</option>
              <option value="Plot">Plots / Land</option>
              <option value="Duplex">Duplexes</option>
              <option value="House">Independent Houses</option>
            </select>
          </div>

          {/* Status Filter (2 cols on lg) */}
          <div className="lg:col-span-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              aria-label="Filter by status"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Under Negotiation">Under Negotiation</option>
              <option value="Sold">Sold</option>
              <option value="Rented">Rented</option>
            </select>
          </div>

          {/* Sorting Option (2 cols on lg) */}
          <div className="lg:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              aria-label="Sort properties"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
            >
              <option value="newest">Sort: Newest</option>
              <option value="oldest">Sort: Oldest</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="title-asc">Title: A–Z</option>
            </select>
          </div>
        </div>

        {/* Filter Summary & Reset Bar */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-600 font-medium">
              Filtered results: <strong className="text-slate-900">{filteredAndSortedProperties.length}</strong> of {properties.length}
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
          4. PROPERTY LIST / TABLE (DESKTOP & RESPONSIVE CARDS)
          ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
        {filteredAndSortedProperties.length === 0 ? (
          /* Empty State */
          <div className="py-16 px-4 text-center space-y-4 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Building className="w-7 h-7 text-[#B48C58]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">
                No properties found
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                No properties in the inventory match your search or filter settings. Try adjusting your search query or reset the active filters.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <Button variant="outline" size="sm" onClick={clearAllFilters}>
                Clear Search & Filters
              </Button>
              <Button variant="primary" size="sm" onClick={handleOpenAdd}>
                Add New Property
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {/* Mobile / Tablet Cards View (Prevents horizontal scroll issues) */}
            <div className="block lg:hidden divide-y divide-slate-100">
              {filteredAndSortedProperties.map((prop) => (
                <div key={prop.id} className="p-4 sm:p-5 space-y-3.5 hover:bg-slate-50/60 transition-colors">
                  <div className="flex items-start gap-3.5">
                    <div className="w-20 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                      <img
                        src={prop.imageUrl}
                        alt={prop.title}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/images/properties/hero.jpg';
                        }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <PropertyStatusBadge status={prop.status} />
                        <span className="font-mono text-[11px] text-slate-400">ID: {prop.id}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mt-1 line-clamp-1">
                        {prop.title}
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#B48C58] shrink-0" />
                        <span>{prop.locality}, {prop.city}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Price</span>
                      <span className="font-extrabold text-slate-900 text-sm tabular-nums">
                        {prop.formattedPrice}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Type & Area</span>
                      <span className="font-medium text-slate-700">
                        {prop.bedrooms > 0 ? `${prop.bedrooms} BHK · ` : ''}{prop.areaSqFt.toLocaleString()} sq.ft.
                      </span>
                    </div>
                  </div>

                  {/* Actions for Mobile Card */}
                  <div className="flex items-center gap-2 pt-2">
                    <Link
                      to={`/properties/${prop.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors shadow-2xs"
                      title={`View ${prop.title} details`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleOpenEdit(prop)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
                      title="Edit property"
                    >
                      <Edit className="w-3.5 h-3.5 text-slate-600" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPropertyToDelete(prop)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
                      title="Delete property"
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
                    <th scope="col" className="py-3 px-3 sm:px-4">Property</th>
                    <th scope="col" className="py-3 px-3 sm:px-4">Location</th>
                    <th scope="col" className="py-3 px-3 sm:px-4">Type & Area</th>
                    <th scope="col" className="py-3 px-3 sm:px-4">Price</th>
                    <th scope="col" className="py-3 px-3 sm:px-4">Status & Quick Toggle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAndSortedProperties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-slate-50/70 transition-colors group">
                      {/* 1. Property Title, ID, Image & Inline Shortcuts */}
                      <td className="py-3.5 px-3 sm:px-4">
                        <div className="flex items-start gap-3">
                          <div className="w-13 h-11 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100 mt-0.5">
                            <img
                              src={prop.imageUrl}
                              alt={prop.title}
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = '/images/properties/hero.jpg';
                              }}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <Link
                              to={`/properties/${prop.id}`}
                              className="font-bold text-slate-900 group-hover:text-[#B48C58] transition-colors line-clamp-1 text-sm inline-flex items-center gap-1"
                              title="View public details page"
                            >
                              <span>{prop.title}</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#B48C58]" />
                            </Link>
                            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                              <span className="font-mono text-[11px]">ID: {prop.id}</span>
                              {prop.featured && (
                                <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                                  Featured
                                </span>
                              )}
                            </div>

                            {/* In-Row Action Controls */}
                            <div className="flex items-center gap-1.5 mt-2">
                              <Link
                                to={`/properties/${prop.id}`}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 border border-slate-200 transition-colors shadow-2xs"
                                title={`View ${prop.title}`}
                              >
                                <Eye className="w-3.5 h-3.5 text-slate-500" />
                                <span>View</span>
                              </Link>

                              <button
                                type="button"
                                onClick={() => handleOpenEdit(prop)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-[#8B6B3E] bg-[#B48C58]/10 hover:bg-[#B48C58]/20 hover:text-[#70532B] border border-[#B48C58]/30 transition-colors cursor-pointer shadow-2xs"
                                title={`Edit ${prop.title}`}
                              >
                                <Edit className="w-3.5 h-3.5 text-[#B48C58]" />
                                <span>Edit</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setPropertyToDelete(prop)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 hover:text-rose-900 border border-rose-200 transition-colors cursor-pointer shadow-2xs"
                                title={`Delete ${prop.title}`}
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 2. Location */}
                      <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap text-xs text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#B48C58] shrink-0" />
                          <span>{prop.locality}, {prop.city}</span>
                        </div>
                        {prop.address && (
                          <span className="text-[11px] text-slate-400 block line-clamp-1 max-w-[160px] mt-0.5">
                            {prop.address}
                          </span>
                        )}
                      </td>

                      {/* 3. Type & Area */}
                      <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                        <span className="font-semibold text-slate-900 block text-xs">
                          {prop.propertyType} ({prop.purpose})
                        </span>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 font-medium">
                          {prop.bedrooms > 0 && <span>{prop.bedrooms} BHK ·</span>}
                          <span className="tabular-nums">{prop.areaSqFt.toLocaleString()} sq.ft.</span>
                        </div>
                      </td>

                      {/* 4. Price */}
                      <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                        <span className="font-bold text-slate-900 text-sm sm:text-base tabular-nums block">
                          {prop.formattedPrice}
                        </span>
                        <span className="text-[11px] text-slate-400 block">
                          ₹{(prop.priceNumeric / prop.areaSqFt).toFixed(0)}/sq.ft.
                        </span>
                      </td>

                      {/* 5. Status Badge & Quick Dropdown */}
                      <td className="py-3.5 px-3 sm:px-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <PropertyStatusBadge status={prop.status} />
                          <div>
                            <select
                              value={prop.status}
                              onChange={(e) => handleQuickStatusChange(prop.id, e.target.value as PropertyStatus)}
                              aria-label={`Change status for ${prop.title}`}
                              className="text-[11px] bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 hover:bg-white cursor-pointer focus:outline-none"
                            >
                              <option value="Available">Available</option>
                              <option value="Under Negotiation">Under Negotiation</option>
                              <option value="Sold">Sold</option>
                              <option value="Rented">Rented</option>
                            </select>
                          </div>
                        </div>
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
            Showing <strong className="text-slate-800">{filteredAndSortedProperties.length}</strong> of{' '}
            <strong className="text-slate-800">{properties.length}</strong> registered inventory assets
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={resetToDefault}
              className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
            >
              Reset to 9 Default Properties
            </button>
            <span className="text-slate-300">·</span>
            <Link to="/properties" target="_blank" className="font-semibold text-slate-800 hover:text-[#B48C58]">
              Client Catalog Portal →
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================================
          5. MODALS & DIALOGS
          ========================================================================= */}
      {/* Add / Edit Property Modal */}
      <PropertyFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        propertyToEdit={propertyToEdit}
        onSubmit={handleFormSubmit}
        onDeleteRequest={(prop) => {
          setIsFormModalOpen(false);
          setPropertyToDelete(prop);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <DeletePropertyDialog
        isOpen={Boolean(propertyToDelete)}
        property={propertyToDelete}
        onClose={() => setPropertyToDelete(null)}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};
