import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';
import { SearchBar } from './SearchBar';
import { useLocation } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle keyboard shortcut for search (/)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isSearchOpen) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        if (isSearchOpen) {
          setIsSearchOpen(false);
        }
        if (isMenuOpen) {
          setIsMenuOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, isMenuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const isActiveLink = (path: string) => {
  if (path === '/') {
    return location.pathname === '/';
  }
  return location.pathname.startsWith(path);
};

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Produtos', path: '/collections' },
    { name: 'Iniciantes', path: '/collections/iniciantes' },
    { name: 'Casais', path: '/collections/casais' },
    { name: 'Blog', path: '/blog' },
    { name: 'Sobre', path: '/about' },
  ];

  return (
    <>
      {/* Top Banner */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900 via-pink-800 to-purple-900 text-white text-center py-3 text-sm font-medium"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
              <p className="text-xs sm:text-base">🚚 Frete grátis acima de R$ 299 • 📦 Entrega discreta</p>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className={cn(
          'fixed left-0 right-0 z-40 transition-all duration-300',
          scrolled 
            ? 'top-0 bg-background/95 backdrop-blur-md shadow-lg border-b border-neutral-800' 
            : 'top-8 bg-transparent'
        )}
      >
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${scrolled ? '' : 'mt-1'}`}>
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-brand-400 to-accent-500 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                <img src="logomarca.png" alt="Logo" className='h-10 w-20' />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-neutral-300 hover:text-brand-400 transition-colors duration-200 text-sm font-medium relative py-2",
                    isActiveLink(link.path) && "text-brand-400 font-semibold"
                  )}
                >
                  {link.name}
                  {/* Indicador visual da aba ativa */}
                  {isActiveLink(link.path) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full"
                      layoutId="activeTab"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-neutral-300 hover:text-brand-400 transition-colors flex items-center gap-1"
                aria-label="Buscar"
                title='Buscar'
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart */}
              <button
                onClick={() => navigate('/cart')}
                className="p-2 text-neutral-300 hover:text-brand-400 transition-colors relative"
                aria-label={`Carrinho com ${itemCount} itens`}
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-brand-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    {itemCount > 9 ? '9+' : itemCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-neutral-300 hover:text-brand-400 transition-colors"
                aria-label="Menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-80 bg-background-elevated border-l border-neutral-800 z-50 lg:hidden shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-800">
                <h2 className="text-xl font-bold bg-gradient-to-r from-brand-400 to-accent-500 bg-clip-text text-transparent">
                  Menu
                </h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-neutral-400 hover:text-neutral-100 transition-colors"
                  aria-label="Fechar menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="p-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 text-neutral-300 hover:bg-brand-500/10 hover:text-brand-400 rounded-lg transition-all duration-200 font-medium"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Sidebar Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-neutral-800 bg-background-subtle">
                <p className="text-xs text-neutral-500 text-center">
                  Compre com discrição e segurança
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}