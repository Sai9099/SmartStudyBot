import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, ShoppingCart, User, LogOut, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'SET_USER', payload: null });
    navigate('/');
  };

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 hover:text-yellow-400 transition-colors">
            <Film className="h-8 w-8" />
            <span className="text-xl font-bold">CineMax</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-yellow-400 transition-colors">
              Movies
            </Link>
            <Link to="/bookings" className="hover:text-yellow-400 transition-colors">
              My Bookings
            </Link>
            {state.user?.isAdmin && (
              <Link to="/admin" className="hover:text-yellow-400 transition-colors">
                Admin Panel
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {state.user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-300">
                  Hi, {state.user.name}
                  {state.user.isAdmin && <span className="text-yellow-400 ml-1">(Admin)</span>}
                </span>
                {state.user.isAdmin && (
                  <Link
                    to="/admin"
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <Settings className="h-5 w-5" />
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-500 rounded-lg transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}