import { motion } from "framer-motion";
import { 
  FaGithub, 
  FaLinkedin, 
  FaInstagram, 
  FaTwitter,
  FaHeart,
  FaCoffee
} from "react-icons/fa";
import { 
  Link 
} from "react-router-dom";
import { 
  Mail, 
  MapPin, 
  Phone,
  ExternalLink,
  Sparkles
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: <FaGithub />, 
      label: "GitHub", 
      url: "https://github.com/saimprojects",
      color: "hover:bg-gray-900 hover:text-white"
    },
    { 
      icon: <FaLinkedin />, 
      label: "LinkedIn", 
      url: "https://www.linkedin.com/in/muhammad-saim-0821b4319/",
      color: "hover:bg-blue-700 hover:text-white"
    },
    { 
      icon: <FaTwitter />, 
      label: "Twitter", 
      url: "https://twitter.com",
      color: "hover:bg-sky-500 hover:text-white"
    },
    { 
      icon: <FaInstagram />, 
      label: "Instagram", 
      url: "https://www.instagram.com/expertsaimdev/",
      color: "hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-white"
    },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Blogs", path: "/blogs" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Return & Refund Policy", path: "/return-refund-policy" },
    { name: "Shipping Policy", path: "/shipping-policy" },
    { name: "Terms & Conditions", path: "/terms-and-conditions" },
    { name: "Sitemap", path: "/sitemap.xml", external: true },
  ];

  const contactInfo = [
    { icon: <Mail className="w-4 h-4" />, text: "saimpkf@gmail.com" },
    { icon: <Phone className="w-4 h-4" />, text: "+92 313 147 1263" },
    { icon: <MapPin className="w-4 h-4" />, text: "Karachi, Pakistan" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-transparent to-gray-100/50 dark:to-gray-900/50 pt-16 pb-8 px-4 sm:px-6 lg:px-12 overflow-hidden">
      {/* Top Gradient Line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-amber-500 to-purple-500"
        animate={{ 
          backgroundPosition: ["0%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: "200% 100%",
        }}
      />

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-r from-teal-500/5 to-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-r from-amber-500/5 to-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="p-2 rounded-lg bg-gradient-to-r from-teal-500 to-amber-500">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-amber-500 bg-clip-text text-transparent">
                Saim.dev
              </h2>
            </motion.div>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Building exceptional digital experiences with modern technologies. 
              Passionate about clean code, great design, and innovative solutions.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 ${social.color} transition-all duration-300 shadow-sm hover:shadow-md`}
                  aria-label={social.label}
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                  >
                    <span className="w-1 h-1 bg-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.external ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                    >
                      <span className="w-1 h-1 bg-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                    >
                      <span className="w-1 h-1 bg-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.li
                  key={info.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 text-gray-600 dark:text-gray-400"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500/10 to-amber-500/10 text-teal-500">
                    {info.icon}
                  </div>
                  <span className="text-sm">{info.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
          >
            <span>© {currentYear} Muhammad Saim. All rights reserved.</span>
            <FaHeart className="text-red-500 animate-pulse" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400"
          >
            <span className="flex items-center gap-2">
              <FaCoffee className="text-amber-600" />
              Built with React & Django
            </span>
            <span>•</span>
            <span>Made in Pakistan</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            <a
              href="#top"
              className="hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
            >
              Back to top ↑
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;