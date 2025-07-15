import React from "react";
import { useEffect, useState } from "react";
import API from "../api";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto text-center"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4">Something went wrong. Please try again later.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition"
            >
              Retry
            </button>
          </motion.div>
        </section>
      );
    }
    return this.props.children;
  }
}

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  let mounted = true;
  const fetchBlogs = async () => {
    try {
      const response = await API.getBlogs();
      console.log("Full API Response:", response);

      if (mounted) {
        const blogData = Array.isArray(response)
          ? response
          : response.blogs || [response] || [];
        setBlogs(blogData);
      }
    } catch (err) {
      console.error("API Error:", err.response ? err.response : err);
      if (mounted) {
        setError("Failed to load blogs. Check your connection or try again.");
        toast.error("Failed to load blogs.");
      }
    } finally {
      if (mounted) setLoading(false);
    }
  };

  fetchBlogs();

  return () => {
    mounted = false;
  };
}, []);

  const Loader = () => (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: loading ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{ pointerEvents: loading ? "auto" : "none" }}
    >
      <div className="text-center">
        <motion.div
          className="text-teal-500 text-4xl animate-spin"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          📝
        </motion.div>
        <p className="text-white mt-4">Loading blogs...</p>
      </div>
    </motion.div>
  );

  if (error) {
    return (
      <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto text-center"
        >
          <p className="text-gray-700 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition"
          >
            Retry
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <ErrorBoundary>
      <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-4 sm:px-6 lg:px-12 relative">
        <Loader />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto relative z-10"
        >
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Latest Blogs
          </h2>

          {loading || blogs.length === 0 ? null : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id || index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col group"
                >
                  <div className="p-6 flex flex-col gap-4 flex-grow">
                    <motion.h3
                      className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      <Link to={`/blog/${blog.slug}`} className="hover:underline">
                        {blog.title}
                      </Link>
                    </motion.h3>
                    <motion.p
                      className="text-sm text-gray-600 dark:text-gray-400 line-clamp-4"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.3 }}
                    >
                      {blog.content}
                    </motion.p>
                    <motion.div
                      className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-auto pt-2"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.4 }}
                    >
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {new Date(blog.published_date).toLocaleDateString()}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </section>
    </ErrorBoundary>
  );
};

export default Blogs;