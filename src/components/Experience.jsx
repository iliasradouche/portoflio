import { useRef } from "react";
import { EXPERIENCES } from "../constants";
import { motion, useInView } from "framer-motion";
import { HiOutlineBriefcase, HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi";

const Experience = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden border-b border-neutral-800 py-16 lg:py-24"
      id="experience"
    >
      {/* Background elements */}
      <div className="absolute -left-64 top-1/4 -z-10 h-96 w-96 rounded-full bg-gradient-to-tr from-orange-700/10 to-transparent blur-3xl"></div>
      <div className="absolute -right-64 bottom-1/4 -z-10 h-96 w-96 rounded-full bg-gradient-to-bl from-sky-700/10 to-transparent blur-3xl"></div>
      
      <div className="container mx-auto px-6">
        {/* Section title */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 text-center"
        >
          <h2 className="inline-block text-4xl font-light tracking-tight lg:text-5xl">
            Professional
            <span className="font-medium text-neutral-400"> Experience</span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-orange-500 to-sky-500"></div>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-400">
            My professional journey and the impactful roles that have shaped my expertise
          </p>
        </motion.div>
        
        {/* Zigzag Experience Layout */}
        <div className="relative mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 gap-16 lg:grid-cols-2"
          >
            {EXPERIENCES.map((experience, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={`relative ${
                  index % 2 === 0 
                    ? "lg:justify-self-end" 
                    : "lg:justify-self-start"
                }`}
              >
                {/* Card content */}
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.2)" }}
                  className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/70 backdrop-blur-sm"
                >
                  {/* Header with gradient */}
                  <div className="border-b border-neutral-800 bg-gradient-to-r from-orange-950/20 to-sky-950/20 p-5">
                    <div className="flex items-center">
                      <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-500/20 to-sky-500/20">
                        <HiOutlineBriefcase className="h-6 w-6 text-orange-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{experience.role}</h3>
                        <p className="text-base text-orange-300">{experience.company}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Main content */}
                  <div className="p-5">
                    {/* Time and location */}
                    <div className="mb-4 flex flex-wrap gap-4 text-sm text-neutral-400">
                      <div className="flex items-center">
                        <HiOutlineCalendar className="mr-1 h-4 w-4" />
                        {experience.year}
                      </div>
                      {experience.location && (
                        <div className="flex items-center">
                          <HiOutlineLocationMarker className="mr-1 h-4 w-4" />
                          {experience.location}
                        </div>
                      )}
                    </div>
                    
                    {/* Description */}
                    <p className="mb-5 text-neutral-300">{experience.description}</p>
                    
                    {/* Achievements list - added feature */}
                    {experience.achievements && (
                      <div className="mb-5">
                        <h4 className="mb-2 font-medium text-orange-300">Key Achievements:</h4>
                        <ul className="list-inside list-disc space-y-1 text-sm text-neutral-400">
                          {experience.achievements.map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="rounded-full bg-gradient-to-r from-orange-950 to-sky-950 px-3 py-1 text-xs font-medium text-orange-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-neutral-700 bg-neutral-900/50 px-6 py-3 text-sm font-medium text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            Full Resume on LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;