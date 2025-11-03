import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchApi } from '@/services/api';
import type { SearchSuggestion } from '@/types';
import { debounce } from '@/lib/utils';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchDebounced = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchApi.search(searchQuery);
        setSuggestions(results);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    searchDebounced(query);
  }, [query, searchDebounced]);

  const handleSelect = (suggestion: SearchSuggestion) => {
    navigate(suggestion.url);
    onClose();
    setQuery('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      onClose();
      setQuery('');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="max-w-2xl mx-auto px-4 pt-20">
          <motion.div
            className="bg-background-elevated rounded-2xl shadow-2xl border border-neutral-800 overflow-hidden"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <form onSubmit={handleSubmit} className="p-4 border-b border-neutral-800">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar produtos, categorias..."
                  className="w-full pl-12 pr-12 py-4 bg-background-subtle border border-neutral-700 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  autoFocus
                  aria-label="Campo de busca"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                    aria-label="Limpar busca"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {isLoading && (
                <div className="p-8 text-center text-neutral-500">
                  Buscando...
                </div>
              )}

              {!isLoading && query && suggestions.length === 0 && (
                <div className="p-8 text-center text-neutral-500">
                  Nenhum resultado encontrado para "{query}"
                </div>
              )}

              {!isLoading && suggestions.length > 0 && (
                <ul className="divide-y divide-neutral-800">
                  {suggestions.map((suggestion) => (
                    <li key={suggestion.id}>
                      <button
                        onClick={() => handleSelect(suggestion)}
                        className="w-full p-4 hover:bg-neutral-800/50 transition-colors text-left flex items-center gap-4"
                      >
                        {suggestion.image && (
                          <img
                            src={suggestion.image}
                            alt=""
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        <div>
                          <p className="text-neutral-200 font-medium">
                            {suggestion.name}
                          </p>
                          <p className="text-xs text-neutral-500 capitalize">
                            {suggestion.type === 'product' ? 'Produto' : 'Categoria'}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-background-subtle border-t border-neutral-800 text-xs text-neutral-500 flex items-center justify-between">
              <span>Pressione ESC para fechar</span>
              <span>ENTER para buscar</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
