
import React from 'react';
import { Calendar, Star } from 'lucide-react';
import { Movie } from '../types/Movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const handleCardClick = () => {
    // Open IMDb page in new tab
    window.open(`https://www.imdb.com/title/${movie.imdbID}`, '_blank');
  };

  return (
    <div 
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
      onClick={handleCardClick}
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
        {/* Movie Poster */}
        <div className="aspect-[2/3] overflow-hidden relative">
          {movie.Poster && movie.Poster !== 'N/A' ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
              <div className="text-4xl">🎬</div>
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Year Badge */}
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg">
            <div className="flex items-center space-x-1 text-white text-sm">
              <Calendar className="h-3 w-3" />
              <span>{movie.Year}</span>
            </div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3 className="font-semibold text-white text-lg leading-tight mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
            {movie.Title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-blue-200">
            <span className="capitalize bg-blue-500/20 px-2 py-1 rounded-lg">
              {movie.Type}
            </span>
            
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>IMDb</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
