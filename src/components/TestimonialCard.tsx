import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types/testimonial';

export interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200/90 hover:border-slate-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Top: Star Rating & Quote Mark */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < testimonial.rating
                    ? 'text-amber-500 fill-amber-500'
                    : 'text-slate-300'
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
          <Quote className="w-6 h-6 text-slate-300" aria-hidden="true" />
        </div>

        {/* Review body */}
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 italic">
          "{testimonial.review}"
        </p>
      </div>

      {/* Author info (Zero-pill discipline: unboxed clean text) */}
      <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0 tracking-wider">
          {testimonial.initials}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">
            {testimonial.customerName}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            {testimonial.roleOrLocation}
          </p>
        </div>
      </div>
    </div>
  );
};
