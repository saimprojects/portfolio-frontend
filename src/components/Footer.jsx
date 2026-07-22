import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  const social = [
    { icon: FaGithub,    label: "GitHub",    url: "https://github.com/saimprojects" },
    { icon: FaLinkedin,  label: "LinkedIn",  url: "https://www.linkedin.com/in/muhammad-saim-0821b4319/" },
    { icon: FaTwitter,   label: "Twitter",   url: "https://twitter.com" },
    { icon: FaInstagram, label: "Instagram", url: "https://www.instagram.com/expertsaimdev/" },
  ];

  const quickLinks = [
    { name: "Home",     path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Blogs",    path: "/blogs" },
    { name: "Services", path: "/services" },
    { name: "Contact",  path: "/contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy",       path: "/privacy-policy" },
    { name: "Refund Policy",        path: "/return-refund-policy" },
    { name: "Shipping Policy",      path: "/shipping-policy" },
    { name: "Terms & Conditions",   path: "/terms-and-conditions" },
    { name: "Sitemap",              path: "/sitemap.xml", external: true },
  ];

  const contact = [
    { icon: Mail,   text: "saimpkf@gmail.com",  href: "mailto:saimpkf@gmail.com" },
    { icon: Phone,  text: "+92 313 147 1263",    href: "tel:+923131471263" },
    { icon: MapPin, text: "Karachi, Pakistan",   href: null },
  ];

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
    viewport: { once: true },
  });

  return (
    <footer className="bg-soft border-t border-ink/[0.07]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-16 pb-8">

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <motion.div {...fadeUp(0)} className="space-y-5">
            <Link to="/" className="text-xl font-bold text-ink">
              saim<span className="text-accent">.</span>dev
            </Link>

            <p className="text-sm text-muted leading-relaxed">
              Full Stack Developer building clean, fast, and scalable web
              applications. Based in Pakistan, available worldwide.
            </p>

            <div className="flex items-center gap-1.5 pt-1">
              {social.map(({ icon: Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg text-faint hover:text-ink hover:bg-ink/[0.06] transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div {...fadeUp(0.05)}>
            <h4 className="text-[10px] font-semibold text-faint uppercase tracking-[0.2em] mb-5">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div {...fadeUp(0.1)}>
            <h4 className="text-[10px] font-semibold text-faint uppercase tracking-[0.2em] mb-5">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent transition-colors"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-sm text-muted hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div {...fadeUp(0.15)}>
            <h4 className="text-[10px] font-semibold text-faint uppercase tracking-[0.2em] mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              {contact.map(({ icon: Icon, text, href }) => (
                <li key={text}>
                  {href ? (
                    <a
                      href={href}
                      className="flex items-center gap-3 text-sm text-muted hover:text-accent transition-colors"
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {text}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 text-sm text-muted">
                      <Icon className="w-4 h-4 shrink-0" />
                      {text}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-ink/[0.07] mb-6" />

        {/* Bottom bar */}
        <motion.div
          {...fadeUp(0.2)}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-faint"
        >
          <span>© {year} Muhammad Saim. All rights reserved.</span>
          <span className="hidden sm:block">Built with React & Django · Made in Pakistan 🇵🇰</span>
          <a href="#top" className="hover:text-accent transition-colors">
            Back to top ↑
          </a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;