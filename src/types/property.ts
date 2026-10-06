export type PropertyStatus = 'Available' | 'Sold' | 'Rented' | 'Under Negotiation';

export type PropertyType = 'Apartment' | 'Villa' | 'Plot' | 'Commercial' | 'House' | 'Duplex';

export interface PropertySpecification {
  label: string;
  value: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  locality: string;
  city: string;
  state: string;
  address?: string;
  propertyType: PropertyType;
  purpose: 'Buy' | 'Rent';
  price: string;
  formattedPrice: string;
  priceNumeric: number;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  status: PropertyStatus;
  imageUrl: string;
  images: string[];
  imageAlt: string;
  description: string;
  amenities: string[];
  specifications: PropertySpecification[];
  createdAt: string;
  featured?: boolean;
  tag?: string;
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc';

export interface PropertyFilterState {
  searchQuery: string;
  propertyType: string;
  locality: string;
  minPrice: number | null;
  maxPrice: number | null;
  minBedrooms: number | null;
  status: string;
  sortBy: SortOption;
  purpose?: string;
}
