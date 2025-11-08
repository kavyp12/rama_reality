

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
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useNavigate } from 'react-router-dom'; // 👈 ADD THIS LINE
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

// Property interface
interface Property {
  id: string; // Changed from number to string (for database _id)
  title: string;
  price: string;
  location: string;
  coordinates: { lat: number; lng: number };
  image: string;
  bedrooms: number;
  area: string;
  city: string;
  budget: string;
  state: string; // 👈 ADD THIS (for :state param)
  locality: string; // 👈 ADD THIS (for :area param)
  developer: string;
}

// 🔴 REMOVED: The static 'properties' array is gone.

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
const BudgetPopup = ({ onClose }: { onClose: () => void }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  useClickOutside(popupRef, onClose);

  return (
    <div
      ref={popupRef}
      className="absolute top-full left-0 mt-2 z-30 w-72 rounded-lg border bg-white p-4 shadow-xl"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <select className="h-full w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option>Min</option>
            <option>₹50L</option>
            <option>₹75L</option>
            <option>₹1Cr</option>
            <option>₹1.5Cr</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
        <span className="text-gray-500">–</span>
        <div className="relative flex-1">
          <select className="h-full w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option>Max</option>
            <option>₹75L</option>
            <option>₹1Cr</option>
            <option>₹1.5Cr</option>
            <option>₹2Cr</option>
            <option>₹3Cr+</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>
      <button className="mt-3 text-sm font-medium text-gray-600 hover:text-blue-500">
        Clear All
      </button>
    </div>
  );
};

