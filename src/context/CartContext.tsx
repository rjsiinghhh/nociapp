import React, { createContext, useReducer, useMemo } from 'react';
import type { Cart, CartItem } from '../types/cart';
import type { Product } from '../types/product';

interface CartContextValue {
  cart: Cart;
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QTY'; productId: string; quantity: number }
  | { type: 'CLEAR' };

function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + action.quantity }
              : i,
          ),
        };
      }
      return { items: [...state.items, { product: action.product, quantity: action.quantity }] };
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => i.product.id !== action.productId) };
    case 'UPDATE_QTY':
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.product.id !== action.productId) };
      }
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i,
        ),
      };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  const itemCount = useMemo(
    () => cart.items.reduce((sum, i) => sum + i.quantity, 0),
    [cart.items],
  );

  const subtotal = useMemo(
    () => cart.items.reduce((sum, i) => sum + i.product.pricePerUnit * i.quantity, 0),
    [cart.items],
  );

  const value: CartContextValue = {
    cart,
    itemCount,
    subtotal,
    addItem: (product, quantity = 1) => dispatch({ type: 'ADD_ITEM', product, quantity }),
    removeItem: (productId) => dispatch({ type: 'REMOVE_ITEM', productId }),
    updateQuantity: (productId, quantity) => dispatch({ type: 'UPDATE_QTY', productId, quantity }),
    clearCart: () => dispatch({ type: 'CLEAR' }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
