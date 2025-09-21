import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-teal-900 text-white py-10 px-2">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Contact Us */}
        <div className="md:w-1/5 text-start">
          <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
          <p className="text-xs">
            We'd love to hear from you!<br />
            Landline : XXXXXXXXXXXXXX<br />
            WhatsApp : +91XXXXXXXXXX<br />
            Email : stepup@gmail.com<br />
            Address: 2/88, yyyyyyyyyyyy<br />
            Tenkasi, Tamilnadu, India.
          </p>
        </div>
        {/* Shop */}
        <div className="md:w-1/5 text-start">
          <h2 className="text-lg font-semibold mb-3">Shop</h2>
          <ul className="text-xs space-y-1 list-disc list-inside">
            <li>New in</li>
            <li>Women</li>
            <li>Men</li>
            <li>Accessories</li>
            <li>Heels</li>
            <li>About us</li>
          </ul>
        </div>
        {/* Info */}
        <div className="md:w-1/5 text-start">
          <h2 className="text-lg font-semibold mb-3">Info</h2>
          <ul className="text-xs space-y-1 list-disc list-inside">
            <li>Search</li>
            <li>Return & Exchange Policy</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Shipping Policy</li>
            <li>Blogs</li>
          </ul>
        </div>
        {/* Social Media */}
        <div className="md:w-1/5 text-start">
          <h2 className="text-lg font-semibold mb-3">Social Media</h2>
          <div className="flex space-x-3 mt-2">
            <a href="#" className="hover:text-blue-500"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-pink-400"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-sky-400"><FaTwitter size={20} /></a>
          </div>
        </div>
        {/* Newsletter */}
        <div className="md:w-1/5 text-start">
          <h2 className="text-lg font-semibold mb-2">Lets stay in touch !</h2>
          <p className="text-sm mb-3">
            Sign up for exclusive offers, original stories, events and more.
          </p>
          <form className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm mb-1">Email id</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="px-3 py-1 text-black bg-white"
            />
            <button
              type="submit"
              className="bg-white text-black text-sm mt-2 font-semibold px-2 py-1 hover:bg-teal-700 hover:text-dark transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
