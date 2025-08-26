import { Link, useLocation } from 'wouter';
import { Heart, Home, Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { useFavorites } from '@/hooks/use-favorites';
import { useState } from 'react';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  return (
    <nav className="bg-white dark:bg-dark-card shadow-sm dark:shadow-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <i className="fas fa-music text-2xl text-spotify-green"></i>
            <span className="text-xl font-bold">MusicFinder</span>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <a 
                className={`nav-link flex items-center transition-colors duration-200 ${
                  isActive('/') 
                    ? 'text-spotify-green font-medium border-b-2 border-spotify-green pb-1' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-spotify-green'
                }`}
                data-testid="link-home"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </a>
            </Link>
            <Link href="/favorites">
              <a 
                className={`nav-link flex items-center transition-colors duration-200 ${
                  isActive('/favorites') 
                    ? 'text-spotify-green font-medium border-b-2 border-spotify-green pb-1' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-spotify-green'
                }`}
                data-testid="link-favorites"
              >
                <Heart className="w-4 h-4 mr-2" />
                Favorites 
                {favorites.length > 0 && (
                  <span className="bg-spotify-green text-white text-xs px-2 py-1 rounded-full ml-2">
                    {favorites.length}
                  </span>
                )}
              </a>
            </Link>
          </div>
          
          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-hover hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              data-testid="button-theme-toggle"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-dark-hover"
              data-testid="button-mobile-menu"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-50 dark:bg-dark-bg border-t dark:border-gray-700">
          <div className="px-4 py-3 space-y-2">
            <Link href="/">
              <a 
                className={`mobile-nav-link flex items-center py-2 transition-colors duration-200 ${
                  isActive('/') ? 'text-spotify-green font-medium' : 'text-gray-600 dark:text-gray-400'
                }`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid="link-home-mobile"
              >
                <Home className="w-4 h-4 mr-3" />
                Home
              </a>
            </Link>
            <Link href="/favorites">
              <a 
                className={`mobile-nav-link flex items-center py-2 transition-colors duration-200 ${
                  isActive('/favorites') ? 'text-spotify-green font-medium' : 'text-gray-600 dark:text-gray-400'
                }`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid="link-favorites-mobile"
              >
                <Heart className="w-4 h-4 mr-3" />
                Favorites 
                {favorites.length > 0 && (
                  <span className="bg-spotify-green text-white text-xs px-2 py-1 rounded-full ml-2">
                    {favorites.length}
                  </span>
                )}
              </a>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
