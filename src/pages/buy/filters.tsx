// src/pages/filters.tsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link, useLocation } from "react-router-dom";

import Navbar from '../../components/Navbar';
import { 
    HeartIcon, ChevronDownIcon, BuildingIcon, MapPinIcon, TrainIcon, PlaneIcon, 
    PhoneIcon, MessageCircleIcon, XIcon, SearchIcon, CheckCircleIcon, 
    BedIcon, BathIcon, HomeIcon, MailIcon,
    SlidersHorizontal, ArrowLeft, Plus
} from 'lucide-react';
import { Heart as HeartIconFilled } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Check } from 'lucide-react';

import { useWishlist } from '../../context/WishilistContext';

const defaultFilterOptions = {
    localities: [],
    cities: [],
    states: [],
    bhk: [],
    possession: ['Ready to Move', 'Upto 1 Year', 'Upto 2 Years', '2+ Years'],
    propertyType: [],
    sortBy: ['Relevance', 'New Launch', 'Price: Low to High', 'Price: High to Low', 'Near Possession']
};

const initialFilters = {
    city: '',
    localities: [],
    bhk: [],
    budget: { min: '', max: '' },
    possession: [],
    propertyType: [],
    sortBy: ['Relevance'],
    searchQuery: '',
};

const navbarFilterMap: { [key: string]: Partial<typeof initialFilters> } = {
    'ready-to-move': { possession: ['Ready to Move'] },
    'possession-within-1-year': { possession: ['Upto 1 Year'] },
    'possession-within-2-year': { possession: ['Upto 2 Years'] },
    'possession-more-than-2-years': { possession: ['2+ Years'] },
    'new-launch-projects': { sortBy: ['New Launch'] },
    'flat-in-ahmedabad': { propertyType: ['Flat'] },
    'house-for-sale-in-ahmedabad': { propertyType: ['House'] },
    'villa-in-ahmedabad': { propertyType: ['Villa'] },
    'weekend-home-in-ahmedabad': { propertyType: ['House'] },
    'penthouse-for-sale-in-ahmedabad': { propertyType: ['Penthouse'] },
    'duplex-for-sale-in-ahmedabad': { propertyType: ['Duplex'] },
    'under-50-lac': { budget: { min: '0', max: '50' } },
    '50-lac-to-75-lac': { budget: { min: '50', max: '75' } },
    '75-lac-to-1.25-cr': { budget: { min: '75', max: '125' } },
    '1.25-cr-to-2-cr': { budget: { min: '125', max: '200' } },
    '2-cr-to-3-cr': { budget: { min: '200', max: '300' } },
    '3-cr-to-5-cr': { budget: { min: '300', max: '500' } },
    'above-3-cr': { budget: { min: '300', max: '' } }
};

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
    // First, try to get the possessionDate from overview
    const possessionDate = project.overview?.possessionDate;
    
    if (!possessionDate) {
        // Fallback to old possession field if overview.possessionDate doesn't exist
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
    
    // Parse the possessionDate (assuming format like "December 2025", "Dec 2025", "2025-12", etc.)
    const dateLower = possessionDate.toLowerCase().trim();
    
    // Check if it's "ready to move" or similar
    if (dateLower.includes('ready') || dateLower.includes('immediate')) {
        return 0;
    }
    
    const currentDate = new Date();
    let targetDate: Date | null = null;
    
    // Month names for parsing
    const monthNames = ['january', 'february', 'march', 'april', 'may', 'june',
                        'july', 'august', 'september', 'october', 'november', 'december'];
    const shortMonthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    
    // Try to parse "Month YYYY" format (e.g., "December 2025")
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
    
    // If not found, try to parse ISO format or other date formats
    if (!targetDate) {
        const parsedDate = new Date(possessionDate);
        if (!isNaN(parsedDate.getTime())) {
            targetDate = parsedDate;
        }
    }
    
    // If still no valid date, try to extract year only
    if (!targetDate) {
        const yearMatch = possessionDate.match(/\d{4}/);
        if (yearMatch) {
            const year = parseInt(yearMatch[0]);
            // Assume middle of the year (June) if only year is provided
            targetDate = new Date(year, 5, 1);
        }
    }
    
    // If we have a valid target date, calculate months difference
    if (targetDate && !isNaN(targetDate.getTime())) {
        const diffInMonths = (targetDate.getFullYear() - currentDate.getFullYear()) * 12 +
                            (targetDate.getMonth() - currentDate.getMonth());
        return Math.max(0, diffInMonths);
    }
    
    // Default to 36 months if we can't parse the date
    return 36;
};

const matchesBHK = (project: any, bhkFilters: string[]): boolean => {
    if (bhkFilters.length === 0) return true;
    const projectBHKs = project.configurations.map((config: any) => {
        const bhkMatch = config.type.match(/(\d+)\s*BHK/i);
        return bhkMatch ? `${bhkMatch[1]} BHK` : null;
    }).filter(Boolean);
    if (project.bhk) projectBHKs.push(project.bhk);
    return projectBHKs.some((bhk: string) => bhkFilters.includes(bhk));
};
// src/pages/filters.tsx

