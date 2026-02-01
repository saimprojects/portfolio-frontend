import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import { useEffect, useState } from "react";
import API from "../api";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import { Sparkles, MousePointerClick } from "lucide-react";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      API.getProjects("?limit=3")
        .then((res) => {
          setProjects(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching projects:", err);
          setLoading(false);
        });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const Loader = () => (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: loading ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      style={{ pointerEvents: loading ? "auto" : "none" }}
    >
      <div className="relative w-64 h-64">
        <motion.div
          className="absolute inset-0 border-4 border-teal-500/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 border-4 border-transparent border-t-amber-500 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-white text-xl font-bold tracking-wider"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            LOADING
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  const websites = [
    { 
      id: 1, 
      image: "https://images.pexels.com/photos/270632/pexels-photo-270632.jpeg",
      title: "E-Commerce Platform",
      tags: ["React", "Node.js", "MongoDB"]
    },
    { 
      id: 2, 
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
      title: "Dashboard UI",
      tags: ["Next.js", "Tailwind", "Chart.js"]
    },
    { 
      id: 3, 
      image: "https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg",
      title: "Portfolio Design",
      tags: ["React", "Framer Motion", "GSAP"]
    },
    { 
      id: 4, 
      image: "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg",
      title: "Blog System",
      tags: ["Next.js", "Sanity", "Vercel"]
    },
    { 
      id: 5, 
      image: "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg",
      title: "SaaS Platform",
      tags: ["React", "Firebase", "Stripe"]
    },
  ];

  return (
    <div className="font-inter bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white relative overflow-hidden">
      {loading && <Loader />}
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-teal-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-amber-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-teal-500/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -50, 50, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-amber-500/5"
        style={{ y: backgroundY }}
      />
      
      <Hero />
      <About />
      <Skills />

      {/* Featured Projects Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-16">
          <div>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/10 to-amber-500/10 rounded-full mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                Featured Work
              </span>
            </motion.div>
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Selected <span className="bg-gradient-to-r from-teal-500 to-amber-500 bg-clip-text text-transparent">Projects</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-amber-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300"
            >
              View All
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Tilt
              key={project.id}
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              perspective={1000}
              scale={1.02}
              transitionSpeed={800}
              glareEnable={true}
              glareMaxOpacity={0.2}
              glareColor="#ffffff"
              glarePosition="all"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-full rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-transparent to-teal-500/0 group-hover:to-teal-500/10 transition-all duration-500" />
                
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={project.image || `https://images.unsplash.com/photo-${index % 2 === 0 ? "1551650975" : "1545235617"}`}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Project Content */}
                <div className="p-6 relative">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <motion.h3
                    className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors"
                  >
                    {project.title}
                  </motion.h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/project/${project.slug}`}
                      className="group/btn inline-flex items-center text-sm font-semibold text-teal-500 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-300"
                    >
                      View Case Study
                      <FaArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    
                    <div className="flex items-center gap-3">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <FaGithub className="w-5 h-5" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <FaExternalLinkAlt className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </section>

      {/* Website Showcase Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent to-gray-100/50 dark:to-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-4">
              Design <span className="bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">Showcase</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A collection of modern website designs with cutting-edge technologies
            </p>
          </motion.div>

          <div className="relative">
            {/* Infinite Scroll Container */}
            <div className="py-8">
              <motion.div
                className="flex gap-6"
                animate={{
                  x: ["0%", "-50%"],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  },
                }}
              >
                {[...websites, ...websites].map((website, index) => (
                  <motion.div
                    key={`${website.id}-${index}`}
                    className="group relative w-80 h-64 flex-shrink-0 cursor-pointer"
                    whileHover={{ y: -10 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative h-full rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                      <img
                        src={website.image}
                        alt={website.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-0 p-6">
                          <h4 className="text-white font-bold text-lg mb-2">
                            {website.title}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {website.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Instruction Text */}
            <motion.div
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MousePointerClick className="w-4 h-4" />
              <span>Hover to preview</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-amber-500 to-purple-500 animate-gradient-x" />
          <div className="relative bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm p-12">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Build Something Amazing
            </h3>
            <p className="text-white/90 mb-8 text-lg">
              Have a project in mind? Let's discuss how we can bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Get In Touch
              </Link>
              <Link
                to="/projects"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                View All Projects
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;