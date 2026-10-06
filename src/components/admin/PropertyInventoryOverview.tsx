import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowUpRight, Home, Layers, MapPinned, CheckCircle2, AlertCircle } from 'lucide-react';
import { PropertyInventorySummary } from '../../types/admin';

interface PropertyInventoryOverviewProps {
  summary: PropertyInventorySummary;
}

export const PropertyInventoryOverview: React.FC<PropertyInventoryOverviewProps> = ({ summary }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-[#B48C58] uppercase tracking-wider block">
            Portfolio Health
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Property Inventory Overview
          </h2>
        </div>
        <Link
          to="/admin/properties"
          className="text-xs font-semibold text-[#B48C58] hover:text-[#936E3B] inline-flex items-center gap-1"
        >
          <span>View All 9</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Primary Status Metric Bars */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Total Listings
          </span>
          <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
            {summary.totalListings}
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            Active Catalog
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
          <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
            Available
          </span>
          <span className="text-2xl font-extrabold text-emerald-900 tabular-nums">
            {summary.available}
          </span>
          <span className="text-[11px] text-emerald-700 block mt-0.5">
            Ready for Tour
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80">
          <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
            Negotiation
          </span>
          <span className="text-2xl font-extrabold text-amber-900 tabular-nums">
            {summary.underNegotiation}
          </span>
          <span className="text-[11px] text-amber-700 block mt-0.5">
            Deed Scrutiny
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block">
            Sold / Closed
          </span>
          <span className="text-2xl font-extrabold text-slate-800 tabular-nums">
            {summary.sold}
          </span>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            Registry Complete
          </span>
        </div>
      </div>

      {/* Asset Category Breakdown */}
      <div className="space-y-3 pt-2">
        <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
          Asset Category Distribution
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-white border border-slate-200/90 rounded-lg flex items-center gap-2.5">
            <Home className="w-4 h-4 text-[#B48C58] shrink-0" />
            <div>
              <span className="text-slate-500 block text-[11px]">Villas / Houses</span>
              <span className="font-bold text-slate-900 text-sm">
                {summary.typeBreakdown.villas} Units
              </span>
            </div>
          </div>

          <div className="p-3 bg-white border border-slate-200/90 rounded-lg flex items-center gap-2.5">
            <Building2 className="w-4 h-4 text-[#B48C58] shrink-0" />
            <div>
              <span className="text-slate-500 block text-[11px]">Apartments</span>
              <span className="font-bold text-slate-900 text-sm">
                {summary.typeBreakdown.apartments} Units
              </span>
            </div>
          </div>

          <div className="p-3 bg-white border border-slate-200/90 rounded-lg flex items-center gap-2.5">
            <Layers className="w-4 h-4 text-[#B48C58] shrink-0" />
            <div>
              <span className="text-slate-500 block text-[11px]">Commercial</span>
              <span className="font-bold text-slate-900 text-sm">
                {summary.typeBreakdown.commercial} Units
              </span>
            </div>
          </div>

          <div className="p-3 bg-white border border-slate-200/90 rounded-lg flex items-center gap-2.5">
            <MapPinned className="w-4 h-4 text-[#B48C58] shrink-0" />
            <div>
              <span className="text-slate-500 block text-[11px]">Land Parcels</span>
              <span className="font-bold text-slate-900 text-sm">
                {summary.typeBreakdown.plots} Plots
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Portfolio Valuation Callout */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-slate-400 block text-[11px] uppercase tracking-wider">
            Total Active Portfolio Listing Valuation
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-[#E4C59E] tabular-nums mt-0.5 block">
            {summary.totalValuation}
          </span>
        </div>
        <div className="text-slate-300 text-[11px] max-w-xs text-left sm:text-right">
          Aggregated verified listing price across 9 high-demand properties in Hyderabad prime corridor.
        </div>
      </div>
    </div>
  );
};
