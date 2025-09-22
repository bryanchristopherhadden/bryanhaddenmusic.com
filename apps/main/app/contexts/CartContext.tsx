"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Beat {
  id: string;
  title: string;
  artist: string;
  genre: string;
  year: string;
  filename: string;
  purchasePrice: number;
  leasePrice: number;
  bpm?: number;
  key?: string;
  duration?: string;
}

interface CartItem extends Beat {
  quantity: number;
  type: 'lease' | 'purchase';
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartCount: number;
  addToCart: (beat: Beat, type: 'lease' | 'purchase') => void;
  removeFromCart: (beatId: string, type: 'lease' | 'purchase') => void;
  updateCartQuantity: (beatId: string, type: 'lease' | 'purchase', quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (beat: Beat, type: 'lease' | 'purchase') => {
    const price = type === 'lease' ? beat.leasePrice : beat.purchasePrice;
    
    setCart(prev => {
      const existingItem = prev.find(item => item.id === beat.id && item.type === type);
      if (existingItem) {
        return prev.map(item => 
          item.id === beat.id && item.type === type
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...beat, quantity: 1, type, price }];
      }
    });
  };

  const removeFromCart = (beatId: string, type: 'lease' | 'purchase') => {
    setCart(prev => prev.filter(item => !(item.id === beatId && item.type === type)));
  };

  const updateCartQuantity = (beatId: string, type: 'lease' | 'purchase', quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(beatId, type);
      return;
    }
    
    setCart(prev => 
      prev.map(item => 
        item.id === beatId && item.type === type
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const value: CartContextType = {
    cart,
    setCart,
    cartCount,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
