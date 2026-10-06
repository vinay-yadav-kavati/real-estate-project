import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, PropertyStatus } from '../types/property';
import { ALL_PROPERTIES } from '../data/properties';

interface PropertyContextType {
  properties: Property[];
  addProperty: (data: Omit<Property, 'id' | 'createdAt'>) => Property;
  updateProperty: (id: string, updatedData: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  updatePropertyStatus: (id: string, status: PropertyStatus) => void;
  resetToDefault: () => void;
  getPropertyById: (idOrSlug: string) => Property | undefined;
}

const LOCAL_STORAGE_KEY = 'homenest_properties_inventory';

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read properties from localStorage:', e);
    }
    return ALL_PROPERTIES;
  });

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(properties));
    } catch (e) {
      console.warn('Could not persist properties to localStorage:', e);
    }
  }, [properties]);

  const addProperty = (data: Omit<Property, 'id' | 'createdAt'>): Property => {
    const uniqueId = `prop-${Date.now()}`;
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProperty: Property = {
      ...data,
      id: uniqueId,
      slug: slug || uniqueId,
      createdAt: new Date().toISOString(),
    };

    setProperties((prev) => [newProperty, ...prev]);
    return newProperty;
  };

  const updateProperty = (id: string, updatedData: Partial<Property>) => {
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            ...updatedData,
            slug: updatedData.title
              ? updatedData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
              : p.slug,
          };
        }
        return p;
      })
    );
  };

  const deleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePropertyStatus = (id: string, status: PropertyStatus) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
  };

  const resetToDefault = () => {
    setProperties(ALL_PROPERTIES);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      // ignore
    }
  };

  const getPropertyById = (idOrSlug: string): Property | undefined => {
    return properties.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        addProperty,
        updateProperty,
        deleteProperty,
        updatePropertyStatus,
        resetToDefault,
        getPropertyById,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = (): PropertyContextType => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};
