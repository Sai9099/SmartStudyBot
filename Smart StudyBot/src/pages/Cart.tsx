import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Cart() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    } else {
      dispatch({ type: 'UPDATE_CART_ITEM', payload: { id: itemId, quantity: newQuantity } });
    }
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const totalAmount = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">
              Browse our movies and add some tickets to your cart
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
        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>
        
        <div className="space-y-6">
          {state.cart.map(item => (
            <div key={item.id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.movieTitle}
                  </h3>
                  
                  <div className="space-y-1 text-gray-300">
                    <p>Date: {new Date(item.date).toLocaleDateString()}</p>
                    <p>Time: {item.time}</p>
                    <p>Theater: {item.theater}</p>
                    <p className="font-semibold text-yellow-400">
                      ${item.price} per ticket
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-700 rounded"
                    >
                      <Minus className="h-4 w-4 text-gray-400" />
                    </button>
                    
                    <span className="text-white font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-700 rounded"
                    >
                      <Plus className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                  
                  <div className="text-xl font-bold text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Cart Summary */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-semibold text-white">Total</span>
            <span className="text-2xl font-bold text-yellow-400">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
          
          <div className="text-sm text-gray-400 mb-6">
            {state.cart.reduce((total, item) => total + item.quantity, 0)} ticket(s) in cart
          </div>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium text-center transition-colors"
            >
              Continue Shopping
            </Link>
            
            <button
              onClick={() => navigate('/checkout')}
              className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}