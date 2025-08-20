import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams } from "react-router-dom";
import { projectData } from '../../data/projectsData'; // Ensure this path is correct
import Navbar from '../../components/Navbar'; // Ensure this path is correct
import { HeartIcon, ChevronDownIcon, BuildingIcon, MapPinIcon, TrainIcon, PlaneIcon, PhoneIcon, MessageCircleIcon, XIcon, SearchIcon } from 'lucide-react';

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
        'Zundal', 'Vastrapur'
    ],
    bhk: ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', '6 BHK', '7 BHK'],
    possession: ['Ready to Move', 'Upto 1 Year', 'Upto 2 Years', '2+ Years'],
    propertyType: ['Flat', 'Penthouse', 'Duplex'],
    sortBy: ['Relevance', 'New Launch', 'Price: low to high', 'Price: high to low', 'Near possession']
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

// --- NEW COMPONENT: TAG-STYLE FILTER DROPDOWN ---
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
            ? [option] // Only one selection allowed for Sort By
            : selected.includes(option)
                ? selected.filter((item: string) => item !== option)
                : [...selected, option];
        onChange(newSelected);
    };

    const clearSelection = () => {
        const isSortBy = label.toLowerCase().includes('sort by');
        onChange(isSortBy ? ['Relevance'] : []);
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
                className={`px-4 py-3 rounded-lg flex items-center gap-1 border transition-colors ${
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
                                {option} <span className="text-xs">+</span>
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

// --- MODIFIED INTERACTIVE FILTER DROPDOWN COMPONENT (for Budget only) ---
const InteractiveDropdown = ({
    label,
    options,
    selected,
    onChange,
    type = 'checkbox',
    onClear
}: {
    label: string;
    options: any[];
    selected: any;
    onChange: (value: any) => void;
    type?: 'checkbox' | 'radio' | 'budget';
    onClear?: () => void;
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
    }

    const getDisplayLabel = () => {
        if (selected.min || selected.max) {
            const min = selected.min ? `Min ${selected.min}` : '';
            const max = selected.max ? `Max ${selected.max}` : '';
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
                        <button onClick={() => { onChange({min: '', max: ''}); setIsOpen(false); }} className="text-sm font-semibold text-blue-800 hover:underline">Clear</button>
                        <button onClick={handleBudgetApply} className="px-4 py-2 bg-blue-800 text-white text-sm font-bold rounded-lg hover:bg-blue-900 transition-colors">Done</button>
                    </div>
                </div>
            )}
        </div>
    );
};


// --- UTILITY FUNCTION TO PARSE PRICE STRINGS ---
const parsePrice = (priceStr: string): number => {
    if (!priceStr) return 0;
    const value = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    if (priceStr.toLowerCase().includes('cr')) {
        return value * 100; // Return value in Lacs
    }
    if (priceStr.toLowerCase().includes('lac')) {
        return value;
    }
    return value; // Assume it's in Lacs if no unit
};


// --- EXISTING COMPONENTS (FlatCard, ScheduleForm) - No changes needed here ---
const FlatCard = ({ flat }: { flat: any }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 group flex flex-col lg:flex-row relative">
        {flat.bestOffer && (
            <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-semibold py-1 px-3 rounded-md z-10">
                BEST OFFER
            </div>
        )}
        {flat.image && (
            <div className="lg:w-2/5 relative overflow-hidden">
                <img src={flat.image} alt={flat.name} className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-blue-800 text-white text-xs font-semibold py-1 px-3 rounded-md">RERA</div>
                <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-lg hover:bg-white transition-colors">
                    <HeartIcon size={20} className="text-gray-800" />
                </button>
            </div>
        )}
        <div className="p-6 flex-grow flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-800">{flat.name}</h2>
                </div>
                <p className="text-sm text-gray-500 mb-4">{flat.description}</p>
                {flat.type && (
                    <div className="border-b border-gray-200 pb-4 mb-4">
                        <div className="flex justify-between items-center text-sm font-medium">
                            <span className="text-gray-600">{flat.type} & {flat.type2}</span>
                            <span className="text-gray-600">{flat.area}</span>
                            <span className="text-blue-800 font-bold text-lg">{flat.price}</span>
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-700 mb-6">
                    <div className="flex items-center gap-2"><BuildingIcon size={18} className="text-gray-500" /> <span className="text-gray-500">Zero brokerage</span></div>
                    <div className="flex items-center gap-2"><MapPinIcon size={18} className="text-gray-500" /> <span className="text-gray-500">Possession: {flat.possession}</span></div>
                    <div className="flex items-center gap-2"><TrainIcon size={18} className="text-gray-500" /> <span className="text-gray-500">{flat.metro}</span></div>
                    <div className="flex items-center gap-2"><PlaneIcon size={18} className="text-gray-500" /> <span className="text-gray-500">{flat.airport}</span></div>
                </div>
            </div>
            <div className="mt-auto">
                {flat.builder && (
                    <div className="flex items-center gap-4 text-sm mb-6">
                        <p className="text-gray-600"><span className="font-semibold text-gray-800">By:</span> {flat.builder}</p>
                        <span className="text-gray-300">|</span>
                        <a href="#" className="flex items-center gap-2 text-blue-800 hover:underline font-semibold"><MessageCircleIcon size={16} /><span>Chat Now</span></a>
                    </div>
                )}
                <div className="flex items-center gap-4">
                    <button className="flex-1 border border-blue-800 text-blue-800 font-bold py-3 px-6 rounded-lg hover:bg-blue-800 hover:text-white transition-colors">Brochure</button>
                    <button className="flex-1 bg-blue-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-900 transition-colors">Get Offer</button>
                </div>
            </div>
        </div>
    </div>
);

const ScheduleForm = () => (
    <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-6 sticky top-32">
            <div className="flex flex-col items-center border-b border-gray-200 pb-4 mb-4">
                <h3 className="text-lg font-bold text-gray-800">Schedule your free site visit</h3>
                <p className="text-blue-800 font-semibold text-lg">TODAY</p>
            </div>
            <form className="space-y-4">
                <input type="text" placeholder="Name" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800" />
                <input type="tel" placeholder="Mobile number" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800" />
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" id="whatsapp-consent" className="rounded text-blue-800 focus:ring-blue-800" />
                    <label htmlFor="whatsapp-consent">I agree to be contacted by WhatsApp, SMS, Email</label>
                </div>
                <button type="submit" className="w-full bg-blue-800 text-white font-bold py-3 rounded-lg hover:bg-blue-900 transition-colors">Submit</button>
            </form>
            <div className="mt-6 flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 flex items-center justify-center text-gray-500"><PhoneIcon size={24} /></div>
                <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">Rest assured, our expert will call you within the next 5 minutes.</p>
                    <p className="text-xs text-gray-500">(during working hours)</p>
                </div>
            </div>
            <div className="mt-4 text-center">
                <a href="#" className="text-blue-800 text-sm hover:underline">Read Disclaimer</a>
            </div>
        </div>
    </div>
);


// --- MAIN PAGE COMPONENT ---
export default function FilterResults() {
    const params = useParams();
    const filterSlug = params['*']?.split('/')[0] || 'all';
    // @ts-ignore
    const pageData = projectData[filterSlug] || projectData['all'];

    const [filters, setFilters] = useState<typeof initialFilters>(initialFilters);

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
        let projects = [...pageData.projects];

        // Filtering logic
        projects = projects.filter(project => {
            const { localities, bhk, budget, possession, propertyType, searchQuery, sortBy } = filters;

            const lowerCaseQuery = searchQuery.toLowerCase();
            const matchesSearch = !searchQuery ||
                project.name.toLowerCase().includes(lowerCaseQuery) ||
                project.builder.toLowerCase().includes(lowerCaseQuery) ||
                project.location.toLowerCase().includes(lowerCaseQuery);

            if (!matchesSearch) return false;
            if (localities.length > 0 && !localities.includes(project.location)) return false;
            if (bhk.length > 0 && !bhk.includes(project.bhk)) return false;
            if (propertyType.length > 0 && !propertyType.includes(project.type)) return false;
            if (possession.length > 0 && !possession.includes(project.possession)) return false;

            const projectPrice = parsePrice(project.price);
            if (budget.min && projectPrice < parseFloat(budget.min)) return false;
            if (budget.max && projectPrice > parseFloat(budget.max)) return false;

            return true;
        });

        // Sorting logic
        const sortOption = filters.sortBy[0] || 'Relevance';
        switch (sortOption) {
            case 'Price: low to high':
                projects.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
                break;
            case 'Price: high to low':
                projects.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
                break;
            // Add other sorting logic for 'New Launch', 'Near possession' if data is available
        }

        return projects;

    }, [pageData.projects, filters]);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
                div, h1, h2, h3, p, button, span, a, input, label { font-family: 'Poppins', sans-serif; }
            `}</style>
            <div className="min-h-screen bg-gray-50 text-gray-900">
                <Navbar />
                <main className="pt-32 pb-8">
                    <div className="container mx-auto px-4 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">
                            {pageData.title} in Ahmedabad ({filteredAndSortedProjects.length} results)
                        </h1>

                        {/* --- DYNAMIC FILTER BAR --- */}
                        <div className="bg-white py-4 px-6 mb-8 shadow-sm rounded-lg border border-gray-200 flex flex-wrap gap-3 justify-start items-center">
                            {/* NEW: Search Input Field */}
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

                            <TagFilterDropdown
                                label="Popular localities"
                                options={filterOptions.localities}
                                selected={filters.localities}
                                onChange={(value) => handleFilterChange('localities', value)}
                            />
                            <TagFilterDropdown
                                label="BHK"
                                options={filterOptions.bhk}
                                selected={filters.bhk}
                                onChange={(value) => handleFilterChange('bhk', value)}
                            />
                            <InteractiveDropdown
                                label="Budget"
                                options={[]}
                                selected={filters.budget}
                                onChange={(value) => handleFilterChange('budget', value)}
                                type="budget"
                            />
                            <TagFilterDropdown
                                label="Possession"
                                options={filterOptions.possession}
                                selected={filters.possession}
                                onChange={(value) => handleFilterChange('possession', value)}
                            />
                            <TagFilterDropdown
                                label="Property Type"
                                options={filterOptions.propertyType}
                                selected={filters.propertyType}
                                onChange={(value) => handleFilterChange('propertyType', value)}
                            />
                            <TagFilterDropdown
                                label="Sort By"
                                options={filterOptions.sortBy}
                                selected={filters.sortBy}
                                onChange={(value) => handleFilterChange('sortBy', value)}
                            />
                            <button onClick={clearAllFilters} className="text-sm font-semibold text-gray-600 hover:text-blue-800 flex items-center gap-1 ml-auto">
                                <XIcon size={14} />
                                Clear All
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                {filteredAndSortedProjects.length === 0 ? (
                                    <div className="text-center py-16 bg-white rounded-lg shadow-md">
                                        <h3 className="text-xl font-semibold text-gray-700">No projects found.</h3>
                                        <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
                                    </div>
                                ) : (
                                    filteredAndSortedProjects.map((project: any) => (
                                        <FlatCard key={project.id} flat={project} />
                                    ))
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