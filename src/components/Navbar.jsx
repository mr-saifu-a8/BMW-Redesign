import { motion } from "framer-motion";
import { IoCarSport } from "react-icons/io5";

const Navbar = () => {
  return (
    
    <div className="w-full border-b border-zinc-400 h-15 flex p-10 items-center justify-between">
      <motion.div
        className="w-17 h-17"
        whileHover={{ rotate: 360 }}
        transition={{
          duration: 1, // kitni der me 360° complete ho
          ease: "easeInOut", // smooth rotation
        }}
      >
        <img
          className="w-full h-full"
          src="/src/assets/image/pngegg.png"
          alt="rotating-logo"
        />
      </motion.div>
      <div>
        <ul className='flex text-[#373B46] font-["poly"] gap-15'>
          <li>Home</li>
          <li>Models</li>
          <li>Electric</li>
          <li>Innovation</li>
          <li>Contact</li>
        </ul>
      </div>
      <div>
        <button className="bg-red-600 flex items-center justify-center gap-3 text-white px-6 p-2 rounded-sm">
          Test Drive
          <IoCarSport size={22} />
        </button>
      </div>
    </div>
  );
}

export default Navbar
