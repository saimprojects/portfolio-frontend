import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gray-100 dark:bg-gray-900 text-center py-8 text-sm text-gray-600 dark:text-gray-400 mt-12 relative overflow-hidden"
    >
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-teal-500 to-amber-500"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <p className="mb-2">© 2025 Muhammad Saim. All rights reserved.</p>
      <p className="mb-4">
        Built with <span className="text-teal-500 font-semibold">React</span> &{" "}
        <span className="text-teal-500 font-semibold">Django</span>
      </p>
      <div className="flex justify-center space-x-6 mb-4">
        <motion.a
          href="https://github.com/saimprojects"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.3 }}
        >
          <FaGithub className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition" size={24} />
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/muhammad-saim-0821b4319/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.3 }}
        >
          <FaLinkedin className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition" size={24} />
        </motion.a>
        <motion.a
          href="https://www.instagram.com/expertsaimdev/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.3 }}
        >
          <FaInstagram className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition" size={24} />
        </motion.a>
        <motion.a
          href="https://www.meetsaim.online/sitemap.xml"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition">Sitemap</span>
        </motion.a>
      </div>
      <div className="flex justify-center space-x-4">
        <Link
          to="/privacy-policy"
          className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition"
        >
          Privacy Policy
        </Link>
        <Link
          to="/return-refund-policy"
          className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition"
        >
          Return & Refund Policy
        </Link>
        <Link
          to="/shipping-policy"
          className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition"
        >
          Shipping Policy
        </Link>
        <Link
          to="/terms-and-conditions"
          className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition"
        >
          Terms & Conditions
        </Link>
      </div>
    </motion.footer>
  );
};

export default Footer;