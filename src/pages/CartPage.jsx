// src/pages/CartPage.jsx
import React from "react";
import { useCart } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();



  if (!cartItems.length) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="mb-6">Your cart is empty.</p>
        <Link to="/" className="bg-teal-800 text-white px-4 py-2 rounded">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {/* Delivery Banner */}
      <div className="border-1 rounded-lg shadow-lg py-3 px-4 text-center mb-6">
        <span className="font-medium">
          Free & Fast arriving by <span className="text-green-700">Monday</span>{" "}
          Order within <span className="font-semibold">23 hours, 53 minutes, 50 seconds</span>
        </span>
      </div>

      {/* Cart Items */}
      {cartItems.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center gap-6 border-b py-6 last:border-none"
        >
          <img
            src={item.image || "/images/placeholder.png"}
            alt={item.name}
            className="w-40 h-40 object-cover rounded"
          />
          <div className="flex-1">
            <h2 className="font-semibold text-lg">{item.name}</h2>
            <p className="text-sm text-gray-500">Harlan Mens Tan Boat Shoe</p>
            <p className="text-gray-800 mt-3">MRP ₹{item.price}</p>

            {/* Size + Quantity */}
            <div className="flex items-center gap-4 mt-3">
              <select
                value={item.size || ""}
                onChange={(e) =>
                  updateQuantity({
                    productId: item.productId,
                    size: e.target.value,
                    quantity: item.quantity,
                  })
                }
                className="border rounded px-3 py-2"
              >
                <option value="">Size</option>
                <option value="40">Size (40)</option>
                <option value="41">Size (41)</option>
                <option value="42">Size (42)</option>
              </select>

              <select
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity({
                    productId: item.productId,
                    size: item.size,
                    quantity: Number(e.target.value),
                  })
                }
                className="border rounded px-3 py-2"
              >
                {[...Array(10).keys()].map((n) => (
                  <option key={n + 1} value={n + 1}>
                    Quantity ({n + 1})
                  </option>
                ))}
              </select>

              <button
                onClick={() =>
                  removeFromCart({ productId: item.productId, size: item.size })
                }
                className="flex items-center text-gray-900 hover:text-red-800 ml-2"
              >
                <Trash2 size={18} className="mr-1" /> Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Summary Section */}
      <div className="mt-8 border-t pt-4">
        <div className="flex justify-between text-lg">
          <span>Summary</span>
        </div>
        <div className="flex justify-between mt-2">
          <span>Total</span>
          <span className="font-semibold">₹{totalPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span>Delivery</span>
          <span className="text-gray-800">Free</span>
        </div>
      </div>

      <hr className="bg-gray-800 mt-2"/>

      {/* Checkout Button */}
     <div className="mt-6 text-center">
  <button
    onClick={() => navigate("/checkout")}
    className="w-full bg-teal-900 text-white py-2 text-lg font-semibold rounded"
  >
    🔒 Checkout Securely
  </button>
</div>

      {/* Express Checkout */}
      <div className="mt-6 text-center">
        <p className="font-bold text-start">Express Checkout</p>
        <div className="mt-3 flex justify-center border-1">
          <img
            src="/images/gpay.png"
            alt="GPay"
            className="h-10 object-contain"
          />
        </div>

<div className="mt-3 flex justify-center border-1">
          <img
            src="/images/paypay.png"
            alt="paypal"
            className="h-10 p-2 object-contain"
          />
        </div>

        <div className="mt-3 flex justify-center border-1">
          <img
            src="/images/clearpay.png"
            alt="clearpay"
            className="h-10 p-2 object-contain"
          />
        </div>

        <div className="mt-3 flex justify-center border-1">
          <img
            src="/images/klarna1.png"
            alt="klarna"
            className="h-10 p-2 object-contain"
          />
        </div>


      </div>
    </div>
  );
}
