import React from 'react';

export const PropertyCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden flex flex-col animate-pulse">
      {/* Media skeleton */}
      <div className="aspect-[4/3] w-full bg-slate-200" />

      {/* Content skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Price line */}
          <div className="flex items-center justify-between mb-3">
            <div className="h-6 w-28 bg-slate-200 rounded" />
            <div className="h-4 w-16 bg-slate-100 rounded" />
          </div>

          {/* Title line */}
          <div className="h-5 w-3/4 bg-slate-200 rounded mb-2" />

          {/* Location line */}
          <div className="h-4 w-1/2 bg-slate-100 rounded" />

          {/* Specs line */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
            <div className="h-4 w-16 bg-slate-100 rounded" />
            <div className="h-4 w-16 bg-slate-100 rounded" />
            <div className="h-4 w-20 bg-slate-100 rounded" />
          </div>
        </div>

        {/* Button skeleton */}
        <div className="h-10 w-full bg-slate-100 rounded-lg mt-4" />
      </div>
    </div>
  );
};
