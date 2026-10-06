import React from 'react';
import { Phone, Mail, Calendar, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

interface PropertyContactCardProps {
  propertyTitle: string;
  propertyPrice: string;
  propertyId: string;
}

export const PropertyContactCard: React.FC<PropertyContactCardProps> = ({
  propertyTitle,
  propertyPrice,
  propertyId,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-6">
      {/* Price block */}
      <div className="pb-5 border-b border-slate-100">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
          Listing Price
        </span>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
            {propertyPrice}
          </span>
          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            All-Inclusive Price
          </span>
        </div>
      </div>

      {/* Advisory Team Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base tracking-wider shrink-0">
            HN
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-slate-900">
                HomeNest Advisory Group
              </h3>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified Prime Property Specialist
            </p>
          </div>
        </div>

        {/* Contact details */}
        <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-600">
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-[#B48C58] shrink-0" />
            <span>+91 XXXXX XXXXX (Dedicated Desk)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-[#B48C58] shrink-0" />
            <span>advisory@homenest.example</span>
          </div>
        </div>
      </div>

      {/* Primary CTAs */}
      <div className="space-y-3 pt-2">
        <Button
          variant="gold"
          size="lg"
          href={`/properties/${encodeURIComponent(propertyId)}/enquire`}
          className="w-full justify-center font-semibold text-sm shadow-sm"
          icon={<MessageSquare className="w-4 h-4" />}
          iconPosition="left"
        >
          Enquire Now
        </Button>
        <Button
          variant="outline"
          size="lg"
          href={`/properties/${encodeURIComponent(propertyId)}/site-visit`}
          className="w-full justify-center font-semibold text-sm hover:!bg-slate-900 hover:!text-white hover:!border-slate-900"
          icon={<Calendar className="w-4 h-4" />}
          iconPosition="left"
        >
          Schedule a Site Visit
        </Button>
      </div>

      {/* Trust Notice */}
      <div className="pt-4 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-500">
        <ShieldCheck className="w-4 h-4 text-[#B48C58] shrink-0 mt-0.5" />
        <span>
          RERA cleared listing with complete title deed verification & zero brokerage direct advisory.
        </span>
      </div>
    </div>
  );
};
