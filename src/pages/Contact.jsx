import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import API from "../api";
import {
  Mail,
  Send,
  Loader2,
  Phone,
  MapPin,
  Clock,
  Linkedin,
  Github,
  MessageSquare,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import useSEO from "../hooks/useSEO";

const SectionLabel = ({ children }) => (
  <div className="inline-flex items-center gap-3 mb-4">
    <span className="w-8 h-px bg-accent" />
    <span className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
      {children}
    </span>
  </div>
);

const inputClasses =
  "w-full px-4 py-3 bg-base border border-ink/10 rounded-xl text-sm text-ink placeholder:text-faint focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 transition-colors";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef();

  useSEO({
    title: "Contact",
    description:
      "Get in touch with Muhammad Saim — Full Stack Developer. Available for freelance projects and full-time opportunities.",
    path: "/contact",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      toast.error("Please fill in all required fields!");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    try {
      setLoading(true);
      await API.postContact(formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "", subject: "" });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: Phone,  title: "Phone",         value: "+92 313 147 1263",  desc: "Mon–Fri, 9am to 6pm",       href: "tel:+923131471263" },
    { icon: Mail,   title: "Email",         value: "saimpkf@gmail.com", desc: "I'll respond within 24 hours", href: "mailto:saimpkf@gmail.com" },
    { icon: MapPin, title: "Location",      value: "Karachi, Pakistan", desc: "Available for remote work" },
    { icon: Clock,  title: "Response Time", value: "Within 24 hours",   desc: "Usually same day" },
  ];

  const socialLinks = [
    { icon: Github,   label: "GitHub",   url: "https://github.com/saimprojects" },
    { icon: Linkedin, label: "LinkedIn", url: "https://linkedin.com/in/muhammad-saim-0821b4319" },
    { icon: Mail,     label: "Email",    url: "mailto:saimpkf@gmail.com" },
  ];

  return (
    <div className="min-h-screen bg-base pt-28 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <SectionLabel>Contact</SectionLabel>
          <h1 className="text-4xl md:text-6xl font-bold text-ink tracking-tight mb-4">
            Let's work
            <span className="text-accent"> together.</span>
          </h1>
          <p className="text-muted text-lg max-w-xl">
            Have a project in mind? Tell me about it — I'll get back to you
            within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Left — info ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="space-y-4"
          >
            {contactInfo.map((info) => {
              const Icon = info.icon;
              const content = (
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-ink/[0.07] hover:border-accent/30 transition-colors">
                  <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/25 text-accent shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold tracking-widest text-faint uppercase mb-1">
                      {info.title}
                    </div>
                    <div className="text-sm font-bold text-ink">{info.value}</div>
                    <div className="text-xs text-muted mt-0.5">{info.desc}</div>
                  </div>
                </div>
              );
              return info.href ? (
                <a key={info.title} href={info.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={info.title}>{content}</div>
              );
            })}

            {/* Socials */}
            <div className="p-5 rounded-2xl bg-card border border-ink/[0.07]">
              <div className="text-xs font-semibold tracking-widest text-faint uppercase mb-4">
                Connect with me
              </div>
              <div className="flex gap-2">
                {socialLinks.map(({ icon: Icon, label, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-2.5 rounded-xl border border-ink/10 text-muted hover:text-accent hover:border-accent/40 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Success message */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-5 rounded-2xl bg-accent/10 border border-accent/30"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                    <div>
                      <div className="font-bold text-ink text-sm">Message sent!</div>
                      <p className="text-xs text-muted mt-0.5">
                        Thanks for reaching out. I'll get back to you soon.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Right — form ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="rounded-3xl bg-card border border-ink/[0.08] p-7 md:p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-accent/10 border border-accent/25 text-accent">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-ink tracking-tight">
                    Send a message
                  </h2>
                  <p className="text-sm text-muted mt-0.5">
                    Fill out the form and I'll get back to you as soon as possible.
                  </p>
                </div>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold tracking-widest text-faint uppercase mb-2">
                      Your name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold tracking-widest text-faint uppercase mb-2">
                      Email address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={inputClasses}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold tracking-widest text-faint uppercase mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry or general question"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold tracking-widest text-faint uppercase mb-2">
                    Your message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, and budget…"
                    className={`${inputClasses} resize-none`}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold transition-opacity duration-200 ${
                    loading
                      ? "bg-ink/20 text-muted cursor-not-allowed"
                      : "bg-accent text-accent-ink hover:opacity-90"
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-faint">
                  I typically respond within 24 hours. Your information is safe with me.
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "24h",  label: "Avg. response time" },
            { value: "100%", label: "Client satisfaction" },
            { value: "50+",  label: "Projects completed" },
            { value: "5★",   label: "Average rating" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl bg-card border border-ink/[0.07] text-center hover:border-accent/30 transition-colors"
            >
              <div className="text-2xl font-bold text-accent tabular-nums mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
