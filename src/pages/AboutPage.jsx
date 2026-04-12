import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ABOUT_TEXT, ABOUT_HIGHLIGHTS, SKILL_BARS,
  EXPERIENCES, CERTIFICATES, TECHNOLOGIES, TECH_CATEGORIES,
} from '../data';
import { useState, useEffect } from 'react';

/* ── animation helper ─────────────────────────── */
const up = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true         },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ── Company initial colored badge ───────────── */
const CompanyBadge = ({ company }) => {
  const colors = ['#00ff41','#00cc33','#00a828','#007a1e'];
  const idx    = company.charCodeAt(0) % colors.length;
  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-mono text-lg font-extrabold text-[#0a0a0a]"
      style={{ background: colors[idx], boxShadow: `0 0 16px ${colors[idx]}55` }}
    >
      {company[0].toUpperCase()}
    </div>
  );
};

/* ── Stat mini card ───────────────────────────── */
const StatCard = ({ value, label }) => (
  <div className="section-card flex flex-col items-center py-5 text-center">
    <span className="font-mono text-2xl font-extrabold text-[#00ff41]"
      style={{ textShadow: '0 0 12px rgba(0,255,65,0.5)' }}>
      {value}
    </span>
    <span className="mt-1 font-mono text-[11px] text-[#808080]">{label}</span>
  </div>
);

