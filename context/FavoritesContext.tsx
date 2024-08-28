"use client"
import { addFavorite, getFavorites, removeFavorite } from '@/app/services/favoritesService';
import { createContext, useContext, useEffect, useState } from 'react';


interface FavoritesContextType {
  favorites: string[];
  addFavorite: (movieId: string) => void;
  removeFavorite: (movieId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favoriteMovies = await getFavorites();
      setFavorites(favoriteMovies.map((favorite) => favorite.movieId));
    };
    fetchFavorites();
  }, []);

  const handleAddFavorite = async (movieId: string) => {
    await addFavorite(movieId);
    setFavorites((prev) => [...prev, movieId]);
  };

  const handleRemoveFavorite = async (movieId: string) => {
    await removeFavorite(movieId);
    setFavorites((prev) => prev.filter((id) => id !== movieId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite: handleAddFavorite, removeFavorite: handleRemoveFavorite }}>
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
