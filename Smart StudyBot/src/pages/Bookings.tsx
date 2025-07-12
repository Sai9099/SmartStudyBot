import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Ticket, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Bookings() {
  const { state } = useApp();

  if (!state.user) {
    return (
      <div className="min-h-screen bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Login Required</h2>
            <p className="text-gray-400 mb-8">
              Please log in to view your bookings
            </p>
            <Link
              to="/login"
              className="bg-yellow-600 hover:bg-yellow-500 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (state.bookings.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Ticket className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">No Bookings Yet</h2>
            <p className="text-gray-400 mb-8">
              You haven't made any bookings yet. Browse our movies and book your first show!
            </p>
            <Link
              to="/"
              className="bg-yellow-600 hover:bg-yellow-500 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Browse Movies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">My Bookings</h1>
        
        <div className="space-y-6">
          {state.bookings.map(booking => (
            <div key={booking.id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Booking #{booking.id}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Booked on {new Date(booking.bookingDate).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-400">
                    ${booking.total.toFixed(2)}
                  </div>
                  <div className={`text-sm font-medium ${
                    booking.status === 'confirmed' ? 'text-green-400' :
                    booking.status === 'pending' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {booking.items.map((item, index) => (
                  <div key={item.id} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{item.movieTitle}</h4>
                      <span className="text-gray-300">
                        {item.quantity} ticket{item.quantity > 1 ? 's' : ''}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-300">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{item.time}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{item.theater}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}