import { useEffect, useState } from "react";
import API from "../api";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { 
  Code, 
  Database, 
  Palette, 
  Server, 
  Smartphone, 
  Globe,
  Cloud,
  Shield,
  Zap,
  Sparkles,
  TrendingUp
} from "lucide-react";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  const skillIcons = {
    "React": <Code className="w-6 h-6" />,
    "JavaScript": <Code className="w-6 h-6" />,
    "TypeScript": <Code className="w-6 h-6" />,
    "Python": <Code className="w-6 h-6" />,
    "Django": <Server className="w-6 h-6" />,
    "Node.js": <Server className="w-6 h-6" />,
    "MongoDB": <Database className="w-6 h-6" />,
    "PostgreSQL": <Database className="w-6 h-6" />,
    "HTML": <Globe className="w-6 h-6" />,
    "CSS": <Palette className="w-6 h-6" />,
    "Tailwind": <Palette className="w-6 h-6" />,
    "Figma": <Palette className="w-6 h-6" />,
    "React Native": <Smartphone className="w-6 h-6" />,
    "AWS": <Cloud className="w-6 h-6" />,
    "Docker": <Server className="w-6 h-6" />,
    "Git": <Zap className="w-6 h-6" />,
  };

  const categories = [
    { id: "all", name: "All Skills", icon: <Sparkles className="w-4 h-4" /> },
    { id: "frontend", name: "Frontend", icon: <Palette className="w-4 h-4" /> },
    { id: "backend", name: "Backend", icon: <Server className="w-4 h-4" /> },
    { id: "database", name: "Database", icon: <Database className="w-4 h-4" /> },
    { id: "tools", name: "Tools", icon: <Zap className="w-4 h-4" /> },
  ];

  useEffect(() => {
    API.getSkills()
      .then((res) => {
        // Add category to skills if not present
        const skillsWithCategory = res.data.map(skill => ({
          ...skill,
          category: skill.category || getSkillCategory(skill.name)
        }));
        setSkills(skillsWithCategory);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load skills.");
        // Fallback data
        setSkills(getFallbackSkills());
      })
      .finally(() => setLoading(false));
  }, []);

  const getSkillCategory = (skillName) => {
    const frontend = ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind", "Figma"];
    const backend = ["Python", "Django", "Node.js", "Express"];
    const database = ["MongoDB", "PostgreSQL", "MySQL"];
    const tools = ["Git", "Docker", "AWS", "Firebase"];
    
    if (frontend.includes(skillName)) return "frontend";
    if (backend.includes(skillName)) return "backend";
    if (database.includes(skillName)) return "database";
    if (tools.includes(skillName)) return "tools";
    return "other";
  };

  const getFallbackSkills = () => [
    { id: 1, name: "React", proficiency: 90, category: "frontend" },
    { id: 2, name: "JavaScript", proficiency: 95, category: "frontend" },
    { id: 4, name: "Python", proficiency: 88, category: "backend" },
    { id: 5, name: "Django", proficiency: 92, category: "backend" },
    { id: 8, name: "PostgreSQL", proficiency: 83, category: "database" },
    { id: 9, name: "Tailwind CSS", proficiency: 94, category: "frontend" },
    { id: 10, name: "Docker", proficiency: 80, category: "tools" },
    { id: 11, name: "AWS", proficiency: 78, category: "tools" },
    { id: 12, name: "Git", proficiency: 95, category: "tools" },
  ];

  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const SkillSkeleton = () => (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-800/50 animate-pulse">
          <div className="flex items-center justify-between mb-3">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-32" />
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16" />
          </div>
          <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-full" />
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-teal-500/5 to-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-amber-500/5 to-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/10 to-amber-500/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
              Technical Expertise
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            My <span className="bg-gradient-to-r from-teal-500 to-amber-500 bg-clip-text text-transparent">Skills</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A comprehensive collection of technologies and tools I use to build amazing products
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-teal-500 to-amber-500 text-white shadow-lg"
                  : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 text-gray-700 dark:text-gray-300 hover:border-teal-500/50"
              }`}
            >
              {category.icon}
              <span className="text-sm font-medium">{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        {loading ? (
          <SkillSkeleton />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="relative h-full rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* Skill Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500/10 to-amber-500/10 text-teal-500 group-hover:scale-110 transition-transform">
                        {skillIcons[skill.name] || <Code className="w-6 h-6" />}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">
                        {skill.name}
                      </h3>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {skill.proficiency}%
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {skill.category}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-teal-500 to-amber-500 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                    </div>
                    
                    {/* Animated Dots */}
                    <div className="flex justify-between mt-2">
                      {[0, 25, 50, 75, 100].map((point) => (
                        <motion.div
                          key={point}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: 0.1 * (point / 25) }}
                          viewport={{ once: true }}
                          className={`w-2 h-2 rounded-full ${
                            skill.proficiency >= point 
                              ? "bg-teal-500" 
                              : "bg-gray-300 dark:bg-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Experience Level */}
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {skill.proficiency >= 90 ? "Expert" : 
                       skill.proficiency >= 70 ? "Advanced" : 
                       skill.proficiency >= 50 ? "Intermediate" : "Beginner"}
                    </span>
                    
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-teal-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {skill.years || Math.floor(skill.proficiency / 20)}+ years
                      </span>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-amber-500/0 to-purple-500/0 group-hover:from-teal-500/5 group-hover:via-amber-500/5 group-hover:to-purple-500/5 rounded-2xl transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Want to see these skills in action? Check out my projects
          </p>
          <a
            href="/projects"
            className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-teal-500 to-amber-500 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <span>View Projects</span>
            <Sparkles className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;