import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CalendarDays, 
  User, 
  Clock, 
  Tag, 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  ThumbsUp, 
  MessageCircle,
  Eye,
  ChevronRight,
  Sparkles,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check
} from "lucide-react";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await API.getBlog(slug);
        
        if (mounted) {
          setBlog(response || generateSampleBlog());
          
          // Fetch related blogs (limit to 4-5)
          const relatedRes = await API.getBlogs(`?limit=5&exclude=${slug}`);
          setRelatedBlogs(relatedRes || generateSampleBlogs());
          
          // Simulate comments
          setComments(generateSampleComments());
        }
      } catch (err) {
        console.error(err);
        if (mounted) {
          setError("Failed to load blog. Using sample content.");
          toast.error("Failed to load blog. Showing sample content.");
          setBlog(generateSampleBlog());
          setRelatedBlogs(generateSampleBlogs());
          setComments(generateSampleComments());
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

  const generateSampleBlog = () => ({
    id: 1,
    title: "Mastering React Hooks in 2024",
    content: `
      <h2>Introduction to React Hooks</h2>
      <p>React Hooks revolutionized how we write React components by allowing us to use state and other React features without writing classes.</p>
      
      <h2>Why Use Hooks?</h2>
      <p>Hooks solve several problems that developers faced with class components:</p>
      <ul>
        <li>Reusing stateful logic between components</li>
        <li>Complex components becoming hard to understand</li>
        <li>Confusing classes for both humans and machines</li>
      </ul>
      
      <h2>Common Hooks You Should Know</h2>
      <h3>useState</h3>
      <p>The useState hook lets you add state to functional components.</p>
      
      <h3>useEffect</h3>
      <p>useEffect lets you perform side effects in function components.</p>
      
      <h3>Custom Hooks</h3>
      <p>Building your own hooks lets you extract component logic into reusable functions.</p>
    `,
    slug: slug,
    published_date: "2024-01-15",
    author: "John Doe",
    author_role: "Senior Frontend Developer",
    read_time: "8 min read",
    category: "Web Development",
    tags: ["React", "JavaScript", "Frontend", "Hooks", "Programming"],
    views: 1250,
    likes: 89,
    comments_count: 23,
    excerpt: "Learn advanced patterns and best practices for React Hooks that will make your components more efficient and maintainable."
  });

  const generateSampleBlogs = () => [
    {
      id: 2,
      title: "The Future of Web Development",
      slug: "future-web-development",
      excerpt: "Exploring upcoming trends and technologies that will shape web development.",
      published_date: "2024-01-10",
      read_time: "6 min read"
    },
    {
      id: 3,
      title: "Building Scalable APIs with Node.js",
      slug: "scalable-apis-nodejs",
      excerpt: "A comprehensive guide to building robust and scalable REST APIs.",
      published_date: "2024-01-05",
      read_time: "12 min read"
    },
    {
      id: 4,
      title: "Modern CSS Techniques You Should Know",
      slug: "modern-css-techniques",
      excerpt: "Advanced CSS features and techniques for modern web development.",
      published_date: "2024-01-01",
      read_time: "10 min read"
    },
    {
      id: 5,
      title: "State Management in React: A Complete Guide",
      slug: "state-management-react",
      excerpt: "Learn different state management approaches in React applications.",
      published_date: "2023-12-28",
      read_time: "15 min read"
    },
    {
      id: 6,
      title: "TypeScript Best Practices for Large Applications",
      slug: "typescript-best-practices",
      excerpt: "Essential TypeScript patterns and practices for scaling your applications.",
      published_date: "2023-12-20",
      read_time: "9 min read"
    }
  ];

  const generateSampleComments = () => [
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "SJ",
      date: "2 days ago",
      content: "Great article! The examples were really helpful for understanding complex concepts."
    },
    {
      id: 2,
      author: "Mike Chen",
      avatar: "MC",
      date: "3 days ago",
      content: "Thanks for sharing these advanced patterns. The custom hooks section was particularly useful!"
    },
    {
      id: 3,
      author: "Alex Rodriguez",
      avatar: "AR",
      date: "5 days ago",
      content: "I've been using React for years but still learned something new from this post."
    }
  ];

  const handleLike = () => {
    setLiked(!liked);
    toast.success(!liked ? "Article liked!" : "Like removed");
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast.success(!bookmarked ? "Article bookmarked!" : "Bookmark removed");
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog?.title || "Check out this article";
    
    switch(platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
        break;
      default:
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success("Link copied to clipboard!");
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: "You",
        avatar: "YO",
        date: "Just now",
        content: comment
      };
      setComments([newComment, ...comments]);
      setComment("");
      toast.success("Comment added!");
    }
  };

  const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
        </div>
        <div className="mb-8">
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl w-3/4 mb-4 animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-xl w-1/2 animate-pulse" />
        </div>
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i}>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-xl w-full animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-xl w-5/6 mt-2 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error && !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Blog Not Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The blog post you're looking for doesn't exist or has been moved.
          </p>
          <button
            onClick={() => navigate("/blogs")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-amber-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black py-12 md:py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-teal-500/5 to-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-amber-500/5 to-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Navigation */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/blogs")}
          className="group inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blogs
        </motion.button>

        {/* Blog Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/10 to-amber-500/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
              {blog.category || "Article"}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {blog.title}
          </h1>
          
          <p className="text-xl text-gray-700 dark:text-gray-400 mb-8">
            {blog.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 p-6 bg-white dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-800/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-amber-500 flex items-center justify-center text-white font-bold">
                {blog.author?.charAt(0) || "J"}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {blog.author}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {blog.author_role}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                {new Date(blog.published_date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {blog.read_time}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {blog.views?.toLocaleString() || "1.2k"} views
              </span>
            </div>
          </div>
        </motion.div>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="sticky top-4 z-20 mb-8"
        >
          <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-800/50 shadow-lg">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  liked 
                    ? 'bg-red-500/10 text-red-600 dark:text-red-400' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <ThumbsUp className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                <span>{blog.likes + (liked ? 1 : 0)}</span>
              </button>

              <button
                onClick={() => setShowComments(!showComments)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{blog.comments_count || comments.length}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-lg transition-colors ${
                  bookmarked
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
              </button>

              <div className="relative group">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <div className="absolute right-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-2 flex gap-2 border border-gray-200 dark:border-gray-800">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="p-2 hover:bg-blue-500/10 text-blue-500 rounded-lg transition-colors"
                      title="Share on Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="p-2 hover:bg-blue-600/10 text-blue-600 rounded-lg transition-colors"
                      title="Share on Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="p-2 hover:bg-blue-700/10 text-blue-700 rounded-lg transition-colors"
                      title="Share on LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg transition-colors"
                      title="Copy link"
                    >
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg prose-gray dark:prose-invert max-w-none mb-12"
        >
          <div
            className="text-gray-800 dark:text-gray-200"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog.content || "No content available")
            }}
          />
        </motion.div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-teal-500/10 to-amber-500/10 text-teal-700 dark:text-teal-400 text-sm font-medium rounded-xl"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Comments Section */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12 overflow-hidden"
            >
              <div className="bg-white dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-800/50">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Comments ({comments.length})
                </h3>

                {/* Add Comment */}
                <form onSubmit={handleCommentSubmit} className="mb-8">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent text-gray-900 dark:text-white mb-4"
                    rows="3"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-teal-500 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Post Comment
                  </button>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                        {comment.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {comment.author}
                          </h4>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {comment.date}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Related Blogs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              Related Articles
            </h3>
            <button
              onClick={() => navigate("/blogs")}
              className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
            >
              View All Articles
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedBlogs.slice(0, 5).map((relatedBlog, index) => (
              <motion.div
                key={relatedBlog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/blog/${relatedBlog.slug}`)}
              >
                <div className="bg-white dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-5 border border-gray-200 dark:border-gray-800/50 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
                    {relatedBlog.title}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-400 text-sm line-clamp-3">
                    {relatedBlog.excerpt}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail;