// // src/data/projectsData.ts

// export interface Project {
//   id: number;
//   name: string;
//   developer: string;
//   location: string;
//   configurations: string;
//   priceRange: string;
//   reraId: string;
//   images: {
//     main: string;
//     others: string[];
//   };
//   unitTypes: {
//     name: string;
//     area: string;
//     price: string;
//   }[];
//   overview: {
//     propertyType: string;
//     purchaseType: string;
//     totalArea: string;
//     possessionDate: string;
//     residenceType: string;
//     projectStage: string;
//     totalUnits: string;
//     launchDate: string;
//   };
//   towerDetails: {
//     towers: string;
//     bedrooms: string;
//     unitsPerFloor: number;
//     lifts: number;
//     storeys: string;
//   };
//   keyFeatures: string[];
//   amenities: string[];
//   floorPlans: {
//     type: string;
//     plans: {
//       image: string;
//       price: string;
//       rate: string;
//       beds: number;
//       baths: number;
//       balconies: number;
//       area: string;
//     }[];
//   }[];
//   locationData: {
//     coordinates: string;
//     address: string;
//     googleMapsUrl: string;
//   };
//   nearby: {
//     category: string;
//     name: string;
//     distance: string;
//   }[];
//   videoUrl?: string;
// }

// export const projectData = {
//   'all': {
//     title: 'All Properties',
//     projects: [
//       {
//         id: 1,
//         name: "Aristo Anantam",
//         description: "3, 4 BHK Flat in Chharodi, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop",
//         type: "3 BHK Flat",
//         area: "230 - 280 Sq-yrd",
//         price: "₹1.16 Cr - ₹1.41 Cr",
//         type2: "4 BHK Flat",
//         area2: "330 Sq-yrd",
//         price2: "₹1.67 Cr",
//         pricePerSqyd: "₹46,000 / Sq-yrd",
//         soldOut: null,
//         possession: "May 2030",
//         metro: "Public Transportation within 550 meter",
//         airport: "Airport within 17 km",
//         builder: "Aristo Lifespace",
//         zeroBrokerage: true,
//         residential: "Residential with Retail",
//         reraId: "PG/GJ/AHMEDABAD",
//         bestOffer: true,
//         bhk: '3 BHK'
//       },
//       {
//         id: 2,
//         name: "Venus Pashmina",
//         description: "2, 3 BHK Flat in Ambli, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop",
//         type: "2 BHK Flat",
//         area: "850 - 950 Sq.Ft",
//         price: "₹85 Lac - ₹95 Lac",
//         type2: "3 BHK Flat",
//         area2: "1200 - 1350 Sq.Ft",
//         price2: "₹1.2 Cr - ₹1.35 Cr",
//         pricePerSqft: "₹9,500 / Sq.Ft",
//         soldOut: null,
//         possession: "Ready to Move",
//         metro: "Metro line within 2km",
//         airport: "Airport within 10km",
//         builder: "Venus Group",
//         zeroBrokerage: true,
//         residential: "Residential",
//         reraId: "GJ/REG/AHMEDA",
//         bestOffer: false,
//         bhk: '2 BHK'
//       },
//       {
//         id: 3,
//         name: "Shilp Serenity",
//         description: "3, 4 BHK House in Naranpura, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
//         type: "3 BHK House",
//         area: "1500 - 1650 Sq.Ft",
//         price: "₹80 Lac - ₹90 Lac",
//         type2: "4 BHK House",
//         area2: "2000 Sq.Ft",
//         price2: "₹1.1 Cr",
//         pricePerSqft: "₹5,500 / Sq.Ft",
//         soldOut: null,
//         possession: "Possession in 1 year",
//         metro: "Public Transportation nearby",
//         airport: "Airport within 20km",
//         builder: "Shilp Builders",
//         zeroBrokerage: true,
//         residential: "Independent House",
//         reraId: "GJ/SHILP/2024",
//         bestOffer: false,
//         bhk: '3 BHK'
//       },
//       {
//         id: 4,
//         name: "Luxury Heights",
//         description: "4, 5 BHK Villa in SG Highway, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2670&auto=format&fit=crop",
//         type: "4 BHK Villa",
//         area: "2800 - 3200 Sq.Ft",
//         price: "₹2.5 Cr - ₹2.8 Cr",
//         type2: "5 BHK Villa",
//         area2: "3500 Sq.Ft",
//         price2: "₹3.2 Cr",
//         pricePerSqft: "₹9,200 / Sq.Ft",
//         soldOut: null,
//         possession: "Possession in 2 years",
//         metro: "Metro within 5km",
//         airport: "Airport within 15km",
//         builder: "Luxury Homes",
//         zeroBrokerage: true,
//         residential: "Premium Villa",
//         reraId: "GJ/LUX/2023",
//         bestOffer: false,
//         bhk: '4 BHK'
//       },
//       {
//         id: 5,
//         name: "Radiant Heights",
//         description: "3, 4 BHK Flat in Gota, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=2670&auto=format&fit=crop",
//         type: "3 BHK Flat",
//         area: "1400 - 1600 Sq.Ft",
//         price: "₹75 Lac - ₹85 Lac",
//         type2: "4 BHK Flat",
//         area2: "1800 - 2000 Sq.Ft",
//         price2: "₹1.05 Cr - ₹1.15 Cr",
//         pricePerSqft: "₹5,800 / Sq.Ft",
//         soldOut: { type: "3 BHK Penthouse", area: "1750 Sq.Ft (Super Builtup Area)" },
//         possession: "December 2025",
//         metro: "Public Transportation within 3km",
//         airport: "Airport within 22km",
//         builder: "Radiant Group",
//         zeroBrokerage: true,
//         residential: "Residential with Club",
//         reraId: "GJ/RAD/GOTA",
//         bestOffer: true,
//         bhk: '3 BHK'
//       },
//       {
//         id: 10,
//         name: "Horizon Greens",
//         description: "2, 3 BHK Flat in South Bopal, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
//         type: "2 BHK Flat",
//         area: "950 - 1100 Sq.Ft",
//         price: "₹60 Lac - ₹70 Lac",
//         type2: "3 BHK Flat",
//         area2: "1350 - 1500 Sq.Ft",
//         price2: "₹85 Lac - ₹95 Lac",
//         pricePerSqft: "₹6,300 / Sq.Ft",
//         soldOut: null,
//         possession: "June 2027",
//         metro: "Public Transportation within 1.5km",
//         airport: "Airport within 18km",
//         builder: "Horizon Builders",
//         zeroBrokerage: true,
//         residential: "Eco-Friendly Residential",
//         reraId: "GJ/HOR/SOUTHBOPAL",
//         bestOffer: true,
//         bhk: '2 BHK'
//       },
//       {
//         id: 11,
//         name: "Pinnacle Residency",
//         description: "4 BHK Penthouse in Satellite, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2670&auto=format&fit=crop",
//         type: "4 BHK Penthouse",
//         area: "3000 - 3200 Sq.Ft",
//         price: "₹2.8 Cr - ₹3 Cr",
//         type2: null,
//         area2: null,
//         price2: null,
//         pricePerSqft: "₹9,300 / Sq.Ft",
//         soldOut: null,
//         possession: "Ready to Move",
//         metro: "Metro within 2km",
//         airport: "Airport within 14km",
//         builder: "Pinnacle Developers",
//         zeroBrokerage: true,
//         residential: "Luxury Penthouse",
//         reraId: "GJ/PIN/SATELLITE",
//         bestOffer: false,
//         bhk: '4 BHK'
//       },
//       {
//         id: 12,
//         name: "Silver Oak",
//         description: "3, 4 BHK Villa in Shela, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=2670&auto=format&fit=crop",
//         type: "3 BHK Villa",
//         area: "2000 - 2200 Sq.Ft",
//         price: "₹1.5 Cr - ₹1.7 Cr",
//         type2: "4 BHK Villa",
//         area2: "2500 - 2700 Sq.Ft",
//         price2: "₹1.9 Cr - ₹2.1 Cr",
//         pricePerSqft: "₹7,600 / Sq.Ft",
//         soldOut: null,
//         possession: "Possession in 1 year",
//         metro: "Public Transportation within 3km",
//         airport: "Airport within 20km",
//         builder: "Silver Developers",
//         zeroBrokerage: true,
//         residential: "Premium Villa Community",
//         reraId: "GJ/SIL/SHELA",
//         bestOffer: true,
//         bhk: '3 BHK'
//       }
//     ]
//   },
//   'flat-in-ahmedabad': {
//     title: 'Flat In Ahmedabad',
//     projects: [
//       {
//         id: 1,
//         name: "Nivaasa",
//         description: "3 BHK Flat in Shela, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1574362145328-3e5f0d57564d?q=80&w=2670&auto=format&fit=crop",
//         type: "3 BHK Flat",
//         area: "1750 Sq.Ft",
//         price: "₹79.00 L",
//         type2: null,
//         area2: null,
//         price2: null,
//         pricePerSqft: "₹4,500 / Sq.Ft",
//         soldOut: { type: "3 BHK Penthouse", area: "1750 Sq.Ft (Super Builtup Area)" },
//         possession: "December 2028",
//         metro: "Public Transportation within 4.1 km",
//         airport: "Airport within 24 km",
//         builder: "Radomi Group",
//         zeroBrokerage: true,
//         residential: "Residential",
//         reraId: "GJ/RAD/SHELA",
//         bestOffer: true,
//         bhk: '3 BHK'
//       },
//       {
//         id: 2,
//         name: "The Regal",
//         description: "4 BHK Flat in Vaishnodevi, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1560518883-ce092b740871?q=80&w=2670&auto=format&fit=crop",
//         type: "4 BHK Flat",
//         area: "3015 - 3879 Sq.Ft",
//         price: "₹1.57 Cr - ₹2.02 Cr",
//         type2: null,
//         area2: null,
//         price2: null,
//         pricePerSqft: "₹5,200 / Sq.Ft",
//         soldOut: null,
//         possession: "December 2028",
//         metro: "Public Transportation within 4.1 km",
//         airport: "Airport within 24 km",
//         builder: "Radomi Group",
//         zeroBrokerage: true,
//         residential: "Luxury Residential",
//         reraId: "GJ/RAD/VAISH",
//         bestOffer: false,
//         bhk: '4 BHK'
//       },
//       {
//         id: 3,
//         name: "Skyline Residency",
//         description: "2, 3 BHK Flat in Science City, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2670&auto=format&fit=crop",
//         type: "2 BHK Flat",
//         area: "900 - 1100 Sq.Ft",
//         price: "₹65 Lac - ₹75 Lac",
//         type2: "3 BHK Flat",
//         area2: "1300 - 1500 Sq.Ft",
//         price2: "₹95 Lac - ₹1.1 Cr",
//         pricePerSqft: "₹7,200 / Sq.Ft",
//         soldOut: null,
//         possession: "June 2026",
//         metro: "Metro within 1km",
//         airport: "Airport within 18km",
//         builder: "Skyline Developers",
//         zeroBrokerage: true,
//         residential: "Smart Homes",
//         reraId: "GJ/SKY/SCI",
//         bestOffer: false,
//         bhk: '2 BHK'
//       },
//       {
//         id: 13,
//         name: "Urban Heights",
//         description: "2, 3 BHK Flat in Prahlad Nagar, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
//         type: "2 BHK Flat",
//         area: "1000 - 1200 Sq.Ft",
//         price: "₹70 Lac - ₹80 Lac",
//         type2: "3 BHK Flat",
//         area2: "1400 - 1600 Sq.Ft",
//         price2: "₹1 Cr - ₹1.15 Cr",
//         pricePerSqft: "₹7,000 / Sq.Ft",
//         soldOut: null,
//         possession: "Ready to Move",
//         metro: "Metro within 1.5km",
//         airport: "Airport within 15km",
//         builder: "Urban Developers",
//         zeroBrokerage: true,
//         residential: "Modern Residential",
//         reraId: "GJ/URB/PRAHLAD",
//         bestOffer: true,
//         bhk: '2 BHK'
//       }
//     ]
//   },
//   'ready-to-move': {
//     title: 'Ready To Move Projects',
//     projects: [
//       {
//         id: 4,
//         name: "Sunrise Residency",
//         description: "3, 4 BHK Ready Flat in Ambli, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2670&auto=format&fit=crop",
//         type: "3 BHK Flat",
//         area: "1600 Sq.Ft",
//         price: "₹95 Lac",
//         type2: "4 BHK Flat",
//         area2: "2100 Sq.Ft",
//         price2: "₹1.25 Cr",
//         pricePerSqft: "₹5,950 / Sq.Ft",
//         soldOut: null,
//         possession: "Ready to Move",
//         metro: "Metro line within 1km",
//         airport: "Airport within 12km",
//         builder: "Sunrise Developers",
//         zeroBrokerage: true,
//         residential: "Ready Possession",
//         reraId: "GJ/SUN/AMBLI",
//         bestOffer: false,
//         bhk: '3 BHK'
//       },
//       {
//         id: 5,
//         name: "Green Valley",
//         description: "2, 3 BHK Ready Flat in Jagatpur, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
//         type: "2 BHK Flat",
//         area: "1050 Sq.Ft",
//         price: "₹58 Lac",
//         type2: "3 BHK Flat",
//         area2: "1450 Sq.Ft",
//         price2: "₹78 Lac",
//         pricePerSqft: "₹5,380 / Sq.Ft",
//         soldOut: null,
//         possession: "Ready to Move",
//         metro: "Public Transportation within 2km",
//         airport: "Airport within 25km",
//         builder: "Green Developers",
//         zeroBrokerage: true,
//         residential: "Eco-Friendly",
//         reraId: "GJ/GREEN/JAG",
//         bestOffer: true,
//         bhk: '2 BHK'
//       },
//       {
//         id: 14,
//         name: "Cityscape Apartments",
//         description: "3 BHK Ready Flat in Bodakdev, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop",
//         type: "3 BHK Flat",
//         area: "1700 - 1900 Sq.Ft",
//         price: "₹1.1 Cr - ₹1.2 Cr",
//         type2: null,
//         area2: null,
//         price2: null,
//         pricePerSqft: "₹6,400 / Sq.Ft",
//         soldOut: null,
//         possession: "Ready to Move",
//         metro: "Metro within 2km",
//         airport: "Airport within 13km",
//         builder: "Cityscape Builders",
//         zeroBrokerage: true,
//         residential: "Urban Living",
//         reraId: "GJ/CITY/BODAKDEV",
//         bestOffer: false,
//         bhk: '3 BHK'
//       }
//     ]
//   },
//   'possession-within-1-year': {
//     title: 'Possession Within 1 Year',
//     projects: [
//       {
//         id: 6,
//         name: "Elite Towers",
//         description: "3, 4 BHK Flat in Thaltej, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop",
//         type: "3 BHK Flat",
//         area: "1650 - 1850 Sq.Ft",
//         price: "₹1.15 Cr - ₹1.35 Cr",
//         type2: "4 BHK Flat",
//         area2: "2200 - 2500 Sq.Ft",
//         price2: "₹1.65 Cr - ₹1.85 Cr",
//         pricePerSqft: "₹7,400 / Sq.Ft",
//         soldOut: null,
//         possession: "March 2026",
//         metro: "Metro within 800m",
//         airport: "Airport within 8km",
//         builder: "Elite Constructions",
//         zeroBrokerage: true,
//         residential: "Premium Towers",
//         reraId: "GJ/ELITE/THAL",
//         bestOffer: false,
//         bhk: '3 BHK'
//       },
//       {
//         id: 15,
//         name: "Crystal Gardens",
//         description: "2, 3 BHK Flat in Paldi, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
//         type: "2 BHK Flat",
//         area: "900 - 1100 Sq.Ft",
//         price: "₹55 Lac - ₹65 Lac",
//         type2: "3 BHK Flat",
//         area2: "1300 - 1500 Sq.Ft",
//         price2: "₹80 Lac - ₹90 Lac",
//         pricePerSqft: "₹6,100 / Sq.Ft",
//         soldOut: null,
//         possession: "June 2026",
//         metro: "Public Transportation within 1km",
//         airport: "Airport within 10km",
//         builder: "Crystal Builders",
//         zeroBrokerage: true,
//         residential: "Modern Residential",
//         reraId: "GJ/CRY/PALDI",
//         bestOffer: true,
//         bhk: '2 BHK'
//       }
//     ]
//   },
//   'possession-within-2-year': {
//     title: 'Possession Within 2 Years',
//     projects: [
//       {
//         id: 7,
//         name: "Modern Spaces",
//         description: "2, 3, 4 BHK Flat in Bopal, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop",
//         type: "2 BHK Flat",
//         area: "980 - 1120 Sq.Ft",
//         price: "₹68 Lac - ₹78 Lac",
//         type2: "3 BHK Flat",
//         area2: "1380 - 1550 Sq.Ft",
//         price2: "₹95 Lac - ₹1.08 Cr",
//         pricePerSqft: "₹6,950 / Sq.Ft",
//         soldOut: null,
//         possession: "September 2027",
//         metro: "Metro connectivity planned",
//         airport: "Airport within 16km",
//         builder: "Modern Builders",
//         zeroBrokerage: true,
//         residential: "Smart Living",
//         reraId: "GJ/MOD/BOPAL",
//         bestOffer: true,
//         bhk: '2 BHK'
//       },
//       {
//         id: 16,
//         name: "Golden Crest",
//         description: "4 BHK Duplex in Vastrapur, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2670&auto=format&fit=crop",
//         type: "4 BHK Duplex",
//         area: "2800 - 3100 Sq.Ft",
//         price: "₹2.2 Cr - ₹2.5 Cr",
//         type2: null,
//         area2: null,
//         price2: null,
//         pricePerSqft: "₹8,000 / Sq.Ft",
//         soldOut: null,
//         possession: "December 2026",
//         metro: "Metro within 1.8km",
//         airport: "Airport within 12km",
//         builder: "Golden Developers",
//         zeroBrokerage: true,
//         residential: "Luxury Duplex",
//         reraId: "GJ/GOLD/VAST",
//         bestOffer: false,
//         bhk: '4 BHK'
//       }
//     ]
//   },
//   'possession-more-than-2-years': {
//     title: 'Possession in More than 2 Years',
//     projects: [
//       {
//         id: 8,
//         name: "Future City",
//         description: "3, 4, 5 BHK Flat in Shilaj, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
//         type: "3 BHK Flat",
//         area: "1550 - 1750 Sq.Ft",
//         price: "₹85 Lac - ₹95 Lac",
//         type2: "4 BHK Flat",
//         area2: "2100 - 2400 Sq.Ft",
//         price2: "₹1.18 Cr - ₹1.35 Cr",
//         pricePerSqft: "₹5,650 / Sq.Ft",
//         soldOut: null,
//         possession: "December 2029",
//         metro: "Future Metro Line",
//         airport: "Airport within 19km",
//         builder: "Future Developers",
//         zeroBrokerage: true,
//         residential: "Futuristic Living",
//         reraId: "GJ/FUT/SHILAJ",
//         bestOffer: false,
//         bhk: '3 BHK'
//       },
//       {
//         id: 17,
//         name: "Elysian Towers",
//         description: "3, 4 BHK Flat in Sanand, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=2670&auto=format&fit=crop",
//         type: "3 BHK Flat",
//         area: "1600 - 1800 Sq.Ft",
//         price: "₹90 Lac - ₹1 Cr",
//         type2: "4 BHK Flat",
//         area2: "2200 - 2400 Sq.Ft",
//         price2: "₹1.3 Cr - ₹1.5 Cr",
//         pricePerSqft: "₹5,900 / Sq.Ft",
//         soldOut: null,
//         possession: "March 2030",
//         metro: "Public Transportation within 5km",
//         airport: "Airport within 25km",
//         builder: "Elysian Builders",
//         zeroBrokerage: true,
//         residential: "Modern Residential",
//         reraId: "GJ/ELY/SANAND",
//         bestOffer: true,
//         bhk: '3 BHK'
//       }
//     ]
//   },
//   'new-launch-projects': {
//     title: 'New Launch Projects',
//     projects: [
//       {
//         id: 9,
//         name: "Grand Palladium",
//         description: "3, 4 BHK Flat in Vastrapur, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2670&auto=format&fit=crop",
//         type: "3 BHK Flat",
//         area: "1680 - 1920 Sq.Ft",
//         price: "₹1.25 Cr - ₹1.45 Cr",
//         type2: "4 BHK Flat",
//         area2: "2300 - 2650 Sq.Ft",
//         price2: "₹1.75 Cr - ₹2.05 Cr",
//         pricePerSqft: "₹7,850 / Sq.Ft",
//         soldOut: null,
//         possession: "Launch Offer - December 2027",
//         metro: "Metro within 1.2km",
//         airport: "Airport within 12km",
//         builder: "Grand Constructions",
//         zeroBrokerage: true,
//         residential: "Luxury Launch",
//         reraId: "GJ/GRAND/VAST",
//         bestOffer: true,
//         bhk: '3 BHK'
//       },
//       {
//         id: 18,
//         name: "Nova Heights",
//         description: "2, 3 BHK Flat in Chandkheda, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
//         type: "2 BHK Flat",
//         area: "950 - 1100 Sq.Ft",
//         price: "₹60 Lac - ₹70 Lac",
//         type2: "3 BHK Flat",
//         area2: "1300 - 1500 Sq.Ft",
//         price2: "₹85 Lac - ₹95 Lac",
//         pricePerSqft: "₹6,500 / Sq.Ft",
//         soldOut: null,
//         possession: "Launch Offer - June 2028",
//         metro: "Metro within 2km",
//         airport: "Airport within 10km",
//         builder: "Nova Developers",
//         zeroBrokerage: true,
//         residential: "New Launch Residential",
//         reraId: "GJ/NOVA/CHAND",
//         bestOffer: true,
//         bhk: '2 BHK'
//       }
//     ]
//   },
//   'house-for-sale-in-ahmedabad': {
//     title: 'House for Sale in Ahmedabad',
//     projects: [
//       {
//         id: 19,
//         name: "Heritage Homes",
//         description: "3, 4 BHK House in Navrangpura, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=2670&auto=format&fit=crop",
//         type: "3 BHK House",
//         area: "1800 - 2000 Sq.Ft",
//         price: "₹1.2 Cr - ₹1.4 Cr",
//         type2: "4 BHK House",
//         area2: "2400 - 2600 Sq.Ft",
//         price2: "₹1.6 Cr - ₹1.8 Cr",
//         pricePerSqft: "₹6,800 / Sq.Ft",
//         soldOut: null,
//         possession: "Ready to Move",
//         metro: "Public Transportation within 1km",
//         airport: "Airport within 15km",
//         builder: "Heritage Builders",
//         zeroBrokerage: true,
//         residential: "Independent House",
//         reraId: "GJ/HER/NAVRANG",
//         bestOffer: false,
//         bhk: '3 BHK'
//       }
//     ]
//   },
//   'villa-in-ahmedabad': {
//     title: 'Villa in Ahmedabad',
//     projects: [
//       {
//         id: 20,
//         name: "Paradise Villas",
//         description: "4, 5 BHK Villa in Thaltej, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2670&auto=format&fit=crop",
//         type: "4 BHK Villa",
//         area: "3000 - 3400 Sq.Ft",
//         price: "₹2.7 Cr - ₹3.1 Cr",
//         type2: "5 BHK Villa",
//         area2: "3800 - 4200 Sq.Ft",
//         price2: "₹3.5 Cr - ₹4 Cr",
//         pricePerSqft: "₹9,000 / Sq.Ft",
//         soldOut: null,
//         possession: "Possession in 2 years",
//         metro: "Metro within 2km",
//         airport: "Airport within 14km",
//         builder: "Paradise Developers",
//         zeroBrokerage: true,
//         residential: "Luxury Villa Community",
//         reraId: "GJ/PAR/THALTEJ",
//         bestOffer: true,
//         bhk: '4 BHK'
//       }
//     ]
//   },
//   'penthouse-for-sale-in-ahmedabad': {
//     title: 'Penthouse for Sale in Ahmedabad',
//     projects: [
//       {
//         id: 11,
//         name: "Pinnacle Residency",
//         description: "4 BHK Penthouse in Satellite, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2670&auto=format&fit=crop",
//         type: "4 BHK Penthouse",
//         area: "3000 - 3200 Sq.Ft",
//         price: "₹2.8 Cr - ₹3 Cr",
//         type2: null,
//         area2: null,
//         price2: null,
//         pricePerSqft: "₹9,300 / Sq.Ft",
//         soldOut: null,
//         possession: "Ready to Move",
//         metro: "Metro within 2km",
//         airport: "Airport within 14km",
//         builder: "Pinnacle Developers",
//         zeroBrokerage: true,
//         residential: "Luxury Penthouse",
//         reraId: "GJ/PIN/SATELLITE",
//         bestOffer: false,
//         bhk: '4 BHK'
//       }
//     ]
//   },
//   'duplex-for-sale-in-ahmedabad': {
//     title: 'Duplex for Sale in Ahmedabad',
//     projects: [
//       {
//         id: 16,
//         name: "Golden Crest",
//         description: "4 BHK Duplex in Vastrapur, Ahmedabad",
//         image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2670&auto=format&fit=crop",
//         type: "4 BHK Duplex",
//         area: "2800 - 3100 Sq.Ft",
//         price: "₹2.2 Cr - ₹2.5 Cr",
//         type2: null,
//         area2: null,
//         price2: null,
//         pricePerSqft: "₹8,000 / Sq.Ft",
//         soldOut: null,
//         possession: "December 2026",
//         metro: "Metro within 1.8km",
//         airport: "Airport within 12km",
//         builder: "Golden Developers",
//         zeroBrokerage: true,
//         residential: "Luxury Duplex",
//         reraId: "GJ/GOLD/VAST",
//         bestOffer: false,
//         bhk: '4 BHK'
//       }
//     ]
//   }
// };

