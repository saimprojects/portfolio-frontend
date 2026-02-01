import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, 
  Github, 
  ArrowLeft, 
  Calendar, 
  Tag, 
  Users, 
  Globe,
  ChevronRight,
  Sparkles,
  Code,
  Palette,
  Smartphone,
  Server,
  Database
} from "lucide-react";
import toast from "react-hot-toast";
import Tilt from "react-parallax-tilt";
import DOMPurify from "dompurify";

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [suggestedProjects, setSuggestedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const projectRes = await API.getProject(slug);
        if (projectRes?.data) setProject(projectRes.data);

        const suggestedRes = await API.getProjects(`?limit=3&exclude=${slug}`);
        if (suggestedRes?.data) setSuggestedProjects(suggestedRes.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const getTechnologyIcon = (tech) => {
    const techIcons = {
      react: <Code className="w-4 h-4" />,
      nextjs: <Globe className="w-4 h-4" />,
      node: <Server className="w-4 h-4" />,
      mongodb: <Database className="w-4 h-4" />,
      figma: <Palette className="w-4 h-4" />,
      ios: <Smartphone className="w-4 h-4" />,
      android: <Smartphone className="w-4 h-4" />,
    };
    
    return techIcons[tech.toLowerCase()] || <Code className="w-4 h-4" />;
  };

  const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Back Button Skeleton */}
        <div className="mb-8">
          <div className="h-10 w-32 bg-gray-300 dark:bg-gray-800 rounded-xl animate-pulse" />
        </div>

        {/* Main Content Skeleton */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="h-12 bg-gray-300 dark:bg-gray-800 rounded-xl w-3/4 mb-4 animate-pulse" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-xl w-1/2 mb-6 animate-pulse" />
            </div>
            
            <div className="h-[400px] bg-gray-300 dark:bg-gray-800 rounded-2xl animate-pulse" />
            
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-xl w-full animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-xl w-5/6 animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-xl w-4/6 animate-pulse" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-8 bg-gray-300 dark:bg-gray-800 rounded-xl w-1/2 animate-pulse" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Project Not Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The project you're looking for doesn't exist or has been moved.
          </p>
          <button
            onClick={() => navigate("/projects")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-amber-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black py-12 md:py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-teal-500/5 to-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-amber-500/5 to-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Navigation */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/projects")}
          className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </motion.button>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Project Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/10 to-amber-500/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                  {project.category || "Featured Project"}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                {project.title}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {project.subtitle || "A detailed case study of the project"}
              </p>
            </motion.div>

            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative rounded-3xl overflow-hidden mb-8 border border-gray-200/50 dark:border-gray-800/50 shadow-2xl"
            >
              {imageLoading && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-800 dark:to-gray-700 animate-pulse" />
              )}
              <img
                src={project.image || "https://images.unsplash.com/photo-1551650975-87deedd944c3"}
                alt={project.title}
                className="w-full h-[400px] md:h-[500px] object-cover transition-opacity duration-300"
                style={{ opacity: imageLoading ? 0 : 1 }}
                onLoad={() => setImageLoading(false)}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1551650975-87deedd944c3";
                  setImageLoading(false);
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <div className="flex items-center gap-2 text-white/80">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {project.date || "2024"}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Tabs Navigation */}
            <div className="mb-8">
              <div className="flex space-x-1 rounded-2xl bg-gray-100 dark:bg-gray-900 p-1">
                {["overview", "features", "tech", "challenges"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                      activeTab === tab
                        ? "bg-white dark:bg-gray-800 text-teal-600 dark:text-teal-400 shadow-lg"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="prose prose-lg dark:prose-invert max-w-none"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      project.description || "<p>No description available.</p>"
                    ),
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
            >
              {project.github_link && (
                <a
                  href={project.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-6 py-3 bg-gray-900 dark:bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="p-2 bg-gray-800 dark:bg-gray-700 rounded-lg group-hover:bg-gray-700 dark:group-hover:bg-gray-600 transition-colors">
                    <Github className="w-5 h-5" />
                  </div>
                  View Source Code
                </a>
              )}
              
              {project.live_link && (
                <a
                  href={project.live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-teal-500 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="p-2 bg-white/20 rounded-lg">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  Live Demo
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              )}
            </motion.div>
          </div>

          {/* Right Column - Project Info */}
          <div className="space-y-8">
            {/* Project Details Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Project Details
              </h3>
              
              <div className="space-y-6">
                {/* Timeline */}
                {project.timeline && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Timeline</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{project.timeline}</p>
                    </div>
                  </div>
                )}

                {/* Team */}
                {project.team && (
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Team</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{project.team}</p>
                    </div>
                  </div>
                )}

                {/* Role */}
                {project.role && (
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">My Role</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{project.role}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Technologies Card */}
            {project.technologies && project.technologies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  Technologies Used
                </h3>
                
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl"
                    >
                      {getTechnologyIcon(tech)}
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tags Card */}
            {project.tags && project.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  <Tag className="w-5 h-5 inline-block mr-2" />
                  Tags
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-teal-500/10 to-amber-500/10 text-teal-600 dark:text-teal-400 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Suggested Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                More Projects
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Explore other projects you might like
              </p>
            </div>
            <button
              onClick={() => navigate("/projects")}
              className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
            >
              View All Projects
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedProjects.map((sProject, index) => (
              <Tilt
                key={sProject.id}
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                perspective={1000}
                scale={1.02}
                transitionSpeed={800}
                glareEnable={true}
                glareMaxOpacity={0.1}
                className="w-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative h-full rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:shadow-2xl transition-all duration-500"
                  onClick={() => navigate(`/project/${sProject.slug}`)}
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={sProject.image || "https://images.unsplash.com/photo-1551650975-87deedd944c3"}
                      alt={sProject.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Project Content */}
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">
                      {sProject.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                      {sProject.description?.replace(/<[^>]*>/g, '')}
                    </p>
                    
                    {/* Technologies */}
                    {sProject.tags && (
                      <div className="flex flex-wrap gap-2">
                        {sProject.tags.slice(0, 2).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;