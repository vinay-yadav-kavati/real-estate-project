import React from 'react';
import { Property } from '../types/property';
import { PropertyCard } from './PropertyCard';
import { SectionHeading } from './SectionHeading';

interface RelatedPropertiesProps {
  currentProperty: Property;
  allProperties: Property[];
}

export const RelatedProperties: React.FC<RelatedPropertiesProps> = ({
  currentProperty,
  allProperties,
}) => {
  // Find properties excluding current one
  const candidates = allProperties.filter((p) => p.id !== currentProperty.id);

  // Score matching: same type (+2), same locality (+1)
  const scored = candidates.map((p) => {
    let score = 0;
    if (p.propertyType === currentProperty.propertyType) score += 2;
    if (p.locality === currentProperty.locality) score += 1;
    if (p.status === 'Available') score += 1;
    return { property: p, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const related = scored.slice(0, 3).map((s) => s.property);

  if (related.length === 0) return null;

  return (
    <section className="pt-12 sm:pt-16 border-t border-slate-200">
      <div className="flex items-center justify-between mb-8">
        <SectionHeading
          label="Curated Recommendations"
          title="Similar Properties"
          description="Explore handpicked residential and commercial opportunities matching this property's profile."
          className="mb-0"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {related.map((prop) => (
          <PropertyCard key={prop.id} property={prop} />
        ))}
      </div>
    </section>
  );
};
