"use client";

import React, { useState, useEffect } from "react";
import Loader from "./components/Loader";
import FluidHero from "./components/FluidHero";
import Home from "./components/Home";
import TOP_IMAGE from "./assets/image/top.jpg";
import BOTTOM_IMAGE from "./assets/image/bottom-img.jpg";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showHero, setShowHero] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize LocomotiveScroll only once on client
  useEffect(() => {
    if (mounted) {
      try {
        import("locomotive-scroll")
          .then(({ default: LocomotiveScroll }) => {
            new LocomotiveScroll();
          })
          .catch((err) => {
            console.warn("LocomotiveScroll load failed:", err);
          });
      } catch (e) {
        // Fallback if LocomotiveScroll fails
      }
    }
  }, [mounted]);

  useEffect(() => {
    const fallback = setTimeout(() => setLoading(false), 7000);
    return () => clearTimeout(fallback);
  }, []);

  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => setShowHero(true), 100);
      return () => clearTimeout(t);
    }
  }, [loading]);

  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden">
      {/* background visual — absolute so it's behind page flow */}
      {mounted && (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            showHero ? "opacity-100" : "opacity-0"
          } z-0 pointer-events-none`}
        >
          <FluidHero
            topImagePath={TOP_IMAGE}
            bottomImagePath={BOTTOM_IMAGE}
            isTopVideo={false}
          />
        </div>
      )}

      {showHero && mounted && (
        <div>
          <Home />
        </div>
      )}

      {/* Loader overlay above everything while loading */}
      {loading && mounted && (
        <div className="fixed inset-0 z-30">
          <Loader
            assetsToPreload={[TOP_IMAGE, BOTTOM_IMAGE]}
            maxWait={900}
            onFinish={() => setLoading(false)}
          />
        </div>
      )}
    </div>
  );
}
