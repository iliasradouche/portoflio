import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  HiExternalLink, HiCode, HiX, HiArrowRight,
  HiFolder, HiChevronRight,
} from "react-icons/hi";
import { PROJECTS } from "../data";

/* ─────────────────────────────────────────
   Helpers
────────────────────────────────────────── */
const featured    = PROJECTS.filter(p => p.featured);
const nonFeatured = PROJECTS.filter(p => !p.featured);

// drwxr-xr-x  ilias  staff  4.0K  Apr 01  project/
const fmtPermissions = () => "drwxr-xr-x";
const fmtDate = () => {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const d = new Date();
  return `${months[d.getMonth()]} ${String(d.getDate()).padStart(2," ")}`;
};
const fakeSize = (id) => {
  const sizes = ["2.1K","4.2K","8.5K","1.8K","3.3K","6.0K","12K"];
  return sizes[id % sizes.length];
};

/* ─────────────────────────────────────────
   Side Drawer
────────────────────────────────────────── */
const DRAWER = {
  hidden:  { x: "100%", opacity: 0 },
  visible: { x: 0,      opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit:    { x: "100%", opacity: 0, transition: { duration: 0.25 } },
};

const Drawer = ({ project, onClose }) => {
  if (!project) return null;
  const [imgIdx, setImgIdx] = useState(0);
  const images = project.images?.length ? project.images : [project.image];

  useEffect(() => { setImgIdx(0); }, [project.id]);
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.aside
      key={`drawer-${project.id}`}
      variants={DRAWER}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col overflow-y-auto shadow-2xl"
      style={{
        background:   "#0d0d0d",
        borderLeft:   "1px solid rgba(0,255,65,0.18)",
        boxShadow:    "-20px 0 60px rgba(0,0,0,0.7), 0 0 40px rgba(0,255,65,0.06)",
      }}
      role="complementary"
      aria-label={`Project: ${project.title}`}
    >
      {/* ── Top bar ── */}
      <div
        className="flex items-center justify-between border-b px-4 py-3"
        style={{ borderColor: "rgba(0,255,65,0.1)", background: "rgba(0,255,65,0.03)" }}
      >
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-[#00ff41]/50">~/projects/</span>
          <span className="text-[#00ff41]">{project.title.toLowerCase().replace(/\s+/g, "-")}/</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close drawer"
          className="flex h-7 w-7 items-center justify-center rounded border border-[rgba(0,255,65,0.2)] text-[#808080] transition-colors hover:border-[#00ff41] hover:text-[#00ff41]"
        >
          <HiX className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* ── Image carousel ── */}
      <div className="relative h-52 shrink-0 overflow-hidden">
        <img
          src={images[imgIdx]}
          alt={`${project.title} screenshot`}
          className="h-full w-full object-cover"
          style={{ filter: "brightness(0.75) contrast(1.05)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />

        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-3">
            {["‹", "›"].map((ch, i) => (
              <button
                key={ch}
                onClick={() => setImgIdx(p => i === 0 ? (p - 1 + images.length) % images.length : (p + 1) % images.length)}
                className="flex h-8 w-8 items-center justify-center rounded bg-black/50 font-mono text-lg text-[#00ff41] hover:bg-black/80"
                aria-label={i === 0 ? "Previous" : "Next"}
              >
                {ch}
              </button>
            ))}
          </div>
        )}

        {project.featured && (
          <div
            className="absolute left-3 top-3 rounded px-2 py-0.5 font-mono text-[10px] font-bold text-[#00ff41]"
            style={{ border: "1px solid rgba(0,255,65,0.35)", background: "rgba(0,0,0,0.75)" }}
          >
            FEATURED
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col gap-5 p-5">

        {/* Title */}
        <div>
          <div className="mb-1 font-mono text-[10px] text-[#00ff41]/50">
            cat {project.title.toLowerCase().replace(/\s+/g,"-")}.md
          </div>
          <h2 className="font-mono text-2xl font-extrabold text-[#e0e0e0]">{project.title}</h2>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-3 font-mono text-[11px]">
          <span className="text-[#808080]">
            <span className="text-[#00ff41]/60">category:</span>{" "}
            <span className="text-[#e0e0e0]">{project.category}</span>
          </span>
          <span className="text-[#808080]">
            <span className="text-[#00ff41]/60">files:</span>{" "}
            <span className="text-[#e0e0e0]">{fakeSize(project.id)}</span>
          </span>
        </div>

        {/* Description */}
        <div>
          <div className="mb-1.5 font-mono text-[10px] text-[#00ff41]/50">// overview</div>
          <p className="font-mono text-sm leading-relaxed text-[#808080]">{project.description}</p>
        </div>

        {/* Stack */}
        <div>
          <div className="mb-2 font-mono text-[10px] text-[#00ff41]/50">// dependencies[]</div>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t, i) => (
              <span key={i} className="tech-badge">{t}</span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="mt-auto flex gap-3">
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
              className="btn-terminal-solid flex items-center gap-2 rounded px-5 py-2.5 text-sm"
            >
              <HiExternalLink /> Live Demo
            </a>
          )}
          {project.codeLink && (
            <a href={project.codeLink} target="_blank" rel="noopener noreferrer"
              className="btn-terminal flex items-center gap-2 rounded px-5 py-2.5 text-sm"
            >
              <HiCode /> Source
            </a>
          )}
          {!project.liveLink && !project.codeLink && (
            <p className="font-mono text-xs text-[#808080] italic">
              // private — source not available
            </p>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

/* ─────────────────────────────────────────
   Featured bento cards
────────────────────────────────────────── */
const FeaturedCard = ({ project, layout, onClick }) => {
  const [hovered, setHovered] = useState(false);

  // layout: "hero" | "tall"
  const heightClass = layout === "hero" ? "h-full min-h-[420px]" : "h-[204px]";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.015 }}
      className={`group relative w-full overflow-hidden rounded-xl text-left transition-all ${heightClass}`}
      style={{
        border:     "1px solid rgba(0,255,65,0.12)",
        boxShadow:  hovered
          ? "0 0 30px rgba(0,255,65,0.1), 0 8px 32px rgba(0,0,0,0.6)"
          : "0 4px 20px rgba(0,0,0,0.5)",
      }}
      aria-label={`View ${project.title}`}
    >
      {/* Image */}
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ filter: "brightness(0.5) contrast(1.1)" }}
      />

      {/* Green vignette overlay on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-400"
        style={{
          background: "linear-gradient(135deg, rgba(0,255,65,0.08) 0%, transparent 60%)",
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Bottom gradient always */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Corner decoration */}
      <div className="absolute left-3 top-3 flex items-center gap-1.5">
        <span
          className="rounded px-2 py-0.5 font-mono text-[10px] font-bold text-[#00ff41]"
          style={{ border: "1px solid rgba(0,255,65,0.3)", background: "rgba(0,0,0,0.6)" }}
        >
          FEATURED
        </span>
        <span
          className="rounded px-2 py-0.5 font-mono text-[10px] text-[#808080]"
          style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.6)" }}
        >
          {project.category}
        </span>
      </div>

      {/* Scan lines texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px)",
        }}
      />

      {/* Content at bottom */}
      <div className="absolute bottom-0 left-0 w-full p-4">
        {/* Tech badges row */}
        <div className="mb-2 flex flex-wrap gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {project.technologies.slice(0, 3).map((t, i) => (
            <span key={i} className="tech-badge text-[10px]">{t}</span>
          ))}
        </div>

        <h3 className="font-mono text-lg font-extrabold text-[#e0e0e0] lg:text-xl">
          {project.title}
        </h3>
        <p
          className="mt-1 line-clamp-2 font-mono text-xs text-[#808080] transition-all duration-300"
          style={{ maxHeight: hovered ? "3rem" : "0", opacity: hovered ? 1 : 0, overflow: "hidden" }}
        >
          {project.description}
        </p>

        {/* Arrow chip */}
        <div
          className="mt-2.5 inline-flex items-center gap-1.5 rounded font-mono text-xs text-[#00ff41] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ textShadow: "0 0 8px rgba(0,255,65,0.6)" }}
        >
          <HiChevronRight className="h-3.5 w-3.5" />
          open project
        </div>
      </div>
    </motion.button>
  );
};

