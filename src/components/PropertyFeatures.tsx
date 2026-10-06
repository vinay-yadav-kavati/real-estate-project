import React from 'react';
import { Bed, Bath, Square, Building2, ShieldCheck, Tag } from 'lucide-react';
import { Property } from '../types/property';

interface PropertyFeaturesProps {
  property: Property;
}

export const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({ property }) => {
  const isResidentialWithRooms = property.bedrooms > 0;
  const isCommercial = property.propertyType === 'Commercial';
  const isPlot = property.propertyType === 'Plot';

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {/* 1. Bedrooms (Only if residential with rooms) */}
      {isResidentialWithRooms && (
        <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-slate-900 text-[#E4C59E] flex items-center justify-center shrink-0">
            <Bed className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Bedrooms
            </span>
            <span className="text-base font-bold text-slate-900">
              {property.bedrooms} Beds
            </span>
          </div>
        </div>
      )}

      {/* 2. Bathrooms / Restrooms */}
      {property.bathrooms > 0 && (
        <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-slate-900 text-[#E4C59E] flex items-center justify-center shrink-0">
            <Bath className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {isCommercial ? 'Restrooms' : 'Bathrooms'}
            </span>
            <span className="text-base font-bold text-slate-900">
              {property.bathrooms} {isCommercial ? 'Restrooms' : 'Baths'}
            </span>
          </div>
        </div>
      )}

      {/* 3. Area (Always meaningful) */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-lg bg-slate-900 text-[#E4C59E] flex items-center justify-center shrink-0">
          <Square className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {isPlot ? 'Plot Area' : 'Built-up Area'}
          </span>
          <span className="text-base font-bold text-slate-900 tabular-nums">
            {property.areaSqFt.toLocaleString()} sq.ft.
          </span>
        </div>
      </div>

      {/* 4. Property Type */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-lg bg-slate-900 text-[#E4C59E] flex items-center justify-center shrink-0">
          <Building2 className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Property Type
          </span>
          <span className="text-base font-bold text-slate-900">
            {property.propertyType}
          </span>
        </div>
      </div>

      {/* 5. Listing Status */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-lg bg-slate-900 text-[#E4C59E] flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Listing Status
          </span>
          <span className="text-base font-bold text-slate-900">
            {property.status}
          </span>
        </div>
      </div>

      {/* 6. Purpose */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-lg bg-slate-900 text-[#E4C59E] flex items-center justify-center shrink-0">
          <Tag className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Acquisition
          </span>
          <span className="text-base font-bold text-slate-900">
            For {property.purpose}
          </span>
        </div>
      </div>
    </div>
  );
};