const matchesPropertyType = (project: any, typeFilters: string[]): boolean => {
    if (typeFilters.length === 0) return true;
    
    const rawType = project.overview?.propertyType;
    if (!rawType) return false; 
    
    const standardizedType = rawType.charAt(0).toUpperCase() + rawType.slice(1).toLowerCase();
    
    return typeFilters.includes(standardizedType);
};

const matchesPossession = (project: any, possessionFilters: string[]): boolean => {
    if (possessionFilters.length === 0) return true;
    
    const projectPossessionMonths = getPossessionMonths(project);
    
    return possessionFilters.some(filter => {
        switch (filter) {
            case 'Ready to Move': 
                // Ready to move: 0-3 months
                return projectPossessionMonths >= 0 && projectPossessionMonths <= 3;
            case 'Upto 1 Year': 
                // More than 3 months but up to 12 months
                return projectPossessionMonths > 3 && projectPossessionMonths <= 12;
            case 'Upto 2 Years': 
                // More than 12 months but up to 24 months
                return projectPossessionMonths > 12 && projectPossessionMonths <= 24;
            case '2+ Years': 
                // More than 24 months
                return projectPossessionMonths > 24;
            default: 
                return false;
        }
    })
};

const TagFilterDropdown = ({
    label,
    options,
    selected,
    onChange
}: {
    label: string;
    options: string[];
    selected: string[];
    onChange: (value: string[]) => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    const isSortBy = label.toLowerCase().includes('sort by');

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleTagClick = (option: string) => {
        const newSelected = isSortBy
            ? [option]
            : selected.includes(option)
                ? selected.filter((item: string) => item !== option)
                : [...selected, option];
        onChange(newSelected);
    };

    const clearSelection = () => {
        onChange(isSortBy ? ['Relevance'] : []);
    };

    const getDisplayLabel = () => {
        if (isSortBy && selected.length > 0) {
            return `Sort By: ${selected[0]}`;
        }
        if (selected.length > 0) {
            return `${label} (${selected.length})`;
        }
        return label;
    };

    const isActive = selected.length > 0 && !(isSortBy && selected[0] === 'Relevance');

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`px-3 py-2 text-sm rounded-lg flex items-center gap-1 border transition-colors ${
                    isActive ? 'bg-blue-100 border-blue-800 text-blue-800' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
            >
                <span>{getDisplayLabel()}</span>
                <ChevronDownIcon size={14} />
            </button>
            {isOpen && (
                <div className={`
                    absolute top-full mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 z-20 p-4
                    ${isSortBy ? 'right-0 w-72' : 'w-96'} 
                `}>
                    <div className={`
                        grid gap-3 max-h-80 overflow-y-auto
                        ${label === 'BHK' ? 'grid-cols-4' 
                          : isSortBy ? 'grid-cols-2' 
                          : 'grid-cols-3'
                        }
                    `}>
                        {options.map(option => (
                            <button
                                key={option}
                                onClick={() => handleTagClick(option)}
                                className={`
                                    px-3 py-1.5 rounded-full border text-xs font-medium transition-colors
                                    ${selected.includes(option)
                                        ? 'bg-blue-800 text-white border-blue-800'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                    }
                                `}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                        <button onClick={() => { clearSelection(); setIsOpen(false); }} className="text-sm font-semibold text-blue-800 hover:underline">Clear</button>
                        <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-blue-800 text-white text-sm font-bold rounded-lg hover:bg-blue-900 transition-colors">Done</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const BudgetDropdown = ({
    label,
    selected,
    onChange,
}: {
    label: string;
    selected: { min: string; max: string };
    onChange: (value: { min: string; max: string }) => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [minBudget, setMinBudget] = useState(selected.min || '');
    const [maxBudget, setMaxBudget] = useState(selected.max || '');
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleBudgetApply = () => {
        onChange({ min: minBudget, max: maxBudget });
        setIsOpen(false);
    };

    const clearBudget = () => {
        setMinBudget('');
        setMaxBudget('');
        onChange({ min: '', max: '' });
        setIsOpen(false);
    };

    const getDisplayLabel = () => {
        if (selected.min || selected.max) {
            const min = selected.min ? `Min ${selected.min}L` : '';
            const max = selected.max ? `Max ${selected.max}L` : '';
            return [min, max].filter(Boolean).join(' - ');
        }
        return label;
    };

    const // Replace the desktop filter section with this more compact version:
isActive = selected.min || selected.max;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`px-3 py-2 text-sm rounded-lg flex items-center gap-1 border transition-colors ${
                    isActive ? 'bg-blue-100 border-blue-800 text-blue-800' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
            >
                <span>{getDisplayLabel()}</span>
                <ChevronDownIcon size={14} />
            </button>
            {isOpen && (
                <div className="absolute top-full mt-2 w-72 bg-white rounded-lg shadow-2xl border border-gray-200 z-20">
                    <div className="p-4 max-h-80 overflow-y-auto">
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Min Budget (Lacs)</label>
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={minBudget}
                                    onChange={(e) => setMinBudget(e.target.value)}
                                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-800"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Max Budget (Lacs)</label>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={maxBudget}
                                    onChange={(e) => setMaxBudget(e.target.value)}
                                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-800"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 px-4 py-3 border-t border-gray-200">
                        <button onClick={clearBudget} className="text-sm font-semibold text-blue-800 hover:underline">Clear</button>
                        <button onClick={handleBudgetApply} className="px-4 py-2 bg-blue-800 text-white text-sm font-bold rounded-lg hover:bg-blue-900 transition-colors">Done</button>
                    </div>
                </div>
            )}
        </div>
    );
};

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


const MobileFiltersModal = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  filterOptions
}: {
  isOpen: boolean;
  onClose: () => void;
  filters: typeof initialFilters;
  setFilters: (filters: typeof initialFilters) => void;
  filterOptions: typeof defaultFilterOptions;
}) => {
  if (!isOpen) return null;

  const [tempFilters, setTempFilters] = useState(filters);

  const handleCityClick = (city: string) => {
    setTempFilters((prev) => ({
      ...prev,
      city: prev.city === city ? '' : city, // Toggle city
    }));
  };
  
  const handlePropertyTypeClick = (type: string) => {
    setTempFilters((prev) => ({
      ...prev,
      propertyType: prev.propertyType.includes(type)
        ? prev.propertyType.filter((t) => t !== type)
        : [...prev.propertyType, type],
    }));
  };
  
  const handleBHKClick = (type: string) => {
    setTempFilters((prev) => ({
      ...prev,
      bhk: prev.bhk.includes(type)
        ? prev.bhk.filter((t) => t !== type)
        : [...prev.bhk, type],
    }));
  };

  const handlePossessionClick = (type: string) => {
    setTempFilters((prev) => ({
      ...prev,
      possession: prev.possession.includes(type)
        ? prev.possession.filter((t) => t !== type)
        : [...prev.possession, type],
    }));
  };
  
  const handleApply = () => {
    setFilters(tempFilters);
    onClose();
  };

  const handleClearAll = () => {
    setTempFilters(initialFilters);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center lg:p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
      
<div className="relative flex h-full w-full max-w-md flex-col overflow-y-auto bg-[#F0F7FF] shadow-xl ml-auto">
        <div className="flex items-center justify-between border-b p-4 sticky top-0 bg-white z-10">
          <button onClick={onClose} className="p-1 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button onClick={onClose} className="p-1 text-gray-600 hover:text-gray-900">
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-4">

          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-800">Search City</label>
            <div className="flex flex-wrap gap-2">
              {filterOptions.cities.map((city) => (
                <button
                  key={city}
                  onClick={() => handleCityClick(city)}
                  className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium ${
                    tempFilters.city === city
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
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800">Property Type</label>
              <button 
                onClick={() => setTempFilters(prev => ({...prev, propertyType: []}))}
                className="text-sm font-medium text-gray-500 hover:text-blue-500"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filterOptions.propertyType.map((type) => (
                <FilterButton
                  key={type}
                  onClick={() => handlePropertyTypeClick(type)}
                  isActive={tempFilters.propertyType.includes(type)}
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
                onClick={() => setTempFilters(prev => ({...prev, bhk: []}))}
                className="text-sm font-medium text-gray-500 hover:text-blue-500"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filterOptions.bhk.map((bhk) => (
                <FilterButton
                  key={bhk}
                  onClick={() => handleBHKClick(bhk)}
                  isActive={tempFilters.bhk.includes(bhk)}
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
                onClick={() => setTempFilters(prev => ({...prev, budget: {min: '', max: ''}}))}
                className="text-sm font-medium text-gray-500 hover:text-blue-500"
              >
                Clear All
              </button>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="relative flex-1">
                <select 
                  value={tempFilters.budget.min}
                  onChange={(e) => setTempFilters(prev => ({...prev, budget: {...prev.budget, min: e.target.value}}))}
                  className="h-full w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">Min</option>
                  <option value="50">₹50L</option>
                  <option value="75">₹75L</option>
                  <option value="100">₹1Cr</option>
                  <option value="150">₹1.5Cr</option>
                </select>
                <ChevronDownIcon size={16} className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
              <span className="text-gray-500">–</span>
              <div className="relative flex-1">
                <select 
                  value={tempFilters.budget.max}
                  onChange={(e) => setTempFilters(prev => ({...prev, budget: {...prev.budget, max: e.target.value}}))}
                  className="h-full w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">Max</option>
                  <option value="75">₹75L</option>
                  <option value="100">₹1Cr</option>
                  <option value="150">₹1.5Cr</option>
                  <option value="200">₹2Cr</option>
                  <option value="300">₹3Cr+</option>
                </select>
                <ChevronDownIcon size={16} className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800">Possession</label>
              <button 
                onClick={() => setTempFilters(prev => ({...prev, possession: []}))}
                className="text-sm font-medium text-gray-500 hover:text-blue-500"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filterOptions.possession.map((possession) => (
                <FilterButton
                  key={possession}
                  onClick={() => handlePossessionClick(possession)}
                  isActive={tempFilters.possession.includes(possession)}
                >
                  {possession}
                </FilterButton>
              ))}
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
            onClick={handleApply}
            className="flex-1 rounded-lg border border-gray-900 bg-gray-900 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-gray-800"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export const FlatCard = ({ flat }: { flat: any }) => {
    const firstConfig = flat.configurations?.[0] || {};
    const bhkMatch = firstConfig.type?.match(/(\d+)\s*BHK/i);
    const bedCount = bhkMatch ? bhkMatch[1] : (flat.bhk ? flat.bhk.split(' ')[0] : 'N/A');
    
    const propertyType = flat.overview?.propertyType || 'Property';
    const imageCount = flat.heroImages?.length || 1;

    const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
    const isSaved = isWishlisted(flat._id); 

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isSaved) {
            removeFromWishlist(flat._id);
        } else {
            addToWishlist(flat._id);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col sm:flex-row h-auto sm:h-[290px]">
            <div className="sm:w-2/5 relative h-64 sm:h-full flex-shrink-0">
              <Link to={`/${flat.slug}`} className="block h-full">
                    <img 
                        src={flat.image} 
                        alt={flat.name} 
                        className="w-full h-full object-cover" 
                    />
                </Link>
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-semibold py-1.5 px-3 rounded-md flex items-center gap-1">
                    <CheckCircleIcon size={14} className="text-blue-700" />
                    Verified
                </div>
                <button 
                    onClick={handleWishlistToggle}
                    className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-lg hover:bg-white transition-colors z-10"
                >
                    {isSaved ? (
                        <HeartIconFilled size={20} className="text-red-500 fill-red-500" />
                    ) : (
                        <HeartIcon size={20} className="text-gray-800" />
                    )}
                </button>
                <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs font-medium py-1 px-2.5 rounded-md">
                    1 / {imageCount}
                </div>
            </div>

            <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800 hover:text-blue-800 transition-colors mb-1">
                        <Link to={`/${flat.slug}`}>
                            {flat.name}
                        </Link>
                    </h2>
                    <p className="text-sm text-gray-600 mb-3 tracking-wide">
                        <span className="normal-case">by </span>
                        <span className="font-bold uppercase">{flat.developer}</span>
                    </p>
                    <div className="mb-1">
                        <span className="text-xl font-bold text-gray-900">{firstConfig.price || 'Price on Request'}</span>
                        <span className="text-sm text-gray-600 ml-2">{flat.status || ''}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 mb-3">{propertyType}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1.5">
                            <BedIcon size={18} className="text-gray-500" />
                            <span>{bedCount} bed</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <BathIcon size={18} className="text-gray-500" />
                            <span>2 baths</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <HomeIcon size={18} className="text-gray-500" />
                            <span>{firstConfig.area || 'N/A'}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPinIcon size={16} className="flex-shrink-0" />
                        <span className="line-clamp-2">{flat.description}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-3">
                    <div className="flex items-center gap-2">
                        <button className="p-2.5 rounded-lg bg-gray-100 hover:bg-blue-100 text-blue-800 transition-colors">
                            <MailIcon size={20} />
                        </button>
                        <button className="p-2.5 rounded-lg bg-gray-100 hover:bg-blue-100 text-blue-800 transition-colors">
                            <PhoneIcon size={20} />
                        </button>
                      <button className="p-2.5 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 transition-colors">
                        <FaWhatsapp size={20} />
                    </button>
                    </div>
                    <div className="text-xs font-bold text-gray-700 uppercase tracking-wide truncate ml-2">
                        {flat.developer}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ScheduleForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formStep, setFormStep] = useState<'details' | 'otp' | 'success'>('details');
  const [otp, setOtp] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendOTP = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email) {
      setError('Please fill in all fields.');
      return;
    }
    if (!formData.phone || formData.phone.length < 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
     if (!consent) {
      setError('Please agree to be contacted.');
      return;
    }

    setSendingOtp(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone }),
      });

      const data = await response.json();

      if (data.success) {
        setFormStep('otp');
        setResendTimer(60);
        
        const interval = setInterval(() => {
          setResendTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        setError(null);
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('Error sending OTP:', err);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setVerifyingOtp(true);
    setError(null);

    try {
      const verifyResponse = await fetch(`${import.meta.env.VITE_API_URL}/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, code: otp }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyData.success) {
        setError(verifyData.error || 'Invalid OTP. Please try again.');
        setVerifyingOtp(false);
        return;
      }

      setLoading(true);
      const leadResponse = await fetch(`${import.meta.env.VITE_API_URL}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'Filter Page Form',
        }),
      });

      const leadData = await leadResponse.json();

      if (leadData.success) {
        setSuccess(true);
        setFormStep('success');
        setFormData({ name: '', phone: '', email: '' });
        setConsent(false);
        setOtp('');
      } else {
        setError(leadData.error || 'Failed to submit. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setVerifyingOtp(false);
      setLoading(false);
    }
  };

   return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-6 sticky top-32">
        <div className="flex flex-col items-center border-b border-gray-200 pb-4 mb-4">
          <h3 className="text-lg font-bold text-gray-800">
            Schedule your free site visit
          </h3>
          <p className="text-blue-800 font-semibold text-lg">TODAY</p>
        </div>
        
        {formStep === 'success' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Thank You!
            </h3>
            <p className="text-gray-700">
              We will be in touch shortly.
            </p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg text-center text-sm">
            {error}
          </div>
        )}

        {formStep === 'details' && (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Mobile number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
              required
              maxLength={10}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
              required
            />

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                id="whatsapp-consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="rounded text-blue-800 focus:ring-blue-800"
                required
              />
              <label htmlFor="whatsapp-consent">
                I agree to be contacted by WhatsApp, SMS, Email
              </label>
            </div>

            <button
              type="submit"
              disabled={sendingOtp}
              className="w-full bg-[#4299E1] text-white font-bold py-3 rounded-lg hover:bg-blue-900 transition-colors disabled:opacity-50"
            >
              {sendingOtp ? 'Sending OTP...' : 'Continue'}
            </button>
          </form>
        )}

        {formStep === 'otp' && (
           <form onSubmit={handleVerifyAndSubmit} className="space-y-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-700">
                  Enter the 6-digit OTP sent to <strong>{formData.phone}</strong>. 
                  <button 
                    type="button" 
                    onClick={() => { setFormStep('details'); setError(null); }}
                    className="ml-1 text-blue-600 hover:underline font-medium"
                  >
                    (Edit)
                  </button>
                </p>
              </div>

              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                maxLength={6}
                required
              />

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Didn't receive OTP?</span>
                {resendTimer > 0 ? (
                  <span className="text-gray-500">Resend in {resendTimer}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSendOTP()}
                    className="text-blue-600 font-semibold hover:underline"
                    disabled={sendingOtp}
                  >
                    {sendingOtp ? 'Sending...' : 'Resend OTP'}
                  </button>
                )}
              </div>

            <button
              type="submit"
              disabled={verifyingOtp || loading || otp.length !== 6}
              className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {verifyingOtp || loading ? 'Verifying...' : 'Verify & Submit'}
            </button>
          </form>
        )}

        {formStep !== 'success' && (
          <>
            <div className="mt-6 flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center text-gray-500">
                <PhoneIcon size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  Rest assured, our expert will call you within the next 5 minutes.
                </p>
                <p className="text-xs text-gray-500">(during working hours)</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <a href="#" className="text-blue-800 text-sm hover:underline">
                Read Disclaimer
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default function FilterResults() {
    const params = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const filterSlug = params['*']?.split('/')[0] || 'all';

    const [filterOptions, setFilterOptions] = useState(defaultFilterOptions);
    const [loadingFilters, setLoadingFilters] = useState(true);
    
    const [allProjects, setAllProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
    const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
    const searchInputRef = useRef<HTMLDivElement>(null);

    const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

const initialFiltersWithSlug = useMemo(() => {
    let filtersFromUrl = { ...initialFilters };

    // Apply slug-based filters first
    if (filterSlug !== 'all' && navbarFilterMap[filterSlug]) {
        filtersFromUrl = {
            ...filtersFromUrl,
            ...navbarFilterMap[filterSlug]
        };
    }

    // Read URL parameters
    const querySearch = queryParams.get('search') || queryParams.get('q');
    const queryCity = queryParams.get('city');
    const queryBhk = queryParams.get('bhk');
    const queryMinBudget = queryParams.get('minBudget');
    const queryMaxBudget = queryParams.get('maxBudget');
    const queryPropertyType = queryParams.get('propertyType');
    const queryPossession = queryParams.get('possession');

    // Apply URL parameters
    if (querySearch) {
        filtersFromUrl.searchQuery = querySearch;
    }
    
    if (queryCity) {
        filtersFromUrl.city = queryCity;
    }
    
    if (queryBhk) {
        // Handle both "2" and "2 BHK" formats
        const bhkValue = queryBhk.includes('BHK') ? queryBhk : `${queryBhk} BHK`;
        filtersFromUrl.bhk = [bhkValue];
    }
    
    if (queryMinBudget || queryMaxBudget) {
        filtersFromUrl.budget = {
            min: queryMinBudget || '',
            max: queryMaxBudget || ''
        };
    }
    
    if (queryPropertyType) {
        filtersFromUrl.propertyType = queryPropertyType.split(',');
    }
    
    if (queryPossession) {
        filtersFromUrl.possession = queryPossession.split(',');
    }
    
    return filtersFromUrl;

}, [filterSlug, location.search]);

    
    const [filters, setFilters] = useState<typeof initialFilters>(initialFiltersWithSlug);

useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.city) params.set('city', filters.city);
    if (filters.searchQuery) params.set('search', filters.searchQuery);
    if (filters.localities.length > 0) params.set('localities', filters.localities.join(','));
    if (filters.bhk.length > 0) params.set('bhk', filters.bhk.join(','));
    if (filters.budget.min) params.set('minBudget', filters.budget.min);
    if (filters.budget.max) params.set('maxBudget', filters.budget.max);
    if (filters.possession.length > 0) params.set('possession', filters.possession.join(','));
    if (filters.propertyType.length > 0) params.set('propertyType', filters.propertyType.join(','));
    if (filters.sortBy[0] && filters.sortBy[0] !== 'Relevance') params.set('sortBy', filters.sortBy[0]);
    
    const newUrl = params.toString() ? `${location.pathname}?${params.toString()}` : location.pathname;
    window.history.replaceState({}, '', newUrl);
}, [filters, location.pathname]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
                setShowSearchSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchFilterOptions = async () => {
            try {
                setLoadingFilters(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/filter-options`);
                const data = await response.json();
                
                if (data.success) {
                    setFilterOptions({
                        localities: data.data.localities || [],
                        cities: [], // Will be populated by fetchProjects
                        states: data.data.states || [],
                        bhk: data.data.bhk || [],
                        possession: data.data.possession || ['Ready to Move', 'Upto 1 Year', 'Upto 2 Years', '2+ Years'],
                        propertyType: [], // Will be populated by fetchProjects
                        sortBy: data.data.sortBy || ['Relevance', 'New Launch', 'Price: Low to High', 'Price: High to Low', 'Near Possession']
                    });
                } else {
                    console.error('Failed to load filter options:', data.error);
                }
            } catch (err) {
                console.error('Error fetching filter options:', err);
            } finally {
                setLoadingFilters(false);
            }
        };

        fetchFilterOptions();
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
                const data = await response.json();
                
                if (data.success) {
                    setAllProjects(data.data);

                    const types = new Set<string>();
                    const cities = new Set<string>();
                    data.data.forEach((project: any) => {
                        const rawType = project.overview?.propertyType;
                        if (rawType) {
                            const standardizedType = rawType.charAt(0).toUpperCase() + rawType.slice(1).toLowerCase();
                            types.add(standardizedType);
                        }
                        if (project.city) cities.add(project.city);
                    });

                    setFilterOptions(prevOptions => ({
                        ...prevOptions,
                        propertyType: Array.from(types).sort(),
                        cities: Array.from(cities).sort()
                    }));

                } else {
                    setError(data.error || 'Failed to load projects');
                }
            } catch (err) {
                setError('Failed to load projects');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

useEffect(() => {
    // Only reset filters if there are no URL parameters
    const hasUrlParams = location.search.length > 0;
    if (!hasUrlParams) {
        setFilters(initialFiltersWithSlug);
    }
}, [filterSlug]);

    const handleFilterChange = (category: keyof typeof initialFilters, value: any) => {
        setFilters(prev => ({
            ...prev,
            [category]: value
        }));
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        handleFilterChange('searchQuery', value);

        if (value.length > 1) {
            const lowerCaseValue = value.toLowerCase();
            const suggestionSet = new Set<string>();

            allProjects.forEach(project => {
                if (project.name.toLowerCase().includes(lowerCaseValue)) {
                    suggestionSet.add(project.name);
                }
                if (project.developer.toLowerCase().includes(lowerCaseValue)) {
                    suggestionSet.add(project.developer);
                }
                if (project.area && project.area.toLowerCase().includes(lowerCaseValue)) {
                    suggestionSet.add(project.area);
                }
            });

            const newSuggestions = Array.from(suggestionSet).slice(0, 7);
            setSearchSuggestions(newSuggestions);
            setShowSearchSuggestions(newSuggestions.length > 0);
        } else {
            setSearchSuggestions([]);
            setShowSearchSuggestions(false);
        }
    };

    const handleSearchSuggestionClick = (suggestion: string) => {
        handleFilterChange('searchQuery', suggestion);
        setSearchSuggestions([]);
        setShowSearchSuggestions(false);
    };

    const clearAllFilters = () => {
    setFilters(initialFilters);
    // Clear URL parameters as well
    window.history.replaceState({}, '', location.pathname);
};

    const filteredAndSortedProjects = useMemo(() => {
        let filteredProjects = [...allProjects];

        if (filters.searchQuery) {
            const lowerCaseQuery = filters.searchQuery.toLowerCase();
            filteredProjects = filteredProjects.filter(project =>
                project.name.toLowerCase().includes(lowerCaseQuery) ||
                project.developer.toLowerCase().includes(lowerCaseQuery) ||
                project.description.toLowerCase().includes(lowerCaseQuery) ||
                (project.area && project.area.toLowerCase().includes(lowerCaseQuery))
            );
        }

        filteredProjects = filteredProjects.filter(project => {
            const { city, localities, bhk, budget, possession, propertyType } = filters;

            if (city) {
                if (project.city !== city) return false;
            }

            if (localities.length > 0) {
                const matchesLocality = localities.some(loc =>
                    (project.area && project.area.toLowerCase() === loc.toLowerCase())
                );
                if (!matchesLocality) return false;
            }

            if (!matchesBHK(project, bhk)) return false;
            if (!matchesPropertyType(project, propertyType)) return false;
            if (!matchesPossession(project, possession)) return false;

            if (budget.min || budget.max) {
                const minBudget = budget.min ? parseFloat(budget.min) : 0;
                const maxBudget = budget.max ? parseFloat(budget.max) : Infinity;
                const priceRanges = project.configurations.map((config: any) => getPriceRange(config.price));
                const matchesBudget = priceRanges.some(range =>
                    !(range.max < minBudget || range.min > maxBudget)
                );
                if (!matchesBudget) return false;
            }

            return true;
        });

        const sortOption = filters.sortBy[0] || 'Relevance';
        if (sortOption !== 'Relevance') {
            filteredProjects.sort((a, b) => {
                switch (sortOption) {
                    case 'Price: Low to High':
                        const aMinPrices = a.configurations.map((c: any) => getPriceRange(c.price).min).filter((p: number) => p > 0);
                        const bMinPrices = b.configurations.map((c: any) => getPriceRange(c.price).min).filter((p: number) => p > 0);
                        const aMin = Math.min(...aMinPrices);
                        const bMin = Math.min(...bMinPrices);
                        return (isNaN(aMin) ? Infinity : aMin) - (isNaN(bMin) ? Infinity : bMin);
                    case 'Price: High to Low':
                        const aMaxPrices = a.configurations.map((c: any) => getPriceRange(c.price).max).filter((p: number) => p > 0);
                        const bMaxPrices = b.configurations.map((c: any) => getPriceRange(c.price).max).filter((p: number) => p > 0);
                        const aMax = Math.max(...aMaxPrices);
                        const bMax = Math.max(...bMaxPrices);
                        return (isNaN(bMax) ? 0 : bMax) - (isNaN(aMax) ? 0 : aMax);
                    case 'New Launch':
                        const aIsNew = a.possession.toLowerCase().includes('launch') ? 0 : 1;
                        const bIsNew = b.possession.toLowerCase().includes('launch') ? 0 : 1;
                        return aIsNew - bIsNew;
                    case 'Near Possession':
                        return getPossessionMonths(a.possession) - getPossessionMonths(b.possession);
                    default:
                        return 0;
                }
            });
        }

        return filteredProjects;
    }, [allProjects, filters]);

    const pageTitle = useMemo(() => {
        const hasActiveFilters =
            filters.city ||
            filters.searchQuery ||
            filters.localities.length > 0 ||
            filters.bhk.length > 0 ||
            (filters.budget.min || filters.budget.max) ||
            filters.possession.length > 0 ||
            filters.propertyType.length > 0 ||
            filters.sortBy[0] !== 'Relevance';
        const activeFilters: string[] = [];
        if (filters.city) activeFilters.push(`in ${filters.city}`);
        if (filters.searchQuery) activeFilters.push(`"${filters.searchQuery}"`);
        if (filters.localities.length > 0) activeFilters.push(`in ${filters.localities.join(', ')}`);
        if (filters.bhk.length > 0) activeFilters.push(`${filters.bhk.join(', ')}`);
        if (filters.budget.min || filters.budget.max) {
            const budgetStr = [filters.budget.min ? `Min ${filters.budget.min}L` : '', filters.budget.max ? `Max ${filters.budget.max}L` : ''].filter(Boolean).join(' - ');
            activeFilters.push(budgetStr);
        }
        if (filters.possession.length > 0) activeFilters.push(filters.possession.join(', '));
        if (filters.propertyType.length > 0) activeFilters.push(filters.propertyType.join(', '));
        return hasActiveFilters
            ? `Properties matching ${activeFilters.join(' ')}`
            : `Properties in Ahmedabad`;
    }, [filters, filterSlug]);

    if (loading || loadingFilters) {
        return (
            <>
                <div className="min-h-screen bg-gray-50 text-gray-900">
                    <Navbar />
                    <main className="pt-20 pb-8">
                        <div className="container mx-auto px-4 lg:px-8">
                            <div className="animate-pulse space-y-4">
                                <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                                <div className="h-12 bg-gray-200 rounded"></div>
                                <div className="grid gap-8">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <div className="min-h-screen bg-gray-50 text-gray-900">
                    <Navbar />
                    <main className="pt-20 pb-8">
                        <div className="container mx-auto px-4 lg:px-8 text-center">
                            <h1 className="text-3xl font-bold text-red-600">Error Loading Projects</h1>
                            <p className="text-gray-600 mt-2">{error}</p>
                        </div>
                    </main>
                </div>
            </>
        );
    }

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
                div, h1, h2, h3, p, button, span, a, input, label { font-family: 'Poppins', sans-serif; }
            `}</style>
            <div className="min-h-screen bg-gray-50 text-gray-900">
                <Navbar />
                <main className="pt-20 pb-8">
                    <div className="container mx-auto px-4 lg:px-8">
                        
<div className="block lg:hidden w-full bg-[#F0F7FF] shadow-sm z-30 p-3 space-y-3 mb-6 rounded-lg border border-[#E1ECF7]">
                            <div className="flex items-center gap-2">

                                <select
                                    value={filters.city}
                                    onChange={(e) => handleFilterChange('city', e.target.value)}
                                    className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-800 flex-shrink-0"
                                >
                                    <option value="">City</option>
                                    {filterOptions.cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>

                                <div className="relative flex-grow" ref={searchInputRef}>
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <SearchIcon size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                      type="text"
                                      placeholder="Search..."
                                      value={filters.searchQuery}
                                      onChange={handleSearchInputChange}
                                      onFocus={() => setShowSearchSuggestions(searchSuggestions.length > 0)}
                                      className="flex-1 w-full px-3 pl-9 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-800"
                                      autoComplete="off"
                                    />
                                    {showSearchSuggestions && (
                                        <div className="absolute top-full left-0 right-0 z-30 mt-1 max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-xl">
                                            {searchSuggestions.map((suggestion, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => handleSearchSuggestionClick(suggestion)}
                                                    className="cursor-pointer px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                                                >
                                                    {suggestion}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                
                                <button
                                  onClick={() => setIsMobileModalOpen(true)}
                                  className="p-2.5 border border-gray-300 rounded-lg flex-shrink-0"
                                >
                                  <SlidersHorizontal size={18} />
                                </button>
                            </div>
                        </div>


                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
                            {pageTitle} ({filteredAndSortedProjects.length} Property)
                        </h1>

<div className="hidden lg:flex bg-[#F0F7FF] py-2.5 px-4 mb-8 shadow-sm rounded-lg border border-[#E1ECF7] flex-wrap gap-2 justify-start items-center">
                                                        
                            <select
                                value={filters.city}
                                onChange={(e) => handleFilterChange('city', e.target.value)}
                                className="px-3 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-800"
                            >
                                <option value="">All Cities</option>
                                {filterOptions.cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>

                            <div className="relative flex-grow min-w-[180px] max-w-[280px]" ref={searchInputRef}>
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <SearchIcon size={16} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by name, builder, or location..."
                                    value={filters.searchQuery}
                                    onChange={handleSearchInputChange}
                                    onFocus={() => setShowSearchSuggestions(searchSuggestions.length > 0)}
                                    className="w-full px-3 pl-9 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-800"
                                    autoComplete="off"
                                />
                                {showSearchSuggestions && (
                                    <div className="absolute top-full left-0 right-0 z-30 mt-1 max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-xl">
                                        {searchSuggestions.map((suggestion, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleSearchSuggestionClick(suggestion)}
                                                className="cursor-pointer px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                                            >
                                                {suggestion}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <TagFilterDropdown label="Popular Localities" options={filterOptions.localities} selected={filters.localities} onChange={(v) => handleFilterChange('localities', v)} />
                            <TagFilterDropdown label="BHK" options={filterOptions.bhk} selected={filters.bhk} onChange={(v) => handleFilterChange('bhk', v)} />
                            <BudgetDropdown label="Budget" selected={filters.budget} onChange={(v) => handleFilterChange('budget', v)} />
                            <TagFilterDropdown label="Possession" options={filterOptions.possession} selected={filters.possession} onChange={(v) => handleFilterChange('possession', v)} />
                            <TagFilterDropdown label="Property Type" options={filterOptions.propertyType} selected={filters.propertyType} onChange={(v) => handleFilterChange('propertyType', v)} />
                            <TagFilterDropdown label="Sort By" options={filterOptions.sortBy} selected={filters.sortBy} onChange={(v) => handleFilterChange('sortBy', v)} />
                            <button onClick={clearAllFilters} className="text-xs font-semibold text-gray-600 hover:text-blue-800 flex items-center gap-1 ml-auto">
                                <XIcon size={12} />
                                Clear All
                            </button>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                {filteredAndSortedProjects.length === 0 ? (
                                    <div className="text-center py-16 bg-white rounded-lg shadow-md">
                                        <h3 className="text-xl font-semibold text-gray-700">No projects found.</h3>
                                        <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
                                    </div>
                                ) : (
                                    <div className="grid gap-8">
                                        {filteredAndSortedProjects.map((project: any) => (
                                            <FlatCard key={`${project._id}-${project.name}`} flat={project} />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <ScheduleForm />
                        </div>
                    </div>
                </main>
            </div>
            
            <MobileFiltersModal 
                isOpen={isMobileModalOpen}
                onClose={() => setIsMobileModalOpen(false)}
                filters={filters}
                setFilters={setFilters}
                filterOptions={filterOptions}
            />
        </>
    );
}