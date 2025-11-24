import { useRef } from "react";
import radoucheProfile from "../assets/radoucheProfile.jpg";
import { ABOUT_TEXT } from "../constants";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const About = () => {
  const sectionRef = useRef(null);
  
  // Create scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const shouldReduceMotion = useReducedMotion();
  
  // Transform values based on scroll position
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const xOffset = useTransform(scrollYProgress, [0, 0.5], [-20, 0]);
  
  // Skills data
  const skills = [
    { name: "Frontend", level: 90 },
    { name: "Backend", level: 85 },
    { name: "UX/UI Design", level: 80 },
    { name: "Mobile Dev", level: 75 }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden border-b border-neutral-800 py-16 lg:py-24"
      id="about"
    >
      {/* Background elements */}
      <div className="absolute left-0 top-1/3 -z-10 h-64 w-64 rounded-full bg-gradient-to-tr from-orange-600/10 to-transparent blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 -z-10 h-64 w-64 rounded-full bg-gradient-to-bl from-sky-600/10 to-transparent blur-3xl"></div>
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 id="about-title" className="inline-block text-4xl font-light tracking-tight lg:text-5xl">
            About
            <span className="font-medium text-neutral-400"> Me</span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-orange-500 to-sky-500"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Content column only (image removed) */}
          <motion.div
            style={{ opacity: textOpacity, x: xOffset }}
            className="flex flex-col space-y-8 lg:col-span-12"
          >
            <div className="flex flex-col space-y-8">
              {/* About text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
              className="mx-auto max-w-4xl rounded-lg border border-neutral-800 bg-neutral-900/30 p-6 backdrop-blur-sm"
              >
                <h3 className="mb-4 text-2xl font-medium">Who I Am</h3>
                <p className="whitespace-pre-line leading-relaxed text-neutral-300">
                  {ABOUT_TEXT}
                </p>

              {/* Highlights list */}
<div className="mt-6">
  <h4 className="mb-2 text-lg font-medium">Highlights</h4>
  <ul className="list-inside list-disc space-y-1 text-neutral-300">
    <li>End-to-end feature development across web and mobile platforms.</li>
    <li>API engineering and authentication pipelines (JWT, Firebase OTP, bcrypt).</li>
    <li>Real-time communication with WebSockets and WebRTC.</li>
    <li>Performance optimization and backend reliability improvements.</li>
    <li>Collaboration with product and engineering teams in agile environments.</li>
  </ul>
</div>

              
              {/* Call to action */}
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="mt-6"
              >
                <a 
                  href="#contact" 
                  className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-sky-500 px-6 py-3 font-medium text-white transition-transform"
                >
                  Let's Work Together
                </a>
              </motion.div>
              </motion.div>
              
              {/* Skills visualization */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.6 }}
              className="mx-auto max-w-4xl rounded-lg border border-neutral-800 bg-neutral-900/30 p-6 backdrop-blur-sm"
              >
                <div className="mb-6 flex items-end justify-between">
                  <h3 className="text-2xl font-medium">Skills & Proficiency</h3>
                  <span className="text-xs text-neutral-400">Scale: 0–100%</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-4 shadow-sm hover:border-neutral-700 transition-colors"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="font-medium tracking-tight">{skill.name}</span>
                        <span className="inline-flex items-center rounded-full bg-neutral-800 px-2 py-0.5 text-xs text-neutral-300">
                          {skill.level}%
                        </span>
                      </div>

                      <div
                        className="relative h-2 w-full rounded-full bg-neutral-800"
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
                          transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-sky-500"
                        />
                        <div className="absolute inset-0" aria-hidden="true">
                          <div
                            className="absolute -top-1 h-4 w-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm"
                            style={{ left: `calc(${skill.level}% - 8px)` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Quick facts */}
{/*             <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mx-auto grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4"
            >
              {[
                { label: "Projects", value: "60+" },
                { label: "Clients", value: "25+" },
                { label: "Countries", value: "10+" },
                { label: "Languages", value: "3" }
              ].map((fact) => (
                <div 
                  key={fact.label}
                  className="flex min-h-[110px] flex-col items-center rounded-lg border border-neutral-800 bg-neutral-900/30 p-4 text-center backdrop-blur-sm"
                >
                  <span className="text-2xl font-bold text-gradient bg-gradient-to-r from-orange-500 to-sky-500 bg-clip-text text-transparent">
                    {fact.value}
                  </span>
                  <span className="text-sm text-neutral-400">{fact.label}</span>
                </div>
              ))}
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
