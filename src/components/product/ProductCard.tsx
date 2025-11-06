import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import type { Product } from '@/types';
import { formatCurrency, calculateDiscount } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/useToast';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { showToast } = useToast();  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    showToast({
      type: 'success',
      title: 'Adicionado ao carrinho',
      message: `${product.name} foi adicionado ao seu carrinho`,
      groupKey: 'add-to-cart', // Agrupa todos os toasts de adicionar ao carrinho
    });
  };

  const discount = calculateDiscount(product.price, product.originalPrice);

  return (
    <motion.div
      className="group relative h-full"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${product.slug}`} className="block h-full">
        <div className="bg-background-elevated rounded-xl border border-neutral-800 overflow-hidden shadow-md hover:shadow-glow transition-shadow h-full flex flex-col">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-neutral-900">
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.alt || product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            
            {/* Badges */}
            <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex flex-col gap-1 sm:gap-2">
              {discount > 0 && (
                <Badge variant="error" size="sm">
                  -{discount}%
                </Badge>
              )}
              {product.tags.includes('bestseller') && (
                <Badge variant="brand" size="sm">
                  <span className="hidden sm:inline">Mais vendido</span>
                  <span className="sm:hidden">Top</span>
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="default" size="sm">
                  Esgotado
                </Badge>
              )}
            </div>

            {/* Quick Add Button */}
            {product.inStock && (
              <motion.div
                className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                initial={false}
              >
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleAddToCart}
                  aria-label={`Adicionar ${product.name} ao carrinho`}
                  leftIcon={<ShoppingCart className="w-4 h-4" />}
                  className="hidden sm:flex"
                >
                  Adicionar
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleAddToCart}
                  aria-label={`Adicionar ${product.name} ao carrinho`}
                  className="sm:hidden p-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="p-3 sm:p-4 flex-1 flex flex-col">
            {/* Category */}
            <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
              {product.category.name}
            </p>

            {/* Title */}
            <h3 className="text-sm sm:text-base text-neutral-100 font-semibold mb-2 line-clamp-2 group-hover:text-brand-400 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2 sm:mb-3">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-500 text-yellow-500" />
              <span className="text-xs sm:text-sm text-neutral-300">{product.rating.toFixed(1)}</span>
              <span className="text-xs text-neutral-500">({product.reviewCount})</span>
            </div>

            {/* Price - Push to bottom */}
            <div className="flex items-baseline gap-2 mt-auto">
              <span className="text-lg sm:text-xl font-bold text-brand-400">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs sm:text-sm text-neutral-500 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Short Description (hidden on mobile, shown on hover on desktop) */}
            <p className="hidden lg:block text-sm text-neutral-400 mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {product.shortDescription}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
