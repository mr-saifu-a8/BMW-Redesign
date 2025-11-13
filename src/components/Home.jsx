// import { motion } from "framer-motion";
// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";

// export default function Home() {
//   const prefersReducedMotion =
//     typeof window !== "undefined" &&
//     window.matchMedia &&
//     window.matchMedia("(prefers-reduced-motion: reduce)").matches;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }} // only fade in
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }} // fade out
//       transition={{
//         duration: prefersReducedMotion ? 0 : 0.45,
//         ease: "easeOut",
//       }}
//       className="bg-black min-h-screen text-white"
//     >
//       <Navbar />
//       <Hero />
//       {/* other sections */}
//     </motion.div>
//   );
// }

// import { motion } from "framer-motion";
// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";

// export default function Home() {
//   const prefersReducedMotion =
//     typeof window !== "undefined" &&
//     window.matchMedia &&
//     window.matchMedia("(prefers-reduced-motion: reduce)").matches;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }} // start invisible
//       animate={{ opacity: 1 }} // fade in smoothly
//       exit={{ opacity: 0 }} // fade out if needed
//       transition={{
//         duration: prefersReducedMotion ? 0 : 0.6,
//         ease: "easeInOut",
//       }}
//     >
//       <Navbar />
//       <Hero />

//     </motion.div>
//   );
// }

// import { motion } from "framer-motion";
// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";
// import Feature from "./Feature/Freature";
// // import Header from "./FeatureSection/";
// // import Video from "./FeatureSection/Video";
// // import Footer from "./Footer";
// import ModelPage1 from "./ModelPage/ModelPage1";
// // import OtherSection from "./OtherSection";

// export default function Home() {
//   const prefersReducedMotion =
//     typeof window !== "undefined" &&
//     window.matchMedia &&
//     window.matchMedia("(prefers-reduced-motion: reduce)").matches;

//   return (
//     <motion.main
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{
//         duration: prefersReducedMotion ? 0 : 0.6,
//         ease: "easeInOut",
//       }}
//       className="relative z-20 bg-transparent text-white"
//     >
//       <Navbar />

//       {/* Hero MUST occupy the first viewport so everything else sits below */}
//       <section id="hero" className="min-h-screen">
//         <Hero />
//       </section>

//       <section>
//         <Header />
//       </section>
//       {/* Feature will now be below the Hero in normal document flow */}
//       <section id="features" className="w-full">
//         <Feature />
//       </section>

//       <section>
//         <Video />
//       </section>
//       <section>
//         <ModelPage1 />
//       </section>

//       <section>
//         <Footer />
//       </section>
//       {/* Add more sections below in the same way */}
//       {/* <section id="gallery"><Gallery /></section> */}
//       {/* <section id="cta"><CTA /></section> */}
//     </motion.main>
//   );
// }

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
