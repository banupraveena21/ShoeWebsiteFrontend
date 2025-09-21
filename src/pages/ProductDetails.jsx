import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddToCartButton from "../components/AddtoCartButton";


export default function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`https://shoewebsitebackend.onrender.com/api/products/${slug}/`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.image_url || null); // default main image
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!product) return <div className="p-10 text-center">Product not found.</div>;

  const colors = (product.colors || "").split(",").map((c) => c.trim());

  const productImages = [
    product.image_url || "/images/images (4).png",
    "/images/shoe2.png",
    "/images/shoe3.png",
    "/images/shoe4.png",
    "/images/shoe5.png",
    "/images/shoe6.png",
  ];

  const sizes = [41, 42, 43, 44, 45];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          {/* Main Image */}
          <div className="bg-gray-100 h-[600px] flex items-center justify-center mb-4 rounded-lg">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={product.name}
                className="object-contain h-full cursor-pointer"
                onClick={() => window.open(selectedImage, "_blank")}
              />
            ) : (
              <div className="text-gray-400">No Image</div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`cursor-pointer border rounded-lg ${
                  selectedImage === img ? "border-teal-700" : "border-gray-300"
                }`}
              >
                <img
                  src={img}
                  alt={`product-${idx}`}
                  className="object-cover w-full h-24"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl text-gray-800 mb-2 text-start">
            <span className="font-bold">{product.brand}</span>
          </h1>

          <p className="text-lg font-semibold text-gray-900 mb-4 text-start">
            {product.name}
          </p>

          <div className="mb-4 text-start">
            <span className="text-sm text-gray-800 font-semibold">
              MRP: ₹{product.price}
            </span>
            {product.mrp && product.mrp !== product.price && (
              <span className="ml-2 line-through text-gray-500">
                ₹{product.mrp}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < product.rating ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.154c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.95c.3.921-.755 1.688-1.54 1.118l-3.368-2.447a1 1 0 00-1.176 0L5.21 17.65c-.784.57-1.839-.197-1.54-1.118l1.287-3.95a1 1 0 00-.364-1.118L1.226 8.017c-.783-.57-.38-1.81.588-1.81h4.154a1 1 0 00.95-.69l1.286-3.95z" />
              </svg>
            ))}
            <span className="ml-2">5/5 (16 reviews)</span>
          </div>

          {/* Colors */}
          <div className="mb-4 text-start">
            <p className="text-sm font-semibold mb-1">Color:</p>
            <div className="flex gap-2 mb-4">
              {colors.map((color, idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 rounded-full border cursor-pointer"
                  style={{ background: color }}
                ></div>
              ))}
            </div>
            <hr className="border-gray-300 border-1 mb-4" />
          </div>

          {/* Shoe Size */}
          <div className="mb-4 text-start">
            <p className="text-sm font-semibold mb-1">Shoe Size</p>
            <div className="flex gap-3 mb-4">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border bg-gray-100 ${
                    selectedSize === size
                      ? "border-teal-700 bg-teal-700 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <hr className="border-gray-500 mb-4" />
          </div>

          {/* Quantity */}
          <div className="mb-6 text-start">
            <p className="text-sm font-semibold mb-1">Quantity</p>
            <div className="flex items-center gap-3 mb-4">
              <button
                className="px-3 py-1 border bg-gray-100"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="px-4">{quantity}</span>
              <button
                className="px-3 py-1 border bg-gray-100"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
            <hr className="border-gray-300 border-1 mb-6" />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 mb-5">

            <AddToCartButton
    product={product}
    quantity={quantity}
    size={selectedSize}
    className="w-full text-lg"
  />




            <button className="px-6 py-2 text-lg bg-teal-800 text-white rounded w-full">
              Buy Now
            </button>
          </div>

          {/* Secure Checkout + Info */}
          <div className="flex flex-col gap-4">
            <div className="border border-gray-800 p-4 text-center">
              <p className="text-sm font-semibold mb-2">Secure Checkout With</p>
              <div className="flex justify-center gap-6">
                <img src="/images/upi.jpg" alt="UPI" className="h-6" />
                <img src="/images/mastercard.png" alt="Mastercard" className="h-6" />
                <img src="/images/rupay.jpg" alt="RuPay" className="h-6" />
                <img src="/images/visa.png" alt="VISA" className="h-6" />
              </div>
            </div>

            <button className="border-1 border-gray-800 px-4 py-2 flex items-center justify-center gap-2">
              Unsure about your size? Let’s connect
              <img src="/images/whatsapp.jpg" alt="WhatsApp" className="h-5" />
            </button>

            <div className="bg-gray-200 rounded-lg p-3 text-center text-sm">
              <p className="mb-2 font-medium">
                <span className="font-semibold">COD</span> Available
              </p>
              <hr className="border-gray-300 border mb-6" />
              <p className="mb-2">
                <span className="font-semibold">24 </span> Hour Dispatch
              </p>
              <hr className="border-gray-300 border mb-6" />
              <p>
                7 Days <span className="font-semibold">easy return & exchange</span>
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 text-start">
            <h2 className="font-bold mb-2 text-lg">Products Details</h2>
            <p className="text-gray-800 text-sm">
              {product.description || "No description provided."}
            </p>
          </div>
        </div>
      </div>

      {/* 🔥 Customer Reviews */}
      <div className="mt-12 pt-8">
        {/* Review Card 1 */}
        <div className="border rounded-lg p-6 mb-8 bg-white shadow-sm">
          <h1 className="text-xl font-bold text-start mb-3">Reviews:</h1>
          <div className="flex gap-8">
            {/* Left Section */}
            <div className="flex gap-4 w-1/2">
              <img
                src="/images/customer1.png"
                alt="Reviewer"
                className="w-12 h-12 rounded-full border"
              />
              <div>
                <p className="font-semibold text-start">Reviewed by Beverley</p>
                <p className="text-sm font-semibold text-start">From: Weymouth</p>
                <div className="grid gap-y-2 mt-4 text-sm text-start">
                  <p>Fit: <span className="text-yellow-500 text-xl">★★★★★</span></p>
                  <p>Comfort: <span className="text-yellow-500 text-xl">★★★★★</span></p>
                  <p>Value for Money: <span className="text-yellow-500 text-xl">★★★★★</span></p>
                  <p>Quality: <span className="text-yellow-500 text-xl">★★★★★</span></p>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-1/2 text-start">
              <p className="font-semibold">Super Looking</p>
              <p className="text-sm">Overall rating <span className="text-yellow-500 text-lg">★★★★★</span></p>
              
              <p className="text-gray-900 text-sm leading-relaxed mt-3">
                Very pleased with the super fast delivery and packaging.
                Shoes are very good quality and superb. See more...
              </p>
              <p className="mt-3 text-sm text-gray-900 flex items-center gap-1">
                Beverley would recommend this product{" "}
                <span className="text-green-600 text-lg">✔</span>
              </p>
            </div>
          </div>
        </div>

        {/* Review Card 1 */}
        <div className="border rounded-lg p-6 mb-8 bg-white shadow-sm">
          <h1 className="text-xl font-bold text-start mb-3">Reviews:</h1>
          <div className="flex gap-8">
            {/* Left Section */}
            <div className="flex gap-4 w-1/2">
              <img
                src="/images/customer2.png"
                alt="Reviewer"
                className="w-12 h-12 rounded-full border"
              />
              <div>
                <p className="font-semibold text-start">Reviewed by Beverley</p>
                <p className="text-sm font-semibold text-start">From: Weymouth</p>
                <div className="grid gap-y-2 mt-4 text-sm text-start">
                  <p>Fit: <span className="text-yellow-500 text-xl">★★★★★</span></p>
                  <p>Comfort: <span className="text-yellow-500 text-xl">★★★★★</span></p>
                  <p>Value for Money: <span className="text-yellow-500 text-xl">★★★★★</span></p>
                  <p>Quality: <span className="text-yellow-500 text-xl">★★★★★</span></p>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-1/2 text-start">
              <p className="font-semibold">Super Looking</p>
              <p className="text-sm">Overall rating <span className="text-yellow-500 text-lg">★★★★★</span></p>
              <p className="text-gray-900 text-sm leading-relaxed mt-3">
                Very pleased with the super fast delivery and packaging.
                Shoes are very good quality and superb. See more...
              </p>
              <p className="mt-3 text-sm text-gray-900 flex items-center gap-1">
                Beverley would recommend this product{" "}
                <span className="text-green-600 text-lg">✔</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
