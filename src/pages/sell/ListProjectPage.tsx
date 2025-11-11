import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { PlusCircleIcon, XCircleIcon } from 'lucide-react';

// Define types for our complex data structures for better code quality
type FloorPlan = {
  type: string;
  image: string;
  area: string;
  price: string;
  details: { beds: number; baths: number; balconies: number; parking: number };
};

type TowerDetail = {
  tower: string;
  bedroom: string;
  unitsOfFloor: number;
  lift: number;
  storey: string;
};

type Amenity = { name: string; icon: string; };

// Initial state for a new floor plan
const initialFloorPlanState: FloorPlan = {
  type: '', image: '', area: '', price: '',
  details: { beds: 0, baths: 0, balconies: 0, parking: 0 }
};

// Initial state for a new tower detail
const initialTowerState: TowerDetail = {
  tower: '', bedroom: '', unitsOfFloor: 0, lift: 0, storey: ''
};

const ListProjectPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // --- Main Form State ---
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        developer: '',
        status: '',
        reraId: '',
        heroImages: '', // We'll take comma-separated URLs
        keyFeatures: '', // Comma-separated features
        overview: {
            propertyType: 'Flat',
            purchaseType: 'New Booking',
            totalArea: '',
            possessionDate: '',
            projectStage: 'Under Construction',
            totalUnits: '',
            launchDate: '',
        },
        locationData: {
            coordinates: '',
            address: '',
            googleMapsUrl: '',
            mapImage: '',
        },
        floorPlans: [] as FloorPlan[],
        towerDetails: [] as TowerDetail[],
        amenities: [] as Amenity[],
    });

    // --- Handlers for simple value changes ---
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleNestedChange = (section: 'overview' | 'locationData', e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [name]: value,
            },
        }));
    };

    // --- Handlers for DYNAMIC arrays (Floor Plans, Towers, etc.) ---
    const addToArray = <T,>(field: keyof typeof formData, initialState: T) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...(prev[field] as any[]), initialState]
        }));
    };

    const removeFromArray = (field: keyof typeof formData, index: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: (prev[field] as any[]).filter((_, i) => i !== index)
        }));
    };

    const handleArrayChange = (field: keyof typeof formData, index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const list = [...(formData[field] as any[])];
        list[index][name] = value;
        setFormData(prev => ({ ...prev, [field]: list }));
    };
    
    const handleFloorPlanDetailsChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const list = [...formData.floorPlans];
        list[index].details[name as keyof FloorPlan['details']] = parseInt(value) || 0;
        setFormData(prev => ({ ...prev, floorPlans: list }));
    };

    // --- Form Submission ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!formData.name || !formData.developer) {
            setError('Project Name and Developer are required.');
            setIsLoading(false);
            return;
        }

        // Transform form data into the final project structure
        const finalProject = {
            id: Date.now(),
            name: formData.name,
            description: formData.description,
            developer: formData.developer,
            status: formData.status,
            reraId: formData.reraId,
            heroImages: formData.heroImages.split(',').map(url => url.trim()).filter(Boolean),
            keyFeatures: formData.keyFeatures.split(',').map(f => f.trim()).filter(Boolean),
            overview: formData.overview,
            locationData: formData.locationData,
            floorPlans: formData.floorPlans,
            towerDetails: formData.towerDetails,
            amenities: formData.amenities,
            // Add other fields with default values if not in the form
            nearby: [],
            similarProjects: [],
            // Legacy fields for compatibility
            image: formData.heroImages.split(',')[0]?.trim() || '',
            images: formData.heroImages.split(',').map(url => url.trim()).filter(Boolean),
            configurations: formData.floorPlans.map(fp => ({ type: fp.type, area: fp.area, price: fp.price })),
            builder: formData.developer,
            price: formData.status, // or derive from floor plans
            bhk: formData.floorPlans[0]?.type.split(' ')[0] + ' BHK' || '',
            possession: formData.overview.possessionDate,
        };

        try {
            const response = await fetch('http://localhost:3001/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalProject),
            });
            if (!response.ok) throw new Error('Server responded with an error.');
            alert('Project listed successfully!');
            navigate('/Properties');
        } catch (err: any) {
            setError(err.message || 'Failed to submit project. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const inputClass = "mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500";
    const labelClass = "block text-sm font-medium text-gray-700";
    const fieldsetClass = "p-4 border border-gray-200 rounded-lg space-y-4";
    const legendClass = "px-2 font-semibold text-gray-800";

    return (
        <>
            <Navbar />
            <main className="pt-32 pb-16 bg-gray-50">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">List Your Project</h1>
                        <p className="text-gray-500 mb-8">Provide comprehensive details to attract the best buyers.</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-8">
                            
                            {/* --- Basic Information --- */}
                            <fieldset className={fieldsetClass}>
                                <legend className={legendClass}>Basic Information</legend>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div><label htmlFor="name" className={labelClass}>Project Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} required /></div>
                                    <div><label htmlFor="developer" className={labelClass}>Developer</label><input type="text" name="developer" value={formData.developer} onChange={handleChange} className={inputClass} required /></div>
                                    <div><label htmlFor="status" className={labelClass}>Status (e.g., ₹1.16 Cr Onwards)</label><input type="text" name="status" value={formData.status} onChange={handleChange} className={inputClass} /></div>
                                    <div><label htmlFor="reraId" className={labelClass}>RERA ID</label><input type="text" name="reraId" value={formData.reraId} onChange={handleChange} className={inputClass} /></div>
                                </div>
                                <div><label htmlFor="description" className={labelClass}>Description</label><textarea name="description" value={formData.description} onChange={handleChange} rows={2} className={inputClass}></textarea></div>
                            </fieldset>

                             {/* --- Overview --- */}
                            <fieldset className={fieldsetClass}>
                                <legend className={legendClass}>Project Overview</legend>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div><label htmlFor="propertyType" className={labelClass}>Property Type</label><input type="text" name="propertyType" value={formData.overview.propertyType} onChange={e => handleNestedChange('overview', e)} className={inputClass} /></div>
                                    <div><label htmlFor="purchaseType" className={labelClass}>Purchase Type</label><input type="text" name="purchaseType" value={formData.overview.purchaseType} onChange={e => handleNestedChange('overview', e)} className={inputClass} /></div>
                                    <div><label htmlFor="totalUnits" className={labelClass}>Total Units</label><input type="text" name="totalUnits" value={formData.overview.totalUnits} onChange={e => handleNestedChange('overview', e)} className={inputClass} /></div>
                                    <div><label htmlFor="possessionDate" className={labelClass}>Possession Date</label><input type="text" name="possessionDate" value={formData.overview.possessionDate} onChange={e => handleNestedChange('overview', e)} className={inputClass} /></div>
                                </div>
                            </fieldset>
                            
                            {/* --- Images & Features --- */}
                            <fieldset className={fieldsetClass}>
                                <legend className={legendClass}>Media & Features</legend>
                                <div><label htmlFor="heroImages" className={labelClass}>Project Images (Paste comma-separated URLs)</label><textarea name="heroImages" value={formData.heroImages} onChange={handleChange} rows={4} className={inputClass} placeholder="https://.../image1.jpg, https://.../image2.jpg"></textarea></div>
                                <div><label htmlFor="keyFeatures" className={labelClass}>Key Features (Comma-separated)</label><input type="text" name="keyFeatures" value={formData.keyFeatures} onChange={handleChange} className={inputClass} placeholder="Zero Brokerage, Best Offer, etc." /></div>
                            </fieldset>

                            {/* --- Floor Plans (Dynamic) --- */}
                            <fieldset className={fieldsetClass}>
                                <legend className={legendClass}>Floor Plans</legend>
                                {formData.floorPlans.map((plan, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-md border space-y-3 relative">
                                        <button type="button" onClick={() => removeFromArray('floorPlans', index)} className="absolute -top-2 -right-2 text-red-500 hover:text-red-700"><XCircleIcon /></button>
                                        <p className="font-semibold">Floor Plan {index + 1}</p>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div><label className={labelClass}>Type (e.g., 3 BHK)</label><input type="text" name="type" value={plan.type} onChange={e => handleArrayChange('floorPlans', index, e)} className={inputClass} /></div>
                                            <div><label className={labelClass}>Area</label><input type="text" name="area" value={plan.area} onChange={e => handleArrayChange('floorPlans', index, e)} className={inputClass} /></div>
                                            <div><label className={labelClass}>Price</label><input type="text" name="price" value={plan.price} onChange={e => handleArrayChange('floorPlans', index, e)} className={inputClass} /></div>
                                            <div><label className={labelClass}>Image URL</label><input type="text" name="image" value={plan.image} onChange={e => handleArrayChange('floorPlans', index, e)} className={inputClass} /></div>
                                            <div><label className={labelClass}>Beds</label><input type="number" name="beds" value={plan.details.beds} onChange={e => handleFloorPlanDetailsChange(index, e)} className={inputClass} /></div>
                                            <div><label className={labelClass}>Baths</label><input type="number" name="baths" value={plan.details.baths} onChange={e => handleFloorPlanDetailsChange(index, e)} className={inputClass} /></div>
                                            <div><label className={labelClass}>Balconies</label><input type="number" name="balconies" value={plan.details.balconies} onChange={e => handleFloorPlanDetailsChange(index, e)} className={inputClass} /></div>
                                            <div><label className={labelClass}>Parking</label><input type="number" name="parking" value={plan.details.parking} onChange={e => handleFloorPlanDetailsChange(index, e)} className={inputClass} /></div>
                                        </div>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addToArray('floorPlans', initialFloorPlanState)} className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"><PlusCircleIcon size={16} /> Add Floor Plan</button>
                            </fieldset>

                            {/* --- Tower Details (Dynamic) --- */}
                            <fieldset className={fieldsetClass}>
                                <legend className={legendClass}>Tower Details</legend>
                                {formData.towerDetails.map((tower, index) => (
                                     <div key={index} className="p-4 bg-gray-50 rounded-md border grid grid-cols-2 md:grid-cols-5 gap-4 relative">
                                        <button type="button" onClick={() => removeFromArray('towerDetails', index)} className="absolute -top-2 -right-2 text-red-500 hover:text-red-700"><XCircleIcon /></button>
                                        <div><label className={labelClass}>Tower (A, B..)</label><input type="text" name="tower" value={tower.tower} onChange={e => handleArrayChange('towerDetails', index, e)} className={inputClass} /></div>
                                        <div><label className={labelClass}>Bedroom</label><input type="text" name="bedroom" value={tower.bedroom} onChange={e => handleArrayChange('towerDetails', index, e)} className={inputClass} /></div>
                                        <div><label className={labelClass}>Units/Floor</label><input type="number" name="unitsOfFloor" value={tower.unitsOfFloor} onChange={e => handleArrayChange('towerDetails', index, e)} className={inputClass} /></div>
                                        <div><label className={labelClass}>Lifts</label><input type="number" name="lift" value={tower.lift} onChange={e => handleArrayChange('towerDetails', index, e)} className={inputClass} /></div>
                                        <div><label className={labelClass}>Storeys</label><input type="text" name="storey" value={tower.storey} onChange={e => handleArrayChange('towerDetails', index, e)} className={inputClass} /></div>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addToArray('towerDetails', initialTowerState)} className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"><PlusCircleIcon size={16} /> Add Tower Detail</button>
                            </fieldset>
                            
                            {/* --- Amenities (Dynamic) --- */}
                            <fieldset className={fieldsetClass}>
                                <legend className={legendClass}>Amenities</legend>
                                {formData.amenities.map((amenity, index) => (
                                     <div key={index} className="p-4 bg-gray-50 rounded-md border grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                                        <button type="button" onClick={() => removeFromArray('amenities', index)} className="absolute -top-2 -right-2 text-red-500 hover:text-red-700"><XCircleIcon /></button>
                                        <div><label className={labelClass}>Amenity Name</label><input type="text" name="name" value={amenity.name} onChange={e => handleArrayChange('amenities', index, e)} className={inputClass} /></div>
                                        <div><label className={labelClass}>Icon Name (from Lucide)</label><input type="text" name="icon" value={amenity.icon} onChange={e => handleArrayChange('amenities', index, e)} className={inputClass} /></div>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addToArray('amenities', { name: '', icon: '' })} className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"><PlusCircleIcon size={16} /> Add Amenity</button>
                            </fieldset>

                            {/* --- Submission --- */}
                            {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
                            <div className="pt-4 border-t border-gray-200">
                                <button type="submit" disabled={isLoading} className="w-full bg-blue-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-900 transition-colors disabled:bg-gray-400">
                                    {isLoading ? 'Submitting...' : 'Submit Project Listing'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ListProjectPage;