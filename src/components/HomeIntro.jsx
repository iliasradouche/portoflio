import { useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiChevronLeft, HiChevronRight, HiExternalLink } from 'react-icons/hi';
import { PROJECTS, EXPERIENCES } from '../data';

/* ─── animation helper ─────────────────────── */
const up = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true        },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ─── Tag pill ────────────────────────────── */
const Tag = ({ label }) => (
  <span className="rounded-full border border-[rgba(0,255,65,0.25)] bg-[rgba(0,255,65,0.06)] px-3 py-1 font-mono text-[11px] text-[#00ff41]/80 transition-colors hover:border-[rgba(0,255,65,0.5)] hover:text-[#00ff41]">
    {label}
  </span>
);

/* ─── Spec cell (inside top card) ────────── */
const SpecCell = ({ icon, label, title, desc }) => (
  <div className="flex flex-col gap-1.5 p-5">
    <div className="flex items-center gap-2">
      <span className="text-base">{icon}</span>
      <span className="font-mono text-[9px] uppercase tracking-widest text-[#00ff41]/50">{label}</span>
    </div>
    <div className="font-mono text-sm font-bold text-[#e0e0e0]">{title}</div>
    <p className="font-mono text-[11px] leading-relaxed text-[#808080]">{desc}</p>
  </div>
);

/* ─── Company badge ───────────────────────── */
const BADGE_COLORS = [
  { bg: '#00ff41', text: '#0a0a0a' },
  { bg: '#00cc33', text: '#0a0a0a' },
  { bg: '#1a1a2e', text: '#00ff41', border: '1px solid rgba(0,255,65,0.4)' },
  { bg: '#0d0d0d',  text: '#00ff41', border: '1px solid rgba(0,255,65,0.4)' },
  { bg: '#00a828', text: '#0a0a0a' },
];

const CompanySlide = ({ exp, i }) => {
  const { bg, text, border } = BADGE_COLORS[i % BADGE_COLORS.length];
  return (
    <div
      className="flex w-52 shrink-0 flex-col gap-3 rounded-xl p-4 transition-all hover:scale-[1.02]"
      style={{ border: border ?? '1px solid rgba(0,255,65,0.1)', background: 'rgba(17,17,17,0.9)' }}
    >
      {/* Logo badge / Image */}
      {exp.logo ? (
        <div 
          className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white p-1"
          style={{ boxShadow: `0 0 14px rgba(255,255,255,0.15)` }}
        >
          <img src={exp.logo} alt={exp.company} className="h-full w-full object-contain" />
        </div>
      ) : (
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl font-mono text-lg font-extrabold"
          style={{ background: bg, color: text, boxShadow: `0 0 14px ${bg}66` }}
        >
          {exp.company[0]}
        </div>
      )}
      <div>
        <div className="font-mono text-[10px] text-[#00ff41]/50">{exp.year}</div>
        <div className="font-mono text-sm font-bold leading-snug text-[#e0e0e0]">{exp.company}</div>
        <div className="mt-0.5 font-mono text-[11px] leading-snug text-[#808080]">{exp.role}</div>
      </div>
    </div>
  );
};

/* ─── Featured project card ───────────────── */
const FeaturedCard = ({ project }) => (
  <motion.article
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -4 }}
    className="group flex flex-col overflow-hidden rounded-xl"
    style={{ border: '1px solid rgba(0,255,65,0.1)', background: 'rgba(17,17,17,0.85)' }}
  >
    {/* Project image */}
    <div className="relative h-48 w-full overflow-hidden bg-[#111]">
      <img
        src={project.image}
        alt={project.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent" />
    </div>

    {/* Card body */}
    <div className="flex flex-1 flex-col gap-3 p-5">
      <h3 className="font-mono text-base font-bold text-[#e0e0e0] transition-colors group-hover:text-[#00ff41]">
        {project.title}
      </h3>
      <p className="line-clamp-2 flex-1 font-mono text-xs leading-relaxed text-[#808080]">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 3).map(t => (
          <span key={t} className="tech-badge">{t}</span>
        ))}
      </div>

      {/* "View project →" link — like Kawe.ski */}
      <Link
        to="/projects"
        className="mt-1 flex items-center gap-1.5 font-mono text-xs text-[#00ff41] transition-opacity group-hover:opacity-100 opacity-60"
      >
        View project <HiArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  </motion.article>
);

