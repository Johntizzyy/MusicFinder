import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading?: boolean;
}

export function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Discover Music</h1>
        <p className="text-gray-600 dark:text-gray-400">Search for your favorite songs, albums, and artists</p>
      </div>
      
      <div className="max-w-2xl mx-auto relative">
        <form onSubmit={handleSubmit} className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search for music..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className="w-full pl-12 pr-4 py-4 text-lg bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-spotify-green focus:border-transparent transition-all duration-200 shadow-sm disabled:opacity-50"
            data-testid="input-search"
          />
          <button 
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-spotify-green hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="button-search"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>
    </div>
  );
}
