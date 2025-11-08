// src/pages/admin/AdminLeadList.tsx
import React, { useState, useEffect } from 'react';
import { Phone, Mail, User, Building, Calendar, Zap, ChevronDown, Filter, Search, Download, RefreshCw } from 'lucide-react';

// Helper component for the status dropdown
const StatusDropdown = ({ lead, setLeads }) => {
  const [currentStatus, setCurrentStatus] = useState(lead.status);
  const [isLoading, setIsLoading] = useState(false);

  const statusOptions = ['New', 'Consulted', 'Pending'];
  
  const statusColors = {
    New: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
    Consulted: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
    Pending: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white',
  };

  const handleStatusChange = async (newStatus) => {
    if (newStatus === currentStatus) return;
    setIsLoading(true);
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/leads/${lead._id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();

      if (data.success) {
        setCurrentStatus(data.data.status);
        setLeads(prevLeads => 
          prevLeads.map(l => (l._id === lead._id ? data.data : l))
        );
        
        if (newStatus === 'Consulted') {
          console.log(`Notification: Lead ${lead.name} has been marked as 'Consulted'.`);
        }
      } else {
        alert('Failed to update status: ' + data.error);
        setCurrentStatus(lead.status);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred.');
      setCurrentStatus(lead.status);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
    <select
  value={currentStatus}
  onChange={(e) => handleStatusChange(e.target.value)}
  disabled={isLoading}
  className={`w-36 appearance-none px-4 py-2 text-xs font-bold rounded-full shadow-sm
    ${statusColors[currentStatus] || 'bg-gray-100 text-gray-800'}
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400
    transition-all duration-200 cursor-pointer hover:shadow-md
    ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
  `}
  style={{
    WebkitAppearance: "none",
    MozAppearance: "none",
    appearance: "none",
    backgroundColor: "transparent",
  }}
>
  {statusOptions.map(status => (
    <option
      key={status}
      value={status}
      className="bg-gray-800 text-white"  // ✅ fix here
    >
      {status}
    </option>
  ))}
</select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none" />
    </div>
  );
};

const AdminLeadList = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [searchTerm, statusFilter, leads]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/leads`);
      const data = await response.json();
      
      if (data.success) {
        setLeads(data.data);
        setFilteredLeads(data.data);
      } else {
        setError(data.error || 'Failed to load leads');
      }
    } catch (err) {
      setError('Failed to load leads');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = [...leads];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone?.includes(searchTerm) ||
        lead.project?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    setFilteredLeads(filtered);
  };

  const getStatusCount = (status: string) => {
    if (status === 'All') return leads.length;
    return leads.filter(lead => lead.status === status).length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading leads...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
        <div className="flex items-center">
          <div className="text-red-500 text-xl mr-3">⚠️</div>
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                Manage Leads
              </h1>
              <p className="text-gray-600">Track and manage your customer inquiries</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchLeads}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              >
                <RefreshCw size={18} />
                Refresh
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl">
                <Download size={18} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {['All', 'New', 'Consulted', 'Pending'].map((status) => (
            <div
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`bg-white rounded-xl p-4 cursor-pointer transition-all duration-200 border-2 ${
                statusFilter === status
                  ? 'border-blue-500 shadow-lg scale-105'
                  : 'border-gray-100 hover:border-gray-300 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{status} Leads</p>
                  <p className="text-3xl font-bold text-gray-900">{getStatusCount(status)}</p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  status === 'All' ? 'bg-gray-100' :
                  status === 'New' ? 'bg-blue-100' :
                  status === 'Consulted' ? 'bg-green-100' :
                  'bg-yellow-100'
                }`}>
                  <User size={24} className={
                    status === 'All' ? 'text-gray-600' :
                    status === 'New' ? 'text-blue-600' :
                    status === 'Consulted' ? 'text-green-600' :
                    'text-yellow-600'
                  } />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, email, phone, or project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Contact Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <User size={32} className="text-gray-400" />
                        </div>
                        <p className="text-gray-600 font-medium text-lg mb-1">No leads found</p>
                        <p className="text-gray-500 text-sm">
                          {searchTerm || statusFilter !== 'All' 
                            ? 'Try adjusting your filters'
                            : 'New leads will appear here'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead, index) => (
                    <tr 
                      key={lead._id} 
                      className="hover:bg-blue-50/50 transition-colors duration-150"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            <User size={18} className="text-white" />
                          </div>
                          <div className="text-sm font-semibold text-gray-900">
                            {lead.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Phone size={14} className="text-gray-400" />
                            <a 
                              href={`tel:${lead.phone}`} 
                              className="hover:text-blue-600 transition-colors font-medium"
                            >
                              {lead.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail size={14} className="text-gray-400" />
                            <a 
                              href={`mailto:${lead.email}`} 
                              className="hover:text-blue-600 transition-colors"
                            >
                              {lead.email}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-start gap-2">
                          <Building size={16} className="text-gray-400 mt-0.5" />
                          <div>

                            <div className="text-sm font-semibold text-gray-900">
                              {/* 👇 This logic handles it perfectly! */}
                              {lead.project ? lead.project.name : 'Project not found'}
                            </div>
                            <div className="text-sm font-semibold text-gray-900">
                              {lead.project ? lead.project.name : 'Project not found'}
                            </div>
                            <div className="text-xs text-gray-500">
                              {lead.project ? `${lead.project.area}, ${lead.project.city}` : ''}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-gray-400" />
                          <span className="font-medium">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 ml-6">
                          {new Date(lead.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Zap size={16} className="text-yellow-500" />
                          <span className="font-medium">{lead.source || 'Unknown'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusDropdown lead={lead} setLeads={setLeads} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Stats */}
        {filteredLeads.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-600">
            Showing {filteredLeads.length} of {leads.length} leads
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLeadList;