import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiX, HiExternalLink, HiCode, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { PROJECTS, PROJECT_CATEGORIES } from '../data';

/* ── image with fallback ───────────────────────── */
const ProjectImage = ({ src, alt }) => (
  <div className="relative h-52 w-full overflow-hidden rounded-t-xl bg-[#111]">
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
  </div>
);

/* ── Project card ──────────────────────────────── */
const ProjectCard = ({ project, onClick }) => (
  <motion.article
    onClick={onClick}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45 }}
    whileHover={{ y: -4 }}
    className="group section-card cursor-pointer !p-0 overflow-hidden"
    style={{ padding: 0 }}
  >
    <ProjectImage src={project.image} alt={project.title} />

    <div className="p-5">
      {/* Badges */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {project.featured && (
          <span className="rounded border border-[#00ff41]/30 bg-[#00ff41]/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[#00ff41]">
            Featured
          </span>
        )}
        <span className="rounded border border-[rgba(255,255,255,0.08)] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[#808080]">
          {project.category}
        </span>
      </div>

      <h3 className="mb-2 font-mono text-base font-bold text-[#e0e0e0] group-hover:text-[#00ff41] transition-colors">
        {project.title}
      </h3>
      <p className="mb-4 line-clamp-2 font-mono text-xs leading-relaxed text-[#808080]">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.technologies.slice(0, 3).map(t => (
          <span key={t} className="tech-badge">{t}</span>
        ))}
        {project.technologies.length > 3 && (
          <span className="tech-badge text-[#808080]">+{project.technologies.length - 3}</span>
        )}
      </div>

      <div className="flex items-center gap-1.5 font-mono text-xs text-[#00ff41] opacity-0 group-hover:opacity-100 transition-opacity">
        <HiArrowRight className="h-3.5 w-3.5" />
        View project
      </div>
    </div>
  </motion.article>
);

