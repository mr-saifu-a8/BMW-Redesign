import { IoCarSport } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="w-full border-b border-zinc-400 h-15 flex p-10 items-center justify-between">
      <div className="w-13 h-13">
        <img className="w-full h-full" src="/src/assets/BMW.png" alt="" />
      </div>
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
