
export type Amenity = {
  name: string;
  icon: string;
};

// Main data structure for all projects
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
            image: "https://images.unsplash.com/photo-1610013583342-30126b963332?q=80&w=2670&auto=format&fit=crop",
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
          totalUnits: "150",
          launchDate: "Jan 2024"
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
          { name: "Transportation", icon: "bus" },
          { name: "Airport", icon: "plane" },
          { name: "Swimming Pool", icon: "waves" }
        ] as Amenity[],
        // NEW SECTIONS ADDED HERE
        locationData: {
          coordinates: "23°01'47.6\"N 72°29'10.0\"E",
          address: "2FHP+XC5 Ahmedabad, Gujarat",
          googleMapsUrl: "https://maps.app.goo.gl/K8zM5QzD7J9R8P6aA",
          mapImage: "/location_image.jpg"
        },
        nearby: [
            { category: "Transportation", name: "Public Transportation", distance: "0.5 km", icon: "bus" },
            { category: "Hospital", name: "Saraswati Hospital", distance: "1.5 km", icon: "hospital" },
            { category: "Hospital", name: "Shalby Hospital", distance: "2 km", icon: "hospital" },
            { category: "Shopping", name: "Mall/Market", distance: "1.3 km", icon: "shopping" },
            { category: "Hospital", name: "EPIC Hospital", distance: "2 km", icon: "hospital" },
            { category: "School", name: "Zebra School", distance: "2.8 km", icon: "school" }
        ],
        similarProjects: [
            {
                name: "Oeuvre 3",
                developer: "by Madhav Associate",
                location: "Ambli, Ahmedabad",
                price: "Price on Request",
                configuration: "4 BHK, 5 BHK",
                area: "4651 - 5887 Sq-yrd",
                possession: "December 2027",
                image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2574&auto=format&fit=crop"
            },
            {
                name: "Tranquil",
                developer: "by Maruti Inspiring Realty",
                location: "Ambli, Ahmedabad",
                price: "Price On Request",
                configuration: "4 BHK",
                area: "4535 - 5000 Sq-ft",
                possession: "September 2024",
                image: "https://images.unsplash.com/photo-1605276374104-5de67d608240?q=80&w=2670&auto=format&fit=crop"
            },
            {
                name: "Palak Elina",
                developer: "by Palak Group",
                location: "Ambli, Ahmedabad",
                price: "₹4.68 Cr - ₹4.91 Cr",
                configuration: "5 BHK",
                area: "6000 - 6300 Sq-ft",
                possession: "June 2019",
                image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2670&auto=format&fit=crop"
            }
        ],
        // --- Legacy fields (can be removed if not used elsewhere)
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop",
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
            image: "/C-Duplex_upper-1536x619.jpg",
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
            image: "/C-Duplex_upper-1536x619.jpg",
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
            image: "/C-Duplex_upper-1536x619.jpg",
            details: { beds: 4, baths: 4, balconies: 2, parking: 3 },
            area: "2800 - 3200 Sq.Ft",
            price: "₹2.5 Cr - ₹2.8 Cr"
          },
          {
            type: "5 BHK Villa",
            image: "/C-Duplex_lower2-1536x619.jpg",
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
            image: "/C-Duplex_upper-1536x619.jpg",
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
            image: "/C-Duplex_upper-1536x619.jpg",
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
            image: "/C-Duplex_upper-1536x619.jpg",
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
            image: "/C-Duplex_upper-1536x619.jpg",
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
            image: "/C-Duplex_upper-1536x619.jpg",
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
            image: "/C-Duplex_upper-1536x619.jpg",
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
            image: "/C-Duplex_upper-1536x619.jpg",
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
            image: "/C-Duplex_upper-1536x619.jpg",
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
            image: "/C-Duplex_upper-1536x619.jpg",
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
            image: "/C-Duplex_upper-1536x619.jpg",
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
            image: "/C-Duplex_upper-1536x619.jpg",
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
            image: "/C-Duplex_upper-1536x619.jpg",
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
            image: "/C-Duplex_upper-1536x619.jpg",
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
            image: "/C-Duplex_upper-1536x619.jpg",
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
            image: "/C-Duplex_upper-1536x619.jpg",
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
            image: "/C-Duplex_upper-1536x619.jpg",
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
            image: "/C-Duplex_upper-1536x619.jpg",
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
            image: "/C-Duplex_upper-1536x619.jpg",
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
