import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link } from "react-router-dom";
import Navbar from '../../components/Navbar';
import { 
    HeartIcon, ChevronDownIcon, BuildingIcon, MapPinIcon, TrainIcon, PlaneIcon, 
    PhoneIcon, MessageCircleIcon, XIcon, SearchIcon, CheckCircleIcon, 
    BedIcon, BathIcon, HomeIcon, MailIcon 
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';


// --- FILTER DATA CONSTANTS ---
const filterOptions = {
    localities: [
        'Adani Shantigram', 'Ambawadi', 'Bhadaj', 'Bodakdev', 'Bopal', 'Central Bopal',
        'Chandkheda', 'Ambli', 'Chharodi', 'Hebatpur', 'Jagatpur', 'Koteshwer', 'Maninagar',
        'Ghuma', 'Isanpur', 'Jodhpur', 'Gota', 'Iscon ambli', 'Khoraj', 'Linkin Road',
        'Nana Chiloda', 'Makarba', 'Naranpura', 'Narol', 'Navrangpura', 'New Ranip', 'Ognaj',
        'New Maninagar', 'Paldi', 'Panjrapole', 'Prahlad Nagar', 'Sabarmati', 'Sanand',
        'Sanathal', 'Satellite', 'Science City', 'Science Park', 'SG highway', 'Shela Shilaj',
        'Sindhubhavan Road', 'Sola', 'South Bopal', 'Thaltej', 'Tragad', 'Vaishnodevi',
        'Zundal', 'Vastrapur', 'Shela'
    ],
    bhk: ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', '6 BHK', '7 BHK'],
    possession: ['Ready to Move', 'Upto 1 Year', 'Upto 2 Years', '2+ Years'],
    propertyType: ['Flat', 'Penthouse', 'Duplex', 'Villa', 'House'],
    sortBy: ['Relevance', 'New Launch', 'Price: Low to High', 'Price: High to Low', 'Near Possession']
};

const initialFilters = {
    localities: [],
    bhk: [],
    budget: { min: '', max: '' },
    possession: [],
    propertyType: [],
    sortBy: ['Relevance'],
    searchQuery: '',
};

// --- MAPPING FOR NAVBAR FILTERS ---
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

// --- UTILITY FUNCTIONS ---
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

const getPossessionMonths = (possession: string): number => {
    const possessionLower = possession.toLowerCase();
    if (possessionLower.includes('ready')) return 0;
    const monthNames = ['january', 'february', 'march', 'april', 'may', 'june',
                        'july', 'august', 'september', 'october', 'november', 'december'];
    for (let i = 0; i < monthNames.length; i++) {
        if (possessionLower.includes(monthNames[i])) {
            const yearMatch = possession.match(/\d{4}/);
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

const matchesPropertyType = (project: any, typeFilters: string[]): boolean => {
    if (typeFilters.length === 0) return true;
    const projectTypes = project.configurations.map((config: any) => {
        const words = config.type.split(' ');
        return words[words.length - 1];
    });
    return projectTypes.some((type: string) => typeFilters.includes(type));
};

const matchesPossession = (project: any, possessionFilters: string[]): boolean => {
    if (possessionFilters.length === 0) return true;
    const projectPossessionMonths = getPossessionMonths(project.possession);
    return possessionFilters.some(filter => {
        switch (filter) {
            case 'Ready to Move': return projectPossessionMonths === 0;
            case 'Upto 1 Year': return projectPossessionMonths > 0 && projectPossessionMonths <= 12;
            case 'Upto 2 Years': return projectPossessionMonths > 12 && projectPossessionMonths <= 24;
            case '2+ Years': return projectPossessionMonths > 24;
            default: return false;
        }
    });
};

// --- TAG FILTER DROPDOWN ---
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
        const isSortBy = label.toLowerCase().includes('sort by');
        const newSelected = isSortBy
            ? [option]
            : selected.includes(option)
                ? selected.filter((item: string) => item !== option)
                : [...selected, option];
        onChange(newSelected);
    };

    const clearSelection = () => {
        onChange(label.toLowerCase().includes('sort by') ? ['Relevance'] : []);
    };

    const getDisplayLabel = () => {
        const isSortBy = label.toLowerCase().includes('sort by');
        if (isSortBy && selected.length > 0) {
            return `Sort By: ${selected[0]}`;
        }
        if (selected.length > 0) {
            return `${label} (${selected.length})`;
        }
        return label;
    };

    const isActive = selected.length > 0 && !(label.toLowerCase().includes('sort by') && selected[0] === 'Relevance');

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`px-4 py-3 rounded-lg flex items-center gap-1 border transition-colors text-sm ${
                    isActive ? 'bg-blue-100 border-blue-800 text-blue-800' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
            >
                <span>{getDisplayLabel()}</span>
                <ChevronDownIcon size={16} />
            </button>
            {isOpen && (
                <div className="absolute top-full mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-20 p-4">
                    <div className={`grid ${label === 'BHK' ? 'grid-cols-4' : 'grid-cols-3'} gap-3 max-h-80 overflow-y-auto`}>
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

// --- BUDGET DROPDOWN ---
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

    const isActive = selected.min || selected.max;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`px-4 py-3 rounded-lg flex items-center gap-1 border transition-colors text-sm ${
                    isActive ? 'bg-blue-100 border-blue-800 text-blue-800' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
            >
                <span>{getDisplayLabel()}</span>
                <ChevronDownIcon size={16} />
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

// --- FLAT CARD ---
const FlatCard = ({ flat }: { flat: any }) => {
    const firstConfig = flat.configurations?.[0] || {};
    const bhkMatch = firstConfig.type?.match(/(\d+)\s*BHK/i);
    const bedCount = bhkMatch ? bhkMatch[1] : (flat.bhk ? flat.bhk.split(' ')[0] : 'N/A');
    const propertyType = firstConfig.type?.split(' ').pop() || 'Property';

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col sm:flex-row h-auto sm:h-[290px]">
            {/* Image Section */}
            <div className="sm:w-2/5 relative h-64 sm:h-full flex-shrink-0">
              <Link to={`/project/${flat.slug}`} className="block h-full">
                    <img 
                        src={flat.image} 
                        alt={flat.name} 
                        className="w-full h-full object-cover" 
                    />
                </Link>
                
                {/* Verified Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-semibold py-1.5 px-3 rounded-md flex items-center gap-1">
                    <CheckCircleIcon size={14} className="text-blue-700" />
                    Verified
                </div>
                
                {/* Heart Icon */}
                <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-lg hover:bg-white transition-colors">
                    <HeartIcon size={20} className="text-gray-800" />
                </button>

                {/* Image Count */}
                <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs font-medium py-1 px-2.5 rounded-md">
                    1 / 10
                </div>
            </div>

            {/* Details Section */}
            <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                <div className="flex-1">
                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-800 hover:text-blue-800 transition-colors mb-1">
                        <Link to={`/project/${flat.slug}`}>
                            {flat.name}
                        </Link>
                    </h2>

                    {/* Developer Name with "Made by" */}
                    <p className="text-sm text-gray-600 mb-3 tracking-wide">
                        <span className="normal-case">by </span>
                        <span className="font-bold uppercase">{flat.developer}</span>
                    </p>

                    {/* Price */}
                    <div className="mb-1">
                        <span className="text-xl font-bold text-gray-900">{firstConfig.price || 'Price on Request'}</span>
                        <span className="text-sm text-gray-600 ml-2">{flat.status || ''}</span>
                    </div>

                    {/* Property Type */}
                    <p className="text-sm font-semibold text-gray-800 mb-3">{propertyType}</p>

                    {/* Specs */}
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

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPinIcon size={16} className="flex-shrink-0" />
                        <span className="line-clamp-2">{flat.description}</span>
                    </div>
                </div>

                {/* Bottom Bar: Contact + Builder Name */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-3">
                    <div className="flex items-center gap-2">
                        <button className="p-2.5 rounded-lg bg-gray-100 hover:bg-blue-100 text-blue-800 transition-colors">
                            <MailIcon size={20} />
                            <span className="sr-only">Email</span>
                        </button>
                        <button className="p-2.5 rounded-lg bg-gray-100 hover:bg-blue-100 text-blue-800 transition-colors">
                            <PhoneIcon size={20} />
                            <span className="sr-only">Call</span>
                        </button>
                      <button className="p-2.5 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 transition-colors">
                        <FaWhatsapp size={20} />
                        <span className="sr-only">WhatsApp</span>
                    </button>

                    </div>

                    {/* Builder Name in Corner */}
                    <div className="text-xs font-bold text-gray-700 uppercase tracking-wide truncate ml-2">
                        {flat.developer}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- SCHEDULE FORM ---
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      setError('Please fill in all fields.');
      return;
    }
    if (!consent) {
      setError('Please agree to be contacted.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'Filter Page Form', // We can set the source here
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({ name: '', phone: '', email: '' }); // Reset form
        setConsent(false);
      } else {
        setError(data.error || 'Failed to submit. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
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
        
        {success && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg text-center">
            Thank you! We will be in touch shortly.
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Mobile number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              id="whatsapp-consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="rounded text-blue-800 focus:ring-blue-800"
            />
            <label htmlFor="whatsapp-consent">
              I agree to be contacted by WhatsApp, SMS, Email
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4299E1] text-white font-bold py-3 rounded-lg hover:bg-blue-900 transition-colors disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
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
      </div>
    </div>
  );
};


// --- MAIN PAGE COMPONENT ---
export default function FilterResults() {
    const params = useParams();
    const filterSlug = params['*']?.split('/')[0] || 'all';

    // NEW: State for fetched projects
    const [allProjects, setAllProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const initialFiltersWithSlug = useMemo(() => {
        if (filterSlug === 'all' || !navbarFilterMap[filterSlug]) {
            return initialFilters;
        }
        return {
            ...initialFilters,
            ...navbarFilterMap[filterSlug]
        };
    }, [filterSlug]);

    const [filters, setFilters] = useState<typeof initialFilters>(initialFiltersWithSlug);

    // NEW: Fetch all projects from API
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
                const data = await response.json();
                
                if (data.success) {
                    setAllProjects(data.data);
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
        setFilters(initialFiltersWithSlug);
    }, [filterSlug, initialFiltersWithSlug]);

    const handleFilterChange = (category: keyof typeof initialFilters, value: any) => {
        setFilters(prev => ({
            ...prev,
            [category]: value
        }));
    };

    const clearAllFilters = () => {
        setFilters(initialFilters);
    };

    const filteredAndSortedProjects = useMemo(() => {
        let filteredProjects = [...allProjects];

        if (filters.searchQuery) {
            const lowerCaseQuery = filters.searchQuery.toLowerCase();
            filteredProjects = filteredProjects.filter(project =>
                project.name.toLowerCase().includes(lowerCaseQuery) ||
                project.developer.toLowerCase().includes(lowerCaseQuery) ||
                project.description.toLowerCase().includes(lowerCaseQuery)
            );
        }

        filteredProjects = filteredProjects.filter(project => {
            const { localities, bhk, budget, possession, propertyType } = filters;

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
            filters.searchQuery ||
            filters.localities.length > 0 ||
            filters.bhk.length > 0 ||
            (filters.budget.min || filters.budget.max) ||
            filters.possession.length > 0 ||
            filters.propertyType.length > 0 ||
            filters.sortBy[0] !== 'Relevance';
        const activeFilters: string[] = [];
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
            ? `Properties matching ${activeFilters.join(', ')}`
            : `Properties in Ahmedabad`;
    }, [filters, filterSlug]);

    // Loading state
    if (loading) {
        return (
            <>
                <div className="min-h-screen bg-gray-50 text-gray-900">
                    <Navbar />
                    <main className="pt-28 pb-8">
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

    // Error state
    if (error) {
        return (
            <>
                <div className="min-h-screen bg-gray-50 text-gray-900">
                    <Navbar />
                    <main className="pt-28 pb-8">
                        <div className="container mx-auto px-4 lg:px-8 text-center">
                            <h1 className="text-3xl font-bold text-red-600">Error Loading Projects</h1>
                            <p className="text-gray-600 mt-2">{error}</p>
                        </div>
                    </main>
                </div>
            </>
        );
    }

    // Rest of the component JSX remains the same
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
                div, h1, h2, h3, p, button, span, a, input, label { font-family: 'Poppins', sans-serif; }
            `}</style>
            <div className="min-h-screen bg-gray-50 text-gray-900">
                <Navbar />
                <main className="pt-28 pb-8">
                    <div className="container mx-auto px-4 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">
                            {pageTitle} ({filteredAndSortedProjects.length} Property)
                        </h1>
                        <div className="bg-white py-4 px-6 mb-8 shadow-sm rounded-lg border border-gray-200 flex flex-wrap gap-3 justify-start items-center">
                            <div className="relative flex-grow min-w-[200px]">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <SearchIcon size={20} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by name, builder, or location..."
                                    value={filters.searchQuery}
                                    onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                                    className="w-full px-4 pl-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-800"
                                />
                            </div>
                            <TagFilterDropdown label="Popular Localities" options={filterOptions.localities} selected={filters.localities} onChange={(v) => handleFilterChange('localities', v)} />
                            <TagFilterDropdown label="BHK" options={filterOptions.bhk} selected={filters.bhk} onChange={(v) => handleFilterChange('bhk', v)} />
                            <BudgetDropdown label="Budget" selected={filters.budget} onChange={(v) => handleFilterChange('budget', v)} />
                            <TagFilterDropdown label="Possession" options={filterOptions.possession} selected={filters.possession} onChange={(v) => handleFilterChange('possession', v)} />
                            <TagFilterDropdown label="Property Type" options={filterOptions.propertyType} selected={filters.propertyType} onChange={(v) => handleFilterChange('propertyType', v)} />
                            <TagFilterDropdown label="Sort By" options={filterOptions.sortBy} selected={filters.sortBy} onChange={(v) => handleFilterChange('sortBy', v)} />
                            <button onClick={clearAllFilters} className="text-sm font-semibold text-gray-600 hover:text-blue-800 flex items-center gap-1 ml-auto">
                                <XIcon size={14} />
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
        </>
    );
}