import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ShippingCalculator } from '@/components/cart/ShippingCalculator';
import type { ShippingOption } from '@/types';

export default function CartPage() {
  const { cart, updateQuantity, removeItem, updateShipping, shippingCalculated } = useCart();
  const navigate = useNavigate();

  const handleSelectShipping = (option: ShippingOption, zipCode: string) => {
    updateShipping(option.price, zipCode);
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-neutral-700 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-neutral-100 mb-4">Seu carrinho está vazio</h2>
          <p className="text-neutral-400 mb-8">Adicione produtos para continuar</p>
          <Link to="/collections">
            <Button variant="primary">Explorar Produtos</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-neutral-100 mb-8">Carrinho de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.product.id}
                className="bg-background-elevated border border-neutral-800 rounded-lg p-4 sm:p-6 flex gap-4 sm:gap-6"
              >
                <img
                  src={item.product.images[0]?.url}
                  alt={item.product.name}
                  className="w-20 sm:w-24 h-20 sm:h-24 object-cover rounded-lg flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="text-sm sm:text-lg font-semibold text-neutral-100 hover:text-brand-400 transition-colors line-clamp-1 sm:line-clamp-2"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1 line-clamp-1 sm:line-clamp-2">{item.product.shortDescription}</p>
                  
                  <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-0 mt-3 sm:mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 sm:p-2 rounded-lg bg-background-subtle border border-neutral-700 hover:bg-neutral-800"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                      <span className="px-3 sm:px-4 text-sm sm:text-base text-neutral-100 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 sm:p-2 rounded-lg bg-background-subtle border border-neutral-700 hover:bg-neutral-800"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                      <span className="text-base sm:text-xl font-bold text-brand-400">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 sm:p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                        aria-label="Remover item"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-background-elevated border border-neutral-800 rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-semibold text-neutral-100 mb-6">Resumo do Pedido</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-neutral-300">
                  <span>Subtotal</span>
                  <span>{formatCurrency(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Frete</span>
                  <span>
                    {!shippingCalculated ? (
                      <span className="text-yellow-500">A calcular</span>
                    ) : cart.shipping === 0 ? (
                      'Grátis'
                    ) : (
                      formatCurrency(cart.shipping)
                    )}
                  </span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Desconto</span>
                    <span>-{formatCurrency(cart.discount)}</span>
                  </div>
                )}
                <div className="border-t border-neutral-700 pt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-neutral-100">Total</span>
                    <span className="text-brand-400">{formatCurrency(cart.total)}</span>
                  </div>
                </div>
              </div>

              {cart.subtotal < 200 && cart.shipping > 0 && (
                <p className="text-sm text-neutral-400 mb-4 p-3 bg-brand-900/20 rounded-lg border border-brand-800/30">
                  Frete grátis para compras acima de {formatCurrency(200)}
                </p>
              )}

              {/* Shipping Calculator */}
              <div className="mb-4">
                <ShippingCalculator 
                  products={cart.items.flatMap(item => 
                    Array(item.quantity).fill(item.product)
                  )}
                  onSelectShipping={handleSelectShipping}
                />
              </div>

              {!shippingCalculated && (
                <p className="text-sm text-yellow-500 mb-3 p-3 bg-yellow-950/30 rounded-lg border border-yellow-900/30">
                  ⚠️ Calcule o frete antes de finalizar a compra
                </p>
              )}

              <Button
                variant="primary"
                size="lg"
                className="w-full mb-3"
                onClick={() => navigate('/checkout')}
                disabled={!shippingCalculated}
              >
                Finalizar Compra
              </Button>

              <Link to="/collections">
                <Button variant="ghost" size="lg" className="w-full">
                  Continuar Comprando
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
