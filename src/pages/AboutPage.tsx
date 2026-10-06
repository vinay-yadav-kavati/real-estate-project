import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  MapPin,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Home,
  Building2,
  Layers,
  MapPinned,
  Car,
  FileCheck2,
} from 'lucide-react';
import { Button } from '../components/Button';
import { SectionHeading } from '../components/SectionHeading';
import { COMPANY_INFO } from '../data/company';

export const AboutPage: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Verified Legal Clarity',
      description:
        'Every listed property undergoes title deed authentication, RERA validation, and municipal approval scrutiny before publishing.',
    },
    {
      icon: CheckCircle2,
      title: 'Quality-First Curation',
      description:
        'We refuse sub-standard developments. Our portfolio features well-built residential and commercial assets with strong structural benchmarks.',
    },
    {
      icon: Award,
      title: 'Transparent Transactions',
      description:
        'Direct developer rates and market-benchmarked valuations. Zero hidden costs, zero inflated premiums, and complete pricing integrity.',
    },
    {
      icon: MapPin,
      title: 'Micro-Market Expertise',
      description:
        'Deep local insight across Hyderabad’s premier zones—Jubilee Hills, Financial District, Kokapet, and emerging western corridors.',
    },
    {
      icon: Users,
      title: 'Personalized Consultation',
      description:
        'Dedicated senior advisors who listen to your lifestyle, financial goals, and family needs before presenting tailored options.',
    },
    {
      icon: FileCheck2,
      title: 'End-to-End Support',
      description:
        'Seamless advisory from initial property discovery and chauffeured site visits to legal drafting, loan facilitation, and final handover.',
    },
  ];

  const services = [
    {
      icon: Home,
      title: 'Luxury Villas & Independent Houses',
      description:
        'Gated community villas and independent designer homes featuring expansive layouts, private lawns, and modern finishes.',
      href: '/properties?type=Villa',
    },
    {
      icon: Building2,
      title: 'High-Rise Condos & Penthouses',
      description:
        'Modern urban residences with panoramic skylines, club amenities, and strategic connectivity to major business districts.',
      href: '/properties?type=Apartment',
    },
    {
      icon: Layers,
      title: 'Commercial Spaces & Corporate Offices',
      description:
        'Grade-A commercial office suites and retail showrooms designed for high-performing enterprises and rental yields.',
      href: '/properties?type=Commercial',
    },
    {
      icon: MapPinned,
      title: 'Approved Land & Residential Plots',
      description:
        'HMDA and RERA approved plots ready for immediate registration and custom architectural construction in high-growth corridors.',
      href: '/properties?type=Plot',
    },
  ];

  const journeySteps = [
    {
      step: '01',
      title: 'Explore',
      subtitle: 'Curated Catalog',
      description:
        'Browse verified properties with realistic photography, transparent specs, and accurate pricing filters.',
    },
    {
      step: '02',
      title: 'Shortlist',
      subtitle: 'Match Criteria',
      description:
        'Filter by budget, locality, and property configuration to curate the shortlist matching your family or portfolio goals.',
    },
    {
      step: '03',
      title: 'Visit',
      subtitle: 'Guided Inspections',
      description:
        'Schedule complimentary chauffeured site tours accompanied by senior property specialists for on-ground evaluation.',
    },
    {
      step: '04',
      title: 'Decide',
      subtitle: 'Assured Closing',
      description:
        'Review comprehensive legal paperwork, conduct due diligence, and finalize your purchase with complete confidence.',
    },
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-slate-900">
      {/* =========================================================================
          1. HERO SECTION
          ========================================================================= */}
      <section className="relative bg-slate-950 text-white overflow-hidden pt-16 pb-20 md:pt-20 md:pb-28">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#B48C58]/30 via-slate-900 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#E4C59E]">
                About {COMPANY_INFO.name}
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] text-balance">
                Building Trust into Every Real Estate Decision
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl text-balance">
                {COMPANY_INFO.name} is a premier real estate advisory firm dedicated to helping discerning individuals, growing families, and investors navigate residential and commercial properties with complete transparency, legal verification, and personalized guidance.
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
                  className="bg-white/10 hover:bg-white/20 border-white/30 text-white backdrop-blur-md shadow-md hover:border-white/60 transition-all duration-200"
                >
                  <span className="flex items-center gap-2 font-semibold text-white">
                    <PhoneCall className="w-4 h-4 text-[#E4C59E]" />
                    <span>Contact Advisory</span>
                  </span>
                </Button>
              </div>
            </div>

            {/* Hero Architectural Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 aspect-[4/3] w-full">
                <img
                  src="/images/properties/about_office.jpg"
                  alt={`${COMPANY_INFO.name} contemporary consulting lounge and architectural planning studio`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md rounded-lg p-3.5 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Corporate Advisory Lounge</span>
                  </div>
                  <span className="font-semibold text-[#E4C59E]">Jubilee Hills, Hyd</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. COMPANY INTRODUCTION (WHO WE ARE)
          ========================================================================= */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-[4/3] w-full">
              <img
                src="/images/properties/hero.jpg"
                alt="Signature modern villa architecture representing verified property standard"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                <p className="text-white text-xs font-medium leading-relaxed">
                  Every property in our collection is handpicked to ensure authentic architectural quality, clear RERA compliance, and long-term livability.
                </p>
              </div>
            </div>
          </div>

          {/* Copy Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B48C58]">
              Who We Are
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              A Relationship-First Real Estate Advisory Practice
            </h2>
            <div className="space-y-4 text-base text-slate-600 leading-relaxed">
              <p>
                Founded on the principle that property acquisition should be a calm, confident, and transparent milestone, {COMPANY_INFO.name} bridges the gap between ambitious buyers and authentic real estate opportunities.
              </p>
              <p>
                In a crowded marketplace flooded with unverified advertisements and aggressive sales calls, we choose a different standard: curated listings, direct developer partnerships, and unhurried consultation grounded in factual micro-market research.
              </p>
              <p>
                Whether you are seeking a multi-generational family villa in Jubilee Hills, a contemporary penthouse in the Financial District, an approved development plot, or a high-yield commercial space, our team acts as your dedicated advocate from initial consultation through registry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. MISSION & VISION
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission Card */}
            <div className="bg-slate-950/70 rounded-2xl p-8 sm:p-10 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 text-[#E4C59E] flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#E4C59E] block">
                Our Mission
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Demystifying Real Estate Through Radical Transparency
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                To simplify the property discovery and acquisition journey by eliminating hidden terms, enforcing strict legal due diligence, and equipping every homebuyer with transparent facts to make informed, lifelong decisions.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-slate-950/70 rounded-2xl p-8 sm:p-10 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 text-[#E4C59E] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#E4C59E] block">
                Our Vision
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Setting the Gold Standard for Trust & Integrity
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                To become the region’s most respected real-estate advisory network, recognized for elevating industry standards through customer-first relationships, verified documentation, and architectural excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. WHY CHOOSE US
          ========================================================================= */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Why Choose Us"
          title="The HomeNest Advisory Difference"
          description="We replace aggressive sales pitches with factual guidance, clear legal verification, and dedicated support."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all duration-200 space-y-3.5"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-[#E4C59E] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          5. OUR SERVICES
          ========================================================================= */}
      <section className="py-20 sm:py-24 bg-slate-100/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="What We Offer"
            title="Comprehensive Real Estate Solutions"
            description="Explore our specialized advisory practice tailored to verified residential, commercial, and land assets."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 text-[#B48C58] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="pt-5 mt-4 border-t border-slate-100">
                    <Link
                      to={service.href}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B48C58] hover:text-[#936E3B] transition-colors"
                    >
                      <span>Browse Listings</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. PROCESS SECTION (CUSTOMER JOURNEY)
          ========================================================================= */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="The HomeNest Journey"
          title="How We Help You Find the Right Property"
          description="A clear, structured path designed to save you time and provide certainty at every milestone."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 relative">
          {journeySteps.map((item, idx) => (
            <div
              key={item.step}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs relative space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-[#B48C58]/30 font-mono">
                  {item.step}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Step {idx + 1}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#B48C58]">
                {item.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          7. ABOUT CTA
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-950 text-white border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#E4C59E]">
            Start Your Search
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Looking for the Right Property?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Explore our verified collection of luxury villas, high-rise penthouses, and prime commercial spaces, or connect with our advisory desk for private consultation.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
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
              className="bg-white/10 hover:bg-white/20 border-white/30 text-white backdrop-blur-md shadow-md hover:border-white/60 transition-all duration-200"
            >
              <span className="flex items-center gap-2 font-semibold text-white">
                <PhoneCall className="w-4 h-4 text-[#E4C59E]" />
                <span>Contact Us</span>
              </span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
