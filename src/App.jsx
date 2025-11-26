import { useEffect } from "react";
import About from "./components/About";
import Contactme from "./components/Contactme";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Tech from "./components/Tech";
import ParticlesBackground from "./components/ParticlesBackground";
import BackToTop from "./components/BackToTop";
import logoUrl from "./assets/logo.svg";

const App = () => {
  useEffect(() => {
    // Ensure favicon uses the project logo from src/assets
    const existing = document.querySelector('link[rel="icon"]');
    const link = existing || document.createElement('link');
    link.setAttribute('rel', 'icon');
    link.setAttribute('type', 'image/svg+xml');
    link.setAttribute('href', logoUrl);
    if (!existing) {
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="relative overflow-x-hidden text-neutral-300 antialiased selection:bg-orange-300 selection:text-orange-900">
      {/* Skip to content for accessibility */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[1000] -translate-y-32 opacity-0 focus:translate-y-0 focus:opacity-100 rounded-md border border-neutral-700 bg-neutral-900 px-4 py-2 text-white shadow"
      >
        Skip to content
      </a>
      {/* Background elements */}
      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="relative h-full w-full bg-black">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        </div>
      </div>
      
      {/* Particles positioned between background and content */}
      <ParticlesBackground />

      <div id="main-content" className="relative z-10 container mx-auto px-10">
        <Navbar />
        <Hero />
        <About />
        <Tech />
        <Experience />
        <Projects />
        <Certificates />
        <Contactme />
      </div>

      {/* Floating back-to-top button */}
      <BackToTop />
    </div>
  );
};

export default App;
