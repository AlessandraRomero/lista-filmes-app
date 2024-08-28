'use client';
import axios from 'axios';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardTitle } from './ui/card';
import { Input } from './ui/input';


const SearchMovies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/movies/search?query=${encodeURIComponent(query)}`);
      setMovies(response.data.results);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Failed to fetch movies');
      } else {
        setError('Failed to fetch movies');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Buscar Filmes</h1>
      <form onSubmit={handleSearch} className="mb-2 flex justify-center items-center">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Digite o título do filme"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2 rounded-l w-96"
          />
          <Button type="submit" className="p-2 rounded-r">Pesquisar</Button>
        </div>
      </form>
      {loading && <div className="text-center">Pesquisando...</div>}
      {error && <div className="text-red-500 text-sm text-center mb-2">{error}</div>}
      <div className="flex justify-center">
        <Link
          href="/favorites"
          className=" hover:text-indigo-500 transition-colors duration-300"
          title='Ir para minha lista de favoritos'
        >
          Meus Favoritos
        </Link>
      </div>
      <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {movies.map((movie: any) => {
          const year = new Date(movie.release_date).getFullYear();
          return (
            <Link key={movie.id} href={`/movie/${movie.id}`} passHref>
              <Card key={movie.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden hover:bg-neutral-800 transition-all duration-300">
                <CardContent className="flex flex-col h-full mt-2">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={200}
                    height={300}
                    className="w-full h-auto object-cover"
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

export default SearchMovies;
