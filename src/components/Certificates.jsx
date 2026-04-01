import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { HiX, HiExternalLink } from "react-icons/hi";
import { CERTIFICATES } from "../data";

const CONTAINER = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const CARD_VAR = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0,   transition: { duration: 0.45, ease: "easeOut" } },
};

const Certificates = () => {
  const [selectedId,  setSelectedId]  = useState(null);
  const shouldReduce = useReducedMotion();
  const selected     = CERTIFICATES.find(c => c.id === selectedId);

  return (
    <section id="certificates" className="relative border-b border-[rgba(0,255,65,0.08)] py-20 lg:py-28">
      {/* Ambient blob */}
      <div
        className="pointer-events-none absolute -left-32 top-1/2 -z-10 h-72 w-72 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(0,255,65,0.4) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-2 font-mono text-xs text-[#808080]">▶ ls credentials/</div>
          <h2 className="section-title text-4xl font-extrabold lg:text-5xl">
            <span className="text-[#e0e0e0]">Certificates</span>
            <span className="text-[#00ff41]" style={{ textShadow: "0 0 20px rgba(0,255,65,0.4)" }}>
              {" "}&amp; Training
            </span>
          </h2>
          <div className="section-divider mx-auto mt-4 max-w-xs" />
          <p className="mx-auto mt-4 max-w-xl font-mono text-sm text-[#808080]">
            // Verified credentials — click a card to view details
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CERTIFICATES.map(cert => (
            <motion.div
              key={cert.id}
              variants={CARD_VAR}
              onClick={() => setSelectedId(cert.id)}
              whileHover={shouldReduce ? {} : { y: -5, borderColor: "rgba(0,255,65,0.35)" }}
              className="group cursor-pointer overflow-hidden rounded-lg terminal-card shadow-card transition-all"
            >
              {/* Image / placeholder */}
              <div className="relative h-44 overflow-hidden">
                {cert.image ? (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.7)" }}
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(0,255,65,0.1), rgba(0,100,30,0.2))" }}
                  >
                    {/* Certificate icon */}
                    <div className="flex flex-col items-center gap-2">
                      <svg viewBox="0 0 48 48" className="h-14 w-14 text-[#00ff41] opacity-40" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="4" y="8" width="40" height="32" rx="2" />
                        <path d="M12 18h24M12 24h16M12 30h10" strokeLinecap="round" />
                        <circle cx="38" cy="34" r="6" />
                        <path d="M35 34l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-80" />

                {/* Year badge */}
                {cert.date && (
                  <div
                    className="absolute right-3 top-3 rounded px-2 py-0.5 font-mono text-[10px] text-[#00ff41]"
                    style={{ border: "1px solid rgba(0,255,65,0.25)", background: "rgba(0,0,0,0.7)" }}
                  >
                    {cert.date}
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="font-mono text-sm font-bold leading-snug text-[#e0e0e0]">
                    {cert.title}
                  </h3>
                </div>
                {cert.issuer && (
                  <span className="inline-block rounded font-mono text-xs text-[#00ff41]"
                    style={{ border: "1px solid rgba(0,255,65,0.2)", padding: "1px 8px", background: "rgba(0,255,65,0.05)" }}
                  >
                    {cert.issuer}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={`modal-bg-${selected.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <motion.div
              key={`modal-${selected.id}`}
              initial={shouldReduce ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
              animate={shouldReduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-lg"
              style={{
                border:     "1px solid rgba(0,255,65,0.2)",
                background: "#111111",
                boxShadow:  "0 0 50px rgba(0,255,65,0.1)",
              }}
              role="dialog"
              aria-modal="true"
              aria-label={selected.title}
            >
              <button
                onClick={() => setSelectedId(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded border border-[rgba(0,255,65,0.2)] bg-[rgba(0,0,0,0.7)] text-[#808080] hover:border-[#00ff41] hover:text-[#00ff41] transition-colors"
              >
                <HiX />
              </button>

              {/* Image / placeholder */}
              <div className="relative h-48 sm:h-64">
                {selected.image ? (
                  <img src={selected.image} alt={selected.title}
                    className="h-full w-full object-cover"
                    style={{ filter: "brightness(0.7)" }}
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(0,255,65,0.08), rgba(0,80,20,0.2))" }}
                  >
                    <svg viewBox="0 0 48 48" className="h-20 w-20 text-[#00ff41] opacity-30" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="4" y="8" width="40" height="32" rx="2" />
                      <path d="M12 18h24M12 24h16M12 30h10" strokeLinecap="round" />
                      <circle cx="38" cy="34" r="6" />
                      <path d="M35 34l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-5">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <h2 className="font-mono text-xl font-bold text-[#e0e0e0] sm:text-2xl">
                      {selected.title}
                    </h2>
                    {selected.issuer && (
                      <span className="rounded px-3 py-1 font-mono text-xs text-[#00ff41]"
                        style={{ border: "1px solid rgba(0,255,65,0.3)", background: "rgba(0,0,0,0.7)" }}
                      >
                        {selected.issuer}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6">
                {selected.date && (
                  <div className="mb-4 flex items-center gap-2">
                    <span className="font-mono text-xs text-[#808080]">Issued:</span>
                    <span className="font-mono text-xs text-[#00ff41]">{selected.date}</span>
                  </div>
                )}
                {selected.description && (
                  <div>
                    <div className="mb-2 font-mono text-xs text-[#00ff41]/60">// overview</div>
                    <p className="font-mono text-sm leading-relaxed text-[#808080]">
                      {selected.description}
                    </p>
                  </div>
                )}
                {selected.link && (
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-terminal mt-5 inline-flex items-center gap-2 rounded px-5 py-2 text-sm"
                  >
                    View Credential <HiExternalLink />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
