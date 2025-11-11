// src/App.tsx
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/index';
import FilterResults from './pages/buy/filters';
import ProjectDetails from './components/ProjectDetails'; // Assuming this is correct
import NotFound from './components/NotFound'; // Assuming this exists
import ListProjectPage from './pages/sell/ListProjectPage';
import PropertyMap from './pages/mapporperty';

// --- Admin Imports ---
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddProject from './pages/admin/add-project';
import AdminProjectList from './pages/admin/AdminProjectList';
import EditProject from './pages/admin/EditProject';
import AdminLeadList from './pages/admin/AdminLeadList';
import AdminFilterManagement from './pages/admin/AdminFilter'; // 🌟 ADD THIS


// --- Super Admin Imports ---
import SuperAdminLayout from './pages/admin/superadmin/SuperAdminLayout';
import SuperAdminDashboard from './pages/admin/superadmin/SuperAdminDashboard';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<Index />} />
          <Route path="/Properties" element={<FilterResults />} />
          {/* Keep your existing project routes */}
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/:state/:city/:area/:name" element={<ProjectDetails />} />
          <Route path="/map" element={<PropertyMap />} />
          <Route path="/sell" element={<ListProjectPage />} />

          {/* --- Admin Routes --- */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<AdminProjectList />} />
            <Route path="add-project" element={<AddProject />} />
            <Route path="edit-project/:id" element={<EditProject />} />
            <Route path="filters" element={<AdminFilterManagement />} /> {/* 🌟 ADD THIS */}

            <Route path="leads" element={<AdminLeadList />} />
          </Route>
          
          {/* --- Super Admin Routes --- */}
          <Route path="/superadmin" element={<SuperAdminLayout />}>
            <Route index element={<SuperAdminDashboard />} />
            {/* Add more super admin routes here if needed */}
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;