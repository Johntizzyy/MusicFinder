import { useState } from 'react';
import { Heart, Play } from 'lucide-react';
import { Track } from '@/types/music';
import { useFavorites } from '@/hooks/use-favorites';
import { motion } from 'framer-motion';

interface TrackCardProps {
  track: Track;
  onPlay: (track: Track) => void;
}

export function TrackCard({ track, onPlay }: TrackCardProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const [imageError, setImageError] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(track.trackId)) {
      removeFromFavorites(track.trackId);
    } else {
      addToFavorites(track);
    }
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay(track);
  };

  const getImageUrl = () => {
    if (imageError || !track.artworkUrl100) {
      return 'https://via.placeholder.com/400x400/374151/9CA3AF?text=No+Image';
    }
    return track.artworkUrl100.replace('100x100', '400x400');
  };

  return (
    <motion.div 
      className="track-card bg-white dark:bg-dark-card rounded-xl shadow-sm hover:shadow-lg dark:shadow-gray-800 hover:dark:shadow-gray-700 transition-all duration-300 group cursor-pointer"
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      data-testid={`card-track-${track.trackId}`}
    >
      <div className="p-4">
        <div className="relative mb-4">
          <img 
            src={getImageUrl()}
            alt={`${track.trackName} album cover`}
            className="w-full aspect-square object-cover rounded-lg"
            onError={() => setImageError(true)}
            data-testid={`img-album-${track.trackId}`}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
            <button 
              onClick={handlePlayClick}
              className="play-btn opacity-0 group-hover:opacity-100 bg-spotify-green hover:bg-green-600 text-white p-3 rounded-full transition-all duration-200 transform scale-90 group-hover:scale-100"
              data-testid={`button-play-${track.trackId}`}
            >
              <Play className="w-5 h-5 ml-1" />
            </button>
          </div>
          <button 
            onClick={handleFavoriteClick}
            className={`favorite-btn absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full transition-colors duration-200 ${
              isFavorite(track.trackId) 
                ? 'text-red-400 hover:text-red-300' 
                : 'text-white hover:text-red-400'
            }`}
            data-testid={`button-favorite-${track.trackId}`}
          >
            <Heart className={`w-4 h-4 ${isFavorite(track.trackId) ? 'fill-current' : ''}`} />
          </button>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold truncate" title={track.trackName} data-testid={`text-track-name-${track.trackId}`}>
            {track.trackName}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 truncate" title={track.artistName} data-testid={`text-artist-${track.trackId}`}>
            {track.artistName}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 truncate" title={track.collectionName} data-testid={`text-album-${track.trackId}`}>
            {track.collectionName}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
