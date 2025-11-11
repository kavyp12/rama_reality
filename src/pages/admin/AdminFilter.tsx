import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, RefreshCw, Sparkles, X } from 'lucide-react';

const AdminFilterManagement = () => {
  const [filterOptions, setFilterOptions] = useState({
    localities: [],
    cities: [],
    states: [],
    bhk: [],
    possession: [],
    propertyType: [],
    sortBy: [],
    useManualOverride: false
  });
  
  const [suggestions, setSuggestions] = useState({
    localities: [],
    cities: [],
    states: [],
    bhk: [],
    propertyType: []
  });
  
  const [newItem, setNewItem] = useState('');
  const [activeCategory, setActiveCategory] = useState('localities');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [optionsRes, suggestionsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/filter-options`),
        fetch(`${import.meta.env.VITE_API_URL}/filter-options/suggestions`)
      ]);
      
      const optionsData = await optionsRes.json();
      const suggestionsData = await suggestionsRes.json();
      
      if (optionsData.success) {
        setFilterOptions({
          localities: optionsData.data.localities || [],
          cities: optionsData.data.cities || [],
          states: optionsData.data.states || [],
          bhk: optionsData.data.bhk || [],
          possession: optionsData.data.possession || [],
          propertyType: optionsData.data.propertyType || [],
          sortBy: optionsData.data.sortBy || [],
          useManualOverride: optionsData.data.isManualOverride || false
        });
      }
      
      if (suggestionsData.success) {
        setSuggestions(suggestionsData.data);
      }
      
    } catch (error) {
      console.error('Failed to fetch data:', error);
      showMessage('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const handleAddItem = () => {
    const value = newItem.trim();
    if (!value) return;
    
    if (filterOptions[activeCategory].includes(value)) {
      showMessage('Item already exists!', 'error');
      return;
    }
    
    setFilterOptions(prev => ({
      ...prev,
      [activeCategory]: [...prev[activeCategory], value]
    }));
    
    setNewItem('');
  };

  const handleRemoveItem = (category, index) => {
    setFilterOptions(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));
  };

  const handleAddSuggestion = (category, value) => {
    if (filterOptions[category].includes(value)) {
      showMessage('Already added!', 'error');
      return;
    }
    
    setFilterOptions(prev => ({
      ...prev,
      [category]: [...prev[category], value]
    }));
    
    showMessage(`Added "${value}"`, 'success');
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/filter-options`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...filterOptions,
          useManualOverride: true
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        showMessage('✅ Filters saved successfully!', 'success');
        setFilterOptions(prev => ({ ...prev, useManualOverride: true }));
      } else {
        showMessage('Failed to save filters', 'error');
      }
      
    } catch (error) {
      console.error('Save error:', error);
      showMessage('Error saving filters', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleResetToAuto = async () => {
    if (!confirm('Reset to auto-generated filters? Your manual changes will be lost.')) return;
    
    try {
      setSaving(true);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/filter-options`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.success) {
        showMessage('✅ Reset to auto-generated filters', 'success');
        await fetchData(); // Reload data
      }
      
    } catch (error) {
      console.error('Reset error:', error);
      showMessage('Error resetting filters', 'error');
    } finally {
      setSaving(false);
    }
  };

  const categories = [
    { key: 'localities', label: 'Localities' },
    { key: 'cities', label: 'Cities' },
    { key: 'states', label: 'States' },
    { key: 'bhk', label: 'BHK Types' },
    { key: 'propertyType', label: 'Property Types' },
    { key: 'possession', label: 'Possession' },
    { key: 'sortBy', label: 'Sort Options' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading filters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Filter Management
              </h1>
              <p className="text-gray-600">
                {filterOptions.useManualOverride ? (
                  <span className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded">MANUAL MODE</span>
                    You're using custom filters
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles size={16} className="text-green-600" />
                    Using auto-generated filters from projects
                  </span>
                )}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleResetToAuto}
                disabled={saving || !filterOptions.useManualOverride}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <RefreshCw size={18} />
                Reset to Auto
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                <Save size={18} />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message.text}
          </div>
        )}

        {/* Category Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeCategory === cat.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {cat.label} ({filterOptions[cat.key].length})
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Current {categories.find(c => c.key === activeCategory)?.label}
              </h2>
              
              {/* Add New Item */}
              <div className="mb-6 flex gap-2">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                  placeholder={`Add new ${activeCategory}...`}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleAddItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {filterOptions[activeCategory].length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No items yet. Add one above or use suggestions →
                  </p>
                ) : (
                  filterOptions[activeCategory].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <span className="text-gray-800 font-medium">{item}</span>
                      <button
                        onClick={() => handleRemoveItem(activeCategory, index)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Suggestions from Database */}
          <div>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-sm border border-green-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={20} className="text-green-600" />
                <h2 className="text-xl font-bold text-gray-800">
                  Suggestions
                </h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Found in your projects database:
              </p>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {suggestions[activeCategory]?.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">
                    No suggestions available
                  </p>
                ) : (
                  suggestions[activeCategory]?.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleAddSuggestion(activeCategory, item)}
                      disabled={filterOptions[activeCategory].includes(item)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        filterOptions[activeCategory].includes(item)
                          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                          : 'bg-white text-gray-800 border-green-300 hover:bg-green-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item}</span>
                        {filterOptions[activeCategory].includes(item) ? (
                          <span className="text-xs text-gray-500">Added ✓</span>
                        ) : (
                          <Plus size={16} className="text-green-600" />
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFilterManagement;