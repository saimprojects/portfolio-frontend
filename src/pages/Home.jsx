import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import { useEffect, useState } from "react";
import API from "../api";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Github, ExternalLink } from "lucide-react";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.getProjects("?limit=3");
        let data = [];
        if (Array.isArray(res)) data = res;
        else if (res?.data && Array.isArray(res.data)) data = res.data;
        else if (res?.projects && Array.isArray(res.projects)) data = res.projects;
        else data = getFallbackProjects();
        setProjects(data);
      } catch {
        setProjects(getFallbackProjects());
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const getFallbackProjects = () => [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with payment integration, real-time inventory, and an admin dashboard.",
      slug: "ecommerce-platform",
      tags: ["React", "Node.js", "MongoDB"],
      image: "https://images.pexels.com/photos/270632/pexels-photo-270632.jpeg",
      year: "2024",
    },
    {
      id: 2,
      title: "Analytics Dashboard",
      description:
        "Real-time analytics dashboard with customizable widgets, role-based access, and data export.",
      slug: "analytics-dashboard",
      tags: ["Next.js", "Tailwind", "Chart.js"],
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
      year: "2024",
    },
    {
      id: 3,
      title: "Portfolio Website",
      description:
        "Modern portfolio website with smooth animations, CMS integration, and 100 Lighthouse score.",
      slug: "portfolio-website",
      tags: ["React", "Framer Motion", "Tailwind"],
      image: "https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg",
      year: "2023",
    },
  ];

  const showcaseImages = [
    { id: 1, image: "https://images.pexels.com/photos/270632/pexels-photo-270632.jpeg", title: "E-Commerce UI" },
    { id: 2, image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg", title: "Dashboard" },
    { id: 3, image: "https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg", title: "Portfolio" },
    { id: 4, image: "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg", title: "Blog System" },
    { id: 5, image: "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg", title: "SaaS Platform" },
    { id: 6, image: "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg", title: "Mobile App" },
  ];

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    viewport: { once: true },
  });

  return (
    <div className="bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white">
      <Hero />
      <About />
      <Skills />

      {/* ── Featured Projects ───────────────────────────── */}
      <section className="py-28 px-6 md:px-12 lg:px-16 bg-gray-50 dark:bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          {/* Header row */}
          <div className="flex items-end justify-between mb-16">
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-4">
                <span className="w-6 h-px bg-teal-500" />
                Selected Work
              </span>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-gray-900 dark:text-white">
                Featured projects
              </h2>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="hidden sm:block">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
              >
                All projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Project cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.article
                key={project.id || index}
                {...fadeUp(index * 0.08)}
                className="group flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-[#141414] border border-gray-100 dark:border-gray-800 hover:border-teal-500/30 dark:hover:border-teal-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/5"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {project.year && (
                    <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                      {project.year}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags?.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-teal-500 transition-colors duration-200">
                    {project.title}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-6 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                    <Link
                      to={`/project/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-500 hover:text-teal-600 transition-colors"
                    >
                      Case study
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <div className="flex items-center gap-1">
                      <button
                        aria-label="View on GitHub"
                        className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </button>
                      <button
                        aria-label="Live demo"
                        className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Mobile "All projects" link */}
          <div className="sm:hidden mt-8 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-500"
            >
              View all projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Showcase strip ─────────────────────────────── */}
      <section className="py-28 bg-white dark:bg-[#0a0a0a] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-12">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-4">
              <span className="w-6 h-px bg-teal-500" />
              Design Gallery
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-gray-900 dark:text-white">
              A taste of the work
            </h2>
          </motion.div>
        </div>

        {/* Marquee */}
        <div className="relative">
          <motion.div
            className="flex gap-5"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 35, ease: "linear" } }}
          >
            {[...showcaseImages, ...showcaseImages].map((item, i) => (
              <div
                key={`${item.id}-${i}`}
                className="relative w-72 h-52 flex-shrink-0 rounded-2xl overflow-hidden group"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 p-4">
                    <span className="text-white text-sm font-semibold">{item.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent pointer-events-none" />
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="py-28 px-6 md:px-12 lg:px-16 bg-gray-50 dark:bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            {...fadeUp(0)}
            className="rounded-3xl bg-gray-900 dark:bg-white/5 border border-gray-800 dark:border-white/10 px-8 py-16 md:py-20 text-center"
          >
            {/* Small label */}
            <span className="inline-block text-xs font-semibold tracking-widest text-teal-400 uppercase mb-6">
              Open to opportunities
            </span>

            <h3 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-white leading-tight mb-4">
              Have a project in mind?
              <br />
              Let's build it together.
            </h3>

            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              Whether it's a startup MVP, a design system, or a full-scale web
              application — I'm ready to help.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold rounded-xl transition-colors duration-200"
              >
                Start a conversation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white text-sm font-semibold rounded-xl transition-colors duration-200"
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