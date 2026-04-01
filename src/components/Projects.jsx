import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { HiX, HiExternalLink, HiCode, HiArrowRight } from "react-icons/hi";
import { PROJECTS, PROJECT_CATEGORIES } from "../data";

const CONTAINER = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const CARD = {
  hidden:  { y: 30, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:    { y: 20, opacity: 0, transition: { duration: 0.3 } },
};

const BACKDROP = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

const MODAL = {
  hidden:  { opacity: 0, scale: 0.93, y: 20 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } },
};

const Projects = () => {
  const [selectedId,     setSelectedId]     = useState(null);
  const [carouselIndex,  setCarouselIndex]  = useState(0);
  const [filter,         setFilter]         = useState("all");
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: false, amount: 0.1 });

  const filtered = filter === "all"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter);

  const selectedProject = PROJECTS.find(p => p.id === selectedId);

  useEffect(() => { setCarouselIndex(0); }, [selectedId]);

  // Close modal on Escape
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") setSelectedId(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selectedId ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedId]);

  return (
    <section
      ref={sectionRef}
      id="projects"
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
          className="mb-12 text-center"
        >
          <div className="mb-2 font-mono text-xs text-[#808080]">▶ ls -la projects/</div>
          <h2 className="section-title text-4xl font-extrabold lg:text-5xl">
            <span className="text-[#e0e0e0]">Featured</span>
            <span className="text-[#00ff41]" style={{ textShadow: "0 0 20px rgba(0,255,65,0.4)" }}>
              {" "}Projects
            </span>
          </h2>
          <div className="section-divider mx-auto mt-4 max-w-xs" />
          <p className="mx-auto mt-4 max-w-xl font-mono text-sm text-[#808080]">
            // A selection of shipped products — click any card for details
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {PROJECT_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`rounded border px-5 py-2 font-mono text-xs transition-all ${
                filter === cat.id
                  ? "border-[#00ff41] bg-[rgba(0,255,65,0.1)] text-[#00ff41]"
                  : "border-[rgba(0,255,65,0.15)] bg-transparent text-[#808080] hover:border-[rgba(0,255,65,0.4)] hover:text-[#e0e0e0]"
              }`}
            >
              {filter === cat.id && <span className="mr-1.5">▶</span>}
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            variants={CONTAINER}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map(project => (
              <motion.div
                key={project.id}
                variants={CARD}
                onClick={() => setSelectedId(project.id)}
                whileHover={{ y: -6, borderColor: "rgba(0,255,65,0.35)" }}
                className="group cursor-pointer overflow-hidden rounded-lg terminal-card shadow-card transition-all"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.75) contrast(1.05)" }}
                  />
                  {/* Green tint overlay */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: "rgba(0,255,65,0.04)", mixBlendMode: "screen" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-70" />

                  {/* Hover overlay actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span
                      className="rounded px-4 py-2 font-mono text-xs text-[#00ff41] backdrop-blur-sm"
                      style={{ border: "1px solid rgba(0,255,65,0.4)", background: "rgba(0,0,0,0.6)" }}
                    >
                      View Details
                    </span>
                  </div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div
                      className="absolute right-3 top-3 rounded px-2 py-0.5 font-mono text-[10px] font-bold text-[#00ff41]"
                      style={{ border: "1px solid rgba(0,255,65,0.3)", background: "rgba(0,0,0,0.7)" }}
                    >
                      FEATURED
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="mb-1.5 font-mono text-sm font-bold text-[#e0e0e0]">
                    {project.title}
                  </h3>
                  <p className="mb-3 line-clamp-2 font-mono text-xs text-[#808080]">
                    {project.description}
                  </p>

                  {/* Tech badges */}
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((t, i) => (
                      <span key={i} className="tech-badge">{t}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tech-badge opacity-60">+{project.technologies.length - 3}</span>
                    )}
                  </div>

                  {/* Action row */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          aria-label={`Live: ${project.title}`}
                          className="btn-terminal rounded px-3 py-1 text-xs"
                        >
                          <HiExternalLink className="inline mr-1" />Live
                        </a>
                      )}
                      {project.codeLink && (
                        <a
                          href={project.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          aria-label={`Code: ${project.title}`}
                          className="btn-terminal rounded px-3 py-1 text-xs"
                        >
                          <HiCode className="inline mr-1" />Code
                        </a>
                      )}
                    </div>
                    <span className="font-mono text-xs text-[#00ff41]/60 group-hover:text-[#00ff41] transition-colors flex items-center gap-1">
                      Details <HiArrowRight />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/iliasradouche"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-terminal inline-flex items-center gap-2 rounded px-6 py-3"
          >
            <span className="text-[#00ff41]">▶</span>
            View All on GitHub
            <HiArrowRight />
          </a>
        </motion.div>
      </div>

      {/* ── Project Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              variants={BACKDROP}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            >
              {/* Modal */}
              <motion.div
                key={`modal-${selectedProject.id}`}
                variants={MODAL}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={e => e.stopPropagation()}
                className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg scrollbar-thin scrollbar-webkit"
                style={{
                  border:     "1px solid rgba(0,255,65,0.2)",
                  background: "#111111",
                  boxShadow:  "0 0 60px rgba(0,255,65,0.1)",
                }}
                role="dialog"
                aria-modal="true"
                aria-label={selectedProject.title}
              >
                {/* Close */}
                <button
                  onClick={() => setSelectedId(null)}
                  aria-label="Close"
                  className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded border border-[rgba(0,255,65,0.2)] bg-[rgba(0,0,0,0.7)] text-[#808080] transition-colors hover:border-[#00ff41] hover:text-[#00ff41]"
                >
                  <HiX />
                </button>

                {/* Image carousel */}
                {(() => {
                  const images = selectedProject.images?.length
                    ? selectedProject.images
                    : [selectedProject.image];
                  const src = images[Math.min(carouselIndex, images.length - 1)];
                  return (
                    <div className="relative h-56 w-full sm:h-72 md:h-80">
                      <img
                        src={src}
                        alt={`${selectedProject.title} screenshot ${carouselIndex + 1}`}
                        className="h-full w-full object-cover"
                        style={{ filter: "brightness(0.8)" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />

                      {/* Title overlay */}
                      <div className="absolute bottom-0 left-0 w-full p-5">
                        <div className="flex flex-wrap items-end justify-between gap-3">
                          <div>
                            <div className="mb-1 font-mono text-xs text-[#00ff41]/70">▶ {selectedProject.category}</div>
                            <h2 className="font-mono text-2xl font-bold text-[#e0e0e0] sm:text-3xl">
                              {selectedProject.title}
                            </h2>
                          </div>
                          {selectedProject.featured && (
                            <span
                              className="rounded px-3 py-1 font-mono text-xs font-bold text-[#00ff41]"
                              style={{ border: "1px solid rgba(0,255,65,0.3)", background: "rgba(0,0,0,0.7)" }}
                            >
                              FEATURED
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Carousel controls */}
                      {images.length > 1 && (
                        <>
                          <div className="absolute inset-0 flex items-center justify-between px-3">
                            <button
                              onClick={() => setCarouselIndex(p => (p - 1 + images.length) % images.length)}
                              className="flex h-8 w-8 items-center justify-center rounded bg-black/60 font-mono text-[#00ff41] backdrop-blur-sm hover:bg-black/80"
                              aria-label="Previous image"
                            >‹</button>
                            <button
                              onClick={() => setCarouselIndex(p => (p + 1) % images.length)}
                              className="flex h-8 w-8 items-center justify-center rounded bg-black/60 font-mono text-[#00ff41] backdrop-blur-sm hover:bg-black/80"
                              aria-label="Next image"
                            >›</button>
                          </div>
                          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {images.map((_, i) => (
                              <button
                                key={i}
                                onClick={() => setCarouselIndex(i)}
                                className={`h-1.5 w-1.5 rounded-full transition-all ${i === carouselIndex ? "bg-[#00ff41] w-4" : "bg-[#808080]"}`}
                                aria-label={`Image ${i + 1}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })()}

                {/* Details */}
                <div className="p-6">
                  {/* Description */}
                  <div className="mb-6">
                    <div className="mb-2 font-mono text-xs text-[#00ff41]/60">// overview</div>
                    <p className="font-mono text-sm leading-relaxed text-[#808080]">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Tech */}
                  <div className="mb-6">
                    <div className="mb-3 font-mono text-xs text-[#00ff41]/60">// stack[]</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((t, i) => (
                        <span key={i} className="tech-badge">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.liveLink && (
                      <a
                        href={selectedProject.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-terminal-solid flex items-center gap-2 rounded px-5 py-2 text-sm"
                      >
                        <HiExternalLink />
                        View Live
                      </a>
                    )}
                    {selectedProject.codeLink && (
                      <a
                        href={selectedProject.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-terminal flex items-center gap-2 rounded px-5 py-2 text-sm"
                      >
                        <HiCode />
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
