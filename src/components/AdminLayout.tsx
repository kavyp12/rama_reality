// src/components/admin/AdminLayout.tsx
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar'; // Assuming Navbar is at src/components/Navbar.tsx
import { LayoutDashboard, List, Users, PlusCircle, Filter } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [isNavbarVisible, setIsNavbarVisible] = React.useState(true);

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: List },
    { name: 'Leads', href: '/admin/leads', icon: Users },
    { name: 'Add Project', href: '/admin/add-project', icon: PlusCircle },
    { name: 'Filters', href: '/admin/filters', icon:Filter  },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
   <Navbar isVisible={isNavbarVisible} />
      <main className="pt-20"> {/* Start content below navbar */}
        <div className="flex">
          {/* Admin Sidebar */}
          <aside className="w-64 bg-white h-[calc(100vh-80px)] shadow-lg p-4 fixed">
            <h2 className="text-xl font-bold text-gray-800 mb-6 px-2">
              Admin Panel
            </h2>
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                // Make active state checking more robust
                const isActive = item.href === '/admin'
                  ? location.pathname === item.href
                  : location.pathname.startsWith(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
          
          {/* Page Content */}
          <div className="flex-1 ml-64 p-8">
            {/* Outlet renders the current matched admin route */}
            <Outlet /> 
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;