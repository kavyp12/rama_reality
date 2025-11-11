import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type WishlistContextType = {
  wishlist: string[]; // We will store property _id strings
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<string[]>(() => {
    // Load initial state from LocalStorage
    try {
      const saved = localStorage.getItem('ramaRealtyWishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to parse wishlist from localStorage', error);
      return [];
    }
  });

  // Save to LocalStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('ramaRealtyWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (id: string) => {
    setWishlist((prev) => [...prev, id]);
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((itemId) => itemId !== id));
  };

  const isWishlisted = (id: string) => {
    return wishlist.includes(id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use the wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};