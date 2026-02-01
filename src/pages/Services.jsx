import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import API from "../api";
import toast from "react-hot-toast";
import Tilt from "react-parallax-tilt";
import {
  Code,
  Palette,
  Smartphone,
  Server,
  Database,
  Cloud,
  Shield,
  Zap,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Target,
  Users,
  Clock,
  Award,
  TrendingUp
} from "lucide-react";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredService, setHoveredService] = useState(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const navigate = useNavigate();

  const serviceIcons = {
    web: <Code className="w-6 h-6" />,
    design: <Palette className="w-6 h-6" />,
    mobile: <Smartphone className="w-6 h-6" />,
    backend: <Server className="w-6 h-6" />,
    database: <Database className="w-6 h-6" />,
    cloud: <Cloud className="w-6 h-6" />,
    security: <Shield className="w-6 h-6" />,
    performance: <Zap className="w-6 h-6" />,
  };

  const handleGetStartedClick = () => {
    navigate("/contact");
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await API.getServices();
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

  const ServiceSkeleton = () => (
    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 animate-pulse">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-xl" />
        <div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24" />
        </div>
      </div>
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 dark:bg-gray-600 rounded" />
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
      </div>
    </div>
  );

  const serviceStats = [
    { icon: <Target className="w-5 h-5" />, label: "Projects Completed", value: "50+" },
    { icon: <Users className="w-5 h-5" />, label: "Happy Clients", value: "30+" },
    { icon: <Clock className="w-5 h-5" />, label: "Support Hours", value: "24/7" },
    { icon: <Award className="w-5 h-5" />, label: "Awards", value: "10+" },
    { icon: <TrendingUp className="w-5 h-5" />, label: "Success Rate", value: "98%" },
  ];

  return (
    <div className="font-inter bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-black text-gray-900 dark:text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
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

      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-amber-500/5"
        style={{ y: backgroundY }}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/10 to-amber-500/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                Premium Services
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-teal-500 via-amber-500 to-purple-500 bg-clip-text text-transparent">
                Services
              </span>{" "}
              That Drive Success
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
              From concept to deployment, I provide end-to-end digital solutions that 
              transform ideas into impactful, high-performance applications.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              {serviceStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="text-teal-500 dark:text-teal-400">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Services Grid */}
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <ServiceSkeleton key={i} />
              ))}
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                No Services Available
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Services will be updated soon. Please check back later.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <Tilt
                  key={service.id}
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  perspective={1000}
                  scale={1.02}
                  transitionSpeed={800}
                  glareEnable={true}
                  glareMaxOpacity={0.1}
                  className="w-full"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onMouseEnter={() => setHoveredService(index)}
                    onMouseLeave={() => setHoveredService(null)}
                    className="group relative h-full rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-transparent to-teal-500/0 group-hover:to-teal-500/10 transition-all duration-500" />
                    
                    {/* Service Header */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500/10 to-amber-500/10 group-hover:from-teal-500/20 group-hover:to-amber-500/20 transition-colors">
                            {serviceIcons[service.icon] || <Code className="w-6 h-6" />}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">
                              {service.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {service.category || "Professional Service"}
                            </p>
                          </div>
                        </div>
                        
                        {/* Popular Badge */}
                        {service.popular && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-pink-500 text-white text-xs font-semibold rounded-full">
                            <Sparkles className="w-3 h-3" />
                            Popular
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-3 mb-6">
                        {(service.features ? service.features.split("<br>") : ["No features available"])
                          .filter(feature => feature.trim())
                          .slice(0, 4)
                          .map((feature, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {feature.trim()}
                              </span>
                            </div>
                          ))}
                      </div>

                      {/* Pricing & Action */}
                      <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                              {service.price || "Custom"}
                            </span>
                            {service.duration && (
                              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                                / {service.duration}
                              </span>
                            )}
                          </div>
                          
                          {/* Delivery Time */}
                          {service.delivery && (
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              ⏱️ {service.delivery}
                            </span>
                          )}
                        </div>

                        <motion.button
                          className="w-full group/btn flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-teal-500 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleGetStartedClick}
                        >
                          <span>Get Started</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </Tilt>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-amber-500 to-purple-500 animate-gradient-x" />
              <div className="relative bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm p-12">
                <div className="text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Ready to Transform Your Ideas?
                  </h3>
                  <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                    Let's discuss your project requirements and create something amazing together.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleGetStartedClick}
                      className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                      Start a Project
                    </button>
                    <button
                      onClick={() => navigate("/contact")}
                      className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                    >
                      Schedule Consultation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Process Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-24"
          >
            <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              My Working Process
            </h3>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { 
                  step: "01", 
                  title: "Discovery", 
                  description: "Understand your requirements and goals" 
                },
                { 
                  step: "02", 
                  title: "Planning", 
                  description: "Create roadmap and design architecture" 
                },
                { 
                  step: "03", 
                  title: "Development", 
                  description: "Build with modern technologies and best practices" 
                },
                { 
                  step: "04", 
                  title: "Delivery", 
                  description: "Launch, support, and maintenance" 
                },
              ].map((process, index) => (
                <motion.div
                  key={process.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-teal-500 to-amber-500 flex items-center justify-center text-white font-bold text-xl">
                    {process.step}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {process.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {process.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;