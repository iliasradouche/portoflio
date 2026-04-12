import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const NAV_ITEMS = [
  { label: 'Home',     to: '/'        },
  { label: 'About Me', to: '/about'   },
  { label: 'Projects', to: '/projects'},
];

const Navbar = ({ onContactOpen }) => {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background:  scrolled ? 'rgba(10,10,10,0.92)' : 'rgba(10,10,10,0.7)',
        borderBottom: '1px solid rgba(0,255,65,0.08)',
        backdropFilter: 'blur(14px)',
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-mono font-bold no-underline">
          <span className="text-sm text-[#00ff41]">IR</span>
          <span className="hidden text-sm text-[#808080] sm:block">ilias@radouche</span>
          <span className="hidden animate-blink text-[#00ff41] sm:block">_</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-2 md:flex">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-1.5 font-mono text-sm transition-all ${
                  isActive
                    ? 'border border-[#00ff41] bg-[rgba(0,255,65,0.1)] text-[#00ff41]'
                    : 'border border-[rgba(0,255,65,0.15)] text-[#808080] hover:border-[rgba(0,255,65,0.4)] hover:text-[#e0e0e0]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Contact — not a route, fires modal */}
          <button
            onClick={onContactOpen}
            className="btn-terminal-solid ml-2 rounded-full px-5 py-1.5 font-mono text-sm font-bold"
          >
            Contact
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex items-center justify-center rounded border border-[rgba(0,255,65,0.2)] p-2 text-[#808080] md:hidden"
          onClick={() => setMobileOpen(p => !p)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX className="h-5 w-5" /> : <HiMenuAlt3 className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[rgba(0,255,65,0.08)] md:hidden"
            style={{ background: 'rgba(10,10,10,0.98)' }}
          >
            <div className="flex flex-col gap-2 px-6 py-4">
              {NAV_ITEMS.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 font-mono text-sm transition-all ${
                      isActive
                        ? 'border border-[rgba(0,255,65,0.3)] bg-[rgba(0,255,65,0.08)] text-[#00ff41]'
                        : 'text-[#808080] hover:text-[#e0e0e0]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <button
                onClick={() => { onContactOpen(); setMobileOpen(false); }}
                className="btn-terminal-solid rounded-lg px-4 py-3 font-mono text-sm font-bold"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
