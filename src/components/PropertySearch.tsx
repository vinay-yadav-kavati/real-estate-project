import React from 'react';
import { Search, X } from 'lucide-react';

interface PropertySearchProps {
  value: string;
  onChange: (query: string) => void;
  onClear: () => void;
}

export const PropertySearch: React.FC<PropertySearchProps> = ({
  value,
  onChange,
  onClear,
}) => {
  return (
    <div className="relative w-full">
      <label htmlFor="property-search-input" className="sr-only">
        Search properties by name, location or type
      </label>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <Search className="w-5 h-5 text-slate-400" aria-hidden="true" />
      </div>
      <input
        id="property-search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by property name, location or type..."
        className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all shadow-xs"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4 bg-slate-100 hover:bg-slate-200 rounded-full p-0.5" />
        </button>
      )}
    </div>
  );
};
