import { useState, useEffect } from 'react';
import { FavoriteTrack, Track } from '@/types/music';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteTrack[]>([]);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('musicFavorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
        setFavorites([]);
      }
    }
  }, []);

  const addToFavorites = (track: Track) => {
    const favoriteTrack: FavoriteTrack = {
      ...track,
      addedAt: new Date().toISOString(),
    };
    
    const newFavorites = [...favorites, favoriteTrack];
    setFavorites(newFavorites);
    localStorage.setItem('musicFavorites', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (trackId: number) => {
    const newFavorites = favorites.filter(track => track.trackId !== trackId);
    setFavorites(newFavorites);
    localStorage.setItem('musicFavorites', JSON.stringify(newFavorites));
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('musicFavorites');
  };

  const isFavorite = (trackId: number) => {
    return favorites.some(track => track.trackId === trackId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    clearAllFavorites,
    isFavorite,
  };
}
