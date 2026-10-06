import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PropertyGrid } from '../components/PropertyGrid';
import { PropertySort } from '../components/PropertySort';
import { PropertySearch } from '../components/PropertySearch';
import { PropertyFilters } from '../components/PropertyFilters';
import { useProperties } from '../context/PropertyContext';
import { PropertyFilterState, SortOption } from '../types/property';
import {
  filterAndSortProperties,
  INITIAL_FILTER_STATE,
} from '../lib/propertyFilters';

export const PropertiesPage: React.FC = () => {
  const { properties } = useProperties();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial filter values from URL search params for deep linking / sharing
  const filters: PropertyFilterState = useMemo(() => {
    const q = searchParams.get('q') || '';
    const type = searchParams.get('type') || 'all';
    const loc = searchParams.get('location') || 'all';
    const minP = searchParams.get('minPrice');
    const maxP = searchParams.get('maxPrice');
    const beds = searchParams.get('bedrooms');
    const status = searchParams.get('status') || 'all';
    const sort = (searchParams.get('sort') as SortOption) || 'newest';
    const purpose = searchParams.get('purpose') || 'all';

    return {
      searchQuery: q,
      propertyType: type,
      locality: loc,
      minPrice: minP ? Number(minP) : null,
      maxPrice: maxP ? Number(maxP) : null,
      minBedrooms: beds ? Number(beds) : null,
      status: status,
      sortBy: ['newest', 'price-asc', 'price-desc'].includes(sort)
        ? sort
        : 'newest',
      purpose: purpose,
    };
  }, [searchParams]);

  // Synchronize filter changes with URL search params
  const updateFilters = (newFilters: PropertyFilterState) => {
    const params = new URLSearchParams();

    if (newFilters.searchQuery.trim()) {
      params.set('q', newFilters.searchQuery.trim());
    }
    if (newFilters.propertyType && newFilters.propertyType !== 'all') {
      params.set('type', newFilters.propertyType);
    }
    if (newFilters.locality && newFilters.locality !== 'all') {
      params.set('location', newFilters.locality);
    }
    if (newFilters.minPrice !== null && newFilters.minPrice > 0) {
      params.set('minPrice', newFilters.minPrice.toString());
    }
    if (newFilters.maxPrice !== null && newFilters.maxPrice > 0) {
      params.set('maxPrice', newFilters.maxPrice.toString());
    }
    if (newFilters.minBedrooms !== null && newFilters.minBedrooms > 0) {
      params.set('bedrooms', newFilters.minBedrooms.toString());
    }
    if (newFilters.status && newFilters.status !== 'all') {
      params.set('status', newFilters.status);
    }
    if (newFilters.purpose && newFilters.purpose !== 'all') {
      params.set('purpose', newFilters.purpose);
    }
    if (newFilters.sortBy && newFilters.sortBy !== 'newest') {
      params.set('sort', newFilters.sortBy);
    }

    setSearchParams(params, { replace: true });
  };

  const handleFilterChange = (
    key: keyof PropertyFilterState,
    value: any
  ) => {
    const nextFilters = {
      ...filters,
      [key]: value,
    };
    updateFilters(nextFilters);
  };

  const handleResetFilters = () => {
    updateFilters(INITIAL_FILTER_STATE);
  };

  // Dynamically extract distinct locations from the property data
  const availableLocations = useMemo(() => {
    const set = new Set<string>();
    properties.forEach((p) => {
      if (p.locality) set.add(p.locality);
    });
    return Array.from(set).sort();
  }, [properties]);

  // Filter and sort properties based on active criteria
  const filteredProperties = useMemo(() => {
    return filterAndSortProperties(properties, filters);
  }, [properties, filters]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* =========================================================================
          PAGE HEADER / HERO (Subtle, professional, not excessively tall)
          ========================================================================= */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-12 sm:py-16 border-b border-slate-800/80">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#B48C58]/40 via-slate-900 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#E4C59E]">
              Portfolio Directory
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Properties
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Explore our collection of residential, commercial and land properties. Every listing is physically inspected and verified for legal compliance.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PROPERTY DISCOVERY & BROWSING AREA
          ========================================================================= */}
      <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        {/* Search Bar */}
        <div className="mb-4">
          <PropertySearch
            value={filters.searchQuery}
            onChange={(q) => handleFilterChange('searchQuery', q)}
            onClear={() => handleFilterChange('searchQuery', '')}
          />
        </div>

        {/* Filters Panel (Type, Location, Price, Bedrooms, Status) */}
        <PropertyFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          availableLocations={availableLocations}
        />

        {/* Results Counter & Functional Sorting Bar */}
        <PropertySort
          totalCount={filteredProperties.length}
          sortBy={filters.sortBy}
          onSortChange={(sort) => handleFilterChange('sortBy', sort)}
        />

        {/* Property Grid with Empty State integration */}
        <PropertyGrid
          properties={filteredProperties}
          onResetEmpty={handleResetFilters}
        />
      </section>
    </div>
  );
};
