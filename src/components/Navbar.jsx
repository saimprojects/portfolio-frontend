import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Blogs", path: "/blogs" },
    { name: "Services", path: "/services" }, // Added Services
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg shadow-md px-6 py-4 flex justify-between items-center"
    >
      <motion.h1
        className="text-xl font-extrabold text-gray-800 dark:text-white"
        whileHover={{ scale: 1.05 }}
      >
        Saim.dev
      </motion.h1>

      <div className="flex items-center space-x-4">
        <ul className={`md:flex space-x-6 items-center ${isOpen ? "flex flex-col absolute top-16 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg p-4" : "hidden md:flex"}`}>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`relative text-sm font-medium transition ${
                  location.pathname === item.path
                    ? "text-teal-500 font-semibold"
                    : "text-gray-700 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-500"
                    layoutId="underline"
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
        <motion.div
          className="relative w-12 h-6 bg-gray-200 dark:bg-gray-800 rounded-full p-1 cursor-pointer"
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className="w-4 h-4 bg-teal-500 rounded-full"
            animate={{ x: darkMode ? 24 : 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
          <motion.div
            className="absolute top-1 left-2"
            animate={{ opacity: darkMode ? 0 : 1 }}
          >
            <Sun size={16} className="text-yellow-400" />
          </motion.div>
          <motion.div
            className="absolute top-1 right-2"
            animate={{ opacity: darkMode ? 1 : 0 }}
          >
            <Moon size={16} className="text-gray-300" />
          </motion.div>
        </motion.div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;