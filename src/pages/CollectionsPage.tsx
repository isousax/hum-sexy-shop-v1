import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Heart, User, Zap, Droplet, Shirt, Gift, Lock, Grid3x3, LayoutGrid, Leaf } from 'lucide-react';
import { categories } from '@/mocks/categories';
import { productsApi } from '@/services/api';
import type { Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 text-brand-400" />,
  Heart: <Heart className="w-5 h-5 text-brand-400" />,
  User: <User className="w-5 h-5 text-brand-400" />,
  Zap: <Zap className="w-5 h-5 text-brand-400" />,
  Droplet: <Droplet className="w-5 h-5 text-brand-400" />,
  Shirt: <Shirt className="w-5 h-5 text-brand-400" />,
  Gift: <Gift className="w-5 h-5 text-brand-400" />,
  Lock: <Lock className="w-5 h-5 text-brand-400" />,
  Leaf: <Leaf className="w-5 h-5 text-brand-400" />,
};

export default function CollectionsPage() {
  const [viewMode, setViewMode] = useState<'categories' | 'products'>('products');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await productsApi.getAll();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category.slug === selectedCategory)
    : products;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-100 mb-4">
            {viewMode === 'categories' ? 'Todas as Categorias' : 'Todos os Produtos'}
          </h1>
          <p className="text-neutral-400">
            {viewMode === 'categories' 
              ? 'Explore nossa seleção completa de categorias' 
              : `${filteredProducts.length} produtos encontrados`}
          </p>
        </div>

        {/* View Toggle */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2 bg-background-elevated border border-neutral-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('products')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'products'
                  ? 'bg-brand-500 text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
              Ver Produtos
            </button>
            <button
              onClick={() => setViewMode('categories')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'categories'
                  ? 'bg-brand-500 text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Ver Categorias
            </button>
          </div>
        </div>

        {/* Category Filter (only in products view) */}
        {viewMode === 'products' && (
          <div className="mb-8 border-b border-neutral-800 pb-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === null
                    ? 'bg-brand-500 text-white'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                Todos ({products.length})
              </button>
              {categories.map((category) => {
                const count = products.filter((p) => p.category.slug === category.slug).length;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                      selectedCategory === category.slug
                        ? 'bg-brand-500 text-white'
                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                    }`}
                  >
                    <span className="flex items-center justify-center w-5 h-5">
                      {category.icon && iconMap[category.icon]}
                    </span>
                    {category.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Content */}
        {viewMode === 'categories' ? (
          // Categories Grid
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/collections/${category.slug}`}
                className="group h-full"
              >
                <div className="bg-background-elevated border border-neutral-800 rounded-xl p-6 hover:border-brand-500 transition-all hover:shadow-glow h-full flex flex-col">
                  <div className="w-12 h-12 bg-brand-900/30 rounded-full flex items-center justify-center mb-4">
                    {category.icon && iconMap[category.icon] ? (
                      <span className="flex items-center justify-center">
                        {iconMap[category.icon]}
                      </span>
                    ) : (
                      <Gift className="w-6 h-6 text-brand-400" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-100 mb-2 group-hover:text-brand-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-neutral-400 text-sm mb-4 flex-1">{category.description}</p>
                  <div className="flex items-center text-brand-400 text-sm font-medium mt-auto">
                    Ver produtos <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Products Grid
          <>
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-background-elevated rounded-xl h-80 animate-pulse"
                  />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                layout
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    layout
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <p className="text-neutral-400 text-lg mb-4">
                  Nenhum produto encontrado nesta categoria.
                </p>
                <Button onClick={() => setSelectedCategory(null)}>
                  Ver todos os produtos
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

