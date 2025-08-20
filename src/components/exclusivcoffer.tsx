import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle, ChevronLeft } from "lucide-react";

// Thematic icon for the banner
const CursorClickIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    stroke="none"
    {...props}
  >
    <path d="M13.5 6.002V2.5a1.5 1.5 0 0 0-3 0v3.502a1.5 1.5 0 0 0 3 0Zm-5 4.502a1.5 1.5 0 0 0-1.5-1.5h-3.5a1.5 1.5 0 0 0 0 3h3.5a1.5 1.5 0 0 0 1.5-1.5Zm1.5 1.5a1.5 1.5 0 0 0-3 0v3.501a1.5 1.5 0 0 0 3 0v-3.5Zm5.001-1.5a1.5 1.5 0 0 0 1.5 1.5h3.5a1.5 1.5 0 0 0 0-3h-3.5a1.5 1.5 0 0 0-1.5 1.5Zm-1.5 6.5a1.5 1.5 0 0 0-3 0v3.5a1.5 1.5 0 0 0 3 0v-3.5Z" />
    <path d="M19.83 8.318a.5.5 0 0 0-.66.088L15.4 12.98l-1.01-3.03a.5.5 0 0 0-.94 0l-1.9 5.71a.5.5 0 0 0 .94.31l.95-2.85 2.02 6.06a.5.5 0 0 0 .94 0l3.03-9.1a.5.5 0 0 0-.08-.56Z" />
  </svg>
);


const ExclusiveOffersSection = () => {
  const properties = [
    { id: 1, name: "Artefino", developer: "Sheladia Group", verified: true, type: "4 BHK Flat", location: "Thaltej, Ahmedabad", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop&crop=center" },
    { id: 2, name: "Rameshwar City", developer: "A. Shridhar", verified: true, type: "3 BHK Flat, Penthouse", location: "Naranpura, Ahmedabad", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop&crop=center" },
    { id: 3, name: "Shilp Residency", developer: "Shilp Group", verified: true, type: "3, 4 BHK Flat", location: "Gota, Ahmedabad", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop&crop=center" },
    { id: 4, name: "Highline", developer: "AG Group", verified: true, type: "3, 4, 5 BHK Flat", location: "SG Highway, Ahmedabad", image: "/image2.jpg" },
    { id: 5, name: "Aashray Aurum", developer: "Aashray Construction", verified: true, type: "3 BHK Flat", location: "Shilaj, Ahmedabad", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop&crop=center" },
    { id: 6, name: "Rashmi SkyScape", developer: "Rashmi Group", verified: true, type: "4 BHK Flat, Duplex", location: "Shilaj, Ahmedabad", image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&h=300&fit=crop&crop=center" }
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
  
  const maxIndex = properties.length > visibleCards ? properties.length - visibleCards : 0;

  const scrollTo = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const newIndex = direction === 'left' 
      ? Math.max(currentIndex - 1, 0) 
      : Math.min(currentIndex + 1, maxIndex);
    
    const card = scrollContainerRef.current.querySelector(`:nth-child(${newIndex + 1})`) as HTMLElement;
    if (card) {
      scrollContainerRef.current.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
      setCurrentIndex(newIndex);
    }
  };
  
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        section, div, h2, p, button, span, a {
          font-family: 'Poppins', sans-serif;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      <section className="w-full bg-white px-4 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 text-center sm:text-left">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
                Exclusive Offers
              </h2>
              <p className="text-lg text-gray-500">Handpicked deals on premium properties in Ahmedabad.</p>
            </div>
            <Button variant="ghost" className="text-blue-800 hover:text-white hover:bg-blue-800 font-bold mt-4 sm:mt-0 px-5 py-2.5 rounded-lg">
              See All
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="relative">
            <div className="hidden lg:flex absolute -left-6 top-1/2 transform -translate-y-1/2 z-10">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => scrollTo('left')}
                disabled={currentIndex === 0}
                className="bg-white/80 shadow-2xl border border-gray-200 hover:bg-white rounded-lg h-12 w-12 backdrop-blur-sm disabled:opacity-40"
                aria-label="Previous properties"
              >
                <ChevronLeft className="h-6 w-6 text-slate-800" />
              </Button>
            </div>
            
            <div className="overflow-x-auto hide-scrollbar" ref={scrollContainerRef}>
              <div className="grid grid-flow-col auto-cols-[calc(100%-1rem)] md:auto-cols-[calc(50%-0.75rem)] lg:auto-cols-[calc(33.33%-1rem)] gap-6">
                {properties.map((property) => (
                  <div key={property.id} className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 group">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={property.image}
                        alt={`${property.name}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-800 truncate">{property.name}</h3>
                        {property.verified && (
                          <CheckCircle className="h-5 w-5 text-blue-600 fill-blue-100" />
                        )}
                      </div>
                      <p className="text-base font-semibold text-gray-500">{property.developer}</p>
                      <p className="text-base text-gray-700 mt-1">{property.type}</p>
                      <p className="text-sm text-gray-500 mt-1">{property.location}</p>
                      <div className="pt-4 mt-2">
                        <Button variant="outline" className="w-full border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white font-bold py-3 rounded-lg text-base">
                          Get Offer
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex absolute -right-6 top-1/2 transform -translate-y-1/2 z-10">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => scrollTo('right')}
                disabled={currentIndex === maxIndex}
                className="bg-white/80 shadow-2xl border border-gray-200 hover:bg-white rounded-lg h-12 w-12 backdrop-blur-sm disabled:opacity-40"
                aria-label="Next properties"
              >
                <ChevronRight className="h-6 w-6 text-slate-800" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto my-24 px-8">
         <div className="rounded-2xl shadow-2xl bg-blue-900 text-white p-10 lg:p-12">
            <div className="flex items-center justify-between gap-6">
            <div className="flex-1 text-center md:text-left md:mx-6 lg:mx-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                Find Your Dream Property
                </h2>
                <p className="text-lg text-blue-200 mb-8 max-w-xl mx-auto md:mx-0">
                Let us handle the details. Discover verified listings and get personalized recommendations today.
                </p>
                <Button
                size="lg"
                className="bg-white text-blue-900 hover:bg-gray-200 font-bold px-8 py-4 text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                Find Your Property
                <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
            
            <div className="flex-shrink-0 hidden lg:block">
                <div className="relative">
                <div className="w-24 h-24 xl:w-28 xl:h-28 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
                    <CursorClickIcon className="w-10 h-10 xl:w-12 xl:h-12 text-white drop-shadow-lg" />
                </div>
                </div>
            </div>
            </div>
         </div>
      </section>
    </>
  );
};

export default ExclusiveOffersSection;