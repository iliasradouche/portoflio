import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import logo from "../assets/radoucheLogo.png";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { HiMenu, HiX } from "react-icons/hi";
import { NAV_LINKS, SOCIAL_LINKS } from "../data";

const ICON_MAP = {
  LinkedIn:  { icon: <FaLinkedin />,        hover: "hover:text-[#0077B5]"  },
  GitHub:    { icon: <FaGithub />,          hover: "hover:text-[#e0e0e0]"  },
  Twitter:   { icon: <FaSquareXTwitter />,  hover: "hover:text-[#e0e0e0]"  },
  Instagram: { icon: <FaInstagram />,       hover: "hover:text-pink-400"   },
};

const Navbar = () => {
  const [scrolled,        setScrolled]        = useState(false);
  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false);
  const [activeSection,   setActiveSection]   = useState("home");

  // Scroll → background effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const ids = NAV_LINKS
      .map(l => l.href.replace("#", ""))
      .filter(Boolean);
    const elements = ids.map(id => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.5 }
    );
    elements.forEach(el => observer.observe(el));

    const handleTop = () => { if (window.scrollY < 100) setActiveSection("home"); };
    window.addEventListener("scroll", handleTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleTop);
    };
  }, []);

  const isActive = (link) =>
    (link.href === "#" && activeSection === "home") ||
    (link.href !== "#" && activeSection === link.href.replace("#", ""));

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-[rgba(0,255,65,0.1)] bg-[#0a0a0a]/90 backdrop-blur-lg shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo */}
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 group"
          aria-label="Home"
        >
          <img
            src={logo}
            alt="Ilias Radouche Logo"
            className="h-8 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.6)]"
          />
          <span className="hidden font-mono text-sm font-medium text-[#e0e0e0] sm:block">
            <span className="text-[#00ff41] text-glow-green">ilias</span>
            <span className="text-[#808080]">@radouche</span>
            <span className="text-[#00ff41] animate-blink">_</span>
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="hidden items-center gap-1 md:flex"
        >
          <ul className="flex gap-1">
            {NAV_LINKS.map((link, idx) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  aria-current={isActive(link) ? "page" : undefined}
                  className={`relative font-mono text-xs px-3 py-2 rounded transition-all duration-200 ${
                    isActive(link)
                      ? "text-[#00ff41] text-glow-green"
                      : "text-[#808080] hover:text-[#e0e0e0]"
                  }`}
                >
                  {isActive(link) && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded bg-[rgba(0,255,65,0.06)] border border-[rgba(0,255,65,0.15)]"
                    />
                  )}
                  <span className="relative">
                    <span className="text-[#00ff41]/50 mr-0.5">{String(idx + 1).padStart(2, "0")}.</span>
                    {link.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Social icons */}
          <div className="ml-4 flex items-center gap-3 border-l border-[rgba(0,255,65,0.15)] pl-4">
            {SOCIAL_LINKS.map(s => (
              <motion.a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className={`text-base text-[#808080] transition-all ${ICON_MAP[s.name]?.hover}`}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                {ICON_MAP[s.name]?.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Mobile hamburger */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => setMobileMenuOpen(prev => !prev)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className="flex md:hidden items-center justify-center rounded border border-[rgba(0,255,65,0.2)] bg-[rgba(0,255,65,0.05)] p-2 text-[#00ff41]"
        >
          {mobileMenuOpen ? <HiX className="h-5 w-5" /> : <HiMenu className="h-5 w-5" />}
        </motion.button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-[rgba(0,255,65,0.1)] bg-[#0a0a0a]/95 backdrop-blur-lg md:hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <ul className="space-y-1">
                {NAV_LINKS.map((link, idx) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={isActive(link) ? "page" : undefined}
                      className={`flex items-center gap-3 rounded px-3 py-3 font-mono text-sm transition-all ${
                        isActive(link)
                          ? "text-[#00ff41] bg-[rgba(0,255,65,0.06)] border border-[rgba(0,255,65,0.15)]"
                          : "text-[#808080] hover:text-[#e0e0e0] hover:bg-[rgba(255,255,255,0.02)]"
                      }`}
                    >
                      <span className="text-[#00ff41]/40 text-xs w-6">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[#00ff41]/60 mr-1">▶</span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex justify-around border-t border-[rgba(0,255,65,0.1)] pt-4">
                {SOCIAL_LINKS.map(s => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className={`text-xl text-[#808080] transition-all ${ICON_MAP[s.name]?.hover}`}
                  >
                    {ICON_MAP[s.name]?.icon}
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
