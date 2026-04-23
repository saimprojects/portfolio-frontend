import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { 
  Sparkles, 
  Code, 
  Palette, 
  Server, 
  Rocket,
  Award,
  Target
} from "lucide-react";

const About = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(textRef.current, {
      strings: [
        "I'm *Muhammad Saim*, a passionate Full Stack Developer specializing in building modern web applications. With expertise in React, Django, and cloud technologies, I create scalable solutions that deliver exceptional user experiences. I believe in clean code, continuous learning, and pushing the boundaries of what's possible on the web.",
      ],
      typeSpeed: 15,
      backSpeed: 0,
      startDelay: 500,
      showCursor: true,
      cursorChar: "▌",
    });

    return () => typed.destroy();
  }, []);

  const stats = [
    { icon: <Code className="w-5 h-5" />, label: "Projects", value: "50+" },
    { icon: <Award className="w-5 h-5" />, label: "Experience", value: "3+ Years" },
    { icon: <Target className="w-5 h-5" />, label: "Clients", value: "30+" },
    { icon: <Rocket className="w-5 h-5" />, label: "Success Rate", value: "98%" },
  ];

  const expertise = [
    { icon: <Code className="w-5 h-5" />, label: "Frontend", tech: "React, JavaScript" },
    { icon: <Server className="w-5 h-5" />, label: "Backend", tech: "Django, Python, PostgreSQL" },
    { icon: <Palette className="w-5 h-5" />, label: "Design", tech: "Figma, Tailwind, Framer Motion" },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-teal-500/5 to-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-amber-500/5 to-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/10 to-amber-500/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
              About Me
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Crafting Digital{" "}
            <span className="bg-gradient-to-r from-teal-500 to-amber-500 bg-clip-text text-transparent">
              Experiences
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Turning complex problems into simple, beautiful, and intuitive solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Profile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              {/* Glowing Effect */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-teal-500 via-amber-500 to-purple-500 rounded-3xl blur-xl opacity-30"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden border-4 border-white dark:border-gray-900 shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dxommxt6d/image/upload/v1753074039/unnamed_ompsk6.jpg"
                  alt="Muhammad Saim"
                  className="w-full h-auto object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 -right-4 bg-gradient-to-r from-teal-500 to-amber-500 text-white px-6 py-3 rounded-xl shadow-2xl"
              >
                <div className="text-sm font-semibold">Available for Hire</div>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50"
                >
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Typed Introduction */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Hello, I'm Muhammad Saim 👋
              </h3>
              
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-500 to-amber-500 rounded-full" />
                <p
                  ref={textRef}
                  className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed pl-6"
                />
              </div>
            </div>

            {/* Expertise */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                Areas of Expertise
              </h4>
              
              <div className="grid md:grid-cols-3 gap-4">
                {expertise.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 hover:border-teal-500/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500/10 to-amber-500/10 text-teal-500">
                        {item.icon}
                      </div>
                      <h5 className="font-semibold text-gray-900 dark:text-white">
                        {item.label}
                      </h5>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.tech}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-6"
            >
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-teal-500 to-amber-500 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <span>Let's Work Together</span>
                <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;