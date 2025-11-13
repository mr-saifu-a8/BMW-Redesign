import React, { useState, useCallback } from "react";

const VideoCard = ({ src, smallText, title }) => {
  const [hovered, setHovered] = useState(false);

  const handleMove = useCallback(() => {
    if (!hovered) setHovered(true);
  }, [hovered]);

  const handleLeave = useCallback(() => {
    setHovered(false);
  }, []);

  return (
    <div
      className="relative w-[33%]  h-72 overflow-hidden"
      onMouseEnter={handleMove}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Background Video */}
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={`w-full h-full object-cover transform transition-transform duration-500 ${
          hovered ? "scale-105" : ""
        }`}
      />

      {/* Hover Overlay (Blur + Gloss) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Soft blur layer */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: hovered ? "rgba(255,255,255,0.18)" : "transparent",
            WebkitBackdropFilter: hovered ? "blur(6px)" : "none",
            backdropFilter: hovered ? "blur(6px)" : "none",
          }}
        />

        {/* Glossy light streak */}
        <div
          className="absolute -top-20 -left-24 w-72 h-40 transform rotate-12 transition-all duration-500"
          style={{
            opacity: hovered ? 0.85 : 0,
            translate: hovered ? "8px 0" : "0px 0px",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.85), rgba(255,255,255,0.05))",
            filter: hovered ? "blur(6px)" : "blur(0px)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Text */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center transform skew-x-[-10deg] bg-white/80 px-3 py-1 rounded-lg">
        <p className="text-xs text-gray-500">{smallText}</p>
        <p className="text-sm font-semibold">{title}</p>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header className="bg-white px-5 ">
      {/* --- Top Heading --- */}
      <h1 className="text-center text-[7.8vh] font-light tracking-wide text-gray-900 mb-10">
        ALL BMW MODELS
      </h1>

      {/* --- Slanted Video Cards Section --- */}
      <div className="flex  lg:flex-nowrap md:flex-nowrap  w-auto sm:px-0 justify-between items-start px-8 pb-16 relative gap-4">
        <VideoCard
          src="/src/assets/video/hoj-01-stage-hd.mp4"
          smallText="予防安全パッケージ"
          title="SAFETY SYSTEM +"
        />

        <VideoCard
          src="/src/assets/video/BMW M4 Cinematic Edit _ PHONK x Speed _ 4K Ultra HD.mp4"
          smallText="ザクサスのスペシャル動画"
          title="SPECIAL MOVIE"
        />

        <VideoCard
          src="/src/assets/video/6956154-hd_1920_1080_30fps.mp4"
          smallText="顧客満足度調査"
          title="CUSTOMER SATISFACTION SURVEY"
        />
      </div>

      <div className="border-t border-gray-200" />
    </header>
  );
};

export default Header;
