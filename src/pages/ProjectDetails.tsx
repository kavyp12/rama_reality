// src/pages/ProjectDetails.tsx
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectData } from '../data/projectsData';
import Navbar from '../components/Navbar';
import { 
    CheckCircle, ChevronLeft, ChevronRight, BedDouble, Bath, ParkingCircle, Car,
    Home, Building, Calendar, Check, Box, List, Play, Utensils, Film, Compass, Droplet,
    Waves, Trash, Truck, Shield, TreePine, CloudRain, User, MapPin, Phone, Download,
    Heart, Share, Eye, Star
} from 'lucide-react';

// A helper component to map amenity names to icons
const AmenityIcon = ({ name, ...props }: { name: string, [key: string]: any }) => {
    switch (name.toLowerCase()) {
        case 'run': return <Play {...props} />;
        case 'utensils': return <Utensils {...props} />;
        case 'tree-pine': return <TreePine {...props} />;
        case 'cloud-rain': return <CloudRain {...props} />;
        case 'film': return <Film {...props} />;
        case 'compass': return <Compass {...props} />;
        case 'droplet': return <Droplet {...props} />;
        case 'car': return <Car {...props} />;
        case 'waves': return <Waves {...props} />;
        case 'trash': return <Trash {...props} />;
        case 'truck': return <Truck {...props} />;
        case 'shield': return <Shield {...props} />;
        default: return <Box {...props} />;
    }
};

