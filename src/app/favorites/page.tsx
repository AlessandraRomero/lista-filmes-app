"use client";
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useFavorites } from '../../../context/FavoritesContext';
import { FavoriteMovie, MovieDetails } from '../../../types/FavoriteMovie';
import FavoriteMovieItem from '../_components/FavoriteMovieItem';

const FavoriteList = () => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [movies, setMovies] = useState<MovieDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { guestSessionId, removeFavorite } = useFavorites();
  const [shareableLink, setShareableLink] = useState<string | null>(null);

  const fetchFavorites = useCallback(async () => {
    if (!guestSessionId) {
      setError('Guest session ID is missing');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`/api/movies/favorites/get-favorite?guestSessionId=${guestSessionId}`);
      setFavorites(response.data);
    } catch (err) {
      console.error('Error fetching favorites:', err);
      setError('Failed to fetch favorite movies');
    } finally {
      setLoading(false);
    }
  }, [guestSessionId]);
  const fetchMovieDetails = useCallback(async () => {
    try {
      const movieIds = favorites.map((favorite) => favorite.movieId);
      const details = await Promise.all(
        movieIds.map((id) => axios.get(`/api/movies/details?id=${id}`))
      );

      setMovies(details.map((res) => res.data));
    } catch (err) {
      console.error('Error fetching movie details:', err);
      setError('Failed to fetch movie details');
    }
  }, [favorites]);

  useEffect(() => {
    if (guestSessionId) {
      fetchFavorites();
    }
  }, [guestSessionId, fetchFavorites]);

  useEffect(() => {
    if (favorites.length > 0) {
      fetchMovieDetails();
    }
  }, [favorites, fetchMovieDetails]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (favorites.length === 0) {
    return <div>No favorites available...</div>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">Meus filmes favoritos</h1>
      <div className="w-full max-w-3xl">
        <div className="flex flex-col gap-4">
          {movies.map((movie) => (
            <FavoriteMovieItem
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteList;