const AboutPage = () => {
  const [activeCat, setActiveCat] = useState('frontend');
  const [activeSection, setActiveSection] = useState('bio');

  const filteredTech = TECHNOLOGIES.filter(t => t.category === activeCat);

  const sections = [
    { id: 'bio',    label: 'BIO',    icon: '👤' },
    { id: 'skills', label: 'SKILLS', icon: '⚡' },
    { id: 'tech',   label: 'TECH',   icon: '🛠️' },
    { id: 'exp',    label: 'EXP',    icon: '📊' },
    { id: 'cert',   label: 'CERT',   icon: '📜' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4, rootMargin: '-10% 0px -40% 0px' }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      
      {/* ── System Index (Quick-Nav) ───────────────── */}
      <nav className="fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-6 xl:flex">
        <div className="h-20 w-px bg-white/5 mx-auto" />
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="group relative flex items-center justify-center"
            title={s.label}
          >
             <span className={`absolute left-10 rounded border border-[#00ff41]/20 bg-[#0a0a0a] px-2 py-0.5 font-mono text-[9px] text-[#00ff41] transition-opacity ${activeSection === s.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
               {s.label}
             </span>
             <div className={`flex h-8 w-8 items-center justify-center rounded-lg border bg-white/2 text-xs transition-all ${
               activeSection === s.id 
                ? 'border-[#00ff41] text-[#00ff41] shadow-[0_0_15px_rgba(0,255,65,0.4)]' 
                : 'border-white/5 text-[#808080] group-hover:border-[#00ff41]/40 group-hover:text-[#00ff41] group-hover:shadow-[0_0_10px_rgba(0,255,65,0.2)]'
             }`}>
               {s.icon}
             </div>
             {activeSection === s.id && (
               <motion.div 
                 layoutId="activeSideNav"
                 className="absolute -left-2 h-4 w-1 rounded-full bg-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.6)]"
               />
             )}
          </button>
        ))}
        <div className="h-20 w-px bg-white/5 mx-auto" />
      </nav>

      <div className="mx-auto max-w-5xl px-6 sm:px-10">

        {/* ── Breadcrumb ──────────────────────────── */}
        <motion.nav {...up(0)} className="mb-8 flex items-center gap-2 font-mono text-xs text-[#808080]">
          <Link to="/" className="hover:text-[#00ff41] transition-colors">Home</Link>
          <span className="text-[#00ff41]/40">›</span>
          <span className="text-[#e0e0e0]">About Me</span>
        </motion.nav>

        {/* ── Page header ─────────────────────────── */}
        <motion.div {...up(0.05)} className="mb-10">
          <div className="page-label mb-2">▶ about.md</div>
          <h1 className="page-title">
            About <span className="text-[#00ff41]">Me</span>
          </h1>
        </motion.div>

        {/* ── Bio statement card ──────────────────── */}
        <motion.div {...up(0.1)} id="bio" className="section-card mb-6 scroll-mt-28">
          <div className="page-label mb-3">// who_i_am.txt</div>
          <p className="font-mono text-sm leading-relaxed text-[#808080] lg:text-base whitespace-pre-line">
            {ABOUT_TEXT}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/projects" className="btn-terminal-solid rounded px-5 py-2 font-mono text-sm font-bold">
              View Projects →
            </Link>
          </div>
        </motion.div>

        {/* ── Stat cards ──────────────────────────── */}
        <motion.div {...up(0.15)} className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { value: '3+',  label: 'Years Experience'    },
            { value: '10+', label: 'Projects Shipped'    },
            { value: '5',   label: 'Companies & Clients' },
            { value: '99%', label: 'SaaS Uptime'         },
          ].map(s => <StatCard key={s.label} {...s} />)}
        </motion.div>

        {/* ── Highlights + Skill bars ─────────────── */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div {...up(0.2)} className="section-card">
            <div className="page-label mb-2">// highlights[]</div>
            <h2 className="mb-4 font-mono text-lg font-bold text-[#e0e0e0]">Key Highlights</h2>
            <ul className="space-y-2.5">
              {ABOUT_HIGHLIGHTS.map((h, i) => (
                <li key={i} className="flex items-start gap-2 font-mono text-sm text-[#808080]">
                  <span className="mt-0.5 shrink-0 text-[#00ff41]">▸</span>{h}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...up(0.25)} id="skills" className="section-card scroll-mt-28">
            <div className="page-label mb-2">// proficiency_map</div>
            <h2 className="mb-5 font-mono text-lg font-bold text-[#e0e0e0]">Skills & Proficiency</h2>
            <div className="space-y-4">
              {SKILL_BARS.map((s, i) => (
                <div key={s.name}>
                  <div className="mb-1.5 flex justify-between font-mono text-xs">
                    <span className="text-[#e0e0e0]">{s.name}</span>
                    <span className="text-[#00ff41]">{s.level}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full"
                    style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: 'easeOut' }}
                      className="relative h-full rounded-full"
                      style={{ background: 'linear-gradient(to right,#00cc33,#00ff41)', boxShadow: '0 0 8px rgba(0,255,65,0.6)' }}
                    >
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse-glow" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Divider ─────────────────────────────── */}
        <div className="section-divider mb-12" />

        {/* ── Tech Stack ──────────────────────────── */}
        <motion.div {...up(0.1)} id="tech" className="mb-12 scroll-mt-28">
          <div className="page-label mb-2">▶ ls stack/</div>
          <h2 className="page-title mb-6">
            Tech <span className="text-[#00ff41]">Stack</span>
          </h2>

          {/* Category pills */}
          <div className="mb-6 flex flex-wrap gap-2">
            {TECH_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                aria-label={`Toggle ${cat.label} tech`}
                className={`rounded-full px-4 py-1.5 font-mono text-sm transition-all ${
                  activeCat === cat.id
                    ? 'border border-[#00ff41] bg-[rgba(0,255,65,0.1)] text-[#00ff41]'
                    : 'border border-[rgba(0,255,65,0.15)] text-[#808080] hover:border-[rgba(0,255,65,0.35)] hover:text-[#e0e0e0]'
                }`}
              >
                {activeCat === cat.id && <span className="mr-1">▶</span>}{cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {filteredTech.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="section-card flex flex-col items-center gap-2 py-4 text-center"
              >
                <span className="font-mono text-sm font-bold text-[#e0e0e0]">{t.name}</span>
                <span className="font-mono text-[10px] text-[#808080]">{t.description}</span>
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full"
                  style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="h-full rounded-full"
                    style={{ width: `${t.proficiency}%`, background: 'linear-gradient(to right,#00cc33,#00ff41)' }} />
                </div>
                <span className="font-mono text-[10px] text-[#00ff41]">{t.proficiency}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Divider ─────────────────────────────── */}
        <div className="section-divider mb-12" />

        {/* ── Experience ──────────────────────────── */}
        <motion.div {...up(0.1)} id="exp" className="mb-12 scroll-mt-28">
          <div className="page-label mb-2">▶ git log --experience</div>
          <h2 className="page-title mb-8">
            Experience <span className="text-[#00ff41]">Timeline</span>
          </h2>

          <div className="space-y-4">
            {EXPERIENCES.map((exp, i) => (
              <motion.div key={i} {...up(0.1 + i * 0.07)} className="section-card">
                <div className="flex items-start gap-4">
                  {exp.logo ? (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 shadow-[0_0_16px_rgba(255,255,255,0.1)]">
                      <img src={exp.logo} alt={`${exp.company} logo`} className="h-full w-full object-contain" />
                    </div>
                  ) : (
                    <CompanyBadge company={exp.company} />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[11px] text-[#00ff41]/60">{exp.year}</span>
                      <span className="font-mono text-[11px] text-[#808080]">📍 {exp.location}</span>
                    </div>
                    <h3 className="font-mono text-base font-bold text-[#e0e0e0]">{exp.role}</h3>
                    <p className="font-mono text-sm text-[#00ff41]">{exp.company}</p>
                    <p className="mt-2 font-mono text-sm leading-relaxed text-[#808080]">{exp.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {exp.technologies.map(t => (
                        <span key={t} className="tech-badge">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Divider ─────────────────────────────── */}
        <div className="section-divider mb-12" />

        {/* ── Certificates (merged) ───────────────── */}
        <motion.div {...up(0.1)} id="cert" className="scroll-mt-28">
          <div className="page-label mb-2">▶ ls certificates/</div>
          <h2 className="page-title mb-8">
            Certificates
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {CERTIFICATES.map((c, i) => (
              <motion.div key={c.id} {...up(0.1 + i * 0.08)} className="section-card flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  {c.image && (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2 shadow-[0_0_16px_rgba(255,255,255,0.1)]">
                      <img src={c.image} alt={`${c.issuer} logo`} className="h-full w-full object-contain" />
                    </div>
                  )}
                  <span className="rounded border border-[rgba(0,255,65,0.2)] bg-[rgba(0,255,65,0.05)] px-2 py-0.5 font-mono text-[10px] text-[#00ff41]">
                    {c.date}
                  </span>
                </div>
                <div>
                  <div className="font-mono text-[11px] text-[#808080]">{c.issuer}</div>
                  <h3 className="mt-0.5 font-mono text-sm font-bold text-[#e0e0e0] leading-tight">{c.title}</h3>
                </div>
                <p className="font-mono text-[11px] leading-relaxed text-[#808080]">{c.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AboutPage;
