import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, Ticket } from 'lucide-react';
import { BookingConfirmation } from '../types';

export default function Confirmation() {
  const location = useLocation();
  const booking = location.state?.booking as BookingConfirmation;

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Booking not found</h2>
          <Link
            to="/"
            className="bg-yellow-600 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h1>
          <p className="text-gray-400">
            Your tickets have been successfully booked. Save this confirmation for your records.
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <div className="border-b border-gray-700 pb-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Booking Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-gray-400">Booking ID:</span>
                <span className="text-white font-mono ml-2">{booking.id}</span>
              </div>
              <div>
                <span className="text-gray-400">Booking Date:</span>
                <span className="text-white ml-2">
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Status:</span>
                <span className="text-green-400 font-semibold ml-2 capitalize">
                  {booking.status}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Total Amount:</span>
                <span className="text-yellow-400 font-bold text-lg ml-2">
                  ${booking.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-4">Your Tickets</h3>
          <div className="space-y-4">
            {booking.items.map((item, index) => (
              <div key={item.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">
                      {item.movieTitle}
                    </h4>
                    <div className="text-sm text-gray-300">
                      Ticket #{index + 1}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-400">
                      {item.quantity} ticket(s)
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Clock className="h-4 w-4" />
                    <span>{item.time}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-300">
                    <MapPin className="h-4 w-4" />
                    <span>{item.theater}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <Ticket className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h3 className="text-yellow-800 font-semibold mb-1">Important Information</h3>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• Please arrive at the theater 15 minutes before the show time</li>
                <li>• Bring a valid ID for verification</li>
                <li>• Screenshots of this confirmation are accepted</li>
                <li>• Contact customer support for any changes or cancellations</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/bookings"
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-medium text-center transition-colors"
          >
            View My Bookings
          </Link>
          
          <Link
            to="/"
            className="bg-yellow-600 hover:bg-yellow-500 text-white px-8 py-3 rounded-lg font-medium text-center transition-colors"
          >
            Book More Movies
          </Link>
        </div>
      </div>
    </div>
  );
}