import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Feature from "./Feature/Freature"; // Fixed typo
import ModelPage1 from "./ModelPage/ModelPage1";
import Footer from "./Footer";
import Header from "./Header";
import Video from "./Video";
import ModelPage2 from "./ModelPage/ModelPage2";

export default function Home() {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: "easeInOut",
      }}
      className="relative z-20 bg-transparent text-white"
    >
      <Navbar />

      {/* Hero section */}
      <section>
        <Hero />
      </section>

      <section>
        <Header />
      </section>
      <section>
        <Feature />
      </section>

      <section>
        <ModelPage1 />
      </section>

      <ModelPage2 />

      <Video />

      <section>
        <Footer />
      </section>
    </motion.main>
  );
}
