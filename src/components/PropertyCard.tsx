import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, ArrowUpRight } from 'lucide-react';
import { Property } from '../types/property';
import { PropertyStatusBadge } from './PropertyStatusBadge';
import { Button } from './Button';

export interface PropertyCardProps {
  property: Property;
  onViewClick?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onViewClick }) => {
  const [imgSrc, setImgSrc] = useState(property.imageUrl);
  const detailUrl = `/properties/${property.id}`;

  return (
    <article className="group bg-white rounded-xl border border-slate-200/90 overflow-hidden hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col">
      {/* Property Media Viewport */}
      <Link to={detailUrl} className="block relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={imgSrc}
          alt={property.imageAlt}
          loading="lazy"
          onError={() => setImgSrc('/images/properties/hero.jpg')}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges (Property Type & Property Status) */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-900 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded shadow-xs">
            {property.propertyType}
          </span>
          <PropertyStatusBadge status={property.status} />
        </div>
      </Link>

      {/* Card Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price & Tag */}
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">
              {property.formattedPrice}
            </span>
            {property.tag && (
              <span className="text-xs font-medium text-emerald-700">
                {property.tag}
              </span>
            )}
          </div>

          {/* Property Title */}
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[#B48C58] transition-colors line-clamp-1">
            <Link to={detailUrl}>
              {property.title}
            </Link>
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
            <span className="line-clamp-1">{property.location}</span>
          </div>

          {/* Basic Property Specs (Zero-pill discipline: unboxed clean text with typographic separators) */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-600 font-medium">
            {property.bedrooms > 0 ? (
              <>
                <div className="flex items-center gap-1.5">
                  <Bed className="w-4 h-4 text-slate-400" aria-hidden="true" />
                  <span>{property.bedrooms} Beds</span>
                </div>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <Bath className="w-4 h-4 text-slate-400" aria-hidden="true" />
                  <span>{property.bathrooms} Baths</span>
                </div>
              </>
            ) : property.propertyType === 'Commercial' ? (
              <>
                <span className="text-slate-600">Commercial</span>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <Bath className="w-4 h-4 text-slate-400" aria-hidden="true" />
                  <span>{property.bathrooms} Restrooms</span>
                </div>
              </>
            ) : (
              <>
                <span className="text-slate-600">Land Parcel</span>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <span className="text-slate-600">Immediate Registry</span>
              </>
            )}
            <span className="text-slate-300" aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5">
              <Square className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
              <span className="tabular-nums">{property.areaSqFt.toLocaleString()} sq.ft.</span>
            </div>
          </div>
        </div>

        {/* View Details CTA */}
        <div className="mt-5">
          <Button
            variant="outline"
            size="md"
            href={detailUrl}
            className="w-full justify-center font-semibold border-slate-300 text-slate-800 bg-white hover:!bg-slate-900 hover:!text-white hover:!border-slate-900 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-200 shadow-xs"
            icon={<ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
            onClick={() => onViewClick?.(property)}
          >
            View Property
          </Button>
        </div>
      </div>
    </article>
  );
};
