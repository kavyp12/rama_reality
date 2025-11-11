import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'; // Adjust path if needed
import { useWishlist } from '../context/WishilistContext'; // Adjust path
import { FlatCard } from '../pages/buy/filters.tsx'; // 👈 We re-use FlatCard from filters
import { Heart } from 'lucide-react';

export default function WishlistPage() {
    const { wishlist } = useWishlist();
    const [allProjects, setAllProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // We fetch all projects, just like the filter page does
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
                const data = await response.json();
                
                if (data.success) {
                    setAllProjects(data.data);
                } else {
                    setError(data.error || 'Failed to load projects');
                }
            } catch (err) {
                setError('Failed to load projects');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Filter all projects to find the ones in our wishlist
    const savedProjects = allProjects.filter(project => wishlist.includes(project._id));

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
                div, h1, h2, h3, p, button, span, a, input, label { font-family: 'Poppins', sans-serif; }
            `}</style>
            <div className="min-h-screen bg-gray-50 text-gray-900">
                <Navbar />
                <main className="pt-28 pb-8">
                    <div className="container mx-auto px-4 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">
                            My Wishlist ({savedProjects.length} Properties)
                        </h1>
                        
                        {loading && (
                            <div className="text-center py-16">Loading saved properties...</div>
                        )}
                        
                        {error && (
                            <div className="text-center py-16 text-red-600">{error}</div>
                        )}

                        {!loading && !error && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {savedProjects.length === 0 ? (
                                    <div className="lg:col-span-2 text-center py-20 bg-white rounded-lg shadow-md">
                                        <Heart size={48} className="mx-auto text-gray-300" />
                                        <h3 className="text-xl font-semibold text-gray-700 mt-4">
                                            Your wishlist is empty.
                                        </h3>
                                        <p className="text-gray-500 mt-2">
                                            Click the heart icon on any property to save it here.
                                        </p>
                                    </div>
                                ) : (
                                    savedProjects.map((project: any) => (
                                        <FlatCard key={project._id} flat={project} />
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}