import Hero from "../components/Hero";
import About from "../components/About";
import { useEffect, useRef, useState } from "react";
import API from "../api";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Github, ExternalLink, ArrowUpRight } from "lucide-react";
import useSEO from "../hooks/useSEO";

/* ─────────────────────────────────────────────
   MARQUEE TICKER
───────────────────────────────────────────── */
const Ticker = () => {
  const items = [
    "Full Stack Developer",
    "React · Django · Node.js",
    "Available for Hire",
    "Pakistan 🇵🇰",
    "Clean Code",
    "50+ Projects Shipped",
    "UI / UX",
    "Open to Remote",
  ];
  const repeated = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden bg-accent py-3 -rotate-[0.5deg] scale-105">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="text-accent-ink text-sm font-bold tracking-widest uppercase shrink-0"
          >
            {item}
            <span className="mx-4 opacity-40">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   STRIP HTML (CKEditor descriptions)
───────────────────────────────────────────── */
const stripHtml = (html) => {
  if (typeof html !== "string") return html || "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
};

/* ─────────────────────────────────────────────
   STACKED PROJECT CARD
───────────────────────────────────────────── */
const ProjectCard = ({ project, index, total }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale   = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.6]);
  const y       = useTransform(scrollYProgress, [0, 0.15], [60, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, y }}
      className="sticky top-24 mb-6"
    >
      <div className="relative rounded-3xl overflow-hidden border border-ink/[0.08] bg-card shadow-2xl min-h-[460px]">
        <div className="grid md:grid-cols-[1fr_1fr] gap-0 h-full min-h-[460px]">
          {/* Left — content */}
          <div className="flex flex-col justify-between p-10 md:p-12">

            {/* Top row: index */}
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-xs tracking-[0.2em] text-accent opacity-60">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              {project.year && (
                <span className="text-xs font-medium text-faint">{project.year}</span>
              )}
            </div>

            {/* Tags */}
            <div>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags?.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full font-mono text-[11px] font-medium bg-accent/10 text-accent border border-accent/25"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-ink leading-snug mb-4 tracking-tight">
                {project.title}
              </h3>

              <p className="text-muted text-sm leading-relaxed line-clamp-3">
                {stripHtml(project.description)}
              </p>
            </div>

            {/* Bottom actions */}
            <div className="flex items-center gap-3 mt-8">
              <Link
                to={`/project/${project.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-accent text-accent-ink hover:opacity-90 transition-opacity"
              >
                Case Study
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {(project.github_url || project.github_link) && (
                <a
                  href={project.github_url || project.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2.5 rounded-xl border border-ink/10 text-muted hover:text-ink hover:border-ink/30 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {(project.live_url || project.live_link) && (
                <a
                  href={project.live_url || project.live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live demo"
                  className="p-2.5 rounded-xl border border-ink/10 text-muted hover:text-ink hover:border-ink/30 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Right — image */}
          <div className="relative overflow-hidden hidden md:block">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgb(var(--card)) 0%, rgb(var(--card) / 0.5) 25%, transparent 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   SKILLS BENTO
───────────────────────────────────────────── */
const SkillsBento = ({ skills }) => {
  const groups = [
    { label: "Frontend", icon: "⚡", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"], span: "md:col-span-2" },
    { label: "Backend",  icon: "⚙️", items: ["Django", "Python", "Node.js", "Express"], span: "" },
    { label: "Database", icon: "🗄️", items: ["PostgreSQL", "MongoDB", "MySQL"], span: "" },
    { label: "Tools",    icon: "🔧", items: ["Git", "Docker", "AWS", "Figma"], span: "" },
    { label: "Mobile",   icon: "📱", items: ["React Native", "Expo"], span: "" },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {groups.map((group, i) => (
        <motion.div
          key={group.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className={`${group.span} rounded-2xl border border-ink/[0.07] bg-card p-6 hover:border-accent/30 transition-colors duration-300`}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">{group.icon}</span>
            <span className="text-xs font-semibold tracking-widest text-muted uppercase">
              {group.label}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => {
              const skill = skills.find(
                (s) => s.name === item || s.name?.includes(item.split(" ")[0])
              );
              return (
                <span
                  key={item}
                  className="px-3 py-1.5 rounded-lg bg-ink/[0.04] border border-ink/[0.07] text-sm text-ink/70 font-medium hover:bg-accent/10 hover:text-accent hover:border-accent/25 transition-colors duration-200 cursor-default"
                >
                  {item}
                  {skill && (
                    <span className="ml-2 text-xs font-mono text-accent/60">
                      {skill.proficiency}%
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────
   DUAL SHOWCASE MARQUEE
───────────────────────────────────────────── */
const ShowcaseMarquee = ({ images }) => {
  const row1 = images.slice(0, Math.ceil(images.length / 2));
  const row2 = images.slice(Math.ceil(images.length / 2));

  const Row = ({ items, direction = 1, speed = 30 }) => (
    <div className="flex gap-4 mb-4 overflow-hidden">
      <motion.div
        className="flex gap-4 shrink-0"
        animate={{ x: direction > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((img, i) => (
          <div
            key={i}
            className="w-64 h-44 rounded-2xl overflow-hidden shrink-0 border border-ink/[0.07]"
          >
            <img
              src={img.image}
              alt={img.title}
              loading="lazy"
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <div className="py-12">
      <Row items={[...row1, ...row2]} direction={1} speed={35} />
      <Row items={[...row2, ...row1]} direction={-1} speed={28} />
    </div>
  );
};

/* ─────────────────────────────────────────────
   SECTION HEADING
───────────────────────────────────────────── */
const SectionLabel = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="inline-flex items-center gap-3 mb-4"
  >
    <span className="w-8 h-px bg-accent" />
    <span className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
      {children}
    </span>
  </motion.div>
);

/* ─────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────── */
const Home = () => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  useSEO({
    title: "Home",
    description:
      "Muhammad Saim — Full Stack Developer specializing in React and Django. Building clean, fast, scalable web applications. Available for hire worldwide.",
    path: "/",
  });

  // CTA scroll text scale
  const ctaRef = useRef(null);
  const { scrollYProgress: ctaScroll } = useScroll({
    target: ctaRef,
    offset: ["start end", "center center"],
  });
  const ctaScale = useTransform(ctaScroll, [0, 1], [0.75, 1]);
  const ctaOpacity = useTransform(ctaScroll, [0, 0.4], [0, 1]);

  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, sRes] = await Promise.all([
          API.getProjects("?limit=3"),
          API.getSkills(),
        ]);
        const pData = Array.isArray(pRes) ? pRes : pRes?.data || pRes?.projects || [];
        const sData = Array.isArray(sRes) ? sRes : sRes?.data || sRes?.skills || [];
        setProjects((pData.length ? pData : getFallbackProjects()).slice(0, 3));
        setSkills(sData.length ? sData : getFallbackSkills());
      } catch {
        setProjects(getFallbackProjects());
        setSkills(getFallbackSkills());
      }
    };
    load();
  }, []);

  const getFallbackProjects = () => [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform with payment integration, real-time inventory management, and a powerful admin dashboard.",
      slug: "ecommerce-platform",
      tags: ["React", "Node.js", "MongoDB"],
      image: "https://images.pexels.com/photos/270632/pexels-photo-270632.jpeg",
    },
    {
      id: 2,
      title: "Analytics Dashboard",
      description: "Real-time analytics dashboard with customizable widgets, role-based access control, and comprehensive data export capabilities.",
      slug: "analytics-dashboard",
      tags: ["Next.js", "Tailwind", "Chart.js"],
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
    },
    {
      id: 3,
      title: "SaaS Platform",
      description: "Multi-tenant SaaS application with subscription management, team collaboration features, and automated billing via Stripe.",
      slug: "saas-platform",
      tags: ["React", "Django", "PostgreSQL"],
      image: "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg",
    },
  ];

  const getFallbackSkills = () => [
    { id: 1, name: "React", proficiency: 90 },
    { id: 2, name: "JavaScript", proficiency: 95 },
    { id: 3, name: "TypeScript", proficiency: 85 },
    { id: 4, name: "Tailwind CSS", proficiency: 94 },
    { id: 5, name: "Python", proficiency: 88 },
    { id: 6, name: "Django", proficiency: 92 },
    { id: 7, name: "Node.js", proficiency: 87 },
    { id: 8, name: "MongoDB", proficiency: 85 },
    { id: 9, name: "PostgreSQL", proficiency: 83 },
    { id: 10, name: "Docker", proficiency: 80 },
    { id: 11, name: "AWS", proficiency: 78 },
    { id: 12, name: "Git", proficiency: 95 },
    { id: 13, name: "React Native", proficiency: 82 },
    { id: 14, name: "Next.js", proficiency: 86 },
  ];

  const showcaseImages = [
    { id: 1, image: "https://images.pexels.com/photos/270632/pexels-photo-270632.jpeg", title: "E-Commerce" },
    { id: 2, image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg", title: "Dashboard" },
    { id: 3, image: "https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg", title: "Portfolio" },
    { id: 4, image: "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg", title: "Blog" },
    { id: 5, image: "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg", title: "SaaS" },
    { id: 6, image: "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg", title: "Mobile" },
  ];

  return (
    <div className="bg-base text-ink overflow-x-hidden">
      {/* ── Hero ─────────────────────────────── */}
      <Hero />

      {/* ── Ticker ───────────────────────────── */}
      <div className="overflow-hidden my-2">
        <Ticker />
      </div>

      {/* ── About ────────────────────────────── */}
      <About />

      {/* ── Skills Bento ─────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-soft">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Expertise</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-ink mb-4 tracking-tight"
          >
            Technologies I work with
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-muted text-lg mb-12 max-w-xl"
          >
            From pixel-perfect frontends to scalable backend systems — here's my full stack.
          </motion.p>
          <SkillsBento skills={skills} />
        </div>
      </section>

      {/* ── Projects — Stacked Scroll ─────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-base">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <SectionLabel>Selected Work</SectionLabel>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-ink tracking-tight"
              >
                Featured projects
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link
                to="/projects"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-accent transition-colors"
              >
                All projects <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Stacked cards */}
          <div>
            {projects.map((project, i) => (
              <ProjectCard key={project.id || i} project={project} index={i} total={projects.length} />
            ))}
          </div>

          <div className="sm:hidden mt-6 text-center">
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
              All projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Showcase Marquee ─────────────────── */}
      <section className="py-16 bg-soft overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-8">
          <SectionLabel>Design Gallery</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-ink tracking-tight"
          >
            A taste of the work
          </motion.h2>
        </div>
        <ShowcaseMarquee images={showcaseImages} />
      </section>

      {/* ── CTA — Scroll Scale ────────────────── */}
      <section
        ref={ctaRef}
        className="py-32 px-6 md:px-12 lg:px-20 bg-base overflow-hidden"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div style={{ scale: ctaScale, opacity: ctaOpacity }}>
            <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase mb-6">
              Open to opportunities
            </p>
            <h2 className="text-[clamp(3rem,9vw,7rem)] font-bold leading-[0.95] tracking-tight text-ink mb-8">
              Let's build
              <br />
              <span className="text-accent">something</span>
              <br />
              together.
            </h2>
            <p className="text-muted text-lg max-w-lg mb-10 leading-relaxed">
              Whether it's a startup MVP, a design system, or a full-scale
              application — I'm ready to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-accent hover:opacity-90 text-accent-ink text-sm font-bold rounded-xl transition-opacity duration-200"
              >
                Start a conversation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center px-8 py-4 border border-ink/10 hover:border-accent/50 text-muted hover:text-ink text-sm font-semibold rounded-xl transition-colors duration-200"
              >
                Browse projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
