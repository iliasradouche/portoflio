import { HERO_CONTENT } from "../constants";
import radoucheAbout from "../assets/radoucheProfile.png";
import DownloadPDFButton from "./DownloadMyPdf";
import { motion } from "framer-motion";
import { useTypewriter } from "react-simple-typewriter";
import { useState, useEffect } from "react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Dynamic typewriter effect with more professional titles
  const [typeEffect] = useTypewriter({
    words: [
      "Full Stack Developer",
      "UX/UI Designer",
      "Problem Solver",
      "Creative Thinker"
    ],
    loop: {},
    typeSpeed: 80,
    deleteSpeed: 50,
  });

  // Animation variants with more subtle, professional animations
  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: (delay) => ({
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.7, 
        delay, 
        ease: [0.25, 0.1, 0.25, 1.0] 
      },
    }),
  };

  const imageReveal = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 1.2, 
        delay: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0]
      },
    },
  };

  const subtleFloat = {
    initial: { y: 0 },
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Trigger initial animation after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-neutral-800 pb-16 mt-16 pt-8 lg:pb-24 lg:pt-16">
      {/* Background gradient elements */}
      <div className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-gradient-to-tr from-orange-700/20 to-transparent blur-3xl"></div>
      <div className="absolute -right-1/4 bottom-0 h-96 w-96 rounded-full bg-gradient-to-bl from-sky-700/10 to-transparent blur-3xl"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Text Content */}
          <div className="flex flex-col space-y-6 text-center lg:text-left">
            <motion.h1
              custom={0.2}
              variants={fadeInUp}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="text-5xl font-light tracking-tight lg:text-7xl"
            >
              Ilias
              <span 
                className="block font-medium text-neutral-400 lg:mt-1"
                style={{ transform: `translateY(${scrollY * 0.05}px)` }}
              >
                RADOUCHE
              </span>
            </motion.h1>
            
            <motion.div
              custom={0.5}
              variants={fadeInUp}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="inline-flex space-x-2 text-xl sm:text-2xl"
            >
              <span className="font-light text-neutral-300">I am</span>
              <span className="bg-gradient-to-r from-orange-500 via-rose-400 to-sky-300 bg-clip-text font-medium text-transparent">
                {typeEffect}
              </span>
            </motion.div>
            
            <motion.p
              custom={0.7}
              variants={fadeInUp}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="mx-auto max-w-xl leading-relaxed text-neutral-300 lg:mx-0"
              style={{ transform: `translateY(${scrollY * 0.03}px)` }}
            >
              {HERO_CONTENT}
            </motion.p>
            
            <motion.div
              custom={0.9}
              variants={fadeInUp}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="mt-4 flex justify-center lg:justify-start"
            >
              <DownloadPDFButton />
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="ml-4 rounded-full border border-neutral-700 px-6 py-3 font-medium transition hover:bg-neutral-800/50"
                href="#projects"
              >
                View Projects
              </motion.a>
            </motion.div>
            
            {/* Social links */}
            <motion.div
              custom={1.1}
              variants={fadeInUp}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="mt-6 flex justify-center space-x-5 lg:justify-start"
            >
              {[
                { icon: "github", url: "#" },
                { icon: "linkedin", url: "#" },
                { icon: "twitter", url: "#" },
                { icon: "dribbble", url: "#" }
              ].map((social, index) => (
                <motion.a
                  key={social.icon}
                  href={social.url}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.97 }}
                  className="text-neutral-400 transition-colors hover:text-neutral-100"
                  aria-label={social.icon}
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    {social.icon === "github" && (
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd"></path>
                    )}
                    {social.icon === "linkedin" && (
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"></path>
                    )}
                    {social.icon === "twitter" && (
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                    )}
                    {social.icon === "dribbble" && (
                      <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
                    )}
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Profile Image with Animation */}
          <motion.div 
            className="relative flex justify-center"
            variants={imageReveal}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            style={{ transform: `translateY(${scrollY * -0.05}px)` }}
          >
            <div className="relative">
              {/* Decorative elements */}
              <motion.div 
                className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-orange-500/20 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              ></motion.div>
              <motion.div 
                className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-sky-400/20 blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 0.5,
                }}
              ></motion.div>
              
              {/* Image container with subtle floating animation */}
              <motion.div
                variants={subtleFloat}
                initial="initial"
                animate="animate"
                className="relative overflow-hidden rounded-2xl border-2 border-neutral-700/50 shadow-2xl"
              >
                <div className="overflow-hidden rounded-2xl">
                  <div className="relative">
                    <img
                      className="h-auto w-full max-w-md transform object-cover transition"
                      src={radoucheAbout}
                      alt="Ilias Radouche - Professional Portrait"
                      loading="eager"
                    />
                    {/* Subtle overlay for professional look */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent"></div>
                  </div>
                </div>
              </motion.div>
              
              {/* Accent corner detail */}
              <div className="absolute -bottom-2 -right-2 h-16 w-16 rounded-br-xl border-b-2 border-r-2 border-orange-500/30"></div>
              <div className="absolute -left-2 -top-2 h-16 w-16 rounded-tl-xl border-l-2 border-t-2 border-sky-500/30"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;