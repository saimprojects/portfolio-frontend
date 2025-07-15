import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import API from "../api";
import toast from "react-hot-toast";
import Tilt from "react-parallax-tilt";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/contact");
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await API.getServices();
        console.log("API Response:", response.data);
        setServices(response.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load services.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="font-inter bg-white dark:bg-black text-gray-900 dark:text-white relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(45,212,191,0.1)_0%,_rgba(0,0,0,0)_70%)] opacity-50"
        style={{ y: backgroundY }}
      />
      <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-black dark:text-white mb-16"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Services
          </motion.h2>
          {loading ? (
            <p className="text-center text-gray-400 dark:text-gray-500 animate-pulse">
              Loading services...
            </p>
          ) : services.length === 0 ? (
            <p className="text-center text-gray-400 dark:text-gray-500">
              No services available.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <Tilt
                  key={service.id}
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
                    <div className="p-6 relative">
                      <motion.h3
                        className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.3 }}
                      >
                        {service.title || "Untitled Service"}
                      </motion.h3>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                        {(service.features ? service.features.split("<br>") : ["No features available"]).map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                            {feature.trim() || "N/A"}
                          </li>
                        ))}
                      </ul>
                      <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-amber-500">
                        {service.price || "Price N/A"}
                      </p>
                      <motion.button
                        className="mt-4 w-full py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.5 }}
                        onClick={handleGetStartedClick}
                      >
                        Order Now
                      </motion.button>
                    </div>
                  </motion.div>
                </Tilt>
              ))}
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default Services;
