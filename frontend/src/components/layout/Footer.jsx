import { FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-gray-300 py-16 mt-20">
      <div className="w-full px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <img src="Logo.png" alt="Real Estate" className="h-40 w-auto" />
          <p className="text-sm leading-relaxed">
            Building modern living spaces that redefine comfort, luxury, and
            urban connectivity.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold pb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#hero" className="hover:text-yellow-400">
                Main
              </a>
            </li>
            <li>
              <a href="#overview" className="hover:text-yellow-400">
                Overview
              </a>
            </li>
            <li>
              <a href="#amenities" className="hover:text-yellow-400">
                Amenities
              </a>
            </li>
            <li>
              <a href="#construction" className="hover:text-yellow-400">
                Construction
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-yellow-400">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold pb-4 text-white">Contact Us</h3>
          <div className="flex space-x-4 text-xl">
            <FaGithub className="hover:text-yellow-400 cursor-pointer" />
            <FaLinkedinIn className="hover:text-yellow-400 cursor-pointer" />
          </div>
        </div>
      </div>

      <a
        href="https://github.com/OmkarArdekar12/Real-Estate-Website-With-Admin-Panel"
        className="block border-t border-gray-700 mt-12 pt-6 text-center text-sm hover:underline"
      >
        © {new Date().getFullYear()} RealEstate. All rights reserved.
      </a>
    </footer>
  );
}
