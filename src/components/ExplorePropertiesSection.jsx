import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

const ExplorePropertiesSection = () => {
  const locations = [
    { id: 1, name: "Ambli", projectCount: 25, avgPrice: "₹85 L", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop&crop=center", description: "Premium residential hub with excellent connectivity." },
    { id: 2, name: "Science City", projectCount: 18, avgPrice: "₹95 L", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop&crop=center", description: "A perfect blend of modern living and tech corridor." },
    { id: 3, name: "Shela", projectCount: 32, avgPrice: "₹75 L", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop&crop=center", description: "Ahmedabad's emerging luxury real estate destination." },
    { id: 4, name: "Vaishno Devi", projectCount: 22, avgPrice: "₹65 L", image: "/image2.jpg", description: "Spiritual serenity meets contemporary lifestyle." },
    { id: 5, name: "Zundal", projectCount: 15, avgPrice: "₹55 L", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop&crop=center", description: "Find your dream home with affordable luxury options." },
    { id: 6, name: "Thaltej", projectCount: 28, avgPrice: "₹1.2 Cr", image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&h=300&fit=crop&crop=center", description: "Experience an ultra-premium and sophisticated lifestyle." }
  ];

  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState("All");

  const filteredLocations = selectedLocation === "All" 
    ? locations 
    : locations.filter(location => location.name === selectedLocation);

  const locationTags = ["All", "Ambli", "Science City", "Shela", "Vaishno Devi", "Zundal", "Thaltej"];

  const getVisibleCardsCount = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
    }
    return 1;
  }, []);

  const [visibleCards, setVisibleCards] = useState(getVisibleCardsCount());

  useEffect(() => {
    const handleResize = () => setVisibleCards(getVisibleCardsCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getVisibleCardsCount]);

  useEffect(() => {
    setCurrentIndex(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'instant' });
    }
  }, [selectedLocation]);

  const canScroll = filteredLocations.length > visibleCards;
  const maxScrollIndex = canScroll ? filteredLocations.length - visibleCards : 0;

  const scrollToCard = (direction) => {
    if (!scrollContainerRef.current) return;
    const newIndex = direction === 'left' ? Math.max(currentIndex - 1, 0) : Math.min(currentIndex + 1, maxScrollIndex);
    const container = scrollContainerRef.current;
    const card = container.querySelector(`:nth-child(${newIndex + 1})`);
    if (card) {
      container.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
      setCurrentIndex(newIndex);
    }
  };

  const propertyOptionsData = {
    popularBhk: ["2 BHK Flats", "3 BHK Flats", "4 BHK Flats", "5 BHK Flats", "3 BHK with Penthouse", "4 BHK Duplex"],
    popularFlat: ["Flats in Iscon Ambli", "Flats in Science City", "Flats in Vaishnodevi", "Flats in Shilaj", "Flats in Shela", "Flats in Gota"],
    budgetWise: ["Flats under 50 lakhs", "Flats under 1 Cr", "3 BHK Flats under 1 Cr", "3 BHK Flats under 1.5 Cr", "4 BHK Flats under 3 Cr"],
    popular3Bhk: ["3 BHK in Gota", "3 BHK in Shilaj", "3 BHK in Shela", "3 BHK in Adani Shantigram", "3 BHK in Jagatpur"],
    popular4Bhk: ["4 BHK in Ambli", "4 BHK in Science City", "4 BHK in Sindhubhavan", "4 BHK in Thaltej", "4 BHK in Bopal"],
  };

  const propertyOptionsCategories = [
    { key: 'popularBhk', title: 'By BHK' },
    { key: 'popularFlat', title: 'By Area' },
    { key: 'budgetWise', title: 'By Budget' },
    { key: 'popular3Bhk', title: 'Popular 3 BHK' },
    { key: 'popular4Bhk', title: 'Popular 4 BHK' },
  ];

  const [selectedPropertyCategory, setSelectedPropertyCategory] = useState(propertyOptionsCategories[0].key);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        section, div, h2, p, button, span, a {
          font-family: 'Poppins', sans-serif;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .filter-transition { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {/* Localities Section */}
      <section className="w-full bg-white px-4 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Explore By Localities
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Discover premium projects in Ahmedabad's most sought-after neighborhoods.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {locationTags.map((location) => (
              <Button
                key={location}
                variant={selectedLocation === location ? "default" : "outline"}
                onClick={() => setSelectedLocation(location)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedLocation === location 
                    ? 'bg-blue-800 text-white shadow-lg transform scale-105 hover:bg-blue-900' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-blue-800 hover:text-blue-800'
                }`}
              >
                {location}
              </Button>
            ))}
          </div>
          
          <div className="relative">
            {canScroll && (
              <>
                <div className="hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20">
                  <Button variant="ghost" size="icon" onClick={() => scrollToCard('left')} disabled={currentIndex === 0} className="bg-white/80 shadow-2xl border border-gray-200 hover:bg-white rounded-lg h-12 w-12 backdrop-blur-sm disabled:opacity-40" aria-label="Previous"><ChevronLeft className="h-6 w-6" /></Button>
                </div>
                <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20">
                  <Button variant="ghost" size="icon" onClick={() => scrollToCard('right')} disabled={currentIndex === maxScrollIndex} className="bg-white/80 shadow-2xl border border-gray-200 hover:bg-white rounded-lg h-12 w-12 backdrop-blur-sm disabled:opacity-40" aria-label="Next"><ChevronRight className="h-6 w-6" /></Button>
                </div>
              </>
            )}
            
            <div className="overflow-x-auto hide-scrollbar" ref={scrollContainerRef}>
              {filteredLocations.length > 0 ? (
                <div className="grid grid-flow-col auto-cols-[calc(100%-1rem)] md:auto-cols-[calc(50%-0.75rem)] lg:auto-cols-[calc(33.33%-1rem)] gap-6 filter-transition">
                  {filteredLocations.map((location) => (
                    <div key={location.id} className="bg-white rounded-lg shadow-md hover:shadow-2xl border border-gray-200 group relative hover:border-gray-300 transition-all duration-300 overflow-hidden">
                      <div className="relative h-56 overflow-hidden">
                        <img src={location.image} alt={`${location.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{location.name}</h3>
                        <p className="text-base text-gray-600 mb-4 h-12">{location.description}</p>
                        <div className="flex items-center justify-between text-base mb-4">
                          <span className="font-semibold text-gray-800">{location.projectCount}+ Projects</span>
                          <span className="font-bold text-gray-900">{location.avgPrice}</span>
                        </div>
                        <Button variant="outline" className="w-full border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white font-bold py-3 rounded-lg text-base">View Properties</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : ( <div className="text-center py-12 w-full"><p className="text-gray-600">No properties found in {selectedLocation}.</p></div> )}
            </div>
          </div>
        </div>
      </section>

      {/* Property Options Section */}
      <section className="w-full bg-gray-50 px-4 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Property Options in Ahmedabad</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Find properties tailored to your needs with our popular search categories.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {propertyOptionsCategories.map((category) => (
              <Button key={category.key} variant={selectedPropertyCategory === category.key ? "default" : "outline"} onClick={() => setSelectedPropertyCategory(category.key)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedPropertyCategory === category.key
                    ? 'bg-blue-800 text-white shadow-lg transform scale-105 hover:bg-blue-900'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-blue-800 hover:text-blue-800'
                }`}
              >{category.title}</Button>
            ))}
          </div>

          {/* FIXED: Removed translate-y so it won’t jump up/down */}
          <div key={selectedPropertyCategory} className="bg-white mt-6 p-6 md:p-8 rounded-xl shadow-xl border border-gray-200 filter-transition translate-y-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-5">
              {propertyOptionsData[selectedPropertyCategory].map((option, index) => (
                <a key={index} href="#" className="group flex items-center gap-3 text-gray-600 hover:text-blue-800 transition-colors duration-200">
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 group-hover:text-blue-800 transition-all duration-300" />
                  <span className="font-semibold text-base">{option}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExplorePropertiesSection;
