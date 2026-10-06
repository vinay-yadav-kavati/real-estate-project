import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PropertyProvider } from './context/PropertyContext';
import { CRMProvider } from './context/CRMContext';
import { MainLayout } from './layouts/MainLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { EnquiryPage } from './pages/EnquiryPage';
import { SiteVisitPage } from './pages/SiteVisitPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminPropertiesPage } from './pages/admin/AdminPropertiesPage';
import { AdminLeadsPage } from './pages/admin/AdminLeadsPage';
import { AdminSiteVisitsPage } from './pages/admin/AdminSiteVisitsPage';

export default function App() {
  return (
    <BrowserRouter>
      <PropertyProvider>
        <CRMProvider>
          <Routes>
          {/* Admin Management Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="properties" element={<AdminPropertiesPage />} />
            <Route path="leads" element={<AdminLeadsPage />} />
            <Route path="site-visits" element={<AdminSiteVisitsPage />} />
            <Route path="*" element={<AdminDashboardPage />} />
          </Route>

          {/* Public Website Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="properties" element={<PropertiesPage />} />
            <Route path="properties/:propertyId" element={<PropertyDetailPage />} />
            <Route path="properties/:propertyId/enquire" element={<EnquiryPage />} />
            <Route path="properties/:propertyId/site-visit" element={<SiteVisitPage />} />
            <Route path="enquire" element={<EnquiryPage />} />
            <Route path="site-visit" element={<SiteVisitPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
        </CRMProvider>
      </PropertyProvider>
    </BrowserRouter>
  );
}
