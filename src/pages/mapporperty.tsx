// new code

import React, { useState, useEffect, useRef } from 'react';
import {
  BathIcon,
  BedIcon,
  HomeIcon,
  MailIcon,
  MapPinIcon,
  MessageCircleIcon,
  PhoneIcon,
  CheckCircleIcon,
  HeartIcon,
  SlidersHorizontal,
  ChevronUp,
  ChevronDown,
  X,
  Plus,
  ArrowLeft,
  Search,
  Check, // 👈 ADD THIS
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

// Property interface
interface Property {
  id: string;
  title: string;
  price: string; // Display price (e.g., "Price on Request" or "50 Lac")
  location: string;
  coordinates: { lat: number; lng: number };
  image: string;
  bedrooms: number;
  area: string;
  city: string;
  state: string;
  locality: string;
  developer: string;
  
  // --- Dynamic Data for Filtering ---
  propertyType: string;    // e.g., "Flat", "Villa"
  possessionMonths: number;  // 0 for "Ready to Move", 12 for "1 Year", etc.
  minPrice: number;          // Min price in Lacs
  maxPrice: number;          // Max price in Lacs
}

// -----------------------------------------------------------------
// 🚀 ADDED HELPER FUNCTIONS (from filters.tsx)
// -----------------------------------------------------------------

const parsePrice = (priceStr: string | null): number => {
    if (!priceStr || priceStr.toLowerCase().includes('request')) return 0;
    const cleanStr = priceStr.replace(/[₹,\s]/g, '').toLowerCase();
    const match = cleanStr.match(/(\d+\.?\d*)/);
    if (!match) return 0;
    const value = parseFloat(match[1]);
    if (cleanStr.includes('cr')) return value * 100;
    if (cleanStr.includes('lac') || cleanStr.includes('l')) return value;
    return value;
};

const getPriceRange = (priceStr: string | null): { min: number; max: number } => {
    if (!priceStr || priceStr.toLowerCase().includes('request')) return { min: 0, max: 0 };
    if (priceStr.includes(' - ')) {
        const [minStr, maxStr] = priceStr.split(' - ');
        return {
            min: parsePrice(minStr.trim()),
            max: parsePrice(maxStr.trim())
        };
    }
    const price = parsePrice(priceStr);
    return { min: price, max: price };
};

const getPossessionMonths = (project: any): number => {
    const possessionDate = project.overview?.possessionDate;
    
    if (!possessionDate) {
        const possessionLower = (project.possession || '').toLowerCase();
        if (possessionLower.includes('ready')) return 0;
        
        const monthNames = ['january', 'february', 'march', 'april', 'may', 'june',
                            'july', 'august', 'september', 'october', 'november', 'december'];
        for (let i = 0; i < monthNames.length; i++) {
            if (possessionLower.includes(monthNames[i])) {
                const yearMatch = project.possession.match(/\d{4}/);
                if (yearMatch) {
                    const year = parseInt(yearMatch[0]);
                    const currentDate = new Date();
                    const targetDate = new Date(year, i, 1);
                    const diffInMonths = (targetDate.getFullYear() - currentDate.getFullYear()) * 12 +
                                        (targetDate.getMonth() - currentDate.getMonth());
                    return Math.max(0, diffInMonths);
                }
            }
        }
        if (possessionLower.includes('1 year') || possessionLower.includes('within 1')) return 12;
        if (possessionLower.includes('2 year') || possessionLower.includes('within 2')) return 24;
        if (possessionLower.includes('launch')) return 36;
        return 36;
    }
    
    const dateLower = possessionDate.toLowerCase().trim();
    
    if (dateLower.includes('ready') || dateLower.includes('immediate')) {
        return 0;
    }
    
    const currentDate = new Date();
    let targetDate: Date | null = null;
    
    const monthNames = ['january', 'february', 'march', 'april', 'may', 'june',
                        'july', 'august', 'september', 'october', 'november', 'december'];
    const shortMonthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    
    for (let i = 0; i < monthNames.length; i++) {
        if (dateLower.includes(monthNames[i]) || dateLower.includes(shortMonthNames[i])) {
            const yearMatch = possessionDate.match(/\d{4}/);
            if (yearMatch) {
                const year = parseInt(yearMatch[0]);
                targetDate = new Date(year, i, 1);
                break;
            }
        }
    }
    
    if (!targetDate) {
        const parsedDate = new Date(possessionDate);
        if (!isNaN(parsedDate.getTime())) {
            targetDate = parsedDate;
        }
    }
    
    if (!targetDate) {
        const yearMatch = possessionDate.match(/\d{4}/);
        if (yearMatch) {
            const year = parseInt(yearMatch[0]);
            targetDate = new Date(year, 5, 1);
        }
    }
    
    if (targetDate && !isNaN(targetDate.getTime())) {
        const diffInMonths = (targetDate.getFullYear() - currentDate.getFullYear()) * 12 +
                            (targetDate.getMonth() - currentDate.getMonth());
        return Math.max(0, diffInMonths);
    }
    
    return 36;
};

// This function now checks the property object, not the filter string
const matchesPossession = (property: Property, possessionFilters: string[]): boolean => {
    if (possessionFilters.length === 0) return true;
    
    const projectPossessionMonths = property.possessionMonths;
    
    return possessionFilters.some(filter => {
        switch (filter) {
            case 'Ready to Move': 
                return projectPossessionMonths >= 0 && projectPossessionMonths <= 3;
            case 'Upto 1 Year': 
                return projectPossessionMonths > 3 && projectPossessionMonths <= 12;
            case 'Upto 2 Years': 
                return projectPossessionMonths > 12 && projectPossessionMonths <= 24;
            case '2+ Years': 
                return projectPossessionMonths > 24;
            default: 
                return false;
        }
    })
};

// -----------------------------------------------------------------
// 🚀 END HELPER FUNCTIONS
// -----------------------------------------------------------------


// Declare global types
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

// Custom hook for click outside
function useClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// Budget Popup Component
const BudgetPopup = ({
  onClose,
  minBudget,
  setMinBudget,
  maxBudget,
  setMaxBudget,
}: {
  onClose: () => void;
  minBudget: string;
  setMinBudget: (v: string) => void;
  maxBudget: string;
  setMaxBudget: (v: string) => void;
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
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
        <span className="text-gray-500">–</span>
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

// Full Filters Modal Component
const FullFiltersModal = ({
  isOpen,
  onClose,
  // --- Dynamic Options ---
  cityOptions,
  bhkOptions,
  propertyTypeOptions,
  possessionOptions,
  // --- State & Setters ---
  selectedCity,
  setSelectedCity,
  searchQuery,
  setSearchQuery,
  selectedBHK,
  setSelectedBHK,
  minBudget,
  setMinBudget,
  maxBudget,
  setMaxBudget,
  selectedPropertyType,
  setSelectedPropertyType,
  selectedPossession,
  setSelectedPossession,
}: {
  isOpen: boolean;
  onClose: () => void;
  // --- Dynamic Options ---
  cityOptions: string[];
  bhkOptions: string[];
  propertyTypeOptions: string[];
  possessionOptions: string[];
  // --- State & Setters ---
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedBHK: string;
  setSelectedBHK: (value: string) => void;
  minBudget: string;
  setMinBudget: (value: string) => void;
  maxBudget: string;
  setMaxBudget: (value: string) => void;
  selectedPropertyType: string[];
  setSelectedPropertyType: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPossession: string[];
  setSelectedPossession: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  if (!isOpen) return null;

  const FilterButton = ({ children, onClick, isActive }: { children: React.ReactNode; onClick: () => void; isActive?: boolean }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium transition-all ${
        isActive
          ? 'border-blue-500 bg-blue-50 text-blue-600'
          : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600'
      }`}
    >
      {isActive ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      <span>{children}</span>
    </button>
  );
  
  const handlePropertyTypeClick = (type: string) => {
    setSelectedPropertyType((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handlePossessionClick = (type: string) => {
    setSelectedPossession((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };
  
  const handleClearAll = () => {
    setSelectedCity('Ahmedabad');
    setSearchQuery('');
    setSelectedBHK('');
    setMinBudget('');
    setMaxBudget('');
    setSelectedPropertyType([]);
    setSelectedPossession([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center lg:p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
      
      {/* Responsive Modal Content */}
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
            <label className="text-sm font-semibold text-gray-800">Search City</label>
            <div className="flex gap-2">
              {/* 🚀 DYNAMIC CITIES */}
              {cityOptions.map((city) => (
                 <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium ${
                      selectedCity === city
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {city}
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-3 text-sm"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800">Property Type</label>
              <button 
                onClick={() => setSelectedPropertyType([])}
                className="text-sm font-medium text-gray-500 hover:text-blue-500"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* 🚀 DYNAMIC PROPERTY TYPES */}
              {propertyTypeOptions.map((type) => (
                <FilterButton
                  key={type}
                  onClick={() => handlePropertyTypeClick(type)}
                  isActive={selectedPropertyType.includes(type)}
                >
                  {type}
                </FilterButton>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800">BHK</label>
              <button
                onClick={() => setSelectedBHK('')}
                className="text-sm font-medium text-gray-500 hover:text-blue-500"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* 🚀 DYNAMIC BHK */}
              {bhkOptions.map((bhk) => (
                <FilterButton
                  key={bhk}
                  onClick={() => setSelectedBHK(bhk)}
                  isActive={selectedBHK === bhk}
                >
                  {bhk}
                </FilterButton>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800">Budget</label>
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
                  <option value="100">₹1Cr</option>
                  <option value="150">₹1.5Cr</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
              <span className="text-gray-500">–</span>
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
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800">Possession</label>
              <button 
                onClick={() => setSelectedPossession([])}
                className="text-sm font-medium text-gray-500 hover:text-blue-500"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* 🚀 DYNAMIC POSSESSION (options are static, logic is dynamic) */}
              {possessionOptions.map((possession) => (
                <FilterButton
                  key={possession}
                  onClick={() => handlePossessionClick(possession)}
                  isActive={selectedPossession.includes(possession)}
                >
                  {possession}
                </FilterButton>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 border-t p-4 sticky bottom-0 bg-white z-10">
          <button
            onClick={() => {
              handleClearAll();
              onClose();
            }}
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
// PropertyCardSmall Component - Compact Mobile Version
const PropertyCardSmall = ({
  property,
  isHighlighted,
  onClick,
}: {
  property: Property;
  isHighlighted: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex-shrink-0 w-72 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border cursor-pointer overflow-hidden flex flex-row ${
        isHighlighted ? 'border-blue-800 ring-2 ring-blue-100' : 'border-gray-100'
      }`}
    >
      {/* Left Image Block (Square) */}
      <div className="relative w-24 h-24 flex-shrink-0">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1 left-1 bg-white/90 backdrop-blur-sm text-blue-700 text-[10px] font-semibold py-0.5 px-1.5 rounded flex items-center gap-0.5">
          <CheckCircleIcon size={10} />
          Verified
        </div>
      </div>
      
      {/* Right Content Block (Maximum Compactness) */}
      <div className="flex-1 p-2 flex flex-col justify-start overflow-hidden"> {/* 👈 CHANGED: Reduced p-2.5 to p-2, used justify-start to remove bottom gap */}
        
        {/* Price - Reduced Size */}
        <h2 className="text-sm font-bold text-gray-900 leading-tight truncate">{property.price}</h2> {/* 👈 CHANGED: text-base to text-sm, added leading-tight */}
        
        {/* Title / Location - Reduced Size */}
        <p className="text-xs font-semibold text-gray-800 leading-tight truncate"> {/* 👈 CHANGED: text-sm to text-xs, added leading-tight */}
          {property.title}
        </p>
        <p className="text-xs text-gray-500 leading-tight truncate">{property.location}</p>
        
        {/* Property Type - Reduced Margin */}
        <p className="text-xs text-gray-500 leading-tight truncate mb-0.5">{property.propertyType}</p> {/* 👈 CHANGED: mb-1.5 to mb-0.5 */}

        {/* Icons - Tighter positioning */}
        <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-0.5"> {/* 👈 CHANGED: Added mt-0.5 to keep it close to text */}
          <div className="flex items-center gap-0.5">
            <BedIcon size={12} className="text-gray-500" />
            <span className="truncate">{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <BathIcon size={12} className="text-gray-500" />
            <span className="truncate">2</span>
          </div>
          <div className="flex items-center gap-0.5">
            <HomeIcon size={12} className="text-gray-500" />
            <span className="truncate">{property.area}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropertyCardLarge Component
const PropertyCardLarge = ({
  property,
  isHighlighted,
  onClick,
}: {
  property: Property;
  isHighlighted: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-row bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border cursor-pointer overflow-hidden ${
        isHighlighted ? 'border-blue-800 ring-2 ring-blue-100' : 'border-gray-100'
      }`}
    >
      <div className="relative w-2/5">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-semibold py-1 px-2.5 rounded-md flex items-center gap-1">
          <CheckCircleIcon size={12} />
          Verified
        </div>
        <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-lg hover:bg-white transition-colors">
          <HeartIcon size={18} className="text-gray-800" />
        </button>
      </div>
      <div className="w-3/5 p-4 flex flex-col">
        <div className="flex items-baseline gap-2 mb-1">
          <h2 className="text-xl font-bold text-gray-900">{property.price}</h2>
          {/* <span className="text-sm text-gray-500">
            <span className="line">{property.price}</span> Onwards
          </span> */}
        </div>
        <p className="text-sm text-gray-600 mb-3">{property.propertyType}</p>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <BedIcon size={16} className="text-gray-500" />
            <span>{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center gap-1">
            <BathIcon size={16} className="text-gray-500" />
            <span>2 bath</span>
          </div>
          <div className="flex items-center gap-1">
            <HomeIcon size={16} className="text-gray-500" />
            <span>{property.area}</span>
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 hover:text-blue-800 transition-colors mb-2 line-clamp-1">
          {property.title}
        </h2>
        <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
          <MapPinIcon size={14} />
          <span className="truncate">{property.location}</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 text-blue-800 transition-colors">
              <MailIcon size={16} />
            </button>
            <button className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 text-blue-800 transition-colors">
              <PhoneIcon size={16} />
            </button>
            <button className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 transition-colors">
              <MessageCircleIcon size={16} />
            </button>
          </div>
          <div className="text-xs font-bold text-gray-700 uppercase tracking-wide">
            {property.developer}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main PropertyMap Component
export default function PropertyMap() {
  // ✨ NEW STATE ✨
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 👇 UPDATED STATE to start empty
  const [visibleProperties, setVisibleProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const navigate = useNavigate(); 
  
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [mapType, setMapType] = useState<string>('roadmap');
  const [isMapReady, setIsMapReady] = useState(false);

  // 🚀 NEW DYNAMIC FILTER OPTIONS STATE
  const [filterOptions, setFilterOptions] = useState({
      cities: ['Ahmedabad', 'Gandhinagar'],
      bhk: ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK'],
      propertyType: ['Flat', 'Villa', 'Penthouse'],
      possession: ['Ready to Move', 'Upto 1 Year', 'Upto 2 Years', '2+ Years'],
  });

  // 🚀 NEW FILTER STATE (mirrors Hero.tsx)
  const [selectedCity, setSelectedCity] = useState<string>('Ahmedabad');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBHK, setSelectedBHK] = useState<string>('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState<string[]>([]);
  const [selectedPossession, setSelectedPossession] = useState<string[]>([]);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  const [showBudgetPopup, setShowBudgetPopup] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const searchWrapperRef = useRef(null);

  const mapRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const infoWindowRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useClickOutside(searchWrapperRef, () => {
    setShowSearchSuggestions(false);
  });

  // ✨ UPDATED useEffect to fetch properties AND set filters ✨
  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          // Transform database data to match the map's 'Property' interface
          const transformedProperties: Property[] = data.data.map((dbProject: any) => {
            
            let coords = { lat: 23.0225, lng: 72.5714 }; // Default
            if (dbProject.locationData?.coordinates) {
              const [lat, lng] = dbProject.locationData.coordinates.split(',').map(Number);
              if (!isNaN(lat) && !isNaN(lng)) {
                coords = { lat, lng };
              }
            }

            let bedrooms = 0;
            if (dbProject.bhk) { 
                bedrooms = parseInt(dbProject.bhk) || 0;
            } else if (dbProject.configurations?.length > 0) {
                const bhkMatch = (dbProject.configurations[0].type || '').match(/(\d+)\s*BHK/);
                if (bhkMatch && bhkMatch[1]) {
                  bedrooms = parseInt(bhkMatch[1]);
                }
            }

            let area = dbProject.overview?.totalArea || 'N/A';
            if (area === 'N/A' && dbProject.configurations?.length > 0) {
              area = dbProject.configurations[0].area || 'N/A';
            }
            
            // Get Price Range
            const priceRanges = (dbProject.configurations || []).map((config: any) => getPriceRange(config.price)).filter((p: any) => p.min > 0);
            const minPrice = priceRanges.length ? Math.min(...priceRanges.map((r: any) => r.min)) : 0;
            const maxPrice = priceRanges.length ? Math.max(...priceRanges.map((r: any) => r.max)) : 0;
            
            // Standardize Property Type
            const rawType = dbProject.overview?.propertyType;
            const propertyType = rawType ? (rawType.charAt(0).toUpperCase() + rawType.slice(1).toLowerCase()) : 'N/A';

            return {
              id: dbProject._id,
              title: dbProject.name,
              price: dbProject.configurations?.[0]?.price || dbProject.status || 'Price on request',
              location: `${dbProject.area}, ${dbProject.city}`,
              coordinates: coords,
              image: dbProject.image,
              bedrooms: bedrooms,
              area: area,
              city: dbProject.city,
              state: dbProject.state,
              locality: dbProject.area,
              developer: dbProject.developer,
              
              // Dynamic filter data
              propertyType: propertyType,
              possessionMonths: getPossessionMonths(dbProject),
              minPrice: minPrice,
              maxPrice: maxPrice,
            };
          });
          
          setAllProperties(transformedProperties);
          setFilteredProperties(transformedProperties);
          
          // 🚀 SET DYNAMIC FILTER OPTIONS
          const cities = new Set<string>();
          const bhks = new Set<number>();
          const types = new Set<string>();

          transformedProperties.forEach(p => {
            if (p.city) cities.add(p.city);
            if (p.bedrooms > 0) bhks.add(p.bedrooms);
            if (p.propertyType !== 'N/A') types.add(p.propertyType);
          });

          setFilterOptions({
            cities: Array.from(cities).sort(),
            bhk: Array.from(bhks).sort((a, b) => a - b).map(b => `${b} BHK`),
            propertyType: Array.from(types).sort(),
            possession: ['Ready to Move', 'Upto 1 Year', 'Upto 2 Years', '2+ Years']
          });

        } else {
          console.error('Failed to fetch properties:', data.error);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []); // Empty array means this runs once when the component mounts


  // 👇 UPDATED: This useEffect now filters 'allProperties'
  useEffect(() => {
    let filtered = allProperties;

    // City
    if (selectedCity) {
      filtered = filtered.filter((p) => p.city === selectedCity);
    }
    
    // Search
    if (searchQuery) {
        const lowerSearch = searchQuery.toLowerCase();
        filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(lowerSearch) ||
            p.locality.toLowerCase().includes(lowerSearch) ||
            p.developer.toLowerCase().includes(lowerSearch)
        );
    }

    // BHK
    if (selectedBHK) {
      const bhkNum = parseInt(selectedBHK); // "3 BHK" -> 3
      filtered = filtered.filter((p) => p.bedrooms === bhkNum);
    }
    
    // Budget
    if (minBudget || maxBudget) {
        const min = minBudget ? parseFloat(minBudget) : 0;
        const max = maxBudget ? parseFloat(maxBudget) : Infinity;
        
        filtered = filtered.filter(p => {
            if (p.maxPrice === 0 && p.minPrice === 0) return false; // No price data
            // Property has a single price point
            if (p.minPrice === p.maxPrice) {
                return p.minPrice >= min && p.minPrice <= max;
            }
            // Property has a price range, check for overlap
            return !(max < p.minPrice || min > p.maxPrice);
        });
    }
    
    // Property Type
    if (selectedPropertyType.length > 0) {
        filtered = filtered.filter(p => selectedPropertyType.includes(p.propertyType));
    }
    
    // Possession
    if (selectedPossession.length > 0) {
        filtered = filtered.filter(p => matchesPossession(p, selectedPossession));
    }

    setFilteredProperties(filtered);
    // Note: updateVisiblePropertiesOnMapMove will be called by the map's 'idle' listener
    // We can call it here too to prime the list
    updateVisiblePropertiesOnMapMove(filtered);
    
  }, [selectedCity, searchQuery, selectedBHK, minBudget, maxBudget, selectedPropertyType, selectedPossession, allProperties]);

  const updateVisiblePropertiesOnMapMove = (sourceProperties: Property[]) => {
    if (mapRef.current && window.google) {
      const bounds = mapRef.current.getBounds();
      if (bounds) {
        const visible = sourceProperties.filter((property) =>
          bounds.contains(property.coordinates)
        );
        setVisibleProperties(visible);
      } else {
        setVisibleProperties(sourceProperties);
      }
    } else {
      setVisibleProperties(sourceProperties);
    }
  };
  
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 1) {
      const lowerCaseValue = value.toLowerCase();
      const suggestionSet = new Set<string>();

      allProperties.forEach(project => {
        if (project.title.toLowerCase().includes(lowerCaseValue)) {
          suggestionSet.add(project.title);
        }
        if (project.developer.toLowerCase().includes(lowerCaseValue)) {
          suggestionSet.add(project.developer);
        }
        if (project.locality && project.locality.toLowerCase().includes(lowerCaseValue)) {
          suggestionSet.add(project.locality);
        }
      });

      const newSuggestions = Array.from(suggestionSet).slice(0, 7);
      setSuggestions(newSuggestions);
      setShowSearchSuggestions(newSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSearchSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    setShowSearchSuggestions(false);
  };

  useEffect(() => {
    window.initMap = () => {
      setIsMapReady(true);
    };

    const script = document.createElement('script');
    script.src =
      'https://cdn.jsdelivr.net/gh/somanchiu/Keyless-Google-Maps-API@v7.1/mapsJavaScriptAPI.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (!isMapReady || !mapContainerRef.current || !window.google) return;

    const isMobile = window.innerWidth < 1024;
    
    const map = new window.google.maps.Map(mapContainerRef.current, {
      center: { lat: 23.0225, lng: 72.5714 },
      zoom: 12,
      mapTypeId: mapType,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.LEFT_TOP,
      },
      fullscreenControlOptions: {
        position: window.google.maps.ControlPosition.LEFT_TOP,
      },
      gestureHandling: isMobile ? 'greedy' : 'auto',
    });

    mapRef.current = map;
    infoWindowRef.current = new window.google.maps.InfoWindow();

    window.google.maps.event.addListener(map, 'click', (event: any) => {
      if (event.latLng) {
        map.setZoom(16);
        map.panTo(event.latLng);
      }
    });

    const boundsListener = () => {
      updateVisiblePropertiesOnMapMove(filteredProperties);
    };
    // window.google.maps.event.addListener(map, 'bounds_changed', boundsListener);
    window.google.maps.event.addListener(map, 'idle', boundsListener);

    setTimeout(() => updateVisiblePropertiesOnMapMove(filteredProperties), 500);
  }, [isMapReady, filteredProperties]); // Add filteredProperties dependency

  useEffect(() => {
    if (!mapRef.current || !window.google) return;

    Object.values(markersRef.current).forEach((marker: any) => marker.setMap(null));
    markersRef.current = {};

    filteredProperties.forEach((property) => {
      const isSelected = property.id === selectedPropertyId;
      const markerColor = isSelected ? '#F56565' : '#4299E1';
      const pinSVG = `
        <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0C11.716 0 5 6.716 5 15c0 8.284 15 35 15 35s15-26.716 15-35c0-8.284-6.716-15-15-15z" 
                fill="${markerColor}"/>
          <circle cx="20" cy="15" r="8" fill="white"/>
          <text x="20" y="20" font-size="14" font-weight="bold" fill="${markerColor}" text-anchor="middle">₹</text>
        </svg>
      `;

      const marker = new window.google.maps.Marker({
        position: property.coordinates,
        map: mapRef.current,
        title: property.title,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(pinSVG),
          scaledSize: new window.google.maps.Size(40, 50),
          anchor: new window.google.maps.Point(20, 50),
        },
        animation: window.google.maps.Animation.DROP,
      });

      marker.addListener('click', () => {
        handleMarkerClick(property);
      });

      markersRef.current[property.id] = marker;
    });
}, [filteredProperties, isMapReady]); // REMOVE selectedPropertyId dependency
  useEffect(() => {
    if (mapRef.current && window.google) {
      mapRef.current.setMapTypeId(mapType);
    }
  }, [mapType]);
  const handleMarkerClick = (property: Property) => {
  setSelectedPropertyId(property.id);

  // Zoom and pan to marker
  if (mapRef.current) {
    mapRef.current.setZoom(16);
    mapRef.current.panTo(property.coordinates);
  }

  // Update all marker icons immediately
  Object.entries(markersRef.current).forEach(([id, marker]) => {
    const isSelected = id === property.id;
    const markerColor = isSelected ? '#F56565' : '#4299E1';
    const pinSVG = `
      <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 0C11.716 0 5 6.716 5 15c0 8.284 15 35 15 35s15-26.716 15-35c0-8.284-6.716-15-15-15z" 
              fill="${markerColor}"/>
        <circle cx="20" cy="15" r="8" fill="white"/>
        <text x="20" y="20" font-size="${
          isSelected ? '16' : '14'
        }" font-weight="bold" fill="${markerColor}" text-anchor="middle">₹</text>
      </svg>
    `;
    marker.setIcon({
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(pinSVG),
      scaledSize: new window.google.maps.Size(isSelected ? 45 : 40, isSelected ? 56 : 50),
      anchor: new window.google.maps.Point(isSelected ? 22.5 : 20, isSelected ? 56 : 50),
    });
  });

  // Show info window
  if (infoWindowRef.current && markersRef.current[property.id]) {
    const content = `
      <div style="width: 240px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <img src="${property.image}" alt="${property.title}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 6px; margin-bottom: 8px;" />
        <h3 style="font-weight: 600; font-size: 15px; margin: 0 0 4px 0; color: #1f2937; line-height: 1.3;">${property.title}</h3>
        <p style="font-size: 12px; color: #6b7280; margin: 0 0 8px 0;">${property.location}</p>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 16px; font-weight: 700; color: #4299E1;">${property.price}</span>
          <span style="font-size: 12px; color: #6b7280; font-weight: 500;">${property.bedrooms} BHK • ${property.area}</span>
        </div>
      </div>
    `;
    infoWindowRef.current.setContent(content);
    infoWindowRef.current.open(mapRef.current, markersRef.current[property.id]);
  }
};
const handlePropertyCardClick = (property: Property) => {
  // Helper function to create URL-friendly slugs
  const createSlug = (text: string | undefined | null) => {
    if (!text) return '';
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  // Create slugs for navigation
  const state = createSlug(property.state);
  const city = createSlug(property.city);
  const area = createSlug(property.locality);
  const name = createSlug(property.title);

  // Navigate to project page
  navigate(`/${state}/${city}/${area}/${name}`);
};
  const handleSearchClick = () => {
    // This function is just for the button.
    // The main filtering happens in the useEffect.
    // We can force a re-filter by re-setting the search query,
    // but it's not really necessary.
    console.log('Applying filters...');
  };
  
  const getBudgetLabel = () => {
    if (minBudget && maxBudget) return `₹${minBudget}L - ₹${maxBudget}L`;
    if (minBudget) return `Min ₹${minBudget}L`;
    if (maxBudget) return `Max ₹${maxBudget}L`;
    return 'Select Budget';
  };

  const renderCityFilter = (className: string = "min-w-[150px]") => (
    <select
      value={selectedCity}
      onChange={(e) => setSelectedCity(e.target.value)}
      className={`px-4 py-3 border-2 border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-white text-gray-700 hover:border-gray-400 ${className}`}
    >
      <option value="">All Cities</option>
      {/* 🚀 DYNAMIC CITIES */}
      {filterOptions.cities.map(city => (
        <option key={city} value={city}>{city}</option>
      ))}
    </select>
  );

  const renderBHKFilter = () => (
    <select
      value={selectedBHK}
      onChange={(e) => setSelectedBHK(e.target.value)}
      className="px-4 py-3 border-2 border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-white text-gray-700 hover:border-gray-400 min-w-[140px] flex-shrink-0"
    >
      <option value="">Select BHK</option>
      {/* 🚀 DYNAMIC BHKs */}
      {filterOptions.bhk.map(bhk => (
        <option key={bhk} value={bhk}>{bhk}</option>
      ))}
    </select>
  );

  const renderBudgetFilter = () => (
    <div className="relative min-w-[150px] flex-shrink-0">
      <button
        type="button"
        onClick={() => setShowBudgetPopup(!showBudgetPopup)}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-white text-gray-700 hover:border-gray-400 text-left"
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
  );

  const renderPopularButtons = () => (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-600 font-semibold">Popular:</span>
      <button
        className="px-4 py-1.5 text-xs font-medium rounded-full transition-all hover:shadow-md"
        style={{ backgroundColor: '#EBF5FF', color: '#4299E1' }}
        onClick={() => setSelectedPropertyType(['Flat', 'Apartment'])}
      >
        Apartments
      </button>
      <button
        className="px-4 py-1.5 text-xs font-medium rounded-full transition-all hover:shadow-md"
        style={{ backgroundColor: '#EBF5FF', color: '#4299E1' }}
        onClick={() => setSelectedBHK('2 BHK')}
      >
        2 BHK
      </button>
      <button
        className="px-4 py-1.5 text-xs font-medium rounded-full transition-all hover:shadow-md"
        style={{ backgroundColor: '#EBF5FF', color: '#4299E1' }}
        onClick={() => setSelectedBHK('3 BHK')}
      >
        3 BHK
      </button>
    </div>
  );

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      {/* Desktop Navbar */}
      <div className="hidden lg:block">
        <Navbar />
      </div>

      {/* Desktop Filter Bar */}
      <div className="hidden lg:block w-full bg-white shadow-lg border-b-2 border-gray-200 z-30 pt-16">
        <div className="w-full px-4 md:px-6 lg:px-10 py-5">
          <div className="flex items-center gap-3 mb-4 w-full">
            {renderCityFilter("min-w-[150px] flex-shrink-0")}
            <div className="flex-1 relative max-w-full" ref={searchWrapperRef}>
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search By Area, Project or Builder"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSearchSuggestions(suggestions.length > 0)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all hover:border-gray-400"
              />
              {/* 🚀 Search Suggestions */}
              {showSearchSuggestions && (
                <div className="absolute top-full left-0 right-0 z-40 mt-1 max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-xl">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="cursor-pointer px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
              )}
            </div>
            {renderBHKFilter()}
            {renderBudgetFilter()}
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center flex-shrink-0 gap-2 px-6 py-3 rounded-lg text-sm font-medium text-white transition-all hover:bg-red-600"
              style={{ backgroundColor: '#EF4444' }}
            >
              <SlidersHorizontal size={20} />
              Filter
            </button>
            <button
              onClick={handleSearchClick}
              className="flex items-center flex-shrink-0 gap-2 px-6 py-3 rounded-lg text-sm font-medium text-white transition-all hover:bg-blue-600"
              style={{ backgroundColor: '#3B82F6' }}
            >
              <Search size={20} />
              Search
            </button>
          </div>
          {renderPopularButtons()}
        </div>
      </div>

      {/* Mobile Filter Bar */}
      <div className="block lg:hidden w-full bg-white shadow-sm z-30 pt-0">
        <div className="p-3 space-y-3">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.history.back()}
              className="p-2.5 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0"
            >
              <ArrowLeft size={18} className="text-gray-700" />
            </button>
            
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-2.5 border-2 border-gray-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-white text-gray-700 hover:border-gray-400 flex-shrink-0"
            >
              <option value="">City</option>
              {/* 🚀 DYNAMIC CITIES */}
              {filterOptions.cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="flex-1 w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:border-transparent"
            />
            
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="p-2.5 border-2 border-gray-300 rounded-lg flex-shrink-0"
            >
              <SlidersHorizontal size={18} />
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              className="px-4 py-1.5 text-xs font-medium rounded-full transition-all shadow-sm flex-shrink-0"
              style={{ backgroundColor: '#EBF5FF', color: '#4299E1' }}
              onClick={() => setSelectedPropertyType(['Flat', 'Apartment'])}
            >
              Apartments
            </button>
            <button
              className="px-4 py-1.5 text-xs font-medium rounded-full transition-all shadow-sm flex-shrink-0"
              style={{ backgroundColor: '#EBF5FF', color: '#4299E1' }}
              onClick={() => setSelectedBHK('2 BHK')}
            >
              2 BHK
            </button>
            <button
              className="px-4 py-1.5 text-xs font-medium rounded-full transition-all shadow-sm flex-shrink-0"
              style={{ backgroundColor: '#EBF5FF', color: '#4299E1' }}
              onClick={() => setSelectedBHK('3 BHK')}
            >
              3 BHK
            </button>
            <button
              className="px-4 py-1.5 text-xs font-medium rounded-full transition-all shadow-sm flex-shrink-0"
              style={{ backgroundColor: '#EBF5FF', color: '#4299E1' }}
              onClick={() => setSelectedPropertyType(['Villa'])}
            >
              Villas
            </button>
          </div>
        </div>
      </div>

     {/* Main Content */}
    <div className="flex-1 flex lg:flex-row flex-col overflow-hidden relative">

      {/* Map Container */}
      <div className="w-full lg:w-3/5 h-full relative">
        <div
          ref={mapContainerRef}
          className="h-full w-full"
          style={{ height: "100%", width: "100%" }}
        />

        {/* Layer Control */}
        {isMapReady && (
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg z-10">
            <div className="flex overflow-hidden rounded-lg">
              <button
                onClick={() => setMapType("roadmap")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  mapType === "roadmap"
                    ? "text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                style={{
                  backgroundColor: mapType === "roadmap" ? "#4299E1" : "white",
                }}
              >
                Map
              </button>

              <button
                onClick={() => setMapType("satellite")}
                className={`px-4 py-2 text-sm font-medium transition-colors border-l ${
                  mapType === "satellite"
                    ? "text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                style={{
                  backgroundColor: mapType === "satellite" ? "#4299E1" : "white",
                }}
              >
                Satellite
              </button>

              <button
                onClick={() => setMapType("hybrid")}
                className={`px-4 py-2 text-sm font-medium transition-colors border-l ${
                  mapType === "hybrid"
                    ? "text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                style={{
                  backgroundColor: mapType === "hybrid" ? "#4299E1" : "white",
                }}
              >
                Hybrid
              </button>
            </div>
          </div>
        )}

        {/* Move Map Notice */}
        {isMapReady && (
          <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg text-sm text-gray-600 z-10 hidden lg:block">
            <p className="font-semibold">Move map to filter properties</p>
          </div>
        )}

        {/* Map Loading */}
        {!isMapReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div
                className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 mb-4"
                style={{ borderColor: "#4299E1" }}
              ></div>
              <p className="text-gray-600 font-medium">Loading Google Maps...</p>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Sidebar List */}
      <div className="hidden lg:block w-full lg:w-2/5 bg-white overflow-y-auto p-4 space-y-4">
        <div className="mb-3">
          <h1 className="text-xl font-bold text-gray-800">
            Properties in {selectedCity || "Ahmedabad"}
          </h1>
          <p className="text-sm text-gray-600">
            {visibleProperties.length} properties visible
          </p>
        </div>

        {visibleProperties.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg font-medium">No properties in current view</p>
          </div>
        ) : (
          visibleProperties.map((property) => (
            <PropertyCardLarge
              key={property.id}
              property={property}
              isHighlighted={property.id === selectedPropertyId}
              onClick={() => handlePropertyCardClick(property)}
            />
          ))
        )}
      </div>

      {/* Mobile Bottom Sheet */}
      <div
        className={`block lg:hidden fixed bottom-0 left-0 right-0 w-full bg-gray-50 rounded-t-2xl shadow-2xl z-20 transition-all duration-300 ease-in-out ${
isSheetOpen ? "max-h-[180px]" : "h-14"
        }`}
      >
        <div
          className="flex justify-between items-center px-4 py-3 border-b cursor-pointer bg-white rounded-t-2xl"
          onClick={() => setIsSheetOpen(!isSheetOpen)}
        >
          <h2 className="text-base font-bold">
            Properties ({visibleProperties.length})
          </h2>

          {isSheetOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </div>

        <div
          className={`overflow-x-auto overflow-y-hidden ${
            isSheetOpen ? "h-[calc(240px-53px)]" : "h-0"
          }`}
        >
          {visibleProperties.length === 0 ? (
            <div className="text-center py-8 text-gray-500 w-full">
              <p className="font-medium text-sm">No properties in view</p>
              <p className="text-xs mt-1">Move or zoom the map</p>
            </div>
          ) : (
<div className="flex p-3 space-x-2">
              {visibleProperties.map((property) => (
                <PropertyCardSmall
                  key={property.id}
                  property={property}
                  isHighlighted={property.id === selectedPropertyId}
                  onClick={() => handlePropertyCardClick(property)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>



      {/* Full Filter Modal */}
      <FullFiltersModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        // --- Pass Dynamic Options ---
        cityOptions={filterOptions.cities}
        bhkOptions={filterOptions.bhk}
        propertyTypeOptions={filterOptions.propertyType}
        possessionOptions={filterOptions.possession}
        // --- Pass State & Setters ---
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedBHK={selectedBHK}
        setSelectedBHK={setSelectedBHK}
        minBudget={minBudget}
        setMinBudget={setMinBudget}
        maxBudget={maxBudget}
        setMaxBudget={setMaxBudget}
        selectedPropertyType={selectedPropertyType}
        setSelectedPropertyType={setSelectedPropertyType}
        selectedPossession={selectedPossession}
        setSelectedPossession={setSelectedPossession}
      />
    </div>
  );
}