import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CERTIFICATES } from "../constants";
import { HiX, HiExternalLink } from "react-icons/hi";

function Certificates() {
  const [selectedId, setSelectedId] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    visible: shouldReduceMotion
      ? { opacity: 1, transition: { staggerChildren: 0.05 } }
      : {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.07 },
        },
    exit: { opacity: 0 },
  };

  const cardVariants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 },
    visible: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  const selected = CERTIFICATES.find((c) => c.id === selectedId);

  return (
    <section id="certificates" className="scroll-mt-[var(--navbar-offset)] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 flex items-end justify-between"
        >
          <div>
            <h2 className="text-3xl font-bold text-white">Certificates</h2>
            <p className="mt-2 max-w-2xl text-neutral-400">
              Verified credentials and training I’ve completed. Click a card to view details.
            </p>
          </div>
          {selectedId === null && (
            <a
              href="#projects"
              className="hidden rounded-full bg-neutral-800 px-4 py-2 text-sm text-white transition-colors hover:bg-neutral-700 sm:inline-block"
            >
              See Projects
            </a>
          )}
        </motion.div>

        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {CERTIFICATES.map((cert) => (
              <motion.div
                key={cert.id}
                variants={cardVariants}
                layoutId={`cert-card-${cert.id}`}
                onClick={() => setSelectedId(cert.id)}
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
                className="group cursor-pointer overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/80 shadow-xl transition-all hover:border-neutral-700 hover:shadow-2xl"
              >
                <div className="relative h-52 overflow-hidden">
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={`${cert.title} certificate`}
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-600/30 to-fuchsia-600/30">
                      <span className="text-5xl">🎓</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent opacity-80"></div>
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="text-lg font-medium">{cert.title}</h3>
                    {cert.issuer && (
                      <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs font-medium text-orange-300">
                        {cert.issuer}
                      </span>
                    )}
                  </div>
                  {cert.date && (
                    <p className="text-xs text-neutral-400">{cert.date}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {selected && (
            <motion.div
              key={`modal-${selected.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            >
              <motion.div
                layoutId={`cert-card-${selected.id}`}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-full max-w-3xl overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900"
              >
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800/80 text-neutral-400 backdrop-blur-sm transition-colors hover:bg-neutral-700 hover:text-white"
                  aria-label="Close"
                >
                  <HiX />
                </button>

                <div className="relative h-64 w-full sm:h-80 md:h-96">
                  {selected.image ? (
                    <img
                      src={selected.image}
                      alt={`${selected.title} certificate`}
                      decoding="async"
                      sizes="100vw"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-600/30 to-fuchsia-600/30">
                      <span className="text-6xl">🎓</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                        {selected.title}
                      </h2>
                      {selected.issuer && (
                        <span className="rounded-full bg-gradient-to-r from-orange-500 to-sky-500 px-4 py-1 text-xs font-medium text-white">
                          {selected.issuer}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {selected.date && (
                      <div>
                        <h4 className="text-sm font-medium text-neutral-300">Issued</h4>
                        <p className="text-neutral-400">{selected.date}</p>
                      </div>
                    )}
                    {selected.credentialId && (
                      <div>
                        <h4 className="text-sm font-medium text-neutral-300">Credential ID</h4>
                        <p className="text-neutral-400">{selected.credentialId}</p>
                      </div>
                    )}
                  </div>

                  {selected.description && (
                    <div className="mb-6">
                      <h3 className="mb-2 text-xl font-medium">Overview</h3>
                      <p className="text-neutral-300">{selected.description}</p>
                    </div>
                  )}

                  {selected.link && (
                    <a
                      href={selected.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                      View Credential <HiExternalLink />
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Certificates;
