import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

  const navItems = [
    { name: "Home",     path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Blogs",    path: "/blogs" },
    { name: "Services", path: "/services" },
    { name: "Contact",  path: "/contact" },
  ];

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <motion.nav
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="text-base font-bold tracking-tight text-white hover:text-[#0AFFE8] transition-colors"
          >
            saim<span className="text-[#0AFFE8]">.</span>dev
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-sm font-medium py-1 transition-colors duration-200 ${
                  isActive(item.path)
                    ? "text-white"
                    : "text-[#888] hover:text-white"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#0AFFE8]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-[#666] hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link
              to="/contact"
              className="px-4 py-2 bg-[#0AFFE8] hover:bg-[#00e6d0] text-[#0a0a0a] text-sm font-bold rounded-lg transition-colors duration-200"
            >
              Hire Me
            </Link>
          </div>

          {/* Mobile right */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[#666] hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-[#888] hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-[#0a0a0a] border-b border-white/[0.06]"
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? "bg-[#0AFFE8]/10 text-[#0AFFE8]"
                        : "text-[#888] hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    {item.name}
                    {isActive(item.path) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0AFFE8]" />
                    )}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-3 pb-1">
                <Link
                  to="/contact"
                  className="block w-full text-center px-4 py-2.5 bg-[#0AFFE8] hover:bg-[#00e6d0] text-[#0a0a0a] text-sm font-bold rounded-lg transition-colors"
                >
                  Hire Me
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;