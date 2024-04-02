import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "../constants";
import { TfiClose } from "react-icons/tfi";

function Project() {
  const [selectedId, setSelectedId] = useState(null);
  return (
    <div className="container mx-auto p-4 border-b border-neutral-900 pb-4">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
        className="my-20 text-center text-4xl"
      >
        Projects
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5"
      >
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            layoutId={`project-${project.id}`}
            onClick={() => setSelectedId(project.id)}
            
            className=" border cursor-pointer rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <motion.h2 className="font-bold text-xl mb-2">
                {project.title}
              </motion.h2>
              <motion.p className="text-neutral-500 text-base">
                {project.description}
              </motion.p>
              <div className="mt-3">
                {project.technologies.map((tech, index) => (
                  <span
                    key={`${project.id}-tech-${index}`}
                    className="mr-2 mt-4 rounded bg-neutral-800 px-2 py-1 text-sm font-medium text-orange-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedId &&
          PROJECTS.filter((project) => project.id === selectedId).map(
            (project) => (
              <motion.div
                key={`detail-${project.id}`}
                layoutId={`project-${project.id}`}
                className="fixed inset-0 bg-zinc-400 bg-opacity-90 z-50 p-8 overflow-y-auto"
              >
                <motion.button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-0 right-0 mt-4 mr-4 bg-zinc-600 hover:bg-zinc-400 hover:text-black text-white font-bold py-2 px-4 rounded-full"
                >
                  <TfiClose />
                </motion.button>
                <motion.h2 className="font-bold text-black text-3xl mb-2">
                  {project.title}
                </motion.h2>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full max-h-96 object-cover rounded-lg"
                />
                <motion.p className="text-black text-lg font-normal mt-4">
                  {project.description}
                </motion.p>
                <div className="mt-6">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={`detail-${project.id}-tech-${index}`}
                      className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          )}
      </AnimatePresence>
    </div>
  );
}

export default Project;
