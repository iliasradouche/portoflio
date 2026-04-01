import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlinePaperAirplane,
} from "react-icons/hi";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { CONTACT, SOCIAL_LINKS } from "../data";

const SOCIAL_META = {
  LinkedIn:  { icon: <FaLinkedin />,       color: "hover:border-[#0077B5] hover:text-[#0077B5]" },
  GitHub:    { icon: <FaGithub />,         color: "hover:border-[#e0e0e0] hover:text-[#e0e0e0]" },
  Twitter:   { icon: <FaSquareXTwitter />, color: "hover:border-[#e0e0e0] hover:text-[#e0e0e0]" },
  Instagram: { icon: <FaInstagram />,      color: "hover:border-pink-400 hover:text-pink-400"    },
};

const CONTAINER = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const ITEM = {
  hidden:  { y: 20, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const ContactMe = () => {
  const [formData,     setFormData]     = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted,    setSubmitted]    = useState(false);

  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: false, amount: 0.15 });

  const handleChange  = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1400));
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden border-b border-[rgba(0,255,65,0.08)] py-20 lg:py-28"
    >
      {/* Ambient blob */}
      <div
        className="pointer-events-none absolute -right-40 top-1/4 -z-10 h-80 w-80 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(0,255,65,0.4) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="mb-2 font-mono text-xs text-[#808080]">▶ ssh ilias@contact</div>
          <h2 className="section-title text-4xl font-extrabold lg:text-5xl">
            <span className="text-[#e0e0e0]">Let's</span>
            <span className="text-[#00ff41]" style={{ textShadow: "0 0 20px rgba(0,255,65,0.4)" }}>
              {" "}Connect
            </span>
          </h2>
          <div className="section-divider mx-auto mt-4 max-w-xs" />
          <p className="mx-auto mt-4 max-w-xl font-mono text-sm text-[#808080]">
            // Have a project in mind? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* ── Left: contact info ── */}
          <motion.div
            variants={CONTAINER}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-8"
          >
            <motion.div variants={ITEM}>
              <div className="mb-2 font-mono text-xs text-[#00ff41]/60">// contact_info.json</div>
              <h3 className="mb-4 font-mono text-xl font-bold text-[#e0e0e0]">Get in Touch</h3>
              <p className="font-mono text-sm leading-relaxed text-[#808080]">
                Whether you have a question, a project proposal, or just want to connect — feel free to reach out. I'm always open to discussing new projects, creative ideas, or opportunities.
              </p>
            </motion.div>

            {/* Contact details */}
            <motion.div variants={ITEM} className="space-y-4">
              {[
                { icon: <HiOutlineMail         className="h-5 w-5" />, label: "Email",    value: CONTACT.email,   href: `mailto:${CONTACT.email}` },
                { icon: <HiOutlinePhone         className="h-5 w-5" />, label: "Phone",    value: CONTACT.phone,   href: `tel:${CONTACT.phone}`     },
                { icon: <HiOutlineLocationMarker className="h-5 w-5" />, label: "Location", value: CONTACT.address, href: null                        },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded"
                    style={{
                      border:     "1px solid rgba(0,255,65,0.2)",
                      background: "rgba(0,255,65,0.06)",
                      color:      "#00ff41",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-mono text-xs text-[#808080]">{item.label}</div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-mono text-sm text-[#e0e0e0] transition-colors hover:text-[#00ff41]"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-mono text-sm text-[#e0e0e0]">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Social icons */}
            <motion.div variants={ITEM}>
              <div className="mb-3 font-mono text-xs text-[#808080]">// follow me</div>
              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map(s => (
                  <motion.a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex h-10 w-10 items-center justify-center rounded border border-[rgba(0,255,65,0.15)] bg-[rgba(0,255,65,0.04)] text-[#808080] transition-all ${SOCIAL_META[s.name]?.color}`}
                  >
                    {SOCIAL_META[s.name]?.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: contact form ── */}
          <motion.div
            variants={CONTAINER}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="terminal-card rounded-lg p-6 lg:p-8"
          >
            <motion.div variants={ITEM} className="mb-2 font-mono text-xs text-[#00ff41]/60">
              // send_message.sh
            </motion.div>
            <motion.h3 variants={ITEM} className="mb-6 font-mono text-xl font-bold text-[#e0e0e0]">
              Send a Message
            </motion.h3>

            <form onSubmit={handleSubmit} noValidate>
              {/* Name + Email row */}
              <motion.div variants={ITEM} className="mb-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block font-mono text-xs text-[#808080]">
                    <span className="text-[#00ff41]/60">$ </span>your_name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Ilias Radouche"
                    className="terminal-input"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block font-mono text-xs text-[#808080]">
                    <span className="text-[#00ff41]/60">$ </span>your_email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="terminal-input"
                    autoComplete="email"
                  />
                </div>
              </motion.div>

              {/* Subject */}
              <motion.div variants={ITEM} className="mb-5">
                <label htmlFor="subject" className="mb-1.5 block font-mono text-xs text-[#808080]">
                  <span className="text-[#00ff41]/60">$ </span>subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project Discussion"
                  className="terminal-input"
                />
              </motion.div>

              {/* Message */}
              <motion.div variants={ITEM} className="mb-6">
                <label htmlFor="message" className="mb-1.5 block font-mono text-xs text-[#808080]">
                  <span className="text-[#00ff41]/60">$ </span>message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="I'd like to discuss a potential project..."
                  className="terminal-input resize-none"
                />
              </motion.div>

              {/* Submit */}
              <motion.div variants={ITEM}>
                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded px-6 py-3 font-mono text-sm font-bold transition-all ${
                    submitted
                      ? "cursor-default border border-[#00ff41] bg-[rgba(0,255,65,0.1)] text-[#00ff41]"
                      : "btn-terminal-solid"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      transmitting...
                    </>
                  ) : submitted ? (
                    <>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      message_sent ✓
                    </>
                  ) : (
                    <>
                      <HiOutlinePaperAirplane className="h-4 w-4 rotate-45" />
                      send_message()
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;