import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://shoewebsitebackend.onrender.com/api/enquiry/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="px-4 md:px-8 py-10 flex flex-col items-center">
      
      {/* Contact Info + Image Section */}
      <div className="flex flex-col md:flex-row items-start max-w-5xl w-full p-6">
        {/* Left Section: Contact Info */}
        <div className="md:w-1/2 w-full md:pr-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>

          <p className="text-gray-800 mb-2 font-bold text-xl">For Online Orders</p>
          <div className="mb-4">
            <p className="text-gray-800 text-sm">Inquiry / Complaint:</p>
            <p className="text-gray-800 text-sm font-medium">9097832500</p>
          </div>

          <p className="text-gray-800 mb-2 text-sm font-bold">Any other queries</p>
          <div className="mb-4 space-y-1">
            <p className="text-gray-800 text-sm font-medium">9097832502</p>
            <p className="text-gray-800 text-sm font-medium">9097832503</p>
            <p className="text-gray-800 text-sm font-medium">10.00 AM - 07.00 PM</p>
          </div>

          <div>
            <p className="text-gray-800 text-sm">Email: customercare.stepup.in@gmail.com</p>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="md:w-1/2 w-full flex justify-center items-start mt-8 md:mt-0">
          <img
            src="/images/contactimage.png"
            alt="Contact illustration"
            className="rounded-lg max-w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="w-full max-w-5xl border-t border-gray-800 my-2 mb-8" />

      {/* Enquiry Form Section */}
      <div className="w-full max-w-3xl p-6 bg-white">
        <h3 className="text-2xl font-bold text-gray-800 mb-10 text-start">Enquiry Form</h3>

        {submitted && (
          <p className="text-green-600 mb-4 font-semibold">Thank you! Your enquiry has been submitted.</p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-800 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email & Phone */}
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-800 mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-800 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-800 mb-1">Phone</label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-800 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Message Textarea */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">Message</label>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-800 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Send Button */}
          <div className="text-start">
            <button
              type="submit"
              className="bg-teal-800 text-xl text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
