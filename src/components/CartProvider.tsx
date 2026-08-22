"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import { cartItemKey, cartQuantity, cartSubtotal, type CartItem } from "@/lib/cart";

const STORAGE_KEY = "clouds_cart_v1";
const EMPTY_CART: CartItem[] = [];

type Listener = () => void;

// Kho dữ liệu bên ngoài React, đồng bộ với localStorage — dùng useSyncExternalStore
// để tránh setState trong effect và tránh lệch nội dung giữa server/client khi hydrate.
let cartState: CartItem[] = typeof window !== "undefined" ? loadFromStorage() : EMPTY_CART;
const listeners = new Set<Listener>();

function loadFromStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function persist(items: CartItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // bỏ qua nếu không ghi được (chế độ riêng tư, hết dung lượng...)
  }
}

function setCart(next: CartItem[]) {
  cartState = next;
  persist(next);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return cartState;
}

function getServerSnapshot() {
  return EMPTY_CART;
}

// Idiom useSyncExternalStore để biết "đã qua khỏi lần hydrate đầu tiên" mà không cần
// setState trong effect (tránh lệch nội dung server/client một cách an toàn theo React docs).
function subscribeNever() {
  return () => {};
}
function useIsHydrated() {
  return useSyncExternalStore(subscribeNever, () => true, () => false);
}

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (slug: string, size: string, quantity: number) => void;
  removeItem: (slug: string, size: string) => void;
  clear: () => void;
  subtotal: number;
  quantity: number;
  isHydrated: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isHydrated = useIsHydrated();

  const value = useMemo<CartContextValue>(() => {
    return {
      items,
      addItem: (item) => {
        const key = cartItemKey(item.slug, item.size);
        const existing = cartState.find((p) => cartItemKey(p.slug, p.size) === key);
        const next = existing
          ? cartState.map((p) =>
              cartItemKey(p.slug, p.size) === key ? { ...p, quantity: p.quantity + item.quantity } : p
            )
          : [...cartState, item];
        setCart(next);
      },
      updateQuantity: (slug, size, quantity) => {
        const key = cartItemKey(slug, size);
        const next = cartState
          .map((p) => (cartItemKey(p.slug, p.size) === key ? { ...p, quantity } : p))
          .filter((p) => p.quantity > 0);
        setCart(next);
      },
      removeItem: (slug, size) => {
        const key = cartItemKey(slug, size);
        setCart(cartState.filter((p) => cartItemKey(p.slug, p.size) !== key));
      },
      clear: () => setCart([]),
      subtotal: cartSubtotal(items),
      quantity: cartQuantity(items),
      isHydrated,
    };
  }, [items, isHydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart phải được dùng bên trong <CartProvider>");
  return ctx;
}
