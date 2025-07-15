import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import toast from "react-hot-toast";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchBlog = async () => {
      try {
        const response = await API.getBlog(slug);
        console.log("Blog Detail Response:", response);

        // Check if response is defined and has the expected structure
        if (response) {
          if (mounted) {
            setBlog(response); // Set the blog state to the response directly if it's already the data you need
            console.log("Blog state updated:", response);
          }
        } else {
          console.error("Response data is undefined");
        }
      } catch (err) {
        console.error(err);
        if (mounted) {
          setError("Failed to load blog. Check the URL or try again.");
          toast.error("Failed to load blog.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchBlog();

    return () => {
      mounted = false;
    };
  }, [slug]);

  const Loader = () => (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <motion.div
          className="text-teal-500 text-4xl animate-spin"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          📝
        </motion.div>
        <p className="text-white mt-4">Loading blog...</p>
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
          className="max-w-3xl mx-auto text-center"
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

  if (loading) {
    return <Loader />;
  }

  if (!blog) return null;

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-4 sm:px-6 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <motion.h1
          className="text-4xl font-bold text-gray-900 dark:text-white mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {blog.title}
        </motion.h1>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-6">
          <CalendarDays className="w-4 h-4 mr-1" />
          {new Date(blog.published_date).toLocaleDateString()}
        </div>
        <motion.div
          className="prose dark:prose-invert max-w-none"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </motion.div>
    </section>
  );
};

export default BlogDetail;
