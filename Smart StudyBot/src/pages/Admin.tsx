import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Save, X, Upload, Image } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Movie, Showtime } from '../types';

export default function Admin() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [isAddingMovie, setIsAddingMovie] = useState(false);
  const [formData, setFormData] = useState<Partial<Movie>>({});

  // Check if user is admin
  if (!state.user?.isAdmin) {
    navigate('/');
    return null;
  }

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
    setFormData(movie);
    setIsAddingMovie(false);
  };

  const handleAddNew = () => {
    setIsAddingMovie(true);
    setEditingMovie(null);
    setFormData({
      title: '',
      genre: [],
      rating: 0,
      duration: 0,
      description: '',
      poster: '',
      backdrop: '',
      releaseDate: '',
      director: '',
      cast: [],
      showtimes: []
    });
  };

  const handleSave = () => {
    if (!formData.title || !formData.description) return;

    const movieData: Movie = {
      id: editingMovie?.id || `movie_${Date.now()}`,
      title: formData.title || '',
      genre: formData.genre || [],
      rating: formData.rating || 0,
      duration: formData.duration || 0,
      description: formData.description || '',
      poster: formData.poster || 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
      backdrop: formData.backdrop || 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      releaseDate: formData.releaseDate || new Date().toISOString().split('T')[0],
      director: formData.director || '',
      cast: formData.cast || [],
      showtimes: formData.showtimes || []
    };

    if (isAddingMovie) {
      dispatch({ type: 'ADD_MOVIE', payload: movieData });
    } else {
      dispatch({ type: 'UPDATE_MOVIE', payload: movieData });
    }

    setEditingMovie(null);
    setIsAddingMovie(false);
    setFormData({});
  };

  const handleDelete = (movieId: string) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      dispatch({ type: 'DELETE_MOVIE', payload: movieId });
    }
  };

  const handleCancel = () => {
    setEditingMovie(null);
    setIsAddingMovie(false);
    setFormData({});
  };

  const handleInputChange = (field: keyof Movie, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (field: 'poster' | 'backdrop', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleInputChange(field, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addShowtime = () => {
    const newShowtime: Showtime = {
      id: `showtime_${Date.now()}`,
      movieId: formData.id || '',
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
      theater: 'Theater 1',
      price: 14.99,
      availableSeats: 50
    };
    
    handleInputChange('showtimes', [...(formData.showtimes || []), newShowtime]);
  };

  const updateShowtime = (index: number, field: keyof Showtime, value: any) => {
    const updatedShowtimes = [...(formData.showtimes || [])];
    updatedShowtimes[index] = { ...updatedShowtimes[index], [field]: value };
    handleInputChange('showtimes', updatedShowtimes);
  };

  const removeShowtime = (index: number) => {
    const updatedShowtimes = [...(formData.showtimes || [])];
    updatedShowtimes.splice(index, 1);
    handleInputChange('showtimes', updatedShowtimes);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Movie Management</h1>
          <button
            onClick={handleAddNew}
            className="bg-yellow-600 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Movie</span>
          </button>
        </div>

        {(editingMovie || isAddingMovie) && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                {isAddingMovie ? 'Add New Movie' : 'Edit Movie'}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-yellow-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-yellow-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={formData.rating || ''}
                      onChange={(e) => handleInputChange('rating', parseFloat(e.target.value))}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-yellow-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Duration (min)</label>
                    <input
                      type="number"
                      value={formData.duration || ''}
                      onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-yellow-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Director</label>
                  <input
                    type="text"
                    value={formData.director || ''}
                    onChange={(e) => handleInputChange('director', e.target.value)}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-yellow-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Release Date</label>
                  <input
                    type="date"
                    value={formData.releaseDate || ''}
                    onChange={(e) => handleInputChange('releaseDate', e.target.value)}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-yellow-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Genres (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.genre?.join(', ') || ''}
                    onChange={(e) => handleInputChange('genre', e.target.value.split(',').map(g => g.trim()))}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-yellow-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cast (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.cast?.join(', ') || ''}
                    onChange={(e) => handleInputChange('cast', e.target.value.split(',').map(c => c.trim()))}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-yellow-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Poster Image</label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Image URL or upload file below"
                      value={formData.poster || ''}
                      onChange={(e) => handleInputChange('poster', e.target.value)}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-yellow-500 focus:outline-none"
                    />
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload('poster', e)}
                        className="hidden"
                        id="poster-upload"
                      />
                      <label
                        htmlFor="poster-upload"
                        className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 rounded-lg cursor-pointer flex items-center space-x-2"
                      >
                        <Upload className="h-4 w-4" />
                        <span>Upload</span>
                      </label>
                    </div>
                    {formData.poster && (
                      <img
                        src={formData.poster}
                        alt="Poster preview"
                        className="w-32 h-48 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Backdrop Image</label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Image URL or upload file below"
                      value={formData.backdrop || ''}
                      onChange={(e) => handleInputChange('backdrop', e.target.value)}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:border-yellow-500 focus:outline-none"
                    />
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload('backdrop', e)}
                        className="hidden"
                        id="backdrop-upload"
                      />
                      <label
                        htmlFor="backdrop-upload"
                        className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 rounded-lg cursor-pointer flex items-center space-x-2"
                      >
                        <Upload className="h-4 w-4" />
                        <span>Upload</span>
                      </label>
                    </div>
                    {formData.backdrop && (
                      <img
                        src={formData.backdrop}
                        alt="Backdrop preview"
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Showtimes */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Showtimes</h3>
                <button
                  onClick={addShowtime}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Showtime</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.showtimes?.map((showtime, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      <input
                        type="date"
                        value={showtime.date}
                        onChange={(e) => updateShowtime(index, 'date', e.target.value)}
                        className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm"
                      />
                      <input
                        type="time"
                        value={showtime.time}
                        onChange={(e) => updateShowtime(index, 'time', e.target.value)}
                        className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Theater"
                        value={showtime.theater}
                        onChange={(e) => updateShowtime(index, 'theater', e.target.value)}
                        className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm"
                      />
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        value={showtime.price}
                        onChange={(e) => updateShowtime(index, 'price', parseFloat(e.target.value))}
                        className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm"
                      />
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          placeholder="Seats"
                          value={showtime.availableSeats}
                          onChange={(e) => updateShowtime(index, 'availableSeats', parseInt(e.target.value))}
                          className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm flex-1"
                        />
                        <button
                          onClick={() => removeShowtime(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Movies List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.movies.map(movie => (
            <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">{movie.title}</h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{movie.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 font-medium">{movie.rating}/10</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(movie)}
                      className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(movie.id)}
                      className="bg-red-600 hover:bg-red-500 text-white p-2 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}