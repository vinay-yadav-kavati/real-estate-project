import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Building,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Compass,
} from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import { PropertyGallery } from '../components/PropertyGallery';
import { PropertyFeatures } from '../components/PropertyFeatures';
import { PropertyContactCard } from '../components/PropertyContactCard';
import { PropertyStatusBadge } from '../components/PropertyStatusBadge';
import { RelatedProperties } from '../components/RelatedProperties';
import { Button } from '../components/Button';

export const PropertyDetailPage: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const { properties, getPropertyById } = useProperties();

  // Lookup property by id or slug
  const property = propertyId ? getPropertyById(propertyId) : undefined;

  // Invalid property handling
  if (!property) {
    return (
      <div className="py-20 sm:py-28 px-4 max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-5">
          <Building className="w-8 h-8 text-[#B48C58]" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#B48C58]">
          Listing Unavailable
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3">
          Property Not Found
        </h1>
        <p className="text-slate-600 text-base leading-relaxed mb-8">
          The property you’re looking for may no longer be available, has been unlisted, or does not exist.
        </p>
        <div className="flex justify-center">
          <Button
            variant="primary"
            href="/properties"
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
          >
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-24 sm:pb-28">
      {/* =========================================================================
          1. NAVIGATION & BREADCRUMB
          ========================================================================= */}
      <nav
        aria-label="Breadcrumb"
        className="bg-white border-b border-slate-200/80 py-3.5 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs sm:text-sm">
          <ol className="flex items-center gap-1.5 sm:gap-2 text-slate-500 overflow-hidden text-ellipsis whitespace-nowrap">
            <li>
              <Link to="/" className="hover:text-slate-900 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
            </li>
            <li>
              <Link to="/properties" className="hover:text-slate-900 transition-colors">
                Properties
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
            </li>
            <li className="font-semibold text-slate-900 truncate" aria-current="page">
              {property.title}
            </li>
          </ol>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              to="/admin/properties"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#B48C58] hover:text-[#8B6B3E] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Admin Properties</span>
            </Link>
            <span className="hidden sm:inline text-slate-300">·</span>
            <Link
              to="/properties"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              <span>Public Catalog</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* =========================================================================
          2. MAIN PROPERTY DETAILS CONTAINER
          ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-10 sm:space-y-12">
        {/* Title & Top Meta Lockup */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200/80">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B48C58]">
                {property.propertyType}
              </span>
              <span className="text-slate-300">·</span>
              <PropertyStatusBadge status={property.status} />
              {property.tag && (
                <>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs font-medium text-emerald-700">
                    {property.tag}
                  </span>
                </>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 text-balance">
              {property.title}
            </h1>
            <div className="flex items-center gap-1.5 text-slate-500 text-sm mt-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
              <span>{property.address || property.location}</span>
            </div>
          </div>

          <div className="text-left md:text-right shrink-0">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Offered At
            </span>
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
              {property.formattedPrice}
            </span>
          </div>
        </div>

        {/* Responsive Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Gallery & Comprehensive Details (lg: 8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* A. Image Gallery */}
            <PropertyGallery images={property.images} title={property.title} />

            {/* B. Key Features Bar */}
            <section aria-labelledby="key-features-heading">
              <h2 id="key-features-heading" className="sr-only">
                Key Features
              </h2>
              <PropertyFeatures property={property} />
            </section>

            {/* C. Description Section */}
            <section className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#B48C58]" />
                <h2 className="text-xl font-bold text-slate-900">
                  Property Overview & Description
                </h2>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-base sm:text-lg">
                <p>{property.description}</p>
              </div>
            </section>

            {/* D. Structured Specifications */}
            {property.specifications && property.specifications.length > 0 && (
              <section className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
                <h2 className="text-xl font-bold text-slate-900 mb-6">
                  Property Specifications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {property.specifications.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2.5 border-b border-slate-100 text-sm"
                    >
                      <span className="text-slate-500 font-medium">
                        {spec.label}
                      </span>
                      <span className="text-slate-900 font-semibold text-right">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* E. Amenities Section */}
            {property.amenities && property.amenities.length > 0 && (
              <section className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
                <h2 className="text-xl font-bold text-slate-900 mb-6">
                  Amenities & Infrastructure
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.amenities.map((amenity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span className="text-sm font-semibold text-slate-800">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* F. Location & Surroundings */}
            <section className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Location & Neighborhood
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {property.location}
                  </p>
                </div>
              </div>

              {/* Styled Map Container Placeholder (indicates location readiness without third-party API) */}
              <div className="relative aspect-[16/8] w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-900 flex items-center justify-center text-center p-6 select-none">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative space-y-2 z-10">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E4C59E] flex items-center justify-center mx-auto shadow-sm">
                    <Compass className="w-6 h-6 animate-spin-slow" />
                  </div>
                  <p className="text-white font-bold text-base">
                    {property.locality}, {property.city}
                  </p>
                  <p className="text-slate-300 text-xs max-w-sm mx-auto">
                    {property.address || property.location} · Verified Prime Corridor
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Sticky Advisor / Contact Card (lg: 4 cols) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <PropertyContactCard
              propertyTitle={property.title}
              propertyPrice={property.formattedPrice}
              propertyId={property.id}
            />

            {/* Quick Guarantees Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 text-xs space-y-3">
              <span className="text-xs font-semibold text-[#E4C59E] uppercase tracking-wider block">
                The HomeNest Promise
              </span>
              <p className="text-slate-300 leading-relaxed">
                Direct developer pricing, complete RERA document clearance, zero spam, and free private chauffeured site visits.
              </p>
              <div className="pt-2 border-t border-slate-800 text-slate-400">
                Direct Helpline: <strong>+91 XXXXX XXXXX</strong>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Properties */}
        <RelatedProperties
          currentProperty={property}
          allProperties={properties}
        />
      </main>

      {/* =========================================================================
          MOBILE STICKY BOTTOM ENQUIRY BAR
          ========================================================================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 p-3.5 shadow-xl">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">
              Price
            </span>
            <span className="text-lg font-bold text-slate-900 tabular-nums">
              {property.formattedPrice}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="gold"
              size="sm"
              href={`/properties/${encodeURIComponent(property.id)}/enquire`}
              className="font-semibold text-xs py-2.5 px-4 shadow-sm"
              icon={<MessageSquare className="w-3.5 h-3.5" />}
              iconPosition="left"
            >
              Enquire
            </Button>
            <Button
              variant="primary"
              size="sm"
              href={`/properties/${encodeURIComponent(property.id)}/site-visit`}
              className="font-semibold text-xs py-2.5 px-3.5"
              icon={<Calendar className="w-3.5 h-3.5" />}
              iconPosition="left"
            >
              Visit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
