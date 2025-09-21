import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "/images/slide1.jpg",
    heading: "Flat 50% Sale",
    subtext: "Kids shoe",
    buttonLink: "/category/kids",
    contentPosition: "left",
    contentBg: "bg-gray-700 bg-opacity-70",
    textColor: "text-white",
  },
  {
    image: "/images/slide2.jpg",
    heading: "Women's High Heels",
    subtext: "Flat 30% offer for your first order",
    buttonLink: "/category/womens",
    contentPosition: "right",
    contentBg: "bg-gray-700 bg-opacity-70",
    textColor: "text-white",
  },
  {
    image: "/images/slide3.jpg",
    heading: "Men's wear high heel",
    subtext: "Office shoe only 40% discount today only",
    buttonLink: "/category/mens",
    contentPosition: "right",
    contentBg: "transparent",
    textColor: "text-white",
  },
  {
    image: "/images/slide4.jpg",
    heading: "Womens red color",
    subtext: "High heels for party – for your first order get a free gift",
    buttonLink: "/category/womens",
    contentPosition: "left",
    contentBg: "bg-gray-700 bg-opacity-70",
    textColor: "text-white",
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [womenProducts, setWomenProducts] = useState([]);
  const [menProducts, setMenProducts] = useState([]);
  const [kidsProducts, setKidsProducts] = useState([]);

  // 🔄 Auto-slide every 5s
  useEffect(() => {
    const timer = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % slides.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  // Fetch products
  useEffect(() => {
    async function fetchProducts(category, setter, limit) {
      try {
        const res = await fetch(
          `http://localhost:8000/api/products/?category=${category}`
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setter((data && data.products ? data.products : data).slice(0, limit));
      } catch (error) {
        console.error(`Failed to fetch ${category} products:`, error);
      }
    }

    fetchProducts("womens", setWomenProducts, 4);
    fetchProducts("mens", setMenProducts, 2);
    fetchProducts("kids", setKidsProducts, 2);
  }, []);

  // Helper for image url
  const getImageUrl = (url) => {
    if (!url) return "/images/placeholder.png";
    return url.startsWith("http") ? url : `http://localhost:8000${url}`;
  };

  // Collect all products
  const allProducts = [...womenProducts, ...menProducts, ...kidsProducts];

  // ✅ Animation state for box
  const [isTeal, setIsTeal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTeal((prev) => !prev);
    }, 2000); // every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white text-gray-800 mt-8">
      {/* ===== Carousel ===== */}
      <div className="relative w-[90%] h-[70vh] overflow-hidden mx-auto">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          const isLeft = slide.contentPosition === "left";

          return (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.heading}
                className="w-full h-full object-cover object-bottom"
              />
              <div
                className={`absolute top-1/4 ${
                  isLeft ? "left-4" : "right-4"
                } max-w-md flex flex-col items-start`}
              >
                <div
                  className={`px-6 py-4 rounded-md ${slide.contentBg} ${slide.textColor} mb-4`}
                >
                  <h2 className="text-xl md:text-xl font-bold mb-4">
                    {slide.heading}
                  </h2>
                  <p className="text-lg md:text-xl">{slide.subtext}</p>
                </div>
                <a
                  href={slide.buttonLink}
                  className={`font-semibold text-sm py-1.5 px-4 rounded-md transition duration-300 bg-white text-gray-800 hover:bg-teal-700 hover:text-white ${
                    isLeft ? "self-start" : "self-end"
                  }`}
                >
                  Shop Now
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== Indicators ===== */}
      <div className="w-[90%] mx-auto mt-4 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>

      {/* ===== Overview ===== */}
      <div className="px-4 md:px-20 py-10">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Overview
        </h1>
        <p className="font-bold text-center max-w-4xl mx-auto">
          Explore our curated selection of high-quality shoes for every
          occasion. From durable athletic shoes designed for peak performance to
          stylish casual sneakers and elegant dress shoes, we offer a diverse
          range of footwear to suit your needs. Our user-friendly interface
          makes it easy to browse our collection and find the perfect pair,
          while detailed product descriptions and high-quality images ensure you
          make an informed decision. Join our community of style and discover
          your next favourite shoe!
        </p>
      </div>

      {/* ===== What Are You Looking For ===== */}
      <div className="px-4 md:px-20 py-10">
        <h2 className="text-xl font-bold mb-8 text-center text-gray-900">
          What are you looking for?
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex flex-col items-center cursor-pointer hover:scale-105 transform transition duration-300">
            <img
              src="/images/homemen.png"
              alt="Mens"
              className="w-full h-70 object-cover rounded-md shadow-md"
            />
            <span className="mt-4 text-lg font-semibold text-gray-800">
              Mens
            </span>
          </div>

          <div className="flex flex-col items-center cursor-pointer hover:scale-105 transform transition duration-300">
            <img
              src="/images/homewomen.png"
              alt="Womens"
              className="w-full h-70 object-cover rounded-md shadow-md"
            />
            <span className="mt-4 text-lg font-semibold text-gray-800">
              Womens
            </span>
          </div>

          <div className="flex flex-col items-center cursor-pointer hover:scale-105 transform transition duration-300">
            <img
              src="/images/homekids.png"
              alt="Kids"
              className="w-full h-70 object-cover rounded-md shadow-md"
            />
            <span className="mt-4 text-lg font-semibold text-gray-800">
              Kids
            </span>
          </div>
        </div>
      </div>

      {/* ===== New Trending ===== */}
      <div className="px-4 md:px-20 py-10">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">
          New Trending
        </h2>

        {allProducts.length === 0 ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : (
          <>
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {allProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-md p-4 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                >
                  <img
                    src={getImageUrl(product.image_url)}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-3"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/placeholder.png";
                    }}
                  />
                  <h3 className="text-lg text-gray-800 text-center">
                    {product.brand}
                  </h3>
                  <p className="text-gray-800 text-center">{product.name}</p>
                  <p className="text-gray-800 mt-1 text-center">
                    ₹{product.mrp}
                  </p>
                </div>
              ))}
            </div>

            {/* ✅ View All Button */}
            {allProducts.length >= 8 && (
              <div>
                <div className="flex justify-end mb-6">
                  <Link
                    to="/category/womens"
                    className="bg-teal-900 text-white px-6 py-2 rounded-lg"
                  >
                    View All
                  </Link>
                </div>

                {/* ✅ Animated Box Section */}
                <div
                  className={`border text-center p-6 font-bold text-3xl transition-all duration-1000 ${
                    isTeal
                      ? "bg-teal-700 text-white"
                      : "bg-white text-black border-gray-300"
                  }`}
                >
                  🎁 Get your first order with free gift & 50% offer 🎁
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
