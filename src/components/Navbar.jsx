import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Home, 
  Briefcase, 
  BookOpen, 
  Layers, 
  Mail,
  Sparkles,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { 
      name: "Home", 
      path: "/", 
      icon: <Home className="w-4 h-4" /> 
    },
    { 
      name: "Projects", 
      path: "/projects", 
      icon: <Briefcase className="w-4 h-4" /> 
    },
    { 
      name: "Blogs", 
      path: "/blogs", 
      icon: <BookOpen className="w-4 h-4" /> 
    },
    { 
      name: "Services", 
      path: "/services", 
      icon: <Layers className="w-4 h-4" /> 
    },
    { 
      name: "Contact", 
      path: "/contact", 
      icon: <Mail className="w-4 h-4" /> 
    },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20 
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className={`p-2 rounded-lg ${
              darkMode 
                ? "bg-gradient-to-r from-teal-500/20 to-amber-500/20" 
                : "bg-gradient-to-r from-teal-500/10 to-amber-500/10"
            }`}>
              <Sparkles className={`w-5 h-5 ${
                darkMode ? "text-teal-400" : "text-teal-600"
              }`} />
            </div>
            <span className={`text-xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              Saim.dev
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Navigation Items */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative"
                >
                  <Link
                    to={item.path}
                    className={`relative px-4 py-2 flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                      location.pathname === item.path
                        ? "text-teal-500"
                        : darkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                    
                    {/* Active Indicator */}
                    {location.pathname === item.path && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-amber-500 rounded-full"
                        layoutId="navbar-indicator"
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    )}
                  </Link>

                  {/* Hover Effect */}
                  <AnimatePresence>
                    {hoveredItem === item.path && location.pathname !== item.path && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500/50 to-amber-500/50 rounded-full"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Theme Toggle & CTA */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={`relative w-14 h-7 rounded-full p-1 transition-colors ${
                  darkMode 
                    ? "bg-gray-800" 
                    : "bg-gray-200"
                }`}
                aria-label="Toggle theme"
              >
                <motion.div
                  className={`w-5 h-5 rounded-full shadow-lg ${
                    darkMode 
                      ? "bg-gradient-to-r from-teal-500 to-amber-500" 
                      : "bg-gradient-to-r from-amber-500 to-teal-500"
                  }`}
                  animate={{ x: darkMode ? 28 : 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
                <Sun className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-yellow-500" />
                <Moon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-300" />
              </motion.button>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-teal-500 to-amber-500 text-white text-sm font-semibold rounded-full hover:shadow-lg transition-all duration-300"
              >
                Hire Me
              </motion.a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                darkMode 
                  ? "bg-gray-800 text-gray-300" 
                  : "bg-gray-200 text-gray-700"
              }`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg ${
                darkMode 
                  ? "bg-gray-800 text-gray-300" 
                  : "bg-gray-200 text-gray-700"
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden overflow-hidden ${
              darkMode ? "bg-gray-900" : "bg-white"
            } shadow-2xl`}
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      location.pathname === item.path
                        ? "bg-gradient-to-r from-teal-500/10 to-amber-500/10 text-teal-500"
                        : darkMode
                        ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                    {location.pathname === item.path && (
                      <ChevronDown className="w-4 h-4 ml-auto rotate-90" />
                    )}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="pt-4"
              >
                <a
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-3 bg-gradient-to-r from-teal-500 to-amber-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Get In Touch
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;