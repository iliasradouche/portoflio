import { useRef } from "react";
import radoucheProfile from "../assets/radoucheProfile.jpg";
import { ABOUT_TEXT } from "../constants";
import { motion, useScroll, useTransform } from "framer-motion";

const About = () => {
  const sectionRef = useRef(null);
  
  // Create scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values based on scroll position
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="inline-block text-4xl font-light tracking-tight lg:text-5xl">
            About
            <span className="font-medium text-neutral-400"> Me</span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-orange-500 to-sky-500"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image column */}
          <motion.div
            style={{ scale: imageScale }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -bottom-3 -left-3 h-32 w-32 rounded-bl-3xl border-b-2 border-l-2 border-orange-500/20"></div>
              <div className="absolute -right-3 -top-3 h-32 w-32 rounded-tr-3xl border-r-2 border-t-2 border-sky-500/20"></div>
              
              {/* Main image */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative overflow-hidden rounded-lg shadow-xl"
              >
                <div className="overflow-hidden rounded-lg">
                  <img 
                    className="h-auto w-full max-w-lg transform object-cover transition-transform duration-1000 hover:scale-105" 
                    src={radoucheProfile} 
                    alt="Ilias Radouche - About Me" 
                  />
                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900/30"></div>
                </div>
                
                {/* Experience badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute -right-5 -top-5 flex h-24 w-24 items-center justify-center rounded-full bg-neutral-900/80 p-2 backdrop-blur-sm"
                >
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-orange-500/30 text-center">
                    <span className="text-xl font-bold">5+</span>
                    <span className="text-xs text-neutral-400">Years Exp.</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Text column */}
          <motion.div
            style={{ opacity: textOpacity, x: xOffset }}
            className="flex flex-col space-y-8"
          >
            {/* About text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="rounded-lg border border-neutral-800 bg-neutral-900/30 p-6 backdrop-blur-sm"
            >
              <h3 className="mb-4 text-2xl font-medium">Who I Am</h3>
              <p className="whitespace-pre-line leading-relaxed text-neutral-300">
                {ABOUT_TEXT}
              </p>
              
              {/* Call to action */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="rounded-lg border border-neutral-800 bg-neutral-900/30 p-6 backdrop-blur-sm"
            >
              <h3 className="mb-6 text-2xl font-medium">My Skills</h3>
              <div className="space-y-5">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-neutral-400">{skill.level}%</span>
                    </div>
                    <motion.div 
                      className="h-2 w-full rounded-full bg-neutral-800"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.8 + (index * 0.1) }}
                    >
                      <motion.div 
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-sky-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.9 + (index * 0.1), ease: "easeOut" }}
                      ></motion.div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Quick facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "Projects", value: "60+" },
                { label: "Clients", value: "25+" },
                { label: "Countries", value: "10+" },
                { label: "Languages", value: "3" }
              ].map((fact) => (
                <div 
                  key={fact.label}
                  className="flex flex-col items-center rounded-lg border border-neutral-800 bg-neutral-900/30 p-4 text-center backdrop-blur-sm"
                >
                  <span className="text-2xl font-bold text-gradient bg-gradient-to-r from-orange-500 to-sky-500 bg-clip-text text-transparent">
                    {fact.value}
                  </span>
                  <span className="text-sm text-neutral-400">{fact.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;