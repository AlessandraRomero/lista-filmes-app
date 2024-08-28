export type FavoriteMovie = {
  movieId: string;
};
export const generateShareableLink = (favorites: FavoriteMovie[]) => {
  const movieIds = favorites.map(movie => movie.movieId).join(',');
  const baseUrl = 'http://localhost:3000/favorites';
  return `${baseUrl}?ids=${encodeURIComponent(movieIds)}`;
};