/* ── Side drawer ───────────────────────────────── */
const ProjectDrawer = ({ project, onClose }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const imgs = project?.images ?? (project?.image ? [project.image] : []);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="drawer-backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      />
      <motion.aside
        key="drawer"
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 280 }}
        className="fixed right-0 top-0 z-[51] flex h-full w-full max-w-md flex-col overflow-y-auto"
        style={{ background: '#0d0d0d', borderLeft: '1px solid rgba(0,255,65,0.15)' }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-[rgba(0,255,65,0.1)] px-6 py-4"
          style={{ background: 'rgba(0,255,65,0.03)' }}>
          <div className="font-mono text-[10px] text-[#00ff41]/50">▶ cat project.md</div>
          <button onClick={onClose} aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded border border-[rgba(0,255,65,0.2)] text-[#808080] hover:border-[#00ff41] hover:text-[#00ff41] transition-colors">
            <HiX className="h-4 w-4" />
          </button>
        </div>

        {/* Image carousel */}
        {imgs.length > 0 && (
          <div className="relative h-52 w-full shrink-0 overflow-hidden bg-[#111]">
            <img src={imgs[imgIdx]} alt={project.title}
              className="h-full w-full object-cover" />
            {imgs.length > 1 && (
              <>
                <button onClick={() => setImgIdx(p => (p - 1 + imgs.length) % imgs.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded border border-[rgba(0,255,65,0.3)] bg-black/60 p-1 text-[#00ff41]">
                  <HiChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={() => setImgIdx(p => (p + 1) % imgs.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-[rgba(0,255,65,0.3)] bg-black/60 p-1 text-[#00ff41]">
                  <HiChevronRight className="h-4 w-4" />
                </button>
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                  {imgs.map((_, i) => (
                    <button key={i} onClick={() => setImgIdx(i)}
                      className={`h-1.5 rounded-full transition-all ${i === imgIdx ? 'w-4 bg-[#00ff41]' : 'w-1.5 bg-white/30'}`} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Drawer body */}
        <div className="flex flex-1 flex-col gap-4 p-6">
          <div>
            <div className="mb-1 flex flex-wrap gap-2">
              {project.featured && (
                <span className="rounded border border-[#00ff41]/30 bg-[#00ff41]/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[#00ff41]">Featured</span>
              )}
              <span className="rounded border border-[rgba(255,255,255,0.08)] px-2 py-0.5 font-mono text-[9px] uppercase text-[#808080]">{project.category}</span>
            </div>
            <h2 className="font-mono text-xl font-extrabold text-[#e0e0e0]">{project.title}</h2>
          </div>

          <p className="font-mono text-sm leading-relaxed text-[#808080]">{project.description}</p>

          <div>
            <div className="page-label mb-2">dependencies[]</div>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map(t => <span key={t} className="tech-badge">{t}</span>)}
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-4">
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                className="btn-terminal-solid flex items-center justify-center gap-2 rounded py-3 font-mono text-sm font-bold">
                <HiExternalLink className="h-4 w-4" /> Live Demo
              </a>
            )}
            {project.codeLink && (
              <a href={project.codeLink} target="_blank" rel="noopener noreferrer"
                className="btn-terminal flex items-center justify-center gap-2 rounded py-3">
                <HiCode className="h-4 w-4" /> View Source
              </a>
            )}
            {!project.liveLink && !project.codeLink && (
              <div className="flex items-center gap-2 rounded border border-[rgba(255,255,255,0.06)] px-4 py-3 font-mono text-xs text-[#808080]">
                🔒 &nbsp;Private repository — available on request
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
};

/* ══════════════════════════════════════════════
   Projects Page
══════════════════════════════════════════════ */
const ProjectsPage = () => {
  const [activeCat, setActiveCat] = useState('all');
  const [activeProject, setActiveProject] = useState(null);

  const filtered = activeCat === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCat);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">

        {/* ── Breadcrumb ──────────────────────────── */}
        <motion.nav
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-2 font-mono text-xs text-[#808080]"
        >
          <Link to="/" className="hover:text-[#00ff41] transition-colors">Home</Link>
          <span className="text-[#00ff41]/40">›</span>
          <span className="text-[#e0e0e0]">Projects</span>
        </motion.nav>

        {/* ── Page header ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-10"
        >
          <div className="page-label mb-2">▶ ls projects/</div>
          <h1 className="page-title">
            Project <span className="text-[#00ff41]">Collection</span>
          </h1>
          <p className="mt-3 font-mono text-sm text-[#808080]">
            // {PROJECTS.length} projects — case studies &amp; explorations
          </p>
        </motion.div>

        {/* ── Category filter pills ───────────────── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          {PROJECT_CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)}
              className={`rounded-full px-4 py-1.5 font-mono text-sm transition-all ${
                activeCat === cat.id
                  ? 'border border-[#00ff41] bg-[rgba(0,255,65,0.1)] text-[#00ff41]'
                  : 'border border-[rgba(0,255,65,0.15)] text-[#808080] hover:border-[rgba(0,255,65,0.4)] hover:text-[#e0e0e0]'
              }`}>
              {cat.name}
              <span className="ml-1.5 text-[#808080]">
                ({cat.id === 'all' ? PROJECTS.length : PROJECTS.filter(p => p.category === cat.id).length})
              </span>
            </button>
          ))}
        </motion.div>

        {/* ── 3-col Project grid ──────────────────── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map(p => (
              <ProjectCard
                key={p.id}
                project={p}
                onClick={() => setActiveProject(p)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* ── Empty state ─────────────────────────── */}
        {filtered.length === 0 && (
          <div className="mt-20 text-center font-mono text-sm text-[#808080]">
            <span className="text-[#00ff41]/40">$ </span>
            No projects found in this category.
          </div>
        )}

        {/* ── GitHub CTA ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 text-center"
        >
          <a href="https://github.com/iliasradouche" target="_blank" rel="noopener noreferrer"
            className="btn-terminal-solid inline-flex items-center gap-2 rounded-full px-8 py-3 font-mono text-sm font-bold">
            <span>▶</span> View All on GitHub →
          </a>
        </motion.div>

      </div>

      {/* Drawer */}
      {activeProject && (
        <ProjectDrawer project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </div>
  );
};

export default ProjectsPage;
