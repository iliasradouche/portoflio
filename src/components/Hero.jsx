import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { useTypewriter } from "react-simple-typewriter";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { HiOutlineDownload, HiArrowRight } from "react-icons/hi";
import { TYPEWRITER_WORDS, SOCIAL_LINKS } from "../data";

/* ─── social icon map ─────────────────────────── */
const SOCIAL_ICONS = {
  LinkedIn:  <FaLinkedin />,
  GitHub:    <FaGithub />,
  Twitter:   <FaSquareXTwitter />,
  Instagram: <FaInstagram />,
};

/* ─── specializations bottom-left ────────────── */
const SPECS = [
  "Full Stack Developer",
  "Backend Engineer",
  "MERN Specialist",
  "UI / UX Enthusiast",
];

/* ─── stagger helper ─────────────────────────── */
const up = (delay = 0) => ({
  initial:   { opacity: 0, y: 20 },
  animate:   { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } },
});

/* ──────────────────────────────────────────────
   Hero
────────────────────────────────────────────── */
const Hero = () => {
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();

  const [typeEffect] = useTypewriter({
    words:       TYPEWRITER_WORDS,
    loop:        {},
    typeSpeed:   70,
    deleteSpeed: 45,
    delaySpeed:  1400,
  });

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 150);
    return () => clearTimeout(t);
  }, []);

  const dl = () => {
    const a    = document.createElement("a");
    a.href     = "/my_resume.pdf";
    a.download = "ILIAS_RADOUCHE_CV.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden border-b border-[rgba(0,255,65,0.08)]">

      {/* ── ambient blobs ────────────────────── */}
      <div className="pointer-events-none absolute -left-64 top-0 h-[600px] w-[600px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #00ff41 0%, transparent 70%)" }}
      />
      <div className="pointer-events-none absolute -right-64 bottom-0 h-[500px] w-[500px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #00ff41 0%, transparent 70%)" }}
      />

      {/* ── top status bar ───────────────────── */}
      <motion.div
        {...up(0)}
        className="relative z-10 flex items-center justify-between border-b border-[rgba(0,255,65,0.08)] px-6 py-4 pt-24 sm:px-10"
      >
        <div className="flex items-center gap-2 font-mono text-xs text-[#808080]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#00ff41] shadow-[0_0_6px_#00ff41]" />
          system online
        </div>

        <div
          className="flex items-center gap-2 rounded border px-3 py-1 font-mono text-xs text-[#00ff41]"
          style={{ borderColor: "rgba(0,255,65,0.2)", background: "rgba(0,255,65,0.04)" }}
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00ff41]" />
          Available for work
        </div>
      </motion.div>

      {/* ── MASSIVE name ─────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 py-6 sm:px-8">

        {/* ▶ whoami prompt */}
        <motion.div {...up(0.1)} className="mb-4 px-2 font-mono text-sm text-[#00ff41]/40 sm:px-4">
          ▶ whoami
        </motion.div>

        {/* First name */}
        <motion.div
          {...up(0.15)}
          className="overflow-hidden leading-none"
        >
          <h1
            className="font-mono font-black tracking-tighter text-[#c8c8c8]"
            style={{
              fontSize:   "clamp(5rem, 18vw, 16rem)",
              lineHeight: 0.9,
            }}
          >
            Ilias
          </h1>
        </motion.div>

        {/* Last name — full green glow */}
        <motion.div
          {...up(0.22)}
          className="overflow-hidden leading-none"
        >
          <h1
            className="font-mono font-black tracking-tighter text-[#00ff41]"
            style={{
              fontSize:   "clamp(5rem, 18vw, 16rem)",
              lineHeight: 0.9,
              textShadow: "0 0 60px rgba(0,255,65,0.35), 0 0 120px rgba(0,255,65,0.15)",
            }}
          >
            Radouche
          </h1>
        </motion.div>

        {/* ── Middle row: typewriter left · CTA right ── */}
        <motion.div
          {...up(0.35)}
          className="mt-8 flex flex-wrap items-end justify-between gap-6 px-2 sm:px-4"
        >
          {/* Role typewriter */}
          <div>
            <div className="mb-1 font-mono text-xs text-[#808080]">// currently</div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base text-[#00ff41]/50 sm:text-lg">$</span>
              <span className="font-mono text-base text-[#e0e0e0] sm:text-lg">{typeEffect}</span>
              <span className="cursor-blink" aria-hidden="true" />
            </div>
          </div>

          {/* CTA cluster */}
          <div className="flex flex-col items-end gap-3">
            <p className="font-mono text-sm text-[#808080]">
              Got a project in mind?
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={dl}
                className="btn-terminal-solid flex items-center gap-2 rounded px-5 py-2.5 font-mono text-sm font-bold"
              >
                <HiOutlineDownload className="h-4 w-4" />
                Download CV
              </button>
              <Link
                to="/about"
                className="btn-terminal flex items-center gap-2 rounded px-5 py-2.5"
              >
                Let's Work Together
                <HiArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── BOTTOM BAR ───────────────────────── */}
      <motion.div
        {...up(0.5)}
        className="relative z-10 border-t border-[rgba(0,255,65,0.08)] px-6 py-6 sm:px-10"
      >
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">

          {/* Specializations */}
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {SPECS.map((s, i) => (
              <motion.span
                key={s}
                initial={reduce ? { opacity: 1 } : { opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                className="font-mono text-xs uppercase tracking-widest text-[#808080] transition-colors hover:text-[#00ff41]"
              >
                {s}
              </motion.span>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden h-8 w-px sm:block" style={{ background: "rgba(0,255,65,0.15)" }} />

          {/* Social icons row */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((s, i) => (
              <motion.a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.07 }}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-8 w-8 items-center justify-center rounded border border-[rgba(0,255,65,0.15)] bg-[rgba(0,255,65,0.04)] text-sm text-[#808080] transition-colors hover:border-[rgba(0,255,65,0.4)] hover:text-[#00ff41]"
              >
                {SOCIAL_ICONS[s.name]}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;