/* ══════════════════════════════════════════════
   HomeIntro — mirrors Kawe.ski actual home page
   1. Intro card (tags + 4 spec cells inside)
   2. Experience trajectory (horizontal scroll)
   3. Featured projects (3-col + View All CTA)
══════════════════════════════════════════════ */
const HomeIntro = () => {
  const sliderRef = useRef(null);
  const featured  = PROJECTS.filter(p => p.featured);

  const scroll = (dir) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: dir * 220, behavior: 'smooth' });
  };

  return (
    <div className="border-t border-[rgba(0,255,65,0.08)] py-16">
      <div className="mx-auto max-w-5xl space-y-8 px-6 sm:px-10">

        {/* ══ SECTION 1 — Intro card ══════════════════ */}
        <motion.div {...up(0)}>
          <div className="page-label mb-3">▲ about.me</div>
        </motion.div>

        <motion.div {...up(0.05)} className="section-card !p-0 overflow-hidden">

          {/* Headline + description */}
          <div className="p-8">
            <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-[#00ff41]/40">
              Full-stack developer · MERN · Backend craft
            </p>
            <h2 className="mb-4 font-mono text-2xl font-extrabold leading-snug text-[#e0e0e0] lg:text-3xl">
              I design systems, organise products, and transform
              interfaces into{' '}
              <span className="text-[#00ff41]">more consistent experiences.</span>
            </h2>
            <p className="mb-6 max-w-2xl font-mono text-sm leading-relaxed text-[#808080]">
              Full-stack developer specialising in React, Next.js, and Node.js — building scalable
              APIs, real-time systems, and user-centred interfaces. Based in Rabat, Morocco.
              Currently open to remote work globally.
            </p>

            {/* Tag pills — like Kawe.ski buttons row */}
            <div className="flex flex-wrap gap-2">
              {['Full Stack', 'Node.js APIs', 'React & Next.js', 'Real-time Systems', 'CI/CD & Deploy'].map(t => (
                <Tag key={t} label={t} />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[rgba(0,255,65,0.08)]" />

          {/* 4 spec cells inside the same card — like Kawe.ski */}
          <div className="grid grid-cols-2 divide-x divide-y divide-[rgba(0,255,65,0.08)] lg:grid-cols-4 lg:divide-y-0">
            <SpecCell icon="⚙️" label="Experience"    title="3+ Years"       desc="Full-stack across web & mobile in agile teams." />
            <SpecCell icon="⚛️" label="Frontend"      title="React"          desc="Deep expertise in React, Next.js & modern UI." />
            <SpecCell icon="🏗️" label="Main Stack"    title="MERN"           desc="MongoDB, Express, React, Node.js & PostgreSQL." />
            <SpecCell icon="🌍"  label="Work Mode"     title="Remote"         desc="Available globally — based in Rabat, Morocco 🇲🇦." />
          </div>
        </motion.div>

        {/* ══ SECTION 2 — Experience trajectory ══════ */}
        <motion.div {...up(0.1)}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="page-label mb-1">▶ trajetória</div>
              <h2 className="font-mono text-xl font-extrabold text-[#e0e0e0]">
                Companies that shaped my career
              </h2>
            </div>
            {/* Scroll arrows — like Kawe.ski */}
            <div className="flex gap-2">
              <button
                onClick={() => scroll(-1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(0,255,65,0.2)] text-[#808080] transition-colors hover:border-[#00ff41] hover:text-[#00ff41]"
                aria-label="Scroll left"
              >
                <HiChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scroll(1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(0,255,65,0.2)] text-[#808080] transition-colors hover:border-[#00ff41] hover:text-[#00ff41]"
                aria-label="Scroll right"
              >
                <HiChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Horizontal scroll container */}
          <div
            ref={sliderRef}
            className="flex gap-3 overflow-x-auto pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {EXPERIENCES.map((exp, i) => (
              <CompanySlide key={exp.company} exp={exp} i={i} />
            ))}
          </div>
        </motion.div>

        {/* ══ SECTION 3 — Featured projects ══════════ */}
        <motion.div {...up(0.15)}>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="page-label mb-1">▶ projetos em destaque</div>
              <h2 className="font-mono text-xl font-extrabold text-[#e0e0e0]">
                Case studies &amp; product explorations
              </h2>
            </div>
            <Link
              to="/projects"
              className="flex items-center gap-1.5 rounded-full border border-[rgba(0,255,65,0.25)] px-4 py-1.5 font-mono text-xs text-[#00ff41] transition-colors hover:border-[#00ff41] hover:bg-[rgba(0,255,65,0.06)]"
            >
              View All <HiArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map(p => <FeaturedCard key={p.id} project={p} />)}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default HomeIntro;
