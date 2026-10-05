import React from 'react';
import { Layers, ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
      <div className="w-16 h-16 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center mx-auto mb-6">
        <Layers className="w-8 h-8 text-[#B48C58]" />
      </div>
      <span className="text-xs font-semibold uppercase tracking-wider text-[#B48C58]">
        Development Stage: Step 1 Foundation
      </span>
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
        Featured Projects & Developments
      </h1>
      <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed mb-8">
        Major township projects, luxury gated communities, and commercial developments will be introduced in subsequent stages.
      </p>
      <div className="flex justify-center gap-4">
        <Button variant="primary" href="/" icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left">
          Return to Home
        </Button>
      </div>
    </div>
  );
};
