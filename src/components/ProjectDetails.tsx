// src/components/ProjectDetails.tsx
// UPDATED
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import {
  CheckCircle, ChevronLeft, ChevronRight, BedDouble, Bath, ParkingCircle, Car,
  Home, Building, Calendar, Check, Box, List, Play, Utensils, Film, Compass, Droplet,
  Waves, Trash, Truck, Shield, TreePine, CloudRain, User, MapPin, Phone, Download,
  Heart, Share, Eye, Star, Bus, Hospital, School, ShoppingCart, Expand,
  Train, Plane,
  TrainFront,
  TramFront,
  X
} from 'lucide-react';;
// 検 1. IMPORT YOUR NEW MODAL COMPONENT (FIXED PATH)
import LeadFormModal from '../pages/admin/LeadFormModal'; // 🌟 FIXED IMPORT PATH

// ... (Helper components AmenityIcon, NearbyIcon, getYouTubeEmbedUrl remain unchanged) ...
const AmenityIcon = ({ name, ...props }: { name: string, [key: string]: any }) => {
  const iconMap: { [key: string]: any } = {
    'route': Play, 'leaf': TreePine, 'film': Film, 'compass': Compass, 'droplet': Droplet,
    'car': Car, 'waves': Waves, 'trash-2': Trash, 'move-vertical': Truck, 'shield': Shield,
    'parking-circle': ParkingCircle, 'fence': Home, 'zap': CloudRain, 'flame': Film,
    'dumbbell': Box, 'gamepad-2': Box, 'video': Film, 'baby': User, 'book': Box,
    'grid-3x3': Box, 'armchair': Box, 'home': Home, 'phone': Phone, 'users': User,
    'cloud-rain': CloudRain, 'shirt': Box,
  };
  const IconComponent = iconMap[name.toLowerCase()] || Box;
  return <IconComponent {...props} />;
};

const NearbyIcon = ({ name, ...props }: { name: string, [key: string]: any }) => {
  switch (name.toLowerCase()) {
    case 'bus': return <Bus {...props} />;
    case 'hospital': return <Hospital {...props} />;
    case 'school': return <School {...props} />;
    case 'shopping': return <ShoppingCart {...props} />;
    case 'railway': return <Train {...props} />;
    case 'airport': return <Plane {...props} />;
    case 'metro': return <TramFront {...props} />;
    default: return <MapPin {...props} />;
  }
};
const getYouTubeEmbedUrl = (url: string) => {
  if (!url) return '';
  let videoId = '';
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      videoId = urlObj.pathname.slice(1);
    } else if (urlObj.hostname.includes('youtube.com')) {
      videoId = urlObj.searchParams.get('v') || '';
    }
  } catch (e) {
    console.error('Invalid URL for video', e);
    return '';
  }
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return '';
};
// In src/components/ProjectDetails.tsx, replace the entire `ProjectDetails` component with this:

