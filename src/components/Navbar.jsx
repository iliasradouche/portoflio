import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/radoucheLogo.png";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Update navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Navigation links
  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];
  
  // Social media links
  const socialLinks = [
    { 
      name: "LinkedIn", 
      icon: <FaLinkedin />, 
      href: "https://www.linkedin.com/in/ilias-radouche",
      hoverColor: "hover:text-blue-500"
    },
    { 
      name: "GitHub", 
      icon: <FaGithub />, 
      href: "https://github.com/iliasradouche",
      hoverColor: "hover:text-neutral-200" 
    },
    { 
      name: "Twitter", 
      icon: <FaSquareXTwitter />, 
      href: "https://twitter.com/Radoucheilias",
      hoverColor: "hover:text-neutral-200" 
    },
    { 
      name: "Instagram", 
      icon: <FaInstagram />, 
      href: "https://www.instagram.com/radouche__",
      hoverColor: "hover:text-pink-500" 
    }
  ];

  return (
    <header 
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-neutral-900/80 shadow-md backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <a href="#" className="flex items-center">
            <img 
              src={logo} 
              alt="Ilias Radouche Logo" 
              className="h-10 w-auto transition-transform duration-300 hover:scale-105" 
            />
            <span className="ml-2 hidden text-xl font-light tracking-tight sm:block">
              Ilias <span className="font-medium text-neutral-400">Radouche</span>
            </span>
          </a>
        </motion.div>
        
        {/* Desktop Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden items-center space-x-1 md:flex"
        >
          <ul className="flex space-x-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-800/50 hover:text-white"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Desktop Social Icons */}
          <div className="ml-4 flex items-center space-x-3 border-l border-neutral-700 pl-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-lg text-neutral-400 transition-all ${social.hoverColor}`}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
        
        {/* Mobile Menu Button */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex md:hidden"
        >
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full bg-neutral-800/50 p-2 text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
          </button>
        </motion.div>
      </nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-neutral-800 bg-neutral-900/95 backdrop-blur-md md:hidden"
          >
            <div className="container mx-auto divide-y divide-neutral-800">
              {/* Mobile Nav Links */}
              <ul className="flex flex-col py-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="block px-6 py-3 text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              
              {/* Mobile Social Links */}
              <div className="flex justify-around p-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-2xl text-neutral-400 transition-all ${social.hoverColor}`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;