import { useEffect, useState } from "react";

export default function About() {
  const [aboutData, setAboutData] = useState({ about: "", mission: "" });

  useEffect(() => {
    fetch("http://localhost:8000/api/about/")
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch((err) => console.error("Error fetching about data:", err));
  }, []);

  return (
    <div className="px-6 md:px-16 py-12 bg-white text-gray-800">
      {/* Top About Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
        {/* Left Side - Text Content */}
        <div>
          <h1 className="text-3xl md:text-2xl font-bold text-center mb-8 text-gray-900">
            About StepUp
          </h1>
          <p className="text-sm leading-relaxed mb-10 text-center md:text-center">
            {aboutData.about || "Loading about section..."}
          </p>

          <h1 className="text-2xl font-semibold mb-4 text-center md:text-center text-gray-900">
            Our Mission
          </h1>
          <p className="text-sm leading-relaxed text-center md:text-center">
            {aboutData.mission || "Loading Mission..."}
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="flex justify-end w-full">
          <div className="bg-teal-900 rounded-full px-6 pt-6 pb-14 flex items-center justify-center shadow-lg">
            <img
              src="/images/aboutshoes.jpg"
              alt="StepUp Shoes"
              className="rounded-full max-w-xs md:max-w-sm lg:max-w-md object-contain"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mt-16">
        
        {/* Feature 1: Simplicity In Design */}
        <div className="flex flex-col items-center">
          {/* Empty circle for alignment */}
          <div className="w-20 h-20 mb-68"></div>
          <h2 className="text-lg font-semibold mb-4">Simplicity In Design</h2>
          <p className="text-sm text-gray-700">
            No flashy logos, no senseless details. Just the world’s most
            comfortable shoes, made naturally and designed practically. It’s
            that simple.
          </p>
        </div>

        {/* Feature 2: Confidence in Comfort (with image) */}
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 rounded-full p-2 shadow-md mb-6">
            <img
              src="/images/aboutshoes1.jpg"
              alt="Comfort"
              className="w-80 h-80 object-contain rounded-full"
            />
          </div>
          <h2 className="text-lg font-semibold mb-4">Confidence in Comfort</h2>
          <p className="text-sm text-gray-700">
            Trying is believing. Give our shoes a shot for 30 days, and if
            you’re not walking on cloud nine, we’ll take them back—no
            questions asked.
          </p>
        </div>

        {/* Feature 3: Made from Nature */}
        <div className="flex flex-col items-center">
          {/* Empty circle for alignment */}
          <div className="w-20 h-20 mb-68"></div>
          <h2 className="text-lg font-semibold mb-4">Made from Nature</h2>
          <p className="text-sm text-gray-700">
            The footwear industry often overlooks Mother Nature’s materials in
            favor of cheaper, synthetic alternatives. We think it’s time to
            change that.
          </p>
        </div>

      </div>
    </div>
  );
}
