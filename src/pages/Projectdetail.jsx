import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import toast from "react-hot-toast";
import Tilt from "react-parallax-tilt";

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [suggestedProjects, setSuggestedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectRes = await API.getProject(slug);
        if (projectRes?.data) setProject(projectRes.data);
        const suggestedRes = await API.getProjects("?limit=3&exclude=" + slug);
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

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center py-20 px-4">
        <p className="text-xl text-gray-500 dark:text-gray-400 animate-pulse">Loading project...</p>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center py-20 px-4">
        <p className="text-xl text-gray-500 dark:text-gray-400">Project not found.</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-100 to-teal-50 dark:from-gray-900 dark:to-teal-950 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(45,212,191,0.15)_0%,_rgba(0,0,0,0)_70%)] opacity-40"
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Main Project Detail */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden mb-12 border border-teal-200/30 dark:border-teal-800/30"
          initial={{ scale: 0.98 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
            <img
              src={project.image || "/fallback-image.jpg"}
              alt={project.title || "Project Image"}
              className="w-full h-full object-cover"
              onError={(e) => (e.target.src = "/fallback-image.jpg")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          <div className="p-6 sm:p-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-amber-400 mb-4">
              {project.title || "Untitled Project"}
            </h2>
            <p className="text-gray-700 dark:text-gray-200 text-base sm:text-lg leading-relaxed mb-6">
              {project.description || "No description available."}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {project.github_link && (
                <a
                  href={project.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-full shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <Github className="w-5 h-5" /> GitHub
                </a>
              )}
              {project.live_link && (
                <a
                  href={project.live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-full shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <ExternalLink className="w-5 h-5" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Suggested Projects */}
        <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-8">
          Explore More Projects
        </h3>
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {suggestedProjects.map((sProject, sIndex) => (
            <Tilt
              key={sProject.id}
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              perspective={1200}
              scale={1.03}
              transitionSpeed={1000}
              glareEnable={true}
              glareMaxOpacity={0.15}
              className="w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: sIndex * 0.15 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-200/20 dark:border-teal-800/20 overflow-hidden"
              >
                <div className="relative w-full h-48 sm:h-56">
                  <img
                    src={sProject.image || "/fallback-image.jpg"}
                    alt={sProject.title || "Project Image"}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = "/fallback-image.jpg")}
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {sProject.title || "Untitled Project"}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {sProject.description || "No description available."}
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    {sProject.github_link && (
                      <a
                        href={sProject.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-500 hover:text-teal-600 transition"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {sProject.live_link && (
                      <a
                        href={sProject.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-500 hover:text-amber-600 transition"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectDetail;