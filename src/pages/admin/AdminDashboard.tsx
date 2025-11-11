// src/pages/admin/AdminDashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { List, Users, PlusCircle, Filter } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { name: 'Manage Projects', href: '/admin/projects', icon: List, desc: 'Edit, delete, or view all projects' },
    { name: 'Manage Leads', href: '/admin/leads', icon: Users, desc: 'View and follow up on new leads' },
    { name: 'Add New Project', href: '/admin/add-project', icon: PlusCircle, desc: 'Create a new project listing' },
    { name: 'Manage Filters', href: '/admin/filters', icon: Filter, desc: 'Customize filter options for users' },

  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow flex flex-col"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                <item.icon size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
            </div>
            <p className="text-gray-600 flex-grow">{item.desc}</p>
            <span className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800">
              Go to {item.name} &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;