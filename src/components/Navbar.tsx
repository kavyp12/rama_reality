import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default function Navbar({ isHeroSection = false }: { isHeroSection?: boolean }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasBackground, setHasBackground] = useState(!isHeroSection);
  const [isBuyDropdownOpen, setIsBuyDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsBuyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down & past threshold - hide navbar
        setShowNavbar(false);
      } else {
        // Scrolling up or at top - show navbar
        setShowNavbar(true);
      }
      
      // Add glassmorphism effect when scrolled
      setHasBackground(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const popularChoices = [
    { label: 'Ready To Move', slug: 'ready-to-move' },
    { label: 'Possession within 1 year', slug: 'possession-within-1-year' },
    { label: 'Possession within 2 year', slug: 'possession-within-2-year' },
    { label: 'Possession in More than 2 Years', slug: 'possession-more-than-2-years' },
    { label: 'New Launch Projects', slug: 'new-launch-projects' },
  ];

  const propertyTypes = [
    { label: 'Flat in Ahmedabad', slug: 'flat-in-ahmedabad' },
    { label: 'House for sale in Ahmedabad', slug: 'house-in-ahmedabad' },
    { label: 'Villa in Ahmedabad', slug: 'villa-in-ahmedabad' },
    { label: 'Weekend home in Ahmedabad', slug: 'weekend-home-in-ahmedabad' },
    { label: 'Penthouse for sale in Ahmedabad', slug: 'penthouse-in-ahmedabad' },
    { label: 'Duplex for sale in Ahmedabad', slug: 'duplex-in-ahmedabad' },
  ];

  const budgets = [
    { label: 'Under 50 Lac', slug: 'under-50-lac' },
    { label: '50 Lac to 75 Lac', slug: '50-lac-to-75-lac' },
    { label: '75 Lac to 1.25 Cr', slug: '75-lac-to-1-25-cr' },
    { label: '1.25 Cr to 2 Cr', slug: '1-25-cr-to-2-cr' },
    { label: '2 Cr to 3 Cr', slug: '2-cr-to-3-cr' },
    { label: '3 Cr to 5 Cr', slug: '3-cr-to-5-cr' },
    { label: '5 Cr+', slug: '5-cr-plus' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-30 transition-all duration-500 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      } ${hasBackground ? 'backdrop-blur-lg bg-white/20 border-b border-white/20 shadow-lg' : 'bg-transparent'}`}
    >
      <div className="container mx-auto flex justify-between items-center py-6 px-6 text-gray-900">
        <Link to="/" className="flex items-center space-x-3">
          <div className="text-2xl font-extrabold">
            <span className="text-blue-500">RAMA</span>{' '}
            <span className="text-red-500">REALTY</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsBuyDropdownOpen((prev) => !prev)}
              className="hover:text-gray-600 transition-colors flex items-center font-medium"
            >
              Buy
              <ChevronDownIcon className="ml-1 h-4 w-4" />
            </button>
            {isBuyDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[800px] p-6 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-200 animate-slideDown">
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4">Popular Choices</h3>
                    <ul className="space-y-2">
                      {popularChoices.map((choice) => (
                        <li key={choice.slug}>
                          <Link
                            to={`/buy/${choice.slug}`}
                            onClick={() => setIsBuyDropdownOpen(false)}
                            className="block py-1 px-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded"
                          >
                            {choice.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4">Property Type</h3>
                    <ul className="space-y-2">
                      {propertyTypes.map((type) => (
                        <li key={type.slug}>
                          <Link
                            to={`/buy/${type.slug}`}
                            onClick={() => setIsBuyDropdownOpen(false)}
                            className="block py-1 px-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded"
                          >
                            {type.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4">Budget</h3>
                    <ul className="space-y-2">
                      {budgets.map((budget) => (
                        <li key={budget.slug}>
                          <Link
                            to={`/buy/${budget.slug}`}
                            onClick={() => setIsBuyDropdownOpen(false)}
                            className="block py-1 px-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded"
                          >
                            {budget.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link to="/buy/all" className="hover:text-gray-600 transition-colors font-medium">
            All Properties
          </Link>
          <a href="#" className="hover:text-gray-600 transition-colors font-medium">
            Sell
          </a>
          <a href="#" className="hover:text-gray-600 transition-colors font-medium">
            Explore
          </a>
          <a href="#" className="hover:text-gray-600 transition-colors font-medium">
            New Project
          </a>
        </nav>
        <a
          href="#"
          className="hidden md:inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Sign up
        </a>
      </div>
    </header>
  );
}