import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Layers,
} from "lucide-react";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";
import useSEO from "../hooks/useSEO";
import { stripHtmlTags, truncate } from "../utils/text";

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  useSEO({
    title: project?.title,
    description: project ? truncate(stripHtmlTags(project.description), 155) : undefined,
    path: `/project/${slug}`,
    image: project?.image,
    type: "article",
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await API.getProject(slug);
        if (mounted && res?.data) setProject(res.data);

        const all = await API.getProjects();
        const list = Array.isArray(all?.data) ? all.data : all?.data?.results || [];
        if (mounted) setSuggested(list.filter((p) => p.slug !== slug).slice(0, 3));
      } catch (err) {
        console.error(err);
        if (mounted) toast.error("Failed to load project details.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [slug]);

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-base pt-28 pb-24 px-6">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="h-4 bg-ink/10 rounded w-28 mb-10" />
          <div className="h-12 bg-ink/10 rounded w-3/4 mb-8" />
          <div className="h-[380px] bg-ink/[0.07] rounded-3xl mb-10" />
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-ink/[0.07] rounded w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Not found ── */
  if (!project) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <Layers className="w-12 h-12 text-accent mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-ink mb-3">Project not found</h3>
          <p className="text-muted mb-8">
            The project you're looking for doesn't exist or has been moved.
          </p>
          <button
            onClick={() => navigate("/projects")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-ink font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-6">

        {/* ── Back ── */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="mb-10">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All projects
          </Link>
        </motion.div>

        {/* ── Header ── */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-accent" />
            <span className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
              Case Study
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-ink tracking-tight leading-[1.15] mb-6">
            {project.title}
          </h1>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {project.live_link && (
              <a
                href={project.live_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-ink text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
              >
                Live Demo <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-ink/10 hover:border-accent/50 text-muted hover:text-ink text-sm font-semibold rounded-xl transition-colors"
              >
                <Github className="w-4 h-4" /> Source Code
              </a>
            )}
          </div>
        </motion.header>

        {/* ── Hero image ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden border border-ink/[0.08] shadow-2xl mb-12"
        >
          {imageLoading && <div className="absolute inset-0 bg-ink/[0.07] animate-pulse" />}
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-[320px] md:h-[480px] object-cover transition-opacity duration-300"
            style={{ opacity: imageLoading ? 0 : 1 }}
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />
        </motion.div>

        {/* ── Description — themed rich text ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="richtext mb-16"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(project.description || "<p>No description available.</p>"),
          }}
        />

        {/* ── Suggested ── */}
        {suggested.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pt-12 border-t border-ink/[0.08]"
          >
            <div className="flex items-end justify-between mb-8">
              <h3 className="text-2xl font-bold text-ink tracking-tight">More projects</h3>
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-accent transition-colors"
              >
                View all <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {suggested.map((s) => (
                <Link
                  key={s.id || s.slug}
                  to={`/project/${s.slug}`}
                  className="group rounded-2xl bg-card border border-ink/[0.07] hover:border-accent/40 overflow-hidden transition-colors duration-300"
                >
                  <div className="h-36 overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="text-base font-bold text-ink leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-1">
                      {s.title}
                    </h4>
                    <p className="text-sm text-muted line-clamp-2 mb-3">
                      {truncate(stripHtmlTags(s.description), 80)}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
                      View <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
