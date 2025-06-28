
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types/Movie';

const Index = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Using OMDB API for movie search
      const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=trilogy`);
      const data = await response.json();
      
      if (data.Response === 'True') {
        setMovies(data.Search || []);
      } else {
        setError(data.Error || 'No movies found');
        setMovies([]);
      }
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-2">
            🎬 <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">MovieFinder</span>
          </h1>
          <p className="text-blue-200 text-center text-lg">Discover your next favorite movie</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-6 py-8">
        <SearchBar onSearch={handleSearch} loading={loading} />
        
        {/* Error Message */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
            <p className="text-blue-200 mt-4">Searching movies...</p>
          </div>
        )}

        {/* Movies Grid */}
        {movies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}

        {/* Welcome Message */}
        {!loading && movies.length === 0 && !error && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍿</div>
            <h2 className="text-2xl font-semibold text-white mb-4">Ready to discover amazing movies?</h2>
            <p className="text-blue-200 text-lg">Start by searching for your favorite movie or genre above</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
