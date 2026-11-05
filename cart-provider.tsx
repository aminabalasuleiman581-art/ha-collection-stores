'use client';
import { createContext, useContext, useMemo, useState } from "react";
import type { CartLine, Product } from "@/types";

type CartContextType = { items: CartLine[]; add: (p: Product) => void; remove: (id: string) => void; setQty: (id: string, qty: number) => void; clear: () => void; count: number; total: number };
const CartContext = createContext<CartContextType | null>(null);
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const value = useMemo(() => ({
    items,
    add: (product: Product) => setItems(old => {
      const found = old.find(x => x.product.id === product.id);
      return found ? old.map(x => x.product.id === product.id ? { ...x, quantity: x.quantity + 1 } : x) : [...old, { product, quantity: 1 }];
    }),
    remove: (id: string) => setItems(old => old.filter(x => x.product.id !== id)),
    setQty: (id: string, quantity: number) => setItems(old => quantity <= 0 ? old.filter(x => x.product.id !== id) : old.map(x => x.product.id === id ? { ...x, quantity } : x)),
    clear: () => setItems([]),
    count: items.reduce((n, x) => n + x.quantity, 0),
    total: items.reduce((n, x) => n + x.product.price * x.quantity, 0)
  }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() { const value = useContext(CartContext); if (!value) throw new Error("useCart must be used inside CartProvider"); return value; }
