import React, { useState } from 'react';
import { SlidersHorizontal, RotateCcw, ChevronDown, ChevronUp, MapPin, Building, IndianRupee, Bed, Activity } from 'lucide-react';
import { PropertyFilterState } from '../types/property';
import { countActiveFilters } from '../lib/propertyFilters';

interface PropertyFiltersProps {
  filters: PropertyFilterState;
  onFilterChange: (key: keyof PropertyFilterState, value: any) => void;
  onResetFilters: () => void;
  availableLocations: string[];
}

export const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  availableLocations,
}) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const activeCount = countActiveFilters(filters);

  // Price presets in INR
  const minPriceOptions = [
    { label: 'Any Min', value: null },
    { label: '₹50 Lakh', value: 5000000 },
    { label: '₹1 Cr', value: 10000000 },
    { label: '₹1.5 Cr', value: 15000000 },
    { label: '₹2 Cr', value: 20000000 },
    { label: '₹2.5 Cr', value: 25000000 },
    { label: '₹3 Cr', value: 30000000 },
  ];

  const maxPriceOptions = [
    { label: 'Any Max', value: null },
    { label: '₹1 Cr', value: 10000000 },
    { label: '₹1.5 Cr', value: 15000000 },
    { label: '₹2 Cr', value: 20000000 },
    { label: '₹2.5 Cr', value: 25000000 },
    { label: '₹3 Cr', value: 30000000 },
    { label: '₹4 Cr', value: 40000000 },
  ];

  const bedroomOptions = [
    { label: 'Any', value: null },
    { label: '1+', value: 1 },
    { label: '2+', value: 2 },
    { label: '3+', value: 3 },
    { label: '4+', value: 4 },
  ];

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-xs mb-8">
      {/* Mobile Toggle Bar */}
      <div className="flex items-center justify-between lg:hidden">
        <button
          type="button"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="flex items-center gap-2 text-sm font-semibold text-slate-800 py-1 px-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          aria-expanded={isMobileFiltersOpen}
        >
          <SlidersHorizontal className="w-4 h-4 text-[#B48C58]" />
          <span>Filters</span>
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">
              {activeCount}
            </span>
          )}
          {isMobileFiltersOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500" />
          )}
        </button>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs font-semibold text-rose-700 hover:text-rose-900 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Filter Fields Container (always visible on desktop, toggleable on mobile) */}
      <div
        className={`${
          isMobileFiltersOpen ? 'block mt-4 pt-4 border-t border-slate-100' : 'hidden'
        } lg:block`}
      >
        {/* Purpose Segmented Filter (All, Buy, Rent) */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">
            Purpose:
          </span>
          <button
            type="button"
            onClick={() => onFilterChange('purpose', 'all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              !filters.purpose || filters.purpose === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            All Listings
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('purpose', 'Buy')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              filters.purpose === 'Buy'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('purpose', 'Rent')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              filters.purpose === 'Rent'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Rent
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {/* 1. Property Type */}
          <div>
            <label
              htmlFor="filter-property-type"
              className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"
            >
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>Property Type</span>
            </label>
            <select
              id="filter-property-type"
              value={filters.propertyType}
              onChange={(e) => onFilterChange('propertyType', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Plot">Plot</option>
              <option value="Commercial">Commercial</option>
              <option value="House">House</option>
              <option value="Duplex">Duplex</option>
            </select>
          </div>

          {/* 2. Location */}
          <div>
            <label
              htmlFor="filter-location"
              className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Location</span>
            </label>
            <select
              id="filter-location"
              value={filters.locality}
              onChange={(e) => onFilterChange('locality', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white cursor-pointer"
            >
              <option value="all">All Locations</option>
              {availableLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Price Range (Min & Max combined in responsive block) */}
          <div>
            <label
              htmlFor="filter-min-price"
              className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"
            >
              <IndianRupee className="w-3.5 h-3.5 text-slate-400" />
              <span>Price Range</span>
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <select
                id="filter-min-price"
                value={filters.minPrice === null ? '' : filters.minPrice}
                onChange={(e) =>
                  onFilterChange(
                    'minPrice',
                    e.target.value === '' ? null : Number(e.target.value)
                  )
                }
                aria-label="Minimum Price"
                className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white cursor-pointer"
              >
                {minPriceOptions.map((opt) => (
                  <option
                    key={opt.label}
                    value={opt.value === null ? '' : opt.value}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
              <select
                id="filter-max-price"
                value={filters.maxPrice === null ? '' : filters.maxPrice}
                onChange={(e) =>
                  onFilterChange(
                    'maxPrice',
                    e.target.value === '' ? null : Number(e.target.value)
                  )
                }
                aria-label="Maximum Price"
                className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white cursor-pointer"
              >
                {maxPriceOptions.map((opt) => (
                  <option
                    key={opt.label}
                    value={opt.value === null ? '' : opt.value}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 4. Bedrooms */}
          <div>
            <label
              htmlFor="filter-bedrooms"
              className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"
            >
              <Bed className="w-3.5 h-3.5 text-slate-400" />
              <span>Bedrooms</span>
            </label>
            <select
              id="filter-bedrooms"
              value={filters.minBedrooms === null ? '' : filters.minBedrooms}
              onChange={(e) =>
                onFilterChange(
                  'minBedrooms',
                  e.target.value === '' ? null : Number(e.target.value)
                )
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white cursor-pointer"
            >
              {bedroomOptions.map((opt) => (
                <option
                  key={opt.label}
                  value={opt.value === null ? '' : opt.value}
                >
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* 5. Property Status */}
          <div>
            <label
              htmlFor="filter-status"
              className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"
            >
              <Activity className="w-3.5 h-3.5 text-slate-400" />
              <span>Status</span>
            </label>
            <select
              id="filter-status"
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Under Negotiation">Under Negotiation</option>
              <option value="Sold">Sold</option>
              <option value="Rented">Rented</option>
            </select>
          </div>
        </div>

        {/* Desktop Clear Filters Action Bar */}
        {activeCount > 0 && (
          <div className="hidden lg:flex items-center justify-between pt-3.5 mt-3.5 border-t border-slate-100">
            <span className="text-xs text-slate-500 font-medium">
              {activeCount} active {activeCount === 1 ? 'filter' : 'filters'} applied
            </span>
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-950 transition-colors py-1 px-2.5 rounded-md hover:bg-slate-100 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Clear All Filters</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
