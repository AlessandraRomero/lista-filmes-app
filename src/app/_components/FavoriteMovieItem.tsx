import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';
import { Card } from './ui/card';

interface FavoriteMovieItemProps {
  movie: any;
  onRemove: (movieId: string) => void;
}

const FavoriteMovieItem: React.FC<FavoriteMovieItemProps> = ({ movie, onRemove }) => {
  return (
    <Card className="flex items-center shadow-lg bg-opacity-80  hover:bg-neutral-800 transition-all duration-300 rounded-xl p-4">
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={100}
        height={150}
        className="w-24 h-auto mr-4"
      />
      <div className="flex flex-col flex-1">
        <h2 className="text-xl font-bold text-white">{movie.title}</h2>
        <p className="text-white font-light">{movie.overview}</p>
      </div>
      <button
        onClick={() => onRemove(movie.id.toString())}
        className="text-red-500 hover:text-red-700"
        aria-label={`Remove ${movie.title} from favorites`}
        title="Remover da lista de favoritos"
      >
        <FaTrash />
      </button>
    </Card>
  );
};

export default FavoriteMovieItem;
