import React from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Building, ShieldCheck, Phone, Mail, Award } from 'lucide-react';
import { ALL_PROPERTIES } from '../data/properties';
import { EnquiryForm } from '../components/EnquiryForm';
import { PropertySummary } from '../components/PropertySummary';
import { Button } from '../components/Button';

export const EnquiryPage: React.FC = () => {
  const { propertyId } = useParams<{ propertyId?: string }>();
  const [searchParams] = useSearchParams();

  // Determine property identifier from param or query param
  const activePropertyId = propertyId || searchParams.get('property');

  // Look up property if ID provided
  const property = activePropertyId
    ? ALL_PROPERTIES.find((p) => p.id === activePropertyId || p.slug === activePropertyId)
    : null;

  // If a property ID was explicitly provided in URL but no matching property exists
  if (activePropertyId && !property) {
    return (
      <div className="py-20 sm:py-28 px-4 max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5 text-[#B48C58]">
          <Building className="w-8 h-8" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#B48C58]">
          Listing Unavailable
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-3">
          Property Not Found
        </h1>
        <p className="text-slate-600 text-base leading-relaxed mb-8">
          The property referenced in your enquiry URL could not be found or has been unlisted. You can still submit a general enquiry or browse other verified listings.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="primary" href="/properties" icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left">
            Back to Properties
          </Button>
          <Button variant="outline" href="/enquire">
            Submit General Enquiry
          </Button>
        </div>
      </div>
    );
  }

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
            {property ? (
              <>
                <li>
                  <Link to="/properties" className="hover:text-slate-900 transition-colors">
                    Properties
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                </li>
                <li>
                  <Link to={`/properties/${property.id}`} className="hover:text-slate-900 transition-colors truncate max-w-[150px] inline-block">
                    {property.title}
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                </li>
              </>
            ) : null}
            <li className="font-semibold text-slate-900 truncate" aria-current="page">
              {property ? 'Enquiry' : 'General Enquiry'}
            </li>
          </ol>

          {property ? (
            <Link
              to={`/properties/${property.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Property</span>
            </Link>
          ) : (
            <Link
              to="/properties"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Browse Properties</span>
            </Link>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {property ? (
          /* Property-Specific Enquiry: Balanced Two-Column Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <EnquiryForm property={property} />
            </div>

            {/* Property Summary & Advisory Rail */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <PropertySummary property={property} subtitle="Enquiring About" />

              {/* Advisory Guarantees */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4 text-xs">
                <span className="text-xs font-semibold text-[#E4C59E] uppercase tracking-wider block">
                  HomeNest Advisory Guarantee
                </span>
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-slate-300">
                      Direct developer pricing with zero commission markup and clear title due diligence.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-[#E4C59E] shrink-0 mt-0.5" />
                    <p className="text-slate-300">
                      RERA authenticated documents delivered straight to your email.
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-800 text-slate-400">
                  Direct Advisory Line: <strong>+91 XXXXX XXXXX</strong>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* General Enquiry: Centered Layout with Complementary Info */
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <EnquiryForm property={null} />
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-5">
                <div>
                  <span className="text-xs font-semibold text-[#B48C58] uppercase tracking-wider block mb-1">
                    Direct Advisory
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Why Consult HomeNest?
                  </h3>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Handpicked, legally vetted properties in prime corridors.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-[#B48C58] shrink-0 mt-0.5" />
                    <span>Personalized portfolio advisory for luxury residential and commercial.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Building className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>Free chauffeured site visits and title deed inspection.</span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#B48C58] shrink-0" />
                    <span>+91 XXXXX XXXXX (9:30 AM - 6:30 PM IST)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#B48C58] shrink-0" />
                    <span>advisory@homenest.example</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
