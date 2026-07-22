import { useEffect, useMemo, useState } from "react";
import API from "../api";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Search, Layers, ArrowRight, ArrowUpRight } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useSEO from "../hooks/useSEO";
import { stripHtmlTags, truncate } from "../utils/text";

const SectionLabel = ({ children }) => (
  <div className="inline-flex items-center gap-3 mb-4">
    <span className="w-8 h-px bg-accent" />
    <span className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
      {children}
    </span>
  </div>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useSEO({
    title: "Projects",
    description:
      "Selected work by Muhammad Saim — full stack web applications built with React, Django, and Node.js.",
    path: "/projects",
  });

  useEffect(() => {
    setLoading(true);
    API.getProjects()
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data?.results || [];
        setProjects(data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load projects.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = [...projects];
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          stripHtmlTags(p.description).toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case "oldest":
        result.sort((a, b) => (a.id || 0) - (b.id || 0));
        break;
      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default: // newest
        result.sort((a, b) => (b.id || 0) - (a.id || 0));
    }
    return result;
  }, [projects, searchTerm, sortBy]);

  const Skeleton = () => (
    <div className="rounded-2xl bg-card border border-ink/[0.07] overflow-hidden animate-pulse">
      <div className="h-48 bg-ink/[0.07]" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-ink/10 rounded w-2/3" />
        <div className="h-4 bg-ink/[0.06] rounded w-full" />
        <div className="h-4 bg-ink/[0.06] rounded w-4/6" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base pt-28 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <SectionLabel>Portfolio</SectionLabel>
          <h1 className="text-4xl md:text-6xl font-bold text-ink tracking-tight mb-4">
            Selected
            <span className="text-accent"> work.</span>
          </h1>
          <p className="text-muted text-lg max-w-xl">
            A collection of projects I've designed and built — from e-commerce
            platforms to dashboards and SaaS products.
          </p>
        </motion.div>

        {/* ── Search + sort ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 mb-12"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-faint w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-card border border-ink/10 rounded-xl text-sm text-ink placeholder:text-faint focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 transition-colors"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-card border border-ink/10 rounded-xl text-sm text-ink focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 transition-colors cursor-pointer"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="name">A to Z</option>
          </select>
        </motion.div>

        {/* ── Grid ── */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <Layers className="w-12 h-12 text-faint mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-ink mb-3">No projects found</h3>
            <p className="text-muted">
              {searchTerm ? "Try a different search term." : "Projects coming soon."}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence>
              {filtered.map((project, index) => (
                <motion.article
                  key={project.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="group flex flex-col rounded-2xl bg-card border border-ink/[0.07] hover:border-accent/40 overflow-hidden transition-colors duration-300"
                >
                  {/* Image */}
                  <Link to={`/project/${project.slug}`} className="relative h-52 overflow-hidden block">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                      <span className="inline-flex items-center gap-2 text-white text-sm font-bold">
                        View case study <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-lg font-bold text-ink mb-2 group-hover:text-accent transition-colors">
                      <Link to={`/project/${project.slug}`}>{project.title}</Link>
                    </h3>

                    <p className="text-muted text-sm leading-relaxed line-clamp-3 mb-6">
                      {truncate(stripHtmlTags(project.description), 140)}
                    </p>

                    {/* Tags */}
                    {project.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-full font-mono text-[11px] font-medium bg-accent/10 text-accent border border-accent/25"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-ink/[0.06]">
                      <div className="flex items-center gap-1">
                        {project.github_link && (
                          <a
                            href={project.github_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub repository"
                            className="p-2 rounded-lg text-muted hover:text-accent hover:bg-accent/10 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.live_link && (
                          <a
                            href={project.live_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Live demo"
                            className="p-2 rounded-lg text-muted hover:text-accent hover:bg-accent/10 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <Link
                        to={`/project/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-faint group-hover:text-accent uppercase tracking-wider transition-colors"
                      >
                        Details <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-24 rounded-3xl bg-soft border border-ink/[0.07] p-10 md:p-14 text-center"
        >
          <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase mb-4">
            Have an idea?
          </p>
          <h3 className="text-2xl md:text-4xl font-bold text-ink tracking-tight mb-3">
            Let's build your next project
          </h3>
          <p className="text-muted mb-8 max-w-md mx-auto">
            From concept to launch — I'll help you ship something great.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-accent-ink text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            Get in touch <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
