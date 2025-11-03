import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Cart, CartItem, Product } from '@/types';
import { shippingApi } from '@/services/api';

interface CartContextType {
  cart: Cart;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateShipping: (shippingCost: number, zipCode: string) => void;
  recalculateShipping: () => Promise<void>;
  clearCart: () => void;
  itemCount: number;
  shippingCalculated: boolean;
  lastZipCode: string | null;
  isRecalculating: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = '@huumsexshop_cart';

function calculateCart(items: CartItem[], currentShipping: number = 0): Cart {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  // Não calcula frete automaticamente, usa o valor atual ou 0
  const shipping = currentShipping;
  const discount = 0;
  const total = subtotal + shipping - discount;

  return {
    items,
    subtotal,
    shipping,
    discount,
    total,
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const items = JSON.parse(stored) as CartItem[];
        return calculateCart(items);
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
    }
    return calculateCart([]);
  });

  const [shippingCalculated, setShippingCalculated] = useState(false);
  const [lastZipCode, setLastZipCode] = useState<string | null>(null);
  const [isRecalculating, setIsRecalculating] = useState(false);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.items));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }, [cart.items]);

  // Recalcular frete automaticamente quando itens do carrinho mudarem
  useEffect(() => {
    if (lastZipCode && shippingCalculated && cart.items.length > 0) {
      recalculateShipping();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.items.length]); // Só monitora quantidade de itens para evitar loop infinito

  const addItem = useCallback((product: Product, quantity: number = 1) => {
    setCart((current) => {
      const existingIndex = current.items.findIndex((item) => item.product.id === product.id);
      let newItems: CartItem[];

      if (existingIndex >= 0) {
        newItems = [...current.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + quantity,
        };
      } else {
        newItems = [...current.items, { product, quantity }];
      }

      return calculateCart(newItems, 0); // Reset shipping para 0 (será recalculado pelo useEffect)
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setCart((current) => {
      const newItems = current.items.filter((item) => item.product.id !== productId);
      return calculateCart(newItems, 0); // Reset shipping para 0 (será recalculado pelo useEffect)
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCart((current) => {
      if (quantity <= 0) {
        const newItems = current.items.filter((item) => item.product.id !== productId);
        return calculateCart(newItems, 0); // Reset shipping para 0 (será recalculado pelo useEffect)
      }

      const newItems = current.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      return calculateCart(newItems, 0); // Reset shipping para 0 (será recalculado pelo useEffect)
    });
  }, []);

  const updateShipping = useCallback((shippingCost: number, zipCode: string) => {
    setShippingCalculated(true);
    setLastZipCode(zipCode);
    setCart((current) => ({
      ...current,
      shipping: shippingCost,
      total: current.subtotal + shippingCost - current.discount,
    }));
  }, []);

  const recalculateShipping = useCallback(async () => {
    if (!lastZipCode || cart.items.length === 0) {
      return;
    }

    setIsRecalculating(true);
    
    try {
      // Cria array de produtos com quantidades corretas para o cálculo
      const products = cart.items.flatMap(item => 
        Array(item.quantity).fill(item.product)
      );
      const result = await shippingApi.calculateShipping(lastZipCode, products);
      
      if (result.options.length > 0) {
        // Usa a primeira opção (mais barata)
        const cheapestOption = result.options[0];
        setCart((current) => ({
          ...current,
          shipping: cheapestOption.price,
          total: current.subtotal + cheapestOption.price - current.discount,
        }));
        setShippingCalculated(true);
      }
    } catch (error) {
      console.error('Erro ao recalcular frete:', error);
    } finally {
      setIsRecalculating(false);
    }
  }, [lastZipCode, cart.items]);

  const clearCart = useCallback(() => {
    setCart(calculateCart([]));
    setShippingCalculated(false);
  }, []);

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        updateShipping,
        recalculateShipping,
        clearCart,
        itemCount,
        shippingCalculated,
        lastZipCode,
        isRecalculating,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
