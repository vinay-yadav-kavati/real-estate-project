import React, { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Building, Car, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { ALL_PROPERTIES } from '../data/properties';
import { SiteVisitForm } from '../components/SiteVisitForm';
import { PropertySummary } from '../components/PropertySummary';
import { Button } from '../components/Button';

export const SiteVisitPage: React.FC = () => {
  const { propertyId } = useParams<{ propertyId?: string }>();
  const [searchParams] = useSearchParams();

  // Determine property identifier
  const initialPropertyId = propertyId || searchParams.get('property');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(
    initialPropertyId || ALL_PROPERTIES[0]?.id || ''
  );

  // If initialPropertyId was provided in URL, check if valid
  const explicitProperty = initialPropertyId
    ? ALL_PROPERTIES.find((p) => p.id === initialPropertyId || p.slug === initialPropertyId)
    : null;

  // Invalid property state
  if (initialPropertyId && !explicitProperty) {
    return (
      <div className="py-20 sm:py-28 px-4 max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5 text-[#B48C58]">
          <Building className="w-8 h-8" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#B48C58]">
          Property Unavailable
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3">
          Property Not Found
        </h1>
        <p className="text-slate-600 text-base leading-relaxed mb-8">
          The property specified for your site visit could not be located. Please select from our current catalog of verified residential and commercial properties.
        </p>
        <div className="flex justify-center">
          <Button variant="primary" href="/properties" icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left">
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  // Active property (either explicit or fallback selected)
  const activeProperty = explicitProperty || ALL_PROPERTIES.find((p) => p.id === selectedPropertyId) || ALL_PROPERTIES[0];

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-20 sm:pb-28">
      {/* Breadcrumb Navigation */}
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
            <li>
              <Link to={`/properties/${activeProperty.id}`} className="hover:text-slate-900 transition-colors truncate max-w-[150px] inline-block">
                {activeProperty.title}
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
            </li>
            <li className="font-semibold text-slate-900 truncate" aria-current="page">
              Schedule Site Visit
            </li>
          </ol>

          <Link
            to={`/properties/${activeProperty.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Property</span>
          </Link>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* If no property was specified in the URL, allow quick selection */}
        {!initialPropertyId && (
          <div className="mb-8 p-4 bg-white rounded-xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-[#B48C58] uppercase tracking-wider block">
                Select Property for Inspection
              </span>
              <p className="text-sm text-slate-600">
                Choose the property you would like to schedule a private visit for:
              </p>
            </div>
            <select
              value={selectedPropertyId}
              onChange={(e) => setSelectedPropertyId(e.target.value)}
              className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              {ALL_PROPERTIES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.locality}) - {p.formattedPrice}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Site Visit Request Form */}
          <div className="lg:col-span-7">
            <SiteVisitForm property={activeProperty} />
          </div>

          {/* Right Column: Selected Property Summary & Site Visit Perks */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <PropertySummary property={activeProperty} subtitle="Site Visit Destination" />

            {/* Visit Experience Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4 text-xs">
              <span className="text-xs font-semibold text-[#E4C59E] uppercase tracking-wider block">
                What to Expect on Your Visit
              </span>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <Car className="w-4 h-4 text-[#E4C59E] shrink-0 mt-0.5" />
                  <p className="text-slate-300">
                    <strong>Chauffeured Pickup:</strong> Complimentary private transit from your doorstep or nearest metro hub upon request.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-slate-300">
                    <strong>RERA Specialist Accompaniment:</strong> On-site verification of title deeds, sanctioned layouts, and occupancy certificates.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#E4C59E] shrink-0 mt-0.5" />
                  <p className="text-slate-300">
                    <strong>Flexible Rescheduling:</strong> Change or cancel your requested inspection time anytime with zero penalty.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-slate-400">
                <span>Site Visit Concierge:</span>
                <strong className="text-white">+91 XXXXX XXXXX</strong>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
