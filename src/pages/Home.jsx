import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import { useEffect, useState } from "react";
import API from "../api";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Tilt from "react-parallax-tilt";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

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
    }, 2500); // 2.5 seconds delay
    return () => clearTimeout(timer);
  }, []);

  const Loader = () => (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/90 z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: loading ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: loading ? 0 : 0 }}
      style={{ pointerEvents: loading ? "auto" : "none" }}
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-black opacity-50" />
        <motion.div
          className="relative text-green-500 font-mono text-sm"
          animate={{
            y: ["100%", "-100%"],
            transition: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 8,
              ease: "linear",
            },
          }}
          style={{ whiteSpace: "pre" }}
        >
          {`010101\n100110\n001100\n110011\n101010\nCODE\nLOADING\nPORTFOLIO\n010101\n100110\n001100\n110011\n101010\n`}
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          Initializing...
        </motion.div>
      </div>
    </motion.div>
  );

  // Updated websites array with Pexels image URLs
  const websites = [
    { id: 1, image: "https://images.pexels.com/photos/270632/pexels-photo-270632.jpeg" },
    { id: 2, image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg" },
    { id: 3, image: "https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg" },
    { id: 4, image: "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg" },
    { id: 5, image: "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg" },
  ];

  return (
    <div className="font-inter bg-white dark:bg-black text-gray-900 dark:text-white relative overflow-hidden">
      {loading && <Loader />}
      <motion.div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557682250-33bd709cbe85')] opacity-10"
        style={{ y: backgroundY }}
      />
      <Hero />
      <About />
      <Skills />
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-16 text-center text-gray-900 dark:text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Tilt
              key={project.id}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.05}
              transitionSpeed={500}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg overflow-hidden shadow-xl border border-gray-300 dark:border-gray-700"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-teal-500 to-amber-500 opacity-0 group-hover:opacity-20 transition-opacity"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.2 }}
                />
                <img
                  src={project.image || `https://images.unsplash.com/photo-${index % 2 === 0 ? "1519756997" : "1600585154340"}`}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="p-6 relative">
                  <motion.h3
                    className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.3 }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p
                    className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.4 }}
                  >
                    {project.description}
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.5 }}
                  >
                    <Link
                      to={`/project/${project.id}`}
                      className="inline-flex items-center mt-4 text-sm text-teal-500 dark:text-teal-400 font-semibold hover:underline"
                    >
                      View Details <FaArrowRight className="ml-2" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </section>
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto relative z-10 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{
            x: ["0%", "-100%"],
            transition: {
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            },
          }}
          style={{ width: "max-content" }}
        >
          {[...websites, ...websites].map((website, index) => (
            <motion.div
              key={website.id + index}
              className="relative w-96 h-64 flex-shrink-0"
              style={{ minWidth: "384px" }} // Ensuring no gaps by matching image + gap
            >
              <img
                src={website.image}
                alt={`Website ${website.id}`}
                className="w-full h-full object-cover rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Home;