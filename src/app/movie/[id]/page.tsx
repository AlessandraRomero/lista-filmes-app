'use client';

import axios from 'axios';
import { DateTime } from 'luxon';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useFavorites } from '../../../../context/FavoritesContext';

const MovieDetails = () => {
  const [movie, setMovie] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const params = useParams();
  const movieId = params.id as string;

  const isFavorite = favorites.includes(movieId);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`/api/movies/details?id=${movieId}`);
        setMovie(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.error || 'Failed to fetch movie details');
        } else {
          setError('Failed to fetch movie details');
        }
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  const handleFavoriteClick = () => {
    try {
      if (isFavorite) {
        removeFavorite(movieId);
      } else {
        addFavorite(movieId);
      }
    } catch (error) {
      console.error('Error toggling favorite status:', error);
    }
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  const formatRating = (rating: number) => {
    const [integer, decimal = ''] = rating.toString().split('.');
    return decimal.length > 1 ? `${integer}.${decimal.slice(0, 1)}` : `${integer}.${decimal}`;
  };

  const formattedRating = formatRating(movie.vote_average);
  const genres = movie.genres.map((genre: any) => genre.name).join(', ');
  const releaseDateISO = movie.release_date;
  const releaseDate = DateTime.fromISO(releaseDateISO, { zone: 'utc' });
  const zonedDate = releaseDate.setZone('America/Sao_Paulo', { keepLocalTime: true });
  const formattedReleaseDate = zonedDate.toFormat('dd/MM/yyyy');

  return (
    <div
      className="flex flex-col items-center p-4 bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col items-center p-6 bg-black bg-opacity-70 rounded-lg shadow-lg max-w-screen-md">
        <h1 className="text-3xl font-bold mb-4 text-white">{movie.title}</h1>
        <button
          onClick={handleFavoriteClick}
          className={`text-3xl ${isFavorite ? 'text-yellow-500' : 'text-gray-300'}`}
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <FaStar />
        </button>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={450}
            className="w-full md:w-1/3 object-cover"
          />
          <div className="flex flex-col gap-2 text-center mt-6 md:text-left text-white">
            <p><strong>Gêneros:</strong> {genres}</p>
            <p className="font-light">{movie.overview}</p>
            <p className="mt-2"><strong>Data de Lançamento:</strong> {formattedReleaseDate}</p>
            <p><strong>Avaliação:</strong> {formattedRating}/10</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
