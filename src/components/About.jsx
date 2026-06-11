import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { ArrowRight } from "lucide-react";

const About = () => {
  const textRef   = useRef(null);
  const sectionRef = useRef(null);

  // Sticky scroll — right panel scrolls while left sticks
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const bioOpacity    = useTransform(scrollYProgress, [0,    0.25, 0.45], [1, 1, 0]);
  const bioY          = useTransform(scrollYProgress, [0,    0.45],        [0, -40]);
  const stackOpacity  = useTransform(scrollYProgress, [0.35, 0.55, 0.75], [0, 1, 0]);
  const stackY        = useTransform(scrollYProgress, [0.35, 0.55, 0.75], [40, 0, -40]);
  const statsOpacity  = useTransform(scrollYProgress, [0.65, 0.8],         [0, 1]);
  const statsY        = useTransform(scrollYProgress, [0.65, 0.8],         [40, 0]);

  const imgScale      = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const imgY          = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  useEffect(() => {
    const typed = new Typed(textRef.current, {
      strings: [
        "I'm Muhammad Saim, a Full Stack Developer with 3+ years of experience building web applications people actually enjoy using. I specialize in React and Django, with a passion for clean architecture, performance, and thoughtful UI design.",
      ],
      typeSpeed: 20,
      backSpeed: 0,
      startDelay: 400,
      showCursor: true,
      cursorChar: "▌",
    });
    return () => typed.destroy();
  }, []);

  const stack = [
    { label: "Frontend",  items: "React · Next.js · TypeScript · Tailwind CSS" },
    { label: "Backend",   items: "Django · Python · Node.js · REST APIs" },
    { label: "Database",  items: "PostgreSQL · MongoDB · MySQL" },
    { label: "DevOps",    items: "Docker · AWS · GitHub Actions · Vercel" },
    { label: "Design",    items: "Figma · Framer Motion · GSAP" },
  ];

  const stats = [
    { value: "50+", label: "Projects completed" },
    { value: "30+", label: "Happy clients" },
    { value: "3+",  label: "Years of experience" },
    { value: "98%", label: "Client satisfaction" },
  ];

  return (
    // tall section so scroll-lock has room to play
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0a]"
      style={{ minHeight: "280vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Subtle divider top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — photo (parallax) */}
            <div className="relative hidden lg:block">
              <div className="rounded-2xl overflow-hidden" style={{ height: "560px" }}>
                <motion.img
                  style={{ scale: imgScale, y: imgY }}
                  src="https://res.cloudinary.com/dxommxt6d/image/upload/v1753074039/unnamed_ompsk6.jpg"
                  alt="Muhammad Saim"
                  className="w-full h-full object-cover"
                />
                {/* Top-left gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating name card */}
              <div className="absolute -bottom-5 -right-5 bg-[#111] border border-white/[0.08] rounded-2xl px-5 py-4">
                <div className="text-base font-bold text-white">Muhammad Saim</div>
                <div className="text-xs text-[#888] mt-0.5">Full Stack Developer · Pakistan 🇵🇰</div>
              </div>

              {/* Accent line */}
              <div className="absolute -left-4 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-[#0AFFE8]/50 to-transparent" />
            </div>

            {/* Right — scroll-driven content panels */}
            <div className="relative" style={{ minHeight: "460px" }}>

              {/* Section eyebrow — always visible */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-3">
                  <span className="w-8 h-px bg-[#0AFFE8]" />
                  <span className="text-xs font-semibold tracking-[0.2em] text-[#0AFFE8] uppercase">
                    About Me
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 tracking-tight leading-tight">
                  Crafting digital
                  <br />
                  <span className="text-[#0AFFE8]">experiences</span>
                </h2>
              </div>

              {/* Panel 1 — Bio typed */}
              <motion.div
                style={{ opacity: bioOpacity, y: bioY }}
                className="absolute top-36 left-0 right-0"
              >
                <div className="relative pl-5 border-l border-[#0AFFE8]/30">
                  <p
                    ref={textRef}
                    className="text-[#999] text-lg leading-relaxed min-h-[7rem]"
                  />
                </div>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-[#0AFFE8] hover:gap-3 transition-all"
                >
                  Work with me <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>

              {/* Panel 2 — Tech stack */}
              <motion.div
                style={{ opacity: stackOpacity, y: stackY }}
                className="absolute top-36 left-0 right-0"
              >
                <div className="space-y-3">
                  {stack.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 py-3 border-b border-white/[0.06]"
                    >
                      <span className="w-20 text-[10px] font-semibold tracking-widest text-[#555] uppercase pt-0.5 shrink-0">
                        {s.label}
                      </span>
                      <span className="text-sm text-[#aaa]">{s.items}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Panel 3 — Stats */}
              <motion.div
                style={{ opacity: statsOpacity, y: statsY }}
                className="absolute top-36 left-0 right-0"
              >
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((s, i) => (
                    <div
                      key={i}
                      className="p-6 rounded-2xl bg-[#111] border border-white/[0.06]"
                    >
                      <div className="text-4xl font-bold text-white tabular-nums mb-1">
                        {s.value}
                      </div>
                      <div className="text-sm text-[#666]">{s.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;