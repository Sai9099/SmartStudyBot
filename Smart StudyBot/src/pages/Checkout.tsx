import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, User, Mail, Phone, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Checkout() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: state.user?.name || '',
    email: state.user?.email || '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const totalAmount = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const booking = {
      id: `BK${Date.now()}`,
      userId: state.user?.id,
      items: [...state.cart],
      total: totalAmount,
      bookingDate: new Date().toISOString(),
      status: 'confirmed' as const
    };

    dispatch({ type: 'ADD_BOOKING', payload: booking });
    dispatch({ type: 'CLEAR_CART' });
    
    navigate('/confirmation', { state: { booking } });
  };

  if (state.cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Summary */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Booking Summary</h2>
            
            <div className="space-y-4 mb-6">
              {state.cart.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-700">
                  <div>
                    <div className="text-white font-medium">{item.movieTitle}</div>
                    <div className="text-sm text-gray-400">
                      {new Date(item.date).toLocaleDateString()} • {item.time} • {item.theater}
                    </div>
                    <div className="text-sm text-gray-400">
                      {item.quantity} ticket(s)
                    </div>
                  </div>
                  <div className="text-white font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-white">Total</span>
                <span className="text-yellow-400">${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Payment Form */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Payment Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <User className="inline h-4 w-4 mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-yellow-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-yellow-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Phone className="inline h-4 w-4 mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-yellow-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <CreditCard className="inline h-4 w-4 mr-2" />
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  required
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-yellow-500 focus:outline-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    required
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-yellow-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    required
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-yellow-500 focus:outline-none"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Complete Booking (${totalAmount.toFixed(2)})
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}