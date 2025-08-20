// import React from 'react';
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Filter } from "lucide-react";
// import propertyHeroImage from "@/assets/property-hero.jpg";

// const VitalSpaceHero = () => {
//   const popularLocalities = [
//     "Adani Shantgram",
//     "Ambli", 
//     "Chharodi",
//     "Gota",
//     "Iscon ambli",
//     "Jagatpur"
//   ];

//   return (
//     <section className="w-full bg-background relative overflow-hidden pt-20 lg:pt-24">      
//       <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
//         <div className="grid lg:grid-cols-12 gap-6 items-start">
          
//           {/* Left Content */}
//           <div className="lg:col-span-7 space-y-8 lg:-mt-8 bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100 lg:mr-4">
            
//             {/* Main Heading */}
//             <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight">
//               To Unlock Best Property Deals
//             </h1>
            
//             {/* Search Form */}
//             <div className="bg-white rounded-2xl p-6 shadow-search">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                
//                 {/* Select City */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-muted-foreground">Select City</label>
//                   <Select defaultValue="ahmedabad">
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Select City" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
//                       <SelectItem value="mumbai">Mumbai</SelectItem>
//                       <SelectItem value="delhi">Delhi</SelectItem>
//                       <SelectItem value="bangalore">Bangalore</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Search By */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-muted-foreground">Search By</label>
//                   <Input 
//                     placeholder="Area/project/builder" 
//                     className="w-full"
//                   />
//                 </div>

//                 {/* Select BHK */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-muted-foreground">Select BHK</label>
//                   <Select defaultValue="bhk">
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="BHK" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="bhk">BHK</SelectItem>
//                       <SelectItem value="1bhk">1 BHK</SelectItem>
//                       <SelectItem value="2bhk">2 BHK</SelectItem>
//                       <SelectItem value="3bhk">3 BHK</SelectItem>
//                       <SelectItem value="4bhk">4+ BHK</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Select Budget */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-muted-foreground">Select Budget</label>
//                   <Select defaultValue="budget">
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Budget" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="budget">Budget</SelectItem>
//                       <SelectItem value="under50">Under ₹50L</SelectItem>
//                       <SelectItem value="50to1cr">₹50L - ₹1Cr</SelectItem>
//                       <SelectItem value="1to2cr">₹1Cr - ₹2Cr</SelectItem>
//                       <SelectItem value="above2cr">Above ₹2Cr</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               {/* Filter and Search Buttons */}
//               <div className="flex flex-col gap-3">
//                 <Button variant="outline" className="flex items-center gap-2">
//                   <Filter className="h-4 w-4" />
//                   Filter
//                 </Button>
//                 <Button className="w-full bg-black hover:bg-black/90 text-white">
//                   Search
//                 </Button>
//               </div>
//             </div>

//             {/* Popular Localities */}
//             <div className="space-y-4">
//               <div className="flex items-center gap-2 text-foreground">
//                 <span className="font-medium">Popular Localities</span>
//                 <div className="w-4 h-4 flex items-center justify-center">
//                   <div className="w-4 h-0.5 bg-foreground transform rotate-45"></div>
//                   <div className="w-4 h-0.5 bg-foreground transform -rotate-45 -ml-4"></div>
//                 </div>
//               </div>
              
//               <div className="flex flex-wrap gap-3">
//                 {popularLocalities.map((locality, index) => (
//                   <Button
//                     key={index}
//                     variant="outline"
//                     className="rounded-full px-4 py-2 text-sm border-muted-foreground/30 text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
//                   >
//                     {locality}
//                   </Button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Content */}
//           <div className="lg:col-span-5 hidden lg:block lg:mt-4 lg:ml-2 translate-y-12">
//             <div className="relative lg:scale-110 lg:origin-left">
//               <img 
//                 src={propertyHeroImage} 
//                 alt="Property consultant with modern tablet showing luxury property listings"
//                 className="w-full h-auto object-cover rounded-2xl shadow-premium"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default VitalSpaceHero;

// second code

// 'use client';

// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Search, MapPin } from 'lucide-react';

// const Hero = () => {
//   const localities = [
//     'Jagatpur',
//     'Adani Shantigram',
//     'Ambli',
//     'Chharodi',
//     'Gota',
//     'Iscon Ambli',
//   ];

//   const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4+ BHK'];

//   const budgetOptions = [
//     '₹20L - 40L',
//     '₹40L - 60L',
//     '₹60L - 1Cr',
//     '₹1Cr - 2Cr',
//     '₹2Cr+',
//   ];

//   return (
//     <section
//       id="hero-section" // ID for navbar scroll detection
//       className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-center py-20"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1920&auto=format&fit=crop')",
//       }}
//     >
//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-black/60 z-0" />

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//         <motion.div
//           className="text-center mb-12"
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
//             Your Promise of a Perfect
//             <span className="text-red-500"> Dream Home</span>
//           </h1>
//           <p className="text-xl text-gray-200 max-w-3xl mx-auto [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
//             Discover exclusive properties and new projects in Ahmedabad's most
//             sought-after locations. Promises Fulfilled.
//           </p>
//         </motion.div>

