// src/components/ProjectForm.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Upload, X, Plus, Save, Trash2, Pencil,
  Route, Leaf, Film, Compass, Droplet, Car, Waves, 
  MoveVertical, Shield, ParkingCircle, Fence, Zap, 
  Flame, Dumbbell, Gamepad2, Video, Baby, Book, 
  Grid3X3, Armchair, Home, Phone, Users, CloudRain, 
  Shirt, HelpCircle,
  Bus, Hospital, School, ShoppingCart, MapPin, Train, Plane,
  TrainFront,
  TramFront,FileText
} from 'lucide-react';

// ... (All constants like AVAILABLE_AMENITIES, initialFloorPlanInput, etc. remain exactly the same)
// Predefined amenities list with icons
const AVAILABLE_AMENITIES = [
  { name: 'Jogging Track', icon: 'route' },
  { name: 'Garden', icon: 'leaf' },
  { name: 'Theater', icon: 'film' },
  { name: 'Vaastu Compliant', icon: 'compass' },
  { name: 'Water Storage', icon: 'droplet' },
  { name: 'Visitor Parking', icon: 'car' },
  { name: 'Swimming Pool', icon: 'waves' },
  { name: 'Waste Disposal', icon: 'trash-2' },
  { name: 'Service/Goods Lift', icon: 'move-vertical' },
  { name: 'Security', icon: 'shield' },
  { name: 'Reserved Parking', icon: 'parking-circle' },
  { name: 'Gated Community', icon: 'fence' },
  { name: 'Power Back Up', icon: 'zap' },
  { name: 'Piped Gas', icon: 'flame' },
  { name: 'Gymnasium', icon: 'dumbbell' },
  { name: 'Indoor Games', icon: 'gamepad-2' },
  { name: 'CCTV', icon: 'video' },
  { name: 'Children Play Area', icon: 'baby' },
  { name: 'Library', icon: 'book' },
  { name: 'Carrom', icon: 'grid-3x3' },
  { name: 'Fireplace', icon: 'flame' },
  { name: 'Senior Citizen Sitout', icon: 'armchair' },
  { name: 'Club House', icon: 'home' },
  { name: 'Lift', icon: 'move-vertical' },
  { name: 'Intercom', icon: 'phone' },
  { name: 'Maintenance Staff', icon: 'users' },
  { name: 'Rain Water Harvesting', icon: 'cloud-rain' },
  { name: 'Laundry', icon: 'shirt' },
];

const initialFloorPlanInput = {
  type: '',
  image: '',
  price: '',
  area: '',
  pricePerSqFt: '',
  details: {
    beds: 0,
    baths: 0,
    balconies: 0,
    parking: 0,
  },
};

const initialTowerDetailInput = {
  tower: '',
  bedroom: '',
  unitsOfFloor: '',
  lift: '',
  storey: '',
};

// Constants for the "Nearby" feature
const NEARBY_ICON_OPTIONS = [
  { label: 'Select Icon...', value: '' },
  { label: 'School', value: 'school' },
  { label: 'Hospital', value: 'hospital' },
  { label: 'Bus Stop', value: 'bus' },
  { label: 'Shopping/Mall', value: 'shopping' },
  { label: 'Railway Station', value: 'railway' },
  { label: 'Airport', value: 'airport' },
  { label: 'Metro Station', value: 'metro' },
  { label: 'Other (Map Pin)', value: 'default' },
];
const initialNearbyInput = {
  name: '',
  distance: '',
  icon: '',
};

