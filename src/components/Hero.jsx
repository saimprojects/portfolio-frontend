import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { ArrowRight, Rocket } from "lucide-react";

const Hero = () => {
  const typedRef = useRef(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll-driven transforms — "lock" feel
  const heroTextY    = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const heroOpacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const cardY        = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const cardScale    = useTransform(scrollYProgress, [0, 0.8], [1, 0.92]);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Full Stack Developer",
        "React Specialist",
        "Django Developer",
        "UI / UX Craftsman",
        "Problem Solver",
      ],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: "_",
    });
    return () => typed.destroy();
  }, []);

  const stats = [
    { value: "50+", label: "Projects" },
    { value: "30+", label: "Clients" },
    { value: "3+",  label: "Years" },
    { value: "98%", label: "Success" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center bg-[#0a0a0a] overflow-hidden"
    >
      {/* Subtle radial glow top-center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% -5%, rgba(10,255,232,0.07), transparent)",
        }}
      />

      {/* Very subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full py-32 relative z-10">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">

          {/* Left — text block (scroll-driven) */}
          <motion.div style={{ y: heroTextY, opacity: heroOpacity }}>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-3 mb-7"
            >
              <span className="w-8 h-px bg-[#0AFFE8]" />
              <span className="text-xs font-semibold tracking-[0.2em] text-[#0AFFE8] uppercase">
                Available for hire
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.6rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white mb-5"
            >
              Hi, I'm{" "}
              <span
                className="relative inline-block"
                style={{
                  WebkitTextStroke: "1px #0AFFE8",
                  color: "transparent",
                }}
              >
                Muhammad Saim
              </span>
            </motion.h1>

            {/* Typed subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-xl md:text-2xl text-[#888] mb-6"
            >
              I'm a{" "}
              <span
                ref={typedRef}
                className="font-semibold text-white"
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-[#666] text-lg leading-relaxed max-w-lg mb-10"
            >
              I build exceptional digital products — from pixel-perfect interfaces
              to rock-solid backend systems. Based in Pakistan, serving clients
              worldwide.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-3 mb-14"
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#0AFFE8] hover:bg-[#00e6d0] text-[#0a0a0a] text-sm font-bold rounded-xl transition-colors duration-200"
              >
                View My Work
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-white/10 hover:border-[#0AFFE8]/40 text-white/60 hover:text-white text-sm font-semibold rounded-xl transition-colors duration-200"
              >
                Get In Touch
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="grid grid-cols-4 gap-6 pt-8 border-t border-white/[0.06]"
            >
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-white tabular-nums">
                    {s.value}
                  </div>
                  <div className="text-xs text-[#666] mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — code card (scroll-driven) */}
          <motion.div
            style={{ y: cardY, scale: cardScale }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            {/* Glow behind card */}
            <div
              className="absolute -inset-8 rounded-3xl blur-3xl opacity-20 pointer-events-none"
              style={{ background: "radial-gradient(circle, #0AFFE8, transparent 70%)" }}
            />

            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#111] shadow-2xl">
              {/* Window bar */}
              <div className="flex items-center gap-1.5 px-5 py-3.5 border-b border-white/[0.06]">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-[#666] font-mono">developer.config.js</span>
              </div>

              {/* Code body */}
              <div className="p-6 font-mono text-sm leading-8">
                <div>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-[#0AFFE8]">dev</span>{" "}
                  <span className="text-white/40">= {"{"}</span>
                </div>
                {[
                  { k: "name",     v: '"Muhammad Saim"',            c: "#a5d6ff" },
                  { k: "title",    v: '"Full Stack Developer"',      c: "#a5d6ff" },
                  { k: "stack",    v: '["React","Django","Node.js"]',c: "#FFB547" },
                  { k: "location", v: '"Pakistan 🇵🇰"',              c: "#a5d6ff" },
                  { k: "years",    v: "3",                           c: "#79c0ff" },
                  { k: "openToWork", v: "true",                      c: "#0AFFE8" },
                ].map((line) => (
                  <div key={line.k} className="ml-6">
                    <span className="text-[#FFB547]">{line.k}</span>
                    <span className="text-white/40">: </span>
                    <span style={{ color: line.c }}>{line.v}</span>
                    <span className="text-white/40">,</span>
                  </div>
                ))}
                <div className="text-white/40">{"}"}</div>

                {/* Blinking cursor */}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.1, repeat: Infinity }}
                  className="inline-block mt-3 w-2 h-5 bg-[#0AFFE8]"
                />
              </div>
            </div>

            {/* Floating status badge */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -left-5 flex items-center gap-3 bg-[#111] border border-white/[0.08] rounded-xl px-4 py-3 shadow-xl"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0AFFE8] opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0AFFE8]" />
              </span>
              <div>
                <div className="text-xs text-[#888]">Status</div>
                <div className="text-sm font-semibold text-white">Open to Work</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-[#0AFFE8] to-transparent"
        />
        <span className="text-[10px] tracking-[0.25em] text-[#555] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;