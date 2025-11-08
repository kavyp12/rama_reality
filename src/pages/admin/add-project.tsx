// src/pages/admin/AddProject.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import ProjectForm from '../../pages/admin/ProjectForm';

// Initial empty state for a new project
const initialState = {
  name: '',
  description: '',
  developer: '',
  state: '',
  city: '',
  area: '',
  about: '',
  status: '',
  reraId: '',
  image: '',
  heroImages: [],
  configurations: [],
  overview: {
    propertyType: '',
    totalArea: '',
    possessionDate: '',
    totalUnits: '',
    purchaseType: '',
    residenceType: '',
    projectStage: '',
    launchDate: '',
  },
  floorPlans: [],
  keyFeatures: [],
  amenities: [],
  towerDetails: [],
  nearby: [],
  locationData: {
    coordinates: '',
    address: '',
    googleMapsUrl: '',
    mapImage: '',
  },
  builder: '',
  price: '',
  bhk: '',
  possession: '',
  videoUrl: '',
  similarProjects: [], // 🌟 ADD THIS for similar projects
};

const AddProject = () => {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const navigate = useNavigate();

  // 🌟 Fetch all projects for the Similar Properties dropdown
  useEffect(() => {
    const fetchAllProjects = async () => {
      setIsLoadingProjects(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
        const data = await res.json();
        
        if (data.success) {
          setAllProjects(data.data);
        } else {
          console.error('Failed to fetch projects:', data.error);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setIsLoadingProjects(false);
      }
    };
    
    fetchAllProjects();
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        alert('Project created successfully!');
        navigate('/admin/projects');
      } else {
        alert('Failed to create project: ' + (data.error || data.message));
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating the project.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {isLoadingProjects ? (
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-gray-600">Loading projects...</p>
            </div>
          </div>
        </main>
      ) : (
        <ProjectForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          isEditMode={false}
          isSubmitting={isSubmitting}
          allProjects={allProjects} // 🌟 PASS allProjects here
        />
      )}
    </div>
  );
};

export default AddProject;