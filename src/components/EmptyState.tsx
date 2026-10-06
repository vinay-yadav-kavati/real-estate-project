import React from 'react';
import { Building, RotateCcw } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  onReset?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Properties Found',
  description = "We couldn't find any properties matching your search criteria.",
  buttonLabel = 'Clear Filters',
  onReset,
}) => {
  return (
    <div className="w-full py-16 px-4 text-center bg-white rounded-xl border border-slate-200/90 p-8 my-4 shadow-xs">
      <div className="w-16 h-16 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <Building className="w-8 h-8 text-[#B48C58]" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
        {description}
      </p>
      <div className="flex justify-center">
        <Button
          variant="primary"
          size="md"
          onClick={onReset}
          icon={<RotateCcw className="w-4 h-4" />}
          iconPosition="left"
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};
