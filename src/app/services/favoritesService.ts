"use client";
import axios from 'axios';

export const createGuestSession = async () => {
  try {
    const response = await axios.get('/api/guest-session');
    return response.data;

  } catch (error) {
    console.error('Failed to create guest session >>>:', error);
    throw error;
  }
};

export const addFavorite = async (guestSessionId: string, movieId: string) => {
  try {
    const response = await axios.post('/api/movies/favorites/add-favorite', {
      guestSessionId,
      movieId,
    });
  } catch (error) {
    console.error('Error adding movie to favorites>>>:', error);
  }
};

export const removeFavorite = async (guestSessionId: string, movieId: string) => {
  try {
    if (!guestSessionId || !movieId) {
      throw new Error('Guest session ID and movie ID are required');
    }
    const response = await axios.delete('/api/movies/favorites/remove-favorite', {
      data: { guestSessionId, movieId }
    });
  } catch (error) {
    console.error('Error removing movie from favorites:', error);
  }
};

export const getFavorites = async (guestSessionId: string): Promise<any[]> => {
  try {
    const response = await axios.get('/api/movies/favorites/get-favorite', {
      params: { guestSessionId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching favorite movies:', error);
    return [];
  }
};
