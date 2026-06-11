import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { ArrowRight, Download } from "lucide-react";

const Hero = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Full Stack Developer",
        "UI/UX Designer",
        "Problem Solver",
        "Code Craftsman",
      ],
      typeSpeed: 55,
      backSpeed: 35,
      backDelay: 1800,
      loop: true,
      showCursor: true,
      cursorChar: "_",
    });
    return () => typed.destroy();
  }, []);

  const stats = [
    { value: "50+", label: "Projects" },
    { value: "30+", label: "Clients" },
    { value: "3+", label: "Years" },
    { value: "98%", label: "Success" },
  ];

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="relative min-h-screen flex items-center bg-white dark:bg-[#0a0a0a]">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none dark:hidden"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(13,148,136,0.06), transparent)" }}
      />
      <div className="absolute inset-0 pointer-events-none hidden dark:block"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(13,148,136,0.08), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full py-32">
        <div className="grid lg:grid-cols-[1fr_400px] gap-20 items-center">
          {/* Left */}
          <div>
            {/* Eyebrow */}
            <motion.div {...fadeUp(0.1)}>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-6">
                <span className="w-6 h-px bg-teal-500" />
                Available for hire
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              {...fadeUp(0.2)}
              className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-gray-900 dark:text-white mb-4"
            >
              Hi, I'm{" "}
              <span className="text-teal-500">Muhammad Saim</span>
            </motion.h1>

            {/* Typed */}
            <motion.div {...fadeUp(0.3)} className="mb-6">
              <span className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-light">
                I specialize in{" "}
              </span>
              <span
                ref={typedRef}
                className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white"
              />
            </motion.div>

            {/* Description */}
            <motion.p
              {...fadeUp(0.4)}
              className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl mb-10"
            >
              I craft fast, accessible, and visually refined web applications —
              from pixel-perfect interfaces to scalable backend systems. Based in
              Pakistan, working worldwide.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-3 mb-16">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-lg transition-colors duration-200"
              >
                View My Work
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-transparent border border-gray-200 dark:border-gray-800 hover:border-teal-500 dark:hover:border-teal-500 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-lg transition-colors duration-200"
              >
                Get In Touch
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              {...fadeUp(0.6)}
              className="grid grid-cols-4 gap-8 pt-8 border-t border-gray-100 dark:border-gray-800"
            >
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums">
                    {s.value}
                  </div>
                  <div className="text-sm text-gray-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Code card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-[#0d1117] shadow-2xl">
              {/* Window bar */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-gray-500 font-mono">portfolio.jsx</span>
              </div>

              {/* Code */}
              <div className="p-6 font-mono text-sm leading-7">
                <div>
                  <span className="text-[#ff7b72]">const</span>{" "}
                  <span className="text-[#79c0ff]">Developer</span>{" "}
                  <span className="text-gray-400">= {"{"}</span>
                </div>
                {[
                  { key: "name", val: '"Muhammad Saim"', c: "#a5d6ff" },
                  { key: "role", val: '"Full Stack Developer"', c: "#a5d6ff" },
                  { key: "stack", val: '["React", "Django", "Node.js"]', c: "#ffa657" },
                  { key: "location", val: '"Pakistan 🇵🇰"', c: "#a5d6ff" },
                  { key: "open", val: "true", c: "#79c0ff" },
                ].map((line, i) => (
                  <div key={i} className="ml-6">
                    <span className="text-[#e3b341]">{line.key}</span>
                    <span className="text-gray-400">: </span>
                    <span style={{ color: line.c }}>{line.val}</span>
                    <span className="text-gray-400">,</span>
                  </div>
                ))}
                <div className="text-gray-400">{"};"}</div>

                {/* Blinking cursor */}
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="mt-4 w-2 h-5 bg-teal-400 inline-block"
                />
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 shadow-lg"
            >
              <div className="text-xs text-gray-400 mb-0.5">Currently building</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">SaaS Platform</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-400"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-transparent to-gray-400"
        />
        <span className="text-xs tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;