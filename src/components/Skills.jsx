import { useEffect, useState } from "react";
import API from "../api";
import { motion } from "framer-motion";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "database", label: "Database" },
    { id: "tools", label: "Tools" },
  ];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await API.getSkills();
        let data = Array.isArray(res) ? res : res?.data || res?.skills || [];
        const withCategory = data.map((s) => ({
          ...s,
          category: s.category || getCategory(s.name),
        }));
        setSkills(withCategory);
      } catch {
        setSkills(getFallback());
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const getCategory = (name) => {
    const map = {
      frontend: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind", "Figma", "Next.js"],
      backend: ["Python", "Django", "Node.js", "Express"],
      database: ["MongoDB", "PostgreSQL", "MySQL"],
      tools: ["Git", "Docker", "AWS", "Firebase"],
    };
    for (const [cat, list] of Object.entries(map)) {
      if (list.includes(name)) return cat;
    }
    return "other";
  };

  const getFallback = () => [
    { id: 1, name: "React", proficiency: 90, category: "frontend" },
    { id: 2, name: "JavaScript", proficiency: 95, category: "frontend" },
    { id: 3, name: "TypeScript", proficiency: 85, category: "frontend" },
    { id: 4, name: "Tailwind CSS", proficiency: 94, category: "frontend" },
    { id: 5, name: "Python", proficiency: 88, category: "backend" },
    { id: 6, name: "Django", proficiency: 92, category: "backend" },
    { id: 7, name: "Node.js", proficiency: 87, category: "backend" },
    { id: 8, name: "MongoDB", proficiency: 85, category: "database" },
    { id: 9, name: "PostgreSQL", proficiency: 83, category: "database" },
    { id: 10, name: "Docker", proficiency: 80, category: "tools" },
    { id: 11, name: "AWS", proficiency: 78, category: "tools" },
    { id: 12, name: "Git", proficiency: 95, category: "tools" },
    { id: 13, name: "Figma", proficiency: 88, category: "frontend" },
    { id: 14, name: "Next.js", proficiency: 86, category: "frontend" },
  ];

  const filtered =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  const getLevel = (p) =>
    p >= 90 ? "Expert" : p >= 75 ? "Advanced" : p >= 55 ? "Intermediate" : "Beginner";

  const levelColor = (p) =>
    p >= 90
      ? "text-teal-500"
      : p >= 75
      ? "text-blue-500"
      : p >= 55
      ? "text-amber-500"
      : "text-gray-400";

  return (
    <section className="py-28 px-6 md:px-12 lg:px-16 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-4">
            <span className="w-6 h-px bg-teal-500" />
            Expertise
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-gray-900 dark:text-white">
            Technical skills
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === c.id
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {c.label}
            </button>
          ))}
        </motion.div>

        {/* Skills */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group p-5 rounded-xl bg-gray-50 dark:bg-[#141414] border border-gray-100 dark:border-gray-800 hover:border-teal-500/40 dark:hover:border-teal-500/30 transition-colors duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {skill.name}
                  </h3>
                  <div className="text-right">
                    <span className={`text-xs font-medium ${levelColor(skill.proficiency)}`}>
                      {getLevel(skill.proficiency)}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-teal-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.04 }}
                    viewport={{ once: true }}
                  />
                </div>

                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-400 capitalize">{skill.category}</span>
                  <span className="text-xs font-medium text-gray-900 dark:text-white tabular-nums">
                    {skill.proficiency}%
                  </span>
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