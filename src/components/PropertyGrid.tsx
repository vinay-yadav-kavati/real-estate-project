import React from 'react';
import { Property } from '../types/property';
import { PropertyCard } from './PropertyCard';
import { PropertyCardSkeleton } from './PropertyCardSkeleton';
import { EmptyState } from './EmptyState';

interface PropertyGridProps {
  properties: Property[];
  isLoading?: boolean;
  onResetEmpty?: () => void;
  onPropertyClick?: (property: Property) => void;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  isLoading = false,
  onResetEmpty,
  onPropertyClick
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {[...Array(6)].map((_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return <EmptyState onReset={onResetEmpty} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onViewClick={onPropertyClick}
        />
      ))}
    </div>
  );
};
