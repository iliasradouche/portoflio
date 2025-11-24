import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { PROJECTS } from "../constants";
import { HiX, HiExternalLink, HiCode, HiArrowRight } from "react-icons/hi";

function Project() {
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // Define project categories
  const categories = [
    { id: "all", name: "All Projects" },
    { id: "frontend", name: "Frontend" },
    { id: "fullstack", name: "Full Stack" },
    { id: "design", name: "Design" }
  ];
  
  // Filter projects based on selected category
  const filteredProjects = filter === "all" 
    ? PROJECTS 
    : PROJECTS.filter(project => project.category === filter);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };
  
  const projectVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
    exit: { 
      y: 30, 
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { 
        duration: 0.3, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
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
  
  const tabVariants = {
    inactive: { opacity: 0.7, scale: 0.95 },
    active: { opacity: 1, scale: 1 }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden border-b border-neutral-800 py-16 lg:py-24"
      id="projects"
    >
      {/* Background elements */}
      <div className="absolute -left-32 top-1/3 -z-10 h-72 w-72 rounded-full bg-gradient-to-tr from-orange-700/10 to-transparent blur-3xl"></div>
      <div className="absolute -right-32 bottom-1/3 -z-10 h-72 w-72 rounded-full bg-gradient-to-bl from-sky-700/10 to-transparent blur-3xl"></div>
      
      <div className="container mx-auto px-6">
        {/* Section title */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12 text-center"
        >
          <h2 className="inline-block text-4xl font-light tracking-tight lg:text-5xl">
            Featured
            <span className="font-medium text-neutral-400"> Projects</span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-orange-500 to-sky-500"></div>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-400">
            A selection of my recent work showcasing my skills and expertise
          </p>
        </motion.div>
        
        {/* Filter tabs */}
        <motion.div 
          className="mx-auto mb-12 flex max-w-lg flex-wrap justify-center gap-2 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              variants={tabVariants}
              initial="inactive"
              animate={filter === category.id ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilter(category.id)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all sm:text-base ${
                filter === category.id
                  ? "bg-gradient-to-r from-orange-500 to-sky-500 text-white shadow-lg"
                  : "border border-neutral-700 bg-neutral-900/50 text-neutral-400 hover:border-neutral-600 hover:text-neutral-300"
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={projectVariants}
                layoutId={`project-card-${project.id}`}
                onClick={() => setSelectedId(project.id)}
                whileHover={{ y: -8 }}
                className="group cursor-pointer overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/80 shadow-xl transition-all hover:border-neutral-700 hover:shadow-2xl"
              >
                {/* Project image with overlay */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent opacity-80"></div>
                  
                  {/* View details button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20">
                      View Details
                    </span>
                  </div>
                </div>
                
                {/* Project info */}
                <div className="p-5">
                  <div className="mb-3 flex items-start justify-between">
                    <h3 className="text-xl font-medium">{project.title}</h3>
                    {project.featured && (
                      <span className="rounded-full bg-gradient-to-r from-orange-500/20 to-sky-500/20 px-3 py-1 text-xs font-medium text-orange-300">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <p className="mb-4 line-clamp-2 text-sm text-neutral-400">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={`${project.id}-tech-${index}`}
                        className="rounded-full bg-neutral-800 px-3 py-1 text-xs font-medium text-orange-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs font-medium text-neutral-400">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {/* Action links */}
                  <div className="flex items-center justify-end space-x-4 text-sm text-neutral-500">
                    <motion.span
                      whileHover={{ scale: 1.05, color: "#f97316" }}
                      className="flex items-center font-medium"
                    >
                      Details <HiArrowRight className="ml-1" />
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* Project detail modal */}
        <AnimatePresence>
          {selectedId && (
            <>
              {/* Backdrop */}
              <motion.div
                key={`backdrop-${selectedId}`}
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => setSelectedId(null)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
              >
                {/* Modal */}
                {PROJECTS.filter(project => project.id === selectedId).map(project => (
                  <motion.div
                    key={`modal-${project.id}`}
                    layoutId={`project-card-${project.id}`}
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={e => e.stopPropagation()}
                    className="relative max-h-[90vh] w-[95%] max-w-4xl overflow-y-auto rounded-xl border border-neutral-700 bg-neutral-900 shadow-2xl"
                  >
                    {/* Close button */}
                    <button
                      onClick={() => setSelectedId(null)}
                      className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800/80 text-neutral-400 backdrop-blur-sm transition-colors hover:bg-neutral-700 hover:text-white"
                    >
                      <HiX />
                    </button>
                    
                    {/* Modal content */}
                    <div>
                      {/* Project image */}
                      <div className="relative h-64 w-full sm:h-80 md:h-96">
                        <img
                          src={project.image}
                          alt={project.title}
                          decoding="async"
                          sizes="100vw"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent"></div>
                        
                        {/* Project title and featured badge */}
                        <div className="absolute bottom-0 left-0 w-full p-6">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                              {project.title}
                            </h2>
                            {project.featured && (
                              <span className="rounded-full bg-gradient-to-r from-orange-500 to-sky-500 px-4 py-1 text-xs font-medium text-white">
                                Featured Project
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Project details */}
                      <div className="p-6">
                        {/* Overview */}
                        <div className="mb-8">
                          <h3 className="mb-4 text-xl font-medium">Overview</h3>
                          <p className="whitespace-pre-line text-neutral-300">
                            {project.description}
                          </p>
                          {project.longDescription && (
                            <p className="mt-4 whitespace-pre-line text-neutral-300">
                              {project.longDescription}
                            </p>
                          )}
                        </div>
                        
                        {/* Technologies */}
                        <div className="mb-8">
                          <h3 className="mb-4 text-xl font-medium">Technologies Used</h3>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <span
                                key={`modal-${project.id}-tech-${index}`}
                                className="rounded-full bg-gradient-to-r from-orange-950 to-sky-950 px-4 py-1.5 text-sm font-medium text-orange-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Key features */}
                        {project.features && (
                          <div className="mb-8">
                            <h3 className="mb-4 text-xl font-medium">Key Features</h3>
                            <ul className="list-inside list-disc space-y-2 text-neutral-300">
                              {project.features.map((feature, index) => (
                                <li key={`feature-${index}`}>{feature}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Links */}
                        <div className="mt-8 flex flex-wrap gap-4">
                          {project.liveLink && (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-sky-500 px-6 py-2 text-sm font-medium text-white transition hover:opacity-90"
                            >
                              <HiExternalLink /> View Live
                            </a>
                          )}
                          {project.codeLink && (
                            <a
                              href={project.codeLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-800 px-6 py-2 text-sm font-medium text-neutral-300 transition hover:border-neutral-600 hover:bg-neutral-700"
                            >
                              <HiCode /> View Code
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
        
        {/* View all projects link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a 
            href="https://github.com/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/50 px-6 py-3 text-sm font-medium text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
          >
            View All Projects on GitHub <HiArrowRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Project;
