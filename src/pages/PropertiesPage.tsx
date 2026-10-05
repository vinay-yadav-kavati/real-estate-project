import React from 'react';
import { PropertyGrid } from '../components/PropertyGrid';
import { PropertySort } from '../components/PropertySort';
import { ALL_PROPERTIES } from '../data/properties';

export const PropertiesPage: React.FC = () => {
  const properties = ALL_PROPERTIES;

  return (
    <div className="flex flex-col min-h-screen">
      {/* =========================================================================
          PAGE HEADER / HERO (Subtle, professional, not excessively tall)
          ========================================================================= */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-14 sm:py-16 border-b border-slate-800/80">
        {/* Subtle background ambient gradient mesh */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#B48C58]/40 via-slate-900 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#E4C59E]">
              Portfolio Directory
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Properties
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Explore our collection of residential, commercial and land properties. Every listing is physically inspected and verified for legal compliance.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PROPERTY LISTING AREA
          ========================================================================= */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        {/* Basic Page Controls (Count & Sort UI) */}
        <PropertySort totalCount={properties.length} />

        {/* Responsive Property Grid (1 col mobile, 2 col tablet, 3 col desktop) */}
        <PropertyGrid properties={properties} />
      </section>
    </div>
  );
};
