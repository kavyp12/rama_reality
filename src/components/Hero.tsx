import React, { useState, useRef, useEffect } from 'react';
import {
  MapPin,
  Search,
  ChevronDown,
  SlidersHorizontal,
  Home,
  Building,
  ArrowLeft,
  X,
  Plus,
  Check,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const PRIMARY = '#4299E1';
const SECONDARY = '#F56565';

// --- CUSTOM HOOK ---
function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      // Delay the handler to ensure onClick inside runs first
      setTimeout(() => handler(event), 100);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

// ... (BudgetPopup component remains the same) ...
// --- BUDGET POPUP COMPONENT ---
const BudgetPopup = ({
  onClose,
  minBudget,
  setMinBudget,
  maxBudget,
  setMaxBudget,
}) => {
  const popupRef = useRef(null);
  useClickOutside(popupRef, onClose);

  return (
    <div
      ref={popupRef}
      className="absolute top-full left-0 mt-2 z-30 w-72 rounded-lg border bg-white p-4 shadow-xl"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <select
            value={minBudget}
            onChange={(e) => setMinBudget(e.target.value)}
            className="h-full w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Min</option>
            <option value="50">₹50L</option>
            <option value="75">₹75L</option>
            <option value="100">₹1Cr</option>
            <option value="150">₹1.5Cr</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
        <span className="text-gray-500">—</span>
        <div className="relative flex-1">
          <select
            value={maxBudget}
            onChange={(e) => setMaxBudget(e.target.value)}
            className="h-full w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Max</option>
            <option value="75">₹75L</option>
            <option value="100">₹1Cr</option>
            <option value="150">₹1.5Cr</option>
            <option value="200">₹2Cr</option>
            <option value="300">₹3Cr+</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>
      <button
        onClick={() => {
          setMinBudget('');
          setMaxBudget('');
        }}
        className="mt-3 text-sm font-medium text-gray-600 hover:text-blue-500"
      >
        Clear All
      </button>
    </div>
  );
};

// ... (FullFiltersModal component remains the same) ...
// --- FULL FILTERS MODAL ---
const FullFiltersModal = ({
  isOpen,
  onClose,
  city,
  setCity,
  search,
  setSearch,
  selectedBhk,
  setSelectedBhk,
  minBudget,
  setMinBudget,
  maxBudget,
  setMaxBudget,
  cityOptions,
  bhkOptions,
  propertyType,
  setPropertyType,
  possession,
  setPossession,
  propertyTypeOptions, // Add this prop

}) => {
  if (!isOpen) return null;

  const FilterButton = ({ children, isActive, ...props }) => (
    <button
      className={`flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium text-gray-700 transition-all ${
        isActive
          ? 'border-blue-500 bg-blue-50 text-blue-600'
          : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600'
      }`}
      {...props}
    >
      {isActive ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      <span>{children}</span>
    </button>
  );

  const handleClearAll = () => {
    setCity('Ahmedabad');
    setSearch('');
    setSelectedBhk('');
    setMinBudget('');
    setMaxBudget('');
    setPropertyType([]);
    setPossession([]);
    onClose();
  };
  
  const handlePropertyTypeClick = (type: string) => {
    setPropertyType((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handlePossessionClick = (type: string) => {
    setPossession((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex h-full w-full">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
      <div className="relative flex h-full w-full max-w-md flex-col overflow-y-auto bg-white shadow-xl ml-auto">
        <div className="flex items-center justify-between border-b p-4 sticky top-0 bg-white z-10">
          <button onClick={onClose} className="p-1 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button onClick={onClose} className="p-1 text-gray-600 hover:text-gray-900">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-4">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-800">
              Search City
            </label>
            <div className="flex gap-2">
              {cityOptions.map((cityName) => (
                <button
                  key={cityName}
                  onClick={() => setCity(cityName)}
                  className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium ${
                    city === cityName
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {cityName}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-800">
              Search Locality / Project / Builder
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Locality / Project / Builder"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-3 text-sm"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800">
                Property Type
              </label>
              <button 
                onClick={() => setPropertyType([])}
                className="text-sm font-medium text-gray-500 hover:text-blue-500"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* Replace hardcoded buttons with dynamic mapping */}
              {propertyTypeOptions.map((type) => (
                <FilterButton
                  key={type}
                  onClick={() => handlePropertyTypeClick(type)}
                  isActive={propertyType.includes(type)}
                >
                  {type}
                </FilterButton>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800">
                BHK
              </label>
              <button 
                onClick={() => setSelectedBhk('')}
                className="text-sm font-medium text-gray-500 hover:text-blue-500"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {bhkOptions.map((bhk) => (
                <FilterButton
                  key={bhk}
                  onClick={() => setSelectedBhk(bhk)}
                  isActive={selectedBhk === bhk}
                >
                  {bhk}
                </FilterButton>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800">
                Budget
              </label>
              <button 
                onClick={() => { setMinBudget(''); setMaxBudget(''); }}
                className="text-sm font-medium text-gray-500 hover:text-blue-500"
              >
                Clear All
              </button>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="relative flex-1">
                <select 
                  value={minBudget}
                  onChange={(e) => setMinBudget(e.target.value)}
                  className="h-full w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">Min</option>
                  <option value="50">₹50L</option>
                  <option value="75">₹75L</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
              <span className="text-gray-500">—</span>
              <div className="relative flex-1">
                <select 
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                  className="h-full w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">Max</option>
                  <option value="100">₹1Cr</option>
                  <option value="150">₹1.5Cr</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800">
                Possession
              </label>
              <button 
                onClick={() => setPossession([])}
                className="text-sm font-medium text-gray-500 hover:text-blue-500"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterButton 
                onClick={() => handlePossessionClick('Ready to Move')}
                isActive={possession.includes('Ready to Move')}
              >
                Ready to Move
              </FilterButton>
              <FilterButton 
                onClick={() => handlePossessionClick('Upto 1 Year')}
                isActive={possession.includes('Upto 1 Year')}
              >
                Upto 1 Year
              </FilterButton>
              <FilterButton 
                onClick={() => handlePossessionClick('Upto 2 Years')}
                isActive={possession.includes('Upto 2 Years')}
              >
                Upto 2 Years
              </FilterButton>
              <FilterButton 
                onClick={() => handlePossessionClick('2+ Years')}
                isActive={possession.includes('2+ Years')}
              >
                2+ Years
              </FilterButton>
            </div>
          </div>
        </div>

        <div className="flex gap-3 border-t p-4 sticky bottom-0 bg-white z-10">
          <button
            onClick={handleClearAll}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-bold text-gray-800 shadow-sm hover:bg-gray-50"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-900 bg-gray-900 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-gray-800"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN HEROSECTION COMPONENT ---
const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('residential');
  const [mobileActiveTab, setMobileActiveTab] = useState('residential');
  
  const [showFullFilters, setShowFullFilters] = useState(false);
  const [showBudgetPopup, setShowBudgetPopup] = useState(false);

  const [city, setCity] = useState('Ahmedabad');
  const [search, setSearch] = useState('');
  const [selectedBhk, setSelectedBhk] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [propertyType, setPropertyType] = useState<string[]>([]);
  const [possession, setPossession] = useState<string[]>([]);
  
  // These two states were already here
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [filterOptions, setFilterOptions] = useState({
  cities: ['Ahmedabad', 'Gandhinagar'],
  bhk: ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK'],
  propertyType: [], // Add this line
});

  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchWrapperRef = useRef(null);
  const navigate = useNavigate();

  useClickOutside(searchWrapperRef, () => {
    setShowSuggestions(false);
  });
  
  // 👇 ADDED: The scroll-handling logic
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY && y > 100) { // If scrolling down AND past 100px
        setIsNavbarVisible(false);
      } else if (y < lastScrollY) { // If scrolling up
        setIsNavbarVisible(true);
      }
      setLastScrollY(y);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]); // Dependency is correct


  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setAllProjects(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch projects for suggestions:", err);
      }
    };
    fetchAllProjects();
  }, []);

  useEffect(() => {
  const fetchFilterOptions = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/filter-options`);
      const data = await response.json();
      
      if (data.success) {
        setFilterOptions({
          cities: data.data.cities || ['Ahmedabad', 'Gandhinagar'],
          bhk: data.data.bhk || ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK'],
          propertyType: data.data.propertyType || [], // Add this line
        });
      } else {
        console.error('Failed to load filter options:', data.error);
      }
    } catch (err) {
      console.error('Error fetching filter options:', err);
    }
  };

  fetchFilterOptions();
}, []);


useEffect(() => {
  const fetchProjectsForPropertyTypes = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        // Extract unique property types
        const types = new Set<string>();
        data.data.forEach((project: any) => {
          const rawType = project.overview?.propertyType;
          if (rawType) {
            // Standardize to Title Case (e.g., "flat" -> "Flat")
            const standardizedType = rawType.charAt(0).toUpperCase() + rawType.slice(1).toLowerCase();
            types.add(standardizedType);
          }
        });
        
        // Update filterOptions with dynamic property types
        setFilterOptions(prevOptions => ({
          ...prevOptions,
          propertyType: Array.from(types).sort()
        }));
      }
    } catch (err) {
      console.error("Failed to fetch projects for property types:", err);
    }
  };
  
  fetchProjectsForPropertyTypes();
}, []);


// Replace the handleSearch function in Hero.tsx with this:

const handleSearch = () => {
  const params = new URLSearchParams();
  
  // Use 'q' for search query (matching old working code)
  if (search) params.set('q', search);
  
  // Send full BHK format (e.g., "2 BHK")
  if (selectedBhk) params.set('bhk', selectedBhk);
  
  // Send budget values
  if (minBudget) params.set('minBudget', minBudget);
  if (maxBudget) params.set('maxBudget', maxBudget);

  // Send property type
  if (propertyType.length > 0) {
    params.set('propertyType', propertyType.join(','));
  }
  
  // Send possession
  if (possession.length > 0) {
    params.set('possession', possession.join(','));
  }
  
  // Navigate to /properties/all with query params
    navigate(`/Properties?${params.toString()}`);
};
  
  const getBudgetLabel = () => {
    if (minBudget && maxBudget) return `₹${minBudget}L - ₹${maxBudget}L`;
    if (minBudget) return `Min ₹${minBudget}L`;
    if (maxBudget) return `Max ₹${maxBudget}L`;
    return 'Select Budget';
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length > 1) {
      const lowerCaseValue = value.toLowerCase();
      const suggestionSet = new Set<string>();

      allProjects.forEach(project => {
        // Add matching project names
        if (project.name.toLowerCase().includes(lowerCaseValue)) {
          suggestionSet.add(project.name);
        }
        // Add matching developers
        if (project.developer.toLowerCase().includes(lowerCaseValue)) {
          suggestionSet.add(project.developer);
        }
        // Add matching localities (area)
        if (project.area && project.area.toLowerCase().includes(lowerCaseValue)) {
          suggestionSet.add(project.area);
        }
      });

      const newSuggestions = Array.from(suggestionSet).slice(0, 7);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearch(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <>
      {/* This Navbar instance is now controlled by the useEffect above */}
      <Navbar isVisible={isNavbarVisible} />
      
      <div className="w-full bg-white pt-[72px]">
        <div className="container mx-auto max-w-screen-2xl px-2">
          {/* DESKTOP HERO */}
          <div className="hidden lg:block">
            <div
              className="relative overflow-hidden rounded-3xl bg-cover bg-center shadow-xl"
              style={{
                backgroundImage: "url('./heropage.jpg')",
                minHeight: '650px',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/25 via-black/10 to-black/25"></div>

              <div className="relative z-10 flex h-full min-h-[650px] flex-col items-center justify-center px-4 py-12 lg:px-10">
                <div className="mb-6 text-center">
                  <h1 className="text-3xl font-bold text-white drop-shadow-lg lg:text-5xl">
                    Real homes live here
                  </h1>
                  <p className="mt-2 text-base lg:text-xl text-white/95 drop-shadow">
                    Real Data. Real Brokers. Real Properties in Ahmedabad.
                  </p>
                </div>

                <div className="w-full max-w-sm mx-auto mb-5">
                  <div className="flex gap-2 rounded-xl bg-white/95 p-1.5 shadow-lg backdrop-blur-sm border border-white/40">
                    <button
                      onClick={() => setActiveTab('residential')}
                      className={`
                        flex-1 flex items-center justify-center gap-1.5 
                        rounded-lg px-3 py-2 text-sm font-bold transition-all
                        ${
                          activeTab === 'residential'
                            ? 'bg-white text-blue-500 shadow-md'
                            : 'text-gray-500 hover:bg-blue-50 hover:text-blue-500'
                        }
                      `}
                    >
                      <Home className="h-4 w-4" />
                      Residential
                    </button>

                    <button
                      onClick={() => setActiveTab('commercial')}
                      className={`
                        flex-1 flex items-center justify-center gap-1.5 
                        rounded-lg px-3 py-2 text-sm font-bold transition-all
                        ${
                          activeTab === 'commercial'
                            ? 'bg-white text-blue-500 shadow-md'
                            : 'text-gray-500 hover:bg-blue-50 hover:text-blue-500'
                        }
                      `}
                    >
                      <Building className="h-4 w-4" />
                      Commercial
                    </button>
                  </div>
                </div>

                <div className="w-full max-w-5xl">
                  <div className="rounded-xl bg-white shadow-xl">
                    <div className="p-6">
                      {activeTab === 'residential' && (
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
                          <div className="relative flex-1">
                            <select 
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              className="h-full w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-3.5 text-sm font-medium text-gray-700 hover:border-gray-400 focus:ring-2 focus:ring-blue-300"
                            >
                              <option value="">Select City</option>
                              {filterOptions.cities.map((cityName) => (
                                <option key={cityName} value={cityName}>
                                  {cityName}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                          </div>

                          <div className="relative flex-[2.5]" ref={searchWrapperRef}>
                            <MapPin
                              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                              style={{ color: PRIMARY }}
                            />
                            <input
                              type="text"
                              placeholder="Search By Area, Project or Builder"
                              value={search}
                              onChange={handleSearchChange}
                              onFocus={() => setShowSuggestions(suggestions.length > 0)}
                              className="h-full w-full rounded-lg border border-gray-300 py-3.5 pl-10 pr-3 text-sm font-medium text-gray-900"
                              autoComplete="off"
                            />
                            {showSuggestions && (
                              <div className="absolute top-full left-0 right-0 z-10 mt-1 max-h-60 overflow-y-auto rounded-lg border bg-white shadow-lg">
                                {suggestions.map((suggestion, index) => (
                                  <div
                                    key={index}
                                    onMouseDown={() => handleSuggestionClick(suggestion)}
                                    className="cursor-pointer px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                                  >
                                    {suggestion}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="relative flex-1">
                            <select 
                              value={selectedBhk}
                              onChange={(e) => setSelectedBhk(e.target.value)}
                              className="h-full w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-3.5 text-sm font-medium text-gray-700 hover:border-gray-400 focus:ring-2 focus:ring-blue-300"
                            >
                              <option value="">Select BHK</option>
                              {filterOptions.bhk.map((bhkName) => (
                                <option key={bhkName} value={bhkName}>
                                  {bhkName}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                          </div>

                          <div className="relative flex-1">
                            <button
                              type="button"
                              onClick={() => setShowBudgetPopup(!showBudgetPopup)}
                              className="h-full w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-3.5 text-left text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                              {getBudgetLabel()}
                            </button>
                            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
                            
                            {showBudgetPopup && (
                              <BudgetPopup 
                                onClose={() => setShowBudgetPopup(false)} 
                                minBudget={minBudget}
                                setMinBudget={setMinBudget}
                                maxBudget={maxBudget}
                                setMaxBudget={setMaxBudget}
                              />
                            )}
                          </div>

                          <button
                            onClick={() => setShowFullFilters(true)}
                            className="flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm font-bold text-white shadow-md hover:opacity-90"
                            style={{ backgroundColor: SECONDARY }}
                          >
                            <SlidersHorizontal className="h-4 w-4" />
                            Filter
                          </button>

                          <button
                            onClick={handleSearch}
                            className="flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-bold text-white shadow-md hover:opacity-90"
                            style={{ backgroundColor: PRIMARY }}
                          >
                            <Search className="h-4 w-4" />
                            Search
                          </button>
                        </div>
                      )}

                      {activeTab === 'commercial' && (
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
                           <p className='p-4 text-center text-gray-600 flex-1'>Commercial filters not yet wired up.</p>
                        </div>
                      )}

                      <div className="mt-5 flex flex-wrap items-center gap-2 pt-5 border-t border-gray-100">
                        <span className="text-xs font-semibold text-gray-500">
                          Popular:
                        </span>
                        {['Apartments', '2 BHK', '3 BHK', 'Villas'].map(
                          (link) => (
                            <a
                              key={link}
                              href="#"
                              className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100"
                            >
                              {link}
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE HERO */}
          <div className="block lg:hidden">
            <div className="relative w-full h-[450px] overflow-hidden rounded-xl">
              <img
                src="./heropage.jpg"
                alt="Real homes"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent"></div>
              <div className="absolute top-1/3 left-0 right-0 z-10 text-center px-4">
                <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                  Real homes live here
                </h1>
                <p className="mt-1 text-sm text-white/90 drop-shadow-sm">
                  Real Data. Real Brokers. Real Properties in Ahmedabad.
                </p>
              </div>
            </div>

            <div className="relative -mt-32 mx-4 rounded-2xl bg-white p-4 shadow-2xl z-20">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setMobileActiveTab('residential')}
                  className={`
                  rounded-md px-4 py-2 text-sm font-bold
                  ${
                    mobileActiveTab === 'residential'
                      ? 'text-white'
                      : 'bg-transparent text-gray-600'
                  }
                `}
                  style={
                    mobileActiveTab === 'residential'
                      ? { backgroundColor: PRIMARY }
                      : {}
                  }
                >
                  Residential
                </button>
                <button
                  onClick={() => setMobileActiveTab('commercial')}
                  className={`
                  rounded-md px-4 py-2 text-sm font-bold
                  ${
                    mobileActiveTab === 'commercial'
                      ? 'text-white'
                      : 'bg-transparent text-gray-600'
                  }
                `}
                  style={
                    mobileActiveTab === 'commercial'
                      ? { backgroundColor: PRIMARY }
                      : {}
                  }
                >
                  Commercial
                </button>
              </div>

              <div className="relative mt-4" ref={searchWrapperRef}>
                <MapPin
                  className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2"
                  style={{ color: PRIMARY }}
                />
                <input
                  type="text"
                  placeholder={
                    mobileActiveTab === 'residential'
                      ? 'Search By Area, Project or Builder'
                      : 'Search by Area or Project Name'
                  }
                  value={search}
                  onChange={handleSearchChange}
                  onFocus={() => setShowSuggestions(suggestions.length > 0)}
                  className="w-full rounded-lg border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-base placeholder-gray-500"
                  autoComplete="off"
                />
                {showSuggestions && (
                  <div className="absolute top-full left-0 right-0 z-10 mt-1 max-h-60 overflow-y-auto rounded-lg border bg-white shadow-lg">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        onMouseDown={() => handleSuggestionClick(suggestion)}
                        className="cursor-pointer px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setShowFullFilters(true)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3.5 text-sm font-bold text-white shadow-md hover:opacity-90"
                  style={{ backgroundColor: SECONDARY }}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter
                </button>

                <button
                  onClick={handleSearch}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3.5 text-sm font-bold text-white shadow-md hover:opacity-90"
                  style={{ backgroundColor: PRIMARY }}
                >
                  <Search className="h-4 w-4" />
                  Search
                </button>
              </div>
              
              <div className="mt-4 flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100">
                <span className="text-xs font-semibold text-gray-500">
                  Popular:
                </span>
                {['Apartments', '2 BHK', '3 BHK', 'Villas'].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-xs font-formatium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <FullFiltersModal 
        isOpen={showFullFilters} 
        onClose={() => setShowFullFilters(false)}
        city={city}
        setCity={setCity}
        search={search}
        setSearch={setSearch}
        selectedBhk={selectedBhk}
        setSelectedBhk={setSelectedBhk}
        minBudget={minBudget}
        setMinBudget={setMinBudget}
        maxBudget={maxBudget}
        setMaxBudget={setMaxBudget}
        propertyType={propertyType}
        setPropertyType={setPropertyType}
        possession={possession}
        setPossession={setPossession}
        cityOptions={filterOptions.cities}
        bhkOptions={filterOptions.bhk}
        propertyTypeOptions={filterOptions.propertyType} // Add this line

      />
    </>
  );
};

export default HeroSection;