import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, X } from 'lucide-react';
import { Track } from '@/types/music';
import { motion, AnimatePresence } from 'framer-motion';

interface PlayerProps {
  track: Track | null;
  onClose: () => void;
}

export function Player({ track, onClose }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (track && audioRef.current) {
      const audio = audioRef.current;
      audio.src = track.previewUrl;
      
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
        setError(null);
      };
      
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };
      
      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };
      
      const handleError = () => {
        setError('Unable to load audio preview');
        setIsPlaying(false);
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
      };
    }
  }, [track]);

  const togglePlayPause = () => {
    if (!audioRef.current || !track) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        setError('Unable to play audio preview');
      });
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    if (!duration) return 0;
    return (currentTime / duration) * 100;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  if (!track) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-card border-t dark:border-gray-700 p-4 shadow-2xl z-40"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        data-testid="player-container"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <img 
              src={track.artworkUrl100?.replace('100x100', '60x60') || 'https://via.placeholder.com/60x60/374151/9CA3AF?text=No+Image'}
              alt={`${track.trackName} album cover`}
              className="w-15 h-15 object-cover rounded-lg"
              data-testid="img-player-album"
            />
            <div className="min-w-0">
              <h4 className="font-medium truncate" title={track.trackName} data-testid="text-player-track">
                {track.trackName}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate" title={track.artistName} data-testid="text-player-artist">
                {track.artistName}
              </p>
              {error && (
                <p className="text-xs text-red-500" data-testid="text-player-error">
                  {error}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mx-6">
            <button 
              className="p-2 hover:text-spotify-green transition-colors duration-200"
              disabled
              data-testid="button-previous"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button 
              onClick={togglePlayPause}
              disabled={!!error}
              className="bg-spotify-green hover:bg-green-600 text-white p-3 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="button-play-pause"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
            </button>
            <button 
              className="p-2 hover:text-spotify-green transition-colors duration-200"
              disabled
              data-testid="button-next"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4 flex-1 justify-end">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <span data-testid="text-current-time">{formatTime(currentTime)}</span>
              <div 
                className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-1 cursor-pointer"
                onClick={handleProgressClick}
                data-testid="progress-bar"
              >
                <div 
                  className="bg-spotify-green h-1 rounded-full transition-all duration-100"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
              <span data-testid="text-duration">{formatTime(duration)}</span>
            </div>
            <button className="p-2 hover:text-spotify-green transition-colors duration-200" data-testid="button-volume">
              <Volume2 className="w-5 h-5" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:text-red-400 transition-colors duration-200"
              data-testid="button-close-player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <audio ref={audioRef} data-testid="audio-element" />
      </motion.div>
    </AnimatePresence>
  );
}