/* ─────────────────────────────────────────
   Directory listing row (non-featured)
────────────────────────────────────────── */
const ListingRow = ({ project, index, onClick }) => (
  <motion.button
    type="button"
    onClick={onClick}
    initial={{ opacity: 0, x: -12 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    whileHover={{ x: 4 }}
    className="group flex w-full items-center gap-2 rounded px-3 py-2.5 text-left font-mono text-xs transition-all"
    style={{ border: "1px solid transparent" }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = "rgba(0,255,65,0.15)";
      e.currentTarget.style.background  = "rgba(0,255,65,0.03)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = "transparent";
      e.currentTarget.style.background  = "transparent";
    }}
    aria-label={`View ${project.title}`}
  >
    {/* Permissions */}
    <span className="hidden text-[#808080]/50 sm:block shrink-0">{fmtPermissions()}</span>
    {/* Owner */}
    <span className="hidden text-[#00ff41]/40 sm:block shrink-0 w-10">ilias</span>
    {/* Size */}
    <span className="hidden text-[#808080]/60 sm:block shrink-0 w-8 text-right">{fakeSize(project.id)}</span>
    {/* Date */}
    <span className="hidden text-[#808080]/40 sm:block shrink-0 w-12">{fmtDate()}</span>

    {/* Folder icon + name */}
    <div className="flex min-w-0 items-center gap-1.5">
      <HiFolder className="h-3.5 w-3.5 shrink-0 text-[#00ff41]/60" />
      <span className="truncate text-[#e0e0e0] group-hover:text-[#00ff41] transition-colors">
        {project.title.toLowerCase().replace(/\s+/g, "-")}/
      </span>
    </div>

    {/* Tech tags */}
    <div className="ml-auto flex shrink-0 items-center gap-1.5">
      {project.technologies.slice(0, 2).map((t, i) => (
        <span key={i} className="hidden rounded px-1.5 py-0.5 text-[10px] text-[#808080] sm:block"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {t}
        </span>
      ))}
      <HiArrowRight className="h-3 w-3 text-[#00ff41]/0 transition-all group-hover:text-[#00ff41]" />
    </div>
  </motion.button>
);

/* ─────────────────────────────────────────
   Main Projects section
────────────────────────────────────────── */
const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const shouldReduce = useReducedMotion();

  const open  = p => { setActiveProject(p); document.body.style.overflow = "hidden"; };
  const close  = ()  => { setActiveProject(null); document.body.style.overflow = ""; };

  useEffect(() => () => { document.body.style.overflow = ""; }, []);

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-b border-[rgba(0,255,65,0.08)] py-20 lg:py-28"
    >
      {/* Ambient blob */}
      <div
        className="pointer-events-none absolute -right-40 top-1/4 -z-10 h-80 w-80 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(0,255,65,0.4) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <motion.div
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
            // click any entry to open the project viewer
          </p>
        </motion.div>

        {/* ── BENTO GRID (featured) ── */}
        <div className="mb-3 font-mono text-[11px] text-[#00ff41]/50">
          $ ls --featured --sort=date
        </div>
        {/* Bento: hero spans 2 rows tall on the left, two cards stack on right two columns */}
        <div
          className="mb-14 grid gap-3"
          style={{
            gridTemplateColumns: "repeat(1, 1fr)",
            gridTemplateRows:    "auto",
          }}
        >
          {/* Mobile/tablet: stack vertically */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
            {featured.map(p => (
              <div key={p.id} className="h-[220px]">
                <FeaturedCard project={p} layout="tall" onClick={() => open(p)} />
              </div>
            ))}
          </div>

          {/* Desktop: true bento — left hero, right 2-row stack */}
          <div className="hidden lg:grid lg:gap-3" style={{ gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "210px 210px" }}>
            {/* Hero: spans 2 rows on left 2 columns */}
            {featured[0] && (
              <div style={{ gridColumn: "1 / 3", gridRow: "1 / 3" }}>
                <FeaturedCard project={featured[0]} layout="hero" onClick={() => open(featured[0])} />
              </div>
            )}
            {/* Top-right card */}
            {featured[1] && (
              <div style={{ gridColumn: "3 / 4", gridRow: "1 / 2" }}>
                <FeaturedCard project={featured[1]} layout="tall" onClick={() => open(featured[1])} />
              </div>
            )}
            {/* Bottom-right card */}
            {featured[2] && (
              <div style={{ gridColumn: "3 / 4", gridRow: "2 / 3" }}>
                <FeaturedCard project={featured[2]} layout="tall" onClick={() => open(featured[2])} />
              </div>
            )}
          </div>
        </div>

        {/* ── DIRECTORY LISTING (non-featured) ── */}
        <div>
          <div className="mb-1 font-mono text-[11px] text-[#00ff41]/50">
            $ ls --all --sort=name
          </div>

          {/* Header row */}
          <div className="mb-1 hidden items-center gap-2 px-3 font-mono text-[10px] text-[#808080]/40 sm:flex">
            <span className="shrink-0">permissions</span>
            <span className="shrink-0 w-10">owner</span>
            <span className="shrink-0 w-8 text-right">size</span>
            <span className="shrink-0 w-12">date</span>
            <span className="ml-1">name</span>
          </div>

          {/* Divider */}
          <div className="mb-2 h-px" style={{ background: "rgba(0,255,65,0.08)" }} />

          <div className="space-y-0.5">
            {nonFeatured.map((p, i) => (
              <ListingRow key={p.id} project={p} index={i} onClick={() => open(p)} />
            ))}
          </div>

          {/* Footer */}
          <div className="mt-3 font-mono text-[11px] text-[#808080]/40">
            {nonFeatured.length} item{nonFeatured.length > 1 ? "s" : ""} — {nonFeatured.length * 2}.0K total allocated
          </div>
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
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

      {/* ── Side Drawer ── */}
      <AnimatePresence>
        {activeProject && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            />
            {/* Drawer */}
            <Drawer key="drawer" project={activeProject} onClose={close} />
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
