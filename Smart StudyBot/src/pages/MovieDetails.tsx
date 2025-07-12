import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Calendar, MapPin, Users, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Showtime } from '../types';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);

  const movie = state.movies.find(m => m.id === id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Movie not found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-yellow-600 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedShowtime) return;

    const cartItem = {
      id: `${selectedShowtime.id}-${Date.now()}`,
      movieId: movie.id,
      movieTitle: movie.title,
      showtimeId: selectedShowtime.id,
      date: selectedShowtime.date,
      time: selectedShowtime.time,
      theater: selectedShowtime.theater,
      quantity: ticketQuantity,
      price: selectedShowtime.price,
      seats: [] // In a real app, this would be filled by seat selection
    };

    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px]">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded-lg hover:bg-opacity-70 transition-all"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Movie Poster */}
          <div className="flex-shrink-0">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-64 h-96 object-cover rounded-lg shadow-2xl mx-auto lg:mx-0"
            />
          </div>

          {/* Movie Info */}
          <div className="flex-1 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex items-center space-x-6 mb-6 text-gray-300">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{movie.rating}/10</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>{movie.duration} min</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(movie.releaseDate).getFullYear()}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genre.map(genre => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Synopsis</h3>
              <p className="text-gray-300 leading-relaxed">{movie.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Director</h3>
              <p className="text-gray-300">{movie.director}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Cast</h3>
              <p className="text-gray-300">{movie.cast.join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Showtimes */}
        <div className="mt-12 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Showtimes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {movie.showtimes.map(showtime => (
              <div
                key={showtime.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedShowtime?.id === showtime.id
                    ? 'border-yellow-500 bg-yellow-500 bg-opacity-10'
                    : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                }`}
                onClick={() => setSelectedShowtime(showtime)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-white">
                    {showtime.time}
                  </span>
                  <span className="text-yellow-400 font-bold">
                    ${showtime.price}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-300 text-sm mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(showtime.date).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-300 text-sm mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{showtime.theater}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <Users className="h-4 w-4" />
                  <span>{showtime.availableSeats} seats available</span>
                </div>
              </div>
            ))}
          </div>

          {selectedShowtime && (
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Complete Your Booking</h3>
              
              <div className="flex items-center space-x-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Number of Tickets
                  </label>
                  <select
                    value={ticketQuantity}
                    onChange={(e) => setTicketQuantity(Number(e.target.value))}
                    className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-yellow-500 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex-1">
                  <div className="text-sm text-gray-300 mb-1">Total Price</div>
                  <div className="text-2xl font-bold text-yellow-400">
                    ${(selectedShowtime.price * ticketQuantity).toFixed(2)}
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="w-full bg-yellow-600 hover:bg-yellow-500 text-white py-3 px-6 rounded-lg font-medium text-lg transition-colors"
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}