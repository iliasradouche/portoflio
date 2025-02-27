import { useState, useRef } from "react";
import { RiReactjsLine } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import { SiMongodb, SiJavascript, SiTypescript, SiExpress, SiTailwindcss, SiFirebase, SiRedux, SiVisualstudiocode, SiGithub } from "react-icons/si";
import { FaNodeJs, FaHtml5, FaCss3Alt, FaFigma, FaSass } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

const Tech = () => {
  // Reference for section to detect when in view
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  // State for the currently selected technology category
  const [activeCategory, setActiveCategory] = useState("frontend");
  
  // Define technology categories and their technologies
  const techCategories = [
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "design", label: "Design" },
    { id: "tools", label: "Tools" }
  ];
  
  // Define technologies with categories, names, icons, and proficiency levels
  const technologies = [
    // Frontend
    { 
      id: "react", 
      name: "React", 
      icon: <RiReactjsLine className="text-sky-400" />,
      category: "frontend",
      proficiency: 95,
      description: "Component-based UI library"
    },
    { 
      id: "next", 
      name: "Next.js", 
      icon: <TbBrandNextjs />,
      category: "frontend",
      proficiency: 90,
      description: "React framework for production"
    },
    { 
      id: "javascript", 
      name: "JavaScript", 
      icon: <SiJavascript className="text-yellow-400" />,
      category: "frontend",
      proficiency: 95,
      description: "Core web programming language"
    },
    { 
      id: "typescript", 
      name: "TypeScript", 
      icon: <SiTypescript className="text-blue-500" />,
      category: "frontend",
      proficiency: 85,
      description: "Typed JavaScript superset"
    },
    { 
      id: "html", 
      name: "HTML5", 
      icon: <FaHtml5 className="text-orange-500" />,
      category: "frontend",
      proficiency: 98,
      description: "Web markup language"
    },
    { 
      id: "css", 
      name: "CSS3", 
      icon: <FaCss3Alt className="text-blue-500" />,
      category: "frontend",
      proficiency: 92,
      description: "Web styling language"
    },
    { 
      id: "tailwind", 
      name: "Tailwind", 
      icon: <SiTailwindcss className="text-cyan-400" />,
      category: "frontend",
      proficiency: 95,
      description: "Utility-first CSS framework"
    },
    { 
      id: "sass", 
      name: "Sass", 
      icon: <FaSass className="text-pink-500" />,
      category: "frontend",
      proficiency: 88,
      description: "CSS preprocessor"
    },
    { 
      id: "redux", 
      name: "Redux", 
      icon: <SiRedux className="text-purple-500" />,
      category: "frontend",
      proficiency: 85,
      description: "State management library"
    },
    
    // Backend
    { 
      id: "node", 
      name: "Node.js", 
      icon: <FaNodeJs className="text-green-500" />,
      category: "backend",
      proficiency: 90,
      description: "JavaScript runtime"
    },
    { 
      id: "express", 
      name: "Express", 
      icon: <SiExpress />,
      category: "backend",
      proficiency: 88,
      description: "Minimal web framework for Node.js"
    },
    { 
      id: "mongodb", 
      name: "MongoDB", 
      icon: <SiMongodb className="text-green-500" />,
      category: "backend",
      proficiency: 85,
      description: "NoSQL database"
    },
    { 
      id: "firebase", 
      name: "Firebase", 
      icon: <SiFirebase className="text-yellow-500" />,
      category: "backend",
      proficiency: 82,
      description: "Backend-as-a-service platform"
    },
    
    // Design
    { 
      id: "figma", 
      name: "Figma", 
      icon: <FaFigma className="text-purple-500" />,
      category: "design",
      proficiency: 90,
      description: "Collaborative design tool"
    },
    
    // Tools
    { 
      id: "vscode", 
      name: "VS Code", 
      icon: <SiVisualstudiocode className="text-blue-500" />,
      category: "tools",
      proficiency: 95,
      description: "Code editor"
    },
    { 
      id: "github", 
      name: "GitHub", 
      icon: <SiGithub />,
      category: "tools",
      proficiency: 92,
      description: "Version control hosting"
    }
  ];
  
  // Filter technologies by active category
  const filteredTechnologies = technologies.filter(
    tech => tech.category === activeCategory
  );

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
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
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
      id="technologies"
    >
      {/* Background elements */}
      <div className="absolute -right-32 top-0 -z-10 h-72 w-72 rounded-full bg-gradient-to-tr from-sky-700/10 to-transparent blur-3xl"></div>
      <div className="absolute -left-32 bottom-0 -z-10 h-72 w-72 rounded-full bg-gradient-to-bl from-orange-700/10 to-transparent blur-3xl"></div>
      
      <div className="container mx-auto px-6">
        {/* Section title */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12 text-center"
        >
          <h2 className="inline-block text-4xl font-light tracking-tight lg:text-5xl">
            Technologies
            <span className="font-medium text-neutral-400"> I Work With</span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-orange-500 to-sky-500"></div>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-400">
            My tech stack is carefully selected to create powerful, scalable, and beautiful digital products.
          </p>
        </motion.div>
        
        {/* Category Tabs */}
        <motion.div 
          className="mx-auto mb-12 flex max-w-md flex-wrap justify-center gap-2 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {techCategories.map((category) => (
            <motion.button
              key={category.id}
              variants={tabVariants}
              initial="inactive"
              animate={activeCategory === category.id ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all sm:text-base ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-orange-500 to-sky-500 text-white shadow-lg"
                  : "border border-neutral-700 bg-neutral-900/50 text-neutral-400 hover:border-neutral-600 hover:text-neutral-300"
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Technologies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {filteredTechnologies.map((tech) => (
            <motion.div
              key={tech.id}
              variants={itemVariants}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
              }}
              className="flex flex-col items-center rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 backdrop-blur-sm transition-colors hover:border-neutral-700"
            >
              {/* Icon */}
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-5xl">
                {tech.icon}
              </div>
              
              {/* Name */}
              <h3 className="mb-1 text-center font-medium">{tech.name}</h3>
              
              {/* Description */}
              <p className="mb-3 text-center text-xs text-neutral-500">{tech.description}</p>
              
              {/* Proficiency bar */}
              <div className="mt-auto w-full">
                <div className="mb-1 flex justify-between text-xs">
                  <span>Proficiency</span>
                  <span>{tech.proficiency}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-800">
                  <motion.div 
                    className="h-full rounded-full bg-gradient-to-r from-orange-500 to-sky-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${tech.proficiency}%` }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  ></motion.div>
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