const ProjectDetails = () => {
    const { id } = useParams<{ id: string }>();
    const overviewRef = useRef<HTMLDivElement>(null);

    const project = useMemo(() => {
        const allProjects = Object.values(projectData).flatMap(category => category.projects);
        return allProjects.find(p => p.id.toString() === id);
    }, [id]);

    const [selectedImage, setSelectedImage] = useState('');
    const [activeTab, setActiveTab] = useState('Floor Plan');
    const [activeFloorPlan, setActiveFloorPlan] = useState(0);

    useEffect(() => {
        if (project?.heroImages?.length) {
            setSelectedImage(project.heroImages[0]);
        }
        if (project?.floorPlans?.length) {
            setActiveFloorPlan(0);
        }
    }, [project]);

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
        if (tab === 'Overview') {
            overviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    if (!project) {
        return (
            <>
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                    * { font-family: 'Inter', sans-serif; }
                `}</style>
                <div className="min-h-screen bg-gray-50">
                    <Navbar />
                    <main className="pt-32 pb-8 container mx-auto px-4 text-center">
                        <h1 className="text-3xl font-bold text-gray-800">Project Not Found</h1>
                        <p className="text-gray-600 mt-2">The project you are looking for does not exist.</p>
                        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Back to Home</Link>
                    </main>
                </div>
            </>
        );
    }

    const currentFloorPlan = project.floorPlans?.[activeFloorPlan];
    const tabs = ['Floor Plan', 'Overview', 'Gallery', 'Video', 'Location'];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                * { font-family: 'Inter', sans-serif; }
                
                .tab-button.active {
                    color: #1e40af;
                    border-bottom: 2px solid #1e40af;
                }
            `}</style>
            
            <div className="min-h-screen bg-white text-gray-900">
                <Navbar />
                <main className="pt-24 pb-12">
                    <div className="container mx-auto px-4 lg:px-8">
                        {/* Simple Breadcrumbs */}
                        <div className="flex items-center text-sm text-gray-500 mb-6">
                            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link> 
                            <ChevronRight className="mx-2 h-4 w-4" />
                            <Link to="/properties" className="hover:text-blue-600 transition-colors">Properties</Link> 
                            <ChevronRight className="mx-2 h-4 w-4" />
                            <span className="text-gray-700">{project.name}</span>
                        </div>

                        {/* Professional Image Gallery */}
                        <div className="mb-12">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                                {/* Main Image */}
                                <div className="lg:col-span-3 relative h-[500px] group rounded-2xl overflow-hidden shadow-2xl">
                                    <img 
                                        src={selectedImage} 
                                        alt="Main project view" 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                                    
                                    {/* Navigation buttons */}
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
                                    
                                    {/* Image counter */}
                                    <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                                        {project.heroImages?.indexOf(selectedImage) + 1} / {project.heroImages?.length}
                                    </div>
                                </div>
                                
                                {/* Thumbnail Images */}
                                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                                    {project.heroImages?.slice(1, 5).map((img, index) => (
                                        <div key={index} className="h-[120px] lg:h-[118px] relative group rounded-xl overflow-hidden shadow-lg">
                                            <img 
                                                src={img}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover cursor-pointer transition-all duration-500 group-hover:scale-110"
                                                onClick={() => setSelectedImage(img)}
                                            />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Project Header */}
                        <div className="bg-gradient-to-r from-slate-50 to-gray-50 -mx-4 lg:-mx-8 px-4 lg:px-8 py-12 mb-16">
                            <div className="max-w-7xl mx-auto">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                                    {/* Project Info - Left Side */}
                                    <div className="lg:col-span-2">
                                        <div className="flex items-center gap-4 mb-4">
                                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{project.name}</h1>
                                            <div className="flex items-center gap-2">
                                                <CheckCircle size={28} className="text-emerald-500" />
                                                <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                                                    Verified
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <p className="text-lg text-gray-700 mb-6 leading-relaxed max-w-4xl">
                                            {project.description}
                                        </p>
                                        
                                        <div className="flex flex-wrap items-center gap-6 text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Building className="h-5 w-5 text-gray-500" />
                                                <span className="text-sm">Developed by</span>
                                                <span className="font-semibold text-gray-900">{project.developer}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-5 w-5 text-gray-500" />
                                                <span className="text-sm font-medium">2, 3 BHK Flat in Ambli, Ahmedabad</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm">
                                                {project.configurations.map((config, index) => (
                                                    <span key={index} className="bg-white px-3 py-1 rounded-full border border-gray-200 font-medium">
                                                        {config.type}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Price & CTA - Right Side */}
                                    <div className="lg:col-span-1">
                                        <div className="text-right lg:text-left">
                                            <div className="mb-6">
                                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Starting Price</p>
                                                <p className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">{project.status}</p>
                                                <p className="text-sm text-gray-600">+ All Inclusive</p>
                                            </div>
                                            
                                            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                                                <button className="bg-blue-600 text-white font-semibold py-4 px-8 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                                                    <Phone className="inline w-5 h-5 mr-2" />
                                                    Contact Now
                                                </button>
                                                <button className="border-2 border-gray-300 text-gray-800 font-semibold py-4 px-8 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300">
                                                    <Download className="inline w-5 h-5 mr-2" />
                                                    Download Brochure
                                                </button>
                                            </div>
                                            
                                            <div className="flex justify-center lg:justify-start items-center gap-4 mt-6">
                                                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                                    <Heart className="h-5 w-5" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                                                    <Share className="h-5 w-5" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-green-500 transition-colors">
                                                    <Eye className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    

                        {/* Main Content Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                {/* Tab Navigation */}
                                <div className="border-b border-gray-200 mb-6">
                                    <nav className="flex space-x-8">
                                        {tabs.map(tab => (
                                            <button
                                                key={tab}
                                                onClick={() => handleTabClick(tab)}
                                                className={`tab-button py-4 px-2 font-medium text-sm transition-colors ${
                                                    activeTab === tab 
                                                    ? 'active' 
                                                    : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </nav>
                                </div>

                                {/* Floor Plan Section */}
                                <div className="mb-12">
                                    <h2 className="text-2xl font-semibold mb-6">Floor Plans</h2>
                                    {project.floorPlans && project.floorPlans.length > 0 ? (
                                        <>
                                            <div className="flex items-center gap-3 mb-6">
                                                {project.floorPlans.map((plan, index) => (
                                                    <button 
                                                        key={index}
                                                        onClick={() => setActiveFloorPlan(index)}
                                                        className={`px-4 py-2 rounded font-medium transition-colors ${
                                                            activeFloorPlan === index
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        {plan.type}
                                                    </button>
                                                ))}
                                            </div>
                                            {currentFloorPlan && (
                                                <div>
                                                    <div className="text-center mb-6">
                                                        <img 
                                                            src={currentFloorPlan.image} 
                                                            alt={`${currentFloorPlan.type} floor plan`} 
                                                            className="w-full max-w-2xl mx-auto rounded"
                                                        />
                                                    </div>
                                                    
                                                    {/* Floor Plan Details */}
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
                                                        <div>
                                                            <p className="text-2xl font-bold mb-2">{currentFloorPlan.price}</p>
                                                            <p className="text-gray-600">{currentFloorPlan.area}</p>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                                            <div className="flex items-center gap-2">
                                                                <BedDouble size={16} className="text-gray-400"/>
                                                                <span>{currentFloorPlan.details.beds} Beds</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Bath size={16} className="text-gray-400"/>
                                                                <span>{currentFloorPlan.details.baths} Baths</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Home size={16} className="text-gray-400"/>
                                                                <span>{currentFloorPlan.details.balconies} Balconies</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <ParkingCircle size={16} className="text-gray-400"/>
                                                                <span>{currentFloorPlan.details.parking} Parking</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            <Building size={32} className="mx-auto mb-2 text-gray-400" />
                                            <p>Floor plans coming soon</p>
                                        </div>
                                    )}
                                </div>

                                {/* Overview Section */}
                                <div ref={overviewRef}>
                                    <h2 className="text-2xl font-semibold mb-6">Project Overview</h2>
                                    {project.overview ? (
                                        <div className="space-y-8">
                                            {/* Project Statistics */}
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1">Property Type</p>
                                                    <p className="font-medium">{project.overview.propertyType}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1">Total Area</p>
                                                    <p className="font-medium">{project.overview.totalArea}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1">Possession</p>
                                                    <p className="font-medium">{project.overview.possessionDate}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1">Total Units</p>
                                                    <p className="font-medium">{project.overview.totalUnits}</p>
                                                </div>
                                            </div>

                                            {/* Tower Details */}
                                            {project.towerDetails && (
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-4">Tower Details</h3>
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

                                            {/* Key Features */}
                                            {project.keyFeatures && (
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        {project.keyFeatures?.map((feature, i) => (
                                                            <div key={i} className="flex items-center gap-2">
                                                                <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                                                                <span className="text-gray-700">{feature}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Amenities */}
                                            {project.amenities && (
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                                                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                                                        {project.amenities?.map((amenity, i) => (
                                                            <div key={i} className="text-center p-3 border border-gray-200 rounded-lg">
                                                                <AmenityIcon name={amenity.icon} size={24} className="mx-auto mb-2 text-gray-600" />
                                                                <p className="text-xs text-gray-600">{amenity.name}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            <p>Project overview coming soon</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="lg:col-span-1">
                                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sticky top-24">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Get Details</h3>
                                    <p className="text-gray-600 text-sm mb-6">Connect with our property expert</p>
                                    
                                    <form className="space-y-4">
                                        <input 
                                            type="text" 
                                            placeholder="Full Name" 
                                            className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
                                        />
                                        <input 
                                            type="email" 
                                            placeholder="Email Address" 
                                            className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
                                        />
                                        <input 
                                            type="tel" 
                                            placeholder="Phone Number" 
                                            className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
                                        />
                                        <div className="flex items-start gap-2">
                                            <input 
                                                id="agree" 
                                                type="checkbox" 
                                                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                                                defaultChecked
                                            />
                                            <label htmlFor="agree" className="text-xs text-gray-600">
                                                I agree to be contacted via WhatsApp, SMS, Phone, Email etc.
                                            </label>
                                        </div>
                                        <button 
                                            type="submit" 
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
                                        >
                                            Get Exclusive Offer
                                        </button>
                                    </form>
                                    
                                    <div className="flex items-center gap-3 mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <User size={18} className="text-blue-600"/>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Expert Call Guaranteed</p>
                                            <p className="text-xs text-gray-600">Get callback within 5 minutes</p>
                                        </div>
                                    </div>
                                    
                                    <div className="text-center mt-4">
                                        <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                                            <Shield size={12} />
                                            <span>100% Safe & Secure</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default ProjectDetails;