const ProjectDetails = () => {
  const { state, city, area, name } = useParams<{ state: string; city: string; area: string; name: string }>();

  // ... (refs, project state, loading state, map refs, etc. remain the same) ...
  const overviewRef = useRef<HTMLDivElement>(null);
  const floorplanRef = useRef<HTMLDivElement>(null);
  const projectLocationRef = useRef<HTMLDivElement>(null);
  const nearbyRef = useRef<HTMLDivElement>(null);
  const similarPropertiesRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const [selectedImage, setSelectedImage] = useState('');
  const [activeTab, setActiveTab] = useState('Floor Plan');

  const [activeFloorPlanTab, setActiveFloorPlanTab] = useState('');

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  
  // --- 🌟 CONTACT FORM STATES (MODIFIED) ---
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '' });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactFormStep, setContactFormStep] = useState<'details' | 'otp' | 'success'>('details');
  const [otpContact, setOtpContact] = useState('');
  const [sendingOtpContact, setSendingOtpContact] = useState(false);
  const [verifyingOtpContact, setVerifyingOtpContact] = useState(false);
  const [resendTimerContact, setResendTimerContact] = useState(0);
  const [contactError, setContactError] = useState<string | null>(null);
  const [contactConsent, setContactConsent] = useState(true); // Added consent state
  // --- 🌟 END CONTACT FORM STATES ---

  // 検 3. NEW STATE FOR FLOOR PLAN LOGIC
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<any | null>(null);
  const [isUserVerified, setIsUserVerified] = useState(false); // 👈 ADD THIS LINE
  const [floorPlanToView, setFloorPlanToView] = useState<string | null>(null);

  // 🌟 ADD A REF FOR THE DOWNLOAD LINK
  const brochureDownloadLinkRef = useRef<HTMLAnchorElement>(null);

  // 🌟 ADD STATE TO TRACK THE PENDING ACTION
  const [pendingAction, setPendingAction] = useState<'viewFloorPlan' | 'downloadBrochure' | null>(null);

  // ... (useEffect for fetchProject, check isUserVerified, floorPlanGroups, map, and image handlers remain the same) ...
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const slug = `${state}/${city}/${area}/${name}`;
        const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/slug/${slug}`);
        const data = await response.json();

        if (data.success) {
          setProject(data.data);
          if (data.data.heroImages?.length) {
            setSelectedImage(data.data.heroImages[0]);
          }
        } else {
          setError(data.error || 'Project not found');
        }
      } catch (err) {
        setError('Failed to load project');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (state && city && area && name) {
      fetchProject();
    }
  }, [state, city, area, name]);

  // 🌟 NEW: Check if user is verified AND if the timestamp is expired
  useEffect(() => {
    const timestampString = localStorage.getItem('leadSubmitTimestamp');
    
    if (!timestampString) {
      // No timestamp, so user is not verified
      return;
    }

    const submitTime = parseInt(timestampString, 10);
    const now = new Date().getTime();
    const EXPIRY_DURATION = 24 * 60 * 60 * 1000; 
    if ((now - submitTime) < EXPIRY_DURATION) {
      setIsUserVerified(true);
    } else {
      // It IS expired, so remove the old key so we don't check it again
      localStorage.removeItem('leadSubmitTimestamp');
      setIsUserVerified(false); // Make sure they are not verified
    }
  }, []); 
  
  const floorPlanGroups = useMemo(() => {
    if (!project?.floorPlans) return {};
    return project.floorPlans.reduce((acc, plan) => {
      const type = plan.type || 'Other';
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(plan);
      return acc;
    }, {});
  }, [project?.floorPlans]);

  const floorPlanTabs = Object.keys(floorPlanGroups);

  useEffect(() => {
    if (floorPlanTabs.length > 0 && !activeFloorPlanTab) {
      setActiveFloorPlanTab(floorPlanTabs[0]);
    }
  }, [floorPlanTabs, activeFloorPlanTab]);

  // ... (All map useEffects remain the same) ...
  useEffect(() => {
    (window as any).initMap = () => {
      setIsMapReady(true);
    };
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/somanchiu/Keyless-Google-Maps-API@v7.1/mapsJavaScriptAPI.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    return () => {
      const existingScript = document.querySelector('script[src*="mapsJavaScriptAPI"]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  useEffect(() => {
    if (!isMapReady || !project?.locationData?.coordinates || !mapContainerRef.current || !(window as any).google) return;
    const coords = project.locationData.coordinates.split(',');
    const position = {
      lat: parseFloat(coords[0].trim()),
      lng: parseFloat(coords[1].trim())
    };
    const map = new (window as any).google.maps.Map(mapContainerRef.current, {
      center: position,
      zoom: 15,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true,
      gestureHandling: 'greedy',
    });
    mapRef.current = map;
    const pinSVG = `
    <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0C11.716 0 5 6.716 5 15c0 8.284 15 35 15 35s15-26.716 15-35c0-8.284-6.716-15-15-15z" 
            fill="#4299E1" 
            stroke="#2C5282" 
            stroke-width="2"/>
      <circle cx="20" cy="15" r="8" fill="white"/>
      <text x="20" y="20" font-size="16" font-weight="bold" fill="#4299E1" text-anchor="middle">🏠</text>
    </svg>
  `;
    markerRef.current = new (window as any).google.maps.Marker({
      position: position,
      map: map,
      title: project.name,
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(pinSVG),
        scaledSize: new (window as any).google.maps.Size(40, 50),
        anchor: new (window as any).google.maps.Point(20, 50),
      },
      animation: (window as any).google.maps.Animation.DROP,
    });
    const infoWindow = new (window as any).google.maps.InfoWindow({
      content: `
      <div style="padding: 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;">
        <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1f2937;">${project.name}</h3>
        <p style="margin: 0 0 8px 0; font-size: 13px; color: #6b7280;">${project.locationData.address}</p>
        <p style="margin: 0; font-size: 12px; color: #9ca3af;">${project.locationData.coordinates}</p>
      </div>
    `
    });
    markerRef.current.addListener('click', () => {
      infoWindow.open(map, markerRef.current);
    });
    setTimeout(() => {
      infoWindow.open(map, markerRef.current);
    }, 500);
  }, [isMapReady, project]);

  const handlePrevImage = () => {
    if (!project || !project.heroImages) return;
    const currentIndex = project.heroImages.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + project.heroImages.length) % project.heroImages.length;
    setSelectedImage(project.heroImages[prevIndex]);
  };

  const handleNextImage = () => {
    if (!project || !project.heroImages) return;
    const currentIndex = project.heroImages.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % project.heroImages.length;
    setSelectedImage(project.heroImages[nextIndex]);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'Overview' && overviewRef.current) {
      overviewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tab === 'Floor Plan' && floorplanRef.current) {
      floorplanRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tab === 'Video' && videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tab === 'Project Location' && projectLocationRef.current) {
      projectLocationRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tab === "What's Nearby?" && nearbyRef.current) {
      nearbyRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tab === 'Similar Properties' && similarPropertiesRef.current) {
      similarPropertiesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

// 🌟 MODIFIED: Send OTP and move to next step
const handleSendOTPContact = async (e?: React.FormEvent) => {
  if (e) e.preventDefault();

  if (!contactForm.phone || contactForm.phone.length < 10 || !contactForm.name || !contactForm.email) {
    setContactError('Please fill in all fields.');
    return;
  }
   if (!contactConsent) {
      setContactError('Please agree to be contacted.');
      return;
    }

  setSendingOtpContact(true);
  setContactError(null);

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/otp/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: contactForm.phone }),
    });

    const data = await response.json();

    if (data.success) {
      setContactFormStep('otp'); // 👈 Move to OTP step
      setResendTimerContact(60);
      
      const interval = setInterval(() => {
        setResendTimerContact((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      setContactError(null);
    } else {
      setContactError(data.error || 'Failed to send OTP');
    }
  } catch (err) {
    console.error('Error sending OTP:', err);
    setContactError('Failed to send OTP. Please try again.');
  } finally {
    setSendingOtpContact(false);
  }
};

// 🌟 MODIFIED: Verify OTP and then submit lead
 const handleContactSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!otpContact || otpContact.length !== 6) {
    setContactError('Please enter a valid 6-digit OTP');
    return;
  }

  if (!project?._id) {
    setContactError('Project ID not found. Cannot submit lead.');
    return;
  }

  setVerifyingOtpContact(true);
  setIsSubmittingContact(true);
  setContactError(null);

  try {
    // 1. Verify OTP
    const verifyResponse = await fetch(`${import.meta.env.VITE_API_URL}/otp/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: contactForm.phone, code: otpContact }),
    });

    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      setContactError(verifyData.error || 'Invalid OTP. Please try again.');
      setVerifyingOtpContact(false);
      setIsSubmittingContact(false);
      return;
    }

    // 2. OTP is valid, submit lead
    const res = await fetch(`${import.meta.env.VITE_API_URL}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...contactForm,
        projectId: project._id,
        source: 'Project Details Contact Form',
      }),
    });

    const data = await res.json();
    if (data.success) {
      setContactFormStep('success'); // 👈 Move to success step
      // Reset form after a delay
      setTimeout(() => {
        setContactFormStep('details');
        setContactForm({ name: '', email: '', phone: '' });
        setOtpContact('');
        setContactConsent(true); // Reset consent
      }, 3000);
      
    } else {
      setContactError('Submission failed: ' + (data.error || 'Please try again.'));
    }
  } catch (err) {
    console.error('Error submitting lead:', err);
    setContactError('An error occurred. Please try again.');
  } finally {
    setVerifyingOtpContact(false);
    setIsSubmittingContact(false);
  }
};

  // 🌟 ADD HELPER FUNCTION TO TRIGGER DOWNLOAD
  const triggerBrochureDownload = () => {
    if (brochureDownloadLinkRef.current && project.brochureUrl) {
      brochureDownloadLinkRef.current.href = project.brochureUrl;
      // Create a clean filename like "Project-Name-Brochure.pdf"
      const fileName = `${project.name.replace(/\s+/g, '-')}-Brochure.pdf`;
      brochureDownloadLinkRef.current.download = fileName;
      brochureDownloadLinkRef.current.click();
    }
  };

  // 🌟 ADD CLICK HANDLER FOR THE BROCHURE BUTTON
  const handleBrochureDownloadClick = () => {
    // Check if brochure exists
    if (!project.brochureUrl) {
      alert('Brochure is not available for this project.');
      return;
    }
    
    // If user is already verified, trigger download immediately
    if (isUserVerified) {
      triggerBrochureDownload(); 
    } else {
      // Otherwise, set the pending action and open the modal
      setPendingAction('downloadBrochure');
      setIsLeadModalOpen(true);
    }
  };


  // ... (loading and error states remain the same) ...
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-32 pb-8 container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-32 pb-8 container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Project Not Found</h1>
          <p className="text-gray-600 mt-2">{error || 'The project you are looking for does not exist.'}</p>
          <Link to="/" className="text-[#4299E1] hover:underline mt-4 inline-block">Back to Home</Link>
        </main>
      </div>
    );
  }

  // ✅ --- FIX 1: DEFINE propertyType ---
  // Get the property type (e.g., "Flat", "Villa")
  const propertyType = project.overview?.propertyType || 
                     project.configurations?.[0]?.type?.split(' ').pop() || 
                     'Property';

  const tabs = ['Floor Plan', 'Overview', 'Video', 'Project Location', "What's Nearby?", 'Similar Properties'];

  const renderAboutText = (text: string) => {
    if (!text) return null;
    return text.split('\n').filter(p => p.trim().length > 0).map((paragraph, index) => (
      <p key={index}>
        {paragraph}
      </p>
    ));
  };

  const fallbackAbout = (
    <>
      <p>
        {project.name} by {project.developer} Ultra Luxurious apartment residential project in Vaishnodevi, Ahmedabad in offering spacious 4 BHK Flat and Penthouse with sizes ranging from 3015 Sq-ft to 5058 Sq-ft. Designed for modern elite living, these premium residences combine world-class design, privacy and comfort.
      </p>
      <p>
        Strategically located in Vaishnodevi, one of Ahmedabad's most prestigious neighborhoods, the project provides excellent connectivity to major city hubs. Key landmarks include SGVP International School, SGVP Hospital, KD Hospital, Ashirvad Hospital, Nirma university, Mall/Market, Puna International School, Public Transportation, Airport and Railway Station.
      </p>
    </>
  );

  const getConfigurationsString = (configs: any[] | undefined) => {
    if (!configs || configs.length === 0) return 'N/A';
    return configs.map(c => c.type).join(', ');
  };

  const getAreaString = (project: any) => {
    if (project.overview?.totalArea) return project.overview.totalArea;
    if (!project.floorPlans || project.floorPlans.length === 0) return 'N/A';
    const areas = project.floorPlans.map(fp => parseInt(fp.area.split(' ')[0], 10)).filter(Boolean);
    if (areas.length === 0) return 'N/A';
    const min = Math.min(...areas);
    const max = Math.max(...areas);
    return `${min} - ${max} Sq-ft`;
  };


  

  return (
    <>
      {/* 🌟 ADD THE HIDDEN DOWNLOAD LINK */}
      <a ref={brochureDownloadLinkRef} style={{ display: 'none' }} />

      <style>{`
                    .tab-button.active {
                        color: #4299E1;
                        border-bottom: 2px solid #4299E1;
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in {
                        animation: fadeIn 0.5s ease-in-out;
                    }
                        .hide-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;  /* Chrome, Safari, and Opera */
                }
                `}</style>

      <div className="min-h-screen bg-white text-gray-900">
        <Navbar />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 lg:px-8">
            
            {/* ✅ --- FIX 2: UPDATED BREADCRUMBS --- */}
            <div className="flex items-center text-sm text-gray-500 mb-6 flex-wrap">
              <Link to="/" className="hover:text-[#4299E1] transition-colors">Home</Link>
              <ChevronRight className="mx-2 h-4 w-4 flex-shrink-0" />
              
              <Link to="/properties" className="hover:text-[#4299E1] transition-colors">Properties</Link>
              <ChevronRight className="mx-2 h-4 w-4 flex-shrink-0" />
              
              {/* NEW BREADCRUMB ITEM: Property Type in City */}
              {project.city && (
                <>
                  <span className="text-gray-600">
                    {propertyType} in {project.city}
                  </span>
                  <ChevronRight className="mx-2 h-4 w-4 flex-shrink-0" />
                </>
              )}

              {/* NEW BREADCRUMB ITEM: Property Type in Area */}
              {project.area && (
                <>
                  <span className="text-gray-600">
                    {propertyType} in {project.area}
                  </span>
                  <ChevronRight className="mx-2 h-4 w-4 flex-shrink-0" />
                </>
              )}
              
              <span className="text-gray-700 font-medium">{project.name}</span>
            </div>
            {/* --- END OF BREADCRUMB FIX --- */}


            {/* ... (Image Gallery, Main Project Info, RERA ID, and Tab Navigation sections remain exactly the same) ... */}

            {/* Image Gallery */}
            <div className="mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div className="lg:col-span-2 relative h-[500px] group rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={selectedImage}
                    alt="Main project view"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                  >
                    <ChevronRight size={20} />
                  </button>

                  <button
                    onClick={() => setIsGalleryOpen(true)}
                    className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm py-2 px-4 rounded-lg shadow-lg hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-105 text-sm font-medium text-gray-900"
                  >
                    View All Photos
                  </button>

                  <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                    {project.heroImages?.indexOf(selectedImage) + 1} / {project.heroImages?.length}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {project.heroImages?.slice(1, 5).map((img, index) => {
                    const remainingImages = project.heroImages.slice(1, 5).length;
                    const isLastOdd = remainingImages % 2 !== 0 && index === remainingImages - 1;

                    return (
                      <div
                        key={index}
                        className={`relative group rounded-xl overflow-hidden shadow-lg ${isLastOdd
                            ? 'col-span-2 h-[244px]'
                            : 'h-[244px]'
                          }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover cursor-pointer transition-all duration-500 group-hover:scale-110"
                          onClick={() => setSelectedImage(img)}
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">

                {/* --- Main Project Info --- */}
                <div className="mb-3">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                        <div className="flex items-center gap-2">
                          <CheckCircle size={22} className="text-[#4299E1]" />
                          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                            Verified
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        <span className="text-md font-medium text-gray-700">{project.configurations?.[0]?.type} for sale in {project.area}, {project.city}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm text-gray-600">Developed By:-</span>
                        <span className="font-semibold text-gray-900">{project.developer}</span>
                      </div>

                      {/* --- MODIFIED Configuration Boxes --- */}
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-3">
                          {project.configurations?.map((config, index) => {
                            const typeWords = config.type.split(' ');
                            const line1 = typeWords.slice(0, 2).join(' ');
                            const line2 = typeWords.length > 2 ? typeWords.slice(2).join(' ') : null;

                            return (
                              <div key={index} className="bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow flex overflow-hidden min-w-[240px]">
                                <div className="bg-white px-3 py-2 flex flex-col items-center justify-center text-center flex-shrink-0 w-16 border-r border-gray-200">
                                  <p className="font-semibold text-gray-900 text-xs leading-tight">{line1}</p>
                                  {line2 && (
                                    <p className="text-xs text-gray-700 mt-0.5">{line2}</p>
                                  )}
                                </div>

                                <div className="px-3 py-2 flex flex-col justify-center flex-grow">
                                  <p className="text-sm font-medium text-gray-800">{config.area}</p>
                                  <p className="text-xs text-gray-500 mb-1.5">Super Builtup Area</p>
                                  <div className="flex items-center gap-1.5">
                                    <p className="text-base font-bold text-gray-900">{config.price}</p>
                                    <button className="text-gray-400 hover:text-gray-600">
                                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 80 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0 w-full md:w-auto md:text-right">
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Starting Price</p>
                      <p className="text-2xl font-bold text-gray-900 mb-1">{project.status}</p>
                      <p className="text-sm text-gray-600 mb-4">+ All Inclusive</p>

                      <div className="flex flex-row sm:flex-col gap-3 sm:w-56 sm:ml-auto ">
                        {/* <button className="flex-1 max-w-xs bg-[#4299E1] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#3182ce] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                          <Phone className="w-5 h-5" />
                          Contact Now
                        </button> */}
                        
                        {/* 🌟 UPDATE THE BROCHURE BUTTON 🌟 */}
                        <button
                          onClick={handleBrochureDownloadClick}
                          disabled={!project.brochureUrl} // Disable if no brochure
                          className="flex-1 max-w-xs border-2 border-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Download className="w-5 h-5" />
                          Brochure
                        </button>
                      </div>
                      <div className="flex justify-center md:justify-end items-center gap-4 mt-4">
                        <button className="p-2 text-gray-400 hover:text-[#F56565] transition-colors">
                          <Heart className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-[#4299E1] transition-colors">
                          <Share className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-500 transition-colors">
                          <Eye className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RERA ID and Website Link */}
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm text-gray-600 mt-4">
                  <div>
                    <span className="font-medium">RERA-Id: </span>
                    <span>{project.reraId || 'Not Available'}</span>
                  </div>
                  <a
                    href="https://www.gujrera.gujarat.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4299E1] hover:underline font-medium"
                  >
                    www.gujrera.gujarat.gov.in
                  </a>
                </div>


                {/* TAB NAVIGATION */}
                <div className="border-b border-gray-200 mb-6 sticky top-16 bg-white z-10">
                  <nav className="flex space-x-4 overflow-x-auto py-2">
                    {tabs.map(tab => (
                      <button
                        key={tab}
                        onClick={() => handleTabClick(tab)}
                        className={`tab-button py-4 px-2 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === tab
                            ? 'active'
                            : 'text-gray-500 hover:text-gray-700'
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </nav>
                </div>


                {/* ... (Floor Plan, Overview, Video, Location, and Nearby sections remain exactly the same) ... */}
                                {/* Floor Plan Section */}
                <div ref={floorplanRef} className="mb-12 pt-4">
                  <h2 className="text-2xl font-semibold mb-8 pb-4 border-b border-gray-200">Floor Plans</h2>
                  {floorPlanTabs && floorPlanTabs.length > 0 ? (
                    <>
                      {/* TABS */}
                      <div className="flex items-center gap-6 border-b-2 border-gray-100 mb-6">
                        {floorPlanTabs.map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveFloorPlanTab(tab)}
                            className={`pb-3 font-semibold -mb-0.5 ${activeFloorPlanTab === tab
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                              }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      {/* CARD CONTAINER */}
                      <div className="bg-blue-50/50 p-6 rounded-lg">
                        <div className="flex flex-wrap gap-3">
                        {floorPlanGroups[activeFloorPlanTab]?.map((plan, index) => {
                            // 検 5. CHECK IF THE USER IS VERIFIED
                            const isUnlocked = isUserVerified; // 👈 This line is the only change
                            return (
                              <div
                                key={index}
                                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
                                style={{ width: '350px' }}
                              >
                                {isUnlocked ? (
                                  // 検 6. UNLOCKED VIEW: Clear image, opens lightbox
                                  <button
                                    onClick={() => setFloorPlanToView(plan.image)}
                                    className="block w-full text-left relative group"
                                    aria-label="View floor plan"
                                  >
                                    <img
                                      src={plan.image}
                                      alt={plan.type}
                                      className="w-full h-56 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                      <span className="text-white font-semibold py-2 px-4 border border-white rounded-lg">
                                        View Fullscreen
                                      </span>
                                    </div>
                                  </button>
                                ) : (
                                  // 検 7. LOCKED VIEW: Blurry image, opens lead modal
                                  <button
                                    onClick={() => {
                                      setSelectedFloorPlan(plan); // Set plan to unlock
                                      setPendingAction('viewFloorPlan'); // 👈 SET ACTION
                                      setIsLeadModalOpen(true);  // Open lead modal
                                    }}
                                    className="block w-full text-left relative group"
                                    aria-label="Unlock floor plan details"
                                  >
                                    <img
                                      src={plan.image}
                                      alt="Blurred floor plan"
                                      className="w-full h-56 object-cover blur-md" // Apply blur
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300">
                                      <span className="text-white font-semibold py-2 px-4 bg-gray-800/70 border border-white rounded-lg">
                                        View
                                      </span>
                                    </div>
                                  </button>
                                )}

                                <div className="p-6">
                                  <div className="mb-3">
                                    <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                                    <span className="text-xs font-medium text-gray-600 ml-1">{plan.pricePerSqFt}</span>
                                  </div>
                                  <div className="flex items-center space-x-2 text-gray-600 mb-4 pb-4 border-b">
                                    <div className="flex items-center gap-1">
                                      <BedDouble size={18} className="text-gray-500" />
                                      <span className="text-sm font-medium">{plan.details.beds}</span>
                                    </div>
                                    <span className="text-gray-300">|</span>
                                    <div className="flex items-center gap-1">
                                      <Bath size={18} className="text-gray-500" />
                                      <span className="text-sm font-medium">{plan.details.baths}</span>
                                    </div>
                                    <span className="text-gray-300">|</span>
                                    <div className="flex items-center gap-1">
                                      <Building size={18} className="text-gray-500" />
                                      <span className="text-sm font-medium">{plan.details.balconies}</span>
                                    </div>
                                    <span className="text-gray-300">|</span>
                                    <div className="flex items-center gap-1">
                                      <Car size={18} className="text-gray-500" />
                                      <span className="text-sm font-medium">{plan.details.parking}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3 mb-6">
                                    <Expand size={20} className="text-gray-600" />
                                    <span className="text-lg font-semibold">{plan.area}</span>
                                    <span className="text-sm text-gray-600">Super Builtup Area</span>
                                  </div>
                                  
                                  {/* 検 8. Update Enquire Button Logic */}
                                  <button
                                    onClick={() => {
                                      if (isUnlocked) {
                                        setFloorPlanToView(plan.image); // Just view if unlocked
                                      } else {
                                        setSelectedFloorPlan(plan); // Open lead modal if locked
                                        setPendingAction('viewFloorPlan'); // 👈 SET ACTION
                                        setIsLeadModalOpen(true);
                                      }
                                    }}
                                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                  >
                                    {isUnlocked ? 'View Plan' : 'Enquire Now'}
                                  </button>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Building size={32} className="mx-auto mb-2 text-gray-400" />
                      <p>Floor plans coming soon</p>
                    </div>
                  )}
                </div>

                {/* Overview Section */}
                <div ref={overviewRef} className="mb-12 pt-4">
                  <h2 className="text-2xl font-semibold mb-8 pb-4 border-b border-gray-200">Overview</h2>
                  {project.overview ? (
                    <div className="space-y-8">
                      {/* Project Statistics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="border-r border-gray-200 pr-4">
                          <p className="text-lg font-medium text-gray-900">{project.overview.propertyType || 'Flat'}</p>
                          <p className="text-sm text-gray-500 mt-1">Property Type</p>
                        </div>
                        <div className="border-r border-gray-200 pr-4">
                          <p className="text-lg font-medium text-gray-900">{project.overview.purchaseType || 'New Booking'}</p>
                          <p className="text-sm text-gray-500 mt-1">Purchase Type</p>
                        </div>
                        <div className="border-r border-gray-200 pr-4">
                          <p className="text-lg font-medium text-gray-900">{project.overview.totalArea || 'N/A'}</p>
                          <p className="text-sm text-gray-500 mt-1">Total Area</p>
                        </div>
                        <div className="pr-4">
                          <p className="text-lg font-medium text-gray-900">{project.overview.possessionDate || 'N/A'}</p>
                          <p className="text-sm text-gray-500 mt-1">Possession Date</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="border-r border-gray-200 pr-4">
                          <p className="text-lg font-medium text-gray-900">{project.overview.residenceType || 'N/A'}</p>
                          <p className="text-sm text-gray-500 mt-1">Residence Type</p>
                        </div>
                        <div className="border-r border-gray-200 pr-4">
                          <p className="text-lg font-medium text-gray-900">{project.overview.projectStage || 'N/A'}</p>
                          <p className="text-sm text-gray-500 mt-1">Project Stage</p>
                        </div>
                        <div className="border-r border-gray-200 pr-4">
                          <p className="text-lg font-medium text-gray-900">{project.overview.totalUnits || 'N/A'}</p>
                          <p className="text-sm text-gray-500 mt-1">Total Units</p>
                        </div>
                        <div className="pr-4">
                          <p className="text-lg font-medium text-gray-900">{project.overview.launchDate || 'N/A'}</p>
                          <p className="text-sm text-gray-500 mt-1">Launch Date</p>
                        </div>
                      </div>

                      {/* Tower Details */}
                      {project.towerDetails && project.towerDetails.length > 0 && (
                        <div>
                          <h3 className="text-2xl font-semibold mb-6 mt-8">Tower Details</h3>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b border-gray-200">
                                  <th className="text-left py-3 font-medium text-gray-700">Tower</th>
                                  <th className="text-left py-3 font-medium text-gray-700">Bedroom</th>
                                  <th className="text-left py-3 font-medium text-gray-700">Units/Floor</th>
                                  <th className="text-left py-3 font-medium text-gray-700">Lift</th>
                                  <th className="text-left py-3 font-medium text-gray-700">Storey</th>
                                </tr>
                              </thead>
                              <tbody>
                                {project.towerDetails?.map((tower, i) => (
                                  <tr key={i} className="border-b border-gray-100">
                                    <td className="py-3">{tower.tower}</td>
                                    <td className="py-3">{tower.bedroom}</td>
                                    <td className="py-3">{tower.unitsOfFloor}</td>
                                    <td className="py-3">{tower.lift}</td>
                                    <td className="py-3">{tower.storey}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* About Section */}
                      <div>
                        <h3 className="text-2xl font-semibold mb-4">About {project.name}</h3>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                          {project.about ? renderAboutText(project.about) : fallbackAbout}
                        </div>
                      </div>

                      {/* Key Features */}
                      {project.keyFeatures && (
                        <div>
                          <h3 className="text-2xl font-semibold mb-6 mt-8">Key Features</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {project.keyFeatures?.map((feature, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-[#4299E1] flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Amenities */}
                      {project.amenities && project.amenities.length > 0 && (
                        <div>
                          <h3 className="text-2xl font-semibold mb-6 mt-8">Amenities</h3>
                          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                            {(showAllAmenities ? project.amenities : project.amenities.slice(0, 12)).map((amenity, i) => (
                              <div key={i} className="text-center p-2 border border-gray-200 rounded-lg">
                                <AmenityIcon name={amenity.icon} size={20} className="mx-auto mb-2 text-gray-600" />
                                <p className="text-xs text-gray-600">{amenity.name}</p>
                              </div>
                            ))}
                          </div>

                          {project.amenities.length > 12 && (
                            <div className="text-center mt-6">
                              <button
                                onClick={() => setShowAllAmenities(!showAllAmenities)}
                                className="font-semibold text-[#4299E1] hover:text-[#3182ce] transition-colors"
                              >
                                {showAllAmenities ? 'Show Less' : 'Show More'}
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Project Video */}
                      {project.videoUrl && (
                        <div ref={videoRef}>
                          <h3 className="text-2xl font-semibold mb-6 mt-8">Project Video</h3>
                          <div className="relative w-full overflow-hidden rounded-lg shadow-lg" style={{ paddingTop: '56.25%' }}>
                            <iframe
                              className="absolute top-0 left-0 w-full h-full"
                              src={getYouTubeEmbedUrl(project.videoUrl)}
                              title="Project Video"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                      )}


                      {/* Project Location */}
                      {project.locationData && (
                        <div ref={projectLocationRef}>
                          <h3 className="text-2xl font-semibold mb-6 mt-8">Project Location</h3>
                          <h4 className="text-md font-semibold mb-4">{project.locationData.address}</h4>
                          <div className="relative rounded-lg overflow-hidden shadow-lg">
                            <div
                              ref={mapContainerRef}
                              className="w-full h-96 rounded-lg"
                            ></div>
                            {!isMapReady && (
                              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                {/* ... (loading spinner) ... */}
                                <p className="text-gray-600 font-medium">Loading Map...</p>
                              </div>
                            )}
                          </div>
                          <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-blue-100 rounded-lg">
                                <MapPin className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <p className="font-bold text-gray-800 mb-1">{project.locationData.coordinates}</p>
                                <p className="text-sm text-gray-600 mb-2">{project.locationData.address}</p>
                                <a
                                  href={project.locationData.googleMapsUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[#4299E1] font-semibold text-sm hover:underline"
                                >
                                  View on Google Maps
                                  {/* ... (svg) ... */}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* What's Nearby? */}
                      {project.nearby && project.nearby.length > 0 && (
                        <div ref={nearbyRef}>
                          <h3 className="text-2xl font-semibold mb-6 mt-8">What's Nearby?</h3>
                          <div className="overflow-x-auto pb-4 hide-scrollbar">
                            <div className="grid grid-flow-col grid-rows-2 gap-3 auto-cols-[240px]">
                              {project.nearby.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center p-3 border border-gray-200 rounded-lg bg-white shadow-sm"
                                >
                                  <div className="text-[#4299E1] flex-shrink-0 p-2 bg-blue-50 rounded-lg mr-3">
                                    <NearbyIcon name={item.icon} size={24} />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-gray-800 truncate">{item.name}</p>
                                    <p className="text-sm text-gray-500">{item.distance}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 🌟 NEW/REPLACED: Similar Properties Table 🌟 */}
                      {project.similarProjects && project.similarProjects.length > 0 && (
                        <div ref={similarPropertiesRef}>
                          <h3 className="text-2xl font-semibold mb-6 mt-8">Choose Similar</h3>
                          <div className="overflow-x-auto hide-scrollbar border border-gray-200 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">

                              {/* Table Header Row (for labels) */}
                              <thead>
                                <tr>
                                  <th className="sticky left-0 bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-600 w-40">
                                    Property Info
                                  </th>
                                  {/* Current Project Column Header */}
                                  <td className="px-4 py-3 min-w-[250px]">
                                    <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                      Current
                                    </span>
                                  </td>
                                  {/* Similar Project Column Headers */}
                                  {project.similarProjects.map((similar, index) => (
                                    <td key={index} className="px-4 py-3 min-w-[250px]">
                                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                        Recommended
                                      </span>
                                    </td>
                                  ))}
                                </tr>
                              </thead>

                              {/* Table Body */}
                              <tbody className="bg-white divide-y divide-gray-200">

                                {/* Property Info Row (Image, Name, Location) */}
                                <tr>
                                  <td className="sticky left-0 bg-white px-4 py-3 text-sm font-medium text-gray-900 w-40">
                                    Property Info
                                  </td>
                                  {/* Current Project Info */}
                                  <td className="px-4 py-3">
                                    <div className="flex flex-col">
                                      <Link to={`/${project.slug}`} className="block overflow-hidden rounded-lg mb-3">
                                        <img src={project.image} alt={project.name} className="w-full h-32 object-cover hover:scale-105 transition-transform" />
                                      </Link>
                                      <Link to={`/${project.slug}`} className="text-base font-semibold text-gray-900 hover:text-blue-600">{project.name}</Link>
                                      <p className="text-sm text-gray-600">by {project.developer}</p>
                                      <div className="flex items-center gap-1 mt-1">
                                        <MapPin size={14} className="text-gray-500" />
                                        <span className="text-sm text-gray-500">{project.area}, {project.city}</span>
                                      </div>
                                    </div>
                                  </td>
                                  {/* Similar Projects Info */}
                                  {project.similarProjects.map((similar, index) => (
                                    <td key={index} className="px-4 py-3">
                                      <div className="flex flex-col">
                                        <Link to={`/${similar.slug}`} className="block overflow-hidden rounded-lg mb-3">
                                          <img src={similar.image} alt={similar.name} className="w-full h-32 object-cover hover:scale-105 transition-transform" />
                                        </Link>
                                        <Link to={`/${similar.slug}`} className="text-base font-semibold text-gray-900 hover:text-blue-600">{similar.name}</Link>
                                        <p className="text-sm text-gray-600">by {similar.developer}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                          <MapPin size={14} className="text-gray-500" />
                                          <span className="text-sm text-gray-500">{similar.area}, {similar.city}</span>
                                        </div>
                                      </div>
                                    </td>
                                  ))}
                                </tr>

                                {/* Price Row */}
                                <tr>
                                  <td className="sticky left-0 bg-white px-4 py-3 text-sm font-medium text-gray-900 w-40">
                                    Price
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-700">{project.status}</td>
                                  {project.similarProjects.map((similar, index) => (
                                    <td key={index} className="px-4 py-3 text-sm text-gray-700">{similar.status}</td>
                                  ))}
                                </tr>

                                {/* Configuration Row */}
                                <tr>
                                  <td className="sticky left-0 bg-white px-4 py-3 text-sm font-medium text-gray-900 w-40">
                                    Configuration
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-700">{getConfigurationsString(project.configurations)}</td>
                                  {project.similarProjects.map((similar, index) => (
                                    <td key={index} className="px-4 py-3 text-sm text-gray-700">{getConfigurationsString(similar.configurations)}</td>
                                  ))}
                                </tr>

                                {/* Area Row */}
                                <tr>
                                  <td className="sticky left-0 bg-white px-4 py-3 text-sm font-medium text-gray-900 w-40">
                                    Area
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-700">{getAreaString(project)}</td>
                                  {project.similarProjects.map((similar, index) => (
                                    <td key={index} className="px-4 py-3 text-sm text-gray-700">{getAreaString(similar)}</td>
                                  ))}
                                </tr>

                                {/* Possession Row */}
                                <tr>
                                  <td className="sticky left-0 bg-white px-4 py-3 text-sm font-medium text-gray-900 w-40">
                                    Possession
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-700">{project.overview?.possessionDate || 'N/A'}</td>
                                  {project.similarProjects.map((similar, index) => (
                                    <td key={index} className="px-4 py-3 text-sm text-gray-700">{similar.overview?.possessionDate || 'N/A'}</td>
                                  ))}
                                </tr>

                                {/* Actions Row */}
                                <tr>
                                  <td className="sticky left-0 bg-white px-4 py-3 text-sm font-medium text-gray-900 w-40">
                                    Actions
                                  </td>
                                  <td className="px-4 py-3">
                                    {/* No button for current project */}
                                  </td>
                                  {project.similarProjects.map((similar, index) => (
                                    <td key={index} className="px-4 py-3">
                                      <Link
                                        to={`/${similar.slug}`}
                                        className="inline-block bg-gray-800 text-white text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-900 transition-colors"
                                      >
                                        View Details
                                      </Link>
                                    </td>
                                  ))}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      {/* 🌟 END: Similar Properties Table 🌟 */}

                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>Project overview coming soon</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 🌟 🌟 🌟 CONTACT FORM (MODIFIED) 🌟 🌟 🌟 */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden sticky top-24">
                  <div className="bg-red-400 text-white p-6 text-center rounded-t-lg">
                    <h3 className="text-xl font-semibold mb-2">
                      Interested to buy Property in {project.area}?
                    </h3>
                  </div>

                  <div className="p-6">
                    {/* Error Message */}
                    {contactError && (
                      <p className="text-sm text-red-600 text-center bg-red-50 p-2 rounded mb-4">{contactError}</p>
                    )}

                    {/* 🌟 NEW: Success Step */}
                    {contactFormStep === 'success' && (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Check size={32} className="text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-green-600 mb-2">
                          Thank You!
                        </h3>
                        <p className="text-gray-700">
                          Our expert will contact you shortly.
                        </p>
                      </div>
                    )}

                    {/* 🌟 NEW: Details Step */}
                    {contactFormStep === 'details' && (
                      <form className="space-y-4" onSubmit={handleSendOTPContact}>
                        {/* Name Field */}
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          className="w-full p-3 border-b-2 border-gray-200 focus:border-[#4299E1] focus:outline-none placeholder-gray-400 bg-transparent transition-colors"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          required
                        />

                        {/* Phone Field */}
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Mobile number"
                          className="w-full p-3 border-b-2 border-gray-200 focus:border-[#4299E1] focus:outline-none placeholder-gray-400 bg-transparent transition-colors"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                          required
                          maxLength={10}
                        />

                        {/* Email Field */}
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          className="w-full p-3 border-b-2 border-gray-200 focus:border-[#4299E1] focus:outline-none placeholder-gray-400 bg-transparent transition-colors"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          required
                        />

                        {/* Consent Checkbox */}
                        <div className="flex items-start gap-2 pt-2">
                          <input
                            id="agree"
                            type="checkbox"
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-[#4299E1] focus:ring-[#4299E1]"
                            checked={contactConsent}
                            onChange={(e) => setContactConsent(e.target.checked)}
                            required
                          />
                          <label htmlFor="agree" className="text-xs text-gray-600">
                            I agree to be contacted by Vitalspace via WhatsApp, SMS, Phone, Email, etc.
                          </label>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full border-2 border-blue-700 text-blue-700 font-semibold py-3 rounded-lg hover:bg-blue-700 hover:text-white transition-all disabled:opacity-50"
                          disabled={sendingOtpContact}
                        >
                          {sendingOtpContact ? 'Sending OTP...' : 'Continue'}
                        </button>
                      </form>
                    )}

                    {/* 🌟 NEW: OTP Step */}
                    {contactFormStep === 'otp' && (
                      <form className="space-y-4" onSubmit={handleContactSubmit}>
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <p className="text-sm text-gray-700">
                            Enter the 6-digit OTP sent to <strong>{contactForm.phone}</strong>. 
                            <button 
                              type="button" 
                              onClick={() => { setContactFormStep('details'); setContactError(null); }}
                              className="ml-1 text-blue-600 hover:underline font-medium"
                            >
                              (Edit)
                            </button>
                          </p>
                        </div>

                        {/* OTP Verification Field */}
                        <input
                          type="text"
                          placeholder="Enter 6-digit OTP"
                          value={otpContact}
                          onChange={(e) => setOtpContact(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          className="w-full p-3 border-b-2 border-gray-200 focus:border-[#4299E1] focus:outline-none placeholder-gray-400 bg-transparent transition-colors"
                          maxLength={6}
                          required
                        />
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Didn't receive OTP?</span>
                          {resendTimerContact > 0 ? (
                            <span className="text-gray-500">Resend in {resendTimerContact}s</span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSendOTPContact()}
                              className="text-blue-600 font-semibold hover:underline"
                              disabled={sendingOtpContact}
                            >
                              {sendingOtpContact ? 'Sending...' : 'Resend OTP'}
                            </button>
                          )}
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-all disabled:opacity-50"
                          disabled={isSubmittingContact || verifyingOtpContact || otpContact.length !== 6}
                        >
                          {isSubmittingContact || verifyingOtpContact ? 'Verifying...' : 'Verify & Submit'}
                        </button>
                      </form>
                    )}

                    {/* This part shows regardless of step, unless it's success */}
                    {contactFormStep !== 'success' && (
                      <>
                        {/* Rest Assured Section */}
                        <div className="flex items-start gap-3 mt-6">
                          <div className="flex-shrink-0">
                            <svg className="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              Rest assured, you'll receive a call from our sales expert within the next 5 minutes. (within working hours)
                            </p>
                          </div>
                        </div>

                        <div className="text-center mt-6">
                          <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                            <Shield size={12} />
                            <span>100% Safe & Secure</span>
                          </div>
                        </div>
                      </>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Full-Screen Modal Gallery */}
        {isGalleryOpen && (
          <div className="fixed inset-0 bg-black/90 z-50 flex flex-col p-4 animate-fade-in">
            {/* Gallery Header */}
            <div className="flex-shrink-0 flex justify-between items-center p-4">
              <h2 className="text-xl font-semibold text-white">
                All Photos ({project.heroImages?.length || 0})
              </h2>
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Image Grid */}
            <div className="flex-1 overflow-y-auto hide-scrollbar p-4">
              {/* 🌟 FIX 1: Changed 'grid' to 'columns' for a masonry layout */}
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 max-w-7xl mx-auto">
                {project.heroImages?.map((img, index) => (
                  <div
                    key={index}
                    // 🌟 FIX 2: Removed aspect-ratio, added margin-bottom and break-inside-avoid
                    className="group rounded-lg overflow-hidden mb-4 break-inside-avoid"
                  >
                    <img
                      src={img}
                      alt={`Project photo ${index + 1}`}
                      // 🌟 FIX 3: Changed 'h-full object-cover' to 'h-auto'
                      className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 検 10. RENDER THE LEAD FORM MODAL */}
        {/* 🌟 UPDATE LEAD FORM MODAL PROPS 🌟 */}
        {isLeadModalOpen && (
          <LeadFormModal
            isOpen={isLeadModalOpen}
            onClose={() => {
              setIsLeadModalOpen(false);
              setSelectedFloorPlan(null);
              setPendingAction(null); // 👈 CLEAR ACTION
            }}
            onSuccessSubmit={() => {
              // 1. Set the user as verified
              setIsUserVerified(true);
              
              // 2. Close the lead modal
              setIsLeadModalOpen(false); 
              
              // 3. Check what action was pending
              if (pendingAction === 'viewFloorPlan' && selectedFloorPlan) {
                setFloorPlanToView(selectedFloorPlan.image);
              } else if (pendingAction === 'downloadBrochure') {
                triggerBrochureDownload();
              }
              
              // 4. Clear all pending state
              setSelectedFloorPlan(null); 
              setPendingAction(null);
            }}
            projectId={project._id}
            projectName={project.name}
          />
        )}

        {/* 検 11. RENDER THE FLOOR PLAN VIEWER (LIGHTBOX) */}
        {floorPlanToView && (
          <div
            className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setFloorPlanToView(null)}
          >
            <div
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setFloorPlanToView(null)}
                className="absolute -top-10 right-0 text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all"
              >
                <X size={24} />
              </button>
              <img
                src={floorPlanToView}
                alt="Floor plan"
                className="object-contain w-full h-full rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default ProjectDetails;