import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Typed from "typed.js";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const Hero = () => {
  useEffect(() => {
    const typed = new Typed("#typed-text", {
      strings: [
        "Full Stack Developer",
        "UI/UX Enthusiast",
        "Code Craftsman",
        "Web Wizard",
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1500,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <section
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-0 bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3')",
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: ["#2DD4BF", "#F59E0B"] },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 0.5, direction: "none", random: true },
          },
          interactivity: {
            events: { onhover: { enable: true, mode: "repulse" } },
          },
        }}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-white/20 dark:bg-black/50 backdrop-blur-sm" />
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          Hi, I'm Muhammad Saim
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          A passionate <span id="typed-text" className="text-teal-500 font-semibold" />
        </motion.p>
        <motion.div
          className="flex space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.1, rotateX: 10 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/projects"
              className="px-6 py-3 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-medium transition-all"
            >
              View Projects
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, rotateX: 10 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full border border-gray-400 dark:border-gray-600 hover:border-teal-500 text-gray-700 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400 transition-all"
            >
              Contact Me
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;