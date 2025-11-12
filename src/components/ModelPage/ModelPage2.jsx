import React from "react";

const ModelPage2 = () => {
  
  const featureImageUrl1 = "/src/assets/image/bmw3.jpg";
  const featureImageUrl2 = "/src/assets/image/bmw4.jpg";

  return (
    <div
      // data-scroll
      // data-scroll-section
      // data-scroll-speed="1"
      className="min-h-screen text-[#373B46] bg-white"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative h-24 lg:h-auto lg:order-1">
          <video
            src="/src/assets/video/BMW M4 Cinematic Edit _ PHONK x Speed _ 4K Ultra HD.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          ></video>
        </div>

        <div className="p-8 lg:p-24 flex flex-col justify-start lg:order-2">
          {/* Main Title Block - Updated Content */}
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              THE BENCHMARK. THE LEGEND.{" "}
              <span className=" font-normal text-3xl lg:text-4xl">
                BMW M3 COMPETITION
              </span>
            </h1>
            <p className="text-xl font-medium text-gray-800 mt-2">
              [ High-Performance Engineering Meets Everyday Usability ]
            </p>
          </div>

          {/* Key Specifications (Highlighting Power and Speed) */}
          <div className="flex flex-col sm:flex-row sm:space-x-8 mb-8 text-center sm:text-left">
            <div className="text-3xl font-bold mb-2 sm:mb-0">
              510 HP
              <span className="block text-sm font-semibold text-gray-600">
                Max. Output
              </span>
            </div>
            <div className="text-3xl font-bold ">
              3.8s
              <span className="block text-sm font-semibold text-gray-600">
                0-60 MPH
              </span>
            </div>
          </div>

          {/* Image Gallery/Preview Section */}
          <div className="flex space-x-4 mb-10">
            {/* Front View Image */}
            <div className="w-1/2 overflow-hidden aspect-video rounded-lg shadow-lg">
              <img
                src={featureImageUrl1}
                alt="BMW M3 Carbon Seats and iDrive"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Interior View Image */}
            <div className="w-1/2 overflow-hidden aspect-video rounded-lg shadow-lg">
              <img
                src={featureImageUrl2}
                alt="BMW M3 Aggressive Kidney Grille"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Description Text Block - Updated Content */}
          <p className="text-base text-gray-700 max-w-lg leading-relaxed">
            Born from decades of motorsport expertise, the **BMW M3
            Competition** is a true track warrior meticulously engineered for
            the street. Its **M TwinPower Turbo Inline 6-cylinder** engine is
            built with a closed-deck construction and a forged lightweight
            crankshaft—technology pulled directly from the race track—to deliver
            a staggering 510 hp. Experience the perfect blend of dynamic
            agility, high-speed stability, and luxurious, cutting-edge interior
            technology.
          </p>

          {/* Call to Action */}
          <button className="mt-8 bg-red-600 text-white font-semibold py-3 px-8 rounded-lg shadow-xl hover:bg-red-700 transition duration-300 max-w-xs">
            Build Your Own M3
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelPage2;
