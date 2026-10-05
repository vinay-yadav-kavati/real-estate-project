import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  index,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200/90 hover:border-slate-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6 text-[#E4C59E]" aria-hidden="true" />
          </div>
          <span className="text-xs font-semibold text-slate-400 tabular-nums">
            0{index + 1}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          {title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
