'use client';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SearchMovies from '../app/_components/searchmovie';
import { Card, CardContent, CardTitle } from './_components/ui/card';

const PopularMovies = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('/api/movies/all-movies');
        setMovies(response.data.results);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.error || 'Failed to fetch movies');
        } else {
          setError('Failed to fetch movies');
        }
      }
    };

    fetchMovies();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <SearchMovies />
      <h1 className="text-2xl font-bold mt-2 mb-4">Filmes populares</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {movies.map((movie: any) => {
          const year = new Date(movie.release_date).getFullYear();
          return (
            <Link key={movie.id} href={`/movie/${movie.id}`} passHref>
              <Card className="flex flex-col rounded-xl shadow-lg overflow-hidden hover:bg-neutral-800 transition-all duration-300 cursor-pointer">
                <CardContent className="flex flex-col h-full mt-3">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={200}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <CardTitle className="text-sm mt-2 flex items-center justify-between">
                    <span className="truncate">{movie.title}</span>
                    <span className="text-gray-500 text-sm">{year}</span>
                  </CardTitle>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PopularMovies;
