import React, { useEffect, useState } from "react";
import API from "../api";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CalendarDays, 
  User, 
  Clock, 
  Tag, 
  Search, 
  Filter, 
  BookOpen, 
  TrendingUp,
  Sparkles,
  ChevronRight,
  Eye,
  ThumbsUp,
  MessageCircle
} from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Blogs Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              We're having trouble loading the blogs. Please try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-amber-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
            >
              <Sparkles className="w-4 h-4" />
              Retry Loading
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
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [hoveredBlog, setHoveredBlog] = useState(null);
  const navigate = useNavigate();

  const categories = [
    { id: "all", name: "All Topics", count: 0 },
    { id: "technology", name: "Technology", count: 0 },
    { id: "webdev", name: "Web Development", count: 0 },
    { id: "design", name: "UI/UX Design", count: 0 },
    { id: "tutorials", name: "Tutorials", count: 0 },
    { id: "career", name: "Career Tips", count: 0 },
    { id: "productivity", name: "Productivity", count: 0 },
  ];

  useEffect(() => {
    let mounted = true;
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await API.getBlogs();
        console.log("API Response:", response);

        if (mounted) {
          const blogData = Array.isArray(response)
            ? response
            : response.blogs || [response] || [];
          
          // Add sample data if empty
          const enhancedBlogs = blogData.length > 0 ? blogData : generateSampleBlogs();
          setBlogs(enhancedBlogs);
          setFilteredBlogs(enhancedBlogs);
          
          // Update category counts
          const updatedCategories = [...categories];
          updatedCategories[0].count = enhancedBlogs.length;
          enhancedBlogs.forEach(blog => {
            if (blog.category) {
              const categoryIndex = updatedCategories.findIndex(cat => 
                cat.id === blog.category.toLowerCase()
              );
              if (categoryIndex > 0) {
                updatedCategories[categoryIndex].count += 1;
              }
            }
          });
        }
      } catch (err) {
        console.error("API Error:", err);
        if (mounted) {
          toast.error("Failed to load blogs. Using sample data.");
          const sampleBlogs = generateSampleBlogs();
          setBlogs(sampleBlogs);
          setFilteredBlogs(sampleBlogs);
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

  useEffect(() => {
    let result = [...blogs];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(blog =>
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(blog =>
        blog.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Sort blogs
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.published_date || 0) - new Date(a.published_date || 0));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.published_date || 0) - new Date(b.published_date || 0));
        break;
      case "popular":
        result.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      default:
        break;
    }
    
    setFilteredBlogs(result);
  }, [searchTerm, selectedCategory, sortBy, blogs]);

  const generateSampleBlogs = () => {
    return [
      {
        id: 1,
        title: "Mastering React Hooks in 2024",
        content: "Learn advanced patterns and best practices for React Hooks that will make your components more efficient and maintainable.",
        slug: "mastering-react-hooks-2024",
        published_date: "2024-01-15",
        author: "John Doe",
        read_time: "8 min read",
        category: "webdev",
        tags: ["React", "JavaScript", "Frontend"],
        views: 1250,
        likes: 89,
        comments: 23
      },
      {
        id: 2,
        title: "The Future of Web Development",
        content: "Exploring upcoming trends and technologies that will shape web development in the coming years.",
        slug: "future-web-development",
        published_date: "2024-01-10",
        author: "Jane Smith",
        read_time: "6 min read",
        category: "technology",
        tags: ["Web", "Trends", "Technology"],
        views: 980,
        likes: 65,
        comments: 15
      },
      {
        id: 3,
        title: "Building Scalable APIs with Node.js",
        content: "A comprehensive guide to building robust and scalable REST APIs using Node.js and Express.",
        slug: "scalable-apis-nodejs",
        published_date: "2024-01-05",
        author: "Alex Johnson",
        read_time: "12 min read",
        category: "tutorials",
        tags: ["Node.js", "API", "Backend"],
        views: 1560,
        likes: 102,
        comments: 31
      }
    ];
  };

  const BlogSkeleton = () => (
    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 animate-pulse">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4" />
      <div className="space-y-3 mb-6">
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6" />
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-4/6" />
      </div>
      <div className="flex items-center justify-between">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24" />
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-full w-24" />
      </div>
    </div>
  );

  const FeaturedBlogCard = ({ blog, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative rounded-3xl overflow-hidden group cursor-pointer"
      onClick={() => navigate(`/blog/${blog.slug}`)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 via-purple-500/20 to-pink-500/20" />
      <div className="relative bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm p-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-gradient-to-r from-teal-500 to-amber-500 text-white text-xs font-semibold rounded-full">
            Featured
          </span>
          <span className="text-sm text-white/80">{blog.category}</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-teal-300 transition-colors">
          {blog.title}
        </h3>
        <p className="text-white/90 mb-6 line-clamp-2">
          {blog.content}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-white/80 text-sm">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {blog.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {blog.read_time}
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black py-12 md:py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
        {/* Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-teal-500/5 to-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-amber-500/5 to-pink-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/10 to-amber-500/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                Thoughts & Insights
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-teal-500 via-amber-500 to-purple-500 bg-clip-text text-transparent">
                Blog
              </span>{" "}
              & Articles
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Sharing knowledge, insights, and experiences about web development, 
              design, technology, and career growth.
            </p>
          </motion.div>

          {/* Featured Blogs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Featured Posts
              </h2>
              <Link
                to="/blog/category/featured"
                className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
              >
                View All Featured
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-6">
              {blogs.slice(0, 3).map((blog, index) => (
                <FeaturedBlogCard key={blog.id} blog={blog} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-lg">
              {/* Search Bar */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles, topics, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-transparent border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-3">
                <Filter className="text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 text-gray-900 dark:text-white"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-3">
                <TrendingUp className="text-gray-400 w-5 h-5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 text-gray-900 dark:text-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Blogs Grid */}
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <BlogSkeleton key={i} />
              ))}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <BookOpen className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-amber-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <>
              <div className="mb-8 flex items-center justify-between">
                <p className="text-gray-600 dark:text-gray-400">
                  Showing <span className="font-bold text-teal-600 dark:text-teal-400">
                    {filteredBlogs.length}
                  </span> articles
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Eye className="w-4 h-4" />
                  <span>Hover to preview</span>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                  {filteredBlogs.map((blog, index) => (
                    <motion.div
                      key={blog.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ y: -8 }}
                      onMouseEnter={() => setHoveredBlog(index)}
                      onMouseLeave={() => setHoveredBlog(null)}
                      className="group relative cursor-pointer"
                      onClick={() => navigate(`/blog/${blog.slug}`)}
                    >
                      {/* Blog Card */}
                      <div className="relative h-full rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:shadow-2xl transition-all duration-500">
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-3 py-1 bg-gradient-to-r from-teal-500/10 to-amber-500/10 text-teal-600 dark:text-teal-400 text-xs font-semibold rounded-full">
                            {blog.category || "General"}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          {/* Meta Info */}
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                            <span className="flex items-center gap-1">
                              <CalendarDays className="w-4 h-4" />
                              {new Date(blog.published_date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {blog.read_time || "5 min read"}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
                            {blog.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                            {blog.content}
                          </p>

                          {/* Tags */}
                          {blog.tags && blog.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                              {blog.tags.slice(0, 3).map((tag, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Footer Stats */}
                          <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {blog.views || Math.floor(Math.random() * 1000) + 100}
                              </span>
                              <span className="flex items-center gap-1">
                                <ThumbsUp className="w-4 h-4" />
                                {blog.likes || Math.floor(Math.random() * 100) + 10}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                {blog.comments || Math.floor(Math.random() * 30) + 5}
                              </span>
                            </div>
                            
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-teal-500 group-hover:translate-x-2 transition-all" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-amber-500 to-purple-500 animate-gradient-x" />
              <div className="relative bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm p-12">
                <div className="text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Never Miss an Update
                  </h3>
                  <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                    Subscribe to my newsletter and get the latest articles, 
                    tutorials, and insights delivered directly to your inbox.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-6 py-3 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <button className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Blogs;