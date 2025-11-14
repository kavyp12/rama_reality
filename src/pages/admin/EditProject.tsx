// src/pages/admin/EditProject.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import ProjectForm from '../../pages/admin/ProjectForm'; // 🌟 Make sure this path is correct

const EditProject = () => {
  const [formData, setFormData] = useState<any>(null); // Start as null
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingProject, setIsLoadingProject] = useState(true); // For fetching
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Get project ID from URL

  // 🌟 NEW STATE: To hold the list of all projects for the dropdown
  const [allProjects, setAllProjects] = useState<any[]>([]);

  // Fetch existing project data AND all projects list
  useEffect(() => {
    if (!id) return;
    
    const fetchAllData = async () => {
      setIsLoadingProject(true);
      try {
        // 🌟 Fetch both the project-to-edit and the list of all projects
        const [projectRes, allProjectsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`),
          fetch(`${import.meta.env.VITE_API_URL}/projects`)
        ]);

        const projectData = await projectRes.json();
        const allProjectsData = await allProjectsRes.json();

        // Check success for the project-to-edit
        if (projectData.success) {
          setFormData({
            ...projectData.data,
            about: projectData.data.about || '',
            floorPlans: projectData.data.floorPlans || [],
            towerDetails: projectData.data.towerDetails || [],
            configurations: projectData.data.configurations || [],
            heroImages: projectData.data.heroImages || [],
            keyFeatures: projectData.data.keyFeatures || [],
            amenities: projectData.data.amenities || [],
            nearby: projectData.data.nearby || [],
            videoUrl: projectData.data.videoUrl || '',
            overview: projectData.data.overview || {},
            locationData: projectData.data.locationData || {},
            // 🌟 Ensure similarProjects is an array of IDs for the form
            similarProjects: (projectData.data.similarProjects || []).map((p: any) => p._id || p),
          });
        } else {
          alert('Failed to fetch project data: ' + projectData.error);
          navigate('/admin/projects'); // Go back if project not found
        }

        // 🌟 Check success for the list of all projects
        if (allProjectsData.success) {
          setAllProjects(allProjectsData.data);
        } else {
          console.error('Failed to fetch all projects list:', allProjectsData.error);
          // Don't block, just log the error. The form can still work.
        }

      } catch (err) {
        console.error(err);
        alert('An error occurred while fetching project data.');
      } finally {
        setIsLoadingProject(false);
      }
    };
    
    fetchAllData();
  }, [id, navigate]);

  // Form Submit Handler (no changes needed)
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });

      const data = await res.json();
      if (data.success) {
        alert('Project updated successfully!');
        navigate('/admin/projects');
      } else {
        alert('Failed to update project: ' + (data.error || data.message));
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while updating the project.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingProject) {
    return (
      <div className="min-h-screen bg-gray-50">
                   <Navbar isVisible={isNavbarVisible} />
        <main className="pt-24 pb-12"><div className="container mx-auto px-4 max-w-5xl">Loading project data...</div></main>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
    <Navbar isVisible={isNavbarVisible} />

        {formData && (
          <ProjectForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isEditMode={true}
            isSubmitting={isSubmitting}
            // 🌟 PASS THE NEW PROP HERE
            allProjects={allProjects} 
          />
        )}
      </div>
    </>
  );
};

export default EditProject;