// Full Filters Modal Component
const FullFiltersModal = ({
  isOpen,
  onClose,
  selectedBHK,
  setSelectedBHK,
  selectedBudget,
  setSelectedBudget,
  selectedCity,
  setSelectedCity,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedBHK: string;
  setSelectedBHK: (value: string) => void;
  selectedBudget: string;
  setSelectedBudget: (value: string) => void;
  selectedCity: string;
  setSelectedCity: (value: string) => void;
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
      <Plus className="h-4 w-4" />
      <span>{children}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center lg:p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
      
      {/* Mobile: Full screen side panel */}
      <div className="relative lg:hidden flex h-full w-full max-w-md flex-col overflow-y-auto bg-white shadow-xl ml-auto">
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
              <button
                onClick={() => setSelectedCity('Ahmedabad')}
                className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium ${
                  selectedCity === 'Ahmedabad'
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                }`}
              >
                Ahmedabad
              </button>
              <button
                onClick={() => setSelectedCity('Gandhinagar')}
                className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium ${
                  selectedCity === 'Gandhinagar'
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                }`}
              >
                Gandhinagar
              </button>
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
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-3 text-sm"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800">Property Type</label>
              <button className="text-sm font-medium text-gray-500 hover:text-blue-500">
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterButton onClick={() => {}}>Flat</FilterButton>
              <FilterButton onClick={() => {}}>Duplex</FilterButton>
              <FilterButton onClick={() => {}}>Penthouse</FilterButton>
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
              {['1', '2', '3', '4', '5', '6', '7'].map((bhk) => (
                <FilterButton
                  key={bhk}
                  onClick={() => setSelectedBHK(bhk)}
                  isActive={selectedBHK === bhk}
                >
                  {bhk} BHK
                </FilterButton>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800">Budget</label>
              <button
                onClick={() => setSelectedBudget('')}
                className="text-sm font-medium text-gray-500 hover:text-blue-500"
              >
                Clear All
              </button>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="relative flex-1">
                <select className="h-full w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300">
                  <option>Min</option>
                  <option>₹50L</option>
                  <option>₹75L</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
              <span className="text-gray-500">–</span>
              <div className="relative flex-1">
                <select className="h-full w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300">
                  <option>Max</option>
                  <option>₹1Cr</option>
                  <option>₹1.5Cr</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800">Possession</label>
              <button className="text-sm font-medium text-gray-500 hover:text-blue-500">
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterButton onClick={() => {}}>Ready to Move</FilterButton>
              <FilterButton onClick={() => {}}>Upto 1 Year</FilterButton>
              <FilterButton onClick={() => {}}>Upto 2 Years</FilterButton>
              <FilterButton onClick={() => {}}>2+ Years</FilterButton>
            </div>
          </div>
        </div>

        <div className="flex gap-3 border-t p-4 sticky bottom-0 bg-white z-10">
          <button
            onClick={() => {
              setSelectedCity('Ahmedabad');
              setSelectedBHK('');
              setSelectedBudget('');
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

      {/* Desktop: Right-hand sidebar */}
      <div className="hidden lg:flex relative h-full w-full max-w-md flex-col overflow-y-auto bg-white shadow-xl ml-auto">
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
              <button
                onClick={() => setSelectedCity('Ahmedabad')}
                className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium ${
                  selectedCity === 'Ahmedabad'
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                }`}
              >
                Ahmedabad
              </button>
              <button
                onClick={() => setSelectedCity('Gandhinagar')}
                className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium ${
                  selectedCity === 'Gandhinagar'
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                }`}
              >
                Gandhinagar
              </button>
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
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-3 text-sm"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800">Property Type</label>
              <button className="text-sm font-medium text-gray-500 hover:text-blue-500">
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterButton onClick={() => {}}>Flat</FilterButton>
              <FilterButton onClick={() => {}}>Duplex</FilterButton>
              <FilterButton onClick={() => {}}>Penthouse</FilterButton>
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
              {['1', '2', '3', '4', '5', '6', '7'].map((bhk) => (
                <FilterButton
                  key={bhk}
                  onClick={() => setSelectedBHK(bhk)}
                  isActive={selectedBHK === bhk}
                >
                  {bhk} BHK
                </FilterButton>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800">Budget</label>
              <button
                onClick={() => setSelectedBudget('')}
                className="text-sm font-medium text-gray-500 hover:text-blue-500"
              >
                Clear All
              </button>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="relative flex-1">
                <select className="h-full w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300">
                  <option>Min</option>
                  <option>₹50L</option>
                  <option>₹75L</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
              <span className="text-gray-500">–</span>
              <div className="relative flex-1">
                <select className="h-full w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300">
                  <option>Max</option>
                  <option>₹1Cr</option>
                  <option>₹1.5Cr</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800">Possession</label>
              <button className="text-sm font-medium text-gray-500 hover:text-blue-500">
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterButton onClick={() => {}}>Ready to Move</FilterButton>
              <FilterButton onClick={() => {}}>Upto 1 Year</FilterButton>
              <FilterButton onClick={() => {}}>Upto 2 Years</FilterButton>
              <FilterButton onClick={() => {}}>2+ Years</FilterButton>
            </div>
          </div>
        </div>

        <div className="flex gap-3 border-t p-4 sticky bottom-0 bg-white z-10">
          <button
            onClick={() => {
              setSelectedCity('Ahmedabad');
              setSelectedBHK('');
              setSelectedBudget('');
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
      className={`flex-shrink-0 w-44 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border cursor-pointer overflow-hidden ${
        isHighlighted ? 'border-blue-800 ring-2 ring-blue-100' : 'border-gray-100'
      }`}
    >
      <div className="relative w-full h-24">
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
      <div className="p-2 flex flex-col">
        <h2 className="text-sm font-bold text-gray-900">{property.price}</h2>
        <p className="text-xs font-semibold text-gray-800 truncate">
          {property.title}
        </p>
        <p className="text-[10px] text-gray-500 truncate mb-1">{property.location}</p>
        <div className="flex items-center gap-2 text-[10px] text-gray-600 pt-1 border-t border-gray-100">
          <div className="flex items-center gap-0.5">
            <BedIcon size={12} className="text-gray-500" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <BathIcon size={12} className="text-gray-500" />
            <span>2</span>
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
          <h2 className="text-xl font-bold text-gray-900">{property.budget}</h2>
          <span className="text-sm text-gray-500">
            <span className="line">{property.price}</span> Onwards
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-3">Flat</p>
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
  const navigate = useNavigate(); // 👈 ADD THIS LINE
  
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null); // Changed to string
  const [mapType, setMapType] = useState<string>('roadmap');
  const [isMapReady, setIsMapReady] = useState(false);

  const [selectedCity, setSelectedCity] = useState<string>('Ahmedabad');
  const [selectedBHK, setSelectedBHK] = useState<string>('');
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  const [showBudgetPopup, setShowBudgetPopup] = useState(false);

  const mapRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({}); // Changed to string key
  const infoWindowRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // ✨ NEW useEffect to fetch properties on mount ✨
  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        // Use the same VITE_API_URL from your admin files
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

            // Attempt to get bedrooms from configuration
            let bedrooms = 0;
            if (dbProject.bhk) { // Best: Use a dedicated 'bhk' field
                bedrooms = parseInt(dbProject.bhk) || 0;
            } else if (dbProject.configurations?.length > 0) {
                // Fallback: Try to parse '3 BHK' from config
                const bhkMatch = (dbProject.configurations[0].type || '').match(/(\d+)\s*BHK/);
                if (bhkMatch && bhkMatch[1]) {
                  bedrooms = parseInt(bhkMatch[1]);
                }
            }

            let area = dbProject.overview?.totalArea || 'N/A';
            if (area === 'N/A' && dbProject.configurations?.length > 0) {
              area = dbProject.configurations[0].area || 'N/A';
            }

            return {
              id: dbProject._id, // Use database _id
              title: dbProject.name,
              price: dbProject.status || 'Price on request',
              location: `${dbProject.area}, ${dbProject.city}`,
              coordinates: coords,
              image: dbProject.image,
              bedrooms: bedrooms,
              area: area,
              city: dbProject.city,
              state: dbProject.state, // 👈 ADD THIS (for :state param)
              locality: dbProject.area, // 👈 ADD THIS (for :area param)
              // This field needs to match your filter.
              // You should add a 'budget' dropdown in your admin form
              // with values like "₹50L - ₹75L", "₹75L - ₹1Cr"
              budget: dbProject.budget || dbProject.status || 'N/A', 
              developer: dbProject.developer,
            };
          });
          
          setAllProperties(transformedProperties);
          setFilteredProperties(transformedProperties);
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

    if (selectedCity) {
      filtered = filtered.filter((p) => p.city === selectedCity);
    }
    if (selectedBHK) {
      const bhkNum = parseInt(selectedBHK);
      filtered = filtered.filter((p) => p.bedrooms === bhkNum);
    }
    if (selectedBudget) {
      filtered = filtered.filter((p) => p.budget === selectedBudget);
    }

    setFilteredProperties(filtered);
    updateVisiblePropertiesOnMapMove(filtered);
    
  }, [selectedCity, selectedBHK, selectedBudget, allProperties]); // Added allProperties

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

    // Check if mobile device
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
      gestureHandling: isMobile ? 'greedy' : 'auto', // Enable one-finger movement on mobile
    });

    mapRef.current = map;
    infoWindowRef.current = new window.google.maps.InfoWindow();

    // Add click listener to map for zooming to clicked location
    window.google.maps.event.addListener(map, 'click', (event: any) => {
      if (event.latLng) {
        map.setZoom(16);
        map.panTo(event.latLng);
      }
    });

    const boundsListener = () => {
      updateVisiblePropertiesOnMapMove(filteredProperties);
    };
    window.google.maps.event.addListener(map, 'bounds_changed', boundsListener);
    window.google.maps.event.addListener(map, 'idle', boundsListener);

    setTimeout(() => updateVisiblePropertiesOnMapMove(filteredProperties), 500);
  }, [isMapReady]);

  useEffect(() => {
    if (!mapRef.current || !window.google) return;

    Object.values(markersRef.current).forEach((marker: any) => marker.setMap(null));
    markersRef.current = {};

    filteredProperties.forEach((property) => {
      const pinSVG = `
        <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0C11.716 0 5 6.716 5 15c0 8.284 15 35 15 35s15-26.716 15-35c0-8.284-6.716-15-15-15z" 
                fill="#4299E1" 
                filter="url(#shadow${property.id})"/>
          <circle cx="20" cy="15" r="8" fill="white"/>
          <text x="20" y="20" font-size="14" font-weight="bold" fill="#4299E1" text-anchor="middle">₹</text>
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
  }, [filteredProperties, isMapReady]);

  useEffect(() => {
    if (mapRef.current && window.google) {
      mapRef.current.setMapTypeId(mapType);
    }
  }, [mapType]);

  const handleMarkerClick = (property: Property) => {
    setSelectedPropertyId(property.id);

    // Zoom to marker location
    if (mapRef.current) {
      mapRef.current.setZoom(16);
      mapRef.current.panTo(property.coordinates);
    }

    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const isSelected = id === property.id; // UPDATED: String comparison
      const markerColor = isSelected ? '#F56565' : '#4299E1';
      const pinSVG = `
        <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0C11.716 0 5 6.716 5 15c0 8.284 15 35 15 35s15-26.716 15-35c0-8.284-6.716-15-15-15z" 
                fill="${markerColor}" 
                filter="url(#shadow${id})"/>
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

    if (infoWindowRef.current && markersRef.current[property.id]) {
      const content = `
        <div style="width: 240px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <img src="${property.image}" alt="${
        property.title
      }" style="width: 100%; height: 110px; object-fit: cover; border-radius: 6px; margin-bottom: 8px;" />
          <h3 style="font-weight: 600; font-size: 15px; margin: 0 0 4px 0; color: #1f2937; line-height: 1.3;">${
            property.title
          }</h3>
          <p style="font-size: 12px; color: #6b7280; margin: 0 0 8px 0;">${
            property.location
          }</p>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 16px; font-weight: 700; color: #4299E1;">${
              property.price
            }</span>
            <span style="font-size: 12px; color: #6b7280; font-weight: 500;">${
              property.bedrooms
            } BHK • ${property.area}</span>
          </div>
        </div>
      `;
      infoWindowRef.current.setContent(content);
      infoWindowRef.current.open(mapRef.current, markersRef.current[property.id]);
    }
  };
  const handlePropertyCardClick = (property: Property) => {
    // Helper function to create URL-friendly "slugs"
    const createSlug = (text: string | undefined | null) => {
      if (!text) return ''; // Handle cases where text might be null or undefined

      return text
        .toString()       // Ensure it's a string
        .toLowerCase()    // 1. Convert to lowercase (e.g., "Gujarat" -> "gujarat")
        .trim()           // 2. Remove leading/trailing spaces (e.g., "shivalik " -> "shivalik")
        .replace(/\s+/g, '-') // 3. Replace one or more spaces with a single hyphen (e.g., "orchid paradise" -> "orchid-paradise")
        .replace(/[^a-z0-9-]/g, ''); // 4. Remove any remaining characters that are not letters, numbers, or hyphens
    };

    // Use the slug helper for each part of the URL
    const state = createSlug(property.state);
    const city = createSlug(property.city);
    const area = createSlug(property.locality); // 'locality' is the :area param
    const name = createSlug(property.title);    // 'title' is the :name param

    // Navigate using the new, clean slugs.
    // We no longer use encodeURIComponent because we have already manually formatted the strings for the URL.
    navigate(`/project/${state}/${city}/${area}/${name}`);
  };
  // This function is now handled by the useEffect
  const handleSearch = () => {
    console.log('Applying filters...');
    // The useEffect listening to filter changes already does the work.
    // We can just trigger a map move update.
    updateVisiblePropertiesOnMapMove(filteredProperties);
  };

  const handleClear = () => {
    setSelectedCity('Ahmedabad');
    setSelectedBHK('');
    setSelectedBudget('');
  };

  const renderCityFilter = (className: string = "min-w-[150px]") => (
    <select
      value={selectedCity}
      onChange={(e) => setSelectedCity(e.target.value)}
      className={`px-4 py-3 border-2 border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-white text-gray-700 hover:border-gray-400 ${className}`}
    >
      <option value="">Select City</option>
      <option value="Ahmedabad">Ahmedabad</option>
      <option value="Gandhinagar">Gandhinagar</option>
      <option value="Surat">Surat</option>
    </select>
  );

  const renderBHKFilter = () => (
    <select
      value={selectedBHK}
      onChange={(e) => setSelectedBHK(e.target.value)}
      className="px-4 py-3 border-2 border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-white text-gray-700 hover:border-gray-400 min-w-[140px] flex-shrink-0"
    >
      <option value="">Select BHK</option>
      <option value="1">1 BHK</option>
      <option value="2">2 BHK</option>
      <option value="3">3 BHK</option>
      <option value="4">4 BHK</option>
      <option value="5">5 BHK</option>
    </select>
  );

  const renderBudgetFilter = () => (
    <select
      value={selectedBudget}
      onChange={(e) => setSelectedBudget(e.target.value)}
      className="px-4 py-3 border-2 border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-white text-gray-700 hover:border-gray-400 min-w-[150px] flex-shrink-0"
    >
      <option value="">Select Budget</option>
      <option value="₹50L - ₹75L">₹50L - ₹75L</option>
      <option value="₹75L - ₹1Cr">₹75L - ₹1Cr</option>
      <option value="₹1Cr - ₹1.5Cr">₹1Cr - ₹1.5Cr</option>
      <option value="₹1.5Cr - ₹2Cr">₹1.5Cr - ₹2Cr</option>
    </select>
  );

  const renderPopularButtons = () => (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-600 font-semibold">Popular:</span>
      <button
        className="px-4 py-1.5 text-xs font-medium rounded-full transition-all hover:shadow-md"
        style={{ backgroundColor: '#EBF5FF', color: '#4299E1' }}
      >
        Apartments
      </button>
      <button
        className="px-4 py-1.5 text-xs font-medium rounded-full transition-all hover:shadow-md"
        style={{ backgroundColor: '#EBF5FF', color: '#4299E1' }}
        onClick={() => setSelectedBHK('2')}
      >
        2 BHK
      </button>
      <button
        className="px-4 py-1.5 text-xs font-medium rounded-full transition-all hover:shadow-md"
        style={{ backgroundColor: '#EBF5FF', color: '#4299E1' }}
        onClick={() => setSelectedBHK('3')}
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
            <div className="flex-1 relative max-w-full">
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
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all hover:border-gray-400"
              />
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
              onClick={handleSearch}
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
            {/* Back Button */}
            <button 
              onClick={() => window.history.back()}
              className="p-2.5 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0"
            >
              <ArrowLeft size={18} className="text-gray-700" />
            </button>
            
            {/* City Filter - Smaller */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-2.5 border-2 border-gray-300 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-white text-gray-700 hover:border-gray-400 flex-shrink-0"
            >
              <option value="">City</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Gandhinagar">Gandhinagar</option>
              <option value="Surat">Surat</option>
            </select>
            
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:border-transparent"
            />
            
            {/* Filter Button */}
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
            >
              Apartments
            </button>
            <button
              className="px-4 py-1.5 text-xs font-medium rounded-full transition-all shadow-sm flex-shrink-0"
              style={{ backgroundColor: '#EBF5FF', color: '#4299E1' }}
              onClick={() => setSelectedBHK('2')}
            >
              2 BHK
            </button>
            <button
              className="px-4 py-1.5 text-xs font-medium rounded-full transition-all shadow-sm flex-shrink-0"
              style={{ backgroundColor: '#EBF5FF', color: '#4299E1' }}
              onClick={() => setSelectedBHK('3')}
            >
              3 BHK
            </button>
            <button
              className="px-4 py-1.5 text-xs font-medium rounded-full transition-all shadow-sm flex-shrink-0"
              style={{ backgroundColor: '#EBF5FF', color: '#4299E1' }}
            >
              Villas
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
<div className="flex-1 flex flex-col overflow-hidden relative">

  {/* --- MOBILE VIEW --- */}
  {/* This container shows only on mobile (under lg breakpoint) */}
  <div className="lg:hidden flex-1 flex flex-col overflow-hidden relative">
    {/* Map Container (Mobile) */}
    <div className="w-full h-full relative">
      <div
        ref={mapContainerRef}
        className="h-full w-full"
        style={{ height: '100%', width: '100%' }}
      />

      {/* Map Overlays (Copied for mobile view) */}
      {isMapReady && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg z-10">
          <div className="flex overflow-hidden rounded-lg">
            <button
              onClick={() => setMapType('roadmap')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                mapType === 'roadmap' ? 'text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              style={{ backgroundColor: mapType === 'roadmap' ? '#4299E1' : 'white' }}
            >
              Map
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`px-4 py-2 text-sm font-medium transition-colors border-l ${
                mapType === 'satellite' ? 'text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              style={{ backgroundColor: mapType === 'satellite' ? '#4299E1' : 'white' }}
            >
              Satellite
            </button>
            <button
              onClick={() => setMapType('hybrid')}
              className={`px-4 py-2 text-sm font-medium transition-colors border-l ${
                mapType === 'hybrid' ? 'text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              style={{ backgroundColor: mapType === 'hybrid' ? '#4299E1' : 'white' }}
            >
              Hybrid
            </button>
          </div>
        </div>
      )}
      
      {/* Loading Overlay (Copied for mobile view) */}
      {(!isMapReady || isLoading) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-20">
          <div className="text-center">
            <div
              className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 mb-4"
              style={{ borderColor: '#4299E1' }}
            ></div>
            <p className="text-gray-600 font-medium">
              {isLoading ? 'Loading properties...' : 'Loading Google Maps...'}
            </p>
          </div>
        </div>
      )}
    </div>

    {/* Mobile Bottom Sheet List - Fixed Position */}
    {/* (This is your existing mobile sheet code - unchanged) */}
    <div
      className={`block lg:hidden fixed bottom-0 left-0 right-0 w-full bg-gray-50 rounded-t-2xl shadow-2xl z-20 transition-all duration-300 ease-in-out ${
        isSheetOpen ? 'h-[240px]' : 'h-14'
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
          isSheetOpen ? 'h-[calc(240px-53px)]' : 'h-0'
        }`}
      >
        {isLoading ? (
          <div className="text-center py-8 text-gray-500 w-full">
            <p className="font-medium text-sm">Loading properties...</p>
          </div>
        ) : visibleProperties.length === 0 ? (
          <div className="text-center py-8 text-gray-500 w-full">
            <p className="font-medium text-sm">No properties in view</p>
            <p className="text-xs mt-1">Move or zoom the map</p>
          </div>
        ) : (
          <div className="flex p-3 space-x-2 h-full">
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


  {/* --- DESKTOP RESIZABLE VIEW --- */}
  {/* This container shows only on desktop (lg breakpoint and up) */}
  <PanelGroup direction="horizontal" className="hidden lg:flex flex-1 overflow-hidden relative">
    
    {/* Panel 1: The Map */}
    <Panel defaultSize={65} minSize={40} className="relative">
      <div
        ref={mapContainerRef}
        className="h-full w-full"
        style={{ height: '100%', width: '100%' }}
      />
      
      {/* Map Overlays (for desktop view) */}
      {isMapReady && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg z-10">
          <div className="flex overflow-hidden rounded-lg">
            <button
              onClick={() => setMapType('roadmap')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                mapType === 'roadmap' ? 'text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              style={{ backgroundColor: mapType === 'roadmap' ? '#4299E1' : 'white' }}
            >
              Map
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`px-4 py-2 text-sm font-medium transition-colors border-l ${
                mapType === 'satellite' ? 'text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              style={{ backgroundColor: mapType === 'satellite' ? '#4299E1' : 'white' }}
            >
              Satellite
            </button>
            <button
              onClick={() => setMapType('hybrid')}
              className={`px-4 py-2 text-sm font-medium transition-colors border-l ${
                mapType === 'hybrid' ? 'text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              style={{ backgroundColor: mapType === 'hybrid' ? '#4299E1' : 'white' }}
            >
              Hybrid
            </button>
          </div>
        </div>
      )}

      {isMapReady && (
        <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg text-sm text-gray-600 z-10 hidden lg:block">
          <p className="font-semibold">Move map to filter properties</p>
        </div>
      )}

      {/* Loading Overlay (for desktop view) */}
      {(!isMapReady || isLoading) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-20">
          <div className="text-center">
            <div
              className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 mb-4"
              style={{ borderColor: '#4299E1' }}
            ></div>
            <p className="text-gray-600 font-medium">
              {isLoading ? 'Loading properties...' : 'Loading Google Maps...'}
            </p>
          </div>
        </div>
      )}
    </Panel>

    {/* The Resizable Handle */}
    <PanelResizeHandle className="w-1.5 bg-gray-200 hover:bg-blue-600 active:bg-blue-700 transition-colors z-10" />

    {/* Panel 2: The Sidebar */}
    <Panel defaultSize={35} minSize={25}>
      <div className="w-full h-full bg-white overflow-y-auto p-4 space-y-4">
        <div className="mb-3">
          <h1 className="text-xl font-bold text-gray-800">
            Properties in {selectedCity || 'Ahmedabad'}
          </h1>
          <p className="text-sm text-gray-600">
            {visibleProperties.length} properties visible
          </p>
        </div>
        
        {isLoading ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg font-medium">Loading properties...</p>
          </div>
        ) : visibleProperties.length === 0 ? (
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
    </Panel>
  </PanelGroup>
</div>


      {/* Full Filter Modal */}
      <FullFiltersModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        selectedBHK={selectedBHK}
        setSelectedBHK={setSelectedBHK}
        selectedBudget={selectedBudget}
        setSelectedBudget={setSelectedBudget}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
    </div>
  );
}