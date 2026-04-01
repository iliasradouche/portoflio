import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useTypewriter } from "react-simple-typewriter";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { HiOutlineDownload, HiArrowRight } from "react-icons/hi";
import radoucheProfile from "../assets/radoucheProfile.png";
import { HERO_CONTENT, TYPEWRITER_WORDS, SOCIAL_LINKS } from "../data";

const SOCIAL_ICONS = {
  LinkedIn:  { icon: <FaLinkedin  />, hover: "hover:text-[#0077B5]",  border: "hover:border-[#0077B5]"   },
  GitHub:    { icon: <FaGithub   />, hover: "hover:text-[#e0e0e0]",  border: "hover:border-[#e0e0e0]"   },
  Twitter:   { icon: <FaSquareXTwitter />, hover: "hover:text-[#e0e0e0]", border: "hover:border-[#e0e0e0]" },
  Instagram: { icon: <FaInstagram/>, hover: "hover:text-pink-400",    border: "hover:border-pink-400"    },
};

const FADE_UP = {
  hidden:  { y: 30, opacity: 0 },
  visible: (delay = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const IMG_REVEAL = {
  hidden:  { scale: 0.92, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  const [typeEffect]  = useTypewriter({
    words:       TYPEWRITER_WORDS,
    loop:        {},
    typeSpeed:   70,
    deleteSpeed: 45,
    delaySpeed:  1200,
  });

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href     = "/my_resume.pdf";
    a.download = "ILIAS_RADOUCHE_CV.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section className="relative overflow-hidden border-b border-[rgba(0,255,65,0.08)] pb-16 pt-28 lg:pb-28 lg:pt-36">
      {/* Ambient background blobs */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, rgba(0,255,65,0.3) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, rgba(0,255,65,0.2) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ── Left column: text ─────────────────────────── */}
          <div className="flex flex-col space-y-7 text-center lg:text-left">

            {/* Terminal boot line */}
            <motion.div
              custom={0}
              variants={FADE_UP}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="flex items-center justify-center gap-2 lg:justify-start"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#00ff41] shadow-[0_0_6px_#00ff41]" />
              <span className="font-mono text-xs text-[#808080]">
                system online <span className="text-[#00ff41]">●</span>
              </span>
            </motion.div>

            {/* Name */}
            <motion.div
              custom={0.15}
              variants={FADE_UP}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              <div className="font-mono text-sm text-[#00ff41]/60 mb-1">▶ whoami</div>
              <h1 className="font-mono text-5xl font-extrabold leading-none tracking-tight sm:text-6xl lg:text-7xl">
                <span className="text-[#e0e0e0]">Ilias</span>
                <br />
                <span
                  className="text-[#00ff41]"
                  style={{ textShadow: "0 0 30px rgba(0,255,65,0.5), 0 0 60px rgba(0,255,65,0.2)" }}
                >
                  Radouche
                </span>
              </h1>
            </motion.div>

            {/* Typewriter role */}
            <motion.div
              custom={0.35}
              variants={FADE_UP}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="flex items-center justify-center gap-2 lg:justify-start"
            >
              <span className="font-mono text-[#808080] text-lg">$</span>
              <span className="font-mono text-lg text-[#e0e0e0] sm:text-xl">
                {typeEffect}
              </span>
              <span className="cursor-blink" aria-hidden="true" />
            </motion.div>

            {/* Bio */}
            <motion.p
              custom={0.5}
              variants={FADE_UP}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="mx-auto max-w-lg font-mono text-sm leading-relaxed text-[#808080] lg:mx-0 lg:text-base"
            >
              <span className="text-[#00ff41]/60">// </span>
              {HERO_CONTENT}
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={0.65}
              variants={FADE_UP}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <button
                onClick={handleDownload}
                className="btn-terminal-solid flex items-center gap-2 rounded px-6 py-3 font-mono text-sm font-bold transition-all"
              >
                <HiOutlineDownload className="h-4 w-4" />
                Download CV
              </button>

              <a
                href="#projects"
                className="btn-terminal flex items-center gap-2 rounded px-6 py-3"
              >
                View Projects
                <HiArrowRight className="h-4 w-4" />
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              custom={0.8}
              variants={FADE_UP}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="flex items-center justify-center gap-3 lg:justify-start"
            >
              {SOCIAL_LINKS.map(s => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className={`flex items-center justify-center h-9 w-9 rounded border border-[rgba(0,255,65,0.15)] bg-[rgba(0,255,65,0.04)] text-[#808080] transition-all ${SOCIAL_ICONS[s.name]?.hover} ${SOCIAL_ICONS[s.name]?.border}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {SOCIAL_ICONS[s.name]?.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── Right column: image ───────────────────────── */}
          <motion.div
            className="relative flex justify-center"
            variants={IMG_REVEAL}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {/* Floating glow */}
            <div
              className="absolute inset-0 rounded-2xl blur-3xl opacity-20"
              style={{ background: "radial-gradient(circle, rgba(0,255,65,0.4) 0%, transparent 70%)" }}
            />

            {/* Corner brackets */}
            <div className="absolute -top-3 -left-3 h-8 w-8 border-t-2 border-l-2 border-[#00ff41] opacity-60 rounded-tl-sm" />
            <div className="absolute -top-3 -right-3 h-8 w-8 border-t-2 border-r-2 border-[#00ff41] opacity-60 rounded-tr-sm" />
            <div className="absolute -bottom-3 -left-3 h-8 w-8 border-b-2 border-l-2 border-[#00ff41] opacity-60 rounded-bl-sm" />
            <div className="absolute -bottom-3 -right-3 h-8 w-8 border-b-2 border-r-2 border-[#00ff41] opacity-60 rounded-br-sm" />

            {/* Profile image */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative overflow-hidden rounded-2xl"
              style={{ border: "1px solid rgba(0,255,65,0.2)" }}
            >
              <img
                src={radoucheProfile}
                alt="Ilias Radouche — Full Stack Developer"
                loading="eager"
                className="h-auto w-full max-w-sm object-cover"
                style={{ filter: "brightness(0.85) contrast(1.05)" }}
              />
              {/* Green overlay tint */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(0,255,65,0.12) 0%, transparent 60%)",
                  mixBlendMode: "screen",
                }}
              />
              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />

              {/* Status badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 rounded border border-[rgba(0,255,65,0.2)] bg-[rgba(10,10,10,0.8)] px-3 py-2 backdrop-blur-sm">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#00ff41] shadow-[0_0_6px_#00ff41]" />
                  <span className="font-mono text-xs text-[#00ff41]">Available for work</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;