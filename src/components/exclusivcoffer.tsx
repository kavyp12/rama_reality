import React, { useState } from 'react';
import { MapPin, ChevronLeft, ChevronRight, Phone, Mail } from 'lucide-react';

// Data for the project cards - Ahmedabad properties
const projectData = [
  {
    id: 1,
    name: 'Binori Belmont',
    type: 'Apartments',
    location: 'Binori Belmont, Ambli, Ahmedabad',
    launchPrice: '₹85 Lacs',
    handover: 'Q4 2025',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    name: 'Satyamev Luxuria',
    type: 'Apartments & Penthouses',
    location: 'Satyamev Luxuria, Science City Road, Ahmedabad',
    launchPrice: '₹1.2 Cr',
    handover: 'Q2 2026',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    name: 'Palak Elina',
    type: 'Villas',
    location: 'Palak Elina, Shela, Ahmedabad',
    launchPrice: null,
    handover: 'Q1 2027',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
  },
  {
    id: 4,
    name: 'The Waterfall',
    type: 'Apartments',
    location: 'The Waterfall, Vaishnodevi Circle, Ahmedabad',
    launchPrice: '₹95 Lacs',
    handover: 'Q3 2026',
    imageUrl: 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=800&h=600&fit=crop',
  },
  {
    id: 5,
    name: 'Royce One',
    type: 'Apartments & Penthouses',
    location: 'Royce One, Shilaj Circle, Ahmedabad',
    launchPrice: '₹1.8 Cr',
    handover: 'Q4 2025',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop',
  },
  {
    id: 6,
    name: 'Manor Ananda',
    type: 'Luxury Apartments',
    location: 'Manor Ananda, Sindhu Bhavan Road, Ahmedabad',
    launchPrice: '₹2.5 Cr',
    handover: 'Q2 2027',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
  },
  {
    id: 7,
    name: 'Skydeck Select',
    type: 'Apartments',
    location: 'Skydeck Select, Gota, Ahmedabad',
    launchPrice: '₹68 Lacs',
    handover: 'Q1 2026',
    imageUrl: 'https://images.unsplash.com/photo-1622396636857-c703e501a9e3?w=800&h=600&fit=crop',
  },
  {
    id: 8,
    name: 'Swati Senor',
    type: 'Apartments',
    location: 'Swati Senor, Bopal, Ahmedabad',
    launchPrice: '₹72 Lacs',
    handover: 'Q3 2025',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
  },
];
function PropertyBanner() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 pt-12">
      <div className="
        relative 
        bg-gradient-to-r from-sky-200 to-sky-300 
        rounded-xl md:rounded-3xl 
        shadow-sm
      ">
        <div className="
          flex items-center 
          px-4 py-6           /* ✅ Super thin mobile */
          sm:px-5 sm:py-8
          md:px-12 md:py-16  /* ✅ Desktop full padding */
        ">

          <div className="flex-1">
            <h1 className="
              text-xl sm:text-2xl md:text-5xl 
              font-light text-gray-800 
              leading-snug sm:leading-snug md:leading-tight
            ">
              <span>Your </span>
              <span className="font-bold text-gray-900">Dream Property</span>
              <span> just a </span>

              <span className="relative inline-block">
                click

                <img
                  src="/click (1).png"
                  alt="cursor"
                  className="
                    absolute 
                    w-4 h-4          /* ✅ Even smaller cursor on mobile */
                    sm:w-5 sm:h-5
                    md:w-10 md:h-10 
                    -bottom-3        /* ✅ Cursor closer */
                    sm:-bottom-4
                    md:-bottom-10 
                    left-1/2
                  "
                  style={{
                    transform: "translateX(-38%) rotate(8deg)"
                  }}
                />
              </span>

              <span> away</span>
            </h1>
          </div>

        </div>
      </div>
    </div>
  );
}


const tabs = ['Ahmedabad', 'Gandhinagar', 'Surat', 'Vadodara', 'Rajkot'];

const NewProject = () => {
  const [activeTab, setActiveTab] = useState(0);

  const scrollLeft = () => {
    const container = document.getElementById('projects-container');
    if (container) {
      container.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('projects-container');
    if (container) {
      container.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white py-12 md:py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4 md:mb-6">
          Browse New Projects in Gujarat
        </h2>

        {/* Tabs - Horizontal Scroll on Mobile */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex justify-start md:justify-center min-w-max md:min-w-0">
            <nav className="flex space-x-4 md:space-x-6 px-2" aria-label="Tabs">
              {tabs.map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(index)}
                  className={`px-3 py-2 text-sm md:text-base font-medium rounded-md transition-all whitespace-nowrap border-b-2
                    ${
                      index === activeTab
                        ? 'border-[#4299E1] text-[#4299E1]'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Project Cards - Scrollable Container */}
        <div className="relative">
          {/* Left Arrow - Hidden on Mobile */}
          <button 
            onClick={scrollLeft}
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>

          <div 
            id="projects-container"
            className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none'
            }}
          >
            
            {projectData.map((project) => (
              <div
                key={project.id}
                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-80 h-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col snap-start"
              >
                {/* Card Image */}
                <div className="relative h-40 sm:h-44 md:h-48 flex-shrink-0">
                  <img
                    className="h-full w-full object-cover"
                    src={project.imageUrl}
                    alt={project.name}
                  />
                </div>

                {/* Card Content */}
                <div className="p-3 md:p-4 flex flex-col flex-grow">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-0.5">{project.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{project.type}</p>

                  <div className="flex items-start text-gray-600 mb-3 min-h-[36px]">
                    <MapPin className="h-3.5 w-3.5 mr-1.5 flex-shrink-0 mt-0.5" />
                    <p className="text-xs leading-relaxed line-clamp-2">{project.location}</p>
                  </div>

                  {/* Spacer to push buttons to bottom */}
                  <div className="flex-grow"></div>

                  {/* Price and Handover Section */}
                  <div className="flex justify-between mb-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Launch Price</p>
                      <p className={`text-sm md:text-base font-bold ${
                          project.launchPrice ? 'text-[#4299E1]' : 'text-gray-400'
                        }`}
                      >
                        {project.launchPrice || 'TBD'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-0.5">Handover</p>
                      <p className="text-sm md:text-base font-bold text-[#4299E1]">
                        {project.handover || 'TBD'}
                      </p>
                    </div>
                  </div>

                  {/* Contact Buttons Row */}
                  <div className="grid grid-cols-3 gap-2">
                    {/* WhatsApp Button */}
                    <button className="bg-green-50 text-green-600 font-medium rounded-lg transition-colors hover:bg-green-100 flex items-center justify-center h-10 md:h-11">
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </button>

                    {/* Call Button */}
                    <button className="bg-blue-50 text-[#4299E1] font-medium rounded-lg transition-colors hover:bg-blue-100 flex items-center justify-center h-10 md:h-11">
                      <Phone className="w-4 h-4 md:w-5 md:h-5" />
                    </button>

                    {/* Email Button */}
                    <button className="bg-purple-50 text-purple-600 font-medium rounded-lg transition-colors hover:bg-purple-100 flex items-center justify-center h-10 md:h-11">
                      <Mail className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Right Arrow - Hidden on Mobile */}
          <button 
            onClick={scrollRight}
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-6">
          <button className="bg-blue-50 text-[#4299E1] font-medium py-2.5 px-6 md:px-8 text-sm md:text-base rounded-lg hover:bg-blue-100 transition-colors">
            View all new projects in Ahmedabad
          </button>
        </div>
       <PropertyBanner />
      </div>
    </div>
  );
};

export default NewProject;