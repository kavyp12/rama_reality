// // src/pages/FlatInAhmedabadPage.tsx
// // This file will contain the full, static code for the page that replicates the image.
// // All the components like NavItem, FlatCard, and the main content will be here.
// import React, { useEffect, useState } from 'react';
// import { HeartIcon, ChevronDownIcon, BuildingIcon, MapPinIcon, TrainIcon, PlaneIcon, PhoneIcon, ChevronRightIcon, MessageCircleIcon } from 'lucide-react';
// import { Link } from 'react-router-dom';

// // All the components (NavItem, FilterDropdown, FlatCard) and the main export
// // for the FlatInAhmedabadPage component go here, as provided in the previous answer.

// const NavItem = ({ label, children, isActive = false }) => (
//   <div className={`relative px-4 py-3 cursor-pointer flex items-center gap-1 ${isActive ? 'bg-white text-blue-600 rounded-t-lg' : 'hover:bg-gray-100 rounded-lg text-gray-700'}`}>
//     <span>{label}</span>
//     {children}
//   </div>
// );

// const FilterDropdown = ({ label }) => (
//   <div className="relative">
//     <button className="px-4 py-3 bg-white rounded-lg text-gray-700 flex items-center gap-1 hover:bg-gray-100">
//       <span>{label}</span>
//       <ChevronDownIcon size={16} />
//     </button>
//   </div>
// );

// const FlatCard = ({ flat }) => (
//   <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row relative">
//     <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-semibold py-1 px-2 rounded-lg z-10">
//       BEST OFFER
//     </div>
//     <div className="lg:w-2/5 relative">
//       <img
//         src={flat.image}
//         alt={flat.name}
//         className="w-full h-64 lg:h-full object-cover"
//       />
//       <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-semibold py-1 px-2 rounded-lg">
//         RERA
//       </div>
//       <button className="absolute top-4 right-4 bg-white/50 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
//         <HeartIcon size={20} className="text-gray-800" />
//       </button>
//     </div>
//     <div className="p-6 lg:w-3/5">
//       <div className="flex justify-between items-start mb-2">
//         <h2 className="text-2xl font-semibold text-gray-900">{flat.name}</h2>
//         <button className="text-gray-500 hover:text-gray-900">
//           <HeartIcon size={24} />
//         </button>
//       </div>
//       <p className="text-gray-600 mb-4">{flat.description}</p>
//       <div className="mb-6">
//         <div className="grid grid-cols-3 text-sm text-gray-500 font-medium border-b py-2">
//           <span>{flat.type}</span>
//           <span>{flat.area}</span>
//           <span className="text-blue-600 font-bold">{flat.price}</span>
//         </div>
//         {flat.soldOut && (
//           <div className="grid grid-cols-3 text-sm text-gray-500 font-medium py-2">
//             <span>{flat.soldOut.type}</span>
//             <span>{flat.soldOut.area}</span>
//             <span className="text-red-500 font-bold">Sold out</span>
//           </div>
//         )}
//       </div>
//       <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700 mb-6">
//         <div className="flex items-center gap-2">
//           <BuildingIcon size={18} className="text-gray-500" />
//           <span className="text-gray-500">Zero brokerage</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <MapPinIcon size={18} className="text-gray-500" />
//           <span className="text-gray-500">Possession: {flat.possession}</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <BuildingIcon size={18} className="text-gray-500" />
//           <span className="text-gray-500">Residential with Retail</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <TrainIcon size={18} className="text-gray-500" />
//           <span className="text-gray-500">{flat.metro}</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <PlaneIcon size={18} className="text-gray-500" />
//           <span className="text-gray-500">{flat.airport}</span>
//         </div>
//       </div>
//       <div className="flex items-center gap-4 text-sm mb-6">
//         <p className="text-gray-600">
//           <span className="font-semibold">Builder:</span> {flat.builder}
//         </p>
//         <span className="text-gray-400">|</span>
//         <a href="#" className="flex items-center gap-2 text-blue-600 hover:underline">
//           <MessageCircleIcon size={16} />
//           <span>Chat</span>
//         </a>
//       </div>
//       <div className="flex items-center gap-4">
//         <button className="flex items-center gap-2 border border-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
//           <span>Brochure</span>
//         </button>
//         <button className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
//           <span>Get Offer</span>
//         </button>
//       </div>
//     </div>
//   </div>
// );

