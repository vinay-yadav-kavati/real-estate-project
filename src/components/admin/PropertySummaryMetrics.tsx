import React from 'react';
import { Building2, CheckCircle2, Clock, CheckCheck, IndianRupee } from 'lucide-react';
import { Property } from '../../types/property';

interface PropertySummaryMetricsProps {
  properties: Property[];
}

export const PropertySummaryMetrics: React.FC<PropertySummaryMetricsProps> = ({ properties }) => {
  const total = properties.length;
  const available = properties.filter((p) => p.status === 'Available').length;
  const underNegotiation = properties.filter((p) => p.status === 'Under Negotiation').length;
  const sold = properties.filter((p) => p.status === 'Sold').length;

  const totalNumeric = properties.reduce((acc, p) => acc + (p.priceNumeric || 0), 0);
  const totalValuationCr = (totalNumeric / 10000000).toFixed(2);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
      {/* 1. Total Listings */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Total Inventory
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums mt-0.5 block">
            {total}
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            Active Records
          </span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 flex items-center justify-center shrink-0">
          <Building2 className="w-5 h-5" />
        </div>
      </div>

      {/* 2. Available */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
            Available
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-900 tabular-nums mt-0.5 block">
            {available}
          </span>
          <span className="text-[11px] text-emerald-700 block mt-0.5">
            Open for Tour
          </span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      </div>

      {/* 3. Under Negotiation / Discussion */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
            Under Discussion
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-900 tabular-nums mt-0.5 block">
            {underNegotiation}
          </span>
          <span className="text-[11px] text-amber-700 block mt-0.5">
            Title Scrutiny
          </span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
          <Clock className="w-5 h-5" />
        </div>
      </div>

      {/* 4. Sold / Closed */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block">
            Sold / Closed
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-800 tabular-nums mt-0.5 block">
            {sold}
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            Registry Concluded
          </span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center shrink-0">
          <CheckCheck className="w-5 h-5" />
        </div>
      </div>

      {/* 5. Total Listed Valuation (spans 2 cols on mobile) */}
      <div className="col-span-2 lg:col-span-1 bg-slate-900 text-white p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Portfolio Value
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#E4C59E] tabular-nums mt-0.5 block">
            ₹{totalValuationCr} Cr
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            Sum of Active Listings
          </span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-[#E4C59E] flex items-center justify-center shrink-0">
          <IndianRupee className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
