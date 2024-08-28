"use client";
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import FavoriteMovieItem from '../_components/FavoriteMovieItem';
import ShareableLink from '../_components/ShareableLink';
import { generateShareableLink } from '../_lib/shareableLinks';
import { getFavorites, removeFavorite } from '../services/favoritesService';


const FavoriteList = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [shareableLink, setShareableLink] = useState<string | null>(null);

  const params = useParams();
  const movieId = params.id as string;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteMovies = await getFavorites();
        if (typeof favoriteMovies === 'object') {
          setFavorites(favoriteMovies);
        } else {
          console.error('Unexpected format of favoriteMovies:', favoriteMovies);
          setError('Unexpected format of favoriteMovies');
        }
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError('Failed to fetch favorites');
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchMovieDetails = async () => {
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
    };

    if (favorites.length > 0) {
      fetchMovieDetails();
    }
  }, [favorites]);

  const handleRemoveFavorite = async (movieId: string) => {
    try {
      await removeFavorite(movieId);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.movieId !== movieId)
      );
      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.id !== movieId)
      );
    } catch (err) {
      console.error('Error removing favorite:', err);
      setError('Failed to remove favorite');
    }
  };

  const handleGenerateLink = () => {
    const link = generateShareableLink(favorites);
    setShareableLink(link);
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (movies.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">Meus filmes favoritos</h1>
      <div className="w-full max-w-3xl">
        <ShareableLink
          favorites={favorites}
          onGenerate={handleGenerateLink}
          link={shareableLink}
        />
        <div className="flex flex-col gap-4">
          {movies.map((movie) => (
            <FavoriteMovieItem
              key={movie.id}
              movie={movie}
              onRemove={handleRemoveFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteList;
