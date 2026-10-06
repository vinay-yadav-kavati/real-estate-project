import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { SortOption } from '../types/property';

interface PropertySortProps {
  totalCount: number;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const PropertySort: React.FC<PropertySortProps> = ({
  totalCount,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
      {/* Left side: Results Count */}
      <div>
        <h2 className="text-sm font-semibold text-slate-900">
          {totalCount === 0 ? (
            <span className="font-bold text-base text-slate-950">No Properties Found</span>
          ) : (
            <>
              <span className="tabular-nums font-bold text-base text-slate-950">
                {totalCount}
              </span>{' '}
              {totalCount === 1 ? 'Property Found' : 'Properties Found'}
            </>
          )}
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Verified listings in Hyderabad & surrounding regions
        </p>
      </div>

      {/* Right side: Functional Sort By Dropdown */}
      <div className="flex items-center gap-2 self-end sm:self-auto">
        <label
          htmlFor="property-sort-select"
          className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
        >
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
          <span>Sort By:</span>
        </label>
        <select
          id="property-sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer shadow-2xs"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};