// Helper function to render nearby icons in the form
const renderNearbyIcon = (iconName: string, props: any) => {
  switch (iconName?.toLowerCase()) {
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


interface ProjectFormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: () => Promise<void>; 
  isEditMode: boolean;
  isSubmitting: boolean;
  allProjects?: any[];
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  formData,
  setFormData,
  onSubmit,
  isEditMode,
  isSubmitting,
  allProjects = [],
}) => {
  const { id } = useParams<{ id: string }>(); 

  // ... (all other state declarations remain the same) ...
  const [isUploading, setIsUploading] = useState(false);
  // 👈 CHANGE: Removed global uploadProgress state
  const navigate = useNavigate();

  const [floorPlanInput, setFloorPlanInput] = useState(initialFloorPlanInput);
  const [towerDetailInput, setTowerDetailInput] = useState(initialTowerDetailInput);
  const [nearbyInput, setNearbyInput] = useState(initialNearbyInput);
  const [editingFloorPlanIndex, setEditingFloorPlanIndex] = useState<number | null>(null);
  const [editingTowerIndex, setEditingTowerIndex] = useState<number | null>(null);
  const [editingNearbyIndex, setEditingNearbyIndex] = useState<number | null>(null);
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [mapType, setMapType] = useState<string>('roadmap');
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);  

  const [keyFeaturesText, setKeyFeaturesText] = useState('');
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [isSavingVideoUrl, setIsSavingVideoUrl] = useState(false);
  const [videoUrlSaveStatus, setVideoUrlSaveStatus] = useState('');

  // 👈 CHANGE: Added local progress states
  const [mainImageProgress, setMainImageProgress] = useState('');
  const [galleryProgress, setGalleryProgress] = useState('');
  const [brochureProgress, setBrochureProgress] = useState('');
  const [floorPlanProgress, setFloorPlanProgress] = useState('');


  // ... (all useEffects for map, video, etc. remain the same) ...
  useEffect(() => {
    setVideoUrlInput(formData?.videoUrl || '');
  }, [formData?._id]); 
  
  useEffect(() => {
    (window as any).initMap = () => {
      setIsMapReady(true);
    };
    const scriptId = 'keyless-google-maps-api';
    const existingScript = document.getElementById(scriptId);
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdn.jsdelivr.net/gh/somanchiu/Keyless-Google-Maps-API@v7.1/mapsJavaScriptAPI.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else if ((window as any).google) {
      setIsMapReady(true);
    }
  }, []);
  
  useEffect(() => {
    if (!isMapReady || !mapContainerRef.current || !(window as any).google) return;
    const defaultCenter = formData.locationData?.coordinates 
      ? {
          lat: parseFloat(formData.locationData.coordinates.split(',')[0].trim()),
          lng: parseFloat(formData.locationData.coordinates.split(',')[1].trim())
        }
      : { lat: 23.0225, lng: 72.5714 }; 
    const map = new (window as any).google.maps.Map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: 13,
      mapTypeId: mapType,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      gestureHandling: 'greedy',
    });
    mapRef.current = map;
    if (formData.locationData?.coordinates) {
      markerRef.current = new (window as any).google.maps.Marker({
        position: defaultCenter,
        map: map,
        draggable: true,
        animation: (window as any).google.maps.Animation.DROP,
      });
      (window as any).google.maps.event.addListener(markerRef.current, 'dragend', (e: any) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setFormData((prev: any) => ({
          ...prev,
          locationData: {
            ...prev.locationData,
            coordinates: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
            googleMapsUrl: `https://www.google.com/maps?q=${lat},${lng}`
          }
        }));
      });
    }
    (window as any).google.maps.event.addListener(map, 'click', (e: any) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      if (markerRef.current) {
        markerRef.current.setPosition(e.latLng);
      } else {
        markerRef.current = new (window as any).google.maps.Marker({
          position: e.latLng,
          map: map,
          draggable: true,
          animation: (window as any).google.maps.Animation.DROP,
        });
        (window as any).google.maps.event.addListener(markerRef.current, 'dragend', (e: any) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          setFormData((prev: any) => ({
            ...prev,
            locationData: {
              ...prev.locationData,
              coordinates: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
              googleMapsUrl: `https://www.google.com/maps?q=${lat},${lng}`
            }
          }));
        });
      }
      setFormData((prev: any) => ({
        ...prev,
        locationData: {
          ...prev.locationData,
          coordinates: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
          googleMapsUrl: `https://www.google.com/maps?q=${lat},${lng}`
        }
      }));
      map.setZoom(15);
      map.panTo(e.latLng);
    });
  }, [isMapReady]);
  
  useEffect(() => {
    if (mapRef.current && (window as any).google) {
      mapRef.current.setMapTypeId(mapType);
    }
  }, [mapType]);


  
  const handleSearchLocation = async () => {
    if (!searchQuery.trim() || !mapRef.current || !(window as any).google) return;
    
    try {
      // Try using Nominatim (OpenStreetMap) geocoding as backup
      const encodedQuery = encodeURIComponent(searchQuery);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodedQuery}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        const location = new (window as any).google.maps.LatLng(lat, lng);
        
        mapRef.current.panTo(location);
        mapRef.current.setZoom(15);
        
        if (markerRef.current) {
          markerRef.current.setPosition(location);
        } else {
          markerRef.current = new (window as any).google.maps.Marker({
            position: location,
            map: mapRef.current,
            draggable: true,
            animation: (window as any).google.maps.Animation.DROP,
          });
          (window as any).google.maps.event.addListener(markerRef.current, 'dragend', (e: any) => {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setFormData((prev: any) => ({
              ...prev,
              locationData: {
                ...prev.locationData,
                coordinates: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
                googleMapsUrl: `https://www.google.com/maps?q=${lat},${lng}`
              }
            }));
          });
        }
        
        setFormData((prev: any) => ({
          ...prev,
          locationData: {
            ...prev.locationData,
            coordinates: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
            googleMapsUrl: `https://www.google.com/maps?q=${lat},${lng}`,
            address: data[0].display_name
          }
        }));
        
        const infoWindow = new (window as any).google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;">
              <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #1f2937;">Location Found!</h3>
              <p style="margin: 0; font-size: 12px; color: #6b7280;">${data[0].display_name}</p>
            </div>
          `
        });
        infoWindow.open(mapRef.current, markerRef.current);
      } else {
        alert('Location not found. Please try:\n• Adding city name (e.g., "Bodakdev, Ahmedabad")\n• Using a more specific address\n• Clicking directly on the map');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      alert('Error searching location. Please try clicking directly on the map or use a more specific search term.');
    }
  };
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchLocation();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const removeBrochure = () => {
    setFormData((prev: any) => ({
      ...prev,
      brochureUrl: '',
    }));
  };
  const handleOverviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      overview: {
        ...prev.overview,
        [name]: value,
      },
    }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      locationData: {
        ...prev.locationData,
        [name]: value,
      },
    }));
  };

  const handleSimilarProjectsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIds = Array.from(e.target.selectedOptions, option => option.value);
    setFormData((prev: any) => ({
      ...prev,
      similarProjects: selectedIds, // This will store an array of _id strings
    }));
  };

  // 👈 CHANGE: Updated handleImageUpload to accept a local progress setter
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    isMultiple: boolean,
    progressSetter: React.Dispatch<React.SetStateAction<string>>, // Added setter
    stateCallback?: (url: string) => void
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true); // Still use global flag to disable submit
    progressSetter(`Uploading ${files.length} file(s)...`); // Use local setter
    
    const uploadFormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      uploadFormData.append('files', files[i]);
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await res.json();
      
      if (data.success && data.urls && data.urls.length > 0) {
        if (isMultiple) {
          setFormData((prev: any) => ({
            ...prev,
            [fieldName]: [...prev[fieldName], ...data.urls],
          }));
        } else {
          const firstUrl = data.urls[0]; 
          
          if (stateCallback) {
            stateCallback(firstUrl);
          } else if (fieldName.includes('.')) {
            const [parent, child] = fieldName.split('.');
            setFormData((prev: any) => ({
              ...prev,
              [parent]: {
                ...prev[parent],
                [child]: firstUrl,
              },
            }));
          } else {
            setFormData((prev: any) => ({
              ...prev,
              [fieldName]: firstUrl,
            }));
          }
        }
        progressSetter('✅ Upload successful!'); // Use local setter
        setTimeout(() => progressSetter(''), 2000); // Clear local progress
      } else {
        progressSetter('❌ Upload failed!'); // Use local setter
        alert('Upload failed: ' + (data.error || 'No URLs returned from server'));
        setTimeout(() => progressSetter(''), 3000);
      }
    } catch (error) {
      console.error(error);
      progressSetter('❌ Error occurred.'); // Use local setter
      alert('An error occurred during upload.');
      setTimeout(() => progressSetter(''), 3000);
    } finally {
      setIsUploading(false); // Clear global flag
    }
  };

  const removeHeroImage = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      heroImages: prev.heroImages.filter((_: any, i: number) => i !== index),
    }));
  };

  const addConfiguration = () => {
    const config = {
      type: prompt('Enter configuration type (e.g., 2 BHK Flat):'),
      area: prompt('Enter area (e.g., 1200 Sq-ft):'),
      price: prompt('Enter price (e.g., ₹85 Lac):'),
    };
    if (config.type && config.area && config.price) {
      setFormData((prev: any) => ({
        ...prev,
        configurations: [...(prev.configurations || []), config],
      }));
    }
  };

  const toggleAmenity = (amenity: { name: string; icon: string }) => {
    setFormData((prev: any) => {
      const existingAmenities = prev.amenities || [];
      const isSelected = existingAmenities.some((a: any) => a.name === amenity.name);
      
      if (isSelected) {
        return {
          ...prev,
          amenities: existingAmenities.filter((a: any) => a.name !== amenity.name),
        };
      } else {
        return {
          ...prev,
          amenities: [...existingAmenities, amenity],
        };
      }
    });
  };

  const isAmenitySelected = (amenityName: string) => {
    return (formData.amenities || []).some((a: any) => a.name === amenityName);
  };

  const addBulkKeyFeatures = () => {
    if (!keyFeaturesText.trim()) {
      alert('Please enter at least one key feature');
      return;
    }
    const features = keyFeaturesText
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);
    if (features.length === 0) {
      alert('Please enter at least one key feature');
      return;
    }
    setFormData((prev: any) => ({
      ...prev,
      keyFeatures: [...(prev.keyFeatures || []), ...features],
    }));
    setKeyFeaturesText('');
  };

  const removeKeyFeature = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      keyFeatures: prev.keyFeatures.filter((_: any, i: number) => i !== index),
    }));
  };

  const handleFloorPlanInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFloorPlanInput(prev => ({ ...prev, [name]: value }));
  };

  const handleFloorPlanDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFloorPlanInput(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: valueAsNumber(value),
      }
    }));
  };

  // 👈 CHANGE: This function now passes the local progress setter
  const handleFloorPlanImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e, 'floorPlan.image', false, setFloorPlanProgress, (url) => {
      setFloorPlanInput(prev => ({ ...prev, image: url }));
    });
  };

  const handleCancelEditFloorPlan = () => {
    setEditingFloorPlanIndex(null);
    setFloorPlanInput(initialFloorPlanInput);
  };

  const handleEditFloorPlan = (index: number) => {
    setEditingFloorPlanIndex(index);
    setFloorPlanInput(formData.floorPlans[index]);
  };

  const addFloorPlan = () => {
    if (!floorPlanInput.type || !floorPlanInput.image || !floorPlanInput.price || !floorPlanInput.area || !floorPlanInput.pricePerSqFt) {
      alert('Please fill in all floor plan fields (Type, Price, Area, Price/Sq-ft) and upload an image.');
      return;
    }
    if (editingFloorPlanIndex !== null) {
      const updatedFloorPlans = formData.floorPlans.map((plan: any, index: number) => {
        if (index === editingFloorPlanIndex) {
          return floorPlanInput;
        }
        return plan;
      });
      setFormData((prev: any) => ({
        ...prev,
        floorPlans: updatedFloorPlans
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        floorPlans: [...(prev.floorPlans || []), floorPlanInput]
      }));
    }
    handleCancelEditFloorPlan();
  };

  const removeFloorPlan = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      floorPlans: prev.floorPlans.filter((_: any, i: number) => i !== index),
    }));
    if (index === editingFloorPlanIndex) {
      handleCancelEditFloorPlan();
    }
  };

  const handleTowerDetailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTowerDetailInput(prev => ({ ...prev, [name]: value }));
  };

  const handleCancelEditTowerDetail = () => {
    setEditingTowerIndex(null);
    setTowerDetailInput(initialTowerDetailInput);
  };

  const handleEditTowerDetail = (index: number) => {
    setEditingTowerIndex(index);
    setTowerDetailInput(formData.towerDetails[index]);
  };

  const addTowerDetail = () => {
    if (!towerDetailInput.tower || !towerDetailInput.bedroom || !towerDetailInput.unitsOfFloor || !towerDetailInput.lift || !towerDetailInput.storey) {
      alert('Please fill in all tower detail fields.');
      return;
    }
    if (editingTowerIndex !== null) {
      const updatedTowerDetails = formData.towerDetails.map((tower: any, index: number) => {
        if (index === editingTowerIndex) {
          return towerDetailInput;
        }
        return tower;
      });
      setFormData((prev: any) => ({
        ...prev,
        towerDetails: updatedTowerDetails
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        towerDetails: [...(prev.towerDetails || []), towerDetailInput]
      }));
    }
    handleCancelEditTowerDetail();
  };

  const removeTowerDetail = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      towerDetails: prev.towerDetails.filter((_: any, i: number) => i !== index),
    }));
    if (index === editingTowerIndex) {
      handleCancelEditTowerDetail();
    }
  };

  const handleNearbyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNearbyInput(prev => ({ ...prev, [name]: value }));
  };

  const handleNearbyIconChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNearbyInput(prev => ({ ...prev, icon: e.target.value }));
  };

  const handleCancelEditNearby = () => {
    setEditingNearbyIndex(null);
    setNearbyInput(initialNearbyInput);
  };

  const handleEditNearbyItem = (index: number) => {
    setEditingNearbyIndex(index);
    setNearbyInput(formData.nearby[index]);
  };

  const addNearbyItem = () => {
    if (!nearbyInput.name || !nearbyInput.distance || !nearbyInput.icon) {
      alert('Please fill in all nearby fields (Name, Distance, and Icon).');
      return;
    }
    let newNearbyArray = [...(formData.nearby || [])];
    if (editingNearbyIndex !== null) {
      newNearbyArray = newNearbyArray.map((item, index) => {
        if (index === editingNearbyIndex) {
          return nearbyInput;
        }
        return item;
      });
    } else {
      newNearbyArray.push(nearbyInput);
    }
    setFormData((prev: any) => ({
      ...prev,
      nearby: newNearbyArray
    }));
    handleCancelEditNearby();
  };

  const removeNearbyItem = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      nearby: prev.nearby.filter((_: any, i: number) => i !== index),
    }));
    if (index === editingNearbyIndex) {
      handleCancelEditNearby();
    }
  };

  const valueAsNumber = (value: string) => value === '' ? 0 : parseInt(value, 10);

  const handleVideoUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrlInput(e.target.value);
    setVideoUrlSaveStatus('');
  };

  const handleSaveVideoUrl = async () => {
    if (!id) {
      alert('Project ID not found. Please save the project first.');
      return;
    }
    setIsSavingVideoUrl(true);
    setVideoUrlSaveStatus('Saving...');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl: videoUrlInput }),
      });
      const data = await res.json();
      if (data.success) {
        setVideoUrlSaveStatus('✅ Saved successfully!');
        setFormData((prev: any) => ({
          ...prev,
          videoUrl: videoUrlInput,
        }));
        setTimeout(() => setVideoUrlSaveStatus(''), 3000);
      } else {
        setVideoUrlSaveStatus('❌ Failed to save');
        alert('Failed to save video URL: ' + (data.error || data.message));
      }
    } catch (error) {
      console.error(error);
      setVideoUrlSaveStatus('❌ Error occurred');
      alert('An error occurred while saving video URL.');
    } finally {
      setIsSavingVideoUrl(false);
    }
  };

  const handleCancelVideoUrl = () => {
    setVideoUrlInput(formData?.videoUrl || '');
    setVideoUrlSaveStatus('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name || 
      !formData.developer || 
      !formData.description || 
      !formData.state || 
      !formData.city || 
      !formData.area
    ) {
      alert('Please fill in required fields: Name, Developer, Description, State, City, and Area');
      return;
    }
    console.log('Submitting videoUrl:', formData.videoUrl);
    await onSubmit(); 
  };
  
  if (!formData) {
    return null;
  }

  const renderAmenityIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      'route': Route, 'leaf': Leaf, 'film': Film, 'compass': Compass, 'droplet': Droplet,
      'car': Car, 'waves': Waves, 'trash-2': Trash2, 'move-vertical': MoveVertical,
      'shield': Shield, 'parking-circle': ParkingCircle, 'fence': Fence, 'zap': Zap,
      'flame': Flame, 'dumbbell': Dumbbell, 'gamepad-2': Gamepad2, 'video': Video,
      'baby': Baby, 'book': Book, 'grid-3x3': Grid3X3, 'armchair': Armchair,
      'home': Home, 'phone': Phone, 'users': Users, 'cloud-rain': CloudRain, 'shirt': Shirt,
    };
    const Icon = icons[iconName] || HelpCircle;
    return <Icon size={24} />;
  };

  return (
    <main className="pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {isEditMode ? 'Edit Project' : 'Add New Project'}
          </h1>
          
          {/* 👈 CHANGE: Removed global upload progress bar from here */}

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* ... (Basic Details) ... */}
            
            {/* Basic Details */}
            <fieldset className="border border-gray-200 rounded-lg p-6">
              <legend className="text-lg font-semibold text-gray-700 px-2">Basic Details</legend>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name *
                  </label>
                  <input 
                    name="name" 
                    placeholder="e.g., Avalon Courtyard" 
                    onChange={handleChange} 
                    value={formData.name || ''}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    location *
                  </label>
                  <textarea 
                    name="description" 
                    placeholder="location of place that show on the card" 
                    onChange={handleChange}
                    value={formData.description || ''}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    About Project
                  </label>
                  <textarea 
                    name="about" 
                    placeholder="Full 'About' text for project details page. Add paragraphs by pressing Enter." 
                    onChange={handleChange}
                    value={formData.about || ''}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Developer *
                    </label>
                    <input 
                      name="developer" 
                      placeholder="e.g., Goyal & Co." 
                      onChange={handleChange}
                      value={formData.developer || ''}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <input 
                      name="status" 
                      placeholder="e.g., ₹1.16 Cr Onwards" 
                      onChange={handleChange}
                      value={formData.status || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input 
                      name="state" 
                      placeholder="e.g., Gujarat" 
                      onChange={handleChange}
                      value={formData.state || ''}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input 
                      name="city" 
                      placeholder="e.g., Ahmedabad" 
                      onChange={handleChange}
                      value={formData.city || ''}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Area (Locality) *
                    </label>
                    <input 
                      name="area" 
                      placeholder="e.g., Bodakdev" 
                      onChange={handleChange}
                      value={formData.area || ''}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    RERA ID
                  </label>
                  <input 
                    name="reraId" 
                    placeholder="e.g., GJ/AHMEDABAD/..." 
                    onChange={handleChange}
                    value={formData.reraId || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </fieldset>

            {/* Image Uploads */}
            <fieldset className="border border-gray-200 rounded-lg p-6">
              <legend className="text-lg font-semibold text-gray-700 px-2">Images</legend>
              <div className="space-y-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Project Image
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                      <Upload size={20} />
                      Upload Image
                      <input 
                        type="file" 
                        // 👈 CHANGE: Pass local setter
                        onChange={(e) => handleImageUpload(e, 'image', false, setMainImageProgress)} 
                        disabled={isUploading}
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                    {formData.image && (
                      <img src={formData.image} alt="Main" className="h-20 w-20 object-cover rounded-lg border border-gray-200" />
                    )}
                  </div>
                  {/* 👈 CHANGE: Added local progress display */}
                  {mainImageProgress && (
                    <p className="text-sm mt-2 text-gray-600">{mainImageProgress}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gallery Images (Upload multiple)
                  </label>
                  <label className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer transition-colors">
                    <Plus size={20} />
                    Add Gallery Image(s)
                    <input 
                      type="file" 
                      // 👈 CHANGE: Pass local setter
                      onChange={(e) => handleImageUpload(e, 'heroImages', true, setGalleryProgress)} 
                      disabled={isUploading}
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                  </label>
                  {/* 👈 CHANGE: Added local progress display */}
                  {galleryProgress && (
                    <p className="text-sm mt-2 text-gray-600">{galleryProgress}</p>
                  )}
                  {formData.heroImages?.length > 0 && (
                    <div className="grid grid-cols-4 gap-4 mt-4">
                      {formData.heroImages.map((url: string, i: number) => (
                        <div key={i} className="relative group">
                          <img 
                            src={url} 
                            alt={`Gallery ${i}`} 
                            className="h-24 w-full object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeHeroImage(i)}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </fieldset>

            <fieldset className="border border-gray-200 rounded-lg p-6">
              <legend className="text-lg font-semibold text-gray-700 px-2">Project Brochure (PDF)</legend>
              <div className="space-y-4 mt-4">
                <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors w-max">
                  <Upload size={20} />
                  {formData.brochureUrl ? 'Replace Brochure' : 'Upload Brochure PDF'}
                  <input 
                    type="file" 
                    // 👈 CHANGE: Pass local setter
                    onChange={(e) => handleImageUpload(e, 'brochureUrl', false, setBrochureProgress)} 
                    disabled={isUploading}
                    accept="application/pdf" // Only allow PDF files
                    className="hidden"
                  />
                </label>
                
                {/* 👈 CHANGE: Added local progress display */}
                {brochureProgress && (
                  <p className="text-sm text-gray-600">{brochureProgress}</p>
                )}

                {formData.brochureUrl && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-red-600 flex-shrink-0" />
                      <a 
                        href={formData.brochureUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm font-medium text-blue-600 hover:underline truncate"
                      >
                        {formData.brochureUrl.split('/').pop()}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={removeBrochure}
                      className="p-2 text-red-500 hover:text-red-700 flex-shrink-0"
                      title="Remove Brochure"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            </fieldset>

            {/* Configurations */}
            <fieldset className="border border-gray-200 rounded-lg p-6">
              <legend className="text-lg font-semibold text-gray-700 px-2">Configurations</legend>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={addConfiguration}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus size={20} />
                  Add Configuration
                </button>
                {formData.configurations?.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.configurations.map((config: any, i: number) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <strong>{config.type}</strong> - {config.area} - {config.price}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </fieldset>

            {/* Floor Plans */}
            <fieldset className="border border-gray-200 rounded-lg p-6">
              <legend className="text-lg font-semibold text-gray-700 px-2">Floor Plans</legend>
              <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-md font-semibold text-gray-800">
                  {editingFloorPlanIndex !== null ? 'Edit Floor Plan' : 'Add New Floor Plan'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input name="type" placeholder="Type (e.g., 3 BHK)" value={floorPlanInput.type} onChange={handleFloorPlanInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  <input name="price" placeholder="Price (e.g., ₹1.25 Cr)" value={floorPlanInput.price} onChange={handleFloorPlanInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  <input name="area" placeholder="Area (e.g., 1750 sq.ft)" value={floorPlanInput.area} onChange={handleFloorPlanInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  <input name="pricePerSqFt" placeholder="Price/Sq-ft (e.g., ₹5,111/ Sq-ft)" value={floorPlanInput.pricePerSqFt} onChange={handleFloorPlanInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Beds</label>
                    <input name="beds" type="number" placeholder="0" value={floorPlanInput.details.beds === 0 ? '' : floorPlanInput.details.beds} onChange={handleFloorPlanDetailsChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Baths</label>
                    <input name="baths" type="number" placeholder="0" value={floorPlanInput.details.baths === 0 ? '' : floorPlanInput.details.baths} onChange={handleFloorPlanDetailsChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Balconies</label>
                    <input name="balconies" type="number" placeholder="0" value={floorPlanInput.details.balconies === 0 ? '' : floorPlanInput.details.balconies} onChange={handleFloorPlanDetailsChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Parking</label>
                    <input name="parking" type="number" placeholder="0" value={floorPlanInput.details.parking === 0 ? '' : floorPlanInput.details.parking} onChange={handleFloorPlanDetailsChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                    <Upload size={20} />
                    {floorPlanInput.image ? 'Image Uploaded' : 'Upload Image'}
                    <input type="file" onChange={handleFloorPlanImageUpload} disabled={isUploading} accept="image/*" className="hidden" />
                  </label>
                  {floorPlanInput.image && (
                    <img src={floorPlanInput.image} alt="Floor Plan" className="h-16 w-16 object-cover rounded-lg border border-gray-200" />
                  )}
                </div>
                
                {/* 👈 CHANGE: Added local progress display */}
                {floorPlanProgress && (
                  <p className="text-sm text-gray-600">{floorPlanProgress}</p>
                )}

                <div className="flex items-center gap-4">
                  <button type="button" onClick={addFloorPlan} disabled={isUploading} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    {editingFloorPlanIndex !== null ? <Save size={20} /> : <Plus size={20} />}
                    {editingFloorPlanIndex !== null ? 'Update This Floor Plan' : 'Add This Floor Plan'}
                  </button>
                  {editingFloorPlanIndex !== null && (
                    <button type="button" onClick={handleCancelEditFloorPlan} className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                      <X size={20} />
                      Cancel Edit
                    </button>
                  )}
                </div>
              </div>
              
              {formData.floorPlans?.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h3 className="text-md font-semibold text-gray-800">Added Floor Plans</h3>
                  {formData.floorPlans.map((plan: any, i: number) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <img src={plan.image} alt={plan.type} className="h-12 w-12 object-cover rounded-lg" />
                      <div className="flex-grow">
                        <strong className="block">{plan.type}</strong>
                        <span className="text-sm text-gray-600">{plan.price} | {plan.area} | {plan.pricePerSqFt}</span>
                      </div>
                      <div className="text-sm text-gray-500 hidden md:flex gap-2">
                        <span>{plan.details.beds}B/{plan.details.baths}B</span>
                      </div>
                      <button type="button" onClick={() => handleEditFloorPlan(i)} className="p-2 text-blue-500 hover:text-blue-700" title="Edit">
                        <Pencil size={18} />
                      </button>
                      <button type="button" onClick={() => removeFloorPlan(i)} className="p-2 text-red-500 hover:text-red-700" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </fieldset>

            {/* Tower Details */}
            <fieldset className="border border-gray-200 rounded-lg p-6">
              <legend className="text-lg font-semibold text-gray-700 px-2">Tower Details</legend>
              <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-md font-semibold text-gray-800">
                  {editingTowerIndex !== null ? 'Edit Tower' : 'Add New Tower'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <input name="tower" placeholder="Tower (e.g., A)" value={towerDetailInput.tower} onChange={handleTowerDetailInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  <input name="bedroom" placeholder="Bedroom (e.g., 3 BHK)" value={towerDetailInput.bedroom} onChange={handleTowerDetailInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  <input name="unitsOfFloor" placeholder="Units/Floor (e.g., 4 Units)" value={towerDetailInput.unitsOfFloor} onChange={handleTowerDetailInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  <input name="lift" placeholder="Lift (e.g., 2 Lifts)" value={towerDetailInput.lift} onChange={handleTowerDetailInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  <input name="storey" placeholder="Storey (e.g., 12 Floors)" value={towerDetailInput.storey} onChange={handleTowerDetailInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                
                <div className="flex items-center gap-4">
                  <button type="button" onClick={addTowerDetail} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    {editingTowerIndex !== null ? <Save size={20} /> : <Plus size={20} />}
                    {editingTowerIndex !== null ? 'Update This Tower' : 'Add This Tower'}
                  </button>
                  {editingTowerIndex !== null && (
                    <button type="button" onClick={handleCancelEditTowerDetail} className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                      <X size={20} />
                      Cancel Edit
                    </button>
                  )}
                </div>
              </div>
              
              {formData.towerDetails?.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h3 className="text-md font-semibold text-gray-800">Added Towers</h3>
                  {formData.towerDetails.map((tower: any, i: number) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex-grow grid grid-cols-5 gap-2 text-sm">
                        <span><strong>Tower:</strong> {tower.tower}</span>
                        <span><strong>Bedroom:</strong> {tower.bedroom}</span>
                        <span><strong>Units:</strong> {tower.unitsOfFloor}</span>
                        <span><strong>Lift:</strong> {tower.lift}</span>
                        <span><strong>Storey:</strong> {tower.storey}</span>
                      </div>
                      <button type="button" onClick={() => handleEditTowerDetail(i)} className="p-2 text-blue-500 hover:text-blue-700" title="Edit">
                        <Pencil size={18} />
                      </button>
                      <button type="button" onClick={() => removeTowerDetail(i)} className="p-2 text-red-500 hover:text-red-700" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </fieldset>

            {/* Overview */}
            <fieldset className="border border-gray-200 rounded-lg p-6">
              <legend className="text-lg font-semibold text-gray-700 px-2">Overview</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <input name="propertyType" placeholder="Property Type" onChange={handleOverviewChange} value={formData.overview?.propertyType || ''} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                <input name="totalArea" placeholder="Total Area" onChange={handleOverviewChange} value={formData.overview?.totalArea || ''} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                <input name="possessionDate" placeholder="Possession Date" onChange={handleOverviewChange} value={formData.overview?.possessionDate || ''} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                <input name="totalUnits" placeholder="Total Units" onChange={handleOverviewChange} value={formData.overview?.totalUnits || ''} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
            </fieldset>

            {/* Key Features */}
            <fieldset className="border border-gray-200 rounded-lg p-6">
              <legend className="text-lg font-semibold text-gray-700 px-2">Key Features</legend>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Key Features (one per line)
                  </label>
                  <textarea
                    placeholder="Enter features, one per line:..."
                    value={keyFeaturesText}
                    onChange={(e) => setKeyFeaturesText(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="button"
                  onClick={addBulkKeyFeatures}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus size={20} />
                  Add All Features
                </button>
                
                {formData.keyFeatures?.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-md font-semibold text-gray-800 mb-3">Added Features ({formData.keyFeatures.length})</h3>
                    <div className="space-y-2">
                      {formData.keyFeatures.map((feature: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <span className="flex-grow text-gray-700">• {feature}</span>
                          <button
                            type="button"
                            onClick={() => removeKeyFeature(i)}
                            className="p-1 text-red-500 hover:text-red-700"
                            title="Remove"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </fieldset>

            {/* Amenities */}
            <fieldset className="border border-gray-200 rounded-lg p-6">
              <legend className="text-lg font-semibold text-gray-700 px-2">Amenities</legend>
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-4">
                  Click on amenities to select/deselect them for this project
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {AVAILABLE_AMENITIES.map((amenity) => (
                    <button
                      key={amenity.name}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`p-4 rounded-lg border-2 transition-all text-center flex flex-col items-center gap-2 ${
                        isAmenitySelected(amenity.name)
                          ? 'border-teal-600 bg-teal-50 text-teal-700'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      {renderAmenityIcon(amenity.icon)}
                      <div className="text-sm font-medium">{amenity.name}</div>
                    </button>
                  ))}
                </div>
                
                {formData.amenities?.length > 0 && (
                  <div className="mt-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
                    <h3 className="text-md font-semibold text-teal-800 mb-2">
                      Selected Amenities ({formData.amenities.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.amenities.map((amenity: any, i: number) => (
                        <span key={i} className="px-3 py-1 bg-white rounded-full text-sm text-teal-700 border border-teal-300">
                          {amenity.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </fieldset>

            {/* Project Video URL */}
            <fieldset className="border border-gray-200 rounded-lg p-6">
              <legend className="text-lg font-semibold text-gray-700 px-2">Project Video</legend>
              <div className="space-y-4 mt-4">
                {isEditMode ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Video URL (YouTube or Vimeo)
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        placeholder="e.g., https://www.youtube.com/watch?v=..." 
                        onChange={handleVideoUrlInputChange} 
                        value={videoUrlInput}
                        disabled={isSavingVideoUrl}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                      <button
                        type="button"
                        onClick={handleSaveVideoUrl}
                        disabled={isSavingVideoUrl || videoUrlInput === formData?.videoUrl}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                      >
                        <Save size={18} />
                        {isSavingVideoUrl ? 'Saving...' : 'Save Now'}
                      </button>
                      {videoUrlInput !== formData?.videoUrl && (
                        <button
                          type="button"
                          onClick={handleCancelVideoUrl}
                          disabled={isSavingVideoUrl}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-400 transition-colors"
                        >
                          <X size={18} />
                          Cancel
                        </button>
                      )}
                    </div>
                    {videoUrlSaveStatus && (
                      <p className="text-sm mt-2 font-medium">
                        {videoUrlSaveStatus}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1.5">
                      💡 This saves directly to database immediately.
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Video URL (YouTube or Vimeo)
                    </label>
                    <input 
                      type="text"
                      name="videoUrl" 
                      placeholder="e.g., https://www.youtube.com/watch?v=..." 
                      onChange={handleChange} 
                      value={formData.videoUrl || ''} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1.5">
                      💡 This will be saved when you click "Create Project".
                    </p>
                  </div>
                )}
              </div>
            </fieldset>

            {/* Location */}
            <fieldset className="border border-gray-200 rounded-lg p-6">
              <legend className="text-lg font-semibold text-gray-700 px-2">Location</legend>
              <div className="space-y-4 mt-4">
                <input 
                  name="address" 
                  placeholder="Full address" 
                  onChange={handleLocationChange} 
                  value={formData.locationData?.address || ''} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Click on Map to Mark Location (You can also drag the marker)
                  </label>
                  <div className="mb-3">
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        {/* ... (search input svg) ... */}
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyPress={handleSearchKeyPress}
                          placeholder="Search location (e.g., Bodakdev, Ahmedabad)"
                          className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleSearchLocation}
                        disabled={!searchQuery.trim() || !isMapReady}
                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium text-sm"
                      >
                        {/* ... (search button svg) ... */}
                        Search
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5">
                      💡 Tip: Search for area name, landmark, or full address to quickly locate on map
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-gray-600 font-medium">View:</span>
                    <div className="flex rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                      <button
                        type="button"
                        onClick={() => setMapType('roadmap')}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                          mapType === 'roadmap' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Map
                      </button>
                      <button
                        type="button"
                        onClick={() => setMapType('satellite')}
                        className={`px-4 py-2 text-sm font-medium transition-colors border-l ${
                          mapType === 'satellite' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Satellite
                      </button>
                      <button
                        type="button"
                        onClick={() => setMapType('hybrid')}
                        className={`px-4 py-2 text-sm font-medium transition-colors border-l ${
                          mapType === 'hybrid' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Hybrid
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div 
                      ref={mapContainerRef}
                      className="w-full h-96 rounded-lg border-2 border-gray-300"
                    ></div>
                    
                    {!isMapReady && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                        {/* ... (loading spinner) ... */}
                        <p className="text-sm text-gray-600">Loading Map...</p>
                      </div>
                    )}
                  </div>
                  
                  {formData.locationData?.coordinates && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">
                        📍 Selected Location: {formData.locationData.coordinates}
                      </p>
                      <a 
                        href={formData.locationData.googleMapsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                      >
                        View on Google Maps →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </fieldset>

            {/* What's Nearby? */}
            <fieldset className="border border-gray-200 rounded-lg p-6">
              <legend className="text-lg font-semibold text-gray-700 px-2">What's Nearby?</legend>
              <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-md font-semibold text-gray-800">
                  {editingNearbyIndex !== null ? 'Edit Nearby Place' : 'Add Nearby Place'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input 
                    name="name" 
                    placeholder="Place Name (e.g., Divit Hospital)" 
                    value={nearbyInput.name} 
                    onChange={handleNearbyInputChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <input 
                    name="distance" 
                    placeholder="Distance (e.g., 1.5 km)" 
                    value={nearbyInput.distance} 
                    onChange={handleNearbyInputChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <select
                    name="icon"
                    value={nearbyInput.icon}
                    onChange={handleNearbyIconChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
                  >
                    {NEARBY_ICON_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center gap-4">
                  <button 
                    type="button" 
                    onClick={addNearbyItem} 
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    {editingNearbyIndex !== null ? <Save size={20} /> : <Plus size={20} />}
                    {editingNearbyIndex !== null ? 'Update Place' : 'Add Place'}
                  </button>
                  {editingNearbyIndex !== null && (
                    <button 
                      type="button" 
                      onClick={handleCancelEditNearby} 
                      className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <X size={20} />
                      Cancel Edit
                    </button>
                  )}
                </div>
              </div>
              
              {formData.nearby?.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h3 className="text-md font-semibold text-gray-800">Added Nearby Places</h3>
                  {formData.nearby.map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="p-2 text-blue-600 flex-shrink-0">
                        {renderNearbyIcon(item.icon, { size: 24 })}
                      </div>
                      <div className="flex-grow">
                        <strong className="block">{item.name}</strong>
                        <span className="text-sm text-gray-600">{item.distance}</span>
                      </div>
                      <button type="button" onClick={() => handleEditNearbyItem(i)} className="p-2 text-blue-500 hover:text-blue-700" title="Edit">
                        <Pencil size={18} />
                      </button>
                      <button type="button" onClick={() => removeNearbyItem(i)} className="p-2 text-red-500 hover:text-red-700" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </fieldset>

            {/* Similar Properties Section */}
            <fieldset className="border border-gray-200 rounded-lg p-6">
  <legend className="text-lg font-semibold text-gray-700 px-2">Similar Properties</legend>
  <div className="mt-4 space-y-4">
    <label htmlFor="similarProjects" className="block text-sm font-medium text-gray-700 mb-2">
      Select similar projects (Hold Ctrl/Cmd to select multiple)
    </label>
    
    {allProjects.length > 0 ? (
      <select
        id="similarProjects"
        name="similarProjects"
        multiple
        value={formData.similarProjects || []}
        onChange={handleSimilarProjectsChange}
        className="w-full h-60 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {allProjects
          .filter(p => p._id !== id) // Don't allow selecting self in edit mode
          .map(project => (
            <option key={project._id} value={project._id}>
              {project.name} ({project.city}, {project.area})
            </option>
          ))}
      </select>
    ) : (
      <p className="text-sm text-gray-500">Loading projects... (or no other projects found)</p>
    )}
    
    <p className="text-xs text-gray-500 mt-1.5">
      💡 This will show these projects in the "Choose Similar" section on the project's detail page.
    </p>
    
    {formData.similarProjects?.length > 0 && (
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-md font-semibold text-blue-800 mb-2">
          Selected Similar Properties ({formData.similarProjects.length})
        </h3>
        <div className="flex flex-wrap gap-2">
          {formData.similarProjects.map((projectId: string) => {
            const project = allProjects.find(p => p._id === projectId);
            return project ? (
              <span key={projectId} className="px-3 py-1 bg-white rounded-full text-sm text-blue-700 border border-blue-300">
                {project.name}
              </span>
            ) : null;
          })}
        </div>
      </div>
    )}
  </div>
</fieldset>


            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button 
                type="button" 
                onClick={() => navigate(isEditMode ? '/admin/projects' : '/')} 
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isUploading || isSubmitting} 
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <Save size={20} />
                {isSubmitting ? 'Saving...' : (isUploading ? 'Uploading...' : (isEditMode ? 'Update Project' : 'Create Project'))}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ProjectForm;