import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  RiReactjsLine,
} from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import {
  SiMongodb, SiJavascript, SiTypescript, SiExpress,
  SiTailwindcss, SiFirebase, SiGithub, SiNodedotjs,
  SiDocker, SiPostgresql, SiFigma, SiPython,
  SiWebrtc, SiLinux, SiSass, SiAngular, SiVuedotjs,
  SiNestjs,
} from "react-icons/si";
import { FaHtml5, FaCss3Alt } from "react-icons/fa";
import { TECH_CATEGORIES, TECHNOLOGIES } from "../data";

// Map tech id → icon (some entries share icons where specific ones don't exist)
const ICON_MAP = {
  react:      <RiReactjsLine  className="text-sky-400"    />,
  next:       <TbBrandNextjs                               />,
  javascript: <SiJavascript   className="text-yellow-400" />,
  typescript: <SiTypescript   className="text-blue-400"   />,
  html:       <FaHtml5        className="text-orange-500" />,
  css:        <FaCss3Alt      className="text-blue-500"   />,
  tailwind:   <SiTailwindcss  className="text-cyan-400"   />,
  zustand:    <SiJavascript   className="text-yellow-300" />,
  vue:        <SiVuedotjs     className="text-green-400"  />,
  angular:    <SiAngular      className="text-red-500"    />,
  node:       <SiNodedotjs    className="text-green-500"  />,
  express:    <SiExpress                                   />,
  nestjs:     <SiNestjs       className="text-red-500"    />,
  websockets: <SiJavascript   className="text-purple-400" />,
  webrtc:     <SiWebrtc       className="text-teal-400"   />,
  mongodb:    <SiMongodb      className="text-green-500"  />,
  postgresql: <SiPostgresql   className="text-blue-400"   />,
  firebase:   <SiFirebase     className="text-yellow-500" />,
  docker:     <SiDocker       className="text-blue-400"   />,
  python:     <SiPython       className="text-blue-300"   />,
  figma:      <SiFigma        className="text-purple-500" />,
  sass:       <SiSass         className="text-pink-400"   />,
  github:     <SiGithub                                    />,
  vscode:     <SiJavascript   className="text-blue-500"   />,
  gh_actions: <SiGithub       className="text-[#00ff41]"  />,
  linux:      <SiLinux        className="text-yellow-300" />,
  aws:        <SiJavascript   className="text-orange-400" />,
  gcp:        <SiFirebase     className="text-red-400"    />,
};

const CONTAINER = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
};

const ITEM = {
  hidden:  { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

const Tech = () => {
  const sectionRef     = useRef(null);
  const isInView       = useInView(sectionRef, { once: false, amount: 0.2 });
  const [active, setActive] = useState("frontend");

  const filtered = TECHNOLOGIES.filter(t => t.category === active);

  return (
    <section
      ref={sectionRef}
      id="tech"
      className="relative overflow-hidden border-b border-[rgba(0,255,65,0.08)] py-20 lg:py-28"
    >
      {/* Ambient blobs */}
      <div
        className="pointer-events-none absolute -right-32 top-0 -z-10 h-72 w-72 rounded-full opacity-10 blur-3xl"
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
          <div className="mb-2 font-mono text-xs text-[#808080]">▶ ls -la tech_stack/</div>
          <h2 className="section-title text-4xl font-extrabold lg:text-5xl">
            <span className="text-[#e0e0e0]">Tech</span>
            <span className="text-[#00ff41]" style={{ textShadow: "0 0 20px rgba(0,255,65,0.4)" }}>
              {" "}Stack
            </span>
          </h2>
          <div className="section-divider mx-auto mt-4 max-w-xs" />
          <p className="mx-auto mt-4 max-w-xl font-mono text-sm text-[#808080]">
            // Carefully selected tools to build performant, scalable products
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {TECH_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`rounded border px-5 py-2 font-mono text-xs transition-all ${
                active === cat.id
                  ? "border-[#00ff41] bg-[rgba(0,255,65,0.1)] text-[#00ff41]"
                  : "border-[rgba(0,255,65,0.15)] bg-transparent text-[#808080] hover:border-[rgba(0,255,65,0.4)] hover:text-[#e0e0e0]"
              }`}
            >
              {active === cat.id && <span className="mr-1.5">▶</span>}
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          key={active}
          variants={CONTAINER}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {filtered.map(tech => (
            <motion.div
              key={tech.id}
              variants={ITEM}
              whileHover={{
                y: -4,
                borderColor: "rgba(0,255,65,0.4)",
                boxShadow:   "0 0 16px rgba(0,255,65,0.1)",
              }}
              className="terminal-card flex flex-col items-center rounded-lg p-4 cursor-default"
            >
              {/* Icon */}
              <div
                className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg text-2xl"
                style={{
                  background: "rgba(0,255,65,0.05)",
                  border:     "1px solid rgba(0,255,65,0.12)",
                }}
              >
                {ICON_MAP[tech.id] ?? <SiJavascript className="text-[#808080]" />}
              </div>

              {/* Name */}
              <h3 className="mb-1 text-center font-mono text-xs font-semibold text-[#e0e0e0]">
                {tech.name}
              </h3>

              {/* Description */}
              <p className="mb-3 text-center font-mono text-[10px] text-[#808080] leading-tight">
                {tech.description}
              </p>

              {/* Proficiency bar */}
              <div className="mt-auto w-full">
                <div className="mb-1 flex justify-between font-mono text-[10px]">
                  <span className="text-[#808080]">proficiency</span>
                  <span className="text-[#00ff41]">{tech.proficiency}%</span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.05)]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${tech.proficiency}%` }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(to right, #00cc33, #00ff41)",
                      boxShadow:  "0 0 6px rgba(0,255,65,0.5)",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Tech;
