import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-96 object-cover"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-lg flex items-center space-x-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{movie.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{movie.title}</h3>
        
        <div className="flex items-center space-x-2 text-gray-300 text-sm mb-3">
          <Clock className="h-4 w-4" />
          <span>{movie.duration} min</span>
          <span>•</span>
          <span>{movie.genre.join(', ')}</span>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{movie.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-300">
            {movie.showtimes.length} showtimes
          </div>
          <Link
            to={`/movie/${movie.id}`}
            className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}