import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Crown, TrendingUp, Zap } from 'lucide-react';
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
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    showToast({
      type: 'success',
      title: 'Adicionado ao carrinho',
      message: `${product.name} foi adicionado ao seu carrinho`,
      groupKey: 'add-to-cart',
    });
  };

  const discount = calculateDiscount(product.price, product.originalPrice);

  // Badges para mobile (compactos)
  const getMobileBadges = () => {
    const badges = [];

    if (!product.inStock) {
      badges.push(
        <Badge key="out-of-stock" variant="error" size="xs">
          ⚠️
        </Badge>
      );
      return badges; // Se está esgotado, mostra apenas isso
    }

    if (discount > 0) {
      badges.push(
        <Badge key="discount" variant="error" size="xs">
          -{discount}%
        </Badge>
      );
    }

    if (product.tags.includes('bestseller') && badges.length < 2) {
      badges.push(
        <Badge key="bestseller" variant="premium" size="xs" icon={<Crown className="w-2 h-2" />}>
          <span className="sr-only sm:not-sr-only">Top</span>
        </Badge>
      );
    }

    // Limita a 2 badges no mobile
    return badges.slice(0, 2);
  };

  // Badges para desktop (completos)
  const getDesktopBadges = () => {
    const badges = [];

    if (!product.inStock) {
      badges.push(
        <Badge key="out-of-stock" variant="error" size="sm" pulse>
          ⚠️ Esgotado
        </Badge>
      );
    } else {
      if (discount > 30) {
        badges.push(
          <Badge key="discount" variant="error" size="sm" pulse icon={<Zap className="w-3 h-3" />}>
            -{discount}% OFF
          </Badge>
        );
      } else if (discount > 0) {
        badges.push(
          <Badge key="discount" variant="error" size="sm" icon={<Zap className="w-3 h-3" />}>
            -{discount}%
          </Badge>
        );
      }

      if (product.tags.includes('bestseller')) {
        badges.push(
          <Badge key="bestseller" variant="premium" size="sm" icon={<Crown className="w-3 h-3" />}>
            Mais Vendido
          </Badge>
        );
      }

      if (product.tags.includes('trending')) {
        badges.push(
          <Badge key="trending" variant="brand" size="sm" icon={<TrendingUp className="w-3 h-3" />}>
            Em Alta
          </Badge>
        );
      }

      if (product.tags.includes('new')) {
        badges.push(
          <Badge key="new" variant="success" size="sm">
            🆕 Novo
          </Badge>
        );
      }
    }

    return badges.slice(0, 3); // Limita a 3 badges no desktop
  };

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
            
            {/* Badges - Versão Mobile */}
            <div className="sm:hidden absolute top-1.5 left-1.5 flex flex-col gap-1 max-w-[50%]">
              {getMobileBadges()}
            </div>

            {/* Badges - Versão Desktop */}
            <div className="hidden sm:flex absolute top-2 left-2 flex-col gap-2 max-w-[70%]">
              {getDesktopBadges()}
            </div>

            {/* Quick Add Button */}
            {product.inStock && (
              <motion.div
                className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              >
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleAddToCart}
                  aria-label={`Adicionar ${product.name} ao carrinho`}
                  className="shadow-lg hover:shadow-xl transition-all min-w-[auto]"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:block ml-1">Adicionar</span>
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
              <div className="flex items-center">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-500 text-yellow-500" />
                <span className="text-xs sm:text-sm text-neutral-300 ml-1">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-neutral-500">({product.reviewCount})</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mt-auto">
              <span className="text-base sm:text-lg font-bold text-brand-400">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs sm:text-sm text-neutral-500 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}