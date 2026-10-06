import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lead, SiteVisit, LeadStatus, SiteVisitStatus } from '../types/admin';
import { INITIAL_LEADS, INITIAL_SITE_VISITS } from '../data/adminMock';

interface CRMContextType {
  leads: Lead[];
  siteVisits: SiteVisit[];
  addLead: (data: Omit<Lead, 'id' | 'date'> & { date?: string }) => Lead;
  updateLead: (id: string, updatedData: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  addSiteVisit: (data: Omit<SiteVisit, 'id'>) => SiteVisit;
  updateSiteVisit: (id: string, updatedData: Partial<SiteVisit>) => void;
  cancelSiteVisit: (id: string) => void;
  deleteSiteVisit: (id: string) => void;
  getLeadById: (id: string) => Lead | undefined;
  getSiteVisitById: (id: string) => SiteVisit | undefined;
  resetCRMToDefault: () => void;
}

const LOCAL_STORAGE_LEADS_KEY = 'homenest_crm_leads';
const LOCAL_STORAGE_VISITS_KEY = 'homenest_crm_site_visits';

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize Leads from localStorage or initial mock data
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_LEADS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read leads from localStorage:', e);
    }
    return INITIAL_LEADS;
  });

  // Initialize Site Visits from localStorage or initial mock data
  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_VISITS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read site visits from localStorage:', e);
    }
    return INITIAL_SITE_VISITS;
  });

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_LEADS_KEY, JSON.stringify(leads));
    } catch (e) {
      console.warn('Could not persist leads to localStorage:', e);
    }
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_VISITS_KEY, JSON.stringify(siteVisits));
    } catch (e) {
      console.warn('Could not persist site visits to localStorage:', e);
    }
  }, [siteVisits]);

  // Lead CRUD Actions
  const addLead = (data: Omit<Lead, 'id' | 'date'> & { date?: string }): Lead => {
    const id = `lead-${Date.now()}`;
    const dateFormatted = data.date || new Date().toISOString().slice(0, 16).replace('T', ' ');
    const newLead: Lead = {
      ...data,
      id,
      date: dateFormatted,
      status: data.status || 'New',
    };

    setLeads((prev) => [newLead, ...prev]);
    return newLead;
  };

  const updateLead = (id: string, updatedData: Partial<Lead>) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updatedData } : l))
    );
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const getLeadById = (id: string): Lead | undefined => {
    return leads.find((l) => l.id === id);
  };

  // Site Visit CRUD Actions
  const addSiteVisit = (data: Omit<SiteVisit, 'id'>): SiteVisit => {
    const id = `visit-${Date.now()}`;
    const newVisit: SiteVisit = {
      ...data,
      id,
      status: data.status || 'Scheduled',
    };

    setSiteVisits((prev) => [newVisit, ...prev]);

    // If an associated lead exists, update its status to 'Site Visit Scheduled'
    if (data.leadId) {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === data.leadId && l.status !== 'Closed' && l.status !== 'Negotiation'
            ? { ...l, status: 'Site Visit Scheduled' }
            : l
        )
      );
    }

    return newVisit;
  };

  const updateSiteVisit = (id: string, updatedData: Partial<SiteVisit>) => {
    setSiteVisits((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updatedData } : v))
    );
  };

  const cancelSiteVisit = (id: string) => {
    setSiteVisits((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: 'Cancelled' } : v))
    );
  };

  const deleteSiteVisit = (id: string) => {
    setSiteVisits((prev) => prev.filter((v) => v.id !== id));
  };

  const getSiteVisitById = (id: string): SiteVisit | undefined => {
    return siteVisits.find((v) => v.id === id);
  };

  const resetCRMToDefault = () => {
    setLeads(INITIAL_LEADS);
    setSiteVisits(INITIAL_SITE_VISITS);
    try {
      localStorage.removeItem(LOCAL_STORAGE_LEADS_KEY);
      localStorage.removeItem(LOCAL_STORAGE_VISITS_KEY);
    } catch (e) {
      // ignore
    }
  };

  return (
    <CRMContext.Provider
      value={{
        leads,
        siteVisits,
        addLead,
        updateLead,
        deleteLead,
        addSiteVisit,
        updateSiteVisit,
        cancelSiteVisit,
        deleteSiteVisit,
        getLeadById,
        getSiteVisitById,
        resetCRMToDefault,
      }}
    >
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = (): CRMContextType => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};
