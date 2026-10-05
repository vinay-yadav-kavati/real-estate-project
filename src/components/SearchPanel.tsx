import React, { useState } from 'react';
import { MapPin, Building2, IndianRupee, Search } from 'lucide-react';
import { Button } from './Button';

export const SearchPanel: React.FC = () => {
  const [purpose, setPurpose] = useState<'Buy' | 'Rent'>('Buy');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [budget, setBudget] = useState('');
  const [searchNotice, setSearchNotice] = useState<string | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Non-functional mock search interaction for Step 1
    setSearchNotice('Search filtering will be connected in Step 2. You can explore featured properties below.');
    setTimeout(() => {
      setSearchNotice(null);
    }, 4500);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-xl border border-slate-200/90 p-4 sm:p-6">
      {/* Purpose Segmented Control (Buy / Rent) */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <button
          type="button"
          onClick={() => setPurpose('Buy')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
            purpose === 'Buy'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Buy Properties
        </button>
        <button
          type="button"
          onClick={() => setPurpose('Rent')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
            purpose === 'Rent'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Rent Properties
        </button>
      </div>

      {/* Search Input Controls Form */}
      <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end">
        {/* Field 1: Location */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Location
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <MapPin className="w-4 h-4" />
            </div>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white appearance-none cursor-pointer"
            >
              <option value="">Select Location</option>
              <option value="jubilee-hills">Jubilee Hills, Hyderabad</option>
              <option value="banjara-hills">Banjara Hills, Hyderabad</option>
              <option value="gachibowli">Gachibowli, Hyderabad</option>
              <option value="financial-district">Financial District, Hyderabad</option>
              <option value="madhapur">Madhapur, Hyderabad</option>
            </select>
          </div>
        </div>

        {/* Field 2: Property Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Property Type
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Building2 className="w-4 h-4" />
            </div>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white appearance-none cursor-pointer"
            >
              <option value="">Apartment / Villa / Plot / Commercial</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Luxury Villa</option>
              <option value="plot">Residential Plot</option>
              <option value="commercial">Commercial Space</option>
            </select>
          </div>
        </div>

        {/* Field 3: Budget */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Budget
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <IndianRupee className="w-4 h-4" />
            </div>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white appearance-none cursor-pointer"
            >
              <option value="">Select Budget</option>
              <option value="under-75l">Under ₹75 Lakh</option>
              <option value="75l-1.5cr">₹75L - ₹1.5 Cr</option>
              <option value="1.5cr-3cr">₹1.5 Cr - ₹3 Cr</option>
              <option value="3cr-plus">₹3 Cr+</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            variant="gold"
            size="md"
            className="w-full h-[42px] justify-center text-sm font-semibold"
            icon={<Search className="w-4 h-4" />}
            iconPosition="left"
          >
            Search Properties
          </Button>
        </div>
      </form>

      {/* Non-functional notification feedback for Step 1 */}
      {searchNotice && (
        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-center justify-between">
          <span>{searchNotice}</span>
          <button
            type="button"
            onClick={() => setSearchNotice(null)}
            className="text-amber-900 font-bold ml-2 hover:underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};
