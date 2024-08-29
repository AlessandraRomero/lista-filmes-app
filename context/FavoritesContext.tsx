"use client";
import { addFavorite, createGuestSession, removeFavorite } from '@/app/services/favoritesService';
import { createContext, useContext, useEffect, useState } from 'react';

interface FavoritesContextType {
  favorites: string[];
  guestSessionId: string | null;
  setGuestSessionId: (id: string) => void;
  addFavorite: (movieId: string) => Promise<void>;
  removeFavorite: (movieId: string) => Promise<void>;
}
interface Movie {
  id: string;
  title: string;
}
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const session = await createGuestSession();
        setGuestSessionId(session.guest_session_id);
      } catch (error) {
        console.error('Failed to create guest session:', error);
      }
    };

    initializeSession();
  }, []);


  const handleAddFavorite = async (movieId: string) => {
    if (guestSessionId) {
      try {
        await addFavorite(guestSessionId, movieId);
        setFavorites((prev) => [...prev, movieId]);
      } catch (error) {
        console.error('Failed to add favorite:', error);
      }
    }
  };

  const handleRemoveFavorite = async (movieId: string) => {
    if (guestSessionId) {
      try {
        await removeFavorite(guestSessionId, movieId);
        setFavorites((prev) => prev.filter((id) => id !== movieId));
      } catch (error) {
        console.error('Failed to remove favorite:', error);
      }
    }
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      guestSessionId, 
      setGuestSessionId, 
      addFavorite: handleAddFavorite, 
      removeFavorite: handleRemoveFavorite, 
     // fetchFavorites 
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