//         <motion.div
//           className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-8"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//             {/* City Select */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700 flex items-center">
//                 <MapPin className="w-4 h-4 mr-1 text-blue-800" />
//                 City
//               </label>
//               <Select defaultValue="ahmedabad">
//                 <SelectTrigger className="border-gray-200 focus:border-blue-800 focus:ring-blue-800">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
//                   <SelectItem value="gandhinagar">Gandhinagar</SelectItem>
//                   <SelectItem value="vadodara">Vadodara</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Search By */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">Search By</label>
//               <Select>
//                 <SelectTrigger className="border-gray-200 focus:border-blue-800 focus:ring-blue-800">
//                   <SelectValue placeholder="Area/Project/Builder" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="area">Area</SelectItem>
//                   <SelectItem value="project">Project</SelectItem>
//                   <SelectItem value="builder">Builder</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* BHK */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">BHK</label>
//               <Select>
//                 <SelectTrigger className="border-gray-200 focus:border-blue-800 focus:ring-blue-800">
//                   <SelectValue placeholder="Select BHK" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {bhkOptions.map((bhk) => (
//                     <SelectItem key={bhk} value={bhk.toLowerCase().replace(' ', '-')}>
//                       {bhk}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Budget */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">Budget</label>
//               <Select>
//                 <SelectTrigger className="border-gray-200 focus:border-blue-800 focus:ring-blue-800">
//                   <SelectValue placeholder="Select Budget" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {budgetOptions.map((budget) => (
//                     <SelectItem key={budget} value={budget}>{budget}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
          
//           <div className="text-center">
//             <Button
//               size="lg"
//               className="bg-blue-800 hover:bg-blue-900 text-white px-12 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
//             >
//               <Search className="w-5 h-5 mr-2" />
//               Search Properties
//             </Button>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };
// src/components/Hero.tsx

// src/components/Hero.tsx
// D:\replica-elegance\src\components\Hero.tsx


import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const BuildingIcon = ({ className }: { className?: string }) => (
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
    <path d="M4 22h16" />
    <path d="M2 11l8-9 8 9" />
    <path d="M3 22V11h2v11" />
    <path d="M19 22V11h2v11" />
    <path d="M7 22v-8h4v8" />
    <path d="M13 22v-8h4v8" />
  </svg>
);

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

export default function Hero() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isBuyDropdownOpen, setIsBuyDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsBuyDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle scroll for navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setIsPastHero(currentScrollY > window.innerHeight - 80);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
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
    <div id="hero-section" className="relative min-h-screen w-full bg-gray-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        nav, span, button, h1, h2, h3, h4, h5, h6, p, a, input, select, label {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2574&auto=format&fit=crop')",
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-30 transition-all duration-500 ${
          showNavbar ? 'translate-y-0' : '-translate-y-full'
        } ${isPastHero ? 'backdrop-blur-md bg-black/40' : 'bg-transparent'}`}
      >
        <div className="container mx-auto flex justify-between items-center py-6 px-6 text-white">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="text-2xl font-extrabold">
              <span className="text-blue-500">RAMA</span>{' '}
              <span className="text-red-500">REALTY</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsBuyDropdownOpen((prev) => !prev)}
                className="hover:text-gray-300 transition-colors flex items-center"
              >
                Buy
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
              {isBuyDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[800px] p-6 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-200 animate-slideDown">
                  <div className="grid grid-cols-3 gap-8">
                    {/* Popular Choices */}
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
                    {/* Property Type */}
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
                    {/* Budget */}
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
            <Link to="/buy/all" className="hover:text-gray-300 transition-colors">
              All Properties
            </Link>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Sell
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Explore
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              New Project
            </a>
          </nav>

          {/* Sign Up Button */}
          <a
            href="#"
            className="hidden md:inline-block bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Sign up
          </a>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Content Container */}
      <div className="relative z-20 flex flex-col min-h-screen text-white px-4 sm:px-6 lg:px-8">
        {/* Main Hero Content */}
        <main className="flex-grow flex container mx-auto">
          <div className="w-full lg:w-3/5 flex flex-col justify-center pb-24 pt-32">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Real Estate
              <br />
              Without The
              <br />
              Hassle.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl">
              Whether you're buying, selling, or renting, our dedicated agents
              handle every detail. Get personalized property recommendations and
              close your deal faster than ever.
            </p>
          </div>
        </main>

        {/* Search Bar Section */}
        <div className="pb-12 md:pb-24">
          <div className="container mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-2xl">
              <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                {/* Location Input */}
                <div className="md:border-r md:border-gray-200 p-2">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-500"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    placeholder="Search Location"
                    className="w-full text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent"
                  />
                </div>

                {/* Property Type Select */}
                <div className="md:border-r md:border-gray-200 p-2 relative">
                  <label
                    htmlFor="property-type"
                    className="block text-sm font-medium text-gray-500"
                  >
                    Property Type
                  </label>
                  <select
                    id="property-type"
                    className="w-full text-gray-900 focus:outline-none bg-transparent appearance-none pr-8"
                  >
                    <option>Select type</option>
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Condo</option>
                    <option>Land</option>
                  </select>
                  <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 mt-2 h-5 w-5 text-gray-500 pointer-events-none" />
                </div>

                {/* Budget Select */}
                <div className="p-2 relative">
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-gray-500"
                  >
                    Budget
                  </label>
                  <select
                    id="budget"
                    className="w-full text-gray-900 focus:outline-none bg-transparent appearance-none pr-8"
                  >
                    <option>Select budget</option>
                    <option>$100,000 - $200,000</option>
                    <option>$200,000 - $400,000</option>
                    <option>$400,000 - $800,000</option>
                    <option>$800,000+</option>
                  </select>
                  <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 mt-2 h-5 w-5 text-gray-500 pointer-events-none" />
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-800 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
