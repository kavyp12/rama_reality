import React, { useState } from 'react';

// --- TYPE DEFINITIONS ---
type LinkItem = {
  text: string;
  href: string;
};

type PropertyData = {
  bhk: LinkItem[];
  flats: LinkItem[];
  budget: LinkItem[];
  popular3bhk: LinkItem[];
  popular4bhk: LinkItem[];
  projects: LinkItem[];
  localities: LinkItem[];
};

// --- DATA ---
const propertyData: PropertyData = {
  bhk: [
    { text: '2 BHK Flats in Ahmedabad', href: '#' },
    { text: '2.5 BHK Flats in Ahmedabad', href: '#' },
    { text: '3 BHK Flats in Ahmedabad', href: '#' },
    { text: '4 BHK Flats in Ahmedabad', href: '#' },
    { text: '5 BHK Flats in Ahmedabad', href: '#' },
    { text: '6 BHK Flats in Ahmedabad', href: '#' },
    { text: '3 BHK with Penthouse', href: '#' },
    { text: '4 BHK with Penthouse', href: '#' },
    { text: '5 BHK with Penthouse', href: '#' },
    { text: '4 BHK Duplex', href: '#' },
    { text: '5 BHK Duplex', href: '#' },
  ],
  flats: [
    { text: 'Flats in Iscon Ambli', href: '#' },
    { text: 'Flats in Science City', href: '#' },
    { text: 'Flats in Vaishnodevi', href: '#' },
    { text: 'Flats in Shilaj', href: '#' },
    { text: 'Flats in Shela', href: '#' },
    { text: 'Flats in Gota', href: '#' },
    { text: 'Flats in Sindhubhavan Road', href: '#' },
    { text: 'Flats in Linkin Road', href: '#' },
    { text: 'Flats in Bopal', href: '#' },
    { text: 'Flats in Thaltej', href: '#' },
    { text: 'Flats in Bodakdev', href: '#' },
  ],
  budget: [
    { text: 'Flats under 50 lakhs in Ahmedabad', href: '#' },
    { text: 'Flats under 75 lakhs in Ahmedabad', href: '#' },
    { text: 'Flats under 1 Cr in Ahmedabad', href: '#' },
    { text: '2 BHK Flats under 70 lakhs', href: '#' },
    { text: '3 BHK Flats under 80 Lakhs', href: '#' },
    { text: '3 BHK Flats under 1 Cr', href: '#' },
    { text: '3 BHK Flats under 1.5 Cr', href: '#' },
    { text: '4 BHK Flats under 3 Cr', href: '#' },
  ],
  popular3bhk: [
    { text: '3 BHK Apartments in Gota', href: '#' },
    { text: '3 BHK Flats in Shilaj', href: '#' },
    { text: '3 BHK Flats in Gota', href: '#' },
    { text: '3 BHK Flats in Shela', href: '#' },
    { text: '3 BHK Apartments in Shela', href: '#' },
    { text: '3 BHK Apartments in Linkin Road', href: '#' },
    { text: '3 BHK Flats in Linkin Road', href: '#' },
    { text: '3 BHK Apartments in Shilaj', href: '#' },
    { text: '3 BHK Apartments in Vaishnodevi', href: '#' },
    { text: '3 BHK Flats in Vaishnodevi', href: '#' },
    { text: '3 BHK in Adani Shantigram', href: '#' },
    { text: '3 BHK in Jagatpur', href: '#' },
  ],
  popular4bhk: [
    { text: '4 BHK Apartments in Ambli', href: '#' },
    { text: '4 BHK Apartments in Science City', href: '#' },
    { text: '4 BHK Apartments in Sindhubhavan Road', href: '#' },
    { text: '4 BHK Apartments in Thaltej', href: '#' },
    { text: '4 BHK Flats in Ambli', href: '#' },
    { text: '4 BHK Flats in Bopal', href: '#' },
    { text: '4 BHK Flats in Sindhubhavan Road', href: '#' },
    { text: '4 BHK Flats in Thaltej', href: '#' },
    { text: '4 BHK Flats in Bodakdev Ahmedabad', href: '#' },
    { text: '4 BHK Apartments in Bopal', href: '#' },
    { text: '4 BHK Flats in Science City', href: '#' },
    { text: '4 BHK Flat in Iscon Ambli', href: '#' },
  ],
  projects: [
    { text: 'Binori Belmont', href: '#' },
    { text: 'Palak Elina', href: '#' },
    { text: 'Shaligram Luxuria', href: '#' },
    { text: 'The Bellagio', href: '#' },
    { text: 'Westlands', href: '#' },
    { text: 'Oriental Viola', href: '#' },
    { text: 'Satyamev Luxor', href: '#' },
    { text: 'Swati Senor', href: '#' },
    { text: 'True The North', href: '#' },
    { text: 'Indraprasth Shivanta', href: '#' },
    { text: 'Ratnaakar Artesia', href: '#' },
    { text: 'Sheetal Gharana', href: '#' },
    { text: 'The Kimana Tower', href: '#' },
    { text: 'Manor Ananda', href: '#' },
    { text: 'Royce One', href: '#' },
    { text: 'Skydeck Select', href: '#' },
    { text: 'The Waterfall', href: '#' },
    { text: 'Maruti Aatman', href: '#' },
    { text: 'Sanctum', href: '#' },
    { text: 'Splendora I', href: '#' },
    { text: 'The Whitecraft', href: '#' },
    { text: 'Oeuvre 3', href: '#' },
    { text: 'Sankalp Grace 2', href: '#' },
    { text: 'Sun Sky Park', href: '#' },
    { text: 'Tranquil', href: '#' },
  ],
  localities: [
    { text: 'Ambli', href: '#' },
    { text: 'Ayaan', href: '#' },
    { text: 'Science City', href: '#' },
    { text: 'Shela', href: '#' },
    { text: 'Vaishnodevi', href: '#' },
    { text: 'Zundal', href: '#' },
    { text: 'Gota', href: '#' },
    { text: 'Shilaj', href: '#' },
    { text: 'Bopal', href: '#' },
    { text: 'Thaltej', href: '#' },
    { text: 'Bodakdev', href: '#' },
    { text: 'Sindhubhavan Road', href: '#' },
    { text: 'Linkin Road', href: '#' },
    { text: 'Iscon Ambli', href: '#' },
  ],
};

