export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Site Visit Scheduled'
  | 'Negotiation'
  | 'Closed'
  | 'Lost';

export type SiteVisitStatus =
  | 'Scheduled'
  | 'Confirmed'
  | 'Completed'
  | 'Cancelled'
  | 'Rescheduled';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  propertyId?: string;
  propertyTitle?: string;
  propertyPrice?: string;
  propertyType?: string;
  inquiryType?: 'Property Inquiry' | 'Site Visit Request' | 'General Advisory';
  message: string;
  status: LeadStatus;
  date: string;
  assignedAdvisor?: string;
  notes?: string;
}

export type AdminLead = Lead;

export interface SiteVisit {
  id: string;
  leadId?: string;
  leadName: string;
  phone: string;
  email: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation?: string;
  date: string; // YYYY-MM-DD or formatted date
  time: string; // e.g. '10:00 AM'
  status: SiteVisitStatus;
  transitRequested?: boolean;
  assignedConsultant?: string;
  notes?: string;
}

export type AdminSiteVisit = SiteVisit;

export interface PropertyInventorySummary {
  totalListings: number;
  available: number;
  underNegotiation: number;
  sold: number;
  totalValuation: string;
  typeBreakdown: {
    villas: number;
    apartments: number;
    commercial: number;
    plots: number;
  };
}

export interface DashboardSummaryStats {
  properties: {
    total: number;
    available: number;
    underNegotiation: number;
    sold: number;
    totalValuation: string;
  };
  leads: {
    total: number;
    newLeads: number;
    contacted: number;
    qualified: number;
    siteVisitsScheduled: number;
    closed: number;
  };
  siteVisits: {
    total: number;
    upcoming: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
}
