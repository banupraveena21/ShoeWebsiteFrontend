import React from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "./AddtoCartButton";

export default function ProductCard({ product }) {
  const colors = (product.colors || "").split(",").map(c => c.trim()).filter(Boolean);
  const filled = Math.round(product.rating || 5);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border hover:border-gray-800 transition duration-300">
      <div className="h-72 bg-gray-100 flex items-center justify-center">
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} className="h-full w-full object-contain" />
        ) : (
          <div className="text-gray-400">No Image</div>
        )}
      </div>

      <div className="p-4">
        <p className="text-lg text-gray-900 mb-2 font-bold text-start">
          {product.brand ? product.brand.charAt(0).toUpperCase() + product.brand.slice(1) : " "}
        </p>

        <h3 className="text-sm text-start">{product.name}</h3>

        <div className="flex items-center mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className={`w-4 h-4 ${i < filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.154c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.95c.3.921-.755 1.688-1.54 1.118l-3.368-2.447a1 1 0 00-1.176 0L5.21 17.65c-.784.57-1.839-.197-1.54-1.118l1.287-3.95a1 1 0 00-.364-1.118L1.226 8.017c-.783-.57-.38-1.81.588-1.81h4.154a1 1 0 00.95-.69l1.286-3.95z" />
            </svg>
          ))}
        </div>

        <div className="text-xs mb-3 text-start">
          <div className="text-gray-800">MRP ₹{product.mrp ?? product.price}</div>
        </div>

        <div className="mb-3">
          <div className="text-sm text-gray-800 text-start mb-2">Color</div>
          <div className="flex gap-2">
            {colors.length ? (
              colors.map((c, idx) => (
                <div key={idx} className="w-4 h-4 rounded border" style={{ background: c }} />
              ))
            ) : (
              <div className="w-4 h-4 rounded bg-gray-300" />
            )}
          </div>
        </div>

        <div className="flex gap-5">
          <Link to={`/product/${product.slug}`}>
            <button className="px-4 py-1 text-sm border rounded">Buy</button>
          </Link>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