// --- MAIN COMPONENT ---
const AhmedabadPropertySearch: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sale' | 'rent'>('sale');
  const [activeArea, setActiveArea] = useState<'westAhmedabad' | 'eastAhmedabad' | 'allAhmedabad'>('allAhmedabad');

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 font-sans">
      <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
        Popular Property Searches in Ahmedabad
      </h2>

      {/* Sale/Rent Tabs */}
      <nav className="flex justify-center border-b border-gray-200 mb-4">
        <button
          className={`py-2 px-6 text-sm font-medium border-b-2 ${
            activeTab === 'sale'
              ? 'border-blue-600 text-gray-900 font-bold'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('sale')}
        >
          Sale
        </button>
        <button
          className={`py-2 px-6 text-sm font-medium border-b-2 ${
            activeTab === 'rent'
              ? 'border-blue-600 text-gray-900 font-bold'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('rent')}
        >
          Rent
        </button>
      </nav>

      {/* Area Pills */}
      <nav className="flex justify-center gap-2 mb-6 flex-wrap">
        <button
          className={`py-1.5 px-4 rounded-full text-xs font-medium border ${
            activeArea === 'westAhmedabad'
              ? 'bg-blue-50 border-blue-600 text-blue-600'
              : 'bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200'
          }`}
          onClick={() => setActiveArea('westAhmedabad')}
        >
          West Ahmedabad
        </button>
        <button
          className={`py-1.5 px-4 rounded-full text-xs font-medium border ${
            activeArea === 'eastAhmedabad'
              ? 'bg-blue-50 border-blue-600 text-blue-600'
              : 'bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200'
          }`}
          onClick={() => setActiveArea('eastAhmedabad')}
        >
          East Ahmedabad
        </button>
        <button
          className={`py-1.5 px-4 rounded-full text-xs font-medium border ${
            activeArea === 'allAhmedabad'
              ? 'bg-blue-50 border-blue-600 text-blue-600'
              : 'bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200'
          }`}
          onClick={() => setActiveArea('allAhmedabad')}
        >
          All Ahmedabad
        </button>
      </nav>

     {/* Content Section */}
{activeTab === 'sale' && (
  <div className="space-y-6">
    
    {/* Popular BHK & Flat Searches Combined */}
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Popular BHK & Flat Searches
      </h3>
      <hr className="border-t border-gray-200 mb-3" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2">
        {[...propertyData.bhk, ...propertyData.flats].map((link) => (
          <a
            key={link.text}
            href={link.href}
            className="text-xs text-blue-700 hover:underline"
          >
            {link.text}
          </a>
        ))}
      </div>
    </section>

    {/* Budget & 3BHK/4BHK Combined */}
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Budget & Premium Searches
      </h3>
      <hr className="border-t border-gray-200 mb-3" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2">
        {[...propertyData.budget, ...propertyData.popular3bhk, ...propertyData.popular4bhk].map((link) => (
          <a
            key={link.text}
            href={link.href}
            className="text-xs text-blue-700 hover:underline"
          >
            {link.text}
          </a>
        ))}
      </div>
    </section>

    {/* Projects & Localities Combined */}
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        New Projects & Popular Localities
      </h3>
      <hr className="border-t border-gray-200 mb-3" />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-2">
        {[...propertyData.projects, ...propertyData.localities].map((link) => (
          <a
            key={link.text}
            href={link.href}
            className="text-xs text-blue-700 hover:underline"
          >
            {link.text}
          </a>
        ))}
      </div>
    </section>

  </div>
)}

{/* Rent Content */}
{activeTab === 'rent' && (
  <div className="text-center py-12 text-gray-500">
    <p className="text-base">Rental property listings for Ahmedabad coming soon.</p>
  </div>
)}
</div>
);
};

export default AhmedabadPropertySearch;
