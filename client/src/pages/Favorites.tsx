import { useState } from 'react';
import { Heart, Play, Trash2, Search } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';
import { Player } from '@/components/Player';
import { ErrorToast } from '@/components/ErrorToast';
import { Track } from '@/types/music';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';

export default function Favorites() {
  const { favorites, removeFromFavorites, clearAllFavorites } = useFavorites();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePlayTrack = (track: Track) => {
    if (!track.previewUrl) {
      setError('No preview available for this track');
      return;
    }
    setCurrentTrack(track);
  };

  const handleRemoveFavorite = (trackId: number) => {
    removeFromFavorites(trackId);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      clearAllFavorites();
    }
  };

  const handleClosePlayer = () => {
    setCurrentTrack(null);
  };

  const handleErrorDismiss = () => {
    setError(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Favorites</h1>
          <p className="text-gray-600 dark:text-gray-400">Your personally curated music collection</p>
        </div>
        {favorites.length > 0 && (
          <button 
            onClick={handleClearAll}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            data-testid="button-clear-all"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>
      
      {/* Favorites Empty State */}
      {favorites.length === 0 && (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          data-testid="empty-favorites"
        >
          <Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start building your collection by favoriting tracks you love
          </p>
          <Link href="/">
            <a className="bg-spotify-green hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 inline-flex items-center space-x-2" data-testid="link-start-searching">
              <Search className="w-4 h-4" />
              <span>Start Searching</span>
            </a>
          </Link>
        </motion.div>
      )}
      
      {/* Favorites List */}
      {favorites.length > 0 && (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          data-testid="favorites-list"
        >
          <AnimatePresence>
            {favorites.map((track, index) => (
              <motion.div 
                key={track.trackId}
                className="favorite-track bg-white dark:bg-dark-card rounded-xl p-4 shadow-sm hover:shadow-lg dark:shadow-gray-800 transition-all duration-300 group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                data-testid={`favorite-track-${track.trackId}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      src={track.artworkUrl100?.replace('100x100', '80x80') || 'https://via.placeholder.com/80x80/374151/9CA3AF?text=No+Image'}
                      alt={`${track.trackName} album cover`}
                      className="w-20 h-20 object-cover rounded-lg"
                      data-testid={`img-favorite-album-${track.trackId}`}
                    />
                    <button 
                      onClick={() => handlePlayTrack(track)}
                      className="play-btn-small absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                      data-testid={`button-play-favorite-${track.trackId}`}
                    >
                      <Play className="w-6 h-6 text-white" />
                    </button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate" title={track.trackName} data-testid={`text-favorite-track-${track.trackId}`}>
                      {track.trackName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 truncate" title={track.artistName} data-testid={`text-favorite-artist-${track.trackId}`}>
                      {track.artistName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 truncate" title={track.collectionName} data-testid={`text-favorite-album-${track.trackId}`}>
                      {track.collectionName}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handlePlayTrack(track)}
                      className="p-2 text-spotify-green hover:text-green-600 transition-colors duration-200"
                      data-testid={`button-play-main-${track.trackId}`}
                    >
                      <Play className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleRemoveFavorite(track.trackId)}
                      className="p-2 text-red-500 hover:text-red-600 transition-colors duration-200"
                      data-testid={`button-remove-favorite-${track.trackId}`}
                    >
                      <Heart className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
      
      <Player track={currentTrack} onClose={handleClosePlayer} />
      <ErrorToast message={error} onDismiss={handleErrorDismiss} />
    </div>
  );
}
