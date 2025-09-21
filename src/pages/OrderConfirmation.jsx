// src/pages/OrderConfirmation.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid"; // heroicons if installed

export default function OrderConfirmation() {
  const { state } = useLocation();
  const orderNo = state?.orderNo || "#Bh2300006"; // fallback example
  const total = state?.total ?? 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
      <div className="bg-white shadow-xl border-1 p-10 w-full max-w-md text-center">
        {/* Check Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <CheckCircleIcon className="w-30 h-30 text-teal-900 mx-auto p" />
            {/* decorative dots */}
            <div className="absolute inset-0 flex justify-center items-center">
              <span className="w-30 h-30 border-6 border-dotted border-teal-900 rounded-full animate-pulse"></span>
            </div>
          </div>
        </div>

        <h1 className="text-xl font-semibold mb-2">
          Thank you for your ordering
        </h1>
        <p className="text-gray-700 mb-1">
          We’ve received your order. It will ship in 5–7 business days.
        </p>
        <p className="text-gray-900 font-medium mb-6">
          Your order number is <span className="font-bold">{orderNo}</span>
        </p>

        {/* optional total */}
        {total > 0 && (
          <p className="mb-6 text-gray-800">
            Order total: <strong>₹{Number(total).toLocaleString()}</strong>
          </p>
        )}

        <div className="flex justify-center gap-4">
          <Link
  to="/orders"
  state={{ orderNo, total,
     product: {
      name: state?.product?.name,
      image: state?.product?.image,
      price: state?.product?.price,
     expectedDelivery: "Sun, Sep 29",
     },
    } }
  className="px-6 py-2 border border-gray-900 rounded hover:bg-gray-100 transition"
>
 
            View Order
          </Link>
 
         <Link
  to="/track"
  state={{ orderNo, total, 
    product: {
      name: state?.product?.name,
      image: state?.product?.image,
      price: state?.product?.price,
      expectedDelivery: "Sun, Sep 29", // or generate dynamically
    },
      }}
  className="px-6 py-2 border border-gray-900 rounded hover:bg-gray-100 transition"
>
 

            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
}
