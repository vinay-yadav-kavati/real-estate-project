import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Building2, IndianRupee, Search } from 'lucide-react';
import { Button } from './Button';

export const SearchPanel: React.FC = () => {
  const navigate = useNavigate();
  const [purpose, setPurpose] = useState<'Buy' | 'Rent'>('Buy');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [budget, setBudget] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    // 1. Purpose (Buy / Rent)
    if (purpose) {
      params.set('purpose', purpose);
    }

    // 2. Location
    if (location.trim()) {
      params.set('location', location.trim());
    }

    // 3. Property Type
    if (propertyType.trim()) {
      params.set('type', propertyType.trim());
    }

    // 4. Budget Mapping
    if (budget === 'under-75l') {
      params.set('maxPrice', '7500000');
    } else if (budget === '75l-1.5cr') {
      params.set('minPrice', '7500000');
      params.set('maxPrice', '15000000');
    } else if (budget === '1.5cr-3cr') {
      params.set('minPrice', '15000000');
      params.set('maxPrice', '30000000');
    } else if (budget === '3cr-plus') {
      params.set('minPrice', '30000000');
    }

    const queryString = params.toString();
    navigate(queryString ? `/properties?${queryString}` : '/properties');
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
              <option value="Jubilee Hills">Jubilee Hills, Hyderabad</option>
              <option value="Banjara Hills">Banjara Hills, Hyderabad</option>
              <option value="Gachibowli">Gachibowli, Hyderabad</option>
              <option value="Financial District">Financial District, Hyderabad</option>
              <option value="Madhapur">Madhapur, Hyderabad</option>
              <option value="Hitec City">Hitec City, Hyderabad</option>
              <option value="Gandipet">Gandipet, Hyderabad</option>
              <option value="Kokapet">Kokapet, Hyderabad</option>
              <option value="Kondapur">Kondapur, Hyderabad</option>
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
              <option value="Apartment">Apartment</option>
              <option value="Villa">Luxury Villa</option>
              <option value="Plot">Residential Plot</option>
              <option value="Commercial">Commercial Space</option>
              <option value="Duplex">Contemporary Duplex</option>
              <option value="House">Independent House</option>
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
    </div>
  );
};