// src/data/projectsData.ts
export type Amenity = {
  name: string;
  icon: string;
};

export const projectData = {
  'all': {
    title: 'All Properties',
    projects: [
      {
        id: 1,
        name: "Aristo Anantam",
        description: "3, 4 BHK Flat in Chharodi, Ahmedabad",
        developer: "Aristo Lifespace",
        status: "₹1.16 Cr Onwards",
        reraId: "PG/GJ/AHMEDABAD",
        heroImages: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593696140826-c58b02198d47?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
        ],
        floorPlans: [
          {
            type: "3 BHK Flat",
            image: "https://images.unsplash.com/photo-1611575339428-6972d2799a22?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 3, baths: 3, balconies: 1, parking: 2 },
            area: "230 - 280 Sq-yrd",
            price: "₹1.16 Cr - ₹1.41 Cr"
          },
          {
            type: "4 BHK Flat",
            image: "https://images.unsplash.com/photo-1542882284-8193c7449ce8?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 4, baths: 4, balconies: 2, parking: 2 },
            area: "330 Sq-yrd",
            price: "₹1.67 Cr"
          }
        ],
        overview: {
          propertyType: "Flat",
          purchaseType: "New Booking",
          totalArea: "Not Specified",
          possessionDate: "May 2030",
          projectStage: "Under Construction",
          totalUnits: "Not Specified",
          launchDate: "Not Specified"
        },
        towerDetails: [
          { tower: "A", bedroom: "3 BHK Flat", unitsOfFloor: 4, lift: 2, storey: "G+15" },
          { tower: "B", bedroom: "4 BHK Flat", unitsOfFloor: 4, lift: 2, storey: "G+15" }
        ],
        keyFeatures: [
          "Zero Brokerage",
          "Residential with Retail",
          "Best Offer Available"
        ],
        amenities: [
          { name: "Jogging Track", icon: "run" },
          { name: "Public Transportation", icon: "bus" },
          { name: "Proximity to Airport", icon: "plane" },
          { name: "Swimming Pool", icon: "waves" }
        ] as Amenity[],
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop"
        ],
        configurations: [
          { type: "3 BHK Flat", area: "230 - 280 Sq-yrd", price: "₹1.16 Cr - ₹1.41 Cr" },
          { type: "4 BHK Flat", area: "330 Sq-yrd", price: "₹1.67 Cr" }
        ],
        builder: "Aristo Lifespace",
        price: "₹1.16 Cr Onwards",
        bhk: "3 BHK",
        possession: "May 2030"
      },
      {
        id: 2,
        name: "Venus Pashmina",
        description: "2, 3 BHK Flat in Ambli, Ahmedabad",
        developer: "Venus Group",
        status: "₹85 Lac Onwards",
        reraId: "GJ/REG/AHMEDA",
        heroImages: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593696140826-c58b02198d47?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
        ],
        floorPlans: [
          {
            type: "2 BHK Flat",
            image: "https://images.unsplash.com/photo-1611575339428-6972d2799a22?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 2, baths: 2, balconies: 1, parking: 1 },
            area: "850 - 950 Sq.Ft",
            price: "₹85 Lac - ₹95 Lac"
          },
          {
            type: "3 BHK Flat",
            image: "https://images.unsplash.com/photo-1542882284-8193c7449ce8?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 3, baths: 3, balconies: 1, parking: 2 },
            area: "1200 - 1350 Sq.Ft",
            price: "₹1.2 Cr - ₹1.35 Cr"
          }
        ],
        overview: {
          propertyType: "Flat",
          purchaseType: "Ready to Move",
          totalArea: "Not Specified",
          possessionDate: "Ready to Move",
          projectStage: "Completed",
          totalUnits: "Not Specified",
          launchDate: "Not Specified"
        },
        towerDetails: [
          { tower: "A", bedroom: "2 BHK Flat", unitsOfFloor: 6, lift: 3, storey: "G+12" },
          { tower: "B", bedroom: "3 BHK Flat", unitsOfFloor: 6, lift: 3, storey: "G+12" }
        ],
        keyFeatures: [
          "Zero Brokerage",
          "Residential",
          "Metro Connectivity"
        ],
        amenities: [
          { name: "Metro Line", icon: "subway" },
          { name: "Proximity to Airport", icon: "plane" },
          { name: "Garden", icon: "tree-pine" },
          { name: "Security", icon: "shield" }
        ] as Amenity[],
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop"
        ],
        configurations: [
          { type: "2 BHK Flat", area: "850 - 950 Sq.Ft", price: "₹85 Lac - ₹95 Lac" },
          { type: "3 BHK Flat", area: "1200 - 1350 Sq.Ft", price: "₹1.2 Cr - ₹1.35 Cr" }
        ],
        builder: "Venus Group",
        price: "₹85 Lac Onwards",
        bhk: "2 BHK",
        possession: "Ready to Move"
      },
      {
        id: 3,
        name: "Shilp Serenity",
        description: "3, 4 BHK House in Naranpura, Ahmedabad",
        developer: "Shilp Builders",
        status: "₹80 Lac Onwards",
        reraId: "GJ/SHILP/2024",
        heroImages: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593696140826-c58b02198d47?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop"
        ],
        floorPlans: [
          {
            type: "3 BHK House",
            image: "https://images.unsplash.com/photo-1611575339428-6972d2799a22?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 3, baths: 3, balconies: 1, parking: 2 },
            area: "1500 - 1650 Sq.Ft",
            price: "₹80 Lac - ₹90 Lac"
          },
          {
            type: "4 BHK House",
            image: "https://images.unsplash.com/photo-1542882284-8193c7449ce8?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 4, baths: 4, balconies: 2, parking: 2 },
            area: "2000 Sq.Ft",
            price: "₹1.1 Cr"
          }
        ],
        overview: {
          propertyType: "House",
          purchaseType: "Under Construction",
          totalArea: "Not Specified",
          possessionDate: "Possession in 1 year",
          projectStage: "Under Construction",
          totalUnits: "Not Specified",
          launchDate: "Not Specified"
        },
        towerDetails: [],
        keyFeatures: [
          "Zero Brokerage",
          "Independent House"
        ],
        amenities: [
          { name: "Public Transportation", icon: "bus" },
          { name: "Proximity to Airport", icon: "plane" },
          { name: "Visitor Parking", icon: "car" }
        ] as Amenity[],
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
        ],
        configurations: [
          { type: "3 BHK House", area: "1500 - 1650 Sq.Ft", price: "₹80 Lac - ₹90 Lac" },
          { type: "4 BHK House", area: "2000 Sq.Ft", price: "₹1.1 Cr" }
        ],
        builder: "Shilp Builders",
        price: "₹80 Lac Onwards",
        bhk: "3 BHK",
        possession: "Possession in 1 year"
      },
      {
        id: 4,
        name: "Luxury Heights",
        description: "4, 5 BHK Villa in SG Highway, Ahmedabad",
        developer: "Luxury Homes",
        status: "₹2.5 Cr Onwards",
        reraId: "GJ/LUX/2023",
        heroImages: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593696140826-c58b02198d47?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop"
        ],
        floorPlans: [
          {
            type: "4 BHK Villa",
            image: "https://images.unsplash.com/photo-1611575339428-6972d2799a22?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 4, baths: 4, balconies: 2, parking: 3 },
            area: "2800 - 3200 Sq.Ft",
            price: "₹2.5 Cr - ₹2.8 Cr"
          },
          {
            type: "5 BHK Villa",
            image: "https://images.unsplash.com/photo-1542882284-8193c7449ce8?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 5, baths: 5, balconies: 3, parking: 3 },
            area: "3500 Sq.Ft",
            price: "₹3.2 Cr"
          }
        ],
        overview: {
          propertyType: "Villa",
          purchaseType: "Under Construction",
          totalArea: "Not Specified",
          possessionDate: "Possession in 2 years",
          projectStage: "Under Construction",
          totalUnits: "Not Specified",
          launchDate: "Not Specified"
        },
        towerDetails: [],
        keyFeatures: [
          "Zero Brokerage",
          "Premium Villa",
          "Metro Connectivity"
        ],
        amenities: [
          { name: "Metro", icon: "subway" },
          { name: "Proximity to Airport", icon: "plane" },
          { name: "Swimming Pool", icon: "waves" },
          { name: "Security", icon: "shield" }
        ] as Amenity[],
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2670&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2670&auto=format&fit=crop"
        ],
        configurations: [
          { type: "4 BHK Villa", area: "2800 - 3200 Sq.Ft", price: "₹2.5 Cr - ₹2.8 Cr" },
          { type: "5 BHK Villa", area: "3500 Sq.Ft", price: "₹3.2 Cr" }
        ],
        builder: "Luxury Homes",
        price: "₹2.5 Cr Onwards",
        bhk: "4 BHK",
        possession: "Possession in 2 years"
      },
      {
        id: 5,
        name: "Radiant Heights",
        description: "3, 4 BHK Flat in Gota, Ahmedabad",
        developer: "Radiant Group",
        status: "₹75 Lac Onwards",
        reraId: "GJ/RAD/GOTA",
        heroImages: [
          "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593696140826-c58b02198d47?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
        ],
        floorPlans: [
          {
            type: "3 BHK Flat",
            image: "https://images.unsplash.com/photo-1611575339428-6972d2799a22?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 3, baths: 3, balconies: 1, parking: 2 },
            area: "1400 - 1600 Sq.Ft",
            price: "₹75 Lac - ₹85 Lac"
          },
          {
            type: "4 BHK Flat",
            image: "https://images.unsplash.com/photo-1542882284-8193c7449ce8?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 4, baths: 4, balconies: 2, parking: 2 },
            area: "1800 - 2000 Sq.Ft",
            price: "₹1.05 Cr - ₹1.15 Cr"
          }
        ],
        overview: {
          propertyType: "Flat",
          purchaseType: "Under Construction",
          totalArea: "Not Specified",
          possessionDate: "Possession in 1 year",
          projectStage: "Under Construction",
          totalUnits: "Not Specified",
          launchDate: "Not Specified"
        },
        towerDetails: [
          { tower: "A", bedroom: "3 BHK Flat", unitsOfFloor: 5, lift: 2, storey: "G+14" },
          { tower: "B", bedroom: "4 BHK Flat", unitsOfFloor: 5, lift: 2, storey: "G+14" }
        ],
        keyFeatures: [
          "Zero Brokerage",
          "Residential",
          "Best Offer Available"
        ],
        amenities: [
          { name: "Jogging Track", icon: "run" },
          { name: "Public Transportation", icon: "bus" },
          { name: "Proximity to Airport", icon: "plane" },
          { name: "Security", icon: "shield" }
        ] as Amenity[],
        image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=2670&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=2670&auto=format&fit=crop"
        ],
        configurations: [
          { type: "3 BHK Flat", area: "1400 - 1600 Sq.Ft", price: "₹75 Lac - ₹85 Lac" },
          { type: "4 BHK Flat", area: "1800 - 2000 Sq.Ft", price: "₹1.05 Cr - ₹1.15 Cr" }
        ],
        builder: "Radiant Group",
        price: "₹75 Lac Onwards",
        bhk: "3 BHK",
        possession: "Possession in 1 year"
      }
    ]
  },
  'ready-to-move': {
    title: 'Ready to Move Properties',
    projects: [
      {
        id: 2,
        name: "Venus Pashmina",
        description: "2, 3 BHK Flat in Ambli, Ahmedabad",
        developer: "Venus Group",
        status: "₹85 Lac Onwards",
        reraId: "GJ/REG/AHMEDA",
        heroImages: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593696140826-c58b02198d47?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
        ],
        floorPlans: [
          {
            type: "2 BHK Flat",
            image: "https://images.unsplash.com/photo-1611575339428-6972d2799a22?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 2, baths: 2, balconies: 1, parking: 1 },
            area: "850 - 950 Sq.Ft",
            price: "₹85 Lac - ₹95 Lac"
          },
          {
            type: "3 BHK Flat",
            image: "https://images.unsplash.com/photo-1542882284-8193c7449ce8?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 3, baths: 3, balconies: 1, parking: 2 },
            area: "1200 - 1350 Sq.Ft",
            price: "₹1.2 Cr - ₹1.35 Cr"
          }
        ],
        overview: {
          propertyType: "Flat",
          purchaseType: "Ready to Move",
          totalArea: "Not Specified",
          possessionDate: "Ready to Move",
          projectStage: "Completed",
          totalUnits: "Not Specified",
          launchDate: "Not Specified"
        },
        towerDetails: [
          { tower: "A", bedroom: "2 BHK Flat", unitsOfFloor: 6, lift: 3, storey: "G+12" },
          { tower: "B", bedroom: "3 BHK Flat", unitsOfFloor: 6, lift: 3, storey: "G+12" }
        ],
        keyFeatures: [
          "Zero Brokerage",
          "Residential",
          "Metro Connectivity"
        ],
        amenities: [
          { name: "Metro Line", icon: "subway" },
          { name: "Proximity to Airport", icon: "plane" },
          { name: "Garden", icon: "tree-pine" },
          { name: "Security", icon: "shield" }
        ] as Amenity[],
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop"
        ],
        configurations: [
          { type: "2 BHK Flat", area: "850 - 950 Sq.Ft", price: "₹85 Lac - ₹95 Lac" },
          { type: "3 BHK Flat", area: "1200 - 1350 Sq.Ft", price: "₹1.2 Cr - ₹1.35 Cr" }
        ],
        builder: "Venus Group",
        price: "₹85 Lac Onwards",
        bhk: "2 BHK",
        possession: "Ready to Move"
      }
    ]
  },
  'possession-within-1-year': {
    title: 'Possession within 1 Year',
    projects: [
      {
        id: 3,
        name: "Shilp Serenity",
        description: "3, 4 BHK House in Naranpura, Ahmedabad",
        developer: "Shilp Builders",
        status: "₹80 Lac Onwards",
        reraId: "GJ/SHILP/2024",
        heroImages: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593696140826-c58b02198d47?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop"
        ],
        floorPlans: [
          {
            type: "3 BHK House",
            image: "https://images.unsplash.com/photo-1611575339428-6972d2799a22?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 3, baths: 3, balconies: 1, parking: 2 },
            area: "1500 - 1650 Sq.Ft",
            price: "₹80 Lac - ₹90 Lac"
          },
          {
            type: "4 BHK House",
            image: "https://images.unsplash.com/photo-1542882284-8193c7449ce8?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 4, baths: 4, balconies: 2, parking: 2 },
            area: "2000 Sq.Ft",
            price: "₹1.1 Cr"
          }
        ],
        overview: {
          propertyType: "House",
          purchaseType: "Under Construction",
          totalArea: "Not Specified",
          possessionDate: "Possession in 1 year",
          projectStage: "Under Construction",
          totalUnits: "Not Specified",
          launchDate: "Not Specified"
        },
        towerDetails: [],
        keyFeatures: [
          "Zero Brokerage",
          "Independent House"
        ],
        amenities: [
          { name: "Public Transportation", icon: "bus" },
          { name: "Proximity to Airport", icon: "plane" },
          { name: "Visitor Parking", icon: "car" }
        ] as Amenity[],
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
        ],
        configurations: [
          { type: "3 BHK House", area: "1500 - 1650 Sq.Ft", price: "₹80 Lac - ₹90 Lac" },
          { type: "4 BHK House", area: "2000 Sq.Ft", price: "₹1.1 Cr" }
        ],
        builder: "Shilp Builders",
        price: "₹80 Lac Onwards",
        bhk: "3 BHK",
        possession: "Possession in 1 year"
      },
      {
        id: 5,
        name: "Radiant Heights",
        description: "3, 4 BHK Flat in Gota, Ahmedabad",
        developer: "Radiant Group",
        status: "₹75 Lac Onwards",
        reraId: "GJ/RAD/GOTA",
        heroImages: [
          "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593696140826-c58b02198d47?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
        ],
        floorPlans: [
          {
            type: "3 BHK Flat",
            image: "https://images.unsplash.com/photo-1611575339428-6972d2799a22?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 3, baths: 3, balconies: 1, parking: 2 },
            area: "1400 - 1600 Sq.Ft",
            price: "₹75 Lac - ₹85 Lac"
          },
          {
            type: "4 BHK Flat",
            image: "https://images.unsplash.com/photo-1542882284-8193c7449ce8?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 4, baths: 4, balconies: 2, parking: 2 },
            area: "1800 - 2000 Sq.Ft",
            price: "₹1.05 Cr - ₹1.15 Cr"
          }
        ],
        overview: {
          propertyType: "Flat",
          purchaseType: "Under Construction",
          totalArea: "Not Specified",
          possessionDate: "Possession in 1 year",
          projectStage: "Under Construction",
          totalUnits: "Not Specified",
          launchDate: "Not Specified"
        },
        towerDetails: [
          { tower: "A", bedroom: "3 BHK Flat", unitsOfFloor: 5, lift: 2, storey: "G+14" },
          { tower: "B", bedroom: "4 BHK Flat", unitsOfFloor: 5, lift: 2, storey: "G+14" }
        ],
        keyFeatures: [
          "Zero Brokerage",
          "Residential",
          "Best Offer Available"
        ],
        amenities: [
          { name: "Jogging Track", icon: "run" },
          { name: "Public Transportation", icon: "bus" },
          { name: "Proximity to Airport", icon: "plane" },
          { name: "Security", icon: "shield" }
        ] as Amenity[],
        image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=2670&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=2670&auto=format&fit=crop"
        ],
        configurations: [
          { type: "3 BHK Flat", area: "1400 - 1600 Sq.Ft", price: "₹75 Lac - ₹85 Lac" },
          { type: "4 BHK Flat", area: "1800 - 2000 Sq.Ft", price: "₹1.05 Cr - ₹1.15 Cr" }
        ],
        builder: "Radiant Group",
        price: "₹75 Lac Onwards",
        bhk: "3 BHK",
        possession: "Possession in 1 year"
      }
    ]
  },
  'possession-within-2-year': {
    title: 'Possession within 2 Years',
    projects: [
      {
        id: 4,
        name: "Luxury Heights",
        description: "4, 5 BHK Villa in SG Highway, Ahmedabad",
        developer: "Luxury Homes",
        status: "₹2.5 Cr Onwards",
        reraId: "GJ/LUX/2023",
        heroImages: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593696140826-c58b02198d47?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop"
        ],
        floorPlans: [
          {
            type: "4 BHK Villa",
            image: "https://images.unsplash.com/photo-1611575339428-6972d2799a22?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 4, baths: 4, balconies: 2, parking: 3 },
            area: "2800 - 3200 Sq.Ft",
            price: "₹2.5 Cr - ₹2.8 Cr"
          },
          {
            type: "5 BHK Villa",
            image: "https://images.unsplash.com/photo-1542882284-8193c7449ce8?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 5, baths: 5, balconies: 3, parking: 3 },
            area: "3500 Sq.Ft",
            price: "₹3.2 Cr"
          }
        ],
        overview: {
          propertyType: "Villa",
          purchaseType: "Under Construction",
          totalArea: "Not Specified",
          possessionDate: "Possession in 2 years",
          projectStage: "Under Construction",
          totalUnits: "Not Specified",
          launchDate: "Not Specified"
        },
        towerDetails: [],
        keyFeatures: [
          "Zero Brokerage",
          "Premium Villa",
          "Metro Connectivity"
        ],
        amenities: [
          { name: "Metro", icon: "subway" },
          { name: "Proximity to Airport", icon: "plane" },
          { name: "Swimming Pool", icon: "waves" },
          { name: "Security", icon: "shield" }
        ] as Amenity[],
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2670&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2670&auto=format&fit=crop"
        ],
        configurations: [
          { type: "4 BHK Villa", area: "2800 - 3200 Sq.Ft", price: "₹2.5 Cr - ₹2.8 Cr" },
          { type: "5 BHK Villa", area: "3500 Sq.Ft", price: "₹3.2 Cr" }
        ],
        builder: "Luxury Homes",
        price: "₹2.5 Cr Onwards",
        bhk: "4 BHK",
        possession: "Possession in 2 years"
      }
    ]
  },
  'possession-more-than-2-years': {
    title: 'Possession in More than 2 Years',
    projects: [
      {
        id: 1,
        name: "Aristo Anantam",
        description: "3, 4 BHK Flat in Chharodi, Ahmedabad",
        developer: "Aristo Lifespace",
        status: "₹1.16 Cr Onwards",
        reraId: "PG/GJ/AHMEDABAD",
        heroImages: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593696140826-c58b02198d47?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
        ],
        floorPlans: [
          {
            type: "3 BHK Flat",
            image: "https://images.unsplash.com/photo-1611575339428-6972d2799a22?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 3, baths: 3, balconies: 1, parking: 2 },
            area: "230 - 280 Sq-yrd",
            price: "₹1.16 Cr - ₹1.41 Cr"
          },
          {
            type: "4 BHK Flat",
            image: "https://images.unsplash.com/photo-1542882284-8193c7449ce8?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 4, baths: 4, balconies: 2, parking: 2 },
            area: "330 Sq-yrd",
            price: "₹1.67 Cr"
          }
        ],
        overview: {
          propertyType: "Flat",
          purchaseType: "New Booking",
          totalArea: "Not Specified",
          possessionDate: "May 2030",
          projectStage: "Under Construction",
          totalUnits: "Not Specified",
          launchDate: "Not Specified"
        },
        towerDetails: [
          { tower: "A", bedroom: "3 BHK Flat", unitsOfFloor: 4, lift: 2, storey: "G+15" },
          { tower: "B", bedroom: "4 BHK Flat", unitsOfFloor: 4, lift: 2, storey: "G+15" }
        ],
        keyFeatures: [
          "Zero Brokerage",
          "Residential with Retail",
          "Best Offer Available"
        ],
        amenities: [
          { name: "Jogging Track", icon: "run" },
          { name: "Public Transportation", icon: "bus" },
          { name: "Proximity to Airport", icon: "plane" },
          { name: "Swimming Pool", icon: "waves" }
        ] as Amenity[],
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop"
        ],
        configurations: [
          { type: "3 BHK Flat", area: "230 - 280 Sq-yrd", price: "₹1.16 Cr - ₹1.41 Cr" },
          { type: "4 BHK Flat", area: "330 Sq-yrd", price: "₹1.67 Cr" }
        ],
        builder: "Aristo Lifespace",
        price: "₹1.16 Cr Onwards",
        bhk: "3 BHK",
        possession: "May 2030"
      }
    ]
  },
  'new-launch-projects': {
    title: 'New Launch Projects',
    projects: []
  },
  'flat-in-ahmedabad': {
    title: 'Flats in Ahmedabad',
    projects: [
      {
        id: 1,
        name: "Aristo Anantam",
        description: "3, 4 BHK Flat in Chharodi, Ahmedabad",
        developer: "Aristo Lifespace",
        status: "₹1.16 Cr Onwards",
        reraId: "PG/GJ/AHMEDABAD",
        heroImages: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593696140826-c58b02198d47?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
        ],
        floorPlans: [
          {
            type: "3 BHK Flat",
            image: "https://images.unsplash.com/photo-1611575339428-6972d2799a22?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 3, baths: 3, balconies: 1, parking: 2 },
            area: "230 - 280 Sq-yrd",
            price: "₹1.16 Cr - ₹1.41 Cr"
          },
          {
            type: "4 BHK Flat",
            image: "https://images.unsplash.com/photo-1542882284-8193c7449ce8?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 4, baths: 4, balconies: 2, parking: 2 },
            area: "330 Sq-yrd",
            price: "₹1.67 Cr"
          }
        ],
        overview: {
          propertyType: "Flat",
          purchaseType: "New Booking",
          totalArea: "Not Specified",
          possessionDate: "May 2030",
          projectStage: "Under Construction",
          totalUnits: "Not Specified",
          launchDate: "Not Specified"
        },
        towerDetails: [
          { tower: "A", bedroom: "3 BHK Flat", unitsOfFloor: 4, lift: 2, storey: "G+15" },
          { tower: "B", bedroom: "4 BHK Flat", unitsOfFloor: 4, lift: 2, storey: "G+15" }
        ],
        keyFeatures: [
          "Zero Brokerage",
          "Residential with Retail",
          "Best Offer Available"
        ],
        amenities: [
          { name: "Jogging Track", icon: "run" },
          { name: "Public Transportation", icon: "bus" },
          { name: "Proximity to Airport", icon: "plane" },
          { name: "Swimming Pool", icon: "waves" }
        ] as Amenity[],
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop"
        ],
        configurations: [
          { type: "3 BHK Flat", area: "230 - 280 Sq-yrd", price: "₹1.16 Cr - ₹1.41 Cr" },
          { type: "4 BHK Flat", area: "330 Sq-yrd", price: "₹1.67 Cr" }
        ],
        builder: "Aristo Lifespace",
        price: "₹1.16 Cr Onwards",
        bhk: "3 BHK",
        possession: "May 2030"
      },
      {
        id: 2,
        name: "Venus Pashmina",
        description: "2, 3 BHK Flat in Ambli, Ahmedabad",
        developer: "Venus Group",
        status: "₹85 Lac Onwards",
        reraId: "GJ/REG/AHMEDA",
        heroImages: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593696140826-c58b02198d47?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
        ],
        floorPlans: [
          {
            type: "2 BHK Flat",
            image: "https://images.unsplash.com/photo-1611575339428-6972d2799a22?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 2, baths: 2, balconies: 1, parking: 1 },
            area: "850 - 950 Sq.Ft",
            price: "₹85 Lac - ₹95 Lac"
          },
          {
            type: "3 BHK Flat",
            image: "https://images.unsplash.com/photo-1542882284-8193c7449ce8?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 3, baths: 3, balconies: 1, parking: 2 },
            area: "1200 - 1350 Sq.Ft",
            price: "₹1.2 Cr - ₹1.35 Cr"
          }
        ],
        overview: {
          propertyType: "Flat",
          purchaseType: "Ready to Move",
          totalArea: "Not Specified",
          possessionDate: "Ready to Move",
          projectStage: "Completed",
          totalUnits: "Not Specified",
          launchDate: "Not Specified"
        },
        towerDetails: [
          { tower: "A", bedroom: "2 BHK Flat", unitsOfFloor: 6, lift: 3, storey: "G+12" },
          { tower: "B", bedroom: "3 BHK Flat", unitsOfFloor: 6, lift: 3, storey: "G+12" }
        ],
        keyFeatures: [
          "Zero Brokerage",
          "Residential",
          "Metro Connectivity"
        ],
        amenities: [
          { name: "Metro Line", icon: "subway" },
          { name: "Proximity to Airport", icon: "plane" },
          { name: "Garden", icon: "tree-pine" },
          { name: "Security", icon: "shield" }
        ] as Amenity[],
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop"
        ],
        configurations: [
          { type: "2 BHK Flat", area: "850 - 950 Sq.Ft", price: "₹85 Lac - ₹95 Lac" },
          { type: "3 BHK Flat", area: "1200 - 1350 Sq.Ft", price: "₹1.2 Cr - ₹1.35 Cr" }
        ],
        builder: "Venus Group",
        price: "₹85 Lac Onwards",
        bhk: "2 BHK",
        possession: "Ready to Move"
      },
      {
        id: 5,
        name: "Radiant Heights",
        description: "3, 4 BHK Flat in Gota, Ahmedabad",
        developer: "Radiant Group",
        status: "₹75 Lac Onwards",
        reraId: "GJ/RAD/GOTA",
        heroImages: [
          "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593696140826-c58b02198d47?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
        ],
        floorPlans: [
          {
            type: "3 BHK Flat",
            image: "https://images.unsplash.com/photo-1611575339428-6972d2799a22?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 3, baths: 3, balconies: 1, parking: 2 },
            area: "1400 - 1600 Sq.Ft",
            price: "₹75 Lac - ₹85 Lac"
          },
          {
            type: "4 BHK Flat",
            image: "https://images.unsplash.com/photo-1542882284-8193c7449ce8?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 4, baths: 4, balconies: 2, parking: 2 },
            area: "1800 - 2000 Sq.Ft",
            price: "₹1.05 Cr - ₹1.15 Cr"
          }
        ],
        overview: {
          propertyType: "Flat",
          purchaseType: "Under Construction",
          totalArea: "Not Specified",
          possessionDate: "Possession in 1 year",
          projectStage: "Under Construction",
          totalUnits: "Not Specified",
          launchDate: "Not Specified"
        },
        towerDetails: [
          { tower: "A", bedroom: "3 BHK Flat", unitsOfFloor: 5, lift: 2, storey: "G+14" },
          { tower: "B", bedroom: "4 BHK Flat", unitsOfFloor: 5, lift: 2, storey: "G+14" }
        ],
        keyFeatures: [
          "Zero Brokerage",
          "Residential",
          "Best Offer Available"
        ],
        amenities: [
          { name: "Jogging Track", icon: "run" },
          { name: "Public Transportation", icon: "bus" },
          { name: "Proximity to Airport", icon: "plane" },
          { name: "Security", icon: "shield" }
        ] as Amenity[],
        image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=2670&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=2670&auto=format&fit=crop"
        ],
        configurations: [
          { type: "3 BHK Flat", area: "1400 - 1600 Sq.Ft", price: "₹75 Lac - ₹85 Lac" },
          { type: "4 BHK Flat", area: "1800 - 2000 Sq.Ft", price: "₹1.05 Cr - ₹1.15 Cr" }
        ],
        builder: "Radiant Group",
        price: "₹75 Lac Onwards",
        bhk: "3 BHK",
        possession: "Possession in 1 year"
      }
    ]
  },
  'house-for-sale-in-ahmedabad': {
    title: 'Houses for Sale in Ahmedabad',
    projects: [
      {
        id: 3,
        name: "Shilp Serenity",
        description: "3, 4 BHK House in Naranpura, Ahmedabad",
        developer: "Shilp Builders",
        status: "₹80 Lac Onwards",
        reraId: "GJ/SHILP/2024",
        heroImages: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593696140826-c58b02198d47?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop"
        ],
        floorPlans: [
          {
            type: "3 BHK House",
            image: "https://images.unsplash.com/photo-1611575339428-6972d2799a22?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 3, baths: 3, balconies: 1, parking: 2 },
            area: "1500 - 1650 Sq.Ft",
            price: "₹80 Lac - ₹90 Lac"
          },
          {
            type: "4 BHK House",
            image: "https://images.unsplash.com/photo-1542882284-8193c7449ce8?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 4, baths: 4, balconies: 2, parking: 2 },
            area: "2000 Sq.Ft",
            price: "₹1.1 Cr"
          }
        ],
        overview: {
          propertyType: "House",
          purchaseType: "Under Construction",
          totalArea: "Not Specified",
          possessionDate: "Possession in 1 year",
          projectStage: "Under Construction",
          totalUnits: "Not Specified",
          launchDate: "Not Specified"
        },
        towerDetails: [],
        keyFeatures: [
          "Zero Brokerage",
          "Independent House"
        ],
        amenities: [
          { name: "Public Transportation", icon: "bus" },
          { name: "Proximity to Airport", icon: "plane" },
          { name: "Visitor Parking", icon: "car" }
        ] as Amenity[],
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
        ],
        configurations: [
          { type: "3 BHK House", area: "1500 - 1650 Sq.Ft", price: "₹80 Lac - ₹90 Lac" },
          { type: "4 BHK House", area: "2000 Sq.Ft", price: "₹1.1 Cr" }
        ],
        builder: "Shilp Builders",
        price: "₹80 Lac Onwards",
        bhk: "3 BHK",
        possession: "Possession in 1 year"
      }
    ]
  },
  'villa-in-ahmedabad': {
    title: 'Villas in Ahmedabad',
    projects: [
      {
        id: 4,
        name: "Luxury Heights",
        description: "4, 5 BHK Villa in SG Highway, Ahmedabad",
        developer: "Luxury Homes",
        status: "₹2.5 Cr Onwards",
        reraId: "GJ/LUX/2023",
        heroImages: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593696140826-c58b02198d47?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop"
        ],
        floorPlans: [
          {
            type: "4 BHK Villa",
            image: "https://images.unsplash.com/photo-1611575339428-6972d2799a22?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 4, baths: 4, balconies: 2, parking: 3 },
            area: "2800 - 3200 Sq.Ft",
            price: "₹2.5 Cr - ₹2.8 Cr"
          },
          {
            type: "5 BHK Villa",
            image: "https://images.unsplash.com/photo-1542882284-8193c7449ce8?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 5, baths: 5, balconies: 3, parking: 3 },
            area: "3500 Sq.Ft",
            price: "₹3.2 Cr"
          }
        ],
        overview: {
          propertyType: "Villa",
          purchaseType: "Under Construction",
          totalArea: "Not Specified",
          possessionDate: "Possession in 2 years",
          projectStage: "Under Construction",
          totalUnits: "Not Specified",
          launchDate: "Not Specified"
        },
        towerDetails: [],
        keyFeatures: [
          "Zero Brokerage",
          "Premium Villa",
          "Metro Connectivity"
        ],
        amenities: [
          { name: "Metro", icon: "subway" },
          { name: "Proximity to Airport", icon: "plane" },
          { name: "Swimming Pool", icon: "waves" },
          { name: "Security", icon: "shield" }
        ] as Amenity[],
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2670&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2670&auto=format&fit=crop"
        ],
        configurations: [
          { type: "4 BHK Villa", area: "2800 - 3200 Sq.Ft", price: "₹2.5 Cr - ₹2.8 Cr" },
          { type: "5 BHK Villa", area: "3500 Sq.Ft", price: "₹3.2 Cr" }
        ],
        builder: "Luxury Homes",
        price: "₹2.5 Cr Onwards",
        bhk: "4 BHK",
        possession: "Possession in 2 years"
      }
    ]
  },
  'weekend-home-in-ahmedabad': {
    title: 'Weekend Homes in Ahmedabad',
    projects: [
      {
        id: 3,
        name: "Shilp Serenity",
        description: "3, 4 BHK House in Naranpura, Ahmedabad",
        developer: "Shilp Builders",
        status: "₹80 Lac Onwards",
        reraId: "GJ/SHILP/2024",
        heroImages: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593696140826-c58b02198d47?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop"
        ],
        floorPlans: [
          {
            type: "3 BHK House",
            image: "https://images.unsplash.com/photo-1611575339428-6972d2799a22?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 3, baths: 3, balconies: 1, parking: 2 },
            area: "1500 - 1650 Sq.Ft",
            price: "₹80 Lac - ₹90 Lac"
          },
          {
            type: "4 BHK House",
            image: "https://images.unsplash.com/photo-1542882284-8193c7449ce8?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 4, baths: 4, balconies: 2, parking: 2 },
            area: "2000 Sq.Ft",
            price: "₹1.1 Cr"
          }
        ],
        overview: {
          propertyType: "House",
          purchaseType: "Under Construction",
          totalArea: "Not Specified",
          possessionDate: "Possession in 1 year",
          projectStage: "Under Construction",
          totalUnits: "Not Specified",
          launchDate: "Not Specified"
        },
        towerDetails: [],
        keyFeatures: [
          "Zero Brokerage",
          "Independent House"
        ],
        amenities: [
          { name: "Public Transportation", icon: "bus" },
          { name: "Proximity to Airport", icon: "plane" },
          { name: "Visitor Parking", icon: "car" }
        ] as Amenity[],
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
        ],
        configurations: [
          { type: "3 BHK House", area: "1500 - 1650 Sq.Ft", price: "₹80 Lac - ₹90 Lac" },
          { type: "4 BHK House", area: "2000 Sq.Ft", price: "₹1.1 Cr" }
        ],
        builder: "Shilp Builders",
        price: "₹80 Lac Onwards",
        bhk: "3 BHK",
        possession: "Possession in 1 year"
      }
    ]
  },
  'penthouse-for-sale-in-ahmedabad': {
    title: 'Penthouses for Sale in Ahmedabad',
    projects: []
  },
  'duplex-for-sale-in-ahmedabad': {
    title: 'Duplexes for Sale in Ahmedabad',
    projects: []
  },
  'under-50-lac': {
    title: 'Properties Under 50 Lac',
    projects: []
  },
  '50-lac-to-75-lac': {
    title: 'Properties Between 50 Lac to 75 Lac',
    projects: []
  },
  '75-lac-to-1.25-cr': {
    title: 'Properties Between 75 Lac to 1.25 Cr',
    projects: [
      {
        id: 2,
        name: "Venus Pashmina",
        description: "2, 3 BHK Flat in Ambli, Ahmedabad",
        developer: "Venus Group",
        status: "₹85 Lac Onwards",
        reraId: "GJ/REG/AHMEDA",
        heroImages: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593696140826-c58b02198d47?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
        ],
        floorPlans: [
          {
            type: "2 BHK Flat",
            image: "https://images.unsplash.com/photo-1611575339428-6972d2799a22?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 2, baths: 2, balconies: 1, parking: 1 },
            area: "850 - 950 Sq.Ft",
            price: "₹85 Lac - ₹95 Lac"
          },
          {
            type: "3 BHK Flat",
            image: "https://images.unsplash.com/photo-1542882284-8193c7449ce8?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 3, baths: 3, balconies: 1, parking: 2 },
            area: "1200 - 1350 Sq.Ft",
            price: "₹1.2 Cr - ₹1.35 Cr"
          }
        ],
        overview: {
          propertyType: "Flat",
          purchaseType: "Ready to Move",
          totalArea: "Not Specified",
          possessionDate: "Ready to Move",
          projectStage: "Completed",
          totalUnits: "Not Specified",
          launchDate: "Not Specified"
        },
        towerDetails: [
          { tower: "A", bedroom: "2 BHK Flat", unitsOfFloor: 6, lift: 3, storey: "G+12" },
          { tower: "B", bedroom: "3 BHK Flat", unitsOfFloor: 6, lift: 3, storey: "G+12" }
        ],
        keyFeatures: [
          "Zero Brokerage",
          "Residential",
          "Metro Connectivity"
        ],
        amenities: [
          { name: "Metro Line", icon: "subway" },
          { name: "Proximity to Airport", icon: "plane" },
          { name: "Garden", icon: "tree-pine" },
          { name: "Security", icon: "shield" }
        ] as Amenity[],
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop"
        ],
        configurations: [
          { type: "2 BHK Flat", area: "850 - 950 Sq.Ft", price: "₹85 Lac - ₹95 Lac" },
          { type: "3 BHK Flat", area: "1200 - 1350 Sq.Ft", price: "₹1.2 Cr - ₹1.35 Cr" }
        ],
        builder: "Venus Group",
        price: "₹85 Lac Onwards",
        bhk: "2 BHK",
        possession: "Ready to Move"
      },
      {
        id: 3,
        name: "Shilp Serenity",
        description: "3, 4 BHK House in Naranpura, Ahmedabad",
        developer: "Shilp Builders",
        status: "₹80 Lac Onwards",
        reraId: "GJ/SHILP/2024",
        heroImages: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593696140826-c58b02198d47?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop"
        ],
        floorPlans: [
          {
            type: "3 BHK House",
            image: "https://images.unsplash.com/photo-1611575339428-6972d2799a22?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 3, baths: 3, balconies: 1, parking: 2 },
            area: "1500 - 1650 Sq.Ft",
            price: "₹80 Lac - ₹90 Lac"
          },
          {
            type: "4 BHK House",
            image: "https://images.unsplash.com/photo-1542882284-8193c7449ce8?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 4, baths: 4, balconies: 2, parking: 2 },
            area: "2000 Sq.Ft",
            price: "₹1.1 Cr"
          }
        ],
        overview: {
          propertyType: "House",
          purchaseType: "Under Construction",
          totalArea: "Not Specified",
          possessionDate: "Possession in 1 year",
          projectStage: "Under Construction",
          totalUnits: "Not Specified",
          launchDate: "Not Specified"
        },
        towerDetails: [],
        keyFeatures: [
          "Zero Brokerage",
          "Independent House"
        ],
        amenities: [
          { name: "Public Transportation", icon: "bus" },
          { name: "Proximity to Airport", icon: "plane" },
          { name: "Visitor Parking", icon: "car" }
        ] as Amenity[],
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
        ],
        configurations: [
          { type: "3 BHK House", area: "1500 - 1650 Sq.Ft", price: "₹80 Lac - ₹90 Lac" },
          { type: "4 BHK House", area: "2000 Sq.Ft", price: "₹1.1 Cr" }
        ],
        builder: "Shilp Builders",
        price: "₹80 Lac Onwards",
        bhk: "3 BHK",
        possession: "Possession in 1 year"
      },
      {
        id: 5,
        name: "Radiant Heights",
        description: "3, 4 BHK Flat in Gota, Ahmedabad",
        developer: "Radiant Group",
        status: "₹75 Lac Onwards",
        reraId: "GJ/RAD/GOTA",
        heroImages: [
          "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593696140826-c58b02198d47?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
        ],
        floorPlans: [
          {
            type: "3 BHK Flat",
            image: "https://images.unsplash.com/photo-1611575339428-6972d2799a22?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 3, baths: 3, balconies: 1, parking: 2 },
            area: "1400 - 1600 Sq.Ft",
            price: "₹75 Lac - ₹85 Lac"          },
          {
            type: "4 BHK Flat",
            image: "https://images.unsplash.com/photo-1542882284-8193c7449ce8?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 4, baths: 4, balconies: 2, parking: 2 },
            area: "1800 - 2000 Sq.Ft",
            price: "₹1.05 Cr - ₹1.15 Cr"
          }
        ],
        overview: {
          propertyType: "Flat",
          purchaseType: "Under Construction",
          totalArea: "Not Specified",
          possessionDate: "Possession in 1 year",
          projectStage: "Under Construction",
          totalUnits: "Not Specified",
          launchDate: "Not Specified"
        },
        towerDetails: [
          { tower: "A", bedroom: "3 BHK Flat", unitsOfFloor: 5, lift: 2, storey: "G+14" },
          { tower: "B", bedroom: "4 BHK Flat", unitsOfFloor: 5, lift: 2, storey: "G+14" }
        ],
        keyFeatures: [
          "Zero Brokerage",
          "Residential",
          "Best Offer Available"
        ],
        amenities: [
          { name: "Jogging Track", icon: "run" },
          { name: "Public Transportation", icon: "bus" },
          { name: "Proximity to Airport", icon: "plane" },
          { name: "Security", icon: "shield" }
        ] as Amenity[],
        image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=2670&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=2670&auto=format&fit=crop"
        ],
        configurations: [
          { type: "3 BHK Flat", area: "1400 - 1600 Sq.Ft", price: "₹75 Lac - ₹85 Lac" },
          { type: "4 BHK Flat", area: "1800 - 2000 Sq.Ft", price: "₹1.05 Cr - ₹1.15 Cr" }
        ],
        builder: "Radiant Group",
        price: "₹75 Lac Onwards",
        bhk: "3 BHK",
        possession: "Possession in 1 year"
      }
    ]
  },
  '1.25-cr-to-2-cr': {
    title: 'Properties Between 1.25 Cr to 2 Cr',
    projects: [
      {
        id: 1,
        name: "Aristo Anantam",
        description: "3, 4 BHK Flat in Chharodi, Ahmedabad",
        developer: "Aristo Lifespace",
        status: "₹1.16 Cr Onwards",
        reraId: "PG/GJ/AHMEDABAD",
        heroImages: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593696140826-c58b02198d47?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
        ],
        floorPlans: [
          {
            type: "3 BHK Flat",
            image: "https://images.unsplash.com/photo-1611575339428-6972d2799a22?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 3, baths: 3, balconies: 1, parking: 2 },
            area: "230 - 280 Sq-yrd",
            price: "₹1.16 Cr - ₹1.41 Cr"
          },
          {
            type: "4 BHK Flat",
            image: "https://images.unsplash.com/photo-1542882284-8193c7449ce8?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 4, baths: 4, balconies: 2, parking: 2 },
            area: "330 Sq-yrd",
            price: "₹1.67 Cr"
          }
        ],
        overview: {
          propertyType: "Flat",
          purchaseType: "New Booking",
          totalArea: "Not Specified",
          possessionDate: "May 2030",
          projectStage: "Under Construction",
          totalUnits: "Not Specified",
          launchDate: "Not Specified"
        },
        towerDetails: [
          { tower: "A", bedroom: "3 BHK Flat", unitsOfFloor: 4, lift: 2, storey: "G+15" },
          { tower: "B", bedroom: "4 BHK Flat", unitsOfFloor: 4, lift: 2, storey: "G+15" }
        ],
        keyFeatures: [
          "Zero Brokerage",
          "Residential with Retail",
          "Best Offer Available"
        ],
        amenities: [
          { name: "Jogging Track", icon: "run" },
          { name: "Public Transportation", icon: "bus" },
          { name: "Proximity to Airport", icon: "plane" },
          { name: "Swimming Pool", icon: "waves" }
        ] as Amenity[],
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop"
        ],
        configurations: [
          { type: "3 BHK Flat", area: "230 - 280 Sq-yrd", price: "₹1.16 Cr - ₹1.41 Cr" },
          { type: "4 BHK Flat", area: "330 Sq-yrd", price: "₹1.67 Cr" }
        ],
        builder: "Aristo Lifespace",
        price: "₹1.16 Cr Onwards",
        bhk: "3 BHK",
        possession: "May 2030"
      }
    ]
  },
  '2-cr-to-3-cr': {
    title: 'Properties Between 2 Cr to 3 Cr',
    projects: [
      {
        id: 4,
        name: "Luxury Heights",
        description: "4, 5 BHK Villa in SG Highway, Ahmedabad",
        developer: "Luxury Homes",
        status: "₹2.5 Cr Onwards",
        reraId: "GJ/LUX/2023",
        heroImages: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593696140826-c58b02198d47?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop"
        ],
        floorPlans: [
          {
            type: "4 BHK Villa",
            image: "https://images.unsplash.com/photo-1611575339428-6972d2799a22?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 4, baths: 4, balconies: 2, parking: 3 },
            area: "2800 - 3200 Sq.Ft",
            price: "₹2.5 Cr - ₹2.8 Cr"
          },
          {
            type: "5 BHK Villa",
            image: "https://images.unsplash.com/photo-1542882284-8193c7449ce8?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 5, baths: 5, balconies: 3, parking: 3 },
            area: "3500 Sq.Ft",
            price: "₹3.2 Cr"
          }
        ],
        overview: {
          propertyType: "Villa",
          purchaseType: "Under Construction",
          totalArea: "Not Specified",
          possessionDate: "Possession in 2 years",
          projectStage: "Under Construction",
          totalUnits: "Not Specified",
          launchDate: "Not Specified"
        },
        towerDetails: [],
        keyFeatures: [
          "Zero Brokerage",
          "Premium Villa",
          "Metro Connectivity"
        ],
        amenities: [
          { name: "Metro", icon: "subway" },
          { name: "Proximity to Airport", icon: "plane" },
          { name: "Swimming Pool", icon: "waves" },
          { name: "Security", icon: "shield" }
        ] as Amenity[],
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2670&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2670&auto=format&fit=crop"
        ],
        configurations: [
          { type: "4 BHK Villa", area: "2800 - 3200 Sq.Ft", price: "₹2.5 Cr - ₹2.8 Cr" },
          { type: "5 BHK Villa", area: "3500 Sq.Ft", price: "₹3.2 Cr" }
        ],
        builder: "Luxury Homes",
        price: "₹2.5 Cr Onwards",
        bhk: "4 BHK",
        possession: "Possession in 2 years"
      }
    ]
  },
  'above-3-cr': {
    title: 'Properties Above 3 Cr',
    projects: [
      {
        id: 4,
        name: "Luxury Heights",
        description: "4, 5 BHK Villa in SG Highway, Ahmedabad",
        developer: "Luxury Homes",
        status: "₹2.5 Cr Onwards",
        reraId: "GJ/LUX/2023",
        heroImages: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593696140826-c58b02198d47?q=80&w=2670&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop"
        ],
        floorPlans: [
          {
            type: "4 BHK Villa",
            image: "https://images.unsplash.com/photo-1611575339428-6972d2799a22?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 4, baths: 4, balconies: 2, parking: 3 },
            area: "2800 - 3200 Sq.Ft",
            price: "₹2.5 Cr - ₹2.8 Cr"
          },
          {
            type: "5 BHK Villa",
            image: "https://images.unsplash.com/photo-1542882284-8193c7449ce8?q=80&w=2670&auto=format&fit=crop",
            details: { beds: 5, baths: 5, balconies: 3, parking: 3 },
            area: "3500 Sq.Ft",
            price: "₹3.2 Cr"
          }
        ],
        overview: {
          propertyType: "Villa",
          purchaseType: "Under Construction",
          totalArea: "Not Specified",
          possessionDate: "Possession in 2 years",
          projectStage: "Under Construction",
          totalUnits: "Not Specified",
          launchDate: "Not Specified"
        },
        towerDetails: [],
        keyFeatures: [
          "Zero Brokerage",
          "Premium Villa",
          "Metro Connectivity"
        ],
        amenities: [
          { name: "Metro", icon: "subway" },
          { name: "Proximity to Airport", icon: "plane" },
          { name: "Swimming Pool", icon: "waves" },
          { name: "Security", icon: "shield" }
        ] as Amenity[],
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2670&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2670&auto=format&fit=crop"
        ],
        configurations: [
          { type: "4 BHK Villa", area: "2800 - 3200 Sq.Ft", price: "₹2.5 Cr - ₹2.8 Cr" },
          { type: "5 BHK Villa", area: "3500 Sq.Ft", price: "₹3.2 Cr" }
        ],
        builder: "Luxury Homes",
        price: "₹2.5 Cr Onwards",
        bhk: "4 BHK",
        possession: "Possession in 2 years"
      }
    ]
  }
};

export default projectData;