// export default function FlatInAhmedabadPage() {
//     const [projects, setProjects] = useState([]);
//     useEffect(() => {
//         const mockProjects = [
//             {
//                 id: 1,
//                 name: "Nivaasa",
//                 description: "3 BHK Flat in Shela, Ahmedabad",
//                 image: "https://images.unsplash.com/photo-1574362145328-3e5f0d57564d?q=80&w=2670&auto=format&fit=crop",
//                 type: "3 BHK Flat",
//                 area: "1750 Sq.Ft",
//                 price: "₹79.00 L",
//                 soldOut: { type: "3 BHK Penthouse", area: "1750 Sq.Ft (Super Builtup Area)" },
//                 possession: "December 2028",
//                 metro: "Public Transportation within 4.1 km",
//                 airport: "Airport within 24 km",
//                 builder: "Radomi Group",
//             },
//             {
//                 id: 2,
//                 name: "The Regal",
//                 description: "4 BHK Flat in Vaishnodevi, Ahmedabad",
//                 image: "https://images.unsplash.com/photo-1560518883-ce092b740871?q=80&w=2670&auto=format&fit=crop",
//                 type: "4 BHK Flat",
//                 area: "3015 - 3879 Sq.Ft",
//                 price: "₹1.57 Cr - ₹2.02 Cr",
//                 soldOut: null,
//                 possession: "December 2028",
//                 metro: "Public Transportation within 4.1 km",
//                 airport: "Airport within 24 km",
//                 builder: "Radomi Group",
//             },
//         ];
//         setProjects(mockProjects);
//     }, []);

//     return (
//         <div className="min-h-screen bg-gray-50 font-poppins text-gray-900">
//             <nav className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
//                 <div className="flex items-center gap-8">
//                     <span className="text-xl font-bold text-blue-600">LOGO</span>
//                     <div className="hidden lg:flex items-center gap-4">
//                         <NavItem label="Ahmedabad" isActive />
//                         <NavItem label="Search Location, Builder...">
//                             <ChevronDownIcon size={16} />
//                         </NavItem>
//                         <NavItem label="Popular localities">
//                             <ChevronDownIcon size={16} />
//                         </NavItem>
//                         <NavItem label="BHK">
//                             <ChevronDownIcon size={16} />
//                         </NavItem>
//                         <NavItem label="Budget">
//                             <ChevronDownIcon size={16} />
//                         </NavItem>
//                         <NavItem label="Possession">
//                             <ChevronDownIcon size={16} />
//                         </NavItem>
//                         <NavItem label="Property Type">
//                             <ChevronDownIcon size={16} />
//                         </NavItem>
//                     </div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                     <FilterDropdown label="Sort By: Relevance" />
//                 </div>
//             </nav>
//             <div className="container mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 <div className="lg:col-span-2 space-y-6">
//                     <h1 className="text-2xl font-bold text-gray-900">Results for: Flat In Ahmedabad <span className="text-gray-500 font-normal text-lg">(361 Projects)</span></h1>
//                     {projects.map((flat) => (
//                         <FlatCard key={flat.id} flat={flat} />
//                     ))}
//                 </div>
//                 <div className="lg:col-span-1">
//                     <div className="bg-white rounded-xl shadow-lg p-6">
//                         <div className="flex flex-col items-center border-b pb-4 mb-4">
//                             <h3 className="text-lg font-bold text-gray-800">Schedule your free site visit</h3>
//                             <p className="text-blue-600 font-semibold text-lg">TODAY</p>
//                         </div>
//                         <form className="space-y-4">
//                             <input
//                                 type="text"
//                                 placeholder="Name"
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <input
//                                 type="tel"
//                                 placeholder="Mobile number"
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <div className="flex items-center gap-2 text-sm text-gray-600">
//                                 <input type="checkbox" id="whatsapp-consent" className="rounded text-blue-600" />
//                                 <label htmlFor="whatsapp-consent">I agree to be contacted by WhatsApp, SMS, Email</label>
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
//                             >
//                                 Submit
//                             </button>
//                         </form>
//                         <div className="mt-6 flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
//                             <div className="w-12 h-12 flex items-center justify-center text-gray-500">
//                                 <PhoneIcon size={24} />
//                             </div>
//                             <div className="flex-1">
//                                 <p className="text-sm font-semibold text-gray-800">
//                                     Rest assured, you'll receive a call from our sales expert within the next 5 minutes.
//                                 </p>
//                                 <p className="text-xs text-gray-500">(within working hours)</p>
//                             </div>
//                         </div>
//                         <div className="mt-4 text-center">
//                             <a href="#" className="text-blue-600 text-sm hover:underline">Read Disclaimer</a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };