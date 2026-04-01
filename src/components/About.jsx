import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ABOUT_TEXT, ABOUT_HIGHLIGHTS, SKILL_BARS } from "../data";

const STAT_CARDS = [
  { value: "3+",   label: "Years Experience"   },
  { value: "10+",  label: "Projects Shipped"   },
  { value: "5",    label: "Companies & Clients" },
  { value: "3",    label: "Languages Spoken"    },
];

const IN_VIEW_ANIM = { opacity: 1, y: 0 };
const HIDDEN_ANIM  = { opacity: 0, y: 24 };

const About = () => {
  const sectionRef   = useRef(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);

  const motionProps = (delay = 0) => ({
    initial:    shouldReduce ? { opacity: 1 } : HIDDEN_ANIM,
    whileInView: shouldReduce ? { opacity: 1 } : IN_VIEW_ANIM,
    viewport:   { once: true },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden border-b border-[rgba(0,255,65,0.08)] py-20 lg:py-28"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(0,255,65,0.5) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-4 sm:px-6">

        {/* ── Section header ───────────────────────────── */}
        <motion.div {...motionProps(0)} className="mb-14 text-center">
          <div className="mb-2 font-mono text-xs text-[#808080]">▶ cat about.md</div>
          <h2 className="section-title text-4xl font-extrabold lg:text-5xl">
            <span className="text-[#e0e0e0]">About</span>
            <span
              className="text-[#00ff41]"
              style={{ textShadow: "0 0 20px rgba(0,255,65,0.4)" }}
            >
              {" "}Me
            </span>
          </h2>
          <div className="section-divider mx-auto mt-4 max-w-xs" />
        </motion.div>

        {/* ── Stat cards row ───────────────────────────── */}
        <motion.div
          style={{ opacity }}
          className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {STAT_CARDS.map((s, i) => (
            <motion.div
              key={s.label}
              {...motionProps(i * 0.08)}
              className="terminal-card flex flex-col items-center rounded-lg py-5 px-3 text-center"
            >
              <span
                className="font-mono text-3xl font-extrabold leading-none"
                style={{
                  color:      "#00ff41",
                  textShadow: "0 0 15px rgba(0,255,65,0.5)",
                }}
              >
                {s.value}
              </span>
              <span className="mt-1.5 font-mono text-xs text-[#808080]">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Main two-column grid ─────────────────────── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">

          {/* Bio card */}
          <motion.div
            {...motionProps(0.08)}
            className="terminal-card flex flex-col rounded-lg p-6 lg:p-7"
          >
            <div className="mb-2 font-mono text-xs text-[#00ff41]/60">// who_i_am.txt</div>
            <h3 className="mb-4 font-mono text-xl font-bold text-[#e0e0e0]">Who I Am</h3>
            <p className="flex-1 font-mono text-sm leading-relaxed text-[#808080] whitespace-pre-line">
              {ABOUT_TEXT}
            </p>
            <a
              href="#contact"
              className="btn-terminal-solid mt-6 inline-flex w-fit items-center gap-2 rounded px-5 py-2.5 text-sm"
            >
              Let's Work Together
            </a>
          </motion.div>

          {/* Right column: highlights + skill bars stacked */}
          <div className="flex flex-col gap-6">

            {/* Highlights card */}
            <motion.div
              {...motionProps(0.16)}
              className="terminal-card rounded-lg p-6 lg:p-7"
            >
              <div className="mb-2 font-mono text-xs text-[#00ff41]/60">// highlights[]</div>
              <h3 className="mb-4 font-mono text-lg font-bold text-[#e0e0e0]">Key Highlights</h3>
              <ul className="space-y-2.5">
                {ABOUT_HIGHLIGHTS.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 font-mono text-sm text-[#808080]">
                    <span className="mt-0.5 shrink-0 text-[#00ff41] text-base leading-none">▸</span>
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Skill bars card */}
            <motion.div
              {...motionProps(0.24)}
              className="terminal-card rounded-lg p-6 lg:p-7"
            >
              <div className="mb-2 font-mono text-xs text-[#00ff41]/60">// proficiency_map</div>
              <h3 className="mb-5 font-mono text-lg font-bold text-[#e0e0e0]">
                Skills &amp; Proficiency
              </h3>
              <div className="space-y-4">
                {SKILL_BARS.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex justify-between font-mono text-xs">
                      <span className="text-[#e0e0e0]">{skill.name}</span>
                      <span className="text-[#00ff41]">{skill.level}%</span>
                    </div>
                    <div
                      className="relative h-1.5 w-full overflow-hidden rounded-full"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                      role="progressbar"
                      aria-label={`${skill.name} proficiency`}
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: shouldReduce ? 0 : 0.9,
                          delay:    shouldReduce ? 0 : 0.1 + i * 0.1,
                          ease:     "easeOut",
                        }}
                        className="h-full rounded-full"
                        style={{
                          background: "linear-gradient(to right, #00cc33, #00ff41)",
                          boxShadow:  "0 0 8px rgba(0,255,65,0.6)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
