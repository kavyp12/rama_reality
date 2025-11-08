// src/components/superadmin/SuperAdminLayout.tsx
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import { Shield, LayoutDashboard } from 'lucide-react';

const SuperAdminLayout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', href: '/superadmin', icon: LayoutDashboard },
    // Add more super admin links here (e.g., Users, Settings)
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-20">
        <div className="flex">
          {/* Super Admin Sidebar */}
          <aside className="w-64 bg-white h-[calc(100vh-80px)] shadow-lg p-4 fixed">
            <h2 className="text-xl font-bold text-gray-800 mb-6 px-2 flex items-center gap-2">
              <Shield size={22} className="text-red-600" />
              Super Admin
            </h2>
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive = item.href === '/superadmin'
                  ? location.pathname === item.href
                  : location.pathname.startsWith(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-red-600 text-white shadow-md'
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
            <Outlet /> 
          </div>
        </div>
      </main>
    </div>
  );
};

export default SuperAdminLayout;