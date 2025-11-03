import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/index';
import FilterResults from './pages/buy/filters';
import ProjectDetails from './components/ProjectDetails';
import NotFound from './components/NotFound';
import ListProjectPage from './pages/sell/ListProjectPage'; // Import the new page

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/buy/*" element={<FilterResults />} />
          <Route path="/project/:id/:name" element={<ProjectDetails />} />
          <Route path="/sell/list-project" element={<ListProjectPage />} /> {/* Add the new route */}
          {/* You can also add a route for /sell/list-property */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;