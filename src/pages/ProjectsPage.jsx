import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiX, HiExternalLink, HiCode, HiChevronLeft, HiChevronRight, HiClipboardCopy, HiCheck } from 'react-icons/hi';
import { PROJECTS, PROJECT_CATEGORIES } from '../data';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

/* ── helper: Copy to Clipboard ────────────────── */
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

/* ── image with fallback ───────────────────────── */
const ProjectImage = ({ src, alt, isBento }) => (
  <div className={`relative w-full overflow-hidden bg-[#111] ${isBento ? 'h-full' : 'h-52'}`}>
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
    
    {/* Scanline effect on hover */}
    <div className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
      style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 255, 65, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }} />
  </div>
);

/* ── Project card (Bento Ready) ────────────────── */
const ProjectCard = ({ project, onClick, index }) => {
  const isLarge = project.featured && index % 3 === 0;

  return (
    <motion.article
      layout
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className={`group relative section-card cursor-pointer !p-0 overflow-hidden flex flex-col h-full
        ${isLarge ? 'lg:col-span-2 lg:row-span-1' : 'col-span-1'}
      `}
    >
      <div className={`relative flex flex-col h-full ${isLarge ? 'lg:flex-row' : 'flex-col'}`}>
        <div className={`${isLarge ? 'lg:w-3/5' : 'w-full'}`}>
          <ProjectImage src={project.image} alt={project.title} isBento={isLarge} />
        </div>

        <div className={`flex flex-col p-6 ${isLarge ? 'lg:w-2/5' : 'w-full'}`}>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {project.featured && (
              <span className="rounded-full bg-[#00ff41]/10 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-[#00ff41] border border-[#00ff41]/20">
                Featured
              </span>
            )}
            <span className="rounded-full border border-[rgba(255,255,255,0.08)] bg-white/5 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[#808080]">
              {project.category}
            </span>
          </div>

          <h3 className="mb-2 font-mono text-lg font-bold text-[#e0e0e0] group-hover:text-[#00ff41] transition-colors">
            {project.title}
          </h3>
          <p className="mb-4 line-clamp-2 font-mono text-xs leading-relaxed text-[#808080]">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-auto">
            {project.technologies.slice(0, 4).map(t => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 font-mono text-xs font-bold text-[#00ff41] group-hover:translate-x-1 transition-transform">
            VIEW DETAILS <span>→</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

/* ── Side drawer (Immersive Case Study) ───────── */
const ProjectDrawer = ({ project, onClose }) => {
  const [copied, setCopied] = useState(false);
  const imgs = project?.images ?? (project?.image ? [project.image] : []);

  useEffect(() => {
    if (copied) {
      const t = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(t);
    }
  }, [copied]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="drawer-backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
      />
      <motion.aside
        key="drawer"
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 32, stiffness: 300 }}
        className="fixed right-0 top-0 z-[51] flex h-screen w-full max-w-2xl flex-col bg-[#0a0a0a] shadow-[-10px_0_30px_rgba(0,0,0,0.5)] border-l border-[#00ff41]/10"
      >
        {/* Drawer Header (Fixed) */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#00ff41]/10 bg-[#0a0a0a]/90 px-8 py-5 backdrop-blur-md">
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-[#00ff41]">#</span>
            <span className="text-[#808080]">projects</span>
            <span className="text-[#00ff41]/40">/</span>
            <span className="text-[#e0e0e0] font-bold">{project.id.toString().padStart(2, '0')}</span>
          </div>
          <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-[#808080] hover:bg-[#00ff41]/10 hover:text-[#00ff41] transition-all">
            <HiX className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Hero Slider */}
          <div className="relative h-[24rem] w-full bg-[#111]">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectFade]}
              effect="fade"
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000 }}
              loop={imgs.length > 1}
              className="h-full w-full"
            >
              {imgs.map((img, i) => (
                <SwiperSlide key={i}>
                  <img src={img} alt={`${project.title} view ${i}`} className="h-full w-full object-cover" />
                </SwiperSlide>
              ))}
            </Swiper>
            {imgs.length > 1 && (
              <>
                <button className="swiper-button-prev-custom absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-3 text-[#00ff41] backdrop-blur-sm hover:bg-[#00ff41] hover:text-black transition-all">
                  <HiChevronLeft className="h-5 w-5" />
                </button>
                <button className="swiper-button-next-custom absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-3 text-[#00ff41] backdrop-blur-sm hover:bg-[#00ff41] hover:text-black transition-all">
                  <HiChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          <div className="p-8 lg:p-12">
            {/* Meta context */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-6 border-b border-white/5 pb-8">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#808080]">Project Name</div>
                <h2 className="mt-1 font-mono text-3xl font-extrabold text-[#e0e0e0]">{project.title}</h2>
              </div>
              <div className="flex gap-8">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#808080]">Delivery</div>
                  <div className="mt-1 font-mono text-sm font-bold text-[#00ff41]">{project.year || '2024'}</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#808080]">Status</div>
                  <div className="mt-1 flex items-center gap-1.5 font-mono text-sm font-bold text-[#e0e0e0]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00ff41] shadow-[0_0_8px_#00ff41]" />
                    Completed
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study Sections */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div className="space-y-10">
                <section>
                  <div className="page-label mb-4">01. THE CHALLENGE</div>
                  <p className="font-mono text-sm leading-relaxed text-[#808080]">
                    {project.challenge || project.description}
                  </p>
                </section>
                
                <section>
                  <div className="page-label mb-4">02. THE SOLUTION</div>
                  <p className="font-mono text-sm leading-relaxed text-[#808080]">
                    {project.solution || "Architected a scalable solution focusing on performance, user security, and intuitive interface design."}
                  </p>
                </section>
              </div>

              <div className="space-y-10">
                <section className="rounded-xl border border-white/5 bg-white/2 p-6">
                  <div className="page-label mb-4">▶ system_stats</div>
                  <div className="grid grid-cols-1 gap-4">
                    {(project.stats || ["Responsive Design", "API Integrated", "Optimized"]).map(stat => (
                      <div key={stat} className="flex items-center gap-3 font-mono text-xs text-[#e0e0e0]">
                        <span className="text-[#00ff41]">OK</span>
                        {stat}
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="page-label mb-4">TECH STACK</div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(t => (
                      <span key={t} className="tech-badge !text-[11px] !py-1.5 !px-3">{t}</span>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-16 flex flex-wrap gap-4 pt-10 border-t border-white/5">
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                  className="btn-terminal-solid flex flex-1 items-center justify-center gap-2 rounded-lg py-4 font-mono text-sm font-bold shadow-[0_4px_20px_rgba(0,255,65,0.15)]">
                  <HiExternalLink className="h-5 w-5" /> RUN LIVE DEMO
                </a>
              )}
              {project.codeLink && (
                <a href={project.codeLink} target="_blank" rel="noopener noreferrer"
                  className="btn-terminal flex flex-1 items-center justify-center gap-2 rounded-lg py-4 font-mono text-sm">
                  <HiCode className="h-5 w-5" /> VIEW ON GITHUB
                </a>
              )}
              <button 
                onClick={() => {
                  copyToClipboard(window.location.href);
                  setCopied(true);
                }}
                className="flex items-center justify-center gap-2 rounded-lg border border-white/5 bg-white/2 px-6 py-4 text-[#808080] hover:text-[#e0e0e0] transition-colors"
              >
                {copied ? <HiCheck className="h-5 w-5 text-[#00ff41]" /> : <HiClipboardCopy className="h-5 w-5" />}
              </button>
            </div>
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
  const [search, setSearch] = useState('');

  const filtered = PROJECTS.filter(p => {
    const matchCat = activeCat === 'all' || p.category === activeCat;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                       p.technologies.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 selection:bg-[#00ff41]/30">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">

        {/* ── Header Area ────────────────────────── */}
        <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-2 items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.nav className="mb-8 flex items-center gap-2 font-mono text-xs text-[#808080]">
              <Link to="/" className="hover:text-[#00ff41] transition-colors">~</Link>
              <span className="text-[#00ff41]/40">/</span>
              <span className="text-[#e0e0e0]">projects</span>
            </motion.nav>
            <div className="page-label mb-2">▶ ls --featured</div>
            <h1 className="page-title !mb-0">
              Work <span className="text-[#00ff41]">Archive</span>
            </h1>
            <p className="mt-4 max-w-md font-mono text-sm text-[#808080]">
              A curated collection of full-stack applications, interactive UI systems, and backend experiments.
            </p>
          </motion.div>

          {/* Search & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs text-[#00ff41]">$ find . -name</div>
              <input 
                type="text"
                placeholder="..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/3 py-4 pl-32 pr-6 font-mono text-sm text-[#e0e0e0] outline-none border-[#00ff41]/20 transition-all focus:border-[#00ff41]"
              />
            </div>
            <div className="flex justify-between font-mono text-[10px] text-[#808080] px-2 text-right">
              <span>TOTAL_OBJECTS: {PROJECTS.length}</span>
              <span>FILTERED: {filtered.length}</span>
            </div>
          </motion.div>
        </div>

        {/* ── Category filter pills ───────────────── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-10 flex flex-wrap gap-2"
        >
          {PROJECT_CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)}
              className={`rounded-full px-5 py-2 font-mono text-xs font-bold transition-all ${
                activeCat === cat.id
                  ? 'bg-[#00ff41] text-black shadow-[0_0_20px_rgba(0,255,65,0.4)]'
                  : 'border border-white/5 bg-white/2 text-[#808080] hover:border-[#00ff41]/30 hover:text-[#e0e0e0]'
              }`}>
              {cat.name.toUpperCase()}
            </button>
          ))}
        </motion.div>

        {/* ── Dynamic Bento Grid ──────────────────── */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={i}
                onClick={() => setActiveProject(p)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* ── Empty state ─────────────────────────── */}
        {filtered.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mt-32 text-center"
          >
            <div className="mb-4 font-mono text-4xl text-[#00ff41]/20">0_0</div>
            <p className="font-mono text-sm text-[#808080]">
              <span className="text-[#00ff41]">ERR:</span> No matching records found for "{search}"
            </p>
          </motion.div>
        )}

        {/* ── GitHub CTA ──────────────────────────── */}
        {!search && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20 text-center"
          >
            <a href="https://github.com/iliasradouche" target="_blank" rel="noopener noreferrer"
              className="btn-terminal-solid inline-flex items-center gap-3 rounded-full px-10 py-4 font-mono text-sm font-extrabold group">
              <span>▶</span> VIEW FULL GITHUB ACTIVITY 
              <HiArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        )}

      </div>

      {/* Drawer */}
      {activeProject && (
        <ProjectDrawer project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </div>
  );
};

export default ProjectsPage;
