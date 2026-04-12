import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const ROUTE_LABELS = {
  '/':        'Home',
  '/about':   'About',
  '/projects':'Projects',
};

const SidebarIndicator = () => {
  const location = useLocation();
  const label = ROUTE_LABELS[location.pathname] ?? 'Portfolio';

  return (
    <div
      className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 translate-x-0 lg:flex"
      style={{ writingMode: 'vertical-rl' }}
      aria-hidden="true"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={label}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-2 rounded-l-lg px-2 py-4 font-mono text-[10px] uppercase tracking-widest"
          style={{
            border:     '1px solid rgba(0,255,65,0.15)',
            borderRight: 'none',
            background: 'rgba(10,10,10,0.9)',
            color:      'rgba(0,255,65,0.5)',
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ minHeight: '6px', minWidth: '6px', background: '#00ff41', boxShadow: '0 0 6px #00ff41' }}
          />
          {label}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SidebarIndicator;
