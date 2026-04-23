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
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 flex items-center justify-center">
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-amber-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
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

// Helper function to strip HTML tags and get plain text
const stripHtmlTags = (html) => {
  if (!html) return "";
  // Remove HTML tags
  let text = html.replace(/<[^>]*>/g, ' ');
  // Remove extra whitespace
  text = text.replace(/\s+/g, ' ').trim();
  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ')
             .replace(/&amp;/g, '&')
             .replace(/&lt;/g, '<')
             .replace(/&gt;/g, '>')
             .replace(/&quot;/g, '"')
             .replace(/&#39;/g, "'");
  return text;
};

// Helper function to truncate text
const truncateText = (text, maxLength = 150) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

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
          let blogData = [];
          
          // Handle different response formats
          if (Array.isArray(response)) {
            blogData = response;
          } else if (response && response.blogs && Array.isArray(response.blogs)) {
            blogData = response.blogs;
          } else if (response && response.data && Array.isArray(response.data)) {
            blogData = response.data;
          } else if (response && response.results && Array.isArray(response.results)) {
            blogData = response.results;
          } else if (response && typeof response === 'object') {
            // If it's a single object, convert to array
            blogData = [response];
          }
          
          console.log("Extracted blog data:", blogData.length, "blogs");
          
          // If no blogs from API, use sample data
          if (blogData.length === 0) {
            console.log("No blogs from API, using sample data");
            blogData = generateSampleBlogs();
          }
          
          // Process each blog - strip HTML from content for display
          const processedBlogs = blogData.map(blog => ({
            ...blog,
            plainContent: stripHtmlTags(blog.content || blog.excerpt || ""),
            displayContent: truncateText(stripHtmlTags(blog.content || blog.excerpt || ""), 150)
          }));
          
          setBlogs(processedBlogs);
          setFilteredBlogs(processedBlogs);
          
          // Update category counts
          const updatedCategories = [...categories];
          updatedCategories[0].count = processedBlogs.length;
          processedBlogs.forEach(blog => {
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
        (blog.plainContent || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        title: "The Reality of Cold Emailing (Before and After MostMailer Ai)",
        content: "Cold emailing has always been one of the most powerful growth channels. No ads. No algorithms. Just a direct line to your ideal customer. But here's the problem. What worked before doesn't work the same way today.",
        slug: "cold-emailing-reality",
        published_date: "2026-04-16",
        author: "Sarah Chen",
        read_time: "5 min read",
        category: "general",
        tags: ["Email", "Marketing", "Outreach"],
        views: 684,
        likes: 57,
        comments: 18
      },
      {
        id: 2,
        title: "Free Access to Premium AI Tools: ChatGPT-5, Gemini 2.5, Grok-4",
        content: "Artificial Intelligence is evolving faster than any technology we've seen before. Tools like ChatGPT-5, Google Gemini 2.5 Pro, and Grok-4 are redefining how content is created. Most of these tools are paid, locked behind subscriptions.",
        slug: "free-premium-ai-tools",
        published_date: "2026-02-07",
        author: "Mike Johnson",
        read_time: "5 min read",
        category: "general",
        tags: ["AI", "ChatGPT", "Gemini"],
        views: 408,
        likes: 16,
        comments: 21
      },
      {
        id: 3,
        title: "How to Generate Free HD & 4K Images Using AI",
        content: "In today's digital world, visual content is everything. With the rise of AI image generation, anyone can now create HD and 4K quality images for free, even without design experience.",
        slug: "free-ai-images",
        published_date: "2026-01-31",
        author: "Emily Rodriguez",
        read_time: "5 min read",
        category: "general",
        tags: ["AI", "Images", "Freelancing"],
        views: 160,
        likes: 51,
        comments: 15
      },
      {
        id: 4,
        title: "How YouTube Is Creating a New Generation of Financial Educators",
        content: "YouTube has quietly become one of the most powerful platforms for financial education. What once required expensive courses or formal training is now available for free, on demand, and explained in plain language.",
        slug: "youtube-financial-educators",
        published_date: "2026-01-29",
        author: "David Kim",
        read_time: "5 min read",
        category: "general",
        tags: ["YouTube", "Finance", "Education"],
        views: 178,
        likes: 99,
        comments: 17
      },
      {
        id: 5,
        title: "ChatGPT + Canva Pro: The Ultimate Combo for Content Creators",
        content: "In today's fast-paced digital world, content creation, marketing, and branding demand speed, creativity, and consistency. ChatGPT and Canva Pro come together as a powerful productivity duo.",
        slug: "chatgpt-canva-combo",
        published_date: "2026-01-11",
        author: "Lisa Wang",
        read_time: "5 min read",
        category: "general",
        tags: ["ChatGPT", "Canva", "Productivity"],
        views: 170,
        likes: 12,
        comments: 27
      },
      {
        id: 6,
        title: "YouTube Automation: How to Make Money with AI Videos",
        content: "In 2026, YouTube automation has become one of the smartest ways to earn money online. You no longer need a camera, microphone, editing skills, or even to show your face.",
        slug: "youtube-automation-ai",
        published_date: "2025-11-28",
        author: "Alex Turner",
        read_time: "5 min read",
        category: "general",
        tags: ["YouTube", "Automation", "AI"],
        views: 124,
        likes: 69,
        comments: 21
      },
      {
        id: 7,
        title: "The Complete Beginner's Guide to Minecraft Bedrock Edition",
        content: "Minecraft has been around for more than a decade, and Bedrock Edition is the version most people play today. It runs on Windows, Xbox, PlayStation, Nintendo Switch, mobile, and even smart TVs.",
        slug: "minecraft-bedrock-guide",
        published_date: "2025-11-15",
        author: "Steve Miner",
        read_time: "5 min read",
        category: "general",
        tags: ["Minecraft", "Gaming", "Tutorial"],
        views: 424,
        likes: 30,
        comments: 21
      },
      {
        id: 8,
        title: "ScalaCube: Free Minecraft Server Hosting for Everyone",
        content: "Minecraft ka craze kabhi kam nahi hota, lekin server hosting ka masla har player ko face karna padta hai. Free servers hamesha limited resources, downtime, aur lag ke saath aate hain.",
        slug: "scalacube-minecraft-hosting",
        published_date: "2025-10-29",
        author: "Rahul Sharma",
        read_time: "5 min read",
        category: "general",
        tags: ["Minecraft", "Server", "Hosting"],
        views: 551,
        likes: 64,
        comments: 5
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
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-amber-600/20 to-orange-600/20" />
      <div className="relative bg-gradient-to-b from-black/40 to-black/60 backdrop-blur-sm p-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-amber-600 text-white text-xs font-semibold rounded-full">
            Featured
          </span>
          <span className="text-sm text-white/80 capitalize">{blog.category}</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-white/90 mb-6 line-clamp-3">
          {blog.displayContent || truncateText(blog.plainContent, 120)}
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-emerald-500/5 to-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-orange-500/5 to-rose-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                Thoughts & Insights
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                Blog
              </span>{" "}
              & Articles
            </h1>
            
            <p className="text-xl text-gray-700 dark:text-gray-400 max-w-3xl mx-auto">
              Sharing knowledge, insights, and experiences about web development, 
              design, technology, and career growth.
            </p>
          </motion.div>

          {/* Featured Blogs */}
          {blogs.length > 0 && (
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
                  className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
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
          )}

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
                  className="w-full pl-12 pr-4 py-3 bg-transparent border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-3">
                <Filter className="text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 text-gray-900 dark:text-white"
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
                  className="bg-transparent border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 text-gray-900 dark:text-white"
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
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-amber-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <>
              <div className="mb-8 flex items-center justify-between">
                <p className="text-gray-700 dark:text-gray-400">
                  Showing <span className="font-bold text-emerald-600 dark:text-emerald-400">
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
                      <div className="relative h-full rounded-2xl bg-white dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-500">
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-3 py-1 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full capitalize">
                            {blog.category || "General"}
                          </span>
                        </div>

                        <div className="p-6">
                          {/* Meta Info */}
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                            <span className="flex items-center gap-1">
                              <CalendarDays className="w-4 h-4" />
                              {blog.published_date ? new Date(blog.published_date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              }) : "Recent"}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {blog.read_time || "5 min read"}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                            {blog.title}
                          </h3>

                          {/* Excerpt - Clean text without HTML */}
                          <p className="text-gray-700 dark:text-gray-400 mb-6 line-clamp-3">
                            {blog.displayContent || truncateText(blog.plainContent || blog.content, 150)}
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
                                {blog.views?.toLocaleString() || Math.floor(Math.random() * 1000) + 100}
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
                            
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-2 transition-all" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Blogs;