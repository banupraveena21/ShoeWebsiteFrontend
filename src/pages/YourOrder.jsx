import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function YourOrder() {
  const { state } = useLocation();
  const navigate = useNavigate(); // For going back

  const orderNo = state?.orderNo || "#Bh2300006";
  const total = state?.total ?? 0;

  const product = state?.product || {
    name: "Unknown Product",
    image: "/images/placeholder.png",
    price: "0",
    expectedDelivery: "Sun, May 31",
  };

  const timeline = [
    { label: "Order Placed", date: "May 21, 2025 | 03:45 pm" },
    { label: "Order Dispatched", date: "May 22, 2025 | 11:45 am" },
    { label: "Order in transit", date: "Reached at Tenkasi, Post office" },
    { label: "Delivered successfully", date: "Not delivered yet" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      {/* Header with Back Arrow */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-800 hover:text-teal-600 focus:outline-none"
        >
          {/* Using Unicode arrow or use an icon here */}
          <span className="text-2xl">&#8592;</span>
        </button>
        <h2 className="text-2xl font-bold">Your Order</h2>
      </div>

      <div className="bg-white shadow-md rounded p-6 mb-6">
        <p className="text-gray-700 mb-2">
          <strong>Order Number:</strong> {orderNo}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Payment Method:</strong> Cash on Delivery
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Total:</strong> ₹{Number(total).toLocaleString()}
        </p>

        <div className="flex items-center gap-4 mb-4">
          <img
            src={product.image || "/images/placeholder.png"}
            alt={product.name}
            className="w-24 h-24 object-cover rounded"
          />
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-sm text-gray-600">
              Expected Delivery: {product.expectedDelivery}
            </p>
            <p className="text-sm text-gray-800 mt-1">
              MRP: ₹{Number(product.price).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-6 bg-gray-100 px-5 py-8 rounded">
          <h3 className="text-lg font-semibold mb-8">Order Status</h3>

          <div className="relative border-l-2 border-teal-700 ml-5 space-y-8">
            {timeline.map((step, index) => (
              <div key={index} className="relative pl-10">
                {/* Icon inside circle */}
                <div className="absolute left-[-34px] top-0">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      index === 3 ? "bg-gray-400" : "bg-teal-900"
                    }`}
                  >
                    <img
                      src={`/images/step-${index + 1}.png`}
                      alt={step.label}
                      className="w-6 h-6"
                    />
                  </div>

                  {/* Vertical line after icon */}
                  {index < timeline.length - 1 && (
                    <div
                      className={`absolute left-1/2 top-full h-8 w-px transform -translate-x-1/2 ${
                        index === 2
                          ? "border-l-2 border-dashed border-gray-400"
                          : "bg-teal-700"
                      }`}
                    ></div>
                  )}
                </div>

                {/* Step details */}
                <div className="ml-2">
                  <p
                    className={`font-semibold ${
                      index === 3 ? "text-gray-500" : "text-teal-900"
                    }`}
                  >
                    {step.label}
                  </p>
                  <p
                    className={`text-sm ${
                      index === 3 ? "text-gray-500" : "text-gray-700"
                    }`}
                  >
                    {step.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
