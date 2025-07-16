import { useEffect, useState } from "react";
import API from "../api";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom"; // ✅ for routing

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.getProjects()
      .then((res) => setProjects(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load projects.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20 px-4 sm:px-6 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Featured Projects
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading projects...
          </p>
        ) : projects.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No projects found.
          </p>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col"
              >
                {/* Image */}
                <img
                  src={project.image.url}
                  alt={project.title}
                  className="h-48 w-full object-cover"
                />

                {/* Content */}
                <div className="p-6 flex flex-col gap-4 flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    <Link
                      to={`/project/${project.slug}`}
                      className="hover:underline"
                    >
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-4">
                    {project.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex items-center gap-3 mt-auto pt-4">
                    {project.github_link && (
                      <a
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                      >
                        <Github className="w-4 h-4" /> GitHub
                      </a>
                    )}

                    {project.live_link && (
                      <a
                        href={project.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition"
                      >
                        <ExternalLink className="w-4 h-4" /> Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Projects;
