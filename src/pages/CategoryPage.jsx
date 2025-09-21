import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useParams, Link } from "react-router-dom";

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // Sort state
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    setLoading(true);
    const url = slug
      ? `http://localhost:8000/api/products/?category=${encodeURIComponent(slug)}`
      : `http://localhost:8000/api/products/`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const results = data.results || data;
        setProducts(results);
        setFilteredProducts(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch products failed", err);
        setLoading(false);
      });
  }, [slug]);

  // Filter logic
  useEffect(() => {
    let filtered = [...products];

    if (selectedStyle) {
      filtered = filtered.filter(
        (p) => p.style?.toLowerCase() === selectedStyle.toLowerCase()
      );
    }

    if (selectedSize) {
      filtered = filtered.filter((p) =>
        (p.sizes || "").split(",").map((s) => s.trim()).includes(selectedSize)
      );
    }

    if (selectedBrand) {
      filtered = filtered.filter(
        (p) => p.brand?.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    if (selectedColor) {
      filtered = filtered.filter((p) =>
        (p.colors || "").toLowerCase().includes(selectedColor.toLowerCase())
      );
    }

    // Sort logic
    switch (sortOption) {
      case "price-low-high":
        filtered.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case "price-high-low":
        filtered.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "new":
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case "featured":
        // Optional: Assume "featured" products have a flag or tag
        // filtered = filtered.filter(p => p.is_featured); // You can implement this later
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [
    selectedStyle,
    selectedSize,
    selectedBrand,
    selectedColor,
    sortOption,
    products,
  ]);

  const visibleProducts = filteredProducts.slice(0, 12);
  const hasMore = filteredProducts.length > 11;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Top Bar: Filter (left) and Sort by (right) */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-gray-900 font-semibold underline-offset-4"
        >
          Filter {showFilters ? "▲" : "▼"}
        </button>

        <select
          className="bg-teal-800 text-white px-4 py-1 rounded text-sm"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="featured">Featured</option>
          <option value="new">New Arrivals</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="rating">Overall Rating</option>
        </select>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div>
            <label className="block text-sm font-semibold mb-1">Style</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
            >
              <option value="">All</option>
              <option value="heels">Heels</option>
              <option value="sandals">Sandals</option>
              <option value="slippers">Slippers</option>
              <option value="newarrivals">New Arrivals</option>
              <option value="trainers">Trainers</option>
              <option value="boots">Boots</option>
              <option value="canvas">Canvas</option>
              <option value="summershop">Summer Shop</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Size</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">All</option>
              <option value="junior">Junior</option>
              <option value="uk5">UK(3)</option>
              <option value="uk6">UK(4)</option>
              <option></option>
              <option value="Adult">Adult</option>
              <option value="uk(3)">UK(3)</option>
              <option value="uk(4)">UK(4)</option>
              <option value="uk(5)">UK(5)</option>
              <option value="uk(6)">UK(6)</option>
              <option value="uk(7)">UK(7)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Brand</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">All</option>
              <option value="beckett">Beckett</option>
              <option value="comfysteps">Comfy Steps</option>
              <option value="kickers">Kickers</option>
              <option value="lambretta">Lambretta</option>
              <option value="marvel">Marvel</option>
              <option value="olivia">Olivia</option>
              <option value="gitano">Gitano</option>
              <option value="beckett">Beckett</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Color</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="">All</option>
              <option value="white">White</option>
              <option value="black">Black</option>
              <option value="blue">Blue</option>
              <option value="pink">Pink</option>
              <option value="orange">Orange</option>
              <option value="green">Green</option>
              <option value="brown">Brown</option>
              <option value="yellow">Yellow</option>
            </select>
          </div>
        </div>
      )}

      {/* Product Cards */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {visibleProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-end mt-10">
              <Link
                to={`/category/${slug}`}
                className="bg-teal-900 text-white px-6 py-2 rounded-lg"
              >
                View all
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
