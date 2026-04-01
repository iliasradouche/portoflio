import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { EXPERIENCES } from "../data";

const CONTAINER = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const ITEM = {
  hidden:  { y: 30, opacity: 0 },
  visible: { y: 0,  opacity: 1,  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const Experience = () => {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: false, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden border-b border-[rgba(0,255,65,0.08)] py-20 lg:py-28"
    >
      {/* Ambient blob */}
      <div
        className="pointer-events-none absolute -left-40 top-1/4 -z-10 h-80 w-80 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(0,255,65,0.4) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="mb-2 font-mono text-xs text-[#808080]">▶ git log --oneline jobs.log</div>
          <h2 className="section-title text-4xl font-extrabold lg:text-5xl">
            <span className="text-[#e0e0e0]">Professional</span>
            <span className="text-[#00ff41]" style={{ textShadow: "0 0 20px rgba(0,255,65,0.4)" }}>
              {" "}Experience
            </span>
          </h2>
          <div className="section-divider mx-auto mt-4 max-w-xs" />
          <p className="mx-auto mt-4 max-w-xl font-mono text-sm text-[#808080]">
            // Roles that shaped my technical expertise and professional growth
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-4xl">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 hidden h-full w-px lg:block"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(0,255,65,0.2), transparent)" }}
          />

          <motion.div
            variants={CONTAINER}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={idx}
                variants={ITEM}
                className="relative flex flex-col gap-4 lg:flex-row lg:gap-8"
              >
                {/* Timeline dot */}
                <div className="hidden lg:flex flex-col items-center pt-6">
                  <div
                    className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{
                      border:     "1px solid rgba(0,255,65,0.3)",
                      background: "rgba(0,255,65,0.08)",
                      boxShadow:  "0 0 12px rgba(0,255,65,0.2)",
                    }}
                  >
                    <HiOutlineBriefcase className="h-4 w-4 text-[#00ff41]" />
                  </div>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{
                    y: -3,
                    borderColor: "rgba(0,255,65,0.3)",
                    boxShadow:   "0 0 20px rgba(0,255,65,0.08)",
                  }}
                  className="terminal-card flex-1 overflow-hidden rounded-lg transition-all"
                >
                  {/* Card header */}
                  <div
                    className="border-b px-5 py-4"
                    style={{
                      borderColor: "rgba(0,255,65,0.08)",
                      background:  "rgba(0,255,65,0.03)",
                    }}
                  >
                    {/* Year pill */}
                    <div className="mb-2 inline-flex items-center gap-1.5">
                      <span
                        className="rounded px-2 py-0.5 font-mono text-xs"
                        style={{
                          border:     "1px solid rgba(0,255,65,0.2)",
                          background: "rgba(0,255,65,0.06)",
                          color:      "#00ff41",
                        }}
                      >
                        <HiOutlineCalendar className="mr-1 inline h-3 w-3" />
                        {exp.year}
                      </span>
                      {exp.location && (
                        <span className="font-mono text-xs text-[#808080]">
                          <HiOutlineLocationMarker className="mr-0.5 inline h-3 w-3" />
                          {exp.location}
                        </span>
                      )}
                    </div>

                    <h3 className="font-mono text-base font-bold text-[#e0e0e0] sm:text-lg">
                      {exp.role}
                    </h3>
                    <p className="font-mono text-sm text-[#00ff41]/80">{exp.company}</p>
                  </div>

                  {/* Card body */}
                  <div className="px-5 py-4">
                    <p className="mb-4 font-mono text-sm leading-relaxed text-[#808080]">
                      {exp.description}
                    </p>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, ti) => (
                        <span key={ti} className="tech-badge">{tech}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="https://www.linkedin.com/in/ilias-radouche"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-terminal inline-flex items-center gap-2 rounded px-6 py-3"
          >
            <span className="text-[#00ff41]">▶</span>
            Full Resume on LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;