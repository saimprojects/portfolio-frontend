import { useEffect, useState } from "react";
import API from "../api";
import { motion } from "framer-motion";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("all");

  const categories = [
    { id: "all",      label: "All" },
    { id: "frontend", label: "Frontend" },
    { id: "backend",  label: "Backend" },
    { id: "database", label: "Database" },
    { id: "tools",    label: "Tools" },
  ];

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.getSkills();
        let data = Array.isArray(res) ? res : res?.data || res?.skills || [];
        setSkills(data.length ? data.map(s => ({ ...s, category: s.category || getCategory(s.name) })) : getFallback());
      } catch {
        setSkills(getFallback());
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const getCategory = (n = "") => {
    if (["React","JavaScript","TypeScript","HTML","CSS","Tailwind","Figma","Next.js"].includes(n)) return "frontend";
    if (["Python","Django","Node.js","Express"].includes(n)) return "backend";
    if (["MongoDB","PostgreSQL","MySQL"].includes(n)) return "database";
    if (["Git","Docker","AWS","Firebase"].includes(n)) return "tools";
    return "other";
  };

  const getFallback = () => [
    { id:1,  name:"React",        proficiency:90, category:"frontend" },
    { id:2,  name:"JavaScript",   proficiency:95, category:"frontend" },
    { id:3,  name:"TypeScript",   proficiency:85, category:"frontend" },
    { id:4,  name:"Tailwind CSS", proficiency:94, category:"frontend" },
    { id:5,  name:"Next.js",      proficiency:86, category:"frontend" },
    { id:6,  name:"Python",       proficiency:88, category:"backend"  },
    { id:7,  name:"Django",       proficiency:92, category:"backend"  },
    { id:8,  name:"Node.js",      proficiency:87, category:"backend"  },
    { id:9,  name:"MongoDB",      proficiency:85, category:"database" },
    { id:10, name:"PostgreSQL",   proficiency:83, category:"database" },
    { id:11, name:"Docker",       proficiency:80, category:"tools"    },
    { id:12, name:"AWS",          proficiency:78, category:"tools"    },
    { id:13, name:"Git",          proficiency:95, category:"tools"    },
    { id:14, name:"Figma",        proficiency:88, category:"frontend" },
  ];

  const filtered = active === "all" ? skills : skills.filter(s => s.category === active);

  const level = (p) => p >= 90 ? "Expert" : p >= 75 ? "Advanced" : p >= 55 ? "Intermediate" : "Beginner";
  const levelColor = (p) => p >= 90 ? "#0AFFE8" : p >= 75 ? "#60a5fa" : p >= 55 ? "#FFB547" : "#888";

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#0AFFE8]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#0AFFE8] uppercase">Skills</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Technical proficiency
          </h2>
        </motion.div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                active === c.id
                  ? "bg-[#0AFFE8] text-[#0a0a0a]"
                  : "bg-white/[0.04] border border-white/[0.08] text-[#888] hover:text-white hover:border-white/20"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 rounded-2xl bg-white/[0.03] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.035 }}
                className="group p-5 rounded-2xl bg-[#111] border border-white/[0.06] hover:border-[#0AFFE8]/20 transition-colors duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white text-sm">{skill.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium" style={{ color: levelColor(skill.proficiency) }}>
                      {level(skill.proficiency)}
                    </span>
                    <span className="text-xs font-mono text-[#555]">{skill.proficiency}%</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, #0AFFE8, ${levelColor(skill.proficiency)})` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.035 }}
                    viewport={{ once: true }}
                  />
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