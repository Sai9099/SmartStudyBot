import React, { useState, useMemo } from 'react';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { useApp } from '../context/AppContext';

export default function Home() {
  const { state } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    state.movies.forEach(movie => {
      movie.genre.forEach(g => genres.add(g));
    });
    return Array.from(genres).sort();
  }, [state.movies]);

  const filteredMovies = useMemo(() => {
    return state.movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           movie.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesGenre = !selectedGenre || movie.genre.includes(selectedGenre);
      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, selectedGenre, state.movies]);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-center w-full">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Welcome to <span className="text-yellow-400">CineMax</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Book your favorite movies with the best cinema experience
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchBar
          onSearch={setSearchQuery}
          onGenreFilter={setSelectedGenre}
          genres={allGenres}
          selectedGenre={selectedGenre}
        />

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Now Showing</h2>
          <p className="text-gray-400">
            {filteredMovies.length} movie{filteredMovies.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {filteredMovies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No movies found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}