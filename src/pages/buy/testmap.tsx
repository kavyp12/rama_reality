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

// Property interface
interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  coordinates: { lat: number; lng: number };
  image: string;
  bedrooms: number;
  area: string;
  city: string;
  budget: string;
  developer: string;
}

// Sample properties
const properties: Property[] = [
  {
    id: 1,
    title: 'Luxury Villa in Gota',
    price: '₹1.2 Cr',
    location: 'Gota, Ahmedabad',
    coordinates: { lat: 23.0937, lng: 72.5496 },
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=300&fit=crop',
    bedrooms: 4,
    area: '2500 sq.ft',
    city: 'Ahmedabad',
    budget: '₹1Cr - ₹1.5Cr',
    developer: 'Sun Builders',
  },
  {
    id: 2,
    title: 'Modern Apartment in Satellite',
    price: '₹85 Lac',
    location: 'Satellite, Ahmedabad',
    coordinates: { lat: 23.0258, lng: 72.5056 },
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    bedrooms: 3,
    area: '1800 sq.ft',
    city: 'Ahmedabad',
    budget: '₹75L - ₹1Cr',
    developer: 'Adani Realty',
  },
  {
    id: 3,
    title: 'Spacious House in Vastrapur',
    price: '₹95 Lac',
    location: 'Vastrapur, Ahmedabad',
    coordinates: { lat: 23.0395, lng: 72.5242 },
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop',
    bedrooms: 3,
    area: '2000 sq.ft',
    city: 'Ahmedabad',
    budget: '₹75L - ₹1Cr',
    developer: 'Ratnaakar Group',
  },
  {
    id: 4,
    title: 'Premium Flat in Bopal',
    price: '₹70 Lac',
    location: 'Bopal, Ahmedabad',
    coordinates: { lat: 23.0395, lng: 72.4634 },
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
    bedrooms: 2,
    area: '1400 sq.ft',
    city: 'Ahmedabad',
    budget: '₹50L - ₹75L',
    developer: 'Gala Infrastructure',
  },
  {
    id: 5,
    title: 'Elegant Villa in Thaltej',
    price: '₹1.5 Cr',
    location: 'Thaltej, Ahmedabad',
    coordinates: { lat: 23.0545, lng: 72.5085 },
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
    bedrooms: 5,
    area: '3200 sq.ft',
    city: 'Ahmedabad',
    budget: '₹1.5Cr - ₹2Cr',
    developer: 'Pacific Developers',
  },
  {
    id: 6,
    title: 'Cozy Home in Prahlad Nagar',
    price: '₹78 Lac',
    location: 'Prahlad Nagar, Ahmedabad',
    coordinates: { lat: 23.0093, lng: 72.5058 },
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop',
    bedrooms: 3,
    area: '1650 sq.ft',
    city: 'Ahmedabad',
    budget: '₹75L - ₹1Cr',
    developer: 'Shilp Group',
  },
];

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

      {/* Desktop: Centered popup */}
      <div className="hidden lg:block relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden">
        <div className="flex items-center justify-between border-b p-5 bg-white">
          <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
          <button onClick={onClose} className="p-1 text-gray-600 hover:text-gray-900 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-6" style={{ maxHeight: 'calc(85vh - 140px)' }}>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-800">BHK</label>
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
            <label className="text-sm font-semibold text-gray-800">Budget</label>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <select className="h-full w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300">
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
                <select className="h-full w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300">
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
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-800">Property Type</label>
            <div className="flex flex-wrap gap-2">
              <FilterButton onClick={() => {}}>Flat</FilterButton>
              <FilterButton onClick={() => {}}>Duplex</FilterButton>
              <FilterButton onClick={() => {}}>Penthouse</FilterButton>
              <FilterButton onClick={() => {}}>Villa</FilterButton>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-800">Possession</label>
            <div className="flex flex-wrap gap-2">
              <FilterButton onClick={() => {}}>Ready to Move</FilterButton>
              <FilterButton onClick={() => {}}>Upto 1 Year</FilterButton>
              <FilterButton onClick={() => {}}>Upto 2 Years</FilterButton>
              <FilterButton onClick={() => {}}>2+ Years</FilterButton>
            </div>
          </div>
        </div>

        <div className="flex gap-3 border-t p-5 bg-white">
          <button
            onClick={() => {
              setSelectedCity('Ahmedabad');
              setSelectedBHK('');
              setSelectedBudget('');
            }}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-bold text-gray-800 shadow-sm hover:bg-gray-50 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
