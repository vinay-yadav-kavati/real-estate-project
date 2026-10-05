export type PropertyStatus = 'Available' | 'Sold' | 'Rented' | 'Under Negotiation';

export type PropertyType = 'Apartment' | 'Villa' | 'Plot' | 'Commercial' | 'House' | 'Duplex';

export interface Property {
  id: string;
  title: string;
  location: string;
  propertyType: PropertyType;
  purpose: 'Buy' | 'Rent';
  price: string;
  formattedPrice: string;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  status: PropertyStatus;
  imageUrl: string;
  imageAlt: string;
  featured?: boolean;
  tag?: string;
}
