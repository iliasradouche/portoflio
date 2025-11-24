import { useCallback, useEffect, useMemo, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set a flag to indicate component is mounted
    setIsLoaded(true);
    
    return () => setIsLoaded(false);
  }, []);

  const particlesInit = useCallback(async (engine) => {
    // This loads the tsparticles package bundle
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log("Particles container loaded:", container);
  }, []);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Always call hooks unconditionally in every render to avoid React hook order errors
  const options = useMemo(() => ({
    fullScreen: false,
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: !prefersReduced, mode: "push" },
        onHover: { enable: !prefersReduced, mode: "repulse", distance: 100 },
        resize: true,
      },
      modes: {
        push: { quantity: 3 },
        repulse: { distance: 100, duration: 0.4 },
      },
    },
    particles: {
      color: { value: ["#ea580c", "#0ea5e9", "#f97316"] },
      links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.15, width: 1 },
      collisions: { enable: false },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        random: true,
        speed: prefersReduced ? 1 : 2,
        straight: false,
      },
      number: { density: { enable: true, area: 800 }, value: prefersReduced ? 20 : 30 },
      opacity: { value: 0.7 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }), [prefersReduced]);

  if (!isLoaded) return null;

  return (
    <div className="fixed inset-0 z-0">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={options}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />
    </div>
  );
};

export default ParticlesBackground;
