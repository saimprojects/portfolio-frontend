import { useState, useContext, useRef } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";
import API from "../api";
import { 
  Mail, 
  Send, 
  Loader2, 
  Phone, 
  MapPin, 
  Globe, 
  Clock, 
  Linkedin, 
  Github, 
  Twitter, 
  MessageSquare,
  User,
  MailIcon,
  CheckCircle,
  Sparkles
} from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

const Contact = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    message: "",
    subject: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const { darkMode } = useContext(ThemeContext);
  const formRef = useRef();

  const handleChange = (e) => {
    setFormData((prev) => ({ 
      ...prev, 
      [e.target.name]: e.target.value 
    }));
  };

  const handleFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message, subject } = formData;
    
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
      
      // Using EmailJS
      const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject || "New Contact Form Submission",
        message: message,
        to_name: "Your Name",
        reply_to: email
      };

      // Replace with your EmailJS service ID, template ID, and public key
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        templateParams,
        'YOUR_PUBLIC_KEY'
      );

      // Also send to your API if needed
      await API.postContact(formData);
      
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "", subject: "" });
      setSubmitted(true);
      
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
      
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { 
      icon: <Github className="w-5 h-5" />, 
      label: "GitHub", 
      url: "https://github.com/yourusername",
      color: "hover:bg-gray-900 hover:text-white"
    },
    { 
      icon: <Linkedin className="w-5 h-5" />, 
      label: "LinkedIn", 
      url: "https://linkedin.com/in/yourusername",
      color: "hover:bg-blue-700 hover:text-white"
    },
    { 
      icon: <Twitter className="w-5 h-5" />, 
      label: "Twitter", 
      url: "https://twitter.com/yourusername",
      color: "hover:bg-sky-500 hover:text-white"
    },
    { 
      icon: <MailIcon className="w-5 h-5" />, 
      label: "Email", 
      url: "mailto:you@example.com",
      color: "hover:bg-red-600 hover:text-white"
    },
  ];

  const contactInfo = [
    { 
      icon: <Phone className="w-6 h-6" />, 
      title: "Phone", 
      value: "+92 123 456 7890",
      desc: "Mon-Fri from 9am to 6pm"
    },
    { 
      icon: <Mail className="w-6 h-6" />, 
      title: "Email", 
      value: "hello@example.com",
      desc: "I'll respond within 24 hours"
    },
    { 
      icon: <MapPin className="w-6 h-6" />, 
      title: "Location", 
      value: "Karachi, Pakistan",
      desc: "Available for remote work"
    },
    { 
      icon: <Clock className="w-6 h-6" />, 
      title: "Response Time", 
      value: "Within 24 Hours",
      desc: "Usually respond same day"
    },
  ];

  return (
    <div className={`min-h-screen py-12 md:py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden ${
      darkMode ? "bg-gradient-to-br from-gray-900 to-black" : "bg-gradient-to-br from-gray-50 to-white"
    }`}>
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
            darkMode 
              ? "bg-gradient-to-r from-teal-500/10 to-purple-500/10" 
              : "bg-gradient-to-r from-teal-500/5 to-purple-500/5"
          }`}
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
          className={`absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
            darkMode 
              ? "bg-gradient-to-r from-amber-500/10 to-pink-500/10" 
              : "bg-gradient-to-r from-amber-500/5 to-pink-500/5"
          }`}
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

      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: darkMode ? '#1f2937' : '#ffffff',
            color: darkMode ? '#ffffff' : '#1f2937',
            border: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
          },
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/10 to-amber-500/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className={`text-sm font-semibold ${darkMode ? "text-amber-400" : "text-amber-600"}`}>
              Get In Touch
            </span>
          </div>
          
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            Let's{" "}
            <span className="bg-gradient-to-r from-teal-500 via-amber-500 to-purple-500 bg-clip-text text-transparent">
              Work Together
            </span>
          </h1>
          
          <p className={`text-xl max-w-3xl mx-auto mb-12 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            Have a project in mind? Let's discuss how we can bring your ideas to life and 
            create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl backdrop-blur-xl border ${
                  darkMode 
                    ? "bg-gray-900/50 border-gray-800/50" 
                    : "bg-white/80 border-gray-200/50"
                } shadow-lg hover:shadow-xl transition-all duration-500`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${
                    darkMode 
                      ? "bg-teal-500/10 text-teal-400" 
                      : "bg-teal-500/10 text-teal-600"
                  }`}>
                    {info.icon}
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold mb-1 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {info.title}
                    </h3>
                    <p className={`text-base font-medium mb-1 ${
                      darkMode ? "text-teal-300" : "text-teal-600"
                    }`}>
                      {info.value}
                    </p>
                    <p className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}>
                      {info.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`p-6 rounded-2xl backdrop-blur-xl border ${
                darkMode 
                  ? "bg-gray-900/50 border-gray-800/50" 
                  : "bg-white/80 border-gray-200/50"
              } shadow-lg`}
            >
              <h3 className={`text-lg font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                Connect With Me
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                      darkMode 
                        ? "bg-gray-800 text-gray-300 hover:text-white" 
                        : "bg-gray-100 text-gray-700 hover:text-gray-900"
                    } ${social.color} transition-all duration-300`}
                  >
                    {social.icon}
                    <span className="text-sm font-medium">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Success Message */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`p-6 rounded-2xl backdrop-blur-xl border ${
                    darkMode 
                      ? "bg-green-900/20 border-green-800/50" 
                      : "bg-green-50 border-green-200/50"
                  } shadow-lg`}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className={`w-6 h-6 ${
                      darkMode ? "text-green-400" : "text-green-600"
                    }`} />
                    <div>
                      <h4 className={`font-semibold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}>
                        Message Sent!
                      </h4>
                      <p className={`text-sm mt-1 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}>
                        Thanks for reaching out. I'll get back to you soon.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className={`rounded-3xl p-8 md:p-12 backdrop-blur-xl border shadow-2xl ${
              darkMode 
                ? "bg-gray-900/50 border-gray-800/50" 
                : "bg-white/80 border-gray-200/50"
            }`}>
              <div className="flex items-center gap-3 mb-8">
                <div className={`p-3 rounded-xl ${
                  darkMode 
                    ? "bg-teal-500/10 text-teal-400" 
                    : "bg-teal-500/10 text-teal-600"
                }`}>
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h2 className={`text-3xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    Send a Message
                  </h2>
                  <p className={`mt-1 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    Fill out the form and I'll get back to you as soon as possible
                  </p>
                </div>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <motion.div
                    animate={activeField === 'name' ? { scale: 1.02 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className={`block text-sm font-semibold mb-2 ${
                      darkMode ? "text-teal-200" : "text-gray-700"
                    }`}>
                      <User className="w-4 h-4 inline mr-2" />
                      Your Name *
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                      placeholder="John Doe"
                      className={`w-full px-5 py-3 rounded-xl border-2 transition-all duration-300 ${
                        darkMode 
                          ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-teal-500 focus:ring-teal-500/30" 
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-teal-500 focus:ring-teal-500/20"
                      } focus:outline-none focus:ring-4`}
                      required
                    />
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    animate={activeField === 'email' ? { scale: 1.02 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className={`block text-sm font-semibold mb-2 ${
                      darkMode ? "text-teal-200" : "text-gray-700"
                    }`}>
                      <MailIcon className="w-4 h-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      placeholder="john@example.com"
                      className={`w-full px-5 py-3 rounded-xl border-2 transition-all duration-300 ${
                        darkMode 
                          ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-teal-500 focus:ring-teal-500/30" 
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-teal-500 focus:ring-teal-500/20"
                      } focus:outline-none focus:ring-4`}
                      required
                    />
                  </motion.div>
                </div>

                {/* Subject Field */}
                <motion.div
                  animate={activeField === 'subject' ? { scale: 1.02 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className={`block text-sm font-semibold mb-2 ${
                    darkMode ? "text-teal-200" : "text-gray-700"
                  }`}>
                    <Globe className="w-4 h-4 inline mr-2" />
                    Subject
                  </label>
                  <input
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => handleFocus('subject')}
                    onBlur={handleBlur}
                    placeholder="Project inquiry or general question"
                    className={`w-full px-5 py-3 rounded-xl border-2 transition-all duration-300 ${
                      darkMode 
                        ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-teal-500 focus:ring-teal-500/30" 
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-teal-500 focus:ring-teal-500/20"
                    } focus:outline-none focus:ring-4`}
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div
                  animate={activeField === 'message' ? { scale: 1.02 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className={`block text-sm font-semibold mb-2 ${
                    darkMode ? "text-teal-200" : "text-gray-700"
                  }`}>
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    placeholder="Tell me about your project, timeline, and budget..."
                    className={`w-full px-5 py-3 rounded-xl border-2 transition-all duration-300 ${
                      darkMode 
                        ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-teal-500 focus:ring-teal-500/30" 
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-teal-500 focus:ring-teal-500/20"
                    } focus:outline-none focus:ring-4 resize-none`}
                    required
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-4"
                >
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-teal-500 to-amber-500 hover:from-teal-600 hover:to-amber-600"
                    } text-white shadow-lg hover:shadow-xl`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </button>
                </motion.div>

                <p className={`text-center text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  I typically respond within 24 hours. Your information is safe with me.
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "24h", label: "Avg. Response Time" },
              { value: "100%", label: "Client Satisfaction" },
              { value: "50+", label: "Projects Completed" },
              { value: "5★", label: "Average Rating" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl backdrop-blur-xl border text-center ${
                  darkMode 
                    ? "bg-gray-900/30 border-gray-800/50" 
                    : "bg-white/50 border-gray-200/50"
                }`}
              >
                <div className={`text-3xl font-bold mb-2 ${
                  darkMode ? "text-teal-400" : "text-teal-600"
                }`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;