import { useState, useContext } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import API from "../api";
import { Mail, SendHorizonal, Loader } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext"; // Added ThemeContext

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const { darkMode } = useContext(ThemeContext); // Added darkMode from context

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      toast.error("All fields are required!");
      return;
    }
    try {
      setLoading(true);
      await API.postContact(formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`min-h-screen py-20 px-4 sm:px-6 lg:px-12 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`max-w-4xl mx-auto p-8 rounded-2xl shadow-2xl backdrop-blur-md ${darkMode ? "bg-gray-800/80 border-teal-500/20" : "bg-white/90 border-gray-200"} border-2`}
        style={{ boxShadow: darkMode ? "0 10px 30px rgba(0, 255, 255, 0.1)" : "0 10px 30px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="text-center mb-10">
          <h2 className={`text-5xl font-extrabold flex justify-center items-center gap-3 ${darkMode ? "text-teal-300" : "text-gray-900"}`}>
            <Mail className="w-8 h-8" /> Contact Me
          </h2>
          <p className={`mt-2 text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Let’s connect—drop your message below!
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <label className={`block text-sm font-medium ${darkMode ? "text-teal-200" : "text-gray-700"} mb-2`}>Name</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={`w-full px-5 py-3 rounded-xl border-2 ${darkMode ? "bg-gray-900/50 border-teal-500/30 text-teal-100" : "bg-gray-50 border-gray-300 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300`}
              />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <label className={`block text-sm font-medium ${darkMode ? "text-teal-200" : "text-gray-700"} mb-2`}>Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={`w-full px-5 py-3 rounded-xl border-2 ${darkMode ? "bg-gray-900/50 border-teal-500/30 text-teal-100" : "bg-gray-50 border-gray-300 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300`}
              />
            </motion.div>
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <label className={`block text-sm font-medium ${darkMode ? "text-teal-200" : "text-gray-700"} mb-2`}>Message</label>
            <textarea
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message here..."
              className={`w-full px-5 py-3 rounded-xl border-2 ${darkMode ? "bg-gray-900/50 border-teal-500/30 text-teal-100" : "bg-gray-50 border-gray-300 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 resize-none`}
            ></textarea>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center"
          >
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center gap-3 px-8 py-3 rounded-xl font-bold text-lg ${darkMode ? "bg-teal-600 hover:bg-teal-700 text-white" : "bg-teal-500 hover:bg-teal-600 text-white"} shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70`}
            >
              {loading ? <Loader className="animate-spin w-6 h-6" /> : <SendHorizonal className="w-6 h-6" />}
              {loading ? "Sending..." : "Send Now"}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;