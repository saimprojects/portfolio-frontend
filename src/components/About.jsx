import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

const About = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(textRef.current, {
      strings: [
        "I'm *Muhammad Saim*, a full stack web developer with a passion for crafting clean, efficient, and beautiful web applications. Specializing in Django REST and React, I build interfaces that are fast, modern, and intuitive. Always learning, always coding, always pushing the boundaries!",
      ],
      typeSpeed: 20,
      showCursor: true,
      cursorChar: "|",
    });

    return () => typed.destroy();
  }, []);

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex-shrink-0 relative"
        >
          <motion.div
            className="absolute -inset-3 bg-gradient-to-r from-teal-500 to-amber-500 rounded-full blur-lg"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <img
            src="https://scontent.flhe3-2.fna.fbcdn.net/v/t39.30808-1/496164084_122151183386475634_2916404138364015201_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=106&ccb=1-7&_nc_sid=1d2534&_nc_ohc=SExgXklprbAQ7kNvwHaJEq7&_nc_oc=AdmGZCvCgUtzmGAarZ9OFWsV1mTatwapUhwOmnEpy_G9wwMpMaHa5O0ptJPbLkU1fO8&_nc_zt=24&_nc_ht=scontent.flhe3-2.fna&_nc_gid=govumwaXTTFexqia9NU7pA&oh=00_AfT1fwk0M0F5HsOBxS6gjExNYNGLkKC9QocEDuI-3aGAxQ&oe=687AC6D3"
            alt="Muhammad Saim"
            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-xl border-4 border-white dark:border-gray-800 relative z-10"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h2>
          <p ref={textRef} className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed" />
        </motion.div>
      </div>
    </section>
  );
};

export default About;