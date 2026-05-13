/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import StoryPage from './pages/Story';
import ServicesPage from './pages/Services';
import ProjectsPage from './pages/Projects';
import ContactPage from './pages/Contact';
import Preloader from './components/Preloader';

// Admin Imports (Demo)
import AdminLayout from './components/AdminLayout';
import DemoLogin from './pages/admin/DemoLogin';
import DashboardOverview from './pages/admin/Dashboard';
import ProjectManagement from './pages/admin/Projects';
import ServiceManagement from './pages/admin/Services';
import TeamManagement from './pages/admin/Team';
import ContentManagement from './pages/admin/Content';
import AnalyticsManagement from './pages/admin/Analytics';
import SettingsManagement from './pages/admin/Settings';
import { AuthProvider } from './hooks/useAuth';
import { AdminDemoProvider } from './contexts/AdminDemoContext';

export default function App() {
  return (
    <>
      <Preloader />
      <Router>
        <Routes>
          {/* Public Routes with real auth (optional) */}
          <Route path="/" element={<AuthProvider><Layout /></AuthProvider>}>
            <Route index element={<HomePage />} />
            <Route path="story" element={<StoryPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>

          {/* Admin Routes - Demo Setup */}
          <Route path="/admin" element={<AdminDemoProvider><OutletOrAdminRoutes /></AdminDemoProvider>}>
             <Route path="login" element={<DemoLogin />} />
             <Route element={<AdminLayout />}>
               <Route index element={<DashboardOverview />} />
               <Route path="projects" element={<ProjectManagement />} />
               <Route path="services" element={<ServiceManagement />} />
               <Route path="team" element={<TeamManagement />} />
               <Route path="content" element={<ContentManagement />} />
               <Route path="analytics" element={<AnalyticsManagement />} />
               <Route path="settings" element={<SettingsManagement />} />
             </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

function OutletOrAdminRoutes() {
  // A wrapper to render Outlet inside the provider
  return <Outlet />;
}
