import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { 
  ArrowRight, 
  Download, 
  Sparkles, 
  Code, 
  Palette,
  Rocket
} from "lucide-react";

const Hero = () => {
  const typedRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Full Stack Developer",
        "UI/UX Designer",
        "Problem Solver",
        "Tech Enthusiast",
        "Code Craftsman",
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: "▌",
    });

    return () => typed.destroy();
  }, []);

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const stats = [
    { value: "50+", label: "Projects Completed" },
    { value: "30+", label: "Happy Clients" },
    { value: "3+", label: "Years Experience" },
    { value: "98%", label: "Success Rate" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-12">
      {/* Animated Background Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0"
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: ["#0d9488", "#f59e0b", "#8b5cf6"],
            },
            links: {
              color: "#0d9488",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 60,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-amber-500/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/50 dark:from-black/50 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/10 to-amber-500/10 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                Welcome to my portfolio
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold"
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-teal-500 via-amber-500 to-purple-500 bg-clip-text text-transparent">
                Muhammad Saim
              </span>
            </motion.h1>

            {/* Typed Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300"
            >
              <span className="font-medium">I'm a </span>
              <span ref={typedRef} className="text-teal-500 font-semibold" />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl"
            >
              I build exceptional digital experiences that are fast, accessible, 
              visually appealing, and responsive. Let's bring your ideas to life!
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link
                to="/projects"
                className="group inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-teal-500 to-amber-500 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <span>View My Work</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-8 py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl hover:border-teal-500 hover:scale-105 transition-all duration-300"
              >
                <span>Get In Touch</span>
                <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50"
                >
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Card/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 90 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            {/* Floating Card */}
            <div className="relative perspective-1000">
              {/* Main Card */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotateX: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative rounded-3xl overflow-hidden border-4 border-white dark:border-gray-900 shadow-2xl bg-gradient-to-br from-gray-900 to-black"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Code Editor Simulation */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="text-sm text-gray-400">portfolio.jsx</div>
                  </div>
                  
                  <div className="font-mono text-sm space-y-2">
                    <div className="text-gray-400">
                      <span className="text-purple-500">const</span>{' '}
                      <span className="text-teal-400">Developer</span> = {'{'}
                    </div>
                    <div className="text-gray-400 ml-4">
                      <span className="text-amber-400">name</span>:
                      <span className="text-green-400"> "Muhammad Saim"</span>,
                    </div>
                    <div className="text-gray-400 ml-4">
                      <span className="text-amber-400">role</span>:
                      <span className="text-green-400"> "Full Stack Developer"</span>,
                    </div>
                    <div className="text-gray-400 ml-4">
                      <span className="text-amber-400">skills</span>:[
                      <span className="text-blue-400">"React"</span>,
                      <span className="text-blue-400">"Django"</span>,
                      <span className="text-blue-400">"JavaScript"</span>
                      ],
                    </div>
                    <div className="text-gray-400 ml-4">
                      <span className="text-amber-400">passion</span>:
                      <span className="text-green-400"> "Building amazing web experiences"</span>
                    </div>
                    <div className="text-gray-400">{'};'}</div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute top-1/4 -right-8 p-3 bg-gradient-to-r from-teal-500 to-amber-500 rounded-xl shadow-xl"
                >
                  <Code className="w-6 h-6 text-white" />
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                  className="absolute bottom-1/4 -left-8 p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-xl"
                >
                  <Palette className="w-6 h-6 text-white" />
                </motion.div>
              </motion.div>

              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/20 via-amber-500/20 to-purple-500/20 rounded-3xl blur-2xl -z-10" />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400"
          >
            <span className="text-sm">Scroll down</span>
            <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full p-1">
              <div className="w-1.5 h-3 bg-gray-400 dark:bg-gray-600 rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;