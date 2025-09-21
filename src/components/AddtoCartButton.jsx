// src/components/AddToCartButton.jsx
import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";

export default function AddToCartButton({ product, quantity = 1, size = null, className = "" }) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    // If product has sizes and user didn't pass a size, require selection
    const hasSizes = product?.sizes && product.sizes.toString().trim() !== "";
    if (hasSizes && (size === null || size === "")) {
      alert("Please select a size before adding to cart.");
      return;
    }

    setLoading(true);
    try {
      const result = await addToCart({ product, productId: product.id, quantity, size });
      if (result.ok) {
        // quick UI feedback - replace with a toast library if you like
        alert("Product added to cart");
      } else {
        alert("Could not add to cart");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className={`px-4 py-2 text-sm rounded ${className} ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
      style={{ background: "#0f766e", color: "white" }}
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}
