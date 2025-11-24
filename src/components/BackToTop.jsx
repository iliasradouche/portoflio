import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const behavior = shouldReduceMotion ? "auto" : "smooth";
    window.scrollTo({ top: 0, behavior });
  };

  return (
    <motion.button
      type="button"
      aria-label="Back to top"
      onClick={handleClick}
      initial={false}
      animate={
        visible
          ? { opacity: 1, scale: shouldReduceMotion ? 1 : 1 }
          : { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }
      }
      transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-r from-orange-500 to-sky-500 p-3 text-white shadow-lg outline-none ring-0 focus-visible:ring-2 focus-visible:ring-orange-400"
    >
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        animate={shouldReduceMotion ? {} : { y: [0, -2, 0] }}
        transition={shouldReduceMotion ? {} : { duration: 1.2, repeat: Infinity }}
        className="drop-shadow"
      >
        <path d="M12 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </motion.button>
  );
};

export default BackToTop;

