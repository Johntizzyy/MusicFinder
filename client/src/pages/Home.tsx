import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SearchBar } from '@/components/SearchBar';
import { TrackCard } from '@/components/TrackCard';
import { Player } from '@/components/Player';
import { ErrorToast } from '@/components/ErrorToast';
import { searchMusic } from '@/lib/itunes-api';
import { Track } from '@/types/music';
import { motion } from 'framer-motion';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: searchResults, isLoading, error: queryError } = useQuery({
    queryKey: ['music-search', searchQuery],
    queryFn: () => searchMusic(searchQuery),
    enabled: !!searchQuery,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setError(null);
  };

  const handlePlayTrack = (track: Track) => {
    if (!track.previewUrl) {
      setError('No preview available for this track');
      return;
    }
    setCurrentTrack(track);
  };

  const handleClosePlayer = () => {
    setCurrentTrack(null);
  };

  const handleErrorDismiss = () => {
    setError(null);
  };

  // Show query error as toast
  if (queryError && !error) {
    setError(queryError.message);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SearchBar onSearch={handleSearch} loading={isLoading} />
      
      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12" data-testid="loading-state">
          <div className="inline-flex items-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-spotify-green"></div>
            <span className="text-gray-600 dark:text-gray-400">Searching for music...</span>
          </div>
        </div>
      )}
      
      {/* Search Results */}
      {searchResults && searchResults.results.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          data-testid="search-results"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Search Results</h2>
            <span className="text-gray-600 dark:text-gray-400" data-testid="text-results-count">
              {searchResults.resultCount} tracks found
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.results.map((track, index) => (
              <motion.div
                key={track.trackId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TrackCard track={track} onPlay={handlePlayTrack} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* No Results */}
      {searchResults && searchResults.results.length === 0 && searchQuery && (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          data-testid="no-results"
        >
          <div className="text-6xl mb-4">🎵</div>
          <h3 className="text-xl font-semibold mb-2">No results found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try searching with different keywords or check your spelling
          </p>
        </motion.div>
      )}
      
      {/* Initial State */}
      {!searchQuery && (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          data-testid="initial-state"
        >
          <div className="text-6xl mb-4">🎸</div>
          <h3 className="text-xl font-semibold mb-2">Start discovering music</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Search for your favorite songs, albums, and artists above
          </p>
        </motion.div>
      )}
      
      <Player track={currentTrack} onClose={handleClosePlayer} />
      <ErrorToast message={error} onDismiss={handleErrorDismiss} />
    </div>
  );
}
