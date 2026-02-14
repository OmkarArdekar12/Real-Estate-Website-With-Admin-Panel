import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  FaHome,
  FaBuilding,
  FaMapMarkerAlt,
  FaSwimmingPool,
  FaInfoCircle,
  FaHardHat,
  FaQuestionCircle,
  FaUserShield,
} from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";

export default function Navbar() {
  const { isAdmin, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", icon: <FaHome />, link: "/" },
    { name: "Overview", icon: <FaBuilding />, link: "#overview" },
    { name: "Connectivity", icon: <FaMapMarkerAlt />, link: "#connectivity" },
    { name: "Amenities", icon: <FaSwimmingPool />, link: "#amenities" },
    { name: "About", icon: <FaInfoCircle />, link: "#about" },
    { name: "Construction", icon: <FaHardHat />, link: "#construction" },
    { name: "FAQ", icon: <FaQuestionCircle />, link: "#faq" },
  ];

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <nav className="w-full px-6 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-yellow-400">
          RealEstate
        </Link>

        <div className="hidden lg:flex items-center space-x-6">
          {navItems.map((item, index) =>
            item.link.startsWith("/") ? (
              <NavLink
                key={index}
                to={item.link}
                className="flex flex-col items-center text-gray-600 hover:text-yellow-400 transition duration-200"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </NavLink>
            ) : (
              <a
                key={index}
                href={item.link}
                className="flex flex-col items-center text-gray-600 hover:text-yellow-400 transition duration-200"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </a>
            ),
          )}

          {isAdmin ? (
            <>
              <Link
                to="/admin/dashboard"
                className="flex gap-2 flex-wrap items-center justify-center text-yellow-400 border border-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-black transition duration-200"
              >
                <FaUserShield />
                <span className="text-sm">Dashboard</span>
              </Link>

              <button
                onClick={logout}
                className="text-red-500 border border-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/admin/login"
              className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition duration-200"
            >
              Admin Login
            </Link>
          )}
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-gray-700 cursor-pointer"
          >
            {isOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="lg:hidden bg-white shadow-lg px-6 py-4 space-y-4">
          {navItems.map((item, index) =>
            item.link.startsWith("/") ? (
              <NavLink
                key={index}
                to={item.link}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 text-gray-700 hover:text-yellow-400 transition duration-200"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ) : (
              <a
                key={index}
                href={item.link}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 text-gray-700 hover:text-yellow-400 transition duration-200"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </a>
            ),
          )}

          {isAdmin ? (
            <>
              <Link
                to="/admin/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 text-yellow-500"
              >
                <FaUserShield />
                <span>Dashboard</span>
              </Link>

              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/admin/login"
              onClick={() => setIsOpen(false)}
              className="bg-yellow-400 text-black px-4 py-2 rounded-md inline-block"
            >
              Admin Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
