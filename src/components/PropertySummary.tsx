import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Property } from '../types/property';
import { PropertyStatusBadge } from './PropertyStatusBadge';

interface PropertySummaryProps {
  property: Property;
  subtitle?: string;
}

export const PropertySummary: React.FC<PropertySummaryProps> = ({
  property,
  subtitle = 'Selected Property',
}) => {
  const [imgSrc, setImgSrc] = useState(property.imageUrl);

  return (
    <aside
      aria-label="Property Summary"
      className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs"
    >
      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-[#B48C58] uppercase tracking-wider block">
            {subtitle}
          </span>
          <span className="text-xs text-slate-500">
            Reference ID: <strong className="font-mono text-slate-700">{property.id}</strong>
          </span>
        </div>
        <PropertyStatusBadge status={property.status} />
      </div>

      {/* Property Visual Snapshot */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
        <img
          src={imgSrc}
          alt={property.imageAlt || property.title}
          onError={() => setImgSrc('/images/properties/hero.jpg')}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-900 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded shadow-xs">
            {property.propertyType}
          </span>
        </div>
        {property.tag && (
          <div className="absolute bottom-3 left-3">
            <span className="text-xs font-medium text-emerald-800 bg-emerald-50/95 backdrop-blur-xs px-2.5 py-1 rounded border border-emerald-200 shadow-xs">
              {property.tag}
            </span>
          </div>
        )}
      </div>

      {/* Property Information */}
      <div className="p-5 sm:p-6 space-y-4">
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Listing Price
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
            {property.formattedPrice}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
            <span className="line-clamp-1">{property.locality}, {property.city}</span>
          </div>
        </div>

        {/* Specs Overview */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-xs text-slate-600">
          {property.bedrooms > 0 ? (
            <div>
              <div className="flex items-center gap-1 text-slate-400 mb-0.5">
                <Bed className="w-3.5 h-3.5" />
                <span>Bedrooms</span>
              </div>
              <span className="font-semibold text-slate-900">{property.bedrooms} BHK</span>
            </div>
          ) : (
            <div>
              <div className="text-slate-400 mb-0.5">Type</div>
              <span className="font-semibold text-slate-900">{property.propertyType}</span>
            </div>
          )}

          {property.bathrooms > 0 && (
            <div>
              <div className="flex items-center gap-1 text-slate-400 mb-0.5">
                <Bath className="w-3.5 h-3.5" />
                <span>Baths</span>
              </div>
              <span className="font-semibold text-slate-900">{property.bathrooms}</span>
            </div>
          )}

          <div>
            <div className="flex items-center gap-1 text-slate-400 mb-0.5">
              <Square className="w-3.5 h-3.5" />
              <span>Area</span>
            </div>
            <span className="font-semibold text-slate-900 tabular-nums">
              {property.areaSqFt.toLocaleString()} sq.ft.
            </span>
          </div>
        </div>

        {/* View Full Property Details Link */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <Link
            to={`/properties/${property.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#B48C58] hover:text-[#936E3B] transition-colors"
          >
            <span>View Full Property Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <span className="text-[11px] text-slate-400 font-medium">Verified RERA</span>
        </div>

        {/* Trust Note */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-[#B48C58] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Your inquiry is routed directly to the dedicated property specialist. 100% spam-free guarantee.
          </p>
        </div>
      </div>
    </aside>
  );
};
