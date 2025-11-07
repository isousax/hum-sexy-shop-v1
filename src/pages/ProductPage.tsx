import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Shield, Droplet, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { productsApi, reviewsApi } from '@/services/api';
import type { Product, Review } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    const loadProduct = async () => {
      if (!slug) return;

      try {
        const prod = await productsApi.getBySlug(slug);
        if (prod) {
          setProduct(prod);
          const revs = await reviewsApi.getByProductId(prod.id);
          setReviews(revs);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      }
    };

    loadProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity);
    showToast({
      type: 'success',
      title: 'Adicionado ao carrinho',
      message: `${quantity}x ${product.name}`,
      groupKey: 'add-to-cart', // Agrupa todos os toasts de adicionar ao carrinho
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-neutral-400">Produto não encontrado</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <motion.div
              className="aspect-square rounded-xl overflow-hidden bg-neutral-900 mb-4"
              layoutId={`product-${product.id}`}
            >
              <img
                src={product.images[selectedImage]?.url}
                alt={product.images[selectedImage]?.alt}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === idx ? 'border-brand-500' : 'border-neutral-800'
                  }`}
                >
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-neutral-100 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                <span className="text-neutral-300">{product.rating.toFixed(1)}</span>
                <span className="text-neutral-500">({product.reviewCount} avaliações)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-brand-400">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-neutral-500 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                  <Badge variant="error">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </Badge>
                </>
              )}
            </div>

            <p className="text-neutral-300 mb-6">{product.description}</p>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.features.map((feature, idx) => (
                <Badge key={idx} variant="brand" size="sm">
                  {feature.label}
                </Badge>
              ))}
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border border-neutral-700 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-neutral-300 hover:bg-neutral-800"
                >
                  -
                </button>
                <span className="px-6 py-2 text-neutral-100">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-neutral-300 hover:bg-neutral-800"
                >
                  +
                </button>
              </div>
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                leftIcon={<ShoppingCart className="w-5 h-5" />}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Adicionar' : 'Fora de Estoque'}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 gap-3 p-4 bg-background-subtle rounded-lg border border-neutral-800">
              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <Shield className="w-5 h-5 text-brand-400" />
                <span>Embalagem 100% discreta</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <Droplet className="w-5 h-5 text-brand-400" />
                <span>Produto certificado e seguro</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <Heart className="w-5 h-5 text-brand-400" />
                <span>Garantia de {product.warranty || '90 dias'}</span>
              </div>
            </div>

            {/* Specifications */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-neutral-100 mb-4">Especificações</h3>
              <dl className="grid grid-cols-2 gap-4">
                {product.specifications.map((spec, idx) => (
                  <div key={idx}>
                    <dt className="text-sm text-neutral-500">{spec.label}</dt>
                    <dd className="text-neutral-200">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-neutral-100 mb-8">Avaliações</h2>
            <div className="space-y-6">
              {reviews.slice(0, 3).map((review) => (
                <div key={review.id} className="bg-background-elevated border border-neutral-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-neutral-200 font-medium">{review.rating.toFixed(1)}</span>
                      <span className="text-neutral-400">por {review.userName}</span>
                    </div>
                    {review.verified && (
                      <Badge variant="success" size="sm">Compra verificada</Badge>
                    )}
                  </div>
                  <h4 className="font-semibold text-neutral-100 mb-2">{review.title}</h4>
                  <p className="text-neutral-300">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
