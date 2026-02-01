import { useEffect, useState } from "react";
import API from "../api";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Search, Filter, ArrowUpDown, Eye, Sparkles, Layers } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [hoveredProject, setHoveredProject] = useState(null);

  const categories = [
    { id: "all", name: "All Projects", count: 0 },
    { id: "web", name: "Web Development", count: 0 },
    { id: "mobile", name: "Mobile Apps", count: 0 },
    { id: "design", name: "UI/UX Design", count: 0 },
    { id: "fullstack", name: "Full Stack", count: 0 },
    { id: "opensource", name: "Open Source", count: 0 },
  ];

  useEffect(() => {
    setLoading(true);
    API.getProjects()
      .then((res) => {
        const projectsData = res.data;
        setProjects(projectsData);
        setFilteredProjects(projectsData);
        
        // Update category counts
        const updatedCategories = [...categories];
        updatedCategories[0].count = projectsData.length;
        projectsData.forEach(project => {
          if (project.category) {
            const categoryIndex = updatedCategories.findIndex(cat => 
              cat.id === project.category.toLowerCase()
            );
            if (categoryIndex > 0) {
              updatedCategories[categoryIndex].count += 1;
            }
          }
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load projects.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = [...projects];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(project =>
        project.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Sort projects
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
        break;
      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    
    setFilteredProjects(result);
  }, [searchTerm, selectedCategory, sortBy, projects]);

  const ProjectSkeleton = () => (
    <div className="bg-white/50 dark:bg-gray-900/50 border border-gray-200/50 dark:border-gray-800/50 rounded-3xl overflow-hidden shadow-lg backdrop-blur-sm animate-pulse">
      <div className="h-48 w-full bg-gray-300 dark:bg-gray-700" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-teal-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-500/10 to-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/10 to-amber-500/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
              Portfolio Showcase
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            My <span className="bg-gradient-to-r from-teal-500 to-amber-500 bg-clip-text text-transparent">Projects</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A collection of my latest work, experiments, and contributions to the digital world
          </p>
        </motion.div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-lg">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects, technologies, or keywords..."
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
              <ArrowUpDown className="text-gray-400 w-5 h-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 text-gray-900 dark:text-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">A to Z</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Layers className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-400">
                Showing <span className="font-bold text-teal-600 dark:text-teal-400">{filteredProjects.length}</span> projects
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Eye className="w-4 h-4" />
                <span>Hover over cards for preview</span>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence>
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id || index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                    onMouseEnter={() => setHoveredProject(index)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className="group relative"
                  >
                    {/* Card */}
                    <div className="relative h-full rounded-3xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-transparent to-teal-500/0 group-hover:to-teal-500/10 transition-all duration-500" />
                      
                      {/* Project Image */}
                      <div className="relative h-56 overflow-hidden">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          animate={hoveredProject === index ? { scale: 1.1 } : { scale: 1 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                            <Link
                              to={`/project/${project.slug}`}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              View Details
                              <ArrowUpDown className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Project Content */}
                      <div className="p-6 relative">
                        {/* Category Badge */}
                        {project.category && (
                          <span className="inline-block px-3 py-1 text-xs font-semibold bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-full mb-4">
                            {project.category}
                          </span>
                        )}
                        
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">
                          <Link
                            to={`/project/${project.slug}`}
                            className="hover:underline"
                          >
                            {project.title}
                          </Link>
                        </h3>

                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3">
                          {project.description}
                        </p>

                        {/* Tags */}
                        {project.tags && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.slice(0, 3).map((tag, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 3 && (
                              <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                                +{project.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-6">
                          <div className="flex items-center gap-4">
                            {project.github_link && (
                              <a
                                href={project.github_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors group/github"
                              >
                                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover/github:bg-gray-200 dark:group-hover/github:bg-gray-700 transition-colors">
                                  <Github className="w-4 h-4" />
                                </div>
                                <span>Code</span>
                              </a>
                            )}
                          </div>

                          <div className="flex items-center gap-4">
                            {project.live_link && (
                              <a
                                href={project.live_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group/live"
                              >
                                <span>Live Demo</span>
                                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover/live:bg-teal-100 dark:group-hover/live:bg-teal-900/30 transition-colors">
                                  <ExternalLink className="w-4 h-4" />
                                </div>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-amber-500 to-purple-500 animate-gradient-x" />
            <div className="relative bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm p-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Start a Project?
              </h3>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Have an idea in mind? Let's collaborate and build something amazing together.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Get In Touch
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;