import { useEffect, useState } from "react";
import API from "../api";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaReact, FaPython, FaJs, FaHtml5, FaCss3Alt } from "react-icons/fa";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const skillIcons = {
    React: <FaReact className="text-teal-500" />,
    Python: <FaPython className="text-teal-500" />,
    JavaScript: <FaJs className="text-teal-500" />,
    HTML: <FaHtml5 className="text-teal-500" />,
    CSS: <FaCss3Alt className="text-teal-500" />,
  };

  useEffect(() => {
    API.getSkills()
      .then((res) => setSkills(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load skills.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-white dark:bg-gray-950 py-20 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-900 dark:text-white"
        >
          My Skills
        </motion.h2>

        {loading ? (
          <motion.p
            className="text-center text-gray-600 dark:text-gray-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading skills...
          </motion.p>
        ) : (
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="flex items-center justify-between mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  <div className="flex items-center space-x-2">
                    {skillIcons[skill.name] || <span className="w-5 h-5" />}
                    <span>{skill.name}</span>
                  </div>
                  <span>{skill.proficiency}%</span>
                </div>
                <div className="w-full h-8 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden relative">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-500 to-amber-500"
                    initial={{ width: 0, clipPath: "polygon(0 0, 0% 0, 0% 100%, 0 100%)" }}
                    whileInView={{ width: `${skill.proficiency}%`, clipPath: "polygon(0 0, 100% 0, 90% 100%, 0 100%)" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    style={{ zIndex: 1 }}
                  />
                  <motion.div
                    className="absolute top-1 left-1 h-6 w-2 bg-teal-600/50"
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                  />
                  <motion.div
                    className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {skill.name}: {skill.proficiency}%
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;