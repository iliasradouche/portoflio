import { useEffect } from "react";
import About          from "./components/About";
import Contactme      from "./components/Contactme";
import Experience     from "./components/Experience";
import Hero           from "./components/Hero";
import Navbar         from "./components/Navbar";
import Projects       from "./components/Projects";
import Certificates   from "./components/Certificates";
import Tech           from "./components/Tech";
import ParticlesBackground from "./components/ParticlesBackground";
import BackToTop      from "./components/BackToTop";
import logoUrl        from "./assets/logo.svg";

const App = () => {
  // Set dynamic favicon from src/assets
  useEffect(() => {
    const existing = document.querySelector('link[rel="icon"]');
    const link = existing || document.createElement("link");
    link.setAttribute("rel",  "icon");
    link.setAttribute("type", "image/svg+xml");
    link.setAttribute("href", logoUrl);
    if (!existing) document.head.appendChild(link);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "#0a0a0a" }}>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[9999] -translate-y-32 rounded border border-[rgba(0,255,65,0.3)] bg-[#111] px-4 py-2 font-mono text-sm text-[#00ff41] opacity-0 shadow-lg transition-all focus:translate-y-0 focus:opacity-100"
      >
        Skip to content
      </a>

      {/* CSS scanline + noise overlays (no JS) */}
      <div className="scanline-overlay" aria-hidden="true" />
      <div className="noise-overlay"    aria-hidden="true" />

      {/* Decorative grid overlay */}
      <div className="pointer-events-none fixed inset-0 -z-10 grid-overlay opacity-100" aria-hidden="true" />

      {/* Particles */}
      <ParticlesBackground />

      {/* Main layout */}
      <div id="main-content" className="relative z-10">
        <Navbar />

        <main className="container mx-auto px-4 sm:px-6 lg:px-10">
          <Hero />
          <About />
          <Tech />
          <Experience />
          <Projects />
          <Certificates />
          <Contactme />
        </main>

        {/* Footer */}
        <footer className="border-t border-[rgba(0,255,65,0.08)] py-8 text-center">
          <p className="font-mono text-xs text-[#808080]">
            <span className="text-[#00ff41]">$ </span>
            © {new Date().getFullYear()} Ilias Radouche — Built with React + Vite
            <span className="ml-2 animate-blink text-[#00ff41]">_</span>
          </p>
        </footer>
      </div>

      <BackToTop />
    </div>
  );
};

export default App;
