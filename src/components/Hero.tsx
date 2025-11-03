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
import React, { useState } from 'react';
import Navbar from './Navbar';
import {
  MapPin,
  Search,
  ChevronDown,
  SlidersHorizontal,
  Home,
  Building,
} from 'lucide-react';

const PRIMARY = '#4299E1';
const SECONDARY = '#F56565';

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('residential');
  const [mobileActiveTab, setMobileActiveTab] = useState('residential');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <><Navbar /><div className="w-full bg-white pt-[72px]">
      <div className="container mx-auto max-w-screen-2xl px-2">

        {/* DESKTOP HERO */}
        <div className="hidden lg:block">
          <div
            className="relative overflow-hidden rounded-3xl bg-cover bg-center shadow-xl"
            style={{
              backgroundImage: "url('./heropage.jpg')",
              minHeight: '650px',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/25 via-black/10 to-black/25"></div>

            <div className="relative z-10 flex h-full min-h-[650px] flex-col items-center justify-center px-4 py-12 lg:px-10">
              <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-white drop-shadow-lg lg:text-5xl">
                  Real homes live here
                </h1>
                <p className="mt-2 text-base lg:text-xl text-white/95 drop-shadow">
                  Real Data. Real Brokers. Real Properties in Ahmedabad.
                </p>
              </div>

              <div className="w-full max-w-sm mx-auto mb-5">
                <div className="flex gap-2 rounded-xl bg-white/95 p-1.5 shadow-lg backdrop-blur-sm border border-white/40">
                  <button
                    onClick={() => setActiveTab('residential')}
                    className={`
                      flex-1 flex items-center justify-center gap-1.5 
                      rounded-lg px-3 py-2 text-sm font-bold transition-all
                      ${activeTab === 'residential'
                        ? 'bg-white text-blue-500 shadow-md'
                        : 'text-gray-500 hover:bg-blue-50 hover:text-blue-500'}
                    `}
                  >
                    <Home className="h-4 w-4" />
                    Residential
                  </button>

                  <button
                    onClick={() => setActiveTab('commercial')}
                    className={`
                      flex-1 flex items-center justify-center gap-1.5 
                      rounded-lg px-3 py-2 text-sm font-bold transition-all
                      ${activeTab === 'commercial'
                        ? 'bg-white text-blue-500 shadow-md'
                        : 'text-gray-500 hover:bg-blue-50 hover:text-blue-500'}
                    `}
                  >
                    <Building className="h-4 w-4" />
                    Commercial
                  </button>
                </div>
              </div>

              <div className="w-full max-w-5xl">
                <div className="rounded-xl bg-white shadow-xl">
                  <div className="p-6">
                    {activeTab === 'residential' && (
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
                        <div className="relative flex-1">
                          <select className="h-full w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-3.5 text-sm font-medium text-gray-700 hover:border-gray-400 focus:ring-2 focus:ring-blue-300">
                            <option>Select City</option>
                            <option>Ahmedabad</option>
                            <option>Gandhinagar</option>
                            <option>Surat</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        </div>

                        <div className="relative flex-[2.5]">
                          <MapPin
                            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                            style={{ color: PRIMARY }} />
                          <input
                            type="text"
                            placeholder="Search By Area, Project or Builder"
                            className="h-full w-full rounded-lg border border-gray-300 py-3.5 pl-10 pr-3 text-sm font-medium text-gray-900" />
                        </div>

                        <div className="relative flex-1">
                          <select className="h-full w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-3.5 text-sm font-medium text-gray-700 hover:border-gray-400 focus:ring-2 focus:ring-blue-300">
                            <option>Select BHK</option>
                            <option>1 BHK</option>
                            <option>2 BHK</option>
                            <option>2.5 BHK</option>
                            <option>3 BHK</option>
                            <option>4 BHK</option>
                            <option>5 BHK</option>
                            <option>6 BHK</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        </div>

                        <div className="relative flex-1">
                          <select className="h-full w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-3.5 text-sm font-medium text-gray-700 hover:border-gray-400 focus:ring-2 focus:ring-blue-300">
                            <option>Select Budget</option>
                            <option>Under ₹50L</option>
                            <option>₹50L - ₹75L</option>
                            <option>₹75L - ₹1Cr</option>
                            <option>₹1Cr - ₹1.5Cr</option>
                            <option>₹1.5Cr - ₹2Cr</option>
                            <option>Above ₹3Cr</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        </div>

                        <button
                          className="flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm font-bold text-white shadow-md hover:opacity-90"
                          style={{ backgroundColor: SECONDARY }}
                        >
                          <SlidersHorizontal className="h-4 w-4" />
                          Filter
                        </button>

                        <button
                          className="flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-bold text-white shadow-md hover:opacity-90"
                          style={{ backgroundColor: PRIMARY }}
                        >
                          <Search className="h-4 w-4" />
                          Search
                        </button>
                      </div>
                    )}

                    {activeTab === 'commercial' && (
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
                        <div className="relative flex-1">
                          <select className="h-full w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-3.5 text-sm font-medium text-gray-700 hover:border-gray-400 focus:ring-2 focus:ring-blue-300">
                            <option>Select City</option>
                            <option>Ahmedabad</option>
                            <option>Gandhinagar</option>
                            <option>Surat</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        </div>

                        <div className="relative flex-[2.5]">
                          <MapPin
                            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                            style={{ color: PRIMARY }} />
                          <input
                            type="text"
                            placeholder="Search by Area or Project Name"
                            className="h-full w-full rounded-lg border border-gray-300 py-3.5 pl-10 pr-3 text-sm font-medium text-gray-900" />
                        </div>

                        <div className="relative flex-1">
                          <select className="h-full w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-3.5 text-sm font-medium text-gray-700 hover:border-gray-400 focus:ring-2 focus:ring-blue-300">
                            <option>Property Type</option>
                            <option>Office Space</option>
                            <option>Shop</option>
                            <option>Showroom</option>
                            <option>Warehouse</option>
                            <option>Industrial Shed</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        </div>

                        <button
                          className="flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm font-bold text-white shadow-md hover:opacity-90"
                          style={{ backgroundColor: SECONDARY }}
                        >
                          <SlidersHorizontal className="h-4 w-4" />
                          Filter
                        </button>

                        <button
                          className="flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-bold text-white shadow-md hover:opacity-90"
                          style={{ backgroundColor: PRIMARY }}
                        >
                          <Search className="h-4 w-4" />
                          Search
                        </button>
                      </div>
                    )}

                    <div className="mt-5 flex flex-wrap items-center gap-2 pt-5 border-t border-gray-100">
                      <span className="text-xs font-semibold text-gray-500">
                        Popular:
                      </span>
                      {['Apartments', '2 BHK', '3 BHK', 'Villas'].map(
                        (link) => (
                          <a
                            key={link}
                            href="#"
                            className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100"
                          >
                            {link}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE HERO */}
        <div className="block lg:hidden">
          {/* Image Section */}
          <div className="relative w-full h-[450px] overflow-hidden rounded-xl">
          <img
            src="./heropage.jpg"
            alt="Real homes"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent"></div>

          <div className="absolute top-1/3 left-0 right-0 z-10 text-center px-4">
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">
              Real homes live here
            </h1>
            <p className="mt-1 text-sm text-white/90 drop-shadow-sm">
              Real Data. Real Brokers. Real Properties in Ahmedabad.
            </p>
          </div>
        </div>


          {/* Search Box - Half Overlapping */}
          <div className="relative -mt-32 mx-4 rounded-2xl bg-white p-4 shadow-2xl z-20">
            {/* Residential/Commercial Tabs */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setMobileActiveTab('residential')}
                className={`
                  rounded-md px-4 py-2 text-sm font-bold
                  ${mobileActiveTab === 'residential'
                    ? 'text-white'
                    : 'bg-transparent text-gray-600'}
                `}
                style={mobileActiveTab === 'residential' ? { backgroundColor: PRIMARY } : {}}
              >
                Residential
              </button>
              <button
                onClick={() => setMobileActiveTab('commercial')}
                className={`
                  rounded-md px-4 py-2 text-sm font-bold
                  ${mobileActiveTab === 'commercial'
                    ? 'text-white'
                    : 'bg-transparent text-gray-600'}
                `}
                style={mobileActiveTab === 'commercial' ? { backgroundColor: PRIMARY } : {}}
              >
                Commercial
              </button>
            </div>

            {/* Location Search - Always Visible */}
            <div className="relative mt-4">
              <MapPin
                className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2"
                style={{ color: PRIMARY }} />
              <input
                type="text"
                placeholder={mobileActiveTab === 'residential' ? 'Search By Area, Project or Builder' : 'Search by Area or Project Name'}
                className="w-full rounded-lg border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-base placeholder-gray-500" />
            </div>

            {/* Filter and Search Buttons */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3.5 text-sm font-bold text-white shadow-md hover:opacity-90"
                style={{ backgroundColor: SECONDARY }}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filter
              </button>

              <button
                className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3.5 text-sm font-bold text-white shadow-md hover:opacity-90"
                style={{ backgroundColor: PRIMARY }}
              >
                <Search className="h-4 w-4" />
                Search
              </button>
            </div>

            {/* Expandable Filters Section */}
            {showMobileFilters && (
              <div className="mt-4 space-y-3 pt-4 border-t border-gray-200">
                {mobileActiveTab === 'residential' && (
                  <>
                    {/* City Select */}
                    <div className="relative">
                      <select className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-3.5 text-sm font-medium text-gray-700">
                        <option>Select City</option>
                        <option>Ahmedabad</option>
                        <option>Gandhinagar</option>
                        <option>Surat</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    </div>

                    {/* BHK Select */}
                    <div className="relative">
                      <select className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-3.5 text-sm font-medium text-gray-700">
                        <option>Select BHK</option>
                        <option>1 BHK</option>
                        <option>2 BHK</option>
                        <option>2.5 BHK</option>
                        <option>3 BHK</option>
                        <option>4 BHK</option>
                        <option>5 BHK</option>
                        <option>6 BHK</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    </div>

                    {/* Budget Select */}
                    <div className="relative">
                      <select className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-3.5 text-sm font-medium text-gray-700">
                        <option>Select Budget</option>
                        <option>Under ₹50L</option>
                        <option>₹50L - ₹75L</option>
                        <option>₹75L - ₹1Cr</option>
                        <option>₹1Cr - ₹1.5Cr</option>
                        <option>₹1.5Cr - ₹2Cr</option>
                        <option>Above ₹3Cr</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    </div>
                  </>
                )}

                {mobileActiveTab === 'commercial' && (
                  <>
                    {/* City Select */}
                    <div className="relative">
                      <select className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-3.5 text-sm font-medium text-gray-700">
                        <option>Select City</option>
                        <option>Ahmedabad</option>
                        <option>Gandhinagar</option>
                        <option>Surat</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    </div>

                    {/* Property Type Select */}
                    <div className="relative">
                      <select className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-3.5 text-sm font-medium text-gray-700">
                        <option>Property Type</option>
                        <option>Office Space</option>
                        <option>Shop</option>
                        <option>Showroom</option>
                        <option>Warehouse</option>
                        <option>Industrial Shed</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Popular Links */}
            <div className="mt-4 flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100">
              <span className="text-xs font-semibold text-gray-500">
                Popular:
              </span>
              {['Apartments', '2 BHK', '3 BHK', 'Villas'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div></>
  );
};

export default HeroSection;