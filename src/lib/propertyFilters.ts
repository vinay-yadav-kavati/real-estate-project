import { Property, PropertyFilterState } from '../types/property';

export const INITIAL_FILTER_STATE: PropertyFilterState = {
  searchQuery: '',
  propertyType: 'all',
  locality: 'all',
  minPrice: null,
  maxPrice: null,
  minBedrooms: null,
  status: 'all',
  sortBy: 'newest',
  purpose: 'all',
};

/**
 * Pure function to filter and sort properties based on filter state.
 * Returns a new array, never mutating the original input.
 */
export function filterAndSortProperties(
  properties: Property[],
  filters: PropertyFilterState
): Property[] {
  let result = properties.filter((property) => {
    // 0. Purpose Filter (Buy vs Rent)
    if (filters.purpose && filters.purpose !== 'all') {
      if (
        property.purpose.toLowerCase() !== filters.purpose.toLowerCase()
      ) {
        return false;
      }
    }

    // 1. Text Search Filter
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.trim().toLowerCase();
      const searchableText = [
        property.title,
        property.location,
        property.locality,
        property.city,
        property.state,
        property.propertyType,
        property.purpose,
        property.status,
        property.tag || '',
      ]
        .join(' ')
        .toLowerCase();

      if (!searchableText.includes(q)) {
        return false;
      }
    }

    // 2. Property Type Filter
    if (filters.propertyType && filters.propertyType !== 'all') {
      if (
        property.propertyType.toLowerCase() !==
        filters.propertyType.toLowerCase()
      ) {
        return false;
      }
    }

    // 3. Locality / Location Filter (flexible to handle "jubilee-hills", "Jubilee Hills", etc.)
    if (filters.locality && filters.locality !== 'all') {
      const targetLoc = filters.locality.toLowerCase().replace(/-/g, ' ');
      const propLocality = property.locality.toLowerCase();
      const propFullLocation = property.location.toLowerCase();
      if (!propLocality.includes(targetLoc) && !propFullLocation.includes(targetLoc)) {
        return false;
      }
    }

    // 4. Min Price Filter
    if (filters.minPrice !== null && filters.minPrice > 0) {
      if (property.priceNumeric < filters.minPrice) {
        return false;
      }
    }

    // 5. Max Price Filter
    if (filters.maxPrice !== null && filters.maxPrice > 0) {
      if (property.priceNumeric > filters.maxPrice) {
        return false;
      }
    }

    // 6. Bedrooms Filter
    // Note: When set to null (Any), all properties including plots/commercial are retained.
    // When set to a positive number (e.g. 1+, 2+, 3+, 4+), only properties having at least that many bedrooms match.
    if (filters.minBedrooms !== null && filters.minBedrooms > 0) {
      if (property.bedrooms < filters.minBedrooms) {
        return false;
      }
    }

    // 7. Status Filter
    if (filters.status && filters.status !== 'all') {
      if (
        property.status.toLowerCase() !== filters.status.toLowerCase()
      ) {
        return false;
      }
    }

    return true;
  });

  // 8. Sorting
  result = [...result].sort((a, b) => {
    if (filters.sortBy === 'price-asc') {
      return a.priceNumeric - b.priceNumeric;
    }
    if (filters.sortBy === 'price-desc') {
      return b.priceNumeric - a.priceNumeric;
    }
    // Default: newest first
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return result;
}

/**
 * Checks whether any filter (aside from default sorting) is actively applied.
 */
export function hasActiveFilters(filters: PropertyFilterState): boolean {
  return (
    filters.searchQuery.trim() !== '' ||
    filters.propertyType !== 'all' ||
    filters.locality !== 'all' ||
    filters.minPrice !== null ||
    filters.maxPrice !== null ||
    filters.minBedrooms !== null ||
    filters.status !== 'all' ||
    (Boolean(filters.purpose) && filters.purpose !== 'all')
  );
}

/**
 * Counts the number of active filters for mobile badge display.
 */
export function countActiveFilters(filters: PropertyFilterState): number {
  let count = 0;
  if (filters.searchQuery.trim() !== '') count++;
  if (filters.propertyType !== 'all') count++;
  if (filters.locality !== 'all') count++;
  if (filters.minPrice !== null || filters.maxPrice !== null) count++;
  if (filters.minBedrooms !== null) count++;
  if (filters.status !== 'all') count++;
  if (filters.purpose && filters.purpose !== 'all') count++;
  return count;
}
