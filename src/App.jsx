import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import SidebarIndicator from './components/SidebarIndicator';
import ContactModal from './components/ContactModal';
import ParticlesBackground from './components/ParticlesBackground';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';

const App = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: '#0a0a0a' }}>
      {/* Global overlays */}
      <div className="scanline-overlay" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 -z-10 grid-overlay opacity-100" aria-hidden="true" />

      {/* Particles */}
      <ParticlesBackground />

      {/* Fixed elements */}
      <Navbar onContactOpen={() => setContactOpen(true)} />
      <SidebarIndicator />

      {/* Page routes */}
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[rgba(0,255,65,0.08)] py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 sm:flex-row sm:px-10">
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ilias-radouche' },
              { label: 'GitHub', href: 'https://github.com/iliasradouche' },
              { label: 'Twitter', href: 'https://twitter.com/Radoucheilias' },
              { label: 'Instagram', href: 'https://www.instagram.com/radouche__' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="social-pill transition-colors hover:border-[rgba(0,255,65,0.5)] hover:text-[#00ff41]">
                {s.label}
              </a>
            ))}
          </div>
          <p className="font-mono text-xs text-[#808080]">
            <span className="text-[#00ff41]">// </span>
            Ilias Radouche
            <span className="ml-2 animate-blink text-[#00ff41]">♥</span>
          </p>
        </div>
      </footer>

      {/* Contact modal */}
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

      <BackToTop />
    </div>
  );
};

export default App;