// PropertyCardSmall Component
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
      className={`flex-shrink-0 w-64 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border cursor-pointer overflow-hidden ${
        isHighlighted ? 'border-blue-800 ring-2 ring-blue-100' : 'border-gray-100'
      }`}
    >
      <div className="relative w-full h-32">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-semibold py-1 px-2 rounded-md flex items-center gap-1">
          <CheckCircleIcon size={12} />
          Verified
        </div>
      </div>
      <div className="p-3 flex flex-col">
        <h2 className="text-base font-bold text-gray-900">{property.price}</h2>
        <p className="text-sm font-semibold text-gray-800 truncate mb-1">
          {property.title}
        </p>
        <p className="text-xs text-gray-500 truncate mb-2">{property.location}</p>
        <div className="flex items-center gap-3 text-xs text-gray-600 pt-1 border-t border-gray-100 mt-2">
          <div className="flex items-center gap-1">
            <BedIcon size={14} className="text-gray-500" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <BathIcon size={14} className="text-gray-500" />
            <span>2</span>
          </div>
          <div className="flex items-center gap-1">
            <HomeIcon size={14} className="text-gray-500" />
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
            <span className="line-through">{property.price}</span> Onwards
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
  const [visibleProperties, setVisibleProperties] = useState<Property[]>(properties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [mapType, setMapType] = useState<string>('roadmap');
  const [isMapReady, setIsMapReady] = useState(false);

  const [selectedCity, setSelectedCity] = useState<string>('Ahmedabad');
  const [selectedBHK, setSelectedBHK] = useState<string>('');
  const [selectedBudget, setSelectedBudget] = useState<string>('');
const [isDesktopFilterOpen, setIsDesktopFilterOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  const [showBudgetPopup, setShowBudgetPopup] = useState(false);

  const mapRef = useRef<any>(null);
  const markersRef = useRef<{ [key: number]: any }>({});
  const infoWindowRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let filtered = properties;

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
  }, [selectedCity, selectedBHK, selectedBudget]);

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
    });

    mapRef.current = map;
    infoWindowRef.current = new window.google.maps.InfoWindow();

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

    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const isSelected = parseInt(id) === property.id;
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
    setSelectedPropertyId(property.id);

    if (mapRef.current) {
      mapRef.current.panTo(property.coordinates);
      mapRef.current.setZoom(15);

      setTimeout(() => {
        handleMarkerClick(property);
      }, 600);
    }
  };

  const handleSearch = () => {
    console.log('Searching with filters:', {
      selectedCity,
      selectedBHK,
      selectedBudget,
    });
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
      className="px-4 py-3 border-2 border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-white text-gray-700 hover:border-gray-400 min-w-[140px]"
    >
      <option value="">Select BHK</option>
      <option value="1">1 BHK</option>
      <option value="2">2 BHK</option>
      <option value="3">3 BHK</option>
      <option value="4">4 BHK</option>
      <option value="5">5 BHK</option>
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
      <Navbar />

    {/* Desktop Filter Bar */}
<div className="hidden lg:block w-full bg-white shadow-lg border-b-2 border-gray-200 z-30 pt-16">
  <div className="w-full px-4 md:px-6 lg:px-10 py-5">
    <div className="flex items-center gap-3 mb-4 w-full">
      {renderCityFilter()}
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

      <button
        onClick={() => setIsDesktopFilterOpen(true)}
        className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg text-sm font-medium bg-white text-gray-700 hover:border-gray-400"
      >
        <SlidersHorizontal size={20} />
        Filters
      </button>

      <button
        onClick={handleClear}
        className="px-6 py-3 rounded-lg font-semibold text-sm"
        style={{ backgroundColor: '#F56565', color: 'white' }}
      >
        Clear
      </button>
      <button
        onClick={handleSearch}
        className="px-6 py-3 rounded-lg font-semibold text-sm"
        style={{ backgroundColor: '#4299E1', color: 'white' }}
      >
        Search
      </button>
    </div>
    {renderPopularButtons()}
  </div>
</div>

      {/* Mobile Filter Bar */}
      <div className="block lg:hidden w-full bg-white shadow-sm z-30 pt-16">
        <div className="p-3 space-y-3">
          <div className="flex items-center gap-2">
            {renderCityFilter("w-auto flex-shrink-0")}
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent"
            />
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="p-3 border-2 border-gray-300 rounded-lg"
            >
              <SlidersHorizontal size={20} />
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
      <div className="flex-1 flex lg:flex-row flex-col overflow-hidden relative">
        
        {/* Map Container */}
        <div className="w-full lg:w-2/3 h-full relative">
          <div
            ref={mapContainerRef}
            className="h-full w-full"
            style={{ height: '100%', width: '100%' }}
          />

          {/* Layer Control */}
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

          {!isMapReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div
                  className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 mb-4"
                  style={{ borderColor: '#4299E1' }}
                ></div>
                <p className="text-gray-600 font-medium">Loading Google Maps...</p>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Sidebar List */}
        <div className="hidden lg:block w-full lg:w-1/3 bg-white overflow-y-auto p-4 space-y-4">
          <div className="mb-3">
            <h1 className="text-xl font-bold text-gray-800">
              Properties in {selectedCity || 'Ahmedabad'}
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

        {/* Mobile Bottom Sheet List */}
        <div
          className={`block lg:hidden absolute bottom-0 left-0 right-0 w-full bg-gray-50 rounded-t-2xl shadow-2xl z-20 transition-all duration-300 ease-in-out ${
            isSheetOpen ? 'h-[300px]' : 'h-16'
          }`}
        >
          <div
            className="flex justify-between items-center p-4 border-b cursor-pointer"
            onClick={() => setIsSheetOpen(!isSheetOpen)}
          >
            <h2 className="text-lg font-bold">
              Properties ({visibleProperties.length} visible)
            </h2>
            {isSheetOpen ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
          </div>

          <div
            className={`overflow-x-auto ${
              isSheetOpen ? 'h-[calc(300px-65px)]' : 'h-0'
            }`}
          >
            {visibleProperties.length === 0 ? (
              <div className="text-center py-10 text-gray-500 w-full">
                <p className="font-medium">No properties in current view</p>
                <p className="text-sm mt-1">Try zooming out or moving the map</p>
              </div>
            ) : (
              <div className="flex p-4 space-x-3">
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