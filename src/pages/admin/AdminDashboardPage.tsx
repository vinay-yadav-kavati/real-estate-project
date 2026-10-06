import React, { useMemo } from 'react';
import { Building2, Users, CalendarCheck } from 'lucide-react';
import { AdminStatCard } from '../../components/admin/AdminStatCard';
import { RecentLeadsTable } from '../../components/admin/RecentLeadsTable';
import { UpcomingVisitsList } from '../../components/admin/UpcomingVisitsList';
import { PropertyInventoryOverview } from '../../components/admin/PropertyInventoryOverview';
import { AdminQuickActions } from '../../components/admin/AdminQuickActions';
import { useProperties } from '../../context/PropertyContext';
import { useCRM } from '../../context/CRMContext';

export const AdminDashboardPage: React.FC = () => {
  const { properties } = useProperties();
  const { leads, siteVisits } = useCRM();

  // Dynamic calculations from current properties state
  const propertyStats = useMemo(() => {
    const total = properties.length;
    const available = properties.filter((p) => p.status === 'Available').length;
    const underNegotiation = properties.filter((p) => p.status === 'Under Negotiation').length;
    const sold = properties.filter((p) => p.status === 'Sold').length;
    const totalNumeric = properties.reduce((acc, p) => acc + (p.priceNumeric || 0), 0);
    const valuation = `₹${(totalNumeric / 10000000).toFixed(2)} Cr`;

    const villas = properties.filter(
      (p) => p.propertyType === 'Villa' || p.propertyType === 'House' || p.propertyType === 'Duplex'
    ).length;
    const apartments = properties.filter((p) => p.propertyType === 'Apartment').length;
    const commercial = properties.filter((p) => p.propertyType === 'Commercial').length;
    const plots = properties.filter((p) => p.propertyType === 'Plot').length;

    return {
      total,
      available,
      underNegotiation,
      sold,
      valuation,
      inventorySummary: {
        totalListings: total,
        available,
        underNegotiation,
        sold,
        totalValuation: valuation,
        typeBreakdown: { villas, apartments, commercial, plots },
      },
    };
  }, [properties]);

  // Dynamic calculated stats from CRM store
  const leadStats = useMemo(() => {
    return {
      total: leads.length,
      newLeads: leads.filter((l) => (l.status || '').toLowerCase() === 'new').length,
      contacted: leads.filter((l) => (l.status || '').toLowerCase() === 'contacted').length,
      qualifiedOrClosed: leads.filter(
        (l) =>
          (l.status || '').toLowerCase() === 'qualified' ||
          (l.status || '').toLowerCase() === 'closed' ||
          (l.status || '').toLowerCase() === 'site visit scheduled'
      ).length,
    };
  }, [leads]);

  const visitStats = useMemo(() => {
    return {
      upcoming: siteVisits.filter(
        (v) =>
          (v.status || '').toLowerCase() === 'confirmed' ||
          (v.status || '').toLowerCase() === 'scheduled' ||
          (v.status || '').toLowerCase() === 'rescheduled'
      ).length,
      confirmed: siteVisits.filter((v) => (v.status || '').toLowerCase() === 'confirmed').length,
      completed: siteVisits.filter((v) => (v.status || '').toLowerCase() === 'completed').length,
      transitCount: siteVisits.filter((v) => v.transitRequested).length,
    };
  }, [siteVisits]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* =========================================================================
          1. TOP SUMMARY METRIC CARDS
          ========================================================================= */}
      <section aria-labelledby="metrics-heading">
        <h2 id="metrics-heading" className="sr-only">
          Key Performance Indicators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Properties */}
          <AdminStatCard
            title="Portfolio Listings"
            mainValue={propertyStats.total}
            subValueLabel="Total Properties"
            icon={Building2}
            breakdown={[
              { label: 'Available', value: propertyStats.available, highlight: true },
              { label: 'Negotiation', value: propertyStats.underNegotiation },
              { label: 'Sold / Closed', value: propertyStats.sold },
            ]}
            trendNote={`Active portfolio valuation: ${propertyStats.valuation}`}
          />

          {/* Card 2: Leads & Inquiries */}
          <AdminStatCard
            title="Customer Inquiries"
            mainValue={leadStats.total}
            subValueLabel="Total Leads Logged"
            icon={Users}
            breakdown={[
              { label: 'New Inquiries', value: leadStats.newLeads, highlight: true },
              { label: 'Contacted', value: leadStats.contacted },
              { label: 'In Pipeline', value: leadStats.qualifiedOrClosed },
            ]}
            trendNote={`${leadStats.newLeads} new leads require follow-up`}
          />

          {/* Card 3: Site Visits */}
          <AdminStatCard
            title="Site Inspections"
            mainValue={visitStats.upcoming}
            subValueLabel="Upcoming Tours"
            icon={CalendarCheck}
            breakdown={[
              { label: 'Confirmed', value: visitStats.confirmed, highlight: true },
              { label: 'Completed', value: visitStats.completed },
              { label: 'Transit Arranged', value: visitStats.transitCount },
            ]}
            trendNote={`${visitStats.transitCount} chauffeured transit pickups scheduled`}
          />
        </div>
      </section>

      {/* =========================================================================
          2. QUICK ACTIONS SECTION
          ========================================================================= */}
      <section aria-labelledby="quick-actions-heading">
        <AdminQuickActions />
      </section>

      {/* =========================================================================
          3. RECENT LEADS SECTION
          ========================================================================= */}
      <section id="recent-leads" aria-labelledby="recent-leads-heading">
        <RecentLeadsTable leads={leads} />
      </section>

      {/* =========================================================================
          4. UPCOMING SITE VISITS SECTION
          ========================================================================= */}
      <section id="upcoming-visits" aria-labelledby="upcoming-visits-heading">
        <UpcomingVisitsList visits={siteVisits} />
      </section>

      {/* =========================================================================
          5. PROPERTY INVENTORY OVERVIEW SECTION
          ========================================================================= */}
      <section id="property-inventory" aria-labelledby="property-inventory-heading">
        <PropertyInventoryOverview summary={propertyStats.inventorySummary} />
      </section>
    </div>
  );
};
