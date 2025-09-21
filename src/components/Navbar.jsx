import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Navbar() {
  const {cartCount} = useCart();
  const [activeLink, setActiveLink] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    // optional: automatically set active link from path
    const path = location.pathname;
    if (path.startsWith("/category/")) setActiveLink("Category");
    else if (path === "/") setActiveLink("Home");
    else if (path === "/about") setActiveLink("About Us");
    else setActiveLink(""); // fallback
  }, [location]);

 

  const categories = [
    { name: "Womens", slug: "womens" },
    { name: "Mens", slug: "mens" },
    { name: "Kids", slug: "kids" },
    { name: "Brands", slug: "brands" },
    { name: "Offers", slug: "offers" },
  ];

  const links = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Log in", path: "/login" },
  ];

  return (
    <header className="bg-teal-900 text-white w-full m-0 p-0">
      {/* Top Main Header */}
      <div className="w-full px-5 py-4 flex items-center justify-between">
        {/* Left: Logo + Search */}
        <div className="flex items-center space-x-6">
          <img
            src="/images/logo.jpg"
            alt="StepUp Logo"
            className="h-12 w-12 rounded-full object-cover"
          />

          <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md max-w-md">
            <svg
              className="w-5 h-5 text-gray-500 mr-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              ></path>
            </svg>
            <input
              type="text"
              placeholder="Search here"
              className="w-full outline-none text-black placeholder-gray-500 bg-transparent"
            />
          </div>
        </div>

        {/* Right: Navigation Links */}
        <nav className="flex space-x-6 text-sm font-medium items-center">
          {links.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setActiveLink(name)}
              className={`hover:text-pink-400 ${activeLink === name ? "text-pink-600 font-bold" : ""}`}
            >
              {name}
            </Link>
          ))}

          {/* Cart with icon next to text */}
          <Link to="/cart" className="flex items-center hover:text-pink-400 relative">
            <span className="mr-1">Cart</span>
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h14l-1.35 6.42A2 2 0 0117.66 21H8.34a2 2 0 01-1.99-1.58L4 4H2"
              ></path>
            </svg>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>

      {/* Middle StepUp.in Section with Back Button */}
      <div className="w-full bg-white py-4 border-b-2 border-gray-500">
        <div className="relative flex items-center justify-center">
          {/* Back Button - Left aligned */}
          <button
            onClick={() => window.history.back()}
            className="absolute left-4 flex items-center text-gray-900 hover:text-teal-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {/* Centered Title */}
          <h1 className="text-3xl font-bold text-gray-800">StepUp.in</h1> 
        </div>
      </div>

      {/* Category row - place it directly below the centered StepUp.in section */}
      <div className="bg-white py-3 border-b-1 border-gray-800">
        <div className="max-w-screen-xl mx-auto flex justify-center gap-8">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/category/${c.slug}`}
              onClick={() => setActiveLink("Category")}
              className="text-sm text-gray-900 hover:text-teal-600 font-bold"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
