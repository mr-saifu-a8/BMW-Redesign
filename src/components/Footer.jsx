import { motion } from "framer-motion";

const Footer = () => {
  return (
    
    <footer className="bg-black text-white py-16 px-8 md:px-16 lg:px-24">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
        <div className="lg:w-1/2">
          <h1 className="text-5xl uppercase md:text-5xl font-bold mb-8">
            Service & Contact
          </h1>
          <p className="text-gray-400 mb-2">altitude@gmail.com</p>
          <p className="text-gray-400 text-sm max-w-sm">
            EXPERIENCE UNMATCHED LUXURY WITH OUR PREMIUM LEATHER BAGS,
            METICULOUSLY CRAFTED FOR EXCEPTIONAL COMFORT AND ENDURING STYLE.
          </p>
        </div>

        {/* Right section: Contact details, locations, and image */}
        <div className="lg:w-1/2 flex flex-col md:flex-row gap-8">
          {/* Contact info and locations */}
          <div className="flex-1">
            <p className="text-gray-400 mb-1">+887 243 0554 656</p>
            <p className="text-gray-400 mb-6">+854 432 5465 443</p>

            <h3 className="text-white font-semibold mb-2">UNITED STATES</h3>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              EXPERIENCE UNMATCHED LUXURY WITH OUR PREMIUM LEATHER BAGS,
              EXPERTLY.
            </p>

            <h3 className="text-white font-semibold mb-2">DENMARK</h3>
            <p className="text-gray-400 text-sm max-w-xs">
              EXPERIENCE UNMATCHED LUXURY WITH OUR PREMIUM LEATHER BAGS,
              EXPERTLY.
            </p>
          </div>

          <div className="w-full md:w-64  relative overflow-hidden">
            <motion.div
              className="w-64 h-64"
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
          </div>
        </div>
      </div>

      <p className="text-gray-500 mb-16 text-lg">CONTACT /</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                BMW in your country
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                BMW Group Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                EU Detergents Regulation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                REACH Regulation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Compatibility Check
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Connected Test Vehicle
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Cooperation Test Car
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                EU Battery Regulation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Parking Test Car
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Recalls and Technical Updates
              </a>
            </li>
          </ul>
        </div>

        {/* More BMW Websites */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">
            More BMW Websites
          </h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                BMW M
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                BMW M Motorsport
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                BMW Golfsport
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                BMW M Driving Experience
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                BMW Welt
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                BMW Group Classic
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                BMW Corporate/Direct Sales
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                BMW Group
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                BMW Group Cultural Engagement
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                BMW ConnectedDrive Upgrades
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">BMW.com</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                About BMW.com
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Imprint
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Legal Notice / Data protection
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Accessibility
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Visit us on</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                X
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-gray-400 text-sm mb-4 md:mb-0">
          <a href="#" className="hover:text-white transition-colors">
            BEHANCE <span className="text-gray-600">❯</span>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            DRIBBBLE <span className="text-gray-600">❯</span>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            FACEBOOK <span className="text-gray-600">❯</span>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            INSTAGRAM <span className="text-gray-600">❯</span>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            TWITTER <span className="text-gray-600">❯</span>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            LINKEDIN <span className="text-gray-600">❯</span>
          </a>
        </div>
        <p className="text-5xl font-extrabold text-white">© 25</p>
      </div>
    </footer>
  );
};

export default Footer;
