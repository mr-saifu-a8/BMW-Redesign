
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Loader({ onFinish, assetsToPreload = [], maxWait = 1200 }) {
  const [exiting, setExiting] = useState(false);

  // Prevent body scroll while loader active
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, []);

  // Helper: preload images (returns promise that resolves even on error)
  const preloadAssets = (urls = []) => {
    if (!urls || urls.length === 0) return Promise.resolve();
    const loaders = urls.map((u) => {
      return new Promise((res) => {
        const img = new Image();
        img.src = u;
        img.onload = () => res();
        img.onerror = () => res(); // resolve on error to avoid hang
      });
    });
    return Promise.all(loaders);
  };

  useEffect(() => {
    const video = document.getElementById("intro-video");
    if (!video) {
      // no video found - fallback quick exit
      const t = setTimeout(() => setExiting(true), 200);
      return () => clearTimeout(t);
    }

    // ensure autoplay allowed settings
    video.loop = false;
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    const handleEnded = async () => {
      // small pause for cinematic effect
      await new Promise((r) => setTimeout(r, 80));

      // Start preloading important assets but cap wait time
      const preloadPromise = preloadAssets(assetsToPreload);

      // whichever finishes first: preload or timeout
      await Promise.race([
        preloadPromise,
        new Promise((res) => setTimeout(res, maxWait)),
      ]);

      // start fade-out animation
      setExiting(true);
    };

    video.addEventListener("ended", handleEnded);
    // Safety: also handle errors (network)
    video.addEventListener("error", () => {
      // fallback to short timeout then exit
      setTimeout(() => setExiting(true), 200);
    });

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", () => {});
    };
  }, [assetsToPreload, maxWait]);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (exiting) onFinish && onFinish();
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      style={{ pointerEvents: exiting ? "none" : "auto" }}
    >
      <video
        id="intro-video"
        src="/src/assets/video/bmw-logo-video.mp4"
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
        // NOTE: do NOT add loop attribute
      />
      {/* Optional overlay: centered logo or subtle vignette */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Example small overlay logo (uncomment if you want) */}
        {/* <img src="/images/logo-white.svg" alt="BMW" className="h-12 opacity-90" /> */}
      </div>
    </motion.div>
  );
}
