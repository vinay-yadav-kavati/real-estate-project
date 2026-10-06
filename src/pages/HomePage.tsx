import React from 'react';
import { ArrowRight, ShieldCheck, Award, MapPinned, Headphones, CheckCircle2, PhoneCall } from 'lucide-react';
import { Button } from '../components/Button';
import { SectionHeading } from '../components/SectionHeading';
import { SearchPanel } from '../components/SearchPanel';
import { PropertyCard } from '../components/PropertyCard';
import { FeatureCard } from '../components/FeatureCard';
import { TestimonialCard } from '../components/TestimonialCard';
import { useProperties } from '../context/PropertyContext';
import { TESTIMONIALS } from '../data/testimonials';

export const HomePage: React.FC = () => {
  const { properties } = useProperties();
  const featuredProperties = properties.filter((p) => p.featured).slice(0, 3);
  const displayedProperties = featuredProperties.length ? featuredProperties : properties.slice(0, 3);
  const features = [
    {
      icon: ShieldCheck,
      title: 'Verified Properties',
      description: 'We focus on reliable and verified property listings with complete RERA transparency and legal clarity.',
    },
    {
      icon: Award,
      title: 'Trusted Service',
      description: 'Professional guidance throughout your property journey, from initial shortlisting to legal paperwork and possession.',
    },
    {
      icon: MapPinned,
      title: 'Local Expertise',
      description: 'Strong understanding of the local real-estate market, growth micro-corridors, and accurate valuation benchmarks.',
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      description: 'Personal assistance from enquiry to site visit scheduling, ensuring you make informed, confident decisions.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* =========================================================================
          SECTION 1: HERO
          ========================================================================= */}
      <section className="relative bg-slate-950 text-white overflow-hidden pt-12 pb-24 md:pt-16 md:pb-32">
        {/* Subtle background architectural ambient glow */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#B48C58]/30 via-slate-900 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Hero Copy Column */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#E4C59E]">
                Premier Real Estate Advisory
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-[1.12]">
                Find a Place You’ll Be Proud to Call Home
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl text-balance">
                We help customers discover trusted properties and make confident real-estate decisions through handpicked listings, verified documentation, and personalized consultation.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  variant="gold"
                  size="lg"
                  href="/properties"
                  className="font-semibold shadow-md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Properties
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  href="/contact"
                  className="bg-white/10 hover:bg-white/20 border-white/30 text-white backdrop-blur-md shadow-md hover:border-white/60 hover:shadow-lg transition-all duration-200"
                >
                  <span className="flex items-center gap-2.5 font-semibold tracking-wide text-white">
                    <PhoneCall className="w-4 h-4 text-[#E4C59E] shrink-0" aria-hidden="true" />
                    <span>Contact Us</span>
                  </span>
                </Button>
              </div>

              {/* Trust Indicators in Hero */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                    ₹500Cr+
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Property Transacted
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                    100%
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Verified Listings
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                    1,200+
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Happy Families
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Visual Column */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800/80 bg-slate-900 group aspect-[16/10] w-full">
                <img
                  src="/images/properties/hero.jpg"
                  alt="Modern luxury villa with warm twilight architectural lighting"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Quiet caption badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md rounded-lg p-3 border border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Featured Signature Villa · Jubilee Hills</span>
                  </div>
                  <span className="font-semibold text-[#E4C59E]">Verified Luxury</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: PROPERTY SEARCH UI
          (Positioned overlapping / immediately below Hero)
          ========================================================================= */}
      <section className="relative -mt-10 sm:-mt-14 z-20 px-4 sm:px-6 lg:px-8">
        <SearchPanel />
      </section>

      {/* =========================================================================
          SECTION 3: FEATURED PROPERTIES
          ========================================================================= */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <SectionHeading
            label="Handpicked Collection"
            title="Featured Properties"
            description="Explore our hand-selected selection of prime residential villas, luxury high-rises, and modern duplexes."
            className="mb-0"
          />
          <div className="mt-4 md:mt-0">
            <Button
              variant="outline"
              size="md"
              href="/properties"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              View All Properties
            </Button>
          </div>
        </div>

        {/* Featured Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: WHY CHOOSE US
          ========================================================================= */}
      <section className="py-20 sm:py-24 bg-slate-100/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Why Choose Us"
            title="A Trusted Foundation for Every Real Estate Decision"
            description="We eliminate ambiguity from property acquisitions with verified legal documentation, transparent pricing, and market guidance."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: ABOUT COMPANY PREVIEW
          ========================================================================= */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Architectural advisory office visual */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg aspect-[4/3] w-full">
              <img
                src="/images/properties/about_office.jpg"
                alt="HomeNest modern real estate consulting lounge and architectural planning studio"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs rounded-lg p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Client Advisory Standard
                  </p>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    100% Unbiased Property Due Diligence
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* About Copy Preview */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <span className="block text-xs font-semibold uppercase tracking-wider text-[#B48C58]">
              About Our Company
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 text-balance">
              Redefining Real Estate with Integrity, Discretion, & Precision
            </h2>
            <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              <p>
                Founded with a mission to bring clarity and professionalism to property acquisition, <strong>HomeNest</strong> serves discerning buyers, investors, and homeowners seeking high-value residential and commercial assets.
              </p>
              <p>
                Our seasoned advisory team combines exhaustive local market analytics with thorough legal due diligence, ensuring every site visit and investment is safeguarded by verifiable trust and transparent guidance.
              </p>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                href="/about"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Learn More About Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: TESTIMONIALS
          ========================================================================= */}
      <section className="py-20 sm:py-24 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Client Endorsements"
            title="What Our Clients Say"
            description="Read verified reviews from clients who trusted our guidance for their property acquisitions."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: FINAL CALL TO ACTION
          ========================================================================= */}
      <section className="py-20 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B48C58_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#E4C59E]">
            Start Your Property Search
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white text-balance">
            Ready to Find Your Next Property?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed text-balance">
            Let our team help you find the right property for your needs. Connect with our dedicated property advisors today for personalized recommendations and private viewings.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="gold"
              size="lg"
              href="/properties"
              className="font-semibold shadow-md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Properties
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="/contact"
              className="bg-white/10 hover:bg-white/20 border-white/30 text-white backdrop-blur-md shadow-md hover:border-white/60 hover:shadow-lg transition-all duration-200"
            >
              <span className="flex items-center gap-2.5 font-semibold tracking-wide text-white">
                <PhoneCall className="w-4 h-4 text-[#E4C59E] shrink-0" aria-hidden="true" />
                <span>Contact Us</span>
              </span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
