import { motion } from "framer-motion";
import { FaCarSide } from "react-icons/fa";

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="pt-5 relative text-center px-4 sm:px-8 md:px-12 min-h-screen"
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-[8.5vw] sm:text-[6.3vw] pb-5 font-['mauline'] leading-19 text-[#373B46]"
      >
        The Ultimate <br /> Driving Machine
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className='text-lg sm:text-xl md:text-2xl font-["poly"] text-[#373B46]'
      >
        Experience innovation, performance, and design — all in one.
      </motion.p>

      {/* Button - SAFE positioning so it won't create scroll */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
        className="mt-10"
      >
        {/* using bottom + left responsive placement (keeps it visually where you want without expanding page height) */}
        <button
          className="absolute bottom-[12%] left-6 sm:left-10 md:left-20 z-50 cursor-pointer bg-[#373B46] border border-white py-2 rounded-full min-w-[12.5rem] min-h-[3.5rem] group max-w-full flex items-center justify-start hover:bg-red-600 hover:text-white transition-all duration-[0.8s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] shadow-[inset_1px_2px_5px_#00000080]"
          aria-label="Explore Model"
          data-cta="hero-explore"
          onClick={() =>
            document
              .getElementById("features")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <div className="absolute flex px-1 py-0.5 justify-start items-center inset-0">
            <div className="w-[0%] group-hover:w-full transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)]"></div>
            <div className="rounded-full shrink-0 flex justify-center items-center shadow-[inset_1px_-1px_3px_0_black] h-full aspect-square bg-white text-black transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] group-hover:bg-[#373B46]">
              <FaCarSide
                size={24}
                className=" group-hover:text-white transition-all duration-500"
              />
            </div>
          </div>

          <div className="pl-[3.8rem] text-lg pr-[1.1rem] group-hover:pl-[1.1rem] group-hover:pr-[3.4rem] font-['poly'] transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] text-white group-hover:text-white">
            Explore Model
          </div>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
