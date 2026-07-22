import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true, margin: "-60px" },
});

const About = () => {
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
    <section className="relative bg-base py-24 md:py-28">
      {/* Subtle divider top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-ink/[0.06]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-start">

          {/* Left — photo */}
          <motion.div {...fadeUp(0)} className="relative order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden max-h-[520px]">
              <img
                src="https://res.cloudinary.com/dxommxt6d/image/upload/v1753074039/unnamed_ompsk6.jpg"
                alt="Muhammad Saim"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating name card */}
            <div className="absolute -bottom-5 right-4 lg:-right-5 bg-card border border-ink/[0.08] rounded-2xl px-5 py-4 shadow-xl">
              <div className="text-base font-bold text-ink">Muhammad Saim</div>
              <div className="text-xs text-muted mt-0.5">Full Stack Developer · Pakistan 🇵🇰</div>
            </div>

            {/* Accent line */}
            <div className="hidden lg:block absolute -left-4 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
          </motion.div>

          {/* Right — content */}
          <div className="order-1 lg:order-2">
            {/* Eyebrow + heading */}
            <motion.div {...fadeUp(0)} className="mb-7">
              <div className="inline-flex items-center gap-3">
                <span className="w-8 h-px bg-accent" />
                <span className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                  About Me
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-ink mt-3 tracking-tight leading-tight">
                Crafting digital
                <br />
                <span className="text-accent">experiences</span>
              </h2>
            </motion.div>

            {/* Bio */}
            <motion.div {...fadeUp(0.1)} className="relative pl-5 border-l border-accent/40 mb-8">
              <p className="text-muted text-lg leading-relaxed">
                I'm Muhammad Saim, a Full Stack Developer with 3+ years of
                experience building web applications people actually enjoy using.
                I specialize in React and Django, with a passion for clean
                architecture, performance, and thoughtful UI design.
              </p>
            </motion.div>

            {/* Tech stack rows */}
            <motion.div {...fadeUp(0.15)} className="mb-8">
              {stack.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 py-3 border-b border-ink/[0.06]"
                >
                  <span className="w-20 text-[10px] font-semibold tracking-widest text-faint uppercase pt-0.5 shrink-0">
                    {s.label}
                  </span>
                  <span className="text-sm text-muted">{s.items}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.2)}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all"
              >
                Work with me <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Stats — full width row */}
        <motion.div
          {...fadeUp(0.1)}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-card border border-ink/[0.07] hover:border-accent/30 transition-colors"
            >
              <div className="text-4xl font-bold text-ink tabular-nums mb-1">
                {s.value}
              </div>
              <div className="text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
