const ModelPage1 = () => {
  const videoUrl = "/src/assets/video/video2.mp4";
  const featureImageUrl1 = "/src/assets/image/bmw1.jpg";
  const featureImageUrl2 = "/src/assets/image/bmw2.jpg";

  return (
    <div className="h-screen mb-30 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-8 lg:p-24 flex flex-col justify-start">
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

          <div className="text-2xl font-semibold text-gray-800 mb-10">
            Starting from $82,600 (MSRP)
          </div>

          <div className="flex space-x-4 mb-10">
            <div className="w-1/2 overflow-hidden aspect-video">
              <img
                src={featureImageUrl1}
                alt="BMW M3 Competition front view"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-1/2 overflow-hidden aspect-video">
              <img
                src={featureImageUrl2}
                alt="BMW M3 Competition interior with curved display"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <p className="text-base text-gray-600 max-w-lg leading-relaxed">
            The BMW M3 Competition sets the benchmark for the performance sedan
            segment. Equipped with the M TwinPower Turbo Inline 6-cylinder
            engine, it delivers a massive 503 hp and accelerates from 0 to 60
            MPH in just 3.8 seconds It seamlessly blends racetrack-ready power
            with luxurious, everyday usability.
          </p>
        </div>

        <div className="relative lg:h-auto">
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[55vw] pt-15 object-cover object-center"
          >
          </video>
        </div>
      </div>
    </div>
  );
};

export default ModelPage1;
