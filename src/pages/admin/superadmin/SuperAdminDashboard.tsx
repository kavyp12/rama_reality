
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, FileText, CheckCircle, Clock, Building, TrendingUp, Calendar, Phone, Mail, MapPin, Eye, Edit, Trash2, Filter, RefreshCw, Search, Plus, Download } from 'lucide-react';

// ✅ FIX 1: Proper API URL handling for production
const getApiUrl = () => {
  // For production, use your actual backend URL
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || 'https://your-backend-url.com/api';
  }
  // For development
  return import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
};

const API_URL = getApiUrl();

// Stat Card Component
const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className={`bg-white border-l-4 ${color} rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-200`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        {trend && (
          <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp size={14} />
            {trend}
          </p>
        )}
      </div>
      <div className={`p-3 ${color.replace('border', 'bg').replace('500', '100')} rounded-full`}>
        <Icon size={24} className={color.replace('border-', 'text-')} />
      </div>
    </div>
  </div>
);

// Lead Table Component
const LeadsTable = ({ leads, onStatusChange, onDelete, onRefresh }) => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredLeads = leads.filter(lead => {
    const matchesFilter = filter === 'All' || lead.status === filter;
    const matchesSearch = searchTerm === '' || 
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm) ||
      lead.project?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'bg-yellow-100 text-yellow-800';
      case 'Consulted': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Project', 'Location', 'Source', 'Status', 'Date'];
    const rows = filteredLeads.map(lead => [
      lead.name,
      lead.phone,
      lead.email,
      lead.project?.name || 'N/A',
      `${lead.project?.city}, ${lead.project?.area}`,
      lead.source || 'Direct',
      lead.status,
      new Date(lead.createdAt).toLocaleDateString()
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Users size={20} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">New Leads</p>
              <p className="text-2xl font-bold text-yellow-600">{leads.filter(l => l.status === 'New').length}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <FileText size={20} className="text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Pending</p>
              <p className="text-2xl font-bold text-orange-600">{leads.filter(l => l.status === 'Pending').length}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock size={20} className="text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Consulted</p>
              <p className="text-2xl font-bold text-green-600">{leads.filter(l => l.status === 'Consulted').length}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={20} className="text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, email, phone, or project..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          
          {/* Filter Buttons */}
          <div className="flex gap-2">
            {['All', 'New', 'Pending', 'Consulted'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  filter === status 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={onRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw size={18} />
              <span className="hidden md:inline">Refresh</span>
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download size={18} />
              <span className="hidden md:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Project</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Source</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Users size={32} className="text-gray-400" />
                      </div>
                      <p className="text-gray-600 font-medium text-lg mb-1">No leads found</p>
                      <p className="text-gray-500 text-sm">
                        {searchTerm || filter !== 'All'
                          ? 'Try adjusting your filters or search term'
                          : 'Leads will appear here once submitted'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead, index) => (
                  <tr 
                    key={lead._id} 
                    className="hover:bg-blue-50/50 transition-colors"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">
                            {lead.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-gray-900">{lead.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-sm text-gray-700">
                          <Phone size={12} className="text-gray-400" />
                          {lead.phone}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Mail size={12} className="text-gray-400" />
                          {lead.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{lead.project?.name || 'N/A'}</div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin size={10} />
                        {lead.project?.city}, {lead.project?.area}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{lead.source || 'Direct'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={(e) => onStatusChange(lead._id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)} border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      >
                        <option value="New">New</option>
                        <option value="Pending">Pending</option>
                        <option value="Consulted">Consulted</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar size={12} />
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => onDelete(lead._id, lead.name)}
                        title="Delete Lead"
                        className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
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
        <div className="text-center text-sm text-gray-600">
          Showing {filteredLeads.length} of {leads.length} leads
        </div>
      )}
    </div>
  );
};

// Projects Table Component
const ProjectsTable = ({ projects, onRefresh, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProjects = projects.filter(project =>
    project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.developer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.area?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Projects</p>
              <p className="text-3xl font-bold text-gray-900">{projects.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Building size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Listings</p>
              <p className="text-3xl font-bold text-green-600">{projects.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Eye size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Filtered Results</p>
              <p className="text-3xl font-bold text-purple-600">{filteredProjects.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Search size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by project name, developer, area, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={onRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
            <Link 
              to="/admin/add-project" 
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
            >
              <Plus size={20} />
              Add Project
            </Link>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Developer
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Price Range
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Building size={32} className="text-gray-400" />
                      </div>
                      <p className="text-gray-600 font-medium text-lg mb-1">No projects found</p>
                      <p className="text-gray-500 text-sm">
                        {searchTerm 
                          ? 'Try adjusting your search term'
                          : 'Click "Add Project" to create your first project'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project, index) => (
                  <tr 
                    key={project._id} 
                    className="hover:bg-blue-50/50 transition-colors duration-150"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building size={18} className="text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{project.name}</div>
                          <div className="text-xs text-gray-500">{project.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-700">{project.developer}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                        <div>
                          <div className="font-medium">{project.area}, {project.city}</div>
                          <div className="text-xs text-gray-500">{project.state}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {project.priceRange?.min && project.priceRange?.max
                          ? `₹${(project.priceRange.min / 10000000).toFixed(2)}Cr - ₹${(project.priceRange.max / 10000000).toFixed(2)}Cr`
                          : 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          to={`/${project.slug}`} 
                          title="View Project"
                          target="_blank"
                          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <Eye size={16} />
                          View
                        </Link>
                        <Link 
                          to={`/admin/edit-project/${project._id}`} 
                          title="Edit Project"
                          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          <Edit size={16} />
                          Edit
                        </Link>
                        <button 
                          onClick={() => onDelete(project._id, project.name)} 
                          title="Delete Project"
                          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Stats */}
      {filteredProjects.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-600">
          Showing {filteredProjects.length} of {projects.length} projects
        </div>
      )}
    </div>
  );
};

// Main Dashboard Component
const SuperAdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // ✅ FIX 2: Add detailed error tracking
  const [fetchErrors, setFetchErrors] = useState({
    stats: null,
    leads: null,
    projects: null
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  // ✅ FIX 3: Improved error handling with individual try-catch
  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      setFetchErrors({ stats: null, leads: null, projects: null });
      
      console.log('Fetching from API URL:', API_URL); // Debug log
      
      // Fetch stats
      let statsData = null;
      try {
        const statsRes = await fetch(`${API_URL}/leads/stats/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        
        if (!statsRes.ok) {
          throw new Error(`Stats fetch failed: ${statsRes.status} ${statsRes.statusText}`);
        }
        
        statsData = await statsRes.json();
        console.log('Stats response:', statsData);
        
        if (statsData.success) {
          setStats(statsData.data);
        } else {
          setFetchErrors(prev => ({ ...prev, stats: statsData.error || 'Stats fetch failed' }));
        }
      } catch (err) {
        console.error('Stats fetch error:', err);
        setFetchErrors(prev => ({ ...prev, stats: err.message }));
      }
      
      // Fetch leads
      let leadsData = null;
      try {
        const leadsRes = await fetch(`${API_URL}/leads`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        
        if (!leadsRes.ok) {
          throw new Error(`Leads fetch failed: ${leadsRes.status} ${leadsRes.statusText}`);
        }
        
        leadsData = await leadsRes.json();
        console.log('Leads response:', leadsData);
        
        if (leadsData.success) {
          setLeads(leadsData.data || []);
        } else {
          setFetchErrors(prev => ({ ...prev, leads: leadsData.error || 'Leads fetch failed' }));
        }
      } catch (err) {
        console.error('Leads fetch error:', err);
        setFetchErrors(prev => ({ ...prev, leads: err.message }));
      }
      
      // Fetch projects
      let projectsData = null;
      try {
        const projectsRes = await fetch(`${API_URL}/projects`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        
        if (!projectsRes.ok) {
          throw new Error(`Projects fetch failed: ${projectsRes.status} ${projectsRes.statusText}`);
        }
        
        projectsData = await projectsRes.json();
        console.log('Projects response:', projectsData);
        
        if (projectsData.success) {
          setProjects(projectsData.data || []);
        } else {
          setFetchErrors(prev => ({ ...prev, projects: projectsData.error || 'Projects fetch failed' }));
        }
      } catch (err) {
        console.error('Projects fetch error:', err);
        setFetchErrors(prev => ({ ...prev, projects: err.message }));
      }
      
      // ✅ FIX 5: Only set error if ALL requests failed
      if (!statsData && !leadsData && !projectsData) {
        setError('Failed to fetch any data. Please check your connection and try again.');
      }
      
    } catch (err) {
      console.error('General fetch error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/leads/${leadId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      const data = await res.json();
      if (data.success) {
        setLeads(leads.map(lead => 
          lead._id === leadId ? { ...lead, status: newStatus } : lead
        ));
        fetchAllData(); // Refresh stats
      }
    } catch (err) {
      console.error('Failed to update lead status:', err);
      alert('Failed to update lead status');
    }
  };

  const handleDeleteLead = async (leadId, leadName) => {
    if (!confirm(`Are you sure you want to delete the lead "${leadName}"? This cannot be undone.`)) return;
    
    try {
      const res = await fetch(`${API_URL}/leads/${leadId}`, {
        method: 'DELETE',
      });
      
      const data = await res.json();
      if (data.success) {
        setLeads(leads.filter(lead => lead._id !== leadId));
        alert('Lead deleted successfully');
        fetchAllData();
      } else {
        alert('Failed to delete lead: ' + data.error);
      }
    } catch (err) {
      console.error('Failed to delete lead:', err);
      alert('Failed to delete lead');
    }
  };

  const handleDeleteProject = async (projectId, projectName) => {
    if (!confirm(`Are you sure you want to delete the project "${projectName}"? This cannot be undone.`)) return;
    
    try {
      const res = await fetch(`${API_URL}/projects/${projectId}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.success) {
        alert('Project deleted successfully');
        setProjects(projects.filter(p => p._id !== projectId));
      } else {
        alert('Failed to delete project: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while deleting the project');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
          <p className="text-sm text-gray-500 mt-2">API: {API_URL}</p>
        </div>
      </div>
    );
  }

  // ✅ FIX 6: Show partial errors but still display available data
  if (error && leads.length === 0 && projects.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-2xl">
          <div className="flex items-start">
            <div className="text-red-500 text-xl mr-3">⚠️</div>
            <div className="flex-1">
              <p className="text-red-700 font-medium mb-2">{error}</p>
              
              {/* Show individual errors */}
              {Object.entries(fetchErrors).map(([key, err]) => 
                err ? (
                  <p key={key} className="text-sm text-red-600 mb-1">
                    • {key}: {err}
                  </p>
                ) : null
              )}
              
              <p className="text-sm text-red-600 mt-3">
                API URL: {API_URL}
              </p>
              
              <button
                onClick={fetchAllData}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* ✅ FIX 7: Show warning banner if some data failed to load */}
        {(fetchErrors.stats || fetchErrors.leads || fetchErrors.projects) && (
          <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div className="flex items-start">
              <div className="text-yellow-600 mr-3">⚠️</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-800 mb-1">Some data failed to load:</p>
                {fetchErrors.stats && <p className="text-xs text-yellow-700">• Stats: {fetchErrors.stats}</p>}
                {fetchErrors.leads && <p className="text-xs text-yellow-700">• Leads: {fetchErrors.leads}</p>}
                {fetchErrors.projects && <p className="text-xs text-yellow-700">• Projects: {fetchErrors.projects}</p>}
              </div>
              <button
                onClick={fetchAllData}
                className="ml-4 text-sm text-yellow-800 hover:text-yellow-900 font-medium"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                Super Admin Dashboard
              </h1>
              <p className="text-gray-600">Manage all leads, projects, and system statistics</p>
            </div>
            <button
              onClick={fetchAllData}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <RefreshCw size={18} />
              Refresh All
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'dashboard' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
            }`}
          >
            <TrendingUp size={18} />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'leads' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
            }`}
          >
            <Users size={18} />
            Leads ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === 'projects' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
            }`}
          >
            <Building size={18} />
            Projects ({projects.length})
          </button>
        </div>

        {/* Dashboard View */}
        {activeTab === 'dashboard' && stats && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                title="Total Leads"
                value={stats.totalLeads}
                icon={Users}
                color="border-blue-500" 
                trend={undefined}              
              />
              <StatCard 
                title="New Leads"
                value={stats.newLeads}
                icon={FileText}
                color="border-yellow-500" 
                trend={undefined}              
              />
              <StatCard 
                title="Pending Leads" 
                value={stats.pendingLeads} 
                icon={Clock}
                color="border-orange-500" 
                trend={undefined}              
              />
              <StatCard 
                title="Consulted Leads" 
                value={stats.consultedLeads} 
                icon={CheckCircle}
                color="border-green-500" 
                trend={undefined}              
              />
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <StatCard 
                title="Total Projects"
                value={projects.length}
                icon={Building}
                color="border-purple-500" 
                trend={undefined}              
              />
              <StatCard 
                title="Conversion Rate"
                value={`${stats.totalLeads > 0 ? ((stats.consultedLeads / stats.totalLeads) * 100).toFixed(1) : 0}%`}
                icon={TrendingUp}
                color="border-indigo-500" 
                trend={undefined}              
              />
            </div>

            {/* Recent Leads Preview */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Recent Leads</h2>
                <Link 
                  to="#"
                  onClick={(e) => { e.preventDefault(); setActiveTab('leads'); }}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All →
                </Link>
              </div>
              <div className="space-y-3">
                {leads.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No leads yet
                  </div>
                ) : (
                  leads.slice(0, 5).map(lead => (
                    <div key={lead._id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-lg">
                            {lead.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{lead.name}</p>
                          <p className="text-sm text-gray-500">{lead.project?.name || 'No project'}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Phone size={10} />
                              {lead.phone}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar size={10} />
                              {new Date(lead.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        lead.status === 'New' ? 'bg-yellow-100 text-yellow-800' :
                        lead.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {lead.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Projects Preview */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Recent Projects</h2>
                <Link 
                  to="#"
                  onClick={(e) => { e.preventDefault(); setActiveTab('projects'); }}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.length === 0 ? (
                  <div className="col-span-2 text-center py-8 text-gray-500">
                    No projects yet
                  </div>
                ) : (
                  projects.slice(0, 4).map(project => (
                    <div key={project._id} className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building size={20} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 truncate">{project.name}</h3>
                          <p className="text-sm text-gray-600">{project.developer}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <MapPin size={10} />
                            {project.city}, {project.area}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        {/* Leads View */}
        {activeTab === 'leads' && (
          <LeadsTable 
            leads={leads} 
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteLead}
            onRefresh={fetchAllData}
          />
        )}

        {/* Projects View */}
        {activeTab === 'projects' && (
          <ProjectsTable 
            projects={projects}
            onRefresh={fetchAllData}
            onDelete={handleDeleteProject}
          />
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboard