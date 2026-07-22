import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  CalendarDays,
  Clock,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Twitter,
  Linkedin,
  Facebook,
  Copy,
  Check,
  BookOpen,
} from "lucide-react";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";
import useSEO from "../hooks/useSEO";
import { stripHtmlTags, readTime, formatDate, truncate } from "../utils/text";

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  // Reading progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useSEO({
    title: blog?.title,
    description: blog ? truncate(stripHtmlTags(blog.content), 155) : undefined,
    path: `/blog/${slug}`,
    type: "article",
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setNotFound(false);
        const data = await API.getBlog(slug);
        if (!mounted) return;
        if (!data || !data.title) {
          setNotFound(true);
          return;
        }
        setBlog(data);

        // Related: latest others
        try {
          const all = await API.getBlogs();
          const list = Array.isArray(all) ? all : all?.results || [];
          if (mounted) {
            setRelated(list.filter((b) => b.slug !== slug).slice(0, 3));
          }
        } catch {
          /* related is optional */
        }
      } catch (err) {
        console.error(err);
        if (mounted) setNotFound(true);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [slug]);

  const share = (platform) => {
    const url = window.location.href;
    const title = blog?.title || "Check out this article";
    const links = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    };
    if (links[platform]) {
      window.open(links[platform], "_blank", "noopener");
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Link copied!");
    }
  };

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-base pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto animate-pulse">
          <div className="h-4 bg-ink/10 rounded w-24 mb-10" />
          <div className="h-12 bg-ink/10 rounded w-5/6 mb-4" />
          <div className="h-12 bg-ink/10 rounded w-3/5 mb-8" />
          <div className="h-4 bg-ink/[0.07] rounded w-48 mb-12" />
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-4 bg-ink/[0.07] rounded w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Not found ── */
  if (notFound || !blog) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <BookOpen className="w-12 h-12 text-accent mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-ink mb-3">Article not found</h3>
          <p className="text-muted mb-8">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <button
            onClick={() => navigate("/blogs")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-ink font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base pt-24 pb-24">
      {/* Reading progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-accent origin-left z-[60]"
      />

      <article className="max-w-3xl mx-auto px-6">
        {/* ── Back ── */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10"
        >
          <Link
            to="/blogs"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All articles
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
              Article
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-ink tracking-tight leading-[1.15] mb-6">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4" />
              {formatDate(blog.published_date, true)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {readTime(blog.content)}
            </span>
            <span className="text-faint">·</span>
            <span className="text-ink font-medium">Muhammad Saim</span>
          </div>
        </motion.header>

        {/* ── Divider + share row ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between border-y border-ink/[0.08] py-3 mb-10"
        >
          <span className="text-xs font-semibold tracking-widest text-faint uppercase">
            Share this article
          </span>
          <div className="flex items-center gap-1">
            {[
              { key: "twitter", icon: Twitter, label: "Share on Twitter" },
              { key: "linkedin", icon: Linkedin, label: "Share on LinkedIn" },
              { key: "facebook", icon: Facebook, label: "Share on Facebook" },
            ].map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => share(key)}
                aria-label={label}
                className="p-2 rounded-lg text-muted hover:text-accent hover:bg-accent/10 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
            <button
              onClick={() => share("copy")}
              aria-label="Copy link"
              className="p-2 rounded-lg text-muted hover:text-accent hover:bg-accent/10 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>

        {/* ── Content — themed rich text, full contrast ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="richtext mb-16"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blog.content || "<p>No content available.</p>"),
          }}
        />

        {/* ── Author card ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 rounded-2xl bg-card border border-ink/[0.08] p-6 mb-16"
        >
          <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent font-bold text-lg shrink-0">
            MS
          </div>
          <div className="flex-1">
            <div className="font-bold text-ink">Muhammad Saim</div>
            <p className="text-sm text-muted mt-0.5">
              Full Stack Developer — React & Django. Building clean, fast web applications.
            </p>
          </div>
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-ink text-sm font-bold rounded-lg hover:opacity-90 transition-opacity shrink-0"
          >
            Hire Me
          </Link>
        </motion.div>

        {/* ── Related ── */}
        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-end justify-between mb-8">
              <h3 className="text-2xl font-bold text-ink tracking-tight">
                Keep reading
              </h3>
              <Link
                to="/blogs"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-accent transition-colors"
              >
                All articles <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.id || r.slug}
                  to={`/blog/${r.slug}`}
                  className="group flex flex-col rounded-2xl bg-card border border-ink/[0.07] hover:border-accent/40 p-5 transition-colors duration-300"
                >
                  <span className="text-xs text-muted mb-3">
                    {formatDate(r.published_date)}
                  </span>
                  <h4 className="text-base font-bold text-ink leading-snug line-clamp-2 mb-3 group-hover:text-accent transition-colors">
                    {r.title}
                  </h4>
                  <p className="text-sm text-muted line-clamp-2 mb-4">
                    {truncate(stripHtmlTags(r.content), 90)}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
                    Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </article>
    </div>
  );
};

export default BlogDetail;
