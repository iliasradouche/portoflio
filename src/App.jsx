import About from "./components/About";
import Contactme from "./components/Contactme";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Tech from "./components/Tech";
import ParticlesBackground from "./components/ParticlesBackground";

const App = () => {
  return (
    <div className="relative overflow-x-hidden text-neutral-300 antialiased selection:bg-orange-300 selection:text-orange-900">
      {/* Background elements */}
      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="relative h-full w-full bg-black">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        </div>
      </div>
      
      {/* Particles positioned between background and content */}
      <ParticlesBackground />

      <div className="relative z-10 container mx-auto px-10">
        <Navbar />
        <Hero />
        <About />
        <Tech />
        <Experience />
        <Projects />
        <Contactme />
      </div>
    </div>
  );
};

export default App;