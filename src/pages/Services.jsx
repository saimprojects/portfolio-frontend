import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api";
import toast from "react-hot-toast";
import {
  Code,
  CheckCircle,
  ArrowRight,
  Sparkles,
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

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useSEO({
    title: "Services",
    description:
      "Web development services by Muhammad Saim — full stack applications, frontends, APIs, and more. From concept to deployment.",
    path: "/services",
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await API.getServices();
        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.results || [];
        setServices(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load services.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const stats = [
    { value: "50+", label: "Projects completed" },
    { value: "30+", label: "Happy clients" },
    { value: "24/7", label: "Support" },
    { value: "98%", label: "Success rate" },
  ];

  const process = [
    { step: "01", title: "Discovery",   description: "Understand your requirements and goals" },
    { step: "02", title: "Planning",    description: "Create roadmap and design architecture" },
    { step: "03", title: "Development", description: "Build with modern technologies and best practices" },
    { step: "04", title: "Delivery",    description: "Launch, support, and maintenance" },
  ];

  const Skeleton = () => (
    <div className="rounded-2xl bg-card border border-ink/[0.07] p-6 animate-pulse">
      <div className="h-6 bg-ink/10 rounded w-1/2 mb-6" />
      <div className="space-y-3 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 bg-ink/[0.06] rounded" />
        ))}
      </div>
      <div className="h-10 bg-ink/10 rounded-xl" />
    </div>
  );

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
          <SectionLabel>Services</SectionLabel>
          <h1 className="text-4xl md:text-6xl font-bold text-ink tracking-tight mb-4">
            What I can do
            <br />
            <span className="text-accent">for you.</span>
          </h1>
          <p className="text-muted text-lg max-w-xl">
            From concept to deployment — end-to-end digital solutions that
            transform ideas into high-performance applications.
          </p>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-6 rounded-2xl bg-card border border-ink/[0.07] hover:border-accent/30 transition-colors"
            >
              <div className="text-3xl font-bold text-ink tabular-nums mb-1">{s.value}</div>
              <div className="text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ── Services grid ── */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20">
            <Sparkles className="w-12 h-12 text-faint mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-ink mb-3">No services available</h3>
            <p className="text-muted">Services will be updated soon. Please check back later.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="group flex flex-col rounded-2xl bg-card border border-ink/[0.07] hover:border-accent/40 p-7 transition-colors duration-300"
              >
                {/* Icon + title */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3 rounded-xl bg-accent/10 border border-accent/25 text-accent">
                    <Code className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-ink group-hover:text-accent transition-colors leading-snug">
                    {service.title}
                  </h3>
                </div>

                {/* Features */}
                <div className="space-y-2.5 mb-7">
                  {(service.features ? service.features.split("<br>") : [])
                    .filter((f) => f.trim())
                    .slice(0, 5)
                    .map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span className="text-sm text-muted leading-relaxed">
                          {feature.trim()}
                        </span>
                      </div>
                    ))}
                </div>

                {/* Price + CTA */}
                <div className="mt-auto pt-5 border-t border-ink/[0.06]">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-ink tabular-nums">
                      {service.price || "Custom"}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate("/contact")}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-accent text-accent-ink text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Process ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-24"
        >
          <SectionLabel>How I work</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-12">
            My working process
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {process.map((p, index) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="relative rounded-2xl bg-card border border-ink/[0.07] p-6 hover:border-accent/30 transition-colors"
              >
                <span className="font-mono text-xs tracking-[0.2em] text-accent opacity-70">
                  {p.step}
                </span>
                <h4 className="text-lg font-bold text-ink mt-3 mb-2">{p.title}</h4>
                <p className="text-sm text-muted leading-relaxed">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-24 rounded-3xl bg-soft border border-ink/[0.07] p-10 md:p-14 text-center"
        >
          <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase mb-4">
            Ready to start?
          </p>
          <h3 className="text-2xl md:text-4xl font-bold text-ink tracking-tight mb-3">
            Let's transform your ideas
          </h3>
          <p className="text-muted mb-8 max-w-md mx-auto">
            Tell me about your project requirements and let's create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-accent-ink text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              Start a project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-ink/10 hover:border-accent/50 text-muted hover:text-ink text-sm font-semibold rounded-xl transition-colors"
            >
              See my work
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
