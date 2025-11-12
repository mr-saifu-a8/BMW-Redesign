// import React from "react";

// const ModelPage1 = () => {
//   return (
//     // Main container with a light background and full viewport height
//     <div className="min-h-screen bg-white">
//       {/* Grid layout for two main columns: Left for content, Right for image */}
//       <div className="grid grid-cols-1 lg:grid-cols-2">
//         {/* === Left Column: Content === */}
//         <div className="p-8 lg:p-24 flex flex-col justify-start">
//           {/* Main Title Block */}
//           <div className="mb-10">
//             <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
//               Tesla Model 3{" "}
//               <span className="text-gray-600 font-light text-3xl lg:text-4xl">
//                 ( Standard )
//               </span>
//             </h1>
//             <p className="text-xl text-gray-700 mt-2">
//               [ An affordable electric sedan ]
//             </p>
//           </div>

//           {/* Price Tag (Using a div for better control over spacing/font) */}
//           <div className="text-2xl font-semibold text-gray-800 mb-10">
//             From $39,990{" "}
//             {/* I'll use a common placeholder price since the image text is small */}
//           </div>

//           {/* Image Gallery/Preview Section */}
//           <div className="flex space-x-4 mb-10">
//             {/* Main Preview Image */}
//             <div className="w-1/2 overflow-hidden aspect-video">
//               {/* Replace with actual image source */}
//               <img
//                 src="/src/assets/bottom.jpg"
//                 alt="Tesla Model 3 driving on road"
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Interior Preview Image */}
//             <div className="w-1/2 overflow-hidden aspect-video">
//               {/* Replace with actual image source */}
//               <img
//                 src="/src/assets/bottom.jpg"
//                 alt="Tesla Model 3 interior with panoramic roof"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>

//           {/* Description Text Block */}
//           <p className="text-base text-gray-600 max-w-lg leading-relaxed">
//             The **Tesla Model 3** is a mid-size electric sedan with a fastback
//             design. It offers up to **341 miles** of range and advanced safety
//             features. Launched in 2017, it aims to make electric vehicles more
//             accessible without compromising on performance.
//           </p>
//         </div>

//         {/* === Right Column: Main Image === */}
//         <div className="relative h-96 lg:h-auto">
//           {/* Main Hero Image - positioned to cover the right half */}
//           {/* Replace with actual image source */}
//           <img
//             src="/src/assets/bottom.jpg"
//             alt="Black Tesla Model 3 driving on a mountain road"
//             className="w-full h-full object-cover object-center"
//           />

//           {/* A potential overlay/gradient at the bottom if needed, but keeping it simple as per image */}
//           {/* <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-black/0"></div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModelPage1;

const ModelPage1 = () => {
  // Replace placeholder image URLs with actual BMW images
  const mainImageUrl = "/src/assets/top.jpg";
  const featureImageUrl1 = "/src/assets/top.jpg";
  const featureImageUrl2 = "/src/assets/top.jpg";

  return (
    // Main container with a light background and full viewport height
    <div className="min-h-screen bg-white">
      {/* Grid layout for two main columns: Left for content, Right for image */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* === Left Column: Content === */}
        <div className="p-8 lg:p-24 flex flex-col justify-start">
          {/* Main Title Block */}
          <div className="mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              BMW M3 Competition{" "}
              <span className="text-gray-600 font-light text-3xl lg:text-4xl">
                (Sedan)
              </span>
            </h1>
            <p className="text-xl text-gray-700 mt-2">
              [ The icon of High-Performance Driving ]
            </p>
          </div>

          {/* Price Tag */}
          <div className="text-2xl font-semibold text-gray-800 mb-10">
            Starting from **$82,600** (MSRP)
          </div>

          {/* Image Gallery/Preview Section */}
          <div className="flex space-x-4 mb-10">
            {/* Front View Image */}
            <div className="w-1/2 overflow-hidden aspect-video">
              <img
                src={featureImageUrl1}
                alt="BMW M3 Competition front view"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Interior View Image */}
            <div className="w-1/2 overflow-hidden aspect-video">
              <img
                src={featureImageUrl2}
                alt="BMW M3 Competition interior with curved display"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Description Text Block */}
          <p className="text-base text-gray-600 max-w-lg leading-relaxed">
            The **BMW M3 Competition** sets the benchmark for the performance
            sedan segment. Equipped with the **M TwinPower Turbo Inline
            6-cylinder** engine, it delivers a massive **503 hp** and
            accelerates from **0 to 60 MPH in just 3.8 seconds**. It seamlessly
            blends racetrack-ready power with luxurious, everyday usability.
          </p>
        </div>

        {/* === Right Column: Main Image === */}
        <div className="relative h-96 lg:h-auto">
          {/* Main Hero Image - positioned to cover the right half */}
          <img
            src={mainImageUrl}
            alt="Black BMW M3 Competition driving on a mountain road"
            className="w-full h-full pt-15 object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default ModelPage1;
