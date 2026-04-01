import { useCallback, useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
  const [engineReady, setEngineReady] = useState(false);

  // Detect mobile for performance optimisation
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // Initialise the v3 Slim engine (once per app lifecycle)
  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, []);

  const particleCount = prefersReduced ? 8 : isMobile ? 25 : 60;
  const particleSpeed = prefersReduced ? 0.2 : isMobile ? 0.4 : 0.6;

  const options = useMemo(() => ({
    fullScreen: false,
    background: { color: { value: "transparent" } },
    fpsLimit: isMobile ? 30 : 60,
    interactivity: {
      events: {
        onHover: { enable: !prefersReduced && !isMobile, mode: "repulse" },
        resize:  { enable: true },
      },
      modes: {
        repulse: { distance: 80, duration: 0.4 },
      },
    },
    particles: {
      // Star-field: tiny white dots, very dim
      color:  { value: ["#00ff41", "#ffffff", "#00cc33"] },
      links:  {
        enable:   true,
        color:    "#00ff41",
        distance: 120,
        opacity:  0.07,
        width:    0.8,
      },
      move: {
        enable:   true,
        speed:    particleSpeed,
        direction:"none",
        random:   true,
        straight: false,
        outModes: { default: "out" },
      },
      number: {
        value: particleCount,
        density: { enable: true, area: 900 },
      },
      opacity: {
        value:     { min: 0.1, max: 0.5 },
        animation: { enable: true, speed: 0.3, sync: false },
      },
      shape: { type: "circle" },
      size:  {
        value:     { min: 0.5, max: 2 },
        animation: { enable: true, speed: 1, sync: false },
      },
    },
    detectRetina: true,
  }), [prefersReduced, isMobile, particleCount, particleSpeed]);

  const handleParticlesLoaded = useCallback(async () => {}, []);

  if (!engineReady || prefersReduced) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Particles
        id="tsparticles"
        options={options}
        particlesLoaded={handleParticlesLoaded}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default ParticlesBackground;
