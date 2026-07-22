import React, { useEffect, useMemo, useState } from "react";
import API from "../api";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock, Search, BookOpen, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useSEO from "../hooks/useSEO";

/* ── Helpers ─────────────────────────────── */
export const stripHtmlTags = (html) => {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
};

export const readTime = (html) => {
  const words = stripHtmlTags(html).split(" ").filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
};

export const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recent";

const truncate = (text, max = 160) =>
  text.length <= max ? text : text.substring(0, max).trim() + "…";

/* ── Error boundary ──────────────────────── */
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <section className="min-h-screen bg-base flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <BookOpen className="w-12 h-12 text-accent mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-ink mb-3">Something went wrong</h3>
            <p className="text-muted mb-8">We're having trouble loading the blogs.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-accent text-accent-ink font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              Retry
            </button>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}

/* ── Section label (home design language) ── */
const SectionLabel = ({ children }) => (
  <div className="inline-flex items-center gap-3 mb-4">
    <span className="w-8 h-px bg-accent" />
    <span className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
      {children}
    </span>
  </div>
);

/* ── Blogs page ──────────────────────────── */
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const navigate = useNavigate();

  useSEO({
    title: "Blogs",
    description:
      "Articles and insights on web development, React, Django, and building better software — by Muhammad Saim.",
    path: "/blogs",
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const response = await API.getBlogs();
        if (!mounted) return;

        let data = [];
        if (Array.isArray(response)) data = response;
        else if (Array.isArray(response?.results)) data = response.results;
        else if (Array.isArray(response?.data)) data = response.data;
        else if (Array.isArray(response?.blogs)) data = response.blogs;

        setBlogs(
          data.map((b) => {
            const plain = stripHtmlTags(b.content || "");
            return {
              ...b,
              excerpt: truncate(plain),
              read_time: readTime(b.content || ""),
            };
          })
        );
      } catch (err) {
        console.error("Blogs API Error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  const filtered = useMemo(() => {
    let result = [...blogs];
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (b) =>
          b.title?.toLowerCase().includes(q) ||
          b.excerpt?.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) =>
      sortBy === "oldest"
        ? new Date(a.published_date || 0) - new Date(b.published_date || 0)
        : new Date(b.published_date || 0) - new Date(a.published_date || 0)
    );
    return result;
  }, [blogs, searchTerm, sortBy]);

  const [featured, ...rest] = searchTerm ? [null, ...filtered] : filtered;

  const Skeleton = () => (
    <div className="rounded-2xl bg-card border border-ink/[0.07] p-6 animate-pulse">
      <div className="h-4 bg-ink/10 rounded w-1/3 mb-4" />
      <div className="h-6 bg-ink/10 rounded w-5/6 mb-4" />
      <div className="space-y-2">
        <div className="h-4 bg-ink/[0.06] rounded w-full" />
        <div className="h-4 bg-ink/[0.06] rounded w-4/6" />
      </div>
    </div>
  );

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-base pt-28 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14"
          >
            <SectionLabel>The Blog</SectionLabel>
            <h1 className="text-4xl md:text-6xl font-bold text-ink tracking-tight mb-4">
              Thoughts, tutorials
              <br />
              <span className="text-accent">& insights.</span>
            </h1>
            <p className="text-muted text-lg max-w-xl">
              Notes on web development, React, Django, and everything I learn
              while building software.
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
                placeholder="Search articles…"
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
            </select>
          </motion.div>

          {/* ── Content ── */}
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <BookOpen className="w-12 h-12 text-faint mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-ink mb-3">No articles found</h3>
              <p className="text-muted mb-8">
                {searchTerm
                  ? "Try a different search term."
                  : "New articles are coming soon — check back later."}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="px-6 py-3 bg-accent text-accent-ink font-bold rounded-xl hover:opacity-90 transition-opacity"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <>
              {/* ── Featured (latest) post ── */}
              {featured && (
                <motion.article
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => navigate(`/blog/${featured.slug}`)}
                  className="group relative rounded-3xl bg-card border border-ink/[0.08] hover:border-accent/40 p-8 md:p-12 mb-12 cursor-pointer overflow-hidden transition-colors duration-300"
                >
                  {/* Accent glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 60% 60% at 80% 0%, rgb(var(--accent) / 0.07), transparent)",
                    }}
                  />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-[11px] font-mono font-medium uppercase tracking-wider">
                        Latest
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-muted">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {formatDate(featured.published_date)}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-muted">
                        <Clock className="w-3.5 h-3.5" />
                        {featured.read_time}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-4xl font-bold text-ink tracking-tight leading-tight mb-4 group-hover:text-accent transition-colors duration-300 max-w-3xl">
                      {featured.title}
                    </h2>

                    <p className="text-muted text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                      {featured.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-2 text-sm font-bold text-accent">
                      Read article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </motion.article>
              )}

              {/* ── Grid ── */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                  {(searchTerm ? filtered : rest).map((blog, index) => (
                    <motion.article
                      key={blog.id || blog.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.35, delay: index * 0.05 }}
                      onClick={() => navigate(`/blog/${blog.slug}`)}
                      className="group flex flex-col rounded-2xl bg-card border border-ink/[0.07] hover:border-accent/40 p-6 cursor-pointer transition-colors duration-300"
                    >
                      <div className="flex items-center gap-4 text-xs text-muted mb-4">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="w-3.5 h-3.5" />
                          {formatDate(blog.published_date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {blog.read_time}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-ink leading-snug mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="text-muted text-sm leading-relaxed line-clamp-3 mb-6">
                        {blog.excerpt}
                      </p>

                      <div className="mt-auto pt-4 border-t border-ink/[0.06] flex items-center justify-between">
                        <span className="text-xs font-semibold text-faint group-hover:text-accent transition-colors uppercase tracking-wider">
                          Read more
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-faint group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>

              <p className="text-center text-sm text-faint mt-12">
                Showing {filtered.length} article{filtered.length !== 1 && "s"}
              </p>
            </>
          )}

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-24 rounded-3xl bg-soft border border-ink/[0.07] p-10 md:p-14 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-ink tracking-tight mb-3">
              Want to work together?
            </h3>
            <p className="text-muted mb-8 max-w-md mx-auto">
              I'm open to freelance projects and full-time opportunities.
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
    </ErrorBoundary>
  );
};

export default Blogs;
