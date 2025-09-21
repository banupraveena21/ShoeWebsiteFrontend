// src/contexts/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const BASE = "http://127.0.0.1:8000";

  // init
  useEffect(() => {
    fetch(`${BASE}/api/cart/count/`)
      .then((res) => {
        if (!res.ok) throw new Error("no backend");
        return res.json();
      })
      .then((data) => setCartCount(data.count ?? 0))
      .catch(() => {
        const local = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(local);
        const total = local.reduce((s, it) => s + (it.quantity || 1), 0);
        setCartCount(total);
      });
  }, []);

  const persistLocal = (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
    setCartItems(items);
    const total = items.reduce((s, it) => s + (it.quantity || 1), 0);
    setCartCount(total);
  };

  const addToCart = async ({ productId, product, quantity = 1, size = null }) => {
    const id = productId ?? product?.id;
    try {
      const res = await fetch(`${BASE}/api/cart/add/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: id, quantity, size }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.count !== undefined) setCartCount(data.count);
        else setCartCount((c) => c + quantity);
        return { ok: true, backend: true, data };
      } else throw new Error("backend add failed");
    } catch {
      const items = JSON.parse(localStorage.getItem("cart") || "[]");
      const idx = items.findIndex(
        (it) => it.productId === id && (it.size ?? null) === (size ?? null)
      );
      if (idx > -1) items[idx].quantity += quantity;
      else {
        items.push({
          productId: id,
          name: product?.name ?? product?.title ?? `#${id}`,
          price: product?.price ?? product?.mrp ?? 0,
          size,
          quantity,
          image: product?.image_url ?? null,
        });
      }
      persistLocal(items);
      return { ok: true, backend: false };
    }
  };

  const updateQuantity = ({ productId, size = null, quantity }) => {
    const items = [...cartItems];
    const idx = items.findIndex(
      (it) => it.productId === productId && (it.size ?? null) === (size ?? null)
    );
    if (idx > -1) {
      items[idx].quantity = Math.max(1, quantity);
      persistLocal(items);
    }
  };

  const removeFromCart = ({ productId, size = null }) => {
    const items = cartItems.filter(
      (it) => !(it.productId === productId && (it.size ?? null) === (size ?? null))
    );
    persistLocal(items);
  };

  const clearCart = () => {
    persistLocal([]);
  };

  const totalPrice = cartItems.reduce(
    (s, it) => s + (it.price || 0) * (it.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        cartCount,
        setCartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
