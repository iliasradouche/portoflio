import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const BackToTop = () => {
  const [visible,     setVisible]     = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: shouldReduce ? "auto" : "smooth" });
  };

  return (
    <motion.button
      type="button"
      aria-label="Back to top"
      onClick={handleClick}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        scale:   visible ? 1 : 0.8,
        y:       visible ? 0 : 10,
      }}
      transition={{ duration: shouldReduce ? 0 : 0.2 }}
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded border text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff41]"
      style={{
        borderColor: "rgba(0,255,65,0.4)",
        background:  "rgba(0,255,65,0.08)",
        color:       "#00ff41",
        backdropFilter: "blur(8px)",
        fontFamily:  "'JetBrains Mono', monospace",
        boxShadow:   visible ? "0 0 15px rgba(0,255,65,0.2)" : "none",
      }}
      tabIndex={visible ? 0 : -1}
    >
      <motion.span
        animate={shouldReduce ? {} : { y: [0, -3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ↑
      </motion.span>
    </motion.button>
  );
};

export default BackToTop;
