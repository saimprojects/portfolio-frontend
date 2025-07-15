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
        setProject(projectRes.data);
        const suggestedRes = await API.getProjects("?limit=3&exclude=" + slug);
        setSuggestedProjects(suggestedRes.data);
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
      <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-4 sm:px-6 lg:px-12">
        <p className="text-center text-gray-400 dark:text-gray-500 animate-pulse">Loading project...</p>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-4 sm:px-6 lg:px-12">
        <p className="text-center text-gray-400 dark:text-gray-500">Project not found.</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-900/20 to-gray-900 dark:from-gray-950 dark:via-teal-950/20 dark:to-gray-950 py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(45,212,191,0.1)_0%,_rgba(0,0,0,0)_70%)] opacity-50"
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Main Project Detail */}
        <motion.div
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-teal-200/20 dark:border-teal-900/20 rounded-3xl overflow-hidden shadow-lg mb-12"
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-amber-500 mb-4">
              {project.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-6">
              {project.description}
            </p>
            <div className="flex items-center gap-4">
              {project.github_link && (
                <a
                  href={project.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-teal-600 hover:bg-teal-700 rounded-full shadow-md transition-all duration-200 hover:shadow-lg"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
              )}
              {project.live_link && (
                <a
                  href={project.live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-amber-600 hover:bg-amber-700 rounded-full shadow-md transition-all duration-200 hover:shadow-lg"
                >
                  <ExternalLink className="w-4 h-4" /> Live
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Suggested Projects */}
        <h3 className="text-2xl font-semibold text-gray-100 dark:text-gray-200 mb-6">
          Suggested Projects
        </h3>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {suggestedProjects.map((sProject, sIndex) => (
            <Tilt
              key={sProject.id}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.02}
              transitionSpeed={1500}
              glareEnable={true}
              glareMaxOpacity={0.2}
              className="w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: sIndex * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-teal-200/20 dark:border-teal-900/20 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={sProject.image}
                  alt={sProject.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                    {sProject.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                    {sProject.description}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    {sProject.github_link && (
                      <a
                        href={sProject.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-500 hover:text-teal-600 transition"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {sProject.live_link && (
                      <a
                        href={sProject.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-500 hover:text-amber-600 transition"
                      >
                        <ExternalLink className="w-4 h-4" />
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