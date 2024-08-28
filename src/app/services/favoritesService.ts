"use client";
import axios from 'axios';

export const addFavorite = async (movieId: string) => {
  try {
    const response = await axios.post('/api/movies/favorites/add-favorite', {
      movieId,
    });
    console.log(response.data.message);
  } catch (error) {
    console.error('Error adding movie to favorites:', error);
  }
};

export const removeFavorite = async (movieId: string) => {
  try {
    const response = await axios.delete('/api/movies/favorites/remove-favorite', {
      data: { movieId }
    });
    console.log(response.data.message);
  } catch (error) {
    console.error('Error removing movie from favorites:', error);
  }
};

export const getFavorites = async (): Promise<string[]> => {
  try {
    const response = await axios.get('/api/movies/favorites/get-favorite');
    return response.data;
  } catch (error) {
    console.error('Error fetching favorite movies:', error);
    return [];
  }
};
