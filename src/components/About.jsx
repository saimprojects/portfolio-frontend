import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { ArrowRight } from "lucide-react";

const About = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(textRef.current, {
      strings: [
        "I'm a Full Stack Developer with 3+ years of experience building modern web applications. I specialize in React and Django, with a strong focus on clean code, performance, and user experience. I've shipped products for 30+ clients ranging from startups to established businesses.",
      ],
      typeSpeed: 18,
      backSpeed: 0,
      startDelay: 300,
      showCursor: true,
      cursorChar: "▌",
    });
    return () => typed.destroy();
  }, []);

  const stats = [
    { value: "50+", label: "Projects completed" },
    { value: "30+", label: "Happy clients" },
    { value: "3+", label: "Years experience" },
    { value: "98%", label: "Client satisfaction" },
  ];

  const stack = [
    { label: "Frontend", items: "React · Next.js · TypeScript · Tailwind" },
    { label: "Backend", items: "Django · Python · Node.js · PostgreSQL" },
    { label: "Tools", items: "Figma · Docker · AWS · Git" },
  ];

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    viewport: { once: true },
  });

  return (
    <section className="py-28 px-6 md:px-12 lg:px-16 bg-gray-50 dark:bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <motion.div {...fadeUp(0)}>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-12">
            <span className="w-6 h-px bg-teal-500" />
            About Me
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-20 items-start">
          {/* Left */}
          <div>
            <motion.h2
              {...fadeUp(0.1)}
              className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight text-gray-900 dark:text-white mb-8"
            >
              Building products people{" "}
              <span className="text-teal-500">actually enjoy</span> using
            </motion.h2>

            {/* Typed paragraph */}
            <motion.div {...fadeUp(0.2)} className="relative mb-10">
              <div className="absolute -left-5 top-0 bottom-0 w-0.5 bg-teal-500 rounded-full" />
              <p
                ref={textRef}
                className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed pl-2 min-h-[5rem]"
              />
            </motion.div>

            {/* Stack */}
            <motion.div {...fadeUp(0.3)} className="space-y-3 mb-10">
              {stack.map((s, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 py-3 border-b border-gray-100 dark:border-gray-800"
                >
                  <span className="w-24 text-xs font-semibold text-gray-400 uppercase tracking-wider pt-0.5 shrink-0">
                    {s.label}
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {s.items}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.4)}>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-teal-500 hover:text-teal-600 transition-colors"
              >
                Let's work together
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Right */}
          <div>
            {/* Photo */}
            <motion.div
              {...fadeUp(0.15)}
              className="relative rounded-2xl overflow-hidden aspect-[4/5] mb-8"
            >
              <img
                src="https://res.cloudinary.com/dxommxt6d/image/upload/v1753074039/unnamed_ompsk6.jpg"
                alt="Muhammad Saim"
                className="w-full h-full object-cover"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              {/* Name tag */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl px-4 py-3">
                <div className="font-bold text-gray-900 dark:text-white text-sm">
                  Muhammad Saim
                </div>
                <div className="text-xs text-gray-500">Full Stack Developer · Pakistan</div>
              </div>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              {...fadeUp(0.25)}
              className="grid grid-cols-2 gap-3"
            >
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800"
                >
                  <div className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums">
                    {s.value}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;