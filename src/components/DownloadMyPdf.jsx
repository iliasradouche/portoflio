import { motion } from "framer-motion";
import { HiOutlineDownload, HiOutlineDocumentText } from "react-icons/hi";
import { useState } from "react";

const DownloadPDFButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Animation variants
  const buttonVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        delay: 0.8
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(234, 88, 12, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const iconVariants = {
    hover: {
      y: [0, -5, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "loop"
      }
    },
    clicked: {
      rotate: [0, 15, -15, 10, -10, 5, -5, 0],
      transition: { duration: 0.5 }
    }
  };

  const handleDownload = () => {
    // Show click animation
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
    
    // Create download link
    const link = document.createElement("a");
    link.href = "https://drive.usercontent.google.com/download?id=1wi-v6hSzBGqJsT3zmt5odiO2CictL0dA&export=download&authuser=0&confirm=t&uuid=af001b80-6add-45d4-8c7f-75031bd8a8e1&at=APZUnTVwR7ZyRVoAPK3eGJ_VPX1X:1712158192474";
    link.download = "ILIAS_RADOUCHE_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      className="relative inline-block"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background gradient animation on hover */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 blur transition-opacity duration-300 group-hover:opacity-70"></div>
      
      <button
        onClick={handleDownload}
        className="relative flex items-center space-x-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-medium text-white shadow-lg transition-all hover:from-orange-600 hover:to-sky-500"
      >
        <motion.div
          variants={iconVariants}
          animate={isClicked ? "clicked" : isHovered ? "hover" : ""}
          className="flex items-center"
        >
          {isClicked ? (
            <HiOutlineDocumentText className="h-5 w-5" />
          ) : (
            <HiOutlineDownload className="h-5 w-5" />
          )}
        </motion.div>
        <span>Download CV</span>
        
        {/* Subtle dot indicators */}
        <div className="ml-1 flex space-x-1">
          <motion.div 
            animate={{ 
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              delay: 0
            }}
            className="h-1 w-1 rounded-full bg-white"
          ></motion.div>
          <motion.div 
            animate={{ 
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              delay: 0.5
            }}
            className="h-1 w-1 rounded-full bg-white"
          ></motion.div>
          <motion.div 
            animate={{ 
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              delay: 1
            }}
            className="h-1 w-1 rounded-full bg-white"
          ></motion.div>
        </div>
      </button>
    </motion.div>
  );
};

export default DownloadPDFButton;