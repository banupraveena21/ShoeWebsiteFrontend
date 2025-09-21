// src/pages/CheckoutPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function CheckoutPage() {
  const { cartItems = [], totalPrice = 0 } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardName: "",
    cardNumber: "",
    cvv: "",
    exp: "",
    address1: "",
    city: "",
    state: "",
    landmark: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function handlePlaceOrder(e) {
    e.preventDefault();
    // TODO: integrate real checkout API here.
    // If your CartContext exposes a clearCart() method, call it here.
    // For now, navigate to a simple confirmation page:
    navigate("/order-confirmation", {
      state: { items: cartItems, total: totalPrice, product: cartItems[0], },
    });
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-center text-3xl font-serif font-bold mb-6">Checkout</h1>

      <div className="flex">
        {/* Left: Order Summary */}
        <aside className="w-1/3 bg-teal-900 text-white rounded p-8">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          {cartItems.length ? (
            <div>
              {cartItems.map((it, i) => (
                <div key={i} className="flex gap-4 mb-4 items-center">
                  <img
                    src={it.image || "/images/placeholder.png"}
                    alt={it.name}
                    className="w-35 h-35 object-cover rounded"
                  />
                  <div>
                    <div className=" text-sm mb-1">{it.name}</div>
                    <div className="text-sm text-gray-200 mb-3">Size: {it.size || "—"}</div>
                    <div className="text-sm text-gray-200 mb-3">Quantity: {it.quantity}</div>
                    <div className="mt-1 text-sm mb-3">MRP ₹{Number(it.price).toLocaleString()}</div>
                  </div>
                </div>
              ))}

              <div className="border-t border-teal-700 mt-6 pt-4">
                <div className="flex justify-between">
                  <span>Amount </span>
                  <span>₹ {Number(totalPrice).toLocaleString()}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Delivery fees</span>
                  <span>Free</span>
                </div>
                <hr className="my-4 border-teal-700" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹ {Number(totalPrice).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-200">Your cart is empty.</p>
          )}
        </aside>

        {/* Right: Complete Your Order form */}
        <section className="flex-1 bg-gray-100 rounded p-8">
          <h2 className="text-2xl font-serif font-bold mb-4">Complete Your Order</h2>

          <form onSubmit={handlePlaceOrder} className="space-y-6">
            {/* Personal Details */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Personal Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">First Name</label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="w-full px-3 py-2 bg-white rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Last Name</label>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="w-full px-3 py-2 bg-white rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1">Email id</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 bg-white rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1">Phone Number</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone no"
                    className="w-full px-3 py-2 bg-white rounded"
                  />
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Payment Details</h3>

              <div className="flex items-center gap-4 mb-4">
                <img src="/images/visa.png" alt="Visa" className="h-8 object-contain" />
                <img src="/images/gpay.png" alt="GPay" className="h-8 object-contain" />
                <img src="/images/paypay.png" alt="PayPal" className="h-8 p-1 object-contain" />
                <img src="/images/clearpay.png" alt="clearpay" className="h-8 p-1 object-contain" />
                <img src="/images/klarna1.png" alt="klarna" className="h-8 p-1 object-contain" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Card Holder Name</label>
                  <input
                    name="cardName"
                    value={form.cardName}
                    onChange={handleChange}
                    placeholder="Enter name"
                    className="w-full px-3 py-2 bg-white rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Card Number</label>
                  <input
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleChange}
                    placeholder="Enter card number"
                    className="w-full px-3 py-2 bg-white rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1">CVV</label>
                  <input
                    name="cvv"
                    value={form.cvv}
                    onChange={handleChange}
                    placeholder="Example: 4339"
                    className="w-full px-3 py-2 bg-white rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1">Expiration Date</label>
                  <input
                    name="exp"
                    value={form.exp}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 bg-white rounded"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="payMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mr-2"
                  />
                  Cash on Delivery
                </label>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Shipping Address</h3>
              <div>
                <label className="block mb-1">Address Line 1</label>
                <input
                  name="address1"
                  value={form.address1}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="w-full px-3 py-2 bg-white rounded mb-4"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">City</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Your city"
                    className="w-full px-3 py-2 bg-white rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">State</label>
                  <input
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="Your state"
                    className="w-full px-3 py-2 bg-white rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1">Landmark</label>
                  <input
                    name="landmark"
                    value={form.landmark}
                    onChange={handleChange}
                    placeholder="Any landmark (famous place/mall)"
                    className="w-full px-3 py-2 bg-white rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1">Pincode</label>
                  <input
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="Code"
                    className="w-full px-3 py-2 bg-white rounded"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="flex-1 bg-gray-300 text-gray-900 py-3 font-semibold rounded"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 bg-teal-900 text-white py-3 font-semibold rounded"
              >
                Order Now
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
